"use client";

import { useEffect, useRef, type ReactNode } from "react";

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

/**
 * The only dialog in the participant flow, in two variants.
 *
 * Follows `src/components/layout/mobile-bottom-navigation.tsx` for the focus
 * trap, scroll lock and focus restore rather than introducing a third dialog
 * implementation in the repo.
 *
 * `dismissible` is false for "Waktu habis": that one reports something that has
 * already happened, so Escape and a backdrop click would only let a participant
 * hide it while the submit continues underneath.
 */
export function TesDialog({
  title,
  description,
  dismissible,
  onDismiss,
  children,
}: {
  title: string;
  description?: ReactNode;
  dismissible: boolean;
  onDismiss?: () => void;
  children?: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const panel = panelRef.current;
    openerRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getFocusableElements(panel ?? document.body)[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && dismissible) {
        event.preventDefault();
        onDismiss?.();
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
      openerRef.current?.focus();
    };
  }, [dismissible, onDismiss]);

  return (
    <div className="fixed inset-0 z-[130] flex items-end justify-center bg-slate-950/50 p-4 sm:items-center">
      <div
        ref={panelRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="tes-dialog-title"
        className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-5 shadow-float"
      >
        <h2 id="tes-dialog-title" className="text-base font-semibold text-ink">
          {title}
        </h2>
        {description ? (
          <div className="mt-2 text-sm leading-6 text-slate-600">
            {description}
          </div>
        ) : null}
        {children ? <div className="mt-5 space-y-2">{children}</div> : null}
      </div>
    </div>
  );
}
