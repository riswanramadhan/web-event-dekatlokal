import type { Metadata } from "next";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Handshake,
  Lightbulb,
  MapPin,
  Network,
  ShieldCheck,
  Smartphone,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

import { EventSubnav } from "@/components/event/event-subnav";
import { Reveal } from "@/components/motion/reveal";
import { CoCreationVisual } from "@/components/visuals/co-creation-visual";
import { FaqList } from "@/components/ui/faq-list";
import { MetricCard } from "@/components/ui/metric-card";
import { PartnerLogoPlaceholder } from "@/components/ui/partner-placeholder";
import { SectionHeading } from "@/components/ui/section-heading";
import { EventStatusBadge } from "@/components/ui/status-badge";
import { challenges } from "@/data/challenges";
import { aiCoCreationLabEvent as event } from "@/data/events";
import { eventFaqs } from "@/data/faqs";
import { buildEventJsonLd } from "@/lib/event-json-ld";

export const metadata: Metadata = {
  title: event.title,
  description: event.description,
  alternates: {
    canonical: event.route,
  },
  openGraph: {
    title: event.title,
    description: event.featuredSummary,
    url: event.route,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: event.title,
      },
    ],
  },
};

const whyCards = [
  {
    icon: GraduationCap,
    title: "Mahasiswa membutuhkan konteks nyata",
    description:
      "Penggunaan AI berkembang cepat, tetapi pengalaman menerjemahkan teknologi menjadi solusi untuk pengguna nyata masih perlu diperluas.",
  },
  {
    icon: BriefcaseBusiness,
    title: "UMKM membutuhkan pendampingan praktis",
    description:
      "Masalah berulang dapat dibantu dengan workflow sederhana, selama solusi dibangun sesuai perangkat, waktu, dan bahasa usaha sehari-hari.",
  },
] as const;

const eventPrinciples = [
  {
    icon: Lightbulb,
    title: "Relevan",
    description: "Berangkat dari kebutuhan yang sudah divalidasi.",
  },
  {
    icon: ShieldCheck,
    title: "Aman",
    description: "Tidak meminta data pelanggan atau informasi sensitif.",
  },
  {
    icon: Smartphone,
    title: "Dapat digunakan",
    description: "Hasil dan panduan dapat dicoba melalui smartphone.",
  },
] as const;

