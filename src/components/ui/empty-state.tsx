import { MailIn } from "iconoir-react";

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-brand-200 bg-brand-50/55 px-6 py-9 text-center">
      <MailIn
        className="mx-auto h-6 w-6 text-brand"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}
