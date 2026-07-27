export const JOURNEY_ACTIVITY_SLUGS = [
  "personal-leadership-profile",
  "leadership-branding",
  "network-mapping",
  "social-issue",
  "project-canvas",
  "problem-validation",
  "partnership",
  "pitching",
  "action-plan",
  "global-communication",
  "meet-the-leader",
  "leadership-conversation",
  "implementation",
  "network-mobilization",
  "process-documentation",
  "monitoring",
  "impact-measurement",
  "leadership-reflection",
  "final-presentation",
] as const;

export type JourneyActivitySlug =
  (typeof JOURNEY_ACTIVITY_SLUGS)[number];
export type JourneyWeekNumber = 1 | 2 | 3 | 4;
export type JourneyStatus =
  | "planned"
  | "in_progress"
  | "completed"
  | "published";
export type EvidenceType =
  | "document"
  | "photo"
  | "video"
  | "social"
  | "drive"
  | "website";

export interface JourneyEvidence {
  readonly label: string;
  readonly href: string;
  readonly type: EvidenceType;
}

interface JourneyActivityDefinition {
  readonly slug: JourneyActivitySlug;
  readonly week: JourneyWeekNumber;
  readonly title: string;
  readonly shortDescription: string;
  readonly progressDescription: string;
  readonly output: readonly string[];
  readonly status: JourneyStatus;
  readonly updatedAt: string | null;
  readonly evidence: readonly JourneyEvidence[];
  readonly leadershipInsight: string;
}

export interface JourneyActivity extends JourneyActivityDefinition {
  readonly route: string;
  /**
   * Alias ergonomis untuk `output`, sehingga komponen dapat memakai bentuk
   * plural tanpa membuat sumber data kedua.
   */
  readonly outputs: readonly string[];
}

export interface JourneyWeekDefinition {
  readonly week: JourneyWeekNumber;
  readonly title: string;
  readonly theme: string;
  readonly description: string;
}

export interface JourneyWeek extends JourneyWeekDefinition {
  readonly activities: readonly JourneyActivity[];
}

export const journeyStatusLabels = {
  planned: "Direncanakan",
  in_progress: "Dalam Proses",
  completed: "Selesai",
  published: "Dipublikasikan",
} as const satisfies Record<JourneyStatus, string>;

export const journeyWeekDefinitions = [
  {
    week: 1,
    title: "Week 1",
    theme: "Discover Yourself & Build Your Network",
    description:
      "Membangun fondasi identitas kepemimpinan, narasi diri, pemetaan jejaring, pemahaman isu, dan konsep mini project.",
  },
  {
    week: 2,
    title: "Week 2",
    theme: "Connect & Collaborate",
    description:
      "Memvalidasi permasalahan, membangun partnership, mematangkan pitch, dan menerjemahkan konsep menjadi rencana aksi.",
  },
  {
    week: 3,
    title: "Week 3",
    theme: "Lead The Action",
    description:
      "Belajar dari pemimpin, menggerakkan jejaring, menjalankan mini project, dan menjaga dokumentasi proses.",
  },
  {
    week: 4,
    title: "Week 4",
    theme: "Create Impact & Reflection",
    description:
      "Menyelesaikan monitoring, mengukur dampak, merefleksikan kepemimpinan, dan menyajikan pembelajaran akhir.",
  },
] as const satisfies readonly JourneyWeekDefinition[];

