"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useActionState,
  useEffect,
  useRef,
  type FocusEvent,
} from "react";

import {
  ConsentField,
  FormField,
  FormNotice,
  FormSection,
  MultiSelectField,
  SelectInput,
  SubmitButton,
  TextArea,
  TextInput,
} from "@/components/registration/form-components";
import { TurnstileWidget } from "@/components/registration/turnstile-widget";
import { trackEvent } from "@/lib/analytics";
import { initialRegistrationActionState } from "@/lib/registration/result";
import { useRegistrationFormValidation } from "@/lib/registration/use-registration-form-validation";
import {
  buildUmkmRegistrationCandidate,
  UMKM_AI_USAGE_OPTIONS,
  UMKM_AVAILABLE_ASSET_OPTIONS,
  UMKM_BUSINESS_CATEGORY_OPTIONS,
  UMKM_DEVICE_OPTIONS,
  UMKM_YEARS_IN_BUSINESS_OPTIONS,
  umkmRegistrationSchema,
} from "@/lib/validation/umkm-registration";

import { submitUmkmRegistration } from "../actions";

type UmkmRegistrationFormProps = {
  environmentConfigured: boolean;
  registrationOpen: boolean;
  registrationResolved: boolean;
  showConfigurationDetails: boolean;
  successPath: string;
  turnstileSiteKey?: string;
};

function firstError(
  errors: Record<string, string[]> | undefined,
  fieldName: string,
) {
  return errors?.[fieldName]?.[0];
}

