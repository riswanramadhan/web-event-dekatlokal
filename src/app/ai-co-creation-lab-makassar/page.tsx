import { getRegistrationState } from "@/lib/event/registration-state";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  Coins,
  Group,
  MapPin,
  Shop,
} from "iconoir-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { EventEcosystem } from "@/components/event/event-ecosystem";
import { ProgressReportNavigation } from "@/components/reports";
import { EventStatusBadge } from "@/components/ui/status-badge";
import { aiCoCreationLabEvent as event } from "@/data/events";
import { buildEventJsonLd } from "@/lib/event-json-ld";

const studentTarget = event.participantComposition.find(
  (participant) => participant.id === "student",
)?.target;
const umkmTarget = event.participantComposition.find(
  (participant) => participant.id === "umkm",
)?.target;
const participantComposition =
  studentTarget !== undefined && umkmTarget !== undefined
    ? `${studentTarget} mahasiswa dan ${umkmTarget} UMKM`
    : "Komposisi peserta akan diumumkan";

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
        alt: "Mahasiswa dan pelaku UMKM Indonesia dalam sesi co creation",
      },
    ],
  },
};

const eventDetails = [
  {
    label: "Tanggal",
    value: event.date.displayValue,
    description: "Tanggal kegiatan utama",
    icon: Calendar,
  },
  {
    label: "Waktu",
    value: event.mainActivity.displayTime,
    description: "Menggunakan Waktu Indonesia Tengah",
    icon: Clock,
  },
  {
    label: "Lokasi",
    value: event.location.displayValue,
    description: event.location.city,
    icon: MapPin,
  },
  {
    label: "Biaya pendaftaran",
    value: event.fee.displayValue,
    description: "Tidak ada biaya untuk mengikuti program",
    icon: Coins,
  },
  {
    label: "Kuota peserta",
    value: `${event.capacity.total} peserta`,
    description: `${participantComposition}. ${event.capacity.statusLabel}.`,
    icon: Group,
  },
] as const;

const conciseFlow = [
  {
    title: "Pahami masalah usaha",
    description:
      "Mahasiswa mendengar konteks usaha lalu memilih kebutuhan yang paling masuk akal untuk dikerjakan.",
    icon: Shop,
  },
  {
    title: "Bikin solusi bareng",
    description:
      "Setiap tim menyusun alur kerja atau prototype sederhana bersama pelaku UMKM.",
    icon: Group,
  },
  {
    title: "Coba sampai kepakai",
    description:
      "UMKM menguji hasil dan menerima panduan yang bisa digunakan lagi setelah kegiatan.",
    icon: CheckCircle,
  },
] as const;

const iconClassName = "h-6 w-6 shrink-0 text-brand";

