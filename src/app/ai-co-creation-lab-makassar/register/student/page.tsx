import { getRegistrationState } from "@/lib/event/registration-state";
import {
  ArrowLeft,
  CheckCircle,
  GraduationCap,
  InfoCircle,
  ShieldCheck,
} from "iconoir-react";
import type { Metadata } from "next";
import Link from "next/link";

import { EventPageHero } from "@/components/event/page-hero";
import { RegistrationProgramBanner } from "@/components/registration/registration-program-banner";
import { aiCoCreationLabEvent as event } from "@/data/events";
import { isSupabaseAdminConfigured } from "@/lib/supabase/admin";

import { StudentRegistrationForm } from "./student-registration-form";

const title = "Pendaftaran Mahasiswa";
const description =
  "Daftar sebagai mahasiswa problem solver untuk AI Co Creation Lab Makassar. Ceritakan kemampuan, pengalaman AI, perangkat, dan peran yang paling sesuai.";
const studentTarget =
  event.participantComposition.find(
    (participant) => participant.id === "student",
  )?.target ?? 0;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: event.routes.registerStudent,
  },
  openGraph: {
    title: `${title} | ${event.title}`,
    description,
    url: event.routes.registerStudent,
  },
};

export default async function StudentRegistrationPage() {
  const registration = await getRegistrationState();
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
        eyebrow="Jalur mahasiswa"
        title="Bikin AI jadi pengalaman nyata, bukan cuma tab di browser."
        description="Ceritakan skill, pengalaman, perangkat, dan role yang paling kamu banget. Kamu tidak harus jago dulu untuk mulai bikin solusi bareng UMKM."
        status={registration.statusLabel}
        actions={
          <Link
            href={event.routes.register}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-200 bg-white px-5 text-sm font-semibold text-brand transition hover:bg-brand-50"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Pilih jalur lain
          </Link>
        }
      />

      <section className="bg-surface py-10 sm:py-14 lg:py-18">
        <div className="page-container">
          <RegistrationProgramBanner audience="student" />

          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10">
            <StudentRegistrationForm
              environmentConfigured={environmentConfigured}
              registrationOpen={registration.isOpen}
              showConfigurationDetails={process.env.NODE_ENV !== "production"}
              successPath={event.routes.registrationSuccess}
              turnstileSiteKey={turnstileSiteKey}
            />

            <aside
              aria-label="Informasi jalur mahasiswa"
              className="space-y-4 lg:sticky lg:top-28"
            >
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-card">
                <GraduationCap
                  className="h-7 w-7 text-brand"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                  Target program
                </p>
                <p className="mt-2 font-mono text-4xl font-semibold tracking-[-0.05em] text-ink">
                  {studentTarget}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  mahasiswa dalam tim lintas kemampuan.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-2">
                  <InfoCircle
                    className="h-4 w-4 text-brand"
                    aria-hidden="true"
                  />
                  <h2 className="font-semibold text-ink">
                    Kriteria jalur mahasiswa
                  </h2>
                </div>
                <ul className="mt-5 space-y-3">
                  {event.criteria.student.map((criterion) => (
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

              <div className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-6">
                <ShieldCheck className="h-5 w-5 text-brand" aria-hidden="true" />
                <h2 className="mt-4 font-semibold text-ink">
                  Seleksi, bukan penerimaan otomatis
                </h2>
                <p className="mt-2 text-xs leading-6 text-slate-600">
                  Kami akan melihat kecocokan role, komposisi tim, perangkat,
                  dan komitmen hadir. Hasilnya dikirim lewat kontak yang kamu
                  daftarkan.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
