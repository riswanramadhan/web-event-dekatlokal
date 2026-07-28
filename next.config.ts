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
};

export default nextConfig;
