const fs = require("fs");

const SOURCE = "docs/week-4-assessment/nilai-pre-post-test-2026-08-10.csv";
const TARGET = "public/week-4/AI_CoCreation_Lab_PrePost_Public_Evidence.csv";

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (c === '"') {
        quoted = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      quoted = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c !== "\r") {
      field += c;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.length > 1 && r.some((v) => v !== ""));
}

const quote = (v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

const rows = parseCsv(fs.readFileSync(SOURCE, "utf8"));
const header = rows[0];
const data = rows.slice(1);

// Drop the direct identifier and the two columns that carry no variation.
const dropped = ["Nama", "Jenis", "Status"];
const keptIdx = header
  .map((h, i) => i)
  .filter((i) => !dropped.includes(header[i]));

const kPreIdx = header.indexOf("Pemahaman pre (0-100)");
const cPreIdx = header.indexOf("Kapabilitas pre (1-5)");
const pct = (v) => Number(String(v).match(/^(\d+)%/)?.[1] ?? 0);

// Re-order by baseline scores rather than by name, so the participant codes
// do not simply mirror the alphabetical roster.
const ordered = [...data].sort((a, b) => {
  const byKnowledge = pct(a[kPreIdx]) - pct(b[kPreIdx]);
  if (byKnowledge !== 0) return byKnowledge;
  return Number(a[cPreIdx]) - Number(b[cPreIdx]);
});

// Subgroup labels are intentionally excluded from the public file. The named
// source is required to recalculate them whenever the technical-core roster is
// corrected; publishing a stale anonymized label would be misleading.
const outHeader = ["Peserta", ...keptIdx.map((i) => header[i])];
const outRows = ordered.map((r, n) => {
  const code = `P${String(n + 1).padStart(2, "0")}`;
  return [code, ...keptIdx.map((i) => r[i])];
});

const csv =
  [outHeader, ...outRows].map((r) => r.map(quote).join(",")).join("\r\n") +
  "\r\n";

fs.writeFileSync(TARGET, csv, "utf8");

console.log("wrote", TARGET);
console.log("rows", outRows.length, "columns", outHeader.length);
console.log("dropped columns:", dropped.join(", "));
