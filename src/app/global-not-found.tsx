import { ArrowLeft, Compass } from "iconoir-react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan | DekatEvent",
  description: "Halaman yang dicari tidak tersedia.",
};

export default function GlobalNotFound() {
  return (
    <html lang="id" className={poppins.className}>
      <body className="min-h-screen antialiased">
        <main className="page-container flex min-h-screen items-center justify-center py-20 text-center">
          <section aria-labelledby="not-found-title">
            <Compass
              className="mx-auto h-9 w-9 text-brand"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <p className="mt-6 font-mono text-sm font-semibold text-brand">
              404
            </p>
            <h1
              id="not-found-title"
              className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-ink sm:text-5xl"
            >
              Halaman tidak ditemukan
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base leading-8 text-slate-600">
              Pranala mungkin berubah atau halaman ini memang tidak
              dipublikasikan.
            </p>
            <Link
              href="/"
              className="mx-auto mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-6 font-semibold text-white transition hover:bg-brand-600"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Kembali ke beranda
            </Link>
          </section>
        </main>
      </body>
    </html>
  );
}
