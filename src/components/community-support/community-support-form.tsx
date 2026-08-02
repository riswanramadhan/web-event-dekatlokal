"use client";

import {
  Lock,
  Page,
  RefreshDouble,
  ShieldCheck,
  Upload,
  WarningCircle,
  Xmark,
} from "iconoir-react";
import Image from "next/image";
import {
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { z } from "zod";

import {
  SupportSubmissionSuccess,
  type CommunitySupportSubmission,
} from "@/components/community-support/support-submission-success";
import {
  communitySupportContent,
  type CommunitySupportBankId,
} from "@/data/community-support";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
] as const;
const AMOUNT_PRESETS = [50_000, 100_000, 250_000, 500_000] as const;

type IdentityMode = "named" | "anonymous";
type SubmissionStatus = "idle" | "submitting";
type FieldName =
  | "supporter_name"
  | "amount"
  | "destination_bank"
  | "contact"
  | "message"
  | "proof_file"
  | "confirmation";
type FieldErrors = Partial<Record<FieldName, string>>;
type TouchedFields = Partial<Record<FieldName, boolean>>;

const successResponseSchema = z.object({
  submission_code: z.string().trim().min(1).max(80),
  amount: z.number().int().safe().positive(),
  destination_bank: z.enum(["bsi", "mandiri"]),
});

const errorResponseSchema = z.object({
  error: z.string().max(240).optional(),
  reference: z.string().regex(/^CS-[A-F0-9]{8}$/).optional(),
  field_errors: z
    .record(z.string(), z.array(z.string().max(240)).max(4))
    .optional(),
});

const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  maximumFractionDigits: 0,
});

const genericSubmissionError =
  "Support belum berhasil dikirim. Silakan coba lagi.";

const safeSubmissionErrors = new Set([
  "We couldn't upload your transfer proof. Please try again.",
  "File size must be under 5 MB.",
  "Please upload a JPG, PNG, WebP, or PDF file.",
  "Too many submission attempts. Please try again later.",
  "Please check the highlighted fields and try again.",
  "This form no longer matches an earlier submission. Check your previous confirmation before starting a new submission.",
  "Layanan community support belum tersambung ke database. Tim DekatLokal perlu memeriksa konfigurasi Supabase.",
  "Konfirmasi support belum dapat disimpan. Tim DekatLokal perlu memeriksa database.",
]);

function formatSubmissionError(error?: string, reference?: string) {
  const message =
    error && safeSubmissionErrors.has(error)
      ? error
      : genericSubmissionError;

  return reference ? `${message} Kode kendala: ${reference}.` : message;
}

function formatAmountInput(digits: string) {
  if (!digits) {
    return "";
  }

  return `Rp${rupiahFormatter.format(Number(digits))}`;
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validateProof(file: File | null): string | undefined {
  if (!file) {
    return "Please upload a JPG, PNG, WebP, or PDF file.";
  }

  if (
    !ACCEPTED_FILE_TYPES.includes(
      file.type as (typeof ACCEPTED_FILE_TYPES)[number],
    )
  ) {
    return "Please upload a JPG, PNG, WebP, or PDF file.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "File size must be under 5 MB.";
  }

  return undefined;
}

function FormPanel({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_15px_42px_rgba(1,34,98,0.055)] sm:p-7">
      <div className="flex items-start gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-50 font-mono text-sm font-semibold text-brand">
          {number}
        </span>
        <div>
          <h3 className="text-xl font-semibold tracking-[-0.03em] text-ink">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-7">{children}</div>
    </section>
  );
}

function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) {
    return null;
  }

  return (
    <p
      id={id}
      role="alert"
      className="mt-2 flex items-start gap-1.5 text-xs font-medium leading-5 text-red-700"
    >
      <WarningCircle
        className="mt-0.5 h-3.5 w-3.5 shrink-0"
        aria-hidden="true"
      />
      {children}
    </p>
  );
}

