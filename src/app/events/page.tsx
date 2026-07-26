import type { Metadata } from "next";
import { CalendarPlus2 } from "lucide-react";

import { EventCard } from "@/components/event/event-card";
import { EventStatusBadge } from "@/components/ui/status-badge";
import { featuredEvent } from "@/data/events";

export const metadata: Metadata = {
  title: "Event",
  description:
    "Temukan event aktif dan perjalanan program yang dikelola melalui DekatLokal Event.",
  alternates: {
    canonical: "/events",
  },
};

export default function EventsPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-surface py-16 sm:py-20">
        <div className="page-container">
          <div className="max-w-3xl">
            <EventStatusBadge>Direktori event</EventStatusBadge>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.055em] text-ink sm:text-5xl lg:text-6xl">
              Program lokal dengan <span className="text-brand">jejak digital yang utuh.</span>
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
              MVP ini menampilkan satu event publik aktif. Event berikutnya akan ditambahkan setelah informasi dan penyelenggaranya siap.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="page-container grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <EventCard
            title={featuredEvent.title}
            tagline={featuredEvent.tagline}
            description={featuredEvent.featuredSummary}
            href={featuredEvent.route}
            status={featuredEvent.statusLabel}
            dateLabel={featuredEvent.date.displayValue}
            locationLabel={featuredEvent.location.displayValue}
            featured
          />

          <article className="flex min-h-96 flex-col items-center justify-center rounded-[2rem] border border-dashed border-brand-200 bg-brand-50/45 p-8 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-brand shadow-sm">
              <CalendarPlus2 className="h-5 w-5" aria-hidden="true" />
            </span>
            <EventStatusBadge tone="neutral">
              Segera Hadir
            </EventStatusBadge>
            <h2 className="mt-5 text-2xl font-semibold tracking-[-0.035em] text-ink">
              Event berikutnya
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600">
              Slot ini akan dibuka ketika event berikutnya memiliki informasi yang terverifikasi. Belum ada fitur pembuatan event mandiri pada MVP.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
