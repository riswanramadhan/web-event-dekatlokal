# Sponsorship Proposal Flipbook Specification

## Route

`/ai-co-creation-lab-makassar/sponsorship-proposal`

## Tujuan halaman

Halaman menjelaskan peluang kolaborasi sponsorship AI Co-Creation Lab Makassar dan menampilkan preview proposal berbentuk flipbook interaktif.

Proposal master terdiri dari 24 halaman. Untuk fase awal, isi flipbook masih placeholder. Halaman pertama adalah cover. Halaman 2-24 berupa halaman putih minimal dengan nomor halaman dan ruang kosong, tetapi seluruh interaksi flipbook harus berfungsi.

## Struktur halaman

### Hero

Eyebrow:

`SPONSORSHIP & COLLABORATION`

Title:

`Support Local Talent. Enable Digital Solutions for UMKM.`

Description:

`AI Co-Creation Lab Makassar mempertemukan 20 mahasiswa dan 5 UMKM untuk mengembangkan lima prototype sistem digital berdasarkan kebutuhan operasional yang nyata. Kami membuka kolaborasi melalui dukungan dana, produk, jasa, fasilitas, maupun pembayaran langsung kepada vendor.`

Primary CTA:

`Lihat Proposal`

Secondary CTA:

`Hubungi Tim DekatLokal`

### Partnership value

Tampilkan empat value card:

1. Youth & AI Talent Development
2. UMKM Digitalization
3. Product and Brand Experience
4. Measurable Impact Report

### Support categories

- Main Impact Partner
- Official Apparel Partner
- Official Identity Partner
- Official Merchandise Partner
- Official Food & Beverage Partner

Tampilkan nilai singkat dari data proposal existing, tetapi jangan mengubah data source jika sudah tersedia.

### Flipbook section

Title:

`Explore the Sponsorship Proposal`

Description:

`Klik cover atau gunakan kontrol untuk membuka dan menelusuri proposal seperti sebuah buku.`

## Teknologi flipbook

Gunakan `react-pageflip` sebagai pilihan utama.

Instal hanya jika belum tersedia:

```bash
npm install react-pageflip
```

Ikuti package manager repository.

Karena library membutuhkan DOM:

- buat client component;
- import melalui `next/dynamic` dengan `ssr: false` bila diperlukan;
- hindari hydration mismatch.

## Data pages

Gunakan `sponsorship-proposal-pages.ts` sebagai single source of truth.

Total page items harus tepat 24.

- Page 1: cover
- Page 2-24: placeholder

Jangan membuat 24 page component manual.

## Perilaku flipbook

### Initial state

- cover terlihat sebagai satu halaman tertutup;
- book berada di tengah;
- cover dapat diklik untuk membuka;
- `showCover: true`.

### Open state desktop

- tampil sebagai spread dua sisi;
- rasio halaman portrait/A4;
- gutter/spine terlihat halus;
- page shadow ringan;
- tidak overflow viewport.

### Mobile

- single-page portrait;
- swipe/touch berfungsi;
- controls tetap dapat digunakan;
- tidak ada horizontal overflow.

### Controls

- halaman pertama;
- sebelumnya;
- berikutnya;
- halaman terakhir;
- page counter;
- keyboard ArrowLeft dan ArrowRight;
- status halaman menggunakan `aria-live`.

### Interaction

- klik cover membuka buku;
- klik sisi halaman atau tombol membalik halaman;
- swipe bekerja;
- tombol disabled pada batas awal/akhir;
- reduced motion dihormati;
- jangan autoplay.

## Visual

- background halaman proposal putih;
- cover menggunakan blue #0255F5;
- typography mengikuti event site;
- cover menampilkan:
  - DekatLokal;
  - SPONSORSHIP & COLLABORATION PROPOSAL;
  - AI Co-Creation Lab Makassar;
  - From AI Users to Local Problem Solvers;
  - dekatlokal.com dan event.dekatlokal.com.
- placeholder pages mostly blank;
- page number kecil;
- subtle event watermark boleh digunakan;
- jangan menggunakan logo calon sponsor.

## SEO sementara

Karena isi proposal belum final di flipbook, gunakan:

```ts
robots: {
  index: false,
  follow: false,
}
```

Setelah isi final dipasang, noindex dapat ditinjau ulang.

## Future-ready architecture

Page data harus mendukung tipe:

- cover;
- placeholder;
- image;
- custom.

Contoh future image:

```ts
{
  pageNumber: 2,
  type: "image",
  imageSrc: "/proposals/ai-co-creation/page-02.webp",
  alt: "Tentang Program"
}
```

Jangan memasukkan PDF renderer atau PDF.js untuk fase placeholder. Flipbook menggunakan HTML pages agar animasi stabil dan ringan.
