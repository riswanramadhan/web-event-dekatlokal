import {
  miniProjectCanvasPdf,
  miniProjectTimeline,
  updatedMiniProjectProgressDescription,
} from "@/data/mini-project-canvas-content";
import type { MiniProjectTimelineItem } from "@/data/mini-project-canvas-content";
import { sponsorshipSupportCategories } from "@/data/sponsorship-support";

export const GEP_WEEK_ONE_REPORT_SLUGS = [
  "leadership-network-mapping",
  "identifikasi-masalah-sosial",
  "mini-project-canvas",
] as const;

export type GepWeekOneReportSlug =
  (typeof GEP_WEEK_ONE_REPORT_SLUGS)[number];

export type ReportTableAlignment = "left" | "center" | "right";

export type ReportBlock =
  | {
      readonly type: "paragraph";
      readonly text: string;
    }
  | {
      readonly type: "bullet-list";
      readonly items: readonly string[];
    }
  | {
      readonly type: "numbered-list";
      readonly items: readonly string[];
    }
  | {
      readonly type: "table";
      readonly headers: readonly string[];
      readonly rows: readonly (readonly string[])[];
      readonly align?: readonly ReportTableAlignment[];
    }
  | {
      readonly type: "quote";
      readonly text: string;
    }
  | {
      readonly type: "subheading";
      readonly text: string;
    }
  | {
      readonly type: "featured-heading";
      readonly text: string;
    }
  | {
      readonly type: "definition-list";
      readonly items: readonly {
        readonly label: string;
        readonly value: string;
      }[];
    }
  | {
      readonly type: "project-timeline";
      readonly items: readonly MiniProjectTimelineItem[];
    };

export interface ReportSection {
  readonly id: string;
  readonly title: string;
  readonly blocks: readonly ReportBlock[];
}

export interface ReportEvidence {
  readonly label: string;
  readonly url: string;
}

export interface GepWeekOneReport {
  readonly slug: GepWeekOneReportSlug;
  readonly title: string;
  readonly metadataTitle: string;
  readonly weekLabel: string;
  readonly phase: string;
  readonly subtitle: string;
  readonly status: string;
  readonly nextStep: string;
  readonly updatedAt: string;
  readonly updatedAtIso: string;
  readonly route: string;
  readonly download?: {
    readonly href: string;
    readonly label: string;
  };
  readonly sections: readonly ReportSection[];
  readonly leadershipReflection: {
    readonly quote: string;
    readonly paragraphs: readonly string[];
  };
  readonly outputs: readonly string[];
  readonly progressDescription: string;
  readonly progressUrl: string;
  readonly evidence: readonly ReportEvidence[];
}

