import { NavArrowRight } from "iconoir-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { EventStatusBadge } from "@/components/ui/status-badge";

type EventPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  status?: string;
  actions?: ReactNode;
};

export function EventPageHero({
  eyebrow,
  title,
  description,
  status,
  actions,
}: EventPageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-surface py-12 sm:py-16 lg:py-20">
        <div className="dot-grid absolute inset-y-0 right-0 w-1/2 opacity-45" aria-hidden="true" />
        <div className="page-container relative">
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500">
              <li>
                <Link href="/events" className="rounded text-slate-600 hover:text-brand">
                  Event
                </Link>
              </li>
              <li aria-hidden="true">
                <NavArrowRight
                  className="h-3.5 w-3.5"
                  strokeWidth={1.8}
                />
              </li>
              <li>
                <Link
                  href="/ai-co-creation-lab-makassar"
                  className="rounded text-slate-600 hover:text-brand"
                >
                  AI Co Creation Lab
                </Link>
              </li>
            </ol>
          </nav>
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">{eyebrow}</p>
              {status ? <EventStatusBadge tone="neutral">{status}</EventStatusBadge> : null}
            </div>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.055em] text-ink sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        </div>
      </section>
  );
}
