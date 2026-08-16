/**
 * Tanggal tampilan untuk pengisian pre-test, post-test, dan refleksi.
 *
 * **Ini penggantian tampilan sementara, bukan data.** Database tetap mencatat
 * waktu pengisian yang sebenarnya — `assessment_attempts.submitted_at` dan
 * `assessment_reflections.updated_at` tidak disentuh, jejak auditnya utuh, dan
 * tidak ada migrasi yang menyertai keputusan ini.
 *
 * Alasannya: seluruh instrumen ini melayani satu acara satu hari, dan laporan
 * impact-nya tidak boleh menampilkan tanggal yang bertentangan dengan tanggal
 * acara hanya karena pengisiannya dirapikan di hari lain.
 *
 * **Mencabutnya** berarti mengembalikan `formatFilledAt()` ke `Intl.DateTimeFormat`
 * biasa atas `value` yang masuk. Tanpa catatan ini, angka tetap di layar akan
 * terbaca sebagai bug oleh siapa pun yang membacanya beberapa bulan lagi.
 *
 * Modul murni: tidak menyentuh database, jadi boleh diimpor komponen client.
 */

/** Sejajar dengan `date.value` di `src/data/events.ts`. */
export const ASSESSMENT_REPORT_DATE = "2026-08-10";

/** Sejajar dengan `date.displayValue` di `src/data/events.ts`. */
export const ASSESSMENT_REPORT_DATE_LABEL = "10 Agustus 2026";

const TIME_FORMAT = new Intl.DateTimeFormat("id-ID", { timeStyle: "short" });

const DATE_FORMAT = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" });

/**
 * Jam diambil dari waktu pengisian yang sebenarnya; hanya bagian tanggalnya yang
 * dipaksa. Jam asli dipertahankan supaya urutan pengisian dalam satu hari masih
 * bisa dibaca panitia dari layar.
 */
export function formatFilledAt(value: string): string {
  const actual = new Date(value);

  // Tanggal tak terbaca berarti barisnya memang bermasalah; menampilkan tanggal
  // acara di atasnya akan menyembunyikan masalah itu.
  if (Number.isNaN(actual.getTime())) {
    return "Waktu tidak terbaca";
  }

  const fixedDate = DATE_FORMAT.format(new Date(`${ASSESSMENT_REPORT_DATE}T00:00:00`));

  return `${fixedDate}, ${TIME_FORMAT.format(actual)}`;
}
