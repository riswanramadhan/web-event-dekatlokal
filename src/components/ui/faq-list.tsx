import { Plus } from "iconoir-react";

type Faq = {
  question: string;
  answer: string;
};

export function FaqList({ items }: { items: readonly Faq[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <details
          key={item.question}
          className="group overflow-hidden rounded-3xl border border-slate-200 bg-white open:border-brand-200 open:bg-brand-50/50 open:shadow-card"
          open={index === 0}
        >
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-ink transition-colors hover:text-brand focus-visible:outline-none sm:px-7 [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <Plus
              className="h-5 w-5 shrink-0 text-brand transition-transform group-open:rotate-45"
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </summary>
          <p className="border-t border-brand-100 px-5 pb-6 pt-4 text-sm leading-7 text-slate-600 sm:px-7 sm:text-base">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
