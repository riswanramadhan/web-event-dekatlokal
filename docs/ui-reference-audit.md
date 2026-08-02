# Audit Referensi UI DekatLokal

## Ruang lingkup

Folder `referensi-ui-dekatlokal` diaudit sebagai referensi visual read-only. Folder ini berisi potongan App Router, komponen layout, komponen UI, section landing, form assessment, serta logic lama yang tidak lengkap sebagai aplikasi mandiri.

File utama yang ditinjau:

- `referensi-ui-dekatlokal/app/globals.css`
- `referensi-ui-dekatlokal/app/layout.tsx`
- `referensi-ui-dekatlokal/components/layout/PublicHeader.tsx`
- `referensi-ui-dekatlokal/components/layout/Navbar.tsx`
- `referensi-ui-dekatlokal/components/layout/Footer.tsx`
- `referensi-ui-dekatlokal/components/layout/FinalCTA.tsx`
- `referensi-ui-dekatlokal/components/ui/button.tsx`
- `referensi-ui-dekatlokal/components/ui/input.tsx`
- `referensi-ui-dekatlokal/components/ui/field.tsx`
- `referensi-ui-dekatlokal/components/sections/landing/HeroSection.tsx`
- `referensi-ui-dekatlokal/components/sections/ProcessStepsSection.tsx`
- `referensi-ui-dekatlokal/components/sections/FaqSection.tsx`

Source produksi harus dibangun mandiri di `src` dan tidak boleh mengimpor runtime dari folder referensi.

Untuk pola informasi event, audit juga membandingkan susunan ringkas pada
`https://luma.com/` dan daftar event `https://www.ted.com/tedx/events`.
Yang diambil hanya prinsip urutan informasi: nama event, status, waktu, lokasi,
kapasitas, lalu CTA yang langsung. Branding, aset, copy, dan komposisi visual
tetap dibangun khusus untuk DekatEvent.

## Temuan visual

### Typography

- Font utama: **Poppins** weight 400, 500, 600, dan 700.
- Fallback: Geist Sans, system UI, dan Segoe UI.
- Geist Mono dipakai terbatas untuk kicker, angka langkah, kode, dan label teknis.
- Heading memakai tracking negatif dan line-height rapat; body memakai line-height lega.
- Pola ukuran yang terlihat:
  - hero H1 sekitar 30 px pada mobile, 48 px pada tablet, hingga 68 px pada desktop;
  - section H2 sekitar 24 px pada mobile dan 36–44 px pada desktop;
  - body 14–16 px dengan line-height sekitar 28–32 px;
  - eyebrow/kicker 11–13 px, uppercase, tracking lebar.

Adaptasi event mempertahankan hierarki tersebut, tetapi teks form dan informasi penting tidak boleh terlalu kecil.

### Warna

Palet utama referensi:

| Token | Nilai |
|---|---|
| Primary | `#0255F5` |
| Primary 50 | `#EBF1FE` |
| Primary 100 | `#B7CFFC` |
| Primary 200 | `#83AEFA` |
| Primary 300 | `#4F8DF8` |
| Primary 400 | `#1B6CF6` |
| Primary 600 | `#0244C4` |
| Primary 700 | `#013393` |
| Primary 800 | `#012262` |
| Primary 900 | `#001131` |

Neutral memakai skala Tailwind dari `#FAFAFA` sampai `#0A0A0A`. Latar global cenderung putih, `#F8FBFF`, atau `#FBFDFF` dengan tint biru tipis. Warna semantic yang tersedia: success `#22C55E`, warning `#F59E0B`, error `#EF4444`, dan info `#3B82F6`.

Keputusan untuk MVP:

- biru `#0255F5` menjadi primary CTA, link, active state, dan aksen;
- teks utama memakai neutral 900/950;
- teks sekunder memakai neutral 600;
- border memakai neutral 200 atau primary dengan opacity rendah;
- status tidak disampaikan melalui warna saja;
- gradient digunakan terbatas pada hero/CTA, bukan sebagai dekorasi setiap section.

### Spacing dan container

- Container utama umumnya `max-w-7xl` atau sekitar 80 rem.
- Padding horizontal: 16 px mobile, 24 px tablet, dan 48 px desktop.
- Konten hero sering dibatasi `max-w-5xl`; copy dibatasi `max-w-2xl` sampai `max-w-4xl`.
- Jarak antar-section bertambah menurut breakpoint, sekitar 64 px mobile hingga 96–128 px desktop.
- Grid memakai gap 16–20 px pada card rapat dan 32–56 px pada komposisi section.
- Whitespace digunakan untuk memisahkan hierarki, bukan menambah banyak divider.

