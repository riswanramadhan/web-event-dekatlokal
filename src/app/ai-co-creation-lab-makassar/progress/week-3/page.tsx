import type { Metadata } from "next";

import { WeekThreeHubReportPage } from "@/components/reports";
import { weekThreeCompletedHeader } from "@/data/gep-week-3-completed";

export const metadata: Metadata = {
  title: {
    absolute: weekThreeCompletedHeader.metadataTitle,
  },
  description: weekThreeCompletedHeader.subtitle,
  alternates: {
    canonical: weekThreeCompletedHeader.progressUrl,
  },
  openGraph: {
    title: weekThreeCompletedHeader.metadataTitle,
    description: weekThreeCompletedHeader.subtitle,
    url: weekThreeCompletedHeader.progressUrl,
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

export default function WeekThreeProgressHubRoute() {
  return <WeekThreeHubReportPage />;
}
