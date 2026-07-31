import { sponsorshipSupportCategories } from "@/data/sponsorship-support";

export type SponsorshipProposalPage = {
  pageNumber: number;
  imageSrc: string;
  alt: string;
};

/**
 * One entry per page of `public/sponsorship-proposal.pdf`, pre-rendered to
 * WebP (see scripts/render-sponsorship-proposal-pages) so the flipbook never
 * has to load a PDF renderer client-side. Regenerate the images and update
 * this list together whenever the source PDF changes.
 */
export const sponsorshipProposalPages: SponsorshipProposalPage[] = [
  { pageNumber: 1, alt: "Sampul depan: Sponsorship & Collaboration Proposal, AI Co-Creation Lab Makassar." },
  { pageNumber: 2, alt: "Halaman pembatas dengan logo AI Co-Creation Lab Makassar." },
  { pageNumber: 3, alt: "Tentang Program: gambaran umum AI Co-Creation Lab Makassar." },
  { pageNumber: 4, alt: "Latar Belakang: pemanfaatan AI di kalangan mahasiswa dan UMKM." },
  { pageNumber: 5, alt: "Kondisi mahasiswa dan UMKM saat ini terkait adopsi AI." },
  { pageNumber: 6, alt: "Tujuan Program bagi mahasiswa dan UMKM." },
  { pageNumber: 7, alt: "Why DekatLokal: alasan memilih DekatLokal sebagai penyelenggara." },
  { pageNumber: 8, alt: "Pelaksanaan: rencana jalannya kegiatan AI Co-Creation Lab Makassar." },
  { pageNumber: 9, alt: "Deskripsi kebutuhan dan rincian jumlah dukungan." },
  { pageNumber: 10, alt: "Rincian kebutuhan sponsorship: item, jumlah, dan harga." },
  { pageNumber: 11, alt: "Kebutuhan gift merchandise: item, jumlah, dan total biaya." },
  { pageNumber: 12, alt: "Rincian kebutuhan sponsorship lanjutan: item, jumlah, dan harga." },
  { pageNumber: 13, alt: "Rincian kebutuhan sponsorship lanjutan: item, jumlah, dan harga." },
  { pageNumber: 14, alt: "Paket Kerja Sama yang ditawarkan kepada calon sponsor." },
  { pageNumber: 15, alt: "Daftar paket kerja sama beserta nilai kontribusinya." },
  { pageNumber: 16, alt: "Benefit Main Impact Partner (Sponsor Tunggal): brand positioning." },
  { pageNumber: 17, alt: "Benefit Main Impact Partner: eksposur media sosial." },
  { pageNumber: 18, alt: "Benefit Main Impact Partner: dampak dan dokumentasi kegiatan." },
  { pageNumber: 19, alt: "Benefit Apparel Partner: eksklusivitas sebagai mitra apparel." },
  { pageNumber: 20, alt: "Benefit Merchandise Partner: eksklusivitas sebagai mitra merchandise." },
  { pageNumber: 21, alt: "Benefit Official Food & Beverage Partner." },
  { pageNumber: 22, alt: "Benefit Identity Partner: mitra lanyard dan identitas peserta." },
  { pageNumber: 23, alt: "Semangat kolaborasi di balik AI Co-Creation Lab Makassar." },
  { pageNumber: 24, alt: "Our Supporting Partners: mitra pendukung DekatLokal." },
  { pageNumber: 25, alt: "Let's Build Local Solutions Together: ajakan berkolaborasi." },
  { pageNumber: 26, alt: "Contact Us: kontak Riswan Ramadhan dan Admin DekatLokal." },
].map((page) => ({
  ...page,
  imageSrc: `/sponsorship-proposal/page-${String(page.pageNumber).padStart(2, "0")}.webp`,
}));

export const sponsorshipProposalMeta = {
  title: "Sponsorship Proposal | AI Co-Creation Lab Makassar",
  description:
    "Peluang kolaborasi untuk mendukung pengembangan talenta mahasiswa dan digitalisasi UMKM melalui AI Co-Creation Lab Makassar.",
  totalPages: 26,
  isPlaceholder: false,
};

const hasSequentialPages =
  sponsorshipProposalPages.length === sponsorshipProposalMeta.totalPages &&
  sponsorshipProposalPages.every((page, index) => page.pageNumber === index + 1);

if (!hasSequentialPages) {
  throw new Error(
    `Sponsorship proposal must contain exactly ${sponsorshipProposalMeta.totalPages} sequential pages.`,
  );
}

export const sponsorshipProposalRoute =
  "/ai-co-creation-lab-makassar/sponsorship-proposal";

export const sponsorshipProposalContent = {
  hero: {
    eyebrow: "SPONSORSHIP & COLLABORATION",
    title: "Support Local Talent. Enable Digital Solutions for UMKM.",
    description:
      "AI Co-Creation Lab Makassar mempertemukan 20 mahasiswa dan 5 UMKM untuk mengembangkan lima prototype sistem digital berdasarkan kebutuhan operasional yang nyata. Kami membuka kolaborasi melalui dukungan dana, produk, jasa, fasilitas, maupun pembayaran langsung kepada vendor.",
    primaryCta: "Lihat Proposal",
    secondaryCta: "Hubungi Tim DekatLokal",
  },
  partnershipValue: {
    eyebrow: "PARTNERSHIP VALUE",
    title: "Dukungan yang terhubung langsung dengan proses dan dampak.",
    items: [
      "Youth & AI Talent Development",
      "UMKM Digitalization",
      "Product and Brand Experience",
      "Measurable Impact Report",
    ],
  },
  supportCategories: {
    eyebrow: "SUPPORT CATEGORIES",
    title: "Pilih bentuk dukungan yang paling relevan.",
    description:
      "Kontribusi dapat diberikan dalam bentuk dana, produk, jasa, fasilitas, atau pembayaran langsung kepada vendor.",
    items: sponsorshipSupportCategories.map(
      ({ proposalTitle, need, contribution }) => ({
        title: proposalTitle,
        need,
        contribution,
      }),
    ),
  },
  flipbook: {
    eyebrow: "PROPOSAL PREVIEW",
    title: "Explore the Sponsorship Proposal",
    description:
      "Klik cover atau gunakan kontrol untuk membuka dan menelusuri proposal seperti sebuah buku.",
  },
  contact: {
    eyebrow: "COLLABORATE WITH US",
    title: "Hubungi Tim DekatLokal",
    description:
      "Diskusikan bentuk dukungan yang relevan untuk AI Co-Creation Lab Makassar bersama tim DekatLokal.",
    cta: "Hubungi Tim DekatLokal",
    href: "https://wa.me/6289516335023?text=Halo%20DekatLokal%2C%20saya%20tertarik%20untuk%20berdiskusi%20mengenai%20kolaborasi%2Fsponsorship%20AI%20Co-Creation%20Lab%20Makassar.",
  },
  cover: {
    brand: "DekatLokal",
    documentType: "SPONSORSHIP & COLLABORATION PROPOSAL",
    eventTitle: "AI Co-Creation Lab Makassar",
    tagline: "From AI Users to Local Problem Solvers",
    websites: ["dekatlokal.com", "event.dekatlokal.com"],
  },
} as const;
