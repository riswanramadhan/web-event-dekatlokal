# PRODUCT REQUIREMENTS DOCUMENT

## DekatLokal Event MVP

**Event pertama:** AI Co-Creation Lab Makassar  
**Tagline event:** From AI Users to Local Problem Solvers  
**Domain target:** `event.dekatlokal.com`  
**Product owner:** Riswan Ramadhan / DekatLokal  
**Status:** MVP  
**Primary language:** Bahasa Indonesia  
**Design direction:** Mengikuti visual system `dekatlokal.com`  
**Primary color:** `#0255F5`

---

## 1. Executive Summary

DekatLokal Event adalah platform event management yang membantu komunitas, organisasi mahasiswa, UMKM, lembaga sosial, kampus, dan mitra lokal mengelola event secara lebih profesional.

MVP pertama digunakan untuk menyelenggarakan dan mendokumentasikan **AI Co-Creation Lab Makassar**, Mini Project Global Experience Program BAKTI NUSA 2026.

Event ini mempertemukan:

- 20 mahasiswa;
- 5 pelaku UMKM;
- 4 tim kolaborasi;
- 4 masalah usaha nyata;
- 4 solusi berbantuan AI;
- 1 kegiatan utama selama 3,5 jam.

MVP harus dapat digunakan sebagai:

1. Landing page event.
2. Portal pendaftaran.
3. Database aplikasi mahasiswa dan UMKM.
4. Project journey dan progress evidence GEP.
5. Dokumentasi partnership dan implementasi.
6. Impact report publik.
7. Proof of concept produk DekatLokal Event.

---

## 2. Problem Statement

### 2.1 Masalah operasional event

Banyak organisasi dan komunitas masih menggunakan kombinasi Google Forms, spreadsheet, poster, grup WhatsApp, dan folder dokumentasi yang terpisah.

Akibatnya:

- informasi event tersebar;
- branding event tidak konsisten;
- data peserta sulit dikelola;
- proses seleksi tidak terstruktur;
- dokumentasi dan laporan dampak terpisah;
- event selesai tanpa digital footprint yang profesional.

### 2.2 Masalah Mini Project GEP

Aktivitas GEP membutuhkan:

- deskripsi progress awardee;
- pranala atau link progres;
- bukti network mapping;
- identifikasi isu;
- mini project canvas;
- validasi masalah;
- partnership;
- implementasi;
- dokumentasi;
- impact measurement;
- reflection;
- sustainability plan.

Website event harus menyediakan URL spesifik untuk setiap progres, bukan hanya satu homepage yang sama.

### 2.3 Masalah sosial project

Mahasiswa memiliki perangkat dan akses terhadap AI, tetapi penggunaannya belum selalu diarahkan untuk memecahkan masalah nyata.

Pelaku UMKM memiliki masalah praktis, tetapi dapat terkendala perangkat, literasi AI, waktu, dan pendampingan.

AI Co-Creation Lab Makassar menjadi ruang kolaborasi untuk:

- mempertemukan mahasiswa dan UMKM;
- merumuskan masalah nyata;
- menciptakan solusi AI sederhana;
- menguji solusi bersama;
- memastikan solusi dapat digunakan melalui smartphone.

---

## 3. Product Vision

> Menjadi platform event lokal yang tidak hanya mengelola pendaftaran, tetapi juga membantu penyelenggara membangun pengalaman, dokumentasi, dan dampak yang terukur.

---

## 4. Product Positioning

### 4.1 Nama produk

**DekatLokal Event**

### 4.2 Tagline produk

**Kelola Acara, Hubungkan Peserta, Ukur Dampaknya.**

### 4.3 Diferensiasi

DekatLokal Event bukan sekadar formulir pendaftaran.

Platform menggabungkan:

- event landing page;
- registration workflow;
- event journey;
- evidence repository;
- documentation;
- impact storytelling;
- brand presence.

### 4.4 Target pengguna masa depan

