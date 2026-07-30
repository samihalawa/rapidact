import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { getDb } from "../queries/connection";
import { leads } from "@db/schema";
import {
  isValidEmail,
  normalizeEmail,
  type LeadResult,
} from "@contracts/types";
import { syncScannerLeadToClose } from "../lib/close";

export const leadsRouter = createRouter({
  capture: publicQuery
    .input(
      z.object({
        email: z
          .string()
          .trim()
          .max(255)
          .refine(isValidEmail, "Invalid email address")
          .transform(normalizeEmail),
        url: z.string().max(1000).optional(),
        source: z.string().max(64).optional(),
        name: z.string().max(160).optional(),
        company: z.string().max(200).optional(),
        partnerType: z.string().max(80).optional(),
        clientVolume: z.string().max(80).optional(),
        notes: z.string().max(2000).optional(),
      })
    )
    .mutation(async ({ input }): Promise<LeadResult> => {
      let stored = false;
      try {
        await getDb()
          .insert(leads)
          .values({
            email: input.email,
            url: input.url ?? null,
            source: input.source ?? "scanner",
          });
        stored = true;
      } catch {
        // Close remains an independent delivery path when the database is
        // temporarily unavailable.
      }

      let crm: LeadResult["crm"] = "skipped";
      try {
        crm = await syncScannerLeadToClose({
          email: input.email,
          url: input.url,
          source: input.source ?? "scanner",
          company: input.company,
          contactName: input.name,
          details: [
            input.partnerType ? `Partner type: ${input.partnerType}` : "",
            input.clientVolume
              ? `Potential client volume: ${input.clientVolume}`
              : "",
            input.notes ? `Context: ${input.notes}` : "",
          ].filter(Boolean),
        });
      } catch {
        crm = "failed";
      }
      return { ok: true, stored, crm };
    }),
});
