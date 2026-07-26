import type { Metadata, Viewport } from "next";
import { Geist_Mono, Poppins } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AnimationProvider } from "@/components/motion/animation-provider";
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
  "Platform event untuk komunitas, organisasi mahasiswa, UMKM, dan program sosial—mulai dari halaman acara hingga laporan dampak.";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "DekatLokal Event",
    template: "%s | DekatLokal Event",
  },
  description,
  applicationName: "DekatLokal Event",
  authors: [{ name: "DekatLokal", url: "https://dekatlokal.com" }],
  creator: "DekatLokal",
  publisher: "DekatLokal",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "DekatLokal Event",
    title: "DekatLokal Event",
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "DekatLokal Event",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DekatLokal Event",
    description,
    images: ["/opengraph-image"],
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
      <body className="flex min-h-screen flex-col antialiased">
        <AnimationProvider />
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
      </body>
    </html>
  );
}
