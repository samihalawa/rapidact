import { describe, expect, it } from "vitest";
import { INSTALLER_COPY } from "./badgeInstaller";
import { GUIDE_COPY } from "./localizedGuide";

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

  it("presents Wix as one official, non-technical installation path", () => {
    for (const [language, copy] of Object.entries(INSTALLER_COPY)) {
      expect(copy.officialWixApp, language).not.toBe("");
      expect(copy.wixSteps, language).toHaveLength(3);
      expect(copy.platformLabels.wix, language).toBe(copy.officialWixApp);
      expect(copy.locations.wix, language).not.toMatch(
        /custom code|código personalizado|benutzerdefinierter code|code personnalisé|codice personalizzato/i
      );
    }

    for (const [language, copy] of Object.entries(GUIDE_COPY)) {
      expect(copy.installers.wix.body, language).toContain("EU AI Act Badge");
      expect(copy.installers.wix.body, language).not.toMatch(
        /custom code|código personalizado|benutzerdefinierter code|code personnalisé|codice personalizzato/i
      );
    }
  });
});
