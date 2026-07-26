"use client";

import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ClipboardCopy,
  Home,
  SearchX,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type SubmissionSuccessProps = {
  submissionCode?: string;
  category?: "Mahasiswa" | "UMKM";
  eventPath: string;
  journeyPath: string;
  registerPath: string;
};

function legacyCopy(value: string): boolean {
  const textArea = document.createElement("textarea");

  textArea.value = value;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();

  const copied = document.execCommand("copy");
  textArea.remove();

  return copied;
}

export function SubmissionSuccess({
  submissionCode,
  category,
  eventPath,
  journeyPath,
  registerPath,
}: SubmissionSuccessProps) {
  const [copyStatus, setCopyStatus] = useState<
    "idle" | "copied" | "error"
  >("idle");
  const validSubmission = Boolean(submissionCode && category);

  async function copySubmissionCode() {
    if (!submissionCode) {
      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(submissionCode);
      } else if (!legacyCopy(submissionCode)) {
        throw new Error("Clipboard unavailable");
      }

      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  if (!validSubmission) {
    return (
      <section
        aria-labelledby="missing-code-title"
        className="mx-auto max-w-2xl rounded-[2rem] border border-amber-200 bg-white p-6 text-center shadow-card sm:p-10"
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-amber-50 text-amber-800">
          <SearchX className="h-7 w-7" aria-hidden="true" />
        </span>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-amber-800">
          Kode tidak tersedia
        </p>
        <h1
          id="missing-code-title"
          className="mt-3 text-balance text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl"
        >
          Kode pendaftaran tidak ditemukan.
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Halaman konfirmasi yang valid dibuka otomatis setelah formulir
          berhasil disimpan. Kami tidak dapat menyatakan pendaftaran berhasil
          tanpa kode tersebut.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={registerPath}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Kembali ke pendaftaran
          </Link>
          <Link
            href={eventPath}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-200 bg-white px-6 text-sm font-semibold text-brand transition hover:bg-brand-50"
          >
            Lihat halaman event
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="registration-success-title"
      className="mx-auto max-w-2xl rounded-[2rem] border border-emerald-200 bg-white p-6 text-center shadow-card sm:p-10"
    >
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
        <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
      </span>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
        Pendaftaran berhasil dikirim
      </p>
      <h1
        id="registration-success-title"
        className="mt-3 text-balance text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl"
      >
        Terima kasih sudah mengambil bagian.
      </h1>
      <p className="mt-4 text-sm leading-7 text-slate-600">
        Aplikasi kategori {category} sudah kami terima. Pendaftaran adalah
        tahap aplikasi dan belum berarti diterima sebagai peserta. Informasi
        berikutnya akan disampaikan melalui kontak yang didaftarkan.
      </p>

      <div className="mt-7 rounded-3xl border border-brand-200 bg-brand-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
          Simpan kode pendaftaran
        </p>
        <code className="mt-3 block break-all font-mono text-lg font-semibold tracking-[0.08em] text-brand-900 sm:text-xl">
          {submissionCode}
        </code>
        <button
          type="button"
          onClick={copySubmissionCode}
          className="mx-auto mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-5 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand-50"
        >
          {copyStatus === "copied" ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ClipboardCopy className="h-4 w-4" aria-hidden="true" />
          )}
          {copyStatus === "copied" ? "Kode tersalin" : "Salin kode"}
        </button>
        <p className="mt-2 min-h-5 text-xs leading-5 text-slate-600" aria-live="polite">
          {copyStatus === "error"
            ? "Kode belum dapat disalin otomatis. Pilih dan salin kode secara manual."
            : copyStatus === "copied"
              ? "Kode pendaftaran sudah disalin ke clipboard."
              : "Simpan kode ini untuk komunikasi dengan penyelenggara."}
        </p>
      </div>

      <div className="mt-7 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left">
        <h2 className="font-semibold text-ink">Langkah berikutnya</h2>
        <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
          <li>1. Simpan kode pendaftaran Anda.</li>
          <li>2. Pantau email dan WhatsApp yang didaftarkan.</li>
          <li>3. Tunggu hasil peninjauan dari penyelenggara.</li>
        </ol>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href={eventPath}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Kembali ke event
        </Link>
        <Link
          href={journeyPath}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-200 bg-white px-6 text-sm font-semibold text-brand transition hover:bg-brand-50"
        >
          Lihat perjalanan project
        </Link>
      </div>
    </section>
  );
}
