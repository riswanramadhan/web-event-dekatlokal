import { ArrowUpRight, Mail } from "lucide-react";
import Link from "next/link";

import { BrandLockup } from "@/components/brand/brand-lockup";
import { platform } from "@/data/platform";

const platformLinks = [
  { label: "Beranda", href: "/" },
  { label: "Daftar event", href: "/events" },
  { label: "Kebijakan privasi", href: "/privacy" },
  { label: "Ketentuan", href: "/terms" },
] as const;

const eventLinks = [
  { label: "AI Co-Creation Lab", href: "/ai-co-creation-lab-makassar" },
  { label: "Perjalanan project", href: "/ai-co-creation-lab-makassar/journey" },
  { label: "Challenges", href: "/ai-co-creation-lab-makassar/challenges" },
  { label: "Laporan dampak", href: "/ai-co-creation-lab-makassar/impact" },
] as const;

const footerLinkClass =
  "inline-flex min-h-10 items-center rounded-md text-sm leading-6 text-slate-600 transition-colors hover:text-brand";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="page-container">
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.45fr_1fr_1fr_1fr] lg:py-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <BrandLockup />
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
              Kelola acara, hubungkan peserta, dan dokumentasikan dampak dalam satu rumah digital.
            </p>
          </div>

          <nav aria-labelledby="footer-platform">
            <h2 id="footer-platform" className="text-sm font-semibold text-ink">
              Platform
            </h2>
            <ul className="mt-3">
              {platformLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-event">
            <h2 id="footer-event" className="text-sm font-semibold text-ink">
              Event pertama
            </h2>
            <ul className="mt-3">
              {eventLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-ink">DekatLokal</h2>
            <a
              href="https://dekatlokal.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${footerLinkClass} mt-3 gap-2`}
            >
              Kunjungi dekatlokal.com
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            {platform.contact.email ? (
              <a
                href={`mailto:${platform.contact.email}`}
                className={`${footerLinkClass} gap-2`}
              >
                <Mail className="h-4 w-4 text-brand" aria-hidden="true" />
                {platform.contact.email}
              </a>
            ) : (
              <p className="mt-1 flex min-h-10 items-center gap-2 text-sm leading-6 text-slate-500">
                <Mail className="h-4 w-4 text-brand" aria-hidden="true" />
                {platform.contact.statusLabel}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DekatLokal. Built for Local Growth.</p>
          <p>Powered by DekatLokal</p>
        </div>
      </div>
    </footer>
  );
}
