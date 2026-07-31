# Rencana Implementasi Timeline Mini Project dan Sponsorship Proposal

## Tujuan

Pembaruan ini memiliki dua scope produk:

1. memperbarui timeline pada laporan Mini Project Canvas menjadi rangkaian
   project 25 Juli-25 Agustus 2026 dan menyediakan unduhan PDF;
2. menambahkan halaman Sponsorship Proposal dengan flipbook interaktif tepat
   24 halaman.

Route yang menjadi target:

- `/ai-co-creation-lab-makassar/progress/mini-project-canvas`;
- `/ai-co-creation-lab-makassar/sponsorship-proposal`.

Implementasi harus mengikuti design system event existing: primary blue
`#0255F5`, surface putih/neutral, Poppins, Geist Mono untuk metadata teknis,
border dan shadow ringan, mobile-first, visible focus, serta tanpa
glassmorphism, gradient berlebihan, atau dekorasi AI generik.

## Sumber dan urutan otoritas

Sumber baru yang wajib dipertahankan:

- `new-report/REPORT_03_TIMELINE_UPDATE.md`;
- `new-report/mini-project-canvas-content.ts`;
- `new-report/MINI_PROJECT_CANVAS_PDF_SPEC.md`;
- `new-report/SPONSORSHIP_PROPOSAL_FLIPBOOK_SPEC.md`;
- `new-report/sponsorship-proposal-pages.ts`;
- `new-report/ACCEPTANCE_CHECKLIST(2).md`;
- `new-report/CODEX_ONE_SHOT_UPDATE_PROMPT.md`.

Untuk timeline runtime, `mini-project-canvas-content.ts` menjadi sumber nilai
terstruktur. Untuk copy halaman sponsorship, spesifikasi flipbook menjadi
sumber copy persis. Data report production existing, event page, sitemap,
metadata, navigation, package manager, dan design token harus diaudit sebelum
integrasi agar tidak terjadi duplikasi atau regresi.

Nama `README_FIRST.md` dan `ACCEPTANCE_CHECKLIST.md` di prompt merujuk pada
berkas paket baru yang pada workspace ini memiliki suffix `(2)`. Jangan
tertukar dengan paket report sebelumnya yang memiliki suffix `(1)`.

## Content lock

Nilai berikut tidak boleh diubah atau disajikan sebagai capaian aktual:

- target 20 mahasiswa;
- target 5 UMKM;
- format 5 tim;
- target 5 prototype sistem digital;
- Senin, 10 Agustus 2026;
- 13.00-16.30 WITA;
- Balai Besar Pelatihan Komunikasi dan Digital Makassar.

Jangan mengarang sponsor, evidence, testimonial, hasil monitoring, atau impact.
Kategori dukungan bukan klaim bahwa sponsor telah dikonfirmasi. Halaman 2-24
proposal harus tetap berupa placeholder minimal sampai materi final tersedia.

## Scope 1: timeline Mini Project Canvas

### Data

Integrasikan sepuluh item timeline tanpa mengubah period, phase, activities,
output, atau status:

1. `25-31 Juli 2026` — `Discover & Project Design`;
2. `1-9 Agustus 2026` — `Sponsorship & Resource Mobilization`;
3. `1-3 Agustus 2026` — `Problem Validation & Partnership`;
4. `3-7 Agustus 2026` — `Open Recruitment`;
5. `8-9 Agustus 2026` — `Team Matching & Solution Planning`;
6. `10 Agustus 2026` — `Main Implementation`;
7. `11-13 Agustus 2026` — `Refinement & Final Handover`;
8. `13-17 Agustus 2026` — `Monitoring`;
9. `18-21 Agustus 2026` — `Impact Measurement`;
10. `22-25 Agustus 2026` — `Reflection & Sustainability`.

Ganti timeline enam baris yang lama, bukan menampilkan dua versi timeline.
Ganti `progressDescription` Mini Project Canvas dengan
`updatedMiniProjectProgressDescription` secara persis.

### Presentasi

Komponen reusable yang dapat digunakan:

- `ProjectTimeline`;
- `ProjectTimelineItem`;
- `TimelineStatusBadge`;
- `TimelineOverview`.

Desktop menggunakan phase rail atau overview menyerupai Gantt yang ringkas,
kemudian card dengan period, phase, activity, output, dan status. Workstream
Sponsorship 1-9 Agustus harus terlihat sebagai fase tersendiri yang overlap
dengan pekerjaan lain.

Mobile menggunakan timeline vertikal, date pill, phase title, activity, output,
dan status. Layout tidak boleh menimbulkan horizontal overflow pada viewport
360 px. Implementasi menggunakan CSS Grid/Flex dan tidak menambahkan chart
library.

Status data dipetakan ke label:

- `in_progress` → `In Progress`;
- `planned` → `Planned`;
- `scheduled` → `Scheduled`;
- `completed` → `Completed` untuk kesiapan data masa depan.

## Scope 1B: unduhan PDF

Kontrak URL dan label:

- target file:
  `public/downloads/AI-Co-Creation-Lab-Mini-Project-Canvas.pdf`;
- public URL:
  `/downloads/AI-Co-Creation-Lab-Mini-Project-Canvas.pdf`;
- label: `Unduh Mini Project Canvas (PDF)`.

Gunakan anchor biasa dengan atribut `download`, icon download existing,
visible focus, target sentuh yang memadai, dan `aria-label` yang jelas. Tidak
diperlukan API route atau client JavaScript. Event analytics
`download_mini_project_canvas_pdf` bersifat opsional dan tidak boleh memuat PII.

