import {
  Calendar,
  Clock,
  Group,
  MapPin,
  NavArrowRight,
  Wallet,
} from "iconoir-react";
import Image from "next/image";
import Link from "next/link";

import { EventStatusBadge } from "@/components/ui/status-badge";
import type { EventConfig } from "@/data/events";

type EventCardProps = {
  event: Pick<
    EventConfig,
    | "title"
    | "description"
    | "route"
    | "routes"
    | "registrationOpen"
    | "registrationStatusLabel"
    | "date"
    | "mainActivity"
    | "location"
    | "fee"
    | "capacity"
    | "participantComposition"
  >;
  image: {
    src: string;
    alt: string;
  };
  featured?: boolean;
};

export function EventCard({
  event,
  image,
  featured = false,
}: EventCardProps) {
  const studentTarget = event.participantComposition.find(
    (participant) => participant.id === "student",
  )?.target;
  const umkmTarget = event.participantComposition.find(
    (participant) => participant.id === "umkm",
  )?.target;
  const composition =
    studentTarget !== undefined && umkmTarget !== undefined
      ? `${studentTarget} mahasiswa dan ${umkmTarget} UMKM`
      : "Komposisi akan diumumkan";

  const facts = [
    {
      label: "Tanggal",
      value: event.date.displayValue,
      detail: "Jadwal kegiatan",
      Icon: Calendar,
      className: "",
    },
    {
      label: "Waktu",
      value: event.mainActivity.displayTime,
      detail: "Waktu Makassar",
      Icon: Clock,
      className: "",
    },
    {
      label: "Lokasi",
      value: event.location.displayValue,
      detail: event.location.city,
      Icon: MapPin,
      className: "col-span-2",
    },
    {
      label: "Biaya",
      value: event.fee.displayValue,
      detail: "Tanpa biaya pendaftaran",
      Icon: Wallet,
      className: "",
    },
    {
      label: "Kuota",
      value: event.capacity.statusLabel,
      detail: `${event.capacity.total} peserta, ${composition}`,
      Icon: Group,
      className: "",
    },
  ] as const;

  return (
    <article
      className={`mx-auto overflow-hidden rounded-[1.75rem] border bg-white ${
        featured
          ? "max-w-6xl border-brand-200 shadow-[0_24px_70px_rgba(1,34,98,0.1)]"
          : "border-slate-200 shadow-[0_16px_45px_rgba(1,34,98,0.07)]"
      }`}
    >
      <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
        <div className="relative min-h-64 overflow-hidden sm:min-h-80 lg:min-h-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={featured}
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent"
            aria-hidden="true"
          />
          <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
            <EventStatusBadge tone="neutral">
              {event.registrationStatusLabel}
            </EventStatusBadge>
          </div>
        </div>

        <div className="p-5 sm:p-7 lg:p-9">
          <h2 className="text-balance text-2xl font-semibold leading-tight tracking-[-0.04em] text-ink sm:text-3xl">
            {event.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            {event.description}
          </p>

          <dl className="mt-7 grid grid-cols-2 gap-3">
            {facts.map(({ label, value, detail, Icon, className }) => (
              <div
                key={label}
                className={`min-w-0 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition duration-200 hover:border-brand-200 hover:bg-brand-50/45 ${className}`}
              >
                <Icon
                  className="h-5 w-5 text-brand"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                <dt className="mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {label}
                </dt>
                <dd className="mt-1 text-sm font-semibold leading-6 text-ink">
                  {value}
                </dd>
                <dd className="mt-1 text-xs leading-5 text-slate-500">
                  {detail}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href={event.route}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-600"
            >
              Lihat Detail
              <NavArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            {event.registrationOpen ? (
              <Link
                href={event.routes.register}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-6 text-sm font-semibold text-brand transition hover:-translate-y-0.5 hover:border-brand hover:bg-brand-50"
              >
                Daftar Sekarang
                <NavArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
