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
  "/ai-co-creation-lab-makassar/progress/partnership-collaboration",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

  return staticRoutes.map((route) => ({
    url: new URL(route, `${baseUrl}/`).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : route === "/ai-co-creation-lab-makassar" ? 0.9 : 0.7,
  }));
}
