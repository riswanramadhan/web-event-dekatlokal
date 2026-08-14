import { CheckCircle, Lock, WarningTriangle } from "iconoir-react";
import type { Metadata } from "next";

import { Card, PageHeader } from "@/components/admin/ui";
import { EmptyState } from "@/components/ui/empty-state";
import { requireAdmin } from "@/lib/admin/auth";
import {
  getAssessmentOverview,
  type AssessmentPhaseOverview,
  type AssessmentPhaseStatus,
} from "@/lib/assessment/overview";
import { ASSESSMENT_PHASE_LABELS } from "@/lib/assessment/phase";

import { AssessmentPhaseControls } from "./assessment-controls";
import { AssessmentTabs } from "./assessment-tabs";
import { AssessmentMaintenanceControls } from "./maintenance-controls";

export const metadata: Metadata = {
  title: "Pre-test & Post-test",
  robots: { index: false, follow: false },
};

const STATUS_LABELS: Record<AssessmentPhaseStatus, string> = {
  never_opened: "Belum pernah dibuka",
  open: "Sedang terbuka",
  closed: "Sudah ditutup",
};

const STATUS_STYLES: Record<AssessmentPhaseStatus, string> = {
  never_opened: "border-slate-200 bg-slate-100 text-slate-600",
  open: "border-emerald-200 bg-emerald-50 text-emerald-700",
  closed: "border-amber-200 bg-amber-50 text-amber-800",
};

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function PhaseStatusBadge({ status }: { status: AssessmentPhaseStatus }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {STATUS_LABELS[status]}
    </span>
  );
}

function phaseTimestampLine(phase: AssessmentPhaseOverview): string | null {
  if (phase.status === "open" && phase.openedAt) {
    return `Dibuka ${formatDateTime(phase.openedAt)}`;
  }

  if (phase.status === "closed" && phase.closedAt) {
    return `Ditutup ${formatDateTime(phase.closedAt)}`;
  }

  return null;
}

function PhaseCard({
  phase,
  participantCount,
  problems,
}: {
  phase: AssessmentPhaseOverview;
  participantCount: number;
  problems: string[];
}) {
  const timestampLine = phaseTimestampLine(phase);

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-ink">
            {ASSESSMENT_PHASE_LABELS[phase.phase]}
          </h2>
          {timestampLine ? (
            <p className="mt-1 text-xs text-slate-500">{timestampLine}</p>
          ) : null}
        </div>
        <PhaseStatusBadge status={phase.status} />
      </div>

      <dl className="mt-5">
        <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Sudah selesai
        </dt>
        <dd className="mt-1 font-mono text-lg font-semibold text-ink">
          {phase.submittedCount}
          <span className="ml-1 font-sans text-sm font-normal text-slate-500">
            dari {participantCount} peserta
          </span>
        </dd>
      </dl>

      <AssessmentPhaseControls
        phase={phase.phase}
        label={ASSESSMENT_PHASE_LABELS[phase.phase]}
        isOpen={phase.status === "open"}
        durationSeconds={phase.durationSeconds}
        problems={problems}
      />
    </Card>
  );
}

export default async function AssessmentOverviewPage() {
  // Re-checked per page rather than relying only on the layout: client-side
  // navigation can render a page without re-executing an unchanged layout.
  await requireAdmin();

  const result = await getAssessmentOverview();

  if (result.status === "unconfigured") {
    return (
      <>
        <PageHeader title="Pre-test & Post-test" />
        <EmptyState
          title="Supabase belum dikonfigurasi"
          description="Isi NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di environment untuk mengelola pre-test dan post-test."
        />
      </>
    );
  }

  if (result.status === "event_missing") {
    return (
      <>
        <PageHeader title="Pre-test & Post-test" />
        <EmptyState
          title="Event tidak ditemukan"
          description={`Tidak ada event dengan slug "${result.slug}" di database. Periksa REGISTRATION_EVENT_SLUG.`}
        />
      </>
    );
  }

  if (result.status === "error") {
    return (
      <>
        <PageHeader title="Pre-test & Post-test" />
        <EmptyState title="Gagal memuat data tes" description={result.message} />
      </>
    );
  }

  const { participantCount, problems, phases, frozen, maintenance } =
    result.overview;

  return (
    <>
      <PageHeader
        title="Pre-test & Post-test"
        description="Kontrol tes peserta untuk event ini. Pendaftar berstatus ditolak dan mundur tidak dihitung sebagai peserta."
      />

      <AssessmentTabs active="/admin/assessment" />

      {frozen ? (
        <div className="mb-4 flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
          <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            Soal terkunci karena sudah ada peserta yang mengerjakan tes.
            Menutup atau membuka tes tetap bisa dilakukan; yang terkunci hanya
            penyuntingan soal.
          </p>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        {phases.map((phase) => (
          <PhaseCard
            key={phase.phase}
            phase={phase}
            participantCount={participantCount}
            problems={problems}
          />
        ))}
      </div>

      <div className="mt-6">
        <Card
          title="Kesiapan soal"
          description="Tes hanya bisa dibuka kalau setiap soal punya minimal dua opsi dan tepat satu kunci jawaban."
        >
          {problems.length === 0 ? (
            <p className="flex items-start gap-2 text-sm leading-6 text-emerald-700">
              <CheckCircle
                className="mt-0.5 h-4 w-4 shrink-0"
                aria-hidden="true"
              />
              Soal sudah siap. Tes bisa dibuka.
            </p>
          ) : (
            <ul className="space-y-2">
              {problems.map((problem, index) => (
                <li
                  key={`${index}-${problem}`}
                  className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-900"
                >
                  <WarningTriangle
                    className="mt-1 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  {problem}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <AssessmentMaintenanceControls maintenance={maintenance} />
    </>
  );
}
