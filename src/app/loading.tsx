export default function Loading() {
  return (
    <div
      className="page-container flex min-h-[58svh] items-center justify-center py-20"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex max-w-sm flex-col items-center text-center">
        <div className="page-loader-orbit" aria-hidden="true">
          <span className="page-loader-core" />
          <span className="page-loader-dot page-loader-dot-one" />
          <span className="page-loader-dot page-loader-dot-two" />
          <span className="page-loader-dot page-loader-dot-three" />
        </div>
        <p className="mt-6 text-sm font-semibold text-ink">
          Sebentar, lagi nyiapin halamannya
        </p>
        <p className="mt-2 text-xs leading-5 text-slate-500">
          Biar tampilannya tetap rapi sampai ke layar kamu.
        </p>
      </div>
      <span className="sr-only">Memuat halaman…</span>
    </div>
  );
}
