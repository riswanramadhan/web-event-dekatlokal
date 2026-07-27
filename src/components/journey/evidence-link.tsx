"use client";

import {
  ArrowUpRight,
  Camera,
  Globe,
  HardDrive,
  Page,
  Play,
  ShareAndroid,
} from "iconoir-react";

import { trackEvent } from "@/lib/analytics";

const icons = {
  document: Page,
  photo: Camera,
  video: Play,
  social: ShareAndroid,
  drive: HardDrive,
  website: Globe,
} as const;

export type Evidence = {
  label: string;
  href: string;
  type: keyof typeof icons;
};

export function EvidenceLink({
  evidence,
  activitySlug,
}: {
  evidence: Evidence;
  activitySlug: string;
}) {
  const Icon = icons[evidence.type];

  return (
    <a
      href={evidence.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent("click_evidence", {
          activity_slug: activitySlug,
          evidence_type: evidence.type,
        })
      }
      className="group flex min-h-16 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card"
    >
      <Icon
        className="h-5 w-5 shrink-0 text-brand"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-ink">{evidence.label}</span>
        <span className="mt-0.5 block text-xs capitalize text-slate-500">{evidence.type}</span>
      </span>
      <ArrowUpRight
        className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-brand"
        aria-hidden="true"
      />
      <span className="sr-only"> (terbuka di tab baru)</span>
    </a>
  );
}
