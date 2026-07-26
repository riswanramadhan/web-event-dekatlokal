import type { Metadata } from "next";

import { PolicyLayout } from "@/components/policy/policy-layout";
import {
  platformConfig,
  type PlatformContact,
} from "@/data/platform";

const pageDescription =
  "Kebijakan pemrosesan data pendaftaran, dokumentasi, akses, penyimpanan, koreksi, dan penghapusan pada DekatLokal Event.";

const contact: PlatformContact = platformConfig.contact;

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: pageDescription,
  alternates: {
    canonical: "/privacy",
  },
};

const sections = [
  {
    id: "ruang-lingkup",
    title: "Ruang lingkup",
    content: (
      <>
        <p>
          Kebijakan ini menjelaskan cara {platformConfig.owner} memproses data pribadi
          melalui {platformConfig.name}, termasuk ketika seseorang melihat informasi
          acara, mengajukan pendaftaran, mengikuti kegiatan, atau menyetujui
          dokumentasi.
        </p>
        <p>
          Pada MVP ini, data pendaftaran digunakan untuk penyelenggaraan event yang
          ditampilkan di platform. Data tersebut tidak menjadi direktori peserta dan
          tidak ditampilkan kepada publik.
        </p>
      </>
    ),
  },
  {
    id: "data-yang-diproses",
    title: "Data yang diproses",
    content: (
      <>
        <p>Data yang dapat kami proses meliputi:</p>
        <ul className="list-disc space-y-2 pl-5 marker:text-brand">
          <li>identitas dan kontak, seperti nama, email, dan nomor WhatsApp;</li>
          <li>
            informasi kampus, kemampuan, usaha, atau kebutuhan yang diisi dalam
            formulir aplikasi;
          </li>
          <li>
            pilihan persetujuan privasi, dokumentasi, dan monitoring yang relevan;
          </li>
          <li>
            data teknis terbatas yang diperlukan untuk keamanan dan pencegahan
            penyalahgunaan, seperti waktu pengiriman dan informasi perangkat.
          </li>
        </ul>
        <p>
          Jangan memasukkan kata sandi, nomor rekening, identitas pelanggan, data
          transaksi rahasia, data kesehatan, dokumen identitas, atau informasi
          sensitif lain ke kolom jawaban bebas.
        </p>
      </>
    ),
  },
  {
    id: "tujuan-pemrosesan",
    title: "Tujuan pemrosesan",
    content: (
      <>
        <p>Data digunakan secara terbatas untuk:</p>
        <ul className="list-disc space-y-2 pl-5 marker:text-brand">
          <li>menerima, memeriksa, dan menyeleksi aplikasi;</li>
          <li>
            menghubungi pendaftar mengenai status, persiapan, atau perubahan penting
            pada event;
          </li>
          <li>
            mengatur komposisi peserta, kebutuhan akses, pelaksanaan, dan tindak
            lanjut program;
          </li>
          <li>mencegah duplikasi, spam, dan penyalahgunaan formulir;</li>
          <li>
            melakukan dokumentasi atau monitoring hanya sesuai persetujuan yang
            diberikan dan kebutuhan program.
          </li>
        </ul>
        <p>
          Kami tidak menggunakan data pendaftaran untuk membuat profil publik peserta
          atau tujuan lain yang tidak berkaitan tanpa pemberitahuan yang memadai.
        </p>
      </>
    ),
  },
  {
    id: "akses-dan-pembagian",
    title: "Akses dan pembagian data",
    content: (
      <>
        <p>
          Akses dibatasi kepada tim penyelenggara yang memerlukannya untuk seleksi dan
          operasi acara. Penyedia infrastruktur dapat memproses data sejauh diperlukan
          untuk menjalankan layanan. Mitra acara tidak otomatis memperoleh seluruh
          data pendaftar; informasi hanya dibagikan secara minimum apabila diperlukan,
          memiliki tujuan yang jelas, dan sesuai dengan persetujuan atau kewajiban
          yang berlaku.
        </p>
        <p>
          {platformConfig.owner} tidak menjual, menyewakan, atau memperdagangkan data
          pribadi pendaftar. Data registrasi juga tidak tersedia melalui akses baca
          publik.
        </p>
      </>
    ),
  },
  {
    id: "dokumentasi",
    title: "Persetujuan dokumentasi",
    content: (
      <>
        <p>
          Persetujuan dokumentasi dicatat terpisah dari persetujuan pemrosesan data
          pendaftaran. Jika diberikan, foto, video, suara, kutipan, atau karya yang
          relevan dapat digunakan untuk laporan kegiatan, publikasi program, dan
          komunikasi dampak secara proporsional.
        </p>
        <p>
          Peserta dapat meminta peninjauan atau penarikan persetujuan untuk penggunaan
          berikutnya. Permintaan terhadap materi yang sudah diterbitkan akan ditinjau
          dengan mempertimbangkan kemampuan teknis, konteks dokumentasi kelompok, dan
          kewajiban yang berlaku.
        </p>
      </>
    ),
  },
  {
    id: "penyimpanan-keamanan",
    title: "Penyimpanan dan keamanan",
    content: (
      <>
        <p>
          Data disimpan selama masih diperlukan untuk proses seleksi, pelaksanaan,
          monitoring, pelaporan, penyelesaian permintaan, atau kewajiban yang relevan.
          Setelah kebutuhan tersebut berakhir, data akan dihapus atau dianonimkan
          secara wajar. Jadwal retensi kalender yang lebih spesifik belum ditetapkan
          pada tahap MVP dan akan dicantumkan ketika prosedur operasionalnya final.
        </p>
        <p>
          Kami menerapkan pembatasan akses dan pemrosesan server-side untuk
          pendaftaran. Namun, tidak ada sistem digital yang sepenuhnya bebas risiko.
          Pendaftar tetap perlu membatasi jawaban pada informasi yang diminta.
        </p>
      </>
    ),
  },
  {
    id: "hak-pendaftar",
    title: "Koreksi dan penghapusan",
    content: (
      <>
        <p>
          Pendaftar dapat meminta akses, koreksi, atau penghapusan data yang telah
          dikirim. Untuk melindungi data, kami dapat meminta kode pendaftaran atau
          informasi secukupnya guna memverifikasi identitas pemohon.
        </p>
        <p>
          Permintaan penghapusan akan dipenuhi secara wajar, kecuali sebagian data
          masih perlu disimpan untuk keamanan, penyelesaian sengketa, kewajiban hukum,
          atau pencatatan persetujuan. Jika penghapusan penuh tidak dapat dilakukan,
          kami akan menjelaskan batasannya melalui kanal kontak resmi.
        </p>
      </>
    ),
  },
  {
    id: "kontak",
    title: "Kontak privasi",
    content: (
      <>
        {contact.status === "configured" &&
        (contact.email !== null || contact.whatsapp !== null) ? (
          <>
            <p>
              Sampaikan pertanyaan atau permintaan terkait data melalui kanal resmi
              berikut:
            </p>
            <ul className="list-disc space-y-2 pl-5 marker:text-brand">
              {contact.email ? (
                <li>
                  Email:{" "}
                  <a
                    className="font-semibold text-brand underline decoration-brand-200 underline-offset-4 hover:decoration-brand"
                    href={`mailto:${contact.email}`}
                  >
                    {contact.email}
                  </a>
                </li>
              ) : null}
              {contact.whatsapp ? (
                <li>
                  WhatsApp:{" "}
                  <a
                    className="font-semibold text-brand underline decoration-brand-200 underline-offset-4 hover:decoration-brand"
                    href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                  >
                    {contact.whatsapp}
                  </a>
                </li>
              ) : null}
            </ul>
          </>
        ) : (
          <div
            className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950"
            role="status"
          >
            <p className="font-semibold">{contact.statusLabel}</p>
            <p className="mt-2 text-sm leading-7">
              Email dan WhatsApp resmi untuk permintaan privasi belum tersedia.
              Kanal ini harus dikonfigurasi sebelum pendaftaran dibuka. Jangan
              mengirim data pribadi melalui akun atau nomor yang tidak tercantum di
              situs ini.
            </p>
          </div>
        )}
      </>
    ),
  },
  {
    id: "perubahan-kebijakan",
    title: "Perubahan kebijakan",
    content: (
      <p>
        Kebijakan dapat diperbarui ketika alur event, penyedia layanan, atau kewajiban
        pemrosesan berubah. Tanggal pembaruan ditampilkan di bagian atas halaman ini.
        Perubahan material akan dijelaskan melalui halaman ini atau kanal komunikasi
        event yang tersedia.
      </p>
    ),
  },
] as const;

export default function PrivacyPage() {
  return (
    <PolicyLayout
      eyebrow="Privasi"
      title="Kebijakan Privasi"
      description={pageDescription}
      lastUpdated="27 Juli 2026"
      sections={sections}
    />
  );
}
