import { ArrowUpRight, CalendarDays, House } from "lucide-react";
import Link from "next/link";

import { BrandLockup } from "@/components/brand/brand-lockup";
import { MobileNavigation } from "@/components/layout/mobile-navigation";

const navigation = [
  { href: "/", label: "Beranda", icon: "home" },
  { href: "/events", label: "Event", icon: "calendar" },
] as const;

const navLinkClass =
  "inline-flex min-h-11 items-center gap-2 rounded-full border border-transparent px-4 text-sm font-medium text-slate-700 transition-[color,background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-brand-100 hover:bg-brand-50 hover:text-brand";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 py-3 sm:py-4">
      <div className="page-container">
        <nav
          aria-label="Navigasi utama"
          className="relative flex min-h-16 items-center justify-between rounded-full border border-white/90 bg-white/82 px-3 shadow-[0_14px_42px_rgba(1,34,98,0.12)] backdrop-blur-2xl sm:px-4"
        >
          <BrandLockup />

          <div className="hidden items-center gap-2 md:flex">
            {navigation.map((item) => {
              const Icon = item.icon === "home" ? House : CalendarDays;

              return (
                <Link key={item.href} href={item.href} className={navLinkClass}>
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/ai-co-creation-lab-makassar"
              className="button-loop inline-flex min-h-11 items-center gap-2 rounded-full border border-brand bg-brand px-5 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(2,85,245,0.2)] transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-[0_12px_26px_rgba(2,85,245,0.28)]"
            >
              Lihat Event
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <MobileNavigation items={navigation} />
        </nav>
      </div>
    </header>
  );
}
