# Ringkasan Update Timeline Mini Project dan Sponsorship Proposal

## Scope

Paket baru meminta:

1. timeline Mini Project Canvas diperbarui menjadi sepuluh fase pada periode
   25 Juli-25 Agustus 2026;
2. progress description Report 3 diganti secara persis;
3. unduhan Mini Project Canvas PDF tujuh halaman;
4. route Sponsorship Proposal dengan hero, value, support category, flipbook
   tepat 24 halaman, dan contact CTA;
5. CTA dari event page menuju proposal tanpa menambah navbar global;
6. metadata `noindex, nofollow` selama proposal masih placeholder.

## Source audit

Sumber timeline memuat tepat sepuluh item:

- 25-31 Juli 2026 — Discover & Project Design;
- 1-9 Agustus 2026 — Sponsorship & Resource Mobilization;
- 1-3 Agustus 2026 — Problem Validation & Partnership;
- 3-7 Agustus 2026 — Open Recruitment;
- 8-9 Agustus 2026 — Team Matching & Solution Planning;
- 10 Agustus 2026 — Main Implementation;
- 11-13 Agustus 2026 — Refinement & Final Handover;
- 13-17 Agustus 2026 — Monitoring;
- 18-21 Agustus 2026 — Impact Measurement;
- 22-25 Agustus 2026 — Reflection & Sustainability.

Sumber sponsorship menghasilkan tepat 24 data page: page 1 cover dan page 2-24
placeholder. Model data sudah future-ready untuk tipe `image` dan `custom`.

Content lock tetap berlaku untuk 20 mahasiswa, 5 UMKM, 5 tim, 5 prototype,
Senin 10 Agustus 2026, 13.00-16.30 WITA, dan Balai Besar Pelatihan Komunikasi
dan Digital Makassar. Target tidak boleh dinyatakan sebagai hasil aktual.

## Mismatch PDF yang dikirim

Spesifikasi menyebut:

`AI-Co-Creation-Lab-Mini-Project-Canvas.pdf`

Namun paket aktual hanya berisi:

`new-report/AI_Co-Creation_Lab.pdf`

Audit membuktikan PDF aktual:

- valid PDF 1.4;
- berukuran 8.569.131 byte;
- SHA-256
  `1C6330366EAB962E9E41950CF50C3E8F0B033B5237927C96BB8EB798FFD5B857`;
- memiliki 14 halaman landscape image-only;
- berisi laporan Identifikasi Masalah Sosial, bukan Mini Project Canvas;
- tidak memiliki metadata dokumen.

File tersebut tidak boleh di-rename ke path download karena akan membuat
unduhan berlabel Mini Project Canvas dengan isi yang salah.

Replacement tujuh halaman telah dihasilkan dari locked Report 3 dengan urutan
Cover, Problem, Solution, Stakeholder & Partnership, Output, Outcome, dan
Timeline pada:

`public/downloads/AI-Co-Creation-Lab-Mini-Project-Canvas.pdf`

Hasil verifikasi replacement:

- valid PDF 1.4 dengan tepat 7 halaman landscape;
- berukuran 600.925 byte;
- SHA-256
  `BACE324C4E34C4BC756990B186AF7CF495751451D7AF31A8DB40CB157F820A3B`;
- teks dapat dipilih, font tertanam, metadata judul benar, dan tidak ada
  clipping;
- public URL mengembalikan HTTP 200, `application/pdf`, dan magic `%PDF`.

## Arsitektur yang diterapkan

- Timeline dan progress description berasal dari typed data, bukan copy di
  component.
- Kategori dukungan yang dipakai Report 1 dan proposal berasal dari satu typed
  data source di `src/data/sponsorship-support.ts`.
- Desktop menggunakan phase rail/overview dan cards; mobile menggunakan
  vertical timeline.
- Sponsorship 1-9 Agustus tetap menjadi workstream overlap tersendiri.
- PDF diunduh melalui anchor biasa tanpa API route.
- Sponsorship sections selain flipbook tetap server-rendered.
- `react-pageflip` diisolasi pada Client Component.
- Flipbook menggunakan 24 item data, `showCover: true`, no autoplay, controls,
  keyboard, swipe, counter, disabled state, dan `aria-live`.
- Ukuran dihitung dari container agar tetap berfungsi pada 360 px.
- Proposal placeholder tetap noindex/nofollow dan tidak masuk navbar global.

## Dokumentasi

Dokumen yang dibuat untuk update ini:

- `docs/mini-project-timeline-and-sponsorship-plan.md`;
- `docs/mini-project-canvas-timeline-update.md`;
- `docs/sponsorship-proposal-flipbook.md`;
- `docs/mini-project-timeline-and-sponsorship-summary.md`.

