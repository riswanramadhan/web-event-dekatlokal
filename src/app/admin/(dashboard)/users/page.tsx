import type { Metadata } from "next";

import { Avatar, Card, PageHeader, StatCard } from "@/components/admin/ui";
import { EmptyState } from "@/components/ui/empty-state";
import { requireAdmin } from "@/lib/admin/auth";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

import { CreateAdminForm, DeleteAdminForm } from "./user-forms";

export const metadata: Metadata = {
  title: "Akun Admin",
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
      <>
        <PageHeader title="Akun Admin" />
        <EmptyState
          title="Supabase belum dikonfigurasi"
          description="Lengkapi environment Supabase untuk mengelola akun admin."
        />
      </>
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
    <>
      <PageHeader
        title="Akun Admin"
        description="Akun yang terdaftar di sini dapat masuk panel dan melihat data pendaftar."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total admin"
          value={admins.length}
          tone="brand"
          hint={isLastAdmin ? "Disarankan minimal 2 akun" : undefined}
        />
      </div>

      <div className="mb-6">
        <Card
          title="Tambah admin baru"
          description="Akun langsung aktif tanpa perlu verifikasi email."
        >
          <CreateAdminForm />
        </Card>
      </div>

      {error ? (
        <EmptyState title="Gagal memuat data" description={error.message} />
      ) : admins.length === 0 ? (
        <EmptyState
          title="Belum ada admin terdaftar"
          description="Jalankan perintah bootstrap di SUPABASE_AUTH_SCHEMA.sql terlebih dahulu."
        />
      ) : (
        <Card>
          <div className="-mx-5 -my-5 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3 font-medium">Admin</th>
                  <th className="px-5 py-3 font-medium">Ditambahkan</th>
                  <th className="px-5 py-3 text-right font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {admins.map((admin) => {
                  const isSelf = admin.user_id === actor.userId;

                  return (
                    <tr
                      key={admin.user_id}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar name={admin.email} />
                          <div className="min-w-0">
                            <p className="truncate font-medium text-ink">
                              {admin.email}
                            </p>
                            {isSelf ? (
                              <span className="text-xs font-medium text-brand">
                                Akun Anda
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-xs text-slate-500">
                        {formatDate(admin.created_at)}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex justify-end">
                          <DeleteAdminForm
                            userId={admin.user_id}
                            email={admin.email}
                            disabled={isSelf || isLastAdmin}
                            disabledReason={
                              isSelf
                                ? "Tidak bisa hapus diri sendiri"
                                : isLastAdmin
                                  ? "Admin terakhir"
                                  : undefined
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </>
  );
}
