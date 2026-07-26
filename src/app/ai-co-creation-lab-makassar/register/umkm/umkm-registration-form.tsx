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
import {
  UMKM_AI_USAGE_OPTIONS,
  UMKM_AVAILABLE_ASSET_OPTIONS,
  UMKM_BUSINESS_CATEGORY_OPTIONS,
  UMKM_DEVICE_OPTIONS,
  UMKM_YEARS_IN_BUSINESS_OPTIONS,
} from "@/lib/validation/umkm-registration";

import { submitUmkmRegistration } from "../actions";

type UmkmRegistrationFormProps = {
  environmentConfigured: boolean;
  registrationOpen: boolean;
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

  useEffect(() => {
    if (state.status === "idle" || state.status === "success") {
      return;
    }

    feedbackRef.current?.focus();
  }, [state]);

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

  const unavailableMessage = !registrationOpen
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
      onFocusCapture={handleFormFocus}
      className="space-y-5"
    >
      <div
        ref={feedbackRef}
        tabIndex={-1}
        aria-live="polite"
        aria-atomic="true"
      >
        {!submissionsEnabled ? (
          <FormNotice tone="warning">{unavailableMessage}</FormNotice>
        ) : state.status === "idle" ? (
          <FormNotice>
            Semua isian bertanda bintang wajib dilengkapi. Gunakan bahasa
            sehari-hari—Anda tidak perlu memahami istilah teknis AI untuk
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
          error={firstError(state.fieldErrors, "ownerName")}
        >
          <TextInput
            name="ownerName"
            type="text"
            autoComplete="name"
            minLength={2}
            maxLength={120}
            required
            placeholder="Nama lengkap"
            error={firstError(state.fieldErrors, "ownerName")}
          />
        </FormField>

        <FormField
          label="Nama usaha"
          name="businessName"
          required
          error={firstError(state.fieldErrors, "businessName")}
        >
          <TextInput
            name="businessName"
            type="text"
            autoComplete="organization"
            minLength={2}
            maxLength={120}
            required
            placeholder="Nama usaha atau merek"
            error={firstError(state.fieldErrors, "businessName")}
          />
        </FormField>

        <FormField
          label="Email aktif"
          name="email"
          helper="Opsional. Informasi utama juga dapat disampaikan melalui WhatsApp."
          error={firstError(state.fieldErrors, "email")}
        >
          <TextInput
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={254}
            placeholder="nama@email.com (opsional)"
            helper="Opsional. Informasi utama juga dapat disampaikan melalui WhatsApp."
            error={firstError(state.fieldErrors, "email")}
          />
        </FormField>

        <FormField
          label="Nomor WhatsApp"
          name="whatsapp"
          required
          helper="Format 08…, 628…, atau +628… akan dinormalisasi."
          error={firstError(state.fieldErrors, "whatsapp")}
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
            error={firstError(state.fieldErrors, "whatsapp")}
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
          error={firstError(state.fieldErrors, "businessCategory")}
        >
          <SelectInput
            name="businessCategory"
            defaultValue=""
            required
            error={firstError(state.fieldErrors, "businessCategory")}
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
          error={firstError(state.fieldErrors, "yearsInBusiness")}
        >
          <SelectInput
            name="yearsInBusiness"
            defaultValue=""
            required
            error={firstError(state.fieldErrors, "yearsInBusiness")}
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
          error={firstError(state.fieldErrors, "businessLocation")}
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
            error={firstError(state.fieldErrors, "businessLocation")}
          />
        </FormField>

        <FormField
          label="Instagram atau kanal digital"
          name="socialMediaUrl"
          helper="Opsional. Masukkan URL lengkap yang dapat dibuka publik."
          error={firstError(state.fieldErrors, "socialMediaUrl")}
        >
          <TextInput
            name="socialMediaUrl"
            type="url"
            inputMode="url"
            autoComplete="url"
            maxLength={300}
            placeholder="https://instagram.com/namausaha"
            helper="Opsional. Masukkan URL lengkap yang dapat dibuka publik."
            error={firstError(state.fieldErrors, "socialMediaUrl")}
          />
        </FormField>

        <MultiSelectField
          legend="Perangkat yang tersedia"
          name="availableDevices"
          options={UMKM_DEVICE_OPTIONS}
          helper="Pilih semua perangkat yang dapat digunakan saat atau setelah kegiatan."
          error={firstError(state.fieldErrors, "availableDevices")}
          required
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
          error={firstError(state.fieldErrors, "aiUsage")}
        >
          <SelectInput
            name="aiUsage"
            defaultValue=""
            required
            helper="Belum pernah menggunakan AI tidak mengurangi kesempatan untuk dipilih."
            error={firstError(state.fieldErrors, "aiUsage")}
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
          error={firstError(state.fieldErrors, "repetitiveProblem")}
        >
          <TextArea
            name="repetitiveProblem"
            minLength={20}
            maxLength={1500}
            required
            placeholder="Ceritakan prosesnya, seberapa sering terjadi, dan mengapa terasa sulit…"
            helper="Contoh: membuat caption setiap hari, membalas pertanyaan yang sama, atau memperbarui deskripsi produk."
            error={firstError(state.fieldErrors, "repetitiveProblem")}
          />
        </FormField>

        <FormField
          label="Bantuan yang paling diharapkan"
          name="desiredHelp"
          required
          className="sm:col-span-2"
          helper="Tidak perlu menentukan aplikasi atau teknologi. Fokus pada hasil yang ingin menjadi lebih mudah."
          error={firstError(state.fieldErrors, "desiredHelp")}
        >
          <TextArea
            name="desiredHelp"
            minLength={20}
            maxLength={1500}
            required
            placeholder="Contoh: ingin memiliki cara yang lebih cepat untuk menyiapkan ide dan jadwal konten…"
            helper="Tidak perlu menentukan aplikasi atau teknologi. Fokus pada hasil yang ingin menjadi lebih mudah."
            error={firstError(state.fieldErrors, "desiredHelp")}
          />
        </FormField>

        <MultiSelectField
          legend="Aset usaha yang tersedia"
          name="availableAssets"
          options={UMKM_AVAILABLE_ASSET_OPTIONS}
          helper="Pilih yang tersedia saat ini. Jangan unggah atau menuliskan data sensitif di formulir ini."
          error={firstError(state.fieldErrors, "availableAssets")}
          required
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
            error={firstError(state.fieldErrors, "attendanceCommitment")}
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
            error={firstError(state.fieldErrors, "consentMonitoring")}
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
            error={firstError(state.fieldErrors, "consentPrivacy")}
          />

          <ConsentField
            name="consentDocumentation"
            label="Saya bersedia muncul dalam dokumentasi kegiatan."
            description="Opsional. Persetujuan ini dapat dikomunikasikan kembali kepada penyelenggara."
            error={firstError(state.fieldErrors, "consentDocumentation")}
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
