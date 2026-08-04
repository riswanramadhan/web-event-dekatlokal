import {
  ArrowRight,
  CheckCircle,
  Community,
  Database,
  GraduationCap,
  Group,
  HomeSimple,
  Page,
  Quote,
  Server,
  Shop,
} from "iconoir-react";
import Image from "next/image";
import Link from "next/link";

import {
  partners,
  partnershipCategories,
  partnershipDocumentation,
  partnershipDocuments,
  partnershipHeader,
  partnershipLeadershipReflection,
  partnershipProgressDescription,
  partnershipReportOutputs,
  partnershipSummary,
  partnershipTimeline,
  partnershipValueItems,
  programTargets,
  type Partner,
  type PartnerStatus,
  type PartnershipDocument,
} from "@/data/partnership-collaboration";

import { MediaLightbox } from "./media-lightbox";
import { AdjacentProgressNavigation } from "./progress-navigation";
import {
  LeadershipReflectionCard,
  PrintReportFooter,
  ProgressDescriptionCard,
  ProgressReportHeader,
  ProgressUrlCard,
  ReportOutputList,
  ReportPrintStyles,
} from "./progress-report";

const sectionClassName =
  "report-section scroll-mt-28 rounded-[1.5rem] border border-slate-200 bg-white px-5 py-6 shadow-[0_16px_42px_rgba(1,34,98,0.055)] sm:px-7 sm:py-8 lg:px-9";

const partnerStatusClassNames: Record<PartnerStatus, string> = {
  "program-support": "border-violet-200 bg-violet-50 text-violet-800",
  "mou-signed": "border-emerald-200 bg-emerald-50 text-emerald-800",
  "commitment-documented": "border-sky-200 bg-sky-50 text-sky-800",
  "academic-collaboration": "border-indigo-200 bg-indigo-50 text-indigo-800",
  "venue-confirmed": "border-amber-200 bg-amber-50 text-amber-800",
};

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-6 border-b border-slate-100 pb-5 sm:mb-7">
      <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-brand">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-2 text-balance text-2xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-3xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
          {description}
        </p>
      ) : null}
    </header>
  );
}

function PartnershipSummary() {
  const metrics = [
    {
      value: String(partnershipSummary.supportingInstitutions),
      label: "Supporting institutions",
    },
    {
      value: String(partnershipSummary.signedMous),
      label: "Signed MoUs",
    },
    {
      value: String(partnershipSummary.officialDigitalPartners),
      label: "Official digital partners",
    },
    {
      value: String(partnershipSummary.venueOptions),
      label: "Venue & creative spaces",
    },
    {
      value: formatRupiah(partnershipSummary.quantifiedInKindValue),
      label: "Quantified in-kind support",
    },
  ] as const;

  return (
    <section
      className={`${sectionClassName} border-brand-100 bg-brand-50/45`}
      aria-labelledby="partnership-intro-heading"
    >
      <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-brand">
        Week 2 partnership building
      </p>
      <h2
        id="partnership-intro-heading"
        className="mt-3 max-w-4xl text-balance text-2xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-3xl lg:text-4xl"
      >
        A meaningful project needs more than a good idea. It needs people and
        institutions willing to build it together.
      </h2>
      <div className="mt-5 max-w-4xl space-y-3 text-[0.94rem] leading-7 text-slate-700 sm:text-base sm:leading-8">
        <p>
          AI Co-Creation Lab Makassar berkembang melalui kolaborasi lintas
          lembaga, industri, kampus, ekosistem UMKM, dan komunitas.
        </p>
        <p>
          Setiap mitra membawa peran yang berbeda, mulai dari akses penerima
          manfaat, pembelajaran digital, infrastruktur sistem, sumber daya
          manusia, venue, publikasi, hingga ruang untuk mengembangkan program.
        </p>
      </div>

      <dl className="mt-7 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-brand-100 pt-6 sm:grid-cols-3 lg:grid-cols-5">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={index === metrics.length - 1 ? "col-span-2 sm:col-span-1" : ""}
          >
            <dt className="mt-1 text-xs font-semibold leading-5 text-slate-600 sm:text-sm">
              {metric.label}
            </dt>
            <dd
              className={`order-first font-semibold tracking-[-0.04em] text-brand ${
                index === metrics.length - 1
                  ? "text-xl sm:text-2xl"
                  : "text-3xl sm:text-4xl"
              }`}
            >
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 rounded-2xl border border-brand-200 bg-white p-5 text-base font-semibold leading-8 text-brand-900 sm:text-lg">
        Different roles. One shared commitment: making useful technology
        possible for local businesses.
      </p>
      <p className="mt-3 text-xs leading-6 text-slate-500">
        Nilai terkuantifikasi hanya menjumlahkan dukungan yang memiliki angka
        resmi di dokumen yang tersedia. Dukungan lain tidak dipaksakan menjadi
        nilai rupiah.
      </p>
    </section>
  );
}

