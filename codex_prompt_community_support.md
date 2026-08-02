# CODEX EXECUTION PROMPT — COMMUNITY SUPPORT PAGE

Saya memiliki website event **AI Co-Creation Lab Makassar** yang sudah berjalan dan memakai **Supabase**. Kerjakan langsung pada codebase yang sedang terbuka. Jangan membuat project baru.

## Tujuan utama

Tambahkan satu halaman baru:

```text
/community-support
```

Halaman ini digunakan untuk mengajak teman, alumni, komunitas, dan relasi memberikan dukungan dana untuk pelaksanaan **AI Co-Creation Lab Makassar — 10 Agustus 2026**.

Halaman harus terlihat seperti halaman **community support profesional**, bukan donasi belas kasihan dan bukan crowdfunding template.

Tone:
- mengikuti tema web yang sudah ada di style dan global style
- sedikit campuran Indonesia–English yang ala gen z
- tidak  formal;
- tidak berlebihan.

Prioritas:
1. Mobile-first dan sangat nyaman dibuka dari WhatsApp/Instagram.
2. Tetap polished di desktop.
3. Form mudah digunakan.
4. Bukti transfer aman dan private.
5. Data tersimpan di Supabase.

---

## 1. Audit codebase sebelum implementasi

Sebelum coding:

1. Baca struktur project.
2. Identifikasi framework, routing, styling, component library, typography, navbar, footer, dan breakpoint.
3. Cari konfigurasi Supabase existing.
4. Cari halaman proposal event existing.
5. Gunakan kembali design system dan component existing.
6. Jangan mengubah halaman lain kecuali benar-benar diperlukan.
7. Jangan install dependency baru jika native API atau package existing sudah cukup.

Setelah audit, langsung implementasikan. Jangan berhenti di analisis.

---

## 2. Struktur halaman

### Hero

Headline:

```text
Let’s Build Something Useful, Together.
```

Deskripsi:

```text
AI Co-Creation Lab Makassar mempertemukan 20 mahasiswa dan 5 UMKM untuk build 5 solusi digital dari real business problems.

Peserta, UMKM, venue, dan programnya sudah siap. Sekarang kami membuka ruang buat teman-teman yang ingin ikut support perjalanan ini.
```

CTA utama:

```text
Support the Event
```

CTA melakukan smooth scroll ke form.

CTA kedua:

```text
View Full Proposal
```

CTA membuka proposal di tab baru.

Gunakan environment variable:

```env
NEXT_PUBLIC_EVENT_PROPOSAL_URL=
```

Jika route proposal existing tersedia, gunakan sebagai fallback.

Tampilkan statistik secara sederhana, jangan berupa card besar:

```text
20 Students
5 Local Businesses
5 Digital Prototypes
1 Collaborative Lab
```

### Why Community Support

Judul:

```text
Why Community Support?
```

Copy:

```text
Sebagian brand dan sponsor kami masih dalam proses, sementara hari pelaksanaan semakin dekat.

Instead of just waiting, kami membuka ruang buat teman, alumni, komunitas, dan siapa pun yang percaya pada program ini untuk ikut terlibat.

Nggak harus dengan nominal besar. Small support, sharing this page, atau menghubungkan kami dengan partner yang tepat juga sangat berarti.
```

Highlight:

```text
Small support. Real collaboration. Useful impact.
```

### Penggunaan dukungan

Judul:

```text
Your Support Goes Here
```

Tampilkan:

- konsumsi peserta, UMKM, mentor, dan panitia;
- ID card, lanyard, dan identitas peserta;
- participant kit dan perlengkapan kegiatan;
- dokumentasi dan publikasi;
- kebutuhan teknis development dan demo;
- operasional dasar event.

Tambahkan:

```text
Setelah event selesai, kami akan membagikan dokumentasi, hasil prototype, dan laporan singkat penggunaan dukungan secara transparan dari teman teman semua. Transparan.
```

### Pilihan rekening

Judul:

```text
Choose Where to Send Your Support
```

