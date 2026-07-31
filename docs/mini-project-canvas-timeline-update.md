# Update Timeline Mini Project Canvas

## Route

Timeline ditampilkan pada report existing:

`/ai-co-creation-lab-makassar/progress/mini-project-canvas`

Pembaruan ini mengubah bagian Timeline dari ringkasan enam fase menjadi sepuluh
workstream project selama 25 Juli-25 Agustus 2026.

## Data source

Sumber paket:

- `new-report/REPORT_03_TIMELINE_UPDATE.md`;
- `new-report/mini-project-canvas-content.ts`;
- `new-report/REPORT_03_MINI_PROJECT_CANVAS.md`.

Nilai runtime harus berasal dari typed data production yang merepresentasikan
`mini-project-canvas-content.ts`. Komponen presentasi tidak boleh menyimpan
duplikat period, phase, activities, output, atau progress description.

Setiap item memiliki bentuk:

```ts
type MiniProjectTimelineItem = {
  period: string;
  phase: string;
  activities: string;
  output: string;
  status: "completed" | "in_progress" | "planned" | "scheduled";
};
```

## Timeline lengkap

| Periode | Tahap | Aktivitas utama | Output | Status |
|---|---|---|---|---|
| 25-31 Juli 2026 | Discover & Project Design | Leadership Network Mapping, identifikasi masalah sosial, Mini Project Canvas, proposal sponsorship, dan pengembangan website event. | Network mapping, dokumen identifikasi isu, canvas, proposal, dan website. | In Progress |
| 1-9 Agustus 2026 | Sponsorship & Resource Mobilization | Open sponsorship, pencarian sponsor, pengiriman proposal khusus, follow-up, negosiasi, finalisasi dukungan, pengumpulan logo, dan koordinasi produksi. | Komitmen sponsor, dukungan dana/produk/jasa, brand assets, dan production plan. | Planned |
| 1-3 Agustus 2026 | Problem Validation & Partnership | Wawancara UMKM dan stakeholder, validasi kebutuhan digital, konfirmasi venue, pemateri, partner, serta bentuk kontribusi. | Hasil wawancara, masalah tervalidasi, daftar kebutuhan UMKM, dan komitmen mitra. | Planned |
| 3-7 Agustus 2026 | Open Recruitment | Oprec mahasiswa dan UMKM melalui event.dekatlokal.com, kurasi pendaftar, pengecekan kemampuan/perangkat, dan konfirmasi komitmen. | 20 mahasiswa dan 5 UMKM terpilih. | Planned |
| 8-9 Agustus 2026 | Team Matching & Solution Planning | Membentuk lima tim, mencocokkan kemampuan mahasiswa dengan kebutuhan UMKM, menyusun problem statement, requirement, prioritas fitur, dan starter kit. | 5 tim, 5 problem statement, 5 system requirement brief, dan starter kit. | Planned |
| 10 Agustus 2026 | Main Implementation | Bootcamp, final problem framing, co-creation, AI-assisted development, testing bersama UMKM, demo, dan handover awal. | 5 prototype sistem digital dan hasil testing awal. | Scheduled |
| 11-13 Agustus 2026 | Refinement & Final Handover | Memperbaiki sistem berdasarkan feedback, menyelesaikan fungsi prioritas, menyiapkan panduan dan video tutorial. | Sistem revisi, 5 panduan, 5 video tutorial, dan final handover. | Planned |
| 13-17 Agustus 2026 | Monitoring | Monitoring H+3 dan H+7, pengecekan penggunaan, identifikasi kendala, dan pendampingan ringan. | Catatan penggunaan, feedback UMKM, dan temuan monitoring. | Planned |
| 18-21 Agustus 2026 | Impact Measurement | Mengolah assessment, memeriksa ketercapaian output, mengumpulkan testimoni, dokumentasi, dan capaian indikator. | Data dampak, testimoni, dokumentasi, dan impact findings. | Planned |
| 22-25 Agustus 2026 | Reflection & Sustainability | Leadership reflection, sustainability plan, impact report, showcase sistem, dan final presentation GEP. | Reflection, sustainability plan, impact report, dan final presentation. | Planned |

Status tersebut adalah status awal per 30 Juli 2026. Output pada fase mendatang
tetap merupakan target, bukan bukti capaian aktual.

## Progress description

Gunakan teks berikut secara persis:

> Mini Project Canvas AI Co-Creation Lab Makassar telah disusun dengan memuat problem, solusi, stakeholder dan partnership, output, outcome, indikator dampak, risiko, sustainability plan, serta timeline pelaksanaan pada periode 25 Juli-25 Agustus 2026. Timeline mencakup tahap discovery dan project design, open sponsorship serta mobilisasi sumber daya pada 1-9 Agustus, problem validation dan partnership pada 1-3 Agustus, open recruitment mahasiswa dan UMKM pada 3-7 Agustus, team matching dan solution planning pada 8-9 Agustus, pelaksanaan utama pada 10 Agustus, refinement dan handover, monitoring H+3 dan H+7, impact measurement, leadership reflection, sustainability plan, serta final presentation. Project dirancang untuk mempertemukan 20 mahasiswa dan 5 UMKM dalam lima tim yang mengembangkan lima prototype sistem digital melalui AI-assisted development.

## Perilaku visual

Desktop menampilkan:

- section header;
- overview/phase rail menyerupai Gantt yang ringkas;
- sponsorship 1-9 Agustus sebagai workstream overlap tersendiri;
- card period, phase, activities, output, dan status.

Mobile menampilkan:

- timeline vertikal;
- date pill;
- phase title;
- activities dan output;
- status badge;
- tidak ada horizontal overflow.

Status badge menggunakan label `In Progress`, `Planned`, `Scheduled`, dan
`Completed` bila status tersebut digunakan kemudian. Warna badge tidak boleh
menjadi satu-satunya cara menyampaikan status.

## PDF download

Kontrak production:

```ts
const miniProjectCanvasPdf = {
  href: "/downloads/AI-Co-Creation-Lab-Mini-Project-Canvas.pdf",
  label: "Unduh Mini Project Canvas (PDF)",
};
```

Target filesystem:

`public/downloads/AI-Co-Creation-Lab-Mini-Project-Canvas.pdf`

Gunakan anchor biasa:

```tsx
<a
  href="/downloads/AI-Co-Creation-Lab-Mini-Project-Canvas.pdf"
  download
>
  Unduh Mini Project Canvas (PDF)
</a>
```

Anchor diletakkan pada action group header atau setelah ringkasan canvas,
memakai icon download existing, visible focus, dan `aria-label` yang jelas.
Jangan memberi label PowerPoint. Tracking
`download_mini_project_canvas_pdf` opsional dan tidak boleh menyertakan PII.

### Mismatch aset yang dikirim

`new-report/AI_Co-Creation_Lab.pdf` bukan PDF yang diminta. Hasil audit:

- 14 halaman landscape, bukan 7;
- seluruh halaman berupa image;
- konten adalah laporan Identifikasi Masalah Sosial;
- metadata PDF kosong;
- SHA-256:
  `1C6330366EAB962E9E41950CF50C3E8F0B033B5237927C96BB8EB798FFD5B857`.

Berkas tersebut tidak di-rename menjadi Mini Project Canvas. Replacement telah
dihasilkan dan diverifikasi dari konten Report 3 terkunci dengan tepat tujuh
halaman:

1. Cover;
2. Problem;
3. Solution;
4. Stakeholder & Partnership;
5. Output;
6. Outcome;
7. Timeline.

Replacement final tersedia di
`public/downloads/AI-Co-Creation-Lab-Mini-Project-Canvas.pdf`, berukuran
600.925 byte, dan memiliki SHA-256
`BACE324C4E34C4BC756990B186AF7CF495751451D7AF31A8DB40CB157F820A3B`.

### Mengganti PDF pada masa depan

1. Siapkan PDF landscape yang telah disetujui.
2. Pastikan isinya Mini Project Canvas dan tepat tujuh halaman.
3. Gunakan nama persis
   `AI-Co-Creation-Lab-Mini-Project-Canvas.pdf`.
4. Ganti file pada `public/downloads` tanpa mengubah URL publik.
5. Buka URL publik langsung dan pastikan status 200 serta content type PDF.
6. Unduh melalui button, buka file, dan verifikasi tujuh halaman.
7. Perbarui ukuran file pada UI/dokumentasi jika ukuran ditampilkan.

Jangan meninggalkan button aktif bila target tidak ada, salah isi, rusak, atau
menghasilkan 404.

## Content integrity

Timeline dan PDF harus mempertahankan:

- 20 mahasiswa;
- 5 UMKM;
- 5 tim;
- 5 prototype;
- Senin, 10 Agustus 2026;
- 13.00-16.30 WITA;
- Balai Besar Pelatihan Komunikasi dan Digital Makassar.

Jangan menambahkan sponsor, evidence, testimonial, atau capaian impact yang
belum tersedia.

## Validasi setelah perubahan

Jalankan:

```text
npm run lint
npm run typecheck
npm run build
```

Kemudian uji route pada 360 px, mobile umum, tablet, dan desktop; bandingkan
sepuluh data item terhadap source; periksa progress description; pastikan
overlap sponsorship terlihat; verifikasi keyboard/focus button; dan validasi
PDF target secara nyata.
