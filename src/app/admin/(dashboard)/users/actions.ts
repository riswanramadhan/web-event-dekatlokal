"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { recordAuditEvent, requireAdmin } from "@/lib/admin/auth";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

const MIN_PASSWORD_LENGTH = 12;

const createAdminSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Format email tidak valid.")
    .max(254),
  password: z
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      `Password minimal ${MIN_PASSWORD_LENGTH} karakter.`,
    )
    .max(200, "Password terlalu panjang."),
});

export type UserActionState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function createAdminAction(
  _prevState: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  // Server Actions are independently reachable endpoints, so authorization is
  // re-checked here rather than relying on the page that rendered the form.
  const actor = await requireAdmin();
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return { status: "error", message: "Supabase belum dikonfigurasi." };
  }

  const parsed = createAdminSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message:
        parsed.error.issues[0]?.message ?? "Data yang dikirim tidak valid.",
    };
  }

  const { email, password } = parsed.data;

  const { data: created, error: createError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      // Accounts are provisioned by an administrator, so there is no
      // confirmation email to wait for.
      email_confirm: true,
    });

  let userId = created?.user?.id;

  if (createError) {
    // The address may already exist in auth.users (for example created from
    // the Supabase dashboard). Promoting it is safe because only an existing
    // administrator can reach this action.
    const existing = await findAuthUserByEmail(email);

    if (!existing) {
      return {
        status: "error",
        message: `Gagal membuat akun: ${createError.message}`,
      };
    }

    userId = existing;
  }

  if (!userId) {
    return { status: "error", message: "Gagal membuat akun." };
  }

  const { error: grantError } = await supabase
    .from("admin_users")
    .insert({ user_id: userId, email, created_by: actor.userId });

  if (grantError) {
    if (grantError.code === "23505") {
      return {
        status: "error",
        message: "Akun tersebut sudah terdaftar sebagai admin.",
      };
    }

    return {
      status: "error",
      message: `Akun dibuat tetapi gagal diberi akses admin: ${grantError.message}`,
    };
  }

  await recordAuditEvent("create_admin", actor.email, email);
  revalidatePath("/admin/users");

  return {
    status: "success",
    message: `Admin ${email} berhasil ditambahkan.`,
  };
}

export async function deleteAdminAction(
  _prevState: UserActionState,
  formData: FormData,
): Promise<UserActionState> {
  const actor = await requireAdmin();
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return { status: "error", message: "Supabase belum dikonfigurasi." };
  }

  const userId = z
    .string()
    .uuid()
    .safeParse(formData.get("userId"));

  if (!userId.success) {
    return { status: "error", message: "Admin yang dipilih tidak valid." };
  }

  // Removing your own access would immediately lock you out of the panel.
  if (userId.data === actor.userId) {
    return {
      status: "error",
      message: "Anda tidak dapat menghapus akun Anda sendiri.",
    };
  }

  const { count, error: countError } = await supabase
    .from("admin_users")
    .select("user_id", { count: "exact", head: true });

  if (countError) {
    return { status: "error", message: "Gagal memeriksa jumlah admin." };
  }

  // Guards against deleting the final administrator, which would leave the
  // panel permanently unreachable without manual SQL.
  if ((count ?? 0) <= 1) {
    return {
      status: "error",
      message: "Tidak dapat menghapus admin terakhir.",
    };
  }

  const { data: target, error: lookupError } = await supabase
    .from("admin_users")
    .select("email")
    .eq("user_id", userId.data)
    .maybeSingle();

  if (lookupError || !target) {
    return { status: "error", message: "Admin tersebut tidak ditemukan." };
  }

  const { error: revokeError } = await supabase
    .from("admin_users")
    .delete()
    .eq("user_id", userId.data);

  if (revokeError) {
    return {
      status: "error",
      message: `Gagal mencabut akses admin: ${revokeError.message}`,
    };
  }

  // Access is revoked above; deleting the auth account also ends any session
  // the removed administrator still holds.
  const { error: deleteError } = await supabase.auth.admin.deleteUser(
    userId.data,
  );

  await recordAuditEvent("delete_admin", actor.email, target.email);
  revalidatePath("/admin/users");

  if (deleteError) {
    return {
      status: "success",
      message: `Akses admin ${target.email} dicabut, tetapi akun login gagal dihapus: ${deleteError.message}`,
    };
  }

  return {
    status: "success",
    message: `Admin ${target.email} berhasil dihapus.`,
  };
}

/**
 * Resolves an email to an auth user id. The Admin API has no direct
 * get-by-email, so this pages through the user list.
 */
async function findAuthUserByEmail(email: string): Promise<string | null> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return null;
  }

  const target = email.toLowerCase();

  for (let page = 1; page <= 10; page += 1) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage: 200,
    });

    if (error || data.users.length === 0) {
      return null;
    }

    const match = data.users.find(
      (user) => user.email?.toLowerCase() === target,
    );

    if (match) {
      return match.id;
    }

    if (data.users.length < 200) {
      return null;
    }
  }

  return null;
}
