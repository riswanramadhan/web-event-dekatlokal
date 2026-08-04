import { Lock } from "iconoir-react";
import type { Metadata } from "next";
import Link from "next/link";

import { FormNotice } from "@/components/registration/form-components";
import { isSupabaseAuthConfigured } from "@/lib/admin/auth";

import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Login Admin",
  robots: { index: false, follow: false },
};

// Rendered per request so environment changes take effect on restart, and so
// the page is never served from a build-time cache.
export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  const authConfigured = isSupabaseAuthConfigured();

  return (
    <div className="relative flex min-h-screen flex-1 items-center justify-center overflow-hidden bg-surface px-4 py-12">
      {/* Decorative brand glow, hidden from assistive tech. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-brand-100/50 blur-3xl"
      />

      <div className="relative w-full max-w-[25rem]">
        <div className="mb-7 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand text-lg font-bold text-white shadow-[0_12px_28px_rgba(2,85,245,0.28)]">
            D
          </span>
          <h1 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-ink">
            Panel Admin
          </h1>
          <p className="mt-1.5 text-sm leading-6 text-slate-600">
            Masuk untuk mengelola pendaftar DekatEvent.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-card">
          {authConfigured ? (
            <LoginForm />
          ) : (
            <FormNotice tone="warning">
              Supabase belum dikonfigurasi. Isi{" "}
              <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
              dan{" "}
              <code className="font-mono text-xs">
                NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
              </code>{" "}
              di <code className="font-mono text-xs">.env.local</code>, lalu
              restart server.
            </FormNotice>
          )}
        </div>

        <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <Lock className="h-3.5 w-3.5" aria-hidden="true" />
          Halaman internal khusus pengelola event
        </p>

        <p className="mt-4 text-center text-xs text-slate-400">
          <Link
            href="/"
            className="font-medium text-slate-500 underline-offset-2 transition hover:text-brand hover:underline"
          >
            Kembali ke situs utama
          </Link>
        </p>
      </div>
    </div>
  );
}
