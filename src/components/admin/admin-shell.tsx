"use client";

import { Group, LogOut, Menu, ShieldCheck, Xmark } from "iconoir-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";

const NAV_ITEMS = [
  {
    href: "/admin",
    label: "Daftar Pendaftar",
    description: "Data peserta masuk",
    icon: Group,
  },
  {
    href: "/admin/users",
    label: "Akun Admin",
    description: "Kelola akses panel",
    icon: ShieldCheck,
  },
] as const;

function isActivePath(pathname: string, href: string): boolean {
  return pathname === href;
}

function SidebarContent({
  pathname,
  adminEmail,
  registrationToggle,
  logoutForm,
  onNavigate,
}: {
  pathname: string;
  adminEmail: string;
  registrationToggle: ReactNode;
  logoutForm: ReactNode;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col gap-6 p-5">
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand text-sm font-bold text-white">
          D
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">DekatEvent</p>
          <p className="truncate text-xs text-slate-500">Panel Admin</p>
        </div>
      </div>

      <nav aria-label="Navigasi admin" className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = isActivePath(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`group flex items-start gap-3 rounded-xl px-3 py-2.5 transition ${
                active
                  ? "bg-brand-50 text-brand"
                  : "text-slate-600 hover:bg-slate-50 hover:text-ink"
              }`}
            >
              <Icon
                className={`mt-0.5 h-4.5 w-4.5 shrink-0 ${
                  active ? "text-brand" : "text-slate-400"
                }`}
                aria-hidden="true"
              />
              <span className="min-w-0">
                <span className="block text-sm font-semibold">
                  {item.label}
                </span>
                <span
                  className={`block text-xs ${
                    active ? "text-brand/70" : "text-slate-400"
                  }`}
                >
                  {item.description}
                </span>
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        {registrationToggle}

        <div className="border-t border-slate-200 pt-4">
          <p className="text-xs text-slate-400">Masuk sebagai</p>
          <p className="mt-0.5 truncate text-sm font-medium text-ink">
            {adminEmail}
          </p>
          <div className="mt-3">{logoutForm}</div>
        </div>
      </div>
    </div>
  );
}

export function AdminShell({
  adminEmail,
  registrationToggle,
  logoutForm,
  children,
}: {
  adminEmail: string;
  registrationToggle: ReactNode;
  logoutForm: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close the drawer whenever the route changes, so a tap on a nav item does
  // not leave the overlay covering the page it just opened.
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!drawerOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDrawerOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const activeItem = NAV_ITEMS.find((item) => isActivePath(pathname, item.href));

  return (
    <div className="min-h-full bg-surface lg:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white lg:sticky lg:top-0 lg:block lg:h-screen">
        <SidebarContent
          pathname={pathname}
          adminEmail={adminEmail}
          registrationToggle={registrationToggle}
          logoutForm={logoutForm}
        />
      </aside>

      {/* Mobile drawer */}
      {drawerOpen ? (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-slate-950/40 backdrop-blur-[2px]"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu admin"
            className="absolute inset-y-0 left-0 w-[17rem] max-w-[85vw] overflow-y-auto bg-white shadow-float"
          >
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Tutup menu"
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100"
            >
              <Xmark className="h-5 w-5" aria-hidden="true" />
            </button>
            <SidebarContent
              pathname={pathname}
              adminEmail={adminEmail}
              registrationToggle={registrationToggle}
              logoutForm={logoutForm}
              onNavigate={() => setDrawerOpen(false)}
            />
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-[60] flex items-center gap-3 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Buka menu"
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          <p className="min-w-0 truncate text-sm font-semibold text-ink">
            {activeItem?.label ?? "Panel Admin"}
          </p>
        </header>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

export function LogoutButton() {
  // Pending state must come from useFormStatus, not from local state set in
  // onClick. Disabling a submit button inside its own click handler makes the
  // browser cancel the submission, so the form action never runs.
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:opacity-60"
    >
      <LogOut className="h-4 w-4" aria-hidden="true" />
      {pending ? "Keluar…" : "Keluar"}
    </button>
  );
}
