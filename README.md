# DekatLokal Event

DekatLokal Event adalah MVP platform event untuk halaman acara, pendaftaran, perjalanan program, dokumentasi, dan laporan dampak. Event pertama adalah **AI Co-Creation Lab Makassar** dengan tagline **From AI Users to Local Problem Solvers**.

Angka 16 mahasiswa, 4 UMKM, 4 tim, dan 4 solusi adalah **target program**, bukan capaian aktual. Tanggal, lokasi, partner, peserta, evidence, testimoni, dan dampak aktual harus tetap memakai placeholder atau status yang jujur sampai datanya disetujui.

## Lingkup MVP

- Landing page platform dan direktori event.
- Landing page AI Co-Creation Lab Makassar.
- Pendaftaran mahasiswa dan UMKM melalui server.
- Penyimpanan pendaftaran di Supabase.
- Journey GEP Week 1–4 dengan URL unik per aktivitas.
- Halaman challenge, tim, dokumentasi, dan dampak.
- Halaman privasi, ketentuan, metadata, sitemap, dan robots.

MVP belum mencakup payment, marketplace tiket, akun peserta, dashboard organizer, QR check-in, sertifikat, form builder, atau multi-tenant authentication.

## Stack

- Next.js App Router dan React.
- TypeScript strict.
- Tailwind CSS.
- AOS dan Framer Motion untuk motion ringan dengan dukungan reduced-motion.
- Supabase Postgres untuk data pendaftaran.
- Zod untuk validasi input eksternal.
- `next/font`, `next/image`, dan Lucide untuk aset antarmuka.
- npm sebagai package manager.

## Prasyarat

- Node.js `>=20.9.0`.
- npm.
- Project Supabase untuk mengaktifkan pendaftaran.

## Menjalankan secara lokal

1. Instal dependency:

   ```bash
   npm ci
   ```

   Gunakan `npm install` hanya ketika memang memperbarui dependency dan lockfile.

2. Buat environment lokal dari template:

   ```powershell
   Copy-Item .env.example .env.local
   ```

3. Isi `.env.local`. Jangan commit file ini.

4. Jalankan [`SUPABASE_SCHEMA.sql`](SUPABASE_SCHEMA.sql) di Supabase SQL Editor jika alur pendaftaran akan diuji. Petunjuk lengkap tersedia di [`docs/setup-supabase.md`](docs/setup-supabase.md).

5. Jalankan development server:

   ```bash
   npm run dev
   ```

6. Buka `http://localhost:3000`.

Halaman publik statis tidak bergantung pada Supabase. Tanpa konfigurasi Supabase, penyimpanan pendaftaran tidak tersedia dan aplikasi harus menampilkan state yang sesuai, bukan membuka akses langsung dari browser.

## Environment variables

| Variable | Cakupan | Keterangan |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Publik | Origin canonical, misalnya `http://localhost:3000` saat lokal. Jangan tambahkan trailing slash. |
| `NEXT_PUBLIC_SUPABASE_URL` | Publik | URL project Supabase. Diperlukan untuk integrasi pendaftaran. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publik | Publishable key project untuk kebutuhan client publik bila digunakan. Mutation pendaftaran saat ini tidak memakainya untuk insert langsung. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server saja | Credential untuk mutation pendaftaran di server. Wajib dirahasiakan. |
| `REGISTRATION_EVENT_SLUG` | Server | Slug row event, default `ai-co-creation-lab-makassar`. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Publik, opsional | Site key Cloudflare Turnstile. Isi bersama secret key. |
| `TURNSTILE_SECRET_KEY` | Server saja, opsional | Secret untuk verifikasi Turnstile di server. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Publik, opsional | ID analytics. Tracking tidak boleh mengirim PII. |

Gunakan nama variable persis seperti [`.env.example`](.env.example). Jangan pernah mengganti nama `SUPABASE_SERVICE_ROLE_KEY` menjadi variable berawalan `NEXT_PUBLIC_`.

