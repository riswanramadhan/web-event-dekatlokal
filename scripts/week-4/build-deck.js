const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "../..");
const SLIDE_DIR = path.join(ROOT, "public/downloads/final-presentation");
const PDF_OUT = path.join(
  ROOT,
  "public/downloads/AI_Co-Creation_Lab_Final_Presentation_GEP_2026.pdf",
);

const W = 1920;
const H = 1080;
const M = 110;

const BRAND = "#0255f5";
const BRAND_DARK = "#012262";
const BRAND_50 = "#ebf1fe";
const BRAND_100 = "#b7cffc";
const INK = "#0f172a";
const BODY = "#334155";
const MUTED = "#64748b";
const LINE = "#e2e8f0";
const FONT = "Segoe UI, Arial, Helvetica, sans-serif";

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function wrap(text, size, maxWidth, bold) {
  const factor = bold ? 0.56 : 0.51;
  const perChar = size * factor;
  const max = Math.max(8, Math.floor(maxWidth / perChar));
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (next.length > max && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function text(t, x, y, opts = {}) {
  const {
    size = 28,
    weight = 400,
    fill = BODY,
    maxWidth = W - M * 2,
    lineHeight = 1.32,
    anchor = "start",
  } = opts;
  const lines = wrap(t, size, maxWidth, weight >= 600);
  return lines
    .map(
      (line, i) =>
        `<text x="${x}" y="${y + i * size * lineHeight}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(line)}</text>`,
    )
    .join("");
}

function textHeight(t, size, maxWidth, bold, lineHeight = 1.32) {
  return wrap(t, size, maxWidth, bold).length * size * lineHeight;
}

function chip(label, x, y, opts = {}) {
  const { size = 22, padX = 22, h = 52, fill = BRAND_50, stroke = BRAND_100, color = BRAND_DARK } = opts;
  const w = Math.max(90, label.length * size * 0.56 + padX * 2);
  return {
    w,
    svg: `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}" stroke="${stroke}"/>
<text x="${x + w / 2}" y="${y + h / 2 + size * 0.35}" font-family="${FONT}" font-size="${size}" font-weight="600" fill="${color}" text-anchor="middle">${esc(label)}</text>`,
  };
}

function chipRow(labels, x, y, opts = {}) {
  const gap = opts.gap ?? 14;
  let cx = x;
  let cy = y;
  const maxX = opts.maxX ?? W - M;
  const h = opts.h ?? 52;
  let out = "";
  for (const label of labels) {
    const c = chip(label, cx, cy, opts);
    if (cx + c.w > maxX) {
      cx = x;
      cy += h + gap;
      const c2 = chip(label, cx, cy, opts);
      out += c2.svg;
      cx += c2.w + gap;
    } else {
      out += c.svg;
      cx += c.w + gap;
    }
  }
  return { svg: out, endY: cy + h };
}

function arrowFlow(steps, x, y, width) {
  const gap = 16;
  const arrow = 26;
  const total = width - (steps.length - 1) * (gap + arrow);
  const bw = total / steps.length;
  const h = 74;
  let out = "";
  steps.forEach((s, i) => {
    const cx = x + i * (bw + gap + arrow);
    out += `<rect x="${cx}" y="${y}" width="${bw}" height="${h}" rx="14" fill="${BRAND_50}" stroke="${BRAND_100}"/>`;
    const lines = wrap(s, 19, bw - 20, true);
    lines.slice(0, 2).forEach((line, li) => {
      out += `<text x="${cx + bw / 2}" y="${y + h / 2 + (li - (Math.min(lines.length, 2) - 1) / 2) * 23 + 7}" font-family="${FONT}" font-size="19" font-weight="600" fill="${BRAND_DARK}" text-anchor="middle">${esc(line)}</text>`;
    });
    if (i < steps.length - 1) {
      out += `<text x="${cx + bw + gap + arrow / 2}" y="${y + h / 2 + 9}" font-family="${FONT}" font-size="26" font-weight="700" fill="#94a3b8" text-anchor="middle">&#8250;</text>`;
    }
  });
  return { svg: out, endY: y + h };
}

function header(eyebrow, headline, opts = {}) {
  const hlSize = opts.hlSize ?? 62;
  let out = `<text x="${M}" y="${M + 26}" font-family="${FONT}" font-size="22" font-weight="700" fill="${BRAND}" letter-spacing="3">${esc(eyebrow.toUpperCase())}</text>`;
  out += text(headline, M, M + 100, {
    size: hlSize,
    weight: 700,
    fill: INK,
    maxWidth: opts.maxWidth ?? W - M * 2,
    lineHeight: 1.16,
  });
  const hlH = textHeight(headline, hlSize, opts.maxWidth ?? W - M * 2, true, 1.16);
  out += `<rect x="${M}" y="${M + 100 + hlH - 4}" width="90" height="6" rx="3" fill="${BRAND}"/>`;
  return { svg: out, endY: M + 100 + hlH + 42 };
}

function slideFrame(inner, bg = "#ffffff") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" fill="${bg}"/>
${inner}
</svg>`;
}

function pageNumber(n) {
  return `<text x="${W - M}" y="${H - 56}" font-family="${FONT}" font-size="20" font-weight="600" fill="#94a3b8" text-anchor="end">${String(n).padStart(2, "0")} / 16</text>
<text x="${M}" y="${H - 56}" font-family="${FONT}" font-size="20" fill="#94a3b8">AI Co-Creation Lab Makassar 2026 · DekatLokal</text>`;
}

/* -------------------------------------------------------------------------- */

async function dataUri(rel, width) {
  const buf = await sharp(path.join(ROOT, rel))
    .resize({ width, withoutEnlargement: true })
    .png()
    .toBuffer();
  return `data:image/png;base64,${buf.toString("base64")}`;
}

async function dataUriFlat(rel, width) {
  const buf = await sharp(path.join(ROOT, rel))
    .resize({ width, withoutEnlargement: true })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 84 })
    .toBuffer();
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

function imageBox(uri, x, y, w, h, opts = {}) {
  const radius = opts.radius ?? 14;
  const fit = opts.fit ?? "xMidYMid meet";
  const id = `clip${Math.random().toString(36).slice(2, 9)}`;
  return `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}"/></clipPath></defs>
<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="#ffffff" stroke="${LINE}"/>
<image href="${uri}" x="${x + (opts.pad ?? 0)}" y="${y + (opts.pad ?? 0)}" width="${w - (opts.pad ?? 0) * 2}" height="${h - (opts.pad ?? 0) * 2}" preserveAspectRatio="${fit}" clip-path="url(#${id})"/>`;
}

function metricTile(value, label, caption, x, y, w, h) {
  let out = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${BRAND_50}" stroke="${BRAND_100}"/>`;
  out += text(value, x + 30, y + 68, { size: 46, weight: 700, fill: BRAND_DARK, maxWidth: w - 60, lineHeight: 1.1 });
  out += text(label, x + 30, y + 112, { size: 21, weight: 600, fill: INK, maxWidth: w - 60, lineHeight: 1.25 });
  if (caption) {
    out += text(caption, x + 30, y + 146, { size: 17, weight: 400, fill: MUTED, maxWidth: w - 60, lineHeight: 1.2 });
  }
  return out;
}

