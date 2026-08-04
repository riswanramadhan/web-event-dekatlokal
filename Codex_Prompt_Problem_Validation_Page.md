# CODEX EXECUTION PROMPT — PROBLEM VALIDATION PROGRESS PAGE

Saya memiliki website event **AI Co-Creation Lab Makassar** yang sudah berjalan. Di dalam website tersebut sudah ada **3 halaman progress/report** dengan desain, navigasi, layout, typography, spacing, dan component yang konsisten.

Tugas kamu adalah menambahkan **1 halaman progress baru** untuk kebutuhan Week 2 GEP:

```text
Problem Validation
```

Halaman ini harus masuk ke area progress yang sudah ada, bukan dibuat sebagai microsite terpisah.

Kerjakan langsung pada codebase yang sedang terbuka.

---

# 1. WAJIB AUDIT CODEBASE TERLEBIH DAHULU

Sebelum coding:

1. Identifikasi framework, routing, styling, component library, dan struktur project.
2. Temukan ketiga halaman progress/report yang sudah ada.
3. Pelajari pola UI mereka:
   - header;
   - breadcrumbs;
   - progress navigation;
   - hero;
   - card;
   - section spacing;
   - mobile layout;
   - footer;
   - CTA;
   - numbering atau timeline;
   - treatment untuk dokumentasi.
4. Temukan halaman index/list progress jika ada.
5. Gunakan component existing sebanyak mungkin.
6. Tambahkan halaman ini sebagai progress berikutnya dengan UI yang mirip dan konsisten.
7. Jangan membuat design system baru.
8. Jangan mengubah tiga halaman progress sebelumnya kecuali untuk:
   - menambahkan link/navigation ke halaman Problem Validation;
   - memperbaiki konsistensi yang benar-benar diperlukan.
9. Jangan berhenti pada analisis. Setelah audit, implementasikan langsung.

---

# 2. ROUTE DAN INTEGRASI PROGRESS

Gunakan pola route yang sudah dipakai oleh halaman progress existing.

Jika pola route existing memungkinkan, gunakan slug:

```text
problem-validation
```

Contoh fallback:

```text
/progress/problem-validation
```

Tetapi jangan memaksakan route tersebut jika codebase memiliki pola lain. Ikuti struktur existing.

Tambahkan halaman ini ke:

- daftar progress/report;
- navigation antar progress;
- tombol previous/next jika halaman sebelumnya memilikinya;
- sitemap atau metadata route jika project menggunakannya.

Judul progress:

```text
Problem Validation
```

Label tambahan:

```text
Week 2
```

Subtitle:

```text
Validating real problems before building solutions.
```

---

# 3. TUJUAN HALAMAN

Halaman ini menjadi laporan publik Week 2 GEP dan bahan untuk bagian **Problem Validation** pada Final Presentation.

Halaman wajib menjawab empat kebutuhan:

1. Profil narasumber atau stakeholder.
2. Hasil wawancara atau observasi.
3. Temuan utama atau insight.
4. Kesimpulan validasi.

Halaman juga harus menunjukkan bahwa proses validasi dilakukan kepada dua kelompok:

```text
5 UMKM penerima manfaat
3 mahasiswa calon co-creator
```

Narasi utamanya:

```text
UMKM memiliki masalah operasional nyata, tetapi belum menemukan sistem digital yang simple, affordable, mobile-friendly, dan sesuai workflow mereka.

Mahasiswa sudah familiar dengan AI, tetapi sebagian besar masih menggunakannya untuk kebutuhan personal dan akademik, bukan untuk menyelesaikan masalah pengguna nyata.

AI Co-Creation Lab Makassar hadir sebagai ruang untuk mempertemukan real business problems dengan young people who are ready to learn, explore, and build useful solutions together.
```

---

# 4. TONE DAN COPYWRITING

Gunakan tone:

- profesional;
- human;
- optimistis;
- berbasis temuan;
- mudah dipahami;
- tidak terlalu akademik;
- tidak terlalu formal;
- tetap kredibel;
- tidak menggunakan klaim berlebihan.

Gunakan Bahasa Indonesia sebagai bahasa utama.

English hanya boleh digunakan untuk:
- heading pendek;
- insight statement;
- highlight;
- quote;
- section label.

Hindari:
- jargon berlebihan;
- AI-generated sounding copy;
- paragraf terlalu panjang;
- menyimpulkan bahwa semua UMKM di Makassar memiliki masalah yang sama;
- klaim statistik yang tidak didukung wawancara.

