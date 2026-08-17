import { ASSESSMENT_REPORT_DATE_LABEL } from "@/lib/assessment/report-date";

/**
 * Kop yang hanya muncul di kertas.
 *
 * Dialog cetak browser tidak membawa judul halaman ke dalam PDF-nya dengan cara
 * yang bisa diandalkan, jadi tanpa blok ini berkas yang tersimpan keluar tanpa
 * satu pun keterangan tentang laporan apa itu, milik acara mana, dan tanggal
 * berapa — persis tiga hal yang dicari orang saat membuka lampiran laporan
 * berbulan-bulan kemudian.
 */
export function PrintHeader({ title }: { title: string }) {
  return (
    <div className="print-only mb-6 border-b border-slate-300 pb-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">
        AI Co-Creation Lab Makassar
      </p>
      <h1 className="mt-1 text-xl font-semibold text-ink">{title}</h1>
      <p className="mt-1 text-sm text-slate-600">
        {ASSESSMENT_REPORT_DATE_LABEL}
      </p>
    </div>
  );
}
