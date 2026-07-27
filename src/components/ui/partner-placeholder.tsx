import { Building } from "iconoir-react";

import { EventStatusBadge } from "@/components/ui/status-badge";

type PartnerLogoPlaceholderProps = {
  label: string;
  name: string;
  approved: boolean;
  status: string;
};

export function PartnerLogoPlaceholder({
  label,
  name,
  approved,
  status,
}: PartnerLogoPlaceholderProps) {
  return (
    <article className="flex min-h-48 flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
        <div className="mt-5 flex items-center gap-3">
          <Building
            className="h-5 w-5 shrink-0 text-brand"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <h3 className="font-semibold text-ink">{approved ? name : "Mitra dalam proses konfirmasi"}</h3>
        </div>
      </div>
      <div className="mt-5">
        <EventStatusBadge tone={approved ? "green" : "neutral"}>
          {approved ? "Disetujui" : status}
        </EventStatusBadge>
      </div>
    </article>
  );
}