#### Bank Syariah Indonesia

```text
Nomor Rekening: 7341301558
Atas Nama: Riswan Ramadhan
```

#### Bank Mandiri

```text
Nomor Rekening: 1520031989276
Atas Nama: Riswan Ramadhan
```

Setiap rekening harus memiliki:

- nama bank;
- nomor rekening;
- nama pemilik;
- tombol `Copy Account Number`;
- feedback `Copied`;
- toast atau inline feedback;
- accessible label;
- tidak hanya bergantung pada icon.

Tambahkan warning:

```text
Pastikan nama penerima yang muncul adalah Riswan Ramadhan sebelum menyelesaikan transfer.
```

---

## 3. Form community support

Judul:

```text
Tell Us About Your Support
```

Deskripsi:

```text
Setelah transfer, isi form singkat ini agar support kamu bisa kami verifikasi dan catat dengan baik.
```

### Identitas supporter

Gunakan radio atau segmented control:

```text
Use my name
Stay anonymous
```

Default `Use my name`.

Jika `Use my name`:
- nama wajib;
- `is_anonymous = false`.

Jika `Stay anonymous`:
- input nama disembunyikan atau disabled;
- `is_anonymous = true`;
- `display_publicly = false`.

### Nama lengkap

Field:

```text
supporter_name
```

Placeholder:

```text
Your full name
```

Wajib hanya jika tidak anonim.

### Nominal dukungan

Field:

```text
amount
```

Placeholder:

```text
Rp100.000
```

Ketentuan:
- wajib;
- lebih besar dari 0;
- simpan sebagai integer Rupiah;
- gunakan `Intl.NumberFormat('id-ID')`;
- jangan simpan sebagai decimal.

### Bank tujuan

Field:

```text
destination_bank
```

Value database:

```text
bsi
mandiri
```

Label UI:

```text
Bank Syariah Indonesia
Bank Mandiri
```

### Tanggal transfer

Field:

```text
transfer_date
```

Gunakan date input mobile-friendly. Default hari ini.

### Kontak

Field:

```text
contact
```

Optional.

Placeholder:

```text
WhatsApp or email — optional
```

Helper:

```text
Data ini hanya digunakan untuk konfirmasi dan tidak ditampilkan secara publik.
```

### Pesan

Field:

```text
message
```

Optional textarea.

Placeholder:

```text
Leave a short message for the team…
```

Maksimal 300 karakter dan tampilkan character counter.

### Persetujuan tampil publik

Checkbox:

```text
You may display my name on the Community Supporter Wall.
```

Field:

```text
display_publicly
```

Default `true` jika memakai nama. Jika anonim, otomatis `false`.

### Upload bukti transfer

Field wajib:

```text
proof_file
```

Format:

```text
image/jpeg
image/png
image/webp
application/pdf
```

Maksimal 5 MB.

Fitur:
- tap to upload di mobile;
- drag and drop di desktop;
- preview gambar;
- icon PDF;
- nama dan ukuran file;
- remove dan replace;
- validasi client dan server.

Helper:

```text
Your transfer proof is stored privately and only used for verification.
```

### Konfirmasi

Checkbox wajib:

```text
I confirm that the information and transfer proof submitted are correct.
```

Tambahkan honeypot field tersembunyi.

---

## 4. Tombol dan success state

Button default:

```text
Submit My Support
```

Loading:

```text
Submitting…
```

Success:

```text
Support Submitted
```

Ketentuan:
- full width di mobile;
- disabled ketika invalid dan selama submit;
- cegah double submission;
- focus state jelas;
- jangan hapus isi form jika gagal.

Setelah berhasil, tampilkan:

Headline:

```text
Thank you for being part of this.
```

Body:

```text
Support kamu sudah kami terima dan sedang menunggu verifikasi. Every contribution helps us move this program forward.
```

Tampilkan:
- submission reference code;
- nominal;
- bank tujuan;
- status `Pending Verification`.

Button:

```text
Back to Event
Share This Page
```

