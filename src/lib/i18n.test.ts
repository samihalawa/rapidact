import { describe, expect, it } from "vitest";
import { localizedPath } from "./i18n";

describe("localizedPath", () => {
  it("localizes product and content routes", () => {
    expect(localizedPath("/article-50", "de")).toBe("/de/article-50");
    expect(localizedPath("/vendors/intercom", "fr")).toBe(
      "/fr/vendors/intercom"
    );
    expect(localizedPath("/es/answers/ai-act-deadline-2026", "it")).toBe(
      "/it/answers/ai-act-deadline-2026"
    );
  });

  it("keeps English-only routes canonical", () => {
    expect(localizedPath("/privacy", "es")).toBe("/privacy");
    expect(localizedPath("/de/terms", "fr")).toBe("/terms");
    expect(localizedPath("/requirements/deepfake-labeling", "it")).toBe(
      "/requirements/deepfake-labeling"
    );
  });

  it("keeps public assets canonical and preserves URL suffixes", () => {
    expect(localizedPath("/reports/example.pdf", "de")).toBe(
      "/reports/example.pdf"
    );
    expect(localizedPath("/scanner?utm_source=guide#result", "fr")).toBe(
      "/fr/scanner?utm_source=guide#result"
    );
  });
});
