# Panduan Mengubah Konten

Konten publik DekatLokal Event disimpan di typed TypeScript config. Supabase tidak berfungsi sebagai CMS pada MVP ini; Supabase hanya menyimpan pendaftaran.

## Sumber konten

Gunakan file di `src/data` sebagai single source of truth:

| File | Tanggung jawab |
|---|---|
| `platform.ts` | Export `platform`: identitas DekatLokal Event, navigasi, kontak, dan tautan utama. |
| `events.ts` | Export `aiCoCreationLabEvent`: detail event, status, tanggal/lokasi, target, manfaat, alur, rundown, dan partner. |
| `faqs.ts` | FAQ platform dan event. |
| `gep-journey.ts` | Export `journeyActivities`: Week 1–4, activity slug, status, progress, output, evidence, insight, dan waktu pembaruan. |
| `challenges.ts` | Empat challenge slot dan contoh masalah/solusi. |
| `teams.ts` | Empat team slot, peran, challenge partner, dan status solusi. |
| `documentation.ts` | Item dokumentasi, kategori, caption, dan link publikasi/Drive. |
| `impact.ts` | Export `impactMetrics`, measurement plan, dan testimoni. |

Pertahankan prinsip satu sumber data; jangan menduplikasi copy utama ke page component.

## Alur perubahan

1. Temukan object yang relevan di `src/data`.
2. Ubah nilai data, bukan markup pada page, jika perubahan hanya menyangkut konten.
3. Pertahankan tipe dan enum yang sudah tersedia.
4. Jalankan:

   ```bash
   npm run lint
   npm run typecheck
   npm run build
   ```

5. Tinjau halaman terkait pada mobile dan desktop.
6. Pastikan tautan internal, evidence, canonical, dan CTA tetap benar.

Dokumen ini tidak menyatakan hasil perintah verifikasi tersebut.

## Tanggal, lokasi, dan status event

- Jangan mengisi tanggal atau venue berdasarkan perkiraan.
- Gunakan nilai kosong/null dan label `Belum Dikonfirmasi` sampai ada keputusan final.
- Gunakan format waktu dengan zona yang eksplisit, misalnya WITA.
- Event JSON-LD hanya boleh aktif setelah tanggal mulai, tanggal selesai, dan lokasi valid.
- Jika pendaftaran dibuka atau ditutup, sinkronkan typed config dengan row `public.events`; lihat [`setup-supabase.md`](setup-supabase.md).

Di `aiCoCreationLabEvent`, perbarui seluruh field presentasi yang saling terkait: `status`, `statusLabel`, `registrationOpen`, `registrationStatus`, `registrationStatusLabel`, dan `registrationRoles[].enabled`. Field tersebut mengatur tampilan publik. Row `public.events` tetap menjadi otoritas mutation server dan mensyaratkan `registration_open = true` serta `status = 'registration_open'`.

Sebelum mengubah status menjadi terbuka, periksa:

- tanggal/periode dan ketentuan aplikasi;
- privacy notice;
- kontak resmi;
- kesiapan Supabase;
- status `registration_open` di database.

## Partner dan logo

Label partner yang diperbolehkan:

- `Diinisiasi oleh`
- `Didukung oleh`
- `Mitra tempat`
- `Challenge partner`
- `Knowledge partner`

Aturan:

- DekatLokal dapat ditampilkan sebagai inisiator.
- Organisasi lain tetap `Dalam Proses Konfirmasi` atau `Belum Dikonfirmasi` sampai disetujui.
- Set `approved: true` hanya setelah ada persetujuan yang dapat dipertanggungjawabkan.
- Tambahkan logo hanya jika penggunaan aset sudah diizinkan.
- Jangan menyatakan sponsorship atau dukungan hanya karena organisasi disebut dalam konteks program atau network mapping.

Export `approvedEventPartners` diturunkan dari `partners[].approved`. Partner yang belum disetujui boleh tampil hanya sebagai status/placeholder yang jujur, bukan dalam daftar logo partner aktif.

## Journey GEP

Setiap aktivitas harus mempertahankan slug yang stabil karena URL dapat dipakai sebagai evidence di luar situs.

Index Journey tidak dibuka sebagai halaman publik. URL aktivitas hanya dibagikan
secara langsung kepada audiens yang memerlukannya, tidak dimasukkan ke navbar
atau sitemap, dan memakai metadata `noindex`. Jangan menambahkan kembali
previous/next navigation atau tautan ke index tanpa keputusan produk baru.

