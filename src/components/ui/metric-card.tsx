type MetricCardProps = {
  value: string | number;
  label: string;
  helper?: string;
  inverse?: boolean;
};

export function MetricCard({
  value,
  label,
  helper,
  inverse = false,
}: MetricCardProps) {
  return (
    <article
      className={`rounded-3xl border p-5 sm:p-6 ${
        inverse
          ? "border-white/18 bg-white/10 text-white"
          : "border-slate-200 bg-white text-ink shadow-card"
      }`}
    >
      <p className={`font-mono text-3xl font-semibold tracking-[-0.06em] sm:text-4xl ${inverse ? "text-white" : "text-brand"}`}>
        {value}
      </p>
      <h3 className={`mt-2 text-sm font-semibold ${inverse ? "text-white" : "text-ink"}`}>
        {label}
      </h3>
      {helper ? (
        <p className={`mt-1 text-xs leading-5 ${inverse ? "text-white/70" : "text-slate-500"}`}>
          {helper}
        </p>
      ) : null}
    </article>
  );
}
