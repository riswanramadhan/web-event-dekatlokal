import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/api/",
        "/community-support",
        // Participants receive these URLs from the organisers during the event.
        // Unlisted is not a security control — see spec §1.
        "/tes",
        "/ai-co-creation-lab-makassar/journey",
        "/ai-co-creation-lab-makassar/challenges",
        "/ai-co-creation-lab-makassar/teams",
        "/ai-co-creation-lab-makassar/documentation",
        "/ai-co-creation-lab-makassar/impact",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
