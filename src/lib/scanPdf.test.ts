import { describe, expect, it } from "vitest";
import type { ScanResult } from "@contracts/types";
import { createScanPdf } from "./scanPdf";

const result: ScanResult = {
  reachable: true,
  score: 62,
  summary: {
    total: 1,
    high: 1,
    undisclosed: 1,
    scannedAt: "2026-07-27T10:00:00.000Z",
    url: "https://example.com",
  },
  detected: [
    {
      id: "chatbot",
      name: "AI chatbot",
      vendor: "Example",
      category: "chat",
      article: "50",
      severity: "high",
      evidence: ["script:example-ai.js"],
      existingDisclosureFound: false,
    },
  ],
  report: "Example report",
};

describe("RapidAct scan PDF", () => {
  it("creates exactly one valid A4 PDF page", () => {
    const pdf = createScanPdf({
      result,
      actionItems: ["Publish a visible AI interaction notice."],
      copy: {
        title: "Public-page AI transparency scan",
        generated: "Generated",
        readiness: "visible readiness / 100",
        findings: "Detected touchpoints",
        actions: "Priority actions",
        scope: "Scope: automated review of one public page.",
        disclosureFound: "Disclosure found",
        disclosureMissing: "Disclosure missing",
      },
    });
    const bytes = new Uint8Array(pdf.output("arraybuffer"));
    const signature = String.fromCharCode(...bytes.slice(0, 4));

    expect(signature).toBe("%PDF");
    expect(pdf.getNumberOfPages()).toBe(1);
    expect(pdf.internal.pageSize.getWidth()).toBeCloseTo(210, 0);
    expect(pdf.internal.pageSize.getHeight()).toBeCloseTo(297, 0);
  });
});
