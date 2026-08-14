import { ArrowDown, ArrowRight, ArrowUp } from "iconoir-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getResult } from "@/lib/assessment/attempts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hasil tes",
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ attemptId: string }>;
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[640px] flex-col justify-center px-4 py-10">
      {children}
    </div>
  );
}

/** A dash rather than NaN when there are no points to divide by. */
function percentLabel(value: number | null): string {
  return value === null ? "–" : `${value}%`;
}

function ScoreBlock({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="flex-1 text-center">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 font-mono text-4xl font-semibold tracking-[-0.03em] text-ink">
        {percentLabel(value)}
      </p>
    </div>
  );
}

/**
 * Change is carried three ways at once — colour, arrow, and word — because
 * colour alone is not a signal everyone can perceive. The wording stays neutral
 * when the score drops: this screen reports, it does not judge.
 */
function ChangeIndicator({ difference }: { difference: number }) {
  const tone =
    difference > 0
      ? "text-emerald-700"
      : difference < 0
        ? "text-amber-700"
        : "text-slate-600";
  const Icon =
    difference > 0 ? ArrowUp : difference < 0 ? ArrowDown : ArrowRight;
  const word = difference > 0 ? "Naik" : difference < 0 ? "Turun" : "Tetap";
  const amount = Math.abs(difference);

  return (
    <p
      className={`mt-5 flex items-center justify-center gap-1.5 text-sm font-semibold ${tone}`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {difference === 0 ? "Tetap" : `${word} ${amount} poin`}
      <span className="sr-only">
        {difference === 0
          ? "Nilai tidak berubah"
          : `Nilai ${word.toLowerCase()} ${amount} poin persen`}
      </span>
    </p>
  );
}

export default async function HasilPage({ params }: PageProps) {
  const { attemptId } = await params;
  const outcome = await getResult(attemptId);

  if (!outcome.ok && outcome.redirect) {
    // No post-test result to show yet — send them to the test itself rather
    // than explaining an attempt id they never saw.
    redirect("/tes/post-test");
  }

  if (!outcome.ok) {
    return (
      <Shell>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center">
          <h1 className="text-lg font-semibold text-ink">
            Hasil belum bisa ditampilkan
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {outcome.message}
          </p>
        </div>
      </Shell>
    );
  }

  const { postPercent, postScore, postTotal, prePercent } = outcome.result;
  const canCompare = prePercent !== null && postPercent !== null;

  return (
    <Shell>
      <div className="rounded-3xl border border-slate-200 bg-white p-6">
        <h1 className="text-center text-lg font-semibold text-ink">
          Hasil tes kamu
        </h1>

        {/* Stacked with a vertical arrow on narrow screens, side by side once
            there is room. */}
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          {canCompare ? (
            <>
              <ScoreBlock label="Pre-test" value={prePercent} />
              <ArrowDown
                className="h-5 w-5 shrink-0 text-slate-400 sm:hidden"
                aria-hidden="true"
              />
              <ArrowRight
                className="hidden h-5 w-5 shrink-0 text-slate-400 sm:block"
                aria-hidden="true"
              />
              <ScoreBlock label="Post-test" value={postPercent} />
            </>
          ) : (
            <ScoreBlock label="Post-test" value={postPercent} />
          )}
        </div>

        {canCompare ? (
          <ChangeIndicator difference={postPercent - prePercent} />
        ) : (
          <p className="mt-5 text-center text-sm leading-6 text-slate-600">
            Kamu tidak mengerjakan pre-test, jadi tidak ada perbandingan yang
            bisa ditampilkan.
          </p>
        )}

        <p className="mt-5 text-center text-sm text-slate-600">
          {postTotal > 0 ? `Benar ${postScore} dari ${postTotal}` : "—"}
        </p>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 px-5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Kembali ke beranda
          </Link>
        </div>
      </div>
    </Shell>
  );
}
