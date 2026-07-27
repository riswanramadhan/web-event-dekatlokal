# Ringkasan Implementasi DekatEvent. MVP

Tanggal verifikasi: 27 Juli 2026  
Event utama: AI Co-Creation Lab Makassar  
Domain target: `event.dekatlokal.com`

## Hasil

DekatEvent. dibangun dengan Next.js App Router, React, dan TypeScript strict.
Revisi terakhir memusatkan pengalaman pada informasi event dan pendaftaran:

- navbar floating white-glass yang mobile-first;
- landing event ringkas dengan hero tepat satu viewport desktop;
- foto representatif mahasiswa dan pelaku UMKM Indonesia dalam co-creation;
- pendaftaran mahasiswa dan UMKM melalui Server Actions;
- activity GEP Week 1–4 yang hanya dapat dibuka melalui URL langsung;
- privacy, terms, metadata, sitemap, robots, dan Open Graph.

Tanggal event dikonfirmasi pada 10 Agustus 2026, pukul 13.00–16.30 WITA, di
Balai Besar Pelatihan Komunikasi dan Digital Makassar (KOMDIGI). Kuota
bootcamp adalah 20 mahasiswa dan 5 UMKM. Alamat jalan tidak ditambahkan karena
belum diberikan.

Motion memakai AOS dan Framer Motion. Status persiapan berkedip, CTA memiliki
sheen animation berulang saat hover/focus, dan seluruh animasi menghormati
`prefers-reduced-motion`.

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
`/ai-co-creation-lab-makassar/journey/[activitySlug]` dibangun statis tetapi
tidak ditampilkan di navbar, sitemap, index Journey, atau previous/next UI.
Activity memakai `noindex` dan hanya dibuka melalui tautan langsung.

Route berikut sudah dihapus dari source production dan mengembalikan 404:

- `/ai-co-creation-lab-makassar/journey`
- `/ai-co-creation-lab-makassar/challenges`
- `/ai-co-creation-lab-makassar/teams`
- `/ai-co-creation-lab-makassar/documentation`
- `/ai-co-creation-lab-makassar/impact`

## Database dan pendaftaran

- Schema berada di `SUPABASE_SCHEMA.sql`.
- Seed event menyimpan target 25 partisipan: 20 mahasiswa dan 5 UMKM.
- Row event menjadi otoritas server untuk status buka/tutup pendaftaran.
- Registrasi mahasiswa dan UMKM memiliki unique index untuk mencegah duplikasi.
- RLS aktif; role `anon` dan `authenticated` tidak dapat membaca atau menulis
  registrations.
- Mutation menggunakan Server Actions dan service-role client server-only.
- Input divalidasi dengan Zod, dipangkas, dinormalisasi, dan dibatasi.
- WhatsApp/email dinormalisasi; consent dan honeypot diwajibkan.
- Turnstile didukung secara opsional.
- Kode pendaftaran dibuat secara kriptografis tanpa PII.

Live insert Supabase belum diuji karena credential production dan event row
belum disediakan. Tanpa environment tersebut, situs tetap render dan
pendaftaran tetap berada dalam state tertutup yang aman.

## Keamanan dan integritas konten

- `SUPABASE_SERVICE_ROLE_KEY` tidak masuk bundle browser.
- Tidak ada anonymous insert atau public read registrations.
- Payload pendaftaran tidak dicatat ke log, analytics, atau URL.
- Halaman success hanya menerima kode tervalidasi.
- Event JSON-LD memakai tanggal, waktu WITA, nama venue, dan kota yang sudah
  dikonfirmasi tanpa mengarang alamat jalan.
- Partner dan logo pihak ketiga tidak ditampilkan sebagai partner aktif tanpa
  `approved: true`.
- Visual hero diberi disclosure sebagai gambar representatif, bukan dokumentasi
  pelaksanaan.
- Target program selalu dibedakan dari capaian aktual.

## Verifikasi

Seluruh pemeriksaan berikut lulus pada 27 Juli 2026:

```text
npm run lint              PASS — tanpa warning/error
npm run typecheck         PASS
npm run build             PASS — 36 halaman dihasilkan
npm run build:open-next   PASS — .open-next/worker.js dihasilkan
npm audit --omit=dev      PASS — 0 production vulnerabilities
wrangler deploy --dry-run PASS — bundle 2.37 MiB gzip
```

Smoke test production memeriksa 21 route dan seluruh assertion lulus, termasuk:

- lima route tersembunyi mengembalikan 404;
- activity valid 200 dan slug tidak valid 404;
- activity tidak memiliki arah ke index/previous/next;
- sitemap dan robots tidak mengekspos activity;
- Event JSON-LD memiliki start/end time dan venue;
- state missing Supabase environment tertangani;
- kode submission valid terlihat;
- service-role value tidak muncul pada HTML.

Visual QA menggunakan mobile `390 × 844` dan desktop `1440 × 900`. Hasilnya:

- tidak ada horizontal overflow atau console error;
- navbar glass, brand, menu mobile, dan touch target tampil benar;
- menu mobile berada di dalam viewport;
- foto hero termuat;
- hero event desktop berakhir tepat pada batas viewport;
- tidak ada link UI menuju halaman tersembunyi.

## Hal yang perlu diisi pemilik

- alamat jalan venue bila ingin ditampilkan;
- status pembukaan registrasi pada typed config dan row Supabase;
- credential Supabase production;
- partner/logo yang sudah disetujui;
- tautan activity Week 1–4 yang akan dibagikan ke audiens terkait;
- evidence dan status activity yang faktual;
- Turnstile keys bila proteksi bot diaktifkan;
- DNS untuk `event.dekatlokal.com`.

## Batasan MVP

MVP belum mencakup payment, marketplace tiket, akun peserta, organizer
dashboard, QR check-in, sertifikat, form builder, atau multi-tenant auth.
Pengelola membaca registrations melalui Supabase Dashboard.

Audit lengkap yang menyertakan development tooling masih melaporkan advisory
transitive pada rantai ESLint/OpenNext. Dependency produksi aplikasi bersih;
perbaikan otomatis npm meminta major upgrade yang belum kompatibel dan tidak
diterapkan secara paksa.
