export type EventStatus =
  | "draft"
  | "registration_open"
  | "registration_closed"
  | "ongoing"
  | "completed"
  | "archived";

export type RegistrationStatus = "not_open" | "open" | "closed";
export type ConfirmationStatus =
  | "confirmed"
  | "in_process"
  | "unconfirmed";
export type RegistrationRole = "student" | "umkm";
export type PartnerRole =
  | "initiator"
  | "supporter"
  | "venue_partner"
  | "challenge_partner"
  | "knowledge_partner";

export interface EventRouteMap {
  readonly detail: string;
  readonly register: string;
  readonly registerStudent: string;
  readonly registerUmkm: string;
  readonly registrationSuccess: string;
  readonly journey: string;
  readonly challenges: string;
  readonly teams: string;
  readonly documentation: string;
  readonly impact: string;
}

export interface EventTargetMetric {
  readonly id: string;
  readonly label: string;
  readonly target: number;
  readonly unit: string;
  readonly kind: "target";
}

export interface EventStep {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface EventRundownItem {
  readonly id: string;
  readonly time: string;
  readonly title: string;
  readonly description: string;
}

export interface EventPartner {
  readonly id: string;
  readonly name: string;
  readonly role: PartnerRole;
  readonly roleLabel: string;
  readonly status: ConfirmationStatus;
  readonly statusLabel: string;
  readonly approved: boolean;
  readonly logo: {
    readonly src: string;
    readonly alt: string;
  } | null;
  readonly fallbackLabel: string;
}

export interface EventImageAsset {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface EventEcosystemMember {
  readonly id: string;
  readonly name: string;
  readonly approvedForDisplay: true;
  readonly cluster: "main" | "bumn";
  readonly logo: EventImageAsset;
}

export interface EventRegistrationOption {
  readonly role: RegistrationRole;
  readonly title: string;
  readonly shortTitle: string;
  readonly description: string;
  readonly href: string;
  readonly enabled: boolean;
}

export interface EventLandingSection {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

export interface EventConfig {
  readonly id: string;
  readonly slug: string;
  readonly route: string;
  readonly title: string;
  readonly tagline: string;
  readonly description: string;
  readonly featuredSummary: string;
  readonly branding: {
    readonly logo: EventImageAsset;
  };
  readonly status: EventStatus;
  readonly statusLabel: string;
  readonly registrationOpen: boolean;
  readonly registrationStatus: RegistrationStatus;
  readonly registrationStatusLabel: string;
  readonly fee: {
    readonly amount: 0;
    readonly currency: "IDR";
    readonly displayValue: "Gratis";
  };
  readonly capacity: {
    readonly total: number;
    readonly statusLabel: string;
  };
  readonly date: {
    readonly value: string | null;
    readonly displayValue: string;
    readonly status: ConfirmationStatus;
  };
  readonly location: {
    readonly name: string | null;
    readonly address: string | null;
    readonly city: string;
    readonly displayValue: string;
    readonly status: ConfirmationStatus;
  };
  readonly projectPeriod: {
    readonly value: string | null;
    readonly displayValue: string;
    readonly status: ConfirmationStatus;
  };
  readonly mainActivity: {
    readonly startTime: string;
    readonly endTime: string;
    readonly timezone: string;
    readonly displayTime: string;
    readonly durationMinutes: number;
    readonly format: string;
  };
  readonly heroMetrics: readonly EventTargetMetric[];
  readonly formatFacts: readonly {
    readonly label: string;
    readonly value: string;
  }[];
  readonly routes: EventRouteMap;
  readonly registrationRoles: readonly EventRegistrationOption[];
  readonly registrationNotice: string;
  readonly privacyNotice: string;
  readonly landingSections: {
    readonly whyItMatters: EventLandingSection;
    readonly problem: EventLandingSection;
    readonly concept: EventLandingSection;
    readonly eventFlow: EventLandingSection;
    readonly participantComposition: EventLandingSection;
    readonly partnership: EventLandingSection;
    readonly registrationCta: EventLandingSection;
  };
  readonly sponsorship: EventLandingSection & {
    readonly placeholderLabel: "Your Brand";
    readonly ctaLabel: string;
    readonly ctaHref: `mailto:${string}`;
  };
  readonly supportingEcosystem: EventLandingSection & {
    readonly disclaimer: string;
    readonly members: readonly EventEcosystemMember[];
  };
  readonly problem: string;
  readonly solution: string;
  readonly importantLimitation: string;
  readonly howItWorks: readonly EventStep[];
  readonly participantComposition: readonly {
    readonly id: RegistrationRole;
    readonly label: string;
    readonly target: number;
    readonly unit: string;
    readonly description: string;
  }[];
  readonly teamRoles: readonly string[];
  readonly benefits: {
    readonly student: readonly string[];
    readonly umkm: readonly string[];
  };
  readonly criteria: {
    readonly student: readonly string[];
    readonly umkm: readonly string[];
  };
  readonly rundown: readonly EventRundownItem[];
  readonly partners: readonly EventPartner[];
  readonly programContext: {
    readonly label: string;
    readonly name: string;
    readonly isActivePartnerClaim: false;
    readonly logo: null;
  };
}

const eventBaseRoute = "/ai-co-creation-lab-makassar";

export const aiCoCreationLabEvent = {
  id: "ai-co-creation-lab-makassar",
  slug: "ai-co-creation-lab-makassar",
  route: eventBaseRoute,
  title: "AI Co Creation Lab Makassar",
  tagline: "From AI Users to Local Problem Solvers",
  description:
    "Program praktik satu hari yang mempertemukan 20 mahasiswa dan 5 UMKM untuk meracik solusi AI yang simpel, aman, dan relevan bagi kebutuhan usaha nyata.",
  featuredSummary:
    "20 mahasiswa dan 5 UMKM satu meja, bongkar masalah usaha yang real, lalu bikin solusi AI yang bisa langsung dicoba.",
  branding: {
    logo: {
      src: "/event-brand/ai-co-creation-lab-makassar.webp",
      alt: "Logo AI Co Creation Lab Makassar, From AI Users to Local Problem Solvers",
      width: 1000,
      height: 268,
    },
  },
  status: "registration_open",
  statusLabel: "Pendaftaran Dibuka",
  registrationOpen: true,
  registrationStatus: "open",
  registrationStatusLabel: "Pendaftaran Dibuka",
  fee: {
    amount: 0,
    currency: "IDR",
    displayValue: "Gratis",
  },
  capacity: {
    total: 25,
    statusLabel: "Kuota terbatas",
  },
  date: {
    value: "2026-08-10",
    displayValue: "10 Agustus 2026",
    status: "confirmed",
  },
  location: {
    name: "Balai Besar Pelatihan Komunikasi dan Digital Makassar (KOMDIGI)",
    address: null,
    city: "Makassar",
    displayValue:
      "Balai Besar Pelatihan Komunikasi dan Digital Makassar (KOMDIGI)",
    status: "confirmed",
  },
  projectPeriod: {
    value: null,
    displayValue: "Dalam Proses Penetapan",
    status: "unconfirmed",
  },
  mainActivity: {
    startTime: "13.00",
    endTime: "16.30",
    timezone: "WITA",
    displayTime: "13.00 sampai 16.30 WITA",
    durationMinutes: 210,
    format: "Bootcamp dan co creation",
  },
  heroMetrics: [
    {
      id: "students",
      label: "Mahasiswa",
      target: 20,
      unit: "orang",
      kind: "target",
    },
    {
      id: "umkm",
      label: "UMKM",
      target: 5,
      unit: "usaha",
      kind: "target",
    },
    {
      id: "teams",
      label: "Tim",
      target: 4,
      unit: "tim",
      kind: "target",
    },
    {
      id: "ai-solutions",
      label: "Solusi AI",
      target: 4,
      unit: "solusi",
      kind: "target",
    },
  ],
  formatFacts: [
    { label: "Kegiatan utama", value: "1 sesi" },
    { label: "Durasi pelaksanaan", value: "3,5 jam" },
  ],
  routes: {
    detail: eventBaseRoute,
    register: `${eventBaseRoute}/register`,
    registerStudent: `${eventBaseRoute}/register/student`,
    registerUmkm: `${eventBaseRoute}/register/umkm`,
    registrationSuccess: `${eventBaseRoute}/register/success`,
    journey: `${eventBaseRoute}/journey`,
    challenges: `${eventBaseRoute}/challenges`,
    teams: `${eventBaseRoute}/teams`,
    documentation: `${eventBaseRoute}/documentation`,
    impact: `${eventBaseRoute}/impact`,
  },
  registrationRoles: [
    {
      role: "student",
      title: "Mahasiswa, Problem Solver",
      shortTitle: "Mahasiswa",
      description:
        "Ceritakan kemampuan, pengalaman AI, perangkat, dan peran yang paling sesuai untuk berkolaborasi dengan UMKM.",
      href: `${eventBaseRoute}/register/student`,
      enabled: false,
    },
    {
      role: "umkm",
      title: "UMKM, Challenge Partner",
      shortTitle: "UMKM",
      description:
        "Ceritakan proses usaha yang berulang atau masalah yang ingin dibantu melalui AI.",
      href: `${eventBaseRoute}/register/umkm`,
      enabled: false,
    },
  ],
  registrationNotice:
    "Pendaftaran merupakan tahap aplikasi. Peserta terpilih akan dikonfirmasi melalui kontak yang diberikan.",
  privacyNotice:
    "Data pendaftaran hanya digunakan untuk seleksi dan penyelenggaraan event. Jangan mengirimkan data rahasia atau data pribadi milik orang lain.",
  landingSections: {
    whyItMatters: {
      eyebrow: "Mengapa program ini penting",
      title: "AI makin seru kalau hasilnya benar benar kepakai.",
      description:
        "Di sini, rasa penasaran mahasiswa bertemu langsung dengan tantangan harian pelaku UMKM.",
    },
    problem: {
      eyebrow: "Masalah yang dijawab",
      title: "Akses AI ada. Masalah usaha juga ada. Keduanya perlu satu meja.",
      description:
        "Mahasiswa butuh pengalaman memecahkan masalah nyata, sementara UMKM butuh solusi yang praktis, mudah dipahami, dan tidak bikin tambah ribet.",
    },
    concept: {
      eyebrow: "Konsep program",
      title: "Dengar masalahnya, bikin bareng, lalu tes sampai kepakai.",
      description:
        "Setiap tim memahami kebutuhan UMKM, membuat alur kerja atau prototype sederhana, mengujinya bersama, lalu menyiapkan panduan yang ramah smartphone.",
    },
    eventFlow: {
      eyebrow: "Alur kegiatan",
      title: "Enam tahap dari validasi hingga monitoring.",
      description:
        "Kebutuhan dan kemampuan dipetakan sebelum kegiatan agar waktu kolaborasi dapat dipakai untuk membuat hasil yang relevan dan aman.",
    },
    participantComposition: {
      eyebrow: "Komposisi peserta",
      title: "20 mahasiswa, 5 UMKM, dan banyak ide yang siap diuji.",
      description:
        "Peserta bekerja lintas peran dengan fokus pada kebutuhan usaha yang nyata, terukur, dan aman untuk dikerjakan.",
    },
    partnership: {
      eyebrow: "Kolaborasi",
      title: "Partnership dibangun dengan status yang transparan.",
      description:
        "Nama dan logo mitra hanya ditampilkan sebagai mitra aktif setelah memperoleh persetujuan. Kandidat yang belum final tetap diberi status proses.",
    },
    registrationCta: {
      eyebrow: "Ambil bagian",
      title: "Pilih peranmu, lalu bawa energi terbaikmu.",
      description:
        "Pendaftaran adalah tahap aplikasi dan tidak berarti penerimaan otomatis. Status pembukaan akan diperbarui setelah kesiapan pendaftaran selesai.",
    },
  },
  sponsorship: {
    eyebrow: "Sponsorship",
    title: "Biar ide bagus ini bisa jalan lebih jauh, brand kamu bisa ikut ambil bagian.",
    description:
      "Dukung ruang belajar dan co creation bagi mahasiswa serta UMKM lokal melalui kontribusi yang relevan dan transparan.",
    placeholderLabel: "Your Brand",
    ctaLabel: "Jadi Supporting Partner",
    ctaHref:
      "mailto:hello@dekatlokal.com?subject=Kolaborasi%20AI%20Co%20Creation%20Lab%20Makassar",
  },
  supportingEcosystem: {
    eyebrow: "Our Supporting Ecosystem",
    title: "Banyak pihak, satu semangat untuk tumbuh bareng.",
    description:
      "AI Co Creation Lab Makassar tumbuh dari kolaborasi mahasiswa, UMKM, institusi, perusahaan, dan komunitas yang peduli pada talenta muda serta digitalisasi usaha lokal.",
    disclaimer:
      "Logo ditampilkan sebagai bagian dari ecosystem program dan konteks kolaborasi, bukan sebagai daftar sponsor acara.",
    members: [
      {
        id: "dekatlokal",
        name: "DekatLokal",
        approvedForDisplay: true,
        cluster: "main",
        logo: {
          src: "/logo-ecosystem/optimized/logo-dekatlokal.webp",
          alt: "Logo DekatLokal",
          width: 900,
          height: 372,
        },
      },
      {
        id: "bakti-nusa",
        name: "BAKTI NUSA",
        approvedForDisplay: true,
        cluster: "main",
        logo: {
          src: "/logo-ecosystem/optimized/logo-baktinusa.webp",
          alt: "Logo BAKTI NUSA",
          width: 900,
          height: 372,
        },
      },
      {
        id: "dompet-dhuafa",
        name: "Dompet Dhuafa",
        approvedForDisplay: true,
        cluster: "main",
        logo: {
          src: "/logo-ecosystem/optimized/logo-dompetdhuafa.webp",
          alt: "Logo Dompet Dhuafa",
          width: 900,
          height: 372,
        },
      },
      {
        id: "komdigi-makassar",
        name: "KOMDIGI Makassar",
        approvedForDisplay: true,
        cluster: "main",
        logo: {
          src: "/logo-ecosystem/optimized/logo-komdigimakassar.webp",
          alt: "Logo KOMDIGI Makassar",
          width: 900,
          height: 372,
        },
      },
      {
        id: "informatika-unhas",
        name: "Departemen Teknik Informatika Universitas Hasanuddin",
        approvedForDisplay: true,
        cluster: "main",
        logo: {
          src: "/logo-ecosystem/optimized/logo-informatikaunhas.webp",
          alt: "Logo Departemen Teknik Informatika Universitas Hasanuddin",
          width: 520,
          height: 520,
        },
      },
      {
        id: "great-edunesia",
        name: "GREAT Edunesia",
        approvedForDisplay: true,
        cluster: "main",
        logo: {
          src: "/logo-ecosystem/optimized/logo-great.webp",
          alt: "Logo GREAT Edunesia",
          width: 900,
          height: 372,
        },
      },
      {
        id: "danantara-indonesia",
        name: "Danantara Indonesia",
        approvedForDisplay: true,
        cluster: "bumn",
        logo: {
          src: "/logo-ecosystem/optimized/logo-danantara.webp",
          alt: "Logo Danantara Indonesia",
          width: 900,
          height: 372,
        },
      },
      {
        id: "rumah-bumn-makassar",
        name: "Rumah BUMN Makassar",
        approvedForDisplay: true,
        cluster: "bumn",
        logo: {
          src: "/logo-ecosystem/optimized/logo-rumahbumn.webp",
          alt: "Logo Rumah BUMN Makassar",
          width: 900,
          height: 372,
        },
      },
      {
        id: "bri",
        name: "Bank Rakyat Indonesia",
        approvedForDisplay: true,
        cluster: "bumn",
        logo: {
          src: "/logo-ecosystem/optimized/logo-bri.webp",
          alt: "Logo Bank Rakyat Indonesia",
          width: 900,
          height: 372,
        },
      },
    ],
  },
  problem:
    "Mahasiswa telah menggunakan AI untuk berbagai kebutuhan, tetapi belum semuanya memiliki pengalaman mengubah teknologi tersebut menjadi solusi bagi pengguna nyata. Pada sisi lain, pelaku UMKM memiliki permasalahan usaha yang dapat dibantu AI, tetapi terkendala perangkat, waktu, literasi, atau pendampingan.",
  solution:
    "AI Co Creation Lab Makassar mempertemukan mahasiswa dan UMKM dalam tim kolaborasi. Setiap tim memahami satu masalah, menyusun alur kerja atau prototype sederhana, menguji hasil bersama UMKM, lalu menyerahkan panduan yang dapat digunakan kembali melalui smartphone.",
  importantLimitation:
    "Program tidak menjanjikan pembangunan aplikasi kompleks dalam satu hari. Target kegiatan adalah solusi AI sederhana, relevan, aman, dapat diuji, dan dapat digunakan ulang.",
  howItWorks: [
    {
      id: "need-validation",
      title: "Validasi kebutuhan UMKM",
      description: "Masalah usaha diidentifikasi sebelum kegiatan.",
    },
    {
      id: "student-mapping",
      title: "Pemetaan kemampuan mahasiswa",
      description:
        "Peserta dipilih berdasarkan kemampuan, perangkat, dan peran.",
    },
    {
      id: "shared-bootcamp",
      title: "Bootcamp bersama",
      description:
        "Mahasiswa dan UMKM memahami AI, problem framing, verification, privacy, dan responsible use.",
    },
    {
      id: "co-creation",
      title: "Co creation",
      description:
        "Setiap tim merancang solusi bersama challenge partner.",
    },
    {
      id: "testing-handover",
      title: "Testing dan handover",
      description: "UMKM mencoba hasil dan menerima panduan.",
    },
    {
      id: "monitoring",
      title: "Monitoring",
      description: "Penggunaan solusi dipantau setelah kegiatan.",
    },
  ],
  participantComposition: [
    {
      id: "student",
      label: "Mahasiswa problem solver",
      target: 20,
      unit: "orang",
      description:
        "Berkolaborasi dalam peran problem framing, AI workflow, quality and ethics, serta dokumentasi.",
    },
    {
      id: "umkm",
      label: "UMKM challenge partner",
      target: 5,
      unit: "usaha",
      description:
        "Membawa kebutuhan usaha untuk divalidasi, diuji, dan dipantau bersama tim.",
    },
  ],
  teamRoles: [
    "Problem Facilitator",
    "AI Workflow Builder",
    "Quality & Ethics Reviewer",
    "Documentation & Trainer",
  ],
  benefits: {
    student: [
      "Pengalaman menyelesaikan masalah nyata.",
      "Praktik membangun AI workflow.",
      "Pengalaman berkolaborasi dengan UMKM.",
      "Bahan portfolio project.",
      "Kesadaran responsible AI.",
      "Networking.",
    ],
    umkm: [
      "Belajar AI melalui kasus usaha sendiri.",
      "Didampingi mahasiswa yang membawa perangkat.",
      "Memperoleh workflow atau prototype sederhana.",
      "Mencoba solusi secara langsung.",
      "Menerima panduan penggunaan melalui smartphone.",
      "Mendapat monitoring setelah kegiatan.",
    ],
  },
  criteria: {
    student: [
      "Bersedia mengikuti rangkaian kegiatan pada 10 Agustus 2026 pukul 13.00 sampai 16.30 WITA.",
      "Bersedia bekerja dalam tim dan berinteraksi langsung dengan pelaku UMKM.",
      "Menjelaskan pengalaman AI, kemampuan utama, pilihan peran, dan ketersediaan perangkat secara jujur.",
      "Berkomitmen menjaga privasi serta memverifikasi hasil yang dibantu AI.",
    ],
    umkm: [
      "Memiliki proses usaha berulang atau kebutuhan yang ingin divalidasi bersama.",
      "Bersedia mengikuti kegiatan penuh pada 10 Agustus 2026 pukul 13.00 sampai 16.30 WITA.",
      "Bersedia mencoba hasil dan mengikuti monitoring setelah kegiatan.",
      "Tidak membagikan identitas pelanggan, data transaksi rahasia, nomor rekening, atau informasi sensitif lainnya.",
    ],
  },
  rundown: [
    {
      id: "main-session",
      time: "13.00 sampai 16.30",
      title: "Bootcamp dan co creation",
      description:
        "Rangkaian pembelajaran, perumusan masalah, co creation, pengujian, dan penutupan. Pembagian waktu setiap sesi akan diumumkan setelah agenda final.",
    },
  ],
  partners: [
    {
      id: "dekatlokal",
      name: "DekatLokal",
      role: "initiator",
      roleLabel: "Diinisiasi oleh",
      status: "confirmed",
      statusLabel: "Dikonfirmasi",
      approved: true,
      logo: null,
      fallbackLabel: "DekatLokal",
    },
    {
      id: "potential-main-partner",
      name: "Rumah BUMN Makassar",
      role: "supporter",
      roleLabel: "Calon mitra utama",
      status: "in_process",
      statusLabel: "Dalam Proses Konfirmasi",
      approved: false,
      logo: null,
      fallbackLabel: "Mitra utama dalam proses konfirmasi",
    },
    {
      id: "potential-venue-partner",
      name: "Komdigi atau unit terkait",
      role: "venue_partner",
      roleLabel: "Calon mitra tempat",
      status: "unconfirmed",
      statusLabel: "Belum Dikonfirmasi",
      approved: false,
      logo: null,
      fallbackLabel: "Mitra tempat belum dikonfirmasi",
    },
  ],
  programContext: {
    label: "Konteks program",
    name: "Global Experience Program BAKTI NUSA 2026",
    isActivePartnerClaim: false,
    logo: null,
  },
} as const satisfies EventConfig;

export const events = [aiCoCreationLabEvent] as const;
export const featuredEvent = aiCoCreationLabEvent;
export const eventBySlug: Readonly<Record<string, EventConfig>> = {
  [aiCoCreationLabEvent.slug]: aiCoCreationLabEvent,
};

export const approvedEventPartners: readonly EventPartner[] =
  aiCoCreationLabEvent.partners.filter((partner) => partner.approved);

export function getEventBySlug(slug: string): EventConfig | undefined {
  return eventBySlug[slug];
}