- organisasi mahasiswa;
- komunitas;
- kampus dan sekolah;
- UMKM;
- lembaga sosial;
- pemerintah;
- perusahaan;
- penyelenggara workshop;
- program pendampingan.

---

## 5. MVP Goals

### 5.1 Primary goals

1. Menyelesaikan website profesional AI Co-Creation Lab Makassar.
2. Membuka dua jenis pendaftaran: mahasiswa dan UMKM.
3. Menyimpan data pendaftaran ke Supabase.
4. Menyediakan journey GEP dengan URL spesifik per aktivitas.
5. Memanfaatkan gaya visual DekatLokal tanpa merusak source referensi.
6. Membuat arsitektur yang dapat diperluas menjadi multi-event.

### 5.2 Secondary goals

1. Menguatkan branding DekatLokal.
2. Menjadi portfolio sistem digital DekatLokal.
3. Menjadi case study produk event.
4. Mengumpulkan talent pool mahasiswa dengan consent.
5. Membangun partnership portfolio.

### 5.3 Non-goals MVP

Tidak dikerjakan pada fase ini:

- pembayaran tiket;
- refund;
- seat selection;
- marketplace event besar;
- custom domain otomatis;
- akun peserta;
- organizer self-service;
- drag-and-drop form builder;
- WhatsApp API;
- email automation kompleks;
- QR check-in;
- sertifikat otomatis;
- dashboard analytics penuh;
- multi-tenant authorization.

---

## 6. Core Personas

### 6.1 Mahasiswa pendaftar

Kebutuhan:

- memahami tujuan program;
- melihat manfaat;
- mengetahui persyaratan;
- mengisi formulir dengan mudah melalui HP;
- mendapatkan konfirmasi pendaftaran;
- mengetahui bahwa pendaftaran bukan penerimaan otomatis.

### 6.2 Pelaku UMKM

Kebutuhan:

- memahami program tanpa jargon teknis;
- mengetahui peran sebagai challenge partner;
- mendaftar melalui smartphone;
- menjelaskan masalah usaha;
- memahami data apa yang aman dibagikan;
- mengetahui proses seleksi dan monitoring.

### 6.3 Reviewer GEP

Kebutuhan:

- melihat progres secara runtut;
- membuka bukti spesifik melalui URL;
- membedakan target, progres, dan capaian;
- melihat peran leadership;
- melihat partnership dan mobilisasi jejaring;
- melihat impact measurement.

### 6.4 Mitra

Kebutuhan:

- memahami konsep kegiatan;
- melihat bentuk kontribusi;
- melihat kredibilitas penyelenggara;
- memperoleh informasi event yang rapi;
- melihat dokumentasi dan impact setelah kegiatan.

### 6.5 Admin internal DekatLokal

Untuk MVP, pengelolaan aplikasi dilakukan melalui Supabase Dashboard. Dashboard organizer khusus belum wajib.

---

## 7. Information Architecture

### 7.1 Public platform pages

- `/`
- `/events`
- `/privacy`
- `/terms`

### 7.2 Event pages

- `/ai-co-creation-lab-makassar`
- `/ai-co-creation-lab-makassar/register`
- `/ai-co-creation-lab-makassar/register/student`
- `/ai-co-creation-lab-makassar/register/umkm`
- `/ai-co-creation-lab-makassar/register/success`
- `/ai-co-creation-lab-makassar/journey`
- `/ai-co-creation-lab-makassar/journey/[activitySlug]`
- `/ai-co-creation-lab-makassar/challenges`
- `/ai-co-creation-lab-makassar/teams`
- `/ai-co-creation-lab-makassar/documentation`
- `/ai-co-creation-lab-makassar/impact`

### 7.3 Initial journey activity slugs

