"use client";

import { CheckCircle } from "iconoir-react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import { SelectInput } from "@/components/registration/form-components";
import type { Participant } from "@/lib/assessment/participants";
import {
  CONSENT_CHOICE_LABELS,
  REFLECTION_QUESTIONS,
  TESTIMONIAL_CONSENTS,
} from "@/lib/assessment/reflection-consent";
import { formatFilledAt } from "@/lib/assessment/report-date";
import { initialRegistrationActionState } from "@/lib/registration/result";

import { checkReflectionAction, submitReflectionAction } from "./actions";

const textAreaClass =
  "min-h-28 w-full resize-y rounded-2xl border border-slate-300 bg-white px-3 py-2.5 text-sm leading-6 text-ink outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand-100";

function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="inline-flex min-h-13 w-full items-center justify-center rounded-2xl bg-brand px-5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-300"
    >
      {pending ? "Mengirim…" : "Kirim jawaban"}
    </button>
  );
}

export function RefleksiForm({
  participants,
}: {
  participants: Participant[] | null;
}) {
  const [state, formAction] = useActionState(
    submitReflectionAction,
    initialRegistrationActionState,
  );
  const [selectedId, setSelectedId] = useState("");
  const [previous, setPrevious] = useState<string | null>(null);

  async function handlePick(id: string) {
    setSelectedId(id);
    setPrevious(null);

    if (id === "") {
      return;
    }

    const check = await checkReflectionAction(id);

    if (check.alreadyFilled && check.updatedAt) {
      setPrevious(check.updatedAt);
    }
  }

  if (state.status === "success") {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center">
        <CheckCircle
          className="mx-auto h-9 w-9 text-emerald-600"
          aria-hidden="true"
        />
        <h1 className="mt-4 text-lg font-semibold text-ink">{state.message}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Jawaban kamu dipakai untuk menyusun laporan dampak kegiatan.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 px-5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Kembali ke beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <h1 className="text-lg font-semibold text-ink">Refleksi & testimoni</h1>
      <p className="mt-1 text-sm leading-6 text-slate-600">
        Tidak ada batas waktu di halaman ini. Tulis sesantai kamu mau.
      </p>
      {/* Disebut di muka, bukan dibiarkan ditemukan sendiri: pendaftar UMKM yang
          membuka tautan ini akan mencari namanya dan menyangka daftarnya rusak. */}
      <p className="mt-1 text-xs leading-5 text-slate-500">
        Hanya untuk peserta mahasiswa.
      </p>

      {participants === null ? (
        <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-4 text-sm text-slate-600">
          Daftar peserta gagal dimuat. Muat ulang halaman ini.
        </p>
      ) : participants.length === 0 ? (
        <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-4 text-sm text-slate-600">
          Belum ada peserta terdaftar.
        </p>
      ) : (
        <form action={formAction} className="mt-5 space-y-5">
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
                onChange={(event) => void handlePick(event.currentTarget.value)}
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

            {previous ? (
              <p
                role="status"
                className="mt-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-900"
              >
                Kamu sudah pernah mengisi pada {formatFilledAt(previous)}. Mengirim
                lagi akan menggantikan jawaban sebelumnya.
              </p>
            ) : null}
          </div>

          {REFLECTION_QUESTIONS.map((question, index) => (
            <div key={question.field}>
              <label
                htmlFor={question.field}
                className="block text-sm font-medium leading-6 text-ink"
              >
                {index + 1}. {question.label}
              </label>
              <textarea
                id={question.field}
                name={question.field}
                required
                maxLength={4000}
                className={`${textAreaClass} mt-2`}
              />
            </div>
          ))}

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <label
              htmlFor="testimonial"
              className="block text-sm font-medium leading-6 text-ink"
            >
              4. Jika kamu diminta menceritakan pengalaman mengikuti AI
              Co-Creation Lab dalam 1–2 kalimat, apa yang ingin kamu sampaikan?
            </label>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Boleh dikosongkan.
            </p>
            <textarea
              id="testimonial"
              name="testimonial"
              maxLength={1000}
              className={`${textAreaClass} mt-2`}
            />

            <fieldset className="mt-4">
              <legend className="text-sm font-medium leading-6 text-ink">
                Apakah jawaban ini boleh digunakan sebagai testimoni pada
                laporan, website, atau publikasi AI Co-Creation Lab?
              </legend>
              <div className="mt-2 space-y-2">
                {TESTIMONIAL_CONSENTS.map((consent) => (
                  <label
                    key={consent}
                    className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-ink transition has-[:checked]:border-brand has-[:checked]:bg-brand-50"
                  >
                    <input
                      type="radio"
                      name="testimonialConsent"
                      value={consent}
                      className="h-4 w-4 shrink-0 accent-brand"
                    />
                    {CONSENT_CHOICE_LABELS[consent]}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <SubmitButton disabled={selectedId === ""} />

          {/* Status "success" sudah keluar lebih dulu di atas, jadi sisa
              kemungkinannya hanya galat. */}
          {state.status !== "idle" ? (
            <p role="alert" className="text-sm font-medium text-red-700">
              {state.message}
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
