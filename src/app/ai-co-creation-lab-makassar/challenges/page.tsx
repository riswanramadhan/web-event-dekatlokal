import type { Metadata } from "next";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  FileSearch,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import { EventPageHero } from "@/components/event/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { EventStatusBadge } from "@/components/ui/status-badge";
import { challenges, type Challenge } from "@/data/challenges";
import { aiCoCreationLabEvent as event } from "@/data/events";

const pageDescription =
  "Empat contoh area challenge AI Co-Creation Lab Makassar yang masih menunggu validasi dan penetapan bersama UMKM terpilih.";

export const metadata: Metadata = {
  title: `Challenges — ${event.title}`,
  description: pageDescription,
  alternates: {
    canonical: event.routes.challenges,
  },
  openGraph: {
    title: `Challenges | ${event.title}`,
    description: pageDescription,
    url: event.routes.challenges,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `Challenges ${event.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Challenges | ${event.title}`,
    description: pageDescription,
    images: ["/opengraph-image"],
  },
};

function challengeStatusTone(
  status: Challenge["status"],
): "amber" | "blue" | "green" | "neutral" {
  if (status === "completed") return "green";
  if (status === "in_progress") return "blue";
  if (status === "confirmed") return "green";
  return "amber";
}

export default function ChallengesPage() {
  return (
    <>
      <EventPageHero
        eyebrow="Challenge lab"
        title="Empat ruang masalah, belum empat penugasan final."
        description={pageDescription}
        status="4 slot dalam validasi"
        actions={
          <>
            <a
              href="#challenge-slots"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(2,85,245,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-600"
            >
              Tinjau empat slot
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href={event.routes.teams}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-6 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand-50"
            >
              Lihat struktur tim
            </Link>
          </>
        }
      />

      <section className="section-space bg-white">
        <div className="page-container">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.8fr]">
            <SectionHeading
              eyebrow="Cara membaca halaman"
              title={
                <>
                  Challenge berangkat dari{" "}
                  <span className="text-brand">kebutuhan yang divalidasi.</span>
                </>
              }
              description="Judul dan kemungkinan output di bawah adalah hipotesis kerja. Masalah final baru ditetapkan setelah percakapan dengan UMKM terpilih."
            />
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950 lg:justify-self-end">
              <p className="font-semibold">Status saat ini</p>
              <p className="mt-1 text-amber-900">
                Belum ada nama UMKM, assignment tim, atau solusi final yang
                diumumkan pada halaman ini.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: FileSearch,
                title: "Validasi lebih dulu",
                description:
                  "Tim memahami alur kerja, hambatan, perangkat, dan batas data sebelum menyusun solusi.",
              },
              {
                icon: ShieldCheck,
                title: "Data sensitif tidak digunakan",
                description:
                  "Contoh dan pengujian tidak boleh memuat identitas pelanggan, transaksi rahasia, atau kredensial usaha.",
              },
              {
                icon: Bot,
                title: "Output tetap sederhana",
                description:
                  "Sasaran kegiatan adalah workflow atau prototype yang relevan, dapat diuji, dan mudah digunakan kembali.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-surface p-6"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-brand shadow-sm">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-[-0.025em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="challenge-slots"
        aria-labelledby="challenge-slots-title"
        className="section-space border-y border-slate-200 bg-surface"
      >
        <div className="page-container">
          <SectionHeading
            id="challenge-slots-title"
            eyebrow="Empat slot challenge"
            title={
              <>
                Contoh area awal untuk{" "}
                <span className="text-brand">proses co-creation.</span>
              </>
            }
            description="Setiap kartu membedakan indikasi masalah, kemungkinan output, status partner, dan status solusi agar contoh tidak terbaca sebagai hasil yang sudah terjadi."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {challenges.map((challenge) => (
              <article
                key={challenge.id}
                className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(1,34,98,0.07)]"
              >
                <div className="border-b border-slate-100 p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-sm font-semibold tracking-[0.12em] text-brand">
                      CHALLENGE {String(challenge.slot).padStart(2, "0")}
                    </span>
                    <EventStatusBadge
                      tone={challengeStatusTone(challenge.status)}
                    >
                      {challenge.statusLabel}
                    </EventStatusBadge>
                  </div>

                  <h2 className="mt-6 text-2xl font-semibold leading-tight tracking-[-0.04em] text-ink sm:text-3xl">
                    {challenge.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {challenge.description}
                  </p>
                  <div className="mt-5">
                    <EventStatusBadge tone="neutral">
                      {challenge.assignmentLabel}
                    </EventStatusBadge>
                  </div>
                </div>

                <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <Lightbulb
                        className="h-4 w-4 text-brand"
                        aria-hidden="true"
                      />
                      <h3 className="text-sm font-semibold text-ink">
                        Indikasi masalah
                      </h3>
                    </div>
                    <ul className="mt-4 space-y-3">
                      {challenge.problemIndicators.map((indicator) => (
                        <li
                          key={indicator}
                          className="flex gap-2.5 text-sm leading-6 text-slate-600"
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                            aria-hidden="true"
                          />
                          {indicator}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className="h-4 w-4 text-brand"
                        aria-hidden="true"
                      />
                      <h3 className="text-sm font-semibold text-ink">
                        Kemungkinan output
                      </h3>
                    </div>
                    <ul className="mt-4 space-y-3">
                      {challenge.possibleOutputs.map((output) => (
                        <li
                          key={output}
                          className="flex gap-2.5 text-sm leading-6 text-slate-600"
                        >
                          <CheckCircle2
                            className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-300"
                            aria-hidden="true"
                          />
                          {output}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <dl className="grid border-t border-slate-100 bg-slate-50 sm:grid-cols-2">
                  <div className="p-5 sm:p-6">
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Challenge partner
                    </dt>
                    <dd className="mt-2 text-sm font-semibold leading-6 text-ink">
                      {challenge.partnerDisplayName}
                    </dd>
                  </div>
                  <div className="border-t border-slate-200 p-5 sm:border-l sm:border-t-0 sm:p-6">
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      Status solusi
                    </dt>
                    <dd className="mt-2 text-sm font-semibold leading-6 text-ink">
                      {challenge.solutionStatusLabel}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-[74rem] gap-8 rounded-[2rem] bg-brand px-6 py-10 text-white sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-100">
              Langkah berikutnya
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
              Assignment mengikuti hasil validasi, bukan judul contoh.
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/75">
              Struktur empat tim sudah disiapkan tanpa mempublikasikan data
              pribadi peserta.
            </p>
          </div>
          <Link
            href={event.routes.teams}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-brand transition hover:bg-brand-50"
          >
            Buka halaman tim
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