export default async function EventLandingPage() {
  const registration = await getRegistrationState();
  const eventJsonLd = buildEventJsonLd(event);

  return (
    <>
      {eventJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: eventJsonLd }}
        />
      ) : null}

      <section className="relative isolate overflow-hidden">
        <div
          className="dot-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_82%)]"
          aria-hidden="true"
        />
        <div className="page-container relative grid gap-9 py-12 sm:py-16 lg:min-h-[calc(100svh-5.5rem)] lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14 lg:py-12">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <EventStatusBadge tone="neutral">
                {event.statusLabel}
              </EventStatusBadge>
              <EventStatusBadge tone="amber">
                {registration.statusLabel}
              </EventStatusBadge>
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Program praktik untuk mahasiswa dan UMKM
            </p>
            <h1 className="mt-4 max-w-3xl text-balance text-[2.55rem] font-semibold leading-[1.03] tracking-[-0.06em] text-ink sm:text-5xl lg:text-[3.85rem]">
              AI Co Creation Lab <span className="text-brand">Makassar</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {participantComposition} bakal satu meja, bongkar masalah usaha
              yang real, lalu ngeracik solusi AI yang simpel, aman, dan bisa
              langsung dicoba.
            </p>
            <p className="mt-3 text-sm font-medium text-slate-800">
              Datang bawa rasa penasaran. Pulang bawa karya yang kepakai.
            </p>

            <div className="mt-8 grid justify-items-center gap-3 sm:flex sm:flex-wrap sm:justify-start">
              <Link
                href={event.routes.registerStudent}
                className="event-cta inline-flex min-h-12 w-fit max-w-full items-center justify-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(2,85,245,0.2)] transition hover:-translate-y-0.5 hover:bg-brand-600 sm:px-6"
              >
                Daftar sebagai Mahasiswa
                <ArrowRight
                  className="h-4 w-4"
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
              </Link>
              <Link
                href={event.routes.registerUmkm}
                className="inline-flex min-h-12 w-fit max-w-full items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-5 text-sm font-semibold text-brand transition hover:-translate-y-0.5 hover:border-brand hover:bg-brand-50 sm:px-6"
              >
                Daftar sebagai UMKM
              </Link>
              <a
                href="#alur-kegiatan"
                className="inline-flex min-h-12 w-fit max-w-full items-center justify-center rounded-full px-4 text-sm font-semibold text-slate-700 underline decoration-brand-200 decoration-2 underline-offset-4 transition hover:text-brand hover:decoration-brand"
              >
                Lihat Alur Kegiatan
              </a>
            </div>
            <p className="mt-4 text-xs leading-6 text-slate-500">
              Pendaftaran adalah tahap aplikasi. Peserta terpilih akan
              dikonfirmasi melalui kontak yang diberikan.
            </p>
          </div>

          <div className="min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-100 shadow-[0_22px_55px_rgba(1,34,98,0.12)] sm:aspect-[16/11]">
              <Image
                src="/aicl-cocreation-indonesia.webp"
                alt="Mahasiswa dan pelaku UMKM Indonesia berdiskusi untuk menyelesaikan masalah usaha"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 46vw"
                className="object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/70 bg-white/95 p-3 shadow-[0_12px_30px_rgba(1,34,98,0.16)] backdrop-blur-sm sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[78%] sm:max-w-[23rem] sm:p-4">
                <Image
                  src={event.branding.logo.src}
                  alt={event.branding.logo.alt}
                  width={event.branding.logo.width}
                  height={event.branding.logo.height}
                  sizes="(max-width: 639px) calc(100vw - 4rem), 23rem"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="informasi-event"
        className="border-y border-slate-200 bg-white py-14 sm:py-20"
      >
        <div className="page-container grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Informasi event
            </p>
            <h2
              id="informasi-event"
              className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] text-ink sm:text-4xl"
            >
              Semua yang perlu kamu tahu sebelum ikut.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Tanggal, waktu, tempat, biaya, dan kuota ditampilkan apa adanya
              supaya kamu bisa menentukan pilihan tanpa menebak.
            </p>
          </div>

          <dl className="grid gap-3">
            {eventDetails.map((detail) => {
              const Icon = detail.icon;

              return (
                <div
                  key={detail.label}
                  className="group grid min-h-28 grid-cols-[auto_1fr] gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand-200 hover:shadow-[0_10px_28px_rgba(1,34,98,0.06)] sm:gap-5 sm:p-6"
                >
                  <Icon
                    className={iconClassName}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <div className="min-w-0 pr-2">
                    <dt className="text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">
                      {detail.label}
                    </dt>
                    <dd className="mt-1.5 text-base font-semibold leading-7 text-ink sm:text-lg">
                      {detail.value}
                    </dd>
                    <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                      {detail.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <section
        id="alur-kegiatan"
        aria-labelledby="alur-kegiatan-title"
        className="scroll-mt-28 py-14 sm:py-20"
      >
        <div className="page-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Alur kegiatan
            </p>
            <h2
              id="alur-kegiatan-title"
              className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] text-ink sm:text-4xl"
            >
              Masalahnya real. Prosesnya juga dibuat praktis.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Program ini tidak menjanjikan aplikasi kompleks dalam satu hari.
              Fokusnya adalah solusi sederhana yang relevan, aman, dan bisa
              diuji bersama.
            </p>
          </div>

          <ol className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
            {conciseFlow.map((step, index) => {
              const Icon = step.icon;

              return (
                <li
                  key={step.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-brand-200"
                >
                  <div className="flex items-center justify-between gap-4">
                    <Icon
                      className={iconClassName}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                    <span className="font-mono text-xs font-semibold text-brand">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-[-0.025em] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <EventEcosystem
        sponsorship={event.sponsorship}
        supportingEcosystem={event.supportingEcosystem}
      />

      <section
        aria-labelledby="progress-report-title"
        className="border-y border-slate-200 bg-white py-14 sm:py-20"
      >
        <div className="page-container">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Progress report
            </p>
            <h2
              id="progress-report-title"
              className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] text-ink sm:text-4xl"
            >
              Cek perkembangan project berdasarkan week.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Laporan dipisahkan berdasarkan Week 1 dan Week 2. Filter week
              berikutnya akan muncul otomatis ketika laporannya sudah tersedia.
            </p>
          </div>
          <ProgressReportNavigation
            showLabel={false}
            className="report-no-print mt-8 max-w-5xl"
          />
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-12">
        <div className="mx-auto max-w-[74rem] rounded-[1.75rem] border border-brand-200 bg-brand px-6 py-10 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-100">
              Pilih peranmu
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.04em]">
              Ready bikin solusi yang benar benar kepakai?
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/80">
              Mahasiswa membawa cara pikir dan perangkat. UMKM membawa
              tantangan usaha yang nyata. Pilih jalur yang paling sesuai.
            </p>
          </div>
          <div className="mt-7 grid justify-items-center gap-3 sm:grid-cols-2 sm:justify-items-stretch lg:mt-0 lg:shrink-0">
            <Link
              href={event.routes.registerStudent}
              className="event-cta inline-flex min-h-12 w-fit max-w-full items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-brand transition hover:bg-brand-50 sm:w-auto"
            >
              Daftar Mahasiswa
            </Link>
            <Link
              href={event.routes.registerUmkm}
              className="inline-flex min-h-12 w-fit max-w-full items-center justify-center rounded-full border border-white/45 px-5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 sm:w-auto"
            >
              Daftar UMKM
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
