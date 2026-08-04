# CODEX EXECUTION PROMPT — PARTNERSHIP & COLLABORATION PROGRESS PAGE

Saya memiliki website event **AI Co-Creation Lab Makassar** yang sudah berjalan. Di dalam website sudah ada beberapa halaman progress/report, termasuk halaman progress sebelumnya untuk **Problem Validation**.

Tugas kamu adalah menambahkan **1 halaman progress baru** untuk kebutuhan Week 2 Global Experience Program:

```text
Partnership & Collaboration
```

Halaman ini harus menjadi progress berikutnya di area progress/report yang sudah ada, dengan UI, layout, typography, navigation, spacing, responsive behavior, dan visual language yang konsisten.

Kerjakan langsung pada codebase yang sedang terbuka.

---

# 1. WAJIB AUDIT CODEBASE TERLEBIH DAHULU

Sebelum coding:

1. Identifikasi framework, routing, styling, component library, dan struktur project.
2. Temukan seluruh halaman progress/report yang sudah ada.
3. Pelajari pola UI mereka:
   - hero;
   - status badge;
   - breadcrumbs;
   - progress navigation;
   - previous/next navigation;
   - section title;
   - card;
   - timeline;
   - documentation gallery;
   - supporting documents;
   - footer;
   - mobile behavior.
4. Temukan halaman index/list progress jika tersedia.
5. Temukan folder dokumentasi, asset partner, logo, MoU, surat dukungan, foto pertemuan, screenshot chat/email, dan dokumen lain yang sudah disiapkan user.
6. Gunakan hanya asset yang benar-benar ditemukan di dalam project.
7. Jangan memakai stock photo atau logo hasil pencarian internet.
8. Jangan membuat design system baru.
9. Jangan merombak halaman progress sebelumnya.
10. Perubahan pada halaman lain hanya boleh dilakukan untuk:
    - menambahkan halaman partnership ke daftar progress;
    - menghubungkan previous/next navigation;
    - memperbarui sitemap atau metadata jika diperlukan.
11. Setelah audit, langsung implementasikan. Jangan berhenti pada analisis atau rencana.

---

# 2. ROUTE DAN POSISI HALAMAN

Gunakan pola route progress existing.

Slug yang disarankan:

```text
partnership-collaboration
```

Contoh fallback:

```text
/progress/partnership-collaboration
```

Tetapi ikuti route architecture project yang sudah ada.

Posisikan halaman ini setelah halaman:

```text
Problem Validation
```

Tambahkan ke:

- daftar progress/report;
- navigation progress;
- previous/next navigation;
- sitemap jika tersedia;
- metadata route.

Page label:

```text
Week 2
```

Page title:

```text
Partnership & Collaboration
```

Status:

```text
In Progress
```

Subtitle:

```text
Building the support system behind the co-creation process.
```

---

# 3. TUJUAN HALAMAN

Halaman ini menjadi laporan publik untuk progress:

```text
Membangun Partnership
```

Ketentuan GEP yang harus dijawab:

```text
Menghubungi dan memperoleh komitmen minimal 1 mitra yang mendukung pelaksanaan mini project.
```

Evidence yang dapat ditampilkan:

- MoU;
- surat dukungan;
- email;
- chat;
- dokumentasi pertemuan;
- dokumentasi venue;
- logo partner;
- foto penandatanganan;
- dokumen sponsorship;
- dokumentasi proses penjajakan.

Halaman ini juga akan menjadi materi untuk bagian:

```text
Partnership & Collaboration
```

pada Final Presentation.

Narasi utamanya:

```text
AI Co-Creation Lab Makassar tidak dibangun oleh satu pihak.

Program ini tumbuh melalui dukungan lembaga pengembangan kepemimpinan, ekosistem UMKM, mitra pembelajaran digital, mitra infrastruktur, institusi pendidikan, penyedia venue, komunitas kreatif, dan masyarakat yang percaya bahwa teknologi dapat dibangun bersama untuk menjawab masalah nyata.
```

---

# 4. TONE DAN COPYWRITING

Gunakan tone:

- profesional;
- human;
- kolaboratif;
- optimistis;
- transparan;
- tidak berlebihan;
- tidak terlalu formal;
- tetap kredibel;
- berbasis evidence.

Gunakan Bahasa Indonesia sebagai bahasa utama.