Dokumen mencakup route, data source, exact timeline, progress description,
penggantian PDF, penggantian placeholder dengan page image, perubahan noindex,
dependency, responsive behavior, dan accessibility.

## Status implementasi

| Area | Status |
|---|---|
| Integrasi 10 item timeline | **LULUS — exact source dan DOM comparison** |
| Progress description exact | **LULUS — rendered dan clipboard comparison** |
| Timeline desktop/mobile | **LULUS — 360, 390, dan 1440 px** |
| Replacement PDF 7 halaman | **LULUS — struktur, teks, font, metadata, visual** |
| PDF download tidak 404 | **LULUS — HTTP 200 dan `application/pdf`** |
| Route sponsorship | **LULUS — HTTP 200 production build lokal** |
| Exact hero/value/category copy | **LULUS — rendered comparison** |
| Flipbook tepat 24 page | **LULUS — 1 cover + 23 placeholder** |
| Cover click, spread, mobile, swipe, controls | **LULUS — browser interaction QA** |
| Keyboard, disabled state, aria-live | **LULUS — accessibility QA** |
| Reduced motion dan no autoplay | **LULUS — browser timing QA** |
| No hydration mismatch/overflow | **LULUS — 360–1440 px, zero runtime issue** |
| Proposal noindex/nofollow | **LULUS — metadata dan Googlebot directives** |
| CTA event page, tanpa global navbar | **LULUS — IA dan sitemap audit** |
| `react-pageflip` dependency | **LULUS — 2.0.3, transitive `page-flip` 2.0.7** |
| Data source tidak diduplikasi | **LULUS — timeline, pages, dan support category typed config** |

## Hasil command

- `npm run lint`: **LULUS**.
- `npm run typecheck`: **LULUS**.
- `npm run build`: **LULUS**, 21 static pages termasuk route proposal dan
  tiga report.
- `npm run build:open-next`: **LULUS**, termasuk Wrangler dry-run dan worker
  mandiri berukuran 11.558.815 byte.
- Exact data overlay: **LULUS**, 10/10 timeline dan 24/24 proposal pages.
- Primary production browser QA: **126/126 LULUS**.
- Independent Mini Project runtime QA: **100/100 LULUS**, zero console,
  hydration, request, page, atau HTTP issue.
- Independent acceptance audit setelah sentralisasi data dan pembaruan dokumen:
  **69/69 LULUS**.
- PDF validator dan visual contact sheet: **LULUS**, 7/7 halaman.

Perbaikan lint minimal pada `src/components/admin/admin-shell.tsx` mengganti
route-change state effect dengan state yang dikaitkan ke pathname. Perilaku
drawer tetap sama dan tidak menambah scope produk.

## Deployment

Baseline deployment setelah seluruh acceptance lulus:

- source commit aplikasi: `faf1f73eaafe67f771be5677f8006631efcc006f`;
- Sites version: **9**;
- deployment status: **succeeded**;
- production URL:
  `https://dekatlokal-event-aicl-makassar.riswancipa.chatgpt.site`;
- access: **owner-only**, satu allowed user dan tanpa allowed group;
- unauthenticated production request: **401**, sesuai access policy;
- visual production screenshot: **LULUS**;
- recent production worker errors: **0**.

Next.js 16 `proxy.ts` memakai runtime Node yang belum didukung adapter
OpenNext Cloudflare. Auth gate karena itu memakai konvensi `middleware.ts`
yang tetap didukung untuk Edge; logika session dan matcher admin tidak berubah.
OpenNext memakai incremental cache berbasis Workers Static Assets untuk seed
halaman SSG, termasuk tiga report. Status pendaftaran tidak disimpan di cache
read-only tersebut: helper memanggil `connection()` dan membaca Supabase per
request agar perubahan admin tetap langsung terlihat.
Pembaruan dokumentasi ini dikirim pada version Sites berikutnya, sedangkan
nomor version live final dicatat pada handoff.

## Keterbatasan yang harus dilaporkan

- PDF yang dikirim salah isi dan tidak dapat dipakai sebagai Mini Project
  Canvas.
- Page 2-24 sponsorship masih placeholder secara sengaja.
- `noindex` bukan authentication; siapa pun yang mengetahui URL masih dapat
  membuka halaman.
- Flipbook bergantung pada DOM dan perlu Client Component, sehingga hydration
  dan responsive behavior harus diuji pada build production.
- Kategori sponsorship bukan bukti partner telah dikonfirmasi.
