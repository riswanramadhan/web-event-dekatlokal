export default function Loading() {
  return (
    <div className="page-container py-24" role="status" aria-live="polite">
      <div className="max-w-3xl animate-pulse">
        <div className="h-4 w-32 rounded-full bg-brand-100" />
        <div className="mt-6 h-12 w-full rounded-2xl bg-slate-200" />
        <div className="mt-4 h-5 w-3/4 rounded-full bg-slate-100" />
      </div>
      <span className="sr-only">Memuat halaman…</span>
    </div>
  );
}
