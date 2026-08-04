import type { ProgressReportSlug } from "@/data/progress-reports";

export type DocumentationCategory =
  | "umkm-interview"
  | "student-interview"
  | "commitment"
  | "observation"
  | "document";

export interface UmkmStakeholder {
  readonly id: string;
  readonly businessName: string;
  readonly interviewee: string;
  readonly role: "Owner";
  readonly instagram: string;
  readonly instagramUrl: string;
  readonly currentWorkflow: string;
  readonly painPoint: string;
  readonly previousAttempt?: string;
  readonly priorityNeed: string;
  readonly additionalOpportunity?: string;
  readonly solutionHypothesis?: string;
  readonly keyInsight: string;
  readonly validationStatus: string;
  readonly documentation?: string;
}

export interface StudentStakeholder {
  readonly id: string;
  readonly name: string;
  readonly program: string;
  readonly university: string;
}

export interface DocumentationItem {
  readonly id: string;
  readonly title: string;
  readonly category: DocumentationCategory;
  readonly image?: string;
  readonly imageWidth?: number;
  readonly imageHeight?: number;
  readonly videoUrl?: string;
  readonly documentUrl?: string;
  readonly caption: string;
  readonly date?: string;
  readonly alt: string;
}

export interface SupportingDocument {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly format: "PDF";
  readonly href?: string;
  readonly status: "available" | "coming-soon";
}

export const problemValidationHeader = {
  slug: "problem-validation" as ProgressReportSlug,
  title: "Problem Validation",
  metadataTitle: "Problem Validation | AI Co-Creation Lab Makassar",
  weekLabel: "GEP WEEK 2",
  phase: "CONNECT & COLLABORATE",
  subtitle: "Validating real problems before building solutions.",
  status: "Week 2 Completed",
  nextStep: "Co-Creation and Prototype Testing",
  updatedAt: "4 Agustus 2026",
  updatedAtIso: "2026-08-04",
  route: "/ai-co-creation-lab-makassar/progress/problem-validation",
  progressUrl:
    "https://event.dekatlokal.com/ai-co-creation-lab-makassar/progress/problem-validation",
  download: {
    href: "/documents/problem-validation/AI-Co-Creation-Lab-Problem-Validation-Week-2.pdf",
    label: "Unduh laporan Problem Validation (PDF)",
  },
} as const;

export const validationMetrics = [
  { value: "5", label: "UMKM interviewed" },
  { value: "3", label: "Students interviewed" },
  { value: "8", label: "Stakeholders" },
  { value: "5", label: "Committed beneficiaries" },
] as const;

export const validationApproach = [
  {
    title: "Listen",
    description:
      "Mendengarkan workflow, pain points, dan kebiasaan yang dijalankan saat ini.",
  },
  {
    title: "Observe",
    description:
      "Mengidentifikasi proses manual, pekerjaan berulang, dan titik yang sering terlewat.",
  },
  {
    title: "Clarify",
    description:
      "Memisahkan masalah utama, kebutuhan tambahan, dan asumsi solusi.",
  },
  {
    title: "Commit",
    description:
      "Memastikan UMKM bersedia terlibat, memberi feedback, dan menguji prototype.",
  },
] as const;

