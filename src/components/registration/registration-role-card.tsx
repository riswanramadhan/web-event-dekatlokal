import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type RegistrationRoleCardProps = {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  icon: LucideIcon;
  highlights: readonly string[];
  cta: string;
};

export function RegistrationRoleCard({
  title,
  subtitle,
  description,
  href,
  icon: Icon,
  highlights,
  cta,
}: RegistrationRoleCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand">
          <Icon className="h-5.5 w-5.5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{subtitle}</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-ink">{title}</h2>
        </div>
      </div>
      <p className="mt-5 text-sm leading-7 text-slate-600">{description}</p>
      <ul className="mt-6 space-y-3">
        {highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2.5 text-sm leading-6 text-slate-700">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            {highlight}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-600"
      >
        {cta}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
