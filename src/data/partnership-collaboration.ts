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
  readonly privacyNote: string;
}

export const partnershipHeader = {
  slug: "partnership-collaboration" as ProgressReportSlug,
  title: "Partnership & Collaboration",
  metadataTitle:
    "Partnership & Collaboration — AI Co-Creation Lab Makassar",
  weekLabel: "GEP WEEK 2",
  phase: "CONNECT & COLLABORATE",
  subtitle: "Building the support system behind the co-creation process.",
  status: "Partnership Building in Progress",
  nextStep: "Pitching Mini Project and Action Plan Finalization",
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
      "BAKTI NUSA menjadi bagian dari ekosistem program yang memberi ruang bagi awardee untuk belajar, menguji gagasan, dan menerjemahkan kepemimpinan menjadi aksi.",
    ],
    contributions: [
      "Kesempatan menjalankan mini project dalam konteks Global Experience Program.",
      "Ruang pembelajaran dan pengembangan kepemimpinan.",
      "Akses jejaring dan pendampingan program.",
    ],
    keyImpact:
      "A space for young leaders to learn, test ideas, and turn leadership into impact.",
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
      "GREAT Edunesia hadir dalam ekosistem yang memungkinkan proses pembelajaran, exposure, dan eksperimen kepemimpinan berkembang menjadi mini project.",
    ],
    contributions: [
      "Ekosistem pembelajaran program.",
      "Dorongan untuk menerjemahkan ide menjadi aksi.",
      "Ruang pengembangan kapasitas awardee.",
    ],
    keyImpact:
      "Learning becomes meaningful when it creates room for real action.",
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
      "Dompet Dhuafa menjadi bagian dari ekosistem program yang membuka ruang bagi talenta muda untuk belajar dan mengembangkan aksi yang bermanfaat.",
    ],
    contributions: [
      "Konteks pengembangan kepemimpinan berdampak.",
      "Ekosistem program dan akses pembelajaran.",
      "Ruang untuk menguji ide dalam aksi sosial.",
    ],
    keyImpact:
      "Leadership grows when learning is connected to useful impact.",
  },
  {
    id: "rumah-bumn-makassar",
    name: "Rumah BUMN Makassar",
    heading: "Connecting the Program to Real UMKM Needs",
    role: "UMKM Ecosystem & Implementation Partner",
    category: "UMKM Ecosystem",
    status: "commitment-documented",
    statusLabel: "Commitment Documented",
    logo: {
      src: "/logo-ecosystem/optimized/logo-rumahbumn.webp",
      alt: "Logo Rumah BUMN Makassar",
      ...wideLogoSize,
    },
    description: [
      "Rumah BUMN Makassar menjadi penghubung program dengan ekosistem UMKM dan kebutuhan penerima manfaat yang nyata.",
      "Dokumentasi pertemuan menunjukkan proses koordinasi dan komitmen kolaborasi. File MoU terpisah belum ditemukan di dalam project, sehingga status yang ditampilkan dibatasi pada komitmen yang terdokumentasi.",
    ],
    contributions: [
      "Akses dan koordinasi dengan ekosistem UMKM penerima manfaat.",
      "Dukungan proses validasi kebutuhan usaha.",
      "Komitmen kolaborasi yang didokumentasikan dalam pertemuan.",
      "Lingkungan nyata untuk menguji relevansi proses co-creation.",
    ],
    keyImpact:
      "The partnership gives the project real users, real problems, and a real environment to test the solutions.",
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
      "Dukungan Inovasi Digital memberi lima solusi digital ruang untuk diakses, diuji, dan digunakan setelah kegiatan utama.",
      "Ruang lingkup dan nilai dukungan di bawah ini mengikuti MoU yang ditemukan di dalam project.",
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
    keyImpact: "From prototype to something people can actually access.",
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
      "Dukungan pembelajaran Dicoding Indonesia memperkuat kapasitas orang-orang di balik proses co-creation.",
      "MoU yang ditemukan menyebut akses kelas gratis level dasar bagi seluruh panitia dan peserta yang terdaftar. Dokumen tidak mencantumkan nilai rupiah, jumlah akun tertentu, atau masa akses satu bulan, sehingga ketiga klaim tersebut tidak ditampilkan.",
    ],
    contributions: [
      "Akses kelas gratis level dasar.",
      "Akses bagi seluruh panitia dan peserta yang terdaftar pada event.",
      "Dukungan pembelajaran yang melengkapi proses pengembangan prototype.",
    ],
    servicePeriod: "Sesuai ketentuan akses dalam kolaborasi",
    keyImpact:
      "Infrastructure keeps the systems running. Learning keeps the people growing.",
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
      "Lokasi kegiatan utama di Komdigi Makassar telah dikonfirmasi oleh pemilik project dalam dokumen konten project.",
      "Supporting document yang ditemukan berupa surat permohonan peminjaman ruang kepada BBLSDM Komdigi Makassar, bukan surat balasan atau MoU venue.",
    ],
    contributions: [
      "Ruang pelatihan untuk kegiatan utama.",
      "Akses ruang untuk persiapan dan pengembalian fasilitas.",
      "Meja, kursi, proyektor atau layar, serta fasilitas pendukung yang tersedia sesuai koordinasi.",
      "Lingkungan pelatihan komunikasi dan digital yang relevan dengan program.",
    ],
    keyImpact:
      "A relevant space for students, UMKM, mentors, and partners to learn and build together.",
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
      "Makassar Creative Hub menjadi bagian dari persiapan program dan menyediakan ruang untuk produksi konten Global Communication.",
      "Post resmi yang tersedia di dalam project mencantumkan Produksi Konten Global Communication oleh DekatLokal pada Kamis, 6 Agustus 2026 pukul 13.00–16.00 WITA di Studio Konten.",
    ],
    contributions: [
      "Studio Konten untuk produksi Global Communication.",
      "Ruang kreatif untuk persiapan dan aktivitas program.",
      "Opsi ruang pendukung dalam ekosistem kreatif Makassar.",
    ],
    servicePeriod: "Kamis, 6 Agustus 2026",
    keyImpact:
      "A creative space that helps the program communicate, prepare, and collaborate.",
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
    statusLabel: "Academic Collaboration",
    logo: {
      src: "/logo-ecosystem/optimized/logo-informatikaunhas.webp",
      alt: "Logo Departemen Teknik Informatika Universitas Hasanuddin",
      width: 520,
      height: 520,
    },
    description: [
      "Kolaborasi akademik mempertemukan keterampilan teknis mahasiswa dengan kebutuhan nyata UMKM.",
      "Tidak ada MoU institusional yang ditemukan di dalam project, sehingga halaman tidak memberi status MoU Signed pada kolaborasi ini.",
    ],
    contributions: [
      "Akses jejaring mahasiswa aktif di bidang website dan AI.",
      "Talenta pemateri, mentor, dan co-creator untuk proses praktik.",
      "Dukungan pengetahuan teknis selama proses co-creation.",
    ],
    keyImpact:
      "Learning becomes more meaningful when technical skills meet real users.",
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
  { value: "20", label: "Students", status: "Target" },
  { value: "5", label: "Co-creation teams", status: "Target" },
  { value: "5", label: "Digital prototypes", status: "Target" },
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
    privacyNote:
      "Versi publik menyamarkan nomor telepon dan alamat privat sebelum ditampilkan atau diunduh.",
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
    privacyNote:
      "Versi publik menyamarkan nomor telepon dan alamat privat sebelum ditampilkan atau diunduh.",
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
    privacyNote:
      "Versi publik menyamarkan nomor telepon sebelum ditampilkan atau diunduh.",
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
    privacyNote:
      "Versi publik menyamarkan nomor telepon sebelum ditampilkan atau diunduh.",
  },
] as const;

