import { ArrowRight, CheckCircle } from "iconoir-react";
import Link from "next/link";

type IconType = typeof ArrowRight;

type RegistrationRoleCardProps = {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  icon: IconType;
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
        <Icon
          className="h-6 w-6 shrink-0 text-brand"
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{subtitle}</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.035em] text-ink">{title}</h2>
        </div>
      </div>
      <p className="mt-5 text-sm leading-7 text-slate-600">{description}</p>
      <ul className="mt-6 space-y-3">
        {highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2.5 text-sm leading-6 text-slate-700">
            <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            {highlight}
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="button-loop mt-8 inline-flex min-h-12 w-fit max-w-full self-center items-center justify-center gap-2 rounded-full bg-brand px-5 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-600"
      >
        {cta}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
