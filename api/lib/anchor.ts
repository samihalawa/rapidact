import { z } from "zod";
import type { ScanFinding, ScanResult } from "@contracts/types";

const ANCHOR_TASK_URL = "https://api.anchorbrowser.io/v1/tools/perform-web-task";

const anchorOutputSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "scan_status",
    "pages_visited",
    "ai_touchpoints",
    "broken_elements",
    "risk_indicators",
    "blockers",
    "summary",
  ],
  properties: {
    scan_status: { type: "string", enum: ["COMPLETE", "PARTIAL"] },
    pages_visited: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["url", "title"],
        properties: {
          url: { type: "string" },
          title: { type: "string" },
        },
      },
    },
    ai_touchpoints: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "name",
          "vendor",
          "category",
          "source_url",
          "evidence",
          "disclosure_observed",
          "severity",
        ],
        properties: {
          name: { type: "string" },
          vendor: { type: "string" },
          category: { type: "string" },
          source_url: { type: "string" },
          evidence: { type: "array", items: { type: "string" } },
          disclosure_observed: { type: "boolean" },
          disclosure_text: { type: "string" },
          severity: { type: "string", enum: ["high", "medium", "low"] },
        },
      },
    },
    broken_elements: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["url", "description"],
        properties: {
          url: { type: "string" },
          description: { type: "string" },
        },
      },
    },
    risk_indicators: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["area", "source_url", "evidence", "reason"],
        properties: {
          area: { type: "string", enum: ["article_5", "annex_3"] },
          source_url: { type: "string" },
          evidence: { type: "string" },
          reason: { type: "string" },
        },
      },
    },
    blockers: { type: "array", items: { type: "string" } },
    summary: { type: "string" },
  },
} as const;

const anchorResultSchema = z.object({
  scan_status: z.enum(["COMPLETE", "PARTIAL"]),
  pages_visited: z.array(
    z.object({
      url: z.string().min(1),
      title: z.string(),
    }),
  ),
  ai_touchpoints: z.array(
    z.object({
      name: z.string().min(1),
      vendor: z.string(),
      category: z.string(),
      source_url: z.string().min(1),
      evidence: z.array(z.string().min(1)),
      disclosure_observed: z.boolean(),
      disclosure_text: z.string().optional(),
      severity: z.enum(["high", "medium", "low"]),
    }),
  ),
  broken_elements: z.array(
    z.object({
      url: z.string().min(1),
      description: z.string().min(1),
    }),
  ),
  risk_indicators: z.array(
    z.object({
      area: z.enum(["article_5", "annex_3"]),
      source_url: z.string().min(1),
      evidence: z.string().min(1),
      reason: z.string().min(1),
    }),
  ),
  blockers: z.array(z.string().min(1)),
  summary: z.string().min(1),
});

const startResponseSchema = z.object({
  data: z.object({
    workflow_id: z.union([z.string(), z.number()]).transform(String),
    status: z.string(),
  }),
});

const statusResponseSchema = z.object({
  status: z.string(),
  result: z.unknown().optional(),
});

export type AnchorObservedResult = z.infer<typeof anchorResultSchema>;

export const ANCHOR_SCAN_PROMPT = `Inspect this public website as a real visitor for a RapidAct EU AI Act transparency preview.

Visit the supplied URL and at most two additional important same-origin public pages by following real links that are visible on the rendered website. Never invent or guess a route. If a followed link resolves to the same content as the entry page, do not count it as a distinct inspected page; choose another real visible link instead. Prioritise pages that expose user-facing AI functionality, such as product, search, demo, or assistant pages. Do not sign in, submit forms, make purchases, accept destructive prompts, or change any website data.

Observe and report only evidence visible in the rendered website or its loaded public resources:
1. User-facing AI assistants, chatbots, generative features, translation, recommendation, synthetic-media, voice, or automated decision touchpoints.
2. Vendor or product identity when directly observable.
3. Exact disclosure wording that tells a visitor they are interacting with AI, and the URL where it appears.
4. Exact evidence for every touchpoint. Include a touchpoint only when the rendered interaction explicitly identifies itself as AI, actually produces an AI-generated or automated decision output during this inspection, or a loaded public resource directly identifies the AI product or vendor.
5. Clearly broken visible interface elements encountered during inspection.
6. Separately flagged indicators that may warrant human review under Article 5 or Annex III. These are indicators only, never legal classifications.

Exclude ordinary contact links or buttons such as WhatsApp, email, or telephone; language selectors; analytics or session-replay tools; cookie controls; transparency badges or notices that merely describe another system; and unexercised marketing claims. Do not treat the absence of an AI disclosure on a non-AI feature as a finding.

Return COMPLETE only when the planned public pages were inspected. Return PARTIAL when robots, consent walls, authentication, navigation failures, time limits, or another blocker prevented part of the inspection. List every inspected URL and every blocker. Do not invent systems, hidden pages, legal conclusions, compliance scores, PASS/FAIL outcomes, or evidence that was not directly observed.`;

export function buildAnchorScanRequest(url: string) {
  return {
    url,
    prompt: ANCHOR_SCAN_PROMPT,
    agent: "browser-use",
    detect_elements: true,
    max_steps: 80,
    output_schema: anchorOutputSchema,
    async: true,
  };
}

