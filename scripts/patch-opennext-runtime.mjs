import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const target = resolve(
  ".next",
  "standalone",
  "node_modules",
  "next",
  "dist",
  "server",
  "node-environment.js",
);

const developmentLoggerImport =
  'require("./node-environment-extensions/console-file");';
const cloudflareReplacement =
  "// Removed from the production Cloudflare bundle by DekatEvent.";

const source = await readFile(target, "utf8");

if (source.includes(cloudflareReplacement)) {
  console.log("OpenNext runtime patch already applied.");
  process.exit(0);
}

const importCount = source.split(developmentLoggerImport).length - 1;

if (importCount !== 1) {
  throw new Error(
    `Expected one Next.js development file logger import, found ${importCount}.`,
  );
}

await writeFile(
  target,
  source.replace(developmentLoggerImport, cloudflareReplacement),
  "utf8",
);

console.log("Removed the Next.js development file logger from the Worker bundle.");
