import type { Metadata } from "next";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  LockKeyhole,
  ShieldCheck,
  UsersRound,
  Workflow,
} from "lucide-react";
import Link from "next/link";

import { EventPageHero } from "@/components/event/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { EventStatusBadge } from "@/components/ui/status-badge";
import { aiCoCreationLabEvent as event } from "@/data/events";
import {
  teams,
  type CollaborationTeam,
  type TeamRoleSlot,
} from "@/data/teams";

const pageDescription =
  "Empat slot tim AI Co-Creation Lab Makassar dengan komposisi peran, status challenge partner, dan status solusi tanpa membuka data pribadi peserta.";

export const metadata: Metadata = {
  title: `Tim — ${event.title}`,
  description: pageDescription,
  alternates: {
    canonical: event.routes.teams,
  },
  openGraph: {
    title: `Tim | ${event.title}`,
    description: pageDescription,
    url: event.routes.teams,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `Tim ${event.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Tim | ${event.title}`,
    description: pageDescription,
    images: ["/opengraph-image"],
  },
};

function teamStatusTone(
  status: CollaborationTeam["status"],
): "amber" | "blue" | "green" | "neutral" {
  if (status === "completed") return "green";
  if (status === "active") return "blue";
  if (status === "forming") return "amber";
  return "neutral";
}

function roleStatusLabel(status: TeamRoleSlot["status"]) {
  return status === "assigned" ? "Sudah ditetapkan" : "Belum ditetapkan";
}

export default function TeamsPage() {
  const roleBlueprint = teams[0].roles;

  return (
    <>
      <EventPageHero
        eyebrow="Collaboration teams"
        title="Empat tim, empat peran yang saling menjaga kualitas."
        description={pageDescription}
        status="Dalam perencanaan"
        actions={
          <>
            <a
              href="#team-slots"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(2,85,245,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-600"
            >
              Lihat slot tim
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href={event.routes.challenges}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-200 bg-white px-6 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand-50"
            >
              Tinjau challenges
            </Link>
          </>
        }
      />

      <section className="section-space bg-white">
        <div className="page-container">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.72fr]">
            <SectionHeading
              eyebrow="Blueprint tim"
              title={
                <>
                  Komposisi dirancang untuk{" "}
                  <span className="text-brand">membangun dan memeriksa.</span>
                </>
              }
              description="Setiap tim direncanakan memiliki empat fungsi. Nama anggota baru ditambahkan ke sumber data internal setelah seleksi; halaman publik tidak menampilkan kontak atau informasi pribadi."
            />
            <div className="flex gap-3 rounded-3xl border border-brand-100 bg-brand-50 p-5">
              <LockKeyhole
                className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-brand-900">
                  Privasi peserta dijaga
                </p>
                <p className="mt-1 text-xs leading-6 text-brand-800">
                  Tidak ada nama, nomor WhatsApp, email, atau data aplikasi
                  peserta pada halaman ini.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {roleBlueprint.map((role, index) => {
              const icons = [UsersRound, Bot, ShieldCheck, Workflow] as const;
              const Icon = icons[index] ?? UsersRound;

              return (
                <article
                  key={role.role}
                  className="rounded-3xl border border-slate-200 bg-surface p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-brand shadow-sm">
                      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs font-semibold text-brand">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold leading-6 text-ink">
                    {role.role}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {role.responsibility}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="team-slots"
        aria-labelledby="team-slots-title"
        className="section-space border-y border-slate-200 bg-surface"
      >
        <div className="page-container">
          <SectionHeading
            id="team-slots-title"
            eyebrow="Empat slot tim"
            title={
              <>
                Struktur siap,{" "}
                <span className="text-brand">assignment belum diumumkan.</span>
              </>
            }
            description="Status pada setiap kartu berasal dari konfigurasi event. Nilai yang belum tersedia ditampilkan apa adanya, bukan diisi dengan nama atau capaian contoh."
          />

          <div className="mt-10 grid gap-6 xl:grid-cols-2">
            {teams.map((team) => (
              <article
                key={team.id}
                className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(1,34,98,0.07)]"
              >
                <div className="border-b border-slate-100 p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                      Collaboration slot {String(team.slot).padStart(2, "0")}
                    </span>
                    <EventStatusBadge tone={teamStatusTone(team.status)}>
                      {team.statusLabel}
                    </EventStatusBadge>
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-ink sm:text-3xl">
                    {team.name ?? team.temporaryName}
                  </h2>
                  {!team.name ? (
                    <p className="mt-2 text-sm leading-7 text-slate-500">
                      Nama sementara hingga komposisi dan challenge ditetapkan.
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-3 p-5 sm:p-6">
                  {team.roles.map((role, index) => (
                    <div
                      key={role.role}
                      className="grid gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-[2.25rem_1fr_auto] sm:items-center"
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-white font-mono text-xs font-semibold text-brand shadow-sm">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-ink">
                          {role.role}
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {role.responsibility}
                        </p>
                      </div>
                      <span className="w-fit rounded-full border border-slate-200 bg-white px-3 py-1 text-[0.68rem] font-semibold text-slate-600">
                        {roleStatusLabel(role.status)}
                      </span>
                    </div>
                  ))}
                </div>

                <dl className="grid border-t border-slate-100 sm:grid-cols-2">
                  <div className="p-5 sm:p-6">
                    <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.11em] text-slate-500">
                      <BriefcaseBusiness
                        className="h-3.5 w-3.5 text-brand"
                        aria-hidden="true"
                      />
                      Challenge partner
                    </dt>
                    <dd className="mt-3 text-sm font-semibold leading-6 text-ink">
                      {team.challengePartnerName ??
                        team.challengePartnerStatusLabel}
                    </dd>
                  </div>
                  <div className="border-t border-slate-100 p-5 sm:border-l sm:border-t-0 sm:p-6">
                    <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.11em] text-slate-500">
                      <CheckCircle2
                        className="h-3.5 w-3.5 text-brand"
                        aria-hidden="true"
                      />
                      Solusi
                    </dt>
                    <dd className="mt-3 text-sm font-semibold leading-6 text-ink">
                      {team.solutionName ?? team.solutionStatusLabel}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-[74rem] gap-8 rounded-[2rem] border border-brand-100 bg-brand-50 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Jejak pelaksanaan
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl">
              Hasil tim baru terlihat setelah implementasi dan verifikasi.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Dokumentasi publik akan mengikuti persetujuan, konteks, dan
              status pelaksanaan yang tersedia.
            </p>
          </div>
          <Link
            href={event.routes.documentation}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Lihat dokumentasi
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
