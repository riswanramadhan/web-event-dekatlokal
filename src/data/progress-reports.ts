export const PROGRESS_REPORT_SLUGS = [
  "leadership-network-mapping",
  "identifikasi-masalah-sosial",
  "mini-project-canvas",
  "problem-validation",
  "partnership-collaboration",
] as const;

export type ProgressReportSlug = (typeof PROGRESS_REPORT_SLUGS)[number];

export interface ProgressReportSummary {
  readonly slug: ProgressReportSlug;
  readonly title: string;
  readonly weekLabel: string;
  readonly phase: string;
  readonly status: string;
  readonly route: string;
}

const progressBaseRoute = "/ai-co-creation-lab-makassar/progress";

export const progressReports: readonly ProgressReportSummary[] = [
  {
    slug: "leadership-network-mapping",
    title: "Leadership Network Mapping",
    weekLabel: "Week 1",
    phase: "Network",
    status: "Completed",
    route: `${progressBaseRoute}/leadership-network-mapping`,
  },
  {
    slug: "identifikasi-masalah-sosial",
    title: "Identifikasi Masalah Sosial",
    weekLabel: "Week 1",
    phase: "Problem discovery",
    status: "Initial identification completed",
    route: `${progressBaseRoute}/identifikasi-masalah-sosial`,
  },
  {
    slug: "mini-project-canvas",
    title: "Mini Project Canvas",
    weekLabel: "Week 1",
    phase: "Project design",
    status: "Initial canvas completed",
    route: `${progressBaseRoute}/mini-project-canvas`,
  },
  {
    slug: "problem-validation",
    title: "Problem Validation",
    weekLabel: "Week 2",
    phase: "Connect & collaborate",
    status: "Completed",
    route: `${progressBaseRoute}/problem-validation`,
  },
  {
    slug: "partnership-collaboration",
    title: "Partnership & Collaboration",
    weekLabel: "Week 2",
    phase: "Connect & collaborate",
    status: "In Progress",
    route: `${progressBaseRoute}/partnership-collaboration`,
  },
];

export function getProgressReportIndex(slug: ProgressReportSlug) {
  return progressReports.findIndex((report) => report.slug === slug);
}

export function getAdjacentProgressReports(slug: ProgressReportSlug) {
  const currentIndex = getProgressReportIndex(slug);

  return {
    previous: currentIndex > 0 ? progressReports[currentIndex - 1] : undefined,
    next:
      currentIndex >= 0 && currentIndex < progressReports.length - 1
        ? progressReports[currentIndex + 1]
        : undefined,
  };
}
