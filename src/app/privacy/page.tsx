import type { Metadata } from "next";

import { PolicyLayout } from "@/components/policy/policy-layout";
import {
  platformConfig,
  type PlatformContact,
} from "@/data/platform";

const pageDescription =
  "DekatEvent mengatur pemrosesan data pendaftaran, community support, dokumentasi, akses, penyimpanan, koreksi, dan penghapusan melalui kebijakan ini.";

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
          acara, mengajukan pendaftaran, mengirim community support, mengikuti
          kegiatan, atau menyetujui dokumentasi.
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
            data community support, seperti pilihan anonim, nominal, bank tujuan,
            pesan opsional, serta persetujuan terpisah untuk tampil pada ticker;
          </li>
          <li>
            bukti transfer yang dikirim sebagai catatan privat, termasuk nama file,
            jenis, dan ukurannya;
          </li>
          <li>
            data teknis terbatas yang diperlukan untuk keamanan dan pencegahan
            penyalahgunaan, seperti waktu pengiriman dan informasi perangkat.
          </li>
        </ul>
        <p>
          Jangan memasukkan kata sandi, identitas pelanggan, data transaksi lain yang
          tidak diperlukan, data kesehatan, dokumen identitas, atau informasi
          sensitif ke kolom jawaban bebas. Bukti transfer hanya dikirim melalui kolom
          upload yang disediakan, bukan melalui pesan.
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
            mencatat konfirmasi community support, menerbitkan reference code secara
            langsung, dan menyusun laporan penggunaan dukungan;
          </li>
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
          Untuk community support bernama yang secara eksplisit mengizinkan tampil,
          ticker dapat menampilkan nama yang sudah disamarkan dan nominal yang
          dilaporkan segera setelah form berhasil dikirim. Ticker merupakan
          konfirmasi yang dikirim supporter, bukan validasi independen bahwa transfer
          telah diterima. Submission anonim atau tanpa persetujuan tidak ditampilkan.
          Kontak, pesan, bank tujuan, waktu pengiriman, dan bukti tidak ditampilkan
          pada ticker.
        </p>
        <p>
          Setelah submission berhasil, supporter dapat memilih membuka WhatsApp untuk
          memberi tahu tim. Tindakan ini bersifat opsional. Pesan otomatis hanya
          memuat konteks dukungan dan reference code, tetapi akun dan aktivitas di
          WhatsApp diproses oleh penyedia layanan tersebut sesuai pengaturannya.
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
          Akses dibatasi kepada tim penyelenggara yang memerlukannya untuk seleksi,
          operasi acara, pencatatan community support, dan penanganan penyalahgunaan.
          Penyedia infrastruktur
          dapat memproses data sejauh diperlukan untuk menjalankan layanan. Mitra
          acara tidak otomatis memperoleh seluruh data pendaftar atau supporter;
          informasi hanya dibagikan secara minimum apabila diperlukan, memiliki
          tujuan yang jelas, dan sesuai dengan persetujuan atau kewajiban yang
          berlaku.
        </p>
        <p>
          {platformConfig.owner} tidak menjual, menyewakan, atau memperdagangkan data
          pribadi pendaftar. Data registrasi, kontak supporter, dan bukti transfer
          juga tidak tersedia melalui akses baca publik. Endpoint ticker hanya
          menerima nama tersamarkan dan nominal dari submission bernama yang memiliki
          persetujuan tampil; penyaringan dan penyamaran dilakukan oleh server.
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
          Kami menerapkan pembatasan akses dan pemrosesan di server untuk pendaftaran
          dan community support. Bukti transfer disimpan pada storage privat dan hanya
          digunakan sebagai catatan internal atau untuk menindaklanjuti dugaan
          penyalahgunaan. Bukti tidak memiliki URL publik. Namun, tidak ada sistem
          digital yang sepenuhnya bebas risiko. Pengguna tetap perlu membatasi jawaban
          dan file pada informasi yang diminta.
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
          Pendaftar dan supporter dapat meminta akses, koreksi, atau penghapusan data
          yang telah dikirim. Untuk melindungi data, kami dapat meminta kode
          pendaftaran, reference code support, atau informasi secukupnya guna
          memverifikasi identitas pemohon.
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
      lastUpdated="2 Agustus 2026"
      sections={sections}
    />
  );
}
