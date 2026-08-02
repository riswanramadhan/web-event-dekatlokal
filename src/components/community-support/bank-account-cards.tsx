"use client";

import { Check, Copy, ShieldCheck, WarningTriangle } from "iconoir-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  communitySupportContent,
  type CommunitySupportBank,
  type CommunitySupportBankId,
} from "@/data/community-support";

type CopyStatus = {
  readonly bankId: CommunitySupportBankId | null;
  readonly state: "idle" | "copied" | "error";
};

function legacyCopy(value: string): boolean {
  const previousFocus =
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  textArea.style.pointerEvents = "none";
  document.body.appendChild(textArea);
  textArea.select();

  try {
    return document.execCommand("copy");
  } finally {
    textArea.remove();
    previousFocus?.focus({ preventScroll: true });
  }
}

export function BankAccountCards({
  banks,
}: {
  banks: readonly CommunitySupportBank[];
}) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>({
    bankId: null,
    state: "idle",
  });

  useEffect(() => {
    if (copyStatus.state === "idle") {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCopyStatus({ bankId: null, state: "idle" });
    }, 2800);

    return () => window.clearTimeout(timeout);
  }, [copyStatus]);

  async function copyAccountNumber(bank: CommunitySupportBank) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(bank.accountNumber);
      } else if (!legacyCopy(bank.accountNumber)) {
        throw new Error("Clipboard unavailable");
      }

      setCopyStatus({ bankId: bank.id, state: "copied" });
    } catch {
      setCopyStatus({ bankId: bank.id, state: "error" });
    }
  }

  return (
    <div className="mt-10">
      <div className="grid gap-4 lg:grid-cols-2">
        {banks.map((bank) => {
          const isCopied =
            copyStatus.bankId === bank.id && copyStatus.state === "copied";
          const hasError =
            copyStatus.bankId === bank.id && copyStatus.state === "error";

          return (
            <article
              key={bank.id}
              className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_16px_42px_rgba(1,34,98,0.06)] sm:p-7"
            >
              <div
                aria-hidden="true"
                className="absolute right-0 top-0 h-24 w-24 rounded-bl-[4rem] bg-brand-50"
              />
              <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Rekening tujuan
                  </p>
                  <h3 className="mt-2 text-lg font-semibold leading-7 tracking-[-0.03em] text-ink sm:text-xl">
                    {bank.name}
                  </h3>
                </div>
                <div className="flex h-12 w-28 shrink-0 items-center justify-end sm:w-36">
                  <Image
                    src={bank.logo.src}
                    alt=""
                    width={bank.logo.width}
                    height={bank.logo.height}
                    sizes="(min-width: 640px) 144px, 112px"
                    className="h-auto max-h-10 w-full object-contain object-right"
                  />
                </div>
              </div>

              <dl className="relative mt-7">
                <div>
                  <dt className="text-xs font-medium text-slate-500">
                    Nomor Rekening
                  </dt>
                  <dd className="mt-1.5 break-all font-mono text-[1.7rem] font-semibold leading-tight tracking-[-0.035em] text-ink sm:text-3xl">
                    {bank.accountNumber}
                  </dd>
                </div>
                <div className="mt-5 border-t border-slate-200 pt-4">
                  <dt className="text-xs font-medium text-slate-500">
                    Atas Nama
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">
                    {bank.accountHolder}
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={() => copyAccountNumber(bank)}
                aria-label={`Copy ${bank.name} account number ${bank.accountNumber}`}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-5 py-3 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand-100"
              >
                {isCopied ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
                {isCopied ? "Copied" : "Copy Account Number"}
              </button>
              <p
                className={`mt-2 min-h-5 text-center text-xs leading-5 ${
                  hasError ? "font-medium text-red-700" : "text-slate-500"
                }`}
                aria-live="polite"
              >
                {isCopied
                  ? `${bank.name} account number copied.`
                  : hasError
                    ? "Belum dapat disalin otomatis. Tekan lama nomor rekening untuk menyalin."
                    : "Tap once, then paste it in your banking app."}
              </p>
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-6 text-amber-950 sm:px-5">
        <WarningTriangle
          className="mt-0.5 h-5 w-5 shrink-0 text-amber-700"
          strokeWidth={1.8}
          aria-hidden="true"
        />
        <div>
          <p className="font-semibold">Check before you send</p>
          <p className="mt-1">{communitySupportContent.accounts.warning}</p>
        </div>
      </div>

      <p className="mt-4 flex items-center gap-2 text-xs leading-5 text-slate-500">
        <ShieldCheck
          className="h-4 w-4 shrink-0 text-brand"
          strokeWidth={1.8}
          aria-hidden="true"
        />
        Bukti transfer dikirim lewat form private di bawah, bukan lewat halaman
        publik.
      </p>
    </div>
  );
}
