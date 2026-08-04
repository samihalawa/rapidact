import { describe, expect, it, vi } from "vitest";
import {
  ANCHOR_SCAN_PROMPT,
  anchorResultMatchesUrl,
  buildAnchorScanRequest,
  mapAnchorResult,
  readAnchorScan,
  startAnchorScan,
} from "./anchor";

const observed = {
  scan_status: "PARTIAL" as const,
  pages_visited: [{ url: "https://example.com/", title: "Example" }],
  ai_touchpoints: [
    {
      name: "Support assistant",
      vendor: "Example AI",
      category: "chat",
      source_url: "https://example.com/",
      evidence: ["A visible launcher says Ask our AI assistant"],
      disclosure_observed: true,
      disclosure_text: "You are chatting with an AI assistant",
      severity: "high" as const,
    },
  ],
  broken_elements: [
    {
      url: "https://example.com/",
      description: "The close button did not respond.",
    },
  ],
  risk_indicators: [
    {
      area: "annex_3" as const,
      source_url: "https://example.com/",
      evidence: "The page describes automated applicant screening.",
      reason: "The described use warrants human review.",
    },
  ],
  blockers: ["The pricing page required authentication."],
  summary: "One public page was inspected and one AI assistant was observed.",
};

describe("Anchor scanner contract", () => {
  it("builds one bounded async browser task with structured output and no legacy task field", () => {
    const request = buildAnchorScanRequest("https://example.com");

    expect(request.url).toBe("https://example.com");
    expect(request.prompt).toBe(ANCHOR_SCAN_PROMPT);
    expect(request.agent).toBe("gemini-computer-use");
    expect(request).not.toHaveProperty("provider");
    expect(request).not.toHaveProperty("model");
    expect(request.detect_elements).toBe(false);
    expect(request.max_steps).toBe(4);
    expect(request.async).toBe(true);
    expect(request.output_schema.properties.pages_visited.maxItems).toBe(1);
    expect(request.output_schema.properties.ai_touchpoints.maxItems).toBe(5);
    expect(request.output_schema.properties.scan_status.enum).toEqual([
      "COMPLETE",
      "PARTIAL",
    ]);
    expect(request).not.toHaveProperty("task");
    expect(ANCHOR_SCAN_PROMPT).toContain("only the supplied rendered page");
    expect(ANCHOR_SCAN_PROMPT).toContain("Do not click, navigate, submit");
    expect(ANCHOR_SCAN_PROMPT).toContain("are never AI touchpoints");
    expect(ANCHOR_SCAN_PROMPT).toContain("no more than five distinct");
    expect(ANCHOR_SCAN_PROMPT).toContain("scroll this same page only");
    expect(ANCHOR_SCAN_PROMPT).toContain("Never infer systems");
  });

  it("reads the current workflow id response shape", async () => {
    const fetchMock = vi.fn(async (...args: Parameters<typeof fetch>) => {
      void args;
      return new Response(
        JSON.stringify({ data: { workflow_id: "77113", status: "running" } }),
        { status: 200 }
      );
    });

    await expect(
      startAnchorScan(
        "https://example.com",
        "test-key",
        fetchMock as typeof fetch
      )
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
        { status: 200 }
      );
    });

    const state = await readAnchorScan(
      "77113",
      "test-key",
      fetchMock as typeof fetch
    );
    expect(state.status).toBe("completed");
    if (state.status === "completed") {
      expect(state.observed.pages_visited).toHaveLength(1);
      expect(state.observed.blockers).toEqual([
        "The pricing page required authentication.",
      ]);
    }
  });

  it("accepts the null optional disclosure text returned by Gemini", async () => {
    const withNullDisclosure = {
      ...observed,
      ai_touchpoints: [
        {
          ...observed.ai_touchpoints[0],
          disclosure_observed: false,
          disclosure_text: null,
        },
      ],
    };
    const fetchMock = vi.fn(async (...args: Parameters<typeof fetch>) => {
      void args;
      return new Response(
        JSON.stringify({
          status: "COMPLETED",
          result: JSON.stringify(withNullDisclosure),
        }),
        { status: 200 }
      );
    });

    const state = await readAnchorScan(
      "78007",
      "test-key",
      fetchMock as typeof fetch
    );

    expect(state.status).toBe("completed");
    if (state.status === "completed") {
      expect(state.observed.ai_touchpoints[0].disclosure_text).toBeUndefined();
    }
  });

  it("accepts a completed result nested under data", async () => {
    const fetchMock = vi.fn(async (...args: Parameters<typeof fetch>) => {
      void args;
      return new Response(
        JSON.stringify({
          data: {
            status: "COMPLETED",
            result: JSON.stringify(observed),
          },
        }),
        { status: 200 }
      );
    });

    const state = await readAnchorScan(
      "78008",
      "test-key",
      fetchMock as typeof fetch
    );

    expect(state.status).toBe("completed");
  });

  it("unwraps the native computer-use success envelope", async () => {
    const leanObserved = {
      scan_status: "COMPLETE",
      pages_visited: observed.pages_visited,
      ai_touchpoints: observed.ai_touchpoints,
      blockers: [],
    };
    const fetchMock = vi.fn(async (...args: Parameters<typeof fetch>) => {
      void args;
      return new Response(
        JSON.stringify({
          status: "COMPLETED",
          result: {
            status: "success",
            result: JSON.stringify(leanObserved),
            steps: 2,
          },
        }),
        { status: 200 }
      );
    });

    const state = await readAnchorScan(
      "86750",
      "test-key",
      fetchMock as typeof fetch
    );

    expect(state.status).toBe("completed");
    if (state.status === "completed") {
      expect(state.observed.broken_elements).toEqual([]);
      expect(state.observed.risk_indicators).toEqual([]);
      expect(state.observed.summary).toBeUndefined();
    }
  });

  it("preserves a failed provider task as a stable scanner error", async () => {
    const fetchMock = vi.fn(async (...args: Parameters<typeof fetch>) => {
      void args;
      return new Response(
        JSON.stringify({
          status: "FAILED",
          error: "Failed to execute tool",
          data: { status: "FAILED", error: "Failed to execute tool" },
        }),
        { status: 200 }
      );
    });

    await expect(
      readAnchorScan("86745", "test-key", fetchMock as typeof fetch)
    ).resolves.toEqual({ status: "failed", error: "anchor-task-failed" });
  });

  it("rejects results whose observed host does not match the requested host", () => {
    expect(anchorResultMatchesUrl("https://www.example.com", observed)).toBe(
      true
    );
    expect(
      anchorResultMatchesUrl("https://deepswapai.io", {
        ...observed,
        pages_visited: [{ url: "https://oulang.ai", title: "Oulang" }],
        ai_touchpoints: [],
      })
    ).toBe(false);
  });

  it("rejects completed task text instead of generating substitute results", async () => {
    const fetchMock = vi.fn(async (...args: Parameters<typeof fetch>) => {
      void args;
      return new Response(
        JSON.stringify({
          status: "COMPLETED",
          result: "The task encountered an error.",
        }),
        { status: 200 }
      );
    });

    await expect(
      readAnchorScan("77113", "test-key", fetchMock as typeof fetch)
    ).resolves.toEqual({ status: "failed", error: "anchor-invalid-result" });
  });

  it("maps only observed evidence and preserves partial-scan provenance", () => {
    const result = mapAnchorResult("https://example.com/", observed);

    expect(result.summary.engine).toBe("anchor-browser");
    expect(result.summary.scanStatus).toBe("partial");
    expect(result.summary.pagesVisited).toHaveLength(1);
    expect(result.summary.blockers).toHaveLength(1);
    expect(result.detected[0]).toMatchObject({
      name: "Support assistant",
      sourceUrl: "https://example.com/",
      existingDisclosureFound: true,
    });
    expect(result.report).toContain("Status: PARTIAL");
    expect(result.report).toContain(
      "The pricing page required authentication."
    );
  });

  it("deduplicates findings and caps the public result at five", () => {
    const manyTouchpoints = Array.from({ length: 7 }, (_, index) => ({
      ...observed.ai_touchpoints[0],
      name: index < 2 ? "Support assistant" : `AI control ${index}`,
    }));

    const result = mapAnchorResult("https://example.com/", {
      ...observed,
      ai_touchpoints: manyTouchpoints,
    });

    expect(result.detected).toHaveLength(5);
    expect(
      result.detected.filter(finding => finding.name === "Support assistant")
    ).toHaveLength(1);
    expect(result.summary.total).toBe(5);
  });
});
