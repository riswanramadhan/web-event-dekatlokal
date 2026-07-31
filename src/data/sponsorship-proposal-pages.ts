import { sponsorshipSupportCategories } from "@/data/sponsorship-support";

export type SponsorshipProposalPage = {
  pageNumber: number;
  type: "cover" | "placeholder" | "image" | "custom";
  title?: string;
  imageSrc?: string;
  alt?: string;
  customKey?: string;
};

export const sponsorshipProposalPages: SponsorshipProposalPage[] = Array.from(
  { length: 24 },
  (_, index) => {
    const pageNumber = index + 1;

    if (pageNumber === 1) {
      return {
        pageNumber,
        type: "cover" as const,
        title: "Sponsorship & Collaboration Proposal",
      };
    }

    return {
      pageNumber,
      type: "placeholder" as const,
      title: `Proposal Page ${pageNumber}`,
    };
  },
);

export const sponsorshipProposalMeta = {
  title: "Sponsorship Proposal | AI Co-Creation Lab Makassar",
  description:
    "Peluang kolaborasi untuk mendukung pengembangan talenta mahasiswa dan digitalisasi UMKM melalui AI Co-Creation Lab Makassar.",
  totalPages: 24,
  isPlaceholder: true,
};

const hasExactPlaceholderSequence =
  sponsorshipProposalPages.length === sponsorshipProposalMeta.totalPages &&
  sponsorshipProposalPages.every(
    (page, index) =>
      page.pageNumber === index + 1 &&
      (index === 0 ? page.type === "cover" : page.type === "placeholder"),
  );

if (!hasExactPlaceholderSequence) {
  throw new Error(
    "Sponsorship proposal must contain one cover and 23 sequential placeholder pages.",
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
    href: "mailto:hello@dekatlokal.com?subject=Kolaborasi%20AI%20Co-Creation%20Lab%20Makassar",
  },
  cover: {
    brand: "DekatLokal",
    documentType: "SPONSORSHIP & COLLABORATION PROPOSAL",
    eventTitle: "AI Co-Creation Lab Makassar",
    tagline: "From AI Users to Local Problem Solvers",
    websites: ["dekatlokal.com", "event.dekatlokal.com"],
  },
} as const;