Gunakan phrasing yang tepat:

```text
Berdasarkan wawancara terhadap lima UMKM penerima manfaat...
```

Bukan:

```text
Seluruh UMKM di Makassar...
```

---

# 5. PRIVACY REQUIREMENTS

Jangan tampilkan nomor telepon stakeholder secara publik.

Nomor telepon berikut hanya untuk dokumentasi internal dan tidak boleh masuk UI publik:

- Eyfa Natural Oil: 087872252079
- Sukmajahe Sarabba Makassar: 0813 4224 5003
- Markisa Bintang Jaya: 0895 6211 76068
- Kira Kira Michi: 089529974959
- Dapur Andist: 081 141 9165

Yang boleh tampil:

- nama stakeholder;
- peran;
- nama usaha;
- program studi dan universitas untuk mahasiswa;
- Instagram usaha;
- ringkasan masalah;
- insight;
- status validasi.

---

# 6. STRUKTUR HALAMAN

## SECTION A — HERO

Gunakan heading:

```text
Problem Validation
```

Subheading:

```text
Before building the solution, we listened to the people who would actually use it.
```

Body copy:

```text
Pada Week 2, kami melakukan wawancara dan konsultasi langsung bersama lima UMKM penerima manfaat serta tiga mahasiswa calon co-creator.

Tujuannya sederhana: memastikan bahwa solusi yang akan dibangun berangkat dari real problems, real workflows, and real user needs.
```

Tambahkan summary metrics dengan tampilan ringan, mengikuti component existing:

```text
5 UMKM interviewed
3 students interviewed
8 stakeholders
5 committed beneficiaries
```

Jangan membuat empat card besar jika UI existing lebih sederhana.

Tambahkan status badge:

```text
Week 2 Completed
```

---

## SECTION B — VALIDATION APPROACH

Heading:

```text
How We Validated the Problems
```

Tampilkan empat tahapan sederhana:

```text
1. Listen
Mendengarkan workflow, pain points, dan kebiasaan saat ini.

2. Observe
Mengidentifikasi proses manual, pekerjaan berulang, dan titik yang sering terlewat.

3. Clarify
Memisahkan masalah utama, kebutuhan tambahan, dan asumsi solusi.

4. Commit
Memastikan UMKM bersedia terlibat, memberi feedback, dan menguji prototype.
```

Tambahkan note:

```text
The goal was not to validate our features. The goal was to validate the problems, workflows, and desired outcomes.
```

---

## SECTION C — STAKEHOLDER OVERVIEW

Heading:

```text
Who We Talked To
```

Bagi menjadi dua kelompok:

### Group 1

```text
UMKM Beneficiaries
```

### Group 2

```text
Student Co-Creators
```

Tampilkan overview yang clean dan tidak penuh.

---

# 7. PROFIL DAN HASIL WAWANCARA UMKM

Buat reusable component untuk setiap UMKM.

Component minimal memuat:

- nama usaha;
- nama narasumber;
- peran: Owner;
- Instagram;
- current workflow;
- pain point;
- prior need;
- key insight;
- validation status;
- optional documentation thumbnail.

Gunakan accordion, tab, atau stacked card mengikuti UI existing. Pastikan nyaman di mobile.

---

## UMKM 1 — EYFA NATURAL OIL

Nama usaha:

```text
Eyfa Natural Oil
```

Narasumber:

```text
Eka Reski Rahmawati
```

Instagram:

```text
@eyfanaturaloil
```

Current workflow:

```text
Penjualan, barang, dan laporan usaha masih dicatat secara manual. Pencatatan sering terlupa, hilang, atau tidak dilakukan karena prosesnya terasa tidak praktis.
```

Pain point:

```text
Owner sulit memperoleh rekap penjualan, stok, HPP, dan gambaran keuntungan usaha secara konsisten.
```

Previous attempt:

```text
Pernah mencoba sistem berlangganan, tetapi biayanya terasa mahal dan alurnya kurang familiar.
```

Priority need:

```text
Sistem kasir dan pencatatan usaha sederhana: pilih produk, catat transaksi, perbarui stok, lalu bentuk rekap harian secara otomatis.
```

Key insight:

```text
Eyfa tidak membutuhkan sistem akuntansi yang kompleks. Yang dibutuhkan adalah sistem operasional sederhana yang mengubah transaksi harian menjadi informasi usaha tanpa menambah beban pencatatan.
```

