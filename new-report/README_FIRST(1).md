# GEP Week 1 — Unlisted Progress Report Pack

Paket ini digunakan untuk menambahkan tiga halaman laporan GEP Week 1 pada website `event.dekatlokal.com`.

## Tiga laporan

1. Leadership Network Mapping
2. Identifikasi Masalah Sosial
3. Mini Project Canvas

## Tujuan

- Setiap laporan memiliki URL sendiri.
- Halaman dapat dibuka melalui direct link.
- Halaman tidak muncul pada navbar, event navigation, daftar event, journey publik, atau sitemap.
- Halaman diberi metadata `noindex, nofollow`.
- Isi laporan harus sama dengan file Markdown dalam paket ini.
- Codex tidak boleh meringkas, memparafrasekan, atau menambah klaim baru.

## Cara menggunakan

1. Ekstrak paket ke root repository `event.dekatlokal.com`.
2. Buka Codex dari root repository.
3. Berikan isi `CODEX_ONE_SHOT_PROMPT.md`.
4. Codex wajib membaca semua file dalam paket sebelum mengubah kode.
5. File Markdown laporan menjadi sumber konten resmi.
6. Setelah implementasi, pastikan lint, typecheck, dan build berhasil.

## URL target

```text
/ai-co-creation-lab-makassar/progress/leadership-network-mapping
/ai-co-creation-lab-makassar/progress/identifikasi-masalah-sosial
/ai-co-creation-lab-makassar/progress/mini-project-canvas
```

## Catatan keamanan

Halaman `unlisted` bukan halaman privat. Siapa pun yang menerima URL tetap dapat membuka dan membagikannya. Karena laporan tidak memuat data pribadi atau rahasia, pendekatan ini sesuai untuk progress report GEP.
