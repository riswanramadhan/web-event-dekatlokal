export type DocumentationCategoryId =
  | "audience"
  | "preparation"
  | "implementation"
  | "demo"
  | "monitoring";

export type DocumentationStatus = "empty" | "draft" | "published";
export type DocumentationMediaType = "photo" | "video" | "document";

export interface DocumentationItem {
  readonly id: string;
  readonly title: string;
  readonly caption: string;
  readonly mediaType: DocumentationMediaType;
  readonly mediaUrl: string | null;
  readonly thumbnailUrl: string | null;
  readonly alt: string | null;
  readonly driveUrl: string | null;
  readonly publicationUrl: string | null;
  readonly capturedAt: string | null;
  readonly published: boolean;
}

export interface DocumentationCategory {
  readonly id: DocumentationCategoryId;
  readonly label: string;
  readonly description: string;
  readonly status: DocumentationStatus;
  readonly statusLabel: string;
  readonly driveUrl: string | null;
  readonly publicationUrl: string | null;
  readonly items: readonly DocumentationItem[];
  readonly emptyState: string;
}

export const documentationCategories = [
  {
    id: "audience",
    label: "Audiensi",
    description:
      "Bukti pertemuan atau percakapan dengan stakeholder yang telah memperoleh izin publikasi.",
    status: "empty",
    statusLabel: "Belum Tersedia",
    driveUrl: null,
    publicationUrl: null,
    items: [],
    emptyState:
      "Dokumentasi audiensi belum tersedia atau belum disetujui untuk publikasi.",
  },
  {
    id: "preparation",
    label: "Persiapan",
    description:
      "Bukti validasi, koordinasi, penyusunan materi, dan kesiapan pelaksanaan.",
    status: "empty",
    statusLabel: "Belum Tersedia",
    driveUrl: null,
    publicationUrl: null,
    items: [],
    emptyState: "Dokumentasi persiapan belum tersedia.",
  },
  {
    id: "implementation",
    label: "Implementasi",
    description:
      "Bukti bootcamp, proses co creation, testing, dan handover saat kegiatan.",
    status: "empty",
    statusLabel: "Belum Tersedia",
    driveUrl: null,
    publicationUrl: null,
    items: [],
    emptyState:
      "Dokumentasi implementasi akan ditambahkan setelah kegiatan berlangsung dan izin publikasi diverifikasi.",
  },
  {
    id: "demo",
    label: "Demo",
    description:
      "Bukti presentasi hasil tim beserta konteks solusi dan batas penggunaannya.",
    status: "empty",
    statusLabel: "Belum Tersedia",
    driveUrl: null,
    publicationUrl: null,
    items: [],
    emptyState: "Dokumentasi demo belum tersedia.",
  },
  {
    id: "monitoring",
    label: "Monitoring",
    description:
      "Bukti tindak lanjut penggunaan solusi setelah handover tanpa membuka data sensitif.",
    status: "empty",
    statusLabel: "Belum Tersedia",
    driveUrl: null,
    publicationUrl: null,
    items: [],
    emptyState:
      "Dokumentasi monitoring akan ditambahkan setelah tindak lanjut dilakukan.",
  },
] as const satisfies readonly DocumentationCategory[];

export const documentationSummary = {
  status: "empty",
  statusLabel: "Belum Ada Dokumentasi Publik",
  description:
    "Dokumentasi akan ditampilkan setelah aset tersedia, konteksnya terverifikasi, dan izin publikasinya dikonfirmasi.",
  driveUrl: null,
  publicationUrl: null,
} as const satisfies {
  readonly status: DocumentationStatus;
  readonly statusLabel: string;
  readonly description: string;
  readonly driveUrl: string | null;
  readonly publicationUrl: string | null;
};

export function getDocumentationCategory(
  id: DocumentationCategoryId,
): DocumentationCategory | undefined {
  return documentationCategories.find((category) => category.id === id);
}
