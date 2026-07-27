import Link from "next/link";

const links = [
  { label: "Ringkasan", href: "/ai-co-creation-lab-makassar" },
  { label: "Pendaftaran", href: "/ai-co-creation-lab-makassar/register" },
] as const;

export function EventSubnav() {
  return (
    <div className="border-y border-slate-200 bg-white">
      <nav
        aria-label="Navigasi AI Co-Creation Lab"
        className="page-container overflow-x-auto"
      >
        <ul className="flex min-w-max items-center gap-1 py-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex min-h-10 items-center rounded-full px-4 text-sm font-medium text-slate-600 transition-colors hover:bg-brand-50 hover:text-brand"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
