const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const sharp = require("sharp");

const { meta, sections, closing } = require("./playbook-content.js");

const ROOT = path.resolve(__dirname, "../..");
const MD_DOCS = path.join(ROOT, "docs/playbook/AI_Co-Creation_Lab_Playbook_v1.0.md");
const MD_PUBLIC = path.join(ROOT, "public/downloads/AI_Co-Creation_Lab_Playbook_v1.0.md");
const PDF_OUT = path.join(ROOT, "public/downloads/AI_Co-Creation_Lab_Playbook_v1.0.pdf");

const BRAND = "#0255f5";
const BRAND_DARK = "#012262";
const INK = "#0f172a";
const BODY = "#334155";
const MUTED = "#64748b";
const LINE = "#e2e8f0";
const SOFT = "#f1f5f9";

/* -------------------------------------------------------------------------- */
/* Markdown                                                                   */
/* -------------------------------------------------------------------------- */

function toMarkdown() {
  const out = [];
  out.push(`# ${meta.title}`);
  out.push(`## ${meta.subtitle}`);
  out.push("");
  out.push(`**Based on:** ${meta.basedOn}  `);
  out.push(`**Organized by:** ${meta.organizedBy}  `);
  out.push(`**${meta.version}** — ${meta.date}`);
  out.push("");
  out.push(`> **${meta.tagline}**`);
  out.push("");
  out.push("---");
  out.push("");
  out.push("## Daftar Isi");
  out.push("");
  for (const s of sections) out.push(`${s.n}. ${s.title}`);
  out.push("");
  out.push("---");
  out.push("");

  for (const s of sections) {
    out.push(`# ${s.n}. ${s.title}`);
    out.push("");
    for (const b of s.blocks) {
      if (b.t === "p") {
        out.push(b.v, "");
      } else if (b.t === "h") {
        out.push(`### ${b.v}`, "");
      } else if (b.t === "ul") {
        for (const i of b.v) out.push(`- ${i}`);
        out.push("");
      } else if (b.t === "ol") {
        b.v.forEach((i, idx) => out.push(`${idx + 1}. ${i}`));
        out.push("");
      } else if (b.t === "check") {
        for (const i of b.v) out.push(`- [ ] ${i}`);
        out.push("");
      } else if (b.t === "quote") {
        out.push(`> **${b.v}**`, "");
      } else if (b.t === "note") {
        out.push(`> _${b.v}_`, "");
      } else if (b.t === "kv") {
        out.push("| Bagian | Isi |", "|---|---|");
        for (const [k, v] of b.v) out.push(`| ${k} | ${v} |`);
        out.push("");
      } else if (b.t === "table") {
        out.push(`| ${b.headers.join(" | ")} |`);
        out.push(`|${b.headers.map(() => "---").join("|")}|`);
        for (const r of b.rows) out.push(`| ${r.join(" | ")} |`);
        out.push("");
      } else if (b.t === "diagram") {
        out.push(
          "`Technology Sustainability → Human Sustainability → Impact Sustainability → Program Sustainability`",
          "",
        );
      }
    }
    out.push("---", "");
  }

  out.push(`# ${closing.title}`, "");
  for (const p of closing.paragraphs) out.push(p, "");
  out.push(`> **${closing.statement}**`, "");
  out.push(`> **${closing.cta}**`, "");

  return out.join("\n");
}

/* -------------------------------------------------------------------------- */
/* PDF                                                                        */
/* -------------------------------------------------------------------------- */

async function jpeg(relPath, width) {
  const buf = await sharp(path.join(ROOT, relPath))
    .resize({ width, withoutEnlargement: true })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 82 })
    .toBuffer();
  return buf;
}

