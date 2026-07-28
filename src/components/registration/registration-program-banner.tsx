import { Calendar, Clock, Group, MapPin } from "iconoir-react";

import { aiCoCreationLabEvent as event } from "@/data/events";

type RegistrationAudience = "all" | "student" | "umkm";

const audienceCopy: Record<
  RegistrationAudience,
  { readonly eyebrow: string; readonly title: string; readonly description: string }
> = {
  all: {
    eyebrow: "Kenalan dulu sama programnya",
    title: "Bukan cuma isi form. Ini awal kamu masuk ke ruang co creation.",
    description:
      "Mahasiswa dan UMKM akan duduk satu meja, membedah masalah usaha yang nyata, lalu merancang solusi AI sederhana yang bisa langsung diuji bersama.",
  },
  student: {
    eyebrow: "Buat mahasiswa yang mau naik level",
    title: "Bawa rasa penasaranmu. Pulang dengan pengalaman yang benar benar kepakai.",
    description:
      "Kamu akan bekerja bareng UMKM, memahami masalah dari pengguna nyata, lalu mengubah ide jadi alur AI sederhana yang relevan dan bisa dicoba.",
  },
  umkm: {
    eyebrow: "Buat UMKM yang siap bertumbuh",
    title: "Bawa satu tantangan usaha. Kita bedah dan cari jalannya bareng.",
    description:
      "Kamu tidak perlu jago teknologi. Ceritakan proses usaha yang terasa ribet atau berulang, lalu uji solusi sederhana bersama tim mahasiswa.",
  },
};

function participantTarget(role: "student" | "umkm"): number {
  return (
    event.participantComposition.find((participant) => participant.id === role)
      ?.target ?? 0
  );
}

export function RegistrationProgramBanner({
  audience = "all",
}: {
  audience?: RegistrationAudience;
}) {
  const copy = audienceCopy[audience];
  const titleId = `registration-program-${audience}-title`;
  const studentTarget = participantTarget("student");
  const umkmTarget = participantTarget("umkm");
  const facts = [
    {
      label: "Tanggal",
      value: event.date.displayValue,
      Icon: Calendar,
    },
    {
      label: "Waktu",
      value: event.mainActivity.displayTime,
      Icon: Clock,
    },
    {
      label: "Lokasi",
      value: event.location.displayValue,
      Icon: MapPin,
    },
    {
      label: "Target kolaborator",
      value: `${studentTarget} mahasiswa dan ${umkmTarget} UMKM`,
      Icon: Group,
    },
  ] as const;

  return (
    <section
      aria-labelledby={titleId}
      className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-card"
    >
      <div className="h-2.5 bg-brand" aria-hidden="true" />
      <div className="p-5 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">
              {copy.eyebrow}
            </p>
            <h2
              id={titleId}
              className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl"
            >
              {copy.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              {copy.description}
            </p>
          </div>
          <span className="inline-flex w-fit shrink-0 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand">
            Gratis dan melalui seleksi
          </span>
        </div>

        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          {facts.map(({ label, value, Icon }) => (
            <div
              key={label}
              className="flex min-w-0 items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <Icon
                className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {label}
                </dt>
                <dd className="mt-1 text-sm font-semibold leading-6 text-ink">
                  {value}
                </dd>
              </div>
            </div>
          ))}
        </dl>

        <p className="mt-5 border-t border-slate-200 pt-5 text-xs leading-6 text-slate-500">
          Mengirim formulir berarti masuk tahap aplikasi, bukan otomatis menjadi
          peserta. Tim akan meninjau kecocokan peran, kebutuhan, dan komposisi
          kolaborasi.
        </p>
      </div>
    </section>
  );
}
