"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { MobileBottomNavigation } from "./mobile-bottom-navigation";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/**
 * The admin area is an internal tool, so it opts out of the public site
 * chrome (header, footer, mobile bottom navigation) and the bottom spacing
 * that only exists to clear the fixed mobile navigation.
 */
export function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;

  if (isAdminRoute) {
    return (
      <main id="main-content" className="flex-1">
        {children}
      </main>
    );
  }

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <div
        aria-hidden="true"
        className="pb-[calc(6.1rem+env(safe-area-inset-bottom))] md:hidden"
      />
      <MobileBottomNavigation />
    </>
  );
}
