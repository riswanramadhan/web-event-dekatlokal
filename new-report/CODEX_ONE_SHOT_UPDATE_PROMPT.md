# Codex One-Shot Update Prompt

Kerjakan dua update besar pada repository Next.js DekatLokal Event saat ini:

1. Memperbarui bagian Timeline pada laporan Mini Project Canvas dan menambahkan PDF download.
2. Menambahkan halaman Sponsorship Proposal dengan flipbook interaktif 24 halaman.

Jangan meminta saya mengulang isi. Seluruh data final tersedia dalam paket ini.

## A. Baca sebelum mengubah kode

Wajib baca:

- `README_FIRST.md`
- `REPORT_03_TIMELINE_UPDATE.md`
- `MINI_PROJECT_CANVAS_PDF_SPEC.md`
- `SPONSORSHIP_PROPOSAL_FLIPBOOK_SPEC.md`
- `mini-project-canvas-content.ts`
- `sponsorship-proposal-pages.ts`
- `ACCEPTANCE_CHECKLIST.md`
- `AGENTS.md` repository jika tersedia
- data report GEP existing
- dynamic progress route existing
- event page existing
- sitemap, metadata, design system, navigation, dan package.json

Buat implementation plan di:

`docs/mini-project-timeline-and-sponsorship-plan.md`

## B. Scope 1 - Update Report 3 Mini Project Canvas

Target route existing:

`/ai-co-creation-lab-makassar/progress/mini-project-canvas`

### B1. Timeline content

Gunakan `mini-project-canvas-content.ts` sebagai sumber data timeline baru.

Tambahkan seluruh fase berikut tanpa mengubah tanggal atau isi:

- 25-31 Juli: Discover & Project Design
- 1-9 Agustus: Sponsorship & Resource Mobilization
- 1-3 Agustus: Problem Validation & Partnership
- 3-7 Agustus: Open Recruitment mahasiswa dan UMKM
- 8-9 Agustus: Team Matching & Solution Planning
- 10 Agustus: Main Implementation
- 11-13 Agustus: Refinement & Final Handover
- 13-17 Agustus: Monitoring
- 18-21 Agustus: Impact Measurement
- 22-25 Agustus: Reflection & Sustainability

Ganti `progressDescription` Mini Project Canvas dengan `updatedMiniProjectProgressDescription`.

### B2. Visual timeline

Buat visual timeline yang menarik tetapi stabil.

Desktop:

- section header;
- compact Gantt-like overview atau phase rail;
- cards dengan period, phase, activity, output, dan status;
- overlapping workstream Sponsorship 1-9 Agustus harus terlihat sebagai phase tersendiri;
- status badge: In Progress, Planned, Scheduled.

Mobile:

- vertical timeline;
- date pill;
- phase title;
- activity dan output;
- tidak ada horizontal overflow.

Jangan menggunakan chart library. Gunakan CSS Grid/Flex dan existing UI components agar ringan.

Buat reusable components bila diperlukan:

- `ProjectTimeline`
- `ProjectTimelineItem`
- `TimelineStatusBadge`
- `TimelineOverview`

### B3. PDF download

Paket menyediakan:

`AI-Co-Creation-Lab-Mini-Project-Canvas.pdf`

Salin file tersebut ke:

`public/downloads/AI-Co-Creation-Lab-Mini-Project-Canvas.pdf`

Tambahkan button pada page Mini Project Canvas:

`Unduh Mini Project Canvas (PDF)`

Button harus:

- memakai link download biasa;
- tidak membutuhkan API route;
- tidak menghasilkan 404;
- responsive;
- accessible;
- menggunakan icon download existing;
- opsional track event `download_mini_project_canvas_pdf` tanpa PII.

PDF berisi tujuh halaman slide-like:

1. Cover
2. Problem
3. Solution
4. Stakeholder & Partnership
5. Output
6. Outcome
7. Timeline

Jangan membuat button berlabel PowerPoint karena file yang diunduh adalah PDF.

## C. Scope 2 - Sponsorship Proposal Page

Buat route:

`/ai-co-creation-lab-makassar/sponsorship-proposal`

### C1. Page sections

1. Hero sponsorship.
2. Partnership value cards.
3. Support categories.
4. Flipbook section.
5. Contact/CTA.

Gunakan copy persis dari `SPONSORSHIP_PROPOSAL_FLIPBOOK_SPEC.md`.

Tambahkan CTA yang relevan dari event page menuju sponsorship proposal, misalnya:

`Lihat Proposal Sponsorship`

