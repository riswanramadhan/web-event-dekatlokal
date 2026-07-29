# Laporan GEP Week 1

## Route

Tiga laporan tersedia melalui URL langsung:

- `/ai-co-creation-lab-makassar/progress/leadership-network-mapping`
- `/ai-co-creation-lab-makassar/progress/identifikasi-masalah-sosial`
- `/ai-co-creation-lab-makassar/progress/mini-project-canvas`

Route memakai satu dynamic segment `[slug]`, dipregenerasi untuk tiga slug di
atas, dan menampilkan 404 untuk slug lain.

## Perilaku unlisted

Laporan tidak ditautkan dari navbar, footer, mobile navigation, halaman event,
event listing, journey publik, internal search, atau sitemap. Setiap laporan
memasang metadata `noindex, nofollow`, termasuk instruksi yang sama untuk
Googlebot.

> Unlisted route is not authentication. Anyone with the URL may access the report.

`noindex` membantu mencegah pengindeksan mesin pencari, tetapi bukan kontrol
akses. Jangan memasukkan data pribadi, rahasia, atau evidence yang belum aman
untuk dibuka oleh publik.

## Mengubah konten

Sumber resmi isi laporan berada di:

- `new-report/REPORT_01_LEADERSHIP_NETWORK_MAPPING.md`
- `new-report/REPORT_02_IDENTIFIKASI_MASALAH_SOSIAL.md`
- `new-report/REPORT_03_MINI_PROJECT_CANVAS.md`

Source of truth yang dibaca aplikasi berada di
`src/data/gep-week-1-reports.ts`. Perubahan yang telah disetujui harus
diperbarui pada Markdown resmi dan direpresentasikan sama persis pada typed
configuration tersebut. Jangan menaruh copy laporan di route atau komponen
presentasi.

Saat memperbarui isi:

1. pastikan perubahan sudah disetujui pemilik laporan;
2. pertahankan urutan section, paragraf, daftar, kutipan, dan tabel;
3. jangan mengubah target menjadi capaian aktual;
4. jangan memperkuat status partnership atau menambah stakeholder tanpa dasar;
5. sinkronkan progress description, URL, status, next step, dan tanggal update;
6. jalankan lint, typecheck, dan build.

## Memperbarui status

Perbarui record laporan terkait di `src/data/gep-week-1-reports.ts`, khususnya
field `status`, `nextStep`, `updatedAt`, dan `updatedAtIso`. Gunakan status yang
sesuai kondisi nyata; status tidak boleh dinaikkan hanya karena halaman telah
dipublikasikan. Sinkronkan perubahan yang sama ke Markdown sumber agar audit
konten tetap dapat dilakukan.

## Evidence

Sebelum evidence tersedia, halaman menampilkan:

> Dokumentasi akan ditambahkan setelah proses terkait diselesaikan.

Evidence kelak hanya boleh ditambahkan setelah:

1. bukti benar-benar tersedia dan telah diverifikasi;
2. akses publiknya disetujui;
3. tidak ada PII, credential, atau data UMKM yang sensitif;
4. judul link menjelaskan tujuan bukti;
5. URL dan konteksnya ditambahkan ke field `evidence` pada typed report data,
   bukan langsung di page component.

Jangan membuat URL sementara atau evidence palsu untuk menghilangkan empty
state.

## Cetak atau simpan PDF

1. Buka URL laporan melalui browser.
2. Pilih tombol **Cetak / Simpan PDF**.
3. Pilih printer atau opsi **Save as PDF** pada dialog browser.

Mode cetak menyembunyikan header, footer, mobile navigation, route loading UI,
dan tombol aksi. URL laporan serta tanggal pembaruan tetap ditampilkan, tabel
dibuat terbaca, dan section dijaga agar tidak mudah terpotong.

## Validasi setelah perubahan

Jalankan:

```text
npm run lint
npm run typecheck
npm run build
```

Selain itu, periksa ketiga URL, 404 untuk slug invalid, metadata noindex,
ketiadaan route pada sitemap, hasil copy, dan preview cetak pada browser.
