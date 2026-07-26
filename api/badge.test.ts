import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const badge = readFileSync(resolve(root, "public/rapidact-badge.js"), "utf8");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const config = readFileSync(resolve(root, "src/config.ts"), "utf8");

describe("RapidAct disclosure badge", () => {
  it("ships as the script used by RapidAct itself", () => {
    expect(html).toContain('src="/rapidact-badge.js"');
    expect(badge).toContain('host.id = "rapidact-ai-disclosure"');
    expect(badge).toContain('button.setAttribute("aria-expanded"');
    expect(badge).toContain("rapidact-ai-notice-brand.png");
    expect(
      existsSync(resolve(root, "public/brand/rapidact-ai-notice-brand.png"))
    ).toBe(true);
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

  it("uses the requested direct WhatsApp destination", () => {
    expect(config).toContain('whatsapp: "https://wa.me/34679794037"');
  });
});