const inputClass =
  "min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition placeholder:text-slate-600 focus:border-brand focus:ring-4 focus:ring-brand-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 aria-invalid:border-red-500 aria-invalid:ring-red-100";

export function CommunitySupportForm() {
  const [identityMode, setIdentityMode] = useState<IdentityMode>("named");
  const [supporterName, setSupporterName] = useState("");
  const [amountDigits, setAmountDigits] = useState("");
  const [destinationBank, setDestinationBank] =
    useState<CommunitySupportBankId | "">("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [displayPublicly, setDisplayPublicly] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [submission, setSubmission] =
    useState<CommunitySupportSubmission | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [formError, setFormError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formErrorRef = useRef<HTMLDivElement>(null);
  const previewUrlRef = useRef<string | null>(null);
  const dragDepthRef = useRef(0);
  const submittingRef = useRef(false);
  const requestIdRef = useRef<string | null>(null);
  const namedDisplayPreferenceRef = useRef(false);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!formError) {
      return;
    }

    formErrorRef.current?.focus({ preventScroll: true });
    formErrorRef.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "center",
    });
  }, [formError]);

  function markTouched(field: FieldName) {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  function clearFieldError(field: FieldName) {
    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }

      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function validateFields(): FieldErrors {
    const errors: FieldErrors = {};
    const amount = Number(amountDigits);

    if (identityMode === "named" && supporterName.trim().length < 2) {
      errors.supporter_name =
        "Please enter your name or choose to stay anonymous.";
    } else if (supporterName.trim().length > 120) {
      errors.supporter_name = "Name must be 120 characters or fewer.";
    }

    if (
      !amountDigits ||
      !Number.isSafeInteger(amount) ||
      amount <= 0
    ) {
      errors.amount = "Please enter a valid support amount.";
    }

    if (!destinationBank) {
      errors.destination_bank = "Please choose a destination bank.";
    }

    if (contact.trim().length > 254) {
      errors.contact = "Contact must be 254 characters or fewer.";
    }

    if (message.length > 300) {
      errors.message = "Message must be 300 characters or fewer.";
    }

    const proofError = validateProof(proofFile);
    if (proofError) {
      errors.proof_file = proofError;
    }

    if (!confirmation) {
      errors.confirmation =
        "Please confirm that the submitted information is correct.";
    }

    return errors;
  }

  const currentValidation = validateFields();
  const canSubmit =
    Object.keys(currentValidation).length === 0 && status !== "submitting";

  function visibleError(field: FieldName) {
    if (fieldErrors[field]) {
      return fieldErrors[field];
    }

    return touched[field] ? currentValidation[field] : undefined;
  }

  function chooseIdentity(mode: IdentityMode) {
    setIdentityMode(mode);
    clearFieldError("supporter_name");

    if (mode === "anonymous") {
      namedDisplayPreferenceRef.current = displayPublicly;
      setDisplayPublicly(false);
    } else {
      setDisplayPublicly(namedDisplayPreferenceRef.current);
    }
  }

  function selectProof(file: File | undefined) {
    markTouched("proof_file");

    if (!file) {
      setProofFile(null);
      updateProofPreview(null);
      return;
    }

    const error = validateProof(file);

    if (error) {
      setProofFile(null);
      updateProofPreview(null);
      setFieldErrors((current) => ({ ...current, proof_file: error }));
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setProofFile(file);
    updateProofPreview(file);
    clearFieldError("proof_file");
  }

  function updateProofPreview(file: File | null) {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    const nextUrl =
      file?.type.startsWith("image/") === true
        ? URL.createObjectURL(file)
        : null;
    previewUrlRef.current = nextUrl;
    setPreviewUrl(nextUrl);
  }

  function removeProof() {
    setProofFile(null);
    updateProofPreview(null);
    markTouched("proof_file");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    selectProof(event.currentTarget.files?.[0]);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    dragDepthRef.current = 0;
    setIsDragging(false);
    selectProof(event.dataTransfer.files?.[0]);
  }

  function mapServerFieldErrors(
    serverErrors: Record<string, string[]> | undefined,
  ) {
    if (!serverErrors) {
      return;
    }

    const knownFields = new Set<FieldName>([
      "supporter_name",
      "amount",
      "destination_bank",
      "contact",
      "message",
      "proof_file",
      "confirmation",
    ]);
    const mapped: FieldErrors = {};
    const nextTouched: TouchedFields = {};

    Object.entries(serverErrors).forEach(([field, messages]) => {
      if (knownFields.has(field as FieldName) && messages[0]) {
        mapped[field as FieldName] = messages[0];
        nextTouched[field as FieldName] = true;
      }
    });

    setFieldErrors(mapped);
    setTouched((current) => ({ ...current, ...nextTouched }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submittingRef.current) {
      return;
    }

    const validationErrors = validateFields();

    if (Object.keys(validationErrors).length > 0 || !proofFile) {
      setFieldErrors(validationErrors);
      setTouched({
        supporter_name: true,
        amount: true,
        destination_bank: true,
        contact: true,
        message: true,
        proof_file: true,
        confirmation: true,
      });
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");
    setFormError(null);
    setFieldErrors({});

    const body = new FormData();
    requestIdRef.current ??= crypto.randomUUID();
    body.set("request_id", requestIdRef.current);
    body.set(
      "supporter_name",
      identityMode === "anonymous" ? "" : supporterName.trim(),
    );
    body.set("is_anonymous", String(identityMode === "anonymous"));
    body.set("amount", amountDigits);
    body.set("destination_bank", destinationBank);
    body.set("contact", contact.trim());
    body.set("message", message.trim());
    body.set(
      "display_publicly",
      String(identityMode === "named" && displayPublicly),
    );
    body.set("confirmation", String(confirmation));
    body.set("website", honeypot);
    body.set("proof_file", proofFile, proofFile.name);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 120_000);

    try {
      const response = await fetch("/api/community-support", {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      const responseBody: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const parsedError = errorResponseSchema.safeParse(responseBody);

        if (parsedError.success) {
          mapServerFieldErrors(parsedError.data.field_errors);

          const safeMessage = formatSubmissionError(
            parsedError.data.error,
            parsedError.data.reference,
          );
          setFormError(safeMessage);
        } else {
          setFormError(genericSubmissionError);
        }
        return;
      }

      const parsedSuccess = successResponseSchema.safeParse(responseBody);

      if (!parsedSuccess.success) {
        setFormError(genericSubmissionError);
        return;
      }

      setSubmission({
        submissionCode: parsedSuccess.data.submission_code,
        amount: parsedSuccess.data.amount,
        destinationBank: parsedSuccess.data.destination_bank,
        isAnonymous: identityMode === "anonymous",
      });
      window.dispatchEvent(new Event("community-support:submitted"));
    } catch {
      setFormError(
        "Koneksi terputus. Periksa internet Anda lalu coba lagi.",
      );
    } finally {
      window.clearTimeout(timeout);
      submittingRef.current = false;
      setStatus("idle");
    }
  }

  function resetAfterSuccess() {
    setSubmission(null);
    setIdentityMode("named");
    setSupporterName("");
    setAmountDigits("");
    setDestinationBank("");
    setContact("");
    setMessage("");
    setDisplayPublicly(false);
    namedDisplayPreferenceRef.current = false;
    setProofFile(null);
    updateProofPreview(null);
    setConfirmation(false);
    setHoneypot("");
    setIsDragging(false);
    setFieldErrors({});
    setTouched({});
    setFormError(null);
    requestIdRef.current = null;

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const supporterNameError = visibleError("supporter_name");
  const amountError = visibleError("amount");
  const destinationBankError = visibleError("destination_bank");
  const contactError = visibleError("contact");
  const messageError = visibleError("message");
  const proofError = visibleError("proof_file");
  const confirmationError = visibleError("confirmation");
  const proofDescription = [
    "proof_file-helper",
    proofError ? "proof_file-error" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <form
        className="mx-auto mt-8 max-w-4xl"
        onSubmit={handleSubmit}
        noValidate
        encType="multipart/form-data"
      >
        <div className="space-y-5">
        {formError ? (
          <div
            ref={formErrorRef}
            role="alert"
            tabIndex={-1}
            className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm leading-6 text-red-800"
          >
            <WarningCircle
              className="mt-0.5 h-5 w-5 shrink-0"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold">Submission belum terkirim</p>
              <p className="mt-0.5">{formError}</p>
            </div>
          </div>
        ) : null}

        <FormPanel
          number="01"
          title="Detail support"
          description="Isi identitas, nominal, dan rekening tujuan."
        >
          <fieldset>
            <legend className="text-sm font-semibold text-ink">
              Identitas supporter
              <span className="ml-1 text-brand" aria-hidden="true">
                *
              </span>
            </legend>
            <div className="mt-2 grid grid-cols-2 rounded-2xl border border-slate-200 bg-slate-50 p-1">
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  name="identity_mode"
                  value="named"
                  checked={identityMode === "named"}
                  onChange={() => chooseIdentity("named")}
                  className="peer sr-only"
                />
                <span className="flex min-h-11 items-center justify-center rounded-xl px-2 text-center text-xs font-semibold text-slate-600 transition peer-checked:bg-white peer-checked:text-brand peer-checked:shadow-sm peer-focus-visible:ring-4 peer-focus-visible:ring-brand-100 sm:text-sm">
                  Gunakan nama
                </span>
              </label>
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  name="identity_mode"
                  value="anonymous"
                  checked={identityMode === "anonymous"}
                  onChange={() => chooseIdentity("anonymous")}
                  className="peer sr-only"
                />
                <span className="flex min-h-11 items-center justify-center rounded-xl px-2 text-center text-xs font-semibold text-slate-600 transition peer-checked:bg-white peer-checked:text-brand peer-checked:shadow-sm peer-focus-visible:ring-4 peer-focus-visible:ring-brand-100 sm:text-sm">
                  Anonim
                </span>
              </label>
            </div>
          </fieldset>

          {identityMode === "named" ? (
            <div className="mt-6">
              <label
                htmlFor="supporter_name"
                className="block text-sm font-semibold text-ink"
              >
                Nama lengkap
                <span className="ml-1 text-brand" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                id="supporter_name"
                name="supporter_name"
                type="text"
                autoComplete="name"
                minLength={2}
                maxLength={120}
                required
                value={supporterName}
                onChange={(event) => {
                  setSupporterName(event.currentTarget.value);
                  clearFieldError("supporter_name");
                }}
                onBlur={() => markTouched("supporter_name")}
                placeholder="Nama lengkap"
                aria-invalid={Boolean(supporterNameError)}
                aria-describedby={
                  supporterNameError ? "supporter_name-error" : undefined
                }
                className={`${inputClass} mt-2`}
              />
              <FieldError id="supporter_name-error">
                {supporterNameError}
              </FieldError>
            </div>
          ) : (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3 text-xs leading-5 text-brand-900">
              <Lock
                className="mt-0.5 h-4 w-4 shrink-0"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              Nama tidak diperlukan. Submission anonim tidak akan ditampilkan
              di ticker.
            </div>
          )}

          <div className="mt-6">
            <label
              htmlFor="amount"
              className="block text-sm font-semibold text-ink"
            >
              Nominal dukungan
              <span className="ml-1 text-brand" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id="amount"
              name="amount"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              maxLength={22}
              required
              value={formatAmountInput(amountDigits)}
              onChange={(event) => {
                const digits = event.currentTarget.value
                  .replace(/\D/g, "")
                  .replace(/^0+(?=\d)/, "")
                  .slice(0, 15);
                setAmountDigits(digits);
                clearFieldError("amount");
              }}
              onBlur={() => markTouched("amount")}
              placeholder="Rp100.000"
              aria-invalid={Boolean(amountError)}
              aria-describedby={
                amountError ? "amount-helper amount-error" : "amount-helper"
              }
              className={`${inputClass} mt-2 font-mono text-base font-semibold`}
            />
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {AMOUNT_PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  aria-pressed={amountDigits === String(preset)}
                  onClick={() => {
                    setAmountDigits(String(preset));
                    markTouched("amount");
                    clearFieldError("amount");
                  }}
                  className="min-h-11 rounded-xl border border-slate-200 bg-slate-50 px-2 font-mono text-xs font-semibold text-slate-600 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand aria-pressed:border-brand aria-pressed:bg-brand-50 aria-pressed:text-brand"
                >
                  Rp{rupiahFormatter.format(preset)}
                </button>
              ))}
            </div>
            <p id="amount-helper" className="mt-2 text-xs leading-5 text-slate-500">
              Pilih quick amount atau ketik nominal sendiri. Tidak ada minimum
              support.
            </p>
            <FieldError id="amount-error">
              {amountError}
            </FieldError>
          </div>

          <fieldset className="mt-6">
            <legend className="text-sm font-semibold text-ink">
              Bank tujuan
              <span className="ml-1 text-brand" aria-hidden="true">
                *
              </span>
            </legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {communitySupportContent.accounts.banks.map((bank) => (
                <label
                  key={bank.id}
                  className="group relative flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-brand-200 focus-within:ring-4 focus-within:ring-brand-100 has-[:checked]:border-brand has-[:checked]:bg-brand-50"
                >
                  <input
                    type="radio"
                    name="destination_bank"
                    value={bank.id}
                    checked={destinationBank === bank.id}
                    onChange={() => {
                      setDestinationBank(bank.id);
                      markTouched("destination_bank");
                      clearFieldError("destination_bank");
                    }}
                    required
                    aria-describedby={
                      destinationBankError
                        ? "destination_bank-error"
                        : undefined
                    }
                    className="h-4 w-4 shrink-0 accent-brand"
                  />
                  <span className="text-sm font-semibold leading-5 text-ink">
                    {bank.name}
                  </span>
                </label>
              ))}
            </div>
            <FieldError id="destination_bank-error">
              {destinationBankError}
            </FieldError>
          </fieldset>
        </FormPanel>

        <FormPanel
          number="02"
          title="Bukti & kirim support"
          description="Upload bukti secara privat, konfirmasi data, lalu kirim."
        >
          <div>
            <label
              htmlFor="proof_file"
              className="block text-sm font-semibold text-ink"
            >
              Upload bukti transfer
              <span className="ml-1 text-brand" aria-hidden="true">
                *
              </span>
            </label>
            <input
              ref={fileInputRef}
              id="proof_file"
              name="proof_file"
              type="file"
              accept={ACCEPTED_FILE_TYPES.join(",")}
              required
              onChange={handleFileChange}
              aria-invalid={Boolean(proofError)}
              aria-describedby={proofDescription}
              className="sr-only"
            />

            {!proofFile ? (
              <label
                htmlFor="proof_file"
                onDragEnter={(event) => {
                  event.preventDefault();
                  dragDepthRef.current += 1;
                  setIsDragging(true);
                }}
                onDragOver={(event) => event.preventDefault()}
                onDragLeave={(event) => {
                  event.preventDefault();
                  dragDepthRef.current = Math.max(
                    0,
                    dragDepthRef.current - 1,
                  );
                  if (dragDepthRef.current === 0) {
                    setIsDragging(false);
                  }
                }}
                onDrop={handleDrop}
                className={`mt-2 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-5 py-7 text-center transition focus-within:ring-4 focus-within:ring-brand-100 ${
                  proofError
                    ? "border-red-400 bg-red-50/50"
                    : isDragging
                      ? "border-brand bg-brand-50"
                      : "border-brand-200 bg-slate-50 hover:border-brand hover:bg-brand-50/60"
                }`}
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-brand shadow-sm">
                  <Upload
                    className="h-5 w-5"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-4 text-sm font-semibold text-ink">
                  Pilih atau jatuhkan file di sini
                </span>
                <span className="mt-1 text-xs leading-5 text-slate-500">
                  JPG, PNG, WebP, atau PDF · maksimal 5 MB
                </span>
              </label>
            ) : (
              <div className="mt-2 overflow-hidden rounded-2xl border border-brand-200 bg-brand-50/60 p-4">
                <div className="grid gap-4 sm:grid-cols-[8rem_1fr] sm:items-center">
                  <div className="relative grid aspect-[4/3] w-full place-items-center overflow-hidden rounded-xl border border-brand-100 bg-white sm:w-32">
                    {previewUrl ? (
                      <Image
                        src={previewUrl}
                        alt={`Preview bukti transfer: ${proofFile.name}`}
                        fill
                        unoptimized
                        sizes="128px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="text-center text-brand">
                        <Page
                          className="mx-auto h-8 w-8"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                        <p className="mt-1 font-mono text-xs font-semibold">
                          PDF
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="break-all text-sm font-semibold leading-6 text-ink">
                      {proofFile.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {formatFileSize(proofFile.size)} · siap diunggah
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand-200 bg-white px-4 text-xs font-semibold text-brand transition hover:border-brand hover:bg-brand-50"
                      >
                        Ganti
                      </button>
                      <button
                        type="button"
                        onClick={removeProof}
                        className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                      >
                        <Xmark className="h-4 w-4" aria-hidden="true" />
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <p className="sr-only" role="status" aria-live="polite">
              {proofFile
                ? `${proofFile.name}, ${formatFileSize(proofFile.size)}, ready to upload.`
                : ""}
            </p>
            <p
              id="proof_file-helper"
              className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-slate-500"
            >
              <Lock
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand"
                aria-hidden="true"
              />
              Bukti transfer tersimpan privat sebagai arsip submission dan
              tidak pernah ditampilkan di ticker.
            </p>
            <FieldError id="proof_file-error">{proofError}</FieldError>
          </div>

          <details className="group mt-6 rounded-2xl border border-slate-200 bg-slate-50">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand [&::-webkit-details-marker]:hidden">
              Kontak dan pesan
              <span className="font-normal text-slate-500">Opsional</span>
            </summary>
            <div className="space-y-6 border-t border-slate-200 px-4 py-5">
              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-semibold text-ink"
                >
                  WhatsApp atau email
                </label>
                <input
                  id="contact"
                  name="contact"
                  type="text"
                  autoComplete="email"
                  maxLength={254}
                  value={contact}
                  onChange={(event) => {
                    setContact(event.currentTarget.value);
                    clearFieldError("contact");
                  }}
                  onBlur={() => markTouched("contact")}
                  placeholder="WhatsApp atau email — opsional"
                  aria-invalid={Boolean(contactError)}
                  aria-describedby={
                    contactError
                      ? "contact-helper contact-error"
                      : "contact-helper"
                  }
                  className={`${inputClass} mt-2`}
                />
                <p
                  id="contact-helper"
                  className="mt-2 text-xs leading-5 text-slate-500"
                >
                  Tersimpan privat dan tidak pernah ditampilkan di ticker.
                </p>
                <FieldError id="contact-error">{contactError}</FieldError>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-ink"
                >
                  Pesan untuk tim
                </label>
                <textarea
                  id="message"
                  name="message"
                  maxLength={300}
                  value={message}
                  onChange={(event) => {
                    setMessage(event.currentTarget.value);
                    clearFieldError("message");
                  }}
                  onBlur={() => markTouched("message")}
                  placeholder="Tulis pesan singkat — opsional"
                  aria-invalid={Boolean(messageError)}
                  aria-describedby={
                    messageError
                      ? "message-counter message-error"
                      : "message-counter"
                  }
                  className={`${inputClass} mt-2 min-h-28 resize-y`}
                />
                <p
                  id="message-counter"
                  className="mt-1.5 text-right text-xs tabular-nums text-slate-600"
                >
                  {message.length}/300 karakter
                </p>
                <FieldError id="message-error">{messageError}</FieldError>
              </div>
            </div>
          </details>

          <div className="mt-6">
            <label
              className={`flex items-start gap-3 rounded-2xl border p-4 transition focus-within:ring-4 focus-within:ring-brand-100 ${
                identityMode === "anonymous"
                  ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-600"
                  : "cursor-pointer border-slate-200 bg-slate-50 has-[:checked]:border-brand-200 has-[:checked]:bg-brand-50"
              }`}
            >
              <input
                type="checkbox"
                id="display_publicly"
                name="display_publicly"
                checked={displayPublicly}
                disabled={identityMode === "anonymous"}
                onChange={(event) => {
                  namedDisplayPreferenceRef.current =
                    event.currentTarget.checked;
                  setDisplayPublicly(event.currentTarget.checked);
                }}
                className="mt-1 h-4 w-4 shrink-0 accent-brand"
              />
              <span>
                <span className="block text-sm font-medium leading-6 text-ink">
                  Izinkan nama saya yang disamarkan dan nominal dukungan tampil
                  di ticker.
                </span>
                <span className="mt-1 block text-xs leading-5 text-slate-600">
                  Contoh: Putri Nabila menjadi P*** N**. Ticker dapat tampil
                  segera setelah form terkirim. Kontak, pesan, dan bukti tidak
                  pernah ditampilkan.
                </span>
              </span>
            </label>
          </div>
          <div className="mt-7 border-t border-slate-200 pt-7">
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition focus-within:ring-4 focus-within:ring-brand-100 has-[:checked]:border-brand-200 has-[:checked]:bg-brand-50">
              <input
                type="checkbox"
                id="confirmation"
                name="confirmation"
                checked={confirmation}
                required
                onChange={(event) => {
                  setConfirmation(event.currentTarget.checked);
                  markTouched("confirmation");
                  clearFieldError("confirmation");
                }}
                aria-invalid={Boolean(confirmationError)}
                aria-describedby={
                  confirmationError ? "confirmation-error" : undefined
                }
                className="mt-1 h-4 w-4 shrink-0 accent-brand"
              />
              <span className="text-sm font-medium leading-6 text-ink">
                Saya memastikan informasi dan bukti transfer yang dikirim sudah
                benar.
              </span>
            </label>
            <FieldError id="confirmation-error">
              {confirmationError}
            </FieldError>

          <div className="sr-honeypot" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(event) => setHoneypot(event.currentTarget.value)}
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            aria-disabled={!canSubmit}
            className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-center text-sm font-semibold text-white shadow-[0_14px_32px_rgba(2,85,245,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-600 disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-slate-400 disabled:shadow-none"
          >
            {status === "submitting" ? (
              <RefreshDouble
                className="h-4.5 w-4.5 animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />
            ) : (
              <ShieldCheck className="h-4.5 w-4.5" aria-hidden="true" />
            )}
            {status === "submitting" ? "Mengirim…" : "Kirim Support"}
          </button>
          <p
            className="mt-2 min-h-5 text-center text-xs leading-5 text-slate-500"
            aria-live="polite"
          >
            {status === "submitting"
              ? "Mengunggah bukti privat dan menyimpan support."
              : canSubmit
                ? "Popup terima kasih dan CTA WhatsApp muncul langsung setelah berhasil."
                : "Lengkapi semua field bertanda * untuk mengaktifkan tombol submit."}
          </p>
          </div>
        </FormPanel>
        </div>
      </form>
      {submission ? (
        <SupportSubmissionSuccess
          submission={submission}
          onClose={resetAfterSuccess}
        />
      ) : null}
    </>
  );
}
