"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { CommunitySupportTicker } from "@/components/community-support/community-support-ticker";

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
  const isFocusedSupportRoute = pathname === "/community-support";

  // The admin shell renders its own <main>, so this branch must not add a
  // second one.
  if (isAdminRoute) {
    return <div className="flex flex-1 flex-col">{children}</div>;
  }

  return (
    <>
      {isFocusedSupportRoute ? <CommunitySupportTicker /> : null}
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      {isFocusedSupportRoute ? null : (
        <>
          <div
            aria-hidden="true"
            className="pb-[calc(6.1rem+env(safe-area-inset-bottom))] md:hidden"
          />
          <MobileBottomNavigation />
        </>
      )}
    </>
  );
}
