import {
  ArrowRight,
  CheckCircle,
  Circle,
  Download,
  GraduationCap,
  Group,
  Instagram,
  OpenInBrowser,
  Page,
  Quote,
  Shop,
  VideoCamera,
} from "iconoir-react";

import {
  problemValidationHeader,
  problemValidationProgressDescription,
  stillToTestItems,
  studentAiTransition,
  studentSharedFindings,
  studentStakeholders,
  supportingDocuments,
  umkmStakeholders,
  validatedItems,
  validationApproach,
  validationDocumentation,
  validationFindings,
  validationMetrics,
  type DocumentationItem,
  type UmkmStakeholder,
} from "@/data/problem-validation";

import { AdjacentProgressNavigation } from "./progress-navigation";
import { MediaLightbox } from "./media-lightbox";
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

function ValidationSummary() {
  return (
    <section
      className={`${sectionClassName} border-brand-100 bg-brand-50/45`}
      aria-labelledby="validation-intro-heading"
    >
      <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-brand">
        Week 2 fieldwork
      </p>
      <h2
        id="validation-intro-heading"
        className="mt-3 max-w-4xl text-balance text-2xl font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-3xl lg:text-4xl"
      >
        Before building the solution, we listened to the people who would
        actually use it.
      </h2>
      <div className="mt-5 max-w-4xl space-y-3 text-[0.94rem] leading-7 text-slate-700 sm:text-base sm:leading-8">
        <p>
          Pada Week 2, kami melakukan wawancara dan konsultasi langsung bersama
          lima UMKM penerima manfaat serta tiga mahasiswa calon co-creator.
        </p>
        <p>
          Tujuannya sederhana: memastikan solusi yang akan dibangun berangkat
          dari real problems, real workflows, and real user needs.
        </p>
      </div>

      <dl className="mt-7 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-brand-100 pt-6 lg:grid-cols-4">
        {validationMetrics.map((metric) => (
          <div key={metric.label} className="flex min-w-0 flex-col">
            <dt className="order-2 mt-1 text-xs font-semibold leading-5 text-slate-600 sm:text-sm">
              {metric.label}
            </dt>
            <dd className="text-3xl font-semibold tracking-[-0.045em] text-brand sm:text-4xl">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function ValidationApproach() {
  return (
    <section
      className={sectionClassName}
      aria-labelledby="validation-approach-heading"
    >
      <SectionHeading
        id="validation-approach-heading"
        eyebrow="Method"
        title="How We Validated the Problems"
      />
      <ol className="grid gap-3 sm:grid-cols-2">
        {validationApproach.map((step, index) => (
          <li
            key={step.title}
            className="report-card rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand font-mono text-xs font-semibold text-white">
                {index + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <blockquote className="mt-5 rounded-2xl border border-brand-100 bg-brand-50/60 p-5 text-sm font-medium leading-7 text-brand-900 sm:text-base sm:leading-8">
        The goal was not to validate our features. The goal was to validate the
        problems, workflows, and desired outcomes.
      </blockquote>
    </section>
  );
}

function StakeholderOverview() {
  const groups = [
    {
      title: "UMKM Beneficiaries",
      value: "5",
      description:
        "Owner usaha dengan workflow dan kebutuhan operasional yang berbeda.",
      Icon: Shop,
    },
    {
      title: "Student Co-Creators",
      value: "3",
      description:
        "Mahasiswa lintas program studi yang telah menggunakan AI dalam keseharian.",
      Icon: GraduationCap,
    },
  ] as const;

  return (
    <section
      className={sectionClassName}
      aria-labelledby="stakeholder-overview-heading"
    >
      <SectionHeading
        id="stakeholder-overview-heading"
        eyebrow="Stakeholders"
        title="Who We Talked To"
        description="Dua kelompok ini memberi sudut pandang yang saling melengkapi: pengalaman menjalankan usaha dan pengalaman menggunakan AI."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {groups.map(({ title, value, description, Icon }) => (
          <article
            key={title}
            className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <Icon
                className="h-6 w-6 text-brand"
                strokeWidth={1.7}
                aria-hidden="true"
              />
              <span className="font-mono text-3xl font-semibold text-brand">
                {value}
              </span>
            </div>
            <h3 className="mt-5 text-xl font-semibold tracking-[-0.025em] text-ink">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function UmkmProfileCard({
  stakeholder,
  index,
}: {
  stakeholder: UmkmStakeholder;
  index: number;
}) {
  const details = [
    { label: "Current workflow", value: stakeholder.currentWorkflow },
    { label: "Pain point", value: stakeholder.painPoint },
    ...(stakeholder.previousAttempt
      ? [{ label: "Previous attempt", value: stakeholder.previousAttempt }]
      : []),
    { label: "Priority need", value: stakeholder.priorityNeed },
    ...(stakeholder.additionalOpportunity
      ? [
          {
            label: "Additional opportunity",
            value: stakeholder.additionalOpportunity,
          },
        ]
      : []),
    ...(stakeholder.solutionHypothesis
      ? [
          {
            label: "Solution hypothesis",
            value: stakeholder.solutionHypothesis,
          },
        ]
      : []),
  ];

  return (
    <article
      id={stakeholder.id}
      className="report-card scroll-mt-28 overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white"
    >
      <header className="grid gap-4 border-b border-slate-100 bg-slate-50/65 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand font-mono text-xs font-semibold text-white">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <h3 className="text-xl font-semibold tracking-[-0.025em] text-ink sm:text-2xl">
            {stakeholder.businessName}
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            {stakeholder.interviewee} · {stakeholder.role}
          </p>
        </div>
        <a
          href={stakeholder.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Buka Instagram ${stakeholder.businessName}`}
          className="inline-flex min-h-11 w-fit max-w-full items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 text-xs font-semibold text-brand transition hover:border-brand hover:bg-brand-50"
        >
          <Instagram className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{stakeholder.instagram}</span>
        </a>
      </header>

      <dl className="grid gap-px bg-slate-200 sm:grid-cols-2">
        {details.map((detail) => (
          <div key={detail.label} className="bg-white p-5 sm:p-6">
            <dt className="font-mono text-[0.63rem] font-semibold uppercase tracking-[0.11em] text-brand">
              {detail.label}
            </dt>
            <dd className="mt-2 text-sm leading-7 text-slate-700">
              {detail.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="border-t border-brand-100 bg-brand-50/55 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[0.63rem] font-semibold uppercase tracking-[0.11em] text-brand">
            Key insight
          </p>
          <span className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[0.68rem] font-semibold leading-5 text-emerald-800">
            <CheckCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {stakeholder.validationStatus}
          </span>
        </div>
        <blockquote className="mt-3 text-sm font-medium leading-7 text-brand-900 sm:text-base sm:leading-8">
          “{stakeholder.keyInsight}”
        </blockquote>
        {stakeholder.documentation ? (
          <a
            href={`#${stakeholder.documentation}`}
            className="report-no-print mt-4 inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-semibold text-brand underline decoration-brand-200 decoration-2 underline-offset-4 transition hover:decoration-brand"
          >
            Lihat foto dokumentasi
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </article>
  );
}

function UmkmProfiles() {
  return (
    <section
      className={sectionClassName}
      aria-labelledby="umkm-interviews-heading"
    >
      <SectionHeading
        id="umkm-interviews-heading"
        eyebrow="UMKM interviews"
        title="Five Different Workflows, Five Real Problems"
        description="Berdasarkan wawancara terhadap lima UMKM penerima manfaat, kebutuhan digitalnya berbeda. Namun, semuanya meminta alur yang lebih sederhana dan dekat dengan pekerjaan sehari-hari."
      />
      <div className="space-y-4 sm:space-y-5">
        {umkmStakeholders.map((stakeholder, index) => (
          <UmkmProfileCard
            key={stakeholder.id}
            stakeholder={stakeholder}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

function StudentProfiles() {
  return (
    <section
      className={sectionClassName}
      aria-labelledby="student-interviews-heading"
    >
      <SectionHeading
        id="student-interviews-heading"
        eyebrow="Student interviews"
        title="How Students Currently Use AI"
      />

      <div className="grid gap-3 md:grid-cols-3">
        {studentStakeholders.map((student, index) => (
          <article
            key={student.id}
            className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <GraduationCap
                className="h-5 w-5 text-brand"
                strokeWidth={1.7}
                aria-hidden="true"
              />
              <span className="font-mono text-xs font-semibold text-brand">
                0{index + 1}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-semibold leading-7 tracking-[-0.02em] text-ink">
              {student.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {student.program}
              <br />
              {student.university}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 lg:grid-cols-[1fr_0.9fr] lg:p-6">
        <div>
          <h3 className="text-lg font-semibold text-ink">Shared findings</h3>
          <ul className="mt-4 space-y-2.5 text-sm leading-7 text-slate-700">
            {studentSharedFindings.map((finding) => (
              <li key={finding} className="flex items-start gap-2.5">
                <CheckCircle
                  className="mt-1.5 h-4 w-4 shrink-0 text-brand"
                  aria-hidden="true"
                />
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-5">
          <p className="font-mono text-[0.63rem] font-semibold uppercase tracking-[0.12em] text-brand">
            Learning transition
          </p>
          <ol className="mt-4 space-y-2">
            {studentAiTransition.map((step, index) => (
              <li key={step} className="flex items-center gap-3">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white font-mono text-[0.62rem] font-semibold text-brand shadow-sm">
                  {index + 1}
                </span>
                <span className="text-sm font-semibold text-brand-900">
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <blockquote className="mt-5 border-l-2 border-brand pl-4 text-sm font-medium leading-7 text-brand-900">
            They know how to use AI, but they have not fully learned how to use
            it for someone else.
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function CrossStakeholderFindings() {
  return (
    <section
      className={sectionClassName}
      aria-labelledby="validation-findings-heading"
    >
      <SectionHeading
        id="validation-findings-heading"
        eyebrow="Cross-stakeholder findings"
        title="What We Found"
      />
      <ol className="grid gap-3 sm:grid-cols-2">
        {validationFindings.map((finding, index) => (
          <li
            key={finding.title}
            className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5 sm:p-6"
          >
            <span className="font-mono text-xs font-semibold text-brand">
              0{index + 1}
            </span>
            <h3 className="mt-3 text-lg font-semibold leading-7 tracking-[-0.02em] text-ink">
              {finding.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {finding.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function DoubleGapVisual() {
  return (
    <section className={sectionClassName} aria-labelledby="double-gap-heading">
      <SectionHeading
        id="double-gap-heading"
        eyebrow="Opportunity"
        title="The Double Gap"
        description="Kebutuhan yang berbeda bertemu dalam satu proses co-creation."
      />
      <div className="grid items-stretch gap-3 lg:grid-cols-[1fr_0.72fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-5 sm:p-6">
          <Shop className="h-6 w-6 text-brand" aria-hidden="true" />
          <h3 className="mt-4 text-xl font-semibold text-ink">UMKM</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
            <li>Real problems</li>
            <li>Limited access to suitable tools</li>
            <li>Need simple and affordable systems</li>
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-brand bg-brand p-5 text-center text-white sm:p-6">
          <Group className="h-6 w-6" aria-hidden="true" />
          <p className="mt-3 text-sm font-semibold leading-6">
            AI Co-Creation Lab Makassar
          </p>
          <ArrowRight
            className="my-3 h-5 w-5 rotate-90 lg:rotate-0"
            aria-hidden="true"
          />
          <p className="text-xs leading-5 text-white/80">Build together</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-5 sm:p-6">
          <GraduationCap className="h-6 w-6 text-brand" aria-hidden="true" />
          <h3 className="mt-4 text-xl font-semibold text-ink">Students</h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
            <li>Familiar with AI</li>
            <li>Limited real-user experience</li>
            <li>Need meaningful problems to solve</li>
          </ul>
        </div>
      </div>
      <p className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center text-sm font-semibold leading-6 text-emerald-900 sm:text-base">
        Useful digital solutions built together
      </p>
    </section>
  );
}

function ValidationBoundary() {
  const columns = [
    {
      title: "Validated",
      items: validatedItems,
      Icon: CheckCircle,
      className: "border-emerald-200 bg-emerald-50/55",
      iconClassName: "text-emerald-700",
    },
    {
      title: "Still to Test",
      items: stillToTestItems,
      Icon: Circle,
      className: "border-amber-200 bg-amber-50/55",
      iconClassName: "text-amber-700",
    },
  ] as const;

  return (
    <section
      className={sectionClassName}
      aria-labelledby="validation-boundary-heading"
    >
      <SectionHeading
        id="validation-boundary-heading"
        eyebrow="Evidence boundary"
        title="What Is Validated and What Still Needs Testing"
      />
      <div className="grid gap-4 md:grid-cols-2">
        {columns.map(({ title, items, Icon, className, iconClassName }) => (
          <article
            key={title}
            className={`rounded-2xl border p-5 sm:p-6 ${className}`}
          >
            <h3 className="text-xl font-semibold text-ink">{title}</h3>
            <ul className="mt-4 space-y-2.5 text-sm leading-7 text-slate-700">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Icon
                    className={`mt-1.5 h-4 w-4 shrink-0 ${iconClassName}`}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="mt-5 rounded-2xl border border-brand-100 bg-brand-50/60 p-5 text-sm font-medium leading-7 text-brand-900 sm:text-base">
        Commitment to participate is validated. Long-term adoption will only
        be validated after prototype testing.
      </p>
    </section>
  );
}

function ValidationConclusion() {
  return (
    <section
      className={`${sectionClassName} border-brand-200 bg-brand-50/50`}
      aria-labelledby="validation-conclusion-heading"
    >
      <SectionHeading
        id="validation-conclusion-heading"
        eyebrow="Decision"
        title="Validation Conclusion"
      />
      <div className="max-w-4xl space-y-3 text-[0.94rem] leading-7 text-slate-700 sm:text-base sm:leading-8">
        <p>Hasil wawancara menunjukkan dua kebutuhan yang saling melengkapi.</p>
        <p>
          Lima UMKM memiliki masalah operasional nyata, tetapi belum menemukan
          sistem yang simple, affordable, mobile-friendly, dan sesuai workflow
          mereka.
        </p>
        <p>
          Di sisi lain, mahasiswa sudah terbiasa menggunakan AI, tetapi belum
          banyak memperoleh ruang untuk membangun bagi pengguna nyata dan
          mengukur dampaknya.
        </p>
        <p>
          Karena itu, AI Co-Creation Lab Makassar tervalidasi sebagai ruang
          kolaborasi yang mempertemukan real business problems dengan young
          people who are ready to explore, build, and learn directly from users.
        </p>
      </div>

      <blockquote className="relative mt-6 overflow-hidden rounded-2xl border border-brand-200 bg-white p-5 text-xl font-semibold leading-8 tracking-[-0.025em] text-brand-900 sm:p-7 sm:text-2xl sm:leading-9">
        <Quote
          className="absolute right-4 top-4 h-10 w-10 text-brand-100"
          aria-hidden="true"
        />
        <p className="relative max-w-3xl pr-6">
          UMKM don’t need more complicated tools.
          <br />
          Students don’t need more AI assignments.
          <br />
          They need a space to build something useful, together.
        </p>
      </blockquote>

      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold leading-7 text-emerald-900 sm:p-5 sm:text-base">
        <CheckCircle
          className="mt-1 h-5 w-5 shrink-0"
          strokeWidth={1.8}
          aria-hidden="true"
        />
        <p>
          Overall Validation Status: Proceed to Co-Creation and Prototype
          Testing
        </p>
      </div>
    </section>
  );
}

function DocumentationCard({ item }: { item: DocumentationItem }) {
  const categoryLabels: Record<DocumentationItem["category"], string> = {
    "umkm-interview": "UMKM interview",
    "student-interview": "Student interview",
    commitment: "Commitment",
    observation: "Observation",
    document: "Document",
  };

  if (!item.image || !item.imageWidth || !item.imageHeight) {
    const resourceUrl = item.videoUrl ?? item.documentUrl;
    const ResourceIcon = item.videoUrl ? VideoCamera : Page;

    if (!resourceUrl) {
      return null;
    }

    return (
      <article
        id={item.id}
        className="report-card scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand">
          <ResourceIcon className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="mt-4 font-mono text-[0.61rem] font-semibold uppercase tracking-[0.1em] text-brand">
          {categoryLabels[item.category]}
        </p>
        <h3 className="mt-1.5 text-base font-semibold leading-6 text-ink">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{item.caption}</p>
        <a
          href={resourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="report-no-print mt-4 inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-semibold text-brand underline decoration-brand-200 decoration-2 underline-offset-4 transition hover:decoration-brand"
        >
          {item.videoUrl ? "Buka video" : "Buka dokumen"}
          <OpenInBrowser className="h-4 w-4" aria-hidden="true" />
        </a>
      </article>
    );
  }

  return (
    <figure
      id={item.id}
      className="report-card scroll-mt-28 overflow-hidden rounded-2xl border border-slate-200 bg-white"
    >
      <MediaLightbox
        title={`Dokumentasi ${item.title}`}
        items={[
          {
            src: item.image,
            alt: item.alt,
            width: item.imageWidth,
            height: item.imageHeight,
          },
        ]}
        triggerLabel={`Buka foto dokumentasi ${item.title} dalam pop up`}
        imageClassName="aspect-[4/5] h-auto w-full object-cover transition duration-300 group-hover:scale-[1.02]"
      />
      <figcaption className="p-4 sm:p-5">
        <p className="font-mono text-[0.61rem] font-semibold uppercase tracking-[0.1em] text-brand">
          {categoryLabels[item.category]}
        </p>
        <h3 className="mt-1.5 text-base font-semibold leading-6 text-ink">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{item.caption}</p>
      </figcaption>
    </figure>
  );
}

function ValidationDocumentation() {
  return (
    <section
      className={sectionClassName}
      aria-labelledby="validation-documentation-heading"
    >
      <SectionHeading
        id="validation-documentation-heading"
        eyebrow="Evidence"
        title="Validation Documentation"
        description="Interview sessions, stakeholder discussions, and beneficiary commitments. Klik foto untuk membuka versi yang lebih besar."
      />
      {validationDocumentation.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {validationDocumentation.map((item) => (
            <DocumentationCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">
          Documentation will be added here.
        </p>
      )}
    </section>
  );
}

function SupportingDocuments() {
  return (
    <section
      className={sectionClassName}
      aria-labelledby="supporting-documents-heading"
    >
      <SectionHeading
        id="supporting-documents-heading"
        eyebrow="Downloads"
        title="Supporting Documents"
        description="Dokumen publik ditampilkan setelah file tersedia dan aman untuk dibagikan."
      />
      <ul className="grid gap-3 sm:grid-cols-2">
        {supportingDocuments.map((document) => {
          const content = (
            <>
              <span
                className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  document.status === "available"
                    ? "bg-brand text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {document.status === "available" ? (
                  <Download className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Page className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold leading-6 text-ink sm:text-base">
                    {document.title}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-slate-500">
                    {document.format}
                  </span>
                </span>
                <span className="mt-1 block text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                  {document.description}
                </span>
                <span
                  className={`mt-2 block font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] ${
                    document.status === "available"
                      ? "text-brand"
                      : "text-slate-500"
                  }`}
                >
                  {document.status === "available"
                    ? "Download PDF"
                    : "Coming soon"}
                </span>
              </span>
            </>
          );

          return (
            <li key={document.id}>
              {document.status === "available" && document.href ? (
                <a
                  href={document.href}
                  download
                  aria-label={`Unduh ${document.title}, format PDF`}
                  className="flex min-h-28 items-start gap-3 rounded-2xl border border-brand-200 bg-brand-50/45 p-4 transition hover:-translate-y-0.5 hover:border-brand hover:bg-brand-50 sm:p-5"
                >
                  {content}
                </a>
              ) : (
                <div className="flex min-h-28 items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
                  {content}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const reportOutputs = [
  "Profil dan kebutuhan lima UMKM penerima manfaat.",
  "Temuan penggunaan AI dari tiga mahasiswa calon co-creator.",
  "Pemetaan masalah yang tervalidasi dan hipotesis yang masih perlu diuji.",
  "Komitmen lima UMKM untuk memberi feedback dan menguji prototype.",
  "Arah tindak lanjut menuju co-creation dan prototype testing.",
] as const;

const leadershipReflection = {
  quote:
    "Validasi mengajarkan bahwa memimpin proses inovasi dimulai dari mendengar dengan disiplin, membedakan masalah dari asumsi solusi, dan menjaga ruang agar pengguna ikut menentukan arah.",
  paragraphs: [
    "Komitmen UMKM untuk terlibat adalah dasar kolaborasi, bukan bukti bahwa prototype akan otomatis digunakan. Tahap berikutnya harus tetap memberi ruang untuk feedback, perubahan workflow, dan keputusan menghentikan fitur yang tidak membantu.",
  ],
} as const;

export function ProblemValidationReportPage() {
  return (
    <article className="progress-report relative isolate overflow-hidden bg-[#f8fbff]">
      <ReportPrintStyles />
      <ProgressReportHeader report={problemValidationHeader} />

      <div className="progress-report-content page-container relative py-10 sm:py-14 lg:py-16">
        <div
          className="progress-report-decoration dot-grid pointer-events-none absolute inset-y-0 left-0 w-40 opacity-20"
          aria-hidden="true"
        />
        <div className="relative space-y-5 sm:space-y-6">
          <ValidationSummary />
          <ValidationApproach />
          <StakeholderOverview />
          <UmkmProfiles />
          <StudentProfiles />
          <CrossStakeholderFindings />
          <DoubleGapVisual />
          <ValidationBoundary />
          <ValidationConclusion />
          <ValidationDocumentation />
          <SupportingDocuments />
          <LeadershipReflectionCard reflection={leadershipReflection} />
          <ReportOutputList outputs={reportOutputs} />
          <ProgressDescriptionCard
            description={problemValidationProgressDescription}
          />
          <ProgressUrlCard url={problemValidationHeader.progressUrl} />
          <AdjacentProgressNavigation currentSlug={problemValidationHeader.slug} />
          <PrintReportFooter
            progressUrl={problemValidationHeader.progressUrl}
            updatedAt={problemValidationHeader.updatedAt}
            updatedAtIso={problemValidationHeader.updatedAtIso}
          />
        </div>
      </div>
    </article>
  );
}