export const umkmStakeholders: readonly UmkmStakeholder[] = [
  {
    id: "eyfa-natural-oil",
    businessName: "Eyfa Natural Oil",
    interviewee: "Eka Reski Rahmawati",
    role: "Owner",
    instagram: "@eyfanaturaloil",
    instagramUrl: "https://www.instagram.com/eyfanaturaloil/",
    currentWorkflow:
      "Penjualan, barang, dan laporan usaha masih dicatat secara manual. Pencatatan sering terlupa, hilang, atau tidak dilakukan karena prosesnya terasa tidak praktis.",
    painPoint:
      "Owner sulit memperoleh rekap penjualan, stok, HPP, dan gambaran keuntungan usaha secara konsisten.",
    previousAttempt:
      "Pernah mencoba sistem berlangganan, tetapi biayanya terasa mahal dan alurnya kurang familiar.",
    priorityNeed:
      "Sistem kasir dan pencatatan usaha sederhana: pilih produk, catat transaksi, perbarui stok, lalu bentuk rekap harian secara otomatis.",
    keyInsight:
      "Eyfa tidak membutuhkan sistem akuntansi yang kompleks. Yang dibutuhkan adalah sistem operasional sederhana yang mengubah transaksi harian menjadi informasi usaha tanpa menambah beban pencatatan.",
    validationStatus: "Problem validated",
    documentation: "documentation-eyfa-natural-oil",
  },
  {
    id: "sukmajahe-sarabba",
    businessName: "Sukmajahe Sarabba Makassar",
    interviewee: "Rita Suryaningsih",
    role: "Owner",
    instagram: "@sukmajahesarabba.id",
    instagramUrl: "https://www.instagram.com/sukmajahesarabba.id/",
    currentWorkflow:
      "Data toko titip jual dan stok masih direkap berulang melalui Excel. Input data membutuhkan effort karena biasanya harus membuka laptop.",
    painPoint:
      "Owner kesulitan mengetahui produk dititipkan di toko mana, jumlah stok per toko, umur produk, status pembayaran, dan perkembangan kanal distribusi.",
    previousAttempt:
      "Pernah mencoba aplikasi gratis, tetapi fitur terlalu banyak dan tidak fokus pada kebutuhan distribusi produk.",
    priorityNeed:
      "Sistem mobile-first untuk menyimpan data toko, tanggal masuk, jumlah item, jenis toko, status cash atau kredit, umur produk, dan penetrasi online atau offline.",
    additionalOpportunity:
      "Data outlet yang sudah rapi dapat digunakan untuk membuat flyer otomatis yang menginformasikan lokasi ketersediaan produk.",
    keyInsight:
      "Masalah utamanya bukan sekadar jumlah stok, tetapi visibility: stok berada di mana, sudah berapa lama, dan bagaimana status pembayarannya.",
    validationStatus: "Problem validated",
    documentation: "documentation-sukmajahe-sarabba",
  },
  {
    id: "markisa-bintang-jaya",
    businessName: "Markisa Bintang Jaya",
    interviewee: "Hardinianti",
    role: "Owner",
    instagram: "@markisa_bintangjaya",
    instagramUrl: "https://www.instagram.com/markisa_bintangjaya/",
    currentWorkflow:
      "Laporan penjualan, pemasukan, pengeluaran, dan stok masih dicatat secara manual.",
    painPoint:
      "Owner sulit melihat kondisi usaha secara mingguan maupun bulanan dan membutuhkan proses input yang cepat melalui mobile.",
    previousAttempt:
      "Pernah memakai aplikasi gratis, tetapi berhenti karena terlalu banyak iklan dan pengalaman penggunaan kurang nyaman.",
    priorityNeed:
      "Sistem pencatatan pemasukan, pengeluaran, penjualan, dan stok yang ringan di mobile, dengan visual laporan yang lebih lengkap di desktop.",
    keyInsight:
      "Markisa membutuhkan visibility terhadap usaha dengan proses input yang sangat ringan agar sistem tidak kembali ditinggalkan.",
    validationStatus: "Problem validated",
    documentation: "documentation-markisa-bintang-jaya",
  },
  {
    id: "kira-kira-michi",
    businessName: "Kira Kira Michi",
    interviewee: "Mutia Nurafni Diapati",
    role: "Owner",
    instagram: "@kirakiramichi.merchandise",
    instagramUrl: "https://www.instagram.com/kirakiramichi.merchandise/",
    currentWorkflow:
      "Loyalty card masih berbentuk kartu cetak dan stempel fisik.",
    painPoint:
      "Sistem manual membutuhkan biaya cetak, isi ulang stempel, waktu pelayanan, dan tidak menghasilkan data pelanggan yang dapat dikelola.",
    priorityNeed:
      "Digital loyalty card: customer registrasi, mendapatkan level atau identitas member, scan QR admin, mengajukan klaim stempel, lalu admin melakukan approval.",
    additionalOpportunity:
      "Data pelanggan dapat digunakan untuk membangun hubungan dan promosi lanjutan dengan persetujuan pelanggan.",
    keyInsight:
      "Digital loyalty bukan hanya mengurangi biaya kartu fisik, tetapi mengubah transaksi anonim menjadi hubungan pelanggan yang dapat dilanjutkan.",
    validationStatus: "Problem validated",
    documentation: "documentation-kira-kira-michi",
  },
  {
    id: "dapur-andist",
    businessName: "Dapur Andist",
    interviewee: "Mujhar Idris, S.E., M.M.",
    role: "Owner",
    instagram: "@mujhar.idris",
    instagramUrl: "https://www.instagram.com/mujhar.idris/",
    currentWorkflow:
      "Arus kas masih dicatat di buku dan sering terlupa atau tidak dicatat secara konsisten.",
    painPoint:
      "Owner kesulitan melihat pemasukan, pengeluaran, HPP, omzet, dan perkembangan usaha dalam satu laporan yang mudah dipahami.",
    priorityNeed:
      "Sistem laporan keuangan sederhana dengan input pemasukan manual, input pengeluaran melalui form atau foto struk, perhitungan HPP, grafik, dan tracking omzet.",
    solutionHypothesis:
      "OCR struk dan chatbot AI untuk bertanya tentang data keuangan masih diperlakukan sebagai hipotesis solusi dan perlu diuji agar tidak menambah kompleksitas.",
    keyInsight:
      "Dapur Andist membutuhkan pencatatan yang konsisten terlebih dahulu. AI baru bernilai jika benar-benar mempercepat input atau membantu memahami data yang sudah tercatat.",
    validationStatus: "Core problem validated · Solution details need testing",
    documentation: "documentation-dapur-andist",
  },
] as const;

