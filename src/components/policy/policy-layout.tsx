import type { ReactNode } from "react";

type PolicySection = {
  id: string;
  title: string;
  content: ReactNode;
};

export function PolicyLayout({
  eyebrow,
  title,
  description,
  lastUpdated,
  sections,
}: {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: readonly PolicySection[];
}) {
  return (
    <>
      <section className="border-b border-slate-200 bg-surface py-16 sm:py-20">
        <div className="page-container">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">{eyebrow}</p>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.05em] text-ink sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-600">{description}</p>
            <p className="mt-5 font-mono text-xs font-medium text-slate-500">
              Diperbarui: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      <div className="page-container py-12 sm:py-16 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 lg:py-20">
        <aside className="hidden lg:block">
          <nav aria-label="Daftar isi" className="sticky top-28 rounded-3xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Daftar isi</p>
            <ol className="mt-3 space-y-1">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex min-h-10 items-center gap-3 rounded-xl px-3 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand"
                  >
                    <span className="font-mono text-xs text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="mx-auto max-w-3xl lg:mx-0">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className={`${index > 0 ? "border-t border-slate-200 pt-10" : ""} pb-10 scroll-mt-32`}
            >
              <p className="font-mono text-xs font-semibold text-brand">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-ink">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                {section.content}
              </div>
            </section>
          ))}
        </article>
      </div>
    </>
  );
}
