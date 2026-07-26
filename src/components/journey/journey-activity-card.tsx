import { ArrowRight, CalendarClock, CheckCircle2, CircleDashed } from "lucide-react";
import Link from "next/link";

import { EventStatusBadge } from "@/components/ui/status-badge";

export type JourneyCardActivity = {
  slug: string;
  title: string;
  shortDescription: string;
  status: "planned" | "in_progress" | "completed" | "published";
  updatedAt?: string | null;
};

const statusConfig = {
  planned: { label: "Direncanakan", tone: "neutral" as const, icon: CircleDashed },
  in_progress: { label: "Dalam Proses", tone: "amber" as const, icon: CalendarClock },
  completed: { label: "Selesai", tone: "green" as const, icon: CheckCircle2 },
  published: { label: "Dipublikasikan", tone: "blue" as const, icon: CheckCircle2 },
};

export function JourneyActivityCard({
  activity,
  index,
}: {
  activity: JourneyCardActivity;
  index: number;
}) {
  const status = statusConfig[activity.status];
  const StatusIcon = status.icon;

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_36px_rgba(1,34,98,0.05)] transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-card">
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-xs font-semibold tracking-[0.1em] text-brand">
          {String(index + 1).padStart(2, "0")}
        </span>
        <EventStatusBadge tone={status.tone}>
          <StatusIcon className="h-3 w-3" aria-hidden="true" />
          {status.label}
        </EventStatusBadge>
      </div>
      <h3 className="mt-5 text-lg font-semibold leading-7 tracking-[-0.025em] text-ink">
        {activity.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{activity.shortDescription}</p>
      <Link
        href={`/ai-co-creation-lab-makassar/journey/${activity.slug}`}
        className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-semibold text-brand"
      >
        Buka progres
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </article>
  );
}
