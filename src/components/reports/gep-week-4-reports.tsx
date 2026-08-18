import { Calendar, CheckCircle, OpenNewWindow } from "iconoir-react";
import Link from "next/link";

import {
  assessmentCohort,
  behavioralOutcomeFlow,
  behavioralOutcomeStatement,
  capabilityDimensions,
  capabilityInterpretation,
  capabilityJourney,
  capabilityStatement,
  coreVsNonCore,
  featuredReflections,
  featuredReflectionsNote,
  impactMeasurementLayers,
  impactMeasurementPrinciple,
  instrumentRationales,
  knowledgeResult,
  knowledgeScoringRule,
  limitationStatement,
  measurementKitImprovements,
  methodologicalLimitations,
  mixedTeamPurpose,
  pairedConsistency,
  postProgramExperience,
  reflectionCoverage,
  reflectionThemes,
  stewardIntention,
} from "@/data/gep-week-4-assessment";
import {
  beneficiaries,
  finalPresentationFileStatus,
  finalPresentationHeader,
  finalPresentationOverview,
  finalPresentationReadiness,
  finalPresentationSlides,
  fiveMvpStatus,
  followUpPlan,
  fourWeekProgressFlow,
  impactMeasurementHeader,
  impactReportAvailability,
  impactReportContents,
  impactReportPurpose,
  implementationChallenges,
  implementationPhases,
  keyImplementationLearnings,
  leadershipReflectionAvailability,
  leadershipReflectionEssay,
  leadershipReflectionHeader,
  leadershipReflectionOwner,
  leadershipReflectionQuestions,
  monitoringDocumentation,
  monitoringExecutiveSummary,
  monitoringPurpose,
  monitoringReportContents,
  mvpStatusNote,
  nonCoreCount,
  outputVsOutcome,
  partnerNetworkGroups,
  partnerNetworkNote,
  playbookVersioning,
  projectCompletionMonitoringHeader,
  projectMonitoringReportAvailability,
  replicationInterest,
  replicationKitAssets,
  replicationKitVersion,
  replicationStatements,
  supportedHandoverModel,
  supportedHandoverStatement,
  supportTeam,
  supportTeamSummary,
  sustainabilityPlan,
  sustainabilitySection,
  targetAchievementNote,
  targetAchievementPending,
  targetVsAchievement,
  teamDesignNote,
  technicalCoreCount,
  weekFourActiveReasons,
  weekFourBigStory,
  weekFourClosing,
  weekFourFinalNarrative,
  weekFourGuidingQuestions,
  weekFourHeader,
  weekFourOverview,
  weekFourProgressCards,
  weekFourReportCopy,
  weekFourSecondaryCard,
  weekFourStatusOverview,
  weekFourTeamDesign,
  type ReportAvailability,
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
import { ResponsiveReportTable } from "./progress-report";
import { PrintReportButton } from "./report-actions";

const preTone = { label: "PRE", tone: "pre" as const };
const postTone = { label: "POST", tone: "post" as const };
const prePostLegend = [preTone, postTone];

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

function ReportAvailabilityCard({
  availability,
}: {
  availability: ReportAvailability;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
        <div className="min-w-0">
          <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
            Report
          </p>
          <h3 className="mt-2 text-balance text-xl font-semibold leading-7 tracking-[-0.02em] text-ink">
            {availability.title}
          </h3>
        </div>
        <StatusChip tone={availability.statusTone}>
          {availability.status}
        </StatusChip>
      </div>

      <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
        {availability.description}
      </p>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
          <dt className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
            Report status
          </dt>
          <dd className="mt-1.5 text-sm font-semibold leading-6 text-ink">
            {availability.status}
          </dd>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
          <dt className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
            Last updated
          </dt>
          <dd className="mt-1.5 flex items-center gap-2 text-sm font-semibold leading-6 text-ink">
            <Calendar className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            {availability.lastUpdated}
          </dd>
        </div>
      </dl>

      <div className="report-no-print mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <a
          href={availability.viewHref}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-600 sm:w-auto"
        >
          {availability.viewLabel}
        </a>
        <PrintReportButton />
      </div>

      <p className="mt-4 text-xs leading-6 text-slate-500">
        {availability.fileNote}
      </p>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Hub                                                                        */
/* -------------------------------------------------------------------------- */

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

      <div className="mt-8 border-t border-slate-200 pt-7">
        <h3 className="text-xl font-semibold text-ink">{replicationKitVersion}</h3>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
          Lima aset berikut sedang disusun dari pembelajaran pilot pertama. Tidak
          ada paket yang dinyatakan siap diunduh sebelum isinya benar-benar
          selesai.
        </p>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {replicationKitAssets.map((asset) => (
            <li
              key={asset.id}
              className="flex min-h-14 flex-col items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center"
            >
              <span className="font-semibold leading-6 text-ink">
                {asset.title}
              </span>
              <StatusChip tone={asset.statusTone}>{asset.status}</StatusChip>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Quote>{replicationInterest.statement}</Quote>
        </div>
        <p className="report-no-print mt-5 text-sm font-semibold text-brand">
          <Link href={impactMeasurementHeader.route}>
            Baca sustainability plan dan replication pathway lengkap{" "}
            <span aria-hidden="true">→</span>
          </Link>
        </p>
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
        id="week-four-story"
        eyebrow="Big Story"
        title="The Lab is completed. The adoption journey has started."
        description={weekFourBigStory.narrative}
      >
        <ProcessFlow
          steps={weekFourBigStory.journey}
          label="Perjalanan AI Co-Creation Lab dari discover sampai replicate"
          tone="blue"
        />
        <div className="mt-7">
          <Quote>{weekFourBigStory.statement}</Quote>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="week-four-direction"
        eyebrow="Measure, Reflect & Sustain"
        title={weekFourOverview.title}
        description={weekFourOverview.description}
      >
        <FourWeekJourney />
        <div className="mt-7 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-ink">
            Mengapa Week 4 masih berstatus in progress
          </h3>
          <div className="mt-4">
            <CheckList items={weekFourActiveReasons} />
          </div>
        </div>
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
        description="Status setiap deliverable ditulis apa adanya. Bagian yang belum selesai tidak ditampilkan sebagai output final."
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
        <div className="mt-7 space-y-4">
          <Quote>{weekFourClosing.statement}</Quote>
          <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-5 sm:p-6">
            <ul className="space-y-2">
              {weekFourFinalNarrative.closingLines.map((line) => (
                <li
                  key={line}
                  className="text-base font-semibold leading-7 text-brand-900"
                >
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-lg font-semibold tracking-[-0.02em] text-ink">
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

const phaseToneByStatus = {
  Completed: "green",
  Active: "amber",
  Next: "neutral",
} as const;

function ImplementationPhases() {
  return (
    <ol className="grid gap-4 md:grid-cols-2">
      {implementationPhases.map((phase) => (
        <li
          key={phase.number}
          className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/55 p-5"
        >
          <div className="flex items-start justify-between gap-3">
            <span className="font-mono text-sm font-semibold text-brand">
              {phase.number}
            </span>
            <StatusChip tone={phaseToneByStatus[phase.status]}>
              {phase.status}
            </StatusChip>
          </div>
          <h3 className="mt-4 text-lg font-semibold leading-7 text-ink">
            {phase.title}
          </h3>
          <ul className="mt-3 space-y-2">
            {phase.details.map((detail) => (
              <li
                key={detail}
                className="flex gap-3 text-sm leading-7 text-slate-600"
              >
                <span
                  className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                  aria-hidden="true"
                />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

function MvpStatusCards() {
  return (
    <div className="grid gap-5">
      {fiveMvpStatus.map((mvp) => (
        <article
          key={mvp.id}
          className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5 sm:p-6"
        >
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
            <div className="min-w-0">
              <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-brand">
                MVP {mvp.number}
              </p>
              <h3 className="mt-2 text-xl font-semibold leading-7 text-ink">
                {mvp.businessName}
              </h3>
              <p className="mt-1.5 text-sm font-semibold leading-6 text-slate-700">
                {mvp.solution}
              </p>
            </div>
            <StatusChip tone={mvp.statusTone}>{mvp.status}</StatusChip>
          </div>
          <ul className="mt-5 space-y-2">
            {mvp.condition.map((item) => (
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
          <p className="mt-4 rounded-xl border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-700">
            <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
              Next
            </span>
            <span className="mt-1 block">{mvp.next}</span>
          </p>
        </article>
      ))}
    </div>
  );
}

function ImplementationChallenges() {
  return (
    <div className="grid gap-5">
      {implementationChallenges.map((challenge) => (
        <article
          key={challenge.number}
          className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5 sm:p-6"
        >
          <span className="font-mono text-sm font-semibold text-brand">
            Challenge {challenge.number}
          </span>
          <h3 className="mt-3 text-xl font-semibold leading-7 text-ink">
            {challenge.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {challenge.context}
          </p>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <dt className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                Response
              </dt>
              <dd className="mt-2 text-sm leading-7 text-slate-600">
                {challenge.response}
              </dd>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <dt className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                Lesson
              </dt>
              <dd
                className={`mt-2 text-sm leading-7 ${
                  challenge.lessonIsQuote
                    ? "font-semibold text-brand-900"
                    : "text-slate-600"
                }`}
              >
                {challenge.lesson}
              </dd>
            </div>
          </dl>
          {challenge.extra ? (
            <div className="mt-4">
              <ProcessFlow
                steps={challenge.extra}
                label={`Tindak lanjut ${challenge.title}`}
                tone="slate"
              />
            </div>
          ) : null}
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
        id="monitoring-purpose"
        eyebrow="Purpose"
        title="Apa yang Dicatat Laporan Ini"
        description={monitoringPurpose}
      >
        <CheckList items={monitoringReportContents} />
      </ReportSectionCard>

      <ReportSectionCard
        id="monitoring-executive-summary"
        eyebrow="Executive Summary"
        title="Ringkasan Pelaksanaan"
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
      </ReportSectionCard>

      <ReportSectionCard
        id="implementation-progress"
        eyebrow="Implementation Progress"
        title="Delapan Fase Pelaksanaan"
        description="Enam fase telah selesai, satu fase sedang berjalan, dan dua fase berikutnya belum dimulai. Status ditulis apa adanya per fase."
      >
        <ImplementationPhases />
      </ReportSectionCard>

      <ReportSectionCard
        id="five-mvp-status"
        eyebrow="Five MVP Status"
        title="Status Aktual Lima Functional MVP"
        description={mvpStatusNote}
      >
        <MvpStatusCards />
      </ReportSectionCard>

      <ReportSectionCard
        id="target-vs-achievement"
        eyebrow="Target vs Achievement"
        title="Capaian terhadap Target Awal"
      >
        <ResponsiveReportTable
          headers={["Indicator", "Target", "Actual"]}
          rows={targetVsAchievement.map((row) => [
            row.indicator,
            row.target,
            row.actual,
          ])}
          align={["left", "right", "right"]}
          label="Tabel target dan capaian AI Co-Creation Lab Makassar"
        />
        <div className="mt-7">
          <h3 className="text-lg font-semibold text-ink">
            Belum diukur — menunggu pelaksanaan
          </h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-3">
            {targetAchievementPending.map((row) => (
              <li
                key={row.indicator}
                className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-4"
              >
                <p className="font-semibold leading-6 text-ink">
                  {row.indicator}
                </p>
                <p className="mt-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  Target {row.target}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {row.status}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <SectionNote>{targetAchievementNote}</SectionNote>
      </ReportSectionCard>

      <ReportSectionCard
        id="implementation-challenges"
        eyebrow="Challenges"
        title="Empat Kendala dan Cara Menanganinya"
      >
        <ImplementationChallenges />
      </ReportSectionCard>

      <ReportSectionCard
        id="key-learnings"
        eyebrow="Key Learnings"
        title="Lima Pembelajaran Utama Implementasi"
      >
        <NumberedEditorialList items={keyImplementationLearnings} />
      </ReportSectionCard>

      <ReportSectionCard
        id="follow-up-plan"
        eyebrow="Follow-Up Plan"
        title="Rencana Tindak Lanjut"
        description="Urutan ini menjadi acuan kerja DekatLokal setelah laporan ini terbit."
      >
        <ProcessFlow
          steps={followUpPlan}
          label="Rencana tindak lanjut setelah implementation day"
          tone="blue"
        />
      </ReportSectionCard>

      <ReportSectionCard
        id="supported-handover"
        eyebrow="Supported Handover"
        title="Siapa Bertanggung Jawab atas Apa"
        description="Handover tidak diperlakukan sebagai penyerahan sekali jalan, melainkan sebagai pembagian peran yang berkelanjutan."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {supportedHandoverModel.map((role) => (
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
        <div className="mt-7">
          <Quote>{supportedHandoverStatement}</Quote>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="monitoring-documentation"
        eyebrow="Documentation"
        title="Dokumentasi Kegiatan"
        description={monitoringDocumentation.description}
      >
        <div className="flex flex-wrap gap-2">
          {monitoringDocumentation.coverage.map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600"
            >
              {item}
            </span>
          ))}
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
                  <OpenNewWindow className="h-4 w-4 shrink-0" aria-hidden="true" />
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
        id="monitoring-report-file"
        eyebrow="Report"
        title="Project Monitoring Report"
      >
        <ReportAvailabilityCard availability={projectMonitoringReportAvailability} />
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}

/* -------------------------------------------------------------------------- */
/* Impact & sustainability report                                             */
/* -------------------------------------------------------------------------- */

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
              tone: "pre",
            },
            {
              id: "knowledge-post",
              label: "Post-test",
              value: knowledgeResult.post,
              display: knowledgeResult.post.toFixed(2),
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
            tone: "pre" as const,
          },
          {
            id: `${dimension.id}-post`,
            label: "Post",
            value: dimension.post,
            display: dimension.post.toFixed(2),
            tone: "post" as const,
          },
        ],
      }))}
      footnote="Nilai Likert tidak dikonversi menjadi persentase. Angka 4.72 dibaca sebagai 4.72 dari 5, bukan 94.4%."
    />
  );
}

function CoreVsNonCoreCharts() {
  const knowledgeGroups = coreVsNonCore.groups.map((group) => ({
    id: `${group.id}-knowledge`,
    label: `${group.label} · ${group.participants} peserta`,
    bars: [
      {
        id: `${group.id}-knowledge-pre`,
        label: "Pre",
        value: group.knowledgePre,
        display: group.knowledgePre.toFixed(2),
        tone: "pre" as const,
      },
      {
        id: `${group.id}-knowledge-post`,
        label: "Post",
        value: group.knowledgePost,
        display: group.knowledgePost.toFixed(2),
        tone: "post" as const,
      },
    ],
  }));

  const capabilityGroups = coreVsNonCore.groups.map((group) => ({
    id: `${group.id}-capability`,
    label: `${group.label} · perubahan ${group.capabilityGain}`,
    bars: [
      {
        id: `${group.id}-capability-pre`,
        label: "Pre",
        value: group.capabilityPre,
        display: group.capabilityPre.toFixed(2),
        tone: "pre" as const,
      },
      {
        id: `${group.id}-capability-post`,
        label: "Post",
        value: group.capabilityPost,
        display: group.capabilityPost.toFixed(2),
        tone: "post" as const,
      },
    ],
  }));

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <GroupedBarChart
        title="Knowledge — Core vs Non-Core"
        scaleLabel="Skala 0-100"
        max={100}
        legend={prePostLegend}
        groups={knowledgeGroups}
      />
      <GroupedBarChart
        title="Capability — Core vs Non-Core"
        scaleLabel="Skala Likert 1-5 · sumbu digambar dari 0"
        max={5}
        legend={prePostLegend}
        groups={capabilityGroups}
      />
    </div>
  );
}

function StewardChart() {
  const bars: readonly ChartBar[] = stewardIntention.distribution.map(
    (item) => ({
      id: item.id,
      label: item.label,
      value: item.count,
      display: `${item.count} · ${item.share}`,
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
        id="impact-purpose"
        eyebrow="Purpose"
        title="Apa yang Dicatat Laporan Ini"
        description={impactReportPurpose}
      >
        <CheckList items={impactReportContents} />
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
              {beneficiaries.students.value}
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
              {beneficiaries.umkm.value}
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              {beneficiaries.umkm.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {beneficiaries.umkm.names.map((name) => (
                <li
                  key={name}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                >
                  {name}
                </li>
              ))}
            </ul>
          </article>
        </div>
        <SectionNote>{beneficiaries.separationNote}</SectionNote>
      </ReportSectionCard>

      <ReportSectionCard
        id="team-design"
        eyebrow="Team Design"
        title="Lima Tim Campuran, Tujuh Technical Core"
        description={mixedTeamPurpose.description}
      >
        <TeamDesign />
        <div className="mt-7 border-t border-slate-200 pt-6">
          <p className="text-sm leading-7 text-slate-600">
            Komposisi kohort: {technicalCoreCount} technical core dan{" "}
            {nonCoreCount} non-core dari total{" "}
            {assessmentCohort.participants} peserta.
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
      </ReportSectionCard>

      <ReportSectionCard
        id="instrument-design"
        eyebrow="Instrument Design"
        title="Mengapa Instrumennya Disusun Seperti Ini"
        description="Setiap keputusan desain instrumen dijelaskan bersama batasannya, agar hasilnya dibaca sesuai kekuatan alat ukurnya."
      >
        <div className="grid gap-4">
          {instrumentRationales.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5"
            >
              <span className="font-mono text-sm font-semibold text-brand">
                {item.number}
              </span>
              <h3 className="mt-3 text-lg font-semibold leading-7 text-ink">
                {item.question}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {item.summary}
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm leading-6 text-slate-600"
                  >
                    <span
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {item.note ? (
                <p className="mt-4 rounded-xl border border-slate-200 bg-white p-3 text-xs leading-6 text-slate-600">
                  {item.note}
                </p>
              ) : null}
            </article>
          ))}
        </div>
        <div className="mt-7 border-t border-slate-200 pt-6">
          <h3 className="text-lg font-semibold text-ink">
            Journey yang diukur item capability
          </h3>
          <div className="mt-4">
            <ProcessFlow
              steps={capabilityJourney}
              label="Journey capability dari memahami pengguna sampai komunikasi"
              tone="blue"
            />
          </div>
          <SectionNote>{knowledgeScoringRule}</SectionNote>
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
              value: knowledgeResult.pre.toFixed(2),
              caption: "Rata-rata skor sebelum program.",
            },
            {
              label: "Post-test",
              value: knowledgeResult.post.toFixed(2),
              caption: "Rata-rata skor setelah program.",
            },
            {
              label: "Average gain",
              value: knowledgeResult.gainLabel,
              caption: knowledgeResult.participantsIncreasedLabel,
            },
          ]}
        />
        <div className="mt-6">
          <KnowledgeChart />
        </div>
        <ul className="mt-6 space-y-2">
          {knowledgeResult.interpretation.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-7 text-slate-600">
              <span
                className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Quote>{knowledgeResult.headline}</Quote>
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
            headers={["Dimension", "PRE", "POST", "Change"]}
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
          <SectionNote>{pairedConsistency.reading}</SectionNote>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="core-vs-non-core"
        eyebrow="Result C · Inclusion"
        title={coreVsNonCore.title}
        description={coreVsNonCore.label}
      >
        <CoreVsNonCoreCharts />
        <p className="mt-6 text-sm leading-8 text-slate-600 sm:text-base">
          {coreVsNonCore.interpretation}
        </p>
        <div className="mt-6">
          <Quote>{coreVsNonCore.headline}</Quote>
        </div>
        <SectionNote>{coreVsNonCore.disclaimer}</SectionNote>
      </ReportSectionCard>

      <ReportSectionCard
        id="post-program-experience"
        eyebrow="Result D · Experience"
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
      </ReportSectionCard>

      <ReportSectionCard
        id="steward-intention"
        eyebrow="Result E · Sustainability Intention"
        title={stewardIntention.title}
        description={stewardIntention.question}
      >
        <StewardChart />
        <ul className="mt-6 space-y-2">
          {stewardIntention.interpretation.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-7 text-slate-600">
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
        id="qualitative-reflection"
        eyebrow="Result F · Qualitative"
        title={`Refleksi ${reflectionCoverage.completed}/${reflectionCoverage.total} Peserta`}
        description={reflectionCoverage.method}
      >
        <div className="grid gap-4">
          {reflectionThemes.map((theme) => (
            <article
              key={theme.number}
              className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5"
            >
              <span className="font-mono text-sm font-semibold text-brand">
                {theme.number}
              </span>
              <h3 className="mt-3 text-lg font-semibold leading-7 text-ink">
                {theme.title}
              </h3>
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
                        <li key={item} className="text-sm leading-6 text-slate-600">
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
                        <li key={item} className="text-sm leading-6 text-brand-900">
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

        <div className="mt-8 border-t border-slate-200 pt-7">
          <h3 className="text-xl font-semibold text-ink">
            Featured participant reflections
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
                    Parafrase
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
      </ReportSectionCard>

      <ReportSectionCard
        id="behavioral-outcome"
        eyebrow="Behavioral Output"
        title="Apa yang Benar-Benar Dibangun"
      >
        <ProcessFlow
          steps={behavioralOutcomeFlow}
          label="Alur output perilaku dari peserta sampai supported handover"
          tone="green"
        />
        <div className="mt-7">
          <Quote>{behavioralOutcomeStatement}</Quote>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="output-vs-outcome"
        eyebrow="Output vs Outcome"
        title="Memisahkan Hasil Kegiatan dari Perubahan"
      >
        <div className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5">
            <h3 className="font-semibold leading-6 text-ink">Output</h3>
            <ul className="mt-3 space-y-2">
              {outputVsOutcome.output.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-slate-600">
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
              Early outcome — Students
            </h3>
            <ul className="mt-3 space-y-2">
              {outputVsOutcome.studentOutcome.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-slate-600">
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
              Early outcome — UMKM
            </h3>
            <ul className="mt-3 space-y-2">
              {outputVsOutcome.umkmOutcome.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-7 text-slate-600">
                  <CheckCircle
                    className="mt-1.5 h-4 w-4 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-5">
          <h3 className="font-semibold leading-6 text-ink">
            Longer-term outcome to monitor
          </h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {outputVsOutcome.longerTerm.map((item) => (
              <li
                key={item}
                className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700"
              >
                <span>{item}</span>
                <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-slate-500">
                  Not yet
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-6 text-slate-600">
            {outputVsOutcome.longerTermNote}
          </p>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="methodological-limitations"
        eyebrow="Limitations"
        title="Keterbatasan Metodologi"
        description="Batasan ini ditulis agar hasil di atas tidak dibaca melebihi kekuatan datanya."
      >
        <ul className="space-y-2">
          {methodologicalLimitations.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-7 text-slate-600">
              <span
                className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Quote>{limitationStatement}</Quote>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="measurement-kit-improvement"
        eyebrow="Measurement Kit"
        title="Perbaikan untuk Versi Replikasi"
        description="Keterbatasan di atas diterjemahkan menjadi perubahan konkret pada instrumen versi berikutnya."
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
      </ReportSectionCard>

      <ReportSectionCard
        id="replication-interest"
        eyebrow="Replication"
        title={replicationInterest.title}
        description={replicationInterest.description}
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
              <p className="font-semibold leading-6 text-ink">{item.party}</p>
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
      </ReportSectionCard>

      <ReportSectionCard
        id="replication-kit"
        eyebrow="Replication Kit"
        title={replicationKitVersion}
        description="Lima aset yang menjadikan pilot pertama dapat dijalankan kembali oleh pihak lain."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {replicationKitAssets.map((asset) => (
            <article
              key={asset.id}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
                <div className="min-w-0">
                  <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                    {asset.number} · {asset.title}
                  </p>
                  <h3 className="mt-2 font-semibold leading-6 text-ink">
                    {asset.name}
                  </h3>
                </div>
                <StatusChip tone={asset.statusTone}>{asset.status}</StatusChip>
              </div>
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

        <div className="mt-8 border-t border-slate-200 pt-7">
          <h3 className="text-xl font-semibold text-ink">Playbook versioning</h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-3">
            {playbookVersioning.map((version) => (
              <li
                key={version.version}
                className="rounded-2xl border border-slate-200 bg-slate-50/55 p-4"
              >
                <p className="font-mono text-sm font-semibold text-brand">
                  {version.version}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {version.description}
                </p>
                <p className="mt-3 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-slate-500">
                  {version.status}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {replicationStatements.map((statement) => (
              <Quote key={statement.slice(0, 30)}>{statement}</Quote>
            ))}
          </div>
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
                  <li key={partner.id}>
                    <p className="text-sm font-semibold leading-6 text-ink">
                      {partner.name}
                    </p>
                    <p className="text-xs font-semibold text-brand-800">
                      {partner.role}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {partner.support}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 border-t border-slate-200 pt-7">
          <h3 className="text-xl font-semibold text-ink">
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

      <ReportSectionCard
        id="impact-report-file"
        eyebrow="Report"
        title="Impact & Sustainability Report"
      >
        <ReportAvailabilityCard availability={impactReportAvailability} />
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

      <ReportSectionCard
        id="reflection-file"
        eyebrow="Report"
        title="Leadership Reflection Essay"
      >
        <ReportAvailabilityCard availability={leadershipReflectionAvailability} />
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}

/* -------------------------------------------------------------------------- */
/* Final presentation                                                         */
/* -------------------------------------------------------------------------- */

function PresentationReadiness() {
  return (
    <ReportSectionCard
      id="final-presentation-readiness"
      eyebrow="Readiness"
      title="Final Presentation Readiness"
      description="Checklist ini mengukur kesiapan materi per bagian, bukan menyatakan bahwa file deck sudah selesai."
    >
      <ul className="grid gap-3 md:grid-cols-2">
        {finalPresentationReadiness.map((item) => (
          <li
            key={item.title}
            className="flex min-h-16 flex-col items-start justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 sm:flex-row sm:items-center"
          >
            <span className="font-semibold leading-6 text-ink">
              {item.title}
            </span>
            <StatusChip tone={item.tone}>{item.status}</StatusChip>
          </li>
        ))}
      </ul>
    </ReportSectionCard>
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
        <SectionNote>{finalPresentationOverview.note}</SectionNote>
      </ReportSectionCard>

      <PresentationReadiness />

      <ReportSectionCard
        id="final-presentation-file"
        eyebrow="Deck File"
        title={finalPresentationFileStatus.title}
      >
        <article className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              {finalPresentationFileStatus.description}
            </p>
            <StatusChip tone={finalPresentationFileStatus.statusTone}>
              {finalPresentationFileStatus.status}
            </StatusChip>
          </div>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
              <dt className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                Deck status
              </dt>
              <dd className="mt-1.5 text-sm font-semibold leading-6 text-ink">
                {finalPresentationFileStatus.status}
              </dd>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
              <dt className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                Last updated
              </dt>
              <dd className="mt-1.5 flex items-center gap-2 text-sm font-semibold leading-6 text-ink">
                <Calendar
                  className="h-4 w-4 shrink-0 text-brand"
                  aria-hidden="true"
                />
                {finalPresentationFileStatus.lastUpdated}
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-xs leading-6 text-slate-500">
            {finalPresentationFileStatus.note}
          </p>
        </article>
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}
