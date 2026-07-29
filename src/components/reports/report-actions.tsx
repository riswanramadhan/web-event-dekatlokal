"use client";

import { Check, Copy, Link, Printer, WarningCircle } from "iconoir-react";
import { useCallback, useEffect, useRef, useState } from "react";

type CopyState = "idle" | "success" | "error";

type CopyControlProps = {
  text: string;
  idleLabel: string;
  successLabel: string;
  errorLabel: string;
  icon: "copy" | "link";
};

const actionBaseClassName =
  "report-action inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0 disabled:pointer-events-none disabled:opacity-60 sm:w-auto";
const copyActionClassName = `${actionBaseClassName} border-brand-200 bg-white text-brand shadow-[0_8px_22px_rgba(1,34,98,0.06)] hover:border-brand hover:bg-brand-50 hover:shadow-[0_12px_26px_rgba(1,34,98,0.1)]`;

function fallbackCopyText(text: string): boolean {
  const textarea = document.createElement("textarea");
  const activeElement =
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
  const selection = window.getSelection();
  const savedRanges: Range[] = [];

  if (selection) {
    for (let index = 0; index < selection.rangeCount; index += 1) {
      savedRanges.push(selection.getRangeAt(index).cloneRange());
    }
  }

  textarea.value = text;
  textarea.readOnly = true;
  textarea.setAttribute("aria-hidden", "true");
  textarea.style.position = "fixed";
  textarea.style.inset = "0 auto auto 0";
  textarea.style.width = "1px";
  textarea.style.height = "1px";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";

  document.body.appendChild(textarea);

  try {
    textarea.focus({ preventScroll: true });
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    return document.execCommand("copy");
  } finally {
    textarea.remove();

    if (selection) {
      selection.removeAllRanges();
      savedRanges.forEach((range) => selection.addRange(range));
    }

    activeElement?.focus({ preventScroll: true });
  }
}

async function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Clipboard permissions can be denied even when the API exists.
    }
  }

  if (!fallbackCopyText(text)) {
    throw new Error("The browser did not complete the copy command.");
  }
}

function CopyControl({
  text,
  idleLabel,
  successLabel,
  errorLabel,
  icon,
}: CopyControlProps) {
  const [state, setState] = useState<CopyState>("idle");
  const resetTimer = useRef<number | null>(null);

  const clearResetTimer = useCallback(() => {
    if (resetTimer.current !== null) {
      window.clearTimeout(resetTimer.current);
      resetTimer.current = null;
    }
  }, []);

  useEffect(() => clearResetTimer, [clearResetTimer]);

  async function handleCopy() {
    clearResetTimer();

    try {
      await copyText(text);
      setState("success");
    } catch {
      setState("error");
    }

    resetTimer.current = window.setTimeout(() => {
      setState("idle");
      resetTimer.current = null;
    }, 3200);
  }

  const feedback =
    state === "success" ? successLabel : state === "error" ? errorLabel : "";
  const Icon =
    state === "success"
      ? Check
      : state === "error"
        ? WarningCircle
        : icon === "link"
          ? Link
          : Copy;

  return (
    <span className="flex w-full flex-col items-stretch sm:w-auto sm:items-start">
      <button
        type="button"
        className={copyActionClassName}
        onClick={handleCopy}
        data-report-action
      >
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{state === "success" ? successLabel : idleLabel}</span>
      </button>
      <span
        className={`mt-1 min-h-5 px-2 text-xs leading-5 ${
          state === "error" ? "text-red-700" : "text-emerald-700"
        }`}
        aria-live="polite"
        aria-atomic="true"
      >
        {feedback}
      </span>
    </span>
  );
}

export function CopyProgressDescriptionButton({
  text,
}: {
  text: string;
}) {
  return (
    <CopyControl
      text={text}
      idleLabel="Salin deskripsi progress"
      successLabel="Deskripsi tersalin"
      errorLabel="Deskripsi tidak dapat disalin. Silakan salin secara manual."
      icon="copy"
    />
  );
}

export function CopyReportLinkButton({ url }: { url: string }) {
  return (
    <CopyControl
      text={url}
      idleLabel="Salin link laporan"
      successLabel="Link laporan tersalin"
      errorLabel="Link tidak dapat disalin. Silakan salin secara manual."
      icon="link"
    />
  );
}

export function PrintReportButton() {
  return (
    <button
      type="button"
      className={`${actionBaseClassName} border-brand bg-brand text-white shadow-[0_10px_24px_rgba(2,85,245,0.2)] hover:border-brand-600 hover:bg-brand-600`}
      onClick={() => window.print()}
      data-report-action
    >
      <Printer className="h-4 w-4 shrink-0" aria-hidden="true" />
      Cetak / Simpan PDF
    </button>
  );
}