export const GEP_WEEK_ONE_REPORTS: readonly GepWeekOneReport[] = [
  {
    slug: "leadership-network-mapping",
    title: "Leadership Network Mapping",
    metadataTitle:
      "Leadership Network Mapping | AI Co-Creation Lab Makassar",
    weekLabel: "GEP WEEK 1",
    phase: "DISCOVER YOURSELF & BUILD YOUR NETWORK",
    subtitle:
      "Pemetaan jejaring yang dimiliki dan potensi kolaborasinya dalam pelaksanaan AI Co-Creation Lab Makassar.",
    status: "Completed",
    nextStep: "Partnership Engagement",
    updatedAt: "30 Juli 2026",
    updatedAtIso: "2026-07-30",
    route:
      "/ai-co-creation-lab-makassar/progress/leadership-network-mapping",
    sections: [
      {
        id: "ringkasan-progres",
        title: "Ringkasan progres",
        blocks: [
          {
            type: "paragraph",
            text: "Leadership Network Mapping disusun untuk mengidentifikasi individu, komunitas, institusi, perusahaan, dan kelompok penerima manfaat yang dapat mendukung AI Co-Creation Lab Makassar.",
          },
          {
            type: "paragraph",
            text: "Pemetaan ini tidak hanya mencatat pihak yang dikenal, tetapi juga mengidentifikasi:",
          },
          {
            type: "bullet-list",
            items: [
              "sumber daya yang dimiliki setiap pihak;",
              "kepentingan dan potensi kontribusi;",
              "posisi pihak dalam pelaksanaan program;",
              "tingkat prioritas kolaborasi;",
              "bentuk komunikasi dan tindak lanjut;",
              "hubungan antara mahasiswa, UMKM, mitra, dan penyelenggara.",
            ],
          },
          {
            type: "paragraph",
            text: "Melalui pemetaan ini, DekatLokal berperan sebagai penghubung antara talenta mahasiswa, kebutuhan UMKM, dukungan institusi, serta kontribusi perusahaan dan komunitas.",
          },
        ],
      },
      {
        id: "pusat-jejaring",
        title: "Pusat jejaring",
        blocks: [
          {
            type: "subheading",
            text: "Riswan Ramadhan dan DekatLokal",
          },
          {
            type: "paragraph",
            text: "Dalam project ini, Riswan Ramadhan berperan sebagai Project Lead yang menghubungkan seluruh unsur program.",
          },
          {
            type: "paragraph",
            text: "DekatLokal berperan sebagai:",
          },
          {
            type: "bullet-list",
            items: [
              "penggagas dan penyelenggara;",
              "pengelola ekosistem digital;",
              "penghubung mahasiswa dan UMKM;",
              "koordinator partnership;",
              "pengelola pendaftaran;",
              "pengelola dokumentasi dan laporan;",
              "penyedia platform `dekatlokal.com`;",
              "penyedia platform `event.dekatlokal.com`.",
            ],
          },
        ],
      },
      {
        id: "peta-jejaring-berdasarkan-lapisan",
        title: "Peta jejaring berdasarkan lapisan",
        blocks: [
          {
            type: "subheading",
            text: "Lapisan 1 — Core Project Network",
          },
          {
            type: "paragraph",
            text: "Pihak yang terlibat langsung dalam perencanaan dan pelaksanaan.",
          },
          {
            type: "table",
            headers: [
              "Stakeholder",
              "Peran",
              "Potensi kontribusi",
              "Tingkat prioritas",
            ],
            rows: [
              [
                "DekatLokal",
                "Penyelenggara dan project lead",
                "Konsep, koordinasi, platform digital, dokumentasi dan monitoring",
                "Sangat tinggi",
              ],
              [
                "Tim DekatLokal",
                "Tim operasional",
                "Registrasi, komunikasi, publikasi, fasilitasi dan dokumentasi",
                "Sangat tinggi",
              ],
              [
                "20 mahasiswa",
                "Problem solver",
                "Problem discovery, desain, development, testing dan handover",
                "Sangat tinggi",
              ],
              [
                "5 UMKM Makassar",
                "Challenge partner dan penerima manfaat",
                "Menyampaikan kebutuhan, memberikan data yang aman, menguji dan memvalidasi sistem",
                "Sangat tinggi",
              ],
              [
                "Pemateri atau fasilitator",
                "Knowledge support",
                "Membekali peserta mengenai AI-assisted development dan responsible AI",
                "Tinggi",
              ],
            ],
          },
          {
            type: "subheading",
            text: "Lapisan 2 — Institutional and Program Support",
          },
          {
            type: "table",
            headers: ["Stakeholder", "Potensi peran", "Bentuk kolaborasi"],
            rows: [
              [
                "BAKTI NUSA",
                "Program support",
                "Pendampingan perjalanan awardee, monitoring dan evaluasi",
              ],
              [
                "GREAT Edunesia",
                "Program support",
                "Dukungan program dan pengembangan kepemimpinan",
              ],
              [
                "Dompet Dhuafa",
                "Program ecosystem support",
                "Penguatan program sosial dan jejaring",
              ],
              [
                "Balai Besar Pelatihan Komunikasi dan Digital Makassar",
                "Venue support",
                "Ruangan, fasilitas kegiatan dan lingkungan pembelajaran digital",
              ],
              [
                "Universitas Hasanuddin",
                "Knowledge and talent network",
                "Akses mahasiswa, akademisi, komunitas teknologi dan validasi keilmuan",
              ],
            ],
          },
          {
            type: "subheading",
            text: "Lapisan 3 — UMKM and Community Network",
          },
          {
            type: "table",
            headers: ["Stakeholder", "Potensi peran", "Bentuk kolaborasi"],
            rows: [
              [
                "Rumah BUMN Makassar",
                "Community and UMKM network support",
                "Akses UMKM, rekomendasi penerima manfaat dan masukan kebutuhan usaha",
              ],
              [
                "Ekosistem BRI dan Rumah BUMN",
                "Network support",
                "Penguatan jaringan UMKM dan kemungkinan dukungan program",
              ],
              [
                "Komunitas mahasiswa",
                "Participant outreach",
                "Penyebaran informasi dan mobilisasi calon peserta",
              ],
              [
                "Komunitas teknologi",
                "Technical and mentor support",
                "Mentor, reviewer, fasilitator dan validasi prototype",
              ],
              [
                "Komunitas UMKM Makassar",
                "Beneficiary network",
                "Rekomendasi UMKM dan penyebaran hasil program",
              ],
            ],
          },
          {
            type: "subheading",
            text: "Lapisan 4 — Corporate and Resource Network",
          },
          {
            type: "table",
            headers: [
              "Kategori mitra",
              "Kebutuhan program",
              "Potensi kontribusi",
            ],
            rows: [
              ...sponsorshipSupportCategories.map(
                ({ reportTitle, need, contribution }) =>
                  [reportTitle, need, contribution] as const,
              ),
              [
                "Technology Partner",
                "Akses perangkat atau layanan digital",
                "Internet, cloud credit, software atau mentoring",
              ],
              [
                "Media Partner",
                "Publikasi",
                "Liputan, repost dan distribusi informasi",
              ],
            ],
          },
          {
            type: "subheading",
            text: "Lapisan 5 — Public Communication Network",
          },
          {
            type: "table",
            headers: ["Kanal", "Fungsi"],
            rows: [
              [
                "`dekatlokal.com`",
                "Profil organisasi, portofolio, publikasi dan case study",
              ],
              [
                "`event.dekatlokal.com`",
                "Informasi event, registrasi, progress report dan impact report",
              ],
              [
                "Instagram DekatLokal",
                "Publikasi, dokumentasi dan partner acknowledgement",
              ],
              [
                "WhatsApp",
                "Koordinasi mahasiswa, UMKM dan mitra",
              ],
              [
                "LinkedIn",
                "Personal branding, partnership dan publikasi profesional",
              ],
              [
                "Google Drive",
                "Penyimpanan bukti, laporan, foto dan dokumen pendukung",
              ],
            ],
          },
        ],
      },
      {
        id: "strategi-mobilisasi-jejaring",
        title: "Strategi mobilisasi jejaring",
        blocks: [
          {
            type: "paragraph",
            text: "Jejaring tidak akan hanya dicantumkan sebagai daftar, tetapi akan dimobilisasi melalui empat strategi:",
          },
          {
            type: "subheading",
            text: "Connect",
          },
          {
            type: "paragraph",
            text: "Menghubungi pihak berdasarkan keselarasan kepentingan dan kapasitasnya.",
          },
          {
            type: "subheading",
            text: "Match",
          },
          {
            type: "paragraph",
            text: "Mencocokkan kebutuhan project dengan sumber daya yang dimiliki stakeholder.",
          },
          {
            type: "subheading",
            text: "Collaborate",
          },
          {
            type: "paragraph",
            text: "Menyepakati bentuk kontribusi, pembagian peran, serta output yang diharapkan.",
          },
          {
            type: "subheading",
            text: "Maintain",
          },
          {
            type: "paragraph",
            text: "Menjaga komunikasi, memberikan update, mendokumentasikan kontribusi, dan mengirimkan laporan setelah kegiatan.",
          },
        ],
      },
      {
        id: "prioritas-tindak-lanjut",
        title: "Prioritas tindak lanjut",
        blocks: [
          {
            type: "table",
            headers: ["Prioritas", "Tindak lanjut"],
            rows: [
              [
                "Penerima manfaat",
                "Menyeleksi dan memvalidasi lima UMKM",
              ],
              [
                "Peserta",
                "Membuka registrasi dan menyeleksi 20 mahasiswa",
              ],
              [
                "Venue",
                "Mengonfirmasi fasilitas dan kebutuhan teknis",
              ],
              [
                "Pemateri",
                "Menetapkan materi, metode, dan output pembelajaran",
              ],
              [
                "Sponsor",
                "Mengirim proposal khusus berdasarkan kategori kebutuhan",
              ],
              [
                "Komunitas",
                "Menyebarkan informasi dan mendukung peserta",
              ],
              [
                "Reviewer",
                "Meminta masukan terhadap kelayakan project dan sistem",
              ],
            ],
          },
        ],
      },
    ],
    leadershipReflection: {
      quote:
        "Pemetaan ini menunjukkan bahwa jejaring tidak hanya diukur dari berapa banyak pihak yang dikenal, tetapi dari kemampuan seorang pemimpin menghubungkan kebutuhan, kepentingan, sumber daya, dan peran yang berbeda ke dalam satu tujuan bersama.",
      paragraphs: [
        "AI Co-Creation Lab Makassar tidak dapat dijalankan oleh satu orang. Project ini membutuhkan kemampuan membangun kepercayaan, menyampaikan nilai kolaborasi, membagi peran, dan memastikan setiap pihak mendapatkan manfaat yang relevan.",
      ],
    },
    outputs: [
      "peta stakeholder program;",
      "klasifikasi peran dan kontribusi;",
      "pemetaan kebutuhan kolaborasi;",
      "prioritas engagement;",
      "strategi mobilisasi jejaring;",
      "dasar penyusunan partnership;",
      "daftar tindak lanjut.",
    ],
    progressDescription:
      "Leadership Network Mapping telah disusun dengan memetakan jejaring yang mendukung AI Co-Creation Lab Makassar, meliputi DekatLokal, mahasiswa, UMKM, BAKTI NUSA, GREAT Edunesia, Dompet Dhuafa, Balai Besar Pelatihan Komunikasi dan Digital Makassar, Universitas Hasanuddin, Rumah BUMN Makassar, komunitas teknologi, serta calon mitra perusahaan. Setiap stakeholder dipetakan berdasarkan peran, sumber daya, potensi kontribusi, tingkat prioritas, dan rencana tindak lanjut sebagai dasar pembangunan partnership dan mobilisasi jejaring.",
    progressUrl:
      "https://event.dekatlokal.com/ai-co-creation-lab-makassar/progress/leadership-network-mapping",
    evidence: [],
  },
  {
    slug: "identifikasi-masalah-sosial",
    title: "Identifikasi Masalah Sosial",
    metadataTitle:
      "Identifikasi Masalah Sosial | AI Co-Creation Lab Makassar",
    weekLabel: "GEP WEEK 1",
    phase: "DISCOVER YOURSELF & BUILD YOUR NETWORK",
    subtitle:
      "Kesenjangan pemanfaatan AI secara produktif antara mahasiswa dan pelaku UMKM di Kota Makassar.",
    status: "Initial Identification Completed",
    nextStep: "Problem Validation",
    updatedAt: "30 Juli 2026",
    updatedAtIso: "2026-07-30",
    route:
      "/ai-co-creation-lab-makassar/progress/identifikasi-masalah-sosial",
    sections: [
      {
        id: "judul-isu",
        title: "Judul isu",
        blocks: [
          {
            type: "featured-heading",
            text: "Kesenjangan Pemanfaatan AI untuk Menciptakan Solusi Digital bagi UMKM",
          },
        ],
      },
      {
        id: "ringkasan-isu",
        title: "Ringkasan isu",
        blocks: [
          {
            type: "paragraph",
            text: "Pemanfaatan AI di kalangan mahasiswa semakin luas. Namun, penggunaannya masih sering berhenti pada pencarian informasi, pembuatan tugas, rangkuman, ide konten, dan kebutuhan individual.",
          },
          {
            type: "paragraph",
            text: "Mahasiswa telah menjadi pengguna AI, tetapi belum seluruhnya mempunyai pengalaman untuk:",
          },
          {
            type: "bullet-list",
            items: [
              "memahami kebutuhan pengguna nyata;",
              "melakukan problem discovery;",
              "memvalidasi masalah;",
              "menerjemahkan kebutuhan menjadi sistem;",
              "membangun prototype;",
              "menguji solusi bersama pengguna;",
              "mempertanggungjawabkan hasil yang dibuat.",
            ],
          },
          {
            type: "paragraph",
            text: "Pada sisi lain, banyak UMKM menghadapi pekerjaan operasional yang berulang, seperti:",
          },
          {
            type: "bullet-list",
            items: [
              "transaksi yang masih dicatat manual;",
              "pesanan yang mudah terlewat;",
              "stok yang tidak terpantau;",
              "jadwal layanan yang bentrok;",
              "data pelanggan yang tidak tersusun;",
              "invoice dan katalog yang dibuat dari awal;",
              "informasi usaha yang tersebar di berbagai media.",
            ],
          },
          {
            type: "paragraph",
            text: "Masalah utamanya bukan semata-mata kurangnya aplikasi. Banyak UMKM juga mengalami keterbatasan dalam:",
          },
          {
            type: "bullet-list",
            items: [
              "mengenali sistem yang sebenarnya dibutuhkan;",
              "menjelaskan kebutuhan kepada developer;",
              "memperoleh akses terhadap pengembang;",
              "menanggung biaya pembangunan sistem;",
              "menyediakan perangkat;",
              "melakukan pengujian;",
              "menggunakan dan memelihara sistem setelah pelatihan.",
            ],
          },
          {
            type: "paragraph",
            text: "Identifikasi ini sesuai dengan konsep program yang menempatkan mahasiswa sebagai pembangun solusi dan UMKM sebagai pemilik masalah, pengguna penguji, pemberi feedback, penerima manfaat, sekaligus co-creator.",
          },
        ],
      },
      {
        id: "kelompok-yang-terdampak",
        title: "Kelompok yang terdampak",
        blocks: [
          {
            type: "subheading",
            text: "Mahasiswa",
          },
          {
            type: "paragraph",
            text: "Mahasiswa mempunyai akses terhadap AI dan perangkat, tetapi belum selalu mempunyai:",
          },
          {
            type: "bullet-list",
            items: [
              "pengalaman dengan pengguna nyata;",
              "pemahaman proses bisnis UMKM;",
              "kemampuan validasi;",
              "pengalaman mengembangkan sistem secara end-to-end;",
              "portofolio berbasis dampak.",
            ],
          },
          {
            type: "subheading",
            text: "Pelaku UMKM",
          },
          {
            type: "paragraph",
            text: "UMKM memiliki masalah usaha nyata, tetapi sering terkendala:",
          },
          {
            type: "bullet-list",
            items: [
              "akses terhadap developer;",
              "kemampuan menyusun kebutuhan;",
              "biaya;",
              "perangkat;",
              "waktu belajar;",
              "pendampingan;",
              "proses keberlanjutan.",
            ],
          },
          {
            type: "subheading",
            text: "Ekosistem lokal",
          },
          {
            type: "paragraph",
            text: "Potensi mahasiswa dan kebutuhan UMKM masih berjalan secara terpisah. Belum banyak ruang lokal yang secara terstruktur menghubungkan keduanya untuk menghasilkan solusi digital yang diuji dan digunakan.",
          },
        ],
      },
      {
        id: "hasil-observasi-awal",
        title: "Hasil observasi awal",
        blocks: [
          {
            type: "table",
            headers: ["Temuan", "Kondisi awal"],
            rows: [
              [
                "Penggunaan AI mahasiswa",
                "Banyak digunakan untuk pekerjaan individual dan akademik",
              ],
              [
                "Pengalaman menciptakan solusi",
                "Belum banyak mahasiswa berhadapan dengan pengguna nyata",
              ],
              [
                "Permasalahan UMKM",
                "Bersifat operasional, berulang, dan spesifik",
              ],
              [
                "Kemampuan menjelaskan kebutuhan",
                "UMKM sering memahami masalah, tetapi belum mengetahui bentuk sistemnya",
              ],
              [
                "Model pelatihan",
                "Sering berakhir pada materi tanpa produk yang dapat digunakan",
              ],
              [
                "Akses perangkat",
                "Mahasiswa umumnya memiliki laptop, sementara sebagian UMKM mengandalkan smartphone",
              ],
              [
                "Keberlanjutan",
                "Banyak output digital tidak memiliki panduan, handover, atau monitoring",
              ],
            ],
          },
        ],
      },
      {
        id: "akar-masalah",
        title: "Akar masalah",
        blocks: [
          {
            type: "subheading",
            text: "Faktor mahasiswa",
          },
          {
            type: "bullet-list",
            items: [
              "AI lebih banyak digunakan untuk memperoleh jawaban daripada menciptakan produk.",
              "Kurangnya pengalaman problem discovery dan user research.",
              "Kurangnya akses kepada permasalahan nyata.",
              "Pembelajaran teknologi sering terpisah dari konteks penerima manfaat.",
              "Belum terbiasa membangun sistem yang sederhana dan tepat guna.",
            ],
          },
          {
            type: "subheading",
            text: "Faktor UMKM",
          },
          {
            type: "bullet-list",
            items: [
              "Kebutuhan digital belum terpetakan.",
              "Permasalahan usaha dianggap sebagai rutinitas normal.",
              "Kesulitan menjelaskan kebutuhan teknis.",
              "Keterbatasan biaya dan akses developer.",
              "Keterbatasan perangkat dan literasi digital.",
              "Kekhawatiran terhadap sistem yang terlalu kompleks.",
            ],
          },
          {
            type: "subheading",
            text: "Faktor ekosistem",
          },
          {
            type: "bullet-list",
            items: [
              "Mahasiswa dan UMKM belum terhubung secara terstruktur.",
              "Program pelatihan sering berorientasi pada penyampaian materi.",
              "Belum ada proses matching antara kemampuan mahasiswa dan kebutuhan UMKM.",
              "Kurangnya testing, handover, dan monitoring.",
              "Kolaborasi institusi, komunitas, dan perusahaan belum terintegrasi.",
            ],
          },
        ],
      },
      {
        id: "dampak-masalah",
        title: "Dampak masalah",
        blocks: [
          {
            type: "paragraph",
            text: "Apabila kesenjangan ini tidak dijawab:",
          },
          {
            type: "subheading",
            text: "Bagi mahasiswa",
          },
          {
            type: "bullet-list",
            items: [
              "AI tetap digunakan secara konsumtif;",
              "kemampuan product development tidak berkembang;",
              "portofolio tidak berbasis kebutuhan nyata;",
              "kemampuan komunikasi dengan pengguna terbatas;",
              "teknologi tidak diterjemahkan menjadi dampak sosial.",
            ],
          },
          {
            type: "subheading",
            text: "Bagi UMKM",
          },
          {
            type: "bullet-list",
            items: [
              "proses manual terus berulang;",
              "waktu kerja tidak efisien;",
              "data mudah hilang;",
              "keputusan usaha tidak berbasis catatan;",
              "peluang digitalisasi terhambat;",
              "ketergantungan kepada pihak lain tetap tinggi.",
            ],
          },
          {
            type: "subheading",
            text: "Bagi ekosistem",
          },
          {
            type: "bullet-list",
            items: [
              "potensi talenta muda tidak tersalurkan;",
              "digitalisasi UMKM berjalan lambat;",
              "inovasi lokal tidak bertumbuh;",
              "kolaborasi berhenti pada acara, bukan implementasi.",
            ],
          },
        ],
      },
      {
        id: "rumusan-masalah",
        title: "Rumusan masalah",
        blocks: [
          {
            type: "quote",
            text: "Bagaimana menghubungkan mahasiswa yang memiliki akses terhadap AI dan kemampuan teknologi dengan UMKM yang memiliki permasalahan operasional nyata agar keduanya dapat berkolaborasi menciptakan sistem digital yang sederhana, relevan, dapat diuji, dan dapat digunakan secara berulang?",
          },
        ],
      },
      {
        id: "batasan-masalah",
        title: "Batasan masalah",
        blocks: [
          {
            type: "paragraph",
            text: "Project difokuskan pada:",
          },
          {
            type: "bullet-list",
            items: [
              "UMKM di Kota Makassar;",
              "mahasiswa yang mempunyai minat teknologi;",
              "kebutuhan operasional sederhana;",
              "prototype sistem digital;",
              "pengembangan berbantuan AI;",
              "sistem yang dapat digunakan melalui smartphone atau perangkat umum;",
              "proses testing dan handover.",
            ],
          },
          {
            type: "paragraph",
            text: "Project tidak menargetkan:",
          },
          {
            type: "bullet-list",
            items: [
              "aplikasi enterprise;",
              "payment gateway;",
              "sistem akuntansi lengkap;",
              "integrasi kompleks;",
              "sistem produksi kritis;",
              "pengolahan data sensitif;",
              "pembangunan produk komersial penuh dalam satu hari.",
            ],
          },
        ],
      },
      {
        id: "hipotesis-awal",
        title: "Hipotesis awal",
        blocks: [
          {
            type: "paragraph",
            text: "Apabila mahasiswa:",
          },
          {
            type: "bullet-list",
            items: [
              "dipertemukan dengan pengguna nyata;",
              "diberikan proses problem discovery;",
              "memperoleh starter kit;",
              "menggunakan AI sebagai co-developer;",
              "bekerja dalam tim;",
              "melakukan testing bersama UMKM;",
            ],
          },
          {
            type: "paragraph",
            text: "maka mahasiswa dapat bergerak dari AI user menjadi solution creator, sementara UMKM memperoleh prototype sistem yang lebih relevan terhadap kebutuhan usahanya.",
          },
        ],
      },
      {
        id: "rencana-validasi-pekan-2",
        title: "Rencana validasi Pekan 2",
        blocks: [
          {
            type: "paragraph",
            text: "Identifikasi awal ini akan divalidasi melalui wawancara atau observasi kepada minimal tiga stakeholder dan diprioritaskan kepada:",
          },
          {
            type: "numbered-list",
            items: [
              "pelaku UMKM;",
              "mahasiswa calon peserta;",
              "pendamping UMKM atau Rumah BUMN;",
              "praktisi teknologi;",
              "calon pemateri atau reviewer.",
            ],
          },
          {
            type: "subheading",
            text: "Pertanyaan kepada UMKM",
          },
          {
            type: "bullet-list",
            items: [
              "Pekerjaan apa yang paling sering dilakukan secara berulang?",
              "Proses apa yang paling banyak memakan waktu?",
              "Data apa yang masih dicatat secara manual?",
              "Kesalahan apa yang paling sering terjadi?",
              "Sistem apa yang pernah digunakan?",
              "Mengapa sistem tersebut digunakan atau ditinggalkan?",
              "Perangkat apa yang tersedia?",
              "Sistem seperti apa yang masih realistis digunakan setelah program?",
            ],
          },
          {
            type: "subheading",
            text: "Pertanyaan kepada mahasiswa",
          },
          {
            type: "bullet-list",
            items: [
              "Untuk kebutuhan apa AI paling sering digunakan?",
              "Apakah pernah membangun sistem untuk pengguna nyata?",
              "Bagian apa yang paling sulit dalam memahami kebutuhan pengguna?",
              "Kemampuan teknis dan perangkat apa yang dimiliki?",
              "Seberapa siap bekerja dengan UMKM?",
              "Apa risiko penggunaan AI dalam coding dan pengolahan data?",
            ],
          },
          {
            type: "subheading",
            text: "Indikator masalah tervalidasi",
          },
          {
            type: "paragraph",
            text: "Masalah dinilai layak apabila:",
          },
          {
            type: "bullet-list",
            items: [
              "terjadi secara berulang;",
              "berdampak terhadap usaha;",
              "datanya tersedia;",
              "dapat dibuat prototype;",
              "mudah diverifikasi;",
              "dapat digunakan melalui perangkat UMKM;",
              "mempunyai potensi penggunaan ulang.",
            ],
          },
        ],
      },
      {
        id: "kesimpulan-identifikasi-awal",
        title: "Kesimpulan identifikasi awal",
        blocks: [
          {
            type: "paragraph",
            text: "Isu sosial yang dipilih adalah kesenjangan antara tingginya akses mahasiswa terhadap AI dan rendahnya pengalaman mengubah AI menjadi solusi digital bagi pengguna nyata, khususnya UMKM yang mempunyai masalah operasional berulang.",
          },
          {
            type: "paragraph",
            text: "AI Co-Creation Lab Makassar dirancang sebagai pilot lokal untuk mempertemukan dua kelompok tersebut melalui proses problem discovery, pengembangan berbantuan AI, testing, handover, dan monitoring.",
          },
        ],
      },
    ],
    leadershipReflection: {
      quote:
        "Identifikasi masalah mengajarkan bahwa solusi tidak boleh dimulai dari teknologi yang ingin dibuat. Solusi harus dimulai dari orang yang mengalami masalah, konteks kesehariannya, kemampuan menggunakan sistem, dan perubahan yang benar-benar dibutuhkan.",
      paragraphs: [],
    },
    outputs: [
      "dokumen identifikasi isu sosial;",
      "rumusan masalah;",
      "pemetaan kelompok terdampak;",
      "akar masalah;",
      "dampak masalah;",
      "hipotesis awal;",
      "rencana validasi Pekan 2;",
      "indikator masalah tervalidasi.",
    ],
    progressDescription:
      "Identifikasi masalah sosial awal telah dilakukan dengan menetapkan isu kesenjangan pemanfaatan AI secara produktif antara mahasiswa dan pelaku UMKM di Kota Makassar. Mahasiswa telah memiliki akses terhadap AI dan perangkat, tetapi belum banyak menggunakannya untuk membangun solusi bagi pengguna nyata. Sementara itu, UMKM memiliki masalah operasional berulang, tetapi terbatas dalam akses developer, biaya, perangkat, kemampuan menjelaskan kebutuhan, dan pendampingan. Hasil identifikasi ini menjadi dasar AI Co-Creation Lab Makassar dan akan divalidasi lebih lanjut melalui wawancara stakeholder pada Pekan 2.",
    progressUrl:
      "https://event.dekatlokal.com/ai-co-creation-lab-makassar/progress/identifikasi-masalah-sosial",
    evidence: [],
  },
  {
    slug: "mini-project-canvas",
    title: "Mini Project Canvas",
    metadataTitle: "Mini Project Canvas | AI Co-Creation Lab Makassar",
    weekLabel: "GEP WEEK 1",
    phase: "DISCOVER YOURSELF & BUILD YOUR NETWORK",
    subtitle:
      "Konsep awal AI Co-Creation Lab Makassar berdasarkan problem, solution, stakeholder, output, outcome, dan timeline.",
    status: "Initial Canvas Completed",
    nextStep: "Validation and Refinement",
    updatedAt: "30 Juli 2026",
    updatedAtIso: "2026-07-30",
    route: "/ai-co-creation-lab-makassar/progress/mini-project-canvas",
    download: miniProjectCanvasPdf,
    sections: [
      {
        id: "project-identity",
        title: "Project identity",
        blocks: [
          {
            type: "definition-list",
            items: [
              {
                label: "Nama project:",
                value: "AI Co-Creation Lab Makassar",
              },
              {
                label: "Tagline:",
                value: "From AI Users to Local Problem Solvers",
              },
              {
                label: "Penyelenggara:",
                value: "DekatLokal",
              },
              {
                label: "Lokasi:",
                value:
                  "Balai Besar Pelatihan Komunikasi dan Digital Makassar",
              },
              {
                label: "Tanggal kegiatan utama:",
                value: "Senin, 10 Agustus 2026",
              },
              {
                label: "Waktu:",
                value: "13.00–16.30 WITA",
              },
              {
                label: "Target:",
                value: "20 mahasiswa dan 5 UMKM",
              },
              {
                label: "Format:",
                value: "5 tim, masing-masing 4 mahasiswa dan 1 UMKM",
              },
            ],
          },
        ],
      },
      {
        id: "problem",
        title: "1. Problem",
        blocks: [
          {
            type: "paragraph",
            text: "Mahasiswa semakin sering menggunakan AI, tetapi penggunaannya masih banyak berorientasi pada pencarian informasi, penyelesaian tugas, rangkuman, dan kebutuhan individual.",
          },
          {
            type: "paragraph",
            text: "Mahasiswa belum banyak memperoleh pengalaman untuk:",
          },
          {
            type: "bullet-list",
            items: [
              "menemukan masalah pengguna;",
              "memvalidasi kebutuhan;",
              "menyusun requirement;",
              "membangun prototype;",
              "melakukan testing;",
              "menyerahkan sistem kepada pengguna.",
            ],
          },
          {
            type: "paragraph",
            text: "Pada sisi lain, pelaku UMKM mempunyai masalah operasional berulang, seperti transaksi manual, pesanan yang tidak tercatat, stok yang tidak terpantau, jadwal yang bentrok, katalog yang tidak teratur, dan data pelanggan yang tersebar.",
          },
          {
            type: "paragraph",
            text: "UMKM sering terkendala dalam akses developer, biaya, perangkat, kemampuan menjelaskan kebutuhan, dan pendampingan.",
          },
        ],
      },
      {
        id: "solution",
        title: "2. Solution",
        blocks: [
          {
            type: "paragraph",
            text: "AI Co-Creation Lab Makassar mempertemukan 20 mahasiswa dengan 5 UMKM dalam lima tim kolaboratif.",
          },
          {
            type: "paragraph",
            text: "Mahasiswa menggunakan AI sebagai alat bantu untuk:",
          },
          {
            type: "bullet-list",
            items: [
              "memahami kebutuhan;",
              "membuat user flow;",
              "merancang antarmuka;",
              "menyusun struktur data;",
              "menghasilkan kode;",
              "melakukan debugging;",
              "mempercepat prototyping;",
              "membuat dokumentasi.",
            ],
          },
          {
            type: "paragraph",
            text: "Sistem akhirnya tidak wajib memiliki fitur AI. Sistem dapat berupa:",
          },
          {
            type: "bullet-list",
            items: [
              "POS Lite;",
              "order management;",
              "inventory tracker;",
              "booking system;",
              "customer record;",
              "invoice generator;",
              "digital catalog;",
              "production checklist;",
              "cashflow tracker;",
              "sistem administrasi sederhana lainnya.",
            ],
          },
          {
            type: "paragraph",
            text: "Sistem dipilih berdasarkan kebutuhan UMKM, bukan berdasarkan teknologi yang ingin dibuat mahasiswa. Konsep ini sesuai dengan rancangan program yang menempatkan AI sebagai alat bantu pengembangan dan menghasilkan sistem digital sesuai kebutuhan operasional UMKM.",
          },
        ],
      },
      {
        id: "target-beneficiaries",
        title: "3. Target beneficiaries",
        blocks: [
          {
            type: "subheading",
            text: "Penerima manfaat langsung",
          },
          {
            type: "bullet-list",
            items: ["5 UMKM Kota Makassar."],
          },
          {
            type: "subheading",
            text: "Peserta pengembang",
          },
          {
            type: "bullet-list",
            items: ["20 mahasiswa dengan minat teknologi."],
          },
          {
            type: "subheading",
            text: "Penerima manfaat tidak langsung",
          },
          {
            type: "bullet-list",
            items: [
              "pelanggan UMKM;",
              "pegawai UMKM;",
              "komunitas mahasiswa;",
              "institusi pendukung;",
              "ekosistem inovasi lokal.",
            ],
          },
        ],
      },
      {
        id: "team-composition",
        title: "4. Team composition",
        blocks: [
          {
            type: "paragraph",
            text: "Setiap tim terdiri dari empat mahasiswa dengan pembagian peran:",
          },
          {
            type: "subheading",
            text: "Problem Facilitator",
          },
          {
            type: "bullet-list",
            items: [
              "memimpin wawancara;",
              "merumuskan masalah;",
              "menjaga kesesuaian sistem dengan kebutuhan UMKM.",
            ],
          },
          {
            type: "subheading",
            text: "AI-Assisted Developer",
          },
          {
            type: "bullet-list",
            items: [
              "mengembangkan sistem;",
              "menggunakan AI coding assistant;",
              "mengelola logic dan fungsi inti.",
            ],
          },
          {
            type: "subheading",
            text: "UI/UX and Quality Reviewer",
          },
          {
            type: "bullet-list",
            items: [
              "menyusun alur pengguna;",
              "memastikan tampilan mudah dipahami;",
              "menguji fungsi dan kualitas output.",
            ],
          },
          {
            type: "subheading",
            text: "Documentation and User Trainer",
          },
          {
            type: "bullet-list",
            items: [
              "membuat dokumentasi;",
              "menyiapkan panduan;",
              "memimpin handover kepada UMKM.",
            ],
          },
          {
            type: "paragraph",
            text: "UMKM berperan sebagai:",
          },
          {
            type: "bullet-list",
            items: [
              "pemilik masalah;",
              "sumber kebutuhan;",
              "pengguna penguji;",
              "pemberi feedback;",
              "penerima manfaat;",
              "co-creator solusi.",
            ],
          },
        ],
      },
      {
        id: "stakeholder-and-partnership",
        title: "5. Stakeholder and partnership",
        blocks: [
          {
            type: "table",
            headers: ["Stakeholder", "Peran"],
            rows: [
              [
                "DekatLokal",
                "Penyelenggara, project management, platform dan monitoring",
              ],
              ["BAKTI NUSA", "Program support dan evaluasi"],
              ["GREAT Edunesia", "Program support"],
              ["Dompet Dhuafa", "Program ecosystem support"],
              ["Komdigi Makassar", "Venue dan fasilitas"],
              [
                "Universitas Hasanuddin",
                "Knowledge and talent network",
              ],
              ["Rumah BUMN Makassar", "Akses dan jejaring UMKM"],
              ["Mahasiswa", "Problem solver dan developer"],
              ["UMKM", "Challenge partner dan co-creator"],
              ["Pemateri", "Knowledge support"],
              [
                "Sponsor",
                "Dukungan apparel, identity, merchandise dan konsumsi",
              ],
              ["Komunitas teknologi", "Mentor dan reviewer"],
              [
                "Media dan komunitas",
                "Publikasi dan participant outreach",
              ],
            ],
          },
        ],
      },
      {
        id: "key-activities",
        title: "6. Key activities",
        blocks: [
          {
            type: "subheading",
            text: "Discovery",
          },
          {
            type: "bullet-list",
            items: [
              "memetakan jejaring;",
              "mengidentifikasi masalah sosial;",
              "menyusun canvas;",
              "menentukan calon penerima manfaat.",
            ],
          },
          {
            type: "subheading",
            text: "Validation",
          },
          {
            type: "bullet-list",
            items: [
              "mewawancarai UMKM;",
              "mengidentifikasi kebutuhan prioritas;",
              "memetakan perangkat dan data;",
              "menilai kelayakan sistem.",
            ],
          },
          {
            type: "subheading",
            text: "Preparation",
          },
          {
            type: "bullet-list",
            items: [
              "menyeleksi mahasiswa;",
              "melakukan matching;",
              "menyiapkan starter kit;",
              "menyusun requirement;",
              "mempersiapkan pemateri dan mentor.",
            ],
          },
          {
            type: "subheading",
            text: "Implementation",
          },
          {
            type: "bullet-list",
            items: [
              "bootcamp;",
              "final problem framing;",
              "co-creation;",
              "AI-assisted development;",
              "testing;",
              "demo;",
              "handover awal.",
            ],
          },
          {
            type: "subheading",
            text: "Monitoring",
          },
          {
            type: "bullet-list",
            items: [
              "penyempurnaan sistem;",
              "pembuatan panduan;",
              "monitoring H+3 dan H+7;",
              "pengukuran dampak;",
              "dokumentasi dan laporan.",
            ],
          },
        ],
      },
      {
        id: "outputs",
        title: "7. Outputs",
        blocks: [
          {
            type: "paragraph",
            text: "Target output program:",
          },
          {
            type: "bullet-list",
            items: [
              "20 mahasiswa terlibat;",
              "5 UMKM terlibat;",
              "5 tim terbentuk;",
              "5 masalah UMKM tervalidasi;",
              "5 system requirement briefs;",
              "5 prototype sistem digital;",
              "5 sesi testing;",
              "5 panduan penggunaan;",
              "5 video tutorial;",
              "5 proses handover;",
              "dokumentasi kegiatan;",
              "progress report;",
              "impact report;",
              "showcase sistem pada DekatLokal Event.",
            ],
          },
        ],
      },
      {
        id: "outcomes",
        title: "8. Outcomes",
        blocks: [
          {
            type: "subheading",
            text: "Outcome bagi mahasiswa",
          },
          {
            type: "bullet-list",
            items: [
              "mampu menggunakan AI sebagai alat penciptaan;",
              "memahami kebutuhan pengguna;",
              "memperoleh pengalaman product development;",
              "mampu bekerja dengan pengguna nyata;",
              "mempunyai portofolio berbasis dampak.",
            ],
          },
          {
            type: "subheading",
            text: "Outcome bagi UMKM",
          },
          {
            type: "bullet-list",
            items: [
              "kebutuhan digital prioritas teridentifikasi;",
              "memperoleh prototype yang relevan;",
              "mampu mencoba sistem;",
              "memperoleh panduan penggunaan;",
              "memiliki dasar untuk melanjutkan digitalisasi.",
            ],
          },
          {
            type: "subheading",
            text: "Outcome bagi ekosistem",
          },
          {
            type: "bullet-list",
            items: [
              "terbentuk hubungan antara mahasiswa dan UMKM;",
              "muncul model kolaborasi yang dapat direplikasi;",
              "meningkatnya pemanfaatan AI secara produktif;",
              "menguatnya ekosistem inovasi lokal Makassar.",
            ],
          },
        ],
      },
      {
        id: "impact-indicators",
        title: "9. Impact indicators",
        blocks: [
          {
            type: "table",
            headers: ["Indikator", "Target"],
            align: ["left", "right"],
            rows: [
              ["Mahasiswa terlibat", "20 orang"],
              ["UMKM terlibat", "5 usaha"],
              ["Tim terbentuk", "5 tim"],
              ["Masalah tervalidasi", "5 masalah"],
              ["Prototype sistem", "5 sistem"],
              ["Prototype diuji", "5 sistem"],
              ["Panduan penggunaan", "5 panduan"],
              ["UMKM mampu mencoba", "5 UMKM"],
              ["Sistem digunakan kembali", "Minimal 3 sistem"],
              ["Dokumentasi dan testimoni", "100% tim"],
            ],
          },
          {
            type: "paragraph",
            text: "Target tidak akan ditampilkan sebagai capaian sebelum proses pengukuran dilakukan.",
          },
        ],
      },
      {
        id: "value-proposition",
        title: "10. Value proposition",
        blocks: [
          {
            type: "subheading",
            text: "Untuk mahasiswa",
          },
          {
            type: "quote",
            text: "Belajar membangun sistem dari masalah nyata, bukan hanya dari tutorial.",
          },
          {
            type: "subheading",
            text: "Untuk UMKM",
          },
          {
            type: "quote",
            text: "Memperoleh prototype yang lahir dari kebutuhan usaha sendiri.",
          },
          {
            type: "subheading",
            text: "Untuk mitra",
          },
          {
            type: "quote",
            text: "Mendukung pengembangan talenta muda dan digitalisasi UMKM dengan output yang terukur.",
          },
          {
            type: "subheading",
            text: "Untuk DekatLokal",
          },
          {
            type: "quote",
            text: "Menguji model kolaborasi mahasiswa–UMKM yang dapat direplikasi pada event dan program selanjutnya.",
          },
        ],
      },
      {
        id: "timeline",
        title: "11. Timeline",
        blocks: [
          {
            type: "project-timeline",
            items: miniProjectTimeline,
          },
        ],
      },
      {
        id: "sustainability-plan",
        title: "12. Sustainability plan",
        blocks: [
          {
            type: "paragraph",
            text: "Keberlanjutan project dibangun melalui:",
          },
          {
            type: "bullet-list",
            items: [
              "starter kit yang dapat digunakan kembali;",
              "dokumentasi dan panduan;",
              "monitoring setelah kegiatan;",
              "showcase sistem;",
              "talent network mahasiswa;",
              "database kebutuhan UMKM;",
              "penggunaan `event.dekatlokal.com`;",
              "pengembangan event untuk program selanjutnya;",
              "kemungkinan pendampingan lanjutan melalui DekatLokal.",
            ],
          },
        ],
      },
      {
        id: "risks-and-mitigation",
        title: "13. Risks and mitigation",
        blocks: [
          {
            type: "table",
            headers: ["Risiko", "Mitigasi"],
            rows: [
              [
                "Kebutuhan UMKM terlalu kompleks",
                "Membatasi pada satu fungsi prioritas",
              ],
              [
                "Mahasiswa tidak sesuai kebutuhan",
                "Kurasi dan matching berdasarkan kemampuan",
              ],
              [
                "Waktu pengembangan terbatas",
                "Starter kit dan persiapan sebelum kegiatan",
              ],
              [
                "Perangkat UMKM terbatas",
                "Mahasiswa menyediakan laptop, output dibuat mobile-friendly",
              ],
              [
                "Output AI tidak akurat",
                "Human verification dan quality review",
              ],
              [
                "Sistem tidak digunakan kembali",
                "Handover, tutorial dan monitoring",
              ],
              [
                "Data sensitif terbuka",
                "Menggunakan dummy atau data yang dianonimkan",
              ],
              [
                "Prototype belum siap produksi",
                "Menjelaskan batas prototype dan rencana pengembangan",
              ],
            ],
          },
        ],
      },
    ],
    leadershipReflection: {
      quote:
        "Mini Project Canvas membantu menerjemahkan ide besar menjadi hubungan yang lebih jelas antara masalah, solusi, stakeholder, aktivitas, output, outcome, indikator, risiko, dan keberlanjutan.",
      paragraphs: [
        "Project ini bukan hanya kegiatan satu hari. Hari pelaksanaan merupakan bagian dari proses yang dimulai melalui discovery dan validation, kemudian dilanjutkan dengan refinement, monitoring, impact measurement, dan reflection.",
      ],
    },
    outputs: [
      "problem;",
      "solution;",
      "stakeholder and partnership;",
      "key activities;",
      "outputs;",
      "outcomes;",
      "impact indicators;",
      "timeline;",
      "sustainability plan;",
      "risks and mitigation.",
    ],
    progressDescription: updatedMiniProjectProgressDescription,
    progressUrl:
      "https://event.dekatlokal.com/ai-co-creation-lab-makassar/progress/mini-project-canvas",
    evidence: [],
  },
];

export const GEP_WEEK_ONE_REPORTS_BY_SLUG = new Map<
  GepWeekOneReportSlug,
  GepWeekOneReport
>(GEP_WEEK_ONE_REPORTS.map((report) => [report.slug, report]));

export function getGepWeekOneReport(
  slug: string,
): GepWeekOneReport | undefined {
  return GEP_WEEK_ONE_REPORTS_BY_SLUG.get(slug as GepWeekOneReportSlug);
}

export const reports = GEP_WEEK_ONE_REPORTS;
export const reportSlugs = GEP_WEEK_ONE_REPORT_SLUGS;
