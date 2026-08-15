import type { Metadata } from "next";
import {
  Calendar,
  Clock,
  Group,
  MapPin,
  Wallet,
} from "iconoir-react";

import { EventCard } from "@/components/event/event-card";
import { Reveal } from "@/components/motion/reveal";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { featuredEvent } from "@/data/events";
import { getRegistrationState } from "@/lib/event/registration-state";

const studentTarget = featuredEvent.participantComposition.find(
  (participant) => participant.id === "student",
)?.target;
const umkmTarget = featuredEvent.participantComposition.find(
  (participant) => participant.id === "umkm",
)?.target;
const participantComposition =
  studentTarget !== undefined && umkmTarget !== undefined
    ? `${studentTarget} mahasiswa dan ${umkmTarget} UMKM`
    : "Komposisi akan diumumkan";

export const metadata: Metadata = {
  title: {
    absolute: "DekatEvent | Event Lokal dari DekatLokal",
  },
  description:
    "Temukan program lokal yang mempertemukan mahasiswa dan UMKM untuk meracik solusi AI dari tantangan usaha yang nyata.",
  alternates: {
    canonical: "/",
  },
};

const heroFacts = [
  {
    label: "Tanggal",
    value: featuredEvent.date.displayValue,
    detail: "Jadwal kegiatan",
    Icon: Calendar,
  },
  {
    label: "Waktu",
    value: featuredEvent.mainActivity.displayTime,
    detail: "Satu sesi utama",
    Icon: Clock,
  },
  {
    label: "Lokasi",
    value: featuredEvent.location.displayValue,
    detail: featuredEvent.location.city,
    Icon: MapPin,
  },
  {
    label: "Biaya",
    value: featuredEvent.fee.displayValue,
    detail: "Tanpa biaya pendaftaran",
    Icon: Wallet,
  },
  {
    label: "Kuota",
    value: featuredEvent.capacity.statusLabel,
    detail: `${featuredEvent.capacity.total} peserta, ${participantComposition}`,
    Icon: Group,
  },
] as const;

export default async function PlatformHomePage() {
  const registration = await getRegistrationState();
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-slate-200/80">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(2,85,245,0.12),transparent_68%)]"
          aria-hidden="true"
        />
        <div className="page-container relative flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center py-16 text-center sm:py-20 lg:py-24">
          <div className="mx-auto flex max-w-4xl flex-col items-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand sm:text-sm">
              AI Co Creation Lab Makassar
            </p>
            <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.055em] text-ink sm:text-5xl lg:text-[4.5rem]">
              AI bukan cuma buat nanya. Saatnya dipakai bantu usaha lokal.
            </h1>
            <p className="mt-6 max-w-2xl text-balance text-base leading-8 text-slate-600 sm:text-lg">
              {registration.isOpen
                ? `${participantComposition} bakal satu meja, bongkar masalah usaha yang real, lalu ngeracik solusi digital yang simpel dan bisa langsung dicoba.`
                : `${participantComposition} telah berkolaborasi untuk memahami masalah usaha nyata dan merancang solusi digital yang relevan.`}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <PrimaryButton href={featuredEvent.route}>
                Lihat Event
              </PrimaryButton>
              {registration.isOpen ? (
                <SecondaryButton href={featuredEvent.routes.register}>
                  Ikut Program
                </SecondaryButton>
              ) : null}
            </div>
            <p className="mt-6 text-sm font-medium text-slate-700">
              {registration.isOpen
                ? "Datang bawa rasa penasaran. Pulang bawa karya yang kepakai."
                : "Kegiatan utama telah dilaksanakan pada 10 Agustus 2026."}
            </p>
          </div>

          <dl className="mt-12 grid w-full max-w-6xl gap-3 text-left sm:grid-cols-2 lg:grid-cols-5">
            {heroFacts.map(({ label, value, detail, Icon }, index) => (
              <div
                key={label}
                className={`min-w-0 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_8px_24px_rgba(1,34,98,0.04)] transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_12px_30px_rgba(2,85,245,0.08)] ${
                  index === 2 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <Icon
                  className="h-5 w-5 text-brand"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                <dt className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.13em] text-slate-500">
                  {label}
                </dt>
                <dd className="mt-1.5 text-sm font-semibold leading-6 text-ink">
                  {value}
                </dd>
                <dd className="mt-1 text-xs leading-5 text-slate-500">
                  {detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-space bg-white/90">
        <div className="page-container">
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Event terdekat
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] text-ink sm:text-4xl">
              Datang bawa rasa penasaran. Pulang bawa sesuatu yang bisa dicoba.
            </h2>
          </Reveal>
          <EventCard
            event={featuredEvent}
            registrationOpen={registration.isOpen}
            registrationStatusLabel={registration.statusLabel}
            image={{
              src: "/aicl-cocreation-indonesia.webp",
              alt: "Mahasiswa dan pelaku UMKM Indonesia berdiskusi di meja kerja",
            }}
            featured
          />
        </div>
      </section>
    </>
  );
}
