import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Sparkles,
  Store,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { EventStatusBadge } from "@/components/ui/status-badge";
import { aiCoCreationLabEvent as event } from "@/data/events";
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
        url: "/aicl-cocreation-indonesia.webp",
        width: 1600,
        height: 900,
        alt: "Mahasiswa dan pelaku UMKM Indonesia dalam sesi co-creation",
      },
    ],
  },
};

const eventDetails = [
  {
    label: "Tanggal",
    value: event.date.displayValue,
    icon: CalendarDays,
  },
  {
    label: "Waktu",
    value: event.mainActivity.displayTime,
    icon: Clock3,
  },
  {
    label: "Lokasi",
    value: event.location.displayValue,
    icon: MapPin,
  },
] as const;

const conciseFlow = [
  {
    title: "Pahami masalah",
    description:
      "Mahasiswa mendengar konteks usaha dan memetakan kebutuhan yang aman untuk dibantu AI.",
    icon: Store,
  },
  {
    title: "Bangun bersama",
    description:
      "Tim merancang workflow atau prototype sederhana bersama pelaku UMKM.",
    icon: Sparkles,
  },
  {
    title: "Uji dan serahkan",
    description:
      "UMKM mencoba hasil dan menerima panduan yang dapat digunakan kembali.",
    icon: ShieldCheck,
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

      <section className="relative isolate overflow-hidden bg-white lg:min-h-[calc(100svh-6rem)]">
        <div
          className="dot-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_78%)]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute -left-36 top-20 h-72 w-72 rounded-full bg-brand-50 blur-3xl" aria-hidden="true" />

        <div className="page-container relative grid gap-8 py-8 sm:py-10 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:gap-10 lg:py-8">
          <Reveal className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <EventStatusBadge tone="neutral">
                {event.statusLabel}
              </EventStatusBadge>
              <EventStatusBadge tone="amber">
                {event.registrationStatusLabel}
              </EventStatusBadge>
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-brand sm:mt-6">
              {event.tagline}
            </p>
            <h1 className="mt-3 max-w-3xl text-balance text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.06em] text-ink sm:text-5xl lg:text-[3.7rem]">
              AI Co-Creation Lab{" "}
              <span className="text-brand">Makassar</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-7">
              {event.featuredSummary}
            </p>

            <dl className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-[0.82fr_0.9fr_1.5fr]">
              {eventDetails.map((detail) => {
                const Icon = detail.icon;
                return (
                  <div
                    key={detail.label}
                    className={`${detail.label === "Lokasi" ? "sm:col-span-2 lg:col-span-1" : ""} flex min-w-0 items-start gap-3 rounded-2xl border border-slate-200/90 bg-white/88 p-3.5 shadow-[0_10px_28px_rgba(1,34,98,0.05)] backdrop-blur`}
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
                        {detail.label}
                      </dt>
                      <dd className="mt-1 text-xs font-semibold leading-5 text-ink">
                        {detail.value}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>

            <div className="mt-4 grid grid-cols-2 gap-2.5" aria-label="Kuota peserta">
              {event.participantComposition.map((participant) => {
                const Icon =
                  participant.id === "student" ? GraduationCap : Store;

                return (
                  <div
                    key={participant.id}
                    className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-brand-50/80 px-3.5 py-3"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                    <div>
                      <p className="font-mono text-xl font-semibold leading-none text-brand">
                        {participant.target}
                      </p>
                      <p className="mt-1 text-[0.7rem] font-semibold leading-4 text-slate-700 sm:text-xs">
                        {participant.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 grid gap-2.5 sm:flex sm:flex-wrap">
              <Link
                href={event.routes.registerStudent}
                className="event-cta group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(2,85,245,0.24)] transition hover:-translate-y-0.5 hover:bg-brand-600"
              >
                Jalur mahasiswa
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href={event.routes.registerUmkm}
                className="event-cta group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-6 text-sm font-semibold text-brand transition hover:-translate-y-0.5 hover:border-brand hover:bg-brand-50"
              >
                Jalur UMKM
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Pendaftaran merupakan tahap aplikasi. Pembukaan formulir akan
              diumumkan melalui halaman ini.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="min-w-0">
            <figure className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-100 p-2 shadow-[0_26px_70px_rgba(1,34,98,0.14)] sm:rounded-[2rem] lg:p-2.5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] sm:aspect-[16/11] lg:aspect-[4/4.35] xl:aspect-[4/3.75]">
                <Image
                  src="/aicl-cocreation-indonesia.webp"
                  alt="Mahasiswa dan pelaku UMKM Indonesia berdiskusi dalam sesi co-creation berbantuan AI"
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 44vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/75 via-slate-950/30 to-transparent px-4 pb-4 pt-16 text-white sm:px-5 sm:pb-5">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-brand-200" aria-hidden="true" />
                    Co-creation yang relevan, aman, dan dapat dipakai
                  </div>
                </div>
              </div>
              <figcaption className="px-2 pb-1 pt-2.5 text-[0.68rem] leading-5 text-slate-500">
                Visual representatif suasana program, bukan dokumentasi
                pelaksanaan acara.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-surface py-14 sm:py-16">
        <div className="page-container">
          <div className="mx-auto max-w-3xl text-center" data-aos="fade-up">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Cara kerja singkat
            </p>
            <h2 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.045em] text-ink sm:text-4xl">
              Dari masalah nyata menuju{" "}
              <span className="text-brand">solusi sederhana.</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              {event.importantLimitation}
            </p>
          </div>

          <ol className="mx-auto mt-8 grid max-w-5xl gap-3 md:grid-cols-3">
            {conciseFlow.map((step, index) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.title}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_36px_rgba(1,34,98,0.05)]"
                  data-aos="fade-up"
                  data-aos-delay={String(index * 70)}
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-50 text-brand">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs font-semibold text-brand-300">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-[-0.025em] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-12">
        <div className="mx-auto flex max-w-[74rem] flex-col gap-6 rounded-[2rem] bg-brand px-6 py-9 text-white sm:px-9 md:flex-row md:items-center md:justify-between lg:px-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-100">
              Pilih peranmu
            </p>
            <h2 className="mt-3 text-balance text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
              Mahasiswa dan UMKM bertemu untuk membangun solusi bersama.
            </h2>
          </div>
          <Link
            href={event.routes.register}
            className="event-cta group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-brand shadow-[0_14px_32px_rgba(0,17,49,0.2)] transition hover:-translate-y-0.5 hover:bg-brand-50"
          >
            Lihat jalur pendaftaran
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
