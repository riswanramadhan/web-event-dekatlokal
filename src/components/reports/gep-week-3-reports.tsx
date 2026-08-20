import { CheckCircle, OpenNewWindow } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";

import { MediaLightbox } from "@/components/reports/media-lightbox";
import {
  aiCoCreationLabRelevance,
  curatedEventDocumentation,
  eventDocumentationDriveUrl,
  eventVideoDocumentation,
  eventVolunteers,
  featuredDocumentationIds,
  fiveFunctionalSolutions,
  fiveUmkmCoCreators,
  fullDocumentationAction,
  implementationOverview,
  implementationSteps,
  leadershipConversationCompletedHeader,
  leadershipDiscussion,
  leadershipInsights,
  meetTheLeaderCompletedHeader,
  meetTheLeaderDocumentation,
  meetTheLeaderDocumentationAction,
  meetTheLeaderProfile,
  miniProjectImplementationCompletedHeader,
  networkMobilizationCompletedHeader,
  networkMobilizationStory,
  networkPartnerGroups,
  networkPurpose,
  networkSummary,
  peopleBehindTheLab,
  processDocumentationCategories,
  processDocumentationCompletedHeader,
  projectFeedbackRecommendations,
  riswanLeadershipReflection,
  studentCoCreatorsIntro,
  studentCoCreationTeams,
  technicalMentors,
  weekFourTransition,
  weekThreeClosingNarrative,
  weekThreeCompletedHeader,
  weekThreeCompletedReportCopy,
  weekThreeCompletedSummary,
  weekThreeInNumbers,
  weekThreeLeadershipConnection,
  weekThreeOverview,
  whyIChoseAyu,
  type WeekThreeImage,
} from "@/data/gep-week-3-completed";

import {
  CheckList,
  GepProgressReportShell,
  ProcessFlow,
  ReportSectionCard,
  StatusChip,
  TransitionCard,
} from "./gep-progress-shared";

function ExternalAction({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="report-no-print inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-600 sm:w-auto"
    >
      <OpenNewWindow className="h-4 w-4 shrink-0" aria-hidden="true" />
      {label}
      <span className="sr-only"> (terbuka di tab baru)</span>
    </a>
  );
}

function QuotePanel({ children }: { children: string }) {
  return (
    <blockquote className="rounded-2xl border border-brand-100 bg-brand-50/70 px-5 py-5 text-base font-semibold leading-8 text-brand-900 sm:px-6 sm:py-6 sm:text-lg">
      “{children}”
    </blockquote>
  );
}