Validation status:

```text
Problem validated
```

---

## UMKM 2 — SUKMAJAHE SARABBA MAKASSAR

Nama usaha:

```text
Sukmajahe Sarabba Makassar
```

Narasumber:

```text
Rita Suryaningsih
```

Instagram:

```text
@sukmajahesarabba.id
```

Current workflow:

```text
Data toko titip jual dan stok masih direkap berulang melalui Excel. Input data membutuhkan effort karena biasanya harus membuka laptop.
```

Pain point:

```text
Owner kesulitan mengetahui produk dititipkan di toko mana, jumlah stok per toko, umur produk, status pembayaran, dan perkembangan kanal distribusi.
```

Previous attempt:

```text
Pernah mencoba aplikasi gratis, tetapi fitur terlalu banyak dan tidak fokus pada kebutuhan distribusi produk.
```

Priority need:

```text
Sistem mobile-first untuk menyimpan data toko, tanggal masuk, jumlah item, jenis toko, status cash atau kredit, umur produk, dan penetrasi online atau offline.
```

Additional opportunity:

```text
Data outlet yang sudah rapi dapat digunakan untuk membuat flyer otomatis yang menginformasikan lokasi ketersediaan produk.
```

Key insight:

```text
Masalah utamanya bukan sekadar jumlah stok, tetapi visibility: stok berada di mana, sudah berapa lama, dan bagaimana status pembayarannya.
```

Validation status:

```text
Problem validated
```

---

## UMKM 3 — MARKISA BINTANG JAYA

Nama usaha:

```text
Markisa Bintang Jaya
```

Narasumber:

```text
Hardinianti
```

Instagram:

```text
@markisa_bintangjaya
```

Current workflow:

```text
Laporan penjualan, pemasukan, pengeluaran, dan stok masih dicatat secara manual.
```

Pain point:

```text
Owner sulit melihat kondisi usaha secara mingguan maupun bulanan dan membutuhkan proses input yang cepat melalui mobile.
```

Previous attempt:

```text
Pernah memakai aplikasi gratis, tetapi berhenti karena terlalu banyak iklan dan pengalaman penggunaan kurang nyaman.
```

Priority need:

```text
Sistem pencatatan pemasukan, pengeluaran, penjualan, dan stok yang ringan di mobile, dengan visual laporan yang lebih lengkap di desktop.
```

Key insight:

```text
Markisa membutuhkan visibility terhadap usaha dengan proses input yang sangat ringan agar sistem tidak kembali ditinggalkan.
```

Validation status:

```text
Problem validated
```

---

## UMKM 4 — KIRA KIRA MICHI

Nama usaha:

```text
Kira Kira Michi
```

Narasumber:

```text
Mutia Nurafni Diapati
```

Instagram:

```text
@kirakiramichi.merchandise
```

Current workflow:

```text
Loyalty card masih berbentuk kartu cetak dan stempel fisik.
```

Pain point:

```text
Sistem manual membutuhkan biaya cetak, isi ulang stempel, waktu pelayanan, dan tidak menghasilkan data pelanggan yang dapat dikelola.
```

Priority need:

```text
Digital loyalty card: customer registrasi, mendapatkan level atau identitas member, scan QR admin, mengajukan klaim stempel, lalu admin melakukan approval.
```

Additional value:

```text
Data pelanggan dapat digunakan untuk membangun hubungan dan promosi lanjutan dengan persetujuan pelanggan.
```

Key insight:

```text
Digital loyalty bukan hanya mengurangi biaya kartu fisik, tetapi mengubah transaksi anonim menjadi hubungan pelanggan yang dapat dilanjutkan.
```

Validation status:

```text
Problem validated
```

---

## UMKM 5 — DAPUR ANDIST

Nama usaha:

```text
Dapur Andist
```

Narasumber:

```text
Mujhar Idris, S.E., M.M.
```

Instagram:

```text
@mujhar.idris
```

Current workflow:

```text
Arus kas masih dicatat di buku dan sering terlupa atau tidak dicatat secara konsisten.
```

Pain point:

```text
Owner kesulitan melihat pemasukan, pengeluaran, HPP, omzet, dan perkembangan usaha dalam satu laporan yang mudah dipahami.
```

Priority need:

