import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const extension = resolve(root, "src/site/embedded-scripts/rapidact");
const html = readFileSync(resolve(extension, "embedded.html"), "utf8");
const runtime = readFileSync(
  resolve(extension, "assets/rapidact-badge.js"),
  "utf8"
).trim();

for (const expected of [
  'data-badge-id="{{badgeId}}"',
  'data-language="{{language}}"',
  'data-show-credit="false"',
  "data:image/png;base64,",
  runtime,
]) {
  if (!html.includes(expected)) {
    throw new Error(`Wix embedded script is missing: ${expected.slice(0, 80)}`);
  }
}

process.stdout.write(
  "✓ Wix embedded script contains the bundled runtime, image, and customer parameters\n"
);