Status yang tersedia:

```text
planned
in_progress
completed
published
```

Panduan pembaruan:

- `planned`: aktivitas dan output masih rencana.
- `in_progress`: pekerjaan sudah dimulai, tetapi belum selesai.
- `completed`: output selesai secara internal.
- `published`: output dan evidence yang aman sudah dapat diakses reviewer.

Jangan menaikkan status hanya karena deskripsi awal sudah ditulis. Saat memperbarui aktivitas:

- tulis progress description faktual;
- pisahkan rencana, proses, dan hasil;
- tambahkan `updatedAt` hanya dengan tanggal pembaruan nyata;
- tambahkan evidence hanya jika link dapat diakses audiens yang dituju;
- gunakan label evidence yang menjelaskan isi;
- jangan menaruh PII atau dokumen privat pada link publik;
- biarkan evidence kosong agar empty state tampil jika bukti belum tersedia.

Jangan mengganti slug setelah URL dibagikan. Jika perubahan tidak dapat dihindari, siapkan redirect dan perbarui semua pranala eksternal.

## Challenge dan tim

Sebelum UMKM serta peserta final:

- pertahankan empat slot sebagai placeholder;
- gunakan `Dalam Proses Validasi` untuk challenge;
- gunakan nama tim sementara yang netral;
- tampilkan komposisi peran, bukan identitas pribadi;
- jangan mengklaim prototype atau solusi selesai;
- jangan menampilkan nama usaha, email, WhatsApp, atau data pendaftaran.

Contoh challenge harus tetap diberi label sebagai contoh, bukan assignment final.

## Dokumentasi

Tambahkan item hanya untuk aset yang benar-benar tersedia dan boleh dipublikasikan.

Setiap item sebaiknya memiliki:

- kategori;
- caption faktual;
- alt text yang bermakna;
- link atau path aset;
- status publikasi bila tersedia.

Kategori awal: audiensi, persiapan, implementasi, demo, dan monitoring. Jangan mengganti empty state dengan foto stok yang dapat dianggap sebagai dokumentasi kegiatan.

Pastikan consent dokumentasi telah diperoleh sebelum menampilkan wajah atau identitas peserta. Jangan memakai folder UI referensi sebagai sumber foto kegiatan.

## Impact

Target dan actual adalah dua data berbeda:

```ts
{
  label: "Mahasiswa terlibat",
  target: 16,
  actual: null,
  unit: "orang",
  status: "not_measured",
}
```

Aturan:

- `target` boleh berisi sasaran program yang sudah disetujui.
- `actual` tetap `null` sampai ada pengukuran.
- Nilai `null` ditampilkan sebagai `Belum Diukur` atau label kosong yang setara.
- Jangan menyamakan target dengan actual.
- Jangan menghitung achievement rate ketika actual belum tersedia.
- Cantumkan metode dan waktu pengukuran untuk data aktual.
- Testimoni tetap placeholder sampai ada kutipan yang disetujui.

Indikator dapat diperbarui setelah pre/post assessment, pengujian solusi, monitoring H+3/H+7, atau sumber evidence lain benar-benar tersedia.

## Kontak, privacy, dan legal

- Ganti placeholder kontak hanya dengan kanal resmi.
- Pastikan permintaan koreksi/penghapusan data memiliki jalur kontak yang dapat digunakan.
- Jangan menambahkan klaim hukum yang berlebihan.
- Jangan memasukkan data peserta atau pelanggan UMKM ke typed config.
- Jangan menaruh PII di URL, metadata SEO, analytics, atau halaman publik.

## Checklist editorial

- [ ] Fakta final memiliki sumber/persetujuan.
- [ ] Target dibedakan dari capaian aktual.
- [ ] Tanggal dan lokasi tidak diperkirakan.
- [ ] Partner dan logo sudah disetujui.
- [ ] Evidence dapat diakses dan aman dipublikasikan.
- [ ] Tidak ada PII.
- [ ] Alt text dan label link bermakna.
- [ ] Slug publik tetap stabil.
- [ ] Status database dan status CTA pendaftaran selaras.
- [ ] Lint, typecheck, dan build dijalankan sebelum rilis.