English digunakan hanya untuk:
- short heading;
- partner category;
- highlight statement;
- quote;
- status;
- role partner.

Hindari:
- menyebut semua pihak sebagai sponsor jika perannya berbeda;
- klaim dukungan yang tidak ada buktinya;
- menyebut nilai dukungan jika tidak memiliki dokumen;
- wording yang terdengar meminta belas kasihan;
- tampilan seperti daftar logo biasa tanpa cerita;
- AI-generated sounding copy.

Gunakan istilah sesuai konteks:

```text
Program Support Ecosystem
Ecosystem Partner
Official Digital Infrastructure Partner
Official Digital Learning Partner
Venue Partner
Creative Space Partner
Academic Talent Partner
Community Support
```

---

# 5. HERO SECTION

Heading:

```text
Partnership & Collaboration
```

Subheading:

```text
A meaningful project needs more than a good idea. It needs people and institutions willing to build it together.
```

Body:

```text
AI Co-Creation Lab Makassar berkembang melalui kolaborasi lintas lembaga, industri, kampus, ekosistem UMKM, dan komunitas.

Setiap mitra membawa peran yang berbeda—mulai dari akses penerima manfaat, pembelajaran digital, infrastruktur sistem, sumber daya manusia, venue, publikasi, hingga ruang untuk terus mengembangkan program.
```

Tambahkan status badge:

```text
Week 2 — Partnership Building in Progress
```

Tambahkan summary metrics yang dihitung dari data partner:

```text
8+ Supporting Institutions
3 Signed MoUs
2 Official Digital Partners
2 Venue Options
Rp17.525.000+ Quantified In-Kind Support
```

Catatan implementasi:

- Jangan menampilkan angka yang tidak dapat didukung data.
- Rp17.525.000 berasal dari:
  - Inovasi Digital: Rp2.525.000
  - Dicoding Indonesia: Rp15.000.000
- Gunakan wording `Quantified In-Kind Support`, karena ada dukungan lain yang belum dihitung secara nominal.
- Jika setelah audit ditemukan evidence berbeda, prioritaskan data resmi pada dokumen.

Tambahkan main highlight:

```text
Different roles. One shared commitment: making useful technology possible for local businesses.
```

---

# 6. PARTNERSHIP ECOSYSTEM OVERVIEW

Heading:

```text
Our Partnership Ecosystem
```

Buat visual ekosistem yang sederhana dan responsive.

Kategori:

```text
Program Support
UMKM Ecosystem
Digital Infrastructure
Digital Learning
Venue & Creative Space
Academic Talent
Community Support
```

Di tengah visual:

```text
AI Co-Creation Lab Makassar
```

Outcome:

```text
5 UMKM
20 students
5 co-creation teams
5 digital prototypes
```

Gunakan CSS layout atau component existing.

Jangan install diagram library baru.

Pada mobile, visual berubah menjadi vertical flow atau stacked categories.

---

# 7. PROGRAM SUPPORT ECOSYSTEM

Heading:

```text
The Ecosystem That Made This Possible
```

Tampilkan tiga lembaga berikut sebagai **Program Support Ecosystem**, bukan sponsor komersial:

## BAKTI NUSA

## GreatEdunesia

PENTING:
- Periksa exact brand naming dari logo atau asset existing.
- Jika asset menggunakan penulisan `GreatEduNesia`, gunakan penulisan tersebut.
- Jangan menebak ejaan jika asset resmi sudah tersedia.

## Dompet Dhuafa

Copy utama:

```text
BAKTI NUSA, GreatEdunesia, dan Dompet Dhuafa menjadi bagian penting dari ekosistem yang memungkinkan mini project ini bertumbuh.

Dukungan mereka tidak hanya hadir dalam bentuk kesempatan menjalankan program, tetapi juga melalui proses pembelajaran kepemimpinan, pendampingan, akses jejaring, ruang eksperimen, exposure, dan dorongan agar ide dapat diterjemahkan menjadi aksi yang memberi manfaat nyata.
```

Key statement:

```text
They did not only support an event. They created the space for young leaders to learn, test ideas, and turn leadership into impact.
```

Jangan menampilkan nilai rupiah untuk bagian ini kecuali ada dokumen resmi yang mendukung.

Status badge:

```text
Program Support Ecosystem
```

Siapkan tempat dokumentasi:

