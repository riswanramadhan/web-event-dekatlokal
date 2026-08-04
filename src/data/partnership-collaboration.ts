import type { LightboxMediaItem } from "@/components/reports/media-lightbox";
import type { ProgressReportSlug } from "@/data/progress-reports";

export type PartnerStatus =
  | "program-support"
  | "mou-signed"
  | "commitment-documented"
  | "academic-collaboration"
  | "venue-confirmed";

export type PartnerCategory =
  | "Program Support"
  | "UMKM Ecosystem"
  | "Digital Infrastructure"
  | "Digital Learning"
  | "Venue & Creative Space"
  | "Academic Talent";

export type PartnershipDocumentationCategory =
  | "program-support"
  | "mou-signing"
  | "partner-meeting"
  | "digital-infrastructure"
  | "digital-learning"
  | "venue"
  | "global-communication"
  | "academic-collaboration"
  | "community-support";

export interface PartnerLogo {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface Partner {
  readonly id: string;
  readonly name: string;
  readonly shortName?: string;
  readonly heading: string;
  readonly role: string;
  readonly category: PartnerCategory;
  readonly status: PartnerStatus;
  readonly statusLabel: string;
  readonly logo?: PartnerLogo;
  readonly representative?: {
    readonly name: string;
    readonly position: string;
  };
  readonly description: readonly string[];
  readonly contributions: readonly string[];
  readonly inKindValue?: number;
  readonly servicePeriod?: string;
  readonly keyImpact: string;
  readonly documentId?: string;
}

export interface PartnershipDocumentation {
  readonly id: string;
  readonly partnerId: string;
  readonly title: string;
  readonly category: PartnershipDocumentationCategory;
  readonly images: readonly LightboxMediaItem[];
  readonly caption: string;
  readonly date?: string;
}

export interface PartnershipDocument {
  readonly id: string;
  readonly partnerId: string;
  readonly title: string;
  readonly description: string;
  readonly category: PartnershipDocumentationCategory;
  readonly format: "PDF";
  readonly documentUrl: string;
  readonly pages: readonly LightboxMediaItem[];
  readonly date: string;
}

export const partnershipHeader = {
  slug: "partnership-collaboration" as ProgressReportSlug,
  title: "Partnership & Collaboration",
  metadataTitle:
    "Partnership & Collaboration | AI Co-Creation Lab Makassar",
  weekLabel: "GEP WEEK 2",
  phase: "MEMBANGUN KOLABORASI",
  subtitle: "Membangun sistem dukungan di balik proses co-creation.",
  status: "Pembangunan Partnership Berjalan",
  nextStep: "Pitching Mini Project dan Finalisasi Action Plan",
  updatedAt: "4 Agustus 2026",
  updatedAtIso: "2026-08-04",
  route:
    "/ai-co-creation-lab-makassar/progress/partnership-collaboration",
  progressUrl:
    "https://event.dekatlokal.com/ai-co-creation-lab-makassar/progress/partnership-collaboration",
} as const;

const wideLogoSize = { width: 900, height: 372 } as const;

export const partners: readonly Partner[] = [
  {
    id: "bakti-nusa",
    name: "BAKTI NUSA",
    heading: "The Ecosystem That Made This Possible",
    role: "Program Support Ecosystem",
    category: "Program Support",
    status: "program-support",
    statusLabel: "Program Support Ecosystem",
    logo: {
      src: "/logo-ecosystem/optimized/logo-baktinusa.webp",
      alt: "Logo BAKTI NUSA",
      ...wideLogoSize,
    },
    description: [
      "Melalui BAKTI NUSA, saya mendapat ruang untuk belajar, menguji gagasan, dan menerjemahkan kepemimpinan menjadi aksi.",
    ],
    contributions: [
      "Kesempatan menjalankan mini project dalam konteks Global Experience Program.",
      "Ruang pembelajaran dan pengembangan kepemimpinan.",
      "Akses jejaring dan pendampingan program.",
    ],
    keyImpact:
      "Saya mendapat ruang untuk belajar, menguji ide, dan menerjemahkan kepemimpinan menjadi dampak.",
  },
  {
    id: "great-edunesia",
    name: "GREAT Edunesia",
    heading: "The Ecosystem That Made This Possible",
    role: "Program Support Ecosystem",
    category: "Program Support",
    status: "program-support",
    statusLabel: "Program Support Ecosystem",
    logo: {
      src: "/logo-ecosystem/optimized/logo-great.webp",
      alt: "Logo GREAT Edunesia",
      ...wideLogoSize,
    },
    description: [
      "Bersama GREAT Edunesia, saya mengembangkan proses pembelajaran dan eksperimen kepemimpinan menjadi mini project.",
    ],
    contributions: [
      "Ekosistem pembelajaran program.",
      "Dorongan untuk menerjemahkan ide menjadi aksi.",
      "Ruang pengembangan kapasitas awardee.",
    ],
    keyImpact:
      "Pembelajaran menjadi bermakna ketika memberi ruang untuk aksi nyata.",
  },
  {
    id: "dompet-dhuafa",
    name: "Dompet Dhuafa",
    heading: "The Ecosystem That Made This Possible",
    role: "Program Support Ecosystem",
    category: "Program Support",
    status: "program-support",
    statusLabel: "Program Support Ecosystem",
    logo: {
      src: "/logo-ecosystem/optimized/logo-dompetdhuafa.webp",
      alt: "Logo Dompet Dhuafa",
      ...wideLogoSize,
    },
    description: [
      "Melalui ekosistem Dompet Dhuafa, saya mendapat ruang untuk belajar dan mengembangkan aksi yang bermanfaat.",
    ],
    contributions: [
      "Konteks pengembangan kepemimpinan berdampak.",
      "Ekosistem program dan akses pembelajaran.",
      "Ruang untuk menguji ide dalam aksi sosial.",
    ],
    keyImpact:
      "Saya mengembangkan kepemimpinan dengan menghubungkan pembelajaran dan dampak yang berguna.",
  },
  {
    id: "rumah-bumn-makassar",
    name: "Rumah BUMN Makassar",
    heading: "Connecting the Program to Real UMKM Needs",
    role: "UMKM Ecosystem & Implementation Partner",
    category: "UMKM Ecosystem",
    status: "commitment-documented",
    statusLabel: "Kolaborasi Berjalan",
    logo: {
      src: "/logo-ecosystem/optimized/logo-rumahbumn.webp",
      alt: "Logo Rumah BUMN Makassar",
      ...wideLogoSize,
    },
    description: [
      "Saya bekerja bersama Rumah BUMN Makassar untuk menghubungkan program dengan ekosistem UMKM dan kebutuhan penerima manfaat yang nyata.",
      "Melalui pertemuan dan koordinasi langsung, saya menyusun bentuk kolaborasi yang mendukung validasi kebutuhan serta pelaksanaan co-creation bersama UMKM.",
    ],
    contributions: [
      "Akses dan koordinasi dengan ekosistem UMKM penerima manfaat.",
      "Dukungan proses validasi kebutuhan usaha.",
      "Komitmen kolaborasi yang didokumentasikan dalam pertemuan.",
      "Lingkungan nyata untuk menguji relevansi proses co-creation.",
    ],
    keyImpact:
      "Saya dapat menguji solusi bersama pengguna, masalah, dan lingkungan usaha yang nyata.",
  },
  {
    id: "inovasi-digital",
    name: "Inovasi Digital",
    heading: "Keeping Every Prototype Accessible Beyond the Event",
    role: "Official Digital Infrastructure Partner",
    category: "Digital Infrastructure",
    status: "mou-signed",
    statusLabel: "MoU Signed",
    logo: {
      src: "/partnership-collaboration/logos/inovasi-digital.webp",
      alt: "Logo Inovasi Digital",
      width: 604,
      height: 594,
    },
    representative: {
      name: "Dedi Julyan Sukawanto",
      position: "Direktur Utama, Inovasi Digital",
    },
    description: [
      "Saya memperoleh dukungan Inovasi Digital agar lima solusi digital dapat diakses, diuji, dan digunakan setelah kegiatan utama.",
      "Kolaborasi ini menyediakan domain, hosting, bantuan aktivasi, dan dukungan teknis untuk menjaga prototype tetap dapat digunakan.",
    ],
    contributions: [
      "Lima domain berekstensi .web.id.",
      "Lima akun hosting paket Starter.",
      "Masa aktif layanan selama 12 bulan sejak masing-masing layanan diaktifkan.",
      "Bantuan aktivasi dan dukungan teknis yang wajar untuk layanan domain atau hosting.",
      "Penyampaian spesifikasi layanan dan akses administratif melalui kanal yang aman.",
    ],
    inKindValue: 2_525_000,
    servicePeriod: "12 bulan sejak aktivasi masing-masing layanan",
    keyImpact: "Saya membawa prototype menjadi solusi yang dapat diakses dan digunakan.",
    documentId: "mou-inovasi-digital",
  },
  {
    id: "dicoding-indonesia",
    name: "Dicoding Indonesia",
    heading: "Supporting the People Behind the Technology",
    role: "Official Digital Learning Partner",
    category: "Digital Learning",
    status: "mou-signed",
    statusLabel: "MoU Signed",
    logo: {
      src: "/partnership-collaboration/logos/dicoding-indonesia.webp",
      alt: "Logo Dicoding Indonesia",
      width: 794,
      height: 201,
    },
    representative: {
      name: "Gilang Ramadhan",
      position: "Head of Intensive Learning, Dicoding Indonesia",
    },
    description: [
      "Saya memperoleh dukungan pembelajaran Dicoding Indonesia senilai Rp15.000.000 untuk memperkuat kapasitas panitia dan peserta selama proses co-creation.",
      "Akses pembelajaran selama satu bulan memberi kesempatan kepada panitia dan peserta untuk mengembangkan kemampuan digital yang relevan dengan prototype.",
    ],
    contributions: [
      "Akses kelas online Dicoding selama satu bulan.",
      "Akses pembelajaran bagi panitia dan peserta yang terdaftar.",
      "Manfaat pembelajaran penuh selama masa akses.",
      "Kesempatan menyelesaikan kelas sesuai ketentuan program.",
    ],
    inKindValue: 15_000_000,
    servicePeriod: "Satu bulan",
    keyImpact:
      "Dukungan pembelajaran membantu panitia dan peserta terus bertumbuh bersama teknologi.",
    documentId: "mou-dicoding-indonesia",
  },
  {
    id: "komdigi-makassar",
    name: "Balai Besar Pelatihan Komunikasi dan Digital Makassar",
    shortName: "Komdigi Makassar",
    heading: "Spaces That Support Collaboration",
    role: "Main Venue Partner",
    category: "Venue & Creative Space",
    status: "venue-confirmed",
    statusLabel: "Venue Confirmed",
    logo: {
      src: "/logo-ecosystem/optimized/logo-komdigimakassar.webp",
      alt: "Logo Komdigi Makassar",
      ...wideLogoSize,
    },
    description: [
      "Saya menetapkan Komdigi Makassar sebagai lokasi utama AI Co-Creation Lab Makassar.",
      "Melalui koordinasi ruang dan fasilitas, saya menyiapkan tempat yang mendukung proses belajar, praktik, dan kolaborasi peserta bersama UMKM.",
    ],
    contributions: [
      "Ruang pelatihan untuk kegiatan utama.",
      "Akses ruang untuk persiapan dan pengembalian fasilitas.",
      "Meja, kursi, proyektor atau layar, serta fasilitas pendukung yang tersedia sesuai koordinasi.",
      "Lingkungan pelatihan komunikasi dan digital yang relevan dengan program.",
    ],
    keyImpact:
      "Saya menyiapkan ruang yang relevan bagi mahasiswa, UMKM, mentor, dan partner untuk belajar serta membangun bersama.",
    documentId: "surat-komdigi-makassar",
  },
  {
    id: "makassar-creative-hub",
    name: "Makassar Creative Hub",
    shortName: "MCH",
    heading: "Spaces That Support Collaboration",
    role: "Creative Space & Alternative Venue Partner",
    category: "Venue & Creative Space",
    status: "venue-confirmed",
    statusLabel: "Venue Schedule Published",
    logo: {
      src: "/partnership-collaboration/logos/makassar-creative-hub.webp",
      alt: "Logo Makassar Creative Hub",
      width: 1000,
      height: 404,
    },
    description: [
      "Saya menjadikan Makassar Creative Hub sebagai ruang pendukung untuk persiapan program dan produksi konten Global Communication.",
      "Saya menjadwalkan Produksi Konten Global Communication pada Kamis, 6 Agustus 2026 pukul 13.00 sampai 16.00 WITA di Studio Konten.",
    ],
    contributions: [
      "Studio Konten untuk produksi Global Communication.",
      "Ruang kreatif untuk persiapan dan aktivitas program.",
      "Opsi ruang pendukung dalam ekosistem kreatif Makassar.",
    ],
    servicePeriod: "Kamis, 6 Agustus 2026",
    keyImpact:
      "Saya menggunakan ruang kreatif untuk mempersiapkan program, berkomunikasi, dan berkolaborasi.",
    documentId: "surat-makassar-creative-hub",
  },
  {
    id: "informatika-unhas",
    name: "Teknik Informatika Universitas Hasanuddin",
    shortName: "Informatika Unhas",
    heading: "Academic Skills Meet Real-World Problems",
    role: "Academic Talent Partner",
    category: "Academic Talent",
    status: "academic-collaboration",
    statusLabel: "Kolaborasi Akademik",
    logo: {
      src: "/logo-ecosystem/optimized/logo-informatikaunhas.webp",
      alt: "Logo Departemen Teknik Informatika Universitas Hasanuddin",
      width: 520,
      height: 520,
    },
    description: [
      "Saya menghubungkan keterampilan teknis mahasiswa Informatika Unhas dengan kebutuhan nyata UMKM.",
      "Kolaborasi akademik ini menghadirkan jejaring talenta untuk mendukung pemateri, mentor, dan proses praktik co-creation.",
    ],
    contributions: [
      "Akses jejaring mahasiswa aktif di bidang website dan AI.",
      "Talenta pemateri, mentor, dan co-creator untuk proses praktik.",
      "Dukungan pengetahuan teknis selama proses co-creation.",
    ],
    keyImpact:
      "Saya membuat pembelajaran teknis lebih bermakna dengan mempertemukannya bersama pengguna nyata.",
  },
] as const;

export const partnershipCategories = [
  "Program Support",
  "UMKM Ecosystem",
  "Digital Infrastructure",
  "Digital Learning",
  "Venue & Creative Space",
  "Academic Talent",
  "Community Support",
] as const;

export const programTargets = [
  { value: "5", label: "UMKM", status: "Target" },
  { value: "20", label: "Mahasiswa", status: "Target" },
  { value: "5", label: "Tim co-creation", status: "Target" },
  { value: "5", label: "Prototype digital", status: "Target" },
] as const;

export const partnershipDocumentation: readonly PartnershipDocumentation[] = [
  {
    id: "rumah-bumn-collaboration",
    partnerId: "rumah-bumn-makassar",
    title: "Pertemuan dan Komitmen Kolaborasi Rumah BUMN Makassar",
    category: "partner-meeting",
    images: [
      {
        src: "/partnership-collaboration/documentation/rumah-bumn-makassar-slide-01.webp",
        width: 1440,
        height: 1800,
        alt: "Perwakilan DekatLokal dan Rumah BUMN Makassar menunjukkan dokumen komitmen kolaborasi",
        label: "Slide 1",
      },
      {
        src: "/partnership-collaboration/documentation/rumah-bumn-makassar-slide-02.webp",
        width: 1440,
        height: 1800,
        alt: "Perwakilan DekatLokal dan Rumah BUMN Makassar berfoto dengan dokumen komitmen",
        label: "Slide 2",
      },
      {
        src: "/partnership-collaboration/documentation/rumah-bumn-makassar-slide-03.webp",
        width: 1440,
        height: 1800,
        alt: "Perwakilan DekatLokal dan Rumah BUMN Makassar berjabat tangan setelah pertemuan",
        label: "Slide 3",
      },
    ],
    caption:
      "Tiga slide dokumentasi pertemuan dan komitmen kolaborasi bersama Rumah BUMN Makassar.",
  },
  {
    id: "mch-global-communication-post",
    partnerId: "makassar-creative-hub",
    title: "Publikasi Jadwal Makassar Creative Hub",
    category: "global-communication",
    images: [
      {
        src: "/partnership-collaboration/documentation/makassar-creative-hub-postingan.webp",
        width: 1179,
        height: 1982,
        alt: "Posting Makassar Creative Hub yang mencantumkan jadwal Produksi Konten Global Communication oleh DekatLokal",
        label: "Posting",
      },
    ],
    caption:
      "Post Makassar Creative Hub mencantumkan Produksi Konten Global Communication oleh DekatLokal pada 6 Agustus 2026 di Studio Konten.",
    date: "6 Agustus 2026",
  },
] as const;

function documentPage(
  baseName: string,
  page: number,
  pageCount: number,
  title: string,
  width = 1192,
  height = 1684,
): LightboxMediaItem {
  return {
    src: `/partnership-collaboration/documents/${baseName}-page-${String(page).padStart(2, "0")}.webp`,
    width,
    height,
    alt: `${title}, halaman ${page} dari ${pageCount}`,
  };
}

export const partnershipDocuments: readonly PartnershipDocument[] = [
  {
    id: "mou-dicoding-indonesia",
    partnerId: "dicoding-indonesia",
    title: "MoU DekatLokal × Dicoding Indonesia",
    description:
      "MoU dukungan akses kelas level dasar untuk panitia dan peserta terdaftar.",
    category: "digital-learning",
    format: "PDF",
    documentUrl:
      "/documents/partnership/mou-dicoding-dekatlokal.pdf",
    pages: Array.from({ length: 3 }, (_, index) =>
      documentPage(
        "mou-dicoding-dekatlokal",
        index + 1,
        3,
        "MoU DekatLokal dan Dicoding Indonesia",
      ),
    ),
    date: "29 Juli 2026",
  },
  {
    id: "mou-inovasi-digital",
    partnerId: "inovasi-digital",
    title: "MoU DekatLokal × Inovasi Digital",
    description:
      "MoU lima domain .web.id, lima hosting Starter, dan layanan selama 12 bulan sejak aktivasi.",
    category: "digital-infrastructure",
    format: "PDF",
    documentUrl:
      "/documents/partnership/mou-inovasi-digital-dekatlokal.pdf",
    pages: Array.from({ length: 5 }, (_, index) =>
      documentPage(
        "mou-inovasi-digital-dekatlokal",
        index + 1,
        5,
        "MoU DekatLokal dan Inovasi Digital",
      ),
    ),
    date: "4 Agustus 2026",
  },
  {
    id: "surat-komdigi-makassar",
    partnerId: "komdigi-makassar",
    title: "Surat Permohonan Ruang Komdigi Makassar",
    description:
      "Surat permohonan peminjaman ruang dan fasilitas kegiatan utama.",
    category: "venue",
    format: "PDF",
    documentUrl:
      "/documents/partnership/surat-permohonan-ruang-komdigi-makassar.pdf",
    pages: [
      documentPage(
        "surat-permohonan-ruang-komdigi-makassar",
        1,
        1,
        "Surat permohonan ruang Komdigi Makassar",
      ),
    ],
    date: "1 Agustus 2026",
  },
  {
    id: "surat-makassar-creative-hub",
    partnerId: "makassar-creative-hub",
    title: "Surat Penggunaan Tempat Makassar Creative Hub",
    description:
      "Surat pernyataan penggunaan tempat untuk Produksi Konten Global Communication.",
    category: "global-communication",
    format: "PDF",
    documentUrl:
      "/documents/partnership/surat-penggunaan-tempat-makassar-creative-hub.pdf",
    pages: [
      documentPage(
        "surat-penggunaan-tempat-makassar-creative-hub",
        1,
        1,
        "Surat penggunaan tempat Makassar Creative Hub",
        1224,
        1584,
      ),
    ],
    date: "30 Juli 2026",
  },
] as const;

export const partnershipValueItems = [
  {
    title: "Penerima Manfaat Nyata",
    description: "Akses ke lima UMKM dan kebutuhan operasional nyata.",
  },
  {
    title: "Akses Pembelajaran",
    description:
      "Dukungan kelas digital untuk meningkatkan kapasitas peserta dan panitia.",
  },
  {
    title: "Infrastruktur Jangka Panjang",
    description:
      "Lima domain dan lima hosting agar prototype dapat digunakan setelah bootcamp.",
  },
  {
    title: "Talenta dan Keahlian",
    description:
      "Mahasiswa, mentor, pemateri, dan co-creator dengan kemampuan yang relevan.",
  },
  {
    title: "Ruang Kolaborasi",
    description:
      "Venue utama, ruang kreatif, dan Studio Konten untuk aktivitas program.",
  },
  {
    title: "Ekosistem Program",
    description:
      "Pembelajaran, jejaring, publikasi, dan ruang untuk menjalankan ide.",
  },
] as const;

export const partnershipTimeline = [
  {
    title: "Partnership pembelajaran digital",
    description: "MoU bersama Dicoding Indonesia ditandatangani.",
    date: "29 Juli 2026",
  },
  {
    title: "Koordinasi ruang kreatif",
    description:
      "Surat penggunaan tempat Makassar Creative Hub ditandatangani untuk produksi Global Communication.",
    date: "30 Juli 2026",
  },
  {
    title: "Koordinasi venue utama",
    description:
      "Surat permohonan ruang dan fasilitas disampaikan kepada Komdigi Makassar.",
    date: "1 Agustus 2026",
  },
  {
    title: "Partnership infrastruktur digital",
    description: "MoU bersama Inovasi Digital ditandatangani.",
    date: "4 Agustus 2026",
  },
  {
    title: "Kolaborasi ekosistem UMKM",
    description:
      "Saya melakukan pertemuan dan menyusun komitmen kolaborasi bersama Rumah BUMN Makassar.",
  },
  {
    title: "Talenta akademik dan penjajakan komunitas",
    description:
      "Mobilisasi talenta akademik dan penjajakan dukungan komunitas terus berjalan.",
  },
] as const;

export const partnershipSummary = {
  supportingInstitutions: partners.length,
  signedMous: partners.filter((partner) => partner.status === "mou-signed")
    .length,
  officialDigitalPartners: partners.filter(
    (partner) =>
      partner.category === "Digital Infrastructure" ||
      partner.category === "Digital Learning",
  ).length,
  venueOptions: partners.filter(
    (partner) => partner.category === "Venue & Creative Space",
  ).length,
  quantifiedInKindValue: partners.reduce(
    (total, partner) => total + (partner.inKindValue ?? 0),
    0,
  ),
} as const;

export const partnershipProgressDescription =
  "Pada Week 2, saya membangun ekosistem dukungan lintas program, UMKM, pembelajaran digital, infrastruktur, venue, ruang kreatif, dan talenta akademik. Saya memperoleh dukungan pembelajaran Dicoding Indonesia senilai Rp15.000.000 serta dukungan infrastruktur Inovasi Digital senilai Rp2.525.000. Total dukungan in-kind yang saya bangun mencapai Rp17.525.000. Saya juga mengoordinasikan kolaborasi bersama Rumah BUMN Makassar, Komdigi Makassar, Makassar Creative Hub, Informatika Unhas, dan ekosistem program untuk mendukung pelaksanaan AI Co-Creation Lab Makassar.";

export const partnershipReportOutputs = [
  "Pemetaan sembilan institusi pendukung dan perannya.",
  "Dua kerja sama digital melalui MoU.",
  "Koordinasi venue utama dan ruang kreatif.",
  "Galeri pertemuan Rumah BUMN Makassar dan publikasi Makassar Creative Hub.",
  "Nilai dukungan in-kind sebesar Rp17.525.000.",
  "Rencana tindak lanjut untuk setiap kolaborasi.",
] as const;

export const partnershipLeadershipReflection = {
  quote:
    "Saya belajar bahwa kolaborasi tumbuh ketika setiap pihak memahami peran dan nilai yang dibangun bersama.",
  paragraphs: [
    "Dalam proses partnership ini, saya belajar menyatukan kebutuhan program dengan kekuatan setiap mitra. Percakapan, koordinasi, dan tindak lanjut yang konsisten membantu saya membangun dukungan yang dapat digunakan langsung dalam pelaksanaan program.",
  ],
} as const;
