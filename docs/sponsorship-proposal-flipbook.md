# Sponsorship Proposal Flipbook

## Route dan status

Route:

`/ai-co-creation-lab-makassar/sponsorship-proposal`

Halaman menjelaskan peluang kolaborasi untuk AI Co-Creation Lab Makassar dan
menyediakan preview proposal berbentuk flipbook. Selama halaman 2-24 masih
placeholder, route menggunakan metadata `noindex, nofollow`.

Route ditautkan dari event page melalui CTA relevan, bukan ditambahkan ke navbar
global. Route placeholder juga tidak dimasukkan ke sitemap.

## Source of truth

Sumber paket:

- `new-report/SPONSORSHIP_PROPOSAL_FLIPBOOK_SPEC.md`;
- `new-report/sponsorship-proposal-pages.ts`.

Data production harus tetap typed dan tidak diduplikasi pada komponen. Model
page:

```ts
type SponsorshipProposalPage = {
  pageNumber: number;
  type: "cover" | "placeholder" | "image" | "custom";
  title?: string;
  imageSrc?: string;
  alt?: string;
};
```

Array harus memiliki tepat 24 item:

- page 1: `cover`;
- page 2-24: `placeholder`.

Metadata source:

```ts
{
  title: "Sponsorship Proposal | AI Co-Creation Lab Makassar",
  description:
    "Peluang kolaborasi untuk mendukung pengembangan talenta mahasiswa dan digitalisasi UMKM melalui AI Co-Creation Lab Makassar.",
  totalPages: 24,
  isPlaceholder: true,
}
```

## Copy halaman

### Hero

- Eyebrow: `SPONSORSHIP & COLLABORATION`
- Title: `Support Local Talent. Enable Digital Solutions for UMKM.`
- Description: `AI Co-Creation Lab Makassar mempertemukan 20 mahasiswa dan 5 UMKM untuk mengembangkan lima prototype sistem digital berdasarkan kebutuhan operasional yang nyata. Kami membuka kolaborasi melalui dukungan dana, produk, jasa, fasilitas, maupun pembayaran langsung kepada vendor.`
- Primary CTA: `Lihat Proposal`
- Secondary CTA: `Hubungi Tim DekatLokal`

Primary CTA membawa pengguna ke section flipbook. Secondary CTA dapat memakai
contact route atau mailto DekatLokal existing.

### Partnership value

1. Youth & AI Talent Development
2. UMKM Digitalization
3. Product and Brand Experience
4. Measurable Impact Report

### Support categories

1. Main Impact Partner
2. Official Apparel Partner
3. Official Identity Partner
4. Official Merchandise Partner
5. Official Food & Beverage Partner

Nilai singkat kategori diambil dari data proposal/report existing. Kategori
tidak boleh dipresentasikan sebagai sponsor yang telah dikonfirmasi dan tidak
boleh menampilkan logo calon sponsor.

### Flipbook

- Title: `Explore the Sponsorship Proposal`
- Description: `Klik cover atau gunakan kontrol untuk membuka dan menelusuri proposal seperti sebuah buku.`

Cover menggunakan blue `#0255F5` dan memuat:

- DekatLokal;
- `SPONSORSHIP & COLLABORATION PROPOSAL`;
- AI Co-Creation Lab Makassar;
- From AI Users to Local Problem Solvers;
- dekatlokal.com;
- event.dekatlokal.com.

Page 2-24 tetap mostly blank dengan border/shadow halus dan nomor halaman kecil.
Title data seperti `Proposal Page 2` tidak perlu menjadi copy substantif yang
terlihat.

## Dependency dan component boundary

Gunakan `react-pageflip`. Repository menggunakan npm:

```text
npm install react-pageflip
```

Instal hanya bila dependency belum tersedia. Commit perubahan manifest dan
lockfile bersamaan. Library membutuhkan DOM, sehingga integrasi ditempatkan di
Client Component terisolasi. Dynamic import dengan `ssr: false` digunakan bila
dibutuhkan untuk mencegah hydration mismatch.

Pembagian komponen yang disarankan:

- `SponsorshipFlipbookClient` untuk lifecycle, ukuran, keyboard, dan page state;
- `ProposalPage` untuk renderer typed page;
- `FlipbookControls` untuk first/previous/next/last dan counter.

