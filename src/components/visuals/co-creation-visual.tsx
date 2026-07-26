import {
  Building2,
  CheckCheck,
  Lightbulb,
  Smartphone,
  UsersRound,
} from "lucide-react";

export function CoCreationVisual() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div
        className="dot-grid absolute inset-0 rounded-[3rem] opacity-50 sm:-inset-8"
        aria-hidden="true"
      />
      <div className="relative rounded-[2rem] border border-brand-100 bg-white p-4 shadow-[0_28px_80px_rgba(1,34,98,0.16)] sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              Co-creation room
            </p>
            <p className="mt-1 text-sm font-semibold text-ink">Dari masalah ke workflow</p>
          </div>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[0.65rem] font-semibold text-slate-600">
            4 tim
          </span>
        </div>

        <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-stretch gap-2 sm:gap-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white text-brand">
              <Building2 className="h-4.5 w-4.5" aria-hidden="true" />
            </span>
            <p className="mt-3 text-xs font-semibold text-ink sm:text-sm">Kebutuhan UMKM</p>
            <p className="mt-1 text-[0.68rem] leading-5 text-slate-500">Masalah nyata, konteks usaha</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-2" aria-hidden="true">
            <span className="h-full w-px bg-brand-100" />
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white">
              <Lightbulb className="h-4 w-4" />
            </span>
            <span className="h-full w-px bg-brand-100" />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-white text-brand">
              <UsersRound className="h-4.5 w-4.5" aria-hidden="true" />
            </span>
            <p className="mt-3 text-xs font-semibold text-ink sm:text-sm">Tim mahasiswa</p>
            <p className="mt-1 text-[0.68rem] leading-5 text-slate-500">4 peran saling melengkapi</p>
          </div>
        </div>

        <div className="mt-3 rounded-3xl bg-brand p-4 text-white sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/14">
                <Smartphone className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold">Solusi siap diuji</p>
                <p className="mt-0.5 text-[0.68rem] leading-5 text-white/70">
                  Sederhana, aman, dapat dipakai ulang
                </p>
              </div>
            </div>
            <CheckCheck className="h-5 w-5 shrink-0 text-white" aria-hidden="true" />
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3 text-[0.68rem] font-medium text-slate-500">
          <span className="h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
          Problem framing
          <span className="h-px flex-1 bg-slate-200" aria-hidden="true" />
          Testing & handover
        </div>
      </div>
    </div>
  );
}
