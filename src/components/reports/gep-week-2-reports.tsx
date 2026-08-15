import Link from "next/link";

import {
  actionPlanAfter,
  actionPlanBefore,
  actionPlanImprovements,
  corePitchStructure,
  finalActionPlanHeader,
  finalActionPlanPhases,
  globalCommunicationHeader,
  globalCommunicationTopics,
  instagramGlobalCommunicationUrl,
  leadershipProfile,
  pitchDeckMetadata,
  pitchingHeader,
  replicationAssets,
  replicationKit,
  reportCopy,
  reviewerLearnings,
  studentImpactMeasurementIndicators,
  sustainabilityModels,
  umkmImpactMeasurementIndicators,
  weekThreeHeader,
  weekTwoCompletedOutputs,
} from "@/data/gep-week-2-3";

import {
  CheckList,
  EvidenceActions,
  GepProgressReportShell,
  NumberedEditorialList,
  PlannedList,
  ProcessFlow,
  ReportSectionCard,
  StatusChip,
  TransitionCard,
} from "./gep-progress-shared";
import { PitchDeckPreview } from "./pitch-deck-preview";

function PitchDeckEvidence() {
  const href = pitchingHeader.download.href;

  return (
    <ReportSectionCard
      id="pitch-deck"
      eyebrow="Evidence"
      title="Pitch Deck"
      description="File original yang tersedia sudah berbentuk PDF 17 halaman. Website menyajikan salinan byte-for-byte dengan nama publik yang bersih; isi deck tidak diubah."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(17rem,0.55fr)] lg:items-start">
        <PitchDeckPreview
          href={href}
          title="Pratinjau PDF Pitch Deck AI Co-Creation Lab Makassar"
        />
        <div className="min-w-0">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-brand">
                  PDF · 17 pages
                </p>
                <h3 className="mt-2 break-words text-lg font-semibold leading-7 text-ink">
                  AI-Co-Creation-Lab-Makassar-Pitch-Deck.pdf
                </h3>
              </div>
              <StatusChip tone="green">Presented & Reviewed</StatusChip>
            </div>
            <dl className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
              {pitchDeckMetadata.map((item) => (
                <div key={item.label} className="grid gap-1 py-3 sm:grid-cols-[7rem_1fr] sm:gap-3">
                  <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                    {item.label}
                  </dt>
                  <dd className="text-sm font-semibold leading-6 text-slate-800">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-4">
            <EvidenceActions
              viewHref={href}
              viewLabel="View Pitch Deck"
              downloadHref={href}
              downloadLabel="Download Pitch Deck"
              external
            />
          </div>
          <p className="mt-3 text-xs leading-6 text-slate-500">
            Jika pratinjau PDF tidak didukung browser, gunakan tombol View Pitch Deck atau Download Pitch Deck.
          </p>
        </div>
      </div>
    </ReportSectionCard>
  );
}

function ReviewerFeedback() {
  return (
    <ReportSectionCard
      id="reviewer-feedback"
      eyebrow="Reviewer Feedback"
      title="What We Learned From the Review"
      description="Reviewer tidak mengganti konsep mini project. Masukan diarahkan untuk memperjelas apa yang terjadi setelah workshop dan bagaimana model dapat terus digunakan."
    >
      <div className="space-y-5">
        {reviewerLearnings.map((learning) => (
          <article
            key={learning.number}
            className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5 sm:p-6"
          >
            <div className="grid gap-4 sm:grid-cols-[3rem_1fr] sm:gap-5">
              <span className="font-mono text-sm font-semibold text-brand">
                {learning.number}
              </span>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold tracking-[-0.025em] text-ink">
                  {learning.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                  {learning.description}
                </p>
                <div className="mt-5">
                  <ProcessFlow
                    steps={learning.flow}
                    label={`Alur ${learning.title}`}
                    tone={learning.number === "01" ? "green" : "blue"}
                  />
                </div>
                {"secondaryFlow" in learning ? (
                  <div className="mt-3">
                    <ProcessFlow
                      steps={learning.secondaryFlow}
                      label="Alur pengukuran UMKM"
                      tone="slate"
                    />
                  </div>
                ) : null}
                {learning.number === "02" ? (
                  <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    <article className="rounded-xl border border-brand-100 bg-brand-50/55 p-4 sm:p-5">
                      <h4 className="text-sm font-semibold text-brand-900">
                        Student measurement direction
                      </h4>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                        {studentImpactMeasurementIndicators.map((indicator) => (
                          <li key={indicator} className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                            <span>{indicator}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                    <article className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
                      <h4 className="text-sm font-semibold text-ink">
                        UMKM measurement direction
                      </h4>
                      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                        {umkmImpactMeasurementIndicators.map((indicator) => (
                          <li key={indicator} className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
                            <span>{indicator}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>
                ) : null}
                <blockquote className="mt-5 border-l-2 border-brand pl-4 text-sm font-semibold leading-7 text-brand-900 sm:text-base">
                  {learning.insight}
                </blockquote>
              </div>
            </div>
          </article>
        ))}
      </div>
    </ReportSectionCard>
  );
}

export function PitchingMiniProjectReportPage() {
  return (
    <GepProgressReportShell
      header={pitchingHeader}
      progressDescription={reportCopy.pitching.progressDescription}
      outputs={reportCopy.pitching.outputs}
      reflection={reportCopy.pitching.reflection}
    >
      <PitchDeckEvidence />
      <ReportSectionCard
        id="core-pitch"
        eyebrow="Pitch Summary"
        title="Core Pitch Structure"
        description="Enam bagian ini merangkum alur presentasi tanpa menduplikasi seluruh isi deck."
      >
        <NumberedEditorialList items={corePitchStructure} />
      </ReportSectionCard>
      <ReviewerFeedback />
      <ReportSectionCard
        id="replication-assets"
        eyebrow="Replication"
        title="Replication Assets"
        description="Konsep aset yang akan membuat model co-creation lebih mudah distandardisasi, digunakan kembali, dan ditingkatkan. Label Planned dipertahankan sampai file final tersedia."
      >
        <PlannedList items={replicationAssets} />
        <blockquote className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/60 p-5 text-base font-semibold leading-8 text-brand-900 sm:p-6 sm:text-lg">
          The goal is not to repeat the same event. The goal is to make the model repeatable.
        </blockquote>
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}

function BeforeAfterPlan() {
  return (
    <ReportSectionCard
      id="before-after-review"
      eyebrow="Review Decision"
      title="What Changed After the Review?"
      description="Konsep utamanya tetap AI Co-Creation Lab Makassar. Yang berubah adalah kedalaman rencana setelah prototype dibuat."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-slate-50/65 p-5 sm:p-6">
          <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.13em] text-slate-500">
            Before Review · Initial Plan
          </p>
          <div className="mt-5">
            <ProcessFlow steps={actionPlanBefore} label="Initial plan" tone="slate" />
          </div>
        </article>
        <article className="rounded-2xl border border-brand-200 bg-brand-50/60 p-5 sm:p-6">
          <p className="font-mono text-[0.64rem] font-semibold uppercase tracking-[0.13em] text-brand">
            After Review · Improved Plan
          </p>
          <div className="mt-5">
            <ProcessFlow steps={actionPlanAfter} label="Improved plan" />
          </div>
        </article>
      </div>
    </ReportSectionCard>
  );
}

function ActionPlanImprovements() {
  return (
    <ReportSectionCard
      id="three-improvements"
      eyebrow="Three Improvements"
      title="Three Improvements After Review"
    >
      <ol className="grid gap-4 lg:grid-cols-3">
        {actionPlanImprovements.map((improvement) => (
          <li
            key={improvement.number}
            className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5 sm:p-6"
          >
            <span className="font-mono text-sm font-semibold text-brand">
              {improvement.number}
            </span>
            <h3 className="mt-3 text-xl font-semibold leading-8 tracking-[-0.025em] text-ink">
              {improvement.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {improvement.before}
            </p>
            <p className="mt-4 border-l-2 border-brand pl-4 text-sm font-semibold leading-7 text-brand-900">
              {improvement.after}
            </p>
          </li>
        ))}
      </ol>
    </ReportSectionCard>
  );
}

function SustainabilityModel() {
  return (
    <ReportSectionCard
      id="sustainability-model"
      eyebrow="Sustainability"
      title="Three Levels of Sustainability"
      description="Keberlanjutan dibangun pada solusi, dampak, dan model program—bukan hanya memastikan sistem tetap online."
    >
      <div className="space-y-4">
        {sustainabilityModels.map((model, index) => (
          <article
            key={model.title}
            className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50/55 p-5 lg:grid-cols-[12rem_1fr] lg:items-center"
          >
            <div>
              <span className="font-mono text-xs font-semibold text-brand">
                0{index + 1}
              </span>
              <h3 className="mt-1.5 text-base font-semibold leading-6 text-ink">
                {model.title}
              </h3>
            </div>
            <ProcessFlow steps={model.steps} label={model.title} tone={index === 0 ? "green" : "blue"} />
          </article>
        ))}
      </div>
    </ReportSectionCard>
  );
}

function FinalActionTimeline() {
  return (
    <ReportSectionCard
      id="final-action-plan"
      eyebrow="Final Plan"
      title="Final Action Plan"
      description="Sembilan fase menghubungkan validasi awal hingga model yang siap didokumentasikan dan direplikasi."
    >
      <ol className="relative space-y-0 before:absolute before:bottom-5 before:left-[0.7rem] before:top-5 before:w-px before:bg-brand-100 sm:before:left-[0.82rem]">
        {finalActionPlanPhases.map((phase) => (
          <li
            key={phase.number}
            className="relative grid grid-cols-[1.45rem_1fr] gap-3 pb-5 last:pb-0 sm:grid-cols-[1.7rem_1fr] sm:gap-4"
          >
            <span className="relative z-10 mt-4 inline-flex h-6 w-6 items-center justify-center rounded-full border-4 border-white bg-brand font-mono text-[0.48rem] font-semibold text-white sm:h-7 sm:w-7">
              {phase.number}
            </span>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/55 p-4 sm:p-5">
              <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-brand">
                Phase {phase.number}
              </p>
              <h3 className="mt-1.5 text-lg font-semibold text-ink">{phase.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{phase.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </ReportSectionCard>
  );
}

export function FinalActionPlanReportPage() {
  return (
    <GepProgressReportShell
      header={finalActionPlanHeader}
      progressDescription={reportCopy.actionPlan.progressDescription}
      outputs={reportCopy.actionPlan.outputs}
      reflection={reportCopy.actionPlan.reflection}
    >
      <BeforeAfterPlan />
      <ActionPlanImprovements />
      <ReportSectionCard
        id="replication-kit"
        eyebrow="Pilot to Model"
        title="AI Co-Creation Lab Playbook v1.0 & Replication Kit"
        description="AI Co-Creation Lab Makassar becomes the first pilot — not the final destination."
      >
        <PlannedList items={replicationKit} />
      </ReportSectionCard>
      <SustainabilityModel />
      <FinalActionTimeline />
    </GepProgressReportShell>
  );
}

function GlobalCommunicationVideo() {
  const videoHref = globalCommunicationHeader.download.href;

  return (
    <ReportSectionCard
      id="global-communication-video"
      eyebrow="Video Evidence"
      title="My Leadership Journey"
      description="Video original berdurasi 1 menit 56 detik, disajikan tanpa autoplay dan tanpa recompression. Native player menyediakan play, pause, seek, volume, dan fullscreen sesuai dukungan browser."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(16rem,0.65fr)_minmax(0,1.35fr)] lg:items-center">
        <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-[0_18px_42px_rgba(1,34,98,0.12)]">
          <video
            controls
            preload="metadata"
            playsInline
            className="aspect-[9/16] h-auto w-full bg-black object-contain"
            aria-label="Video Global Communication My Leadership Journey"
            aria-describedby="video-content-summary-heading"
          >
            <source src={videoHref} type="video/mp4" />
            Browser Anda tidak mendukung pemutar video HTML5. Silakan unduh video melalui tombol di bawah.
          </video>
        </div>
        <div className="min-w-0">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/65 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-brand">
                  MP4 · 01:56 · Portrait
                </p>
                <h3 className="mt-2 break-words text-lg font-semibold leading-7 text-ink">
                  my-leadership-journey.mp4
                </h3>
              </div>
              <StatusChip tone="green">Published</StatusChip>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Global Communication merupakan bagian dari Global Experience Program. Video membahas enam konteks secara ringkas dalam bahasa asing.
            </p>
            <div className="mt-5">
              <CheckList items={globalCommunicationTopics} />
            </div>
          </div>
          <div className="mt-4">
            <EvidenceActions
              viewHref={instagramGlobalCommunicationUrl}
              viewLabel="Watch on Instagram"
              downloadHref={videoHref}
              downloadLabel="Download Video"
              external
            />
          </div>
        </div>
      </div>
    </ReportSectionCard>
  );
}

function LeadershipJourneySummary() {
  return (
    <ReportSectionCard
      id="video-content-summary"
      eyebrow="Content Summary"
      title="Leadership Is a Decision to Respond"
    >
      <div className="divide-y divide-slate-200 border-y border-slate-200">
        <section className="grid gap-3 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6 sm:py-6">
          <h3 className="text-base font-semibold text-ink">Introduction</h3>
          <div>
            <p className="text-xl font-semibold tracking-[-0.025em] text-ink">
              {leadershipProfile.name}
            </p>
            <p className="mt-1 text-sm leading-7 text-slate-600">{leadershipProfile.education}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {leadershipProfile.roles.map((role) => (
                <li key={role} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="grid gap-3 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6 sm:py-6">
          <h3 className="text-base font-semibold text-ink">Leadership Journey</h3>
          <div>
            <p className="text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
              {leadershipProfile.turningPoint}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {leadershipProfile.values.map((value) => (
                <li key={value} className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-900">
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="grid gap-3 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6 sm:py-6">
          <h3 className="text-base font-semibold text-ink">Mini Project</h3>
          <div>
            <p className="text-lg font-semibold text-brand-900">AI Co-Creation Lab Makassar</p>
            <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
              Program kolaborasi mahasiswa dan UMKM untuk memahami real business problems dan membangun simple digital solutions menggunakan technology dan AI.
            </p>
          </div>
        </section>
        <section className="grid gap-3 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6 sm:py-6">
          <h3 className="text-base font-semibold text-ink">Personal Mission</h3>
          <p className="text-sm font-semibold leading-7 text-brand-900 sm:text-base sm:leading-8">
            {leadershipProfile.mission}
          </p>
        </section>
      </div>
      <blockquote className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/65 p-5 text-lg font-semibold leading-8 text-brand-900 sm:p-6 sm:text-xl">
        “{leadershipProfile.closing}”
      </blockquote>
    </ReportSectionCard>
  );
}

function WeekTwoCompletion() {
  return (
    <ReportSectionCard
      id="week-two-completed"
      eyebrow="Completion Summary"
      title="Week 2 — Completed"
      description="Lima output Week 2 kini terhubung sebagai satu rangkaian evidence dan keputusan."
    >
      <CheckList items={weekTwoCompletedOutputs} />
      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-brand-200 bg-brand-50/65 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-brand">
            Next Progress
          </p>
          <p className="mt-2 text-xl font-semibold tracking-[-0.025em] text-brand-900">
            Week 3 — Lead The Action
          </p>
        </div>
        <Link
          href={weekThreeHeader.route}
          className="report-no-print inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-600 sm:w-auto"
        >
          Explore Week 3
        </Link>
      </div>
    </ReportSectionCard>
  );
}

export function GlobalCommunicationReportPage() {
  return (
    <GepProgressReportShell
      header={globalCommunicationHeader}
      progressDescription={reportCopy.globalCommunication.progressDescription}
      outputs={reportCopy.globalCommunication.outputs}
      reflection={reportCopy.globalCommunication.reflection}
      afterSummary={
        <TransitionCard
          eyebrow="Next"
          title="Week 3 — Lead The Action"
          description="Turning plans into action through leadership conversations, implementation, network mobilization, and documented impact."
          href={weekThreeHeader.route}
          label="Explore Week 3"
        />
      }
    >
      <GlobalCommunicationVideo />
      <LeadershipJourneySummary />
      <WeekTwoCompletion />
    </GepProgressReportShell>
  );
}