- logo lembaga;
- dokumentasi program;
- screenshot atau surat program;
- foto aktivitas relevan;
- optional supporting document.

---

# 8. RUMAH BUMN MAKASSAR

Heading:

```text
Connecting the Program to Real UMKM Needs
```

Partner:

```text
Rumah BUMN Makassar
```

Partner role:

```text
UMKM Ecosystem & Implementation Partner
```

Status:

```text
MoU Signed
```

Copy:

```text
Rumah BUMN Makassar menjadi mitra strategis dalam menghubungkan program dengan ekosistem UMKM dan calon co-creator.

Kolaborasi ini memastikan bahwa proses co-creation tidak berhenti sebagai simulasi, tetapi berangkat dari kebutuhan penerima manfaat yang nyata.
```

Dukungan yang diberikan:

```text
- Akses ke ekosistem UMKM penerima manfaat.
- Dukungan penjaringan beberapa mahasiswa co-creator.
- Dukungan ekosistem panitia kegiatan.
- Dukungan publikasi program.
- Opsi venue bootcamp apabila dibutuhkan.
- Koordinasi dan komitmen pelaksanaan melalui MoU bersama.
```

Key insight:

```text
The partnership gives the project real users, real problems, and a real environment to test the solutions.
```

Siapkan dokumentasi:

- foto penandatanganan MoU;
- file MoU;
- foto pertemuan;
- logo;
- dokumentasi penerima manfaat;
- supporting evidence.

---

# 9. INOVASI DIGITAL

Heading:

```text
Keeping Every Prototype Accessible Beyond the Event
```

Partner:

```text
Inovasi Digital
```

Role:

```text
Official Digital Infrastructure Partner
```

Status:

```text
MoU Signed
```

Representative:

```text
Dedi Julyan Sukawanto
Direktur Utama, Inovasi Digital
```

Dukungan:

```text
- 5 domain .web.id untuk lima sistem UMKM.
- 5 akun hosting Starter.
- Infrastruktur server dan akses database untuk masing-masing sistem.
- Masa layanan aktif selama 12 bulan.
- Dukungan aktivasi dan keberlanjutan akses sistem.
```

Nilai:

```text
Rp2.525.000
```

Value label:

```text
In-Kind Digital Infrastructure Sponsorship
```

Copy:

```text
Dukungan ini membuat lima prototype tidak berhenti sebagai demo di hari bootcamp.

Setiap solusi memiliki ruang untuk diakses, diuji, dan digunakan oleh UMKM penerima manfaat selama satu tahun setelah aktivasi.
```

Key statement:

```text
From prototype to something people can actually access.
```

Pastikan:
- Jangan menyebut hosting sebagai unlimited jika tidak ada bukti.
- Jangan membuat spesifikasi teknis yang tidak tercantum di MoU.
- Gunakan data resmi dari MoU jika file ditemukan.

Siapkan dokumentasi:

- MoU;
- logo;
- foto atau screenshot penandatanganan;
- partner announcement;
- optional infrastructure illustration.

---

# 10. DICODING INDONESIA

Heading:

```text
Supporting the People Behind the Technology
```

Partner:

```text
Dicoding Indonesia
```

Role:

```text
Official Digital Learning Partner
```

Status:

```text
MoU Signed
```

Representative:

```text
Gilang Ramadhan
Head of Intensive Learning, Dicoding Indonesia
```

Dukungan:

```text
- Akses kelas online Dicoding selama 1 bulan.
- Akses untuk panitia dan peserta AI Co-Creation Lab Makassar.
- Full learning benefits selama masa akses.
- Kesempatan menyelesaikan kelas dan memperoleh benefit pembelajaran sesuai ketentuan program Dicoding.
```

Nilai dukungan:

```text
Rp15.000.000
```

Value label:

```text
In-Kind Digital Learning Sponsorship
```

Masa aktif:

```text
1 month
```

Copy:

```text
Dukungan pembelajaran ini memperkuat kapasitas peserta dan panitia agar proses co-creation tidak hanya menghasilkan prototype, tetapi juga meningkatkan kemampuan digital yang dapat digunakan setelah program selesai.
```

Key statement:

```text
Infrastructure keeps the systems running. Learning keeps the people growing.
```

PENTING:

- Ambil rincian resmi jumlah akses, masa aktif, dan benefit dari file MoU jika tersedia.
- Jangan mengarang nama kelas, sertifikat, atau fitur yang tidak tercantum dalam dokumen.
- Jika nilai per peserta tidak perlu tampil, cukup tampilkan total resmi Rp15.000.000.

