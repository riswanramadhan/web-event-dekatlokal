# Codex One-Shot Prompt — GEP Week 1 Reports

Kerjakan implementasi lengkap tiga halaman laporan GEP Week 1 pada repository Next.js DekatLokal Event saat ini.

Jangan meminta saya menempelkan isi laporan lagi. Seluruh isi final sudah tersedia dalam file Markdown pada paket ini.

## 1. Wajib baca sebelum mengubah kode

Baca seluruh file berikut pada folder new-report:

1. `README_FIRST.md`
2. `REPORT_CONTENT_LOCK.md`
3. `IMPLEMENTATION_REQUIREMENTS.md`
4. `REPORT_01_LEADERSHIP_NETWORK_MAPPING.md`
5. `REPORT_02_IDENTIFIKASI_MASALAH_SOSIAL.md`
6. `REPORT_03_MINI_PROJECT_CANVAS.md`
7. `REPORTS_MANIFEST.json`
8. `ACCEPTANCE_CHECKLIST.md`
9. `AGENTS.md` repository jika tersedia
10. struktur project existing
11. `package.json` dan lockfile
12. design system, components, layout, metadata, sitemap, dan halaman event AI Co-Creation Lab Makassar yang sudah ada

Jangan mulai membuat page sebelum seluruh file di atas dibaca.

## 2. Tujuan

Tambahkan tiga laporan unlisted:

```text
/ai-co-creation-lab-makassar/progress/leadership-network-mapping
/ai-co-creation-lab-makassar/progress/identifikasi-masalah-sosial
/ai-co-creation-lab-makassar/progress/mini-project-canvas
```

Halaman:

- dapat diakses dengan direct URL;
- tidak tampil pada navigasi publik;
- tidak tampil pada sitemap;
- diberi noindex dan nofollow;
- mempunyai UI laporan profesional;
- mempunyai tombol salin deskripsi;
- mempunyai tombol salin link;
- mempunyai tombol cetak/simpan PDF;
- responsive dan accessible;
- menggunakan isi persis dari file laporan.

## 3. Content lock

Isi laporan sudah final.

Dilarang:

- meringkas;
- memparafrase;
- menulis ulang;
- mengganti istilah;
- mengubah angka;
- mengubah tanggal;
- mengubah venue;
- mengubah nama stakeholder;
- menambah evidence palsu;
- menambah klaim partnership;
- menampilkan target sebagai capaian.

Konversikan seluruh isi tiga Markdown menjadi satu source of truth TypeScript:

```text
src/data/gep-week-1-reports.ts
```

atau folder `data` yang sesuai dengan convention repository.

Isi TypeScript harus merepresentasikan 100% isi Markdown, termasuk:

- paragraphs;
- bullets;
- numbered lists;
- tables;
- quotes;
- outputs;
- progress description;
- progress URL;
- status;
- next step;
- updated date.

Jangan menyalin konten langsung ke page component.

## 4. Repository audit

Sebelum coding:

- identifikasi apakah project menggunakan `app` atau `src/app`;
- identifikasi folder data;
- identifikasi package manager;
- identifikasi components existing;
- identifikasi navbar dan footer;
- identifikasi sitemap implementation;
- identifikasi design tokens;
- identifikasi metadata helper;
- identifikasi icon library;
- identifikasi existing button, card, breadcrumb, status, table, dan toast component.

Tulis rencana singkat di:

```text
docs/gep-week-1-report-implementation-plan.md
```

## 5. Route implementation

Gunakan dynamic route:

```text
src/app/ai-co-creation-lab-makassar/progress/[slug]/page.tsx
```

atau versi tanpa `src`.

Implementasikan:

- `generateStaticParams`;
- `generateMetadata`;
- `notFound()` untuk slug invalid;
- canonical URL;
- noindex;
- nofollow.

## 6. Metadata

Metadata per laporan:

```text
Leadership Network Mapping | AI Co-Creation Lab Makassar
Identifikasi Masalah Sosial | AI Co-Creation Lab Makassar
Mini Project Canvas | AI Co-Creation Lab Makassar
```

Robots wajib:

```ts
robots: {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
}
```

Jangan memasukkan route ke sitemap.

## 7. UI

