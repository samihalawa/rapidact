import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
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

function listFiles(path, prefix = "") {
  return readdirSync(resolve(root, path))
    .flatMap(name => {
      const relative = `${prefix}${name}`;
      const absolute = resolve(root, path, name);
      return statSync(absolute).isDirectory()
        ? listFiles(`${path}/${name}`, `${relative}/`)
        : [relative];
    })
    .sort();
}

expect(
  manifest.schemaVersion === 1 &&
    typeof manifest.badgeVersion === "string" &&
    /^\d+\.\d+\.\d+$/.test(manifest.badgeVersion),
  "public badge manifest metadata is invalid"
);
expect(
  !Object.hasOwn(manifest, "platforms"),
  "public badge manifest must not expose unverified marketplace status"
);

if (platform === "wordpress") {
  const plugin =
    "integrations/wordpress/rapidact-ai-disclosure/rapidact-ai-disclosure.php";
  const php = read(plugin);
  expect(
    php.includes(` * Version: ${manifest.badgeVersion}`),
    "WordPress: plugin version does not match the bundled badge version"
  );
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
  ]) {
    expect(php.includes(required), `WordPress: missing ${required}`);
  }
  expect(
    !php.includes("https://rapidact.eu/rapidact-badge.js"),
    "WordPress: public pages must not execute the hosted runtime"
  );
  expect(
    !php.includes("wp_remote_") &&
      !php.includes("RAPIDACT_AI_DISCLOSURE_MANIFEST"),
    "WordPress: the plugin must not use a custom update or remote-code path"
  );

  const archive = resolve(root, "public/downloads/rapidact-ai-disclosure.zip");
  const sourceDirectory = "integrations/wordpress/rapidact-ai-disclosure";
  const expectedArchiveFiles = listFiles(sourceDirectory).map(
    file => `rapidact-ai-disclosure/${file}`
  );
  const archivedFiles = execFileSync("unzip", ["-Z1", archive], {
    encoding: "utf8",
  })
    .split("\n")
    .filter(file => file && !file.endsWith("/"))
    .sort();
  expect(
    JSON.stringify(archivedFiles) === JSON.stringify(expectedArchiveFiles),
    "WordPress: downloadable ZIP file list does not match plugin source"
  );
  for (const file of listFiles(sourceDirectory)) {
    const archived = execFileSync("unzip", [
      "-p",
      archive,
      `rapidact-ai-disclosure/${file}`,
    ]);
    const sourceFile = readFileSync(resolve(root, sourceDirectory, file));
    expect(
      archived.equals(sourceFile),
      `WordPress: downloadable ZIP differs at ${file}`
    );
  }
  process.stdout.write("✓ WordPress downloadable ZIP matches plugin source\n");

  try {
    execFileSync("php", ["-l", resolve(root, plugin)], { stdio: "pipe" });
    process.stdout.write("✓ WordPress PHP syntax\n");
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
    process.stdout.write(
      "– WordPress PHP syntax skipped: php is not installed\n"
    );
  }
}

if (platform === "shopify") {
  const packageJson = JSON.parse(read("integrations/shopify/package.json"));
  const liquid = read(
    "integrations/shopify/extensions/rapidact-badge/blocks/rapidact-badge.liquid"
  );
  const config = read("integrations/shopify/shopify.app.toml");
  const appLayout = read("integrations/shopify/app/routes/app.tsx");
  const appIndex = read("integrations/shopify/app/routes/app._index.tsx");
  expect(
    packageJson.version === manifest.badgeVersion,
    "Shopify: app version does not match the bundled badge version"
  );
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
    'application_url = "https://connect.rapidact.eu"',
    'api_version = "2026-07"',
    "customers/data_request",
    "customers/redact",
    "shop/redact",
  ]) {
    expect(config.includes(required), `Shopify: missing ${required}`);
  }
  for (const required of [
    "authenticate.admin(request)",
    "<AppProvider embedded apiKey={apiKey}>",
  ]) {
    expect(appLayout.includes(required), `Shopify: missing ${required}`);
  }
  for (const required of [
    "export const action",
    "authenticate.admin(request)",
    'sessionFetcher.submit({}, { method: "post" })',
  ]) {
    expect(
      appIndex.includes(required),
      `Shopify: session-token request missing ${required}`
    );
  }
  expect(!config.includes("ScriptTag"), "Shopify: ScriptTag must not be used");
}

if (platform === "wix") {
  const packageJson = JSON.parse(read("integrations/wix/package.json"));
  const hook = read("integrations/wix/src/dashboard/hooks/wix-embeds.ts");
  const html = read(
    "integrations/wix/src/site/embedded-scripts/rapidact/embedded.html"
  );
  expect(
    packageJson.version === manifest.badgeVersion,
    "Wix: app version does not match the bundled badge version"
  );
  expectLocalAsset(
    "integrations/wix/src/site/embedded-scripts/rapidact/assets/rapidact-badge.js"
  );
  expect(
    hook.includes("embeddedScripts.embedScript"),
    "Wix: embedScript missing"
  );
  expect(
    html.includes('data-badge-id="{{badgeId}}"') &&
      html.includes(canonical.toString("utf8").trim()),
    "Wix: generated embedded script does not contain the customer ID and runtime"
  );
}

process.stdout.write(
  `✓ ${platform}: bundled badge, customer configuration, local package version, and public badge metadata verified\n`
);
