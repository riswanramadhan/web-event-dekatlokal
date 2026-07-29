# Implementation Requirements

## Routes

```text
/ai-co-creation-lab-makassar/progress/leadership-network-mapping
/ai-co-creation-lab-makassar/progress/identifikasi-masalah-sosial
/ai-co-creation-lab-makassar/progress/mini-project-canvas
```

Gunakan dynamic route `[slug]` sesuai struktur `app` atau `src/app` project.

## Unlisted behavior

Wajib:

- tidak ada link pada navbar;
- tidak ada link pada footer navigation;
- tidak ada link pada event navigation;
- tidak ada link pada halaman daftar event;
- tidak ada link pada journey publik;
- tidak masuk sitemap;
- tidak masuk internal search;
- tidak masuk event listing.

Metadata:

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

## Sumber konten

Baca tiga file:

- `REPORT_01_LEADERSHIP_NETWORK_MAPPING.md`
- `REPORT_02_IDENTIFIKASI_MASALAH_SOSIAL.md`
- `REPORT_03_MINI_PROJECT_CANVAS.md`

Konversikan seluruh isi ke satu source of truth TypeScript, misalnya:

```text
src/data/gep-week-1-reports.ts
```

Jangan menduplikasi isi di page component.

## Komponen

Gunakan existing components bila tersedia. Jika tidak, buat:

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

## Header halaman

Tampilkan:

- badge `GEP WEEK 1`;
- fase `DISCOVER YOURSELF & BUILD YOUR NETWORK`;
- nama aktivitas;
- subtitle;
- status;
- tahap selanjutnya;
- tanggal pembaruan;
- breadcrumb;
- tombol kembali ke event;
- tombol salin link;
- tombol cetak.

## Fitur

### Salin Deskripsi Progress

- menyalin teks `Deskripsi Progress Awardee`;
- feedback setelah berhasil;
- `aria-live`;
- fallback bila Clipboard API gagal.

### Salin Link Laporan

- menyalin URL final laporan;
- feedback accessible.

### Cetak / Simpan PDF

Gunakan `window.print()` dan `@media print`.

Saat print:

- sembunyikan navbar;
- sembunyikan footer;
- sembunyikan tombol;
- tampilkan URL;
- tampilkan tanggal update;
- pertahankan semua section dan tabel.

## Design

Ikuti desain existing `event.dekatlokal.com`:

- primary blue `#0255F5`;
- background putih;
- subtle pattern existing;
- mobile-first;
- container nyaman;
- responsive table;
- whitespace cukup;
- card sederhana.

Hindari gradient berlebihan, glassmorphism, animasi berat, dan dekorasi AI generik.

## Accessibility

- semantic headings;
- keyboard accessible;
- visible focus;
- semantic table;
- contrast memadai;
- `aria-live` untuk copy feedback;
- reduced motion dihormati.

## Error behavior

Slug selain tiga laporan wajib menjalankan `notFound()`.

## Evidence

Saat evidence belum tersedia, tampilkan:

> Dokumentasi akan ditambahkan setelah proses terkait diselesaikan.

Jangan membuat link palsu.

## Scope safety

- jangan mengubah halaman event utama;
- jangan mengubah registrasi;
- jangan mengubah Supabase;
- jangan menambah authentication;
- jangan mengubah angka, tanggal, venue, atau stakeholder;
- jangan membuat route terlihat pada UI publik.
