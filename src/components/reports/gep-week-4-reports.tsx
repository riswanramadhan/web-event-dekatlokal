import { CheckCircle, Download, OpenNewWindow, Page } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";

import { AnimatedNumber } from "@/components/ui/animated-number";

import {
  assessmentCohort,
  behavioralOutcomeFlow,
  behavioralOutcomeStatement,
  capabilityDimensions,
  capabilityHeadline,
  capabilityInterpretation,
  capabilityStatement,
  featuredReflections,
  featuredReflectionsNote,
  impactMeasurementLayers,
  impactMeasurementPrinciple,
  knowledgeResult,
  measurementKitImprovements,
  methodologyNote,
  mixedTeamPurpose,
  pairedConsistency,
  participantVoice,
  postProgramExperience,
  reflectionCoverage,
  reflectionThemes,
  stewardIntention,
} from "@/data/gep-week-4-assessment";
import {
  beneficiaries,
  completionFraming,
  finalDeckAsset,
  finalPresentationHeader,
  finalPresentationOverview,
  finalPresentationSections,
  finalPresentationSlides,
  fiveSystemsDelivered,
  fiveSystemsIntro,
  fourWeekProgressFlow,
  impactAccountabilityMetrics,
  impactChangeMetrics,
  impactContinuity,
  impactDocumentationHighlights,
  impactDocumentationSummary,
  impactEvidenceFiles,
  impactEvidenceIntro,
  impactHeroMetrics,
  impactMeasurementHeader,
  impactReportAsset,
  impactReportPurpose,
  implementationChallenge,
  implementationLifecycle,
  keyImplementationLearnings,
  leadershipReflectionEssay,
  leadershipReflectionHeader,
  leadershipReflectionOwner,
  leadershipReflectionQuestions,
  lifecycleFlow,
  monitoringBenefitNote,
  monitoringChallengesAndResponses,
  monitoringDocumentation,
  monitoringDocumentationHighlights,
  monitoringExecutiveSummary,
  monitoringFollowUpPlan,
  monitoringPurpose,
  monitoringReportAsset,
  monitoringReportCoverage,
  monthlyMonitoring,
  nonCoreCount,
  outputVsOutcome,
  partnerNetworkGroups,
  partnerNetworkNote,
  playbookAsset,
  projectCompletionMonitoringHeader,
  replicationInterest,
  replicationKitAssets,
  replicationKitVersion,
  stewardshipModel,
  studentUniversities,
  studentUniversitiesIntro,
  supportTeam,
  supportTeamSummary,
  sustainabilityPlan,
  sustainabilitySection,
  sustainabilityStatement,
  targetAchievementStatement,
  targetVsAchievement,
  teamDesignNote,
  technicalCoreCount,
  umkmCoCreatorIntro,
  umkmCoCreatorLogos,
  weekFourClosing,
  weekFourCompletionHighlights,
  weekFourFinalNarrative,
  weekFourGuidingQuestions,
  weekFourHeader,
  weekFourOverview,
  weekFourProgressCards,
  weekFourReportCopy,
  weekFourSecondaryCard,
  weekFourStatusOverview,
  weekFourTeamDesign,
  whyRefinement,
  type DownloadableAsset,
  type LifecycleState,
} from "@/data/gep-week-4";

import {
  ChangeHighlight,
  GroupedBarChart,
  SimpleBarChart,
  type ChartBar,
} from "./assessment-charts";
import {
  CheckList,
  GepProgressReportShell,
  NumberedEditorialList,
  ProcessFlow,
  ReportSectionCard,
  StatusChip,
} from "./gep-progress-shared";
import { MediaLightbox, type LightboxMediaItem } from "./media-lightbox";
import { ResponsiveReportTable } from "./progress-report";

const prePostLegend = [
  { label: "PRE", tone: "pre" as const },
  { label: "POST", tone: "post" as const },
];

function Quote({ children }: { children: string }) {
  return (
    <blockquote className="border-l-2 border-brand pl-4 text-base font-semibold leading-8 text-brand-900 sm:text-lg">
      {children}
    </blockquote>
  );
}

function SectionNote({ children }: { children: string }) {
  return (
    <p className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-6 text-slate-600 sm:text-sm">
      {children}
    </p>
  );
}

