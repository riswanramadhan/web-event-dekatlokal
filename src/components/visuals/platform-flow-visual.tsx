import {
  BarChart3,
  CalendarCheck2,
  FileCheck2,
  UsersRound,
} from "lucide-react";

const steps = [
  { label: "Halaman acara", icon: CalendarCheck2, state: "live" },
  { label: "Pendaftaran", icon: UsersRound, state: "ready" },
  { label: "Dokumentasi", icon: FileCheck2, state: "ready" },
  { label: "Laporan dampak", icon: BarChart3, state: "ready" },
] as const;

export function PlatformFlowVisual() {
  return (
    <div className="relative mx-auto max-w-xl lg:mx-0 lg:ml-auto">
      <div
        className="hero-grid absolute -inset-10 rounded-[3rem] opacity-60"
        aria-hidden="true"
      />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white p-3 shadow-[0_32px_90px_rgba(0,17,49,0.32)] sm:p-4">
        <div className="flex items-center justify-between border-b border-slate-200 px-2 pb-3 pt-1">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand" />
          </div>
          <span className="rounded-full bg-brand-50 px-3 py-1 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-brand">
            Event workspace
          </span>
        </div>

        <div className="grid gap-3 p-2 pt-5 sm:grid-cols-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.label}
                className={`rounded-3xl border p-4 ${
                  index === 0
                    ? "border-brand bg-brand text-white sm:col-span-2"
                    : "border-slate-200 bg-slate-50 text-ink"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-2xl ${
                      index === 0 ? "bg-white/14 text-white" : "bg-white text-brand"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span
                    className={`font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${
                      index === 0 ? "text-white/72" : "text-slate-400"
                    }`}
                  >
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-4 text-sm font-semibold">{step.label}</p>
                {index === 0 ? (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="h-1.5 flex-1 rounded-full bg-white/25">
                      <span className="block h-full w-4/5 rounded-full bg-white" />
                    </span>
                    <span className="text-[0.65rem] font-medium text-white/72">aktif</span>
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-slate-500">Terhubung dalam satu alur</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