function PartnershipEcosystem() {
  const categoryIcons = [
    Group,
    Shop,
    Server,
    GraduationCap,
    HomeSimple,
    Database,
    Community,
  ] as const;

  return (
    <section
      className={sectionClassName}
      aria-labelledby="partnership-ecosystem-heading"
    >
      <SectionHeading
        id="partnership-ecosystem-heading"
        eyebrow="Ecosystem"
        title="Our Partnership Ecosystem"
        description="Setiap kategori mengisi bagian berbeda dari proses co-creation. Target program ditampilkan sebagai target, bukan capaian aktual."
      />

      <div className="rounded-[1.25rem] border border-brand-100 bg-brand-50/45 p-4 sm:p-6">
        <div className="mx-auto max-w-xl rounded-2xl border border-brand bg-brand p-5 text-center text-white shadow-[0_14px_34px_rgba(2,85,245,0.2)]">
          <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/70">
            Shared center
          </p>
          <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
            AI Co-Creation Lab Makassar
          </h3>
        </div>

        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {partnershipCategories.map((category, index) => {
            const Icon = categoryIcons[index];

            return (
              <li
                key={category}
                className="flex min-h-20 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-ink"
              >
                <Icon
                  className="h-5 w-5 shrink-0 text-brand"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                {category}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-5">
        <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
          Current program targets
        </p>
        <dl className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {programTargets.map((target) => (
            <div
              key={target.label}
              className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
            >
              <dt className="text-xs font-semibold leading-5 text-slate-600">
                {target.label}
              </dt>
              <dd className="mt-2 flex items-end justify-between gap-2">
                <span className="text-3xl font-semibold tracking-[-0.04em] text-brand">
                  {target.value}
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-2 py-1 font-mono text-[0.56rem] font-semibold uppercase tracking-[0.08em] text-slate-500">
                  {target.status}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function ProgramSupportEcosystem() {
  const programPartners = partners.filter(
    (partner) => partner.status === "program-support",
  );

  return (
    <section
      className={sectionClassName}
      aria-labelledby="program-support-heading"
    >
      <SectionHeading
        id="program-support-heading"
        eyebrow="Program support ecosystem"
        title="The Ecosystem That Made This Possible"
        description="BAKTI NUSA, GREAT Edunesia, dan Dompet Dhuafa ditampilkan sebagai ekosistem pendukung program, bukan sponsor komersial."
      />

      <div className="grid gap-3 md:grid-cols-3">
        {programPartners.map((partner) => (
          <article
            key={partner.id}
            className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5"
          >
            {partner.logo ? (
              <div className="flex min-h-24 items-center justify-center rounded-xl bg-white p-4">
                <Image
                  src={partner.logo.src}
                  alt={partner.logo.alt}
                  width={partner.logo.width}
                  height={partner.logo.height}
                  sizes="(max-width: 767px) calc(100vw - 5rem), 18rem"
                  className="max-h-16 w-auto max-w-full object-contain"
                />
              </div>
            ) : null}
            <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-ink">
              {partner.name}
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {partner.description[0]}
            </p>
          </article>
        ))}
      </div>

      <blockquote className="mt-5 rounded-2xl border border-violet-200 bg-violet-50/65 p-5 text-sm font-medium leading-7 text-violet-950 sm:text-base sm:leading-8">
        They did not only support an event. They created the space for young
        leaders to learn, test ideas, and turn leadership into impact.
      </blockquote>
    </section>
  );
}

function PartnerStatusBadge({ partner }: { partner: Partner }) {
  return (
    <span
      className={`inline-flex min-h-8 items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] ${partnerStatusClassNames[partner.status]}`}
    >
      <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
      {partner.statusLabel}
    </span>
  );
}

function PartnerStoryCard({ partner }: { partner: Partner }) {
  return (
    <article className="report-card overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white">
      <header className="grid gap-5 border-b border-slate-100 bg-slate-50/60 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-start">
        <div className="min-w-0">
          <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-brand">
            {partner.category}
          </p>
          <h3 className="mt-2 text-balance text-2xl font-semibold leading-tight tracking-[-0.035em] text-ink">
            {partner.name}
          </h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-brand-800">
            {partner.role}
          </p>
          <div className="mt-4">
            <PartnerStatusBadge partner={partner} />
          </div>
        </div>

        {partner.logo ? (
          <div className="flex h-24 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 lg:w-48">
            <Image
              src={partner.logo.src}
              alt={partner.logo.alt}
              width={partner.logo.width}
              height={partner.logo.height}
              sizes="12rem"
              className="max-h-16 w-auto max-w-full object-contain"
            />
          </div>
        ) : null}
      </header>

      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-3 text-sm leading-7 text-slate-700">
          {partner.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          {partner.representative ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                Representative in document
              </p>
              <p className="mt-2 font-semibold text-ink">
                {partner.representative.name}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600">
                {partner.representative.position}
              </p>
            </div>
          ) : null}

          {partner.inKindValue || partner.servicePeriod ? (
            <dl className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {partner.inKindValue ? (
                <div className="rounded-2xl border border-brand-100 bg-brand-50/50 p-4">
                  <dt className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-brand-700">
                    Quantified in-kind value
                  </dt>
                  <dd className="mt-2 text-lg font-semibold text-brand-900">
                    {formatRupiah(partner.inKindValue)}
                  </dd>
                </div>
              ) : null}
              {partner.servicePeriod ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                  <dt className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-slate-500">
                    Period or schedule
                  </dt>
                  <dd className="mt-2 text-sm font-semibold leading-6 text-ink">
                    {partner.servicePeriod}
                  </dd>
                </div>
              ) : null}
            </dl>
          ) : null}
        </div>

        <div>
          <h4 className="text-base font-semibold text-ink">
            Dukungan yang terdokumentasi
          </h4>
          <ul className="mt-3 space-y-2.5 text-sm leading-7 text-slate-700">
            {partner.contributions.map((contribution) => (
              <li key={contribution} className="flex items-start gap-2.5">
                <CheckCircle
                  className="mt-1.5 h-4 w-4 shrink-0 text-brand"
                  aria-hidden="true"
                />
                <span>{contribution}</span>
              </li>
            ))}
          </ul>

          <blockquote className="mt-5 border-l-2 border-brand pl-4 text-sm font-medium leading-7 text-brand-900 sm:text-base">
            {partner.keyImpact}
          </blockquote>
        </div>
      </div>
    </article>
  );
}

function PartnerStories() {
  const storyGroups = [
    {
      id: "umkm-ecosystem-partner",
      eyebrow: "UMKM ecosystem",
      title: "Connecting the Program to Real UMKM Needs",
      partnerIds: ["rumah-bumn-makassar"],
    },
    {
      id: "digital-infrastructure-partner",
      eyebrow: "Digital infrastructure",
      title: "Keeping Every Prototype Accessible Beyond the Event",
      partnerIds: ["inovasi-digital"],
    },
    {
      id: "digital-learning-partner",
      eyebrow: "Digital learning",
      title: "Supporting the People Behind the Technology",
      partnerIds: ["dicoding-indonesia"],
    },
    {
      id: "venue-partners",
      eyebrow: "Venue & creative space",
      title: "Spaces That Support Collaboration",
      partnerIds: ["komdigi-makassar", "makassar-creative-hub"],
    },
    {
      id: "academic-talent-partner",
      eyebrow: "Academic talent",
      title: "Academic Skills Meet Real-World Problems",
      partnerIds: ["informatika-unhas"],
    },
  ] as const;

  return (
    <>
      {storyGroups.map((group) => {
        const groupPartners = group.partnerIds
          .map((partnerId) =>
            partners.find((partner) => partner.id === partnerId),
          )
          .filter((partner): partner is Partner => Boolean(partner));

        return (
          <section
            key={group.id}
            className={sectionClassName}
            aria-labelledby={`${group.id}-heading`}
          >
            <SectionHeading
              id={`${group.id}-heading`}
              eyebrow={group.eyebrow}
              title={group.title}
            />
            <div className="space-y-4">
              {groupPartners.map((partner) => (
                <PartnerStoryCard key={partner.id} partner={partner} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}

function PartnershipValueSummary() {
  return (
    <section
      className={sectionClassName}
      aria-labelledby="partnership-value-heading"
    >
      <SectionHeading
        id="partnership-value-heading"
        eyebrow="Shared value"
        title="What These Partnerships Unlock"
      />
      <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        {partnershipValueItems.map((item, index) => (
          <article key={item.title} className="border-t border-slate-200 pt-4">
            <span className="font-mono text-xs font-semibold text-brand">
              0{index + 1}
            </span>
            <h3 className="mt-2 text-lg font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {item.description}
            </p>
          </article>
        ))}
      </div>
      <blockquote className="relative mt-7 overflow-hidden rounded-2xl border border-brand-200 bg-brand-50/55 p-5 text-lg font-semibold leading-8 tracking-[-0.02em] text-brand-900 sm:p-7 sm:text-xl">
        <Quote
          className="absolute right-4 top-4 h-10 w-10 text-brand-100"
          aria-hidden="true"
        />
        <p className="relative max-w-3xl pr-8">
          The partnerships do not only help us run the event. They help the
          solutions survive beyond it.
        </p>
      </blockquote>
    </section>
  );
}

function PartnershipJourney() {
  return (
    <section
      className={sectionClassName}
      aria-labelledby="partnership-journey-heading"
    >
      <SectionHeading
        id="partnership-journey-heading"
        eyebrow="Timeline"
        title="Partnership Journey"
        description="Tanggal hanya ditampilkan ketika tersedia pada MoU, surat, atau dokumentasi yang ditemukan."
      />
      <ol className="relative space-y-0 before:absolute before:bottom-4 before:left-[0.68rem] before:top-4 before:w-px before:bg-brand-100 sm:before:left-[0.8rem]">
        {partnershipTimeline.map((milestone, index) => {
          const milestoneDate =
            "date" in milestone ? milestone.date : undefined;

          return (
            <li
              key={`${milestone.title}-${milestoneDate ?? "ongoing"}`}
              className="relative grid grid-cols-[1.4rem_1fr] gap-3 pb-6 last:pb-0 sm:grid-cols-[1.65rem_1fr] sm:gap-4"
            >
              <span className="relative z-10 mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border-4 border-white bg-brand font-mono text-[0.45rem] font-semibold text-white sm:h-7 sm:w-7">
                {index + 1}
              </span>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/55 p-4 sm:p-5">
                {milestoneDate ? (
                  <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-brand">
                    {milestoneDate}
                  </p>
                ) : (
                  <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                    Tanpa tanggal publik
                  </p>
                )}
                <h3 className="mt-1.5 text-base font-semibold leading-6 text-ink">
                  {milestone.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {milestone.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function PartnershipDocumentationGallery() {
  const categoryLabels = {
    "partner-meeting": "Partner meeting",
    "global-communication": "Global communication",
  } as const;

  return (
    <section
      className={sectionClassName}
      aria-labelledby="partnership-documentation-heading"
    >
      <SectionHeading
        id="partnership-documentation-heading"
        eyebrow="Documentation"
        title="Partnership Documentation"
        description="Pertemuan, komitmen, dan publikasi kolaborasi. Klik gambar untuk membuka pop up tanpa meninggalkan halaman."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {partnershipDocumentation.map((item) => (
          <figure
            key={item.id}
            className="report-card overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <MediaLightbox
              title={item.title}
              items={item.images}
              showInlineNavigation={item.images.length > 1}
              triggerClassName="relative block w-full overflow-hidden bg-slate-100"
              imageClassName="aspect-[4/5] h-auto w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 767px) calc(100vw - 2.5rem), 50vw"
            />
            <figcaption className="p-4 sm:p-5">
              <p className="font-mono text-[0.61rem] font-semibold uppercase tracking-[0.1em] text-brand">
                {categoryLabels[item.category as keyof typeof categoryLabels]}
                {item.date ? ` · ${item.date}` : ""}
              </p>
              <h3 className="mt-1.5 text-base font-semibold leading-6 text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.caption}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function DocumentCard({ document }: { document: PartnershipDocument }) {
  return (
    <article className="report-card overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <MediaLightbox
        title={document.title}
        items={document.pages}
        mode="document"
        downloadUrl={document.documentUrl}
        downloadLabel="Unduh PDF versi publik"
        triggerLabel={`Buka pratinjau ${document.title} dalam pop up`}
        triggerClassName="relative block w-full overflow-hidden border-b border-slate-200 bg-slate-100"
        imageClassName="aspect-[4/3] h-auto w-full object-cover object-top transition duration-300 group-hover:scale-[1.01]"
        sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1023px) 50vw, 33vw"
      />
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-slate-600">
            <Page className="h-3.5 w-3.5" aria-hidden="true" />
            {document.format} · {document.pages.length} halaman
          </span>
          <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-brand">
            {document.date}
          </span>
        </div>
        <h3 className="mt-3 text-base font-semibold leading-6 text-ink">
          {document.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {document.description}
        </p>
        <p className="mt-3 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500">
          {document.privacyNote}
        </p>
      </div>
    </article>
  );
}

function PartnershipEvidence() {
  return (
    <section
      className={sectionClassName}
      aria-labelledby="partnership-evidence-heading"
    >
      <SectionHeading
        id="partnership-evidence-heading"
        eyebrow="Supporting documents"
        title="Partnership Evidence"
        description="PDF diubah menjadi pratinjau WebP agar seluruh halaman dapat discroll di dalam pop up. Opsi unduh PDF versi publik tetap tersedia pada bagian atas pop up."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {partnershipDocuments.map((document) => (
          <DocumentCard key={document.id} document={document} />
        ))}
      </div>
    </section>
  );
}

function OngoingOutreach() {
  const statuses = [
    "Confirmed Partners",
    "Ongoing Outreach",
    "Community Support Open",
  ] as const;

  return (
    <section
      className={sectionClassName}
      aria-labelledby="ongoing-outreach-heading"
    >
      <SectionHeading
        id="ongoing-outreach-heading"
        eyebrow="Ongoing"
        title="Still Building the Network"
      />
      <div className="max-w-4xl space-y-3 text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
        <p>Proses penjajakan partnership dan sponsorship masih berjalan.</p>
        <p>
          Kami terus membuka ruang kolaborasi bagi brand, komunitas, lembaga,
          dan individu yang ingin mendukung kebutuhan bootcamp, participant
          experience, konsumsi, dokumentasi, merchandise, publikasi, atau
          keberlanjutan prototype.
        </p>
      </div>
      <ul className="mt-5 flex flex-wrap gap-2">
        {statuses.map((status) => (
          <li
            key={status}
            className="inline-flex min-h-9 items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3.5 text-xs font-semibold text-brand-800"
          >
            <CheckCircle className="h-4 w-4" aria-hidden="true" />
            {status}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CommunitySupportCallToAction() {
  return (
    <section
      className="report-section scroll-mt-28 overflow-hidden rounded-[1.5rem] border border-brand bg-brand px-5 py-7 text-white shadow-[0_18px_46px_rgba(2,85,245,0.2)] sm:px-8 sm:py-9 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10"
      aria-labelledby="community-support-heading"
    >
      <div className="max-w-3xl">
        <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-brand-100">
          Community support
        </p>
        <h2
          id="community-support-heading"
          className="mt-3 text-balance text-2xl font-semibold tracking-[-0.035em] sm:text-3xl"
        >
          Want to Be Part of the Journey?
        </h2>
        <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
          Selain membangun institutional partnerships, kami juga membuka
          Community Support bagi siapa pun yang ingin ikut membantu pelaksanaan
          AI Co-Creation Lab Makassar. Dukungan dapat berupa dana, produk,
          kebutuhan kegiatan, sharing informasi, atau koneksi kepada partner
          yang relevan.
        </p>
        <p className="mt-4 text-sm font-semibold text-white">
          Small support. Real collaboration. Useful impact.
        </p>
      </div>
      <Link
        href="/community-support"
        className="report-no-print mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-brand transition hover:-translate-y-0.5 hover:bg-brand-50 lg:mt-0 lg:w-auto"
      >
        Support the Program
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}

export function PartnershipCollaborationReportPage() {
  return (
    <article className="progress-report relative isolate overflow-hidden bg-[#f8fbff]">
      <ReportPrintStyles />
      <ProgressReportHeader report={partnershipHeader} />

      <div className="progress-report-content page-container relative py-10 sm:py-14 lg:py-16">
        <div
          className="progress-report-decoration dot-grid pointer-events-none absolute inset-y-0 left-0 w-40 opacity-20"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl space-y-5 sm:space-y-6">
          <PartnershipSummary />
          <PartnershipEcosystem />
          <ProgramSupportEcosystem />
          <PartnerStories />
          <PartnershipValueSummary />
          <PartnershipJourney />
          <PartnershipDocumentationGallery />
          <PartnershipEvidence />
          <OngoingOutreach />
          <CommunitySupportCallToAction />
          <LeadershipReflectionCard
            reflection={partnershipLeadershipReflection}
          />
          <ReportOutputList outputs={partnershipReportOutputs} />
          <ProgressDescriptionCard description={partnershipProgressDescription} />
          <ProgressUrlCard url={partnershipHeader.progressUrl} />
          <AdjacentProgressNavigation currentSlug={partnershipHeader.slug} />
          <PrintReportFooter
            progressUrl={partnershipHeader.progressUrl}
            updatedAt={partnershipHeader.updatedAt}
            updatedAtIso={partnershipHeader.updatedAtIso}
          />
        </div>
      </div>
    </article>
  );
}