async function buildPdf() {
  const M = 56;
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: M, bottom: M + 14, left: M, right: M },
    bufferPages: true,
    info: {
      Title: meta.title,
      Author: "DekatLokal",
      Subject: meta.subtitle,
      Keywords: "AI Co-Creation Lab, UMKM, replication, playbook, DekatLokal",
    },
  });

  const stream = fs.createWriteStream(PDF_OUT);
  doc.pipe(stream);

  const W = doc.page.width;
  const CW = W - M * 2;
  let pageIndex = 0;
  doc.on("pageAdded", () => {
    pageIndex += 1;
  });

  const coverPhoto = await jpeg("public/week-3/documentation/hands-on-building.webp", 1200);
  const pilotPhotos = [
    await jpeg("public/week-3/documentation/student-umkm-discussion.webp", 700),
    await jpeg("public/week-3/documentation/team-pitching.webp", 700),
  ];
  const systemShots = [];
  for (const f of [
    "eyfa-natural-oil",
    "sukmajahe-sarabba",
    "markisa-bintang-jaya",
    "kira-kira-michi",
    "dapur-andist",
  ]) {
    systemShots.push(await jpeg(`public/week-3/prototypes/${f}.webp`, 760));
  }

  /* ---- Cover ---- */
  doc.rect(0, 0, W, 8).fill(BRAND);
  doc.fillColor(BRAND).font("Helvetica-Bold").fontSize(9);
  doc.text("DEKATLOKAL", M, 70, { characterSpacing: 2 });
  doc.fillColor(MUTED).font("Helvetica").fontSize(9);
  doc.text("AI CO-CREATION LAB", M, 84, { characterSpacing: 1.4 });

  doc.fillColor(INK).font("Helvetica-Bold").fontSize(34);
  doc.text(meta.title, M, 140, { width: CW, lineGap: 4 });
  doc.fillColor(BRAND_DARK).font("Helvetica").fontSize(15);
  doc.text(meta.subtitle, M, doc.y + 10, { width: CW, lineGap: 3 });

  doc.image(coverPhoto, M, doc.y + 28, { width: CW });

  const metaTop = doc.page.height - 210;
  doc.rect(M, metaTop, CW, 1).fill(LINE);
  const cols = [
    ["Based on", meta.basedOn],
    ["Organized by", meta.organizedBy],
    ["Version", `${meta.version} — ${meta.date}`],
  ];
  cols.forEach(([k, v], i) => {
    const x = M + (CW / 3) * i;
    doc.fillColor(MUTED).font("Helvetica-Bold").fontSize(7.5);
    doc.text(k.toUpperCase(), x, metaTop + 16, { width: CW / 3 - 10, characterSpacing: 1 });
    doc.fillColor(INK).font("Helvetica-Bold").fontSize(10);
    doc.text(v, x, metaTop + 30, { width: CW / 3 - 10 });
  });

  doc.fillColor(BRAND).font("Helvetica-Bold").fontSize(16);
  doc.text(meta.tagline, M, metaTop + 82, { width: CW });
  doc.fillColor(MUTED).font("Helvetica").fontSize(9);
  doc.text(
    "Dokumen ini dapat dipakai ulang dan disesuaikan oleh institusi lain yang ingin menjalankan model serupa.",
    M,
    metaTop + 108,
    { width: CW },
  );

  /* ---- TOC placeholder ---- */
  doc.addPage();
  const tocPageIndex = pageIndex;

  /* ---- Body ---- */
  const starts = new Map();

  function ensure(space) {
    if (doc.y + space > doc.page.height - M - 20) doc.addPage();
  }

  function heading(text) {
    ensure(46);
    doc.moveDown(0.4);
    doc.fillColor(BRAND_DARK).font("Helvetica-Bold").fontSize(12.5);
    doc.text(text, { width: CW });
    doc.moveDown(0.35);
  }

  function para(text) {
    ensure(34);
    doc.fillColor(BODY).font("Helvetica").fontSize(10);
    doc.text(text, { width: CW, align: "justify", lineGap: 2.6 });
    doc.moveDown(0.6);
  }

  function bullets(items, ordered, check) {
    doc.fillColor(BODY).font("Helvetica").fontSize(10);
    items.forEach((item, i) => {
      ensure(28);
      const marker = ordered ? `${i + 1}.` : check ? "[  ]" : "•";
      const mw = ordered ? 18 : check ? 22 : 12;
      const y0 = doc.y;
      doc.fillColor(check ? MUTED : BRAND).font("Helvetica-Bold").fontSize(10);
      doc.text(marker, M, y0, { width: mw, continued: false });
      doc.fillColor(BODY).font("Helvetica").fontSize(10);
      doc.text(item, M + mw, y0, { width: CW - mw, lineGap: 2.2 });
      doc.moveDown(0.28);
    });
    doc.moveDown(0.4);
  }

  function quote(text) {
    doc.fillColor(BRAND_DARK).font("Helvetica-Bold").fontSize(11);
    const h = doc.heightOfString(text, { width: CW - 22, lineGap: 3 }) + 18;
    ensure(h + 10);
    const y0 = doc.y;
    doc.rect(M, y0, 3, h).fill(BRAND);
    doc.fillColor(BRAND_DARK).font("Helvetica-Bold").fontSize(11);
    doc.text(text, M + 16, y0 + 9, { width: CW - 22, lineGap: 3 });
    doc.y = y0 + h + 8;
  }

  function note(text) {
    doc.font("Helvetica-Oblique").fontSize(9);
    const h = doc.heightOfString(text, { width: CW - 24, lineGap: 2.4 }) + 20;
    ensure(h + 8);
    const y0 = doc.y;
    doc.rect(M, y0, CW, h).fillAndStroke(SOFT, LINE);
    doc.fillColor(MUTED).font("Helvetica-Oblique").fontSize(9);
    doc.text(text, M + 12, y0 + 10, { width: CW - 24, lineGap: 2.4 });
    doc.y = y0 + h + 10;
  }

  function table(headers, rows) {
    const n = headers.length;
    const weights =
      n === 2 ? [0.34, 0.66] : n === 3 ? [0.26, 0.3, 0.44] : [0.22, 0.26, 0.24, 0.28];
    const widths = weights.slice(0, n).map((w) => CW * w);
    const scale = CW / widths.reduce((a, b) => a + b, 0);
    const cw = widths.map((w) => w * scale);
    const pad = 7;

    function drawHead() {
      const hh = 22;
      ensure(hh + 24);
      const y0 = doc.y;
      doc.rect(M, y0, CW, hh).fill("#ebf1fe");
      doc.fillColor(BRAND_DARK).font("Helvetica-Bold").fontSize(8.6);
      let x = M;
      headers.forEach((h, i) => {
        doc.text(h, x + pad, y0 + 7, { width: cw[i] - pad * 2 });
        x += cw[i];
      });
      doc.y = y0 + hh;
    }

    drawHead();

    rows.forEach((row, ri) => {
      doc.font("Helvetica").fontSize(8.8);
      const heights = row.map((cell, i) =>
        doc.heightOfString(String(cell), { width: cw[i] - pad * 2, lineGap: 1.8 }),
      );
      const rh = Math.max(...heights) + pad * 2;

      if (doc.y + rh > doc.page.height - M - 20) {
        doc.addPage();
        drawHead();
      }

      const y0 = doc.y;
      if (ri % 2 === 1) doc.rect(M, y0, CW, rh).fill("#f8fafc");
      doc.fillColor(BODY).font("Helvetica").fontSize(8.8);
      let x = M;
      row.forEach((cell, i) => {
        doc.text(String(cell), x + pad, y0 + pad, {
          width: cw[i] - pad * 2,
          lineGap: 1.8,
        });
        x += cw[i];
      });
      doc
        .moveTo(M, y0 + rh)
        .lineTo(M + CW, y0 + rh)
        .strokeColor(LINE)
        .lineWidth(0.5)
        .stroke();
      doc.y = y0 + rh;
    });

    doc.moveDown(0.8);
  }

  function keyValues(pairs) {
    table(["Bagian", "Isi"], pairs);
  }

  function sustainabilityDiagram() {
    const boxes = [
      ["Technology", "Sistem tetap hidup"],
      ["Human", "Builder menjadi steward"],
      ["Impact", "Pemakaian dipantau"],
      ["Program", "Model dapat diulang"],
    ];
    const gap = 10;
    const bw = (CW - gap * 3) / 4;
    const bh = 62;
    ensure(bh + 26);
    const y0 = doc.y + 4;
    boxes.forEach((b, i) => {
      const x = M + (bw + gap) * i;
      doc.roundedRect(x, y0, bw, bh, 8).fillAndStroke("#ebf1fe", "#b7cffc");
      doc.fillColor(BRAND_DARK).font("Helvetica-Bold").fontSize(9.5);
      doc.text(b[0], x + 9, y0 + 12, { width: bw - 18 });
      doc.fillColor(MUTED).font("Helvetica").fontSize(8);
      doc.text(b[1], x + 9, y0 + 28, { width: bw - 18, lineGap: 1.5 });
      if (i < 3) {
        doc.fillColor("#94a3b8").font("Helvetica-Bold").fontSize(11);
        doc.text(">", x + bw + 1.5, y0 + bh / 2 - 7, { width: gap });
      }
    });
    doc.y = y0 + bh + 14;
  }

  function imageRow(buffers, width) {
    const gap = 10;
    const iw = (CW - gap * (buffers.length - 1)) / buffers.length;
    ensure(iw * 0.62 + 16);
    const y0 = doc.y + 2;
    let maxH = 0;
    buffers.forEach((b, i) => {
      const x = M + (iw + gap) * i;
      doc.image(b, x, y0, { width: iw });
      const h = doc.openImage(b);
      maxH = Math.max(maxH, (iw / h.width) * h.height);
    });
    doc.y = y0 + maxH + 12;
    void width;
  }

  for (const s of sections) {
    doc.addPage();
    starts.set(s.n, pageIndex);

    doc.fillColor(BRAND).font("Helvetica-Bold").fontSize(9);
    doc.text(`BAB ${String(s.n).padStart(2, "0")}`, M, M, { characterSpacing: 1.6 });
    doc.fillColor(INK).font("Helvetica-Bold").fontSize(20);
    doc.text(s.title, M, doc.y + 4, { width: CW, lineGap: 2 });
    doc
      .moveTo(M, doc.y + 10)
      .lineTo(M + 54, doc.y + 10)
      .strokeColor(BRAND)
      .lineWidth(2.5)
      .stroke();
    doc.y += 24;

    for (const b of s.blocks) {
      if (b.t === "p") para(b.v);
      else if (b.t === "h") heading(b.v);
      else if (b.t === "ul") bullets(b.v, false, false);
      else if (b.t === "ol") bullets(b.v, true, false);
      else if (b.t === "check") bullets(b.v, false, true);
      else if (b.t === "quote") quote(b.v);
      else if (b.t === "note") note(b.v);
      else if (b.t === "kv") keyValues(b.v);
      else if (b.t === "table") table(b.headers, b.rows);
      else if (b.t === "diagram") sustainabilityDiagram();
    }

    if (s.n === 4) {
      heading("Dokumentasi pelaksanaan");
      imageRow(pilotPhotos);
    }
    if (s.n === 5) {
      heading("Lima sistem yang dihasilkan");
      imageRow(systemShots.slice(0, 3));
      imageRow(systemShots.slice(3));
    }
  }

  /* ---- Closing ---- */
  doc.addPage();
  doc.fillColor(BRAND).font("Helvetica-Bold").fontSize(9);
  doc.text("PENUTUP", M, M, { characterSpacing: 1.6 });
  doc.fillColor(INK).font("Helvetica-Bold").fontSize(20);
  doc.text(closing.title, M, doc.y + 4, { width: CW });
  doc.y += 18;
  for (const p of closing.paragraphs) para(p);
  doc.moveDown(0.6);
  quote(closing.statement);
  quote(closing.cta);

  /* ---- TOC ---- */
  doc.switchToPage(tocPageIndex);
  doc.fillColor(BRAND).font("Helvetica-Bold").fontSize(9);
  doc.text("DAFTAR ISI", M, M, { characterSpacing: 1.6 });
  doc.fillColor(INK).font("Helvetica-Bold").fontSize(20);
  doc.text("Table of Contents", M, M + 16, { width: CW });
  let ty = M + 54;
  for (const s of sections) {
    const p = (starts.get(s.n) ?? 0) + 1;
    doc.fillColor(BRAND).font("Helvetica-Bold").fontSize(8.6);
    doc.text(String(s.n).padStart(2, "0"), M, ty, { width: 22 });
    doc.fillColor(INK).font("Helvetica").fontSize(9.6);
    doc.text(s.title, M + 26, ty, { width: CW - 70 });
    doc.fillColor(MUTED).font("Helvetica").fontSize(9);
    doc.text(String(p), M + CW - 26, ty, { width: 26, align: "right" });
    doc
      .moveTo(M + 26, ty + 13)
      .lineTo(M + CW - 30, ty + 13)
      .strokeColor("#eef2f7")
      .lineWidth(0.5)
      .stroke();
    ty += 21;
  }

  /* ---- Footers ---- */
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i += 1) {
    if (i === 0) continue;
    doc.switchToPage(i);

    // The footer sits below the bottom margin. Without dropping the margin for
    // the duration of the write, pdfkit treats it as overflow and appends a new
    // page for every footer, which silently doubles the document.
    const savedBottom = doc.page.margins.bottom;
    doc.page.margins.bottom = 0;

    const fy = doc.page.height - 40;
    doc
      .moveTo(M, fy - 8)
      .lineTo(M + CW, fy - 8)
      .strokeColor(LINE)
      .lineWidth(0.5)
      .stroke();
    doc.fillColor(MUTED).font("Helvetica").fontSize(7.6);
    doc.text(`${meta.title} — ${meta.organizedBy}`, M, fy, {
      width: CW * 0.7,
      lineBreak: false,
    });
    doc.text(String(i + 1), M + CW - 40, fy, { width: 40, align: "right", lineBreak: false });

    doc.page.margins.bottom = savedBottom;
  }

  doc.flushPages();
  doc.end();

  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  return range.count;
}

(async () => {
  const md = toMarkdown();
  fs.mkdirSync(path.dirname(MD_DOCS), { recursive: true });
  fs.mkdirSync(path.dirname(MD_PUBLIC), { recursive: true });
  fs.writeFileSync(MD_DOCS, md, "utf8");
  fs.writeFileSync(MD_PUBLIC, md, "utf8");

  const pages = await buildPdf();

  console.log("markdown:", MD_DOCS, `${Math.round(md.length / 1024)} KB`);
  console.log("pdf:", PDF_OUT, `${Math.round(fs.statSync(PDF_OUT).size / 1024)} KB`);
  console.log("pages:", pages);
  console.log("sections:", sections.length);
})();
