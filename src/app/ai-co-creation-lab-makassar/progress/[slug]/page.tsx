import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  FinalActionPlanReportPage,
  FinalPresentationReportPage,
  GlobalCommunicationReportPage,
  ImpactMeasurementReportPage,
  LeadershipConversationReportPage,
  LeadershipReflectionReportPage,
  MeetTheLeaderReportPage,
  MiniProjectImplementationReportPage,
  NetworkMobilizationReportPage,
  PartnershipCollaborationReportPage,
  PitchingMiniProjectReportPage,
  ProblemValidationReportPage,
  ProcessDocumentationReportPage,
  ProjectCompletionMonitoringReportPage,
  ProgressReportPage,
  WeekFourHubReportPage,
} from "@/components/reports";
import { weekFourHeaders, type WeekFourProgressSlug } from "@/data/gep-week-4";
import {
  weekTwoThreeHeaders,
  type WeekTwoThreeProgressSlug,
} from "@/data/gep-week-2-3";
import { getGepWeekOneReport } from "@/data/gep-week-1-reports";
import { problemValidationHeader } from "@/data/problem-validation";
import { partnershipHeader } from "@/data/partnership-collaboration";
import { PROGRESS_REPORT_SLUGS } from "@/data/progress-reports";

type ProgressReportRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return PROGRESS_REPORT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProgressReportRouteProps): Promise<Metadata> {
  const { slug } = await params;

  if (slug === problemValidationHeader.slug) {
    return {
      title: {
        absolute: problemValidationHeader.metadataTitle,
      },
      description:
        "Hasil validasi masalah AI Co-Creation Lab Makassar melalui wawancara lima UMKM penerima manfaat dan tiga mahasiswa calon co-creator.",
      alternates: {
        canonical: problemValidationHeader.progressUrl,
      },
      openGraph: {
        title: problemValidationHeader.metadataTitle,
        description:
          "Hasil validasi masalah melalui wawancara lima UMKM penerima manfaat dan tiga mahasiswa calon co-creator.",
        url: problemValidationHeader.progressUrl,
        type: "article",
        images: [
          {
            url: "/aicl-cocreation-indonesia.webp",
            width: 1600,
            height: 900,
            alt: "Mahasiswa dan pelaku UMKM dalam proses co-creation",
          },
        ],
      },
      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
    };
  }

  if (slug === partnershipHeader.slug) {
    return {
      title: {
        absolute: partnershipHeader.metadataTitle,
      },
      description:
        "Kolaborasi lembaga, industri, kampus, venue, dan komunitas yang mendukung pelaksanaan serta keberlanjutan AI Co-Creation Lab Makassar.",
      alternates: {
        canonical: partnershipHeader.progressUrl,
      },
      openGraph: {
        title: partnershipHeader.metadataTitle,
        description:
          "Partnership dan evidence yang mendukung proses co-creation AI Co-Creation Lab Makassar.",
        url: partnershipHeader.progressUrl,
        type: "article",
        images: [
          {
            url: "/aicl-cocreation-indonesia.webp",
            width: 1600,
            height: 900,
            alt: "Kolaborasi mahasiswa dan pelaku UMKM dalam AI Co-Creation Lab Makassar",
          },
        ],
      },
      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
    };
  }

  const currentHeader = weekTwoThreeHeaders[slug as WeekTwoThreeProgressSlug];

  const currentWeekFourHeader = weekFourHeaders[slug as WeekFourProgressSlug];

  if (currentHeader || currentWeekFourHeader) {
    const metadataHeader = currentHeader ?? currentWeekFourHeader;
    return {
      title: {
        absolute: metadataHeader.metadataTitle,
      },
      description: metadataHeader.subtitle,
      alternates: {
        canonical: metadataHeader.progressUrl,
      },
      openGraph: {
        title: metadataHeader.metadataTitle,
        description: metadataHeader.subtitle,
        url: metadataHeader.progressUrl,
        type: "article",
        images: [
          {
            url: "/aicl-cocreation-indonesia.webp",
            width: 1600,
            height: 900,
            alt: "Mahasiswa dan pelaku UMKM dalam proses co-creation",
          },
        ],
      },
      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
    };
  }

  const report = getGepWeekOneReport(slug);

  if (!report) {
    notFound();
  }

  return {
    title: {
      absolute: report.metadataTitle,
    },
    description: report.subtitle,
    alternates: {
      canonical: report.progressUrl,
    },
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export default async function ProgressReportRoute({
  params,
}: ProgressReportRouteProps) {
  const { slug } = await params;

  if (slug === problemValidationHeader.slug) {
    return <ProblemValidationReportPage />;
  }

  if (slug === partnershipHeader.slug) {
    return <PartnershipCollaborationReportPage />;
  }

  switch (slug as WeekTwoThreeProgressSlug) {
    case "pitching-mini-project":
      return <PitchingMiniProjectReportPage />;
    case "final-action-plan":
      return <FinalActionPlanReportPage />;
    case "global-communication":
      return <GlobalCommunicationReportPage />;
    case "meet-the-leader":
      return <MeetTheLeaderReportPage />;
    case "leadership-conversation":
      return <LeadershipConversationReportPage />;
    case "mini-project-implementation":
      return <MiniProjectImplementationReportPage />;
    case "network-mobilization":
      return <NetworkMobilizationReportPage />;
    case "process-documentation":
      return <ProcessDocumentationReportPage />;
  }

  switch (slug as WeekFourProgressSlug) {
    case "measure-reflect-sustain":
      return <WeekFourHubReportPage />;
    case "project-completion-monitoring":
      return <ProjectCompletionMonitoringReportPage />;
    case "impact-measurement":
      return <ImpactMeasurementReportPage />;
    case "leadership-reflection":
      return <LeadershipReflectionReportPage />;
    case "final-presentation":
      return <FinalPresentationReportPage />;
  }

  const report = getGepWeekOneReport(slug);

  if (report !== undefined) {
    return <ProgressReportPage report={report!} />;
  }

  return notFound();
}
