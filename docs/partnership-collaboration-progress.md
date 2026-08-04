# Partnership & Collaboration Progress

## Route

`/ai-co-creation-lab-makassar/progress/partnership-collaboration`

Halaman berada setelah Problem Validation pada urutan progress Week 2. Daftar progress pada halaman event dan header setiap laporan memakai filter week yang dibentuk dari data `progressReports`.

## Evidence Boundary

- MoU Dicoding Indonesia tersedia dan menyebut akses kelas gratis level dasar bagi panitia dan peserta terdaftar.
- MoU Dicoding Indonesia tidak mencantumkan nilai Rp15.000.000, jumlah akun tertentu, atau masa akses satu bulan.
- MoU Inovasi Digital tersedia dan mencantumkan lima domain `.web.id`, lima hosting Starter, layanan 12 bulan sejak aktivasi, dan nilai in-kind Rp2.525.000.
- Dokumentasi Rumah BUMN Makassar tersedia dalam tiga foto pertemuan dan komitmen kolaborasi.
- File MoU Rumah BUMN Makassar tidak ditemukan sehingga status publiknya menggunakan `Commitment Documented`.
- Surat Komdigi Makassar yang tersedia adalah surat permohonan ruang, bukan surat balasan atau MoU venue.
- Makassar Creative Hub memiliki surat penggunaan tempat dan posting jadwal Produksi Konten Global Communication.
- Nilai dukungan terkuantifikasi hanya menjumlahkan angka resmi yang ditemukan di dalam dokumen.

## Public Assets

### Documentation

- `public/partnership-collaboration/documentation/rumah-bumn-makassar-slide-01.webp`
- `public/partnership-collaboration/documentation/rumah-bumn-makassar-slide-02.webp`
- `public/partnership-collaboration/documentation/rumah-bumn-makassar-slide-03.webp`
- `public/partnership-collaboration/documentation/makassar-creative-hub-postingan.webp`

### Document Previews

Seluruh halaman PDF dirender sebagai WebP pada `public/partnership-collaboration/documents/`. Pratinjau dibuka dalam pop up yang dapat discroll.

### Downloadable Documents

Versi publik PDF berada pada `public/documents/partnership/`. Nomor telepon dan alamat privat yang ditemukan telah disamarkan. Dokumen sumber di root project tidak diubah.

### Logos

- Logo ekosistem menggunakan `public/logo-ecosystem/optimized/`.
- Logo Inovasi Digital yang dikompresi berada pada `public/partnership-collaboration/logos/inovasi-digital.webp`.
- Logo Dicoding Indonesia yang dikompresi berada pada `public/partnership-collaboration/logos/dicoding-indonesia.webp`.
- Logo Makassar Creative Hub yang dikompresi berada pada `public/partnership-collaboration/logos/makassar-creative-hub.webp`.

## Data Architecture

Seluruh partner, summary metric, timeline, dokumentasi, dokumen, dan copy laporan berada pada `src/data/partnership-collaboration.ts`.

Summary metric dihitung dari array `partners`:

- Sembilan institusi pendukung.
- Dua MoU terverifikasi.
- Dua official digital partners.
- Dua venue dan creative spaces.
- Rp2.525.000 quantified in-kind support.

## Adding a New Partner

1. Tambahkan objek baru pada array `partners`.
2. Gunakan status yang sesuai dengan evidence yang tersedia.
3. Pastikan setiap kontribusi diawali huruf kapital dan diakhiri titik.
4. Tambahkan `inKindValue` hanya jika ada nilai resmi dalam dokumen.
5. Tambahkan logo hanya jika file resmi tersedia di dalam project.
6. Jalankan lint, typecheck, dan build.

## Adding New Documentation

1. Simpan gambar sumber di luar folder referensi UI.
2. Hapus atau samarkan data sensitif sebelum dipublikasikan.
3. Konversi gambar menjadi WebP dengan dimensi yang wajar untuk web.
4. Simpan hasil pada `public/partnership-collaboration/documentation/`.
5. Tambahkan item pada `partnershipDocumentation` dengan alt text, caption, kategori, dan tanggal jika terverifikasi.
6. Jangan tambahkan card image jika file belum tersedia.

## Adding a New PDF

1. Periksa isi PDF dan identifikasi nomor telepon, alamat privat, email personal, atau data sensitif lainnya.
2. Buat versi publik yang sudah disamarkan pada `public/documents/partnership/`.
3. Render setiap halaman menjadi WebP pada `public/partnership-collaboration/documents/`.
4. Tambahkan data file dan seluruh halaman preview pada `partnershipDocuments`.
5. Pastikan modal dapat discroll dan tombol unduh menunjuk ke versi publik PDF.

## Responsive and Interaction Notes

- Dokumentasi memakai satu kolom pada mobile dan dua kolom pada tablet atau desktop.
- Supporting documents memakai satu kolom pada mobile, dua kolom pada tablet, dan tiga kolom pada desktop.
- Modal menggunakan portal, mengunci scroll halaman, mendukung Escape, menjaga fokus keyboard, dan tidak membuka tab baru.
- PDF ditampilkan sebagai rangkaian gambar vertikal agar dapat discroll pada layar kecil.
- Filter week hanya menampilkan week yang sudah memiliki progress report dan akan bertambah otomatis dari data.
