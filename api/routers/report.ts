import { z } from "zod";
import { sql } from "drizzle-orm";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { leads, reportRequests } from "@db/schema";
import {
  isValidEmail,
  normalizeEmail,
  type ReportRequestResult,
} from "@contracts/types";
import { syncScannerLeadToClose } from "../lib/close";

/**
 * Reference code the buyer sees and that travels in the bunq payment description.
 * Alphabet excludes 0/O and 1/I so it survives being read off a screen and typed.
 */
const ALPHABET = "ACDEFGHJKLMNPQRSTUVWXYZ23456789";

function makeRef(): string {
  let out = "";
  for (let i = 0; i < 6; i++) out += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  return out;
}

/**
 * The table this router writes to, as DDL. Kept here so a fresh deploy is
 * self-healing: if the migration has not been applied yet, the first insert
 * creates the table and retries instead of losing a paying customer's intake.
 */
const CREATE_TABLE = sql`
  CREATE TABLE IF NOT EXISTS report_requests (
    id SERIAL PRIMARY KEY,
    ref VARCHAR(16) NOT NULL,
    company VARCHAR(255) NOT NULL,
    website VARCHAR(512),
    email VARCHAR(255) NOT NULL,
    country VARCHAR(64),
    company_size VARCHAR(32),
    sector VARCHAR(64),
    ai_systems TEXT,
    notes TEXT,
    status VARCHAR(24) NOT NULL DEFAULT 'requested',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

export const reportRouter = createRouter({
  /**
   * Capture a report request. Written before payment, so a company that abandons at
   * the bunq screen is still reachable.
   *
   * Persistence is best-effort by design: a database problem must never stand between
   * a buyer and the payment screen. The mutation always returns a usable ref and
   * reports whether the row was stored.
   */
  request: publicQuery
    .input(
      z.object({
        company: z.string().min(1).max(255),
        website: z.string().max(500).optional(),
        email: z
          .string()
          .trim()
          .max(255)
          .refine(isValidEmail, "Invalid email address")
          .transform(normalizeEmail),
        country: z.string().max(64).optional(),
        companySize: z.string().max(32).optional(),
        sector: z.string().max(64).optional(),
        aiSystems: z.array(z.string().max(64)).max(20).optional(),
        notes: z.string().max(4000).optional(),
      }),
    )
    .mutation(async ({ input }): Promise<ReportRequestResult> => {
      const ref = makeRef();
      const row = {
        ref,
        company: input.company.trim(),
        website: input.website?.trim() || null,
        email: input.email.trim(),
        country: input.country || null,
        companySize: input.companySize || null,
        sector: input.sector || null,
        aiSystems: input.aiSystems?.join(", ") || null,
        notes: input.notes?.trim() || null,
      };

      // Persistence is attempted in order of preference. Every step — including
      // opening the connection — is inside the guard, because a database problem
      // must never stand between a buyer and the payment screen.
      const attempts = [
        // 1. Normal path.
        async () => {
          await getDb().insert(reportRequests).values(row);
        },
        // 2. Table missing on a fresh database — create it, then retry.
        async () => {
          const db = getDb();
          await db.execute(CREATE_TABLE);
          await db.insert(reportRequests).values(row);
        },
        // 3. Last resort: keep the contact in leads, which always exists.
        async () => {
          await getDb()
            .insert(leads)
            .values({
              email: row.email,
              url: `REF ${ref} | ${row.company} | ${row.website ?? "no site"}`.slice(0, 1000),
              source: "report-intake",
            });
        },
      ];

      let stored = false;
      for (const attempt of attempts) {
        try {
          await attempt();
          stored = true;
          break;
        } catch {
          // Try the next fallback.
        }
      }

      let crm: ReportRequestResult["crm"] = "skipped";
      try {
        crm = await syncScannerLeadToClose({
          email: row.email,
          url: row.website ?? undefined,
          source: "report-intake",
          company: row.company,
          contactName: row.company,
          details: [
            `Reference: ${ref}`,
            row.country ? `Country: ${row.country}` : "",
            row.companySize ? `Company size: ${row.companySize}` : "",
            row.sector ? `Sector: ${row.sector}` : "",
            row.aiSystems ? `AI systems: ${row.aiSystems}` : "",
            row.notes ? `Notes: ${row.notes}` : "",
          ].filter(Boolean),
        });
      } catch {
        crm = "failed";
      }

      // The buyer always gets a usable payment reference. Persistence and CRM
      // delivery are reported independently so neither masks the other.
      return { ok: true, ref, stored, crm };
    }),
});
