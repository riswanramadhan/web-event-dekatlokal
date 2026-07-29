import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProgressReportPage } from "@/components/reports";
import {
  GEP_WEEK_ONE_REPORT_SLUGS,
  getGepWeekOneReport,
} from "@/data/gep-week-1-reports";

type ProgressReportRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return GEP_WEEK_ONE_REPORT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProgressReportRouteProps): Promise<Metadata> {
  const { slug } = await params;
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
  const report = getGepWeekOneReport(slug);

  if (!report) {
    notFound();
  }

  return <ProgressReportPage report={report} />;
}
