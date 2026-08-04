"use client";

import {
  Download,
  Enlarge,
  NavArrowLeft,
  NavArrowRight,
  Xmark,
} from "iconoir-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export interface LightboxMediaItem {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
  readonly label?: string;
}

interface MediaLightboxProps {
  readonly title: string;
  readonly items: readonly LightboxMediaItem[];
  readonly mode?: "gallery" | "document";
  readonly downloadUrl?: string;
  readonly downloadLabel?: string;
  readonly triggerLabel?: string;
  readonly triggerClassName?: string;
  readonly imageClassName?: string;
  readonly sizes?: string;
  readonly showInlineNavigation?: boolean;
}

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getNextIndex(current: number, itemCount: number, direction: 1 | -1) {
  return (current + direction + itemCount) % itemCount;
}

export function MediaLightbox({
  title,
  items,
  mode = "gallery",
  downloadUrl,
  downloadLabel = "Unduh PDF",
  triggerLabel,
  triggerClassName = "relative block w-full overflow-hidden bg-slate-100",
  imageClassName = "h-auto w-full object-cover transition duration-300 group-hover:scale-[1.02]",
  sizes = "(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1023px) 50vw, 33vw",
  showInlineNavigation = false,
}: MediaLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const activeItem = items[activeIndex];
  const hasMultipleItems = items.length > 1;

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const move = useCallback(
    (direction: 1 | -1) => {
      setActiveIndex((current) =>
        getNextIndex(current, items.length, direction),
      );
    },
    [items.length],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog();
        return;
      }

      if (mode === "gallery" && hasMultipleItems) {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          move(-1);
          return;
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          move(1);
          return;
        }
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );

      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeDialog, hasMultipleItems, isOpen, mode, move]);

  if (!activeItem) {
    return null;
  }

  const dialog = isOpen ? (
    <div
      className="report-no-print fixed inset-0 z-[100] flex bg-slate-950/85 p-2 backdrop-blur-sm sm:p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closeDialog();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="mx-auto flex min-h-0 w-full max-w-6xl flex-col overflow-hidden rounded-[1.25rem] border border-white/15 bg-slate-950 shadow-2xl"
      >
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-slate-950 px-3 py-3 text-white sm:px-5">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold sm:text-base">{title}</p>
            <p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white/60">
              {mode === "document"
                ? `${items.length} halaman`
                : `${activeIndex + 1} dari ${items.length}`}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {downloadUrl ? (
              <a
                href={downloadUrl}
                download
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 text-xs font-semibold text-white transition hover:bg-white/20 sm:px-4 sm:text-sm"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">{downloadLabel}</span>
                <span className="sm:hidden">Unduh</span>
              </a>
            ) : null}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeDialog}
              aria-label="Tutup pop up"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            >
              <Xmark className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </header>

        {mode === "document" ? (
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-slate-900 p-2 sm:p-5">
            <div className="mx-auto grid max-w-4xl gap-3 sm:gap-5">
              {items.map((item, index) => (
                <figure
                  key={item.src}
                  className="overflow-hidden rounded-lg bg-white shadow-[0_16px_45px_rgba(0,0,0,0.28)]"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 1023px) 96vw, 56rem"
                    className="h-auto w-full"
                  />
                  <figcaption className="border-t border-slate-200 px-3 py-2 text-center font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-slate-500">
                    Halaman {index + 1}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-slate-900 p-2 sm:p-6">
            <Image
              src={activeItem.src}
              alt={activeItem.alt}
              width={activeItem.width}
              height={activeItem.height}
              loading="eager"
              sizes="(max-width: 1023px) 96vw, 70rem"
              className="max-h-full w-auto max-w-full object-contain"
            />
            {hasMultipleItems ? (
              <>
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label="Lihat gambar sebelumnya"
                  className="absolute left-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-slate-950/70 text-white shadow-lg transition hover:bg-slate-950 sm:left-5"
                >
                  <NavArrowLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label="Lihat gambar berikutnya"
                  className="absolute right-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-slate-950/70 text-white shadow-lg transition hover:bg-slate-950 sm:right-5"
                >
                  <NavArrowRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  ) : null;

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-label={triggerLabel ?? `Buka ${title} dalam pop up`}
        className={`group ${triggerClassName}`}
      >
        <Image
          src={activeItem.src}
          alt={activeItem.alt}
          width={activeItem.width}
          height={activeItem.height}
          sizes={sizes}
          className={imageClassName}
        />
        <span className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/95 text-brand shadow-lg">
          <Enlarge className="h-4 w-4" aria-hidden="true" />
        </span>
        {activeItem.label ? (
          <span className="absolute bottom-3 left-3 rounded-full border border-white/70 bg-white/95 px-3 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-slate-700 shadow-lg">
            {activeItem.label}
          </span>
        ) : null}
      </button>

      {showInlineNavigation && hasMultipleItems ? (
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Tampilkan slide sebelumnya"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/95 text-brand shadow-lg transition hover:bg-brand-50"
          >
            <NavArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="inline-flex min-h-10 items-center rounded-full border border-white/70 bg-white/95 px-3 font-mono text-[0.62rem] font-semibold text-slate-700 shadow-lg">
            {activeIndex + 1}/{items.length}
          </span>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Tampilkan slide berikutnya"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/95 text-brand shadow-lg transition hover:bg-brand-50"
          >
            <NavArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) : null}

      {dialog && typeof document !== "undefined"
        ? createPortal(dialog, document.body)
        : null}
    </div>
  );
}
