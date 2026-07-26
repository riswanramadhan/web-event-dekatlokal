import type { Metadata } from "next";
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Gauge,
  Quote,
  ShieldCheck,
  Target,
} from "lucide-react";
import Link from "next/link";

import { EventPageHero } from "@/components/event/page-hero";
import { TargetActualMetric } from "@/components/impact/target-actual-metric";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { EventStatusBadge } from "@/components/ui/status-badge";
import { aiCoCreationLabEvent as event } from "@/data/events";
import {
  impactMeasurementPlan,
  impactMetrics,
  impactSummary,
  testimonials,
  type ImpactMetric,
  type ImpactStatus,
  type Testimonial,
} from "@/data/impact";

const pageDescription =
  "Target, hasil aktual, metode pengukuran, monitoring, dan testimoni AI Co-Creation Lab Makassar yang dibedakan secara transparan.";

export const metadata: Metadata = {
  title: `Dampak — ${event.title}`,
  description: pageDescription,
  alternates: {
    canonical: event.routes.impact,
  },
  openGraph: {
    title: `Dampak | ${event.title}`,
    description: pageDescription,
    url: event.routes.impact,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `Dampak ${event.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Dampak | ${event.title}`,
    description: pageDescription,
    images: ["/opengraph-image"],
  },
};

const metricGroups = [
  {
    id: "participation",
    eyebrow: "Partisipasi",
    title: "Keterlibatan yang benar-benar terjadi",
    description:
      "Kehadiran mahasiswa, UMKM, dan pembentukan tim dihitung dari catatan pelaksanaan, bukan jumlah target.",
    categories: ["participation"],
  },
  {
    id: "solution-adoption",
    eyebrow: "Solusi & adopsi",
    title: "Dari output hingga penggunaan ulang",
    description:
      "Solusi dinilai saat siap diuji, dicoba oleh UMKM, dan digunakan kembali setelah handover.",
    categories: ["solution", "adoption"],
  },
  {
    id: "learning",
    eyebrow: "Pembelajaran",
    title: "Perubahan pemahaman mahasiswa",
    description:
      "Pre-test dan post-test memakai indikator yang sama agar perubahan tidak hanya berdasarkan kesan.",
    categories: ["learning"],
  },
  {
    id: "network-story",
    eyebrow: "Jejaring & cerita",
    title: "Kontribusi dan cerita yang terverifikasi",
    description:
      "Mitra, relawan, dan testimoni baru dihitung setelah keterlibatan atau izin publikasinya dapat dikonfirmasi.",
    categories: ["network", "story"],
  },
] as const;

function impactStatusTone(
  status: ImpactStatus,
): "neutral" | "amber" | "blue" | "green" {
  if (status === "published") return "green";
  if (status === "measured") return "blue";
  if (status === "collecting") return "amber";
  return "neutral";
}

