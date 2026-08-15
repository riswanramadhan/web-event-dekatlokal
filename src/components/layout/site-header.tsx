import { ArrowUpRight, Calendar, HomeSimple } from "iconoir-react";
import Link from "next/link";

import { BrandLockup } from "@/components/brand/brand-lockup";
import { ActiveLink } from "@/components/navigation/active-link";
import { aiCoCreationLabEvent as event } from "@/data/events";

const navigation = [
  { href: "/", label: "Beranda", icon: "home" },
  { href: "/events", label: "Event", icon: "calendar" },
] as const;

const navLinkClass =
  "relative inline-flex min-h-11 items-center gap-2 px-3 text-sm font-medium text-slate-600 transition-colors after:absolute after:bottom-1.5 after:left-1/2 after:h-0.5 after:w-5 after:-translate-x-1/2 after:scale-x-0 after:rounded-full after:bg-brand after:transition-transform hover:text-brand";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 hidden py-3 md:block">
      <div className="page-container">
        <nav
          aria-label="Navigasi utama"
          className="grid min-h-16 grid-cols-[1fr_auto_1fr] items-center rounded-[1.2rem] border border-white/90 bg-white/90 px-4 shadow-[0_12px_32px_rgba(1,34,98,0.08)] backdrop-blur-xl"
        >
          <div className="justify-self-start">
            <BrandLockup />
          </div>

          <div className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50/70 px-1.5 shadow-[inset_0_1px_2px_rgba(1,34,98,0.06)]">
            {navigation.map((item) => {
              const Icon = item.icon === "home" ? HomeSimple : Calendar;

              return (
                <ActiveLink
                  key={item.href}
                  href={item.href}
                  match={item.href === "/events" ? "event" : "exact"}
                  className={navLinkClass}
                  activeClassName="font-semibold text-brand after:scale-x-100"
                >
                  <Icon
                    className="h-[1.05rem] w-[1.05rem]"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  {item.label}
                </ActiveLink>
              );
            })}
          </div>

          <div className="justify-self-end">
            <Link
              href={event.routes.detail}
              className="button-loop inline-flex min-h-11 items-center gap-2 rounded-full border border-brand bg-brand px-5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(2,85,245,0.18)] transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-brand-600"
            >
              Lihat Event
              <ArrowUpRight
                className="h-4 w-4"
                strokeWidth={1.9}
                aria-hidden="true"
              />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