### Radius dan shadow

- Token radius dasar adalah `0.625rem`.
- Input dan kontrol kecil memakai radius 8–12 px.
- Card memakai radius 16–24 px; card editorial/FAQ sering memakai 24 px.
- Navbar dan CTA utama memakai pill penuh.
- Shadow biru gelap ber-opacity rendah; hover mengangkat card atau tombol sekitar 2–4 px.

MVP menggunakan satu keluarga radius yang konsisten dan shadow ringan. Glass effect hanya boleh muncul terbatas pada navigasi, bukan pada seluruh card.

### Button

Pola referensi:

- primary biru dengan teks putih;
- CTA hero putih dengan teks biru;
- secondary berupa outline;
- bentuk pill untuk CTA utama;
- tinggi interaktif minimal sekitar 40–48 px;
- icon dapat ditempatkan dalam lingkaran terpisah;
- hover berupa perubahan warna, shadow, dan lift ringan;
- active state mengecil tipis;
- focus-visible memakai ring yang jelas;
- disabled state tidak interaktif dan opacity berkurang.

Adaptasi event menetapkan target sentuh minimal 44 px, label CTA yang langsung, serta pending/disabled state untuk mencegah double submit.

### Card

- Surface putih atau primary-50.
- Border neutral tipis atau primary dengan opacity rendah.
- Radius 16–24 px.
- Shadow `rgba(1,34,98,...)` yang halus.
- Heading pendek, body ber-line-height lega, dan icon pada tile biru/tinted.
- Grid berubah dari satu kolom ke dua/empat kolom sesuai ruang.
- Hover lift digunakan hanya jika card memang interaktif.

Metric card harus menyebut konteks `Target` atau `Actual`, bukan hanya menampilkan angka besar.

### Navbar

Referensi memakai:

- header fixed di atas konten;
- desktop navbar berbentuk pill putih/transparan dengan border dan backdrop blur;
- active link memakai primary-50 dan primary;
- CTA biru di sisi kanan;
- menu mobile berubah menjadi panel collapsible;
- kontrol menu memiliki label, `aria-expanded`, Escape handling, focus ring, dan target sentuh memadai.

Adaptasi MVP memakai struktur lebih sederhana untuk platform/event. Promo bar komersial bukan bagian wajib dan tidak dibawa bila tidak relevan dengan event.

### Footer

- Surface putih dengan border-top beraksen primary.
- Container mengikuti lebar navbar.
- Desktop memakai beberapa kolom; mobile menumpuk.
- Brand, deskripsi singkat, navigasi, kontak, legal, dan tahun dinamis.
- Link memiliki target sentuh dan focus-visible state.

Footer event mengutamakan link event, privacy, terms, `dekatlokal.com`, serta label “Powered by DekatLokal”. Kontak hanya ditampilkan setelah config resmi tersedia.

### Form

Referensi menyediakan pola:

- `fieldset`/legend dan field group;
- label terhubung dengan kontrol;
- helper text;
- error dengan `role="alert"`;
- border dan ring untuk focus/invalid state;
- input full-width;
- pilihan horizontal atau vertical yang responsif.

Adaptasi registration:

- section form dipisahkan secara semantik;
- field memiliki label dan helper dalam Bahasa Indonesia;
- input mobile minimal 44 px;
- error field dan feedback submit diumumkan;
- multi-select dapat digunakan dengan keyboard;
- consent memakai label eksplisit;
- honeypot tidak mengganggu pembaca layar;
- tidak ada PII dalam URL atau analytics.

### Responsive dan motion

- Breakpoint utama mengikuti `sm`, `md`, dan `lg`.
- Navbar desktop muncul mulai `md`; mobile menu digunakan di bawahnya.
- Grid beralih 1 → 2 → 4 kolom.
- Padding, type scale, radius, dan visual hero mengecil di mobile.
- `overflow-x` dicegah pada page shell.
- Referensi menghormati `prefers-reduced-motion` dan mematikan animation/transition yang tidak penting.

MVP mempertahankan motion ringan untuk hover/feedback dan tidak bergantung pada animasi untuk menyampaikan status.

