"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Copy,
  Lock,
  ShareAndroid,
  Xmark,
} from "iconoir-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  communitySupportBankNames,
  communitySupportContent,
  type CommunitySupportBankId,
} from "@/data/community-support";

export type CommunitySupportSubmission = {
  readonly submissionCode: string;
  readonly amount: number;
  readonly destinationBank: CommunitySupportBankId;
  readonly isAnonymous: boolean;
};

type ShareStatus = "idle" | "shared" | "copied" | "error";

const communitySupportUrl =
  "https://event.dekatlokal.com/community-support";

const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

function formatRupiah(amount: number) {
  return rupiahFormatter.format(amount).replace(/\s/g, "");
}

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
  document.body.appendChild(textArea);
  textArea.select();

  try {
    return document.execCommand("copy");
  } finally {
    textArea.remove();
    previousFocus?.focus({ preventScroll: true });
  }
}

export function SupportSubmissionSuccess({
  submission,
  onClose,
}: {
  submission: CommunitySupportSubmission;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [shareStatus, setShareStatus] = useState<ShareStatus>("idle");

  const closeDialog = useCallback(() => {
    dialogRef.current?.close();
    onClose();
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    titleRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = previousOverflow;

      if (dialog.open) {
        dialog.close();
      }
    };
  }, []);

  async function copyPageUrl(url: string) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      return;
    }

    if (!legacyCopy(url)) {
      throw new Error("Clipboard unavailable");
    }
  }

  async function sharePage() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Community Support | AI Co-Creation Lab Makassar",
          text: "Yuk ikut support AI Co-Creation Lab Makassar.",
          url: communitySupportUrl,
        });
        setShareStatus("shared");
        return;
      }

      await copyPageUrl(communitySupportUrl);
      setShareStatus("copied");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      try {
        await copyPageUrl(communitySupportUrl);
        setShareStatus("copied");
      } catch {
        setShareStatus("error");
      }
    }
  }

  const confirmationMessage = encodeURIComponent(
    `Halo tim DekatLokal, saya sudah support AI Co-Creation Lab Makassar. Kode referensi: ${submission.submissionCode}.`,
  );
  const confirmationUrl = `https://wa.me/6289516335023?text=${confirmationMessage}`;

  return (
    <dialog
      ref={dialogRef}
      id="support-success-dialog"
      aria-labelledby="support-success-title"
      aria-describedby="support-success-description"
      onCancel={(event) => {
        event.preventDefault();
        closeDialog();
      }}
      className="m-auto max-h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] max-w-3xl overflow-y-auto rounded-[1.75rem] border border-emerald-200 bg-white p-0 text-left text-ink shadow-[0_30px_90px_rgba(1,34,98,0.24)] sm:max-h-[calc(100dvh-3rem)] sm:w-[calc(100%-3rem)] sm:rounded-[2rem]"
    >
      <div className="relative px-5 pb-7 pt-8 text-center sm:px-9 sm:pb-9 sm:pt-10">
        <button
          type="button"
          onClick={closeDialog}
          aria-label="Tutup pesan berhasil"
          className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:right-5 sm:top-5"
        >
          <Xmark className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="success-mark mx-auto" aria-hidden="true">
          <span className="success-halo success-halo-one" />
          <span className="success-halo success-halo-two" />
          <svg viewBox="0 0 112 112" className="success-svg">
            <circle className="success-circle" cx="56" cy="56" r="43" />
            <path className="success-check" d="M35 57.5 49.5 72 79 41.5" />
          </svg>
        </div>

        <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-800">
          <Check className="h-4 w-4" aria-hidden="true" />
          Support berhasil dikirim
        </p>
        <h2
          ref={titleRef}
          id="support-success-title"
          tabIndex={-1}
          className="mt-4 text-balance text-3xl font-semibold leading-[1.12] tracking-[-0.05em] text-ink outline-none sm:text-4xl"
        >
          Terima kasih sudah ikut mendukung.
        </h2>
        <p
          id="support-success-description"
          className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base"
        >
          Konfirmasi support kamu sudah tercatat. Simpan kode referensi berikut
          untuk kebutuhan komunikasi dengan tim DekatLokal.
        </p>

        <div className="mt-7 rounded-2xl border border-brand-200 bg-brand-50 p-5 text-left">
          <h3 className="text-base font-semibold text-brand-900">
            Beri kabar lewat WhatsApp
          </h3>
          <p className="mt-1.5 text-sm leading-6 text-brand-900/80">
            CTA ini bersifat opsional. Pesan otomatis hanya memuat konteks
            support dan kode referensi, tanpa nama, nominal, atau bukti
            transfer. WhatsApp tetap membagikan nomor dan profil akunmu kepada
            tim sesuai pengaturan akun.
            {submission.isAnonymous
              ? " Pilihan anonim hanya berlaku untuk tampilan publik; abaikan CTA ini bila kamu tidak ingin identitas WhatsApp diketahui tim."
              : ""}
          </p>
          <a
            href={confirmationUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Beri tahu tim DekatLokal melalui WhatsApp bahwa community support sudah dikirim"
            className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:w-auto"
          >
            Kirim kabar ke WhatsApp
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <dl className="mt-6 grid overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-left sm:grid-cols-3">
          <div className="border-b border-slate-200 p-4 sm:border-b-0 sm:border-r sm:p-5">
            <dt className="text-xs font-medium text-slate-500">
              Kode referensi
            </dt>
            <dd className="mt-1.5 break-all font-mono text-sm font-semibold tracking-[0.04em] text-ink">
              {submission.submissionCode}
            </dd>
          </div>
          <div className="border-b border-slate-200 p-4 sm:border-b-0 sm:border-r sm:p-5">
            <dt className="text-xs font-medium text-slate-500">
              Nominal support
            </dt>
            <dd className="mt-1.5 font-mono text-sm font-semibold text-ink">
              {formatRupiah(submission.amount)}
            </dd>
          </div>
          <div className="p-4 sm:p-5">
            <dt className="text-xs font-medium text-slate-500">
              Bank tujuan
            </dt>
            <dd className="mt-1.5 text-sm font-semibold text-ink">
              {communitySupportBankNames[submission.destinationBank]}
            </dd>
          </div>
        </dl>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href={communitySupportContent.event.route}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Kembali ke event
          </Link>
          <button
            type="button"
            onClick={sharePage}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-brand transition hover:border-brand hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            {shareStatus === "copied" ? (
              <Copy className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ShareAndroid className="h-4 w-4" aria-hidden="true" />
            )}
            {shareStatus === "copied" ? "Link tersalin" : "Bagikan halaman"}
          </button>
        </div>
        <p
          className="mt-2 min-h-5 text-xs leading-5 text-slate-500"
          aria-live="polite"
        >
          {shareStatus === "shared"
            ? "Terima kasih sudah membantu menjangkau lebih banyak pendukung."
            : shareStatus === "copied"
              ? "Link halaman sudah disalin."
              : shareStatus === "error"
                ? "Link belum dapat dibagikan otomatis. Salin URL dari address bar."
                : ""}
        </p>

        <p className="mt-4 flex items-start justify-center gap-2 text-xs leading-5 text-slate-500">
          <Lock
            className="mt-0.5 h-4 w-4 shrink-0 text-brand"
            strokeWidth={1.8}
            aria-hidden="true"
          />
          Bukti transfer tetap privat dan tidak ditampilkan kepada publik.
        </p>
      </div>

      <style jsx>{`
        .success-mark {
          position: relative;
          width: 6.5rem;
          height: 6.5rem;
        }

        .success-svg {
          position: relative;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 0.85rem 1.4rem rgba(5, 150, 105, 0.18));
        }

        .success-circle,
        .success-check {
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .success-circle {
          stroke: #d1fae5;
          stroke-width: 12;
          stroke-dasharray: 271;
          stroke-dashoffset: 271;
          animation: support-circle-draw 0.72s cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }

        .success-check {
          stroke: #047857;
          stroke-width: 8;
          stroke-dasharray: 70;
          stroke-dashoffset: 70;
          animation: support-check-draw 0.48s 0.5s
            cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .success-halo {
          position: absolute;
          inset: 0.85rem;
          z-index: 1;
          border: 1px solid rgba(16, 185, 129, 0.34);
          border-radius: 999px;
          opacity: 0;
          animation: support-halo 1.1s 0.18s ease-out forwards;
        }

        .success-halo-two {
          animation-delay: 0.42s;
        }

        @keyframes support-circle-draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes support-check-draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes support-halo {
          0% {
            opacity: 0.5;
            transform: scale(0.72);
          }
          100% {
            opacity: 0;
            transform: scale(1.4);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .success-circle,
          .success-check,
          .success-halo {
            animation: none;
          }

          .success-circle,
          .success-check {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
      <style jsx global>{`
        #support-success-dialog::backdrop {
          background: rgba(15, 23, 42, 0.68);
          backdrop-filter: blur(4px);
        }

        @media (prefers-reduced-motion: reduce) {
          #support-success-dialog::backdrop {
            backdrop-filter: none;
          }
        }
      `}</style>
    </dialog>
  );
}
