import type { Metadata, Viewport } from "next";
import { Geist_Mono, Poppins } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MobileBottomNavigation } from "@/components/layout/mobile-bottom-navigation";
import { AnimationProvider } from "@/components/motion/animation-provider";
import { ServiceWorkerRegistration } from "@/components/pwa/service-worker-registration";
import { getSiteUrl } from "@/lib/site";

import "aos/dist/aos.css";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const description =
  "Platform event DekatLokal untuk informasi acara dan pendaftaran yang jelas, aman, dan ramah perangkat mobile.";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "DekatEvent",
    template: "%s | DekatEvent",
  },
  description,
  applicationName: "DekatEvent",
  authors: [{ name: "DekatLokal", url: "https://dekatlokal.com" }],
  creator: "DekatLokal",
  publisher: "DekatLokal",
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/dekatevent-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/dekatevent-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "DekatEvent",
    statusBarStyle: "default",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "DekatEvent",
    title: "DekatEvent",
    description,
    images: [
      {
        url: "/aicl-cocreation-indonesia.webp",
        width: 1600,
        height: 900,
        alt: "Mahasiswa dan pelaku UMKM Indonesia berkolaborasi dalam sesi co creation.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DekatEvent",
    description,
    images: ["/aicl-cocreation-indonesia.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0255F5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${poppins.variable} ${geistMono.variable}`}>
      <body className="flex min-h-screen flex-col pb-[calc(4.75rem+env(safe-area-inset-bottom))] antialiased md:pb-0">
        <AnimationProvider />
        <ServiceWorkerRegistration />
        <a
          href="#main-content"
          className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-full bg-white px-5 py-3 font-semibold text-brand shadow-float transition-transform focus:translate-y-0"
        >
          Lewati ke konten
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileBottomNavigation />
      </body>
    </html>
  );
}
