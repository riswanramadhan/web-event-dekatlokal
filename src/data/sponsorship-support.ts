export interface SponsorshipSupportCategory {
  readonly reportTitle: string;
  readonly proposalTitle: string;
  readonly need: string;
  readonly contribution: string;
}

export const sponsorshipSupportCategories = [
  {
    reportTitle: "Main Impact Partner",
    proposalTitle: "Main Impact Partner",
    need: "Seluruh kebutuhan program",
    contribution: "Pembiayaan atau dukungan penuh kegiatan",
  },
  {
    reportTitle: "Apparel Partner",
    proposalTitle: "Official Apparel Partner",
    need: "30 baju event",
    contribution: "Produk, subsidi produksi atau pembayaran vendor",
  },
  {
    reportTitle: "Identity Partner",
    proposalTitle: "Official Identity Partner",
    need: "30 lanyard dan ID card",
    contribution: "Produksi identitas peserta",
  },
  {
    reportTitle: "Merchandise Partner",
    proposalTitle: "Official Merchandise Partner",
    need: "30 participant kits",
    contribution: "Produk, voucher atau merchandise",
  },
  {
    reportTitle: "Food & Beverage Partner",
    proposalTitle: "Official Food & Beverage Partner",
    need: "Lunch dan snack box",
    contribution: "Konsumsi peserta",
  },
] as const satisfies readonly SponsorshipSupportCategory[];