const journeyActivityDefinitions = [
  {
    slug: "personal-leadership-profile",
    week: 1,
    title: "Personal Leadership Profile",
    shortDescription:
      "Mengenali nilai, kekuatan, area pengembangan, dan peran kepemimpinan dalam mini project.",
    progressDescription:
      "Aktivitas ini direncanakan untuk menyusun profil kepemimpinan personal yang menjelaskan nilai utama, kekuatan, area pengembangan, dan kontribusi yang ingin dibawa dalam AI Co-Creation Lab Makassar. Hasil belum ditandai selesai dan bukti belum dipublikasikan.",
    output: [
      "Ringkasan nilai dan kekuatan personal.",
      "Area pengembangan kepemimpinan.",
      "Pernyataan kontribusi untuk mini project.",
    ],
    status: "planned",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Fokus kepemimpinan: memahami diri sebelum mengarahkan kolaborasi dan mengambil keputusan project.",
  },
  {
    slug: "leadership-branding",
    week: 1,
    title: "Leadership Branding",
    shortDescription:
      "Merumuskan narasi kepemimpinan yang autentik dan relevan dengan kontribusi project.",
    progressDescription:
      "Aktivitas ini direncanakan untuk merumuskan leadership branding yang menghubungkan identitas personal, komitmen pada problem solving, dan peran sebagai penggerak kolaborasi mahasiswa–UMKM. Narasi final dan bukti publikasi belum tersedia.",
    output: [
      "Pernyataan leadership branding.",
      "Pesan utama kontribusi sosial.",
      "Rencana kanal komunikasi yang sesuai.",
    ],
    status: "planned",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Fokus kepemimpinan: membangun kredibilitas melalui tindakan dan komunikasi yang konsisten, bukan klaim yang berlebihan.",
  },
  {
    slug: "network-mapping",
    week: 1,
    title: "Leadership Network Mapping",
    shortDescription:
      "Memetakan stakeholder, potensi kontribusi, hubungan, dan tindak lanjut partnership.",
    progressDescription:
      "Pemetaan jejaring awal telah disusun dengan mengidentifikasi Rumah BUMN Makassar, pelaku UMKM, mahasiswa, Universitas Hasanuddin, komunitas teknologi, DekatLokal, calon mitra tempat, serta BAKTI NUSA sebagai stakeholder potensial atau konteks program. Potensi kontribusi dan tindak lanjut dipetakan sebagai dasar pembangunan partnership; status keterlibatan setiap pihak tetap menunggu konfirmasi.",
    output: [
      "Peta stakeholder awal.",
      "Hipotesis kontribusi setiap stakeholder.",
      "Prioritas pendekatan dan tindak lanjut.",
      "Catatan status konfirmasi jejaring.",
    ],
    status: "in_progress",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Pemetaan jejaring membantu melihat hubungan sebagai pertukaran nilai yang perlu dikelola secara jujur dan berkelanjutan.",
  },
  {
    slug: "social-issue",
    week: 1,
    title: "Identifikasi Masalah Sosial",
    shortDescription:
      "Mengidentifikasi kesenjangan akses, kemampuan, dan pendampingan antara mahasiswa dan UMKM.",
    progressDescription:
      "Observasi awal menunjukkan adanya kesenjangan antara mahasiswa yang memiliki akses terhadap perangkat dan teknologi AI dengan pelaku UMKM yang memiliki permasalahan usaha nyata tetapi terbatas dalam perangkat, literasi, dan pendampingan. Isu ini masih perlu divalidasi melalui wawancara stakeholder.",
    output: [
      "Rumusan awal isu sosial.",
      "Hipotesis penyebab dan pihak terdampak.",
      "Daftar pertanyaan validasi stakeholder.",
    ],
    status: "in_progress",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Pemimpin perlu menahan asumsi dan memberi ruang bagi pengalaman stakeholder sebelum menetapkan masalah.",
  },
  {
    slug: "project-canvas",
    week: 1,
    title: "Mini Project Canvas",
    shortDescription:
      "Menyusun konsep awal program, pengguna, nilai, aktivitas, output, dan indikator dampak.",
    progressDescription:
      "Konsep awal AI Co-Creation Lab Makassar disusun dengan kuota 20 mahasiswa dan 5 UMKM. Peserta direncanakan merancang solusi AI sederhana berdasarkan permasalahan nyata melalui bootcamp dan co-creation selama satu hari. Canvas masih dapat berubah mengikuti hasil validasi dan partnership.",
    output: [
      "Rumusan masalah dan sasaran.",
      "Value proposition program.",
      "Rangkaian aktivitas utama.",
      "Target output dan indikator awal.",
      "Asumsi serta risiko yang perlu divalidasi.",
    ],
    status: "in_progress",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Canvas dipakai sebagai alat menyelaraskan arah, bukan sebagai alasan untuk mengabaikan temuan baru.",
  },
  {
    slug: "problem-validation",
    week: 2,
    title: "Validasi Permasalahan",
    shortDescription:
      "Menguji asumsi masalah bersama calon challenge partner dan stakeholder relevan.",
    progressDescription:
      "Validasi direncanakan melalui percakapan terstruktur dengan calon challenge partner UMKM. Proses akan menilai frekuensi masalah, dampak terhadap usaha, cara yang dipakai saat ini, perangkat yang tersedia, dan batas data yang aman. Temuan aktual belum tersedia.",
    output: [
      "Panduan wawancara validasi.",
      "Ringkasan temuan tanpa data sensitif.",
      "Pernyataan masalah yang telah diperbarui.",
      "Keputusan lanjut, ubah, atau hentikan asumsi challenge.",
    ],
    status: "planned",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Fokus kepemimpinan: mendengar dengan disiplin dan bersedia mengubah rencana ketika bukti tidak mendukung asumsi.",
  },
  {
    slug: "partnership",
    week: 2,
    title: "Membangun Partnership",
    shortDescription:
      "Menyusun nilai kolaborasi, kebutuhan kontribusi, dan status komitmen setiap calon mitra.",
    progressDescription:
      "Aktivitas partnership direncanakan dengan menyiapkan proposal nilai yang spesifik untuk setiap pihak, mencatat bentuk dukungan yang dibutuhkan, dan membedakan calon mitra dari mitra yang sudah menyetujui keterlibatan. Belum ada partner eksternal yang ditampilkan sebagai mitra aktif.",
    output: [
      "Daftar prioritas calon mitra.",
      "Proposisi nilai per calon mitra.",
      "Catatan komunikasi dan tindak lanjut.",
      "Status persetujuan nama dan logo.",
    ],
    status: "planned",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Partnership yang sehat dibangun dari tujuan bersama, ekspektasi yang jelas, dan penghormatan terhadap persetujuan.",
  },
  {
    slug: "pitching",
    week: 2,
    title: "Pitching Mini Project",
    shortDescription:
      "Menyampaikan masalah, rancangan program, kebutuhan dukungan, dan ukuran keberhasilan secara ringkas.",
    progressDescription:
      "Pitch mini project akan disusun setelah temuan validasi cukup untuk mendukung narasi masalah. Materi direncanakan menjelaskan konteks, konsep AI Co-Creation Lab, batas lingkup satu hari, target, kebutuhan partnership, risiko, dan rencana pengukuran tanpa mengklaim hasil yang belum terjadi.",
    output: [
      "Pitch deck mini project.",
      "Narasi pitch singkat.",
      "Daftar kebutuhan dukungan.",
      "Catatan pertanyaan dan umpan balik.",
    ],
    status: "planned",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Pitching adalah latihan mengubah kompleksitas menjadi ajakan kolaborasi yang jelas dan dapat dipertanggungjawabkan.",
  },
  {
    slug: "action-plan",
    week: 2,
    title: "Finalisasi Action Plan",
    shortDescription:
      "Mengubah konsep menjadi urutan kerja, penanggung jawab, kebutuhan, risiko, dan titik keputusan.",
    progressDescription:
      "Action plan final akan disusun setelah problem validation dan pembicaraan partnership. Rencana akan memuat persiapan peserta, validasi challenge, pembagian tim, bootcamp, co-creation, testing, handover, dokumentasi, dan monitoring. Tanggal final serta penanggung jawab belum dipublikasikan.",
    output: [
      "Timeline kerja.",
      "Pembagian peran dan penanggung jawab.",
      "Daftar kebutuhan operasional.",
      "Risk register dan rencana mitigasi.",
      "Checklist kesiapan kegiatan.",
    ],
    status: "planned",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Fokus kepemimpinan: menerjemahkan visi menjadi keputusan, kepemilikan tugas, dan batas waktu yang realistis.",
  },
  {
    slug: "global-communication",
    week: 2,
    title: "Global Communication",
    shortDescription:
      "Melatih komunikasi lintas konteks agar project lokal dapat dipahami audiens yang lebih luas.",
    progressDescription:
      "Aktivitas ini direncanakan untuk menyusun penjelasan project yang ringkas, kontekstual, dan dapat dipahami oleh audiens di luar Makassar. Materi akan menjaga istilah lokal tetap terjelaskan serta membedakan target, proses, dan dampak aktual. Output komunikasi belum dipublikasikan.",
    output: [
      "Ringkasan project dalam format komunikasi global.",
      "Glosarium konteks lokal yang diperlukan.",
      "Versi pesan untuk audiens berbeda.",
    ],
    status: "planned",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Komunikasi lintas konteks membutuhkan kejelasan, empati terhadap audiens, dan ketelitian menjaga makna.",
  },
  {
    slug: "meet-the-leader",
    week: 3,
    title: "Meet the Leader Challenge",
    shortDescription:
      "Mempersiapkan pertemuan pembelajaran dengan pemimpin yang relevan terhadap project.",
    progressDescription:
      "Pertemuan dengan pemimpin belum dilaksanakan. Persiapan direncanakan mencakup pemilihan narasumber yang relevan, tujuan belajar, pertanyaan tentang mobilisasi jejaring dan pengambilan keputusan, serta permintaan persetujuan dokumentasi.",
    output: [
      "Kriteria dan pilihan narasumber.",
      "Tujuan percakapan.",
      "Daftar pertanyaan.",
      "Catatan persetujuan dokumentasi.",
    ],
    status: "planned",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Fokus kepemimpinan: datang dengan rasa ingin tahu dan menghargai waktu serta pengalaman narasumber.",
  },
  {
    slug: "leadership-conversation",
    week: 3,
    title: "Leadership Conversation Report",
    shortDescription:
      "Menyusun laporan percakapan dan menerjemahkan pelajaran menjadi keputusan project.",
    progressDescription:
      "Laporan belum tersedia karena percakapan belum dilaksanakan. Setelah kegiatan, laporan direncanakan memuat konteks narasumber yang disetujui, pokok pembelajaran, relevansi terhadap mini project, keputusan yang berubah, dan tindak lanjut.",
    output: [
      "Ringkasan percakapan.",
      "Pelajaran kepemimpinan utama.",
      "Implikasi terhadap keputusan project.",
      "Rencana tindak lanjut.",
    ],
    status: "planned",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Percakapan menjadi bernilai ketika pembelajaran diterjemahkan menjadi perubahan tindakan yang dapat diamati.",
  },
  {
    slug: "implementation",
    week: 3,
    title: "Pelaksanaan Mini Project",
    shortDescription:
      "Menjalankan bootcamp, co-creation, testing, demo, dan handover sesuai batas lingkup.",
    progressDescription:
      "Pelaksanaan AI Co-Creation Lab Makassar belum berlangsung. Pada tahap implementasi, empat tim yang direncanakan akan bekerja bersama challenge partner untuk membuat solusi sederhana, melakukan verifikasi, menguji langkah utama, dan menyerahkan panduan penggunaan.",
    output: [
      "Catatan pelaksanaan.",
      "Workflow atau prototype per tim.",
      "Hasil testing.",
      "Panduan penggunaan.",
      "Daftar batasan dan tindak lanjut.",
    ],
    status: "planned",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Fokus kepemimpinan: menjaga arah dan keselamatan proses sambil memberi ruang kepada tim untuk mengambil peran.",
  },
  {
    slug: "network-mobilization",
    week: 3,
    title: "Mobilisasi Jejaring",
    shortDescription:
      "Mengaktifkan kontribusi stakeholder berdasarkan kebutuhan nyata dan komitmen yang telah disepakati.",
    progressDescription:
      "Mobilisasi jejaring belum dilaksanakan. Aktivitas direncanakan untuk mencocokkan kebutuhan project dengan kontribusi yang telah disetujui, seperti akses calon peserta, validasi challenge, tempat, pengetahuan, dokumentasi, atau dukungan pelaksanaan. Kontribusi aktual akan dicatat setelah terjadi.",
    output: [
      "Daftar kontribusi yang diminta.",
      "Konfirmasi kontribusi yang disetujui.",
      "Pembagian tindak lanjut.",
      "Rekap kontribusi aktual.",
    ],
    status: "planned",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Mobilisasi bukan sekadar mengumpulkan kontak; pemimpin perlu menghubungkan kontribusi dengan tujuan dan menjaga akuntabilitas.",
  },
  {
    slug: "process-documentation",
    week: 3,
    title: "Dokumentasi Proses",
    shortDescription:
      "Mendokumentasikan persiapan, implementasi, keputusan, dan perubahan secara runtut.",
    progressDescription:
      "Bukti proses belum dipublikasikan. Dokumentasi direncanakan mencakup audiensi, persiapan, implementasi, demo, dan monitoring dengan caption yang menjelaskan konteks. Hanya aset dan tautan yang aman serta memiliki persetujuan yang akan ditampilkan.",
    output: [
      "Daftar dokumentasi per kategori.",
      "Caption kontekstual.",
      "Tautan bukti yang telah diverifikasi.",
      "Catatan izin publikasi.",
    ],
    status: "planned",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Dokumentasi yang baik membuat keputusan dan pembelajaran dapat ditinjau tanpa mengorbankan privasi.",
  },
  {
    slug: "monitoring",
    week: 4,
    title: "Penyelesaian dan Monitoring",
    shortDescription:
      "Menutup pekerjaan terbuka dan memantau penggunaan solusi setelah handover.",
    progressDescription:
      "Monitoring belum dimulai karena implementasi belum berlangsung. Rencana monitoring akan memeriksa apakah UMKM dapat mengakses panduan, menggunakan kembali solusi, menemukan hambatan, dan membutuhkan penyesuaian pada H+3 atau H+7 sesuai kesepakatan.",
    output: [
      "Checklist penyelesaian output.",
      "Catatan monitoring H+3 atau H+7.",
      "Daftar hambatan penggunaan.",
      "Tindak lanjut perbaikan.",
    ],
    status: "planned",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Tanggung jawab project tidak berhenti saat acara selesai; handover dan tindak lanjut menentukan kegunaan hasil.",
  },
  {
    slug: "impact-measurement",
    week: 4,
    title: "Impact Measurement",
    shortDescription:
      "Membandingkan target dengan data aktual melalui metode yang telah ditetapkan.",
    progressDescription:
      "Pengukuran dampak belum dilakukan. Rencana mencakup kehadiran, pembentukan tim, penyelesaian dan testing solusi, pre-test dan post-test mahasiswa, kemampuan UMKM mencoba, penggunaan ulang, kepuasan, serta testimoni yang memiliki persetujuan publikasi.",
    output: [
      "Data target dan aktual yang dipisahkan.",
      "Perbandingan pre-test dan post-test.",
      "Rekap testing dan penggunaan ulang.",
      "Catatan keterbatasan pengukuran.",
      "Ringkasan dampak terverifikasi.",
    ],
    status: "planned",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Fokus kepemimpinan: melaporkan hasil secara jujur, termasuk capaian yang belum terpenuhi dan keterbatasan data.",
  },
  {
    slug: "leadership-reflection",
    week: 4,
    title: "Leadership Reflection",
    shortDescription:
      "Merefleksikan keputusan, dinamika tim, mobilisasi jejaring, kegagalan, dan pertumbuhan personal.",
    progressDescription:
      "Refleksi akhir belum ditulis. Setelah implementasi dan monitoring, refleksi direncanakan membahas keputusan penting, asumsi yang berubah, cara menangani ketidakpastian, kualitas kolaborasi, penggunaan jejaring, kesalahan, dan praktik yang ingin dipertahankan.",
    output: [
      "Refleksi kepemimpinan tertulis.",
      "Contoh keputusan dan konsekuensinya.",
      "Pelajaran dari hambatan atau kegagalan.",
      "Komitmen pengembangan berikutnya.",
    ],
    status: "planned",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Refleksi yang berguna berangkat dari kejadian konkret dan menghasilkan komitmen perubahan yang spesifik.",
  },
  {
    slug: "final-presentation",
    week: 4,
    title: "Final Presentation",
    shortDescription:
      "Menyajikan perjalanan project, kepemimpinan, partnership, output, dampak, dan keberlanjutan.",
    progressDescription:
      "Presentasi akhir belum disusun. Materi direncanakan mengikuti alur masalah, validasi, perencanaan, partnership, implementasi, mobilisasi, output, pengukuran dampak, refleksi, dan sustainability plan dengan bukti yang telah diverifikasi.",
    output: [
      "Deck presentasi akhir.",
      "Ringkasan eksekutif project.",
      "Daftar bukti terverifikasi.",
      "Sustainability plan.",
      "Catatan target yang belum tercapai.",
    ],
    status: "planned",
    updatedAt: null,
    evidence: [],
    leadershipInsight:
      "Presentasi akhir adalah bentuk akuntabilitas: menjelaskan proses, hasil, batasan, dan langkah lanjutan secara utuh.",
  },
] as const satisfies readonly JourneyActivityDefinition[];

