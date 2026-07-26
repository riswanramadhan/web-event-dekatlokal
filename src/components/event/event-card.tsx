import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";

import { EventStatusBadge } from "@/components/ui/status-badge";

export function EventCard({
  title,
  tagline,
  description,
  href,
  status,
  dateLabel,
  locationLabel,
  featured = false,
}: {
  title: string;
  tagline: string;
  description: string;
  href: string;
  status: string;
  dateLabel: string;
  locationLabel: string;
  featured?: boolean;
}) {
  return (
    <article
      className={`group overflow-hidden rounded-[2rem] border ${
        featured ? "border-brand-200 bg-brand-50/45" : "border-slate-200 bg-white"
      } shadow-card`}
    >
      <div className="relative overflow-hidden bg-brand p-6 text-white sm:p-8">
        <div className="hero-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative">
          <EventStatusBadge tone="neutral">{status}</EventStatusBadge>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.15em] text-white/70">{tagline}</p>
          <h2 className="mt-2 max-w-xl text-3xl font-semibold leading-[1.12] tracking-[-0.045em]">
            {title}
          </h2>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <p className="text-sm leading-7 text-slate-600">{description}</p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-2.5 rounded-2xl bg-slate-50 p-3.5">
            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            <div>
              <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Tanggal
              </dt>
              <dd className="mt-1 text-xs font-medium text-ink">{dateLabel}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2.5 rounded-2xl bg-slate-50 p-3.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            <div>
              <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Lokasi
              </dt>
              <dd className="mt-1 text-xs font-medium text-ink">{locationLabel}</dd>
            </div>
          </div>
        </dl>
        <Link
          href={href}
          className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white transition group-hover:-translate-y-0.5 group-hover:bg-brand-600"
        >
          Lihat detail event
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
