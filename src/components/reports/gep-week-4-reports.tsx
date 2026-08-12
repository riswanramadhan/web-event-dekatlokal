import Link from "next/link";

import {
  completeProgramJourney,
  finalPresentationEvidence,
  finalPresentationFileCapabilities,
  finalPresentationHeader,
  finalPresentationReadiness,
  finalPresentationSections,
  fiveSolutionMonitoring,
  fiveUmkmImpactFrameworks,
  fourWeekProgressFlow,
  impactMeasurementHeader,
  impactMeasurementStatement,
  impactPlannedTargets,
  impactPurpose,
  impactReportEvidence,
  impactReportPlannedContents,
  impactTargetResultRows,
  leadershipReflectionEvidence,
  leadershipReflectionHeader,
  leadershipReflectionOwner,
  leadershipReflectionSections,
  leadershipReflectionThemes,
  monitoringCompletedContextFlow,
  monitoringContextQuote,
  monitoringFramework,
  monitoringNextContextFlow,
  monitoringPendingMessage,
  monitoringPurpose,
  monitoringReportOutline,
  pilotStatements,
  programSustainability,
  projectCompletionMonitoringHeader,
  projectMonitoringReportEvidence,
  replicationAssets,
  replicationStatements,
  solutionSustainabilityAssets,
  solutionSustainabilityFlow,
  studentImpactJourney,
  studentImpactMeasurementAreas,
  studentMeasurementFields,
  studentMeasurementPlaceholder,
  studentMeasurementTimeline,
  sustainabilitySection,
  umkmImpactJourney,
  umkmImpactMeasurementAreas,
  umkmMeasurementTimeline,
  weekFourClosingNarrative,
  weekFourFinalJourney,
  weekFourFinalJourneySubtitle,
  weekFourGuidingQuestions,
  weekFourHeader,
  weekFourOverview,
  weekFourProgressCards,
  weekFourReportCopy,
  weekFourStatusOverview,
  type EvidenceFileData,
} from "@/data/gep-week-4";

import {
  EvidenceEmptyState,
  EvidenceFileCard,
  GepProgressReportShell,
  NumberedEditorialList,
  PlannedList,
  ProcessFlow,
  ReportSectionCard,
  StatusChip,
} from "./gep-progress-shared";

function PreparedEvidence({ evidence }: { evidence: EvidenceFileData }) {
  const viewHref =
    evidence.viewAction.enabled && evidence.viewAction.href
      ? evidence.viewAction.href
      : null;
  const downloadHref =
    evidence.downloadAction.enabled && evidence.downloadAction.href
      ? evidence.downloadAction.href
      : null;

  return (
    <div className="space-y-4">
      <EvidenceFileCard
        title={evidence.title}
        fileName={evidence.fileName}
        type={evidence.fileType}
        description={evidence.description}
        status={evidence.status}
        date={evidence.date}
        fileSize={evidence.fileSize}
        previewHref={evidence.previewHref}
        slideCount={evidence.slideCount}
        lastUpdated={evidence.lastUpdated}
        viewHref={viewHref}
        downloadHref={downloadHref}
        viewLabel={evidence.viewAction.label}
        downloadLabel={evidence.downloadAction.label}
        statusTone={evidence.statusTone}
      />
      <EvidenceEmptyState
        title={evidence.emptyTitle}
        description={evidence.emptyDescription}
      />
    </div>
  );
}

