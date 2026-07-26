import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Clock3, ListChecks } from "lucide-react";
import Link from "next/link";

import { EventPageHero } from "@/components/event/page-hero";
import { TimelineWeek } from "@/components/journey/timeline-week";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { EventStatusBadge } from "@/components/ui/status-badge";
import { aiCoCreationLabEvent as event } from "@/data/events";
import { journeyActivities, journeyWeeks } from "@/data/gep-journey";

export const metadata: Metadata = {
  title: "Perjalanan Project GEP",
  description:
    "Ikuti 19 aktivitas AI Co-Creation Lab Makassar dari leadership profile dan network mapping hingga implementasi, pengukuran dampak, dan refleksi.",
  alternates: {
    canonical: event.routes.journey,
  },
  openGraph: {
    title: `Perjalanan Project GEP — ${event.title}`,
    description:
      "Progress Week 1–4 dengan URL unik, output, evidence, dan leadership insight per aktivitas.",
    url: event.routes.journey,
  },
};

export default function JourneyPage() {
  const finishedActivities = journeyActivities.filter(
    (activity) => activity.status === "completed" || activity.status === "published",
  ).length;
  const inProgressActivities = journeyActivities.filter(
    (activity) => activity.status === "in_progress",
  ).length;
  const progressPercentage = Math.round(
    (finishedActivities / journeyActivities.length) * 100,
  );

  return (
    <>
      <EventPageHero
        eyebrow="GEP Project Journey"
        title="Perjalanan dari leadership identity hingga impact."
        description="Setiap aktivitas memiliki URL khusus agar progres, output, bukti, dan insight kepemimpinan dapat ditinjau secara runtut. Status awal tetap jujur: aktivitas belum dianggap selesai tanpa bukti."
        status="Week 1–4"
        actions={
          <>
            <PrimaryButton href="#timeline">Lihat timeline</PrimaryButton>
            <SecondaryButton href={event.routes.impact}>Rencana pengukuran</SecondaryButton>
          </>
        }
      />

      <section className="border-b border-slate-200 bg-white py-10">
        <div className="page-container">
          <div className="grid gap-4 md:grid-cols-[1.4fr_repeat(3,0.6fr)]">
            <div className="rounded-3xl border border-brand-100 bg-brand-50 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                    Progress terverifikasi
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-brand-900">
                    {progressPercentage}%
                  </p>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-brand">
                  <ListChecks className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-brand-100">
                <div
                  className="h-full rounded-full bg-brand transition-[width]"
                  style={{ width: `${progressPercentage}%` }}
                  aria-hidden="true"
                />
              </div>
              <p className="mt-3 text-xs leading-5 text-brand-800">
                Hanya aktivitas berstatus selesai atau dipublikasikan yang dihitung.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <Clock3 className="h-5 w-5 text-brand" aria-hidden="true" />
              <p className="mt-5 font-mono text-2xl font-semibold text-ink">
                {journeyActivities.length}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-500">Total aktivitas</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <ListChecks className="h-5 w-5 text-amber-600" aria-hidden="true" />
              <p className="mt-5 font-mono text-2xl font-semibold text-ink">
                {inProgressActivities}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-500">Dalam proses</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
              <p className="mt-5 font-mono text-2xl font-semibold text-ink">
                {finishedActivities}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-500">Selesai/terbit</p>
            </div>
          </div>
        </div>
      </section>

      <section id="timeline" className="section-space bg-surface">
        <div className="page-container">
          <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                Timeline aktivitas
              </p>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] text-ink sm:text-4xl">
                Empat minggu, satu cerita kepemimpinan.
              </h2>
            </div>
            <EventStatusBadge tone="neutral">
              Status diperbarui dari data project
            </EventStatusBadge>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {journeyWeeks.map((week, weekIndex) => (
              <TimelineWeek
                key={week.week}
                week={week.week}
                title={week.theme}
                description={week.description}
                activities={week.activities}
                startIndex={journeyWeeks
                  .slice(0, weekIndex)
                  .reduce((total, previousWeek) => total + previousWeek.activities.length, 0)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="page-container">
          <div className="rounded-[2rem] bg-brand px-6 py-10 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-12">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-100">
                Dari progres ke dampak
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
                Target tidak otomatis menjadi capaian.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/75">
                Lihat indikator, metode, dan waktu pengukuran yang disiapkan sebelum actual impact tersedia.
              </p>
            </div>
            <Link
              href={event.routes.impact}
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-brand hover:bg-brand-50 lg:mt-0"
            >
              Buka rencana dampak
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
