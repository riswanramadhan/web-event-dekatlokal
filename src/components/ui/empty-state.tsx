import { Inbox } from "lucide-react";

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-brand-200 bg-brand-50/55 px-6 py-9 text-center">
      <span className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-white text-brand shadow-sm">
        <Inbox className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}
