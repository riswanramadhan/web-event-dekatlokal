export type FaqCategory =
  | "program"
  | "registration"
  | "student"
  | "umkm"
  | "privacy";

export interface FaqItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly category: FaqCategory;
}

export const faqs = [
  {
    id: "about-program",
    question: "Apa itu AI Co-Creation Lab Makassar?",
    answer:
      "AI Co-Creation Lab Makassar adalah program kolaborasi satu hari yang mempertemukan mahasiswa dan pelaku UMKM untuk merancang, menguji, dan menyerahkan solusi berbantuan AI yang sederhana berdasarkan kebutuhan usaha nyata.",
    category: "program",
  },
  {
    id: "program-output",
    question: "Hasil seperti apa yang ditargetkan?",
    answer:
      "Setiap tim menargetkan workflow atau prototype AI sederhana beserta panduan penggunaan melalui smartphone. Program ini tidak menjanjikan pembangunan aplikasi kompleks dalam satu hari.",
    category: "program",
  },
  {
    id: "event-date-location",
    question: "Kapan dan di mana kegiatan berlangsung?",
    answer:
      "Tanggal dan lokasi final belum dikonfirmasi. Informasi resmi akan diperbarui pada halaman event setelah penetapan selesai.",
    category: "program",
  },
  {
    id: "registration-selection",
    question: "Apakah mengisi formulir berarti langsung diterima?",
    answer:
      "Tidak. Pendaftaran merupakan tahap aplikasi. Peserta terpilih akan dikonfirmasi melalui kontak yang diberikan setelah proses peninjauan.",
    category: "registration",
  },
  {
    id: "registration-status",
    question: "Apakah pendaftaran sudah dibuka?",
    answer:
      "Pendaftaran belum dibuka. Tombol aplikasi akan diaktifkan setelah jadwal dan kesiapan program dikonfirmasi.",
    category: "registration",
  },
  {
    id: "student-role",
    question: "Apa peran mahasiswa dalam kegiatan ini?",
    answer:
      "Mahasiswa bekerja dalam tim untuk membantu memahami masalah, menyusun AI workflow, memeriksa kualitas dan etika hasil, serta menyiapkan dokumentasi dan panduan bagi UMKM.",
    category: "student",
  },
  {
    id: "student-laptop",
    question: "Apakah mahasiswa harus memiliki laptop?",
    answer:
      "Ketersediaan laptop ditanyakan saat aplikasi untuk membantu penyusunan tim dan perangkat. Informasi itu menjadi bahan pertimbangan operasional, bukan klaim penerimaan otomatis.",
    category: "student",
  },
  {
    id: "umkm-role",
    question: "Apa peran UMKM sebagai challenge partner?",
    answer:
      "UMKM menjelaskan kebutuhan usaha yang telah diseleksi, memberikan konteks yang aman untuk dibagikan, mencoba hasil bersama tim, dan bersedia mengikuti monitoring setelah kegiatan.",
    category: "umkm",
  },
  {
    id: "umkm-ai-experience",
    question: "Apakah UMKM harus sudah memahami AI?",
    answer:
      "Tidak harus. Program dirancang agar kebutuhan dijelaskan dengan bahasa usaha sehari-hari dan solusi dapat dicoba melalui perangkat yang tersedia.",
    category: "umkm",
  },
  {
    id: "sensitive-data",
    question: "Data apa yang tidak boleh dibagikan?",
    answer:
      "Jangan memasukkan nomor rekening, identitas pelanggan, data transaksi rahasia, kredensial akun, atau informasi sensitif lainnya pada formulir maupun bahan co-creation.",
    category: "privacy",
  },
  {
    id: "documentation-consent",
    question: "Bagaimana dokumentasi peserta digunakan?",
    answer:
      "Dokumentasi hanya digunakan sesuai persetujuan yang diberikan pada formulir. Persetujuan dokumentasi dicatat terpisah dari persetujuan pemrosesan data pendaftaran.",
    category: "privacy",
  },
] as const satisfies readonly FaqItem[];

export const eventFaqs = faqs;

export function getFaqsByCategory(
  category: FaqCategory,
): readonly FaqItem[] {
  return faqs.filter((faq) => faq.category === category);
}

