"use client";

import { Trash } from "iconoir-react";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

import {
  FormField,
  FormNotice,
  SubmitButton,
  TextInput,
} from "@/components/registration/form-components";

import {
  createAdminAction,
  deleteAdminAction,
  type UserActionState,
} from "./actions";

const initialState: UserActionState = { status: "idle", message: "" };

export function CreateAdminForm() {
  const [state, formAction] = useActionState(createAdminAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      {state.status !== "idle" ? (
        <FormNotice tone={state.status === "success" ? "success" : "error"}>
          {state.message}
        </FormNotice>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Email admin baru" name="email" required>
          <TextInput
            name="email"
            type="email"
            autoComplete="off"
            placeholder="nama@email.com"
            required
          />
        </FormField>

        <FormField
          label="Password"
          name="password"
          helper="Minimal 12 karakter. Bagikan lewat kanal aman, lalu minta diganti."
          required
        >
          <TextInput
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={12}
            required
          />
        </FormField>
      </div>

      <SubmitButton label="Tambah admin" pendingLabel="Menambahkan…" />
    </form>
  );
}

function DeleteButton({ email }: { email: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(event) => {
        if (!window.confirm(`Hapus akses admin untuk ${email}?`)) {
          event.preventDefault();
        }
      }}
      className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash className="h-3.5 w-3.5" aria-hidden="true" />
      {pending ? "Menghapus…" : "Hapus"}
    </button>
  );
}

export function DeleteAdminForm({
  userId,
  email,
  disabled,
  disabledReason,
}: {
  userId: string;
  email: string;
  disabled: boolean;
  disabledReason?: string;
}) {
  const [state, formAction] = useActionState(deleteAdminAction, initialState);

  if (disabled) {
    return (
      <span className="text-xs text-slate-400">{disabledReason ?? "-"}</span>
    );
  }

  return (
    <form action={formAction} className="flex flex-col items-start gap-1">
      <input type="hidden" name="userId" value={userId} />
      <DeleteButton email={email} />
      {state.status === "error" ? (
        <span role="alert" className="text-xs font-medium text-red-700">
          {state.message}
        </span>
      ) : null}
    </form>
  );
}
