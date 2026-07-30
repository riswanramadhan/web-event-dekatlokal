"use client";

import { Search, Xmark } from "iconoir-react";
import Link from "next/link";
import { useRef } from "react";

const TYPE_OPTIONS = [
  { value: "", label: "Semua tipe" },
  { value: "student", label: "Mahasiswa" },
  { value: "umkm", label: "UMKM" },
  { value: "general", label: "Umum" },
] as const;

const STATUS_OPTIONS = [
  { value: "", label: "Semua status" },
  { value: "submitted", label: "Masuk" },
  { value: "under_review", label: "Ditinjau" },
  { value: "shortlisted", label: "Shortlist" },
  { value: "accepted", label: "Diterima" },
  { value: "confirmed", label: "Konfirmasi" },
  { value: "attended", label: "Hadir" },
  { value: "completed", label: "Selesai" },
  { value: "rejected", label: "Ditolak" },
  { value: "withdrawn", label: "Mundur" },
] as const;

const selectClass =
  "min-h-10 w-full rounded-xl border border-slate-300 bg-white px-3 pr-8 text-sm text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand-100 sm:w-auto";

export function RegistrationFilters({
  type,
  status,
  query,
  hasFilters,
}: {
  type: string;
  status: string;
  query: string;
  hasFilters: boolean;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  // Native GET form: filters live in the URL, so the view is shareable and
  // survives a refresh without any client state.
  return (
    <form
      ref={formRef}
      method="get"
      className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
    >
      <div className="relative flex-1 sm:min-w-[16rem]">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Cari nama, email, WhatsApp, kode…"
          aria-label="Cari pendaftar"
          className="min-h-10 w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand-100"
        />
      </div>

      <select
        name="type"
        defaultValue={type}
        aria-label="Filter tipe"
        onChange={() => formRef.current?.requestSubmit()}
        className={selectClass}
      >
        {TYPE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        name="status"
        defaultValue={status}
        aria-label="Filter status"
        onChange={() => formRef.current?.requestSubmit()}
        className={selectClass}
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="min-h-10 rounded-xl bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-600"
      >
        Terapkan
      </button>

      {hasFilters ? (
        <Link
          href="/admin"
          className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <Xmark className="h-4 w-4" aria-hidden="true" />
          Reset
        </Link>
      ) : null}
    </form>
  );
}
