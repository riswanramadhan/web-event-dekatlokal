"use client";

import { useReducedMotion } from "framer-motion";
import {
  Check,
  NavArrowLeft,
  NavArrowRight,
  Timer,
  Xmark,
} from "iconoir-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { AttemptPayload } from "@/lib/assessment/attempts";

import { saveAnswerAction, submitAttemptAction } from "./actions";
import { TesDialog } from "./dialog";
import { CollapsibleQuestionMap, StaticQuestionMap } from "./question-map";
import { formatClock, useCountdown } from "./use-countdown";

type SaveStatus = "idle" | "saving" | "saved" | "error";

const SAVE_STATUS_LABELS: Record<SaveStatus, string> = {
  idle: "",
  saving: "Menyimpan…",
  saved: "Tersimpan",
  error: "Belum tersimpan",
};

/** Warning threshold and the point where the timer starts drawing attention. */
const LAST_MINUTE_SECONDS = 60;
const WARNING_SECONDS = 120;

function OptionCard({
  marker,
  body,
  selected,
  onSelect,
}: {
  /** Huruf A–D untuk pilihan, angka 1–5 untuk skala. */
  marker: string;
  body: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={`flex min-h-14 w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-100 ${
          selected
            ? "border-brand bg-brand-50"
            : "border-slate-200 bg-white hover:border-brand-200"
        }`}
      >
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border text-sm font-semibold ${
            selected
              ? "border-brand bg-brand text-white"
              : "border-slate-200 text-slate-500"
          }`}
          aria-hidden="true"
        >
          {marker}
        </span>
        <span className="min-w-0 flex-1 text-sm leading-6 text-ink">{body}</span>
        {/* Selection is marked twice on purpose: colour alone is not a signal
            everyone can perceive. */}
        <span className="w-5 shrink-0" aria-hidden="true">
          {selected ? <Check className="h-5 w-5 text-brand" /> : null}
        </span>
      </button>
    </li>
  );
}

export function WorkScreen({
  phaseLabel,
  attempt,
  questionIndex,
  onQuestionIndexChange,
  onFinished,
  onAttemptLost,
}: {
  phaseLabel: string;
  attempt: AttemptPayload;
  questionIndex: number;
  onQuestionIndexChange: (index: number) => void;
  onFinished: () => void;
  onAttemptLost: (message: string) => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [answers, setAnswers] = useState<Record<string, string>>(
    attempt.answers,
  );
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [lastMinuteDismissed, setLastMinuteDismissed] = useState(false);
  const pendingRef = useRef(0);
  const finishingRef = useRef(false);

  const questions = attempt.questions;
  const total = questions.length;
  const safeIndex = Math.min(Math.max(questionIndex, 0), total - 1);
  const question = questions[safeIndex];
  const answeredCount = questions.filter((item) => answers[item.id]).length;
  const emptyCount = total - answeredCount;
  const mapId = "peta-soal";

  const mapEntries = useMemo(
    () =>
      questions.map((item) => ({ id: item.id, answered: Boolean(answers[item.id]) })),
    [answers, questions],
  );

  const finish = useCallback(async () => {
    if (finishingRef.current) {
      return;
    }

    finishingRef.current = true;
    setSubmitting(true);
    setSubmitError(null);

    const result = await submitAttemptAction(attempt.attemptId);

    setSubmitting(false);

    if (result.ok) {
      onFinished();
      return;
    }

    finishingRef.current = false;

    if (result.reason === "lost") {
      onAttemptLost(result.message);
      return;
    }

    setSubmitError(result.message);
  }, [attempt.attemptId, onAttemptLost, onFinished]);

  const handleExpire = useCallback(() => {
    setTimeUp(true);
    setConfirmOpen(false);
    void finish();
  }, [finish]);

  const remaining = useCountdown(attempt.expiresAt, handleExpire);

  const persist = useCallback(
    async (questionId: string, optionId: string) => {
      pendingRef.current += 1;
      setSaveStatus("saving");

      let result = await saveAnswerAction(
        attempt.attemptId,
        questionId,
        optionId,
      );

      // One automatic retry, because a dropped request in a room full of phones
      // is ordinary and the participant should not have to notice it.
      if (!result.ok && result.reason === "network") {
        await new Promise((resolve) => window.setTimeout(resolve, 1500));
        result = await saveAnswerAction(attempt.attemptId, questionId, optionId);
      }

      pendingRef.current -= 1;

      if (result.ok) {
        if (pendingRef.current === 0) {
          setSaveStatus("saved");
        }
        return;
      }

      if (result.reason === "lost") {
        onAttemptLost(result.message);
        return;
      }

      // The deadline is enforced by a database trigger, so a refused write is
      // not an error to display — it means the attempt is over and the answers
      // belong to the server now.
      if (result.reason === "expired") {
        setSaveStatus("idle");
        setTimeUp(true);
        void finish();
        return;
      }

      setSaveStatus("error");
    },
    [attempt.attemptId, finish, onAttemptLost],
  );

  function chooseOption(questionId: string, optionId: string) {
    // Optimistic: the card looks chosen straight away and the write follows.
    setAnswers((previous) => ({ ...previous, [questionId]: optionId }));
    void persist(questionId, optionId);
  }

  const goTo = useCallback(
    (index: number) => {
      onQuestionIndexChange(Math.min(Math.max(index, 0), total - 1));
    },
    [onQuestionIndexChange, total],
  );

  useEffect(() => {
    if (safeIndex !== questionIndex) {
      onQuestionIndexChange(safeIndex);
    }
  }, [onQuestionIndexChange, questionIndex, safeIndex]);

  // Arrow keys move between questions on desktop. Ignored while a dialog is up
  // or while focus sits in a control that uses the arrows itself.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        timeUp ||
        confirmOpen ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;

      if (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(safeIndex + 1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(safeIndex - 1);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [confirmOpen, goTo, safeIndex, timeUp]);

  if (!question) {
    return null;
  }

  const isLast = safeIndex === total - 1;
  const progress = Math.round(((safeIndex + 1) / total) * 100);
  const isWarning = remaining <= WARNING_SECONDS;
  const isCritical = remaining <= 30;
  const showLastMinuteBanner =
    remaining <= LAST_MINUTE_SECONDS && remaining > 0 && !lastMinuteDismissed;

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto w-full max-w-[720px] lg:max-w-[960px]">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-ink">{phaseLabel}</p>
            <p
              aria-live="off"
              className={`inline-flex items-center gap-1.5 font-mono text-sm font-semibold tabular-nums ${
                isWarning ? "text-amber-700" : "text-slate-600"
              } ${isCritical && !shouldReduceMotion ? "animate-pulse" : ""}`}
            >
              <Timer className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Sisa waktu </span>
              {formatClock(remaining)}
            </p>
          </div>

          <div
            className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-valuenow={safeIndex + 1}
            aria-valuemin={1}
            aria-valuemax={total}
            aria-label="Kemajuan pengerjaan"
          >
            <div
              className="h-full rounded-full bg-brand transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <button
            type="button"
            onClick={() => setMapOpen((open) => !open)}
            aria-expanded={mapOpen}
            aria-controls={mapId}
            className="mt-1 inline-flex min-h-11 items-center gap-1.5 rounded-lg px-1 text-xs font-medium text-slate-500 transition hover:text-brand lg:hidden"
          >
            Soal {safeIndex + 1} dari {total}
            <NavArrowRight
              className={`h-3.5 w-3.5 transition-transform ${
                mapOpen ? "rotate-90" : ""
              }`}
              aria-hidden="true"
            />
          </button>
          <p className="mt-2 hidden text-xs text-slate-500 lg:block">
            Soal {safeIndex + 1} dari {total}
          </p>

          <div className="lg:hidden">
            <CollapsibleQuestionMap
              id={mapId}
              open={mapOpen}
              entries={mapEntries}
              activeIndex={safeIndex}
              onJump={(index) => {
                goTo(index);
                setMapOpen(false);
              }}
            />
          </div>
        </div>
      </header>

      {showLastMinuteBanner ? (
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-2">
          <div className="mx-auto flex w-full max-w-[720px] items-center gap-2 lg:max-w-[960px]">
            <p className="flex-1 text-xs leading-5 text-amber-900">
              Sisa waktu kurang dari satu menit. Jawaban yang sudah dipilih tetap
              tersimpan.
            </p>
            <button
              type="button"
              onClick={() => setLastMinuteDismissed(true)}
              aria-label="Tutup peringatan sisa waktu"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-amber-800 transition hover:bg-amber-100"
            >
              <Xmark className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : null}

      {saveStatus === "error" ? (
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-2">
          <p className="mx-auto w-full max-w-[720px] text-xs leading-5 text-amber-900 lg:max-w-[960px]">
            Jawaban terakhir belum tersimpan. Periksa koneksi kamu.
          </p>
        </div>
      ) : null}

      {/* Sasaran tautan "Lewati ke konten" di root layout. */}
      <main id="main-content" className="flex-1 px-4 py-6">
        <div className="mx-auto flex w-full max-w-[720px] gap-8 lg:max-w-[960px]">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-semibold leading-7 text-ink sm:text-xl">
              {question.prompt}
            </h1>

            <ul className="mt-5 space-y-3">
              {question.options.map((option, index) => (
                <OptionCard
                  key={option.id}
                  // Soal skala memakai angka nilainya sendiri, bukan huruf
                  // urutan: angka itulah yang dilaporkan sebagai 1–5.
                  marker={
                    question.questionType === "likert" && option.value !== null
                      ? String(option.value)
                      : String.fromCharCode(65 + index)
                  }
                  body={option.body}
                  selected={answers[question.id] === option.id}
                  onSelect={() => chooseOption(question.id, option.id)}
                />
              ))}
            </ul>

            {submitError ? (
              <p role="alert" className="mt-4 text-sm font-medium text-red-700">
                {submitError}
              </p>
            ) : null}
          </div>

          {/* Wide screens have room for the map beside the question, so the
              toggle above is hidden and this stays open. */}
          <div className="hidden lg:block">
            <StaticQuestionMap
              id={`${mapId}-lebar`}
              entries={mapEntries}
              activeIndex={safeIndex}
              onJump={goTo}
            />
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto w-full max-w-[720px] lg:max-w-[960px]">
          <p
            aria-live="polite"
            className={`mb-2 text-center text-xs ${
              saveStatus === "error" ? "text-amber-700" : "text-slate-500"
            }`}
          >
            {SAVE_STATUS_LABELS[saveStatus]}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={safeIndex === 0}
              onClick={() => goTo(safeIndex - 1)}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-2xl border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <NavArrowLeft className="h-4 w-4" aria-hidden="true" />
              Sebelumnya
            </button>

            {isLast ? (
              <button
                type="button"
                // Holds while a write is still in flight, so nobody submits
                // ahead of their own last answer.
                disabled={submitting || saveStatus === "saving"}
                onClick={() => setConfirmOpen(true)}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-2xl bg-brand px-4 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {submitting ? "Mengirim…" : "Selesaikan"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => goTo(safeIndex + 1)}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-2xl bg-brand px-4 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                Berikutnya
                <NavArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
          <p className="mt-2 text-center text-xs text-slate-500">
            {answeredCount} dari {total} soal terjawab
          </p>
        </div>
      </footer>

      {confirmOpen && !timeUp ? (
        <TesDialog
          title={
            emptyCount > 0
              ? `Masih ada ${emptyCount} soal kosong`
              : "Selesaikan tes?"
          }
          description={
            emptyCount > 0
              ? "Soal yang tidak dijawab dihitung salah. Jawaban tidak bisa diubah setelah dikirim."
              : "Jawaban tidak bisa diubah setelah dikirim."
          }
          dismissible
          onDismiss={() => setConfirmOpen(false)}
        >
          <button
            type="button"
            onClick={() => setConfirmOpen(false)}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-brand px-4 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Periksa lagi
          </button>
          <button
            type="button"
            onClick={() => {
              setConfirmOpen(false);
              void finish();
            }}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Selesaikan sekarang
          </button>
        </TesDialog>
      ) : null}

      {timeUp ? (
        <TesDialog
          title="Waktu habis"
          description={
            submitError
              ? `${submitError} Jawaban yang sudah kamu pilih tetap tersimpan.`
              : "Jawaban kamu sedang dikirim. Sebentar lagi kamu dipindahkan."
          }
          dismissible={false}
        >
          {/* Without this the dialog is a dead end: it cannot be dismissed, and
              the error underneath it is hidden behind the overlay. */}
          {submitError ? (
            <button
              type="button"
              disabled={submitting}
              onClick={() => void finish()}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-brand px-4 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {submitting ? "Mengirim…" : "Coba kirim lagi"}
            </button>
          ) : null}
        </TesDialog>
      ) : null}
    </div>
  );
}