function Quote({ children }: { children: string }) {
  return (
    <blockquote className="border-l-2 border-brand pl-4 text-base font-semibold leading-8 text-brand-900 sm:text-lg">
      {children}
    </blockquote>
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
              Open progress detail <span aria-hidden="true">→</span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

function SustainabilityAndReplication() {
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

      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5 sm:p-6">
          <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-brand">
            01 · Solution Sustainability
          </p>
          <h3 className="mt-2 text-xl font-semibold text-ink">
            Keep each solution useful
          </h3>
          <div className="mt-5">
            <ProcessFlow
              steps={solutionSustainabilityFlow}
              label="Solution sustainability flow"
              tone="green"
            />
          </div>
          <ul className="mt-5 grid gap-3">
            {solutionSustainabilityAssets.map((asset) => (
              <li
                key={asset.title}
                className="flex min-h-12 items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700"
              >
                <span>{asset.title}</span>
                <StatusChip
                  tone={asset.status === "In Progress" ? "amber" : "neutral"}
                >
                  {asset.status}
                </StatusChip>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5 sm:p-6">
          <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-brand">
            02 · Program Sustainability
          </p>
          <h3 className="mt-2 text-xl font-semibold text-ink">
            Pilot 1 for a reusable model
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {programSustainability.description}
          </p>
          <div className="mt-5">
            <ProcessFlow
              steps={programSustainability.flow}
              label="Program sustainability flow"
              tone="blue"
            />
          </div>
        </article>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-ink">Replication assets</h3>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
          Semua kartu di bawah adalah konsep kerja. Tidak ada file unduhan yang
          dianggap final sebelum paketnya benar-benar tersedia.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {replicationAssets.map((asset) => (
            <article
              key={asset.id}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
                <div>
                  <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                    {asset.title}
                  </p>
                  <h4 className="mt-2 font-semibold leading-6 text-ink">
                    {asset.name}
                  </h4>
                </div>
                <StatusChip
                  tone={asset.status.includes("Available") ? "blue" : "neutral"}
                >
                  {asset.status}
                </StatusChip>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {asset.description}
              </p>
              {asset.contents.length > 0 ? (
                <div className="mt-4">
                  <ProcessFlow
                    steps={asset.contents}
                    label={`${asset.title} planned content`}
                    tone="slate"
                  />
                </div>
              ) : null}
              {"availabilityNote" in asset ? (
                <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-6 text-slate-600">
                  {asset.availabilityNote}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Quote>{replicationStatements.join(" ")}</Quote>
        <Quote>{pilotStatements.join(" ")}</Quote>
      </div>
    </ReportSectionCard>
  );
}

function PresentationReadiness() {
  return (
    <ReportSectionCard
      id="final-presentation-readiness"
      eyebrow="Readiness"
      title="Final Presentation Readiness"
      description="Status ini mengukur kesiapan bahan presentasi, bukan menyatakan bahwa final deck telah selesai."
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

export function WeekFourHubReportPage() {
  return (
    <GepProgressReportShell
      header={weekFourHeader}
      progressDescription={weekFourReportCopy.hub.progressDescription}
      outputs={weekFourReportCopy.hub.plannedOutputs}
      reflection={weekFourReportCopy.hub.reflection}
      deliverablesState="planned"
    >
      <ReportSectionCard
        id="week-four-direction"
        eyebrow="Measure, Reflect & Sustain"
        title={weekFourOverview.title}
        description={weekFourOverview.description}
      >
        <FourWeekJourney />
        <div className="mt-7 border-t border-slate-200 pt-6">
          <ProcessFlow
            steps={weekFourFinalJourney}
            label="Week 4 final journey"
            tone="blue"
          />
          <p className="mt-4 text-sm font-semibold text-brand-900">
            {weekFourFinalJourneySubtitle}
          </p>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="week-four-progress"
        eyebrow="Progress Cards"
        title="Four Closing Workstreams"
        description={weekFourOverview.subtitle}
      >
        <ProgressCards />
      </ReportSectionCard>

      <ReportSectionCard
        id="week-four-status"
        eyebrow="Current Status"
        title="Week 4 Status Overview"
        description="Status hasil, file, dan refleksi sengaja dipisahkan agar pekerjaan yang belum final tidak terlihat sebagai output selesai."
      >
        <StatusRows />
      </ReportSectionCard>

      <SustainabilityAndReplication />
      <PresentationReadiness />

      <ReportSectionCard
        id="continuing-model"
        eyebrow="Closing Narrative"
        title={weekFourClosingNarrative.title}
        description={weekFourClosingNarrative.tagline}
      >
        <ProcessFlow
          steps={completeProgramJourney}
          label="Complete AI Co-Creation Lab journey"
          tone="slate"
        />
        <ol className="mt-7 grid gap-4 md:grid-cols-3">
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
        <div className="mt-7">
          <Quote>{weekFourClosingNarrative.insight}</Quote>
        </div>
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}

function MonitoringCases() {
  return (
    <div className="grid gap-5">
      {fiveSolutionMonitoring.map((solution, index) => (
        <article
          key={solution.id}
          className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5 sm:p-6"
        >
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
            <div>
              <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-brand">
                Solution {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-ink">
                {solution.businessName}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                <strong className="text-ink">Focus:</strong> {solution.focus}
              </p>
            </div>
            <StatusChip tone="neutral">Monitoring pending</StatusChip>
          </div>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            {solution.fields.map((field) => (
              <div
                key={field.key}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <dt className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  {field.label}
                </dt>
                <dd className="mt-2 text-sm leading-7 text-slate-600">
                  {field.value ?? field.placeholder}
                </dd>
              </div>
            ))}
          </dl>
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
      outputs={weekFourReportCopy.monitoring.plannedOutputs}
      reflection={weekFourReportCopy.monitoring.reflection}
      deliverablesState="planned"
    >
      <ReportSectionCard
        id="monitoring-context"
        eyebrow="Purpose & Context"
        title="From the Build Moment to Real Use"
        description={monitoringPurpose}
      >
        <div className="space-y-6">
          <div>
            <p className="mb-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
              Completed context
            </p>
            <ProcessFlow
              steps={monitoringCompletedContextFlow}
              label="Project phases completed before Week 4"
              tone="slate"
            />
          </div>
          <div>
            <p className="mb-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-brand">
              Week 4 continuation
            </p>
            <ProcessFlow
              steps={monitoringNextContextFlow}
              label="Week 4 monitoring phases"
              tone="blue"
            />
          </div>
          <Quote>{monitoringContextQuote}</Quote>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="monitoring-framework"
        eyebrow="Monitoring Framework"
        title="Six Steps Before an Outcome Claim"
        description="Setiap tahap memiliki fungsi berbeda. Status deployed, handed over, atau adopted hanya akan diisi setelah evidence terverifikasi."
      >
        <NumberedEditorialList items={monitoringFramework} />
      </ReportSectionCard>

      <ReportSectionCard
        id="five-solution-monitoring"
        eyebrow="Five Solution Monitoring"
        title="Five Update-Ready Monitoring Records"
        description={monitoringPendingMessage}
      >
        <MonitoringCases />
      </ReportSectionCard>

      <ReportSectionCard
        id="project-monitoring-report"
        eyebrow="Evidence"
        title="Project Monitoring Report"
        description="File card ini siap diisi tanpa mengubah layout ketika laporan publik yang telah diverifikasi tersedia."
      >
        <PreparedEvidence evidence={projectMonitoringReportEvidence} />
      </ReportSectionCard>

      <ReportSectionCard
        id="monitoring-report-outline"
        eyebrow="Report Structure Preview"
        title="What the Monitoring Report Will Cover"
      >
        <ol className="grid gap-4 md:grid-cols-2">
          {monitoringReportOutline.map((item, index) => (
            <li
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5"
            >
              <span className="font-mono text-xs font-semibold text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}

function MeasurementAreas({
  items,
}: {
  items: readonly { readonly title: string; readonly description: string }[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
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
  );
}

function ImpactFrameworks() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {fiveUmkmImpactFrameworks.map((framework) => (
        <article
          key={framework.id}
          className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5 sm:p-6"
        >
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
            <div>
              <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-brand">
                {framework.label}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-ink">
                {framework.businessName}
              </h3>
            </div>
            <StatusChip tone="neutral">Framework, not result</StatusChip>
          </div>
          <ul className="mt-5 space-y-3">
            {framework.indicators.map((indicator: string) => (
              <li
                key={indicator}
                className="flex gap-3 text-sm leading-7 text-slate-600"
              >
                <span
                  className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                  aria-hidden="true"
                />
                <span>{indicator}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 rounded-xl border border-slate-200 bg-white p-3 text-sm font-semibold text-slate-600">
            {framework.resultStatus}
          </p>
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
      outputs={weekFourReportCopy.impact.plannedOutputs}
      reflection={weekFourReportCopy.impact.reflection}
      deliverablesState="planned"
    >
      <ReportSectionCard
        id="impact-model"
        eyebrow="Purpose"
        title="Measure Change, Not Just Activity"
        description={impactPurpose}
      >
        <Quote>{impactMeasurementStatement}</Quote>
      </ReportSectionCard>

      <ReportSectionCard
        id="student-impact"
        eyebrow="A · Student Impact"
        title="From AI User to Co-Creator"
        description="Framework ini mengukur kemampuan problem solving, pengalaman real-user, building capability, dan kolaborasi."
      >
        <ProcessFlow
          steps={studentImpactJourney}
          label="Student impact journey"
          tone="blue"
        />
        <div className="mt-7">
          <MeasurementAreas items={studentImpactMeasurementAreas} />
        </div>
        <div className="mt-8 border-t border-slate-200 pt-7">
          <h3 className="text-xl font-semibold text-ink">
            Student Measurement Timeline
          </h3>
          <div className="mt-4">
            <ProcessFlow
              steps={studentMeasurementTimeline}
              label="Student measurement timeline"
              tone="slate"
            />
          </div>
          <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {studentMeasurementFields.map((field) => (
              <div
                key={field}
                className="rounded-xl border border-slate-200 bg-slate-50/60 p-4"
              >
                <dt className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  {field}
                </dt>
                <dd className="mt-2 text-sm leading-6 text-slate-600">
                  {studentMeasurementPlaceholder}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="umkm-impact"
        eyebrow="B · UMKM Impact"
        title="From Manual Pain Point to Operational Benefit"
        description="Adoption dan operational benefit belum dianggap tercapai. Keduanya baru dapat dinilai setelah pengujian dan follow-up."
      >
        <ProcessFlow
          steps={umkmImpactJourney}
          label="UMKM impact journey"
          tone="green"
        />
        <div className="mt-7">
          <MeasurementAreas items={umkmImpactMeasurementAreas} />
        </div>
        <div className="mt-8 border-t border-slate-200 pt-7">
          <h3 className="text-xl font-semibold text-ink">
            UMKM Measurement Timeline
          </h3>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {umkmMeasurementTimeline.map((item, index) => (
              <li
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
              >
                <span className="font-mono text-xs font-semibold text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-2 font-semibold text-ink">{item.title}</h4>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
                <p className="mt-3 text-xs font-semibold text-slate-500">
                  No result recorded yet
                </p>
              </li>
            ))}
          </ol>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="five-umkm-impact-indicators"
        eyebrow="Measurement Framework"
        title="Five UMKM Impact Indicator Sets"
        description="Semua indikator berikut adalah potential measurements. Tidak ada angka, deployment, adoption, atau benefit yang dinyatakan sebagai actual result."
      >
        <ImpactFrameworks />
      </ReportSectionCard>

      <ReportSectionCard
        id="impact-target-result"
        eyebrow="Impact Summary"
        title="Planned Target / Actual Result"
        description="Target perencanaan dan hasil monitoring dipisahkan secara visual dan semantik."
      >
        <dl className="overflow-hidden rounded-2xl border border-slate-200">
          {impactTargetResultRows.map((row) => (
            <div
              key={row.plannedTarget}
              className="grid gap-4 border-b border-slate-200 p-4 last:border-b-0 sm:grid-cols-2 sm:p-5"
            >
              <dt>
                <span className="block font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  Planned Target
                </span>
                <span className="mt-2 block font-semibold leading-6 text-ink">
                  {row.plannedTarget}
                </span>
              </dt>
              <dd>
                <span className="block font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                  Actual Result
                </span>
                <span className="mt-2 block text-sm leading-6 text-slate-600">
                  {row.actualResultLabel}
                </span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-xs leading-6 text-slate-500">
          Planned targets: {impactPlannedTargets.join("; ")}. Attendance records
          are not presented here as proof of impact.
        </p>
      </ReportSectionCard>

      <ReportSectionCard
        id="impact-report-evidence"
        eyebrow="Evidence"
        title="AI Co-Creation Lab Impact Report"
        description="Report hanya akan dipublikasikan setelah data outcome selesai dikumpulkan dan diverifikasi."
      >
        <PreparedEvidence evidence={impactReportEvidence} />
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-ink">
            Planned report contents
          </h3>
          <div className="mt-4">
            <PlannedList items={impactReportPlannedContents} label="Planned" />
          </div>
        </div>
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}

export function LeadershipReflectionReportPage() {
  return (
    <GepProgressReportShell
      header={leadershipReflectionHeader}
      progressDescription={
        weekFourReportCopy.leadershipReflection.progressDescription
      }
      outputs={weekFourReportCopy.leadershipReflection.plannedOutputs}
      reflection={weekFourReportCopy.leadershipReflection.reflection}
      deliverablesState="planned"
    >
      <ReportSectionCard
        id="reflection-context"
        eyebrow="Personal Reflection"
        title={`${leadershipReflectionOwner.name} · ${leadershipReflectionOwner.role}`}
        description="Halaman ini baru menyiapkan struktur penulisan. Tidak ada pengalaman, kutipan, atau kesimpulan personal yang ditulis atas nama project lead."
      >
        <EvidenceEmptyState
          title="Reflection will be added after project monitoring"
          description="Final reflection remains intentionally empty until it is written by Riswan Ramadhan."
        />
      </ReportSectionCard>

      <ReportSectionCard
        id="leadership-reflection-structure"
        eyebrow="Reflection Structure"
        title="Seven Sections Ready for Personal Writing"
        description="Prompts membantu mengarahkan refleksi; semua narasi final tetap menunggu input asli project lead."
      >
        <ol className="grid gap-4 md:grid-cols-2">
          {leadershipReflectionSections.map((section) => (
            <li
              key={section.number}
              className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/55 p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-sm font-semibold text-brand">
                  {section.number}
                </span>
                <StatusChip tone="neutral">Placeholder</StatusChip>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">
                {section.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {section.description}
              </p>
              {section.prompts.length > 0 ? (
                <ul
                  className="mt-4 flex flex-wrap gap-2"
                  aria-label={`${section.title} stakeholder prompts`}
                >
                  {section.prompts.map((prompt) => (
                    <li
                      key={prompt}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
                    >
                      {prompt}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>
      </ReportSectionCard>

      <ReportSectionCard
        id="reflection-themes"
        eyebrow="Subtle Prompts"
        title="Reflection Themes"
        description="Tema-tema ini adalah pertanyaan bantu, bukan pernyataan bahwa pengalaman tersebut sudah ditulis atau disimpulkan."
      >
        <PlannedList items={leadershipReflectionThemes} label="Prompt" />
      </ReportSectionCard>

      <ReportSectionCard
        id="reflection-file"
        eyebrow="Evidence"
        title="Leadership Reflection Essay"
      >
        <PreparedEvidence evidence={leadershipReflectionEvidence} />
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}

export function FinalPresentationReportPage() {
  return (
    <GepProgressReportShell
      header={finalPresentationHeader}
      progressDescription={
        weekFourReportCopy.finalPresentation.progressDescription
      }
      outputs={weekFourReportCopy.finalPresentation.plannedOutputs}
      reflection={weekFourReportCopy.finalPresentation.reflection}
      deliverablesState="planned"
    >
      <ReportSectionCard
        id="final-presentation-structure"
        eyebrow="GEP Final Presentation"
        title="Ten-Part Presentation Structure"
        description="The complete journey of AI Co-Creation Lab Makassar. Struktur ini bukan final deck dan belum memiliki slide count."
      >
        <NumberedEditorialList items={finalPresentationSections} />
      </ReportSectionCard>

      <PresentationReadiness />

      <ReportSectionCard
        id="final-presentation-file"
        eyebrow="Evidence"
        title="Final Presentation File"
        description="Komponen file disiapkan untuk metadata dan actions yang akan aktif hanya setelah PDF final tersedia."
      >
        <PreparedEvidence evidence={finalPresentationEvidence} />
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-ink">
            Future file capabilities
          </h3>
          <div className="mt-4">
            <PlannedList
              items={finalPresentationFileCapabilities}
              label="Prepared"
            />
          </div>
        </div>
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}
