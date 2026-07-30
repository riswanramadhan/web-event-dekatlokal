import type { ReactNode } from "react";

import { AdminShell, LogoutButton } from "@/components/admin/admin-shell";
import { RegistrationToggle } from "@/components/admin/registration-toggle";
import { requireAdmin } from "@/lib/admin/auth";
import { getRegistrationStateFresh } from "@/lib/event/registration-state";

import { logoutAction } from "../actions";

/**
 * Admin pages must never be prerendered. Without this, Next.js can statically
 * generate the segment at build time, which would run the authorization check
 * once during the build instead of on every request.
 */
export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Authoritative authorization gate. The proxy only proves the visitor is
  // signed in; membership of the admin allowlist is enforced here.
  const admin = await requireAdmin();
  const registration = await getRegistrationStateFresh();

  return (
    <AdminShell
      adminEmail={admin.email}
      registrationToggle={
        <RegistrationToggle
          isOpen={registration.isOpen}
          resolved={registration.resolved}
        />
      }
      logoutForm={
        <form action={logoutAction}>
          <LogoutButton />
        </form>
      }
    >
      {children}
    </AdminShell>
  );
}