function compareBar(label, pre, post, max, x, y, w, opts = {}) {
  const unit = opts.unit ?? "";
  const barW = w - 300;
  const trackX = x + 230;
  let out = `<text x="${x}" y="${y + 20}" font-family="${FONT}" font-size="21" font-weight="600" fill="${INK}">${esc(label)}</text>`;
  const rows = [
    ["Pre", pre, "#83aefa"],
    ["Post", post, "#0244c4"],
  ];
  rows.forEach(([name, val, color], i) => {
    const by = y + 38 + i * 36;
    out += `<text x="${x}" y="${by + 19}" font-family="${FONT}" font-size="18" fill="${MUTED}">${name}</text>`;
    out += `<rect x="${trackX}" y="${by}" width="${barW}" height="26" rx="8" fill="#eef2f7"/>`;
    out += `<rect x="${trackX}" y="${by}" width="${Math.max(4, (val / max) * barW)}" height="26" rx="8" fill="${color}"/>`;
    out += `<text x="${trackX + barW + 18}" y="${by + 19}" font-family="${FONT}" font-size="20" font-weight="700" fill="${INK}">${val}${unit}</text>`;
  });
  return { svg: out, endY: y + 38 + 72 };
}

/* -------------------------------------------------------------------------- */

async function buildSlides() {
  const dekatlokal = await dataUri("public/logo-ecosystem/optimized/logo-dekatlokal.webp", 420);
  const coverPhoto = await dataUriFlat("public/week-3/documentation/hands-on-building.webp", 1400);

  const partnerLogos = [
    ["public/logo-ecosystem/optimized/logo-baktinusa.webp", "BAKTI NUSA", "Program ecosystem"],
    ["public/logo-ecosystem/optimized/logo-great.webp", "GreatEdunesia", "Program ecosystem"],
    ["public/logo-ecosystem/optimized/logo-dompetdhuafa.webp", "Dompet Dhuafa", "Social impact"],
    ["public/logo-ecosystem/optimized/logo-rumahbumn.webp", "Rumah BUMN BRI", "UMKM ecosystem"],
    ["public/logo-ecosystem/optimized/logo-komdigimakassar.webp", "BBLSDM Komdigi", "Venue partner"],
    ["public/partnership-collaboration/logos/inovasi-digital.webp", "PT Konsultan Inovasi Digital", "Digital infrastructure"],
    ["public/partnership-collaboration/logos/dicoding-indonesia.webp", "Dicoding Indonesia", "Digital learning"],
    ["public/logo-ecosystem/optimized/logo-informatikaunhas.webp", "Informatika Unhas", "Academic partner"],
  ];
  const partners = [];
  for (const [rel, name, role] of partnerLogos) {
    partners.push({ uri: await dataUri(rel, 300), name, role });
  }

  const umkmDefs = [
    ["public/sponsorship-logo/optimized/logo-eyfa.webp", "Eyfa Natural Oil", "Pencatatan penjualan, stok, dan HPP masih manual"],
    ["public/sponsorship-logo/optimized/logo-sukma-jahe.webp", "Sukmajahe Sarabba", "Stok titip jual tersebar di banyak outlet"],
    ["public/problem-validation/documentation/markisa-bintang-jaya.webp", "Markisa Bintang Jaya", "Catatan keuangan dan stok terpisah"],
    ["public/sponsorship-logo/optimized/logo-kira-kira-michi.webp", "Kira Kira Michi", "Loyalitas pelanggan bergantung kartu fisik"],
    ["public/sponsorship-logo/optimized/logo-dapur-andist.webp", "Dapur Andist", "Pemasukan, pengeluaran, dan omzet belum terstruktur"],
  ];
  const umkm = [];
  for (const [rel, name, problem] of umkmDefs) {
    umkm.push({ uri: await dataUri(rel, 320), name, problem });
  }

  const systems = [];
  for (const [file, name, solution] of [
    ["eyfa-natural-oil", "Eyfa Natural Oil", "POS, Stock, HPP & Reporting"],
    ["sukmajahe-sarabba", "Sukmajahe Sarabba", "Outlet & Consignment Tracking"],
    ["markisa-bintang-jaya", "Markisa Bintang Jaya", "Finance & Stock Management"],
    ["kira-kira-michi", "Kira Kira Michi", "Digital Loyalty Card"],
    ["dapur-andist", "Dapur Andist", "Financial Management"],
  ]) {
    systems.push({
      uri: await dataUriFlat(`public/week-3/prototypes/${file}.webp`, 700),
      name,
      solution,
    });
  }

  const slides = [];

  /* 01 Cover */
  slides.push(
    slideFrame(
      `<rect width="${W}" height="${H}" fill="${BRAND_DARK}"/>
<rect x="0" y="0" width="${W}" height="10" fill="${BRAND}"/>
${imageBox(coverPhoto, W * 0.52, 0, W * 0.48, H, { radius: 0, fit: "xMidYMid slice" })}
<rect x="${W * 0.52}" y="0" width="${W * 0.48}" height="${H}" fill="${BRAND_DARK}" opacity="0.55"/>
<image href="${dekatlokal}" x="${M}" y="${M}" width="230" height="70" preserveAspectRatio="xMinYMid meet"/>
${text("AI Co-Creation Lab", M, 402, { size: 76, weight: 700, fill: "#ffffff", maxWidth: 880, lineHeight: 1.06 })}
${text("Makassar 2026", M, 490, { size: 76, weight: 700, fill: BRAND_100, maxWidth: 880, lineHeight: 1.06 })}
<rect x="${M}" y="546" width="120" height="6" rx="3" fill="${BRAND}"/>
${text("From AI Users to Local Problem Solvers", M, 626, { size: 36, weight: 600, fill: "#ffffff", maxWidth: 860, lineHeight: 1.25 })}
${text("Riswan Ramadhan", M, 800, { size: 32, weight: 700, fill: "#ffffff", maxWidth: 800 })}
${text("Founder of DekatLokal · BAKTI NUSA 15 Awardee", M, 844, { size: 24, weight: 400, fill: BRAND_100, maxWidth: 800 })}
${text("Global Experience Program 2026 · Final Presentation", M, 900, { size: 22, weight: 400, fill: "#8ba7d8", maxWidth: 800 })}`,
      BRAND_DARK,
    ),
  );

  /* 02 Personal Leadership Profile */
  {
    const h = header("Personal Leadership Profile", "Riswan Ramadhan");
    let s = h.svg;
    s += text(
      "Mahasiswa Teknik Informatika dan Founder DekatLokal. Perjalanan kepemimpinan saya berangkat dari membangun produk digital, lalu berpindah ke pertanyaan yang lebih mendasar tentang siapa yang benar-benar terbantu oleh produk itu.",
      M,
      h.endY + 10,
      { size: 28, maxWidth: 1180, lineHeight: 1.45 },
    );
    const values = [
      ["Integrity", "Melaporkan hasil apa adanya, termasuk bagian yang belum selesai."],
      ["Collaboration", "Membuka ruang agar orang lain mengambil bagian dan tumbuh."],
      ["Real Impact", "Menilai keberhasilan dari manfaat yang bertahan, bukan dari keramaian acara."],
    ];
    values.forEach((v, i) => {
      const x = M + i * ((W - M * 2 - 40) / 3 + 20);
      const w = (W - M * 2 - 40) / 3;
      s += `<rect x="${x}" y="${h.endY + 210}" width="${w}" height="240" rx="20" fill="#f8fafc" stroke="${LINE}"/>`;
      s += `<rect x="${x}" y="${h.endY + 210}" width="${w}" height="8" rx="4" fill="${BRAND}"/>`;
      s += text(v[0], x + 34, h.endY + 290, { size: 34, weight: 700, fill: INK, maxWidth: w - 68 });
      s += text(v[1], x + 34, h.endY + 340, { size: 21, fill: BODY, maxWidth: w - 68, lineHeight: 1.4 });
    });
    slides.push(slideFrame(s + pageNumber(2)));
  }

  /* 03 Identifikasi Isu */
  {
    const h = header("Identifikasi Isu", "Two Sides, One Gap");
    let s = h.svg;
    const colW = (W - M * 2 - 60) / 2;
    const sides = [
      ["UMKM", ["Masalah operasional nyata dan berulang setiap hari.", "Alur kerja masih manual dan tersebar.", "Akses terbatas ke sistem digital yang sesuai.", "Perangkat yang ada sering terlalu kompleks."]],
      ["Mahasiswa", ["Sudah akrab menggunakan AI setiap hari.", "Pemakaian AI berhenti pada tugas dan produktivitas.", "Jarang membangun untuk pengguna sungguhan.", "Belum banyak pengalaman menguji bersama pengguna."]],
    ];
    sides.forEach((side, i) => {
      const x = M + i * (colW + 60);
      s += `<rect x="${x}" y="${h.endY + 20}" width="${colW}" height="440" rx="22" fill="${i === 0 ? "#f8fafc" : BRAND_50}" stroke="${i === 0 ? LINE : BRAND_100}"/>`;
      s += text(side[0], x + 40, h.endY + 90, { size: 40, weight: 700, fill: i === 0 ? INK : BRAND_DARK, maxWidth: colW - 80 });
      side[1].forEach((line, li) => {
        const y = h.endY + 150 + li * 78;
        s += `<circle cx="${x + 52}" cy="${y + 4}" r="7" fill="${BRAND}"/>`;
        s += text(line, x + 78, y + 12, { size: 23, fill: BODY, maxWidth: colW - 130, lineHeight: 1.35 });
      });
    });
    s += `<rect x="${M}" y="${h.endY + 500}" width="${W - M * 2}" height="96" rx="18" fill="${BRAND_DARK}"/>`;
    s += text(
      "UMKM have real problems. Students have the tools. The Lab creates the space to build together.",
      M + 40,
      h.endY + 560,
      { size: 28, weight: 600, fill: "#ffffff", maxWidth: W - M * 2 - 80 },
    );
    slides.push(slideFrame(s + pageNumber(3)));
  }

  /* 04 Network Mapping */
  {
    const h = header("Network Mapping & Partnership", "Built Together, Backed by an Ecosystem");
    let s = h.svg;
    const cols = 4;
    const gap = 28;
    const cardW = (W - M * 2 - gap * (cols - 1)) / cols;
    const cardH = 208;
    partners.forEach((p, i) => {
      const x = M + (i % cols) * (cardW + gap);
      const y = h.endY + 20 + Math.floor(i / cols) * (cardH + gap);
      s += `<rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" rx="18" fill="#ffffff" stroke="${LINE}"/>`;
      s += `<image href="${p.uri}" x="${x + 26}" y="${y + 24}" width="${cardW - 52}" height="72" preserveAspectRatio="xMidYMid meet"/>`;
      s += text(p.name, x + 26, y + 138, { size: 21, weight: 700, fill: INK, maxWidth: cardW - 52, lineHeight: 1.2 });
      s += text(p.role, x + 26, y + 178, { size: 18, fill: BRAND, maxWidth: cardW - 52 });
    });
    slides.push(slideFrame(s + pageNumber(4)));
  }

  /* 05 Mini Project Canvas */
  {
    const h = header("Mini Project Canvas", "4 Students + 1 UMKM = 1 Co-Creation Team");
    let s = h.svg;
    s += text(
      "Setiap tim membawa satu masalah usaha nyata melewati lima langkah yang sama sepanjang hari pelaksanaan.",
      M,
      h.endY + 10,
      { size: 28, maxWidth: 1280, lineHeight: 1.4 },
    );
    const f = arrowFlow(["Listen", "Define", "Build", "Test", "Improve"], M, h.endY + 130, W - M * 2);
    s += f.svg;
    const stats = [
      ["20", "Mahasiswa"],
      ["5", "UMKM"],
      ["5", "Tim campuran"],
      ["4 + 1", "Komposisi tim"],
    ];
    stats.forEach((st, i) => {
      const w = (W - M * 2 - 60) / 4;
      const x = M + i * (w + 20);
      s += metricTile(st[0], st[1], "", x, f.endY + 90, w, 190);
    });
    slides.push(slideFrame(s + pageNumber(5)));
  }

  /* 06 Validasi Permasalahan */
  {
    const h = header("Validasi Permasalahan", "Five Validated Problems");
    let s = h.svg;
    const cols = 5;
    const gap = 22;
    const cardW = (W - M * 2 - gap * (cols - 1)) / cols;
    umkm.forEach((u, i) => {
      const x = M + i * (cardW + gap);
      const y = h.endY + 30;
      s += `<rect x="${x}" y="${y}" width="${cardW}" height="440" rx="20" fill="#ffffff" stroke="${LINE}"/>`;
      s += `<rect x="${x}" y="${y}" width="${cardW}" height="150" rx="20" fill="#f8fafc"/>`;
      s += `<image href="${u.uri}" x="${x + 24}" y="${y + 26}" width="${cardW - 48}" height="98" preserveAspectRatio="xMidYMid meet"/>`;
      s += text(u.name, x + 24, y + 205, { size: 23, weight: 700, fill: INK, maxWidth: cardW - 48, lineHeight: 1.25 });
      s += text(u.problem, x + 24, y + 285, { size: 19, fill: BODY, maxWidth: cardW - 48, lineHeight: 1.4 });
    });
    slides.push(slideFrame(s + pageNumber(6)));
  }

  /* 07 Implementation Journey */
  {
    const h = header("Implementation Journey", "From Validation to Handover");
    let s = h.svg;
    const f = arrowFlow(
      ["Validate", "Match", "Learn", "Co-Create", "MVP", "UAT", "Handover"],
      M,
      h.endY + 40,
      W - M * 2,
    );
    s += f.svg;
    const notes = [
      ["Sebelum hari H", "Masalah lima UMKM divalidasi dan dituangkan menjadi case brief."],
      ["Hari pelaksanaan", "Belajar, membangun, dan menguji bersama pemilik usaha di ruangan yang sama."],
      ["Setelah hari H", "Refinement, serah terima, lalu stabilisasi sebelum dipakai harian."],
    ];
    notes.forEach((n, i) => {
      const w = (W - M * 2 - 60) / 3;
      const x = M + i * (w + 30);
      const y = f.endY + 110;
      s += `<rect x="${x}" y="${y}" width="${w}" height="250" rx="20" fill="#f8fafc" stroke="${LINE}"/>`;
      s += text(n[0], x + 32, y + 62, { size: 27, weight: 700, fill: BRAND_DARK, maxWidth: w - 64 });
      s += text(n[1], x + 32, y + 116, { size: 22, fill: BODY, maxWidth: w - 64, lineHeight: 1.4 });
    });
    slides.push(slideFrame(s + pageNumber(7)));
  }

  /* 08 Five Systems Delivered */
  {
    const h = header("Five Systems Delivered", "Five Systems, Five Real Businesses", { hlSize: 54 });
    let s = h.svg;
    const gap = 24;
    const cardW = (W - M * 2 - gap * 2) / 3;
    const cardH = 300;
    systems.forEach((sys, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = M + col * (cardW + gap);
      const y = h.endY - 10 + row * (cardH + gap);
      s += `<rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" rx="18" fill="#ffffff" stroke="${LINE}"/>`;
      s += imageBox(sys.uri, x + 1, y + 1, cardW - 2, 176, { radius: 17, fit: "xMidYMin slice" });
      s += text(sys.name, x + 24, y + 216, { size: 23, weight: 700, fill: INK, maxWidth: cardW - 48 });
      s += text(sys.solution, x + 24, y + 248, { size: 19, fill: BRAND, maxWidth: cardW - 48, lineHeight: 1.25 });
      s += `<rect x="${x + 24}" y="${y + 264}" width="196" height="30" rx="15" fill="#ecfdf5" stroke="#a7f3d0"/>`;
      s += `<text x="${x + 122}" y="${y + 284}" font-family="${FONT}" font-size="17" font-weight="700" fill="#047857" text-anchor="middle">Handed Over · UAT</text>`;
    });
    const bx = M + 2 * (cardW + gap);
    const by = h.endY - 10 + (cardH + gap);
    s += `<rect x="${bx}" y="${by}" width="${cardW}" height="${cardH}" rx="18" fill="${BRAND_DARK}"/>`;
    s += text("5 / 5", bx + 30, by + 96, { size: 66, weight: 700, fill: "#ffffff", maxWidth: cardW - 60 });
    s += text("Sistem diserahterimakan dan diterima melalui initial UAT", bx + 30, by + 150, {
      size: 22,
      fill: BRAND_100,
      maxWidth: cardW - 60,
      lineHeight: 1.4,
    });
    slides.push(slideFrame(s + pageNumber(8)));
  }

  /* 09 Target Achievement */
  {
    const h = header("Target Achievement", "Every primary delivery target was achieved.", { hlSize: 52 });
    let s = h.svg;
    const rows = [
      ["Students", "20", "20"],
      ["UMKM", "5", "5"],
      ["Co-Creation Teams", "5", "5"],
      ["Functional MVPs", "5", "5"],
      ["Initial UAT", "5", "5"],
      ["System Handover", "5", "5"],
      ["Domain & Hosting", "5", "5 activated"],
      ["Pre-test / Post-test / Reflection", "20", "20"],
    ];
    const tx = M;
    const tw = W - M * 2;
    const rowH = 62;
    let y = h.endY + 10;
    s += `<rect x="${tx}" y="${y}" width="${tw}" height="${rowH}" rx="12" fill="${BRAND_50}"/>`;
    ["Indicator", "Target", "Achievement"].forEach((head, i) => {
      const cx = tx + [40, tw * 0.6, tw * 0.82][i];
      s += `<text x="${cx}" y="${y + 40}" font-family="${FONT}" font-size="23" font-weight="700" fill="${BRAND_DARK}">${esc(head)}</text>`;
    });
    y += rowH;
    rows.forEach((r, i) => {
      if (i % 2 === 1) s += `<rect x="${tx}" y="${y}" width="${tw}" height="${rowH}" fill="#f8fafc"/>`;
      s += `<text x="${tx + 40}" y="${y + 40}" font-family="${FONT}" font-size="23" fill="${BODY}">${esc(r[0])}</text>`;
      s += `<text x="${tx + tw * 0.6}" y="${y + 40}" font-family="${FONT}" font-size="23" fill="${MUTED}">${esc(r[1])}</text>`;
      s += `<text x="${tx + tw * 0.82}" y="${y + 40}" font-family="${FONT}" font-size="23" font-weight="700" fill="#047857">${esc(r[2])}</text>`;
      s += `<rect x="${tx}" y="${y + rowH - 1}" width="${tw}" height="1" fill="${LINE}"/>`;
      y += rowH;
    });
    slides.push(slideFrame(s + pageNumber(9)));
  }

  /* 10 Impact Measurement Framework */
  {
    const h = header("Impact Measurement", "Six Layers, Not One Score");
    let s = h.svg;
    s += text(
      "Setiap lapis memakai skala dan makna yang berbeda, sehingga tidak pernah dijumlahkan menjadi satu nilai akhir.",
      M,
      h.endY + 10,
      { size: 27, maxWidth: 1300, lineHeight: 1.4 },
    );
    const layers = [
      ["01", "Knowledge", "Pengetahuan objektif, skala 0-100"],
      ["02", "Capability", "Penilaian diri peserta, skala 1-5"],
      ["03", "Experience", "Pengalaman setelah program"],
      ["04", "Reflection", "Refleksi tertulis 20 peserta"],
      ["05", "Behavioral Output", "Apa yang benar-benar dibangun"],
      ["06", "Sustainability Intention", "Kesediaan melanjutkan peran"],
    ];
    const cols = 3;
    const gap = 28;
    const cardW = (W - M * 2 - gap * (cols - 1)) / cols;
    layers.forEach((l, i) => {
      const x = M + (i % cols) * (cardW + gap);
      const y = h.endY + 120 + Math.floor(i / cols) * 210;
      s += `<rect x="${x}" y="${y}" width="${cardW}" height="180" rx="18" fill="#f8fafc" stroke="${LINE}"/>`;
      s += `<text x="${x + 32}" y="${y + 52}" font-family="${FONT}" font-size="24" font-weight="700" fill="${BRAND}">${l[0]}</text>`;
      s += text(l[1], x + 32, y + 96, { size: 28, weight: 700, fill: INK, maxWidth: cardW - 64 });
      s += text(l[2], x + 32, y + 138, { size: 20, fill: BODY, maxWidth: cardW - 64, lineHeight: 1.3 });
    });
    slides.push(slideFrame(s + pageNumber(10)));
  }

  /* 11 Student Impact */
  {
    const h = header("Student Impact", "What Changed for 20 Students");
    let s = h.svg;
    const tiles = [
      ["71.25 → 100", "Core Knowledge", "Skala 0-100"],
      ["3.27 → 4.72", "Self-Reported Capability", "Skala Likert 1-5"],
      ["+1.56", "Largest Gain", "Testing, Collaboration & Confidence"],
      ["20 / 20", "Meningkat", "Overall capability naik untuk semua peserta"],
    ];
    tiles.forEach((t, i) => {
      const w = (W - M * 2 - 60) / 4;
      const x = M + i * (w + 20);
      s += metricTile(t[0], t[1], t[2], x, h.endY, w, 176);
    });
    let by = h.endY + 218;
    const dims = [
      ["Problem & User Understanding", 3.21, 4.63],
      ["MVP & Solution Thinking", 3.05, 4.55],
      ["AI-Assisted Problem Solving", 3.45, 4.78],
      ["Testing, Collaboration & Confidence", 3.25, 4.81],
    ];
    dims.forEach((d) => {
      const r = compareBar(d[0], d[1], d[2], 5, M, by, W - M * 2, {});
      s += r.svg;
      by = r.endY + 12;
    });
    slides.push(slideFrame(s + pageNumber(11)));
  }

  /* 12 Inclusive Learning */
  {
    const h = header("Inclusive Learning", "Technical talent acted as an anchor, not a silo.", { hlSize: 50 });
    let s = h.svg;
    const colW = (W - M * 2 - 60) / 2;
    const groups = [
      ["Knowledge · skala 0-100", [["Technical Core", 92.86, 100], ["Non-Core", 59.62, 100]], 100, ""],
      ["Capability · skala 1-5", [["Technical Core", 3.82, 4.95], ["Non-Core", 2.97, 4.6]], 5, ""],
    ];
    groups.forEach((g, gi) => {
      const x = M + gi * (colW + 60);
      s += `<rect x="${x}" y="${h.endY}" width="${colW}" height="360" rx="20" fill="#ffffff" stroke="${LINE}"/>`;
      s += text(g[0], x + 34, h.endY + 54, { size: 25, weight: 700, fill: BRAND_DARK, maxWidth: colW - 68 });
      let yy = h.endY + 94;
      g[1].forEach((row) => {
        const r = compareBar(row[0], row[1], row[2], g[2], x + 34, yy, colW - 68, { unit: g[3] });
        s += r.svg;
        yy = r.endY + 6;
      });
    });
    s += `<rect x="${M}" y="${h.endY + 400}" width="${W - M * 2}" height="120" rx="18" fill="${BRAND_50}" stroke="${BRAND_100}"/>`;
    s += text(
      "Peserta non-core datang dengan baseline jauh lebih rendah dan menunjukkan kenaikan kapabilitas yang lebih besar. Jarak antar kelompok menyempit setelah program.",
      M + 36,
      h.endY + 450,
      { size: 24, weight: 600, fill: BRAND_DARK, maxWidth: W - M * 2 - 72, lineHeight: 1.35 },
    );
    slides.push(slideFrame(s + pageNumber(12)));
  }

  /* 13 Participant Voice */
  {
    const h = header("Participant Voice", "Quantitative Results, Backed by Participant Voice", { hlSize: 50 });
    let s = h.svg;
    const changes = [
      ["AI untuk tugas", "AI untuk masalah nyata"],
      ["Asumsi", "Mendengarkan pengguna"],
      ["Kompleksitas", "MVP yang berguna"],
      ["Sekali bangun", "Uji dan perbaiki"],
    ];
    changes.forEach((c, i) => {
      const y = h.endY + 20 + i * 108;
      s += `<rect x="${M}" y="${y}" width="${W - M * 2}" height="88" rx="16" fill="#f8fafc" stroke="${LINE}"/>`;
      s += `<text x="${M + 40}" y="${y + 56}" font-family="${FONT}" font-size="28" fill="${MUTED}" text-decoration="line-through">${esc(c[0])}</text>`;
      s += `<text x="${M + 560}" y="${y + 56}" font-family="${FONT}" font-size="30" font-weight="700" fill="#94a3b8">&#8594;</text>`;
      s += `<text x="${M + 640}" y="${y + 56}" font-family="${FONT}" font-size="28" font-weight="700" fill="${BRAND_DARK}">${esc(c[1])}</text>`;
    });
    s += `<rect x="${M}" y="${h.endY + 470}" width="${W - M * 2}" height="104" rx="18" fill="${BRAND_DARK}"/>`;
    s += text(
      "20 dari 20 peserta menyelesaikan refleksi tertulis. Seluruhnya memilih Setuju atau Sangat Setuju pada empat indikator pengalaman pasca-program.",
      M + 40,
      h.endY + 522,
      { size: 25, weight: 600, fill: "#ffffff", maxWidth: W - M * 2 - 80, lineHeight: 1.35 },
    );
    slides.push(slideFrame(s + pageNumber(13)));
  }

  /* 14 Leadership Reflection */
  {
    const h = header("Leadership Reflection", "Leadership is creating the conditions for people to build something meaningful together.", { hlSize: 44 });
    let s = h.svg;
    const points = [
      ["Ask for help", "Menerima bahwa satu orang tidak mungkin memegang semuanya."],
      ["Delegate", "Memberi ruang agar orang lain tumbuh melalui tanggung jawab."],
      ["Listen before deciding", "Percakapan dengan pengguna mengubah arah solusi."],
      ["Build systems that outlive the event", "Menyiapkan struktur agar manfaatnya berlanjut."],
    ];
    points.forEach((p, i) => {
      const w = (W - M * 2 - 60) / 2;
      const x = M + (i % 2) * (w + 60);
      const y = h.endY + 10 + Math.floor(i / 2) * 220;
      s += `<rect x="${x}" y="${y}" width="${w}" height="188" rx="20" fill="#f8fafc" stroke="${LINE}"/>`;
      s += `<rect x="${x}" y="${y}" width="8" height="188" rx="4" fill="${BRAND}"/>`;
      s += text(p[0], x + 40, y + 62, { size: 30, weight: 700, fill: INK, maxWidth: w - 80 });
      s += text(p[1], x + 40, y + 108, { size: 22, fill: BODY, maxWidth: w - 80, lineHeight: 1.4 });
    });
    slides.push(slideFrame(s + pageNumber(14)));
  }

  /* 15 Sustainability */
  {
    const h = header("Sustainability", "Four Layers of Continuity");
    let s = h.svg;
    const f = arrowFlow(
      ["Handover", "1-Week Stabilization", "Full Operational Use", "Monthly Monitoring"],
      M,
      h.endY,
      W - M * 2,
    );
    s += f.svg;
    const layers = [
      ["Technology", "Lima sistem aktif dengan infrastruktur digital"],
      ["Human", "Peserta menjadi builder lalu technical steward"],
      ["Impact", "Pemeriksaan H+7 dan monitoring bulanan"],
      ["Program", "Playbook v1.0 dan Replication Kit"],
    ];
    layers.forEach((l, i) => {
      const w = (W - M * 2 - 60) / 4;
      const x = M + i * (w + 20);
      const y = f.endY + 70;
      s += `<rect x="${x}" y="${y}" width="${w}" height="196" rx="18" fill="${BRAND_50}" stroke="${BRAND_100}"/>`;
      s += text(l[0], x + 30, y + 58, { size: 30, weight: 700, fill: BRAND_DARK, maxWidth: w - 60 });
      s += text(l[1], x + 30, y + 104, { size: 20, fill: BODY, maxWidth: w - 60, lineHeight: 1.35 });
    });
    s += `<rect x="${M}" y="${f.endY + 306}" width="${W - M * 2}" height="112" rx="18" fill="${BRAND_DARK}"/>`;
    s += text(
      "Tiga sistem dipegang student technical steward. Dua sistem ditangani tim teknis DekatLokal. Kelimanya tetap berada dalam dukungan DekatLokal.",
      M + 40,
      f.endY + 362,
      { size: 25, weight: 600, fill: "#ffffff", maxWidth: W - M * 2 - 80, lineHeight: 1.35 },
    );
    slides.push(slideFrame(s + pageNumber(15)));
  }

  /* 16 Closing */
  {
    let s = `<rect width="${W}" height="${H}" fill="${BRAND_DARK}"/>
<rect x="0" y="0" width="${W}" height="10" fill="${BRAND}"/>`;
    const f = arrowFlow(
      ["Pilot 1", "Lessons", "Playbook v1.0", "Replication Kit", "Next Collaboration"],
      M,
      180,
      W - M * 2,
    );
    s += f.svg.replace(/fill="#ebf1fe"/g, 'fill="#0a2f6f"').replace(/stroke="#b7cffc"/g, 'stroke="#1d4ed8"').replace(/fill="#012262"/g, 'fill="#ffffff"');
    s += text("From AI Users to", M, 460, { size: 84, weight: 700, fill: "#ffffff", maxWidth: 1500, lineHeight: 1.08 });
    s += text("Local Problem Solvers", M, 552, { size: 84, weight: 700, fill: BRAND_100, maxWidth: 1500, lineHeight: 1.08 });
    s += text(
      "We started with five real problems and delivered five working systems. What continues beyond GEP is a support model and a replication guide that can bring the same process to new students, new UMKM, and new partners.",
      M,
      660,
      { size: 26, fill: "#c9d9f5", maxWidth: 1400, lineHeight: 1.5 },
    );
    s += `<rect x="${M}" y="800" width="640" height="96" rx="48" fill="${BRAND}"/>`;
    s += `<text x="${M + 320}" y="${860}" font-family="${FONT}" font-size="32" font-weight="700" fill="#ffffff" text-anchor="middle">Build With AI. Solve Real Problems.</text>`;
    s += text("Rumah BUMN Makassar dan Komdigi menyampaikan replication interest.", M, 960, {
      size: 21,
      fill: "#8ba7d8",
      maxWidth: 1400,
    });
    slides.push(slideFrame(s, BRAND_DARK));
  }

  return slides;
}

