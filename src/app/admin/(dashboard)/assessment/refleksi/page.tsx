import type { Metadata } from "next";

import { Card, PageHeader, StatCard } from "@/components/admin/ui";
import { EmptyState } from "@/components/ui/empty-state";
import { requireAdmin } from "@/lib/admin/auth";
import {
  CONSENT_BADGE_LABELS,
  CONSENT_BADGE_STYLES,
  REFLECTION_QUESTIONS,
} from "@/lib/assessment/reflection-consent";
import { listReflections, type AdminReflection } from "@/lib/assessment/reflections";

import { AssessmentTabs } from "../assessment-tabs";

export const metadata: Metadata = {
  title: "Refleksi",
  robots: { index: false, follow: false },
};

function formatWhen(value: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

/**
 * Izin ditampilkan sebagai badge di dekat testimoninya, bukan di kolom
 * terpisah. Testimoni yang dikutip tanpa izin adalah kesalahan yang tidak bisa
 * ditarik kembali setelah terbit, jadi keduanya harus terbaca bersamaan.
 */
function ConsentBadge({
  consent,
}: {
  consent: AdminReflection["testimonialConsent"];
}) {
  if (consent === null) {
    return (
      <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-500">
        Tanpa izin tercatat
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${CONSENT_BADGE_STYLES[consent]}`}
    >
      {CONSENT_BADGE_LABELS[consent]}
    </span>
  );
}

function Answer({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="text-xs font-medium leading-5 text-slate-500">{label}</dt>
      <dd className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-700">
        {value?.trim() ? value : <span className="text-slate-300">—</span>}
      </dd>
    </div>
  );
}

export default async function AssessmentReflectionsPage() {
  // Re-checked per page rather than relying only on the layout: client-side
  // navigation can render a page without re-executing an unchanged layout.
  await requireAdmin();

  const result = await listReflections();

  return (
    <>
      <PageHeader
        title="Pre-test & Post-test"
        description="Jawaban refleksi dan testimoni peserta. Tidak diberi skor — panduan scoring §6 meminta ini dibaca sebagai tema dan kutipan."
      />

      <AssessmentTabs active="/admin/assessment/refleksi" />

      {!result.ok ? (
        <EmptyState title="Gagal memuat refleksi" description={result.message} />
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              label="Sudah mengisi"
              value={`${result.reflections.length} dari ${result.participantCount}`}
              tone="brand"
            />
            <StatCard
              label="Testimoni boleh dipakai"
              value={
                result.reflections.filter(
                  (row) =>
                    row.testimonial?.trim() &&
                    (row.testimonialConsent === "named" ||
                      row.testimonialConsent === "anonymous"),
                ).length
              }
              hint="Termasuk yang minta anonim"
            />
            <StatCard
              label="Menolak dipakai"
              value={
                result.reflections.filter(
                  (row) => row.testimonialConsent === "no",
                ).length
              }
            />
          </div>

          {result.reflections.length === 0 ? (
            <EmptyState
              title="Belum ada yang mengisi"
              description="Bagikan tautan /tes/refleksi ke peserta setelah kegiatan selesai."
            />
          ) : (
            <div className="space-y-4">
              {result.reflections.map((row) => (
                <Card key={row.registrationId}>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h2 className="text-base font-semibold text-ink">
                        {row.fullName}
                      </h2>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Diperbarui {formatWhen(row.updatedAt)}
                      </p>
                    </div>
                  </div>

                  <dl className="mt-4 space-y-4">
                    {REFLECTION_QUESTIONS.map((question, index) => (
                      <Answer
                        key={question.field}
                        label={`${index + 1}. ${question.label}`}
                        value={
                          question.field === "aiUsageChange"
                            ? row.aiUsageChange
                            : question.field === "umkmLesson"
                              ? row.umkmLesson
                              : row.nextTimeDifferently
                        }
                      />
                    ))}
                  </dl>

                  <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-medium text-slate-500">
                        Testimoni
                      </p>
                      <ConsentBadge consent={row.testimonialConsent} />
                    </div>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                      {row.testimonial?.trim() ? (
                        row.testimonial
                      ) : (
                        <span className="text-slate-300">
                          Tidak mengisi testimoni.
                        </span>
                      )}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
