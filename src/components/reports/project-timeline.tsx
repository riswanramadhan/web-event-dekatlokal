import {
  Calendar,
  CheckCircle,
  Circle,
  Clock,
} from "iconoir-react";

import type { MiniProjectTimelineItem } from "@/data/mini-project-canvas-content";

const timelineStatusConfig = {
  completed: {
    label: "Completed",
    badgeClassName: "border-emerald-200 bg-emerald-50 text-emerald-800",
    railClassName: "border-emerald-300 bg-emerald-100 text-emerald-900",
    Icon: CheckCircle,
  },
  in_progress: {
    label: "In Progress",
    badgeClassName: "border-amber-200 bg-amber-50 text-amber-900",
    railClassName: "border-amber-300 bg-amber-100 text-amber-950",
    Icon: Clock,
  },
  planned: {
    label: "Planned",
    badgeClassName: "border-brand-200 bg-brand-50 text-brand-800",
    railClassName: "border-brand-200 bg-brand-50 text-brand-900",
    Icon: Circle,
  },
  scheduled: {
    label: "Scheduled",
    badgeClassName: "border-violet-200 bg-violet-50 text-violet-800",
    railClassName: "border-violet-200 bg-violet-50 text-violet-900",
    Icon: Calendar,
  },
} satisfies Record<
  MiniProjectTimelineItem["status"],
  {
    label: string;
    badgeClassName: string;
    railClassName: string;
    Icon: typeof Circle;
  }
>;

const daysBeforeAugust = 7;

function getDayOffset(day: number, month: "Juli" | "Agustus") {
  return month === "Juli" ? day - 25 : daysBeforeAugust + day - 1;
}

function getPeriodRange(period: string) {
  const match = period.match(
    /^(\d{1,2})(?:-(\d{1,2}))? (Juli|Agustus) 2026$/,
  );

  if (!match) {
    return { start: 1, span: 1 };
  }

  const startDay = Number(match[1]);
  const endDay = Number(match[2] ?? match[1]);
  const month = match[3] as "Juli" | "Agustus";
  const startOffset = getDayOffset(startDay, month);
  const endOffset = getDayOffset(endDay, month);

  return {
    start: startOffset + 1,
    span: endOffset - startOffset + 1,
  };
}

