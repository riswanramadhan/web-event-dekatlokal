"use client";

import {
  Check,
  NavArrowDown,
  NavArrowUp,
  Plus,
  Trash,
  WarningTriangle,
} from "iconoir-react";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import {
  PHASE_SCOPE_LABELS,
  PHASE_SCOPES,
  QUESTION_TYPE_HINTS,
  QUESTION_TYPE_LABELS,
  QUESTION_TYPES,
  type AssessmentQuestionType,
} from "@/lib/assessment/question-type";
import type { AssessmentQuestionRow } from "@/lib/assessment/schemas";
import { initialRegistrationActionState } from "@/lib/registration/result";

import { ActionMessage } from "../action-message";
import {
  createOptionAction,
  createQuestionAction,
  deleteOptionAction,
  deleteQuestionAction,
  moveQuestionAction,
  setCorrectOptionAction,
  updateOptionAction,
  updateQuestionAction,
} from "./actions";

const textControlClass =
  "min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500";

const primaryButtonClass =
  "inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-brand px-4 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-400";

const quietButtonClass =
  "inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50";

function SubmitButton({
  label,
  pendingLabel,
  disabled = false,
  className = primaryButtonClass,
  icon,
}: {
  label: string;
  pendingLabel: string;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending || disabled} className={className}>
      {pending ? null : icon}
      {pending ? pendingLabel : label}
    </button>
  );
}

function ConfirmingDeleteButton({
  confirmText,
  label,
  disabled = false,
}: {
  confirmText: string;
  label: string;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      onClick={(event) => {
        if (!window.confirm(confirmText)) {
          event.preventDefault();
        }
      }}
      className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-red-200 px-3 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash className="h-4 w-4" aria-hidden="true" />
      {pending ? "Menghapus…" : label}
    </button>
  );
}

