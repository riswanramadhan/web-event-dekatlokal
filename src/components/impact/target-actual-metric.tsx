import { Activity, CircleDashed, ClipboardCheck } from "lucide-react";

export type ImpactMetricView = {
  label: string;
  target: number | null;
  actual: number | null;
  unit: string;
  status: "not_measured" | "collecting" | "measured" | "published";
  statusLabel?: string;
  description?: string;
  measurementMethod?: string;
};

const statusLabels = {
  not_measured: "Belum Diukur",
  collecting: "Dalam Pengumpulan",
  measured: "Sudah Diukur",
  published: "Sudah Dipublikasikan",
};

export function TargetActualMetric({ metric }: { metric: ImpactMetricView }) {
  const canCalculate =
    metric.actual !== null && metric.target !== null && metric.target > 0;
  const achievement = canCalculate
    ? Math.round((metric.actual! / metric.target!) * 100)
    : null;

  return (
    <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-card sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand">
          {metric.actual === null ? (
            <CircleDashed className="h-4.5 w-4.5" aria-hidden="true" />
          ) : (
            <Activity className="h-4.5 w-4.5" aria-hidden="true" />
          )}
        </span>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[0.68rem] font-semibold text-slate-600">
          {metric.statusLabel ?? statusLabels[metric.status]}
        </span>
      </div>

      <h3 className="mt-5 text-base font-semibold leading-6 text-ink">
        {metric.label}
      </h3>
      {metric.description ? (
        <p className="mt-2 text-xs leading-5 text-slate-500">
          {metric.description}
        </p>
      ) : null}

      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-brand-50 p-3.5">
          <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-brand-700">
            Target
          </dt>
          <dd className="mt-1 text-sm font-semibold leading-6 text-brand-900">
            {metric.target === null ? (
              "Tidak ditetapkan"
            ) : (
              <span className="font-mono text-xl">
                {metric.target}{" "}
                <span className="text-xs font-medium">{metric.unit}</span>
              </span>
            )}
          </dd>
        </div>
        <div className="rounded-2xl bg-slate-50 p-3.5">
          <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
            Aktual
          </dt>
          <dd className="mt-1 text-sm font-semibold leading-6 text-ink">
            {metric.actual === null ? (
              "Belum Diukur"
            ) : (
              <span className="font-mono text-xl">
                {metric.actual}{" "}
                <span className="text-xs font-medium">{metric.unit}</span>
              </span>
            )}
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center justify-between gap-4 border-t border-slate-100 pt-4 text-xs">
        <span className="text-slate-500">Tingkat capaian</span>
        <span className="font-semibold text-ink">
          {achievement === null ? "Belum tersedia" : `${achievement}%`}
        </span>
      </div>

      {metric.measurementMethod ? (
        <div className="mt-4 flex gap-2.5 rounded-2xl bg-slate-50 p-3.5">
          <ClipboardCheck
            className="mt-0.5 h-4 w-4 shrink-0 text-brand"
            aria-hidden="true"
          />
          <p className="text-xs leading-5 text-slate-600">
            <span className="font-semibold text-ink">Metode: </span>
            {metric.measurementMethod}
          </p>
        </div>
      ) : null}
    </article>
  );
}