export const studentStakeholders: readonly StudentStakeholder[] = [
  {
    id: "andi-yehuda",
    name: "Andi Yehuda George Matandung",
    program: "Ilmu Hukum",
    university: "Universitas Hasanuddin",
  },
  {
    id: "muhammad-irfan",
    name: "Muhammad Irfan Setiawan",
    program: "Ilmu Komunikasi",
    university: "Universitas Fajar",
  },
  {
    id: "siti-nuralisa",
    name: "Siti Nuralisa",
    program: "Teknik Informatika",
    university: "Universitas Muhammadiyah Makassar",
  },
] as const;

export const studentSharedFindings = [
  "Mengenal dan menggunakan AI sejak awal masa kuliah.",
  "AI digunakan untuk brainstorming, tugas, laporan, presentasi, dan kebutuhan akademik.",
  "Mahasiswa Teknik Informatika juga menggunakan AI untuk membuat website, portfolio, dan sistem sederhana untuk tugas kuliah.",
  "Rata-rata belum pernah membangun sistem berbasis AI untuk penerima manfaat nyata.",
  "Memiliki rasa ingin tahu tinggi untuk mengeksplorasi kemampuan AI.",
  "Kesulitan menemukan real users, real problems, dan ruang untuk mengukur impact.",
] as const;

export const studentAiTransition = [
  "AI for assignments",
  "AI for building",
  "AI for real people",
  "AI for measurable impact",
] as const;

export const validationFindings = [
  {
    title: "Manual work creates invisible business gaps",
    description:
      "Pencatatan yang terlupa bukan hanya masalah administrasi. Dampaknya adalah owner kehilangan visibility terhadap stok, omzet, arus kas, distribusi, dan pelanggan.",
  },
  {
    title: "Existing tools often do not fit",
    description:
      "Sebagian UMKM sudah mencoba aplikasi digital, tetapi berhenti karena mahal, terlalu kompleks, penuh iklan, atau tidak sesuai workflow mereka.",
  },
  {
    title: "Mobile-first is part of the solution",
    description:
      "UMKM membutuhkan proses input yang bisa dilakukan saat pekerjaan terjadi. Mobile-first bukan sekadar pilihan UI, tetapi bagian dari kebutuhan operasional.",
  },
  {
    title: "Simple and focused beats feature-heavy",
    description:
      "UMKM lebih membutuhkan satu sistem yang menyelesaikan core problem dengan baik daripada aplikasi besar dengan terlalu banyak fitur.",
  },
  {
    title: "Students are AI users, not yet AI problem-solvers",
    description:
      "Mahasiswa sudah dekat dengan AI, tetapi belum banyak mendapat kesempatan menggunakannya untuk real users dan mengukur dampak solusi.",
  },
  {
    title: "The two sides complete each other",
    description:
      "UMKM membawa masalah dan konteks nyata. Mahasiswa membawa curiosity, skills, dan willingness to build. Co-creation menghubungkan keduanya.",
  },
] as const;

export const validatedItems = [
  "Pekerjaan manual dan berulang menghambat operasional UMKM.",
  "Existing tools sering tidak sesuai workflow.",
  "Mobile input adalah kebutuhan penting.",
  "UMKM membutuhkan sistem yang fokus dan sederhana.",
  "Mahasiswa sudah familiar dengan AI.",
  "Mahasiswa belum banyak membangun solusi untuk real users.",
  "Kedua kelompok bersedia terlibat dalam proses co-creation.",
] as const;

export const stillToTestItems = [
  "Detail workflow setiap prototype.",
  "OCR foto struk.",
  "Chatbot AI untuk laporan.",
  "Flyer otomatis.",
  "Mekanisme QR dan approval loyalty.",
  "Bentuk dashboard dan grafik.",
  "Konsistensi penggunaan setelah prototype diberikan.",
] as const;

