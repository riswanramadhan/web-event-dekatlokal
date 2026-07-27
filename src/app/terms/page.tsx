import type { Metadata } from "next";
import Link from "next/link";

import { PolicyLayout } from "@/components/policy/policy-layout";
import {
  platformConfig,
  type PlatformContact,
} from "@/data/platform";

const pageDescription =
  "Ketentuan penggunaan DekatEvent untuk aplikasi peserta, seleksi, partisipasi, informasi acara, dan penggunaan platform.";

const contact: PlatformContact = platformConfig.contact;

export const metadata: Metadata = {
  title: "Ketentuan Penggunaan",
  description: pageDescription,
  alternates: {
    canonical: "/terms",
  },
};

const sections = [
  {
    id: "cakupan",
    title: "Cakupan ketentuan",
    content: (
      <>
        <p>
          Ketentuan ini berlaku saat Anda mengakses {platformConfig.name}, mengirim
          aplikasi, atau mengikuti event yang dikelola melalui platform. Dengan
          menggunakan layanan, Anda menyetujui ketentuan yang relevan dengan aktivitas
          tersebut.
        </p>
        <p>
          {platformConfig.name} saat ini merupakan MVP. Fitur seperti pembayaran,
          tiket berbayar, akun peserta, sertifikat otomatis, dan dashboard
          penyelenggara mandiri belum tersedia.
        </p>
      </>
    ),
  },
  {
    id: "aplikasi",
    title: "Aplikasi dan informasi pendaftar",
    content: (
      <>
        <p>
          Pengiriman formulir merupakan aplikasi, bukan penerimaan otomatis. Pendaftar
          wajib memberikan informasi yang benar, relevan, dan merupakan miliknya
          sendiri atau berada dalam kewenangannya untuk dibagikan.
        </p>
        <p>
          Jangan memasukkan data sensitif, rahasia usaha yang tidak diperlukan,
          identitas pelanggan, data perbankan, atau materi milik pihak lain tanpa izin.
          Kode pendaftaran perlu disimpan untuk membantu verifikasi apabila ada
          pertanyaan tentang aplikasi.
        </p>
      </>
    ),
  },
  {
    id: "seleksi",
    title: "Seleksi dan partisipasi",
    content: (
      <>
        <p>
          Penyelenggara dapat menilai aplikasi berdasarkan kesesuaian peran, kebutuhan
          program, ketersediaan perangkat, komitmen, keberagaman tim, dan kapasitas
          acara. Keputusan disampaikan melalui kontak yang diberikan pendaftar.
        </p>
        <p>
          Hanya konfirmasi resmi dari penyelenggara yang menyatakan seseorang diterima
          sebagai peserta atau challenge partner. Peserta terpilih wajib mengikuti
          arahan keselamatan, privasi, jadwal, dan tata tertib lokasi yang disampaikan
          sebelum atau selama kegiatan.
        </p>
      </>
    ),
  },
  {
    id: "informasi-event",
    title: "Perubahan informasi event",
    content: (
      <>
        <p>
          Tanggal, lokasi, susunan kegiatan, kapasitas, fasilitator, status
          pendaftaran, dan detail operasional dapat berubah apabila belum final atau
          karena kebutuhan pelaksanaan. Informasi berstatus belum dikonfirmasi bukan
          janji pelaksanaan pada waktu atau tempat tertentu.
        </p>
        <p>
          Penyelenggara akan berupaya menyampaikan perubahan material melalui halaman
          event atau kontak pendaftar. Pengguna tetap perlu memeriksa informasi
          terbaru sebelum melakukan perjalanan atau membuat komitmen biaya.
        </p>
      </>
    ),
  },
  {
    id: "penggunaan-wajar",
    title: "Penggunaan yang dapat diterima",
    content: (
      <>
        <p>Pengguna tidak boleh:</p>
        <ul className="list-disc space-y-2 pl-5 marker:text-brand">
          <li>menyamar sebagai orang, organisasi, peserta, atau mitra lain;</li>
          <li>
            mengirim spam, kode berbahaya, data palsu, atau aplikasi berulang untuk
            mengganggu layanan;
          </li>
          <li>
            mencoba mengakses data pendaftar, sistem, atau area yang tidak
            diotorisasi;
          </li>
          <li>
            menggunakan platform untuk tindakan melanggar hukum, diskriminatif,
            mengancam, atau merugikan pihak lain;
          </li>
          <li>
            menyalin atau menggunakan konten, identitas visual, dan materi pihak lain
            dengan cara yang melanggar haknya.
          </li>
        </ul>
        <p>
          Akses atau aplikasi dapat dibatasi apabila diperlukan untuk keamanan,
          integritas seleksi, atau perlindungan peserta.
        </p>
      </>
    ),
  },
  {
    id: "mitra-dan-logo",
    title: "Integritas mitra dan logo",
    content: (
      <>
        <p>
          Nama atau logo organisasi hanya menandakan kemitraan resmi apabila
          persetujuan telah dikonfirmasi dan status tersebut dinyatakan dengan jelas.
          Label seperti “potensial”, “dalam proses konfirmasi”, atau “belum
          dikonfirmasi” bukan bukti kemitraan.
        </p>
        <p>
          Pengguna tidak boleh mengklaim dukungan, afiliasi, pendanaan, atau
          representasi dari {platformConfig.owner}, penyelenggara, maupun calon mitra
          tanpa izin. Logo dan materi merek tidak boleh dipasang ulang atau diubah
          sehingga terkesan sebagai dukungan resmi.
        </p>
      </>
    ),
  },
  {
    id: "hasil-ai",
    title: "Hasil co creation dan AI",
    content: (
      <>
        <p>
          Event dapat menghasilkan workflow, prompt, prototype, atau panduan sederhana.
          Hasil tersebut merupakan bahan uji dan tidak menjamin akurasi, keamanan,
          peningkatan penjualan, atau kesesuaian untuk keputusan penting.
        </p>
        <p>
          Peserta dan UMKM bertanggung jawab memeriksa keluaran AI sebelum
          menggunakannya, menghindari data rahasia, serta memperoleh izin atas materi
          pihak lain. Penyelenggara dapat menghentikan penggunaan yang berisiko atau
          tidak sesuai prinsip responsible AI.
        </p>
      </>
    ),
  },
  {
    id: "privasi-dokumentasi",
    title: "Privasi dan dokumentasi",
    content: (
      <p>
        Pemrosesan data dan persetujuan dokumentasi mengikuti{" "}
        <Link
          className="font-semibold text-brand underline decoration-brand-200 underline-offset-4 hover:decoration-brand"
          href="/privacy"
        >
          Kebijakan Privasi
        </Link>
        . Persetujuan dokumentasi tidak memberi hak untuk menggunakan data pribadi di
        luar tujuan yang dijelaskan.
      </p>
    ),
  },
  {
    id: "tanggung-jawab",
    title: "Batas tanggung jawab",
    content: (
      <>
        <p>
          Penyelenggara berupaya menjaga informasi dan layanan tetap layak digunakan,
          tetapi tidak menjamin platform selalu bebas gangguan atau setiap aplikasi
          diterima. Peserta tetap bertanggung jawab atas keputusan perjalanan,
          perangkat, barang pribadi, serta penggunaan hasil co creation setelah
          kegiatan.
        </p>
        <p>
          Sejauh diizinkan oleh ketentuan yang berlaku, {platformConfig.owner} tidak
          bertanggung jawab atas kerugian tidak langsung yang timbul karena
          ketergantungan pada keluaran AI atau informasi yang belum dikonfirmasi.
          Batasan ini tidak menghapus tanggung jawab yang tidak dapat dikesampingkan,
          termasuk akibat kesengajaan atau kelalaian berat.
        </p>
      </>
    ),
  },
  {
    id: "kontak",
    title: "Pertanyaan tentang ketentuan",
    content: (
      <>
        {contact.status === "configured" &&
        (contact.email !== null || contact.whatsapp !== null) ? (
          <>
            <p>Gunakan kanal resmi berikut untuk mengajukan pertanyaan:</p>
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
              Email dan WhatsApp resmi untuk pertanyaan ketentuan belum tersedia.
              Kanal tersebut harus dikonfigurasi sebelum pendaftaran dibuka. Jangan
              mengandalkan kontak yang tidak tercantum pada situs ini.
            </p>
          </div>
        )}
      </>
    ),
  },
  {
    id: "perubahan",
    title: "Perubahan ketentuan",
    content: (
      <p>
        Ketentuan dapat diperbarui seiring perubahan fitur atau pelaksanaan event.
        Versi yang berlaku ditandai oleh tanggal pembaruan di bagian atas halaman.
        Penggunaan berkelanjutan setelah pembaruan berarti pengguna memahami versi
        terbaru untuk aktivitas berikutnya.
      </p>
    ),
  },
] as const;

export default function TermsPage() {
  return (
    <PolicyLayout
      eyebrow="Ketentuan"
      title="Ketentuan Penggunaan"
      description={pageDescription}
      lastUpdated="27 Juli 2026"
      sections={sections}
    />
  );
}
