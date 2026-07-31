export type SponsorshipProposalPage = {
  pageNumber: number;
  type: "cover" | "placeholder" | "image" | "custom";
  title?: string;
  imageSrc?: string;
  alt?: string;
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
