import { NavArrowRight } from "iconoir-react";
import type { Metadata } from "next";
import Link from "next/link";

import {
  Avatar,
  Card,
  PageHeader,
  StatCard,
  StatusBadge,
  TypeBadge,
} from "@/components/admin/ui";
import { EmptyState } from "@/components/ui/empty-state";
import { requireAdmin } from "@/lib/admin/auth";
import { getEventSlug } from "@/lib/event/registration-state";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

import { RegistrationFilters } from "./registration-filters";

export const metadata: Metadata = {
  title: "Daftar Pendaftar",
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

function isRegistrationType(value: unknown): value is RegistrationType {
  return REGISTRATION_TYPES.includes(value as RegistrationType);
}

function isRegistrationStatus(value: unknown): value is RegistrationStatus {
  return REGISTRATION_STATUSES.includes(value as RegistrationStatus);
}

function eventTitle(events: RegistrationRow["events"]): string {
  const event = Array.isArray(events) ? events[0] : events;
  return event?.title ?? "-";
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

/**
 * Escapes user input before interpolating it into a PostgREST `or(...)` filter.
 *
 * Two separate concerns:
 *  - `( ) , * \ "` are structural in the or() grammar, so they are removed to
 *    stop a search term altering the filter itself.
 *  - `%` and `_` are LIKE wildcards. Left as-is, a search for "%" matches every
 *    row and forces a sequential scan, so they are escaped to literals.
 */
function escapeFilterValue(value: string): string {
  return value
    .replace(/[(),*\\"]/g, " ")
    .replace(/[%_]/g, (match) => `\\${match}`)
    .trim();
}

type AdminDashboardPageProps = {
  searchParams: Promise<{
    type?: string;
    status?: string;
    page?: string;
    q?: string;
  }>;
};

export default async function AdminDashboardPage({
  searchParams,
}: AdminDashboardPageProps) {
  // Re-checked per page rather than relying only on the layout: client-side
  // navigation can render a page without re-executing an unchanged layout.
  await requireAdmin();

  const resolvedSearchParams = await searchParams;
  const typeFilter = isRegistrationType(resolvedSearchParams.type)
    ? resolvedSearchParams.type
    : undefined;
  const statusFilter = isRegistrationStatus(resolvedSearchParams.status)
    ? resolvedSearchParams.status
    : undefined;
  const rawQuery = (resolvedSearchParams.q ?? "").slice(0, 120);
  const searchQuery = escapeFilterValue(rawQuery);
  // Floored and bounded: a non-integer like ?page=1.5 would produce a
  // fractional .range() that PostgREST rejects, and ?page=1e400 would be
  // Infinity.
  const parsedPage = Number(resolvedSearchParams.page);
  const currentPage = Number.isFinite(parsedPage)
    ? Math.min(Math.max(1, Math.floor(parsedPage)), 100_000)
    : 1;

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return (
      <>
        <PageHeader title="Daftar Pendaftar" />
        <EmptyState
          title="Supabase belum dikonfigurasi"
          description="Isi NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di environment untuk melihat data pendaftar."
        />
      </>
    );
  }

  // Everything on this page is scoped to the event being managed, matching the
  // registration write path and the open/close toggle. Without this, adding a
  // second event row would silently mix registrants together and make the
  // totals wrong.
  const eventSlug = getEventSlug();
  const { data: eventRow } = await supabase
    .from("events")
    .select("id")
    .eq("slug", eventSlug)
    .maybeSingle<{ id: string }>();

  if (!eventRow) {
    return (
      <>
        <PageHeader title="Daftar Pendaftar" />
        <EmptyState
          title="Event tidak ditemukan"
          description={`Tidak ada event dengan slug "${eventSlug}" di database. Periksa REGISTRATION_EVENT_SLUG dan pastikan SUPABASE_SCHEMA.sql sudah dijalankan.`}
        />
      </>
    );
  }

  const eventId = eventRow.id;
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("registrations")
    .select(
      "id, created_at, registration_type, status, submission_code, full_name, email, whatsapp, institution_name, business_name, events(slug, title)",
      { count: "exact" },
    )
    .eq("event_id", eventId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (typeFilter) {
    query = query.eq("registration_type", typeFilter);
  }

  if (statusFilter) {
    query = query.eq("status", statusFilter);
  }

  if (searchQuery) {
    query = query.or(
      [
        `full_name.ilike.%${searchQuery}%`,
        `email.ilike.%${searchQuery}%`,
        `whatsapp.ilike.%${searchQuery}%`,
        `submission_code.ilike.%${searchQuery}%`,
      ].join(","),
    );
  }

  // Totals come from head-only count queries rather than fetching every row
  // and measuring the array: PostgREST caps a plain select at 1000 rows, so
  // counting client-side would silently under-report once the event grows.
  const countAll = supabase
    .from("registrations")
    .select("id", { count: "exact", head: true })
    .eq("event_id", eventId);
  const countStudent = supabase
    .from("registrations")
    .select("id", { count: "exact", head: true })
    .eq("event_id", eventId)
    .eq("registration_type", "student");
  const countUmkm = supabase
    .from("registrations")
    .select("id", { count: "exact", head: true })
    .eq("event_id", eventId)
    .eq("registration_type", "umkm");

  const [listResult, allResult, studentResult, umkmResult] = await Promise.all([
    query.returns<RegistrationRow[]>(),
    countAll,
    countStudent,
    countUmkm,
  ]);

  const { data, count, error } = listResult;

  if (error) {
    return (
      <>
        <PageHeader title="Daftar Pendaftar" />
        <EmptyState title="Gagal memuat data" description={error.message} />
      </>
    );
  }

  const registrations = data ?? [];
  const totalCount = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const hasFilters = Boolean(typeFilter || statusFilter || rawQuery);

  const totalAll = allResult.count ?? 0;
  const totalStudent = studentResult.count ?? 0;
  const totalUmkm = umkmResult.count ?? 0;

  return (
    <>
      <PageHeader
        title="Daftar Pendaftar"
        description="Data peserta yang sudah mengirim formulir pendaftaran."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total pendaftar" value={totalAll} tone="brand" />
        <StatCard label="Mahasiswa" value={totalStudent} />
        <StatCard label="UMKM" value={totalUmkm} />
      </div>

      <div className="mb-4">
        <RegistrationFilters
          type={typeFilter ?? ""}
          status={statusFilter ?? ""}
          query={rawQuery}
          hasFilters={hasFilters}
        />
      </div>

      {registrations.length === 0 ? (
        <EmptyState
          title={hasFilters ? "Tidak ada hasil" : "Belum ada pendaftar"}
          description={
            hasFilters
              ? "Tidak ada data yang cocok dengan filter atau kata kunci ini."
              : "Data akan muncul di sini setelah ada yang mengirim formulir."
          }
        />
      ) : (
        <RegistrationTable registrations={registrations} />
      )}

      {totalPages > 1 ? (
        <nav
          aria-label="Navigasi halaman"
          className="mt-5 flex items-center justify-between gap-3 text-sm"
        >
          <PaginationLink
            href={`/admin${buildQueryString({
              type: typeFilter,
              status: statusFilter,
              q: rawQuery || undefined,
              page: currentPage > 1 ? String(currentPage - 1) : undefined,
            })}`}
            disabled={currentPage <= 1}
          >
            Sebelumnya
          </PaginationLink>

          <span className="text-slate-500">
            Halaman {currentPage} dari {totalPages}
            <span className="text-slate-400"> · {totalCount} data</span>
          </span>

          <PaginationLink
            href={`/admin${buildQueryString({
              type: typeFilter,
              status: statusFilter,
              q: rawQuery || undefined,
              page: String(currentPage + 1),
            })}`}
            disabled={currentPage >= totalPages}
          >
            Berikutnya
          </PaginationLink>
        </nav>
      ) : null}
    </>
  );
}

function RegistrationTable({
  registrations,
}: {
  registrations: RegistrationRow[];
}) {
  return (
    <Card>
      {/* Negative margins let the table span the card's padding while the
          card itself keeps its rounded corners. */}
      <div className="-mx-5 -my-5 overflow-x-auto">
        <table className="w-full min-w-[940px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
              <th className="px-5 py-3 font-medium">Pendaftar</th>
              <th className="px-5 py-3 font-medium">Tipe</th>
              <th className="px-5 py-3 font-medium">Kontak</th>
              <th className="px-5 py-3 font-medium">Institusi / Usaha</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Waktu</th>
              <th className="px-5 py-3">
                <span className="sr-only">Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {registrations.map((registration) => (
              <tr
                key={registration.id}
                className="group transition hover:bg-slate-50/70"
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <Avatar name={registration.full_name} />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-ink">
                        {registration.full_name}
                      </p>
                      <p className="font-mono text-xs text-slate-400">
                        {registration.submission_code}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <TypeBadge type={registration.registration_type} />
                </td>
                <td className="px-5 py-3.5">
                  <p className="truncate text-slate-700">
                    {registration.email ?? "—"}
                  </p>
                  <p className="font-mono text-xs text-slate-400">
                    {registration.whatsapp}
                  </p>
                </td>
                <td className="px-5 py-3.5">
                  <p className="truncate text-slate-700">
                    {registration.institution_name ??
                      registration.business_name ??
                      "—"}
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    {eventTitle(registration.events)}
                  </p>
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={registration.status} />
                </td>
                <td className="whitespace-nowrap px-5 py-3.5 text-xs text-slate-500">
                  {formatDate(registration.created_at)}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <Link
                    href={`/admin/registrations/${registration.id}`}
                    className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-slate-500 transition group-hover:text-brand hover:bg-brand-50 hover:text-brand"
                  >
                    Detail
                    <NavArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function PaginationLink({
  href,
  disabled,
  children,
}: {
  href: string;
  disabled: boolean;
  children: React.ReactNode;
}) {
  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className="rounded-xl border border-slate-200 px-4 py-2 text-slate-300"
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-medium text-slate-600 transition hover:border-brand-200 hover:text-brand"
    >
      {children}
    </Link>
  );
}
