import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { AI_SIGNATURES, type AiSignature } from "@contracts/signatures";
import type { ScanFinding, ScanResult } from "@contracts/types";
import { getDb } from "../queries/connection";
import { scans } from "@db/schema";

/** Naive in-memory rate limit: 20 scans / IP / 10 min. */
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const list = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (list.length >= 20) return true;
  list.push(now);
  hits.set(ip, list);
  return false;
}

function normalizeUrl(raw: string): string {
  let u = raw.trim();
  if (!/^https?:\/\//i.test(u)) u = "https://" + u;
  const parsed = new URL(u);
  if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("bad-protocol");
  return parsed.toString();
}

/** SSRF guard: block loopback/private/link-local hosts. */
function assertPublicHost(u: string) {
  const host = new URL(u).hostname.toLowerCase();
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
  if (blocked) throw new Error("private-host");
}

const DISCLOSURE_PROBES = [
  "you are interacting with an ai",
  "interacting with an ai system",
  "i am an ai",
  "ai assistant",
  "automated assistant",
  "virtual assistant",
  "chatbot",
  "soy una ia",
  "soy un asistente virtual",
  "asistente de ia",
  "sistema de ia",
  "respuestas automáticas",
  "je suis une ia",
  "ich bin eine ki",
  "assistente virtuale",
];

/**
 * Match a JS global against the ORIGINAL-case HTML in loader-ish contexts only
 * (window.NAME, =NAME(, = NAME =). Prevents false positives like "zE" in "size"
 * or "drift" in plain text.
 */
function matchGlobal(g: string, rawHtml: string): boolean {
  if (g.length < 2) return false;
  const esc = g.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`window\\.${esc}(?=[^\\w$]|$)|[(=,;{]\\s*${esc}(?=[^\\w$]|$)`);
  return re.test(rawHtml);
}

function matchSignature(
  sig: AiSignature,
  html: string,
  rawHtml: string,
  scripts: string[],
  iframes: string[],
): ScanFinding | null {
  const evidence: string[] = [];
  const p = sig.patterns;

  for (const needle of p.scripts) {
    const n = needle.toLowerCase();
    if (scripts.some((s) => s.includes(n))) {
      evidence.push(`script src contains "${needle}"`);
      break;
    }
  }
  for (const needle of p.iframes) {
    const n = needle.toLowerCase();
    if (iframes.some((s) => s.includes(n))) {
      evidence.push(`iframe src contains "${needle}"`);
      break;
    }
  }
  // DOM/global patterns degrade to substring checks on raw HTML (server-side).
  if (!evidence.length) {
    for (const needle of [...p.scripts, ...p.iframes]) {
      if (needle && html.includes(needle.toLowerCase())) {
        evidence.push(`page HTML references "${needle}"`);
        break;
      }
    }
  }
  // Global loaders often appear in inline scripts (case-sensitive, context-guarded).
  if (!evidence.length) {
    for (const g of p.globals) {
      if (g && matchGlobal(g, rawHtml)) {
        evidence.push(`inline loader references "${g}"`);
        break;
      }
    }
  }

  if (!evidence.length) return null;

  const disclosed = DISCLOSURE_PROBES.some((probe) => html.includes(probe));
  return {
    id: sig.id,
    name: sig.name,
    vendor: sig.vendor,
    category: sig.category,
    article: sig.article,
    severity: sig.severity,
    evidence,
    existingDisclosureFound: disclosed,
  };
}

function scoreOf(detected: ScanFinding[]): number {
  let score = 100;
  for (const d of detected) {
    if (d.existingDisclosureFound) continue;
    score -= d.severity === "high" ? 40 : d.severity === "medium" ? 25 : 10;
  }
  return Math.max(0, score);
}

