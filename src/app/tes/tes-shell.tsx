import type { ReactNode } from "react";

/**
 * Bingkai layar peserta yang tidak berbatas waktu: gerbang, pilih nama, selesai,
 * hasil, dan refleksi.
 *
 * Elemennya `<main id="main-content">`, bukan `<div>`. `ChromeGate` sengaja
 * tidak membungkus `/tes` dengan `<main>` supaya layar pengerjaan bebas menyusun
 * header dan footer sticky-nya sendiri — akibatnya seluruh `/tes` sempat tidak
 * punya landmark sama sekali, dan tautan "Lewati ke konten" di root layout
 * menunjuk ke id yang tidak ada di halaman mana pun.
 */
export function TesShell({ children }: { children: ReactNode }) {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-dvh w-full max-w-[640px] flex-col justify-center px-4 py-10"
    >
      {children}
    </main>
  );
}