- `personal-leadership-profile`
- `leadership-branding`
- `network-mapping`
- `social-issue`
- `project-canvas`
- `problem-validation`
- `partnership`
- `pitching`
- `action-plan`
- `global-communication`
- `meet-the-leader`
- `leadership-conversation`
- `implementation`
- `network-mobilization`
- `process-documentation`
- `monitoring`
- `impact-measurement`
- `leadership-reflection`
- `final-presentation`

---

## 8. Functional Requirements

## FR-01 Platform homepage

Homepage harus:

- memperkenalkan DekatLokal Event;
- menjelaskan value proposition;
- menampilkan event unggulan;
- menampilkan fitur utama;
- menampilkan siapa yang dapat memakai platform;
- memiliki CTA menuju event;
- memiliki CTA konsultasi atau pembuatan event;
- menggunakan branding DekatLokal;
- tidak berpura-pura bahwa fitur future sudah aktif.

## FR-02 Event landing page

Landing page AI Co-Creation Lab harus menampilkan:

- hero;
- status event;
- periode project;
- tanggal kegiatan apabila sudah final;
- lokasi atau status lokasi;
- deskripsi;
- problem;
- solusi;
- angka utama: 20, 5, 4, 4;
- manfaat mahasiswa;
- manfaat UMKM;
- cara kerja;
- rundown;
- kriteria peserta;
- partner section;
- sponsorship invitation yang jujur tanpa mengarang sponsor aktif;
- section `Our Supporting Ecosystem` dengan logo yang telah disetujui pemilik
  dalam rail horizontal kanan ke kiri yang menghormati reduced motion;
- FAQ;
- CTA pendaftaran;
- footer powered by DekatLokal.

## FR-03 Registration hub

Halaman register harus:

- menjelaskan dua jalur pendaftaran;
- menampilkan card Mahasiswa;
- menampilkan card UMKM;
- menjelaskan bahwa proses melalui seleksi;
- menampilkan privacy notice singkat;
- menggunakan CTA yang jelas.

## FR-04 Student registration

Form mahasiswa wajib mencakup:

- nama lengkap;
- email;
- WhatsApp;
- universitas;
- program studi;
- semester;
- kota;
- pengalaman AI;
- kemampuan utama;
- pilihan peran;
- ketersediaan laptop;
- pengalaman project;
- motivasi;
- komitmen hadir;
- consent privacy;
- consent dokumentasi;
- honeypot tersembunyi.

Form harus:

- mobile-first;
- memiliki label dan helper text;
- memiliki validasi client dan server;
- menampilkan field error;
- memiliki loading state;
- mencegah double submit;
- menampilkan success code setelah berhasil;
- tidak menerima script atau payload berbahaya;
- menormalisasi nomor WhatsApp.

## FR-05 UMKM registration

Form UMKM wajib mencakup:

- nama pemilik;
- nama usaha;
- email opsional;
- WhatsApp;
- kategori usaha;
- lokasi usaha;
- Instagram atau kanal digital;
- lama usaha;
- perangkat yang dimiliki;
- penggunaan AI saat ini;
- masalah berulang;
- kebutuhan utama;
- aset yang tersedia;
- kesediaan hadir penuh;
- kesediaan monitoring;
- consent privacy;
- consent dokumentasi;
- honeypot tersembunyi.

## FR-06 Supabase submission

Data pendaftaran harus:

- dikirim melalui server;
- tidak melakukan direct public insert dari browser;
- divalidasi dengan Zod;
- disimpan ke tabel generik `registrations`;
- memiliki `registration_type`;
- memiliki submission code unik;
- memiliki timestamp;
- menyimpan metadata custom dalam JSONB;
- menolak duplikasi berdasarkan event, tipe, dan WhatsApp;
- menolak duplikasi email jika email tersedia;
- mencatat consent;
- tidak menampilkan service role key ke client.

## FR-07 GEP journey

Journey harus:

