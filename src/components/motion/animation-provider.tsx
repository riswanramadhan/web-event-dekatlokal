"use client";

import AOS from "aos";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function AnimationProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    AOS.init({
      disable: prefersReducedMotion,
      duration: 620,
      easing: "ease-out-cubic",
      offset: 24,
      once: true,
      mirror: false,
      anchorPlacement: "top-bottom",
    });

    const handleLoad = () => AOS.refresh();
    window.addEventListener("load", handleLoad, { once: true });

    return () => {
      window.removeEventListener("load", handleLoad);
      document.documentElement.classList.remove("aos-ready");
    };
  }, []);

  useEffect(() => {
    let refreshTimer = 0;

    const frame = window.requestAnimationFrame(() => {
      const reportPage = document.querySelector(
        "#main-content .progress-report",
      );

      // Progress reports are long, print-oriented Server Components. Leaving
      // them static prevents AOS from mutating streamed markup before React
      // finishes hydrating the complete report tree.
      if (reportPage) {
        document.documentElement.classList.add("aos-ready");
        return;
      }

      const sections = document.querySelectorAll<HTMLElement>(
        "#main-content section, #main-content [data-scroll-reveal]",
      );

      sections.forEach((section, index) => {
        if (
          section.hasAttribute("data-aos") ||
          section.matches("[data-motion-reveal]") ||
          section.querySelector("[data-motion-reveal]")
        ) {
          return;
        }

        section.dataset.aos = "fade-up";
        section.dataset.aosDelay = String(Math.min((index % 3) * 55, 110));
      });

      document.documentElement.classList.add("aos-ready");
      AOS.refreshHard();

      refreshTimer = window.setTimeout(() => AOS.refresh(), 160);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(refreshTimer);
    };
  }, [pathname]);

  return null;
}
