"use client";

import { CheckCircle, Clock, WarningTriangle } from "iconoir-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useActionState,
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { useFormStatus } from "react-dom";

import { SelectInput } from "@/components/registration/form-components";
import type { AttemptPayload } from "@/lib/assessment/attempts";
import type { Participant } from "@/lib/assessment/participants";
import type { AssessmentPhaseSlug } from "@/lib/assessment/phase";
import type { AssessmentPublicState } from "@/lib/assessment/state";

import {
  initialStartAttemptState,
  refreshGateAction,
  startAttemptAction,
} from "./actions";
import { WorkScreen } from "./work-screen";

const GATE_POLL_MS = 15_000;
const LAST_NAME_STORAGE_KEY = "dekatevent.tes.nama-terakhir";

function subscribeToNothing(): () => void {
  // The remembered name only changes when this screen writes it, so there is
  // nothing external to subscribe to.
  return () => {};
}

function readRememberedName(): string {
  return window.localStorage.getItem(LAST_NAME_STORAGE_KEY) ?? "";
}

function readNoRememberedName(): string {
  return "";
}

function formatDuration(seconds: number): string {
  const minutes = Math.round(seconds / 60);
  return `${minutes} menit`;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[640px] flex-col justify-center px-4 py-10">
      {children}
    </div>
  );
}

function LockedGate({ phaseLabel }: { phaseLabel: string }) {
  return (
    <Shell>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center">
        <Clock className="mx-auto h-8 w-8 text-slate-400" aria-hidden="true" />
        <h1 className="mt-4 text-lg font-semibold text-ink">
          {phaseLabel} belum dibuka
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Tunggu instruksi panitia. Halaman ini akan terbuka sendiri begitu tes
          dimulai.
        </p>
      </div>
    </Shell>
  );
}

function FinishedScreen({ phaseLabel }: { phaseLabel: string }) {
  return (
    <Shell>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center">
        <CheckCircle
          className="mx-auto h-9 w-9 text-emerald-600"
          aria-hidden="true"
        />
        <h1 className="mt-4 text-lg font-semibold text-ink">
          Jawaban {phaseLabel.toLowerCase()} kamu sudah tersimpan
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Nilai akan ditampilkan setelah post-test selesai.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 px-5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Kembali ke beranda
        </Link>
      </div>
    </Shell>
  );
}

function StartButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="inline-flex min-h-13 w-full items-center justify-center rounded-2xl bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-300"
    >
      {pending ? "Menyiapkan soal…" : "Mulai mengerjakan"}
    </button>
  );
}

function NamePicker({
  phaseLabel,
  phaseSlug,
  state,
  participants,
  onStarted,
}: {
  phaseLabel: string;
  phaseSlug: AssessmentPhaseSlug;
  state: AssessmentPublicState;
  participants: Participant[] | null;
  onStarted: (attempt: AttemptPayload) => void;
}) {
  const [actionState, formAction] = useActionState(
    startAttemptAction,
    initialStartAttemptState,
  );
  const [picked, setPicked] = useState<string | null>(null);

  // Convenience only: remembering the last name saves re-picking it after a
  // refresh. It is never a store of answers. Read through
  // useSyncExternalStore so the server render has a defined snapshot and no
  // effect has to write state on mount.
  const remembered = useSyncExternalStore(
    subscribeToNothing,
    readRememberedName,
    readNoRememberedName,
  );
  const rememberedIsValid = participants?.some(
    (item) => item.id === remembered,
  );
  const selectedId = picked ?? (rememberedIsValid ? remembered : "");

  useEffect(() => {
    if (actionState.status === "success" && actionState.attempt) {
      window.localStorage.setItem(LAST_NAME_STORAGE_KEY, selectedId);
      onStarted(actionState.attempt);
    }
  }, [actionState, onStarted, selectedId]);

  const closedNotice = !state.isOpen;

  return (
    <Shell>
      <div
        className={`rounded-3xl border bg-white p-6 ${
          closedNotice ? "border-amber-300" : "border-slate-200"
        }`}
      >
        <h1 className="text-lg font-semibold text-ink">{phaseLabel}</h1>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          {state.questionCount} soal · {formatDuration(state.durationSeconds)}
        </p>

        {closedNotice ? (
          <p className="mt-4 flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm leading-6 text-amber-900">
            <WarningTriangle
              className="mt-1 h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            <span>
              {phaseLabel} sudah ditutup. Kalau kamu sudah mulai mengerjakan,
              pilih namamu untuk melanjutkan.
            </span>
          </p>
        ) : null}

        {participants === null ? (
          <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-4 text-sm text-slate-600">
            Daftar peserta gagal dimuat. Muat ulang halaman ini.
          </p>
        ) : participants.length === 0 ? (
          <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-4 text-sm text-slate-600">
            Belum ada peserta terdaftar.
          </p>
        ) : (
          <form action={formAction} className="mt-5 space-y-4">
            <input type="hidden" name="phase" value={phaseSlug} />

            <div>
              <label
                htmlFor="registrationId"
                className="block text-sm font-semibold text-ink"
              >
                Pilih namamu
              </label>
              <div className="mt-2">
                <SelectInput
                  name="registrationId"
                  searchable
                  searchLabel="Cari namamu"
                  searchPlaceholder="Ketik namamu"
                  emptyLabel="Tidak ada nama yang cocok."
                  value={selectedId}
                  onChange={(event) => setPicked(event.currentTarget.value)}
                >
                  <option value="">Pilih nama</option>
                  {participants.map((participant) => (
                    <option
                      key={participant.id}
                      value={participant.id}
                      data-description={participant.label ?? undefined}
                    >
                      {participant.fullName}
                    </option>
                  ))}
                </SelectInput>
              </div>
            </div>

            <StartButton disabled={selectedId === ""} />

            {actionState.status !== "idle" &&
            actionState.status !== "success" ? (
              <p role="alert" className="text-sm font-medium text-red-700">
                {actionState.message}
              </p>
            ) : null}

            <p className="text-xs leading-5 text-slate-500">
              Jawaban tersimpan otomatis. Kamu boleh menutup halaman ini dan
              melanjutkan nanti.
            </p>
          </form>
        )}
      </div>
    </Shell>
  );
}