Jangan menambahkan route sponsorship ke navbar global jika tidak sesuai existing IA. Link dari event page atau partner section sudah cukup.

### C2. Flipbook implementation

Gunakan `react-pageflip` sebagai pilihan utama.

Ikuti package manager repository. Instal dependency hanya jika belum tersedia.

Buat client component terisolasi, misalnya:

- `SponsorshipFlipbookClient.tsx`
- `ProposalPage.tsx`
- `FlipbookControls.tsx`

Gunakan dynamic import `ssr: false` jika diperlukan untuk mencegah hydration mismatch.

Gunakan `sponsorship-proposal-pages.ts` sebagai sumber data.

Total page harus tepat 24.

Perilaku wajib:

- cover single-page pada initial state;
- cover dapat diklik untuk membuka;
- desktop menjadi two-page spread;
- mobile single-page portrait;
- swipe/touch bekerja;
- previous/next bekerja;
- first/last bekerja;
- ArrowLeft/ArrowRight bekerja;
- page counter akurat;
- disabled states akurat;
- `aria-live` untuk status halaman;
- `showCover: true`;
- no autoplay;
- reduced motion dihormati;
- no horizontal overflow.

Page 1:

- cover blue #0255F5;
- DekatLokal;
- Sponsorship & Collaboration Proposal;
- AI Co-Creation Lab Makassar;
- From AI Users to Local Problem Solvers;
- dekatlokal.com;
- event.dekatlokal.com.

Page 2-24:

- mostly blank white pages;
- subtle border/shadow;
- small page number;
- placeholder state minimal;
- jangan isi dengan teks proposal palsu.

### C3. Responsive size

Gunakan halaman portrait rasio mendekati A4.

Desktop:

- page width sekitar 400-460 px;
- page height mengikuti rasio A4;
- spread muat dalam viewport.

Tablet/mobile:

- hitung ukuran secara responsive;
- gunakan `ResizeObserver` atau CSS/container measurement;
- jangan bergantung pada fixed viewport width;
- flipbook harus tetap bisa digunakan pada 360 px.

### C4. SEO placeholder

Selama proposal pages masih placeholder:

```ts
robots: {
  index: false,
  follow: false,
}
```

Tambahkan komentar config agar dapat diubah setelah halaman asli dipasang.

## D. Design

Ikuti design system event.dekatlokal.com:

- #0255F5;
- putih dan neutral surface;
- modern, simple, professional;
- no excessive gradient;
- no glassmorphism;
- no generic AI decorations;
- mobile-first;
- visible focus;
- accessible contrast.

## E. Content integrity

Dilarang:

- mengubah 20 mahasiswa;
- mengubah 5 UMKM;
- mengubah 5 tim;
- mengubah 5 prototype;
- mengubah 10 Agustus 2026;
- mengubah 13.00-16.30 WITA;
- mengubah venue;
- mengarang sponsor;
- mengarang evidence;
- mengisi 23 placeholder pages dengan klaim baru.

## F. Testing

Jalankan sesuai package manager:

- lint;
- TypeScript check;
- production build;
- relevant tests jika ada.

Manual verification:

1. Mini Project Canvas route terbuka.
2. Timeline baru lengkap dan mobile responsive.
3. Sponsorship 1-9 Agustus terlihat.
4. Oprec 3-7 Agustus terlihat.
5. Matching 8-9 Agustus terlihat.
6. Deskripsi Progress Awardee ter-update.
7. PDF download berhasil dan file valid.
8. Sponsorship proposal route terbuka.
9. Cover flipbook single-page.
10. Cover click opens the book.
11. Two-page spread desktop.
12. Single-page mobile.
13. Swipe, arrow keys, and controls work.
14. Exactly 24 pages.
15. No hydration warning.
16. No horizontal overflow.
17. Placeholder page is noindex.

## G. Documentation

Buat:

- `docs/mini-project-canvas-timeline-update.md`
- `docs/sponsorship-proposal-flipbook.md`
- `docs/mini-project-timeline-and-sponsorship-summary.md`

Dokumentasikan:

- route;
- data files;
- cara mengganti placeholder dengan page image;
- cara mengganti noindex;
- cara mengganti/download PDF;
- dependency flipbook;
- hasil test.

## H. Final response

Laporkan:

1. file yang dibuat dan diubah;
2. timeline yang ditambahkan;
3. PDF download path;
4. sponsorship route;
5. flipbook behavior;
6. dependency yang dipasang;
7. hasil lint/typecheck/build;
8. keterbatasan;
9. konfirmasi exact 24 pages dan exact timeline.
