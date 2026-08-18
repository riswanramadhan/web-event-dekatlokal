# Week 4 asset generators

Generator untuk aset Week 4 yang berada di `public/downloads` dan `public/week-4`.
Skrip ini dijalankan manual ketika isinya berubah, bukan sebagai bagian dari
`npm run build`.

## Kebutuhan

`sharp` sudah tersedia sebagai dependensi transitif Next.js. `pdfkit` tidak
dipasang di project ini karena hanya dibutuhkan saat membuat ulang berkas PDF:

```bash
npm install --no-save pdfkit
```

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
16:9.

```bash
node scripts/week-4/sanitize-csv.js
```

Membaca `docs/week-4-assessment/nilai-pre-post-test-2026-08-10.csv` yang memuat
nama peserta, lalu menulis `public/week-4/AI_CoCreation_Lab_PrePost_Public_Evidence.csv`
dengan kode peserta `P01` sampai `P20`. Berkas bernama sengaja disimpan di luar
`public/` agar tidak dapat diakses publik.

## Catatan

Angka pada halaman Week 4 berasal dari `src/data/gep-week-4-assessment.ts` dan
harus cocok dengan CSV sumber. Bila CSV diperbarui, hitung ulang rata-ratanya
sebelum mengubah angka pada file data.
