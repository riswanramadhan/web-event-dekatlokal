"use server";

import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/admin/auth";

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();

  if (supabase) {
    // Revokes the refresh token server-side, so a copied cookie stops working
    // immediately rather than staying valid until it expires.
    await supabase.auth.signOut();
  }

  redirect("/admin/login");
}