```text
Sistem laporan keuangan sederhana dengan input pemasukan manual, input pengeluaran melalui form atau foto struk, perhitungan HPP, grafik, dan tracking omzet.
```

Solution hypothesis:

```text
OCR struk dan chatbot AI untuk bertanya tentang data keuangan masih diperlakukan sebagai hipotesis solusi dan perlu diuji agar tidak menambah kompleksitas.
```

Key insight:

```text
Dapur Andist membutuhkan pencatatan yang konsisten terlebih dahulu. AI baru bernilai jika benar-benar mempercepat input atau membantu memahami data yang sudah tercatat.
```

Validation status:

```text
Core problem validated
Solution details need testing
```

---

# 8. PROFIL DAN HASIL WAWANCARA MAHASISWA

Heading:

```text
How Students Currently Use AI
```

Buat tiga profile cards ringan.

## STUDENT 1

```text
Andi Yehuda George Matandung
Ilmu Hukum — Universitas Hasanuddin
```

## STUDENT 2

```text
Muhammad Irfan Setiawan
Ilmu Komunikasi — Universitas Fajar
```

## STUDENT 3

```text
Siti Nuralisa
Teknik Informatika — Universitas Muhammadiyah Makassar
```

Shared findings:

```text
- Mengenal dan menggunakan AI sejak awal masa kuliah.
- AI digunakan untuk brainstorming, tugas, laporan, presentasi, dan kebutuhan akademik.
- Mahasiswa Teknik Informatika juga menggunakan AI untuk membuat website, portfolio, dan sistem sederhana untuk tugas kuliah.
- Rata-rata belum pernah membangun sistem berbasis AI untuk penerima manfaat nyata.
- Memiliki rasa ingin tahu tinggi untuk mengeksplorasi kemampuan AI.
- Kesulitan menemukan real users, real problems, dan ruang untuk mengukur impact.
```

Key insight:

```text
They know how to use AI, but they have not fully learned how to use it for someone else.
```

Tambahkan transition visual:

```text
AI for assignments
→ AI for building
→ AI for real people
→ AI for measurable impact
```

---

# 9. CROSS-STAKEHOLDER FINDINGS

Heading:

```text
What We Found
```

Tampilkan insight utama sebagai 4–6 cards atau numbered findings mengikuti UI existing.

## Finding 1

```text
Manual work creates invisible business gaps
```

```text
Pencatatan yang terlupa bukan hanya masalah administrasi. Dampaknya adalah owner kehilangan visibility terhadap stok, omzet, arus kas, distribusi, dan pelanggan.
```

## Finding 2

```text
Existing tools often do not fit
```

```text
Sebagian UMKM sudah mencoba aplikasi digital, tetapi berhenti karena mahal, terlalu kompleks, penuh iklan, atau tidak sesuai workflow mereka.
```

## Finding 3

```text
Mobile-first is part of the solution
```

```text
UMKM membutuhkan proses input yang bisa dilakukan saat pekerjaan terjadi. Mobile-first bukan sekadar pilihan UI, tetapi bagian dari kebutuhan operasional.
```

## Finding 4

```text
Simple and focused beats feature-heavy
```

```text
UMKM lebih membutuhkan satu sistem yang menyelesaikan core problem dengan baik daripada aplikasi besar dengan terlalu banyak fitur.
```

## Finding 5

```text
Students are AI users, not yet AI problem-solvers
```

```text
Mahasiswa sudah dekat dengan AI, tetapi belum banyak mendapat kesempatan menggunakannya untuk real users dan mengukur dampak solusi.
```

## Finding 6

```text
The two sides complete each other
```

```text
UMKM membawa masalah dan konteks nyata. Mahasiswa membawa curiosity, skills, dan willingness to build. Co-creation menghubungkan keduanya.
```

---

# 10. DOUBLE GAP VISUAL

Heading:

```text
The Double Gap
```

Kolom kiri:

```text
UMKM
Real problems
Limited access to suitable tools
Need simple and affordable systems
```

Kolom kanan:

```text
Students
Familiar with AI
Limited real-user experience
Need meaningful problems to solve
```

Tengah:

```text
AI Co-Creation Lab Makassar
```

Outcome:

```text
Useful digital solutions built together
```

Pada mobile, ubah menjadi vertical flow.

Jangan menggunakan diagram yang rumit atau library chart baru.

---

# 11. VALIDATED VS STILL TO TEST

Heading:

```text
What Is Validated — and What Still Needs Testing
```