const journeyBaseRoute = "/ai-co-creation-lab-makassar/journey";

export const journeyActivities: readonly JourneyActivity[] =
  journeyActivityDefinitions.map((activity) => ({
    ...activity,
    route: `${journeyBaseRoute}/${activity.slug}`,
    outputs: activity.output,
  }));

export const journeyWeeks: readonly JourneyWeek[] =
  journeyWeekDefinitions.map((week) => ({
    ...week,
    activities: journeyActivities.filter(
      (activity) => activity.week === week.week,
    ),
  }));

export const journeyActivityBySlug: Readonly<
  Partial<Record<JourneyActivitySlug, JourneyActivity>>
> = Object.fromEntries(
  journeyActivities.map((activity) => [activity.slug, activity]),
);

export function isJourneyActivitySlug(
  value: string,
): value is JourneyActivitySlug {
  return (JOURNEY_ACTIVITY_SLUGS as readonly string[]).includes(value);
}

export function getJourneyActivity(
  slug: string,
): JourneyActivity | undefined {
  if (!isJourneyActivitySlug(slug)) {
    return undefined;
  }

  return journeyActivityBySlug[slug];
}

export function getJourneyNavigation(slug: string): {
  readonly previous: JourneyActivity | null;
  readonly next: JourneyActivity | null;
} {
  const index = journeyActivities.findIndex(
    (activity) => activity.slug === slug,
  );

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: journeyActivities[index - 1] ?? null,
    next: journeyActivities[index + 1] ?? null,
  };
}