export function TimelineStatusBadge({
  status,
}: {
  status: MiniProjectTimelineItem["status"];
}) {
  const config = timelineStatusConfig[status];
  const Icon = config.Icon;

  return (
    <span
      className={`inline-flex min-h-8 items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.08em] ${config.badgeClassName}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.9} aria-hidden="true" />
      {config.label}
    </span>
  );
}

function TimelineOverviewBar({
  item,
  index,
}: {
  item: MiniProjectTimelineItem;
  index: number;
}) {
  const range = getPeriodRange(item.period);
  const config = timelineStatusConfig[item.status];

  return (
    <div
      className={`flex min-h-9 min-w-0 items-center justify-center overflow-hidden rounded-lg border px-1.5 text-center shadow-[0_5px_14px_rgba(1,34,98,0.05)] ${config.railClassName}`}
      style={{ gridColumn: `${range.start} / span ${range.span}` }}
      aria-label={`${item.period}: ${item.phase}, ${config.label}`}
      title={`${item.period} — ${item.phase}`}
    >
      <span className="font-mono text-[0.62rem] font-semibold">{index + 1}</span>
      <span className="sr-only">. {item.phase}</span>
    </div>
  );
}

export function TimelineOverview({
  items,
}: {
  items: readonly MiniProjectTimelineItem[];
}) {
  const supportItem = items[1];
  const coreItems = items
    .map((item, index) => ({ item, index }))
    .filter(({ index }) => index !== 1);

  return (
    <figure
      className="project-timeline-overview hidden overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/65 p-5 md:block"
      data-timeline-overview
    >
      <figcaption className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-brand">
            Phase rail
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Ringkasan alur project dan workstream mobilisasi yang berjalan
            bersamaan.
          </p>
        </div>
        <p className="font-mono text-[0.62rem] text-slate-500">
          25 Juli–25 Agustus 2026
        </p>
      </figcaption>

      <div className="mt-5 grid grid-cols-[7.5rem_minmax(0,1fr)] gap-x-3 gap-y-2">
        <span aria-hidden="true" />
        <div
          className="flex justify-between font-mono text-[0.58rem] font-medium uppercase tracking-[0.04em] text-slate-500"
          aria-hidden="true"
        >
          <span>25 Jul</span>
          <span>1 Agu</span>
          <span>10 Agu</span>
          <span>18 Agu</span>
          <span>25 Agu</span>
        </div>

        <p className="pt-2 text-xs font-semibold text-slate-700">Alur project</p>
        <div
          className="grid min-w-0 auto-rows-[2.25rem] grid-cols-[repeat(32,minmax(0,1fr))] gap-y-1"
          data-timeline-track="project"
        >
          {coreItems.map(({ item, index }) => (
            <TimelineOverviewBar
              key={`${item.period}-${item.phase}`}
              item={item}
              index={index}
            />
          ))}
        </div>

        <p className="pt-2 text-xs font-semibold leading-5 text-brand-800">
          Mobilisasi sumber daya
        </p>
        <div
          className="grid min-w-0 auto-rows-[2.25rem] grid-cols-[repeat(32,minmax(0,1fr))]"
          data-timeline-track="support"
        >
          {supportItem ? (
            <TimelineOverviewBar item={supportItem} index={1} />
          ) : null}
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        Nomor pada rail merujuk pada urutan fase di kartu timeline.
      </p>
    </figure>
  );
}

export function ProjectTimelineItem({
  item,
  index,
}: {
  item: MiniProjectTimelineItem;
  index: number;
}) {
  return (
    <li
      className="project-timeline-item relative min-w-0 pl-10 lg:pl-0"
      data-timeline-item
      data-period={item.period}
      data-phase={item.phase}
      data-status={item.status}
    >
      <span
        className="absolute left-[0.15rem] top-5 z-[1] inline-flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-brand font-mono text-[0.62rem] font-semibold text-white shadow-[0_5px_16px_rgba(2,85,245,0.2)] lg:hidden"
        aria-hidden="true"
      >
        {index + 1}
      </span>

      <article className="report-card h-full min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_32px_rgba(1,34,98,0.05)] sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <span className="inline-flex min-h-8 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-[0.65rem] font-semibold text-slate-700">
            <Calendar
              className="h-3.5 w-3.5 shrink-0 text-brand"
              strokeWidth={1.9}
              aria-hidden="true"
            />
            {item.period}
          </span>
          <TimelineStatusBadge status={item.status} />
        </div>

        <div className="mt-5 flex items-start gap-3">
          <span
            className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand font-mono text-xs font-semibold text-white lg:inline-flex"
            aria-hidden="true"
          >
            {index + 1}
          </span>
          <h3 className="min-w-0 text-xl font-semibold leading-snug tracking-[-0.025em] text-ink sm:text-2xl">
            {item.phase}
          </h3>
        </div>

        <dl className="mt-5 grid gap-4">
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
            <dt className="font-mono text-[0.63rem] font-semibold uppercase tracking-[0.11em] text-brand">
              Aktivitas utama
            </dt>
            <dd className="mt-2 break-words text-sm leading-7 text-slate-700 [overflow-wrap:anywhere] sm:text-[0.94rem]">
              {item.activities}
            </dd>
          </div>
          <div className="rounded-xl border border-brand-100 bg-brand-50/55 p-4">
            <dt className="font-mono text-[0.63rem] font-semibold uppercase tracking-[0.11em] text-brand">
              Output
            </dt>
            <dd className="mt-2 break-words text-sm leading-7 text-slate-700 [overflow-wrap:anywhere] sm:text-[0.94rem]">
              {item.output}
            </dd>
          </div>
        </dl>
      </article>
    </li>
  );
}

export function ProjectTimeline({
  items,
}: {
  items: readonly MiniProjectTimelineItem[];
}) {
  return (
    <div className="project-timeline min-w-0" data-project-timeline>
      <TimelineOverview items={items} />
      <ol className="relative mt-6 grid min-w-0 gap-4 before:absolute before:bottom-5 before:left-[1.08rem] before:top-5 before:w-px before:bg-brand-200 sm:gap-5 lg:grid-cols-2 lg:before:hidden">
        {items.map((item, index) => (
          <ProjectTimelineItem
            key={`${item.period}-${item.phase}`}
            item={item}
            index={index}
          />
        ))}
      </ol>
    </div>
  );
}
