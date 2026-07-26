import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const extension = resolve(
  root,
  "src/site/embedded-scripts/rapidact"
);
const template = readFileSync(
  resolve(extension, "embedded.template.html"),
  "utf8"
);
const runtime = readFileSync(
  resolve(extension, "assets/rapidact-badge.js"),
  "utf8"
);
const brand = readFileSync(
  resolve(extension, "assets/rapidact-exact-symbol.png")
).toString("base64");

const output = template
  .replace("{{RAPIDACT_RUNTIME}}", runtime.trim())
  .replace(
    "{{RAPIDACT_BRAND_DATA_URL}}",
    `data:image/png;base64,${brand}`
  );

writeFileSync(resolve(extension, "embedded.html"), output);
