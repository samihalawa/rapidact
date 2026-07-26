import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const canonicalRuntime = "https://rapidact.eu/rapidact-badge.js";

const wordpress = readFileSync(
  resolve(
    root,
    "integrations/wordpress/rapidact-ai-disclosure/rapidact-ai-disclosure.php"
  ),
  "utf8"
);
const shopify = readFileSync(
  resolve(root, "integrations/shopify/snippets/rapidact-disclosure.liquid"),
  "utf8"
);
const wix = readFileSync(
  resolve(root, "integrations/wix/rapidact-custom-code.html"),
  "utf8"
);
const googleTagManager = readFileSync(
  resolve(root, "integrations/google-tag-manager/README.md"),
  "utf8"
);
const cloudflareZaraz = readFileSync(
  resolve(root, "integrations/cloudflare-zaraz/README.md"),
  "utf8"
);
const guide = readFileSync(resolve(root, "src/pages/Guide.tsx"), "utf8");

describe("RapidAct platform installers", () => {
  it("uses one canonical hosted runtime on every platform", () => {
    for (const adapter of [
      wordpress,
      shopify,
      wix,
      googleTagManager,
      cloudflareZaraz,
    ]) {
      expect(adapter).toContain(canonicalRuntime);
      expect(adapter).not.toContain("rapidact-engine.js");
      expect(adapter).not.toContain("rapidact-signatures");
    }
  });

  it("keeps unified installers paste-based and OAuth-free", () => {
    expect(googleTagManager).toContain("Custom HTML");
    expect(googleTagManager).toContain("Initialization – All Pages");
    expect(cloudflareZaraz).toContain("Custom HTML");
    for (const adapter of [googleTagManager, cloudflareZaraz]) {
      expect(adapter.toLowerCase()).toContain("no oauth");
    }
  });

  it("keeps the WordPress plugin native and compact", () => {
    expect(wordpress).toContain("Plugin Name: RapidAct AI Disclosure");
    expect(wordpress).toContain("register_setting(");
    expect(wordpress).toContain("sanitize_callback");
    expect(wordpress).toContain("add_options_page(");
    expect(wordpress).toContain("add_action( 'wp_footer'");
    expect(wordpress).not.toContain("CREATE TABLE");
    expect(wordpress).not.toContain("license_key");
    expect(wordpress).not.toContain("evidence");
  });

  it("passes Shopify's active storefront language to the hosted runtime", () => {
    expect(shopify).toContain("request.locale.iso_code");
    expect(shopify).toContain("data-language=");
    expect(shopify).toContain("data-details-url=");
  });

  it("ships direct downloads from the localized installer page", () => {
    for (const platform of ["wordpress", "shopify", "wix"]) {
      expect(
        existsSync(resolve(root, `public/downloads/rapidact-${platform}.zip`))
      ).toBe(true);
      expect(guide).toContain(`/downloads/rapidact-${platform}.zip`);
    }
    expect(guide).toContain('track("platform_installer_download"');
  });
});
