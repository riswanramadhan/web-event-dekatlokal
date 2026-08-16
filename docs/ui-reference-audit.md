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

| Token       | Nilai     |
| ----------- | --------- |
| Primary     | `#0255F5` |
| Primary 50  | `#EBF1FE` |
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
motion. Alur utamanya sengaja dipadatkan menjadi hero singkat, dua rekening
tujuan, lalu satu form. Statistik hero, penjelasan panjang, grid alokasi, dan
sidebar form dihapus agar perhatian pengguna tetap pada tindakan support.

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
supporter. Copy mengikuti format `P*** N** telah support senilai Rp150.000`;
nominal tersebut tetap dipahami sebagai informasi yang dikirim supporter,
bukan hasil verifikasi bank. Saat data opt-in belum ada atau database tidak
tersedia, ticker disembunyikan sehingga tidak ada nama atau nominal rekaan.
Ticker memakai latar biru dan teks putih, bergerak dari kanan ke kiri, memiliki
tombol jeda, berhenti saat hover/focus, menjadi statis ketika reduced motion
aktif, dan tetap sticky di atas viewport pada mobile.

Section verified progress dihapus. Halaman tidak ditautkan dari navigasi atau
sitemap, memakai `noindex`, dan diblokir melalui robots agar hanya
disebarluaskan lewat URL langsung. Pengaturan ini tidak diperlakukan sebagai
autentikasi.

Tidak ada target atau actual metric pada halaman support. Ringkasan kebutuhan
di hero hanya menyebut kategori penggunaan secara umum dan tidak mengklaim
jumlah peserta, partner, hasil, atau dukungan yang belum memiliki bukti.

## Boundary implementasi

- Folder referensi tidak diedit atau dihapus.
- Aset referensi tidak otomatis dianggap berlisensi untuk event.
- Komponen produksi dibangun ulang sesuai kebutuhan MVP.
- Pola visual boleh diadaptasi; logic dan dependency tidak disalin tanpa alasan.
- Pemeriksaan akhir harus memastikan tidak ada import production yang mengarah ke `referensi-ui-dekatlokal`.

## Week 2 dan Week 3 Progress Addendum

Progress Pitching Mini Project, Finalisasi Action Plan, Global Communication,
dan rangkaian Week 3 melanjutkan sistem report produksi yang sudah digunakan
oleh Week 1 dan dua progress awal Week 2. Implementasi mempertahankan:

- route dinamis `/ai-co-creation-lab-makassar/progress/[slug]`;
- header report, breadcrumb, status, update date, report actions, dan navigasi
  previous/next existing;
- container `max-w-5xl`, card radius `1.5rem`, border netral, shadow ringan,
  Poppins, label Geist Mono, serta primary blue `#0255F5`;
- hierarki editorial berupa konteks singkat, evidence, insight, output,
  progress description, dan next progress;
- layout mobile-first dengan flow vertikal pada layar sempit dan grid hanya
  ketika ruang mencukupi;
- print treatment, focus-visible, touch target, semantic heading, serta
  reduced-motion behavior existing.

Evidence baru tidak memperkenalkan visual generatif. Pitch deck ditampilkan
sebagai PDF asli 17 halaman dengan pratinjau click-to-load serta fallback
view/download agar file besar tidak otomatis dimuat di mobile. Global
Communication memakai native video player tanpa autoplay dan file MP4 asli.
Dokumentasi Week 3 memakai foto kegiatan dan screenshot prototype aktual yang
diberikan pemilik, bukan lagi empty state berbasis evidence pra-pelaksanaan.
Video Global Communication tetap hanya menjadi evidence Week 2 dan tidak
dipakai ulang sebagai video report event Week 3.

Untuk menjaga status tetap jujur, report badge tetap memiliki tone eksplisit
untuk completed, in progress, documentation/finalization, dan placeholder.
Setelah finalisasi, lima progress Week 3 memakai state `Completed`; state lain
tetap tersedia bagi Week 4 yang memang belum selesai. Angka pelaksanaan diberi
label `Actual`, sedangkan target lama tidak diam-diam diubah menjadi impact.

### Week 3 Finalization — 14 Agustus 2026

Finalisasi mempertahankan seluruh design system report existing dan hanya
mengganti state, copy, serta evidence yang sebelumnya belum tersedia.
`Lead The Action` hanya menjadi tema: hub non-detail memakai route
`/progress/week-3`, sedangkan URL lama `/progress/lead-the-action` melakukan
permanent redirect dan tidak lagi dirender sebagai detail page. Keduanya tidak
masuk `progressReports`. Karena itu, filter Week 3 dan navigasi previous/next
hanya memiliki lima item:

1. Meet the Leader Challenge.
2. Leadership Conversation Report.
3. Mini Project Implementation.
4. Network Mobilization.
5. Process Documentation.

Kelima item menggunakan status `Completed`. `Completed · Functional` hanya
dipakai pada konteks lima prototype; label tersebut tidak menyatakan UAT,
deployment, handover, penggunaan berulang, atau adopsi Week 4 telah selesai.

Meet the Leader dan Leadership Conversation memakai identitas serta materi
yang diberikan pemilik: Ayu Anisela, Koordinator Utama Rumah BUMN BRI
Makassar. Tiga visual pertemuan disajikan melalui carousel ringan dengan
autoplay yang dapat dijeda, kontrol dot, interaksi swipe, reduced-motion
treatment, dan link menuju folder dokumentasi sumber.

