import Link from "next/link";

/**
 * `/admin/assessment` semula berlabel "Ringkasan", tapi isinya saklar buka-tutup,
 * durasi, dan perawatan data — itu pengaturan. Label "Ringkasan" dipindahkan ke
 * halaman laporan lima layer, satu-satunya halaman yang benar-benar meringkas.
 */
const TABS = [
  { href: "/admin/assessment", label: "Pengaturan" },
  { href: "/admin/assessment/soal", label: "Kelola soal" },
  { href: "/admin/assessment/nilai", label: "Nilai" },
  { href: "/admin/assessment/ringkasan", label: "Ringkasan" },
  { href: "/admin/assessment/refleksi", label: "Refleksi" },
] as const;

export type AssessmentTabHref = (typeof TABS)[number]["href"];

export function AssessmentTabs({ active }: { active: AssessmentTabHref }) {
  return (
    <nav
      aria-label="Bagian pre-test dan post-test"
      className="mb-6 flex flex-wrap gap-1 border-b border-slate-200"
    >
      {TABS.map((tab) => {
        const isActive = tab.href === active;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={`-mb-px inline-flex min-h-11 items-center rounded-t-lg border-b-2 px-3 text-sm font-medium transition ${
              isActive
                ? "border-brand text-brand"
                : "border-transparent text-slate-500 hover:border-slate-300 hover:text-ink"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
