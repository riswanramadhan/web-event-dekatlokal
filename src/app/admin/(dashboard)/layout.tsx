import type { ReactNode } from "react";

import { logoutAction } from "../actions";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-surface">
      <header className="border-b border-slate-200 bg-white">
        <div className="page-container flex items-center justify-between py-4">
          <h1 className="text-base font-semibold text-ink">
            DekatEvent Admin
          </h1>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-brand-200 hover:text-brand"
            >
              Keluar
            </button>
          </form>
        </div>
      </header>
      <div className="page-container py-8">{children}</div>
    </div>
  );
}
