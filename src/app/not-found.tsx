import { ArrowLeft, Compass } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-container py-24 text-center sm:py-32">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand">
        <Compass className="h-6 w-6" aria-hidden="true" />
      </span>
      <p className="mt-6 font-mono text-sm font-semibold text-brand">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-ink">
        Halaman tidak ditemukan
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-base leading-8 text-slate-600">
        Pranala mungkin berubah atau aktivitas yang dicari belum dipublikasikan.
      </p>
      <Link
        href="/"
        className="mx-auto mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-6 font-semibold text-white hover:bg-brand-600"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Kembali ke beranda
      </Link>
    </section>
  );
}
