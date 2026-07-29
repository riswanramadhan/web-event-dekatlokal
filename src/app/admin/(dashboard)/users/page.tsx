import type { Metadata } from "next";

import { requireAdmin } from "@/lib/admin/auth";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { EmptyState } from "@/components/ui/empty-state";

import { CreateAdminForm, DeleteAdminForm } from "./user-forms";

export const metadata: Metadata = {
  title: "Kelola Admin",
  robots: { index: false, follow: false },
};

type AdminUserRow = {
  user_id: string;
  email: string;
  created_at: string;
};

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AdminUsersPage() {
  const actor = await requireAdmin();
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return (
      <EmptyState
        title="Supabase belum dikonfigurasi"
        description="Lengkapi environment Supabase untuk mengelola akun admin."
      />
    );
  }

  const { data, error } = await supabase
    .from("admin_users")
    .select("user_id, email, created_at")
    .order("created_at", { ascending: true })
    .returns<AdminUserRow[]>();

  const admins = data ?? [];
  const isLastAdmin = admins.length <= 1;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-ink">Kelola Admin</h2>
        <p className="mt-1 text-sm text-slate-600">
          Akun yang terdaftar di sini dapat masuk ke panel dan melihat data
          pendaftar.
        </p>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-base font-semibold text-ink">Tambah admin baru</h3>
        <p className="mt-1 mb-5 text-sm text-slate-600">
          Akun langsung aktif tanpa perlu verifikasi email.
        </p>
        <CreateAdminForm />
      </section>

      <section className="space-y-3">
        <h3 className="text-base font-semibold text-ink">
          Daftar admin ({admins.length})
        </h3>

        {error ? (
          <EmptyState title="Gagal memuat data" description={error.message} />
        ) : admins.length === 0 ? (
          <EmptyState
            title="Belum ada admin terdaftar"
            description="Jalankan perintah bootstrap di SUPABASE_AUTH_SCHEMA.sql terlebih dahulu."
          />
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Ditambahkan</th>
                  <th className="px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {admins.map((admin) => {
                  const isSelf = admin.user_id === actor.userId;

                  return (
                    <tr key={admin.user_id}>
                      <td className="px-4 py-3 font-medium text-ink">
                        {admin.email}
                        {isSelf ? (
                          <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand">
                            Anda
                          </span>
                        ) : null}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                        {formatDate(admin.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <DeleteAdminForm
                          userId={admin.user_id}
                          email={admin.email}
                          disabled={isSelf || isLastAdmin}
                          disabledReason={
                            isSelf
                              ? "Akun Anda"
                              : isLastAdmin
                                ? "Admin terakhir"
                                : undefined
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
