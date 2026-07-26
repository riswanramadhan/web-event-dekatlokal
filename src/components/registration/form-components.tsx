"use client";

import { AlertCircle, Check, LoaderCircle, ShieldCheck } from "lucide-react";
import type {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

type FormSectionProps = {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function FormSection({
  number,
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <fieldset className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-card sm:p-7 lg:p-8">
      <legend className="sr-only">{title}</legend>
      <div className="mb-7 flex items-start gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-50 font-mono text-sm font-semibold text-brand">
          {number}
        </span>
        <div>
          <h2 className="text-xl font-semibold tracking-[-0.025em] text-ink">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

type FormFieldProps = {
  label: string;
  name: string;
  helper?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
};

export function FormField({
  label,
  name,
  helper,
  error,
  required,
  className = "",
  children,
}: FormFieldProps) {
  const helperId = helper ? `${name}-helper` : undefined;
  const errorId = error ? `${name}-error` : undefined;

  return (
    <div className={`min-w-0 ${className}`}>
      <label htmlFor={name} className="block text-sm font-semibold text-ink">
        {label}
        {required ? <span className="ml-1 text-brand" aria-hidden="true">*</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {helper ? (
        <p id={helperId} className="mt-2 text-xs leading-5 text-slate-500">
          {helper}
        </p>
      ) : null}
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-xs font-medium leading-5 text-red-700"
        >
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

const controlClass =
  "min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 aria-invalid:border-red-500 aria-invalid:ring-red-100";

export function TextInput({
  name,
  error,
  helper,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  error?: string;
  helper?: string;
}) {
  return (
    <input
      id={name}
      name={name}
      className={controlClass}
      aria-invalid={Boolean(error)}
      aria-describedby={
        [helper ? `${name}-helper` : "", error ? `${name}-error` : ""]
          .filter(Boolean)
          .join(" ") || undefined
      }
      {...props}
    />
  );
}

export function SelectInput({
  name,
  error,
  helper,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  error?: string;
  helper?: string;
}) {
  return (
    <select
      id={name}
      name={name}
      className={controlClass}
      aria-invalid={Boolean(error)}
      aria-describedby={
        [helper ? `${name}-helper` : "", error ? `${name}-error` : ""]
          .filter(Boolean)
          .join(" ") || undefined
      }
      {...props}
    >
      {children}
    </select>
  );
}

export function TextArea({
  name,
  error,
  helper,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  error?: string;
  helper?: string;
}) {
  return (
    <textarea
      id={name}
      name={name}
      className={`${controlClass} min-h-32 resize-y`}
      aria-invalid={Boolean(error)}
      aria-describedby={
        [helper ? `${name}-helper` : "", error ? `${name}-error` : ""]
          .filter(Boolean)
          .join(" ") || undefined
      }
      {...props}
    />
  );
}

type MultiSelectOption = {
  value: string;
  label: string;
  description?: string;
};

export function MultiSelectField({
  legend,
  name,
  options,
  helper,
  error,
  required,
}: {
  legend: string;
  name: string;
  options: readonly MultiSelectOption[];
  helper?: string;
  error?: string;
  required?: boolean;
}) {
  const helperId = helper ? `${name}-helper` : undefined;
  const errorId = error ? `${name}-error` : undefined;
  const [selectedValues, setSelectedValues] = useState<ReadonlySet<string>>(
    () => new Set(),
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    const checked = event.currentTarget.checked;

    setSelectedValues((current) => {
      const next = new Set(current);

      if (checked) {
        next.add(value);
      } else {
        next.delete(value);
      }

      return next;
    });
  }

  return (
    <fieldset
      className="sm:col-span-2"
      aria-describedby={[helperId, errorId].filter(Boolean).join(" ") || undefined}
      aria-invalid={Boolean(error)}
    >
      <legend className="text-sm font-semibold text-ink">
        {legend}
        {required ? <span className="ml-1 text-brand" aria-hidden="true">*</span> : null}
      </legend>
      {helper ? (
        <p id={helperId} className="mt-1 text-xs leading-5 text-slate-500">
          {helper}
        </p>
      ) : null}
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="group relative flex min-h-16 cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-brand-200 hover:bg-brand-50/50 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand-100 has-[:checked]:border-brand has-[:checked]:bg-brand-50"
          >
            <input
              type="checkbox"
              name={name}
              value={option.value}
              required={
                Boolean(required) &&
                selectedValues.size === 0 &&
                option.value === options[0]?.value
              }
              onChange={handleChange}
              className="peer sr-only"
            />
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-slate-300 bg-white text-transparent peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">{option.label}</span>
              {option.description ? (
                <span className="mt-1 block text-xs leading-5 text-slate-500">
                  {option.description}
                </span>
              ) : null}
            </span>
          </label>
        ))}
      </div>
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-xs font-medium leading-5 text-red-700"
        >
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

export function ConsentField({
  name,
  label,
  description,
  error,
  required,
}: {
  name: string;
  label: ReactNode;
  description?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="group flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition focus-within:ring-4 focus-within:ring-brand-100 has-[:checked]:border-brand-200 has-[:checked]:bg-brand-50/70">
        <input
          type="checkbox"
          id={name}
          name={name}
          value="true"
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className="mt-1 h-4 w-4 shrink-0 accent-brand"
        />
        <span>
          <span className="block text-sm font-medium leading-6 text-ink">{label}</span>
          {description ? (
            <span className="mt-1 block text-xs leading-5 text-slate-500">{description}</span>
          ) : null}
        </span>
      </label>
      {error ? (
        <p id={`${name}-error`} role="alert" className="mt-2 text-xs font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function FormNotice({
  tone = "info",
  children,
}: {
  tone?: "info" | "warning" | "error" | "success";
  children: ReactNode;
}) {
  const tones = {
    info: "border-brand-200 bg-brand-50 text-brand-900",
    warning: "border-amber-200 bg-amber-50 text-amber-900",
    error: "border-red-200 bg-red-50 text-red-800",
    success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  };

  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${tones[tone]}`}
    >
      {children}
    </div>
  );
}

export function SubmitButton({
  label,
  pendingLabel = "Mengirim pendaftaran…",
  disabled = false,
}: {
  label: string;
  pendingLabel?: string;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      aria-disabled={disabled || pending}
      className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(2,85,245,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-600 disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-slate-400 disabled:shadow-none sm:w-auto"
    >
      {pending ? (
        <LoaderCircle
          className="h-4.5 w-4.5 animate-spin"
          aria-hidden="true"
        />
      ) : (
        <ShieldCheck className="h-4.5 w-4.5" aria-hidden="true" />
      )}
      {pending ? pendingLabel : label}
    </button>
  );
}