function buildReport(result: Omit<ScanResult, "report">): string {
  const s = result.summary;
  const lines: string[] = [];
  lines.push("RAPIDACT AI TRANSPARENCY SCAN");
  lines.push(`URL: ${s.url}`);
  lines.push(`Scanned: ${s.scannedAt}`);
  lines.push(`Score: ${result.score}/100`);
  lines.push(
    `AI touchpoints detected: ${s.total} (high-severity: ${s.high}, without visible AI disclosure: ${s.undisclosed})`,
  );
  lines.push("");
  if (!result.detected.length) {
    lines.push("No known AI chat/assistant signatures detected on this page.");
  }
  for (const d of result.detected) {
    lines.push(`[${d.severity.toUpperCase()}] ${d.name} (${d.vendor}) — Art. ${d.article}`);
    for (const e of d.evidence) lines.push(`   evidence: ${e}`);
    lines.push(
      `   disclosure found: ${d.existingDisclosureFound ? "yes" : "NO — Art. 50(1) requires informing users they interact with AI"}`,
    );
    lines.push("");
  }
  lines.push(
    "Reference: Regulation (EU) 2024/1689, Article 50 (applies from 2 Aug 2026). Fines up to EUR 15M or 3% of global turnover (Art. 99).",
  );
  lines.push("Scan by RapidAct — automated transparency tooling. This is a technical scan, not legal advice.");
  return lines.join("\n");
}

async function fetchHtml(url: string): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        // Fetch what a real visitor sees; many storefronts 403 obvious bots.
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.9,es;q=0.8",
      },
    });
    if (!res.ok) throw new Error(`http-${res.status}`);
    const reader = res.body?.getReader();
    if (!reader) return "";
    const decoder = new TextDecoder();
    let html = "";
    const MAX = 1_500_000;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      html += decoder.decode(value, { stream: true });
      if (html.length > MAX) break;
    }
    return html;
  } finally {
    clearTimeout(timer);
  }
}

export const scanRouter = createRouter({
  run: publicQuery
    .input(z.object({ url: z.string().min(3).max(500) }))
    .mutation(async ({ input, ctx }) => {
      const ip =
        ctx.req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        ctx.req.headers.get("x-real-ip") ??
        "unknown";
      if (rateLimited(ip)) {
        return { reachable: false, error: "rate-limited", detected: [], score: 0, summary: null } as unknown as ScanResult;
      }

      let url: string;
      try {
        url = normalizeUrl(input.url);
        assertPublicHost(url);
      } catch {
        return { reachable: false, error: "invalid-url", detected: [], score: 0, summary: null } as unknown as ScanResult;
      }

      let htmlRaw: string;
      try {
        htmlRaw = await fetchHtml(url);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "fetch-failed";
        return { reachable: false, error: msg, detected: [], score: 0, summary: null } as unknown as ScanResult;
      }
      const html = htmlRaw.toLowerCase();

      const scripts = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/g)].map((m) => m[1]);
      const iframes = [...html.matchAll(/<iframe[^>]+src=["']([^"']+)["']/g)].map((m) => m[1]);

      const detected: ScanFinding[] = [];
      for (const sig of AI_SIGNATURES) {
        const hit = matchSignature(sig, html, htmlRaw, scripts, iframes);
        if (hit) detected.push(hit);
      }

      const base: Omit<ScanResult, "report"> = {
        detected,
        score: scoreOf(detected),
        summary: {
          total: detected.length,
          high: detected.filter((d) => d.severity === "high").length,
          undisclosed: detected.filter((d) => !d.existingDisclosureFound).length,
          scannedAt: new Date().toISOString(),
          url,
        },
        reachable: true,
      };
      const result: ScanResult = { ...base, report: buildReport(base) };

      // Persist (best-effort — never fail the scan on DB errors).
      try {
        await getDb()
          .insert(scans)
          .values({
            url: url.slice(0, 1000),
            score: result.score,
            totalDetected: result.summary.total,
            undisclosed: result.summary.undisclosed,
            reachable: 1,
            report: result.report,
          });
      } catch (e) {
        console.error("scan-persist-failed", e);
      }

      return result;
    }),

  stats: publicQuery.query(async () => {
    try {
      const rows = await getDb().select().from(scans);
      return {
        totalScans: rows.length,
        avgScore: rows.length ? Math.round(rows.reduce((a, r) => a + (r.score ?? 0), 0) / rows.length) : null,
      };
    } catch {
      return { totalScans: 0, avgScore: null };
    }
  }),
});
