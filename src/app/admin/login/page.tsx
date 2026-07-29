import type { Metadata } from "next";

import { isSupabaseAuthConfigured } from "@/lib/admin/auth";
import { FormNotice } from "@/components/registration/form-components";

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
    <div className="flex min-h-full flex-1 items-center justify-center bg-surface px-4 py-12">
      <div className="w-full max-w-sm rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-card">
        <h1 className="text-xl font-semibold text-ink">Login Admin</h1>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          Masuk untuk melihat data pendaftar DekatEvent.
        </p>

        <div className="mt-6">
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
      </div>
    </div>
  );
}
