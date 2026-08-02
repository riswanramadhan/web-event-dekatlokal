export type CommunitySupportBankId = "bsi" | "mandiri";

export type CommunitySupportBank = {
  readonly id: CommunitySupportBankId;
  readonly name: string;
  readonly accountNumber: string;
  readonly accountHolder: string;
  readonly logo: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
  };
};

export type CommunitySupportMetric = {
  readonly value: string;
  readonly label: string;
};

export type CommunitySupportAllocation = {
  readonly title: string;
  readonly description: string;
  readonly icon: "meal" | "identity" | "kit" | "documentation" | "development" | "operations";
};

export const communitySupportContent = {
  event: {
    name: "AI Co-Creation Lab Makassar",
    date: "10 Agustus 2026",
    route: "/ai-co-creation-lab-makassar",
    proposalUrl:
      "https://event.dekatlokal.com/ai-co-creation-lab-makassar/sponsorship-proposal",
  },
  hero: {
    eyebrow: "Community-powered · 10 Agustus 2026",
    title: "Let’s Build Something Useful, Together.",
    description:
      "AI Co-Creation Lab Makassar dirancang untuk mempertemukan target 20 mahasiswa dan 5 UMKM untuk build 5 solusi digital dari real business problems.",
    invitation:
      "Tanggal, venue, dan format programnya sudah disiapkan. Sekarang kami membuka ruang buat teman-teman yang ingin ikut support perjalanan ini.",
    primaryCta: "Support the Event",
    secondaryCta: "View Full Proposal",
    targetLabel: "Target program · planned outcome",
    metrics: [
      { value: "20", label: "Students" },
      { value: "5", label: "Local Businesses" },
      { value: "5", label: "Digital Prototypes" },
      { value: "1", label: "Collaborative Lab" },
    ] satisfies readonly CommunitySupportMetric[],
  },
  why: {
    eyebrow: "Why now",
    title: "Why Community Support?",
    paragraphs: [
      "Sebagian brand dan sponsor kami masih dalam proses, sementara hari pelaksanaan semakin dekat.",
      "Instead of just waiting, kami membuka ruang buat teman, alumni, komunitas, dan siapa pun yang percaya pada program ini untuk ikut terlibat.",
      "Nggak harus dengan nominal besar. Small support, sharing this page, atau menghubungkan kami dengan partner yang tepat juga sangat berarti.",
    ],
    highlight: "Small support. Real collaboration. Useful impact.",
  },
  allocations: {
    eyebrow: "Transparent by design",
    title: "Your Support Goes Here",
    description:
      "Dukungan dipakai untuk kebutuhan pelaksanaan yang langsung membantu peserta dan tim bekerja dengan nyaman.",
    items: [
      {
        title: "Konsumsi kegiatan",
        description: "Untuk peserta, UMKM, mentor, dan panitia.",
        icon: "meal",
      },
      {
        title: "Identitas peserta",
        description: "ID card, lanyard, dan kebutuhan identitas kegiatan.",
        icon: "identity",
      },
      {
        title: "Participant kit",
        description: "Kit dan perlengkapan yang dipakai selama sesi.",
        icon: "kit",
      },
      {
        title: "Dokumentasi & publikasi",
        description: "Dokumentasi proses, hasil, dan cerita kolaborasi.",
        icon: "documentation",
      },
      {
        title: "Development & demo",
        description: "Kebutuhan teknis untuk membangun dan mendemokan prototype.",
        icon: "development",
      },
      {
        title: "Operasional dasar",
        description: "Kebutuhan lapangan agar event berjalan dengan rapi.",
        icon: "operations",
      },
    ] satisfies readonly CommunitySupportAllocation[],
    transparency:
      "Setelah event selesai, kami akan membagikan dokumentasi, hasil prototype, dan laporan singkat penggunaan dukungan secara transparan untuk teman-teman semua.",
  },
  accounts: {
    eyebrow: "Transfer details",
    title: "Choose Where to Send Your Support",
    description:
      "Pilih salah satu rekening resmi di bawah. Nominal support sepenuhnya kamu yang tentukan.",
    warning:
      "Pastikan nama penerima yang muncul adalah Riswan Ramadhan sebelum menyelesaikan transfer.",
    banks: [
      {
        id: "bsi",
        name: "Bank Syariah Indonesia",
        accountNumber: "7341301558",
        accountHolder: "Riswan Ramadhan",
        logo: {
          src: "/bank-logos/bank-syariah-indonesia.webp",
          width: 960,
          height: 268,
        },
      },
      {
        id: "mandiri",
        name: "Bank Mandiri",
        accountNumber: "1520031989276",
        accountHolder: "Riswan Ramadhan",
        logo: {
          src: "/bank-logos/bank-mandiri.webp",
          width: 3840,
          height: 1121,
        },
      },
    ] satisfies readonly CommunitySupportBank[],
  },
  form: {
    eyebrow: "One last step",
    title: "Tell Us About Your Support",
    description:
      "Setelah transfer, isi form singkat ini. Begitu terkirim, support kamu langsung tercatat dan kamu akan menerima reference code.",
  },
} as const;

export const communitySupportBankNames: Readonly<
  Record<CommunitySupportBankId, string>
> = {
  bsi: "Bank Syariah Indonesia",
  mandiri: "Bank Mandiri",
};
