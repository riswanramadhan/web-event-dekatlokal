export type ImpactStatus =
  | "not_measured"
  | "collecting"
  | "measured"
  | "published";

export type ImpactCategory =
  | "participation"
  | "solution"
  | "learning"
  | "adoption"
  | "network"
  | "story";

export interface ImpactMetric {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly category: ImpactCategory;
  readonly target: number | null;
  readonly actual: number | null;
  readonly unit: string;
  readonly status: ImpactStatus;
  readonly statusLabel: string;
  readonly measurementMethod: string;
  readonly measuredAt: string | null;
}

export interface ImpactMeasurementStep {
  readonly id: string;
  readonly title: string;
  readonly timing: string;
  readonly method: string;
  readonly indicators: readonly string[];
  readonly status: ImpactStatus;
  readonly statusLabel: string;
}

export interface Testimonial {
  readonly id: string;
  readonly quote: string;
  readonly attribution: string;
  readonly consentConfirmed: true;
}

export const impactMetrics = [
  {
    id: "students-involved",
    label: "Mahasiswa terlibat",
    description: "Jumlah mahasiswa yang hadir dan mengikuti kegiatan.",
    category: "participation",
    target: 20,
    actual: 20,
    unit: "orang",
    status: "measured",
    statusLabel: "Aktual Kegiatan",
    measurementMethod: "Rekap pelaksanaan kegiatan utama.",
    measuredAt: "2026-08-10",
  },
  {
    id: "umkm-involved",
    label: "UMKM terlibat",
    description: "Jumlah UMKM yang hadir dan mengikuti co creation.",
    category: "participation",
    target: 5,
    actual: 5,
    unit: "usaha",
    status: "measured",
    statusLabel: "Aktual Kegiatan",
    measurementMethod: "Rekap pelaksanaan kegiatan utama.",
    measuredAt: "2026-08-10",
  },
  {
    id: "teams-formed",
    label: "Tim terbentuk",
    description: "Jumlah tim kolaborasi yang aktif saat kegiatan.",
    category: "participation",
    target: 5,
    actual: 5,
    unit: "tim",
    status: "measured",
    statusLabel: "Aktual Kegiatan",
    measurementMethod: "Rekap lima co-creation teams pada kegiatan utama.",
    measuredAt: "2026-08-10",
  },
  {
    id: "solutions-created",
    label: "Solusi dibuat",
    description:
      "Jumlah workflow atau prototype sederhana yang diselesaikan hingga siap diuji.",
    category: "solution",
    target: 5,
    actual: null,
    unit: "solusi",
    status: "collecting",
    statusLabel: "Evidence Sedang Dikonsolidasikan",
    measurementMethod:
      "Checklist kelengkapan output dan panduan per co-creation team.",
    measuredAt: null,
  },
  {
    id: "solutions-tested",
    label: "Solusi diuji",
    description: "Jumlah solusi yang dicoba langsung oleh challenge partner.",
    category: "solution",
    target: 5,
    actual: null,
    unit: "solusi",
    status: "collecting",
    statusLabel: "Evidence Sedang Dikonsolidasikan",
    measurementMethod: "Catatan sesi testing dan konfirmasi UMKM.",
    measuredAt: null,
  },
  {
    id: "student-pre-test",
    label: "Skor tes awal mahasiswa",
    description:
      "Nilai awal pemahaman peserta sebelum bootcamp dan co creation.",
    category: "learning",
    target: null,
    actual: null,
    unit: "skor",
    status: "collecting",
    statusLabel: "Data Sedang Dikonsolidasikan",
    measurementMethod: "Assessment singkat sebelum kegiatan.",
    measuredAt: null,
  },
  {
    id: "student-post-test",
    label: "Skor tes akhir mahasiswa",
    description:
      "Nilai pemahaman peserta setelah bootcamp dan co creation.",
    category: "learning",
    target: null,
    actual: null,
    unit: "skor",
    status: "collecting",
    statusLabel: "Data Sedang Dikonsolidasikan",
    measurementMethod:
      "Assessment dengan indikator yang sama setelah kegiatan.",
    measuredAt: null,
  },
  {
    id: "students-improved",
    label: "Mahasiswa dengan peningkatan pemahaman",
    description:
      "Jumlah mahasiswa dengan skor tes akhir lebih tinggi daripada tes awal.",
    category: "learning",
    target: 12,
    actual: null,
    unit: "orang",
    status: "collecting",
    statusLabel: "Data Sedang Dikonsolidasikan",
    measurementMethod: "Perbandingan skor tes awal dan tes akhir per peserta.",
    measuredAt: null,
  },
  {
    id: "umkm-able-to-try",
    label: "UMKM mampu mencoba solusi",
    description:
      "Jumlah UMKM yang dapat menjalankan langkah utama dengan pendampingan.",
    category: "adoption",
    target: 5,
    actual: null,
    unit: "usaha",
    status: "collecting",
    statusLabel: "Evidence Sedang Dikonsolidasikan",
    measurementMethod: "Observasi testing dan checklist handover.",
    measuredAt: null,
  },
  {
    id: "solutions-reused",
    label: "Solusi digunakan kembali",
    description:
      "Jumlah UMKM yang kembali menggunakan solusi setelah kegiatan.",
    category: "adoption",
    target: 3,
    actual: null,
    unit: "usaha",
    status: "collecting",
    statusLabel: "Monitoring Berjalan",
    measurementMethod:
      "Konfirmasi penggunaan pada Baseline, H+7, H+14, dan H+30.",
    measuredAt: null,
  },
  {
    id: "partners-involved",
    label: "Mitra terlibat",
    description:
      "Jumlah mitra yang kontribusinya telah dikonfirmasi dan direalisasikan.",
    category: "network",
    target: null,
    actual: null,
    unit: "mitra",
    status: "collecting",
    statusLabel: "Data Sedang Dikonsolidasikan",
    measurementMethod: "Rekap partnership yang telah dikonfirmasi.",
    measuredAt: null,
  },
  {
    id: "volunteers-involved",
    label: "Relawan terlibat",
    description:
      "Jumlah relawan yang aktif membantu pelaksanaan kegiatan.",
    category: "network",
    target: null,
    actual: null,
    unit: "orang",
    status: "not_measured",
    statusLabel: "Belum Ada Data Terverifikasi",
    measurementMethod: "Daftar tugas dan kehadiran relawan.",
    measuredAt: null,
  },
  {
    id: "testimonials-collected",
    label: "Testimoni dengan persetujuan",
    description:
      "Jumlah testimoni yang memiliki persetujuan untuk dipublikasikan.",
    category: "story",
    target: null,
    actual: null,
    unit: "testimoni",
    status: "collecting",
    statusLabel: "Persetujuan Sedang Diverifikasi",
    measurementMethod: "Form umpan balik dan catatan persetujuan publikasi.",
    measuredAt: null,
  },
] as const satisfies readonly ImpactMetric[];

