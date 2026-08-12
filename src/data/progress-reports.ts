export const PROGRESS_REPORT_SLUGS = [
  "leadership-network-mapping",
  "identifikasi-masalah-sosial",
  "mini-project-canvas",
  "problem-validation",
  "partnership-collaboration",
  "pitching-mini-project",
  "final-action-plan",
  "global-communication",
  "lead-the-action",
  "meet-the-leader",
  "leadership-conversation",
  "mini-project-implementation",
  "network-mobilization",
  "process-documentation",
  "measure-reflect-sustain",
  "project-completion-monitoring",
  "impact-measurement",
  "leadership-reflection",
  "final-presentation",
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
    status: "Completed",
    route: `${progressBaseRoute}/partnership-collaboration`,
  },
  {
    slug: "pitching-mini-project",
    title: "Pitching Mini Project",
    weekLabel: "Week 2",
    phase: "Connect & collaborate",
    status: "Completed",
    route: `${progressBaseRoute}/pitching-mini-project`,
  },
  {
    slug: "final-action-plan",
    title: "Finalisasi Action Plan",
    weekLabel: "Week 2",
    phase: "Connect & collaborate",
    status: "Completed",
    route: `${progressBaseRoute}/final-action-plan`,
  },
  {
    slug: "global-communication",
    title: "Global Communication",
    weekLabel: "Week 2",
    phase: "Connect & collaborate",
    status: "Completed",
    route: `${progressBaseRoute}/global-communication`,
  },
  {
    slug: "lead-the-action",
    title: "Lead The Action",
    weekLabel: "Week 3",
    phase: "Lead the action",
    status: "In Progress",
    route: `${progressBaseRoute}/lead-the-action`,
  },
  {
    slug: "meet-the-leader",
    title: "Meet the Leader Challenge",
    weekLabel: "Week 3",
    phase: "Lead the action",
    status: "Documentation Finalization",
    route: `${progressBaseRoute}/meet-the-leader`,
  },
  {
    slug: "leadership-conversation",
    title: "Leadership Conversation Report",
    weekLabel: "Week 3",
    phase: "Lead the action",
    status: "In Progress",
    route: `${progressBaseRoute}/leadership-conversation`,
  },
  {
    slug: "mini-project-implementation",
    title: "Pelaksanaan Mini Project",
    weekLabel: "Week 3",
    phase: "Lead the action",
    status: "Completed — Follow-Up In Progress",
    route: `${progressBaseRoute}/mini-project-implementation`,
  },
  {
    slug: "network-mobilization",
    title: "Mobilisasi Jejaring",
    weekLabel: "Week 3",
    phase: "Lead the action",
    status: "Completed / Documentation",
    route: `${progressBaseRoute}/network-mobilization`,
  },
  {
    slug: "process-documentation",
    title: "Dokumentasi Proses",
    weekLabel: "Week 3",
    phase: "Lead the action",
    status: "In Progress",
    route: `${progressBaseRoute}/process-documentation`,
  },
  {
    slug: "measure-reflect-sustain",
    title: "Week 4 — Measure, Reflect & Sustain",
    weekLabel: "Week 4",
    phase: "Measure, reflect & sustain",
    status: "In Progress",
    route: `${progressBaseRoute}/measure-reflect-sustain`,
  },
  {
    slug: "project-completion-monitoring",
    title: "Project Completion & Monitoring",
    weekLabel: "Week 4",
    phase: "Measure, reflect & sustain",
    status: "In Progress",
    route: `${progressBaseRoute}/project-completion-monitoring`,
  },
  {
    slug: "impact-measurement",
    title: "Impact Measurement",
    weekLabel: "Week 4",
    phase: "Measure, reflect & sustain",
    status: "Data Collection / In Progress",
    route: `${progressBaseRoute}/impact-measurement`,
  },
  {
    slug: "leadership-reflection",
    title: "Leadership Reflection",
    weekLabel: "Week 4",
    phase: "Measure, reflect & sustain",
    status: "To Be Completed",
    route: `${progressBaseRoute}/leadership-reflection`,
  },
  {
    slug: "final-presentation",
    title: "Final Presentation",
    weekLabel: "Week 4",
    phase: "Measure, reflect & sustain",
    status: "Preparation",
    route: `${progressBaseRoute}/final-presentation`,
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
