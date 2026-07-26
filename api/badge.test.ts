import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const badge = readFileSync(resolve(root, "public/rapidact-badge.js"), "utf8");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const config = readFileSync(resolve(root, "src/config.ts"), "utf8");
const manifest = JSON.parse(
  readFileSync(resolve(root, "public/site.webmanifest"), "utf8")
) as {
  theme_color: string;
  background_color: string;
  icons: { src: string; purpose: string }[];
};

describe("RapidAct disclosure badge", () => {
  it("ships as the script used by RapidAct itself", () => {
    expect(html).toContain('src="/rapidact-badge.js"');
    expect(badge).toContain('host.id = "rapidact-ai-disclosure"');
    expect(badge).toContain('button.setAttribute("aria-expanded"');
    expect(badge).toContain("rapidact-exact-symbol.png");
    expect(
      existsSync(resolve(root, "public/brand/rapidact-exact-symbol.png"))
    ).toBe(true);
    expect(html).not.toContain("rapidact-symbol.svg");
    expect(html).toContain('href="/apple-touch-icon.png"');
  });

  it("does not track or persist visitor interactions", () => {
    expect(badge).not.toMatch(/\bfetch\s*\(/);
    expect(badge).not.toContain("XMLHttpRequest");
    expect(badge).not.toContain("localStorage");
    expect(badge).not.toContain("sessionStorage");
    expect(badge).not.toContain("document.cookie");
  });

  it("matches every language offered by the website", () => {
    for (const language of ["en", "es", "de", "fr", "it"]) {
      expect(badge).toContain(`${language}: {`);
    }
    expect(badge).toContain("supportedLanguages.indexOf(pathLanguage)");
  });

  it("uses the exact brand pack across browser and install surfaces", () => {
    expect(html).toContain('href="/favicon.ico"');
    expect(html).toContain('href="/apple-touch-icon.png"');
    expect(html).toContain('content="/browserconfig.xml"');
    expect(html).toContain("rapidact-app-icon-navy-1200x1200.png");
    expect(manifest.theme_color).toBe("#03123D");
    expect(manifest.background_color).toBe("#03123D");
    for (const icon of manifest.icons) {
      expect(existsSync(resolve(root, `public${icon.src}`))).toBe(true);
    }
    expect(manifest.icons.some(icon => icon.purpose === "maskable")).toBe(true);
    for (const supersededAsset of [
      "public/brand/rapidact-horizontal.svg",
      "public/brand/rapidact-symbol.svg",
      "public/brand/rapidact-ai-notice-brand.png",
      "public/social/open-graph-1200x630.png",
    ]) {
      expect(existsSync(resolve(root, supersededAsset))).toBe(false);
    }
  });

  it("uses the requested direct WhatsApp destination", () => {
    expect(config).toContain('whatsapp: "https://wa.me/34679794037"');
  });
});
