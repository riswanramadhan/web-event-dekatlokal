# DekatEvent.

DekatEvent. adalah MVP platform event dari DekatLokal untuk informasi acara dan pendaftaran. Event pertama adalah **AI Co-Creation Lab Makassar** dengan tagline **From AI Users to Local Problem Solvers**.

Kuota bootcamp adalah **20 mahasiswa dan 5 UMKM**. Angka tim, solusi, peserta hadir, evidence, testimoni, dan dampak aktual tetap dibedakan sebagai target atau data aktual; data yang belum tersedia tidak boleh direkayasa.

## Lingkup MVP

- Landing page platform dan direktori event.
- Landing page AI Co-Creation Lab Makassar.
- Pendaftaran mahasiswa dan UMKM melalui server.
- Penyimpanan pendaftaran di Supabase.
- Community support dengan upload bukti privat, konfirmasi sukses langsung,
  ticker opt-in, dan CTA WhatsApp opsional.
- URL privat GEP Week 1–4 yang hanya dapat dibuka melalui tautan langsung.
- Halaman privasi, ketentuan, metadata, sitemap, dan robots.

MVP belum mencakup payment, marketplace tiket, akun peserta, dashboard organizer, QR check-in, sertifikat, form builder, atau multi-tenant authentication.

## Stack

- Next.js App Router dan React.
- TypeScript strict.
- Tailwind CSS.
- AOS dan Framer Motion untuk motion ringan dengan dukungan reduced-motion.
- OpenNext Cloudflare adapter untuk artefak runtime Sites.
- Supabase Postgres dan Storage untuk pendaftaran, pencatatan community support,
  dan penyimpanan bukti privat.
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

4. Jalankan [`SUPABASE_SCHEMA.sql`](SUPABASE_SCHEMA.sql) di Supabase SQL Editor
   jika alur pendaftaran akan diuji. Untuk community support, lanjutkan dengan
   migration
   [`supabase/migrations/20260802000000_create_community_support.sql`](supabase/migrations/20260802000000_create_community_support.sql),
   lalu
   [`supabase/migrations/20260802010000_add_community_support_idempotency.sql`](supabase/migrations/20260802010000_add_community_support_idempotency.sql),
   [`supabase/migrations/20260802020000_expand_community_support_submission.sql`](supabase/migrations/20260802020000_expand_community_support_submission.sql),
   dan
   [`supabase/migrations/20260802030000_contract_community_support_submission.sql`](supabase/migrations/20260802030000_contract_community_support_submission.sql)
   sesuai urutan timestamp.
   Petunjuk lengkap tersedia di
   [`docs/setup-supabase.md`](docs/setup-supabase.md).

5. Jalankan development server:

   ```bash
   npm run dev
   ```

6. Buka `http://localhost:3000`.

Halaman publik statis tidak bergantung pada Supabase. Tanpa konfigurasi
Supabase, penyimpanan pendaftaran dan community support tidak tersedia; aplikasi
harus menampilkan state yang sesuai, bukan membuka akses langsung dari browser.

## Environment variables

| Variable | Cakupan | Keterangan |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Publik | Origin canonical, misalnya `http://localhost:3000` saat lokal. Jangan tambahkan trailing slash. |
| `NEXT_PUBLIC_SUPABASE_URL` | Publik | URL project Supabase. Diperlukan untuk integrasi pendaftaran. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publik | Publishable key project untuk kebutuhan client publik bila digunakan. Mutation pendaftaran saat ini tidak memakainya untuk insert langsung. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server saja | Credential untuk mutation pendaftaran dan community support di server. Wajib dirahasiakan. |
| `REGISTRATION_EVENT_SLUG` | Server | Slug row event, default `ai-co-creation-lab-makassar`. |
| `TRUSTED_IP_HEADER` | Server, opsional | Isi `cf-connecting-ip` hanya jika Cloudflare langsung dan eksklusif berada di depan runtime. Biarkan kosong pada lokal dan Vercel langsung. |
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
| `npm run build:open-next` | Membuat artefak OpenNext untuk Sites/Cloudflare runtime. |
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
/ai-co-creation-lab-makassar/journey/[activitySlug]
```

Index Journey serta halaman challenge, tim, dokumentasi, dan impact tidak dibuka sebagai rute publik. Activity Week 1–4 tetap tersedia melalui URL langsung, memakai `noindex`, dan tidak dimasukkan ke sitemap maupun navigasi.

Halaman community support juga sengaja tidak ditautkan dari navigasi dan tidak
dimasukkan ke sitemap. Halaman hanya dibagikan melalui URL langsung
`https://event.dekatlokal.com/community-support`, memakai `noindex`, dan
diblokir dari crawling melalui `robots.txt`. Ini adalah pengurangan
discoverability, bukan autentikasi; siapa pun yang memiliki URL tetap dapat
membukanya. CTA proposal memakai URL production tetap
`https://event.dekatlokal.com/ai-co-creation-lab-makassar/sponsorship-proposal`.

