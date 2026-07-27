import { describe, expect, it } from "vitest";
import {
  BADGE_SCRIPT_URL,
  buildBadgeSnippet,
  type BadgeDisplay,
  type BadgePlatform,
} from "./badgeInstaller";

const platforms: BadgePlatform[] = [
  "wordpress",
  "shopify",
  "wix",
  "html",
  "react",
  "nextjs",
  "gtm",
  "webflow",
];
const displays: BadgeDisplay[] = ["bubble", "standard", "popup", "iframe"];

describe("badge installer snippets", () => {
  it("generates a complete snippet for every platform and display", () => {
    for (const platform of platforms) {
      for (const display of displays) {
        const snippet = buildBadgeSnippet({
          platform,
          display,
          language: "es",
          message: "Este sitio utiliza IA.",
        });

        expect(snippet).toContain("rapidact");
        expect(snippet).not.toContain("undefined");
        expect(snippet).not.toContain("TODO");
        if (display === "iframe") {
          expect(snippet).toContain("badge-preview.html");
        } else {
          expect(snippet).toContain(BADGE_SCRIPT_URL);
          expect(snippet).toContain(`"${display}"`);
        }
      }
    }
  });

  it("adds a real inline mount point for the standard display", () => {
    const snippet = buildBadgeSnippet({
      platform: "html",
      display: "standard",
      language: "en",
      message: "AI notice",
    });

    expect(snippet).toContain('id="rapidact-notice"');
    expect(snippet).toContain('data-target="#rapidact-notice"');
  });

  it("generates client-safe React and Next.js adapters", () => {
    const react = buildBadgeSnippet({
      platform: "react",
      display: "bubble",
      language: "en",
      message: "AI notice",
    });
    const next = buildBadgeSnippet({
      platform: "nextjs",
      display: "popup",
      language: "en",
      message: "AI notice",
    });

    expect(react).toContain('import { useEffect } from "react"');
    expect(next).toMatch(/^"use client";/);
    expect(next).toContain('script.dataset.display = "popup"');
  });
});
