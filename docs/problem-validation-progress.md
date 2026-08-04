# Problem Validation Progress Report

## Route

Laporan Week 2 tersedia di:

`/ai-co-creation-lab-makassar/progress/problem-validation`

Route memakai dynamic segment progress yang sama dengan tiga laporan Week 1,
dipregenerasi saat build, dan tetap mengikuti kebijakan report existing:
`noindex, nofollow` serta tidak masuk sitemap publik. Halaman dapat dibuka dan
dibagikan melalui URL, tetapi status ini bukan autentikasi.

## Audit tiga progress report existing

Tiga halaman yang ditinjau:

- Leadership Network Mapping;
- Identifikasi Masalah Sosial;
- Mini Project Canvas.

Ketiganya memakai satu `ProgressReportPage` dengan pola visual dan perilaku
yang sama:

- breadcrumb Event → AI Co-Creation Lab → judul laporan;
- header putih dengan dot grid, label week/phase, status, next step, dan tanggal;
- action untuk salin link, cetak/simpan PDF, serta download jika file tersedia;
- body maksimal 5xl, background biru sangat muda, kartu editorial putih,
  radius 24 px, border tipis, dan shadow ringan;
- komponen typed untuk paragraf, daftar, tabel responsif, quote, definition
  list, timeline, reflection, output, progress description, URL, dan evidence;
- padding dan tipografi bertingkat pada `sm`/`lg`, target sentuh minimal 44 px,
  serta print stylesheet A4;
- header/footer global tetap digunakan di layar dan disembunyikan saat print.

Sebelum perubahan ini tidak ada daftar report atau navigasi previous/next.
Registry dan komponen navigasi bersama kini menghubungkan keempat laporan tanpa
mengubah isi substantif tiga laporan lama.

## Arsitektur konten

Data Problem Validation berada di:

`src/data/problem-validation.ts`

File tersebut menyimpan:

- header dan metadata report;
- summary metrics;
- validation approach;
- profil lima UMKM dan tiga mahasiswa;
- cross-stakeholder findings;
- validated/still-to-test boundary;
- data galeri dokumentasi;
- supporting documents;
- progress description.

Nomor telepon tidak boleh ditambahkan ke file data publik atau metadata.

Registry urutan report dan previous/next berada di:

`src/data/progress-reports.ts`

## Foto dokumentasi

WebP production disimpan pada:

`public/problem-validation/documentation/`

Enam file awal:

- `eyfa-natural-oil.webp`;
- `sukmajahe-sarabba.webp`;
- `markisa-bintang-jaya.webp`;
- `kira-kira-michi.webp`;
- `dapur-andist.webp`;
- `beneficiary-commitment.webp`.

Semua foto berukuran 1200×1500. PNG sumber di root dipertahankan dan tidak
dibaca langsung oleh halaman. Galeri memakai `next/image`, satu kolom pada
mobile, dua kolom pada tablet, dan tiga kolom pada desktop. Setiap foto dapat
diklik untuk membuka WebP berukuran penuh pada tab baru.

### Menambah atau mengganti foto

1. Optimalkan foto ke WebP sebelum menaruhnya di folder production.
2. Gunakan nama file yang deskriptif dan tanpa spasi.
3. Tambah atau perbarui item `validationDocumentation` di
   `src/data/problem-validation.ts`.
4. Isi `image`, `imageWidth`, `imageHeight`, `title`, `caption`, dan `alt`.
5. Pilih kategori yang tersedia: `umkm-interview`, `student-interview`,
   `commitment`, `observation`, atau `document`.
6. Jangan menambahkan foto yang memuat PII atau belum disetujui untuk publik.

Jika seluruh item dokumentasi dihapus, UI menampilkan empty state yang jujur.

## Supporting documents dan PDF

Dokumen supporting diletakkan pada:

`public/documents/problem-validation/`

PDF report awal:

`AI-Co-Creation-Lab-Problem-Validation-Week-2.pdf`

Untuk menambahkan dokumen:

1. taruh file yang benar-benar tersedia dan aman dibagikan pada folder di atas;
2. tambah item pada `supportingDocuments` di
   `src/data/problem-validation.ts`;
3. isi `href` dan set `status: "available"`;
4. jika file belum tersedia, jangan isi `href` dan gunakan
   `status: "coming-soon"`;
5. pastikan judul link menyebut konteks dokumen dan format PDF.

Tombol **Cetak / Simpan PDF** tetap tersedia sebagai fallback browser selain
tautan download file PDF yang telah dibuat.

## Validasi

Setelah perubahan konten atau aset, jalankan:

```text
npm run lint
npm run typecheck
npm run build
```

Periksa juga 320 px, 375 px, 390 px, tablet, dan 1440 px; pastikan galeri,
navigation, profile cards, serta Double Gap tidak menghasilkan horizontal
overflow.
