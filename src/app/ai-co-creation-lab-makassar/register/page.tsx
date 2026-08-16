import {
  ArrowLeft,
  Clock,
  GraduationCap,
  ShieldCheck,
  Shop,
} from "iconoir-react";
import type { Metadata } from "next";
import Link from "next/link";

import { EventPageHero } from "@/components/event/page-hero";
import { RegistrationProgramBanner } from "@/components/registration/registration-program-banner";
import { RegistrationRoleCard } from "@/components/registration/registration-role-card";
import { aiCoCreationLabEvent as event } from "@/data/events";
import { getRegistrationState } from "@/lib/event/registration-state";
import { isSupabaseAdminConfigured } from "@/lib/supabase/admin";

const title = "Pilih Jalur Pendaftaran";
const description =
  "Pilih peran sebagai mahasiswa problem solver atau UMKM challenge partner dalam AI Co Creation Lab Makassar.";

export const metadata: Metadata = {
  title,
  description,
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: event.routes.register,
  },
  openGraph: {
    title: `${title} | ${event.title}`,
    description,
    url: event.routes.register,
  },
};

export default async function RegistrationHubPage() {
  const registration = await getRegistrationState();
  const environmentConfigured = isSupabaseAdminConfigured();
  const submissionsAvailable = registration.isOpen && environmentConfigured;
  const showConfigurationDetails = process.env.NODE_ENV !== "production";
  const isPostEvent = registration.statusLabel === "Pendaftaran Ditutup";

  const availabilityMessage = isPostEvent
    ? "Kegiatan telah selesai dan pendaftaran ditutup. Formulir tetap tersedia sebagai arsip struktur aplikasi, tetapi seluruh pengiriman dinonaktifkan."
    : !registration.isOpen
      ? "Pendaftaran belum dibuka. Anda tetap dapat melihat formulir sebagai pratinjau, tetapi tombol kirim masih dinonaktifkan."
    : !environmentConfigured && showConfigurationDetails
      ? "Pendaftaran belum terhubung ke Supabase. Lengkapi environment server sebelum menguji pengiriman."
      : !environmentConfigured
        ? "Pendaftaran sedang tidak tersedia. Silakan coba lagi nanti."
        : "Pendaftaran sedang dibuka. Pilih jalur yang paling sesuai dan lengkapi formulir aplikasi.";

  return (
    <>
      <EventPageHero
        eyebrow={isPostEvent ? "Arsip pendaftaran" : "Portal pendaftaran"}
        title={
          isPostEvent ? "Pendaftaran telah ditutup." : "Mau ikut dari sisi mana?"
        }
        description={
          isPostEvent
            ? "Kegiatan utama AI Co Creation Lab Makassar telah dilaksanakan pada 10 Agustus 2026. Halaman ini dipertahankan sebagai arsip dua jalur aplikasi."
            : "Datang sebagai mahasiswa problem solver atau UMKM challenge partner. Dua jalur, satu meja kolaborasi, dan satu tujuan: bikin solusi yang benar benar kepakai."
        }
        status={registration.statusLabel}
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

      <div className="bg-surface py-12 sm:py-16 lg:py-20">
        <div className="page-container">
          {!isPostEvent ? (
            <div className="mb-8">
              <RegistrationProgramBanner />
            </div>
          ) : null}

          <section
            aria-labelledby="registration-availability-title"
            className={`mb-8 rounded-[1.75rem] border p-5 sm:flex sm:items-start sm:gap-4 sm:p-6 ${
              submissionsAvailable
                ? "border-emerald-200 bg-emerald-50"
                : isPostEvent
                  ? "border-slate-200 bg-slate-50"
                  : "border-amber-200 bg-amber-50"
            }`}
          >
            <span
              className={`block shrink-0 ${
                submissionsAvailable
                  ? "text-emerald-700"
                  : isPostEvent
                    ? "text-slate-600"
                    : "text-amber-800"
              }`}
            >
              {submissionsAvailable ? (
                <ShieldCheck
                  className="h-7 w-7"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              ) : (
                <Clock
                  className="h-7 w-7"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              )}
            </span>
            <div className="mt-4 sm:mt-0">
              <h2
                id="registration-availability-title"
                className={`font-semibold text-ink ${
                  submissionsAvailable || isPostEvent
                    ? ""
                    : "status-attention inline-flex rounded-full px-2 py-1"
                }`}
              >
                {submissionsAvailable
                  ? "Pendaftaran tersedia"
                  : registration.statusLabel}
              </h2>
              <p className="mt-1 text-sm leading-7 text-slate-700">
                {availabilityMessage}
              </p>
            </div>
          </section>

          <section aria-labelledby="registration-path-title">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                {isPostEvent ? "Dua jalur aplikasi" : "Pilih role kamu"}
              </p>
              <h2
                id="registration-path-title"
                className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl"
              >
                {isPostEvent
                  ? "Lihat kembali struktur aplikasi program."
                  : "Ambil jalur yang paling nyambung sama kontribusimu."}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                {isPostEvent
                  ? "Formulir mahasiswa dan UMKM dapat dibuka sebagai pratinjau arsip. Data baru tidak dapat dikirim setelah kegiatan selesai."
                  : "Semua aplikasi tetap kami review supaya komposisi tim dan tantangannya pas. Jadi, isi dengan jujur dan tunjukkan versi terbaikmu tanpa perlu terdengar sempurna."}
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
                  "Ngobrol langsung dan memetakan kebutuhan pengguna.",
                  "Merancang workflow atau prototype berbantuan AI.",
                  "Kerja bareng sambil membangun bahan portofolio.",
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
                icon={Shop}
                highlights={[
                  "Bawa satu kebutuhan usaha yang benar benar terasa.",
                  "Coba solusi bareng tim mahasiswa.",
                  "Dapat panduan dan lanjut ke proses monitoring.",
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
              <ShieldCheck
                className="h-7 w-7 text-brand"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <h2
                id="registration-process-title"
                className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-ink"
              >
                {isPostEvent
                  ? "Bagaimana proses pendaftarannya berjalan?"
                  : "Habis submit, lanjut apa?"}
              </h2>
            </div>
            <ol className="grid gap-4 sm:grid-cols-3">
              {(isPostEvent
                ? [
                    {
                      number: "01",
                      title: "Aplikasi dikirim",
                      description:
                        "Peserta mengisi jalur mahasiswa atau UMKM sesuai kontribusinya.",
                    },
                    {
                      number: "02",
                      title: "Seleksi dilakukan",
                      description:
                        "Kebutuhan, kemampuan, perangkat, dan komitmen ditinjau oleh tim.",
                    },
                    {
                      number: "03",
                      title: "Konfirmasi disampaikan",
                      description:
                        "Peserta terpilih dihubungi melalui email atau WhatsApp yang didaftarkan.",
                    },
                  ]
                : [
                {
                  number: "01",
                  title: "Kirim aplikasi",
                  description:
                    "Isi jalur yang sesuai lalu simpan kode pendaftaranmu.",
                },
                {
                  number: "02",
                  title: "Proses seleksi",
                  description:
                    "Kami cek kebutuhan, kemampuan, perangkat, dan komitmenmu.",
                },
                {
                  number: "03",
                  title: "Konfirmasi",
                  description:
                    "Kalau terpilih, kamu kami hubungi lewat email atau WhatsApp.",
                },
                  ]
              ).map((step) => (
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
      </div>
    </>
  );
}
