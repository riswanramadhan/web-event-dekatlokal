import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import {
  ASSESSMENT_PHASE_LABELS,
  parsePhaseSlug,
  toPhaseSlug,
} from "@/lib/assessment/phase";
import { listParticipants } from "@/lib/assessment/participants";
import { getAssessmentState } from "@/lib/assessment/state";

import { TesFlow } from "./tes-flow";

/**
 * Never prerendered: the gate has to reflect whether the organisers have opened
 * the test at this moment, not at build time.
 */
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ phase: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { phase: slug } = await params;
  const phase = parsePhaseSlug(slug);

  return {
    title: phase ? ASSESSMENT_PHASE_LABELS[phase] : "Tes",
    // Unlisted, and kept out of indexes to match robots.ts and sitemap.ts.
    // Obscurity is not the protection here: start_assessment_attempt() and the
    // participant status filter are.
    robots: { index: false, follow: false },
  };
}

export default async function TesPage({ params }: PageProps) {
  const { phase: slug } = await params;
  const phase = parsePhaseSlug(slug);

  if (!phase) {
    notFound();
  }

  const stateResult = await getAssessmentState(phase);

  if (!stateResult.ok) {
    return (
      <div className="mx-auto flex min-h-dvh w-full max-w-[640px] flex-col justify-center px-4 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center">
          <h1 className="text-lg font-semibold text-ink">
            Tes belum bisa dibuka
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {stateResult.message}
          </p>
        </div>
      </div>
    );
  }

  // The locked gate shows no dropdown, so the roster is not sent to it at all.
  const showPicker =
    stateResult.state.isOpen || stateResult.state.hasEverOpened;
  const participantsResult = showPicker ? await listParticipants() : null;

  return (
    <Suspense fallback={null}>
      <TesFlow
        phaseLabel={ASSESSMENT_PHASE_LABELS[phase]}
        phaseSlug={toPhaseSlug(phase)}
        initialState={stateResult.state}
        initialParticipants={
          participantsResult?.ok ? participantsResult.participants : null
        }
      />
    </Suspense>
  );
}