## Script

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan development server. |
| `npm run lint` | Memeriksa aturan lint. |
| `npm run typecheck` | Menjalankan TypeScript tanpa emit. |
| `npm run build` | Membuat production build. |
| `npm run start` | Menjalankan production build secara lokal. |

Jalankan lint, typecheck, dan build sebelum rilis. Dokumen ini tidak menyatakan hasil eksekusi perintah tersebut; hasil akhir dicatat terpisah dalam implementation summary.

## Rute utama

```text
/
/events
/privacy
/terms
/ai-co-creation-lab-makassar
/ai-co-creation-lab-makassar/register
/ai-co-creation-lab-makassar/register/student
/ai-co-creation-lab-makassar/register/umkm
/ai-co-creation-lab-makassar/register/success
/ai-co-creation-lab-makassar/journey
/ai-co-creation-lab-makassar/journey/[activitySlug]
/ai-co-creation-lab-makassar/challenges
/ai-co-creation-lab-makassar/teams
/ai-co-creation-lab-makassar/documentation
/ai-co-creation-lab-makassar/impact
```

## Mengubah konten

Konten publik disimpan sebagai typed TypeScript config di `src/data`, bukan di Supabase. Gunakan [`docs/content-editing.md`](docs/content-editing.md) untuk memperbarui tanggal, lokasi, status pendaftaran, partner, journey, challenge, tim, dokumentasi, dan impact tanpa membuat klaim fiktif.

Folder `referensi-ui-dekatlokal` hanya referensi visual. Source produksi tidak boleh mengimpor modul runtime, logic, atau aset yang belum disetujui dari folder tersebut. Lihat [`docs/ui-reference-audit.md`](docs/ui-reference-audit.md).

## Supabase dan akses pendaftaran

Supabase hanya menyimpan data aplikasi mahasiswa dan UMKM pada fase ini. Tidak ada halaman publik atau dashboard organizer di aplikasi untuk membaca registrasi. Pengelola yang berwenang mengakses data melalui Supabase Dashboard.

Mutation berada di `src/app/ai-co-creation-lab-makassar/register/actions.ts`. Client admin berada di `src/lib/supabase/admin.ts`; schema input berada di `src/lib/validation`; normalisasi dan result contract berada di `src/lib/registration`. Row `public.events` adalah otoritas server untuk menerima atau menolak submission.

Boundary keamanan:

- mutation berjalan di server;
- seluruh input divalidasi, dipangkas, dinormalisasi, dan dibatasi;
- RLS tetap aktif;
- role `anon` dan `authenticated` tidak mendapat read atau insert;
- service-role key tidak masuk bundle browser;
- PII tidak ditempatkan di URL, log, analytics, atau halaman publik;
- duplikasi dibatasi per event, tipe pendaftaran, dan WhatsApp/email yang sudah dinormalisasi.

Setup, query verifikasi, dan prosedur membuka/menutup pendaftaran dijelaskan di [`docs/setup-supabase.md`](docs/setup-supabase.md).

## Deployment

Domain target adalah `event.dekatlokal.com`; penyebutan ini tidak menyatakan bahwa domain sudah aktif atau deployment sudah terbit. Konfigurasi hosting, environment production, DNS Cloudflare, pemeriksaan pascarilis, dan rollback dijelaskan di [`docs/deployment.md`](docs/deployment.md).

## Dokumentasi proyek

- [`docs/implementation-plan.md`](docs/implementation-plan.md) — rencana dan keputusan arsitektur.
- [`docs/setup-supabase.md`](docs/setup-supabase.md) — database, RLS, environment, dan verifikasi integrasi.
- [`docs/content-editing.md`](docs/content-editing.md) — sumber konten dan aturan editorial.
- [`docs/deployment.md`](docs/deployment.md) — deployment dan domain.
- [`docs/ui-reference-audit.md`](docs/ui-reference-audit.md) — audit visual dan boundary folder referensi.
- [`docs/implementation-summary.md`](docs/implementation-summary.md) — hasil implementasi, keamanan, dan verifikasi akhir.
