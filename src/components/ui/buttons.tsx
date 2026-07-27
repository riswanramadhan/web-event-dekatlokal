import { ArrowRight } from "iconoir-react";
import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  showArrow?: boolean;
  tone?: "brand" | "light";
};

const shared =
  "button-loop inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-55 sm:px-6";

export function PrimaryButton({
  href,
  children,
  className = "",
  external = false,
  showArrow = true,
  tone = "brand",
}: ButtonLinkProps) {
  const toneClasses =
    tone === "light"
      ? "bg-white text-brand shadow-[0_14px_34px_rgba(0,17,49,0.2)] hover:bg-brand-50"
      : "bg-brand text-white shadow-[0_12px_28px_rgba(2,85,245,0.22)] hover:bg-brand-600";
  const classes = `${shared} ${toneClasses} ${className}`;
  const content = (
    <>
      {children}
      {showArrow ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

export function SecondaryButton({
  href,
  children,
  className = "",
  external = false,
  showArrow = true,
}: ButtonLinkProps) {
  const classes = `${shared} border border-brand-200 bg-white text-brand hover:border-brand hover:bg-brand-50 ${className}`;
  const content = (
    <>
      {children}
      {showArrow ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