export const partnershipValueItems = [
  {
    title: "Real Beneficiaries",
    description: "Akses ke lima UMKM dan kebutuhan operasional nyata.",
  },
  {
    title: "Learning Access",
    description:
      "Dukungan kelas digital untuk meningkatkan kapasitas peserta dan panitia.",
  },
  {
    title: "Long-Term Infrastructure",
    description:
      "Lima domain dan lima hosting agar prototype dapat digunakan setelah bootcamp.",
  },
  {
    title: "People & Expertise",
    description:
      "Mahasiswa, mentor, pemateri, dan co-creator dengan kemampuan yang relevan.",
  },
  {
    title: "Space to Collaborate",
    description:
      "Venue utama, ruang kreatif, dan Studio Konten untuk aktivitas program.",
  },
  {
    title: "Program Ecosystem",
    description:
      "Pembelajaran, jejaring, publikasi, dan ruang untuk menjalankan ide.",
  },
] as const;

export const partnershipTimeline = [
  {
    title: "Digital learning partnership",
    description: "MoU bersama Dicoding Indonesia ditandatangani.",
    date: "29 Juli 2026",
  },
  {
    title: "Creative space coordination",
    description:
      "Surat penggunaan tempat Makassar Creative Hub ditandatangani untuk produksi Global Communication.",
    date: "30 Juli 2026",
  },
  {
    title: "Main venue request",
    description:
      "Surat permohonan ruang dan fasilitas disampaikan kepada Komdigi Makassar.",
    date: "1 Agustus 2026",
  },
  {
    title: "Digital infrastructure partnership",
    description: "MoU bersama Inovasi Digital ditandatangani.",
    date: "4 Agustus 2026",
  },
  {
    title: "UMKM ecosystem collaboration",
    description:
      "Pertemuan dan komitmen kolaborasi bersama Rumah BUMN Makassar terdokumentasi.",
  },
  {
    title: "Academic talent and community outreach",
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
  "Progress Partnership & Collaboration Week 2 sedang berjalan melalui pembangunan ekosistem dukungan lintas program, UMKM, pembelajaran digital, infrastruktur, venue, ruang kreatif, dan talenta akademik. Dua MoU yang tersedia di dalam project telah diverifikasi, yaitu bersama Dicoding Indonesia untuk akses kelas level dasar bagi panitia dan peserta terdaftar serta bersama Inovasi Digital untuk lima domain .web.id, lima hosting Starter, dan layanan selama 12 bulan sejak aktivasi dengan nilai in-kind Rp2.525.000. Dokumentasi komitmen Rumah BUMN Makassar, surat venue Komdigi Makassar, publikasi jadwal dan surat penggunaan Makassar Creative Hub, serta logo ekosistem program juga telah ditata sebagai evidence publik. Nilai dukungan Dicoding tidak dijumlahkan karena MoU yang ditemukan tidak mencantumkan nilai rupiah. Penjajakan kolaborasi dan community support tetap berlangsung.";

export const partnershipReportOutputs = [
  "Pemetaan sembilan institusi pendukung dan perannya.",
  "Dua MoU yang telah diverifikasi dari file project.",
  "Dua supporting document untuk venue dan ruang kreatif.",
  "Galeri pertemuan Rumah BUMN Makassar dan publikasi Makassar Creative Hub.",
  "Nilai dukungan in-kind terkuantifikasi sebesar Rp2.525.000.",
  "Batas evidence yang membedakan komitmen, MoU, dan dukungan program.",
] as const;

export const partnershipLeadershipReflection = {
  quote:
    "Kolaborasi tidak tumbuh dari daftar logo. Kolaborasi tumbuh ketika setiap pihak memahami peran, batas, dan nilai yang dibangun bersama.",
  paragraphs: [
    "Proses partnership mengajarkan pentingnya mendokumentasikan komitmen secara proporsional. MoU, surat, pertemuan, dan publikasi memiliki kekuatan bukti yang berbeda, sehingga status setiap mitra harus disampaikan sesuai evidence yang benar-benar tersedia.",
  ],
} as const;
