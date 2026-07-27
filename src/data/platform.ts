export type PlatformFeatureStatus = "available" | "coming_soon";

export interface PlatformNavigationItem {
  readonly label: string;
  readonly href: string;
}

export interface PlatformFeature {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: PlatformFeatureStatus;
  readonly statusLabel: string;
}

export interface PlatformAudience {
  readonly id: string;
  readonly label: string;
  readonly description: string;
}

export interface PlatformContact {
  readonly email: string | null;
  readonly whatsapp: string | null;
  readonly status: "not_configured" | "configured";
  readonly statusLabel: string;
}

export interface PlatformConfig {
  readonly name: string;
  readonly owner: string;
  readonly tagline: string;
  readonly description: string;
  readonly vision: string;
  readonly primaryDomain: string;
  readonly primaryColor: `#${string}`;
  readonly mainSite: {
    readonly href: string;
    readonly label: string;
  };
  readonly navigation: readonly PlatformNavigationItem[];
  readonly features: readonly PlatformFeature[];
  readonly audiences: readonly PlatformAudience[];
  readonly contact: PlatformContact;
  readonly footer: {
    readonly description: string;
    readonly links: readonly PlatformNavigationItem[];
    readonly attribution: string;
  };
}

export const platform = {
  name: "DekatEvent.",
  owner: "DekatLokal",
  tagline: "Kelola Acara, Hubungkan Peserta, Ukur Dampaknya.",
  description:
    "Platform event DekatLokal untuk menemukan informasi acara dan mendaftar melalui alur yang jelas, aman, dan ramah perangkat mobile.",
  vision:
    "Menjadi platform event lokal yang membantu penyelenggara membangun pengalaman, dokumentasi, dan dampak yang terukur.",
  primaryDomain: "event.dekatlokal.com",
  primaryColor: "#0255F5",
  mainSite: {
    href: "https://dekatlokal.com",
    label: "Kunjungi dekatlokal.com",
  },
  navigation: [
    { label: "Beranda", href: "/" },
    { label: "Event", href: "/events" },
    { label: "Privasi", href: "/privacy" },
    { label: "Ketentuan", href: "/terms" },
  ],
  features: [
    {
      id: "event-page",
      title: "Halaman acara yang terpusat",
      description:
        "Informasi, alur kegiatan, dan panggilan aksi disajikan dalam satu halaman yang mudah dibagikan.",
      status: "available",
      statusLabel: "Tersedia pada MVP",
    },
    {
      id: "registration",
      title: "Pendaftaran yang terstruktur",
      description:
        "Jalur aplikasi dapat disesuaikan dengan peran peserta tanpa menampilkan data pribadi ke publik.",
      status: "available",
      statusLabel: "Tersedia pada MVP",
    },
    {
      id: "organizer-dashboard",
      title: "Dashboard penyelenggara",
      description:
        "Pengelolaan event mandiri dan analitik lintas acara direncanakan untuk pengembangan berikutnya.",
      status: "coming_soon",
      statusLabel: "Segera Hadir",
    },
    {
      id: "paid-events",
      title: "Event berbayar",
      description:
        "Pembayaran tiket dan pengembalian dana belum menjadi bagian dari MVP.",
      status: "coming_soon",
      statusLabel: "Segera Hadir",
    },
  ],
  audiences: [
    {
      id: "communities",
      label: "Komunitas",
      description:
        "Untuk kegiatan yang membutuhkan informasi, pendaftaran, dan dokumentasi yang rapi.",
    },
    {
      id: "student-organizations",
      label: "Organisasi mahasiswa",
      description:
        "Untuk program kampus, pengembangan kepemimpinan, dan project sosial.",
    },
    {
      id: "education",
      label: "Kampus dan sekolah",
      description:
        "Untuk workshop, program pendampingan, dan kolaborasi dengan mitra.",
    },
    {
      id: "social-programs",
      label: "Program sosial dan UMKM",
      description:
        "Untuk kegiatan berbasis kebutuhan lokal dengan target dampak yang dapat dipantau.",
    },
  ],
  contact: {
    email: "hello@dekatlokal.com",
    whatsapp: "0895 1633 5023",
    status: "configured",
    statusLabel: "Kontak penyelenggara aktif",
  },
  footer: {
    description:
      "Platform event DekatLokal untuk informasi acara dan pendaftaran yang lebih mudah diakses.",
    links: [
      { label: "Event", href: "/events" },
      { label: "Privasi", href: "/privacy" },
      { label: "Ketentuan", href: "/terms" },
      { label: "Kunjungi dekatlokal.com", href: "https://dekatlokal.com" },
    ],
    attribution: "Powered by DekatLokal",
  },
} as const satisfies PlatformConfig;

export const platformConfig = platform;
