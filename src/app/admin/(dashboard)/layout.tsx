import type { ReactNode } from "react";

import { requireAdmin } from "@/lib/admin/auth";
import { ActiveLink } from "@/components/navigation/active-link";

import { logoutAction } from "../actions";

/**
 * Admin pages must never be prerendered. Without this, Next.js can statically
 * generate the segment at build time, which would run the authorization check
 * once during the build instead of on every request.
 */
export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Authoritative authorization gate. The proxy only proves the visitor is
  // signed in; membership of the admin allowlist is enforced here.
  const admin = await requireAdmin();

  return (
    <div className="flex min-h-full flex-1 flex-col bg-surface">
      <header className="border-b border-slate-200 bg-white">
        <div className="page-container flex flex-wrap items-center justify-between gap-3 py-4">
          <div className="flex items-center gap-6">
            <h1 className="text-base font-semibold text-ink">
              DekatEvent Admin
            </h1>
            <nav aria-label="Navigasi admin" className="flex items-center gap-1">
              <AdminNavLink href="/admin">Pendaftar</AdminNavLink>
              <AdminNavLink href="/admin/users">Kelola Admin</AdminNavLink>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-slate-500 sm:inline">
              {admin.email}
            </span>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-brand-200 hover:text-brand"
              >
                Keluar
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="page-container py-8">{children}</div>
    </div>
  );
}

function AdminNavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <ActiveLink
      href={href}
      className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-ink"
      activeClassName="bg-brand-50 text-brand"
    >
      {children}
    </ActiveLink>
  );
}