## Elemen yang digunakan

- Poppins sebagai font utama dan mono untuk label/kode terpilih.
- Palet primary serta neutral.
- Container dan pola padding responsif.
- Header pill, active link, dan mobile navigation yang accessible.
- CTA primary/secondary dengan target sentuh memadai.
- Card putih/tinted, border tipis, radius besar, dan shadow halus.
- Eyebrow uppercase, heading ringkas, dan body lega.
- Form label/helper/error yang semantik.
- Footer responsif dengan link legal.
- Reduced-motion support.

## Elemen yang sengaja tidak digunakan

- Import runtime dari `referensi-ui-dekatlokal`.
- Auth, admin dashboard, assessment scoring, API, database, atau business logic lama.
- Splash screen delapan detik.
- DekatAI widget dan WhatsApp floating action button.
- Promo komersial yang tidak berhubungan dengan event.
- Orbit visual dan decorative motion kompleks yang tidak mendukung informasi.
- Dependency lama seperti `motion/react`, Iconify, Radix, atau shadcn hanya demi menyalin komponen.
- Gradient, glassmorphism, shimmer, dan decorative blob berlebihan.
- Logo, foto, testimoni, atau partner dari situs referensi sebagai klaim event.
- Copy layanan website/UMKM dari produk lama.

## Adaptasi community support

Halaman `/community-support` tetap memakai token produksi yang sudah dibangun
dari audit ini: Poppins, primary blue, container responsif, CTA pill, border
tipis, radius konsisten, focus-visible, dan motion yang menghormati reduced
motion. Susunannya sengaja lebih editorial daripada crowdfunding template:
statistik berupa baris ringkas, kebutuhan dukungan berupa daftar terstruktur,
dua rekening berupa card fungsional, lalu satu form yang jelas di mobile.

Card rekening memakai aset resmi yang diberikan pemilik di
`public/bank-logos/` untuk Bank Mandiri dan Bank Syariah Indonesia. Nama bank
tetap tertulis sehingga logo bersifat dekoratif dan tidak menjadi satu-satunya
identifikasi tujuan transfer. CTA proposal selalu mengarah ke
`https://event.dekatlokal.com/ai-co-creation-lab-makassar/sponsorship-proposal`.

Upload menampilkan status file dan helper privasi, tetapi bukti tidak menjadi
social proof visual dan tidak memiliki public URL. Form tidak meminta tanggal
transfer. Begitu submission tersimpan, dialog modal yang dapat diakses dengan
keyboard langsung menampilkan ucapan terima kasih, reference code, dan CTA
WhatsApp opsional; tidak ada state menunggu verifikasi.

Ticker tipis ditempatkan di atas navbar khusus halaman ini. Ticker menampilkan
maksimal 10 submission nyata yang bernama dan memiliki consent eksplisit,
dengan nama yang disamarkan server-side serta nominal yang dilaporkan
supporter. Teks memakai frasa “mengirim konfirmasi dukungan” agar tidak
mengklaim transfer telah diverifikasi. Saat data opt-in belum ada, rail memakai
pesan kampanye netral tanpa nama atau nominal rekaan. Ticker memiliki tombol
jeda, berhenti saat hover/focus, dan menjadi statis ketika reduced motion aktif.

Section verified progress dihapus. Halaman tidak ditautkan dari navigasi atau
sitemap, memakai `noindex`, dan diblokir melalui robots agar hanya
disebarluaskan lewat URL langsung. Pengaturan ini tidak diperlakukan sebagai
autentikasi.

Angka `5 Digital Prototypes` pada hero diberi konteks **Target program / planned
outcome**. Ini adalah target kampanye yang disengaja, bukan actual metric,
sementara sumber canonical MVP lain tetap mencatat target 4 tim/4 solusi sampai
ada keputusan produk untuk merekonsiliasi keduanya. Tidak ada klaim bahwa lima
prototype telah selesai.

## Boundary implementasi

- Folder referensi tidak diedit atau dihapus.
- Aset referensi tidak otomatis dianggap berlisensi untuk event.
- Komponen produksi dibangun ulang sesuai kebutuhan MVP.
- Pola visual boleh diadaptasi; logic dan dependency tidak disalin tanpa alasan.
- Pemeriksaan akhir harus memastikan tidak ada import production yang mengarah ke `referensi-ui-dekatlokal`.
