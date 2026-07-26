"use client";

import AOS from "aos";
import { useEffect } from "react";

export function AnimationProvider() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    document.documentElement.classList.add("aos-ready");

    AOS.init({
      disable: prefersReducedMotion,
      duration: 620,
      easing: "ease-out-cubic",
      offset: 28,
      once: true,
      mirror: false,
    });

    const handleLoad = () => AOS.refresh();
    window.addEventListener("load", handleLoad, { once: true });

    return () => {
      window.removeEventListener("load", handleLoad);
      document.documentElement.classList.remove("aos-ready");
    };
  }, []);

  return null;
}
