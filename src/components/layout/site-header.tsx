import { ArrowUpRight, Menu } from "lucide-react";
import Link from "next/link";

import { BrandLockup } from "@/components/brand/brand-lockup";

const navigation = [
  { href: "/events", label: "Event" },
  { href: "/ai-co-creation-lab-makassar/journey", label: "Journey" },
  { href: "/ai-co-creation-lab-makassar/impact", label: "Dampak" },
] as const;

const navLinkClass =
  "inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/90 py-3 backdrop-blur-xl">
      <div className="page-container">
        <div className="flex min-h-14 items-center justify-between rounded-full border border-slate-200/80 bg-white px-3 shadow-[0_12px_35px_rgba(1,34,98,0.08)] sm:px-4">
          <BrandLockup />

          <nav aria-label="Navigasi utama" className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass}>
                {item.label}
              </Link>
            ))}
            <Link
              href="/ai-co-creation-lab-makassar"
              className="ml-2 inline-flex min-h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-600"
            >
              Lihat Event
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </nav>

          <details className="group relative md:hidden">
            <summary className="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-full border border-slate-200 text-slate-800 [&::-webkit-details-marker]:hidden">
              <Menu className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Buka navigasi</span>
            </summary>
            <nav
              aria-label="Navigasi seluler"
              className="absolute right-0 top-14 w-[min(19rem,calc(100vw-2rem))] rounded-3xl border border-slate-200 bg-white p-3 shadow-float"
            >
              <div className="flex flex-col">
                {navigation.map((item) => (
                  <Link key={item.href} href={item.href} className={`${navLinkClass} w-full`}>
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/ai-co-creation-lab-makassar"
                  className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-white"
                >
                  Lihat Event
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