## Mengubah konten

Konten publik disimpan sebagai typed TypeScript config di `src/data`, bukan di Supabase. Gunakan [`docs/content-editing.md`](docs/content-editing.md) untuk memperbarui tanggal, lokasi, status pendaftaran, partner, journey, challenge, tim, dokumentasi, dan impact tanpa membuat klaim fiktif.

Folder `referensi-ui-dekatlokal` hanya referensi visual. Source produksi tidak boleh mengimpor modul runtime, logic, atau aset yang belum disetujui dari folder tersebut. Lihat [`docs/ui-reference-audit.md`](docs/ui-reference-audit.md).

## Supabase, pendaftaran, dan community support

Supabase menyimpan aplikasi mahasiswa/UMKM dan submission community support.
Tidak ada halaman publik untuk membaca data privat. Pengelola yang berwenang
mengakses record serta bukti transfer melalui Supabase Dashboard.

Mutation berada di `src/app/ai-co-creation-lab-makassar/register/actions.ts`. Client admin berada di `src/lib/supabase/admin.ts`; schema input berada di `src/lib/validation`; normalisasi dan result contract berada di `src/lib/registration`. Row `public.events` adalah otoritas server untuk menerima atau menolak submission.

Boundary keamanan:

- mutation berjalan di server;
- seluruh input divalidasi, dipangkas, dinormalisasi, dan dibatasi;
- RLS tetap aktif;
- role `anon` dan `authenticated` tidak mendapat read atau insert;
- service-role key tidak masuk bundle browser;
- PII tidak ditempatkan di URL, log, analytics, atau halaman publik;
- duplikasi dibatasi per event, tipe pendaftaran, dan WhatsApp/email yang sudah dinormalisasi.
- bucket bukti community support tetap privat dan tidak memiliki public read
  atau anonymous upload policy;
- submission yang tersimpan langsung mengembalikan reference code tanpa status
  verifikasi publik;
- ticker hanya membaca maksimal 10 submission bernama yang secara eksplisit
  mengizinkan tampil, lalu menyamarkan nama di server dan mengembalikan nominal;
- ticker menyatakan bahwa supporter mengirim konfirmasi dukungan, bukan bahwa
  transfer telah diverifikasi atau diterima;
- kontak, pesan, bank, proof path, bukti, dan catatan internal tidak pernah
  dikembalikan oleh endpoint ticker;
- tidak ada seed nama atau nominal fiktif; ketika data opt-in belum ada, ticker
  memakai pesan kampanye yang jujur tanpa social proof rekaan.

Setup schema dan prosedur membuka/menutup pendaftaran dijelaskan di [`docs/setup-supabase.md`](docs/setup-supabase.md).
Migration, matriks uji, moderasi pengecualian, akses bukti privat, dan retensi
community support dijelaskan di
[`docs/community-support-operations.md`](docs/community-support-operations.md).

Angka **5 Digital Prototypes** pada halaman community support adalah planned
target yang disengaja untuk konteks kampanye, bukan capaian aktual. Sumber
canonical MVP lain tetap memakai target 4 tim/4 solusi sampai ada keputusan
produk untuk merekonsiliasinya.

## Deployment

Domain target adalah `event.dekatlokal.com`; penyebutan ini tidak menyatakan bahwa domain sudah aktif atau deployment sudah terbit. Konfigurasi hosting, environment production, DNS Cloudflare, pemeriksaan pascarilis, dan rollback dijelaskan di [`docs/deployment.md`](docs/deployment.md).

## Dokumentasi proyek

- [`docs/community-support-operations.md`](docs/community-support-operations.md) - migration, QA, ticker opt-in, bukti privat, moderasi, dan retensi community support.
- [`docs/implementation-plan.md`](docs/implementation-plan.md) — rencana dan keputusan arsitektur.
- [`docs/setup-supabase.md`](docs/setup-supabase.md) — database, RLS, environment, dan verifikasi integrasi.
- [`docs/content-editing.md`](docs/content-editing.md) — sumber konten dan aturan editorial.
- [`docs/deployment.md`](docs/deployment.md) — deployment dan domain.
- [`docs/ui-reference-audit.md`](docs/ui-reference-audit.md) — audit visual dan boundary folder referensi.
- [`docs/implementation-summary.md`](docs/implementation-summary.md) — hasil implementasi, keamanan, dan verifikasi akhir.
