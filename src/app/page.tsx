import type { Metadata } from "next";
import {
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  FileCheck2,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  UsersRound,
} from "lucide-react";

import { EventCard } from "@/components/event/event-card";
import { Reveal } from "@/components/motion/reveal";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { EventStatusBadge } from "@/components/ui/status-badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { PlatformFlowVisual } from "@/components/visuals/platform-flow-visual";
import { featuredEvent } from "@/data/events";
import { platform } from "@/data/platform";

export const metadata: Metadata = {
  title: {
    absolute: "DekatLokal Event — Kelola Acara, Hubungkan Peserta, Ukur Dampaknya",
  },
  description: platform.description,
  alternates: {
    canonical: "/",
  },
};

const featureIcons = {
  "event-page": CalendarDays,
  registration: UsersRound,
  journey: FileCheck2,
  impact: BarChart3,
  "organizer-dashboard": LayoutDashboard,
  "paid-events": TicketCheck,
} as const;

const audienceNumbers = ["01", "02", "03", "04"] as const;

export default function PlatformHomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand text-white">
        <div className="hero-grid absolute inset-0 opacity-65" aria-hidden="true" />
        <div
          className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-brand-300/30 blur-3xl"
          aria-hidden="true"
        />
        <div className="page-container relative grid min-h-[42rem] items-center gap-12 py-16 lg:grid-cols-[1.06fr_0.94fr] lg:py-24">
          <Reveal className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white/90">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Satu rumah digital untuk acara lokal
            </div>
            <p className="mt-7 text-lg font-semibold text-brand-100">{platform.name}</p>
            <h1 className="mt-3 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.06em] sm:text-5xl lg:text-[4.35rem]">
              {platform.tagline}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
              {platform.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton
                href={featuredEvent.route}
                tone="light"
              >
                Lihat event pertama
              </PrimaryButton>
              <SecondaryButton
                href={platform.mainSite.href}
                external
                className="border-white/30 bg-white/10 text-white hover:border-white/60 hover:bg-white/15"
              >
                {platform.mainSite.label}
              </SecondaryButton>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-white/68">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brand-100" aria-hidden="true" />
                Data pendaftaran diproses di server
              </span>
              <span className="inline-flex items-center gap-2">
                <FileCheck2 className="h-4 w-4 text-brand-100" aria-hidden="true" />
                Target dan dampak aktual dipisahkan
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <PlatformFlowVisual />
          </Reveal>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-5">
        <div className="page-container flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 sm:justify-between">
          <span>Informasi event</span>
          <span className="hidden h-1 w-1 rounded-full bg-brand sm:block" aria-hidden="true" />
          <span>Pendaftaran</span>
          <span className="hidden h-1 w-1 rounded-full bg-brand sm:block" aria-hidden="true" />
          <span>Journey & evidence</span>
          <span className="hidden h-1 w-1 rounded-full bg-brand sm:block" aria-hidden="true" />
          <span>Laporan dampak</span>
        </div>
      </section>

      <section className="section-space bg-white" data-aos="fade-up">
        <div className="page-container grid items-start gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Event unggulan"
              title={
                <>
                  Kolaborasi lokal, <span className="text-brand">hasil yang dapat ditelusuri.</span>
                </>
              }
              description="Event pertama menjadi proof of concept: satu halaman yang menghubungkan konteks program, aplikasi peserta, perjalanan project, dan pengukuran."
            />
            <div className="mt-7 rounded-3xl border border-brand-100 bg-brand-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                Catatan integritas
              </p>
              <p className="mt-2 text-sm leading-7 text-brand-900">
                Angka peserta dan solusi ditampilkan sebagai target program. Capaian aktual baru akan ditampilkan setelah diukur.
              </p>
            </div>
          </div>
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
        </div>
      </section>

      <section className="section-space border-y border-slate-200 bg-surface" data-aos="fade-up">
        <div className="page-container">
          <SectionHeading
            eyebrow="Kapabilitas platform"
            title={
              <>
                Event tidak berhenti di <span className="text-brand">formulir pendaftaran.</span>
              </>
            }
            description="DekatLokal Event menyatukan hal yang biasanya tersebar di banyak tools, sambil tetap jujur tentang fitur yang belum tersedia."
            align="center"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {platform.features.map((feature) => {
              const Icon = featureIcons[feature.id as keyof typeof featureIcons] ?? Sparkles;
              return (
                <article
                  key={feature.id}
                  className="flex min-h-64 flex-col rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_12px_36px_rgba(1,34,98,0.05)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <EventStatusBadge tone={feature.status === "available" ? "blue" : "neutral"}>
                      {feature.statusLabel}
                    </EventStatusBadge>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-[-0.025em] text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space bg-white" data-aos="fade-up">
        <div className="page-container">
          <div className="grid items-end gap-8 lg:grid-cols-2">
            <SectionHeading
              eyebrow="Untuk siapa"
              title={
                <>
                  Dibuat untuk penggerak <span className="text-brand">kegiatan lokal.</span>
                </>
              }
            />
            <p className="max-w-xl text-base leading-8 text-slate-600 lg:justify-self-end">
              Struktur MVP berfokus pada kebutuhan paling mendasar: informasi yang jelas, peserta yang terarah, dokumentasi yang rapi, dan dampak yang dapat dipertanggungjawabkan.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {platform.audiences.map((audience, index) => (
              <article
                key={audience.id}
                className="rounded-3xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
              >
                <p className="font-mono text-xs font-semibold text-brand">{audienceNumbers[index]}</p>
                <h3 className="mt-6 text-lg font-semibold tracking-[-0.025em] text-ink">{audience.label}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{audience.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-12 lg:pb-24">
        <div className="mx-auto max-w-[74rem] overflow-hidden rounded-[2rem] bg-brand px-6 py-12 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-100">Mulai dari event pertama</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl">
              Lihat bagaimana satu event dibangun dari kebutuhan hingga rencana dampak.
            </h2>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
            <PrimaryButton
              href={featuredEvent.route}
              tone="light"
            >
              Jelajahi AI Co-Creation Lab
            </PrimaryButton>
            <a
              href={platform.mainSite.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Kenali DekatLokal
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
