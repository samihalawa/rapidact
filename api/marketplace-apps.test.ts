import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const read = (path: string) => readFileSync(resolve(root, path), "utf8");
const runtime = read("public/rapidact-badge.js");

describe("RapidAct marketplace apps", () => {
  it("bundles the same runtime in WordPress, Shopify, and Wix", () => {
    for (const path of [
      "integrations/wordpress/rapidact-ai-disclosure/assets/rapidact-badge.js",
      "integrations/shopify/extensions/rapidact-badge/assets/rapidact-badge.js",
      "integrations/wix/src/site/embedded-scripts/rapidact/assets/rapidact-badge.js",
    ]) {
      expect(read(path)).toBe(runtime);
    }
  });

  it("keeps the manifest informational and platform releases native", () => {
    const manifest = JSON.parse(read("public/badge-manifest.json"));
    expect(manifest.badgeVersion).toBe("1.0.0");
    expect(JSON.stringify(manifest)).not.toContain("downloadUrl");
    expect(JSON.stringify(manifest)).not.toContain("scriptUrl");
    expect(JSON.stringify(manifest)).not.toContain("market");
    expect(JSON.stringify(manifest)).not.toContain("pending");
  });

  it("offers the WordPress package and keeps direct code alternatives", () => {
    const source = [
      read("src/pages/Guide.tsx"),
      read("src/pages/PlatformPage.tsx"),
      read("src/data/platforms.ts"),
      read("src/components/BadgeInstallDashboard.tsx"),
      read("src/lib/badgeInstaller.ts"),
    ].join("\n");
    expect(source).toContain("/downloads/rapidact-ai-disclosure.zip");
    expect(source).toContain("badge_installer_download");
    expect(source).toContain("Google Tag Manager");
    expect(source).toContain("https://rapidact.eu/rapidact-badge.js");
    expect(source).toContain("manualFallback");
  });

  it("ships a local preview and all real display modes", () => {
    const preview = read("public/badge-preview.html");
    expect(preview).toContain('new URL("/rapidact-badge.js"');
    for (const display of ["bubble", "standard", "popup"]) {
      expect(runtime).toContain(`"${display}"`);
    }
    expect(runtime).toContain("targetSelector");
    expect(runtime).toContain("ra-backdrop");
  });
});
