# Deployment

Domain target proyek adalah `event.dekatlokal.com`. Domain tersebut adalah target konfigurasi, bukan pernyataan bahwa deployment atau DNS sudah aktif.

## Prasyarat rilis

- Dependency terpasang dengan npm.
- `npm run lint`, `npm run typecheck`, dan `npm run build` dijalankan pada revision yang akan dirilis.
- `npm run build:open-next` menghasilkan `.open-next/worker.js` untuk runtime Sites.
- [`SUPABASE_SCHEMA.sql`](../SUPABASE_SCHEMA.sql) sudah diterapkan pada project Supabase environment tujuan.
- Status row event dan typed config sudah selaras.
- Tanggal, venue, partner, evidence, dan impact tetap jujur.
- Environment production sudah tersedia di hosting provider.
- Tidak ada `.env.local` atau credential di repository.

Catat hasil verifikasi dan URL aktual di implementation summary setelah deployment, bukan dengan menebaknya di dokumen ini.

## Environment production

Konfigurasikan variable berikut pada hosting provider:

```text
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
SUPABASE_SERVICE_ROLE_KEY
REGISTRATION_EVENT_SLUG
```

Nilai canonical production yang direncanakan:

```text
NEXT_PUBLIC_SITE_URL=https://event.dekatlokal.com
REGISTRATION_EVENT_SLUG=ai-co-creation-lab-makassar
```

Tambahkan hanya jika dipakai:

```text
NEXT_PUBLIC_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY
NEXT_PUBLIC_GA_MEASUREMENT_ID
```

Aturan:

- `SUPABASE_SERVICE_ROLE_KEY` dan `TURNSTILE_SECRET_KEY` adalah secret server.
- Variable `NEXT_PUBLIC_*` dapat masuk bundle browser; jangan menyimpan rahasia di sana.
- Ubah `NEXT_PUBLIC_SITE_URL` tanpa trailing slash.
- Perubahan variable publik memerlukan build/deploy baru.
- Preview sebaiknya memakai project Supabase terpisah atau pendaftaran tertutup agar data uji tidak masuk production.

## Jalur hosting terhubung

Repository memiliki `.openai/hosting.json` yang mengikat workspace ke project hosting terhubung. Perlakukan `project_id` di file tersebut sebagai nilai opaque:

- jangan menghapus, mengganti, menebak, atau membuat project ID baru;
- konfigurasikan environment melalui runtime hosting;
- simpan version dari revision source yang sama dengan hasil build;
- deploy hanya version yang sudah disimpan;
- catat URL hanya setelah provider mengembalikan deployment production yang berhasil.

Jika deployment dikelola oleh automation terhubung, ikuti status dan akses yang diberikan provider. Jangan mengedit file hosting untuk mencoba mengubah URL.

Project ini memakai `@opennextjs/cloudflare` karena Server Actions dan halaman
success dinamis tidak dapat diterbitkan sebagai static export. Konfigurasi ada
di `open-next.config.ts` dan `wrangler.jsonc`; hasil build `.open-next` tetap
diabaikan Git dan dikemas sebagai artefak deployment dari commit yang sama.

## Deployment melalui Vercel

Jika Vercel dipilih sebagai hosting provider:

1. Import repository ke Vercel.
2. Pastikan framework terdeteksi sebagai Next.js.
3. Gunakan Node.js yang memenuhi `>=20.9.0`.
4. Gunakan npm dan lockfile repository untuk instalasi dependency.
5. Gunakan `npm run build` sebagai build command.
6. Tambahkan seluruh environment variable pada environment yang tepat: Production dan, jika diperlukan, Preview.
7. Deploy revision yang sudah diverifikasi.
8. Periksa log build tanpa mencetak nilai secret.

Build/deploy tidak menjalankan SQL Supabase. Database harus disiapkan terpisah menggunakan [`setup-supabase.md`](setup-supabase.md).

## Menghubungkan Cloudflare

Tambahkan custom domain di hosting provider **sebelum** mengubah DNS. Provider akan menampilkan record verifikasi dan target DNS yang tepat.

Di Cloudflare:

1. Buka zone `dekatlokal.com`.
2. Tambahkan record untuk host `event` sesuai nilai persis yang diberikan hosting provider.
3. Tambahkan TXT verification jika provider memintanya.
4. Jangan menebak target CNAME; target dapat berbeda menurut provider dan project.
5. Gunakan mode DNS/proxy yang direkomendasikan provider. Jika validasi sertifikat gagal, mulai dengan **DNS only**, lalu aktifkan proxy hanya setelah dipastikan didukung.
6. Tunggu provider memverifikasi domain dan menerbitkan sertifikat TLS.
7. Pastikan `NEXT_PUBLIC_SITE_URL` sudah menggunakan `https://event.dekatlokal.com`, kemudian redeploy.

Jangan menghapus record DNS lama yang tidak terkait. Verifikasi target dan host sebelum setiap perubahan.

## Pemeriksaan pascarilis

Lakukan pemeriksaan berikut pada URL yang benar-benar diterbitkan:

- `/`, `/events`, `/privacy`, dan `/terms`;
- landing event dan seluruh halaman pendaftaran;
- satu activity journey valid dan satu slug tidak valid;
- pastikan index Journey, challenge, tim, dokumentasi, dan impact mengembalikan 404;
- sitemap, robots, favicon, canonical, Open Graph, dan heading;
- layout pada lebar mobile 360–430 px, tablet, dan desktop;
- keyboard navigation, visible focus, label form, dan error announcement;
- state pendaftaran dibuka/ditutup;
- submit mahasiswa dan UMKM menggunakan data uji yang aman;
- duplicate handling;
- success code tanpa PII di URL;
- tidak ada record registrasi yang dapat dibaca secara anonim;
- tidak ada secret atau payload pendaftaran pada browser bundle/log.

Pastikan Event JSON-LD memuat tanggal, waktu WITA, dan venue yang sudah
dikonfirmasi tanpa mengarang alamat jalan.

## Membuka pendaftaran production

Lakukan setelah pemeriksaan dasar selesai:

1. Pastikan Supabase production memakai schema dan credential yang benar.
2. Pastikan kontak dan privacy notice sudah siap.
3. Buka row event di Supabase menggunakan prosedur pada [`setup-supabase.md`](setup-supabase.md).
4. Ubah typed config agar CTA publik konsisten.
5. Redeploy bila perubahan config diperlukan.
6. Kirim submission uji minimal, verifikasi record, lalu tangani data uji secara terkendali.

## Rollback dan insiden

- Gunakan rollback/version sebelumnya dari hosting provider; jangan mengubah DNS sebagai langkah pertama.
- Jika migration database sudah mengubah data, rollback aplikasi belum tentu mengembalikan schema. Siapkan migration korektif terpisah.
- Jika secret terpapar, rotate di provider asal, perbarui seluruh environment, dan redeploy.
- Jika form bermasalah, tutup pendaftaran melalui row event dan typed config sambil mempertahankan halaman informasi tetap tersedia.
- Jangan menghapus registration production secara massal untuk memperbaiki masalah deployment.
