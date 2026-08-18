import type { ReactNode } from "react";

/**
 * Bar chart sederhana untuk hasil assessment Week 4.
 *
 * Aturan yang dijaga di sini:
 * - Setiap bar selalu bertumpu pada nol, sehingga panjang bar sebanding dengan nilainya.
 * - Domain skala ditulis eksplisit (0-100 untuk knowledge, 0-5 untuk Likert).
 * - Setiap bar memiliki label nilai yang terlihat, sehingga warna bukan satu-satunya
 *   pembawa informasi dan hasilnya tetap terbaca saat dicetak hitam putih.
 */

export type SeriesTone = "pre" | "post" | "solid";

const seriesToneClassName: Record<SeriesTone, string> = {
  pre: "bg-brand-200 border-brand-300",
  post: "bg-brand-600 border-brand-700",
  solid: "bg-brand-500 border-brand-600",
};

export interface ChartBar {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  readonly display: string;
  readonly tone?: SeriesTone;
  readonly note?: string;
}

export interface ChartGroup {
  readonly id: string;
  readonly label: string;
  readonly caption?: string;
  readonly bars: readonly ChartBar[];
}

function barWidth(value: number, max: number) {
  const ratio = Math.max(0, Math.min(1, value / max));
  return `${(ratio * 100).toFixed(2)}%`;
}

function ChartFigure({
  title,
  scaleLabel,
  legend,
  children,
  footnote,
}: {
  title: string;
  scaleLabel: string;
  legend?: ReactNode;
  children: ReactNode;
  footnote?: string;
}) {
  return (
    <figure className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <figcaption className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h4 className="font-semibold leading-6 text-ink">{title}</h4>
          <p className="mt-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
            {scaleLabel}
          </p>
        </div>
        {legend}
      </figcaption>
      <div className="mt-5">{children}</div>
      {footnote ? (
        <p className="mt-5 border-t border-slate-100 pt-4 text-xs leading-6 text-slate-500">
          {footnote}
        </p>
      ) : null}
    </figure>
  );
}

function ChartLegend({
  items,
}: {
  items: readonly { readonly label: string; readonly tone: SeriesTone }[];
}) {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {items.map((item) => (
        <li
          key={item.label}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600"
        >
          <span
            aria-hidden="true"
            className={`h-3 w-3 rounded-sm border ${seriesToneClassName[item.tone]}`}
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

function BarRow({
  bar,
  max,
}: {
  bar: ChartBar;
  max: number;
}) {
  const tone = bar.tone ?? "solid";

  return (
    <div className="grid gap-1.5 sm:grid-cols-[11rem_1fr] sm:items-center sm:gap-4">
      <p className="text-sm font-semibold leading-6 text-slate-700">
        {bar.label}
      </p>
      <div className="flex items-center gap-3">
        <div className="h-5 min-w-0 flex-1 overflow-hidden rounded-md bg-slate-100">
          <div
            className={`h-full rounded-r-[4px] border-r ${seriesToneClassName[tone]}`}
            style={{ width: barWidth(bar.value, max) }}
          />
        </div>
        <span className="w-16 shrink-0 text-right font-mono text-sm font-semibold tabular-nums text-ink">
          {bar.display}
        </span>
      </div>
    </div>
  );
}

/** Beberapa bar dalam satu kelompok, misalnya PRE dan POST untuk satu dimensi. */
export function GroupedBarChart({
  title,
  scaleLabel,
  max,
  groups,
  legend,
  footnote,
}: {
  title: string;
  scaleLabel: string;
  max: number;
  groups: readonly ChartGroup[];
  legend?: readonly { readonly label: string; readonly tone: SeriesTone }[];
  footnote?: string;
}) {
  return (
    <ChartFigure
      title={title}
      scaleLabel={scaleLabel}
      legend={legend ? <ChartLegend items={legend} /> : undefined}
      footnote={footnote}
    >
      <div className="space-y-5">
        {groups.map((group) => (
          <div key={group.id}>
            <p className="text-sm font-semibold leading-6 text-ink">
              {group.label}
            </p>
            {group.caption ? (
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {group.caption}
              </p>
            ) : null}
            <div className="mt-2.5 space-y-0.5">
              {group.bars.map((bar) => (
                <BarRow key={bar.id} bar={bar} max={max} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </ChartFigure>
  );
}

/** Satu deret bar tanpa pengelompokan, misalnya distribusi jawaban. */
export function SimpleBarChart({
  title,
  scaleLabel,
  max,
  bars,
  footnote,
}: {
  title: string;
  scaleLabel: string;
  max: number;
  bars: readonly ChartBar[];
  footnote?: string;
}) {
  return (
    <ChartFigure title={title} scaleLabel={scaleLabel} footnote={footnote}>
      <div className="space-y-0.5">
        {bars.map((bar) => (
          <BarRow key={bar.id} bar={bar} max={max} />
        ))}
      </div>
    </ChartFigure>
  );
}

/** Angka utama untuk satu perbandingan tunggal, dipakai bersama chart. */
export function ChangeHighlight({
  items,
}: {
  items: readonly {
    readonly label: string;
    readonly value: string;
    readonly caption: string;
  }[];
}) {
  return (
    <dl className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
        >
          <dt className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
            {item.label}
          </dt>
          <dd className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-ink">
            {item.value}
          </dd>
          <p className="mt-1.5 text-xs leading-5 text-slate-600">
            {item.caption}
          </p>
        </div>
      ))}
    </dl>
  );
}
