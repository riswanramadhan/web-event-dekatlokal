import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site";

const staticRoutes = [
  "/",
  "/events",
  "/privacy",
  "/terms",
  "/ai-co-creation-lab-makassar",
  "/ai-co-creation-lab-makassar/register",
  "/ai-co-creation-lab-makassar/register/student",
  "/ai-co-creation-lab-makassar/register/umkm",
  "/ai-co-creation-lab-makassar/journey",
  "/ai-co-creation-lab-makassar/challenges",
  "/ai-co-creation-lab-makassar/teams",
  "/ai-co-creation-lab-makassar/documentation",
  "/ai-co-creation-lab-makassar/impact",
] as const;

const journeySlugs = [
  "personal-leadership-profile",
  "leadership-branding",
  "network-mapping",
  "social-issue",
  "project-canvas",
  "problem-validation",
  "partnership",
  "pitching",
  "action-plan",
  "global-communication",
  "meet-the-leader",
  "leadership-conversation",
  "implementation",
  "network-mobilization",
  "process-documentation",
  "monitoring",
  "impact-measurement",
  "leadership-reflection",
  "final-presentation",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();
  const routes = [
    ...staticRoutes,
    ...journeySlugs.map(
      (slug) => `/ai-co-creation-lab-makassar/journey/${slug}` as const,
    ),
  ];

  return routes.map((route) => ({
    url: new URL(route, `${baseUrl}/`).toString(),
    lastModified,
    changeFrequency:
      route.includes("/journey/") || route.endsWith("/impact") ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/ai-co-creation-lab-makassar" ? 0.9 : 0.7,
  }));
}
