import { getRegistrationState } from "@/lib/event/registration-state";
import {
  ArrowLeft,
  CheckCircle,
  InfoCircle,
  ShieldAlert,
  Shop,
} from "iconoir-react";
import type { Metadata } from "next";
import Link from "next/link";

import { EventPageHero } from "@/components/event/page-hero";
import { RegistrationProgramBanner } from "@/components/registration/registration-program-banner";
import { aiCoCreationLabEvent as event } from "@/data/events";
import { isSupabaseAdminConfigured } from "@/lib/supabase/admin";

import { UmkmRegistrationForm } from "./umkm-registration-form";

const title = "Pendaftaran UMKM";
const description =
  "Daftar sebagai UMKM challenge partner untuk AI Co Creation Lab Makassar dan ceritakan kebutuhan usaha yang ingin divalidasi bersama.";
const umkmTarget =
  event.participantComposition.find(
    (participant) => participant.id === "umkm",
  )?.target ?? 0;

export const metadata: Metadata = {
  title,
  description,
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: event.routes.registerUmkm,
  },
  openGraph: {
    title: `${title} | ${event.title}`,
    description,
    url: event.routes.registerUmkm,
  },
};

export default async function UmkmRegistrationPage() {
  const registration = await getRegistrationState();
  const isPostEvent = registration.statusLabel === "Pendaftaran Ditutup";
  const environmentConfigured = isSupabaseAdminConfigured();
  const configuredTurnstileSiteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  const turnstileSiteKey =
    configuredTurnstileSiteKey && process.env.TURNSTILE_SECRET_KEY?.trim()
      ? configuredTurnstileSiteKey
      : undefined;

  return (
    <>
      <EventPageHero
        eyebrow={isPostEvent ? "Arsip jalur UMKM" : "Jalur UMKM"}
        title={
          isPostEvent
            ? "Pendaftaran UMKM telah ditutup."
            : "Cerita usahamu bisa jadi titik awal solusi yang lebih ringan."
        }
        description={
          isPostEvent
            ? "Kegiatan utama telah dilaksanakan pada 10 Agustus 2026. Formulir berikut hanya ditampilkan sebagai pratinjau arsip dan tidak menerima pengiriman baru."
            : "Bawa satu proses yang terasa ribet atau berulang. Kamu tidak perlu jago AI, cukup paham usahamu dan siap mencoba bareng tim mahasiswa."
        }
        status={registration.statusLabel}
        actions={
          <Link
            href={event.routes.register}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-200 bg-white px-5 text-sm font-semibold text-brand transition hover:bg-brand-50"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {isPostEvent ? "Kembali ke arsip pendaftaran" : "Pilih jalur lain"}
          </Link>
        }
      />

      <section className="bg-surface py-10 sm:py-14 lg:py-18">
        <div className="page-container">
          {!isPostEvent ? (
            <RegistrationProgramBanner audience="umkm" />
          ) : null}

          <div
            className={`${isPostEvent ? "" : "mt-8"} grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10`}
          >
            <UmkmRegistrationForm
              environmentConfigured={environmentConfigured}
              registrationOpen={registration.isOpen}
              registrationResolved={registration.resolved}
              showConfigurationDetails={process.env.NODE_ENV !== "production"}
              successPath={event.routes.registrationSuccess}
              turnstileSiteKey={turnstileSiteKey}
            />

            <aside
              aria-label="Informasi jalur UMKM"
              className="space-y-4 lg:sticky lg:top-28"
            >
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-card">
                <Shop
                  className="h-7 w-7 text-brand"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                  Target program
                </p>
                <p className="mt-2 font-mono text-4xl font-semibold tracking-[-0.05em] text-ink">
                  {umkmTarget}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  UMKM sebagai challenge partner program.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-2">
                  <InfoCircle
                    className="h-4 w-4 text-brand"
                    aria-hidden="true"
                  />
                  <h2 className="font-semibold text-ink">
                    {isPostEvent
                      ? "Kriteria yang digunakan"
                      : "Kriteria jalur UMKM"}
                  </h2>
                </div>
                <ul className="mt-5 space-y-3">
                  {event.criteria.umkm.map((criterion) => (
                    <li
                      key={criterion}
                      className="flex gap-2.5 text-xs leading-6 text-slate-600"
                    >
                      <CheckCircle
                        className="mt-1 h-4 w-4 shrink-0 text-brand"
                        aria-hidden="true"
                      />
                      {criterion}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-6">
                <ShieldAlert
                  className="h-5 w-5 text-amber-800"
                  aria-hidden="true"
                />
                <h2 className="mt-4 font-semibold text-amber-950">
                  Jangan kirim data sensitif
                </h2>
                <p className="mt-2 text-xs leading-6 text-amber-950">
                  Jangan memasukkan nomor rekening, identitas pelanggan, data
                  transaksi rahasia, kata sandi, atau informasi pribadi milik
                  orang lain.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
