"use client";

import { ArrowUpRight, CalendarDays, House, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type MobileNavigationItem = {
  readonly href: string;
  readonly label: string;
  readonly icon: "home" | "calendar";
};

type MobileNavigationProps = {
  readonly items: readonly MobileNavigationItem[];
};

export function MobileNavigation({ items }: MobileNavigationProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      toggleRef.current?.focus();
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-800 transition-colors hover:border-brand-100 hover:bg-brand-50 hover:text-brand"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-menu"
        aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
      >
        {isOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {isOpen ? (
        <div
          id="mobile-navigation-menu"
          className="absolute inset-x-0 top-[calc(100%+0.65rem)] rounded-[1.65rem] border border-white/90 bg-white/96 p-3 shadow-float backdrop-blur-2xl"
        >
          <nav aria-label="Navigasi seluler" className="grid gap-2">
            {items.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon === "home" ? House : CalendarDays;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex min-h-12 items-center gap-3 rounded-2xl border px-4 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-brand-100 bg-brand-50 text-brand"
                      : "border-slate-200 bg-white text-slate-700 hover:border-brand-100 hover:bg-brand-50 hover:text-brand"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/ai-co-creation-lab-makassar"
              onClick={() => setIsOpen(false)}
              className="button-loop inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-brand bg-brand px-5 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(2,85,245,0.2)] transition-colors hover:bg-brand-600"
            >
              Lihat Event
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
