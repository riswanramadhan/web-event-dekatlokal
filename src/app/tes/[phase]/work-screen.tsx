"use client";

import { Check, NavArrowLeft, NavArrowRight } from "iconoir-react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { AttemptPayload } from "@/lib/assessment/attempts";

import { saveAnswerAction, submitAttemptAction } from "./actions";

type SaveStatus = "idle" | "saving" | "saved" | "error";

const SAVE_STATUS_LABELS: Record<SaveStatus, string> = {
  idle: "",
  saving: "Menyimpan…",
  saved: "Tersimpan",
  error: "Belum tersimpan",
};

function OptionCard({
  letter,
  body,
  selected,
  onSelect,
}: {
  letter: string;
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
        className={`flex w-full min-h-14 items-center gap-3 rounded-2xl border px-3 py-3 text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-100 ${
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
          {letter}
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
}: {
  phaseLabel: string;
  attempt: AttemptPayload;
  questionIndex: number;
  onQuestionIndexChange: (index: number) => void;
  onFinished: () => void;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>(
    attempt.answers,
  );
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const pendingRef = useRef(0);

  const questions = attempt.questions;
  const total = questions.length;
  const safeIndex = Math.min(Math.max(questionIndex, 0), total - 1);
  const question = questions[safeIndex];
  const answeredCount = questions.filter((item) => answers[item.id]).length;

  const finish = useCallback(async () => {
    setSubmitting(true);
    const result = await submitAttemptAction(attempt.attemptId);
    setSubmitting(false);

    if (result.ok) {
      onFinished();
      return;
    }

    setSubmitError(result.message);
  }, [attempt.attemptId, onFinished]);

  const persist = useCallback(
    async (questionId: string, optionId: string) => {
      pendingRef.current += 1;
      setSaveStatus("saving");

      let result = await saveAnswerAction(
        attempt.attemptId,
        questionId,
        optionId,
      );

      // One automatic retry, because a dropped request on a room full of phones
      // is ordinary and the participant should not have to notice it.
      if (!result.ok && !result.expired) {
        await new Promise((resolve) => window.setTimeout(resolve, 1500));
        result = await saveAnswerAction(
          attempt.attemptId,
          questionId,
          optionId,
        );
      }

      pendingRef.current -= 1;

      if (result.ok) {
        if (pendingRef.current === 0) {
          setSaveStatus("saved");
        }
        return;
      }

      // The deadline is enforced by a database trigger, so a refused write is
      // not an error to display — it means the attempt is over and the answers
      // belong to the server now.
      if (result.expired) {
        setSaveStatus("idle");
        await finish();
        return;
      }

      setSaveStatus("error");
    },
    [attempt.attemptId, finish],
  );

  function chooseOption(questionId: string, optionId: string) {
    // Optimistic: the card looks chosen straight away and the write follows.
    setAnswers((previous) => ({ ...previous, [questionId]: optionId }));
    void persist(questionId, optionId);
  }

  useEffect(() => {
    if (safeIndex !== questionIndex) {
      onQuestionIndexChange(safeIndex);
    }
  }, [onQuestionIndexChange, questionIndex, safeIndex]);

  if (!question) {
    return null;
  }

  const isLast = safeIndex === total - 1;
  const progress = Math.round(((safeIndex + 1) / total) * 100);

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto w-full max-w-[720px]">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-ink">{phaseLabel}</p>
            <p className="text-xs text-slate-500">
              Soal {safeIndex + 1} dari {total}
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
        </div>
      </header>

      <main className="flex-1 px-4 py-6">
        <div className="mx-auto w-full max-w-[720px]">
          <h1 className="text-lg font-semibold leading-7 text-ink sm:text-xl">
            {question.prompt}
          </h1>

          <ul className="mt-5 space-y-3">
            {question.options.map((option, index) => (
              <OptionCard
                key={option.id}
                letter={String.fromCharCode(65 + index)}
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
      </main>

      <footer className="sticky bottom-0 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto w-full max-w-[720px]">
          <p
            aria-live="polite"
            className={`mb-2 text-center text-xs ${
              saveStatus === "error" ? "text-amber-700" : "text-slate-400"
            }`}
          >
            {SAVE_STATUS_LABELS[saveStatus]}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={safeIndex === 0}
              onClick={() => onQuestionIndexChange(safeIndex - 1)}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-2xl border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <NavArrowLeft className="h-4 w-4" aria-hidden="true" />
              Sebelumnya
            </button>

            {isLast ? (
              <button
                type="button"
                disabled={submitting}
                onClick={() => void finish()}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-2xl bg-brand px-4 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {submitting ? "Mengirim…" : "Selesaikan"}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onQuestionIndexChange(safeIndex + 1)}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-2xl bg-brand px-4 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                Berikutnya
                <NavArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
          <p className="mt-2 text-center text-xs text-slate-400">
            {answeredCount} dari {total} soal terjawab
          </p>
        </div>
      </footer>
    </div>
  );
}
