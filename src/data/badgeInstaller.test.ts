import { describe, expect, it } from "vitest";
import { INSTALLER_COPY } from "./badgeInstaller";

describe("badge installer copy", () => {
  it("provides a complete WordPress download path in every language", () => {
    for (const [language, copy] of Object.entries(INSTALLER_COPY)) {
      expect(copy.downloadWordpress, language).toContain(".zip");
      expect(copy.wordpressSteps, language).toHaveLength(3);
      expect(
        copy.wordpressSteps.every(step => step.length > 20),
        language
      ).toBe(true);
      expect(copy.platformLabels.wordpress, language).not.toBe("");
      expect(copy.manualOption, language).not.toBe("");
    }
  });

  it("localizes every platform helper label", () => {
    for (const [language, copy] of Object.entries(INSTALLER_COPY)) {
      expect(Object.keys(copy.platformLabels).sort(), language).toEqual(
        [
          "gtm",
          "html",
          "nextjs",
          "react",
          "shopify",
          "webflow",
          "wix",
          "wordpress",
        ].sort()
      );
    }
  });
});