export function UmkmRegistrationForm({
  environmentConfigured,
  registrationOpen,
  registrationResolved,
  showConfigurationDetails,
  successPath,
  turnstileSiteKey,
}: UmkmRegistrationFormProps) {
  const [state, formAction] = useActionState(
    submitUmkmRegistration,
    initialRegistrationActionState,
  );
  const router = useRouter();
  const feedbackRef = useRef<HTMLDivElement>(null);
  const startedTrackingRef = useRef(false);
  const submittedTrackingRef = useRef(false);
  const submissionsEnabled = registrationOpen && environmentConfigured;
  const registrationClosed = !registrationOpen && registrationResolved;

  // Client-side mirror of the server's Zod schema: gives instant per-field
  // feedback and blocks obviously-invalid submissions before they leave the
  // browser. The server re-validates with the identical schema regardless,
  // so this can only improve latency, never let anything bad through.
  const registrationForm = useRegistrationFormValidation(
    umkmRegistrationSchema,
    buildUmkmRegistrationCandidate,
  );
  const { syncServerFieldErrors } = registrationForm;

  useEffect(() => {
    if (state.status === "idle" || state.status === "success") {
      return;
    }

    feedbackRef.current?.focus();
    syncServerFieldErrors(state.fieldErrors);
  }, [state, syncServerFieldErrors]);

  useEffect(() => {
    if (state.status !== "success" || !state.submissionCode) {
      return;
    }

    if (!submittedTrackingRef.current) {
      trackEvent("umkm_registration_submitted", {
        registration_type: "umkm",
      });
      submittedTrackingRef.current = true;
    }

    router.replace(
      `${successPath}?code=${encodeURIComponent(state.submissionCode)}`,
    );
  }, [router, state, successPath]);

  function handleFormFocus(event: FocusEvent<HTMLFormElement>) {
    if (
      startedTrackingRef.current ||
      (event.target instanceof HTMLInputElement &&
        event.target.name === "company")
    ) {
      return;
    }

    trackEvent("umkm_registration_started", {
      registration_type: "umkm",
    });
    startedTrackingRef.current = true;
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!registrationForm.validateBeforeSubmit(event.currentTarget)) {
      event.preventDefault();
    }
  }

  const unavailableMessage = registrationClosed
    ? "Pendaftaran UMKM telah ditutup. Formulir ini hanya ditampilkan sebagai pratinjau arsip dan tidak dapat dikirim."
    : !registrationOpen
      ? "Pendaftaran UMKM belum dibuka. Formulir ini ditampilkan sebagai pratinjau dan belum dapat dikirim."
    : showConfigurationDetails
      ? "Pendaftaran belum terhubung ke Supabase. Lengkapi environment server untuk menguji pengiriman."
      : "Pendaftaran sedang tidak tersedia. Silakan coba lagi nanti.";

  const feedbackTone =
    state.status === "duplicate" || state.status === "unavailable"
      ? "warning"
      : state.status === "success"
        ? "success"
        : "error";

  return (
    <form
      action={formAction}
      onSubmit={handleFormSubmit}
      onFocusCapture={handleFormFocus}
      className="space-y-5"
      noValidate
    >
      <div
        ref={feedbackRef}
        tabIndex={-1}
        aria-live="polite"
        aria-atomic="true"
      >
        {!submissionsEnabled ? (
          <FormNotice tone="warning">{unavailableMessage}</FormNotice>
        ) : registrationForm.blockedMessage ? (
          <FormNotice tone="error">
            {registrationForm.blockedMessage}
          </FormNotice>
        ) : state.status === "idle" ? (
          <FormNotice>
            Semua isian bertanda bintang wajib dilengkapi. Gunakan bahasa
            sehari hari. Anda tidak perlu memahami istilah teknis AI untuk
            mendaftar.
          </FormNotice>
        ) : (
          <FormNotice tone={feedbackTone}>
            <p>{state.message}</p>
            {state.formErrors?.length ? (
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {state.formErrors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            ) : null}
          </FormNotice>
        )}
      </div>

      <FormSection
        number="01"
        title="Pemilik dan kontak usaha"
        description="Gunakan kontak aktif agar informasi seleksi dan kegiatan dapat diterima."
      >
        <FormField
          label="Nama pemilik atau penanggung jawab"
          name="ownerName"
          required
          error={registrationForm.getFieldError(
            "ownerName",
            firstError(state.fieldErrors, "ownerName"),
          )}
        >
          <TextInput
            name="ownerName"
            type="text"
            autoComplete="name"
            minLength={2}
            maxLength={120}
            required
            placeholder="Nama lengkap"
            error={registrationForm.getFieldError(
              "ownerName",
              firstError(state.fieldErrors, "ownerName"),
            )}
            onBlur={(event) =>
              registrationForm.touchAndValidate(
                "ownerName",
                event.currentTarget.value,
              )
            }
            onChange={(event) =>
              registrationForm.liveRevalidateIfTouched(
                "ownerName",
                event.currentTarget.value,
              )
            }
          />
        </FormField>

        <FormField
          label="Nama usaha"
          name="businessName"
          required
          error={registrationForm.getFieldError(
            "businessName",
            firstError(state.fieldErrors, "businessName"),
          )}
        >
          <TextInput
            name="businessName"
            type="text"
            autoComplete="organization"
            minLength={2}
            maxLength={120}
            required
            placeholder="Nama usaha atau merek"
            error={registrationForm.getFieldError(
              "businessName",
              firstError(state.fieldErrors, "businessName"),
            )}
            onBlur={(event) =>
              registrationForm.touchAndValidate(
                "businessName",
                event.currentTarget.value,
              )
            }
            onChange={(event) =>
              registrationForm.liveRevalidateIfTouched(
                "businessName",
                event.currentTarget.value,
              )
            }
          />
        </FormField>

        <FormField
          label="Email aktif"
          name="email"
          helper="Opsional. Informasi utama juga dapat disampaikan melalui WhatsApp."
          error={registrationForm.getFieldError(
            "email",
            firstError(state.fieldErrors, "email"),
          )}
        >
          <TextInput
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            placeholder="nama@email.com (opsional)"
            helper="Opsional. Informasi utama juga dapat disampaikan melalui WhatsApp."
            error={registrationForm.getFieldError(
              "email",
              firstError(state.fieldErrors, "email"),
            )}
            onBlur={(event) =>
              registrationForm.touchAndValidate(
                "email",
                event.currentTarget.value,
              )
            }
            onChange={(event) =>
              registrationForm.liveRevalidateIfTouched(
                "email",
                event.currentTarget.value,
              )
            }
          />
        </FormField>

        <FormField
          label="Nomor WhatsApp"
          name="whatsapp"
          required
          helper="Format 08…, 628…, atau +628… akan dinormalisasi."
          error={registrationForm.getFieldError(
            "whatsapp",
            firstError(state.fieldErrors, "whatsapp"),
          )}
        >
          <TextInput
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            minLength={8}
            maxLength={24}
            required
            placeholder="0812 3456 7890"
            helper="Format 08…, 628…, atau +628… akan dinormalisasi."
            error={registrationForm.getFieldError(
              "whatsapp",
              firstError(state.fieldErrors, "whatsapp"),
            )}
            onBlur={(event) =>
              registrationForm.touchAndValidate(
                "whatsapp",
                event.currentTarget.value,
              )
            }
            onChange={(event) =>
              registrationForm.liveRevalidateIfTouched(
                "whatsapp",
                event.currentTarget.value,
              )
            }
          />
        </FormField>
      </FormSection>

      <FormSection
        number="02"
        title="Profil usaha"
        description="Informasi dasar ini membantu tim memahami konteks dan kesiapan challenge partner."
      >
        <FormField
          label="Kategori usaha"
          name="businessCategory"
          required
          error={registrationForm.getFieldError(
            "businessCategory",
            firstError(state.fieldErrors, "businessCategory"),
          )}
        >
          <SelectInput
            name="businessCategory"
            defaultValue=""
            required
            error={registrationForm.getFieldError(
              "businessCategory",
              firstError(state.fieldErrors, "businessCategory"),
            )}
            onChange={(event) =>
              registrationForm.touchAndValidate(
                "businessCategory",
                event.currentTarget.value,
              )
            }
          >
            <option value="" disabled>
              Pilih kategori usaha
            </option>
            {UMKM_BUSINESS_CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectInput>
        </FormField>

        <FormField
          label="Lama usaha berjalan"
          name="yearsInBusiness"
          required
          error={registrationForm.getFieldError(
            "yearsInBusiness",
            firstError(state.fieldErrors, "yearsInBusiness"),
          )}
        >
          <SelectInput
            name="yearsInBusiness"
            defaultValue=""
            required
            error={registrationForm.getFieldError(
              "yearsInBusiness",
              firstError(state.fieldErrors, "yearsInBusiness"),
            )}
            onChange={(event) =>
              registrationForm.touchAndValidate(
                "yearsInBusiness",
                event.currentTarget.value,
              )
            }
          >
            <option value="" disabled>
              Pilih lama usaha
            </option>
            {UMKM_YEARS_IN_BUSINESS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectInput>
        </FormField>

        <FormField
          label="Lokasi usaha"
          name="businessLocation"
          required
          helper="Cukup tulis kecamatan/kota. Tidak perlu alamat rumah lengkap."
          error={registrationForm.getFieldError(
            "businessLocation",
            firstError(state.fieldErrors, "businessLocation"),
          )}
        >
          <TextInput
            name="businessLocation"
            type="text"
            autoComplete="address-level2"
            minLength={3}
            maxLength={160}
            required
            placeholder="Contoh: Panakkukang, Makassar"
            helper="Cukup tulis kecamatan/kota. Tidak perlu alamat rumah lengkap."
            error={registrationForm.getFieldError(
              "businessLocation",
              firstError(state.fieldErrors, "businessLocation"),
            )}
            onBlur={(event) =>
              registrationForm.touchAndValidate(
                "businessLocation",
                event.currentTarget.value,
              )
            }
            onChange={(event) =>
              registrationForm.liveRevalidateIfTouched(
                "businessLocation",
                event.currentTarget.value,
              )
            }
          />
        </FormField>

        <FormField
          label="Instagram atau kanal digital"
          name="socialMediaUrl"
          helper="Opsional. Masukkan URL lengkap yang dapat dibuka publik."
          error={registrationForm.getFieldError(
            "socialMediaUrl",
            firstError(state.fieldErrors, "socialMediaUrl"),
          )}
        >
          <TextInput
            name="socialMediaUrl"
            type="url"
            inputMode="url"
            autoComplete="url"
            maxLength={300}
            placeholder="https://instagram.com/namausaha"
            helper="Opsional. Masukkan URL lengkap yang dapat dibuka publik."
            error={registrationForm.getFieldError(
              "socialMediaUrl",
              firstError(state.fieldErrors, "socialMediaUrl"),
            )}
            onBlur={(event) =>
              registrationForm.touchAndValidate(
                "socialMediaUrl",
                event.currentTarget.value,
              )
            }
            onChange={(event) =>
              registrationForm.liveRevalidateIfTouched(
                "socialMediaUrl",
                event.currentTarget.value,
              )
            }
          />
        </FormField>

        <MultiSelectField
          legend="Perangkat yang tersedia"
          name="availableDevices"
          options={UMKM_DEVICE_OPTIONS}
          helper="Pilih semua perangkat yang dapat digunakan saat atau setelah kegiatan."
          error={registrationForm.getFieldError(
            "availableDevices",
            firstError(state.fieldErrors, "availableDevices"),
          )}
          required
          onValuesChange={(values) =>
            registrationForm.touchAndValidate("availableDevices", values)
          }
        />
      </FormSection>

      <FormSection
        number="03"
        title="Kebutuhan usaha"
        description="Ceritakan satu proses yang sering berulang atau terasa menyita waktu. Tim akan memvalidasi kebutuhan sebelum menyusun solusi."
      >
        <FormField
          label="Pengalaman menggunakan AI"
          name="aiUsage"
          required
          className="sm:col-span-2"
          helper="Belum pernah menggunakan AI tidak mengurangi kesempatan untuk dipilih."
          error={registrationForm.getFieldError(
            "aiUsage",
            firstError(state.fieldErrors, "aiUsage"),
          )}
        >
          <SelectInput
            name="aiUsage"
            defaultValue=""
            required
            helper="Belum pernah menggunakan AI tidak mengurangi kesempatan untuk dipilih."
            error={registrationForm.getFieldError(
              "aiUsage",
              firstError(state.fieldErrors, "aiUsage"),
            )}
            onChange={(event) =>
              registrationForm.touchAndValidate(
                "aiUsage",
                event.currentTarget.value,
              )
            }
          >
            <option value="" disabled>
              Pilih pengalaman penggunaan
            </option>
            {UMKM_AI_USAGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectInput>
        </FormField>

        <FormField
          label="Masalah atau pekerjaan yang berulang"
          name="repetitiveProblem"
          required
          className="sm:col-span-2"
          helper="Contoh: membuat caption setiap hari, membalas pertanyaan yang sama, atau memperbarui deskripsi produk."
          error={registrationForm.getFieldError(
            "repetitiveProblem",
            firstError(state.fieldErrors, "repetitiveProblem"),
          )}
        >
          <TextArea
            name="repetitiveProblem"
            minLength={20}
            maxLength={1500}
            required
            placeholder="Ceritakan prosesnya, seberapa sering terjadi, dan mengapa terasa sulit…"
            helper="Contoh: membuat caption setiap hari, membalas pertanyaan yang sama, atau memperbarui deskripsi produk."
            error={registrationForm.getFieldError(
              "repetitiveProblem",
              firstError(state.fieldErrors, "repetitiveProblem"),
            )}
            onBlur={(event) =>
              registrationForm.touchAndValidate(
                "repetitiveProblem",
                event.currentTarget.value,
              )
            }
            onChange={(event) =>
              registrationForm.liveRevalidateIfTouched(
                "repetitiveProblem",
                event.currentTarget.value,
              )
            }
          />
        </FormField>

        <FormField
          label="Bantuan yang paling diharapkan"
          name="desiredHelp"
          required
          className="sm:col-span-2"
          helper="Tidak perlu menentukan aplikasi atau teknologi. Fokus pada hasil yang ingin menjadi lebih mudah."
          error={registrationForm.getFieldError(
            "desiredHelp",
            firstError(state.fieldErrors, "desiredHelp"),
          )}
        >
          <TextArea
            name="desiredHelp"
            minLength={20}
            maxLength={1500}
            required
            placeholder="Contoh: ingin memiliki cara yang lebih cepat untuk menyiapkan ide dan jadwal konten…"
            helper="Tidak perlu menentukan aplikasi atau teknologi. Fokus pada hasil yang ingin menjadi lebih mudah."
            error={registrationForm.getFieldError(
              "desiredHelp",
              firstError(state.fieldErrors, "desiredHelp"),
            )}
            onBlur={(event) =>
              registrationForm.touchAndValidate(
                "desiredHelp",
                event.currentTarget.value,
              )
            }
            onChange={(event) =>
              registrationForm.liveRevalidateIfTouched(
                "desiredHelp",
                event.currentTarget.value,
              )
            }
          />
        </FormField>

        <MultiSelectField
          legend="Aset usaha yang tersedia"
          name="availableAssets"
          options={UMKM_AVAILABLE_ASSET_OPTIONS}
          helper="Pilih yang tersedia saat ini. Jangan unggah atau menuliskan data sensitif di formulir ini."
          error={registrationForm.getFieldError(
            "availableAssets",
            firstError(state.fieldErrors, "availableAssets"),
          )}
          required
          onValuesChange={(values) =>
            registrationForm.touchAndValidate("availableAssets", values)
          }
        />

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-6 text-amber-950 sm:col-span-2">
          <strong className="font-semibold">Jaga keamanan data usaha.</strong>{" "}
          Jangan memasukkan nomor rekening, identitas pelanggan, data transaksi
          rahasia, kata sandi, atau informasi sensitif lainnya.
        </div>
      </FormSection>

      <FormSection
        number="04"
        title="Komitmen dan persetujuan"
        description="Baca setiap pernyataan sebelum memberikan persetujuan."
      >
        <div className="space-y-3 sm:col-span-2">
          <ConsentField
            name="attendanceCommitment"
            required
            label={
              <>
                Saya bersedia mengikuti kegiatan penuh sesuai jadwal yang akan
                dikonfirmasi. <span className="text-brand">(wajib)</span>
              </>
            }
            description="Pendaftaran adalah tahap aplikasi dan belum berarti dipilih sebagai challenge partner."
            error={registrationForm.getFieldError(
              "attendanceCommitment",
              firstError(state.fieldErrors, "attendanceCommitment"),
            )}
            onCheckedChange={(checked) =>
              registrationForm.touchAndValidate(
                "attendanceCommitment",
                checked,
              )
            }
          />

          <ConsentField
            name="consentMonitoring"
            required
            label={
              <>
                Saya bersedia mengikuti monitoring penggunaan hasil setelah
                kegiatan. <span className="text-brand">(wajib)</span>
              </>
            }
            description="Monitoring digunakan untuk memahami apakah solusi dapat dicoba dan digunakan kembali."
            error={registrationForm.getFieldError(
              "consentMonitoring",
              firstError(state.fieldErrors, "consentMonitoring"),
            )}
            onCheckedChange={(checked) =>
              registrationForm.touchAndValidate("consentMonitoring", checked)
            }
          />

          <ConsentField
            name="consentPrivacy"
            required
            label={
              <>
                Saya menyetujui pemrosesan data untuk seleksi dan
                penyelenggaraan event.{" "}
                <span className="text-brand">(wajib)</span>
              </>
            }
            description="Data tidak ditampilkan kepada publik dan tidak digunakan untuk penjualan."
            error={registrationForm.getFieldError(
              "consentPrivacy",
              firstError(state.fieldErrors, "consentPrivacy"),
            )}
            onCheckedChange={(checked) =>
              registrationForm.touchAndValidate("consentPrivacy", checked)
            }
          />

          <ConsentField
            name="consentDocumentation"
            label="Saya bersedia muncul dalam dokumentasi kegiatan."
            description="Opsional. Persetujuan ini dapat dikomunikasikan kembali kepada penyelenggara."
            error={registrationForm.getFieldError(
              "consentDocumentation",
              firstError(state.fieldErrors, "consentDocumentation"),
            )}
            onCheckedChange={(checked) =>
              registrationForm.touchAndValidate(
                "consentDocumentation",
                checked,
              )
            }
          />

          <p className="px-1 text-xs leading-6 text-slate-500">
            Pelajari cara kami menggunakan data pada{" "}
            <Link
              href="/privacy"
              target="_blank"
              className="font-semibold text-brand underline decoration-brand-200 underline-offset-4 hover:decoration-brand"
            >
              kebijakan privasi
              <span className="sr-only"> (dibuka di tab baru)</span>
            </Link>
            .
          </p>
        </div>
      </FormSection>

      <div className="sr-honeypot" aria-hidden="true">
        <label htmlFor="company">Nama perusahaan (jangan diisi)</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <section
        aria-labelledby="umkm-submit-title"
        className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-5 sm:p-7"
      >
        <h2
          id="umkm-submit-title"
          className="text-xl font-semibold tracking-[-0.025em] text-ink"
        >
          Periksa sebelum mengirim
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Pastikan kontak aktif, kebutuhan usaha sudah dijelaskan, dan tidak
          ada data pelanggan atau informasi rahasia di dalam jawaban.
        </p>

        {turnstileSiteKey && submissionsEnabled ? (
          <div className="mt-5">
            <TurnstileWidget siteKey={turnstileSiteKey} />
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium leading-5 text-slate-500">
            {submissionsEnabled
              ? "Setelah dikirim, Anda akan menerima kode pendaftaran."
              : registrationClosed
                ? "Pendaftaran telah ditutup dan tombol kirim dinonaktifkan."
                : "Tombol kirim akan aktif setelah pendaftaran tersedia."}
          </p>
          <SubmitButton
            label="Kirim pendaftaran UMKM"
            pendingLabel="Mengirim pendaftaran…"
            disabled={!submissionsEnabled}
          />
        </div>
      </section>
    </form>
  );
}