Section hero, value, support category, dan contact tetap dapat menjadi Server
Components. Jangan menambahkan PDF.js atau PDF renderer pada fase placeholder.

## Perilaku wajib

### Initial dan desktop

- Cover ditampilkan sebagai single-page book tertutup.
- Cover dapat diklik untuk membuka.
- `showCover: true`.
- Setelah dibuka pada desktop, book menjadi two-page spread.
- Page portrait menggunakan rasio mendekati A4.
- Lebar satu page desktop sekitar 400-460 px.
- Spread, gutter, dan shadow tetap muat dalam container.

### Mobile

- Single-page portrait.
- Swipe/touch bekerja.
- Controls tetap dapat digunakan.
- Ukuran dihitung dari container, misalnya dengan `ResizeObserver`.
- Jangan bergantung pada fixed viewport width.
- Tidak ada horizontal overflow pada 360 px.

### Controls dan accessibility

- first, previous, next, dan last bekerja;
- ArrowLeft dan ArrowRight bekerja ketika konteks flipbook aktif;
- page counter memakai page index library yang telah dinormalisasi ke nomor
  pengguna;
- disabled state benar pada batas awal/akhir;
- perubahan halaman diumumkan melalui region `aria-live`;
- control memiliki accessible name dan visible focus;
- touch target memadai;
- klik cover tidak menghilangkan alternatif keyboard;
- swipe bukan satu-satunya cara bernavigasi;
- tidak ada autoplay;
- reduced motion dihormati.

Event listener keyboard dan observer harus dilepas saat component unmount.
Jangan menangkap ArrowLeft/ArrowRight ketika fokus berada pada control lain yang
membutuhkan tombol tersebut.

## Mengganti placeholder dengan page image

Simpan aset final pada path yang stabil, misalnya:

```text
public/proposals/ai-co-creation/page-02.webp
```

Ubah item terkait dalam source of truth:

```ts
{
  pageNumber: 2,
  type: "image",
  imageSrc: "/proposals/ai-co-creation/page-02.webp",
  alt: "Tentang Program",
}
```

Saat mengganti:

1. pertahankan `pageNumber` 1-24 berurutan;
2. jangan mengubah total menjadi selain 24 tanpa spesifikasi baru;
3. berikan `alt` yang menjelaskan fungsi/isi page;
4. optimalkan ukuran image dan hindari teks penting yang tidak dapat diakses;
5. pastikan renderer `image` tidak mengganggu ukuran flipbook;
6. uji desktop, mobile, swipe, keyboard, counter, dan hydration kembali;
7. jangan menambahkan klaim sponsor atau impact yang belum disetujui.

Tipe `custom` digunakan hanya jika page membutuhkan struktur HTML yang memang
telah disetujui. Jangan memasukkan copy proposal palsu untuk mengisi ruang.

## Mengubah noindex

Selama `isPlaceholder` bernilai `true`, metadata harus tetap:

```ts
robots: {
  index: false,
  follow: false,
}
```

Noindex hanya ditinjau ulang setelah:

1. seluruh page final telah dipasang;
2. copy, sponsor claim, logo, dan kontak telah disetujui;
3. accessibility dan responsive QA lulus;
4. metadata title/description/canonical telah ditinjau;
5. keputusan publikasi telah diberikan pemilik konten.

Setelah semua syarat terpenuhi, ubah status placeholder/config metadata pada
source of truth, bukan dengan hardcode tersebar. Bila route akan diindeks,
tinjau sitemap secara terpisah; menghapus noindex tidak otomatis berarti route
harus masuk sitemap.

## Validasi

Jalankan:

```text
npm run lint
npm run typecheck
npm run build
```

Manual QA harus membuktikan:

- route terbuka;
- exact hero/value/category copy;
- tepat 24 page;
- initial cover single-page dan cover click;
- desktop spread dan mobile single;
- swipe, four controls, dan arrow keys;
- counter, disabled state, dan `aria-live`;
- reduced motion dan no autoplay;
- no hydration warning;
- no horizontal overflow pada 360 px;
- noindex/nofollow;
- CTA event page menuju route tanpa perubahan navbar global.
