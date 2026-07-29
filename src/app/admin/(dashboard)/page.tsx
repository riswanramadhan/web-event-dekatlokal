import type { Metadata } from "next";
import Link from "next/link";

import { EmptyState } from "@/components/ui/empty-state";
import { EventStatusBadge } from "@/components/ui/status-badge";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Dashboard Pendaftar",
  robots: { index: false, follow: false },
};

const PAGE_SIZE = 25;

const REGISTRATION_TYPES = ["student", "umkm", "general"] as const;

const REGISTRATION_STATUSES = [
  "submitted",
  "under_review",
  "shortlisted",
  "accepted",
  "rejected",
  "confirmed",
  "attended",
  "completed",
  "withdrawn",
] as const;

type RegistrationType = (typeof REGISTRATION_TYPES)[number];
type RegistrationStatus = (typeof REGISTRATION_STATUSES)[number];

type EmbeddedEvent = { slug: string; title: string };

type RegistrationRow = {
  id: string;
  created_at: string;
  registration_type: RegistrationType;
  status: RegistrationStatus;
  submission_code: string;
  full_name: string;
  email: string | null;
  whatsapp: string;
  institution_name: string | null;
  business_name: string | null;
  // PostgREST embeds a to-one relation as an object, but returns an array
  // when it resolves the relationship as to-many. Accept both shapes.
  events: EmbeddedEvent | EmbeddedEvent[] | null;
};

function eventTitle(events: RegistrationRow["events"]): string {
  const event = Array.isArray(events) ? events[0] : events;
  return event?.title ?? "-";
}

function isRegistrationType(value: unknown): value is RegistrationType {
  return REGISTRATION_TYPES.includes(value as RegistrationType);
}

function isRegistrationStatus(value: unknown): value is RegistrationStatus {
  return REGISTRATION_STATUSES.includes(value as RegistrationStatus);
}

function statusTone(
  status: RegistrationStatus,
): "blue" | "green" | "amber" | "neutral" {
  if (
    status === "accepted" ||
    status === "confirmed" ||
    status === "attended" ||
    status === "completed"
  ) {
    return "green";
  }

  if (status === "under_review" || status === "shortlisted") {
    return "amber";
  }

  if (status === "rejected" || status === "withdrawn") {
    return "neutral";
  }

  return "blue";
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function buildQueryString(params: Record<string, string | undefined>): string {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value) {
      query.set(key, value);
    }
  }

  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
}

type AdminDashboardPageProps = {
  searchParams: Promise<{
    type?: string;
    status?: string;
    page?: string;
  }>;
};

export default async function AdminDashboardPage({
  searchParams,
}: AdminDashboardPageProps) {
  const resolvedSearchParams = await searchParams;
  const typeFilter = isRegistrationType(resolvedSearchParams.type)
    ? resolvedSearchParams.type
    : undefined;
  const statusFilter = isRegistrationStatus(resolvedSearchParams.status)
    ? resolvedSearchParams.status
    : undefined;
  const currentPage = Math.max(1, Number(resolvedSearchParams.page) || 1);

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return (
      <EmptyState
        title="Supabase belum dikonfigurasi"
        description="Isi NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di environment untuk melihat data pendaftar."
      />
    );
  }

  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("registrations")
    .select(
      "id, created_at, registration_type, status, submission_code, full_name, email, whatsapp, institution_name, business_name, events(slug, title)",
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (typeFilter) {
    query = query.eq("registration_type", typeFilter);
  }

  if (statusFilter) {
    query = query.eq("status", statusFilter);
  }

  const { data, count, error } = await query.returns<RegistrationRow[]>();

  if (error) {
    return <EmptyState title="Gagal memuat data" description={error.message} />;
  }

  const registrations = data ?? [];
  const totalCount = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink">Daftar Pendaftar</h2>
        <p className="mt-1 text-sm text-slate-600">
          {totalCount} pendaftar{typeFilter || statusFilter ? " (terfilter)" : ""}
        </p>
      </div>

      <form
        method="get"
        className="flex flex-wrap items-end gap-4 rounded-2xl border border-slate-200 bg-white p-4"
      >
        <div>
          <label htmlFor="type" className="block text-xs font-semibold text-slate-600">
            Tipe
          </label>
          <select
            id="type"
            name="type"
            defaultValue={typeFilter ?? ""}
            className="mt-1 min-h-10 rounded-xl border border-slate-300 px-3 text-sm text-ink"
          >
            <option value="">Semua</option>
            {REGISTRATION_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-xs font-semibold text-slate-600">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={statusFilter ?? ""}
            className="mt-1 min-h-10 rounded-xl border border-slate-300 px-3 text-sm text-ink"
          >
            <option value="">Semua</option>
            {REGISTRATION_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="min-h-10 rounded-full bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          Terapkan
        </button>
      </form>

      {registrations.length === 0 ? (
        <EmptyState
          title="Belum ada pendaftar"
          description="Belum ada data yang cocok dengan filter ini."
        />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[840px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Event</th>
                <th className="px-4 py-3">Tipe</th>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Kontak</th>
                <th className="px-4 py-3">Institusi/Usaha</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Kode</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {registrations.map((registration) => (
                <tr key={registration.id}>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                    {formatDate(registration.created_at)}
                  </td>
                  <td className="px-4 py-3 text-ink">
                    {eventTitle(registration.events)}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {registration.registration_type}
                  </td>
                  <td className="px-4 py-3 font-medium text-ink">
                    {registration.full_name}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    <div>{registration.email ?? "-"}</div>
                    <div>{registration.whatsapp}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {registration.institution_name ??
                      registration.business_name ??
                      "-"}
                  </td>
                  <td className="px-4 py-3">
                    <EventStatusBadge tone={statusTone(registration.status)}>
                      {registration.status}
                    </EventStatusBadge>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">
                    {registration.submission_code}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 ? (
        <div className="flex items-center justify-between text-sm text-slate-600">
          <Link
            href={`/admin${buildQueryString({
              type: typeFilter,
              status: statusFilter,
              page: currentPage > 1 ? String(currentPage - 1) : undefined,
            })}`}
            aria-disabled={currentPage <= 1}
            className={`rounded-full border border-slate-200 px-4 py-2 ${
              currentPage <= 1
                ? "pointer-events-none opacity-40"
                : "hover:border-brand-200 hover:text-brand"
            }`}
          >
            Sebelumnya
          </Link>
          <span>
            Halaman {currentPage} dari {totalPages}
          </span>
          <Link
            href={`/admin${buildQueryString({
              type: typeFilter,
              status: statusFilter,
              page: String(currentPage + 1),
            })}`}
            aria-disabled={currentPage >= totalPages}
            className={`rounded-full border border-slate-200 px-4 py-2 ${
              currentPage >= totalPages
                ? "pointer-events-none opacity-40"
                : "hover:border-brand-200 hover:text-brand"
            }`}
          >
            Berikutnya
          </Link>
        </div>
      ) : null}
    </div>
  );
}