export default function ImpactPage() {
  const metrics: readonly ImpactMetric[] = impactMetrics;
  const publishedTestimonials: readonly Testimonial[] = testimonials;
  const actualCount = metrics.filter((metric) => metric.actual !== null).length;

  return (
    <>
      <EventPageHero
        eyebrow="Impact report"
        title="Target sudah ditetapkan. Hasil aktual belum diukur."
        description={pageDescription}
        status={impactSummary.statusLabel}
        actions={
          <>
            <a
              href="#impact-metrics"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(2,85,245,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-600"
            >
              Lihat indikator
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#measurement-plan"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-200 bg-white px-6 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand-50"
            >
              Tinjau metode
            </a>
          </>
        }
      />

      <section className="section-space bg-white">
        <div className="page-container">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <SectionHeading
              eyebrow="Pembacaan data"
              title={
                <>
                  Tidak ada capaian yang{" "}
                  <span className="text-brand">diasumsikan.</span>
                </>
              }
              description={impactSummary.description}
            />
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
              <div className="flex gap-3">
                <ShieldCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-700"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-amber-950">
                    {actualCount} dari {metrics.length} indikator memiliki data
                    aktual
                  </p>
                  <p className="mt-1 text-xs leading-6 text-amber-900">
                    Nilai kosong ditampilkan sebagai “Belum Diukur”, bukan nol
                    dan bukan angka target.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Target,
                label: "Target",
                description:
                  "Sasaran program yang ditetapkan sebelum pelaksanaan.",
              },
              {
                icon: BarChart3,
                label: "Aktual",
                description:
                  "Hasil yang benar-benar dicatat melalui metode pengukuran.",
              },
              {
                icon: Gauge,
                label: "Tingkat capaian",
                description:
                  "Perbandingan aktual terhadap target jika keduanya tersedia.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.label}
                  className="rounded-3xl border border-slate-200 bg-surface p-6"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-brand shadow-sm">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 text-lg font-semibold text-ink">
                    {item.label}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="impact-metrics"
        aria-labelledby="impact-metrics-title"
        className="section-space border-y border-slate-200 bg-surface"
      >
        <div className="page-container">
          <SectionHeading
            id="impact-metrics-title"
            eyebrow="Indikator dampak"
            title={
              <>
                Target, aktual, dan metode{" "}
                <span className="text-brand">dalam satu pandangan.</span>
              </>
            }
            description="Indikator mencakup partisipasi, solusi, pembelajaran, adopsi, jejaring, dan cerita. Status akan berubah melalui konfigurasi setelah data diverifikasi."
          />

          <div className="mt-12 space-y-14">
            {metricGroups.map((group) => {
              const groupMetrics = metrics.filter((metric) =>
                group.categories.some(
                  (category) => category === metric.category,
                ),
              );

              return (
                <section key={group.id} aria-labelledby={`${group.id}-title`}>
                  <div className="grid gap-4 border-b border-slate-200 pb-5 md:grid-cols-[0.75fr_1.25fr] md:items-end">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">
                        {group.eyebrow}
                      </p>
                      <h2
                        id={`${group.id}-title`}
                        className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-ink"
                      >
                        {group.title}
                      </h2>
                    </div>
                    <p className="text-sm leading-7 text-slate-600 md:justify-self-end">
                      {group.description}
                    </p>
                  </div>

                  <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {groupMetrics.map((metric) => (
                      <TargetActualMetric key={metric.id} metric={metric} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="measurement-plan"
        aria-labelledby="measurement-plan-title"
        className="section-space bg-white"
      >
        <div className="page-container">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                id="measurement-plan-title"
                eyebrow="Rencana pengukuran"
                title={
                  <>
                    Kapan data dicatat dan{" "}
                    <span className="text-brand">bagaimana memeriksanya.</span>
                  </>
                }
                description="Rencana ini belum menjadi bukti pelaksanaan. Setiap langkah tetap menampilkan status aktualnya."
              />
            </div>

            <ol className="space-y-5">
              {impactMeasurementPlan.map((step, index) => (
                <li
                  key={step.id}
                  className={`rounded-3xl border p-5 sm:p-6 ${
                    step.id === "reuse-monitoring"
                      ? "border-brand-200 bg-brand-50"
                      : "border-slate-200 bg-surface"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white font-mono text-xs font-semibold text-brand shadow-sm">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-ink">
                          {step.title}
                        </h3>
                        {step.id === "reuse-monitoring" ? (
                          <p className="mt-1 text-xs font-semibold text-brand">
                            Tahap monitoring pascakegiatan
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <EventStatusBadge
                      tone={impactStatusTone(step.status)}
                    >
                      {step.statusLabel}
                    </EventStatusBadge>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white p-4">
                      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.11em] text-slate-500">
                        <CalendarClock
                          className="h-4 w-4 text-brand"
                          aria-hidden="true"
                        />
                        Waktu
                      </p>
                      <p className="mt-2 text-sm leading-6 text-ink">
                        {step.timing}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white p-4">
                      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.11em] text-slate-500">
                        <ClipboardCheck
                          className="h-4 w-4 text-brand"
                          aria-hidden="true"
                        />
                        Metode
                      </p>
                      <p className="mt-2 text-sm leading-6 text-ink">
                        {step.method}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.11em] text-slate-500">
                      Indikator yang dicatat
                    </p>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {step.indicators.map((indicator) => (
                        <li
                          key={indicator}
                          className="flex gap-2 text-xs leading-6 text-slate-600"
                        >
                          <CheckCircle2
                            className="mt-1 h-3.5 w-3.5 shrink-0 text-brand"
                            aria-hidden="true"
                          />
                          {indicator}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-space border-y border-slate-200 bg-surface">
        <div className="page-container">
          <SectionHeading
            eyebrow="Testimoni"
            title={
              <>
                Cerita peserta hanya tayang dengan{" "}
                <span className="text-brand">persetujuan.</span>
              </>
            }
            description="Kutipan, atribusi, dan izin publikasi harus dikonfirmasi sebelum sebuah testimoni ditampilkan."
          />

          <div className="mt-8">
            {publishedTestimonials.length === 0 ? (
              <EmptyState
                title="Belum ada testimoni publik"
                description={impactSummary.emptyTestimonialLabel}
              />
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {publishedTestimonials.map((testimonial) => (
                  <figure
                    key={testimonial.id}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card"
                  >
                    <Quote
                      className="h-6 w-6 text-brand"
                      aria-hidden="true"
                    />
                    <blockquote className="mt-5 text-base leading-8 text-ink">
                      “{testimonial.quote}”
                    </blockquote>
                    <figcaption className="mt-5 text-sm font-semibold text-slate-600">
                      {testimonial.attribution}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-[74rem] gap-8 rounded-[2rem] bg-brand px-6 py-10 text-white sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-100">
              Evidence trail
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
              Ikuti progres pengukuran di project journey.
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/75">
              Halaman journey membedakan aktivitas yang direncanakan, sedang
              berjalan, selesai, dan sudah dipublikasikan.
            </p>
          </div>
          <Link
            href={event.routes.journey}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-brand transition hover:bg-brand-50"
          >
            Buka project journey
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
