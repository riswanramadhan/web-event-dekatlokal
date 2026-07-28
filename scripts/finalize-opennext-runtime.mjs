import { copyFile, readFile, rm, stat } from "node:fs/promises";
import { resolve } from "node:path";

const openNextDirectory = resolve(".open-next");
const bundleDirectory = resolve(openNextDirectory, ".wrangler-bundle");
const bundledWorkerPath = resolve(bundleDirectory, "worker.js");
const productionWorkerPath = resolve(openNextDirectory, "worker.js");

const bundledWorker = await readFile(bundledWorkerPath, "utf8");
const bundledWorkerStats = await stat(bundledWorkerPath);

if (bundledWorkerStats.size < 1_000_000) {
  throw new Error(
    `Wrangler output is unexpectedly small: ${bundledWorkerStats.size} bytes.`,
  );
}

if (!/^import .* from "node:/m.test(bundledWorker)) {
  throw new Error("Wrangler did not convert Node.js modules to ESM imports.");
}

const executableBareRequires =
  bundledWorker.match(/(?<![.\w$])require\s*\(\s*"[^"]+"\s*\)/g) ?? [];

if (executableBareRequires.length > 0) {
  throw new Error(
    `Wrangler left ${executableBareRequires.length} executable CommonJS imports.`,
  );
}

const relativeImports =
  bundledWorker.match(
    /(?:\bfrom\s+|\bimport\s*\()\s*["']\.[^"']*["']/g,
  ) ?? [];

if (relativeImports.length > 0) {
  throw new Error(
    `Wrangler left ${relativeImports.length} relative runtime imports.`,
  );
}

const consoleDimModuleStart = bundledWorker.indexOf("console-dim.external.js");

if (consoleDimModuleStart === -1) {
  throw new Error("Next.js console-dim runtime module was not found.");
}

const consoleDimModule = bundledWorker.slice(
  consoleDimModuleStart,
  consoleDimModuleStart + 6_000,
);

if (/\brequire\(["']node:(?:inspector|fs|path)["']\)/.test(consoleDimModule)) {
  throw new Error(
    "Wrangler left a CommonJS Node.js import in the console-dim runtime.",
  );
}

if (bundledWorker.includes("browser-logs/file-logger.js")) {
  throw new Error("The Next.js development file logger is still bundled.");
}

await copyFile(bundledWorkerPath, productionWorkerPath);
await rm(bundleDirectory, { recursive: true, force: true });

console.log(
  `Prepared a self-contained OpenNext Worker (${bundledWorkerStats.size} bytes).`,
);
