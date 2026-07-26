import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  Lightbulb,
  ListChecks,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EventSubnav } from "@/components/event/event-subnav";
import { ActivityViewTracker } from "@/components/journey/activity-view-tracker";
import { CopyProgressButton } from "@/components/journey/copy-progress-button";
import { EvidenceLink } from "@/components/journey/evidence-link";
import { EmptyState } from "@/components/ui/empty-state";
import { EventStatusBadge } from "@/components/ui/status-badge";
import { aiCoCreationLabEvent as event } from "@/data/events";
import {
  JOURNEY_ACTIVITY_SLUGS,
  getJourneyActivity,
  getJourneyNavigation,
  journeyStatusLabels,
} from "@/data/gep-journey";

type ActivityPageProps = {
  params: Promise<{ activitySlug: string }>;
};

export const dynamicParams = false;

const statusTones = {
  planned: "neutral",
  in_progress: "amber",
  completed: "green",
  published: "blue",
} as const;

const statusIcons = {
  planned: CircleDashed,
  in_progress: CalendarClock,
  completed: CheckCircle2,
  published: CheckCircle2,
} as const;

export function generateStaticParams() {
  return JOURNEY_ACTIVITY_SLUGS.map((activitySlug) => ({ activitySlug }));
}

export async function generateMetadata({
  params,
}: ActivityPageProps): Promise<Metadata> {
  const { activitySlug } = await params;
  const activity = getJourneyActivity(activitySlug);

  if (!activity) {
    return { title: "Aktivitas tidak ditemukan" };
  }

  return {
    title: activity.title,
    description: activity.shortDescription,
    alternates: {
      canonical: activity.route,
    },
    openGraph: {
      title: `${activity.title} — ${event.title}`,
      description: activity.shortDescription,
      url: activity.route,
    },
  };
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { activitySlug } = await params;
  const activity = getJourneyActivity(activitySlug);

  if (!activity) {
    notFound();
  }

  const navigation = getJourneyNavigation(activity.slug);
  const StatusIcon = statusIcons[activity.status];

  return (
    <>
      <ActivityViewTracker activitySlug={activity.slug} />

      <section className="relative overflow-hidden bg-surface py-12 sm:py-16 lg:py-20">
        <div className="dot-grid absolute inset-y-0 right-0 w-1/2 opacity-40" aria-hidden="true" />
        <div className="page-container relative">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500">
              <li>
                <Link href={event.route} className="rounded hover:text-brand">
                  AI Co-Creation Lab
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li>
                <Link href={event.routes.journey} className="rounded hover:text-brand">
                  Journey
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li aria-current="page" className="text-slate-700">
                {activity.title}
              </li>
            </ol>
          </nav>

          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-brand px-3 py-1.5 font-mono text-xs font-semibold text-white">
                Week {activity.week}
              </span>
              <EventStatusBadge tone={statusTones[activity.status]}>
                <StatusIcon className="h-3 w-3" aria-hidden="true" />
                {journeyStatusLabels[activity.status]}
              </EventStatusBadge>
            </div>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.055em] text-ink sm:text-5xl lg:text-6xl">
              {activity.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              {activity.shortDescription}
            </p>
            <p className="mt-5 font-mono text-xs font-medium text-slate-500">
              Pembaruan terakhir: {activity.updatedAt ?? "Belum ada tanggal pembaruan"}
            </p>
          </div>
        </div>
      </section>

      <EventSubnav />

      <div className="page-container py-12 sm:py-16 lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start lg:gap-12 lg:py-20">
        <div className="space-y-8">
          <section
            aria-labelledby="progress-heading"
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">
                  Deskripsi progres
                </p>
                <h2 id="progress-heading" className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-ink">
                  Kondisi aktivitas saat ini
                </h2>
              </div>
              <CopyProgressButton
                text={activity.progressDescription}
                activitySlug={activity.slug}
              />
            </div>
            <p className="mt-6 rounded-3xl bg-surface p-5 text-sm leading-8 text-slate-700 sm:text-base">
              {activity.progressDescription}
            </p>
          </section>

          <section
            aria-labelledby="outputs-heading"
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-50 text-brand">
                <ListChecks className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <h2 id="outputs-heading" className="text-2xl font-semibold tracking-[-0.035em] text-ink">
                Output yang disiapkan
              </h2>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {activity.output.map((output) => (
                <li
                  key={output}
                  className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                  {output}
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="evidence-heading"
            className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8"
          >
            <h2 id="evidence-heading" className="text-2xl font-semibold tracking-[-0.035em] text-ink">
              Evidence
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Pranala hanya ditampilkan setelah bukti tersedia dan aman untuk dipublikasikan.
            </p>
            <div className="mt-6">
              {activity.evidence.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {activity.evidence.map((evidence) => (
                    <EvidenceLink
                      key={`${evidence.type}-${evidence.href}`}
                      evidence={evidence}
                      activitySlug={activity.slug}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="Evidence belum tersedia"
                  description="Aktivitas belum memiliki bukti publik. Status tidak akan dinaikkan hanya untuk mengisi bagian ini."
                />
              )}
            </div>
          </section>

          <section
            aria-labelledby="insight-heading"
            className="rounded-[2rem] bg-brand p-6 text-white sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/14">
                <Lightbulb className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <h2 id="insight-heading" className="text-2xl font-semibold tracking-[-0.035em]">
                Leadership insight
              </h2>
            </div>
            <p className="mt-5 text-sm leading-8 text-white/80 sm:text-base">
              {activity.leadershipInsight}
            </p>
          </section>
        </div>

        <aside className="mt-8 lg:sticky lg:top-28 lg:mt-0">
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Navigasi aktivitas
            </p>
            <div className="mt-4 space-y-3">
              {navigation.previous ? (
                <Link
                  href={navigation.previous.route}
                  className="group block rounded-2xl border border-slate-200 p-4 hover:border-brand-200 hover:bg-brand-50"
                >
                  <span className="flex items-center gap-2 text-xs font-semibold text-brand">
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    Sebelumnya
                  </span>
                  <span className="mt-2 block text-sm font-semibold leading-6 text-ink">
                    {navigation.previous.title}
                  </span>
                </Link>
              ) : null}
              {navigation.next ? (
                <Link
                  href={navigation.next.route}
                  className="group block rounded-2xl border border-slate-200 p-4 hover:border-brand-200 hover:bg-brand-50"
                >
                  <span className="flex items-center gap-2 text-xs font-semibold text-brand">
                    Berikutnya
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="mt-2 block text-sm font-semibold leading-6 text-ink">
                    {navigation.next.title}
                  </span>
                </Link>
              ) : null}
            </div>
            <Link
              href={event.routes.journey}
              className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand-50 px-4 text-sm font-semibold text-brand hover:bg-brand-100"
            >
              Kembali ke semua aktivitas
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
