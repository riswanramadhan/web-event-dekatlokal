"use client";

import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Calendar,
  HomeSimple,
  Map,
  MenuScale,
  Page,
  PrivacyPolicy,
  QrCode,
  Xmark,
} from "iconoir-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const eventPath = "/ai-co-creation-lab-makassar";
const journeyHref = `${eventPath}#alur-kegiatan`;
const studentRegistrationPath = `${eventPath}/register/student`;

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
  const shouldReduceMotion = useReducedMotion();
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
  const studentRegistrationActive =
    pathname === studentRegistrationPath && !isOpen;
  const eventActive =
    (pathname === eventPath || pathname.startsWith(`${eventPath}/`)) &&
    !journeyActive &&
    !studentRegistrationActive &&
    !isOpen;

  const closeSheet = (restoreFocus = false) => {
    setIsOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  };

  const itemClassName =
    "relative flex min-h-12 flex-col items-center justify-center gap-1 rounded-2xl px-0.5 text-[0.62rem] font-medium leading-none transition-colors";

  return (
    <>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <>
            <motion.button
              type="button"
              key="mobile-menu-backdrop"
              className="fixed inset-0 z-[70] cursor-default bg-slate-950/35 backdrop-blur-[2px] md:hidden"
              onClick={() => closeSheet(true)}
              tabIndex={-1}
              aria-label="Tutup menu lainnya"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.24 }}
            />
            <motion.div
              ref={sheetRef}
              key="mobile-menu-sheet"
              id="mobile-more-menu"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-more-menu-title"
              className="fixed inset-x-3 bottom-[calc(6.35rem+env(safe-area-inset-bottom))] z-[80] mx-auto max-w-md rounded-[1.75rem] border border-white/80 bg-white/95 p-4 shadow-[0_24px_70px_rgba(1,34,98,0.24)] backdrop-blur-xl md:hidden"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 44, scale: 0.97 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 28, scale: 0.985 }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 0.42,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-200"
                aria-hidden="true"
              />
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
                  onClick={() => closeSheet(true)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand"
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
                      onClick={() => closeSheet()}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-brand-50 text-brand"
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
                  onClick={() => closeSheet()}
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
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <nav
        aria-label="Navigasi bawah"
        className="fixed inset-x-3 bottom-[calc(0.7rem+env(safe-area-inset-bottom))] z-[90] mx-auto max-w-md rounded-[1.8rem] border border-white/90 bg-white/94 px-1.5 shadow-[0_18px_55px_rgba(1,34,98,0.2)] backdrop-blur-xl md:hidden"
      >
        <div className="grid h-[4.6rem] grid-cols-5 items-stretch">
          <Link
            href="/"
            onClick={() => closeSheet()}
            aria-current={pathname === "/" && !isOpen ? "page" : undefined}
            className={`${itemClassName} ${
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
                className="absolute bottom-1.5 h-1 w-1 rounded-full bg-brand"
                aria-hidden="true"
              />
            ) : null}
          </Link>

          <Link
            href="/events"
            onClick={() => closeSheet()}
            aria-current={eventActive || pathname === "/events" ? "page" : undefined}
            className={`${itemClassName} ${
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
                className="absolute bottom-1.5 h-1 w-1 rounded-full bg-brand"
                aria-hidden="true"
              />
            ) : null}
          </Link>

          <div className="relative flex items-center justify-center">
            <Link
              href={studentRegistrationPath}
              onClick={() => closeSheet()}
              aria-label="Daftar sebagai mahasiswa"
              aria-current={studentRegistrationActive ? "page" : undefined}
              className={`mobile-register-cta absolute bottom-4 flex h-[4.2rem] w-[4.2rem] flex-col items-center justify-center gap-0.5 rounded-[1.45rem] border-[3px] border-white text-white shadow-[0_16px_34px_rgba(2,85,245,0.34)] transition-transform hover:-translate-y-1 focus-visible:-translate-y-1 ${
                studentRegistrationActive ? "bg-brand-700" : "bg-brand"
              }`}
            >
              <QrCode
                className="relative z-[1] h-[1.35rem] w-[1.35rem]"
                strokeWidth={1.9}
                aria-hidden="true"
              />
              <span className="relative z-[1] text-[0.6rem] font-semibold leading-none">
                Daftar
              </span>
            </Link>
          </div>

          <Link
            href={journeyHref}
            onClick={() => {
              setHash("#alur-kegiatan");
              closeSheet();
            }}
            aria-current={journeyActive ? "location" : undefined}
            aria-label="Lihat alur kegiatan"
            className={`${itemClassName} ${
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
            Alur
            {journeyActive ? (
              <span
                className="absolute bottom-1.5 h-1 w-1 rounded-full bg-brand"
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
            className={`${itemClassName} ${
              isOpen
                ? "text-brand"
                : "text-slate-500 hover:text-brand"
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
                className="absolute bottom-1.5 h-1 w-1 rounded-full bg-brand"
                aria-hidden="true"
              />
            ) : null}
          </button>
        </div>
      </nav>
    </>
  );
}
