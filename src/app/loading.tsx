export default function Loading() {
  return (
    <div
      className="page-container min-h-[58svh] py-10 sm:py-14"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Memuat halaman"
    >
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-card sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
          <div className="space-y-5" aria-hidden="true">
            <div className="loading-skeleton h-5 w-32 rounded-full" />
            <div className="space-y-3">
              <div className="loading-skeleton h-10 w-full max-w-xl rounded-xl sm:h-12" />
              <div className="loading-skeleton h-10 w-4/5 max-w-lg rounded-xl sm:h-12" />
            </div>
            <div className="space-y-2.5">
              <div className="loading-skeleton h-4 w-full max-w-2xl rounded-full" />
              <div className="loading-skeleton h-4 w-11/12 max-w-xl rounded-full" />
              <div className="loading-skeleton h-4 w-3/5 max-w-md rounded-full" />
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="loading-skeleton h-12 w-36 rounded-full" />
              <div className="loading-skeleton h-12 w-28 rounded-full" />
            </div>
          </div>

          <div
            className="loading-skeleton aspect-[4/3] w-full rounded-[1.5rem]"
            aria-hidden="true"
          />
        </div>

        <div
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          aria-hidden="true"
        >
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5"
            >
              <div className="loading-skeleton h-10 w-10 rounded-xl" />
              <div className="loading-skeleton mt-4 h-5 w-2/3 rounded-full" />
              <div className="loading-skeleton mt-3 h-3.5 w-full rounded-full" />
              <div className="loading-skeleton mt-2 h-3.5 w-4/5 rounded-full" />
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Memuat halaman…</span>
    </div>
  );
}