- dibagi menjadi Week 1–4;
- memiliki progress bar;
- memiliki status per activity;
- menampilkan deskripsi progres;
- menampilkan output;
- menampilkan evidence links;
- menampilkan leadership insight;
- menampilkan tanggal update;
- memiliki tombol copy description;
- memiliki shareable URL;
- membedakan `Planned`, `In Progress`, `Completed`, dan `Published`.

## FR-08 Challenges

Challenges page menampilkan empat challenge slot.

Sebelum UMKM final:

- gunakan placeholder yang jujur;
- tampilkan status `Dalam Proses Validasi`;
- jangan mengarang nama UMKM;
- jangan mengklaim solusi sudah selesai.

Setelah final, data dapat diubah di file config.

## FR-09 Teams

Teams page menampilkan empat team slot.

Untuk tahap awal:

- nama tim sementara;
- komposisi empat role;
- challenge partner status;
- solution status;
- jangan membuka nomor, email, atau data pribadi peserta.

## FR-10 Documentation

Halaman dokumentasi menggunakan data hardcode:

- foto placeholder yang bermakna;
- kategori audiensi, persiapan, implementasi, demo, monitoring;
- link Drive;
- link publikasi;
- captions;
- empty state sebelum dokumentasi tersedia.

## FR-11 Impact

Impact page harus membedakan:

- target;
- actual;
- achievement rate.

Indikator:

- mahasiswa terlibat;
- UMKM terlibat;
- tim terbentuk;
- solusi dibuat;
- solusi diuji;
- skor pre-test;
- skor post-test;
- peningkatan;
- UMKM mampu mencoba;
- solusi digunakan kembali;
- mitra;
- relawan;
- testimoni.

Sebelum data aktual tersedia:

- tampilkan target;
- nilai actual harus `Belum tersedia` atau `0`, bukan angka fiktif;
- tampilkan status pengukuran.

## FR-12 SEO and sharing

Setiap halaman penting harus memiliki:

- title;
- description;
- canonical URL;
- Open Graph data;
- Twitter card;
- meaningful heading hierarchy;
- clean slug;
- sitemap;
- robots;
- favicon yang mengikuti project;
- JSON-LD `Event` hanya jika tanggal/lokasi sudah valid.

## FR-13 Accessibility

Minimum:

- semantic HTML;
- keyboard navigation;
- visible focus;
- contrast memadai;
- labels terhubung ke input;
- aria-live untuk feedback form;
- no essential information by color only;
- reduced-motion consideration;
- image alt text;
- buttons bukan clickable div.

Logo event dan logo ecosystem yang telah diberikan langsung oleh pemilik
boleh digunakan sebagai aset resmi pada halaman event. Penempatannya tetap
harus menjaga keterbacaan, performa, dan konteks klaim yang jujur.

## FR-14 Responsive design

Prioritas:

1. Smartphone 360–430 px.
2. Tablet.
3. Desktop.

Tidak boleh:

- horizontal overflow;
- text terlalu kecil;
- card terlalu padat;
- tabel memaksa scroll tanpa treatment;
- CTA sulit ditekan.

---

## 9. Content Model

Konten hardcode ditempatkan pada:

- `src/data/platform.ts`
- `src/data/events.ts`
- `src/data/gep-journey.ts`
- `src/data/challenges.ts`
- `src/data/teams.ts`
- `src/data/impact.ts`
- `src/data/faqs.ts`

Apabila repository tidak menggunakan `src`, gunakan folder yang konsisten dengan struktur existing.

Tidak boleh menyebarkan copy utama ke banyak page component.

---

## 10. Technical Requirements

### 10.1 Stack

- Next.js App Router.
- TypeScript strict.
- React Server Components sebagai default.
- Client Components hanya untuk interaksi.
- Tailwind CSS.
- Supabase Postgres.
- `@supabase/supabase-js`.
- Zod.
- Icon library yang sudah tersedia; jika tidak ada gunakan `lucide-react`.
- Package manager mengikuti lockfile existing.

### 10.2 Forms

Gunakan:

