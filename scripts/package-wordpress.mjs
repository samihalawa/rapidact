import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const pluginName = "rapidact-ai-disclosure";
const source = resolve(root, "integrations/wordpress", pluginName);
const outputDirectory = resolve(root, "public/downloads");
const output = resolve(outputDirectory, `${pluginName}.zip`);
const stagingRoot = mkdtempSync(join(tmpdir(), "rapidact-wordpress-"));

try {
  const stagedPlugin = resolve(stagingRoot, pluginName);
  cpSync(source, stagedPlugin, { recursive: true });
  mkdirSync(outputDirectory, { recursive: true });
  rmSync(output, { force: true });
  execFileSync("zip", ["-X", "-q", "-r", output, pluginName], {
    cwd: stagingRoot,
  });
  process.stdout.write(`✓ WordPress package created: ${output}\n`);
} finally {
  rmSync(stagingRoot, { force: true, recursive: true });
}
