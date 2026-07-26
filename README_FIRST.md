# DekatLokal Event — Codex Execution Pack

Paket ini disiapkan untuk membangun MVP **DekatLokal Event** dengan event pertama:

**AI Co-Creation Lab Makassar**  
*From AI Users to Local Problem Solvers*

## Tujuan MVP

Membuat platform event reusable di `event.dekatlokal.com` yang pada tahap pertama berfungsi untuk:

1. Menampilkan landing page platform DekatLokal Event.
2. Menampilkan landing page AI Co-Creation Lab Makassar.
3. Mendokumentasikan perjalanan dan progres Mini Project GEP.
4. Membuka pendaftaran mahasiswa dan UMKM.
5. Menyimpan data pendaftaran secara aman di Supabase.
6. Menampilkan halaman hasil, dokumentasi, dan dampak secara hardcode.
7. Menjadi proof of concept produk event management DekatLokal.

## Cara menggunakan paket

1. Salin semua file dalam paket ini ke root repository.
2. Pastikan folder UI lama dari `dekatlokal.com` tersedia.
3. Jika folder UI referensi masih memakai nama `app` dan `components` di root, biarkan Codex memindahkannya ke:
   - `_reference/dekatlokal-ui/app`
   - `_reference/dekatlokal-ui/components`
4. Jangan menyimpan credential asli di repository.
5. Isi `.env.local` berdasarkan `.env.example`.
6. Jalankan SQL dari `SUPABASE_SCHEMA.sql` melalui Supabase SQL Editor.
7. Buka Codex dari root repository.
8. Berikan isi `CODEX_MASTER_PROMPT.md` sebagai instruksi utama.
9. Biarkan Codex membaca `AGENTS.md`, PRD, schema, dan checklist sebelum mengubah kode.
10. Tinjau hasil, jalankan build, lalu deploy ke Vercel.

## Batas MVP

Konten event, journey GEP, partner, challenge, rundown, dan impact masih **hardcode** melalui TypeScript config.

Data yang benar-benar tersimpan di Supabase:

- aplikasi mahasiswa;
- aplikasi UMKM;
- consent;
- metadata pendaftaran;
- status pendaftaran awal.

Belum termasuk:

- payment gateway;
- marketplace tiket;
- akun peserta;
- sertifikat otomatis;
- WhatsApp API;
- form builder penuh;
- dashboard organizer multi-tenant;
- public participant directory.

## File penting

- `PRD_DEKATLOKAL_EVENT_MVP.md` — product requirements.
- `CODEX_MASTER_PROMPT.md` — prompt eksekusi utama.
- `AGENTS.md` — aturan permanen bagi Codex.
- `SUPABASE_SCHEMA.sql` — tabel, indeks, RLS, dan seed.
- `.env.example` — environment variables.
- `CONTENT_AND_ROUTES.md` — rute, isi, dan struktur data hardcode.
- `ACCEPTANCE_CHECKLIST.md` — kriteria selesai dan verifikasi.