export const validationDocumentation: readonly DocumentationItem[] = [
  {
    id: "documentation-eyfa-natural-oil",
    title: "Eyfa Natural Oil",
    category: "umkm-interview",
    image: "/problem-validation/documentation/eyfa-natural-oil.webp",
    imageWidth: 1200,
    imageHeight: 1500,
    caption:
      "Wawancara validasi dan penandatanganan komitmen penerima manfaat bersama Eyfa Natural Oil.",
    alt: "Perwakilan Eyfa Natural Oil bersama fasilitator menunjukkan dokumen komitmen penerima manfaat",
  },
  {
    id: "documentation-sukmajahe-sarabba",
    title: "Sukmajahe Sarabba Makassar",
    category: "umkm-interview",
    image: "/problem-validation/documentation/sukmajahe-sarabba.webp",
    imageWidth: 1200,
    imageHeight: 1500,
    caption:
      "Wawancara validasi dan penandatanganan komitmen penerima manfaat bersama Sukmajahe Sarabba Makassar.",
    alt: "Perwakilan Sukmajahe Sarabba Makassar bersama fasilitator menunjukkan dokumen komitmen penerima manfaat",
  },
  {
    id: "documentation-markisa-bintang-jaya",
    title: "Markisa Bintang Jaya",
    category: "umkm-interview",
    image: "/problem-validation/documentation/markisa-bintang-jaya.webp",
    imageWidth: 1200,
    imageHeight: 1500,
    caption:
      "Wawancara validasi dan penandatanganan komitmen penerima manfaat bersama Markisa Bintang Jaya.",
    alt: "Perwakilan Markisa Bintang Jaya bersama fasilitator menunjukkan dokumen komitmen penerima manfaat",
  },
  {
    id: "documentation-kira-kira-michi",
    title: "Kira Kira Michi",
    category: "umkm-interview",
    image: "/problem-validation/documentation/kira-kira-michi.webp",
    imageWidth: 1200,
    imageHeight: 1500,
    caption:
      "Wawancara validasi dan penandatanganan komitmen penerima manfaat bersama Kira Kira Michi.",
    alt: "Perwakilan Kira Kira Michi bersama fasilitator menunjukkan dokumen komitmen penerima manfaat",
  },
  {
    id: "documentation-dapur-andist",
    title: "Dapur Andist",
    category: "umkm-interview",
    image: "/problem-validation/documentation/dapur-andist.webp",
    imageWidth: 1200,
    imageHeight: 1500,
    caption:
      "Wawancara validasi dan penandatanganan komitmen penerima manfaat bersama Dapur Andist.",
    alt: "Perwakilan Dapur Andist bersama fasilitator menunjukkan dokumen komitmen penerima manfaat",
  },
  {
    id: "documentation-beneficiary-commitment",
    title: "Komitmen penerima manfaat",
    category: "commitment",
    image: "/problem-validation/documentation/beneficiary-commitment.webp",
    imageWidth: 1200,
    imageHeight: 1500,
    caption:
      "Foto bersama UMKM dan penandatanganan komitmen penerima manfaat Mini Project AI Co-Creation Lab Makassar.",
    alt: "Foto bersama lima perwakilan UMKM dan fasilitator setelah penandatanganan komitmen penerima manfaat Mini Project",
  },
] as const;

export const supportingDocuments: readonly SupportingDocument[] = [
  {
    id: "week-2-report",
    title: "Week 2 Report PDF",
    description:
      "Laporan Problem Validation yang siap diunduh untuk dokumentasi dan Final Presentation.",
    format: "PDF",
    href: problemValidationHeader.download.href,
    status: "available",
  },
  {
    id: "interview-notes",
    title: "Interview Notes",
    description: "Catatan wawancara terstruktur untuk lima UMKM dan mahasiswa.",
    format: "PDF",
    status: "coming-soon",
  },
  {
    id: "observation-summary",
    title: "Observation Summary",
    description: "Ringkasan observasi workflow dan kebutuhan operasional.",
    format: "PDF",
    status: "coming-soon",
  },
  {
    id: "beneficiary-commitment",
    title: "Beneficiary Commitment",
    description: "Dokumen komitmen penerima manfaat Mini Project.",
    format: "PDF",
    status: "coming-soon",
  },
] as const;

export const problemValidationProgressDescription =
  "Problem Validation Week 2 telah diselesaikan melalui wawancara dan konsultasi langsung bersama lima UMKM penerima manfaat serta tiga mahasiswa calon co-creator. Temuan menunjukkan bahwa UMKM menghadapi masalah operasional nyata dalam pencatatan, stok, distribusi, loyalitas pelanggan, dan laporan keuangan, sementara tools yang pernah dicoba sering tidak sesuai biaya, kompleksitas, atau workflow mereka. Mahasiswa telah familiar menggunakan AI untuk kebutuhan akademik dan personal, tetapi belum banyak membangun solusi untuk pengguna nyata. Lima UMKM menyatakan komitmen untuk terlibat, memberi feedback, dan menguji prototype. Hasil ini menjadi dasar untuk melanjutkan proses co-creation dan prototype testing. Detail solusi serta adopsi jangka panjang masih perlu diuji.";
