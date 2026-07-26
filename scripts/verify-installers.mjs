import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";

const root = resolve(import.meta.dirname, "..");
const canonicalRuntime = "https://rapidact.eu/rapidact-badge.js";
const forbidden = [
  "rapidact-engine.js",
  "rapidact-signatures",
  "CREATE TABLE",
  "license_key",
];
const adapters = [
  {
    name: "WordPress",
    source:
      "integrations/wordpress/rapidact-ai-disclosure/rapidact-ai-disclosure.php",
    archive: "public/downloads/rapidact-wordpress.zip",
    entry: "rapidact-ai-disclosure/rapidact-ai-disclosure.php",
  },
  {
    name: "Shopify",
    source: "integrations/shopify/snippets/rapidact-disclosure.liquid",
    archive: "public/downloads/rapidact-shopify.zip",
    entry: "snippets/rapidact-disclosure.liquid",
  },
  {
    name: "Wix",
    source: "integrations/wix/rapidact-custom-code.html",
    archive: "public/downloads/rapidact-wix.zip",
    entry: "rapidact-custom-code.html",
  },
];

function fail(message) {
  throw new Error(message);
}

for (const adapter of adapters) {
  const source = readFileSync(resolve(root, adapter.source));
  const text = source.toString("utf8");
  const archive = resolve(root, adapter.archive);

  if (!text.includes(canonicalRuntime)) {
    fail(`${adapter.name}: canonical runtime is missing`);
  }
  for (const term of forbidden) {
    if (text.includes(term)) {
      fail(`${adapter.name}: forbidden copied subsystem "${term}" found`);
    }
  }

  execFileSync("unzip", ["-tqq", archive], { stdio: "pipe" });
  const archivedSource = execFileSync("unzip", [
    "-p",
    archive,
    adapter.entry,
  ]);
  if (!source.equals(archivedSource)) {
    fail(`${adapter.name}: ZIP content does not match its source adapter`);
  }

  process.stdout.write(
    `✓ ${adapter.name}: source, ZIP, and hosted runtime match\n`
  );
}

const guide = readFileSync(resolve(root, "src/pages/Guide.tsx"), "utf8");
for (const adapter of adapters) {
  const publicPath = `/${adapter.archive.replace("public/", "")}`;
  if (!guide.includes(publicPath)) {
    fail(`${adapter.name}: direct download is missing from the installer page`);
  }
}

for (const path of [
  "integrations/google-tag-manager/README.md",
  "integrations/cloudflare-zaraz/README.md",
]) {
  const text = readFileSync(resolve(root, path), "utf8");
  if (
    !text.includes(canonicalRuntime) ||
    !text.toLowerCase().includes("no oauth")
  ) {
    fail(`${path}: paste-only hosted runtime contract is missing`);
  }
}

process.stdout.write(
  "✓ GTM and Zaraz: paste-only, OAuth-free hosted runtime paths\n"
);
process.stdout.write("5 adapters verified against one hosted runtime.\n");