function MoveButton({
  direction,
  disabled,
  number,
}: {
  direction: "up" | "down";
  disabled: boolean;
  number: number;
}) {
  const { pending } = useFormStatus();
  const Icon = direction === "up" ? NavArrowUp : NavArrowDown;

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      aria-label={
        direction === "up"
          ? `Naikkan soal nomor ${number}`
          : `Turunkan soal nomor ${number}`
      }
      className="grid h-11 w-11 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-brand-200 hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

function CorrectKeyButton({
  isCorrect,
  letter,
  disabled,
}: {
  isCorrect: boolean;
  letter: string;
  disabled: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      role="radio"
      aria-checked={isCorrect}
      aria-label={`Jadikan opsi ${letter} kunci jawaban`}
      disabled={pending || disabled}
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border text-sm font-semibold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-100 disabled:cursor-not-allowed disabled:opacity-60 ${
        isCorrect
          ? "border-emerald-300 bg-emerald-50 text-emerald-700"
          : "border-slate-200 text-slate-500 hover:border-brand-200 hover:text-brand"
      }`}
    >
      {isCorrect ? (
        <Check className="h-5 w-5" aria-hidden="true" />
      ) : (
        <span aria-hidden="true">{letter}</span>
      )}
    </button>
  );
}

function OptionRow({
  questionId,
  optionId,
  body,
  isCorrect,
  letter,
  frozen,
  scored,
}: {
  questionId: string;
  optionId: string;
  body: string;
  isCorrect: boolean;
  letter: string;
  frozen: boolean;
  /** Hanya soal berskor yang punya penanda kunci jawaban. */
  scored: boolean;
}) {
  const [correctState, correctAction] = useActionState(
    setCorrectOptionAction,
    initialRegistrationActionState,
  );
  const [bodyState, bodyAction] = useActionState(
    updateOptionAction,
    initialRegistrationActionState,
  );
  const [deleteState, deleteAction] = useActionState(
    deleteOptionAction,
    initialRegistrationActionState,
  );

  return (
    <li className="rounded-xl bg-slate-50/70 p-2">
      <div className="flex flex-wrap items-start gap-2">
        {scored ? (
          <form action={correctAction}>
            <input type="hidden" name="questionId" value={questionId} />
            <input type="hidden" name="optionId" value={optionId} />
            <CorrectKeyButton
              isCorrect={isCorrect}
              letter={letter}
              disabled={frozen}
            />
          </form>
        ) : (
          <span
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-slate-200 text-sm font-semibold text-slate-400"
            aria-hidden="true"
          >
            {letter}
          </span>
        )}

        <form
          action={bodyAction}
          className="flex min-w-0 flex-1 flex-wrap items-start gap-2"
        >
          <input type="hidden" name="questionId" value={questionId} />
          <input type="hidden" name="optionId" value={optionId} />
          <input
            name="body"
            type="text"
            required
            maxLength={500}
            defaultValue={body}
            disabled={frozen}
            aria-label={`Isi opsi ${letter}`}
            className={`${textControlClass} min-w-0 flex-1`}
          />
          <SubmitButton
            label="Simpan"
            pendingLabel="Menyimpan…"
            disabled={frozen}
            className={quietButtonClass}
          />
        </form>

        <form action={deleteAction}>
          <input type="hidden" name="questionId" value={questionId} />
          <input type="hidden" name="optionId" value={optionId} />
          <ConfirmingDeleteButton
            label="Hapus"
            disabled={frozen}
            confirmText={`Hapus opsi ${letter}?`}
          />
        </form>
      </div>

      <ActionMessage state={correctState} />
      <ActionMessage state={bodyState} />
      <ActionMessage state={deleteState} />
    </li>
  );
}

function AddOptionForm({
  questionId,
  frozen,
}: {
  questionId: string;
  frozen: boolean;
}) {
  const [state, action] = useActionState(
    createOptionAction,
    initialRegistrationActionState,
  );

  return (
    <form action={action} className="mt-3">
      <input type="hidden" name="questionId" value={questionId} />
      <div className="flex flex-wrap items-start gap-2">
        <input
          name="body"
          type="text"
          required
          maxLength={500}
          disabled={frozen}
          placeholder="Tulis opsi jawaban baru"
          aria-label="Opsi jawaban baru"
          className={`${textControlClass} min-w-0 flex-1`}
        />
        <SubmitButton
          label="Tambah opsi"
          pendingLabel="Menambahkan…"
          disabled={frozen}
          className={quietButtonClass}
          icon={<Plus className="h-4 w-4" aria-hidden="true" />}
        />
      </div>
      <ActionMessage state={state} />
    </form>
  );
}

/**
 * Reasons this question would block the test from opening, phrased the way the
 * administrator needs to read them at a glance. Mirrors `assessment_problems()`
 * so the badge and the readiness list never disagree.
 */
function questionIssues(question: AssessmentQuestionRow): string[] {
  const issues: string[] = [];
  const options = question.assessment_options;
  const correctCount = options.filter((option) => option.is_correct).length;

  if (question.question_type === "likert") {
    if (options.length !== 5) {
      issues.push(`perlu tepat 5 opsi skala, sekarang ${options.length}`);
    }

    const values = new Set(
      options
        .map((option) => option.value)
        .filter((value): value is number => value !== null),
    );

    if (options.length === 5 && values.size !== 5) {
      issues.push("nilai skala 1–5 tidak lengkap");
    }

    if (correctCount > 0) {
      issues.push("tidak boleh punya kunci jawaban");
    }

    return issues;
  }

  if (options.length < 2) {
    issues.push("perlu minimal 2 opsi");
  }

  if (question.question_type === "unscored_choice") {
    if (correctCount > 0) {
      issues.push("tidak boleh punya kunci jawaban");
    }

    return issues;
  }

  if (correctCount === 0) {
    issues.push("belum ada kunci jawaban");
  } else if (correctCount > 1) {
    issues.push(`ada ${correctCount} kunci jawaban`);
  }

  return issues;
}

export function QuestionCard({
  question,
  number,
  frozen,
  isFirst,
  isLast,
}: {
  question: AssessmentQuestionRow;
  number: number;
  frozen: boolean;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [promptState, promptAction] = useActionState(
    updateQuestionAction,
    initialRegistrationActionState,
  );
  const [deleteState, deleteAction] = useActionState(
    deleteQuestionAction,
    initialRegistrationActionState,
  );
  const [moveState, moveAction] = useActionState(
    moveQuestionAction,
    initialRegistrationActionState,
  );

  const options = question.assessment_options;
  const issues = questionIssues(question);
  const promptId = `prompt-${question.id}`;

  return (
    <div>
      <div className="flex items-start gap-2">
        {/* Outside the <details> on purpose: a button inside <summary> toggles
            the disclosure as a native default action, which React's synthetic
            stopPropagation does not prevent. */}
        <div className="flex shrink-0 flex-col gap-1 pt-3">
          <form action={moveAction}>
            <input type="hidden" name="questionId" value={question.id} />
            <input type="hidden" name="direction" value="up" />
            <MoveButton
              direction="up"
              number={number}
              disabled={frozen || isFirst}
            />
          </form>
          <form action={moveAction}>
            <input type="hidden" name="questionId" value={question.id} />
            <input type="hidden" name="direction" value="down" />
            <MoveButton
              direction="down"
              number={number}
              disabled={frozen || isLast}
            />
          </form>
        </div>

        <details className="group min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white">
          <summary className="flex cursor-pointer list-none items-start gap-3 p-4 [&::-webkit-details-marker]:hidden">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-100 font-mono text-sm font-semibold text-slate-600">
              {number}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-ink">
                {question.prompt}
              </span>
              <span className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-medium text-slate-600">
                  {QUESTION_TYPE_LABELS[question.question_type]}
                </span>
                {question.phase_scope === "post_test" ? (
                  <span className="rounded-md bg-brand-50 px-1.5 py-0.5 font-medium text-brand">
                    {PHASE_SCOPE_LABELS.post_test}
                  </span>
                ) : null}
                {question.category ? <span>{question.category}</span> : null}
                <span>· {options.length} opsi</span>
              </span>
              {issues.length > 0 ? (
                <span className="mt-1 flex items-start gap-1 text-xs font-medium text-amber-700">
                  <WarningTriangle
                    className="mt-0.5 h-3.5 w-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  Belum siap: {issues.join(", ")}
                </span>
              ) : null}
            </span>
            <NavArrowDown
              className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>

          <div className="space-y-5 border-t border-slate-100 p-4">
            <form action={promptAction}>
              <input type="hidden" name="questionId" value={question.id} />
              <label
                htmlFor={promptId}
                className="block text-xs font-medium uppercase tracking-wide text-slate-500"
              >
                Pertanyaan
              </label>
              <textarea
                id={promptId}
                name="prompt"
                required
                rows={3}
                minLength={3}
                maxLength={2000}
                disabled={frozen}
                defaultValue={question.prompt}
                className={`${textControlClass} mt-1.5 resize-y`}
              />
              <div className="mt-2">
                <SubmitButton
                  label="Simpan pertanyaan"
                  pendingLabel="Menyimpan…"
                  disabled={frozen}
                  className={primaryButtonClass}
                />
              </div>
              <ActionMessage state={promptState} />
            </form>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Opsi jawaban
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {question.question_type === "likert"
                  ? "Skala 1–5 memakai lima opsi baku yang sama untuk semua pernyataan, supaya rata-ratanya bisa dibandingkan antar item."
                  : question.question_type === "unscored_choice"
                    ? "Pilihan ini tidak punya jawaban benar dan tidak masuk hitungan skor."
                    : "Tekan huruf di sebelah kiri untuk menandai kunci jawaban. Satu soal tepat satu kunci."}
              </p>

              {question.question_type === "likert" ? (
                <ul className="mt-3 space-y-2">
                  {options.map((option) => (
                    <li
                      key={option.id}
                      className="flex items-center gap-3 rounded-xl bg-slate-50/70 px-3 py-2.5"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-200 bg-white font-mono text-sm font-semibold text-slate-600">
                        {option.value ?? "?"}
                      </span>
                      <span className="min-w-0 flex-1 text-sm text-slate-700">
                        {option.body}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : options.length === 0 ? (
                <p className="mt-3 rounded-xl border border-dashed border-slate-300 px-3 py-4 text-center text-xs text-slate-500">
                  Belum ada opsi jawaban.
                </p>
              ) : (
                <ul
                  role={
                    question.question_type === "scored_choice"
                      ? "radiogroup"
                      : undefined
                  }
                  aria-label={
                    question.question_type === "scored_choice"
                      ? `Kunci jawaban soal ${number}`
                      : undefined
                  }
                  className="mt-3 space-y-2"
                >
                  {options.map((option, index) => (
                    <OptionRow
                      key={option.id}
                      questionId={question.id}
                      optionId={option.id}
                      body={option.body}
                      isCorrect={option.is_correct}
                      letter={String.fromCharCode(65 + index)}
                      frozen={frozen}
                      scored={question.question_type === "scored_choice"}
                    />
                  ))}
                </ul>
              )}

              {question.question_type === "likert" ? null : (
                <AddOptionForm questionId={question.id} frozen={frozen} />
              )}
            </div>

            <form
              action={deleteAction}
              className="border-t border-slate-100 pt-4"
            >
              <input type="hidden" name="questionId" value={question.id} />
              <ConfirmingDeleteButton
                label="Hapus soal ini"
                disabled={frozen}
                confirmText={`Hapus soal nomor ${number} beserta seluruh opsinya?`}
              />
              <ActionMessage state={deleteState} />
            </form>
          </div>
        </details>
      </div>

      {/* Rendered outside the disclosure: the move buttons sit outside it too,
          and a message hidden inside a collapsed <details> would never be read
          — including the refusal when the questions are frozen. */}
      <ActionMessage state={moveState} />
    </div>
  );
}

const selectClass =
  "min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand-100 disabled:cursor-not-allowed disabled:bg-slate-100";

export function AddQuestionForm({ frozen }: { frozen: boolean }) {
  const [state, action] = useActionState(
    createQuestionAction,
    initialRegistrationActionState,
  );
  const [questionType, setQuestionType] =
    useState<AssessmentQuestionType>("scored_choice");

  return (
    <form action={action}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="new-question-type"
            className="block text-xs font-medium uppercase tracking-wide text-slate-500"
          >
            Tipe soal
          </label>
          <select
            id="new-question-type"
            name="questionType"
            value={questionType}
            disabled={frozen}
            onChange={(event) =>
              setQuestionType(event.currentTarget.value as AssessmentQuestionType)
            }
            className={`${selectClass} mt-1.5`}
          >
            {QUESTION_TYPES.map((type) => (
              <option key={type} value={type}>
                {QUESTION_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs leading-5 text-slate-500">
            {QUESTION_TYPE_HINTS[questionType]}
          </p>
        </div>

        <div>
          <label
            htmlFor="new-question-scope"
            className="block text-xs font-medium uppercase tracking-wide text-slate-500"
          >
            Muncul di
          </label>
          <select
            id="new-question-scope"
            name="phaseScope"
            defaultValue="both"
            disabled={frozen}
            className={`${selectClass} mt-1.5`}
          >
            {PHASE_SCOPES.map((scope) => (
              <option key={scope} value={scope}>
                {PHASE_SCOPE_LABELS[scope]}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs leading-5 text-slate-500">
            Soal khusus post-test tidak pernah masuk ke attempt pre-test.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor="new-question-category"
          className="block text-xs font-medium uppercase tracking-wide text-slate-500"
        >
          Kategori (opsional)
        </label>
        <input
          id="new-question-category"
          name="category"
          type="text"
          maxLength={120}
          disabled={frozen}
          placeholder="Misalnya: Problem Understanding"
          className={`${textControlClass} mt-1.5`}
        />
      </div>

      <label
        htmlFor="new-question-prompt"
        className="mt-4 block text-xs font-medium uppercase tracking-wide text-slate-500"
      >
        Pertanyaan baru
      </label>
      <textarea
        id="new-question-prompt"
        name="prompt"
        required
        rows={3}
        minLength={3}
        maxLength={2000}
        disabled={frozen}
        placeholder="Tulis pertanyaan pilihan ganda"
        className={`${textControlClass} mt-1.5 resize-y`}
      />
      <div className="mt-2">
        <SubmitButton
          label="Tambah soal"
          pendingLabel="Menambahkan…"
          disabled={frozen}
          icon={<Plus className="h-4 w-4" aria-hidden="true" />}
        />
      </div>
      <ActionMessage state={state} />
    </form>
  );
}