Siapkan dokumentasi:

- MoU;
- logo;
- screenshot komunikasi;
- partner announcement;
- dokumentasi penandatanganan jika tersedia.

---

# 11. VENUE PARTNERS

Heading:

```text
Spaces That Support Collaboration
```

Buat dua partner venue dengan peran yang berbeda.

## A. BALAI BESAR PELATIHAN KOMUNIKASI DAN DIGITAL MAKASSAR

Nama tampilan:

```text
Balai Besar Pelatihan Komunikasi dan Digital Makassar
```

Short label:

```text
BBPKD Komdigi Makassar
```

Role:

```text
Main Venue Partner
```

Dukungan:

```text
- Peminjaman ruangan kegiatan.
- Akses lobby Komdigi.
- Fasilitas ruangan.
- Lingkungan pelatihan komunikasi dan digital.
- Dukungan kebutuhan dasar pelaksanaan bootcamp sesuai komitmen yang disepakati.
```

Copy:

```text
Dukungan venue dari Komdigi Makassar menyediakan ruang yang relevan untuk mempertemukan mahasiswa, UMKM, mentor, dan mitra dalam satu proses belajar dan praktik.
```

Jangan menambahkan detail fasilitas yang belum memiliki bukti.

## B. MAKASSAR CREATIVE HUB

Role:

```text
Creative Space & Alternative Venue Partner
```

Dukungan:

```text
- Opsi peminjaman classroom Makassar Creative Hub.
- Ruang kreatif untuk persiapan dan aktivitas program.
- Penggunaan ruang podcast untuk produksi konten Global Communication.
```

Global Communication activity:

```text
Kamis, 6 Agustus 2026
Podcast Room — Makassar Creative Hub
```

Copy:

```text
Makassar Creative Hub menjadi bagian dari proses persiapan program, bukan hanya sebagai alternatif venue.

Ruang podcast MCH digunakan untuk produksi konten Global Communication, sementara classroom menjadi opsi ruang yang mendukung anak muda, industri kreatif, dan pelaku usaha untuk berkarya.
```

Context:

```text
Makassar Creative Hub merupakan ruang yang dihadirkan oleh Pemerintah Kota Makassar untuk mendukung industri kreatif, pelaku usaha, komunitas, dan anak muda.
```

PENTING:
- Jika project memiliki deskripsi resmi MCH pada asset atau dokumen, gunakan wording resmi tersebut.
- Jangan menambahkan klaim administratif yang tidak didukung dokumentasi.

Siapkan dokumentasi:

- foto venue;
- dokumentasi podcast;
- foto proses produksi;
- screenshot atau surat komitmen;
- logo.

---

# 12. TEKNIK INFORMATIKA UNIVERSITAS HASANUDDIN

Heading:

```text
Academic Skills Meet Real-World Problems
```

Partner:

```text
Teknik Informatika Universitas Hasanuddin
```

Role:

```text
Academic Talent Partner
```

Dukungan:

```text
- Akses dan dukungan sumber daya mahasiswa aktif di bidang website dan AI.
- Pemateri untuk sesi bootcamp.
- Mentor untuk mendampingi praktik pengembangan sistem.
- Dukungan pengetahuan teknis selama proses co-creation.
```

Copy:

```text
Kolaborasi dengan mahasiswa Teknik Informatika Universitas Hasanuddin mempertemukan kemampuan teknis dengan kebutuhan nyata UMKM.

Mahasiswa tidak hanya hadir sebagai peserta, tetapi juga sebagai pemateri, mentor, dan co-creator yang membantu menerjemahkan masalah menjadi prototype yang dapat diuji.
```

Key statement:

```text
Learning becomes more meaningful when technical skills meet real users.
```

PENTING:
- Jangan menyebut kerja sama institusional formal jika bukti hanya menunjukkan dukungan dari program studi, dosen, mahasiswa, atau jejaring akademik.
- Gunakan status yang sesuai evidence.
- Jika belum ada MoU formal, jangan beri badge `MoU Signed`.

Status badge alternatif:

```text
Academic Collaboration Confirmed
```

---

# 13. PARTNERSHIP VALUE SUMMARY

Heading:

```text
What These Partnerships Unlock
```