export function TesFlow({
  phaseLabel,
  phaseSlug,
  initialState,
  initialParticipants,
}: {
  phaseLabel: string;
  phaseSlug: AssessmentPhaseSlug;
  initialState: AssessmentPublicState;
  initialParticipants: Participant[] | null;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [state, setState] = useState(initialState);
  const [participants, setParticipants] = useState(initialParticipants);
  const [attempt, setAttempt] = useState<AttemptPayload | null>(null);
  const [finished, setFinished] = useState(false);

  const locked = !state.isOpen && !state.hasEverOpened;
  const parsedQuestion = Number(searchParams.get("soal"));
  const questionIndex =
    Number.isFinite(parsedQuestion) && parsedQuestion >= 1
      ? Math.floor(parsedQuestion) - 1
      : 0;

  const goToQuestion = useCallback(
    (index: number) => {
      // The active question lives in the URL so the browser Back button moves
      // between questions instead of dropping the participant out of the test.
      router.replace(`?soal=${index + 1}`, { scroll: false });
    },
    [router],
  );

  // Polling exists only for the locked gate: it is the one screen a participant
  // may be staring at while waiting for the organisers.
  useEffect(() => {
    if (!locked) {
      return;
    }

    let cancelled = false;

    async function refresh() {
      // Twenty tabs left open overnight should not keep calling the server.
      if (document.hidden) {
        return;
      }

      const next = await refreshGateAction(phaseSlug);

      if (!cancelled && next) {
        setState(next.state);
        setParticipants(next.participants);
      }
    }

    const timer = window.setInterval(() => void refresh(), GATE_POLL_MS);

    function handleVisibility() {
      if (!document.hidden) {
        void refresh();
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [locked, phaseSlug]);

  const handleStarted = useCallback(
    (started: AttemptPayload) => {
      if (started.status === "submitted") {
        setFinished(true);
        return;
      }

      setAttempt(started);
      goToQuestion(0);
    },
    [goToQuestion],
  );

  if (finished) {
    return <FinishedScreen phaseLabel={phaseLabel} />;
  }

  if (attempt) {
    return (
      <WorkScreen
        phaseLabel={phaseLabel}
        attempt={attempt}
        questionIndex={questionIndex}
        onQuestionIndexChange={goToQuestion}
        onFinished={() => setFinished(true)}
      />
    );
  }

  if (locked) {
    return <LockedGate phaseLabel={phaseLabel} />;
  }

  return (
    <NamePicker
      phaseLabel={phaseLabel}
      phaseSlug={phaseSlug}
      state={state}
      participants={participants}
      onStarted={handleStarted}
    />
  );
}
