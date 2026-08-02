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

export const communitySupportContent = {
  event: {
    name: "AI Co-Creation Lab Makassar",
    date: "10 Agustus 2026",
    route: "/ai-co-creation-lab-makassar",
    proposalUrl:
      "https://event.dekatlokal.com/ai-co-creation-lab-makassar/sponsorship-proposal",
  },
  hero: {
    eyebrow: "Community Support | 10 Agustus 2026",
    title: "Dukung AI Co-Creation Lab Makassar.",
    description:
      "Bantu kebutuhan pelaksanaan program yang mempertemukan mahasiswa dan UMKM untuk membangun solusi digital dari masalah bisnis nyata.",
    primaryCta: "Lihat Rekening Support",
    secondaryCta: "Lihat Proposal",
  },
  supportFocus: {
    title: "Support untuk kebutuhan inti program",
    description:
      "Dukungan digunakan langsung untuk membantu peserta dan tim menjalankan sesi kolaborasi dengan baik.",
    items: [
      "Konsumsi dan kebutuhan peserta",
      "Participant kit dan perlengkapan sesi",
      "Dokumentasi, demo, dan operasional teknis",
    ],
    transparency:
      "Ringkasan penggunaan dukungan akan dibagikan setelah acara.",
  },
  accounts: {
    eyebrow: "Rekening support",
    title: "Pilih Rekening Tujuan",
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
    eyebrow: "Konfirmasi support",
    title: "Kirim Bukti Support",
    description:
      "Setelah transfer, isi form singkat ini. Begitu tersimpan, popup terima kasih dan CTA WhatsApp langsung muncul.",
  },
} as const;

export const communitySupportBankNames: Readonly<
  Record<CommunitySupportBankId, string>
> = {
  bsi: "Bank Syariah Indonesia",
  mandiri: "Bank Mandiri",
};
