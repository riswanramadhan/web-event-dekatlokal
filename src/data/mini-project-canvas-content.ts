export type MiniProjectTimelineItem = {
  period: string;
  phase: string;
  activities: string;
  output: string;
  status: "completed" | "in_progress" | "planned" | "scheduled";
};

export const miniProjectTimeline: MiniProjectTimelineItem[] = [
  {
    period: "25-31 Juli 2026",
    phase: "Discover & Project Design",
    activities:
      "Leadership Network Mapping, identifikasi masalah sosial, Mini Project Canvas, proposal sponsorship, dan pengembangan website event.",
    output:
      "Network mapping, dokumen identifikasi isu, canvas, proposal, dan website.",
    status: "in_progress",
  },
  {
    period: "1-9 Agustus 2026",
    phase: "Sponsorship & Resource Mobilization",
    activities:
      "Open sponsorship, pencarian sponsor, pengiriman proposal khusus, follow-up, negosiasi, finalisasi dukungan, pengumpulan logo, dan koordinasi produksi.",
    output:
      "Komitmen sponsor, dukungan dana/produk/jasa, brand assets, dan production plan.",
    status: "planned",
  },
  {
    period: "1-3 Agustus 2026",
    phase: "Problem Validation & Partnership",
    activities:
      "Wawancara UMKM dan stakeholder, validasi kebutuhan digital, konfirmasi venue, pemateri, partner, serta bentuk kontribusi.",
    output:
      "Hasil wawancara, masalah tervalidasi, daftar kebutuhan UMKM, dan komitmen mitra.",
    status: "planned",
  },
  {
    period: "3-7 Agustus 2026",
    phase: "Open Recruitment",
    activities:
      "Oprec mahasiswa dan UMKM melalui event.dekatlokal.com, kurasi pendaftar, pengecekan kemampuan/perangkat, dan konfirmasi komitmen.",
    output: "20 mahasiswa dan 5 UMKM terpilih.",
    status: "planned",
  },
  {
    period: "8-9 Agustus 2026",
    phase: "Team Matching & Solution Planning",
    activities:
      "Membentuk lima tim, mencocokkan kemampuan mahasiswa dengan kebutuhan UMKM, menyusun problem statement, requirement, prioritas fitur, dan starter kit.",
    output:
      "5 tim, 5 problem statement, 5 system requirement brief, dan starter kit.",
    status: "planned",
  },
  {
    period: "10 Agustus 2026",
    phase: "Main Implementation",
    activities:
      "Bootcamp, final problem framing, co-creation, AI-assisted development, testing bersama UMKM, demo, dan handover awal.",
    output: "5 prototype sistem digital dan hasil testing awal.",
    status: "scheduled",
  },
  {
    period: "11-13 Agustus 2026",
    phase: "Refinement & Final Handover",
    activities:
      "Memperbaiki sistem berdasarkan feedback, menyelesaikan fungsi prioritas, menyiapkan panduan dan video tutorial.",
    output:
      "Sistem revisi, 5 panduan, 5 video tutorial, dan final handover.",
    status: "planned",
  },
  {
    period: "13-17 Agustus 2026",
    phase: "Monitoring",
    activities:
      "Monitoring H+3 dan H+7, pengecekan penggunaan, identifikasi kendala, dan pendampingan ringan.",
    output: "Catatan penggunaan, feedback UMKM, dan temuan monitoring.",
    status: "planned",
  },
  {
    period: "18-21 Agustus 2026",
    phase: "Impact Measurement",
    activities:
      "Mengolah assessment, memeriksa ketercapaian output, mengumpulkan testimoni, dokumentasi, dan capaian indikator.",
    output:
      "Data dampak, testimoni, dokumentasi, dan impact findings.",
    status: "planned",
  },
  {
    period: "22-25 Agustus 2026",
    phase: "Reflection & Sustainability",
    activities:
      "Leadership reflection, sustainability plan, impact report, showcase sistem, dan final presentation GEP.",
    output:
      "Reflection, sustainability plan, impact report, dan final presentation.",
    status: "planned",
  },
];

export const updatedMiniProjectProgressDescription =
  "Mini Project Canvas AI Co-Creation Lab Makassar telah disusun dengan memuat problem, solusi, stakeholder dan partnership, output, outcome, indikator dampak, risiko, sustainability plan, serta timeline pelaksanaan pada periode 25 Juli-25 Agustus 2026. Timeline mencakup tahap discovery dan project design, open sponsorship serta mobilisasi sumber daya pada 1-9 Agustus, problem validation dan partnership pada 1-3 Agustus, open recruitment mahasiswa dan UMKM pada 3-7 Agustus, team matching dan solution planning pada 8-9 Agustus, pelaksanaan utama pada 10 Agustus, refinement dan handover, monitoring H+3 dan H+7, impact measurement, leadership reflection, sustainability plan, serta final presentation. Project dirancang untuk mempertemukan 20 mahasiswa dan 5 UMKM dalam lima tim yang mengembangkan lima prototype sistem digital melalui AI-assisted development.";

export const miniProjectCanvasPdf = {
  href: "/downloads/AI-Co-Creation-Lab-Mini-Project-Canvas.pdf",
  label: "Unduh Mini Project Canvas (PDF)",
};