function StatsGrid({
  items,
}: {
  items: readonly { readonly value: string; readonly label: string }[];
}) {
  return (
    <dl className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      {items.map((item) => (
        <div
          key={item.label}
          className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5"
        >
          <dt className="break-words text-xs font-semibold leading-5 text-slate-500">
            {item.label}
          </dt>
          <dd className="mt-2 break-words text-2xl font-semibold tracking-[-0.04em] text-ink sm:text-3xl">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function WeekThreeStatusOverview() {
  return (
    <ReportSectionCard
      id="week-three-progress"
      eyebrow="Week 3 Completed"
      title="Five Connected Actions"
      description="Lead The Action menjadi hub tematik. Lima aktivitas di bawah adalah progress Week 3 yang telah selesai dan dapat dibuka sebagai laporan terpisah."
    >
      <ol className="divide-y divide-slate-200 border-y border-slate-200">
        {weekThreeCompletedSummary.map((item) => (
          <li key={item.slug}>
            <Link
              href={item.route}
              className="group grid min-h-24 gap-3 py-5 transition sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:gap-5 sm:py-6"
            >
              <span className="font-mono text-sm font-semibold text-brand">
                {item.number}
              </span>
              <span className="min-w-0">
                <span className="block text-lg font-semibold leading-7 tracking-[-0.02em] text-ink transition group-hover:text-brand">
                  {item.title}
                </span>
                <span className="mt-1 block text-sm leading-6 text-slate-600">
                  {item.description}
                </span>
              </span>
              <span className="justify-self-start sm:justify-self-end">
                <StatusChip tone="green">{item.status}</StatusChip>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </ReportSectionCard>
  );
}

function WeekThreeNumbers() {
  return (
    <ReportSectionCard
      id="week-three-in-numbers"
      eyebrow="Verified Implementation"
      title="Week 3 in Numbers"
      description="Angka berikut merangkum pelaksanaan Week 3. Angka ini bukan hasil impact, UAT, handover, atau bukti adopsi Week 4."
    >
      <StatsGrid items={weekThreeInNumbers} />
    </ReportSectionCard>
  );
}

function LeadershipJourneyConnection() {
  return (
    <ReportSectionCard
      id="leadership-journey-connection"
      eyebrow="Leadership Journey"
      title={weekThreeLeadershipConnection.insight}
      description="Week 3 tidak hanya tentang menjalankan event, tetapi juga menerjemahkan rencana menjadi praktik kepemimpinan."
    >
      <CheckList items={weekThreeLeadershipConnection.actions} />
      <div className="mt-6 rounded-2xl border border-brand bg-brand p-5 text-white sm:p-7">
        <p className="text-balance text-2xl font-semibold leading-tight tracking-[-0.035em] sm:text-3xl">
          {weekThreeLeadershipConnection.closingTitle}
        </p>
        <p className="mt-3 max-w-3xl text-base font-medium leading-8 text-white/90 sm:text-lg">
          {weekThreeLeadershipConnection.closingSubtitle}
        </p>
      </div>
      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
          <dt className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.11em] text-slate-500">
            Before
          </dt>
          <dd className="mt-2 text-sm font-semibold leading-7 text-ink">
            {weekThreeClosingNarrative.questionBefore}
          </dd>
        </div>
        <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-5">
          <dt className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.11em] text-brand-700">
            Now
          </dt>
          <dd className="mt-2 text-sm font-semibold leading-7 text-brand-900">
            {weekThreeClosingNarrative.questionNow}
          </dd>
        </div>
      </dl>
    </ReportSectionCard>
  );
}

function WeekFourTransition() {
  return (
    <TransitionCard
      eyebrow={weekFourTransition.eyebrow}
      title={weekFourTransition.title}
      description={weekFourTransition.description}
      href={weekFourTransition.href}
      label={weekFourTransition.label}
    />
  );
}

export function WeekThreeHubReportPage() {
  const flow = weekThreeOverview.narrative.split(" → ");

  return (
    <GepProgressReportShell
      header={weekThreeCompletedHeader}
      progressDescription={weekThreeCompletedReportCopy.hub.progressDescription}
      outputs={weekThreeCompletedReportCopy.hub.outputs}
      reflection={null}
      afterSummary={<WeekFourTransition />}
    >
      <ReportSectionCard
        id="week-three-direction"
        eyebrow={weekThreeOverview.eyebrow}
        title={weekThreeOverview.title}
        description="Turning collaboration into action through leadership learning, project implementation, network mobilization, and real documentation."
      >
        <ProcessFlow steps={flow} label="Week 3 completed journey" tone="green" />
      </ReportSectionCard>
      <WeekThreeStatusOverview />
      <WeekThreeNumbers />
      <LeadershipJourneyConnection />
    </GepProgressReportShell>
  );
}

function MeetTheLeaderCarousel() {
  const lightboxItems = meetTheLeaderDocumentation.map((item) => ({
    src: item.src,
    width: item.width,
    height: item.height,
    alt: item.alt,
    objectPosition: item.objectPosition,
  }));

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60">
      <MediaLightbox
        title="Dokumentasi Meet the Leader bersama Ayu Anisela"
        items={lightboxItems}
        showDots
        enableSwipe
        triggerClassName="relative flex w-full justify-center overflow-hidden bg-slate-100"
        imageClassName="aspect-[9/16] max-h-[42rem] h-auto w-auto max-w-full object-cover transition duration-300 group-hover:scale-[1.01]"
        sizes="(max-width: 1023px) calc(100vw - 2.5rem), 60rem"
      />
      <div className="p-4 sm:p-5">
        <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.11em] text-brand">
          3 foto dokumentasi
        </p>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Pilih titik navigasi atau geser pada perangkat sentuh untuk melihat foto berikutnya. Setiap foto dapat dibuka dalam lightbox.
        </p>
      </div>
    </div>
  );
}

export function MeetTheLeaderReportPage() {
  return (
    <GepProgressReportShell
      header={meetTheLeaderCompletedHeader}
      progressDescription={
        weekThreeCompletedReportCopy.meetTheLeader.progressDescription
      }
      outputs={weekThreeCompletedReportCopy.meetTheLeader.outputs}
      reflection={weekThreeCompletedReportCopy.meetTheLeader.reflection}
      afterSummary={<WeekFourTransition />}
    >
      <ReportSectionCard
        id="leader-profile"
        eyebrow="Leader Profile"
        title={meetTheLeaderProfile.sectionTitle}
        description={`${meetTheLeaderProfile.name} · ${meetTheLeaderProfile.role}`}
      >
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <dl className="rounded-2xl border border-brand-100 bg-brand-50/60 p-5 sm:p-6">
            <div>
              <dt className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.11em] text-brand-700">
                Tokoh
              </dt>
              <dd className="mt-2 text-xl font-semibold text-ink">
                {meetTheLeaderProfile.name}
              </dd>
            </div>
            <div className="mt-5 border-t border-brand-100 pt-5">
              <dt className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.11em] text-brand-700">
                Peran
              </dt>
              <dd className="mt-2 text-sm font-semibold leading-7 text-ink">
                {meetTheLeaderProfile.role}
              </dd>
            </div>
            <div className="mt-5 border-t border-brand-100 pt-5">
              <dt className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.11em] text-brand-700">
                Memimpin sejak
              </dt>
              <dd className="mt-2 text-sm font-semibold text-ink">
                {meetTheLeaderProfile.since}
              </dd>
            </div>
          </dl>
          <div className="space-y-4 text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
            {meetTheLeaderProfile.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="why-i-chose-her"
        eyebrow="Leadership Relevance"
        title={whyIChoseAyu.title}
      >
        <QuotePanel>{whyIChoseAyu.quote}</QuotePanel>
        <div className="mt-5 space-y-4 text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
          {whyIChoseAyu.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="meet-the-leader-documentation"
        eyebrow="Documentation"
        title="Meet the Leader Documentation"
        description="Tiga foto aktual pertemuan ditampilkan dari aset lokal teroptimasi; folder sumber tetap dapat dibuka melalui Google Drive."
      >
        <MeetTheLeaderCarousel />
        <div className="mt-5">
          <ExternalAction
            href={meetTheLeaderDocumentationAction.href}
            label={meetTheLeaderDocumentationAction.label}
          />
        </div>
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}

function LeadershipInsights() {
  return (
    <ReportSectionCard
      id="leadership-insights"
      eyebrow="Conversation Learning"
      title="Leadership Insights"
      description="Tiga pembelajaran utama yang ditarik dari percakapan bersama Ayu Anisela."
    >
      <ol className="grid gap-4 lg:grid-cols-3">
        {leadershipInsights.map((insight) => (
          <li
            key={insight.number}
            className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6"
          >
            <span className="font-mono text-xs font-semibold text-brand">
              {insight.number}
            </span>
            <h3 className="mt-2 text-xl font-semibold leading-7 tracking-[-0.025em] text-ink">
              {insight.title}
            </h3>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              {insight.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {insight.points.length > 0 ? (
              <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                {insight.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <CheckCircle
                      className="mt-1 h-4 w-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {insight.statement ? (
              <blockquote className="mt-5 border-l-2 border-brand pl-4 text-sm font-semibold leading-7 text-brand-900">
                “{insight.statement}”
              </blockquote>
            ) : null}
          </li>
        ))}
      </ol>
    </ReportSectionCard>
  );
}

function ProjectFeedback() {
  return (
    <ReportSectionCard
      id="project-feedback"
      eyebrow="Reviewer Feedback"
      title="Feedback for AI Co-Creation Lab"
      description="Empat rekomendasi untuk memastikan pilot dapat digunakan, dipelajari, dan dikembangkan sebagai model yang lebih kuat."
    >
      <ol className="space-y-4">
        {projectFeedbackRecommendations.map((item) => (
          <li
            key={item.number}
            className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6"
          >
            <div className="grid gap-4 sm:grid-cols-[3rem_1fr]">
              <span className="font-mono text-sm font-semibold text-brand">
                {item.number}
              </span>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold leading-7 tracking-[-0.025em] text-ink">
                  {item.title}
                </h3>
                <div className="mt-3 space-y-3 text-sm leading-7 text-slate-600 sm:text-base">
                  {item.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {item.direction.length > 0 ? (
                  <div className="mt-5">
                    <ProcessFlow
                      steps={item.direction}
                      label={`Direction for ${item.title}`}
                      tone="green"
                    />
                  </div>
                ) : null}
                {item.possibleOutput ? (
                  <div className="mt-5 rounded-xl border border-brand-100 bg-white p-4 sm:p-5">
                    <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.11em] text-brand">
                      Possible output
                    </p>
                    <h4 className="mt-2 text-lg font-semibold text-ink">
                      {item.possibleOutput.title}
                    </h4>
                    <div className="mt-4">
                      <CheckList items={item.possibleOutput.contents} />
                    </div>
                  </div>
                ) : null}
                {item.dayPlans.length > 0 ? (
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {item.dayPlans.map((day) => (
                      <article
                        key={day.title}
                        className="rounded-xl border border-brand-100 bg-white p-4 sm:p-5"
                      >
                        <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-brand">
                          {day.title}
                        </p>
                        <h4 className="mt-2 text-lg font-semibold text-ink">
                          {day.theme}
                        </h4>
                        <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                          {day.activities.map((activity) => (
                            <li key={activity} className="border-l-2 border-brand-100 pl-3">
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                ) : null}
                {item.statement ? (
                  <blockquote className="mt-5 border-l-2 border-brand pl-4 text-sm font-semibold leading-7 text-brand-900 sm:text-base">
                    “{item.statement}”
                  </blockquote>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </ReportSectionCard>
  );
}

export function LeadershipConversationReportPage() {
  return (
    <GepProgressReportShell
      header={leadershipConversationCompletedHeader}
      progressDescription={
        weekThreeCompletedReportCopy.leadershipConversation.progressDescription
      }
      outputs={weekThreeCompletedReportCopy.leadershipConversation.outputs}
      reflection={null}
      afterSummary={<WeekFourTransition />}
    >
      <ReportSectionCard
        id="leadership-profile"
        eyebrow="Profil Tokoh"
        title={meetTheLeaderProfile.name}
        description={meetTheLeaderProfile.role}
      >
        <QuotePanel>{meetTheLeaderProfile.conciseProfile}</QuotePanel>
      </ReportSectionCard>

      <ReportSectionCard
        id="discussion-result"
        eyebrow="Hasil Diskusi"
        title={leadershipDiscussion.title}
      >
        <div className="space-y-4 text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
          {leadershipDiscussion.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
            <h3 className="text-base font-semibold text-ink">Bentuk keterlibatan</h3>
            <CheckList items={leadershipDiscussion.engagementAreas} />
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
            <h3 className="text-base font-semibold text-ink">Yang tetap dibutuhkan</h3>
            <CheckList items={leadershipDiscussion.enablingNeeds} />
          </div>
        </div>
        <div className="mt-5">
          <QuotePanel>{leadershipDiscussion.statement}</QuotePanel>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="why-ai-co-creation-lab-matters"
        eyebrow="Project Relevance"
        title={aiCoCreationLabRelevance.title}
      >
        <div className="space-y-4 text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
          {aiCoCreationLabRelevance.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-5">
          <CheckList items={aiCoCreationLabRelevance.opportunities} />
        </div>
        <div className="mt-5">
          <QuotePanel>{aiCoCreationLabRelevance.statement}</QuotePanel>
        </div>
        <p className="mt-5 text-sm font-semibold leading-7 text-brand-900 sm:text-base">
          {aiCoCreationLabRelevance.conclusion}
        </p>
      </ReportSectionCard>

      <LeadershipInsights />
      <ProjectFeedback />

      <ReportSectionCard
        id="personal-reflection"
        eyebrow="Personal Reflection"
        title={riswanLeadershipReflection.title}
        description={`Refleksi pribadi ${riswanLeadershipReflection.author}.`}
      >
        <div className="space-y-4 text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
          {riswanLeadershipReflection.paragraphs.map((paragraph, index) =>
            index === riswanLeadershipReflection.emphasisParagraphIndex ? (
              <p
                key={paragraph}
                className="rounded-2xl border border-brand-100 bg-brand-50/70 p-5 text-lg font-semibold italic leading-8 text-brand-900"
              >
                {paragraph}
              </p>
            ) : (
              <p key={paragraph} className="whitespace-pre-line">
                {paragraph}
              </p>
            ),
          )}
        </div>
        <div className="mt-6">
          <QuotePanel>{riswanLeadershipReflection.closing}</QuotePanel>
        </div>
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}

function DocumentationGallery({
  items,
  columns = "three",
}: {
  items: readonly WeekThreeImage[];
  columns?: "two" | "three";
}) {
  return (
    <div
      className={`grid gap-4 sm:grid-cols-2 ${
        columns === "three" ? "lg:grid-cols-3" : ""
      }`}
    >
      {items.map((item) => (
        <figure
          key={item.id}
          className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white"
        >
          <MediaLightbox
            title={item.caption}
            items={[
              {
                src: item.src,
                width: item.width,
                height: item.height,
                alt: item.alt,
                label: item.category,
                objectPosition: item.objectPosition,
              },
            ]}
            triggerClassName="relative block w-full overflow-hidden bg-slate-100"
            imageClassName="aspect-[4/3] h-auto w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
          <figcaption className="p-4">
            <p className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-brand">
              {item.category}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.caption}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function ImplementationEventOverview() {
  return (
    <ReportSectionCard
      id="event-overview"
      eyebrow="Event Overview"
      title={implementationOverview.eventName}
      description="Pelaksanaan telah selesai. Status functional merujuk pada prototype Week 3, bukan klaim bahwa UAT, deployment, handover, atau adoption monitoring Week 4 sudah selesai."
    >
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <StatusChip tone="green">{implementationOverview.completionLabel}</StatusChip>
        <time
          dateTime={implementationOverview.dateIso}
          className="font-mono text-xs font-semibold text-slate-600"
        >
          {implementationOverview.date}
        </time>
      </div>
      <StatsGrid items={implementationOverview.facts} />
      <div className="mt-6">
        <ProcessFlow
          steps={implementationOverview.framework}
          label="AI Co-Creation Lab implementation framework"
          tone="green"
        />
      </div>
    </ReportSectionCard>
  );
}

function ImplementationFlow() {
  return (
    <ReportSectionCard
      id="implementation-flow"
      eyebrow="Completed Flow"
      title="Five Implementation Stages"
      description="Testing melekat secara natural pada hands-on co-creation dan prototype development; bukan item implementasi terpisah."
    >
      <ol className="divide-y divide-slate-200 border-y border-slate-200">
        {implementationSteps.map((item) => (
          <li
            key={item.number}
            className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr_auto] sm:items-start sm:gap-5 sm:py-6"
          >
            <span className="font-mono text-sm font-semibold text-brand">
              {item.number}
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                {item.eyebrow}
              </p>
              <h3 className="mt-1.5 text-lg font-semibold leading-7 text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {item.description}
              </p>
            </div>
            <span className="justify-self-start sm:justify-self-end">
              <StatusChip tone="green">{item.status}</StatusChip>
            </span>
          </li>
        ))}
      </ol>
    </ReportSectionCard>
  );
}

function FunctionalSolutions() {
  return (
    <ReportSectionCard
      id="five-functional-solutions"
      eyebrow="Prototype Outputs"
      title="Five Solutions — Completed · Functional"
      description="Kelima screenshot berasal dari output prototype aktual. Tidak ada URL prototype yang dibuat-buat; tindak lanjut penggunaan tetap dicatat pada Week 4."
    >
      <ol className="space-y-4">
        {fiveFunctionalSolutions.map((item) => (
          <li
            key={item.id}
            className="grid min-w-0 gap-5 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
          >
            <MediaLightbox
              title={`Prototype ${item.businessName}`}
              items={[
                {
                  src: item.screenshot,
                  width: 1672,
                  height: 941,
                  alt: item.screenshotAlt,
                  label: item.status,
                },
              ]}
              triggerClassName="relative block w-full overflow-hidden rounded-xl border border-slate-200 bg-white"
              imageClassName="aspect-video h-auto w-full object-contain"
              sizes="(max-width: 1023px) calc(100vw - 4.5rem), 34rem"
            />
            <div className="min-w-0">
              <span className="font-mono text-xs font-semibold text-brand">
                {item.number}
              </span>
              <h3 className="mt-2 text-xl font-semibold leading-7 text-ink">
                {item.businessName}
              </h3>
              <p className="mt-3 text-sm font-semibold leading-7 text-brand-900">
                {item.solution}
              </p>
              <div className="mt-4">
                <StatusChip tone="green">{item.status}</StatusChip>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </ReportSectionCard>
  );
}

export function MiniProjectImplementationReportPage() {
  const implementationMedia = curatedEventDocumentation.filter((item) =>
    [
      "event-opening",
      "workshop-facilitation",
      "student-umkm-discussion",
      "hands-on-building",
      "prototype-development",
      "team-pitching",
    ].includes(item.id),
  );

  return (
    <GepProgressReportShell
      header={miniProjectImplementationCompletedHeader}
      progressDescription={
        weekThreeCompletedReportCopy.implementation.progressDescription
      }
      outputs={weekThreeCompletedReportCopy.implementation.outputs}
      reflection={weekThreeCompletedReportCopy.implementation.reflection}
      afterSummary={<WeekFourTransition />}
    >
      <ImplementationEventOverview />
      <ImplementationFlow />
      <ReportSectionCard
        id="workshop-hands-on-documentation"
        eyebrow="Real Documentation"
        title="Workshop & Hands-On Documentation"
        description="Pilihan dokumentasi aktual mencakup opening, workshop, interaksi mahasiswa–UMKM, hands-on build, prototype moment, dan team pitching."
      >
        <DocumentationGallery items={implementationMedia} />
        <div className="mt-5">
          <ExternalAction
            href={eventDocumentationDriveUrl}
            label="View Full Event Documentation"
          />
        </div>
      </ReportSectionCard>
      <FunctionalSolutions />
    </GepProgressReportShell>
  );
}

function NetworkPartnerDirectory() {
  return (
    <ReportSectionCard
      id="partners-and-sponsors"
      eyebrow="Partners & Sponsors"
      title="Contributions Behind the Ecosystem"
      description="Logo ditampilkan bersama peran aktual agar mobilisasi jejaring tidak berhenti sebagai logo wall."
    >
      <div className="space-y-7">
        {networkPartnerGroups.map((group) => (
          <section key={group.id} aria-labelledby={`${group.id}-heading`}>
            <h3
              id={`${group.id}-heading`}
              className="text-lg font-semibold leading-7 text-ink"
            >
              {group.title}
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-3">
              {group.partners.map((partner) => (
                <article
                  key={partner.id}
                  className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/60 p-3 sm:p-5"
                >
                  <div className="flex min-h-24 items-center justify-center rounded-xl border border-slate-200 bg-white p-3 sm:min-h-28 sm:p-4">
                    <Image
                      src={partner.logo.src}
                      alt={partner.logo.alt}
                      width={partner.logo.width}
                      height={partner.logo.height}
                      sizes="(max-width: 639px) 38vw, (max-width: 1023px) 28vw, 16rem"
                      className="max-h-20 h-auto w-full object-contain"
                    />
                  </div>
                  <h4 className="mt-3 break-words text-sm font-semibold leading-6 text-ink sm:text-base">
                    {partner.name}
                  </h4>
                  <p className="mt-1 break-words text-xs font-semibold leading-5 text-brand-700">
                    {partner.role}
                  </p>
                  <p className="mt-2 break-words text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
                    {partner.support}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </ReportSectionCard>
  );
}

function UmkmCoCreators() {
  return (
    <ReportSectionCard
      id="five-umkm-co-creators"
      eyebrow="Beneficiary Ecosystem"
      title="5 UMKM Co-Creators"
      description="Lima UMKM co-creator ditampilkan menggunakan logo usaha yang terverifikasi."
    >
      <ol className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {fiveUmkmCoCreators.map((item, index) => (
          <li
            key={item.id}
            className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/60 p-3 sm:p-4"
          >
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-3">
              <Image
                src={item.visual.src}
                alt={item.visual.alt}
                width={item.visual.width}
                height={item.visual.height}
                sizes="(max-width: 639px) 38vw, (max-width: 1023px) 28vw, 10rem"
                className="max-h-full h-auto w-full object-contain"
              />
            </div>
            <span className="mt-3 block font-mono text-[0.58rem] font-semibold text-brand">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-1 break-words text-sm font-semibold leading-6 text-ink">
              {item.name}
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-500">{item.label}</p>
          </li>
        ))}
      </ol>
    </ReportSectionCard>
  );
}

function PeopleBehindTheLab() {
  return (
    <ReportSectionCard
      id="people-behind-the-lab"
      eyebrow="Event Volunteers & Support Team"
      title={peopleBehindTheLab.title}
      description={peopleBehindTheLab.subtitle}
    >
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {eventVolunteers.map((person, index) => (
          <article
            key={person.id}
            className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
          >
            <span className="font-mono text-xs font-semibold text-brand">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.06em] text-slate-500">
              {person.team}
            </p>
            <h3 className="mt-2 break-words text-lg font-semibold leading-7 text-ink">
              {person.name}
            </h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-brand-800">
              {person.role}
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {person.university}
            </p>
          </article>
        ))}
      </div>
    </ReportSectionCard>
  );
}

function TechnicalMentors() {
  return (
    <ReportSectionCard
      id="technical-mentors-sdm"
      eyebrow="Mentor & SDM"
      title="Technical Mentors"
      description="Dua mentor dari Teknik Informatika Universitas Hasanuddin mendukung ekosistem technical talent program."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {technicalMentors.map((mentor, index) => (
          <article
            key={mentor.id}
            className="min-w-0 rounded-2xl border border-brand-100 bg-brand-50/60 p-5 sm:p-6"
          >
            <span className="font-mono text-xs font-semibold text-brand">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-brand-700">
              {mentor.role}
            </p>
            <h3 className="mt-2 break-words text-xl font-semibold leading-7 text-ink">
              {mentor.name}
            </h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
              {mentor.department} · {mentor.university}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Keahlian ${mentor.name}`}>
              {mentor.expertise.map((expertise) => (
                <li
                  key={expertise}
                  className="rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-semibold text-brand-800"
                >
                  {expertise}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </ReportSectionCard>
  );
}

function StudentCoCreators() {
  return (
    <ReportSectionCard
      id="student-co-creators"
      eyebrow="Five Co-Creation Teams"
      title={studentCoCreatorsIntro.title}
      description={studentCoCreatorsIntro.subtitle}
    >
      <ol className="grid gap-4 lg:grid-cols-2">
        {studentCoCreationTeams.map((team) => (
          <li
            key={team.id}
            className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6"
          >
            <div className="flex items-start gap-3">
              <span className="font-mono text-sm font-semibold text-brand">
                {team.number}
              </span>
              <div className="min-w-0">
                <h3 className="break-words text-lg font-semibold leading-7 text-ink">
                  {team.title}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.06em] text-brand-700">
                  4 Student Co-Creators
                </p>
              </div>
            </div>
            <ol className="mt-5 space-y-3">
              {team.members.map((member, index) => (
                <li
                  key={member.name}
                  className="grid grid-cols-[1.75rem_1fr] gap-2 border-t border-slate-200 pt-3 first:border-0 first:pt-0"
                >
                  <span className="font-mono text-xs font-semibold text-slate-400">
                    {index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block break-words text-sm font-semibold leading-6 text-ink">
                      {member.name}
                    </span>
                    <span className="mt-0.5 block break-words text-xs leading-5 text-slate-500">
                      {member.university}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </ReportSectionCard>
  );
}

export function NetworkMobilizationReportPage() {
  return (
    <GepProgressReportShell
      header={networkMobilizationCompletedHeader}
      progressDescription={
        weekThreeCompletedReportCopy.networkMobilization.progressDescription
      }
      outputs={weekThreeCompletedReportCopy.networkMobilization.outputs}
      reflection={weekThreeCompletedReportCopy.networkMobilization.reflection}
      afterSummary={<WeekFourTransition />}
    >
      <ReportSectionCard
        id="network-summary"
        eyebrow="Collaborative Leadership"
        title="Built Together, Backed by an Ecosystem."
        description={networkPurpose}
      >
        <StatsGrid items={networkSummary} />
      </ReportSectionCard>
      <NetworkPartnerDirectory />
      <UmkmCoCreators />
      <PeopleBehindTheLab />
      <TechnicalMentors />
      <StudentCoCreators />
      <ReportSectionCard
        id="network-mobilization-story"
        eyebrow="Network Story"
        title={networkMobilizationStory.title}
      >
        <ProcessFlow
          steps={networkMobilizationStory.nodes}
          label="Network mobilization ecosystem flow"
          tone="green"
        />
        <div className="mt-6">
          <QuotePanel>{networkMobilizationStory.statement}</QuotePanel>
        </div>
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}

export function ProcessDocumentationReportPage() {
  const featuredIds = new Set<string>(featuredDocumentationIds);
  const featured = curatedEventDocumentation.filter((item) =>
    featuredIds.has(item.id),
  );
  const storyGallery = curatedEventDocumentation.filter(
    (item) => !featuredIds.has(item.id),
  );

  return (
    <GepProgressReportShell
      header={processDocumentationCompletedHeader}
      progressDescription={
        weekThreeCompletedReportCopy.documentation.progressDescription
      }
      outputs={weekThreeCompletedReportCopy.documentation.outputs}
      reflection={weekThreeCompletedReportCopy.documentation.reflection}
      afterSummary={<WeekFourTransition />}
    >
      <ReportSectionCard
        id="documentation-structure"
        eyebrow="Documentation Structure"
        title="Ten Completed Documentation Categories"
        description="Kategori menjaga evidence mudah ditemukan tanpa menampilkan seluruh isi folder sekaligus. Video Report tersedia melalui folder sumber Google Drive."
      >
        <ol className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {processDocumentationCategories.map((category) => (
            <li
              key={category.id}
              className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
            >
              <span className="font-mono text-xs font-semibold text-brand">
                {category.number}
              </span>
              <p className="mt-2 break-words text-sm font-semibold leading-6 text-ink">
                {category.title}
              </p>
              <div className="mt-3">
                <StatusChip tone="green">Completed</StatusChip>
              </div>
            </li>
          ))}
        </ol>
      </ReportSectionCard>

      <ReportSectionCard
        id="featured-documentation"
        eyebrow="Featured Documentation"
        title="Moments That Frame the Lab"
        description="Tiga visual utama mewakili pembukaan, co-creation mahasiswa–UMKM, dan dokumentasi bersama."
      >
        <DocumentationGallery items={featured} />
      </ReportSectionCard>

      <ReportSectionCard
        id="event-story-gallery"
        eyebrow="Event Story Gallery"
        title="From Learning to Building"
        description="Galeri terkurasi mengikuti alur workshop, diskusi, build, review, pitching, stakeholder, dan event team."
      >
        <DocumentationGallery items={storyGallery} />
      </ReportSectionCard>

      <ReportSectionCard
        id="video-documentation"
        eyebrow="Video Documentation"
        title={eventVideoDocumentation.title}
        description={eventVideoDocumentation.caption}
      >
        <div className="grid gap-5 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Image
            src={eventVideoDocumentation.poster}
            alt="Dokumentasi bersama AI Co-Creation Lab Makassar"
            width={1600}
            height={900}
            sizes="(max-width: 1023px) calc(100vw - 4.5rem), 28rem"
            className="aspect-video h-auto w-full rounded-xl object-cover"
          />
          <div className="min-w-0">
            <StatusChip tone="green">
              {eventVideoDocumentation.availability}
            </StatusChip>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              File video lokal yang browser-compatible belum tersedia di project, sehingga halaman tidak memalsukan player atau memakai ulang video Week 2. Dokumentasi video aktual dapat dibuka dari folder sumber.
            </p>
            <div className="mt-5">
              <ExternalAction
                href={eventVideoDocumentation.driveUrl}
                label="View Video Report on Google Drive"
              />
            </div>
          </div>
        </div>
      </ReportSectionCard>

      <ReportSectionCard
        id="full-documentation"
        eyebrow="Full Documentation"
        title="Open the Complete Source Folder"
        description="Folder sumber memuat Foto Report Event dan Video Report Event. Galeri web hanya menampilkan pilihan yang paling representatif agar tetap ringan."
      >
        <ExternalAction
          href={fullDocumentationAction.href}
          label={fullDocumentationAction.label}
        />
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}
