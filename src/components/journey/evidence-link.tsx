"use client";

import {
  ArrowUpRight,
  Camera,
  FileText,
  Globe2,
  HardDrive,
  Play,
  Share2,
} from "lucide-react";

import { trackEvent } from "@/lib/analytics";

const icons = {
  document: FileText,
  photo: Camera,
  video: Play,
  social: Share2,
  drive: HardDrive,
  website: Globe2,
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
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand">
        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
      </span>
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
