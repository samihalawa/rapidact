import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";

const root = resolve(import.meta.dirname, "..");
const platform = process.argv[2];
const canonical = readFileSync(resolve(root, "public/rapidact-badge.js"));
const manifest = JSON.parse(
  readFileSync(resolve(root, "public/badge-manifest.json"), "utf8")
);

function read(path) {
  return readFileSync(resolve(root, path), "utf8");
}

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

function expectLocalAsset(path) {
  const asset = readFileSync(resolve(root, path));
  expect(asset.equals(canonical), `${path} does not match the canonical badge`);
}

expect(
  manifest.platforms?.[platform]?.version === "1.0.0",
  `${platform}: manifest version is missing`
);

if (platform === "wordpress") {
  const plugin =
    "integrations/wordpress/rapidact-ai-disclosure/rapidact-ai-disclosure.php";
  const php = read(plugin);
  expectLocalAsset(
    "integrations/wordpress/rapidact-ai-disclosure/assets/rapidact-badge.js"
  );
  for (const required of [
    "Plugin Name: RapidAct AI Disclosure",
    "register_setting(",
    "add_options_page(",
    "'badge_id'",
    "plugins_url( 'assets/rapidact-badge.js'",
    "data-show-credit",
    "RAPIDACT_AI_DISCLOSURE_MANIFEST",
    "WordPress.org updates",
  ]) {
    expect(php.includes(required), `WordPress: missing ${required}`);
  }
  expect(
    !php.includes("https://rapidact.eu/rapidact-badge.js"),
    "WordPress: public pages must not execute the hosted runtime"
  );
  try {
    execFileSync("php", ["-l", resolve(root, plugin)], { stdio: "pipe" });
    process.stdout.write("✓ WordPress PHP syntax\n");
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
    process.stdout.write("– WordPress PHP syntax skipped: php is not installed\n");
  }
}

if (platform === "shopify") {
  const liquid = read(
    "integrations/shopify/extensions/rapidact-badge/blocks/rapidact-badge.liquid"
  );
  const config = read("integrations/shopify/shopify.app.toml");
  expectLocalAsset(
    "integrations/shopify/extensions/rapidact-badge/assets/rapidact-badge.js"
  );
  for (const required of [
    "'rapidact-badge.js' | asset_url",
    "data-badge-id=",
    '"target": "body"',
    "data-show-credit=",
  ]) {
    expect(liquid.includes(required), `Shopify: missing ${required}`);
  }
  for (const required of [
    'api_version = "2026-07"',
    "customers/data_request",
    "customers/redact",
    "shop/redact",
  ]) {
    expect(config.includes(required), `Shopify: missing ${required}`);
  }
  expect(!config.includes("ScriptTag"), "Shopify: ScriptTag must not be used");
}

if (platform === "wix") {
  const hook = read("integrations/wix/src/dashboard/hooks/wix-embeds.ts");
  const html = read(
    "integrations/wix/src/site/embedded-scripts/rapidact/embedded.html"
  );
  expectLocalAsset(
    "integrations/wix/src/site/embedded-scripts/rapidact/assets/rapidact-badge.js"
  );
  expect(hook.includes("embeddedScripts.embedScript"), "Wix: embedScript missing");
  expect(
    html.includes('data-badge-id="{{badgeId}}"') &&
      html.includes(canonical.toString("utf8").trim()),
    "Wix: generated embedded script does not contain the customer ID and runtime"
  );
}

process.stdout.write(
  `✓ ${platform}: bundled badge, customer configuration, and native-version manifest metadata verified\n`
);
