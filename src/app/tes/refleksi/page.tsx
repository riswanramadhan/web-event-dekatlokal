import type { Metadata } from "next";

import { listParticipants } from "@/lib/assessment/participants";

import { TesShell } from "../tes-shell";

import { RefleksiForm } from "./refleksi-form";

/** Selalu segar: daftar peserta ikut filter status yang bisa berubah. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Refleksi & testimoni",
  // Ikut aturan route tak terdaftar yang sama dengan /tes/[phase]. `robots.ts`
  // sudah memblokir seluruh /tes, jadi tidak ada aturan baru yang perlu
  // ditambahkan di sana maupun di sitemap.
  robots: { index: false, follow: false },
};

export default async function RefleksiPage() {
  const participants = await listParticipants();

  return (
    <TesShell>
      <RefleksiForm
        participants={participants.ok ? participants.participants : null}
      />
    </TesShell>
  );
}
