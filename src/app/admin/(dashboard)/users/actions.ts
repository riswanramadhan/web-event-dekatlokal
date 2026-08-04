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
  // Tracks whether an existing login was promoted instead of a new one being
  // created, so the confirmation message can say which password now applies.
  let promotedExistingAccount = false;

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
    promotedExistingAccount = true;
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

  // When an existing login was promoted, the password typed in this form was
  // never applied. Saying so prevents handing out a password that will not
  // work, without silently resetting an account's existing credentials.
  return {
    status: "success",
    message: promotedExistingAccount
      ? `${email} sudah punya akun login sebelumnya, jadi sekarang diberi akses admin dengan password lamanya. Password yang Anda isi TIDAK dipakai. Kalau perlu diganti, lakukan dari Supabase Dashboard.`
      : `Admin ${email} berhasil ditambahkan.`,
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

  // Counting and then deleting as two statements is a race: two admins
  // removing each other simultaneously would both pass a "more than one left"
  // check and empty the allowlist, locking everyone out. This RPC performs the
  // check and the delete in a single locked statement.
  const { data: deleted, error: deleteAdminError } = await supabase
    .rpc("delete_admin_guarded", { p_user_id: userId.data })
    .maybeSingle<{ deleted_email: string }>();

  if (deleteAdminError) {
    // PGRST202 = the function does not exist, i.e. the migration that creates
    // it has not been applied yet. Say so instead of surfacing raw PostgREST
    // text that gives the operator nothing to act on.
    if (deleteAdminError.code === "PGRST202") {
      return {
        status: "error",
        message:
          "Fungsi hapus admin belum tersedia di database. Jalankan SUPABASE_MIGRATION_03.sql di Supabase SQL Editor terlebih dahulu.",
      };
    }

    return {
      status: "error",
      message: `Gagal menghapus admin: ${deleteAdminError.message}`,
    };
  }

  // No row returned means the guard refused: either the last admin, or the id
  // was not on the allowlist.
  if (!deleted?.deleted_email) {
    return {
      status: "error",
      message:
        "Tidak dapat menghapus admin tersebut. Pastikan masih ada admin lain yang tersisa.",
    };
  }

  const targetEmail = deleted.deleted_email;

  // Access is already revoked above; deleting the auth account also ends any
  // session the removed administrator still holds.
  const { error: deleteError } = await supabase.auth.admin.deleteUser(
    userId.data,
  );

  await recordAuditEvent("delete_admin", actor.email, targetEmail);
  revalidatePath("/admin/users");

  if (deleteError) {
    return {
      status: "success",
      message: `Akses admin ${targetEmail} dicabut, tetapi akun login gagal dihapus: ${deleteError.message}`,
    };
  }

  return {
    status: "success",
    message: `Admin ${targetEmail} berhasil dihapus.`,
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
