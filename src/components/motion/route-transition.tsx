"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RefreshDouble } from "iconoir-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigationTimeout = 9_000;

function isModifiedClick(event: MouseEvent) {
  return (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

export function RouteTransition() {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isNavigating, setIsNavigating] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const finishNavigation = () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setIsNavigating(false);
    };

    const frame = window.requestAnimationFrame(finishNavigation);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const startNavigation = () => {
      setIsNavigating(true);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setIsNavigating(false);
        timeoutRef.current = null;
      }, navigationTimeout);
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event)) return;

      const eventTarget =
        event.target instanceof Element ? event.target : null;
      const anchor = eventTarget?.closest<HTMLAnchorElement>("a[href]");

      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        !["http:", "https:"].includes(destination.protocol)
      ) {
        return;
      }

      const current = new URL(window.location.href);
      const routeChanged =
        destination.pathname !== current.pathname ||
        destination.search !== current.search;

      if (!routeChanged) return;
      startNavigation();
    };

    const handleHistoryNavigation = () => startNavigation();
    const handlePageShow = () => setIsNavigating(false);

    document.addEventListener("click", handleDocumentClick, true);
    window.addEventListener("popstate", handleHistoryNavigation);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      window.removeEventListener("popstate", handleHistoryNavigation);
      window.removeEventListener("pageshow", handlePageShow);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isNavigating ? (
        <motion.div
          key="route-transition"
          className="pointer-events-none fixed inset-x-0 top-0 z-[120]"
          role="status"
          aria-live="polite"
          aria-label="Memuat halaman berikutnya"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
        >
          <div className="route-progress-track" aria-hidden="true">
            <div className="route-progress-bar" />
          </div>
          <div className="fixed inset-0 flex items-center justify-center px-4">
            <motion.div
              className="route-loader-card flex items-center gap-2.5 rounded-full border border-white/90 bg-white/95 px-4 py-3 text-xs font-semibold text-brand shadow-[0_18px_50px_rgba(1,34,98,0.18)] backdrop-blur-xl"
              initial={
                shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.96 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.32,
                delay: shouldReduceMotion ? 0 : 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span
                className="route-loader-mark flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white"
                aria-hidden="true"
              >
                <RefreshDouble className="h-4 w-4" strokeWidth={1.9} />
              </span>
              Lagi pindah halaman
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
