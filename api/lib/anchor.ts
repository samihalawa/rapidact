import { z } from "zod";
import type { ScanFinding, ScanResult } from "@contracts/types";

const ANCHOR_TASK_URL =
  "https://api.anchorbrowser.io/v1/tools/perform-web-task";

const anchorOutputSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "scan_status",
    "pages_visited",
    "ai_touchpoints",
    "blockers",
  ],
  properties: {
    scan_status: { type: "string", enum: ["COMPLETE", "PARTIAL"] },
    pages_visited: {
      type: "array",
      minItems: 1,
      maxItems: 1,
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
      maxItems: 5,
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
    blockers: { type: "array", items: { type: "string" } },
  },
} as const;

const anchorResultSchema = z.object({
  scan_status: z.enum(["COMPLETE", "PARTIAL"]),
  pages_visited: z
    .array(
      z.object({
        url: z.string().min(1),
        title: z.string(),
      })
    )
    .min(1)
    .max(1),
  ai_touchpoints: z.array(
    z.object({
      name: z.string().min(1),
      vendor: z.string(),
      category: z.string(),
      source_url: z.string().min(1),
      evidence: z.array(z.string().min(1)),
      disclosure_observed: z.boolean(),
      // Gemini can serialize an absent optional string as JSON null even when
      // the output schema marks the property as optional.
      disclosure_text: z
        .string()
        .nullish()
        .transform(value => value ?? undefined),
      severity: z.enum(["high", "medium", "low"]),
    })
  ),
  broken_elements: z
    .array(
      z.object({
        url: z.string().min(1),
        description: z.string().min(1),
      })
    )
    .optional()
    .default([]),
  risk_indicators: z
    .array(
      z.object({
        area: z.enum(["article_5", "annex_3"]),
        source_url: z.string().min(1),
        evidence: z.string().min(1),
        reason: z.string().min(1),
      })
    )
    .optional()
    .default([]),
  blockers: z.array(z.string().min(1)),
  summary: z.string().min(1).optional(),
});

const startResponseSchema = z.object({
  data: z.object({
    workflow_id: z.union([z.string(), z.number()]).transform(String),
    status: z.string(),
  }),
});

const statusResponseSchema = z
  .object({
    status: z.string().optional(),
    result: z.unknown().optional(),
    error: z.string().optional(),
    data: z
      .object({
        status: z.string().optional(),
        result: z.unknown().optional(),
        error: z.string().optional(),
      })
      .optional(),
  })
  .refine(payload => Boolean(payload.status ?? payload.data?.status), {
    message: "Anchor status response is missing a status",
  });

export type AnchorObservedResult = z.infer<typeof anchorResultSchema>;

const ANCHOR_STEP_LIMIT_SENTINEL = "Task completed (max steps reached)";

export const ANCHOR_SCAN_PROMPT = `Perform one fast visual inspection of only the supplied rendered page, then return structured JSON.

Inspect the initial viewport and any fixed or sticky controls first. Do not read long article copy top-to-bottom and do not perform an exhaustive audit. If no qualifying visitor-facing AI control is visible, you may scroll this same page once to check the main body, footer, or one floating launcher, then stop. Reserve the final step for returning the structured result.

Do not click, navigate, submit, open menus, inspect other pages, or perform an exhaustive audit. Report a visitor-facing AI touchpoint only when this page contains a functional control through which the visitor can directly provide input to an AI system or directly receive an AI-generated or automated-decision output.

Text, links, cards, legal guidance, articles, examples, marketing copy, AI notices, compliance badges, and disclosure templates that merely discuss AI are never AI touchpoints. WhatsApp, email, telephone, analytics, cookie, and language controls are never AI touchpoints.

Return no more than five distinct, highest-confidence touchpoints. Treat several controls belonging to the same widget or workflow as one touchpoint and do not repeat it.

For each real touchpoint:
1. Quote the visible functional evidence and use the supplied URL as the source URL.
2. Identify the vendor only when it is directly visible; otherwise use an empty string.
3. Record whether disclosure is visible next to or before the interaction.
4. Use severity high when disclosure is not visible, medium when it is unclear, and low when it is visible.

If no feature meets this strict functional test, return a successful structured result with an empty ai_touchpoints array.

Return COMPLETE after this page renders. Return PARTIAL only if the page itself cannot be inspected, and list the blocker. Never infer systems, hidden pages, legal conclusions, compliance scores, or evidence that was not directly observed.`;

export function buildAnchorScanRequest(url: string) {
  return {
    url,
    prompt: ANCHOR_SCAN_PROMPT,
    agent: "gemini-computer-use",
    detect_elements: false,
    max_steps: 6,
    output_schema: anchorOutputSchema,
    async: true,
  };
}

function parseStructuredResult(value: unknown): unknown {
  let candidate = value;
  if (
    candidate &&
    typeof candidate === "object" &&
    "result" in candidate &&
    (candidate as { status?: unknown }).status === "success"
  ) {
    candidate = (candidate as { result: unknown }).result;
  }
  if (typeof candidate !== "string") return candidate;
  const trimmed = candidate.trim();
  const json =
    trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i)?.[1] ?? trimmed;
  try {
    return JSON.parse(json);
  } catch {
    return candidate;
  }
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
  fetchImpl: typeof fetch = fetch
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
  fetchImpl: typeof fetch = fetch
): Promise<
  | { status: "running" }
  | { status: "failed"; error: string }
  | { status: "completed"; observed: AnchorObservedResult }
