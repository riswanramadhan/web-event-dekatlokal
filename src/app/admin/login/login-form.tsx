"use client";

import { RefreshDouble } from "iconoir-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import {
  FormField,
  FormNotice,
  TextInput,
} from "@/components/registration/form-components";

import { loginAction, type LoginActionState } from "./actions";

const initialLoginActionState: LoginActionState = {
  status: "idle",
  message: "",
};

/**
 * Full-width submit, unlike the shared registration button which sizes to its
 * content. A single primary action reads better filling the login card.
 */
function LoginSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(2,85,245,0.22)] transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
    >
      {pending ? (
        <RefreshDouble className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : null}
      {pending ? "Memeriksa…" : "Masuk"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(
    loginAction,
    initialLoginActionState,
  );

  return (
    <form action={formAction} className="space-y-5">
      {state.status === "error" ? (
        <FormNotice tone="error">{state.message}</FormNotice>
      ) : null}

      <FormField label="Email" name="email" required>
        <TextInput
          name="email"
          type="email"
          autoComplete="username"
          placeholder="admin@email.com"
          autoFocus
          required
        />
      </FormField>

      <FormField label="Password" name="password" required>
        <TextInput
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </FormField>

      <LoginSubmitButton />
    </form>
  );
}
