"use client";

import { Xmark } from "iconoir-react";
import { useEffect, useRef, type ReactNode } from "react";

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

/**
 * The first dialog in the admin panel. The confirmations that existed before
 * this were `window.confirm()`, which cannot hold a form — and the reset flow
 * needs one, because it has to show concrete numbers and collect a typed word.
 *
 * Focus trap, Escape, scroll lock and focus restore follow
 * `src/components/layout/mobile-bottom-navigation.tsx` rather than introducing
 * a dependency for it.
 */
export function ConfirmDialog({
  title,
  onClose,
  children,
  tone = "neutral",
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  tone?: "neutral" | "danger";
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    getFocusableElements(panel ?? document.body)[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panel) {
        return;
      }

      const focusable = getFocusableElements(panel);

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[130] flex items-end justify-center bg-slate-950/50 p-4 sm:items-center">
      <div
        ref={panelRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="admin-dialog-title"
        className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-5 shadow-float"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup dialog"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <Xmark className="h-4 w-4" aria-hidden="true" />
        </button>

        <h2
          id="admin-dialog-title"
          className={`pr-10 text-base font-semibold ${
            tone === "danger" ? "text-red-700" : "text-ink"
          }`}
        >
          {title}
        </h2>

        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}