## Validated

```text
- Pekerjaan manual dan berulang menghambat operasional UMKM.
- Existing tools sering tidak sesuai workflow.
- Mobile input adalah kebutuhan penting.
- UMKM membutuhkan sistem yang fokus dan sederhana.
- Mahasiswa sudah familiar dengan AI.
- Mahasiswa belum banyak membangun solusi untuk real users.
- Kedua kelompok bersedia terlibat dalam proses co-creation.
```

## Still to Test

```text
- Detail workflow setiap prototype.
- OCR foto struk.
- Chatbot AI untuk laporan.
- Flyer otomatis.
- Mekanisme QR dan approval loyalty.
- Bentuk dashboard dan grafik.
- Konsistensi penggunaan setelah prototype diberikan.
```

Tambahkan note:

```text
Commitment to participate is validated. Long-term adoption will only be validated after prototype testing.
```

---

# 12. VALIDATION CONCLUSION

Heading:

```text
Validation Conclusion
```

Body:

```text
Hasil wawancara menunjukkan adanya dua kebutuhan yang saling melengkapi.

Lima UMKM memiliki masalah operasional nyata, tetapi belum menemukan sistem yang simple, affordable, mobile-friendly, dan sesuai workflow mereka.

Di sisi lain, mahasiswa sudah terbiasa menggunakan AI, tetapi belum banyak memperoleh ruang untuk membangun bagi pengguna nyata dan mengukur dampaknya.

Karena itu, AI Co-Creation Lab Makassar tervalidasi sebagai ruang kolaborasi yang mempertemukan real business problems dengan young people who are ready to explore, build, and learn directly from users.
```

Main statement:

```text
UMKM don’t need more complicated tools.
Students don’t need more AI assignments.
They need a space to build something useful, together.
```

Tambahkan status:

```text
Overall Validation Status: Proceed to Co-Creation and Prototype Testing
```

---

# 13. DOCUMENTATION SECTION

Heading:

```text
Validation Documentation
```

Subheading:

```text
Interview sessions, stakeholder discussions, and beneficiary commitments.
```

Siapkan layout dokumentasi yang mudah diisi nanti.

Wajib mendukung:

- foto wawancara UMKM;
- foto wawancara mahasiswa;
- foto konsultasi;
- foto penandatanganan komitmen;
- foto dokumen komitmen;
- optional video link;
- optional PDF/downloadable supporting document.

Buat data-driven documentation config, bukan menulis setiap gambar langsung di JSX.

Contoh struktur data:

```ts
type DocumentationItem = {
  id: string;
  title: string;
  category:
    | "umkm-interview"
    | "student-interview"
    | "commitment"
    | "observation"
    | "document";
  image?: string;
  videoUrl?: string;
  documentUrl?: string;
  caption: string;
  date?: string;
  alt: string;
};
```

Buat file data/config terpisah, misalnya:

```text
data/problem-validation.ts
```

atau mengikuti struktur project existing.

Gunakan placeholder yang jelas jika file dokumentasi belum tersedia:

```text
Documentation will be added here.
```

Jangan menggunakan random stock photos.

Jika project memakai Next/Image:
- optimalkan gambar;
- isi width/height;
- gunakan alt text;
- gunakan lazy loading untuk galeri.

Untuk galeri:
- responsive;
- 1 kolom di mobile;
- 2 kolom di tablet;
- 3 kolom di desktop jika sesuai;
- modal/lightbox hanya jika existing project sudah memilikinya;
- jangan install lightbox baru hanya untuk section ini.

---

# 14. DOWNLOADABLE SUPPORTING DOCUMENTS

Siapkan section optional:

```text
Supporting Documents
```

Card/link yang bisa diisi nanti:

```text
- Interview Notes
- Observation Summary
- Beneficiary Commitment
- Week 2 Report PDF
```

File dapat diletakkan pada:

```text
/public/documents/problem-validation/
```

Jangan membuat file palsu.

Jika file belum tersedia:
- sembunyikan item;
- atau tampilkan status `Coming soon` sesuai UI existing.

---

# 15. VISUAL DIRECTION

Ikuti UI ketiga progress page existing.

Tambahan prinsip:

- clean;
- editorial;
- banyak whitespace;
- readable;
- mobile-first;
- tidak terlalu banyak card;
- tidak terlalu banyak gradient;
- tidak menggunakan generic AI icons;
- tidak membuat dashboard admin;
- tidak terlihat seperti landing page baru;
- tetap terasa sebagai progress report;
- gunakan highlight quotes dan insight secukupnya.

