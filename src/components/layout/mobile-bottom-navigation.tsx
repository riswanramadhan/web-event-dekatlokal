"use client";

import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import {
  Calendar,
  HomeSimple,
  Map,
  MenuScale,
  Page,
  PrivacyPolicy,
  Xmark,
} from "iconoir-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const eventPath = "/ai-co-creation-lab-makassar";
const journeyHref = `${eventPath}#alur-kegiatan`;

const sheetLinks = [
  { href: "/privacy", label: "Privacy", icon: PrivacyPolicy },
  { href: "/terms", label: "Terms", icon: Page },
] as const;

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

export function MobileBottomNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hash, setHash] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const sheet = sheetRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getFocusableElements(sheet ?? document.body)[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !sheet) return;

      const focusable = getFocusableElements(sheet);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const journeyActive =
    pathname === eventPath && hash === "#alur-kegiatan" && !isOpen;
  const eventActive =
    (pathname === eventPath || pathname.startsWith(`${eventPath}/`)) &&
    !journeyActive &&
    !isOpen;

  const closeSheet = () => setIsOpen(false);

  return (
    <>
      {isOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[70] cursor-default bg-slate-950/35 md:hidden"
            onClick={closeSheet}
            aria-label="Tutup menu"
          />
          <div
            ref={sheetRef}
            id="mobile-more-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-more-menu-title"
            className="fixed inset-x-3 bottom-[calc(5.3rem+env(safe-area-inset-bottom))] z-[80] mx-auto max-w-md rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(1,34,98,0.2)] md:hidden"
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
              <div>
                <p
                  id="mobile-more-menu-title"
                  className="text-base font-semibold text-ink"
                >
                  Menu lainnya
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Bantuan dan informasi legal
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  closeSheet();
                  menuButtonRef.current?.focus();
                }}
                className="inline-flex h-11 w-11 items-center justify-center text-slate-700 transition-colors hover:text-brand"
                aria-label="Tutup menu lainnya"
              >
                <Xmark
                  className="h-6 w-6"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </button>
            </div>

            <nav aria-label="Navigasi tambahan" className="mt-3 grid gap-1">
              {sheetLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeSheet}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-brand"
                        : "text-slate-700 hover:bg-brand-50 hover:text-brand"
                    }`}
                  >
                    <Icon
                      className="h-5 w-5 shrink-0"
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                    {item.label}
                    {isActive ? (
                      <span
                        className="ml-auto h-1.5 w-1.5 rounded-full bg-brand"
                        aria-hidden="true"
                      />
                    ) : null}
                  </Link>
                );
              })}

              <a
                href="https://wa.me/6289516335023"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeSheet}
                className="flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand"
                aria-label="Hubungi DekatLokal melalui WhatsApp"
              >
                <SiWhatsapp
                  className="h-5 w-5 shrink-0"
                  color="currentColor"
                  aria-hidden="true"
                />
                WhatsApp
              </a>
            </nav>
          </div>
        </>
      ) : null}

      <nav
        aria-label="Navigasi bawah"
        className="fixed inset-x-0 bottom-0 z-[90] border-t border-slate-200 bg-white px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_32px_rgba(1,34,98,0.08)] md:hidden"
      >
        <div className="mx-auto grid h-[4.75rem] max-w-md grid-cols-4">
          <Link
            href="/"
            onClick={closeSheet}
            aria-current={pathname === "/" && !isOpen ? "page" : undefined}
            className={`relative flex min-h-12 flex-col items-center justify-center gap-1 text-[0.68rem] font-medium transition-colors ${
              pathname === "/" && !isOpen
                ? "text-brand"
                : "text-slate-500 hover:text-brand"
            }`}
          >
            <HomeSimple
              className="h-5 w-5"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            Beranda
            {pathname === "/" && !isOpen ? (
              <span
                className="absolute top-1.5 h-0.5 w-5 rounded-full bg-brand"
                aria-hidden="true"
              />
            ) : null}
          </Link>

          <Link
            href="/events"
            onClick={closeSheet}
            aria-current={eventActive || pathname === "/events" ? "page" : undefined}
            className={`relative flex min-h-12 flex-col items-center justify-center gap-1 text-[0.68rem] font-medium transition-colors ${
              eventActive || (pathname === "/events" && !isOpen)
                ? "text-brand"
                : "text-slate-500 hover:text-brand"
            }`}
          >
            <Calendar
              className="h-5 w-5"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            Event
            {eventActive || (pathname === "/events" && !isOpen) ? (
              <span
                className="absolute top-1.5 h-0.5 w-5 rounded-full bg-brand"
                aria-hidden="true"
              />
            ) : null}
          </Link>

          <Link
            href={journeyHref}
            onClick={() => {
              setHash("#alur-kegiatan");
              closeSheet();
            }}
            aria-current={journeyActive ? "location" : undefined}
            className={`relative flex min-h-12 flex-col items-center justify-center gap-1 text-[0.68rem] font-medium transition-colors ${
              journeyActive
                ? "text-brand"
                : "text-slate-500 hover:text-brand"
            }`}
          >
            <Map
              className="h-5 w-5"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            Perjalanan
            {journeyActive ? (
              <span
                className="absolute top-1.5 h-0.5 w-5 rounded-full bg-brand"
                aria-hidden="true"
              />
            ) : null}
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-more-menu"
            className={`relative flex min-h-12 flex-col items-center justify-center gap-1 text-[0.68rem] font-medium transition-colors ${
              isOpen ? "text-brand" : "text-slate-500 hover:text-brand"
            }`}
          >
            <MenuScale
              className="h-5 w-5"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            Menu
            {isOpen ? (
              <span
                className="absolute top-1.5 h-0.5 w-5 rounded-full bg-brand"
                aria-hidden="true"
              />
            ) : null}
          </button>
        </div>
      </nav>
    </>
  );
}
