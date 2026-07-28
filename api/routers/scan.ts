import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import type { ScanStartResult, ScanStatusResult } from "@contracts/types";
import { getDb } from "../queries/connection";
import { scans } from "@db/schema";
import { env } from "../lib/env";
import {
  anchorResultMatchesUrl,
  mapAnchorResult,
  readAnchorScan,
  startAnchorScan,
} from "../lib/anchor";

const hits = new Map<string, number[]>();
const persistedWorkflows = new Set<string>();
const TOKEN_TTL_MS = 30 * 60 * 1000;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const list = (hits.get(ip) ?? []).filter(
    timestamp => now - timestamp < windowMs
  );
  if (list.length >= 20) return true;
  list.push(now);
  hits.set(ip, list);
  return false;
}

function normalizeUrl(raw: string): string {
  const withProtocol = /^https?:\/\//i.test(raw.trim())
    ? raw.trim()
    : `https://${raw.trim()}`;
  const parsed = new URL(withProtocol);
  if (
    !["http:", "https:"].includes(parsed.protocol) ||
    parsed.username ||
    parsed.password
  ) {
    throw new Error("invalid-url");
  }
  return parsed.toString();
}

function assertPublicHost(url: string) {
  const host = new URL(url).hostname.toLowerCase();
  const blocked =
    host === "localhost" ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    /^127\./.test(host) ||
    /^10\./.test(host) ||
    /^192\.168\./.test(host) ||
    /^169\.254\./.test(host) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(host) ||
    host === "0.0.0.0" ||
    host === "[::1]";
  if (blocked) throw new Error("invalid-url");
}

type WorkflowToken = {
  workflowId: string;
  url: string;
  createdAt: number;
};

function signature(value: string) {
  if (!env.appSecret) throw new Error("scanner-token-secret-missing");
  return createHmac("sha256", env.appSecret).update(value).digest("base64url");
}

function createWorkflowToken(payload: WorkflowToken) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${signature(encoded)}`;
}

function readWorkflowToken(token: string): WorkflowToken {
  const [encoded, suppliedSignature] = token.split(".");
  if (!encoded || !suppliedSignature) throw new Error("invalid-scan-token");
  const expectedSignature = signature(encoded);
  const supplied = Buffer.from(suppliedSignature);
  const expected = Buffer.from(expectedSignature);
  if (
    supplied.length !== expected.length ||
    !timingSafeEqual(supplied, expected)
  ) {
    throw new Error("invalid-scan-token");
  }
  const payload = JSON.parse(
    Buffer.from(encoded, "base64url").toString("utf8")
  ) as WorkflowToken;
  if (
    !payload.workflowId ||
    !payload.url ||
    !Number.isFinite(payload.createdAt) ||
    Date.now() - payload.createdAt > TOKEN_TTL_MS
  ) {
    throw new Error("expired-scan-token");
  }
  return payload;
}

async function persistCompletedScan(
  workflowId: string,
  result: ScanStatusResult
) {
  if (result.status !== "completed" || persistedWorkflows.has(workflowId))
    return;
  persistedWorkflows.add(workflowId);
  try {
    await getDb()
      .insert(scans)
      .values({
        url: result.result.summary.url.slice(0, 1000),
        score: result.result.score,
        totalDetected: result.result.summary.total,
        undisclosed: result.result.summary.undisclosed,
        reachable: 1,
        report: result.result.report,
      });
  } catch (error) {
    persistedWorkflows.delete(workflowId);
    console.error("scan-persist-failed", error);
  }
}

export const scanRouter = createRouter({
  start: publicQuery
    .input(z.object({ url: z.string().min(3).max(500) }))
    .mutation(async ({ input, ctx }): Promise<ScanStartResult> => {
      const ip =
        ctx.req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        ctx.req.headers.get("x-real-ip") ??
        "unknown";
      if (rateLimited(ip)) return { ok: false, error: "rate-limited" };

      let url: string;
      try {
        url = normalizeUrl(input.url);
        assertPublicHost(url);
      } catch {
        return { ok: false, error: "invalid-url" };
      }

      try {
        const workflowId = await startAnchorScan(url, env.anchorBrowserApiKey);
        return {
          ok: true,
          token: createWorkflowToken({
            workflowId,
            url,
            createdAt: Date.now(),
          }),
        };
      } catch (error) {
        console.error("anchor-scan-start-failed", error);
        return { ok: false, error: "anchor-unavailable" };
      }
    }),

  status: publicQuery
    .input(z.object({ token: z.string().min(20).max(4000) }))
    .mutation(async ({ input }): Promise<ScanStatusResult> => {
      let workflow: WorkflowToken;
      try {
        workflow = readWorkflowToken(input.token);
      } catch (error) {
        return {
          status: "failed",
          error: error instanceof Error ? error.message : "invalid-scan-token",
        };
      }

      try {
        const state = await readAnchorScan(
          workflow.workflowId,
          env.anchorBrowserApiKey
        );
        if (state.status !== "completed") return state;
        if (!anchorResultMatchesUrl(workflow.url, state.observed)) {
          console.error("anchor-scan-domain-mismatch", {
            requestedUrl: workflow.url,
            observedUrls: state.observed.pages_visited.map(page => page.url),
          });
          return { status: "failed", error: "anchor-domain-mismatch" };
        }
        const result: ScanStatusResult = {
          status: "completed",
          result: mapAnchorResult(workflow.url, state.observed),
        };
        await persistCompletedScan(workflow.workflowId, result);
        return result;
      } catch (error) {
        console.error("anchor-scan-status-failed", error);
        return { status: "failed", error: "anchor-status-unavailable" };
      }
    }),

  stats: publicQuery.query(async () => {
    try {
      const rows = await getDb().select().from(scans);
      return {
        totalScans: rows.length,
        avgScore: rows.length
          ? Math.round(
              rows.reduce((total, row) => total + (row.score ?? 0), 0) /
                rows.length
            )
          : null,
      };
    } catch {
      return { totalScans: 0, avgScore: null };
    }
  }),
});