### Temuan aset dan rencana koreksi

Berkas yang dikirim adalah `new-report/AI_Co-Creation_Lab.pdf`, bukan nama yang
disebut spesifikasi. Audit membuktikan berkas tersebut merupakan PDF 14 halaman
berisi laporan **Identifikasi Masalah Sosial**, bukan Mini Project Canvas tujuh
halaman. Berkas ini tidak boleh sekadar di-rename ke public path karena akan
membuat unduhan menyesatkan.

Replacement tujuh halaman telah dihasilkan dari konten Report 3 yang terkunci,
dengan urutan:

1. Cover;
2. Problem;
3. Solution;
4. Stakeholder & Partnership;
5. Output;
6. Outcome;
7. Timeline.

Replacement telah dipublikasikan pada
`public/downloads/AI-Co-Creation-Lab-Mini-Project-Canvas.pdf` setelah page
count, judul halaman, validitas PDF, public URL, dan isi locked-nya
diverifikasi. Artifact final berukuran 600.925 byte dengan SHA-256
`BACE324C4E34C4BC756990B186AF7CF495751451D7AF31A8DB40CB157F820A3B`.

## Scope 2: Sponsorship Proposal

### Struktur halaman

Halaman baru memuat:

1. hero sponsorship;
2. empat partnership value cards;
3. lima support categories;
4. flipbook section;
5. contact/CTA.

Event landing page memperoleh CTA relevan menuju proposal, misalnya
`Lihat Proposal Sponsorship`. Contact CTA existing tetap tersedia. Route tidak
ditambahkan ke navbar global.

### Data dan arsitektur flipbook

Gunakan `sponsorship-proposal-pages.ts` sebagai source of truth. Data harus tetap
tepat 24 item:

- page 1 bertipe `cover`;
- page 2-24 bertipe `placeholder`.

Model data harus tetap mendukung tipe `cover`, `placeholder`, `image`, dan
`custom`. Jangan membuat 24 komponen halaman secara manual.

Gunakan `react-pageflip` sebagai pilihan utama. Karena dependency belum ada,
instal melalui npm dan commit perubahan `package.json` serta
`package-lock.json`. Isolasi library pada Client Component. Gunakan dynamic
import dengan `ssr: false` bila diperlukan untuk menghindari hydration
mismatch.

Komponen yang dapat digunakan:

- `SponsorshipFlipbookClient`;
- `ProposalPage`;
- `FlipbookControls`.

### Perilaku

- initial cover tampil sebagai single-page dan dapat diklik;
- `showCover: true`;
- desktop membuka spread dua halaman;
- mobile menggunakan single-page portrait;
- swipe/touch, first, previous, next, last, ArrowLeft, dan ArrowRight bekerja;
- page counter dan disabled state akurat;
- status halaman diumumkan melalui `aria-live`;
- tidak ada autoplay;
- preferensi reduced motion dihormati;
- tidak ada horizontal overflow.

Halaman memakai rasio portrait mendekati A4. Lebar page desktop sekitar
400-460 px dan spread harus tetap muat dalam container. Mobile/tablet
menggunakan pengukuran container seperti `ResizeObserver`, bukan fixed viewport
width.

### SEO placeholder

Selama page 2-24 masih placeholder:

```ts
robots: {
  index: false,
  follow: false,
}
```

Noindex hanya boleh ditinjau ulang setelah isi proposal final dipasang dan
ditinjau. Route placeholder tidak dimasukkan ke sitemap.

## Urutan implementasi

1. Audit data report, event landing, navigation, sitemap, metadata, package, dan
   komponen action existing.
2. Pindahkan/representasikan data paket ke typed production data tanpa
   menduplikasi copy dalam komponen.
3. Perbarui timeline dan progress description Report 3.
4. Bangun timeline desktop/mobile dan status badge.
5. Hasilkan serta verifikasi replacement PDF tujuh halaman.
6. Pasang anchor download hanya setelah file target valid tersedia.
7. Instal `react-pageflip`.
8. Bangun route sponsorship, server-rendered sections, dan client-only
   flipbook.
9. Tambahkan CTA pada event page tanpa mengubah global navigation.
10. Terapkan noindex dan pastikan route tidak masuk sitemap.
11. Lengkapi dokumentasi dan validasi.

## Rencana validasi

Command wajib:

```text
npm run lint
npm run typecheck
npm run build
```

Pemeriksaan runtime:

1. Route Mini Project Canvas dan Sponsorship Proposal mengembalikan 200.
2. Sepuluh item timeline, tiga status, dan progress description tampil persis.
3. Sponsorship, Oprec, dan Matching terlihat sebagai periode terpisah.
4. PDF URL mengembalikan file valid tepat tujuh halaman.
5. Flipbook memiliki tepat 24 item dan initial cover tunggal.
6. Cover click, spread desktop, portrait mobile, controls, keyboard, dan swipe
   bekerja.
7. Counter, disabled state, dan `aria-live` akurat.
8. Tidak ada console error, hydration warning, failed request, atau overflow.
9. Reduced motion dan visible focus diverifikasi.
10. Metadata route placeholder adalah `noindex, nofollow`.
11. Route sponsorship tidak berada di sitemap atau navbar global.
12. Viewport minimum 360 px tetap dapat digunakan.

Hasil validasi dan deployment dicatat pada summary hanya setelah command serta
pemeriksaan runtime benar-benar dijalankan.