Buat impact summary, bukan sekadar daftar benefit.

Tampilkan:

```text
Real Beneficiaries
Akses ke lima UMKM dan kebutuhan operasional nyata.

Learning Access
Dukungan kelas digital untuk meningkatkan kapasitas peserta dan panitia.

Long-Term Infrastructure
Lima domain dan lima hosting agar prototype dapat digunakan setelah bootcamp.

People & Expertise
Mahasiswa, mentor, pemateri, dan co-creator dengan kemampuan yang relevan.

Space to Collaborate
Venue utama, alternatif classroom, dan ruang produksi konten.

Program Ecosystem
Pendampingan, jejaring, publikasi, dan ruang untuk menjalankan ide.
```

Main conclusion:

```text
The partnerships do not only help us run the event. They help the solutions survive beyond it.
```

---

# 14. PARTNERSHIP TIMELINE

Heading:

```text
Partnership Journey
```

Buat timeline berdasarkan evidence yang ditemukan.

Contoh milestone:

```text
Program opportunity and leadership ecosystem
↓
UMKM ecosystem collaboration
↓
Venue coordination
↓
Digital infrastructure partnership
↓
Digital learning partnership
↓
Academic talent support
↓
Community support and ongoing outreach
```

Jangan mengarang tanggal.

Jika tanggal ada di MoU, surat, metadata, atau dokumentasi:
- tampilkan tanggal;
- gunakan format Indonesia;
- pastikan akurat.

Jika tanggal tidak tersedia:
- gunakan urutan milestone tanpa tanggal.

---

# 15. ONGOING PARTNERSHIP OUTREACH

Heading:

```text
Still Building the Network
```

Copy:

```text
Proses penjajakan partnership dan sponsorship masih berjalan.

Kami terus membuka ruang kolaborasi bagi brand, komunitas, lembaga, dan individu yang ingin mendukung kebutuhan bootcamp, participant experience, konsumsi, dokumentasi, merchandise, publikasi, atau keberlanjutan prototype.
```

Jangan menampilkan nama calon sponsor yang belum memberikan komitmen.

Tampilkan status:

```text
Confirmed Partners
Ongoing Outreach
Community Support Open
```

---

# 16. COMMUNITY SUPPORT CTA

Buat section CTA yang kuat tetapi tidak memaksa.

Heading:

```text
Want to Be Part of the Journey?
```

Body:

```text
Selain membangun institutional partnerships, kami juga membuka Community Support bagi siapa pun yang ingin ikut membantu pelaksanaan AI Co-Creation Lab Makassar.

Dukungan dapat berupa dana, produk, kebutuhan kegiatan, sharing informasi, atau koneksi kepada partner yang relevan.
```

Primary button:

```text
Support the Program
```

URL:

```text
https://event.dekatlokal.com/community-support
```

Secondary text:

```text
Small support. Real collaboration. Useful impact.
```

Gunakan internal route jika halaman community support berada di project yang sama.

Pastikan:
- button jelas di mobile;
- tidak membuka modal;
- tidak menampilkan nomor rekening di halaman partnership;
- detail dukungan tetap berada di halaman Community Support.

---

# 17. DOCUMENTATION SECTION

Heading:

```text
Partnership Documentation
```

Subheading:

```text
MoUs, commitments, meetings, venue visits, and collaboration moments.
```

Codex harus mencari folder dokumentasi yang sudah disiapkan user.

Kategori dokumentasi:

```text
program-support
mou-signing
partner-meeting
digital-infrastructure
digital-learning
venue
global-communication
academic-collaboration
community-support
```

Buat data-driven documentation structure.

Contoh:

```ts
type PartnershipDocumentation = {
  id: string;
  partnerId: string;
  title: string;
  category:
    | "program-support"
    | "mou-signing"
    | "partner-meeting"
    | "digital-infrastructure"
    | "digital-learning"
    | "venue"
    | "global-communication"
    | "academic-collaboration"
    | "community-support";
  image?: string;
  documentUrl?: string;
  externalUrl?: string;
  caption: string;
  date?: string;
  alt: string;
};
```

Aturan:

- Jangan hardcode semua gambar langsung di component.
- Buat file data terpisah.
- Gunakan hanya file yang benar-benar tersedia.
- Jangan membuat fake document.
- Jangan membuat fake signature.
- Jangan membuat logo dari teks jika logo resmi tersedia.
- Jika asset belum tersedia, gunakan placeholder kosong yang rapi:

```text
Documentation will be added here.
```

Galeri:

- 1 kolom mobile;
- 2 kolom tablet;
- 3 kolom desktop jika sesuai UI existing;
- lazy loading;
- alt text;
- tidak ada horizontal overflow;
- lightbox hanya jika sudah tersedia di project.

---

# 18. SUPPORTING DOCUMENTS

Heading:

```text
Partnership Evidence
```

Siapkan daftar dokumen yang dapat diunduh atau dibuka.

Possible items:

```text
- MoU DekatLokal × Rumah BUMN Makassar
- MoU DekatLokal × Inovasi Digital
- MoU DekatLokal × Dicoding Indonesia
- Venue commitment documentation
- Academic collaboration documentation
- Program support documentation
```

PENTING:

- Tampilkan hanya file yang benar-benar ditemukan.
- Gunakan nama file yang bersih.
- Tampilkan label PDF, image, email, atau chat sesuai format.
- Jangan menampilkan kontak personal.
- Jangan expose tanda tangan resolusi tinggi secara terpisah.
- Dokumen boleh dibuka di tab baru.
- Gunakan `rel="noopener noreferrer"` untuk external links.

Folder yang disarankan:

```text
/public/documents/partnership/
```

Tetapi ikuti struktur project existing jika sudah ada folder dokumentasi.

---

# 19. PARTNER DATA ARCHITECTURE

Pisahkan seluruh data partnership dari component UI.

Disarankan:

```text
data/partnership-collaboration.ts
components/progress/partnership-collaboration/*
```

atau mengikuti pola project existing.

Contoh type:

```ts
type PartnerStatus =
  | "program-support"
  | "mou-signed"
  | "commitment-confirmed"
  | "academic-collaboration"
  | "venue-confirmed";

type Partner = {
  id: string;
  name: string;
  shortName?: string;
  role: string;
  category: string;
  status: PartnerStatus;
  logo?: string;
  website?: string;
  representative?: {
    name: string;
    position: string;
  };
  description: string;
  contributions: string[];
  inKindValue?: number;
  servicePeriod?: string;
  keyImpact: string;
  documentUrl?: string;
  documentation?: string[];
};
```

Data summary harus dihitung dari data partner jika memungkinkan:

```text
confirmed partner count
signed MoU count
official partner count
quantified in-kind value
venue count
```

Jangan menulis angka summary yang berbeda dengan partner data.

---

# 20. PARTNER DATA YANG HARUS DIMASUKKAN

Masukkan partner berikut:

```text
BAKTI NUSA
GreatEdunesia / exact official branding from asset
Dompet Dhuafa
Rumah BUMN Makassar
Inovasi Digital
Dicoding Indonesia
Balai Besar Pelatihan Komunikasi dan Digital Makassar
Makassar Creative Hub
Teknik Informatika Universitas Hasanuddin
```

Catatan:

- Jumlah dapat tampil sebagai `8+` atau `9` sesuai cara grouping di UI.
- BAKTI NUSA, GreatEdunesia, dan Dompet Dhuafa boleh dikelompokkan sebagai satu ecosystem section tetapi tetap dicatat sebagai institusi berbeda.
- Jangan memasukkan calon partner yang belum confirmed.
- Jangan menyebut community supporters sebagai confirmed institutional partners.

---

# 21. PRIVACY DAN LEGAL SAFETY

Jangan tampilkan:

- nomor telepon PIC;
- email personal;
- nomor rekening;
- kredensial;
- tanda tangan sebagai file terpisah;
- alamat rumah;
- data peserta;
- data UMKM nonpublik;
- isi chat pribadi secara penuh.

Jika screenshot komunikasi digunakan:
- crop hanya bagian relevan;
- blur nomor telepon, email personal, atau data sensitif;
- jangan mengubah isi komitmen;
- jangan membuat screenshot palsu.

Gunakan representative names hanya jika memang ada di dokumen resmi:

```text
Dedi Julyan Sukawanto
Gilang Ramadhan
```

Jangan menambahkan nama perwakilan partner lain jika tidak tersedia.

---

# 22. RESPONSIVE DAN VISUAL REQUIREMENTS

Halaman harus mobile-first karena mayoritas akses berasal dari smartphone.

Pastikan:

- tidak ada horizontal overflow pada 320px;
- summary metrics tidak terlalu padat;
- partner card nyaman dibaca;
- logo tidak terlalu besar;
- timeline berubah menjadi vertical pada mobile;
- ecosystem visual menjadi stacked flow;
- tombol Community Support full width pada mobile;
- dokumen mudah dibuka;
- tap target minimal 44px;
- typography readable;
- tidak membuat tabel lebar;
- tidak menggunakan carousel yang sulit digeser;
- desktop tetap polished pada 1440px.

Design direction:

- clean;
- editorial;
- credible;
- warm;
- partner-focused;
- banyak whitespace;
- tidak terlalu banyak gradients;
- tidak seperti sponsor wall biasa;
- tidak seperti proposal pendanaan;
- tidak menggunakan generic AI illustration;
- jangan memenuhi setiap section dengan card.

---

# 23. ACCESSIBILITY

Pastikan:

- heading hierarchy benar;
- alt text logo dan dokumentasi;
- logo dekoratif tidak dibaca berulang oleh screen reader;
- focus state terlihat;
- button dan link accessible;
- external link aman;
- status tidak hanya dibedakan dengan warna;
- contrast cukup;
- reduced motion dihormati;
- PDF memiliki label format;
- timeline dapat dibaca tanpa bergantung pada visual connector.

---

# 24. SEO DAN METADATA

Title:

```text
Partnership & Collaboration — AI Co-Creation Lab Makassar
```

Description:

```text
Kolaborasi lembaga, industri, kampus, venue, dan komunitas yang mendukung pelaksanaan serta keberlanjutan AI Co-Creation Lab Makassar.
```

Gunakan OG image event existing jika ada.

Tambahkan canonical sesuai route architecture.

Jangan memasukkan:
- nomor kontak;
- nilai rekening;
- data sensitif;
- isi detail kontrak yang tidak perlu.

---

# 25. FINAL TESTING

Sebelum menyatakan selesai:

1. Jalankan lint.
2. Jalankan typecheck.
3. Jalankan build.
4. Perbaiki seluruh error.
5. Uji route halaman partnership.
6. Uji navigation dari halaman Problem Validation.
7. Uji previous/next navigation.
8. Uji index progress.
9. Uji mobile 320px.
10. Uji mobile 375px.
11. Uji mobile 390px.
12. Uji tablet.
13. Uji desktop 1440px.
14. Pastikan tidak ada horizontal overflow.
15. Pastikan semua nilai dukungan sesuai data.
16. Pastikan total quantified in-kind support benar.
17. Pastikan hanya partner confirmed yang tampil.
18. Pastikan calon partner tidak disebut.
19. Pastikan tombol Community Support mengarah ke URL yang benar.
20. Pastikan tidak ada broken logo.
21. Pastikan tidak ada broken document.
22. Pastikan halaman tetap rapi jika dokumentasi belum lengkap.
23. Pastikan nomor telepon dan data sensitif tidak tampil.
24. Pastikan halaman progress existing tidak rusak.

---

# 26. OUTPUT SETELAH IMPLEMENTASI

Setelah selesai, berikan:

1. hasil audit halaman progress existing;
2. route baru;
3. posisi halaman di progress navigation;
4. file yang dibuat;
5. file yang diubah;
6. lokasi data partner;
7. lokasi logo;
8. lokasi foto dokumentasi;
9. lokasi MoU dan supporting documents;
10. daftar asset yang berhasil ditemukan;
11. asset yang masih dibutuhkan;
12. cara menambah partner baru;
13. cara menambah dokumentasi;
14. hasil perhitungan summary metrics;
15. hasil lint;
16. hasil typecheck;
17. hasil build;
18. catatan responsive testing;
19. hal yang masih memerlukan konfigurasi manual.

PENTING:

- Jangan hanya memberi analisis atau rencana.
- Implementasikan langsung sampai selesai.
- Jangan membuat project baru.
- Jangan merombak desain halaman progress existing.
- Jangan memakai random stock image.
- Jangan membuat logo atau dokumen palsu.
- Jangan menampilkan calon partner yang belum committed.
- Jangan menampilkan nomor kontak atau data sensitif.
- Gunakan dokumentasi dan file yang sudah ada di dalam project.
- Fokus pada laporan Partnership & Collaboration yang kuat, credible, responsive, dan siap digunakan pada Final Presentation.
