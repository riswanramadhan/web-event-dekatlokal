import type { Metadata } from "next";

import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login Admin",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-surface px-4 py-12">
      <div className="w-full max-w-sm rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-card">
        <h1 className="text-xl font-semibold text-ink">Login Admin</h1>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          Masuk untuk melihat data pendaftar DekatEvent.
        </p>

        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
