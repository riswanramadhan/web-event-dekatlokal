import Link from "next/link";

import { MediaLightbox } from "@/components/reports/media-lightbox";
import {
  coCreationCases,
  coCreationProcess,
  documentationCategories,
  eventSupportPendingEvidence,
  fiveUmkmCoCreators,
  implementationFacts,
  implementationSections,
  leadershipConversationHeader,
  leadershipConversationSections,
  meetTheLeaderHeader,
  meetTheLeaderPurposes,
  miniProjectImplementationHeader,
  networkEcosystemGroups,
  networkMobilizationHeader,
  postLabJourney,
  processDocumentationHeader,
  reportCopy,
  weekThreeHeader,
  weekThreeProgress,
} from "@/data/gep-week-2-3";
import { partnershipDocumentation } from "@/data/partnership-collaboration";
import { validationDocumentation } from "@/data/problem-validation";

import {
  DisabledEvidenceActions,
  EvidenceEmptyState,
  GepProgressReportShell,
  PlannedList,
  ProcessFlow,
  ReportSectionCard,
  StatusChip,
} from "./gep-progress-shared";

function statusTone(status: string): "green" | "amber" | "blue" | "neutral" {
  if (status === "Completed") {
    return "green";
  }

  if (status.includes("Progress") || status.includes("Finalization")) {
    return "amber";
  }

  return "blue";
}

