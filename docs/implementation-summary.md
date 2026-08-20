# Ringkasan Implementasi DekatEvent MVP

Tanggal verifikasi: 29 Juli 2026
Event utama: AI Co Creation Lab Makassar
Domain target: `event.dekatlokal.com`

## Hasil

DekatEvent dibangun dengan Next.js App Router, React, dan TypeScript strict.
Revisi terakhir memusatkan pengalaman pada informasi event dan pendaftaran:

- wordmark DekatEvent dan navbar desktop floating white glass;
- homepage center dengan informasi event sebagai item mandiri;
- detail event ringkas dengan hero satu viewport desktop;
- dock mobile melayang dengan CTA tengah menuju registrasi mahasiswa;
- bottom sheet mobile yang mendukung click outside, Escape, focus trap, dan
  focus restore;
- loading state berbasis skeleton, page fade ringan, dan Framer Motion yang
  menghormati `prefers-reduced-motion`; full-screen route overlay dan runtime
  AOS sudah dihapus untuk mempercepat navigasi;
- sponsorship invitation `Your Brand` yang tidak mengarang sponsor aktif;
- grid statis `Our Supporting Ecosystem` dengan logo dan nama yang menempatkan
  Danantara, Rumah BUMN, serta BRI sebagai satu trio;
- logo event serta sembilan logo ecosystem dalam WebP teroptimasi;
- banner informasi program pada seluruh jalur pendaftaran;
- field Instagram mahasiswa dan konfirmasi wajib follow `@dekatlokal` serta
  `@edukasilokal`, tanpa upload bukti;
- privacy, terms, metadata, PWA, sitemap, robots, dan Open Graph.

Tanggal event dikonfirmasi pada 10 Agustus 2026, pukul 13.00 sampai 16.30 WITA,
di Balai Besar Pelatihan Komunikasi dan Digital Makassar (KOMDIGI). Target
program adalah 20 mahasiswa dan 5 UMKM, total 25 peserta. Alamat jalan tidak
ditambahkan karena belum diberikan.

Aset asli disimpan di `source-assets/`. Website hanya mereferensikan turunan
WebP pada `public/event-brand/` dan `public/logo-ecosystem/optimized/` agar
payload publik tetap ringan.

## Rute

Rute publik utama:

- `/`
- `/events`
- `/privacy`
- `/terms`
- `/ai-co-creation-lab-makassar`
- `/ai-co-creation-lab-makassar/register`
- `/ai-co-creation-lab-makassar/register/student`
- `/ai-co-creation-lab-makassar/register/umkm`
- `/ai-co-creation-lab-makassar/register/success`

Sebanyak 19 activity URL di
`/ai-co-creation-lab-makassar/journey/[activitySlug]` tetap dapat dibuka
melalui tautan langsung. Activity memakai `noindex` dan tidak ditampilkan pada
navbar, sitemap, index Journey, atau previous dan next UI.

Rute berikut mengembalikan 404:

- `/ai-co-creation-lab-makassar/journey`
- `/ai-co-creation-lab-makassar/challenges`
- `/ai-co-creation-lab-makassar/teams`
- `/ai-co-creation-lab-makassar/documentation`
- `/ai-co-creation-lab-makassar/impact`

## Database dan pendaftaran

- Schema tetap berada di `SUPABASE_SCHEMA.sql`.
- Seed event menyimpan target 25 partisipan: 20 mahasiswa dan 5 UMKM.
- Row event menjadi otoritas server untuk status buka atau tutup pendaftaran.
- RLS aktif dan public read maupun anonymous insert tidak tersedia.
- Mutation menggunakan Server Actions dan service role client server only.
- Input divalidasi, dipangkas, dinormalisasi, dan dibatasi dengan Zod.
- Username Instagram dinormalisasi dan disimpan di metadata JSONB.
- Konfirmasi follow diwajibkan di UI dan server, tanpa menyimpan upload bukti.
- WhatsApp serta email dinormalisasi; consent dan honeypot tetap berlaku.
- Turnstile didukung secara opsional.
- Payload PII tidak dicatat pada log, analytics, atau URL.

Live insert Supabase belum diuji karena credential production dan event row
belum disediakan. Tanpa environment tersebut, formulir tetap dapat ditinjau
dan tombol submit berada dalam state tertutup yang aman.

## Integritas konten

- Target program dibedakan dari capaian aktual.
- Event JSON LD memakai tanggal, waktu WITA, venue, dan kota yang dikonfirmasi.
- Alamat jalan, peserta aktual, testimonial, dan dampak aktual tidak dikarang.
- Logo ecosystem ditampilkan berdasarkan aset yang diberikan pemilik, dengan
  disclaimer bahwa daftar tersebut bukan daftar sponsor acara.
- Sponsorship tetap berupa ajakan `Your Brand` sampai sponsor aktif
  dikonfirmasi.

## Verifikasi

Pemeriksaan final:

```text
npm run lint                                      PASS
npm run typecheck                                 PASS
npm run build                                     PASS
npm run build:open-next                           PASS
npm audit --registry=https://registry.npmjs.org
  --omit=dev --audit-level=high                    PASS, 0 vulnerability
wrangler deploy --dry-run                         PASS
```

OpenNext menghasilkan worker self contained sebesar 8.359.314 byte. Pemeriksa
bundle memastikan tidak ada executable bare `require`, relative runtime
import, atau development file logger.

Browser QA menjalankan 145 assertion pada lebar 320, 375, 430, 768, 1024, dan
1440 piksel:

- tidak ada horizontal overflow;
- tidak ada console error, page error, hydration error, atau request gagal;
- dock, center CTA, bottom sheet, Escape, serta focus restore berfungsi;
- CTA mobile memakai natural width;
- detail tanggal, waktu, lokasi, biaya, dan kuota tersusun vertikal;
- 20 mahasiswa, 5 UMKM, dan total 25 tampil konsisten;
- sponsorship berada di atas ecosystem;
- sembilan logo tampil, trio BUMN berdekatan, dan rail bergerak ke kiri;
- Instagram dan konfirmasi follow wajib tersedia tanpa file upload;
- route utama 200, lima route tersembunyi 404, dan direct activity 200;
- manifest, service worker, offline fallback, serta ikon PWA tersedia;
- reduced motion menonaktifkan motion yang tidak diperlukan.

## Hal yang perlu diisi pemilik

- alamat jalan venue bila ingin ditampilkan;
- status pembukaan registrasi pada typed config dan row Supabase;
- credential Supabase production;
- sponsor aktif hanya setelah persetujuan;
- evidence dan status activity yang faktual;
- Turnstile keys bila proteksi bot diaktifkan;
- DNS untuk `event.dekatlokal.com`.

## Batasan MVP

MVP belum mencakup payment, marketplace tiket, akun peserta, organizer
dashboard, QR check in, sertifikat, form builder, atau multi tenant auth.
Pengelola membaca registrations melalui Supabase Dashboard.