- native form + Server Action, atau
- route handler server-side apabila struktur repository lebih sesuai.

Syarat:

- validasi server wajib;
- client validation tidak boleh menjadi satu-satunya validasi;
- mutation harus berada di server;
- success dan error state jelas;
- sanitasi dan normalisasi input;
- service key hanya di server.

### 10.3 Data security

- RLS aktif.
- Tidak ada public select untuk registrations.
- Tidak ada anon insert langsung.
- Service role hanya di server.
- Tidak log payload sensitif.
- Privacy consent wajib.
- Data participant tidak muncul pada public page.
- Jangan gunakan data pelanggan UMKM sebagai sample.
- Jangan memasukkan credential ke source.

### 10.4 Performance

- Server Components untuk konten statis.
- Images memakai `next/image`.
- Font memakai `next/font`.
- Hindari dependency besar.
- Animasi ringan.
- Homepage tidak menunggu Supabase.
- Registration form bundle tetap kecil.

---

## 11. Design Requirements

### 11.1 Reference folder rule

Folder hasil copy dari `dekatlokal.com` hanya digunakan sebagai visual reference.

Codex wajib:

1. Memindahkannya ke `_reference/dekatlokal-ui` jika berkonflik.
2. Membaca struktur, spacing, typography, radius, button, navbar, footer, card, dan form.
3. Membuat audit singkat di `docs/ui-reference-audit.md`.
4. Mengimplementasikan ulang komponen production.
5. Tidak melakukan import runtime dari `_reference`.
6. Tidak mengubah file referensi kecuali pemindahan lokasi.
7. Tidak menyalin komponen yang membawa logic/database lama tanpa review.

### 11.2 Visual direction

- modern;
- clean;
- human;
- credible;
- youthful but institutional;
- whitespace luas;
- card radius konsisten;
- blue brand `#0255F5`;
- neutral background;
- subtle blue tint;
- no excessive gradients;
- no excessive glassmorphism;
- no random decorative blobs;
- no template-generic appearance.

### 11.3 Page hierarchy

- headline singkat;
- body readable;
- CTA primer jelas;
- evidence dan metrics mudah dipindai;
- mobile sections tidak terlalu panjang;
- sticky mobile CTA pada registration-open state boleh digunakan.

---

## 12. Registration Data Model

### Common data

- event_id;
- registration_type;
- full_name;
- email;
- whatsapp;
- institution_name;
- business_name;
- metadata;
- consent_privacy;
- consent_documentation;
- consent_monitoring;
- status;
- submission_code;
- created_at.

### Student metadata

- university;
- study_program;
- semester;
- city;
- ai_experience;
- skills;
- preferred_roles;
- has_laptop;
- project_experience;
- motivation;
- attendance_commitment.

### UMKM metadata

- business_category;
- business_location;
- social_media_url;
- years_in_business;
- available_devices;
- ai_usage;
- repetitive_problem;
- desired_help;
- available_assets;
- attendance_commitment.

---

## 13. Analytics Events

Siapkan helper event tracking, tetapi implementasi provider dapat sederhana.

Event names:

- `view_platform_home`
- `view_event`
- `click_student_registration`
- `click_umkm_registration`
- `student_registration_started`
- `student_registration_submitted`
- `umkm_registration_started`
- `umkm_registration_submitted`
- `view_journey_activity`
- `copy_progress_description`
- `click_evidence`
- `view_impact`
- `click_dekatlokal_main_site`

Jangan menambahkan analytics yang mengirim PII.

---

## 14. Error and Empty States

Harus ada state untuk:

- Supabase env belum tersedia;
- registration ditutup;
- event tidak ditemukan;
- slug journey tidak ditemukan;
- duplikasi pendaftaran;
- server error;
- connection timeout;
- belum ada dokumentasi;
- belum ada actual impact;
- partner belum dikonfirmasi.

Error message harus dapat dipahami pengguna nonteknis.

---

