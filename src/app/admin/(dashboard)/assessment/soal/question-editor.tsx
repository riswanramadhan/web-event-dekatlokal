"use client";

import { Check, NavArrowDown, Plus, Trash } from "iconoir-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import type { AssessmentQuestionRow } from "@/lib/assessment/schemas";
import { initialRegistrationActionState } from "@/lib/registration/result";

import { ActionMessage } from "../action-message";
import {
  createOptionAction,
  createQuestionAction,
  deleteOptionAction,
  deleteQuestionAction,
  setCorrectOptionAction,
  updateOptionAction,
  updateQuestionAction,
} from "./actions";

const textControlClass =
  "min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand-100";

const primaryButtonClass =
  "inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-brand px-4 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-400";

const quietButtonClass =
  "inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50";

function SubmitButton({
  label,
  pendingLabel,
  className = primaryButtonClass,
  icon,
}: {
  label: string;
  pendingLabel: string;
  className?: string;
  icon?: React.ReactNode;
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? null : icon}
      {pending ? pendingLabel : label}
    </button>
  );
}

function ConfirmingDeleteButton({
  confirmText,
  label,
}: {
  confirmText: string;
  label: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
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

function CorrectKeyButton({
  isCorrect,
  letter,
}: {
  isCorrect: boolean;
  letter: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      role="radio"
      aria-checked={isCorrect}
      aria-label={`Jadikan opsi ${letter} kunci jawaban`}
      disabled={pending}
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
}: {
  questionId: string;
  optionId: string;
  body: string;
  isCorrect: boolean;
  letter: string;
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
        <form action={correctAction}>
          <input type="hidden" name="questionId" value={questionId} />
          <input type="hidden" name="optionId" value={optionId} />
          <CorrectKeyButton isCorrect={isCorrect} letter={letter} />
        </form>

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
            aria-label={`Isi opsi ${letter}`}
            className={`${textControlClass} min-w-0 flex-1`}
          />
          <SubmitButton
            label="Simpan"
            pendingLabel="Menyimpan…"
            className={quietButtonClass}
          />
        </form>

        <form action={deleteAction}>
          <input type="hidden" name="questionId" value={questionId} />
          <input type="hidden" name="optionId" value={optionId} />
          <ConfirmingDeleteButton
            label="Hapus"
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

function AddOptionForm({ questionId }: { questionId: string }) {
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
          placeholder="Tulis opsi jawaban baru"
          aria-label="Opsi jawaban baru"
          className={`${textControlClass} min-w-0 flex-1`}
        />
        <SubmitButton
          label="Tambah opsi"
          pendingLabel="Menambahkan…"
          className={quietButtonClass}
          icon={<Plus className="h-4 w-4" aria-hidden="true" />}
        />
      </div>
      <ActionMessage state={state} />
    </form>
  );
}

export function QuestionCard({
  question,
  number,
}: {
  question: AssessmentQuestionRow;
  number: number;
}) {
  const [promptState, promptAction] = useActionState(
    updateQuestionAction,
    initialRegistrationActionState,
  );
  const [deleteState, deleteAction] = useActionState(
    deleteQuestionAction,
    initialRegistrationActionState,
  );

  const options = question.assessment_options;
  const promptId = `prompt-${question.id}`;

  return (
    <details className="group rounded-2xl border border-slate-200 bg-white">
      <summary className="flex cursor-pointer list-none items-start gap-3 p-4 [&::-webkit-details-marker]:hidden">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-100 font-mono text-sm font-semibold text-slate-600">
          {number}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-ink">
            {question.prompt}
          </span>
          <span className="mt-0.5 block text-xs text-slate-500">
            {options.length} opsi
          </span>
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
            defaultValue={question.prompt}
            className={`${textControlClass} mt-1.5 resize-y`}
          />
          <div className="mt-2">
            <SubmitButton
              label="Simpan pertanyaan"
              pendingLabel="Menyimpan…"
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
            Tekan huruf di sebelah kiri untuk menandai kunci jawaban. Satu soal
            tepat satu kunci.
          </p>

          {options.length === 0 ? (
            <p className="mt-3 rounded-xl border border-dashed border-slate-300 px-3 py-4 text-center text-xs text-slate-500">
              Belum ada opsi jawaban.
            </p>
          ) : (
            <ul
              role="radiogroup"
              aria-label={`Kunci jawaban soal ${number}`}
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
                />
              ))}
            </ul>
          )}

          <AddOptionForm questionId={question.id} />
        </div>

        <form action={deleteAction} className="border-t border-slate-100 pt-4">
          <input type="hidden" name="questionId" value={question.id} />
          <ConfirmingDeleteButton
            label="Hapus soal ini"
            confirmText={`Hapus soal nomor ${number} beserta seluruh opsinya?`}
          />
          <ActionMessage state={deleteState} />
        </form>
      </div>
    </details>
  );
}

export function AddQuestionForm() {
  const [state, action] = useActionState(
    createQuestionAction,
    initialRegistrationActionState,
  );

  return (
    <form action={action}>
      <label
        htmlFor="new-question-prompt"
        className="block text-xs font-medium uppercase tracking-wide text-slate-500"
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
        placeholder="Tulis pertanyaan pilihan ganda"
        className={`${textControlClass} mt-1.5 resize-y`}
      />
      <div className="mt-2">
        <SubmitButton
          label="Tambah soal"
          pendingLabel="Menambahkan…"
          icon={<Plus className="h-4 w-4" aria-hidden="true" />}
        />
      </div>
      <ActionMessage state={state} />
    </form>
  );
}