async function readJson(response: Response) {
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`anchor-http-${response.status}`);
  }
  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new Error("anchor-invalid-json");
  }
}

export async function startAnchorScan(
  url: string,
  apiKey: string,
  fetchImpl: typeof fetch = fetch,
) {
  const response = await fetchImpl(ANCHOR_TASK_URL, {
    method: "POST",
    headers: {
      "anchor-api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(buildAnchorScanRequest(url)),
  });
  return startResponseSchema.parse(await readJson(response)).data.workflow_id;
}

export async function readAnchorScan(
  workflowId: string,
  apiKey: string,
  fetchImpl: typeof fetch = fetch,
):
  Promise<
    | { status: "running" }
    | { status: "failed"; error: string }
    | { status: "completed"; observed: AnchorObservedResult }
  > {
  const response = await fetchImpl(`${ANCHOR_TASK_URL}/${encodeURIComponent(workflowId)}/status`, {
    headers: { "anchor-api-key": apiKey },
  });
  const payload = statusResponseSchema.parse(await readJson(response));
  const status = payload.status.toUpperCase();

  if (status === "RUNNING" || status === "PENDING" || status === "QUEUED") {
    return { status: "running" };
  }
  if (status === "FAILED" || status === "CANCELLED") {
    const message =
      typeof payload.result === "string" && payload.result.trim()
        ? payload.result.trim()
        : `anchor-${status.toLowerCase()}`;
    return { status: "failed", error: message };
  }
  if (status !== "COMPLETED") {
    return { status: "failed", error: `anchor-unknown-status-${status.toLowerCase()}` };
  }

  let rawResult = payload.result;
  if (typeof rawResult === "string") {
    try {
      rawResult = JSON.parse(rawResult);
    } catch {
      return { status: "failed", error: "anchor-invalid-result" };
    }
  }
  const parsed = anchorResultSchema.safeParse(rawResult);
  if (!parsed.success) {
    return { status: "failed", error: "anchor-invalid-result" };
  }
  return { status: "completed", observed: parsed.data };
}

function scoreOf(detected: ScanFinding[]): number {
  let score = 100;
  for (const finding of detected) {
    if (finding.existingDisclosureFound) continue;
    score -= finding.severity === "high" ? 40 : finding.severity === "medium" ? 25 : 10;
  }
  return Math.max(0, score);
}

function findingId(name: string, index: number) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  return `${slug || "touchpoint"}-${index + 1}`;
}

export function mapAnchorResult(url: string, observed: AnchorObservedResult): ScanResult {
  const detected: ScanFinding[] = observed.ai_touchpoints.map((touchpoint, index) => ({
    id: findingId(touchpoint.name, index),
    name: touchpoint.name,
    vendor: touchpoint.vendor || "Not identified",
    category: touchpoint.category,
    article: "50",
    severity: touchpoint.severity,
    sourceUrl: touchpoint.source_url,
    evidence: touchpoint.disclosure_text
      ? [...touchpoint.evidence, `Visible disclosure: “${touchpoint.disclosure_text}”`]
      : touchpoint.evidence,
    existingDisclosureFound: touchpoint.disclosure_observed,
  }));

  const summary = {
    total: detected.length,
    high: detected.filter((finding) => finding.severity === "high").length,
    undisclosed: detected.filter((finding) => !finding.existingDisclosureFound).length,
    scannedAt: new Date().toISOString(),
    url,
    scanStatus: observed.scan_status.toLowerCase() as "complete" | "partial",
    pagesVisited: observed.pages_visited,
    blockers: observed.blockers,
    brokenElements: observed.broken_elements.map((item) => ({
      url: item.url,
      description: item.description,
    })),
    riskIndicators: observed.risk_indicators.map((item) => ({
      area: item.area,
      sourceUrl: item.source_url,
      evidence: item.evidence,
      reason: item.reason,
    })),
    engine: "anchor-browser" as const,
  };
  const score = scoreOf(detected);
  const lines = [
    "RAPIDACT PUBLIC-WEBSITE AI TRANSPARENCY SCAN",
    `URL: ${url}`,
    `Status: ${summary.scanStatus.toUpperCase()}`,
    `Scanned: ${summary.scannedAt}`,
    `Pages inspected: ${summary.pagesVisited.map((page) => page.url).join(", ") || "none"}`,
    `Visible-readiness score: ${score}/100`,
    `AI touchpoints observed: ${summary.total}`,
    "",
    observed.summary,
    "",
  ];
  for (const finding of detected) {
    lines.push(`[${finding.severity.toUpperCase()}] ${finding.name} (${finding.vendor})`);
    lines.push(`Source: ${finding.sourceUrl}`);
    for (const evidence of finding.evidence) lines.push(`Evidence: ${evidence}`);
    lines.push(
      `Visible AI disclosure observed: ${finding.existingDisclosureFound ? "yes" : "not observed"}`,
      "",
    );
  }
  if (summary.blockers.length) {
    lines.push("BLOCKERS");
    for (const blocker of summary.blockers) lines.push(`- ${blocker}`);
    lines.push("");
  }
  lines.push(
    "Scope: rendered public-website observations from the URLs listed above. This output does not classify the organisation or its systems legally.",
  );

  return {
    detected,
    score,
    summary,
    report: lines.join("\n"),
    reachable: true,
  };
}