function WeekThreeStatusOverview() {
  return (
    <ReportSectionCard
      id="week-three-progress"
      eyebrow="Progress Status"
      title="Five Connected Actions"
      description="Setiap aktivitas memiliki status yang berbeda. Completed hanya digunakan untuk proses yang memang telah berlangsung; evidence yang belum final tetap diberi label terbuka."
    >
      <ol className="divide-y divide-slate-200 border-y border-slate-200">
        {weekThreeProgress.map((item, index) => (
          <li key={item.slug}>
            <Link
              href={`/ai-co-creation-lab-makassar/progress/${item.slug}`}
              className="group grid gap-3 py-5 transition sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:gap-5 sm:py-6"
            >
              <span className="font-mono text-sm font-semibold text-brand">
                {String(index + 1).padStart(2, "0")}
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
                <StatusChip tone={statusTone(item.status)}>{item.status}</StatusChip>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </ReportSectionCard>
  );
}

export function WeekThreeHubReportPage() {
  return (
    <GepProgressReportShell
      header={weekThreeHeader}
      progressDescription={reportCopy.weekThree.progressDescription}
      outputs={reportCopy.weekThree.outputs}
      reflection={reportCopy.weekThree.reflection}
    >
      <ReportSectionCard
        id="week-three-direction"
        eyebrow="Lead The Action"
        title="From Plans to Coordinated Action"
        description="Week 3 menghubungkan pembelajaran dari pemimpin, implementasi project, mobilisasi jejaring, dan dokumentasi yang dapat ditinjau kembali."
      >
        <ProcessFlow
          steps={[
            "Meet the Leader",
            "Leadership Conversation",
            "Implement",
            "Mobilize",
            "Document",
          ]}
          label="Week 3 progress sequence"
        />
        <blockquote className="mt-6 border-l-2 border-brand pl-4 text-base font-semibold leading-8 text-brand-900 sm:text-lg">
          Lead → Implement → Measure → Sustain → Replicate
        </blockquote>
      </ReportSectionCard>
      <WeekThreeStatusOverview />
    </GepProgressReportShell>
  );
}

function PlaceholderPanel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/55 p-5">
      <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
        To be completed
      </p>
      <h3 className="mt-2 text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
    </article>
  );
}

export function MeetTheLeaderReportPage() {
  return (
    <GepProgressReportShell
      header={meetTheLeaderHeader}
      progressDescription={reportCopy.meetTheLeader.progressDescription}
      outputs={reportCopy.meetTheLeader.outputs}
      reflection={reportCopy.meetTheLeader.reflection}
    >
      <ReportSectionCard
        id="meeting-context"
        eyebrow="Meeting Context"
        title="Audiensi Bersama Rumah BUMN Makassar"
        description="Audiensi telah dilakukan untuk belajar dari perspektif practitioner dan memperoleh masukan bagi AI Co-Creation Lab Makassar. Nama pimpinan dan isi percakapan tidak ditampilkan sebelum data final tersedia."
      >
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <dl className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
            <div>
              <dt className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                Organization
              </dt>
              <dd className="mt-2 text-lg font-semibold text-ink">Rumah BUMN Makassar</dd>
            </div>
            <div className="mt-5 border-t border-slate-200 pt-5">
              <dt className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                Leader Profile
              </dt>
              <dd className="mt-2">
                <StatusChip tone="neutral">To be completed</StatusChip>
              </dd>
            </div>
          </dl>
          <div>
            <h3 className="text-lg font-semibold text-ink">Purpose of the conversation</h3>
            <div className="mt-4">
              <PlannedList items={meetTheLeaderPurposes} label="Purpose" />
            </div>
          </div>
        </div>
      </ReportSectionCard>
      <ReportSectionCard
        id="leader-learning"
        eyebrow="Prepared Structure"
        title="Insights, Feedback, and Reflection"
        description="Struktur sudah siap diisi setelah catatan percakapan disusun dan disetujui untuk publikasi."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <PlaceholderPanel
            title="Leadership Insights"
            description="Insight cards akan ditambahkan berdasarkan catatan percakapan yang terverifikasi."
          />
          <PlaceholderPanel
            title="Feedback for Mini Project"
            description="Masukan spesifik untuk AI Co-Creation Lab akan ditambahkan tanpa mengarang isi pertemuan."
          />
          <PlaceholderPanel
            title="Personal Reflection"
            description="Refleksi personal akan disusun setelah insights dan implikasinya dirangkum."
          />
          <PlaceholderPanel
            title="Leader Profile"
            description="Nama, posisi, dan profil singkat belum tersedia untuk publikasi."
          />
        </div>
      </ReportSectionCard>
      <ReportSectionCard
        id="meet-the-leader-documentation"
        eyebrow="Documentation"
        title="Documentation Will Be Updated"
      >
        <EvidenceEmptyState
          title="Documentation will be updated"
          description="Foto atau video khusus Meet the Leader belum tersedia sebagai evidence publik terverifikasi. Struktur galeri siap menerima aset final."
        />
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}

export function LeadershipConversationReportPage() {
  return (
    <GepProgressReportShell
      header={leadershipConversationHeader}
      progressDescription={reportCopy.leadershipConversation.progressDescription}
      outputs={reportCopy.leadershipConversation.outputs}
      reflection={reportCopy.leadershipConversation.reflection}
    >
      <ReportSectionCard
        id="leadership-report-structure"
        eyebrow="Report Structure"
        title="A Report Ready to Be Completed"
        description="Bagian berikut disiapkan sebagai struktur—bukan laporan palsu. Konten akan masuk setelah catatan, atribusi, dan evidence tersedia."
      >
        <ol className="divide-y divide-slate-200 border-y border-slate-200">
          {leadershipConversationSections.map((section, index) => (
            <li key={section} className="grid gap-2 py-4 sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:gap-4">
              <span className="font-mono text-xs font-semibold text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-semibold leading-6 text-ink sm:text-base">
                {section}
              </span>
              <StatusChip tone="neutral">To be completed</StatusChip>
            </li>
          ))}
        </ol>
      </ReportSectionCard>
      <ReportSectionCard
        id="leadership-report-file"
        eyebrow="Report File"
        title="Report File Not Published Yet"
        description="Tombol aksi akan diaktifkan setelah file laporan final tersedia."
      >
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.11em] text-slate-500">
                PDF · Pending
              </p>
              <p className="mt-2 text-lg font-semibold text-ink">Leadership Conversation Report</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">File belum dibuat atau dipublikasikan.</p>
            </div>
            <DisabledEvidenceActions />
          </div>
        </div>
      </ReportSectionCard>
      <ReportSectionCard
        id="leadership-report-documentation"
        eyebrow="Supporting Documentation"
        title="Evidence Pending Verification"
      >
        <EvidenceEmptyState />
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}

function ImplementationOverview() {
  return (
    <ReportSectionCard
      id="event-overview"
      eyebrow="Event Overview"
      title="AI Co-Creation Lab Makassar 2026"
      description="Program telah dilaksanakan pada 10 Agustus 2026. Angka di bawah diberi label Actual sesuai catatan pelaksanaan yang diberikan; impact dan adopsi tetap diukur terpisah."
    >
      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {implementationFacts.map((fact) => (
          <div key={fact.label} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
            <dt className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-brand">
              {fact.kind}
            </dt>
            <dd className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-ink">{fact.value}</dd>
            <dd className="mt-1 text-xs leading-5 text-slate-500">{fact.label}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/55 p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-brand-900">What Happened</h3>
        <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
          Dua puluh mahasiswa dan lima UMKM bekerja dalam lima co-creation teams untuk memahami real business problems dan membangun solusi digital sederhana. Detail output, testing, dan dokumentasi sedang dikonsolidasikan sebelum dipublikasikan sebagai evidence final.
        </p>
        <div className="mt-5">
          <ProcessFlow steps={coCreationProcess} label="Core co-creation process" tone="green" />
        </div>
      </div>
    </ReportSectionCard>
  );
}

function CoCreationTeams() {
  return (
    <ReportSectionCard
      id="five-co-creation-teams"
      eyebrow="Real UMKM Cases"
      title="Five Co-Creation Teams"
      description="Kasus diturunkan langsung dari data Problem Validation existing. Nama anggota tim dan detail prototype tidak dipublikasikan sebelum evidence final tersedia."
    >
      <ol className="divide-y divide-slate-200 border-y border-slate-200">
        {coCreationCases.map((item) => (
          <li key={item.id} className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr] sm:gap-5 sm:py-6">
            <span className="font-mono text-sm font-semibold text-brand">{item.number}</span>
            <div>
              <h3 className="text-lg font-semibold text-ink">{item.businessName}</h3>
              <dl className="mt-3 grid gap-3 lg:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Validated problem</dt>
                  <dd className="mt-2 text-sm leading-7 text-slate-700">{item.problem}</dd>
                </div>
                <div className="rounded-xl border border-brand-100 bg-brand-50/55 p-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-brand-700">Priority need</dt>
                  <dd className="mt-2 text-sm leading-7 text-brand-900">{item.priorityNeed}</dd>
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ol>
    </ReportSectionCard>
  );
}

function ImplementationEvidenceStatus() {
  return (
    <>
      {implementationSections.map((item) => (
        <ReportSectionCard
          key={item.id}
          id={item.id}
          eyebrow={item.eyebrow}
          title={item.title}
          description={item.description}
        >
          <div className="mb-5">
            <StatusChip tone="neutral">{item.status}</StatusChip>
          </div>
          <EvidenceEmptyState
            title={item.title === "Testimonials" ? "No approved testimonial published yet" : "Evidence pending verification"}
            description="Container ini siap menerima evidence nyata tanpa memerlukan perubahan struktur halaman."
          />
        </ReportSectionCard>
      ))}
    </>
  );
}

export function MiniProjectImplementationReportPage() {
  return (
    <GepProgressReportShell
      header={miniProjectImplementationHeader}
      progressDescription={reportCopy.implementation.progressDescription}
      outputs={reportCopy.implementation.outputs}
      reflection={reportCopy.implementation.reflection}
    >
      <ImplementationOverview />
      <CoCreationTeams />
      <ImplementationEvidenceStatus />
      <ReportSectionCard
        id="post-lab-journey"
        eyebrow="Post-Lab Journey"
        title="Execution Continues After the Event"
        description="Pelaksanaan kegiatan sudah selesai, sedangkan perbaikan dan adoption monitoring masih berjalan."
      >
        <ProcessFlow steps={postLabJourney} label="Post-lab journey" tone="green" />
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}

export function NetworkMobilizationReportPage() {
  return (
    <GepProgressReportShell
      header={networkMobilizationHeader}
      progressDescription={reportCopy.networkMobilization.progressDescription}
      outputs={reportCopy.networkMobilization.outputs}
      reflection={reportCopy.networkMobilization.reflection}
    >
      <ReportSectionCard
        id="network-ecosystem"
        eyebrow="Collaborative Leadership"
        title="Built Together, Backed by an Ecosystem."
        description="Daftar ini dibangun dari data partnership yang sudah ada di website. Setiap kelompok menjelaskan fungsi kontribusi, bukan sekadar menampilkan logo."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {networkEcosystemGroups.map((group, index) => (
            <article key={group.title} className="rounded-2xl border border-slate-200 bg-slate-50/55 p-5">
              <span className="font-mono text-xs font-semibold text-brand">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-semibold leading-7 text-ink">{group.title}</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                {group.members.map((member) => (
                  <li key={member} className="border-l-2 border-brand-100 pl-3">{member}</li>
                ))}
              </ul>
            </article>
          ))}
          <article className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/55 p-5">
            <span className="font-mono text-xs font-semibold text-slate-500">07</span>
            <h3 className="mt-2 text-lg font-semibold text-ink">Event Support</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Nama berikut berasal dari implementation brief, tetapi belum dihitung sebagai partner terverifikasi sampai supporting record terhubung ke data website.
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              {eventSupportPendingEvidence.map((name) => (
                <li key={name} className="border-l-2 border-slate-300 pl-3">{name}</li>
              ))}
            </ul>
            <div className="mt-3"><StatusChip tone="neutral">Documentation pending</StatusChip></div>
          </article>
        </div>
        <blockquote className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/60 p-5 text-base font-semibold leading-8 text-brand-900 sm:p-6 sm:text-lg">
          Mobilizing a network was not only about collecting logos. Each stakeholder contributed to a different part of the project’s execution.
        </blockquote>
      </ReportSectionCard>
      <ReportSectionCard
        id="umkm-co-creators"
        eyebrow="Beneficiary Ecosystem"
        title="5 UMKM Co-Creators"
        description="Nama diambil dari sumber Problem Validation yang sama agar tidak terjadi duplikasi atau perbedaan data."
      >
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {fiveUmkmCoCreators.map((item, index) => (
            <li key={item.id} className="flex min-h-20 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/55 p-4">
              <span className="font-mono text-xs font-semibold text-brand">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-sm font-semibold leading-6 text-ink">{item.name}</span>
            </li>
          ))}
        </ol>
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}

function ExistingValidationGallery() {
  const items = validationDocumentation.filter(
    (item) => item.image && item.imageWidth && item.imageHeight,
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <figure key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <MediaLightbox
            title={item.title}
            items={[
              {
                src: item.image!,
                width: item.imageWidth!,
                height: item.imageHeight!,
                alt: item.alt,
              },
            ]}
            triggerClassName="relative block w-full overflow-hidden bg-slate-100"
            imageClassName="aspect-[4/5] h-auto w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
          <figcaption className="p-4">
            <p className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-brand">Problem Validation</p>
            <h3 className="mt-1.5 text-sm font-semibold leading-6 text-ink">{item.title}</h3>
            <p className="mt-2 text-xs leading-6 text-slate-600">{item.caption}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function ExistingPartnershipGallery() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {partnershipDocumentation.map((item) => (
        <figure key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <MediaLightbox
            title={item.title}
            items={item.images}
            showInlineNavigation={item.images.length > 1}
            triggerClassName="relative block w-full overflow-hidden bg-slate-100"
            imageClassName="aspect-[4/5] h-auto w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
          <figcaption className="p-4">
            <p className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-brand">Partnership</p>
            <h3 className="mt-1.5 text-sm font-semibold leading-6 text-ink">{item.title}</h3>
            <p className="mt-2 text-xs leading-6 text-slate-600">{item.caption}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function ProcessDocumentationReportPage() {
  return (
    <GepProgressReportShell
      header={processDocumentationHeader}
      progressDescription={reportCopy.documentation.progressDescription}
      outputs={reportCopy.documentation.outputs}
      reflection={reportCopy.documentation.reflection}
    >
      <ReportSectionCard
        id="documentation-map"
        eyebrow="Gallery Structure"
        title="Documentation Map"
        description="Enam belas kategori menjaga dokumentasi mudah dicari dan diperbarui tanpa memindahkan copy utama ke komponen."
      >
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {documentationCategories.map((category, index) => {
            const isExisting = [
              "Stakeholder meetings",
              "UMKM problem validation",
              "Partnership",
              "Media / social publication",
            ].includes(category);
            return (
              <li key={category} className="rounded-2xl border border-slate-200 bg-slate-50/55 p-4">
                <span className="font-mono text-xs font-semibold text-brand">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-2 text-sm font-semibold leading-6 text-ink">{category}</p>
                <div className="mt-3">
                  <StatusChip tone={isExisting ? "green" : "neutral"}>
                    {isExisting ? "Evidence available" : "Being organized"}
                  </StatusChip>
                </div>
              </li>
            );
          })}
        </ol>
      </ReportSectionCard>
      <ReportSectionCard
        id="validation-documentation"
        eyebrow="Existing Evidence"
        title="UMKM Problem Validation"
        description="Dokumentasi nyata yang sudah tersedia dari proses validasi lima UMKM dan komitmen penerima manfaat."
      >
        <ExistingValidationGallery />
      </ReportSectionCard>
      <ReportSectionCard
        id="partnership-documentation"
        eyebrow="Existing Evidence"
        title="Stakeholder Meetings & Partnership"
        description="Dokumentasi nyata yang sudah tersedia dari proses partnership. Aset ini tidak diposisikan sebagai foto workshop 10 Agustus."
      >
        <ExistingPartnershipGallery />
      </ReportSectionCard>
      <ReportSectionCard
        id="implementation-documentation"
        eyebrow="Implementation Evidence"
        title="Documentation Is Being Organized"
        description="Galeri untuk event opening, workshop, student–UMKM discussion, hands-on building, prototype testing, pitching, testimonials, partner moments, group photo, dan publication siap menerima asset final."
      >
        <EvidenceEmptyState />
      </ReportSectionCard>
    </GepProgressReportShell>
  );
}