Ikuti desain existing `event.dekatlokal.com`.

Gunakan:

- primary blue `#0255F5`;
- white surface;
- subtle existing pattern;
- mobile-first;
- container nyaman dibaca;
- section hierarchy jelas;
- responsive table;
- reusable components;
- whitespace yang cukup.

Header laporan:

- breadcrumb;
- `GEP WEEK 1`;
- `DISCOVER YOURSELF & BUILD YOUR NETWORK`;
- title;
- subtitle;
- status;
- next step;
- updated date;
- action buttons.

## 8. Components

Gunakan existing components bila cocok. Jika belum tersedia, buat:

- `ProgressReportHeader`
- `ProgressReportBreadcrumb`
- `ReportSection`
- `ResponsiveReportTable`
- `StatusBadge`
- `ProgressDescriptionCard`
- `CopyProgressDescriptionButton`
- `CopyReportLinkButton`
- `PrintReportButton`
- `ReportOutputList`
- `NextStepCard`
- `LeadershipReflectionCard`
- `EvidenceEmptyState`

Client component hanya untuk:

- copy;
- print;
- interaction feedback.

Content page tetap Server Component.

## 9. Copy actions

### Copy Progress Description

- copy bagian `Deskripsi Progress Awardee`;
- tampilkan feedback;
- gunakan `aria-live`;
- button accessible;
- fallback error message.

### Copy Report Link

- copy URL final dari laporan;
- feedback accessible.

## 10. Print

Tambahkan print stylesheet.

Saat print:

- navbar hilang;
- footer hilang;
- action buttons hilang;
- report content tetap lengkap;
- URL dan updated date tampil;
- table terbaca;
- section tidak mudah terpotong;
- warna dekoratif tidak wajib.

Button text:

```text
Cetak / Simpan PDF
```

## 11. Evidence

Tampilkan section evidence dengan empty state:

> Dokumentasi akan ditambahkan setelah proses terkait diselesaikan.

Jangan membuat link palsu.

## 12. Public discovery prevention

Pastikan:

- route tidak ditambahkan ke navbar;
- route tidak ditambahkan ke footer;
- route tidak ditambahkan ke event tabs;
- route tidak ditambahkan ke journey page;
- route tidak ditambahkan ke homepage;
- route tidak ditambahkan ke event listing;
- route tidak ditambahkan ke sitemap;
- route tidak masuk search index internal.

Tambahkan catatan dokumentasi:

> Unlisted route is not authentication. Anyone with the URL may access the report.

## 13. Testing

Jalankan command sesuai package manager:

- lint;
- TypeScript check;
- production build;
- relevant tests bila tersedia.

Verifikasi:

1. Semua URL dapat dibuka.
2. Invalid slug menghasilkan 404.
3. Konten sama dengan Markdown.
4. Salin deskripsi bekerja.
5. Salin link bekerja.
6. Print bekerja.
7. Mobile table responsive.
8. Route tidak muncul di sitemap.
9. Metadata noindex terpasang.
10. Tidak ada perubahan isi.
11. Tidak ada hydration warning.
12. Tidak ada TypeScript error.

## 14. Documentation

Buat:

```text
docs/gep-week-1-reports.md
docs/gep-week-1-report-implementation-summary.md
```

Dokumen pertama menjelaskan:

- routes;
- unlisted behavior;
- content editing;
- print;
- noindex;
- cara memperbarui status;
- cara menambahkan evidence kelak.

Dokumen kedua menjelaskan:

- file yang dibuat;
- file yang diubah;
- keputusan arsitektur;
- hasil lint/typecheck/build;
- keterbatasan;
- hal yang perlu dicek user.

## 15. Scope safety

Jangan:

- mengubah homepage event;
- mengubah registrasi;
- mengubah Supabase;
- mengubah proposal;
- menambah authentication;
- mengubah angka project;
- mengubah stakeholder;
- membuat laporan lain;
- melakukan refactor besar yang tidak diperlukan.

## 16. Final response

Laporkan:

1. route yang dibuat;
2. komponen yang dibuat;
3. data source;
4. metadata/noindex;
5. print dan copy features;
6. test yang dijalankan;
7. file documentation;
8. known limitations;
9. konfirmasi bahwa isi laporan tidak diubah.
