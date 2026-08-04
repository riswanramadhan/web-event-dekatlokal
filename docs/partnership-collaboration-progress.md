# Partnership & Collaboration Progress

## Route

`/ai-co-creation-lab-makassar/progress/partnership-collaboration`

Halaman berada setelah Problem Validation pada urutan progress Week 2. Daftar progress pada halaman event dan header setiap laporan memakai filter week yang dibentuk dari data `progressReports`.

## Ringkasan Partnership

- Sembilan institusi pendukung
- Dua MoU
- Dua official digital partners
- Dua venue dan creative spaces
- Dukungan in-kind Rp17.525.000

Dukungan in-kind terdiri dari pembelajaran Dicoding Indonesia senilai Rp15.000.000 dan infrastruktur Inovasi Digital senilai Rp2.525.000.

## Asset Publik

### Dokumentasi

- `public/partnership-collaboration/documentation/rumah-bumn-makassar-slide-01.webp`
- `public/partnership-collaboration/documentation/rumah-bumn-makassar-slide-02.webp`
- `public/partnership-collaboration/documentation/rumah-bumn-makassar-slide-03.webp`
- `public/partnership-collaboration/documentation/makassar-creative-hub-postingan.webp`

### Pratinjau Dokumen

Seluruh halaman PDF dirender sebagai WebP pada `public/partnership-collaboration/documents/`. Pratinjau dibuka dalam pop up yang dapat discroll.

### File PDF

File PDF yang dapat diunduh berada pada `public/documents/partnership/`.

### Logo

- Logo ekosistem menggunakan `public/logo-ecosystem/optimized/`
- Logo Inovasi Digital berada pada `public/partnership-collaboration/logos/inovasi-digital.webp`
- Logo Dicoding Indonesia berada pada `public/partnership-collaboration/logos/dicoding-indonesia.webp`
- Logo Makassar Creative Hub berada pada `public/partnership-collaboration/logos/makassar-creative-hub.webp`

## Struktur Data

Seluruh partner, metric, timeline, dokumentasi, dokumen, dan copy laporan berada pada `src/data/partnership-collaboration.ts`.

Metric ringkasan dihitung dari array `partners`. Menambahkan nilai `inKindValue` pada partner akan memperbarui total dukungan secara otomatis.

## Menambahkan Partner Baru

1. Tambahkan objek baru pada array `partners`
2. Pilih status dan kategori yang sesuai
3. Awali setiap poin dengan huruf kapital
4. Tambahkan `inKindValue` jika kolaborasi memiliki nilai dukungan
5. Tambahkan logo jika asset tersedia di dalam project
6. Jalankan lint, typecheck, dan build

## Menambahkan Dokumentasi Baru

1. Simpan gambar sumber di luar folder referensi UI
2. Pastikan gambar aman untuk ditampilkan pada halaman publik
3. Konversi gambar menjadi WebP dengan dimensi yang sesuai untuk web
4. Simpan hasil pada `public/partnership-collaboration/documentation/`
5. Tambahkan item pada `partnershipDocumentation` dengan alt text, caption, kategori, dan tanggal
6. Jangan tambahkan card gambar jika file belum tersedia

## Menambahkan PDF Baru

1. Siapkan file PDF yang aman untuk ditampilkan pada halaman publik
2. Simpan file pada `public/documents/partnership/`
3. Render setiap halaman menjadi WebP pada `public/partnership-collaboration/documents/`
4. Tambahkan data file dan seluruh halaman pratinjau pada `partnershipDocuments`
5. Pastikan modal dapat discroll dan tombol unduh menunjuk ke file PDF

## Responsive dan Interaksi

- Dokumentasi memakai satu kolom pada mobile dan dua kolom pada tablet atau desktop
- Dokumen pendukung memakai satu kolom pada mobile, dua kolom pada tablet, dan tiga kolom pada desktop
- Modal menggunakan portal, mengunci scroll halaman, mendukung tombol Escape, menjaga fokus keyboard, dan tidak membuka tab baru
- PDF ditampilkan sebagai rangkaian gambar vertikal agar dapat discroll pada layar kecil
- Filter week hanya menampilkan week yang sudah memiliki progress report dan akan bertambah otomatis dari data
