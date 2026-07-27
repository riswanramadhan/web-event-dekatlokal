import {
  ArrowLeft,
  Clock3,
  GraduationCap,
  ShieldCheck,
  Store,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { EventPageHero } from "@/components/event/page-hero";
import { RegistrationRoleCard } from "@/components/registration/registration-role-card";
import { aiCoCreationLabEvent as event } from "@/data/events";
import { isSupabaseAdminConfigured } from "@/lib/supabase/admin";

const title = "Pilih Jalur Pendaftaran";
const description =
  "Pilih peran sebagai mahasiswa problem solver atau UMKM challenge partner dalam AI Co-Creation Lab Makassar.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: event.routes.register,
  },
  openGraph: {
    title: `${title} | ${event.title}`,
    description,
    url: event.routes.register,
  },
};

export default function RegistrationHubPage() {
  const environmentConfigured = isSupabaseAdminConfigured();
  const submissionsAvailable =
    event.registrationOpen && environmentConfigured;
  const showConfigurationDetails = process.env.NODE_ENV !== "production";

  const availabilityMessage = !event.registrationOpen
    ? "Pendaftaran belum dibuka. Anda tetap dapat melihat formulir sebagai pratinjau, tetapi tombol kirim masih dinonaktifkan."
    : !environmentConfigured && showConfigurationDetails
      ? "Pendaftaran belum terhubung ke Supabase. Lengkapi environment server sebelum menguji pengiriman."
      : !environmentConfigured
        ? "Pendaftaran sedang tidak tersedia. Silakan coba lagi nanti."
        : "Pendaftaran sedang dibuka. Pilih jalur yang paling sesuai dan lengkapi formulir aplikasi.";

  return (
    <>
      <EventPageHero
        eyebrow="Portal pendaftaran"
        title="Pilih peran dalam AI Co-Creation Lab."
        description="Mahasiswa dan pelaku UMKM berkolaborasi dari dua peran yang berbeda. Pilih jalur yang paling sesuai dengan kontribusi Anda."
        status={event.registrationStatusLabel}
        actions={
          <Link
            href={event.routes.detail}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-200 bg-white px-5 text-sm font-semibold text-brand transition hover:bg-brand-50"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Kembali ke event
          </Link>
        }
      />

      <main className="bg-surface py-12 sm:py-16 lg:py-20">
        <div className="page-container">
          <section
            aria-labelledby="registration-availability-title"
            className={`mb-8 rounded-[1.75rem] border p-5 sm:flex sm:items-start sm:gap-4 sm:p-6 ${
              submissionsAvailable
                ? "border-emerald-200 bg-emerald-50"
                : "border-amber-200 bg-amber-50"
            }`}
          >
            <span
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${
                submissionsAvailable
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {submissionsAvailable ? (
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Clock3 className="h-5 w-5" aria-hidden="true" />
              )}
            </span>
            <div className="mt-4 sm:mt-0">
              <h2
                id="registration-availability-title"
                className={`font-semibold text-ink ${
                  submissionsAvailable
                    ? ""
                    : "status-attention inline-flex rounded-full px-2 py-1"
                }`}
              >
                {submissionsAvailable
                  ? "Pendaftaran tersedia"
                  : event.registrationStatusLabel}
              </h2>
              <p className="mt-1 text-sm leading-7 text-slate-700">
                {availabilityMessage}
              </p>
            </div>
          </section>

          <section aria-labelledby="registration-path-title">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                Dua jalur kolaborasi
              </p>
              <h2
                id="registration-path-title"
                className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl"
              >
                Temukan jalur yang paling sesuai.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Setiap pendaftaran akan ditinjau untuk menyusun komposisi tim
                dan challenge yang relevan. Mengirim aplikasi belum berarti
                otomatis diterima.
              </p>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <RegistrationRoleCard
                title="Mahasiswa"
                subtitle="Problem Solver"
                description={event.registrationRoles[0].description}
                href={event.routes.registerStudent}
                icon={GraduationCap}
                highlights={[
                  "Memetakan masalah dan kebutuhan pengguna.",
                  "Menyusun workflow atau prototype berbantuan AI.",
                  "Berkolaborasi dan mendokumentasikan proses.",
                ]}
                cta={
                  submissionsAvailable
                    ? "Daftar sebagai mahasiswa"
                    : "Lihat formulir mahasiswa"
                }
              />

              <RegistrationRoleCard
                title="UMKM"
                subtitle="Challenge Partner"
                description={event.registrationRoles[1].description}
                href={event.routes.registerUmkm}
                icon={Store}
                highlights={[
                  "Membawa kebutuhan usaha yang nyata.",
                  "Menguji solusi bersama tim mahasiswa.",
                  "Mengikuti handover dan monitoring penggunaan.",
                ]}
                cta={
                  submissionsAvailable
                    ? "Daftar sebagai UMKM"
                    : "Lihat formulir UMKM"
                }
              />
            </div>
          </section>

          <section
            aria-labelledby="registration-process-title"
            className="mt-8 grid gap-5 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8 lg:grid-cols-[0.8fr_1.2fr]"
          >
            <div>
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2
                id="registration-process-title"
                className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-ink"
              >
                Apa yang terjadi setelah mendaftar?
              </h2>
            </div>
            <ol className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Kirim aplikasi",
                  description:
                    "Lengkapi jalur yang sesuai dan simpan kode pendaftaran.",
                },
                {
                  number: "02",
                  title: "Proses seleksi",
                  description:
                    "Tim meninjau kebutuhan, kemampuan, perangkat, dan komitmen.",
                },
                {
                  number: "03",
                  title: "Konfirmasi",
                  description:
                    "Peserta terpilih dihubungi melalui email atau WhatsApp.",
                },
              ].map((step) => (
                <li
                  key={step.number}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <span className="font-mono text-xs font-semibold text-brand">
                    {step.number}
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-slate-600">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <aside className="mt-6 rounded-2xl border border-brand-100 bg-brand-50 px-5 py-4 text-sm leading-7 text-slate-700">
            <strong className="font-semibold text-ink">Privasi data.</strong>{" "}
            {event.privacyNotice} Pelajari selengkapnya dalam{" "}
            <Link
              href="/privacy"
              className="font-semibold text-brand underline decoration-brand-200 underline-offset-4 hover:decoration-brand"
            >
              kebijakan privasi
            </Link>
            .
          </aside>
        </div>
      </main>
    </>
  );
}
