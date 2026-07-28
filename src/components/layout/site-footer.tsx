import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Globe, Mail } from "iconoir-react";
import Link from "next/link";

import { BrandLockup } from "@/components/brand/brand-lockup";
import { ActiveLink } from "@/components/navigation/active-link";

const platformLinks = [
  { label: "Beranda", href: "/" },
  { label: "Daftar event", href: "/events" },
  { label: "Kebijakan privasi", href: "/privacy" },
  { label: "Ketentuan", href: "/terms" },
] as const;

const eventLinks = [
  { label: "AI Co Creation Lab", href: "/ai-co-creation-lab-makassar" },
  { label: "Informasi pendaftaran", href: "/ai-co-creation-lab-makassar/register" },
] as const;

const footerLinkClass =
  "inline-flex min-h-11 items-center rounded-md text-sm leading-6 text-slate-600 transition-colors hover:text-brand";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="page-container">
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.9fr_1fr_1.15fr] lg:py-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <BrandLockup />
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
              Informasi acara dan pendaftaran lokal yang lebih mudah diakses.
            </p>
          </div>

          <nav aria-labelledby="footer-platform">
            <h2 id="footer-platform" className="text-sm font-semibold text-ink">
              Platform
            </h2>
            <ul className="mt-3">
              {platformLinks.map((item) => (
                <li key={item.href}>
                  <ActiveLink
                    href={item.href}
                    match={item.href === "/" ? "exact" : "prefix"}
                    className={footerLinkClass}
                    activeClassName="font-semibold text-brand underline decoration-2 underline-offset-4"
                  >
                    {item.label}
                  </ActiveLink>
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

          <div className="flex flex-col items-start">
            <h2 className="text-sm font-semibold text-ink">DekatLokal</h2>
            <a
              href="https://dekatlokal.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${footerLinkClass} mt-3 gap-2`}
            >
              <Globe
                className="h-4 w-4 text-brand"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              Kunjungi dekatlokal.com
            </a>
            <a
              href="mailto:hello@dekatlokal.com"
              className={`${footerLinkClass} gap-2`}
            >
              <Mail
                className="h-4 w-4 text-brand"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              hello@dekatlokal.com
            </a>
            <a
              href="https://wa.me/6289516335023"
              target="_blank"
              rel="noopener noreferrer"
              className={`${footerLinkClass} gap-2`}
              aria-label="Hubungi DekatLokal melalui WhatsApp di 0895 1633 5023"
            >
              <SiWhatsapp
                className="h-4 w-4 text-brand"
                color="currentColor"
                aria-hidden="true"
              />
              0895 1633 5023
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 border-t border-slate-200 py-6 text-center text-sm text-slate-500 sm:flex-row sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} DekatLokal. Built for Local Growth.</p>
          <p>Powered by DekatLokal</p>
        </div>
      </div>
    </footer>
  );
}
