import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ExternalLink,
  Eye,
  FileSearch,
  FolderOpen,
  MonitorCheck,
  Presentation,
  ShieldCheck,
  UsersRound,
  Workflow,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { EventPageHero } from "@/components/event/page-hero";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { EventStatusBadge } from "@/components/ui/status-badge";
import {
  documentationCategories,
  documentationSummary,
  type DocumentationCategory,
  type DocumentationCategoryId,
  type DocumentationStatus,
} from "@/data/documentation";
import { aiCoCreationLabEvent as event } from "@/data/events";

const pageDescription =
  "Ruang dokumentasi AI Co-Creation Lab Makassar untuk audiensi, persiapan, implementasi, demo, dan monitoring dengan status publikasi yang transparan.";

export const metadata: Metadata = {
  title: `Dokumentasi — ${event.title}`,
  description: pageDescription,
  alternates: {
    canonical: event.routes.documentation,
  },
  openGraph: {
    title: `Dokumentasi | ${event.title}`,
    description: pageDescription,
    url: event.routes.documentation,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `Dokumentasi ${event.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Dokumentasi | ${event.title}`,
    description: pageDescription,
    images: ["/opengraph-image"],
  },
};

const categoryIcons: Record<DocumentationCategoryId, LucideIcon> = {
  audience: UsersRound,
  preparation: FileSearch,
  implementation: Workflow,
  demo: Presentation,
  monitoring: MonitorCheck,
};

function documentationStatusTone(
  status: DocumentationStatus,
): "neutral" | "amber" | "green" {
  if (status === "published") return "green";
  if (status === "draft") return "amber";
  return "neutral";
}

