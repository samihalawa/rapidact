import { describe, expect, it, vi } from "vitest";
import {
  ANCHOR_SCAN_PROMPT,
  buildAnchorScanRequest,
  mapAnchorResult,
  readAnchorScan,
  startAnchorScan,
} from "./anchor";

const observed = {
  scan_status: "PARTIAL" as const,
  pages_visited: [
    { url: "https://example.com/", title: "Example" },
    { url: "https://example.com/support", title: "Support" },
  ],
  ai_touchpoints: [
    {
      name: "Support assistant",
      vendor: "Example AI",
      category: "chat",
      source_url: "https://example.com/support",
      evidence: ["A visible launcher says Ask our AI assistant"],
      disclosure_observed: true,
      disclosure_text: "You are chatting with an AI assistant",
      severity: "high" as const,
    },
  ],
  broken_elements: [
    {
      url: "https://example.com/support",
      description: "The close button did not respond.",
    },
  ],
  risk_indicators: [
    {
      area: "annex_3" as const,
      source_url: "https://example.com/support",
      evidence: "The page describes automated applicant screening.",
      reason: "The described use warrants human review.",
    },
  ],
  blockers: ["The pricing page required authentication."],
  summary: "Two public pages were inspected and one AI assistant was observed.",
};

describe("Anchor scanner contract", () => {
  it("builds one bounded async browser task with structured output and no legacy task field", () => {
    const request = buildAnchorScanRequest("https://example.com");

    expect(request.url).toBe("https://example.com");
    expect(request.prompt).toBe(ANCHOR_SCAN_PROMPT);
    expect(request.agent).toBe("browser-use");
    expect(request.max_steps).toBe(80);
    expect(request.async).toBe(true);
    expect(request.output_schema.properties.scan_status.enum).toEqual(["COMPLETE", "PARTIAL"]);
    expect(request).not.toHaveProperty("task");
    expect(ANCHOR_SCAN_PROMPT).toContain("at most two additional important same-origin public pages");
    expect(ANCHOR_SCAN_PROMPT).toContain("Never invent or guess a route");
    expect(ANCHOR_SCAN_PROMPT).toContain("Exclude ordinary contact links");
    expect(ANCHOR_SCAN_PROMPT).toContain("Do not invent systems");
  });

  it("reads the current workflow id response shape", async () => {
    const fetchMock = vi.fn(async (...args: Parameters<typeof fetch>) => {
      void args;
      return new Response(
        JSON.stringify({ data: { workflow_id: "77113", status: "running" } }),
        { status: 200 },
      );
    });

    await expect(
      startAnchorScan("https://example.com", "test-key", fetchMock as typeof fetch),
    ).resolves.toBe("77113");
    const init = fetchMock.mock.calls[0]?.[1];
    expect(init).toBeDefined();
    if (!init) throw new Error("missing request init");
    const body = JSON.parse(String(init.body)) as Record<string, unknown>;
    expect(body.prompt).toBe(ANCHOR_SCAN_PROMPT);
    expect(body).not.toHaveProperty("task");
  });

  it("parses a structured completed result returned as a JSON string", async () => {
    const fetchMock = vi.fn(async (...args: Parameters<typeof fetch>) => {
      void args;
      return new Response(
        JSON.stringify({
          status: "COMPLETED",
          result: JSON.stringify(observed),
          data: { status: "COMPLETED" },
        }),
        { status: 200 },
      );
    });

    const state = await readAnchorScan("77113", "test-key", fetchMock as typeof fetch);
    expect(state.status).toBe("completed");
    if (state.status === "completed") {
      expect(state.observed.pages_visited).toHaveLength(2);
      expect(state.observed.blockers).toEqual(["The pricing page required authentication."]);
    }
  });

  it("rejects completed task text instead of generating substitute results", async () => {
    const fetchMock = vi.fn(async (...args: Parameters<typeof fetch>) => {
      void args;
      return new Response(
        JSON.stringify({
          status: "COMPLETED",
          result: "The task encountered an error.",
        }),
        { status: 200 },
      );
    });

    await expect(
      readAnchorScan("77113", "test-key", fetchMock as typeof fetch),
    ).resolves.toEqual({ status: "failed", error: "anchor-invalid-result" });
  });

  it("maps only observed evidence and preserves partial-scan provenance", () => {
    const result = mapAnchorResult("https://example.com/", observed);

    expect(result.summary.engine).toBe("anchor-browser");
    expect(result.summary.scanStatus).toBe("partial");
    expect(result.summary.pagesVisited).toHaveLength(2);
    expect(result.summary.blockers).toHaveLength(1);
    expect(result.detected[0]).toMatchObject({
      name: "Support assistant",
      sourceUrl: "https://example.com/support",
      existingDisclosureFound: true,
    });
    expect(result.report).toContain("Status: PARTIAL");
    expect(result.report).toContain("The pricing page required authentication.");
  });
});
