import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  typescript: {
    // `npm run build` performs the strict check before Next starts its worker.
    ignoreBuildErrors: true,
  },
  output: "standalone",
  images: {
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
    ];
  },
};

export default nextConfig;
