"use client";

import { useActionState } from "react";

import {
  FormField,
  FormNotice,
  SubmitButton,
  TextInput,
} from "@/components/registration/form-components";

import { loginAction, type LoginActionState } from "./actions";

const initialLoginActionState: LoginActionState = {
  status: "idle",
  message: "",
};

export function LoginForm() {
  const [state, formAction] = useActionState(
    loginAction,
    initialLoginActionState,
  );

  return (
    <form action={formAction} className="space-y-6">
      {state.status === "error" ? (
        <FormNotice tone="error">{state.message}</FormNotice>
      ) : null}

      <FormField label="Password admin" name="password" required>
        <TextInput
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
        />
      </FormField>

      <SubmitButton label="Masuk" pendingLabel="Memeriksa…" />
    </form>
  );
}
