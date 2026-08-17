import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site";

/**
 * `/tes/*` is deliberately absent: those URLs are handed out by the organisers
 * during the event and are blocked in robots.ts and marked noindex. Adding or
 * removing an unlisted route means changing all three together.
 */
const staticRoutes = [
  "/",
  "/events",
  "/privacy",
  "/terms",
  "/ai-co-creation-lab-makassar",
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
