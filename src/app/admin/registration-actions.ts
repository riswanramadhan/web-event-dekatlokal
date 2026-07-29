"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { recordAuditEvent, requireAdmin } from "@/lib/admin/auth";
import {
  revalidateRegistrationState,
  setRegistrationOpen,
} from "@/lib/event/registration-state";

export type RegistrationToggleState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function toggleRegistrationAction(
  _prevState: RegistrationToggleState,
  formData: FormData,
): Promise<RegistrationToggleState> {
  // Server Actions are directly reachable endpoints, so authorization is
  // verified here and not only on the page that rendered the control.
  const actor = await requireAdmin();

  const parsed = z
    .enum(["open", "close"])
    .safeParse(formData.get("intent"));

  if (!parsed.success) {
    return { status: "error", message: "Perintah tidak valid." };
  }

  const shouldOpen = parsed.data === "open";
  const result = await setRegistrationOpen(shouldOpen);

  if (!result.ok) {
    return { status: "error", message: result.message };
  }

  await recordAuditEvent(
    shouldOpen ? "open_registration" : "close_registration",
    actor.email,
  );

  // Drop the cached copy used by the public pages, then refresh the admin
  // views so the control reflects the new state straight away.
  revalidateRegistrationState();
  revalidatePath("/admin", "layout");

  return {
    status: "success",
    message: shouldOpen
      ? "Pendaftaran dibuka."
      : "Pendaftaran ditutup.",
  };
}
