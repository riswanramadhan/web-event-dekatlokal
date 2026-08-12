import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  typescript: {
    // `npm run build` performs the strict check before Next starts its worker.
    ignoreBuildErrors: true,
  },
  // OpenNext packages the Sites deployment from Next's standalone server
  // output. Vercel can ignore this redundant bundle when it builds the same
  // source through its own adapter.
  output: "standalone",
  images: {
    // Kept unoptimized so builds stay portable and image transforms are not
    // billed. Remove this to use Vercel's image optimization.
    unoptimized: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Admin pages render registrant personal data. Keep them out of
        // search indexes and stop the URL leaking via the Referer header.
        //
        // Cache-Control is deliberately not set here: Next.js manages it for
        // dynamic App Router routes and emits "no-cache, must-revalidate",
        // which already forces revalidation against the auth gate on every
        // reuse. A value set here would be silently overridden.
        source: "/admin/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
        ],
      },
      {
        source: "/ai-co-creation-lab-makassar/progress/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
      {
        source: "/documents/pitching/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
      {
        source: "/media/global-communication/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
      {
        // Reserved for future public-safe Week 4 evidence. Raw monitoring,
        // assessment, and operational records must never be placed here.
        source: "/documents/week-4/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