> {
  const response = await fetchImpl(
    `${ANCHOR_TASK_URL}/${encodeURIComponent(workflowId)}/status`,
    {
      headers: { "anchor-api-key": apiKey },
    }
  );
  const payload = statusResponseSchema.parse(await readJson(response));
  const status = (payload.status ?? payload.data?.status ?? "").toUpperCase();
  const result = payload.result ?? payload.data?.result;
  const providerError = payload.error ?? payload.data?.error;

  if (status === "RUNNING" || status === "PENDING" || status === "QUEUED") {
    return { status: "running" };
  }
  if (status === "FAILED" || status === "CANCELLED") {
    console.error("anchor-task-failed", {
      workflowId,
      status,
      error:
        providerError || (typeof result === "string" ? result : undefined),
    });
    return { status: "failed", error: "anchor-task-failed" };
  }
  if (status !== "COMPLETED") {
    return {
      status: "failed",
      error: `anchor-unknown-status-${status.toLowerCase()}`,
    };
  }

  const rawResult = parseStructuredResult(result);
  if (rawResult === ANCHOR_STEP_LIMIT_SENTINEL) {
    const providerSteps =
      result &&
      typeof result === "object" &&
      "steps" in result &&
      typeof result.steps === "number"
        ? result.steps
        : undefined;
    console.error("anchor-step-limit", {
      workflowId,
      steps: providerSteps,
    });
    return { status: "failed", error: "anchor-step-limit" };
  }
  const parsed = anchorResultSchema.safeParse(rawResult);
  if (!parsed.success) {
    console.error("anchor-invalid-result", {
      workflowId,
      resultKind: Array.isArray(rawResult) ? "array" : typeof rawResult,
      issuePaths: parsed.error.issues.map(issue => issue.path.join(".")),
    });
    return { status: "failed", error: "anchor-invalid-result" };
  }
  return { status: "completed", observed: parsed.data };
}

function canonicalHost(value: string) {
  return new URL(value).hostname.toLowerCase().replace(/^www\./, "");
}

function hostsAreRelated(first: string, second: string) {
  const a = canonicalHost(first);
  const b = canonicalHost(second);
  return a === b || a.endsWith(`.${b}`) || b.endsWith(`.${a}`);
}

export function anchorResultMatchesUrl(
  requestedUrl: string,
  observed: AnchorObservedResult
) {
  const evidenceUrls = [
    ...observed.pages_visited.map(page => page.url),
    ...observed.ai_touchpoints.map(touchpoint => touchpoint.source_url),
  ];

  return (
    evidenceUrls.length > 0 &&
    evidenceUrls.every(url => {
      try {
        return hostsAreRelated(requestedUrl, url);
      } catch {
        return false;
      }
    })
  );
}

function scoreOf(detected: ScanFinding[]): number {
  let score = 100;
  for (const finding of detected) {
    if (finding.existingDisclosureFound) continue;
    score -=
      finding.severity === "high"
        ? 40
        : finding.severity === "medium"
          ? 25
          : 10;
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

export function mapAnchorResult(
  url: string,
  observed: AnchorObservedResult
): ScanResult {
  const distinctTouchpoints = observed.ai_touchpoints
    .filter(
      (touchpoint, index, all) =>
        all.findIndex(
          candidate =>
            candidate.name.trim().toLowerCase() ===
              touchpoint.name.trim().toLowerCase() &&
            candidate.source_url === touchpoint.source_url
        ) === index
    )
    .slice(0, 5);
  const detected: ScanFinding[] = distinctTouchpoints.map(
    (touchpoint, index) => ({
      id: findingId(touchpoint.name, index),
      name: touchpoint.name,
      vendor: touchpoint.vendor || "Not identified",
      category: touchpoint.category,
      article: "50",
      severity: touchpoint.severity,
      sourceUrl: touchpoint.source_url,
      evidence: touchpoint.disclosure_text
        ? [
            ...touchpoint.evidence,
            `Visible disclosure: “${touchpoint.disclosure_text}”`,
          ]
        : touchpoint.evidence,
      existingDisclosureFound: touchpoint.disclosure_observed,
    })
  );

  const summary = {
    total: detected.length,
    high: detected.filter(finding => finding.severity === "high").length,
    undisclosed: detected.filter(finding => !finding.existingDisclosureFound)
      .length,
    scannedAt: new Date().toISOString(),
    url,
    scanStatus: observed.scan_status.toLowerCase() as "complete" | "partial",
    pagesVisited: observed.pages_visited,
    blockers: observed.blockers,
    brokenElements: observed.broken_elements.map(item => ({
      url: item.url,
      description: item.description,
    })),
    riskIndicators: observed.risk_indicators.map(item => ({
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
    `Pages inspected: ${summary.pagesVisited.map(page => page.url).join(", ") || "none"}`,
    `AI touchpoints observed: ${summary.total}`,
    "",
    observed.summary ??
      `${detected.length} distinct visitor-facing AI touchpoint${detected.length === 1 ? " was" : "s were"} directly observed on the submitted page.`,
    "",
  ];
  for (const finding of detected) {
    lines.push(
      `[${finding.severity.toUpperCase()}] ${finding.name} (${finding.vendor})`
    );
    lines.push(`Source: ${finding.sourceUrl}`);
    for (const evidence of finding.evidence)
      lines.push(`Evidence: ${evidence}`);
    lines.push(
      `Visible AI disclosure observed: ${finding.existingDisclosureFound ? "yes" : "not observed"}`,
      ""
    );
  }
  if (summary.blockers.length) {
    lines.push("BLOCKERS");
    for (const blocker of summary.blockers) lines.push(`- ${blocker}`);
    lines.push("");
  }
  lines.push(
    "Scope: a fast rendered-page observation of the single URL listed above. This output does not inspect other pages, private systems, or classify the organisation or its systems legally."
  );

  return {
    detected,
    score,
    summary,
    report: lines.join("\n"),
    reachable: true,
  };
}
