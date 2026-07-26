import { JourneyActivityCard, type JourneyCardActivity } from "./journey-activity-card";

export function TimelineWeek({
  week,
  title,
  description,
  activities,
  startIndex,
}: {
  week: 1 | 2 | 3 | 4;
  title: string;
  description: string;
  activities: readonly JourneyCardActivity[];
  startIndex: number;
}) {
  return (
    <section aria-labelledby={`week-${week}-heading`} className="relative">
      <div className="grid gap-7 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10">
        <div>
          <div className="sticky top-28">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              Week {week}
            </p>
            <h2
              id={`week-${week}-heading`}
              className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.035em] text-ink"
            >
              {title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {activities.map((activity, index) => (
            <JourneyActivityCard
              key={activity.slug}
              activity={activity}
              index={startIndex + index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
