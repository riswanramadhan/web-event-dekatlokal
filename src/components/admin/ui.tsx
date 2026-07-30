import type { ReactNode } from "react";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-ink">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  tone = "neutral",
}: {
  label: string;
  value: string | number;
  hint?: string;
  tone?: "neutral" | "brand" | "green" | "amber";
}) {
  const tones = {
    neutral: "text-ink",
    brand: "text-brand",
    green: "text-emerald-600",
    amber: "text-amber-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p
        className={`mt-2 font-mono text-3xl font-semibold tracking-[-0.03em] ${tones[tone]}`}
      >
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-slate-400">{hint}</p> : null}
    </div>
  );
}

export function Card({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white">
      {title ? (
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-ink">{title}</h2>
          {description ? (
            <p className="mt-0.5 text-xs leading-5 text-slate-500">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}
      <div className="p-5">{children}</div>
    </section>
  );
}

const TYPE_STYLES: Record<string, string> = {
  student: "border-brand-200 bg-brand-50 text-brand-700",
  umkm: "border-violet-200 bg-violet-50 text-violet-700",
  general: "border-slate-200 bg-slate-50 text-slate-700",
};

const TYPE_LABELS: Record<string, string> = {
  student: "Mahasiswa",
  umkm: "UMKM",
  general: "Umum",
};

export function TypeBadge({ type }: { type: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
        TYPE_STYLES[type] ?? TYPE_STYLES.general
      }`}
    >
      {TYPE_LABELS[type] ?? type}
    </span>
  );
}

const STATUS_STYLES: Record<string, string> = {
  submitted: "border-blue-200 bg-blue-50 text-blue-700",
  under_review: "border-amber-200 bg-amber-50 text-amber-800",
  shortlisted: "border-amber-200 bg-amber-50 text-amber-800",
  accepted: "border-emerald-200 bg-emerald-50 text-emerald-700",
  confirmed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  attended: "border-emerald-200 bg-emerald-50 text-emerald-700",
  completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  rejected: "border-slate-200 bg-slate-100 text-slate-600",
  withdrawn: "border-slate-200 bg-slate-100 text-slate-600",
};

const STATUS_LABELS: Record<string, string> = {
  submitted: "Masuk",
  under_review: "Ditinjau",
  shortlisted: "Shortlist",
  accepted: "Diterima",
  confirmed: "Konfirmasi",
  attended: "Hadir",
  completed: "Selesai",
  rejected: "Ditolak",
  withdrawn: "Mundur",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
        STATUS_STYLES[status] ?? STATUS_STYLES.rejected
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

/**
 * Initials avatar. Purely decorative, so it is hidden from assistive tech —
 * the adjacent name already conveys the identity.
 */
export function Avatar({ name }: { name: string }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <span
      aria-hidden="true"
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-50 text-xs font-semibold text-brand"
    >
      {initials || "?"}
    </span>
  );
}