export const impactMeasurementPlan = [
  {
    id: "pre-post-assessment",
    title: "Tes awal dan tes akhir mahasiswa",
    timing: "Sebelum bootcamp dan pada akhir kegiatan",
    method:
      "Gunakan indikator yang sama untuk membandingkan pemahaman awal dan akhir.",
    indicators: [
      "Skor tes awal.",
      "Skor tes akhir.",
      "Jumlah mahasiswa dengan peningkatan skor.",
    ],
    status: "collecting",
    statusLabel: "Data Sedang Dikonsolidasikan",
  },
  {
    id: "output-completion",
    title: "Kelengkapan workflow atau prototype",
    timing: "Saat co creation dan sebelum demo",
    method:
      "Periksa bahwa output dapat dijelaskan, memiliki batas penggunaan, dan disertai panduan.",
    indicators: [
      "Solusi selesai dibuat.",
      "Panduan penggunaan tersedia.",
      "Batasan dan langkah verifikasi dicatat.",
    ],
    status: "collecting",
    statusLabel: "Evidence Sedang Dikonsolidasikan",
  },
  {
    id: "umkm-testing",
    title: "Testing oleh UMKM",
    timing: "Pada sesi testing dan handover",
    method:
      "Amati apakah challenge partner dapat mencoba langkah utama dengan pendampingan.",
    indicators: [
      "Solusi diuji.",
      "UMKM mampu mencoba.",
      "Masukan perbaikan dicatat.",
    ],
    status: "collecting",
    statusLabel: "Evidence Sedang Dikonsolidasikan",
  },
  {
    id: "satisfaction-feedback",
    title: "Kepuasan dan umpan balik",
    timing: "Pada akhir kegiatan",
    method:
      "Kumpulkan penilaian singkat dan masukan terbuka tanpa mewajibkan testimoni publik.",
    indicators: [
      "Penilaian pengalaman kegiatan.",
      "Manfaat yang dirasakan.",
      "Saran perbaikan.",
    ],
    status: "collecting",
    statusLabel: "Data Sedang Dikonsolidasikan",
  },
  {
    id: "reuse-monitoring",
    title: "Monitoring penggunaan ulang",
    timing: "Baseline (10 Agustus), H+7, H+14, dan H+30",
    method:
      "Catat kondisi awal saat handover, lalu konfirmasi penggunaan ulang, bagian yang membantu, dan hambatan pada setiap titik follow-up.",
    indicators: [
      "Solusi digunakan kembali.",
      "Frekuensi atau konteks penggunaan.",
      "Kebutuhan pendampingan lanjutan.",
    ],
    status: "collecting",
    statusLabel: "Monitoring Berjalan",
  },
  {
    id: "testimonial-consent",
    title: "Testimoni dengan persetujuan",
    timing: "Setelah pengalaman dapat dievaluasi",
    method:
      "Publikasikan kutipan hanya jika isi, atribusi, dan izin publikasinya telah dikonfirmasi.",
    indicators: [
      "Persetujuan publikasi tersedia.",
      "Atribusi telah diverifikasi.",
      "Kutipan tidak memuat data sensitif.",
    ],
    status: "collecting",
    statusLabel: "Persetujuan Sedang Diverifikasi",
  },
] as const satisfies readonly ImpactMeasurementStep[];

export const testimonials = [] as const satisfies readonly Testimonial[];

export const impactSummary = {
  status: "collecting",
  statusLabel: "Pengukuran Lanjutan Berjalan",
  description:
    "Kegiatan utama mencatat 20 mahasiswa, lima UMKM, dan lima co-creation teams. Capaian output, testing, pembelajaran, adopsi, dan cerita dampak masih dikonsolidasikan serta dipantau pada Baseline, H+7, H+14, dan H+30 sebelum dipublikasikan sebagai hasil terverifikasi.",
  emptyTestimonialLabel: "Belum ada testimoni yang disetujui untuk publikasi.",
} as const satisfies {
  readonly status: ImpactStatus;
  readonly statusLabel: string;
  readonly description: string;
  readonly emptyTestimonialLabel: string;
};

export function calculateAchievementRate(
  metric: Pick<ImpactMetric, "target" | "actual">,
): number | null {
  if (
    metric.target === null ||
    metric.actual === null ||
    metric.target <= 0
  ) {
    return null;
  }

  return Math.round((metric.actual / metric.target) * 100);
}
