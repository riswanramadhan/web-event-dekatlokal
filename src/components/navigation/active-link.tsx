"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";

type ActiveLinkMatch = "exact" | "prefix" | "event";

type ActiveLinkProps = Omit<ComponentProps<typeof Link>, "className" | "children"> & {
  activeClassName?: string;
  children: ReactNode;
  className?: string;
  inactiveClassName?: string;
  match?: ActiveLinkMatch;
};

function matchesPath(
  pathname: string,
  href: ComponentProps<typeof Link>["href"],
  match: ActiveLinkMatch,
) {
  if (typeof href !== "string") return false;

  if (match === "event") {
    return (
      pathname === "/events" ||
      pathname.startsWith("/events/") ||
      pathname === "/ai-co-creation-lab-makassar" ||
      pathname.startsWith("/ai-co-creation-lab-makassar/")
    );
  }

  if (match === "prefix") {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return pathname === href;
}

export function ActiveLink({
  activeClassName = "",
  children,
  className = "",
  inactiveClassName = "",
  match = "exact",
  href,
  ...props
}: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = matchesPath(pathname, href, match);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`${className} ${
        isActive ? activeClassName : inactiveClassName
      }`.trim()}
      {...props}
    >
      {children}
    </Link>
  );
}
