import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div className={`flex items-center gap-2.5 ${align === "center" ? "justify-center" : ""}`}>
        <span className="h-1.5 w-5 rounded-full bg-brand" aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
          {eyebrow}
        </span>
      </div>
      <h2
        id={id}
        className="mt-4 text-balance text-3xl font-semibold leading-[1.15] tracking-[-0.045em] text-ink sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