Gunakan Web Share API, dengan fallback copy URL.

Jangan tampilkan public URL bukti transfer.

---

## 5. Progress dan supporter wall

### Progress

Ambil hanya status `verified`.

Tampilkan:
- total verified support;
- jumlah verified supporters;
- progress terhadap target.

Target dari:

```env
NEXT_PUBLIC_COMMUNITY_SUPPORT_TARGET=
```

Jika env tidak tersedia, sembunyikan percentage bar tetapi tetap tampilkan total dan jumlah supporter.

Copy:

```text
Every verified support brings us one step closer.
```

### Community Supporter Wall

Tampilkan maksimal 12 dukungan verified terbaru.

Yang boleh tampil:
- nama atau `Anonymous Supporter`;
- nominal;
- pesan singkat;
- tanggal.

Jangan tampilkan:
- kontak;
- bank tujuan;
- proof path;
- admin notes;
- UUID database.

Empty state:

```text
The first names will appear here after verification.
```

---

## 6. Supabase schema dan storage

Buat migration SQL baru, misalnya:

```text
supabase/migrations/<timestamp>_create_community_support.sql
```

Table:

```text
community_supports
```

Kolom minimal:

```text
id uuid primary key
submission_code text unique
event_slug text
supporter_name text nullable
is_anonymous boolean
contact text nullable
amount bigint
destination_bank text
transfer_date date
message text nullable
display_publicly boolean
proof_bucket text
proof_path text
proof_original_name text nullable
proof_mime_type text
proof_size_bytes bigint
status text
verified_at timestamptz nullable
verified_by uuid nullable
rejected_at timestamptz nullable
admin_notes text nullable
created_at timestamptz
updated_at timestamptz
```

Status valid:

```text
pending
verified
rejected
```

Constraint wajib:
- amount > 0;
- bank hanya `bsi` atau `mandiri`;
- message maksimal 300 karakter;
- file maksimal 5 MB;
- MIME hanya JPG, PNG, WebP, PDF;
- nama wajib jika tidak anonim;
- anonim tidak boleh tampil publik;
- state status dan timestamp harus konsisten.

Tambahkan:
- index status dan created_at;
- updated_at trigger;
- RLS enabled;
- tidak ada public insert/select/update/delete;
- revoke akses anon dan authenticated;
- service role hanya server-side.

### Private storage bucket

Nama bucket:

```text
community-support-proofs
```

Bucket:
- private;
- max 5 MB;
- hanya JPG, PNG, WebP, PDF;
- tanpa public read policy;
- tanpa anonymous upload policy.

Simpan object path, bukan public URL.

Path:

```text
ai-co-creation-lab-makassar-2026/YYYY/MM/{uuid}.{extension}
```

Extension ditentukan dari MIME tervalidasi, bukan nama file user.

---

## 7. Backend API

Sesuaikan dengan framework existing.

Jika Next.js App Router, buat:

```text
POST /api/community-support
GET /api/community-support/summary
```

### POST

Terima `multipart/form-data`.

Server wajib:

1. cek honeypot;
2. validasi dengan Zod;
3. validasi amount;
4. validasi bank;
5. validasi kondisi nama/anonymous;
6. validasi tanggal;
7. validasi MIME dan ukuran;
8. generate UUID dan path;
9. upload private file memakai service role;
10. insert row status `pending`;
11. hapus file jika insert database gagal;
12. return submission code, amount, bank, status;
13. jangan return proof path;
14. jangan log data sensitif.

### GET summary

Return hanya:

```text
verified_total
verified_supporter_count
latest_supporters
```

Hanya status `verified`. Jangan return field private.

---

## 8. Security

Wajib:

- upload dan insert melalui server;
- `SUPABASE_SERVICE_ROLE_KEY` tidak boleh masuk client;
- service role tanpa prefix `NEXT_PUBLIC_`;
- server-side validation;
- client-side validation;
- strict MIME validation;
- maximum string lengths;
- honeypot;
- prevent double submit;
- private storage;
- generic user error;
- jangan expose raw database error;
- jangan gunakan `dangerouslySetInnerHTML`;
- sanitasi text saat ditampilkan;
- rate limiting jika infrastruktur existing tersedia.

Environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_EVENT_PROPOSAL_URL=
NEXT_PUBLIC_COMMUNITY_SUPPORT_TARGET=
```

Tambahkan ke `.env.example` tanpa nilai secret asli.

---

## 9. Mobile-first dan responsive

Mayoritas user membuka dari browser WhatsApp atau Instagram.

Pastikan:
- tidak ada horizontal overflow di 320px;
- input dan button minimal 44–48px;
- CTA full width di mobile;
- nomor rekening mudah disalin;
- upload mudah dari gallery/file manager;
- keyboard mobile tidak merusak layout;
- typography nyaman;
- spacing tidak terlalu padat;
- form tidak terpotong;
- safe area iPhone diperhatikan;
- desktop optimal di 1440px;
- jangan terlalu banyak card;
- jangan gunakan gradient berlebihan;
- jangan membuat AI-looking generic UI.

---

## 10. Accessibility dan SEO

Accessibility:
- semua input punya label;
- placeholder bukan satu-satunya label;
- keyboard navigation;
- focus state jelas;
- error memakai `aria-describedby`;
- submit status memakai `aria-live`;
- contrast cukup;
- radio dan checkbox accessible;
- copy feedback terbaca screen reader;
- decorative icon `aria-hidden`;
- hormati `prefers-reduced-motion`.

Metadata:

```text
Title:
Community Support | AI Co-Creation Lab Makassar

Description:
Support AI Co-Creation Lab Makassar and help students and local businesses build practical digital solutions together.
```

Gunakan OG image event existing dan canonical sesuai domain.

---

## 11. Error messages

Gunakan:

```text
Please upload a JPG, PNG, WebP, or PDF file.

File size must be under 5 MB.

Please enter your name or choose to stay anonymous.

Please enter a valid support amount.

We couldn’t upload your transfer proof. Please try again.

Something went wrong while submitting your support. Please try again.

Connection interrupted. Please check your internet and try again.
```

Jangan reset form ketika gagal.

---

## 12. Verifikasi akhir

Sebelum selesai:

1. jalankan lint;
2. jalankan typecheck;
3. jalankan build;
4. perbaiki semua error;
5. test desktop;
6. test mobile 320px, 375px, 390px, dan 1440px;
7. test named submission;
8. test anonymous submission;
9. test JPG;
10. test PDF;
11. test file > 5 MB;
12. test file invalid;
13. test copy rekening;
14. test loading dan double submit;
15. test network failure;
16. pastikan proof tidak dapat dibuka melalui public URL;
17. pastikan pending tidak masuk total;
18. pastikan hanya verified masuk supporter wall;
19. pastikan tidak ada horizontal overflow;
20. pastikan halaman existing tidak rusak.

---

## 13. Laporan akhir dari Codex

Setelah implementasi, berikan:

1. file yang dibuat;
2. file yang diubah;
3. route baru;
4. API endpoint baru;
5. migration SQL;
6. environment variable yang harus diisi;
7. cara menjalankan migration;
8. cara test submission;
9. cara memverifikasi atau menolak support;
10. cara admin membuka private proof;
11. hasil lint, typecheck, dan build;
12. konfigurasi manual yang masih diperlukan.

PENTING:

- Jangan hanya memberi tutorial.
- Implementasikan langsung.
- Jangan membuat project baru.
- Jangan merombak desain existing.
- Jangan membuat dummy production.
- Jangan menambah rekening lain.
- Jangan membuat QRIS.
- Jangan expose bukti transfer secara publik.

BISA UBAH, ADA SOCIAL PROOF YANG BAGUS DIKALIMATNYA. SETELAH MEREKA ISI FORM SUPPORT BERIKAN ANIMASSI YANG GIF BERHASIL CENTANG DAN ADA CTA UNTUK KONFIRMASI BAHWA SUDAH SUPPORT
