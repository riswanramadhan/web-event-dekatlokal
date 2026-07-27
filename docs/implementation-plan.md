# Rencana Implementasi DekatLokal Event MVP

## 1. Hasil audit

- Repository belum memiliki aplikasi produksi, `package.json`, lockfile, atau histori Git.
- Materi awal terdiri dari PRD, content map, acceptance checklist, schema Supabase, environment template, dan UI DekatLokal yang sudah terisolasi di `referensi-ui-dekatlokal`.
- UI referensi bersifat parsial dan tidak dapat dijalankan mandiri. Production source tidak akan mengimpor modul apa pun darinya.
- Tidak ada tanggal, lokasi, partner, peserta, evidence, atau actual impact yang sudah final. Semua bagian tersebut akan memakai status jujur.
- Schema Supabase sudah menegakkan RLS, menutup akses `anon`/`authenticated`, dan menyediakan unique indexes untuk pencegahan duplikasi.

## 2. Arsitektur yang dipilih

- Next.js App Router di bawah `src/`.
- React Server Components sebagai default.
- Tailwind CSS v4 untuk sistem visual.
- Server Actions untuk registration mutation.
- Zod untuk normalisasi dan validasi seluruh input.
- Supabase service-role client yang hanya dapat diimpor oleh server.
- Content publik bertipe TypeScript di `src/data`.
- npm dipilih karena tidak ada lockfile/package manager sebelumnya.

## 3. Tahapan

1. Membuat fondasi project, canonical env/agent files, lint, dan strict typecheck.
2. Menulis design tokens, layout global, header, footer, buttons, cards, status, dan empty states.
3. Menulis single source of truth untuk platform, event, FAQ, challenges, teams, journey, dan impact.
4. Membangun homepage platform, event directory, dan landing event lengkap.
5. Membangun registration hub, dua form accessible, validasi client/server, Supabase mutation, duplicate handling, dan success flow.
6. Membangun journey Week 1–4, activity URL, copy feedback, evidence state, dan prev/next navigation.
7. Membangun challenges, teams, documentation, impact, privacy, terms, errors, loading, sitemap, robots, dan Open Graph.
8. Memverifikasi lint, typecheck, build, missing-env behavior, route coverage, dan responsive layout.
9. Menulis dokumentasi setup, content editing, deployment, audit visual, dan implementation summary.
10. Mendorong source tervalidasi, menyimpan version Sites, lalu deploy ke production.

## 4. Keputusan integritas data

- Kuota 20 mahasiswa dan 5 UMKM selalu dibedakan dari jumlah hadir aktual; target tim/solusi juga tidak boleh dipresentasikan sebagai capaian.
- Tanggal dan lokasi tetap `Belum Dikonfirmasi`.
- Partner selain DekatLokal tidak ditampilkan sebagai partner aktif tanpa `approved: true`.
- Nama peserta dan UMKM tidak ditampilkan.
- Evidence dan dokumentasi kosong tidak diganti dengan bukti fiktif.
- Event JSON-LD hanya dirender jika tanggal dan lokasi sudah valid.

## 5. Verifikasi

- Otomatis: `npm run lint`, `npm run typecheck`, `npm run build`.
- Manual: seluruh route wajib, keyboard/form state, duplicate error mapping, invalid journey slug, viewport mobile/tablet/desktop, missing Supabase env, serta internal links.
- Live Supabase insert hanya dapat diuji ketika credential dan event row production tersedia.