export default function DocumentationPage() {
  const categories: readonly DocumentationCategory[] =
    documentationCategories;
  const publicItems = categories
    .flatMap((category) => category.items)
    .filter((item) => item.published);

  return (
    <>
      <EventPageHero
        eyebrow="Documentation hub"
        title="Bukti proses akan hadir dengan konteks dan izin yang jelas."
        description={pageDescription}
        status={documentationSummary.statusLabel}
        actions={
          <>
            <a
              href="#documentation-categories"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(2,85,245,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-600"
            >
              Lihat kategori
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href={event.routes.journey}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-200 bg-white px-6 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand-50"
            >
              Buka project journey
            </Link>
          </>
        }
      />

      <section className="section-space bg-white">
        <div className="page-container">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <SectionHeading
              eyebrow="Status dokumentasi"
              title={
                <>
                  Belum tersedia bukan berarti{" "}
                  <span className="text-brand">sudah terjadi.</span>
                </>
              }
              description={documentationSummary.description}
            />

            <dl className="grid grid-cols-2 gap-3">
              <div className="rounded-3xl border border-brand-100 bg-brand-50 p-5">
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">
                  Kategori
                </dt>
                <dd className="mt-2 font-mono text-3xl font-semibold text-brand-900">
                  {categories.length}
                </dd>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Aset publik
                </dt>
                <dd className="mt-2 font-mono text-3xl font-semibold text-ink">
                  {publicItems.length}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: FileSearch,
                title: "Konteks diperiksa",
                description:
                  "Caption menjelaskan aktivitas, waktu, dan relevansi bukti tanpa membuat klaim di luar data.",
              },
              {
                icon: ShieldCheck,
                title: "Izin dikonfirmasi",
                description:
                  "Wajah, kutipan, dan identitas hanya dipublikasikan setelah hak penggunaan aset jelas.",
              },
              {
                icon: Eye,
                title: "Data sensitif disaring",
                description:
                  "Dokumen publik tidak membuka kontak, data pelanggan, kredensial, atau informasi usaha rahasia.",
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
                  <h3 className="mt-5 text-lg font-semibold text-ink">
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
        id="documentation-categories"
        aria-labelledby="documentation-categories-title"
        className="section-space border-y border-slate-200 bg-surface"
      >
        <div className="page-container">
          <SectionHeading
            id="documentation-categories-title"
            eyebrow="Lima kategori"
            title={
              <>
                Jejak dari audiensi hingga{" "}
                <span className="text-brand">monitoring.</span>
              </>
            }
            description="Setiap kategori memiliki status dan empty state sendiri. Tautan Drive atau publikasi hanya muncul ketika sudah tersedia pada konfigurasi."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {categories.map((category, index) => {
              const Icon = categoryIcons[category.id];

              return (
                <article
                  key={category.id}
                  className={`overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(1,34,98,0.07)] ${
                    index === categories.length - 1
                      ? "lg:col-span-2"
                      : ""
                  }`}
                >
                  <div className="relative isolate min-h-40 overflow-hidden bg-brand px-6 py-7 text-white sm:px-8">
                    <div
                      className="hero-grid absolute inset-0 opacity-50"
                      aria-hidden="true"
                    />
                    <span
                      className="absolute -bottom-8 -right-2 font-mono text-[7rem] font-semibold tracking-[-0.1em] text-white/10"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="relative flex items-start justify-between gap-5">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-brand">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <EventStatusBadge
                        tone={documentationStatusTone(category.status)}
                      >
                        {category.statusLabel}
                      </EventStatusBadge>
                    </div>
                    <p className="relative mt-7 text-xs font-semibold uppercase tracking-[0.15em] text-brand-100">
                      Ruang dokumentasi
                    </p>
                    <h2 className="relative mt-2 text-2xl font-semibold tracking-[-0.035em]">
                      {category.label}
                    </h2>
                  </div>

                  <div className="p-6 sm:p-8">
                    <p className="text-sm leading-7 text-slate-600">
                      {category.description}
                    </p>

                    {category.items.length === 0 ? (
                      <div className="mt-6">
                        <EmptyState
                          title={`${category.label} belum dipublikasikan`}
                          description={category.emptyState}
                        />
                      </div>
                    ) : (
                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {category.items.map((item) => {
                          const localThumbnail =
                            item.thumbnailUrl?.startsWith("/") === true
                              ? item.thumbnailUrl
                              : null;

                          return (
                            <article
                              key={item.id}
                              className="overflow-hidden rounded-2xl border border-slate-200"
                            >
                              <div className="relative aspect-[16/10] bg-brand-50">
                                {localThumbnail ? (
                                  <Image
                                    src={localThumbnail}
                                    alt={
                                      item.alt ??
                                      `Dokumentasi ${item.title}`
                                    }
                                    fill
                                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="grid h-full place-items-center text-brand">
                                    <Camera
                                      className="h-7 w-7"
                                      aria-hidden="true"
                                    />
                                    <span className="sr-only">
                                      Pratinjau belum tersedia
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="p-4">
                                <h3 className="text-sm font-semibold text-ink">
                                  {item.title}
                                </h3>
                                <p className="mt-2 text-xs leading-6 text-slate-600">
                                  {item.caption}
                                </p>
                                {item.publicationUrl ? (
                                  <a
                                    href={item.publicationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-3 inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-brand"
                                  >
                                    Buka publikasi
                                    <ExternalLink
                                      className="h-3.5 w-3.5"
                                      aria-hidden="true"
                                    />
                                  </a>
                                ) : null}
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    )}

                    {category.driveUrl || category.publicationUrl ? (
                      <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                        {category.driveUrl ? (
                          <a
                            href={category.driveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-200 px-4 text-xs font-semibold text-brand hover:bg-brand-50"
                          >
                            <FolderOpen
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
                            Buka folder bukti
                          </a>
                        ) : null}
                        {category.publicationUrl ? (
                          <a
                            href={category.publicationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brand px-4 text-xs font-semibold text-white hover:bg-brand-600"
                          >
                            <ExternalLink
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
                            Buka publikasi
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-[74rem] gap-8 rounded-[2rem] border border-brand-100 bg-brand-50 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-brand">
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                Pelaporan berikutnya
              </p>
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-ink sm:text-3xl">
              Dokumentasi mendukung laporan, tetapi bukan pengganti pengukuran.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Target, hasil aktual, metode, dan status pengukuran tersedia pada
              halaman dampak.
            </p>
          </div>
          <Link
            href={event.routes.impact}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Buka halaman dampak
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