function AssetDownloadCard({ asset }: { asset: DownloadableAsset }) {
  const showSeparateView = asset.viewHref !== null;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <Page className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
        <span className="rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-brand-800">
          {asset.kind}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold leading-7 tracking-[-0.02em] text-ink">
        {asset.title}
      </h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">
        {asset.description}
      </p>
      <dl className="mt-4 grid gap-2 sm:grid-cols-3">
        {asset.meta.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2"
          >
            <dt className="font-mono text-[0.56rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
              {item.label}
            </dt>
            <dd className="mt-1 text-xs font-semibold leading-5 text-ink">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
      <div className="report-no-print mt-auto flex flex-col gap-2 pt-5 sm:flex-row sm:flex-wrap">
        {showSeparateView ? (
          <a
            href={asset.viewHref ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-600 sm:w-auto"
          >
            <OpenNewWindow className="h-4 w-4" aria-hidden="true" />
            {asset.viewLabel}
            <span className="sr-only"> (terbuka di tab baru)</span>
          </a>
        ) : null}
        <a
          href={asset.downloadHref}
          download
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand transition hover:-translate-y-0.5 hover:border-brand hover:bg-brand-50 sm:w-auto"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          {asset.downloadLabel}
        </a>
      </div>
    </article>
  );
}

function PlaybookCard() {
  return (
    <article className="rounded-2xl border border-brand-100 bg-brand-50/50 p-5 sm:p-6">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
        <div className="min-w-0">
          <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-brand">
            Replication asset
          </p>
          <h3 className="mt-2 text-balance text-xl font-semibold leading-7 tracking-[-0.02em] text-ink sm:text-2xl">
            {playbookAsset.title}
          </h3>
          <p className="mt-1 text-sm font-semibold text-brand-800">
            {playbookAsset.subtitle}
          </p>
        </div>
        <StatusChip tone="green">{playbookAsset.badge}</StatusChip>
      </div>

      <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
        {playbookAsset.description}
      </p>

      <dl className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Version", value: playbookAsset.version },
          { label: "Basis", value: playbookAsset.basedOn },
          { label: "Disusun oleh", value: playbookAsset.preparedBy },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3"
          >
            <dt className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
              {item.label}
            </dt>
            <dd className="mt-1.5 text-sm font-semibold leading-6 text-ink">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="report-no-print mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <a
          href={playbookAsset.pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-600 sm:w-auto"
        >
          <OpenNewWindow className="h-4 w-4" aria-hidden="true" />
          View Playbook
          <span className="sr-only"> (terbuka di tab baru)</span>
        </a>
        <a
          href={playbookAsset.pdfHref}
          download
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand transition hover:-translate-y-0.5 hover:border-brand hover:bg-brand-50 sm:w-auto"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download PDF
        </a>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Hub                                                                        */
/* -------------------------------------------------------------------------- */

function CompletionFraming() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[completionFraming.delivery, completionFraming.continuity].map(
        (item, index) => (
          <article
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5"
          >
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-brand">
                {item.label}
              </p>
              <StatusChip tone={index === 0 ? "green" : "blue"}>
                {item.status}
              </StatusChip>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {item.description}
            </p>
          </article>
        ),
      )}
    </div>
  );
}

function FourWeekJourney() {
  return (
    <ol
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      aria-label="Perjalanan GEP dari Week 1 hingga Week 4"
    >
      {fourWeekProgressFlow.map((item, index) => (
        <li
          key={item.week}
          className="relative rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
        >
          <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-brand">
            {item.week}
          </span>
          <p className="mt-2 font-semibold leading-6 text-ink">{item.phase}</p>
          {index < fourWeekProgressFlow.length - 1 ? (
            <span
              aria-hidden="true"
              className="mt-3 block font-mono text-sm text-slate-400 lg:hidden"
            >
              ↓
            </span>
          ) : null}
          {index < fourWeekProgressFlow.length - 1 ? (
            <span
              aria-hidden="true"
              className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 font-mono text-sm text-slate-400 lg:block"
            >
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function ProgressCards() {
  return (
    <ol className="grid gap-4 md:grid-cols-2">
      {weekFourProgressCards.map((item) => (
        <li key={item.slug}>
          <Link
            href={item.route}
            className="group flex h-full min-h-52 flex-col rounded-2xl border border-slate-200 bg-slate-50/55 p-5 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-sm font-semibold text-brand">
                {item.number}
              </span>
              <StatusChip tone={item.statusTone}>{item.status}</StatusChip>
            </div>
            <h3 className="mt-7 text-xl font-semibold leading-7 tracking-[-0.025em] text-ink transition group-hover:text-brand">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {item.description}
            </p>
            <span className="mt-auto pt-6 text-sm font-semibold text-brand">
              Open report <span aria-hidden="true">→</span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

function StatusRows() {
  return (
    <ul className="divide-y divide-slate-200 border-y border-slate-200">
      {weekFourStatusOverview.map((item) => (
        <li key={item.title}>
          <Link
            href={item.href}
            className="flex min-h-14 flex-col items-start justify-between gap-3 py-4 transition hover:text-brand sm:flex-row sm:items-center"
          >
            <span className="font-semibold leading-6 text-ink">
              {item.title}
            </span>
            <StatusChip tone={item.statusTone}>{item.status}</StatusChip>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function SustainabilitySummary() {
  return (
    <ReportSectionCard
      id={sustainabilitySection.id}
      eyebrow="Sustainability & Replication"
      title={sustainabilitySection.title}
      description={sustainabilitySection.description}
    >
      <div className="flex justify-start">
        <StatusChip tone={sustainabilitySection.statusTone}>
          {sustainabilitySection.status}
        </StatusChip>
      </div>

      <ol className="mt-7 grid gap-4 md:grid-cols-2">
        {sustainabilityPlan.map((layer) => (
          <li
            key={layer.number}
            className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5"
          >
            <span className="font-mono text-sm font-semibold text-brand">
              {layer.number}
            </span>
            <h3 className="mt-3 text-lg font-semibold leading-7 text-ink">
              {layer.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {layer.description}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-7">
        <Quote>{sustainabilityStatement}</Quote>
      </div>

      <div className="mt-8 border-t border-slate-200 pt-7">
        <PlaybookCard />
      </div>
    </ReportSectionCard>
  );
}

export function WeekFourHubReportPage() {
  return (
    <GepProgressReportShell
      header={weekFourHeader}
      progressDescription={weekFourReportCopy.hub.progressDescription}
      outputs={weekFourReportCopy.hub.outputs}
      reflection={weekFourReportCopy.hub.reflection}
    >
      <ReportSectionCard
        id="week-four-direction"
        eyebrow="Measure, Reflect & Sustain"
        title={weekFourOverview.title}
        description={weekFourOverview.description}
      >
        <CompletionFraming />
        <div className="mt-7">
          <Quote>{completionFraming.statement}</Quote>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-6">
          <CheckList items={weekFourCompletionHighlights} />
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="week-four-journey"
        eyebrow="Program Journey"
        title="Empat Minggu Global Experience Program"
      >
        <FourWeekJourney />
      </ReportSectionCard>

      <ReportSectionCard
        id="week-four-deliverables"
        eyebrow="Week 4 Deliverables"
        title="Four Closing Reports"
        description={weekFourOverview.subtitle}
      >
        <ProgressCards />
        <article className="mt-5 rounded-2xl border border-brand-100 bg-brand-50/60 p-5 sm:p-6">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
            <div className="min-w-0">
              <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-brand">
                Secondary deliverable
              </p>
              <h3 className="mt-2 text-xl font-semibold leading-7 text-ink">
                {weekFourSecondaryCard.title}
              </h3>
            </div>
            <StatusChip tone={weekFourSecondaryCard.statusTone}>
              {weekFourSecondaryCard.status}
            </StatusChip>
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {weekFourSecondaryCard.description}
          </p>
          <a
            href={weekFourSecondaryCard.href}
            className="report-no-print mt-4 inline-flex text-sm font-semibold text-brand"
          >
            Lihat sustainability &amp; replication{" "}
            <span aria-hidden="true">→</span>
          </a>
        </article>
      </ReportSectionCard>

      <ReportSectionCard
        id="week-four-status"
        eyebrow="Current Status"
        title="Week 4 Status Overview"
      >
        <StatusRows />
      </ReportSectionCard>

      <SustainabilitySummary />

      <ReportSectionCard
        id="week-four-questions"
        eyebrow="Guiding Questions"
        title="Empat Pertanyaan yang Dijawab Week 4"
      >
        <ol className="grid gap-4 md:grid-cols-2">
          {weekFourGuidingQuestions.map((item) => (
            <li
              key={item.number}
              className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
            >
              <span className="font-mono text-sm font-semibold text-brand">
                {item.number}
              </span>
              <h3 className="mt-3 font-semibold leading-6 text-ink">
                {item.question}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {item.answer}
              </p>
            </li>
          ))}
        </ol>
      </ReportSectionCard>

      <ReportSectionCard
        id="week-four-closing"
        eyebrow="Week 4 Closing"
        title={weekFourClosing.question}
      >
        <ol className="grid gap-4 md:grid-cols-3">
          {weekFourClosing.items.map((item) => (
            <li
              key={item.value}
              className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
            >
              <p className="text-lg font-semibold leading-7 tracking-[-0.02em] text-ink">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {item.label}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {weekFourFinalNarrative.pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <h3 className="font-semibold leading-6 text-ink">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-7 space-y-4">
          <Quote>{weekFourClosing.statement}</Quote>
          <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-5 sm:p-6">
            <p className="text-lg font-semibold tracking-[-0.02em] text-ink">
              {weekFourFinalNarrative.tagline}
            </p>
            <p className="mt-1 text-sm font-semibold text-brand">
              {weekFourFinalNarrative.cta}
            </p>
          </div>
        </div>
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}

/* -------------------------------------------------------------------------- */
/* Project monitoring report                                                  */
/* -------------------------------------------------------------------------- */

const lifecycleToneByState: Record<
  LifecycleState,
  "green" | "blue" | "neutral"
> = {
  Completed: "green",
  "Post-Program Continuity": "blue",
  "Structured Transition": "blue",
  "Sustainability Mechanism": "blue",
};

function ImplementationLifecycle() {
  return (
    <>
      <ProcessFlow
        steps={lifecycleFlow}
        label="Siklus implementasi dari validasi masalah sampai monitoring bulanan"
        tone="green"
      />
      <ol className="mt-7 grid gap-4 md:grid-cols-2">
        {implementationLifecycle.map((stage) => (
          <li
            key={stage.number}
            className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/55 p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="font-mono text-sm font-semibold text-brand">
                {stage.number}
              </span>
              <StatusChip tone={lifecycleToneByState[stage.state]}>
                {stage.state}
              </StatusChip>
            </div>
            <h3 className="mt-4 text-lg font-semibold leading-7 text-ink">
              {stage.title}
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {stage.description}
            </p>
          </li>
        ))}
      </ol>
    </>
  );
}

function SystemsDelivered() {
  return (
    <div className="grid gap-5">
      {fiveSystemsDelivered.map((system) => (
        <article
          key={system.id}
          data-monitoring-system
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
        >
          <div
            data-monitoring-system-grid
            className="grid gap-0 lg:grid-cols-[1.15fr_1fr]"
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5">
                  <Image
                    src={system.logo.src}
                    alt={system.logo.alt}
                    width={system.logo.width}
                    height={system.logo.height}
                    className="h-full w-full object-contain"
                    sizes="48px"
                  />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-brand">
                    System {system.number}
                  </p>
                  <h3 className="text-lg font-semibold leading-7 text-ink">
                    {system.businessName}
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-sm font-semibold leading-6 text-brand-800">
                {system.solution}
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {system.problemSolved}
              </p>

              <div className="mt-4">
                <StatusChip tone="green">{system.status}</StatusChip>
              </div>

              <ul className="mt-4 space-y-2">
                {system.continuity.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-7 text-slate-600"
                  >
                    <CheckCircle
                      className="mt-1.5 h-4 w-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <dl className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3">
                  <dt className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                    Steward
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold leading-6 text-ink">
                    {system.steward}
                  </dd>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3">
                  <dt className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                    DekatLokal
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold leading-6 text-ink">
                    {system.dekatlokalRole}
                  </dd>
                </div>
              </dl>
            </div>

            <div
              data-monitoring-system-media
              className="border-t border-slate-200 bg-slate-50 p-4 sm:p-5 lg:border-l lg:border-t-0"
            >
              <p className="mb-3 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                Solution documentation
              </p>
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                <Image
                  src={system.screenshot.src}
                  alt={system.screenshot.alt}
                  width={system.screenshot.width}
                  height={system.screenshot.height}
                  loading="lazy"
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1023px) calc(100vw - 3rem), 40vw"
                />
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ProjectCompletionMonitoringReportPage() {
  return (
    <GepProgressReportShell
      header={projectCompletionMonitoringHeader}
      progressDescription={weekFourReportCopy.monitoring.progressDescription}
      outputs={weekFourReportCopy.monitoring.outputs}
      reflection={weekFourReportCopy.monitoring.reflection}
    >
      <ReportSectionCard
        id="monitoring-executive-summary"
        eyebrow="Executive Summary"
        title="Implementation Delivered, Continuity Secured"
        description={monitoringPurpose}
      >
        <div className="space-y-4">
          {monitoringExecutiveSummary.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-[0.94rem] leading-8 text-slate-700 sm:text-base"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-7">
          <Quote>{monitoringExecutiveSummary.quote}</Quote>
        </div>
        <SectionNote>{monitoringBenefitNote}</SectionNote>
        <div className="mt-6 max-w-3xl">
          <AssetDownloadCard asset={monitoringReportAsset} />
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="monitoring-report-coverage"
        eyebrow="Report Coverage"
        title="Isi Project Monitoring Report"
        description="Tujuh bagian ini menjaga laporan tetap utuh sebagai sumber materi Implementasi Project pada Final Presentation."
      >
        <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {monitoringReportCoverage.map((item) => (
            <li
              key={item.number}
              className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5"
            >
              <span className="font-mono text-sm font-semibold text-brand">
                {item.number}
              </span>
              <h3 className="mt-3 text-lg font-semibold leading-7 text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </ReportSectionCard>

      <ReportSectionCard
        id="target-vs-achievement"
        eyebrow="Target Achievement"
        title="Capaian terhadap Target Awal"
      >
        <ResponsiveReportTable
          headers={["Indicator", "Target", "Achievement"]}
          rows={targetVsAchievement.map((row) => [
            row.indicator,
            row.target,
            row.achievement,
          ])}
          align={["left", "right", "right"]}
          label="Tabel target dan capaian AI Co-Creation Lab Makassar"
        />
        <div className="mt-6">
          <Quote>{targetAchievementStatement}</Quote>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="implementation-lifecycle"
        eyebrow="Implementation Journey"
        title="Dari Validasi Masalah sampai Monitoring Bulanan"
        description="Lima tahap pertama telah dituntaskan sebagai bagian dari GEP. Tiga tahap berikutnya adalah mekanisme keberlanjutan yang berjalan setelah program formal selesai."
      >
        <ImplementationLifecycle />
      </ReportSectionCard>

      <ReportSectionCard
        id="five-systems-delivered"
        eyebrow="Solution Documentation"
        title={fiveSystemsIntro.title}
        description={fiveSystemsIntro.description}
      >
        <SystemsDelivered />
      </ReportSectionCard>

      <ReportSectionCard
        id="why-refinement"
        eyebrow="Responsible Deployment"
        title={whyRefinement.title}
        description={whyRefinement.lead}
      >
        <CheckList items={whyRefinement.protects} />
        <div className="mt-7">
          <Quote>{whyRefinement.statement}</Quote>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="challenges-and-solutions"
        eyebrow="Kendala & Solusi"
        title="Respons yang Menjaga Implementasi Tetap Bertanggung Jawab"
        description="Kendala ditulis sebagai batas implementasi yang benar-benar perlu dikelola, bukan sebagai outcome yang sudah dianggap selesai."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {monitoringChallengesAndResponses.map((item, index) => (
            <article
              key={item.challenge}
              className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5 sm:p-6"
            >
              <span className="font-mono text-sm font-semibold text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <dl className="mt-4 space-y-4">
                <div>
                  <dt className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                    Kendala
                  </dt>
                  <dd className="mt-2 text-sm font-semibold leading-7 text-ink">
                    {item.challenge}
                  </dd>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <dt className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-brand">
                    Respons / Solusi
                  </dt>
                  <dd className="mt-2 text-sm leading-7 text-slate-600">
                    {item.response}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="stewardship-model"
        eyebrow="Stewardship"
        title={stewardshipModel.title}
        description={stewardshipModel.description}
      >
        <div className="grid gap-4 md:grid-cols-3">
          {stewardshipModel.roles.map((role) => (
            <article
              key={role.number}
              className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5"
            >
              <span className="font-mono text-sm font-semibold text-brand">
                {role.number}
              </span>
              <h3 className="mt-3 text-lg font-semibold leading-7 text-ink">
                {role.actor}
              </h3>
              <p className="mt-1 text-sm font-semibold text-brand-800">
                {role.role}
              </p>
              <ul className="mt-3 space-y-2">
                {role.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-7 text-slate-600"
                  >
                    <span
                      className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <ul className="mt-7 grid gap-3 md:grid-cols-2">
          {fiveSystemsDelivered.map((system) => (
            <li
              key={system.id}
              className="flex min-h-14 flex-col items-start justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center"
            >
              <span className="font-semibold leading-6 text-ink">
                {system.businessName}
              </span>
              <StatusChip
                tone={system.stewardKind === "student" ? "green" : "blue"}
              >
                {system.steward}
              </StatusChip>
            </li>
          ))}
        </ul>

        <div className="mt-7 grid gap-4 lg:grid-cols-2">
          {stewardshipModel.statements.map((statement) => (
            <Quote key={statement.slice(0, 30)}>{statement}</Quote>
          ))}
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="monthly-monitoring"
        eyebrow="Sustainability Mechanism"
        title={monthlyMonitoring.title}
        description={monthlyMonitoring.description}
      >
        <CheckList items={monthlyMonitoring.items} />
        <div className="mt-7">
          <Quote>{monthlyMonitoring.statement}</Quote>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="follow-up-plan"
        eyebrow="Rencana Tindak Lanjut"
        title="Owner, Waktu, Status, dan Indikator Keberhasilan"
        description="Tindak lanjut dibedakan dari hasil aktual agar pembaca dapat melihat apa yang telah dicatat dan apa yang masih diverifikasi."
      >
        <div className="grid gap-4">
          {monitoringFollowUpPlan.map((item, index) => (
            <article
              key={item.action}
              className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
            >
              <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <div className="min-w-0">
                  <span className="font-mono text-sm font-semibold text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold leading-7 text-ink">
                    {item.action}
                  </h3>
                </div>
                <StatusChip tone="blue">{item.status}</StatusChip>
              </div>
              <dl className="mt-5 grid gap-3 md:grid-cols-3">
                {[
                  { label: "Owner", value: item.owner },
                  { label: "Waktu", value: item.timing },
                  {
                    label: "Indikator keberhasilan",
                    value: item.successIndicator,
                  },
                ].map((entry) => (
                  <div
                    key={entry.label}
                    className="min-w-0 rounded-xl border border-slate-200 bg-slate-50/60 p-4"
                  >
                    <dt className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                      {entry.label}
                    </dt>
                    <dd className="mt-2 [overflow-wrap:anywhere] text-sm leading-7 text-slate-600">
                      {entry.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="monitoring-documentation"
        eyebrow="Project Documentation"
        title={monitoringDocumentation.title}
        description={monitoringDocumentation.description}
      >
        <div className="flex flex-wrap gap-2">
          {monitoringDocumentation.categories.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-6">
          <MediaLightbox
            title="Dokumentasi Project Monitoring"
            items={monitoringDocumentationHighlights.map((item) => ({
              ...item,
              label: item.caption,
            }))}
            sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1279px) 28vw, 22rem"
          />
        </div>
        <ul className="report-no-print mt-6 grid gap-3 md:grid-cols-2">
          {monitoringDocumentation.links.map((link) => (
            <li key={link.href}>
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand-50"
                >
                  <OpenNewWindow
                    className="h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  {link.label}
                  <span className="sr-only"> (terbuka di tab baru)</span>
                </a>
              ) : (
                <Link
                  href={link.href}
                  className="flex min-h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand-50"
                >
                  {link.label}
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </ReportSectionCard>

      <ReportSectionCard
        id="key-learnings"
        eyebrow="Implementation Learnings"
        title="Enam Pembelajaran Utama"
      >
        <NumberedEditorialList items={keyImplementationLearnings} />
        <article className="mt-7 rounded-2xl border border-slate-200 bg-slate-50/55 p-5 sm:p-6">
          <h3 className="text-lg font-semibold leading-7 text-ink">
            {implementationChallenge.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {implementationChallenge.context}
          </p>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <dt className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                Response
              </dt>
              <dd className="mt-2 text-sm leading-7 text-slate-600">
                {implementationChallenge.response}
              </dd>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <dt className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                Recommended replication model
              </dt>
              <dd className="mt-2 text-sm leading-7 text-slate-600">
                {implementationChallenge.lesson}
              </dd>
            </div>
          </dl>
          <div className="mt-4">
            <ProcessFlow
              steps={implementationChallenge.flow}
              label="Format dua hari yang direkomendasikan untuk replikasi"
              tone="slate"
            />
          </div>
        </article>
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}

/* -------------------------------------------------------------------------- */
/* Impact & sustainability report                                             */
/* -------------------------------------------------------------------------- */

function HeroMetrics() {
  return (
    <>
      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {impactHeroMetrics.delivery.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-brand-100 bg-brand-50/50 p-5"
          >
            <dt className="sr-only">{metric.label}</dt>
            <dd>
              <span className="block text-3xl font-semibold tracking-[-0.04em] text-brand-900">
                {"total" in metric ? (
                  <>
                    <AnimatedNumber value={metric.value} /> of{" "}
                    <AnimatedNumber value={metric.total} />
                  </>
                ) : (
                  <AnimatedNumber value={metric.value} />
                )}
              </span>
              <span className="mt-2 block text-sm font-semibold leading-6 text-slate-700">
                {metric.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {impactHeroMetrics.learning.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
          >
            <dt className="sr-only">{metric.label}</dt>
            <dd>
              <span className="block text-2xl font-semibold tracking-[-0.03em] text-ink">
                {"before" in metric ? (
                  <>
                    <AnimatedNumber
                      value={metric.before}
                      decimals={metric.decimalsBefore}
                    />{" "}
                    →{" "}
                    <AnimatedNumber
                      value={metric.after}
                      decimals={metric.decimalsAfter}
                    />
                  </>
                ) : "total" in metric ? (
                  <>
                    <AnimatedNumber value={metric.value} /> of{" "}
                    <AnimatedNumber value={metric.total} />
                  </>
                ) : (
                  <AnimatedNumber
                    value={metric.value}
                    decimals={metric.decimals}
                    prefix={metric.prefix}
                  />
                )}
              </span>
              <span className="mt-2 block text-sm font-semibold leading-6 text-slate-700">
                {metric.label}
              </span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">
                {metric.caption}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}

function UniversityStrip() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {studentUniversities.map((university) => (
        <li
          key={university.id}
          className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4"
        >
          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5">
            <Image
              src={university.logo.src}
              alt={`Logo ${university.name}`}
              width={university.logo.width}
              height={university.logo.height}
              className="h-full w-full object-contain"
              sizes="56px"
            />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-6 text-ink">
              {university.name}
            </p>
            <p className="mt-0.5 text-xs font-semibold text-brand-800">
              <AnimatedNumber
                value={university.students}
                suffix=" mahasiswa"
              />
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function UmkmStrip() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {umkmCoCreatorLogos.map((coCreator) => (
        <li
          key={coCreator.id}
          className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4"
        >
          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5">
            <Image
              src={coCreator.visual.src}
              alt={coCreator.visual.alt}
              width={coCreator.visual.width}
              height={coCreator.visual.height}
              className="h-full w-full object-contain"
              sizes="56px"
            />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-6 text-ink">
              {coCreator.name}
            </p>
            <p className="mt-0.5 text-xs font-semibold text-brand-800">
              {coCreator.label}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function KnowledgeChart() {
  return (
    <GroupedBarChart
      title="Knowledge — Pre vs Post"
      scaleLabel="Skala 0-100 · rata-rata core knowledge check"
      max={100}
      legend={prePostLegend}
      groups={[
        {
          id: "knowledge",
          label: "Rata-rata skor 20 peserta",
          bars: [
            {
              id: "knowledge-pre",
              label: "Pre-test",
              value: knowledgeResult.pre,
              display: knowledgeResult.pre.toFixed(2),
              animatedValue: { decimals: 2 },
              tone: "pre",
            },
            {
              id: "knowledge-post",
              label: "Post-test",
              value: knowledgeResult.post,
              display: knowledgeResult.post.toFixed(2),
              animatedValue: { decimals: 0 },
              tone: "post",
            },
          ],
        },
      ]}
      footnote={knowledgeResult.wordingGuard}
    />
  );
}

function CapabilityChart() {
  return (
    <GroupedBarChart
      title="Self-Reported Capability — Pre vs Post"
      scaleLabel="Skala Likert 1-5 · sumbu digambar dari 0"
      max={5}
      legend={prePostLegend}
      groups={capabilityDimensions.map((dimension) => ({
        id: dimension.id,
        label: dimension.label,
        caption: dimension.largestGain
          ? `Perubahan terbesar ${dimension.change}`
          : `Perubahan ${dimension.change}`,
        bars: [
          {
            id: `${dimension.id}-pre`,
            label: "Pre",
            value: dimension.pre,
            display: dimension.pre.toFixed(2),
            animatedValue: { decimals: 2 },
            tone: "pre" as const,
          },
          {
            id: `${dimension.id}-post`,
            label: "Post",
            value: dimension.post,
            display: dimension.post.toFixed(2),
            animatedValue: { decimals: 2 },
            tone: "post" as const,
          },
        ],
      }))}
    />
  );
}

function StewardChart() {
  const bars: readonly ChartBar[] = stewardIntention.distribution.map(
    (item) => ({
      id: item.id,
      label: item.label,
      value: item.count,
      display: `${item.count} peserta`,
      animatedValue: { suffix: " peserta" },
      tone: "solid" as const,
    }),
  );

  return (
    <SimpleBarChart
      title="Technical Steward Intention"
      scaleLabel="Jumlah peserta dari total 20"
      max={assessmentCohort.participants}
      bars={bars}
      footnote={stewardIntention.wordingGuard}
    />
  );
}

function TeamDesign() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {weekFourTeamDesign.map((team) => (
        <article
          key={team.id}
          className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5"
        >
          <span className="font-mono text-sm font-semibold text-brand">
            {team.number}
          </span>
          <h3 className="mt-3 text-lg font-semibold leading-7 text-ink">
            {team.title}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {team.members.map((member) => (
              <li
                key={member.name}
                className="flex flex-col gap-1 border-b border-slate-200 pb-2.5 last:border-b-0 last:pb-0"
              >
                <span className="flex flex-wrap items-center gap-2 text-sm font-semibold leading-6 text-ink">
                  {member.name}
                  {member.isTechnicalCore ? (
                    <span className="rounded-full border border-brand-200 bg-brand-50 px-2 py-0.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-brand-800">
                      Technical Core
                    </span>
                  ) : null}
                </span>
                <span className="text-xs leading-5 text-slate-500">
                  {member.university}
                </span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function ImpactMeasurementReportPage() {
  return (
    <GepProgressReportShell
      header={impactMeasurementHeader}
      progressDescription={weekFourReportCopy.impact.progressDescription}
      outputs={weekFourReportCopy.impact.outputs}
      reflection={weekFourReportCopy.impact.reflection}
    >
      <ReportSectionCard
        id="impact-headline"
        eyebrow="Impact at a Glance"
        title="Delivered and Measured"
        description={impactReportPurpose}
      >
        <HeroMetrics />
        <div className="mt-6 max-w-3xl">
          <AssetDownloadCard asset={impactReportAsset} />
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="impact-accountability"
        eyebrow="Accountability at a Glance"
        title="Penerima Manfaat, Ekosistem, Relawan, Output, dan Dokumentasi"
        description="Setiap angka diturunkan dari data peserta, roster mitra/dukungan, output sistem, dan aset dokumentasi yang benar-benar tersedia."
      >
        <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {impactAccountabilityMetrics.map((metric) => (
            <div
              key={metric.label}
              className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5"
            >
              <dt className="text-xs font-semibold leading-5 text-slate-600">
                {metric.label}
              </dt>
              <dd className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-brand-900 sm:text-4xl">
                <AnimatedNumber value={metric.value} />
              </dd>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                {metric.caption}
              </p>
            </div>
          ))}
        </dl>
      </ReportSectionCard>

      <ReportSectionCard
        id="measured-change"
        eyebrow="Measured Change"
        title="Perubahan yang Terjadi pada Full Cohort"
        description="Knowledge dan self-reported capability memakai skala berbeda, sehingga ditampilkan terpisah dan tidak dijumlahkan menjadi satu skor."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {impactChangeMetrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-2xl border border-brand-100 bg-brand-50/45 p-5 sm:p-6"
            >
              <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-brand">
                {metric.label}
              </p>
              <p className="mt-4 flex flex-wrap items-baseline gap-2 text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">
                <AnimatedNumber
                  value={metric.before}
                  decimals={metric.beforeDecimals}
                />
                <span className="text-slate-400" aria-hidden="true">
                  →
                </span>
                <AnimatedNumber
                  value={metric.after}
                  decimals={metric.afterDecimals}
                />
              </p>
              <p className="mt-3 text-sm font-semibold leading-6 text-brand-900">
                {metric.scale}
              </p>
            </article>
          ))}
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="beneficiaries"
        eyebrow="Beneficiaries"
        title="Penerima Manfaat Langsung"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5">
            <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-brand">
              {beneficiaries.students.label}
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink">
              <AnimatedNumber
                value={beneficiaries.students.value}
                suffix={beneficiaries.students.suffix}
              />
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {beneficiaries.students.description}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5">
            <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-brand">
              {beneficiaries.umkm.label}
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink">
              <AnimatedNumber
                value={beneficiaries.umkm.value}
                suffix={beneficiaries.umkm.suffix}
              />
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {beneficiaries.umkm.description}
            </p>
          </article>
        </div>
        <SectionNote>{beneficiaries.separationNote}</SectionNote>
      </ReportSectionCard>

      <ReportSectionCard
        id="student-universities"
        eyebrow="Students"
        title={studentUniversitiesIntro.title}
        description={studentUniversitiesIntro.description}
      >
        <UniversityStrip />
      </ReportSectionCard>

      <ReportSectionCard
        id="umkm-co-creators"
        eyebrow="UMKM"
        title={umkmCoCreatorIntro.title}
        description={umkmCoCreatorIntro.description}
      >
        <UmkmStrip />
      </ReportSectionCard>

      <ReportSectionCard
        id="team-design"
        eyebrow="Team Design"
        title="Lima Tim Campuran"
        description={mixedTeamPurpose.description}
      >
        <TeamDesign />
        <div className="mt-7 border-t border-slate-200 pt-6">
          <p className="text-sm leading-7 text-slate-600">
            Komposisi kohort:{" "}
            <AnimatedNumber
              value={technicalCoreCount}
              suffix=" technical core"
            />{" "}
            dan <AnimatedNumber value={nonCoreCount} suffix=" non-core" /> dari
            total{" "}
            <AnimatedNumber
              value={assessmentCohort.participants}
              suffix=" peserta"
            />
            .
          </p>
          <div className="mt-4">
            <ProcessFlow
              steps={mixedTeamPurpose.participation}
              label="Peran yang tetap dijalankan seluruh peserta"
              tone="slate"
            />
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {mixedTeamPurpose.statements.map((statement) => (
              <Quote key={statement.slice(0, 30)}>{statement}</Quote>
            ))}
          </div>
        </div>
        <SectionNote>{teamDesignNote}</SectionNote>
      </ReportSectionCard>

      <ReportSectionCard
        id="impact-measurement-framework"
        eyebrow="Measurement Framework"
        title="Enam Lapis Pengukuran, Bukan Satu Skor"
        description={impactMeasurementPrinciple}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {impactMeasurementLayers.map((layer) => (
            <article
              key={layer.number}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <span className="font-mono text-sm font-semibold text-brand">
                {layer.number}
              </span>
              <h3 className="mt-3 font-semibold leading-6 text-ink">
                {layer.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {layer.description}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
          <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
            {methodologyNote.title}
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            {methodologyNote.text}
          </p>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="knowledge-result"
        eyebrow="Result A · Knowledge"
        title="Core Knowledge Check"
        description={knowledgeResult.scaleLabel}
      >
        <ChangeHighlight
          items={[
            {
              label: "Pre-test",
              value: (
                <AnimatedNumber value={knowledgeResult.pre} decimals={2} />
              ),
              caption: "Rata-rata skor sebelum program.",
            },
            {
              label: "Post-test",
              value: <AnimatedNumber value={knowledgeResult.post} />,
              caption: "Rata-rata skor setelah program.",
            },
            {
              label: "Average gain",
              value: (
                <AnimatedNumber
                  value={28.75}
                  decimals={2}
                  prefix="+"
                  suffix=" percentage points"
                />
              ),
              caption: knowledgeResult.participantsIncreasedLabel,
            },
          ]}
        />
        <div className="mt-6">
          <KnowledgeChart />
        </div>
        <div className="mt-6">
          <Quote>{knowledgeResult.headline}</Quote>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {knowledgeResult.supporting}
          </p>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="capability-result"
        eyebrow="Result B · Capability"
        title="Self-Reported Capability"
        description={capabilityStatement}
      >
        <CapabilityChart />
        <div className="mt-6">
          <ResponsiveReportTable
            headers={["Dimension", "Pre", "Post", "Gain"]}
            rows={capabilityDimensions.map((dimension) => [
              dimension.label,
              dimension.pre.toFixed(2),
              dimension.post.toFixed(2),
              dimension.change,
            ])}
            align={["left", "right", "right", "right"]}
            label="Tabel self-reported capability per dimensi"
          />
        </div>
        <p className="mt-6 text-sm leading-8 text-slate-600 sm:text-base">
          {capabilityInterpretation}
        </p>
        <div className="mt-6">
          <Quote>{capabilityHeadline}</Quote>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-7">
          <h3 className="text-xl font-semibold text-ink">
            {pairedConsistency.title}
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
            {pairedConsistency.description}
          </p>
          <ul className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
            {pairedConsistency.rows.map((row) => (
              <li
                key={row.label}
                className="flex min-h-12 flex-col items-start justify-between gap-2 py-3 sm:flex-row sm:items-center"
              >
                <span className="text-sm leading-6 text-slate-700">
                  {row.label}
                </span>
                <span className="font-mono text-sm font-semibold tabular-nums text-ink">
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            {pairedConsistency.note}
          </p>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="post-program-experience"
        eyebrow="Result C · Experience"
        title={postProgramExperience.label}
        description={postProgramExperience.note}
      >
        <ResponsiveReportTable
          headers={["Item", "Mean", postProgramExperience.agreementLabel]}
          rows={postProgramExperience.items.map((item) => [
            item.label,
            `${item.mean.toFixed(2)}/5`,
            item.agreement,
          ])}
          align={["left", "right", "right"]}
          label="Tabel indikator pengalaman pasca-program"
        />
        <div className="mt-6">
          <Quote>{postProgramExperience.headline}</Quote>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="steward-intention"
        eyebrow="Result D · Sustainability Intention"
        title={stewardIntention.title}
        description={stewardIntention.question}
      >
        <StewardChart />
        <div className="mt-6">
          <Quote>{stewardIntention.headline}</Quote>
        </div>
        <ul className="mt-5 space-y-2">
          {stewardIntention.interpretation.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm leading-7 text-slate-600"
            >
              <span
                className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <SectionNote>{stewardIntention.sustainabilityNote}</SectionNote>
      </ReportSectionCard>

      <ReportSectionCard
        id="behavioral-outcome"
        eyebrow="Result E · Behavioral Output"
        title="Apa yang Benar-Benar Dibangun"
      >
        <ProcessFlow
          steps={behavioralOutcomeFlow}
          label="Alur output perilaku dari peserta sampai serah terima"
          tone="green"
        />
        <div className="mt-7">
          <Quote>{behavioralOutcomeStatement}</Quote>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5">
            <h3 className="font-semibold leading-6 text-ink">Output</h3>
            <ul className="mt-3 space-y-2">
              {outputVsOutcome.output.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-7 text-slate-600"
                >
                  <CheckCircle
                    className="mt-1.5 h-4 w-4 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5">
            <h3 className="font-semibold leading-6 text-ink">
              Outcome — Students
            </h3>
            <ul className="mt-3 space-y-2">
              {outputVsOutcome.studentOutcome.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-7 text-slate-600"
                >
                  <CheckCircle
                    className="mt-1.5 h-4 w-4 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5">
            <h3 className="font-semibold leading-6 text-ink">
              UMKM Delivery & Early Outcome Signals
            </h3>
            <ul className="mt-3 space-y-2">
              {outputVsOutcome.umkmOutcome.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-7 text-slate-600"
                >
                  <CheckCircle
                    className="mt-1.5 h-4 w-4 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-6 text-slate-500">
              Sustained adoption dan manfaat operasional tetap menunggu data monitoring tindak lanjut.
            </p>
          </article>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="participant-voice"
        eyebrow="Testimoni & Suara Peserta"
        title={participantVoice.title}
        description={participantVoice.description}
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {participantVoice.transformations.map((item) => (
            <li
              key={item.from}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3"
            >
              <span className="text-sm leading-6 text-slate-500 line-through decoration-slate-300">
                {item.from}
              </span>
              <span aria-hidden="true" className="font-mono text-slate-400">
                →
              </span>
              <span className="text-sm font-semibold leading-6 text-brand-900">
                {item.to}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8 border-t border-slate-200 pt-7">
          <h3 className="text-xl font-semibold text-ink">
            Refleksi {reflectionCoverage.completed}/{reflectionCoverage.total}{" "}
            peserta
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
            {featuredReflectionsNote}
          </p>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {featuredReflections.map((reflection) => (
              <li
                key={reflection.id}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold leading-6 text-ink">
                    {reflection.name}
                  </p>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-slate-500">
                    Insight
                  </span>
                </div>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  {reflection.team}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {reflection.insight}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-7">
          <h3 className="text-xl font-semibold text-ink">
            Tema refleksi peserta
          </h3>
          <div className="mt-5 grid gap-4">
            {reflectionThemes.map((theme) => (
              <article
                key={theme.number}
                className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5"
              >
                <span className="font-mono text-sm font-semibold text-brand">
                  {theme.number}
                </span>
                <h4 className="mt-3 text-lg font-semibold leading-7 text-ink">
                  {theme.title}
                </h4>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {theme.description}
                </p>
                {theme.before && theme.after ? (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                      <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                        Sebelum
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {theme.before.map((item) => (
                          <li
                            key={item}
                            className="text-sm leading-6 text-slate-600"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-brand-100 bg-brand-50/60 p-4">
                      <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-brand">
                        Sesudah
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {theme.after.map((item) => (
                          <li
                            key={item}
                            className="text-sm leading-6 text-brand-900"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="impact-documentation"
        eyebrow="Documentation"
        title="Dokumentasi Dampak dan Pelaksanaan"
        description="Dokumentasi visual membantu pembaca menghubungkan perubahan peserta dengan proses workshop, co-creation, build, pitching, dan stakeholder engagement yang benar-benar berlangsung."
      >
        <dl className="grid gap-3 sm:grid-cols-3">
          {[
            {
              value: impactDocumentationSummary.eventPhotos,
              label: "Curated event photos",
            },
            {
              value: impactDocumentationSummary.systemScreens,
              label: "Functional system screens",
            },
            {
              value: impactDocumentationSummary.evidenceFiles,
              label: "Public evidence files",
            },
          ].map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
            >
              <dt className="text-xs font-semibold leading-5 text-slate-600">
                {metric.label}
              </dt>
              <dd className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-brand-900">
                <AnimatedNumber value={metric.value} />
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-6">
          <MediaLightbox
            title="Dokumentasi Impact Report"
            items={impactDocumentationHighlights.map((item) => ({
              ...item,
              label: item.caption,
            }))}
            sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1279px) 28vw, 22rem"
          />
        </div>
        <div className="report-no-print mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Link
            href="/ai-co-creation-lab-makassar/progress/process-documentation"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-brand-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand-50 sm:w-auto"
          >
            Lihat Process Documentation
          </Link>
          <a
            href={impactDocumentationSummary.fullDocumentationHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 sm:w-auto"
          >
            <OpenNewWindow className="h-4 w-4" aria-hidden="true" />
            Buka Dokumentasi Lengkap
            <span className="sr-only"> (terbuka di tab baru)</span>
          </a>
        </div>
        <SectionNote>{impactDocumentationSummary.note}</SectionNote>
      </ReportSectionCard>

      <ReportSectionCard
        id="impact-evidence-files"
        eyebrow="Evidence"
        title={impactEvidenceIntro.title}
        description={impactEvidenceIntro.description}
      >
        <div className="flex justify-start">
          <StatusChip tone="green">
            {impactEvidenceIntro.reflectionCoverage}
          </StatusChip>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {impactEvidenceFiles.map((asset) => (
            <AssetDownloadCard key={asset.id} asset={asset} />
          ))}
        </div>
        <SectionNote>{impactEvidenceIntro.privacyNote}</SectionNote>
      </ReportSectionCard>

      <ReportSectionCard
        id="measurement-kit-improvement"
        eyebrow="Measurement Kit"
        title="Instrumen untuk Versi Replikasi"
        description="Pembelajaran dari pilot diterjemahkan menjadi perubahan konkret pada instrumen versi berikutnya."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {measurementKitImprovements.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <h3 className="font-semibold leading-6 text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="impact-continuity"
        eyebrow="Continuity"
        title={impactContinuity.title}
        description={impactContinuity.lead}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {impactContinuity.items.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5"
            >
              <h3 className="font-semibold leading-6 text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="sustainability-plan"
        eyebrow="Sustainability Plan"
        title="Empat Lapis Keberlanjutan"
      >
        <div className="grid gap-5">
          {sustainabilityPlan.map((layer) => (
            <article
              key={layer.number}
              className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5 sm:p-6"
            >
              <span className="font-mono text-sm font-semibold text-brand">
                {layer.number}
              </span>
              <h3 className="mt-3 text-xl font-semibold leading-7 text-ink">
                {layer.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {layer.description}
              </p>
              <div className="mt-5">
                <ProcessFlow
                  steps={layer.flow}
                  label={`Alur ${layer.title}`}
                  tone="blue"
                />
              </div>
              {"supportFlow" in layer ? (
                <div className="mt-4">
                  <p className="mb-3 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                    Didukung oleh
                  </p>
                  <ProcessFlow
                    steps={layer.supportFlow}
                    label="Dukungan DekatLokal untuk technical steward"
                    tone="slate"
                  />
                </div>
              ) : null}
            </article>
          ))}
        </div>
        <div className="mt-7">
          <Quote>{sustainabilityStatement}</Quote>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="replication-interest"
        eyebrow="Replication"
        title={replicationInterest.title}
        description={replicationInterest.lead}
      >
        <div className="flex justify-start">
          <StatusChip tone="blue">{replicationInterest.label}</StatusChip>
        </div>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {replicationInterest.items.map((item) => (
            <li
              key={item.party}
              className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5"
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white p-2">
                  <Image
                    src={item.logo.src}
                    alt={item.logo.alt}
                    fill
                    sizes="48px"
                    className="object-contain p-2"
                  />
                </span>
                <p className="font-semibold leading-6 text-ink">{item.party}</p>
              </div>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {item.note}
              </p>
              <p className="mt-3 inline-flex rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-slate-600">
                {item.status}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-7">
          <Quote>{replicationInterest.statement}</Quote>
        </div>
        <SectionNote>{replicationInterest.caution}</SectionNote>
      </ReportSectionCard>

      <ReportSectionCard
        id="replication-kit"
        eyebrow="Replication Kit"
        title={replicationKitVersion}
        description="Lima aset yang menjadikan pilot pertama dapat dijalankan kembali oleh pihak lain."
      >
        <PlaybookCard />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {replicationKitAssets.map((asset) => (
            <article
              key={asset.id}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                {asset.number} · {asset.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {asset.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {asset.contents.map((content) => (
                  <li
                    key={content}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
                  >
                    {content}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="partners-and-volunteers"
        eyebrow="Partners & People"
        title="Ekosistem di Balik Pilot Pertama"
        description={partnerNetworkNote}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {partnerNetworkGroups.map((group) => (
            <article
              key={group.id}
              className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5"
            >
              <h3 className="font-semibold leading-6 text-ink">
                {group.title}
              </h3>
              <ul className="mt-3 space-y-3">
                {group.partners.map((partner) => (
                  <li
                    key={partner.id}
                    className="flex min-w-0 gap-3 rounded-xl border border-slate-200 bg-white p-3"
                  >
                    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-white p-1.5">
                      <Image
                        src={partner.logo.src}
                        alt={partner.logo.alt}
                        width={partner.logo.width}
                        height={partner.logo.height}
                        sizes="48px"
                        className="h-full w-full object-contain"
                      />
                    </span>
                    <div className="min-w-0">
                      <p className="break-words text-sm font-semibold leading-6 text-ink">
                        {partner.name}
                      </p>
                      <p className="text-xs font-semibold text-brand-800">
                        {partner.role}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {partner.support}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 border-t border-slate-200 pt-7">
          <h3 className="text-xl font-semibold text-ink">
            <AnimatedNumber value={supportTeamSummary.count} />{" "}
            {supportTeamSummary.title}
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
            {supportTeamSummary.description}
          </p>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {supportTeam.map((volunteer) => (
              <li
                key={volunteer.id}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <p className="text-sm font-semibold leading-6 text-ink">
                  {volunteer.name}
                </p>
                <p className="text-xs leading-5 text-slate-500">
                  {volunteer.university}
                </p>
                <p className="mt-1 text-xs font-semibold text-brand-800">
                  {volunteer.role}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}

/* -------------------------------------------------------------------------- */
/* Leadership reflection                                                      */
/* -------------------------------------------------------------------------- */

export function LeadershipReflectionReportPage() {
  return (
    <GepProgressReportShell
      header={leadershipReflectionHeader}
      progressDescription={
        weekFourReportCopy.leadershipReflection.progressDescription
      }
      outputs={weekFourReportCopy.leadershipReflection.outputs}
      reflection={weekFourReportCopy.leadershipReflection.reflection}
    >
      <ReportSectionCard
        id="reflection-essay"
        eyebrow="Leadership Reflection Essay"
        title={leadershipReflectionEssay.title}
        description={`${leadershipReflectionOwner.name} · ${leadershipReflectionOwner.role}`}
      >
        <p className="text-lg leading-8 text-slate-700">
          {leadershipReflectionEssay.lead}
        </p>

        <div className="mt-8 space-y-8">
          {leadershipReflectionEssay.sections.map((section) => (
            <section key={section.number}>
              <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-brand">
                {section.number}
              </p>
              <h3 className="mt-2 text-balance text-xl font-semibold leading-8 tracking-[-0.025em] text-ink sm:text-2xl">
                {section.title}
              </h3>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-[0.94rem] leading-8 text-slate-700 sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.pullQuote ? (
                <div className="mt-5">
                  <Quote>{section.pullQuote}</Quote>
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="reflection-questions"
        eyebrow="Questions I Now Ask First"
        title="Tiga Pertanyaan Sebelum Membangun"
      >
        <ol className="grid gap-4 md:grid-cols-3">
          {leadershipReflectionQuestions.map((question, index) => (
            <li
              key={question}
              className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
            >
              <span className="font-mono text-sm font-semibold text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 font-semibold leading-7 text-ink">{question}</p>
            </li>
          ))}
        </ol>
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}

/* -------------------------------------------------------------------------- */
/* Final presentation                                                         */
/* -------------------------------------------------------------------------- */

// No `label` on purpose: each slide already carries its own title and footer,
// so an overlay chip would sit on top of the artwork.
const deckSlides: readonly LightboxMediaItem[] = finalPresentationSlides.map(
  (slide) => ({
    src: `${finalDeckAsset.slideBasePath}/slide-${slide.number}.webp`,
    width: 1920,
    height: 1080,
    alt: `Slide ${slide.number} — ${slide.title}: ${slide.headline}`,
  }),
);

function DeckViewer() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900">
      <MediaLightbox
        title={finalDeckAsset.title}
        items={deckSlides}
        mode="document"
        downloadUrl={finalDeckAsset.pdfHref}
        downloadLabel="Download PDF"
        triggerLabel="Buka slide dalam mode layar penuh"
        triggerClassName="relative block w-full overflow-hidden bg-slate-900"
        imageClassName="h-auto w-full object-contain"
        sizes="(max-width: 1023px) calc(100vw - 3rem), 60rem"
        showInlineNavigation
        showDots
        enableSwipe
      />
    </div>
  );
}

export function FinalPresentationReportPage() {
  return (
    <GepProgressReportShell
      header={finalPresentationHeader}
      progressDescription={
        weekFourReportCopy.finalPresentation.progressDescription
      }
      outputs={weekFourReportCopy.finalPresentation.outputs}
      reflection={weekFourReportCopy.finalPresentation.reflection}
    >
      <ReportSectionCard
        id="final-presentation-deck"
        eyebrow="Deck"
        title={finalDeckAsset.title}
        description={finalDeckAsset.description}
      >
        <div className="flex flex-wrap items-center gap-3">
          <StatusChip tone={finalDeckAsset.statusTone}>
            {finalDeckAsset.status}
          </StatusChip>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-slate-600">
            {finalDeckAsset.kind}
          </span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-slate-600">
            <AnimatedNumber value={finalDeckAsset.slideCount} /> slide ·{" "}
            {finalDeckAsset.ratio}
          </span>
        </div>

        <div className="mt-6">
          <DeckViewer />
        </div>

        <div className="report-no-print mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <a
            href={finalDeckAsset.pdfHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-600 sm:w-auto"
          >
            <OpenNewWindow className="h-4 w-4" aria-hidden="true" />
            View Deck
            <span className="sr-only"> (terbuka di tab baru)</span>
          </a>
          <a
            href={finalDeckAsset.pdfHref}
            download
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand transition hover:-translate-y-0.5 hover:border-brand hover:bg-brand-50 sm:w-auto"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download PDF
          </a>
          <a
            href={finalDeckAsset.pptxHref}
            download
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand sm:w-auto"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download PowerPoint
          </a>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="final-presentation-ten-sections"
        eyebrow="Required Structure"
        title={`${finalPresentationOverview.sectionCount} Bagian Final Presentation`}
        description="Cover berdiri sebagai pembuka; sepuluh bagian wajib berikut dipetakan secara eksplisit ke 15 slide isi."
      >
        <ol className="grid gap-4 md:grid-cols-2">
          {finalPresentationSections.map((section) => (
            <li
              key={section.number}
              className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-sm font-semibold text-brand">
                  {section.number}
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-slate-500">
                  {section.slideRange}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-7 text-ink">
                {section.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {section.purpose}
              </p>
            </li>
          ))}
        </ol>
      </ReportSectionCard>

      <ReportSectionCard
        id="final-presentation-structure"
        eyebrow="GEP Final Presentation"
        title={`Struktur ${finalPresentationOverview.deckLength}`}
        description={finalPresentationOverview.subtitle}
      >
        <ol className="grid gap-4 md:grid-cols-2">
          {finalPresentationSlides.map((slide) => (
            <li
              key={slide.number}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/55 p-5"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm font-semibold text-brand">
                  {slide.number}
                </span>
                <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  {slide.title}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-7 tracking-[-0.02em] text-ink">
                {slide.headline}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {slide.description}
              </p>
              {slide.points.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {slide.points.map((point) => (
                    <li
                      key={point}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}