Dokumentasi implementasi dikurasi agar halaman tetap ringan dan tidak menjadi
dump seluruh folder. Struktur aset produksi terdiri dari tiga gambar Meet the
Leader, lima screenshot prototype, dan dua belas gambar event terpilih; seluruh
path dicatat dalam `public/week-3/media-manifest.json`. Foto memakai
`next/image`, ukuran intrinsik, lazy loading untuk item non-hero, serta
`object-fit: cover` dengan posisi yang menjaga subjek utama.

Tidak ditemukan file video report event yang kompatibel di folder aset lokal.
Karena itu, implementasi tidak mengganti video tersebut dengan
`my-leadership-journey.mp4` milik Global Communication. Kategori Video Report
tetap terhubung ke folder dokumentasi lengkap Google Drive yang diberikan
pemilik sampai file event video terpisah tersedia sebagai aset runtime.

Partner, sponsor, dan lima UMKM memakai aset logo existing atau visual usaha
aktual yang sudah digunakan pada halaman lain. Tidak ada logo generatif, URL
prototype rekaan, stock image, testimoni rekaan, atau perluasan klaim dukungan
di luar peran yang diberikan pemilik.

Seluruh progress bersifat unlisted: tidak ditampilkan pada landing event,
navbar, atau sitemap, dan metadata serta header response report memakai
`noindex, nofollow, noarchive`. Aset evidence PDF/MP4 juga memakai
`X-Robots-Tag` untuk
mencegah indexing langsung. URL tetap dapat dibuka melalui link yang dibagikan
serta saling terhubung melalui navigasi report setelah pengguna masuk ke
rangkaian progress.

## Partnership & Collaboration Addendum

Halaman Partnership & Collaboration menggunakan pola report existing tanpa mengimpor runtime dari folder referensi. Implementasi mempertahankan header report, breadcrumb, status badge, card radius, spacing, page container, warna brand, typography, print treatment, serta previous dan next navigation yang sudah digunakan pada Problem Validation.

Interaksi baru dibatasi pada kebutuhan progress report:

- Filter week memakai card navigation existing dengan kontrol tombol yang accessible.
- Dokumentasi memakai modal gambar di dalam halaman tanpa tab baru.
- Pratinjau PDF memakai halaman WebP vertikal yang dapat discroll.
- Card tanpa asset gambar tidak membuat placeholder image.

## Week 4 Progress Addendum

Week 4 — Measure, Reflect & Sustain melanjutkan sistem report yang sama tanpa
membuat layout atau navigasi paralel. Hub dan detail tetap memakai route datar
`/ai-co-creation-lab-makassar/progress/[slug]`, header report, breadcrumb,
filter week, status badge, progress description, navigasi previous/next,
footer, serta treatment print existing. Route progress tetap unlisted, memakai
metadata serta response header `noindex, nofollow, noarchive`, dan tidak
ditambahkan ke sitemap. Route sengaja tetap dapat dicrawl agar crawler dapat
membaca directive `noindex`; ini bukan access control dan link tetap harus
dibagikan langsung.

Penyajian visual Week 4 mempertahankan container `max-w-5xl`, typography,
spacing, radius card, border, shadow, dan warna brand dari Week 1–3. Diagram
monitoring, measurement timeline, sustainability flow, dan final journey
memakai pola flow sederhana yang menumpuk vertikal pada mobile lalu membungkus
secara aman ketika ruang bertambah. Progress cards, evidence cards, checklist,
dan framework menggunakan surface serta hierarki editorial existing; tidak ada
chart, ilustrasi AI, gradient tambahan, atau animasi dekoratif baru.

Status Week 4 disampaikan melalui teks, ikon, dan tone. Navigasi hanya memakai
checkmark hijau untuk status yang benar-benar selesai. `In Progress`, data
collection, documentation/finalization, dan framework development tetap
ditampilkan sebagai pekerjaan berjalan; `To Be Completed`, preparation, dan
planned memakai state netral. Dengan demikian frasa `To Be Completed` tidak
keliru dibaca sebagai completed hanya karena mengandung kata “completed”.

Boundary evidence dan data tetap eksplisit:

- lima UMKM memakai sumber data Problem Validation existing, bukan daftar nama
  kedua;
- 20 mahasiswa, lima UMKM, dan lima tim hanya diposisikan sebagai actual
  kegiatan yang telah tersedia, bukan bukti impact;
- status prototype, UAT, deployment, handover, adoption, perubahan kemampuan,
  operational benefit, persentase, dan testimoni tidak diisi sebelum evidence
  terverifikasi;
- target dan actual result dipisahkan secara visual dan semantik;
- Project Monitoring Report, Impact Report, Leadership Reflection Essay, dan
  Final Presentation memakai empty state serta aksi nonaktif selama file belum
  tersedia;
- struktur Leadership Reflection tidak diisi dengan cerita personal rekaan,
  dan Final Presentation tidak memakai dummy deck.

Data journey Week 4 diselaraskan ke empat detail progress melalui evidence link
website. Monitoring dan impact measurement tetap berstatus dalam proses,
sedangkan leadership reflection dan final presentation tetap planned sampai
output final tersedia. Tanggal pembaruan pada journey menunjukkan pembaruan
struktur halaman, bukan tanggal penyelesaian atau klaim hasil.