(async () => {
  fs.mkdirSync(SLIDE_DIR, { recursive: true });
  const slides = await buildSlides();

  const jpegs = [];
  for (let i = 0; i < slides.length; i += 1) {
    const n = String(i + 1).padStart(2, "0");
    const svgBuf = Buffer.from(slides[i]);
    const png = await sharp(svgBuf, { density: 96 }).png().toBuffer();

    await sharp(png).webp({ quality: 88 }).toFile(path.join(SLIDE_DIR, `slide-${n}.webp`));
    const jpg = await sharp(png).flatten({ background: "#ffffff" }).jpeg({ quality: 88 }).toBuffer();
    jpegs.push(jpg);
  }

  const doc = new PDFDocument({
    size: [960, 540],
    margin: 0,
    autoFirstPage: false,
    info: {
      Title: "AI Co-Creation Lab Makassar — Final Presentation GEP 2026",
      Author: "Riswan Ramadhan · DekatLokal",
      Subject: "From AI Users to Local Problem Solvers",
    },
  });
  const out = fs.createWriteStream(PDF_OUT);
  doc.pipe(out);
  for (const jpg of jpegs) {
    doc.addPage({ size: [960, 540], margin: 0 });
    doc.image(jpg, 0, 0, { width: 960, height: 540 });
  }
  doc.end();
  await new Promise((r) => out.on("finish", r));

  console.log("slides:", slides.length);
  console.log("slide dir:", SLIDE_DIR);
  console.log("pdf:", PDF_OUT, `${Math.round(fs.statSync(PDF_OUT).size / 1024)} KB`);
  for (const f of fs.readdirSync(SLIDE_DIR).slice(0, 3)) {
    console.log("  ", f, `${Math.round(fs.statSync(path.join(SLIDE_DIR, f)).size / 1024)} KB`);
  }
})();