Prioritas mobile:

- tidak ada horizontal overflow pada 320px;
- card tidak terlalu lebar;
- tabel harus dihindari atau berubah menjadi stacked cards;
- typography tidak terlalu kecil;
- tap target minimal 44px;
- galeri mudah discroll;
- profile cards tidak padat;
- double-gap visual berubah menjadi vertical flow;
- previous/next progress navigation tetap mudah digunakan.

---

# 16. ACCESSIBILITY

Pastikan:

- heading hierarchy benar;
- alt text dokumentasi jelas;
- focus state terlihat;
- semua link punya accessible name;
- color contrast cukup;
- tidak mengandalkan warna untuk status;
- reduced motion dihormati;
- external link menggunakan rel yang aman;
- dokumentasi PDF memiliki label format file.

---

# 17. SEO DAN METADATA

Title:

```text
Problem Validation — AI Co-Creation Lab Makassar
```

Description:

```text
Hasil validasi masalah AI Co-Creation Lab Makassar melalui wawancara lima UMKM penerima manfaat dan tiga mahasiswa calon co-creator.
```

Gunakan OG image existing event jika ada.

Tambahkan canonical sesuai pola project.

Jangan memasukkan nomor telepon ke metadata atau structured data.

---

# 18. DATA ARCHITECTURE

Pisahkan content dari UI.

Disarankan:

```text
data/problem-validation.ts
components/progress/problem-validation/*
```

atau mengikuti pola existing.

Data minimal:

```ts
type UmkmStakeholder = {
  id: string;
  businessName: string;
  interviewee: string;
  role: string;
  instagram: string;
  currentWorkflow: string;
  painPoint: string;
  previousAttempt?: string;
  priorityNeed: string;
  additionalOpportunity?: string;
  solutionHypothesis?: string;
  keyInsight: string;
  validationStatus: string;
  documentation?: string[];
};

type StudentStakeholder = {
  id: string;
  name: string;
  program: string;
  university: string;
  aiUsage: string[];
  keyInsight: string;
};

type DocumentationItem = {
  id: string;
  title: string;
  category: string;
  image?: string;
  videoUrl?: string;
  documentUrl?: string;
  caption: string;
  date?: string;
  alt: string;
};
```

Jangan meletakkan nomor telepon di public data file.

---

# 19. FINAL TESTING

Sebelum menyatakan selesai:

1. Jalankan lint.
2. Jalankan typecheck.
3. Jalankan build.
4. Perbaiki seluruh error.
5. Uji route baru.
6. Uji navigation dari tiga progress page existing.
7. Uji previous/next navigation.
8. Uji mobile 320px, 375px, 390px.
9. Uji tablet.
10. Uji desktop 1440px.
11. Pastikan tidak ada horizontal overflow.
12. Pastikan tidak ada nomor telepon di source public atau rendered UI.
13. Pastikan semua Instagram link benar.
14. Pastikan galeri aman ketika belum ada dokumentasi.
15. Pastikan tidak ada broken image.
16. Pastikan page index progress menampilkan halaman baru.
17. Pastikan metadata benar.
18. Pastikan halaman existing tidak rusak.

---

# 20. OUTPUT SETELAH IMPLEMENTASI

Setelah selesai, berikan:

1. hasil audit singkat terhadap tiga progress page existing;
2. route baru;
3. file yang dibuat;
4. file yang diubah;
5. lokasi data stakeholder;
6. lokasi untuk menambahkan foto dokumentasi;
7. lokasi untuk menambahkan PDF supporting documents;
8. cara menambah atau mengganti dokumentasi;
9. hasil lint;
10. hasil typecheck;
11. hasil build;
12. screenshot atau deskripsi responsive result jika environment memungkinkan;
13. hal yang masih menunggu aset dari user.

PENTING:

- Jangan hanya membuat rencana.
- Implementasikan langsung.
- Jangan membuat project baru.
- Jangan mengganti total desain progress existing.
- Jangan menampilkan nomor telepon stakeholder.
- Jangan membuat data statistik yang tidak tersedia.
- Jangan menambahkan random stock images.
- Jangan membuat fitur admin.
- Fokus pada halaman laporan Problem Validation yang rapi, kredibel, dan siap menjadi bahan Final Presentation.