export default function EventLandingPage() {
  const eventJsonLd = buildEventJsonLd(event);

  return (
    <>
      {eventJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: eventJsonLd }}
        />
      ) : null}

      <section className="relative isolate overflow-hidden bg-white">
        <div className="dot-grid absolute inset-y-0 right-0 w-1/2 opacity-45" aria-hidden="true" />
        <div className="page-container relative grid items-center gap-12 py-14 sm:py-18 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <Reveal className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <EventStatusBadge tone="neutral">{event.statusLabel}</EventStatusBadge>
              <EventStatusBadge tone="amber">{event.registrationStatusLabel}</EventStatusBadge>
            </div>
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              {event.tagline}
            </p>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.06em] text-ink sm:text-5xl lg:text-[4.25rem]">
              AI Co-Creation Lab <span className="text-brand">Makassar</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {event.featuredSummary}
            </p>

            <dl className="mt-7 grid max-w-2xl gap-3 text-sm sm:grid-cols-3">
              <div className="flex items-start gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-semibold text-slate-500">Tanggal</dt>
                  <dd className="mt-1 text-xs font-medium text-ink">{event.date.displayValue}</dd>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-semibold text-slate-500">Lokasi</dt>
                  <dd className="mt-1 text-xs font-medium text-ink">{event.location.displayValue}</dd>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <dt className="text-xs font-semibold text-slate-500">Waktu utama</dt>
                  <dd className="mt-1 text-xs font-medium text-ink">{event.mainActivity.displayTime}</dd>
                </div>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={event.routes.register}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(2,85,245,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-600"
              >
                Lihat jalur pendaftaran
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={event.routes.journey}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-6 text-sm font-semibold text-brand transition hover:-translate-y-0.5 hover:bg-brand-50"
              >
                Lihat perjalanan project
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <CoCreationVisual />
          </Reveal>
        </div>

        <div className="page-container pb-12 lg:pb-18">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {event.heroMetrics.map((metric) => (
              <MetricCard
                key={metric.id}
                value={metric.target}
                label={metric.label}
                helper={`Target ${metric.unit}`}
              />
            ))}
          </div>
        </div>
      </section>

      <EventSubnav />

      <section className="section-space bg-surface" data-aos="fade-up">
        <div className="page-container">
          <SectionHeading
            eyebrow={event.landingSections.whyItMatters.eyebrow}
            title={
              <>
                Teknologi menjadi berarti ketika <span className="text-brand">menjawab kebutuhan nyata.</span>
              </>
            }
            description={event.landingSections.whyItMatters.description}
            align="center"
          />
          <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
            {whyCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-ink">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space bg-white" data-aos="fade-up">
        <div className="page-container grid gap-5 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8 lg:p-10">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-red-50 text-red-700">
              <Network className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-red-700">
              {event.landingSections.problem.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.04em] text-ink">
              {event.landingSections.problem.title}
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">{event.problem}</p>
          </article>

          <article className="rounded-[2rem] bg-brand p-6 text-white sm:p-8 lg:p-10">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/14 text-white">
              <Handshake className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-brand-100">
              {event.landingSections.concept.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.04em]">
              {event.landingSections.concept.title}
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/78 sm:text-base sm:leading-8">{event.solution}</p>
            <div className="mt-6 rounded-2xl border border-white/18 bg-white/10 p-4">
              <p className="text-sm font-medium leading-7 text-white/88">{event.importantLimitation}</p>
            </div>
          </article>
        </div>
      </section>

      <section id="cara-kerja" className="section-space border-y border-slate-200 bg-surface">
        <div className="page-container">
          <SectionHeading
            eyebrow="Cara kerja"
            title={
              <>
                Enam tahap, satu alur <span className="text-brand">co-creation.</span>
              </>
            }
            description={event.landingSections.eventFlow.description}
            align="center"
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {event.howItWorks.map((step, index) => (
              <li
                key={step.id}
                className="relative min-h-56 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_12px_36px_rgba(1,34,98,0.05)]"
              >
                <span className="absolute right-5 top-3 font-mono text-5xl font-semibold tracking-[-0.08em] text-brand-50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="relative grid h-10 w-10 place-items-center rounded-2xl bg-brand text-white">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <h3 className="relative mt-6 text-lg font-semibold tracking-[-0.025em] text-ink">{step.title}</h3>
                <p className="relative mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="page-container">
          <div className="grid items-end gap-8 lg:grid-cols-2">
            <SectionHeading
              eyebrow={event.landingSections.participantComposition.eyebrow}
              title={
                <>
                  Satu tim, <span className="text-brand">empat peran yang saling melengkapi.</span>
                </>
              }
            />
            <p className="max-w-xl text-base leading-8 text-slate-600 lg:justify-self-end">
              {event.landingSections.participantComposition.description}
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {event.participantComposition.map((participant) => (
                <article key={participant.id} className="rounded-3xl border border-brand-100 bg-brand-50 p-6">
                  <p className="font-mono text-3xl font-semibold text-brand">{participant.target}</p>
                  <h3 className="mt-2 font-semibold text-ink">{participant.label}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{participant.description}</p>
                </article>
              ))}
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Komposisi tiap tim</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {event.teamRoles.map((role, index) => (
                  <div key={role} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white font-mono text-xs font-semibold text-brand">
                      0{index + 1}
                    </span>
                    <span className="text-sm font-semibold text-ink">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-brand text-white">
        <div className="page-container">
          <SectionHeading
            eyebrow="Manfaat peserta"
            title="Nilai belajar dan hasil praktis berjalan bersama."
            description="Program dirancang agar mahasiswa dan UMKM sama-sama berkontribusi, mencoba, dan membawa pulang pembelajaran yang dapat digunakan."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {[
              { title: "Untuk mahasiswa", icon: GraduationCap, items: event.benefits.student },
              { title: "Untuk UMKM", icon: BriefcaseBusiness, items: event.benefits.umkm },
            ].map((group) => {
              const Icon = group.icon;
              return (
                <article key={group.title} className="rounded-[2rem] border border-white/18 bg-white/10 p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-brand">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-xl font-semibold">{group.title}</h3>
                  </div>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm leading-6 text-white/82">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-100" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space bg-surface">
        <div className="page-container grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <CoCreationVisual />
          <div>
            <SectionHeading
              eyebrow="Event flow"
              title={
                <>
                  Bukan lomba membuat aplikasi <span className="text-brand">dalam satu hari.</span>
                </>
              }
              description={event.importantLimitation}
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {eventPrinciples.map((principle) => {
                const Icon = principle.icon;
                return (
                  <article key={principle.title} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <Icon className="h-5 w-5 text-brand" aria-hidden="true" />
                    <h3 className="mt-3 text-sm font-semibold text-ink">{principle.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{principle.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="rundown" className="section-space bg-white">
        <div className="page-container grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Rundown"
              title={
                <>
                  2,5 jam yang <span className="text-brand">fokus dan terarah.</span>
                </>
              }
              description="Waktu pelaksanaan utama telah dirancang. Tanggal dan lokasi tetap menunggu konfirmasi final."
            />
          </div>
          <ol className="relative border-l border-brand-100 pl-6 sm:pl-8">
            {event.rundown.map((item, index) => (
              <li key={item.id} className={`relative ${index > 0 ? "mt-8" : ""}`}>
                <span className="absolute -left-[1.86rem] top-1 h-3 w-3 rounded-full border-2 border-white bg-brand ring-4 ring-brand-50 sm:-left-[2.36rem]" />
                <p className="font-mono text-xs font-semibold text-brand">{item.time}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-space border-y border-slate-200 bg-surface">
        <div className="page-container">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Contoh challenge"
              title={
                <>
                  Empat area awal untuk <span className="text-brand">proses validasi.</span>
                </>
              }
              description="Contoh berikut bukan assignment final dan belum terhubung ke nama UMKM tertentu."
            />
            <Link
              href={event.routes.challenges}
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full font-semibold text-brand"
            >
              Lihat semua challenge
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {challenges.map((challenge) => (
              <article key={challenge.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_36px_rgba(1,34,98,0.05)]">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-semibold text-brand">0{challenge.slot}</span>
                  <EventStatusBadge tone="amber">{challenge.statusLabel}</EventStatusBadge>
                </div>
                <h3 className="mt-5 text-lg font-semibold leading-7 tracking-[-0.025em] text-ink">{challenge.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{challenge.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="page-container overflow-hidden rounded-[2.25rem] bg-brand px-6 py-10 text-white sm:px-10 sm:py-12 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:px-14">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-100">GEP project journey</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl">
              Week 1–4 memiliki URL progres yang dapat ditinjau satu per satu.
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/75 sm:text-base">
              Mulai dari leadership profile dan network mapping hingga implementasi, impact measurement, reflection, dan final presentation.
            </p>
          </div>
          <Link
            href={event.routes.journey}
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-brand hover:bg-brand-50 lg:mt-0"
          >
            Buka journey
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section-space bg-surface">
        <div className="page-container">
          <SectionHeading
            eyebrow={event.landingSections.partnership.eyebrow}
            title={
              <>
                Partnership dengan <span className="text-brand">status yang transparan.</span>
              </>
            }
            description={event.landingSections.partnership.description}
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {event.partners.map((partner) => (
              <PartnerLogoPlaceholder
                key={partner.id}
                label={partner.roleLabel}
                name={partner.name}
                approved={partner.approved}
                status={partner.statusLabel}
              />
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-600">
            <strong className="font-semibold text-ink">{event.programContext.label}:</strong>{" "}
            {event.programContext.name}. Penyebutan ini menjelaskan konteks mini project dan bukan klaim sponsorship atau partnership aktif.
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="page-container grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="FAQ"
              title={
                <>
                  Hal yang perlu <span className="text-brand">diketahui sebelum mendaftar.</span>
                </>
              }
              description="Jawaban mengikuti status program saat ini dan akan diperbarui ketika jadwal, lokasi, serta pendaftaran dikonfirmasi."
            />
          </div>
          <FaqList items={eventFaqs} />
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-12 lg:pb-24">
        <div className="mx-auto max-w-[74rem] rounded-[2rem] border border-brand-100 bg-brand-50 px-6 py-12 text-center sm:px-10 lg:px-14">
          <UsersRound className="mx-auto h-7 w-7 text-brand" aria-hidden="true" />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            {event.landingSections.registrationCta.eyebrow}
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-[-0.045em] text-ink sm:text-4xl">
            {event.landingSections.registrationCta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            {event.landingSections.registrationCta.description}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={event.routes.registerStudent}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-600"
            >
              Info jalur mahasiswa
            </Link>
            <Link
              href={event.routes.registerUmkm}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-200 bg-white px-6 text-sm font-semibold text-brand hover:bg-brand-50"
            >
              Info jalur UMKM
            </Link>
          </div>
          <p className="mt-5 text-xs font-medium text-slate-500">{event.registrationStatusLabel}</p>
        </div>
      </section>
    </>
  );
}
