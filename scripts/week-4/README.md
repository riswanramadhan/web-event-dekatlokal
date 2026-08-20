# Week 4 asset generators

Generator untuk aset Week 4 yang berada di `public/downloads` dan `public/week-4`.
Skrip ini dijalankan manual ketika isinya berubah, bukan sebagai bagian dari
`npm run build`.

## Kebutuhan

`sharp` tersedia melalui stack Next.js. `pdfkit` dan `pptxgenjs` tercatat
sebagai dev dependency agar PDF dan PowerPoint dapat diregenerasi secara
reproducible dengan instalasi project biasa (`npm install`).

## Perintah

Jalankan dari root repository.

```bash
node scripts/week-4/build-playbook.js
```

Menulis `docs/playbook/AI_Co-Creation_Lab_Playbook_v1.0.md`,
`public/downloads/AI_Co-Creation_Lab_Playbook_v1.0.md`, dan
`public/downloads/AI_Co-Creation_Lab_Playbook_v1.0.pdf`. Isi playbook berada di
`playbook-content.js` sehingga versi Markdown dan PDF tidak dapat berbeda.

```bash
node scripts/week-4/build-deck.js
```

Menulis 16 slide `public/downloads/final-presentation/slide-NN.webp` untuk slide
viewer di halaman Final Presentation, lalu menyusun slide yang sama menjadi
`public/downloads/AI_Co-Creation_Lab_Final_Presentation_GEP_2026.pdf` berukuran
16:9 dan
`public/downloads/AI_Co-Creation_Lab_Final_Presentation_GEP_2026.pptx`.
PowerPoint memakai satu gambar full-bleed per slide untuk menjaga fidelity
visual; berkas valid dan dapat dipresentasikan, tetapi teks di dalam slide
tidak diedit sebagai shape terpisah.

```bash
node scripts/week-4/sanitize-csv.js
```

Membaca `docs/week-4-assessment/nilai-pre-post-test-2026-08-10.csv` yang memuat
nama peserta, lalu menulis `public/week-4/AI_CoCreation_Lab_PrePost_Public_Evidence.csv`
dengan kode peserta `P01` sampai `P20`. Berkas bernama sengaja disimpan di luar
`public/` agar tidak dapat diakses publik. Source bernama tersebut harus
dipulihkan sebelum skrip dijalankan ulang. File publik tidak memuat klasifikasi
subgroup karena koreksi roster technical core tidak dapat dihitung ulang hanya
dari data anonim.

## Aset final yang tidak dibuat generator

`AI_Co-Creation_Lab_Playbook_Refined.pdf` di root adalah source final 39
halaman. Salinan byte-for-byte yang dipakai website berada di
`public/downloads/AI_Co-Creation_Lab_Playbook_Refined.pdf`. Generator playbook
v1.0 tetap dipertahankan sebagai sumber historis dan tidak boleh menimpa refined
edition.

PDF Project Monitoring dan Impact Report berada di `public/week-4/` dan dibuat
dari print view dua halaman report setelah konten final lolos validasi. Keduanya
bukan output dari `build-deck.js`.

## Catatan

Angka full cohort pada halaman Week 4 berasal dari
`src/data/gep-week-4-assessment.ts` dan harus cocok dengan evidence publik.
Jangan mengembalikan agregat core vs non-core sampai source bernama tersedia
dan klasifikasi Andi Alfian Rusani (core Team 4) serta Achmad Alfian Saputra
(non-core Team 2) dapat dihitung ulang secara authoritative.
