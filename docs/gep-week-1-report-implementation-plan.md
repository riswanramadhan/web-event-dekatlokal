# Rencana Implementasi GEP Week 1 Reports

## Tujuan

Menambahkan tiga halaman progress report yang dapat diakses melalui URL langsung,
tetapi tidak ditemukan melalui navigasi publik, event listing, journey publik,
internal search, atau sitemap:

- `/ai-co-creation-lab-makassar/progress/leadership-network-mapping`
- `/ai-co-creation-lab-makassar/progress/identifikasi-masalah-sosial`
- `/ai-co-creation-lab-makassar/progress/mini-project-canvas`

Setiap halaman harus mempertahankan isi laporan secara verbatim, memakai metadata
`noindex, nofollow`, dan menyediakan aksi salin deskripsi, salin URL laporan,
serta cetak atau simpan PDF.

## Hasil audit repository

- Framework: Next.js App Router di `src/app`.
- Bahasa: TypeScript strict.
- Package manager: npm dengan `package-lock.json`.
- Styling: Tailwind CSS v4 dan token global di `src/app/globals.css`.
- Data statis: typed configuration di `src/data`.
- Font: Poppins untuk teks utama dan Geist Mono untuk label teknis.
- Ikon: `iconoir-react`.
- Layout publik: `SiteHeader`, `SiteFooter`, dan `MobileBottomNavigation`.
- Sitemap: allowlist eksplisit di `src/app/sitemap.ts`.
- Metadata URL: helper `absoluteUrl()` dan `getSiteUrl()` di `src/lib/site.ts`.
- Pola dynamic route: halaman journey di
  `src/app/ai-co-creation-lab-makassar/journey/[activitySlug]/page.tsx`.
- Komponen yang dapat dipakai ulang: button links, status badge, dan empty state.
- Tidak ada komponen generic responsive table, print action, copy-link action,
  atau report section renderer.
- Tidak ada test runner atau test suite yang dikonfigurasi. Validasi wajib
  menggunakan lint, typecheck, production build, dan pemeriksaan runtime.

Folder `referensi-ui-dekatlokal` tetap read-only dan tidak akan menjadi runtime
dependency.

## Arsitektur yang direncanakan

### Source of truth

Seluruh isi final dari tiga Markdown dikonversi ke satu typed configuration:

```text
src/data/gep-week-1-reports.ts
```

Model data menggunakan discriminated union untuk merepresentasikan paragraf,
bullet list, numbered list, tabel, kutipan, subsection, output, deskripsi
progress, URL, status, tahap selanjutnya, dan tanggal pembaruan tanpa
menempatkan copy substantif di page component.

### Route

Gunakan satu Server Component:

```text
src/app/ai-co-creation-lab-makassar/progress/[slug]/page.tsx
```

Route akan menyediakan:

- `generateStaticParams()` untuk tiga slug;
- `dynamicParams = false`;
- `generateMetadata()` dengan title absolut, canonical URL, dan robots lengkap;
- `notFound()` sebagai guard untuk slug yang tidak valid;
- render konten sepenuhnya dari typed configuration.

### Komponen

Komponen report ditempatkan di `src/components/reports`:

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

Server Components digunakan untuk layout dan konten. Client Components dibatasi
pada Clipboard API, fallback copy, feedback `aria-live`, dan `window.print()`.

## Arah visual

UI mengikuti design system production yang sudah ada:

- primary blue `#0255F5`;
- surface putih dan latar `#F8FBFF`;
- Poppins dengan hierarki heading yang tegas;
- Geist Mono untuk badge, tanggal, dan metadata teknis;
- `page-container`, dot-grid halus, border slate, radius besar, dan shadow ringan;
- content column yang nyaman dibaca;
- whitespace luas dan section hierarchy yang jelas;
- tabel semantic dengan horizontal scroll terisolasi pada mobile;
- target sentuh minimal 44 px dan visible focus;
- tanpa glassmorphism, gradient berlebihan, animasi berat, atau dekorasi AI generik.

## Print

Print stylesheet terisolasi akan:

- menyembunyikan header, footer, mobile navigation, dan action buttons;
- menampilkan URL laporan dan tanggal pembaruan;
- mempertahankan seluruh section dan isi tabel;
- mencegah section penting mudah terpotong;
- menghapus background dan shadow yang tidak diperlukan ketika dicetak.

## Pencegahan public discovery

- Tidak menambahkan link pada navbar, footer, mobile navigation, event landing,
  events listing, journey, atau data navigasi.
- Tidak menambahkan route pada `src/app/sitemap.ts`.
- Tidak membuat entry internal search.
- Metadata setiap laporan menggunakan:

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

Unlisted route is not authentication. Anyone with the URL may access the report.

## Validasi

Setelah implementasi:

1. Bandingkan seluruh data TypeScript terhadap tiga Markdown sumber.
2. Verifikasi tiga URL dan 404 untuk slug invalid.
3. Verifikasi metadata title, canonical, dan noindex/nofollow.
4. Verifikasi route tidak muncul pada sitemap atau navigasi publik.
5. Uji copy description, copy link, feedback berhasil/gagal, dan print.
6. Uji viewport 360 px, 390 px, tablet, dan desktop.
7. Periksa overflow, semantic heading/table, keyboard, visible focus, console,
   hydration, dan hasil print.
8. Jalankan:

```text
npm run lint
npm run typecheck
npm run build
```

## Kesiapan konten

Ketiga sumber resmi kini tersedia dan telah dibaca lengkap:

- `new-report/REPORT_01_LEADERSHIP_NETWORK_MAPPING.md`;
- `new-report/REPORT_02_IDENTIFIKASI_MASALAH_SOSIAL.md`;
- `new-report/REPORT_03_MINI_PROJECT_CANVAS.md`.

Implementasi dapat dilanjutkan dengan ketiga Markdown tersebut sebagai sumber
resmi dan `src/data/gep-week-1-reports.ts` sebagai source of truth production.
Content lock tetap berlaku: copy substantif tidak boleh direka, diringkas, atau
diparafrasekan ketika dikonversi ke typed configuration.
