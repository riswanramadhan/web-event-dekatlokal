import { Circle } from "lucide-react";

type StatusTone = "blue" | "green" | "amber" | "neutral";

const tones: Record<StatusTone, string> = {
  blue: "border-brand-200 bg-brand-50 text-brand-700",
  green: "border-emerald-200 bg-emerald-50 text-emerald-800",
  amber: "border-amber-200 bg-amber-50 text-amber-800",
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
};

export function EventStatusBadge({
  children,
  tone = "blue",
}: {
  children: React.ReactNode;
  tone?: StatusTone;
}) {
  return (
    <span
      className={`inline-flex min-h-8 items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]}`}
    >
      <Circle className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
      {children}
    </span>
  );
}