## 15. User Flows

### 15.1 Student application

1. Pengguna membuka event.
2. Membaca tujuan dan kriteria.
3. Menekan daftar mahasiswa.
4. Mengisi form.
5. Menyetujui privacy.
6. Submit.
7. Server memvalidasi.
8. Server menyimpan data.
9. Pengguna menerima submission code.
10. Status awal: `submitted`.

### 15.2 UMKM application

1. Pemilik UMKM membuka event.
2. Memahami peran challenge partner.
3. Menekan daftar UMKM.
4. Mengisi kebutuhan.
5. Menyetujui privacy dan monitoring.
6. Submit.
7. Data tersimpan.
8. Pengguna menerima submission code.

### 15.3 Reviewer GEP

1. Membuka URL activity tertentu.
2. Melihat status dan progress description.
3. Melihat output.
4. Membuka evidence link.
5. Melihat leadership insight.
6. Berpindah ke activity berikutnya.

---

## 16. GEP Alignment

Website harus memperjelas:

- leadership identity;
- problem identification;
- network mapping;
- partnership;
- project planning;
- problem validation;
- mobilization;
- implementation;
- impact measurement;
- reflection;
- sustainability.

Jangan membuat website hanya fokus pada desain event. Journey leadership adalah bagian utama.

---

## 17. Success Metrics MVP

### Product completion

- seluruh route utama tersedia;
- form student berhasil insert;
- form UMKM berhasil insert;
- duplicate prevention berjalan;
- success code tampil;
- build berhasil;
- mobile responsive;
- journey links dapat digunakan di spreadsheet GEP.

### Event target

- target 20 mahasiswa;
- target 5 UMKM;
- target 4 tim;
- target 4 solusi.

Target bukan actual. Actual diperbarui setelah kegiatan.

### Quality target

- tidak ada credential bocor;
- tidak ada public registration data;
- tidak ada broken link internal;
- tidak ada TypeScript error;
- tidak ada lint error kritis;
- tidak ada horizontal overflow pada mobile;
- semua form dapat digunakan dengan keyboard.

---

## 18. Release Plan

### Phase 0 — Repository audit

- inspect files;
- identify package manager;
- identify reference UI;
- move reference if conflict;
- document audit;
- preserve git history.

### Phase 1 — Foundation

- layout;
- design tokens;
- navbar;
- footer;
- platform homepage;
- event config;
- event landing page.

### Phase 2 — Registration

- Supabase clients;
- schemas;
- server action/API;
- student form;
- UMKM form;
- success state;
- duplicate handling;
- privacy page.

### Phase 3 — GEP journey

- journey index;
- dynamic activity pages;
- copy progress;
- evidence component;
- status system;
- impact target page.

### Phase 4 — Polish

- SEO;
- sitemap;
- robots;
- accessibility;
- responsive QA;
- empty/error states;
- build verification;
- documentation.

---

## 19. Future Roadmap

### V1.1

- organizer login;
- registration dashboard;
- shortlist and status update;
- CSV export;
- email confirmation;
- QR attendance.

### V1.2

- reusable event creation;
- custom form fields;
- certificate;
- feedback builder;
- impact report generator.

### V2

- multi-tenant organizations;
- custom branding;
- paid plans;
- payment gateway;
- custom domains;
- analytics;
- WhatsApp integration.

---

## 20. Definition of Done

MVP dinyatakan selesai apabila:

1. UI konsisten dengan DekatLokal.
2. Reference folder tidak digunakan sebagai runtime dependency.
3. Platform homepage dan event page selesai.
4. Dua registration flow bekerja.
5. Supabase schema berjalan.
6. Security boundary jelas.
7. Journey GEP memiliki unique URLs.
8. Data target dan actual dibedakan.
9. Mobile UI rapi.
10. Lint, typecheck, dan build lulus.
11. Setup documentation tersedia.
12. Tidak ada klaim partnership yang belum disetujui.
