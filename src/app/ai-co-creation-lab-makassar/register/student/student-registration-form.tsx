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
  buildStudentRegistrationCandidate,
  STUDENT_AI_EXPERIENCE_OPTIONS,
  STUDENT_PREFERRED_ROLE_OPTIONS,
  STUDENT_SKILL_OPTIONS,
  studentRegistrationSchema,
} from "@/lib/validation/student-registration";

import { submitStudentRegistration } from "../actions";

type StudentRegistrationFormProps = {
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

export function StudentRegistrationForm({
  environmentConfigured,
  registrationOpen,
  registrationResolved,
  showConfigurationDetails,
  successPath,
  turnstileSiteKey,
}: StudentRegistrationFormProps) {
  const [state, formAction] = useActionState(
    submitStudentRegistration,
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
    studentRegistrationSchema,
    buildStudentRegistrationCandidate,
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
      trackEvent("student_registration_submitted", {
        registration_type: "student",
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

    trackEvent("student_registration_started", {
      registration_type: "student",
    });
    startedTrackingRef.current = true;
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!registrationForm.validateBeforeSubmit(event.currentTarget)) {
      event.preventDefault();
    }
  }

  const unavailableMessage = registrationClosed
    ? "Pendaftaran mahasiswa telah ditutup. Formulir ini hanya ditampilkan sebagai pratinjau arsip dan tidak dapat dikirim."
    : !registrationOpen
      ? "Pendaftaran mahasiswa belum dibuka. Formulir ini ditampilkan sebagai pratinjau dan belum dapat dikirim."
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
            Isi yang bertanda bintang sampai tuntas, ya. Jawabanmu dipakai
            untuk menyusun tim yang paling pas, bukan untuk mencari siapa yang
            kelihatan paling jago.
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
        title="Identitas dan kontak"
        description="Gunakan data diri dan kontak aktif agar proses konfirmasi tidak terlewat."
      >
        <FormField
          label="Nama lengkap"
          name="fullName"
          required
          error={registrationForm.getFieldError(
            "fullName",
            firstError(state.fieldErrors, "fullName"),
          )}
        >
          <TextInput
            name="fullName"
            type="text"
            autoComplete="name"
            minLength={2}
            maxLength={120}
            required
            placeholder="Nama sesuai identitas"
            error={registrationForm.getFieldError(
              "fullName",
              firstError(state.fieldErrors, "fullName"),
            )}
            onBlur={(event) =>
              registrationForm.touchAndValidate(
                "fullName",
                event.currentTarget.value,
              )
            }
            onChange={(event) =>
              registrationForm.liveRevalidateIfTouched(
                "fullName",
                event.currentTarget.value,
              )
            }
          />
        </FormField>

        <FormField
          label="Email aktif"
          name="email"
          required
          helper="Kami menggunakannya untuk informasi seleksi dan kegiatan."
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
            required
            placeholder="nama@email.com"
            helper="Kami menggunakannya untuk informasi seleksi dan kegiatan."
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
          helper="Gunakan nomor aktif. Format 08…, 628…, atau +628… akan dinormalisasi."
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
            helper="Gunakan nomor aktif. Format 08…, 628…, atau +628… akan dinormalisasi."
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

        <FormField
          label="Username Instagram"
          name="instagramUsername"
          required
          helper="Boleh ditulis dengan atau tanpa @. Pastikan akunnya aktif dan bisa dikenali."
          error={registrationForm.getFieldError(
            "instagramUsername",
            firstError(state.fieldErrors, "instagramUsername"),
          )}
        >
          <TextInput
            name="instagramUsername"
            type="text"
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            minLength={1}
            maxLength={31}
            pattern="@?[A-Za-z0-9._]+"
            required
            placeholder="@namakamu"
            helper="Boleh ditulis dengan atau tanpa @. Pastikan akunnya aktif dan bisa dikenali."
            error={registrationForm.getFieldError(
              "instagramUsername",
              firstError(state.fieldErrors, "instagramUsername"),
            )}
            onBlur={(event) =>
              registrationForm.touchAndValidate(
                "instagramUsername",
                event.currentTarget.value,
              )
            }
            onChange={(event) =>
              registrationForm.liveRevalidateIfTouched(
                "instagramUsername",
                event.currentTarget.value,
              )
            }
          />
        </FormField>

        <FormField
          label="Kota domisili"
          name="city"
          required
          error={registrationForm.getFieldError(
            "city",
            firstError(state.fieldErrors, "city"),
          )}
        >
          <TextInput
            name="city"
            type="text"
            autoComplete="address-level2"
            minLength={2}
            maxLength={100}
            required
            placeholder="Contoh: Makassar"
            error={registrationForm.getFieldError(
              "city",
              firstError(state.fieldErrors, "city"),
            )}
            onBlur={(event) =>
              registrationForm.touchAndValidate(
                "city",
                event.currentTarget.value,
              )
            }
            onChange={(event) =>
              registrationForm.liveRevalidateIfTouched(
                "city",
                event.currentTarget.value,
              )
            }
          />
        </FormField>
      </FormSection>

      <FormSection
        number="02"
        title="Profil pendidikan"
        description="Informasi ini membantu penyelenggara memahami latar belajar peserta."
      >
        <FormField
          label="Universitas"
          name="university"
          required
          error={registrationForm.getFieldError(
            "university",
            firstError(state.fieldErrors, "university"),
          )}
        >
          <TextInput
            name="university"
            type="text"
            autoComplete="organization"
            minLength={2}
            maxLength={120}
            required
            placeholder="Nama universitas"
            error={registrationForm.getFieldError(
              "university",
              firstError(state.fieldErrors, "university"),
            )}
            onBlur={(event) =>
              registrationForm.touchAndValidate(
                "university",
                event.currentTarget.value,
              )
            }
            onChange={(event) =>
              registrationForm.liveRevalidateIfTouched(
                "university",
                event.currentTarget.value,
              )
            }
          />
        </FormField>

        <FormField
          label="Program studi"
          name="studyProgram"
          required
          error={registrationForm.getFieldError(
            "studyProgram",
            firstError(state.fieldErrors, "studyProgram"),
          )}
        >
          <TextInput
            name="studyProgram"
            type="text"
            minLength={2}
            maxLength={100}
            required
            placeholder="Contoh: Sistem Informasi"
            error={registrationForm.getFieldError(
              "studyProgram",
              firstError(state.fieldErrors, "studyProgram"),
            )}
            onBlur={(event) =>
              registrationForm.touchAndValidate(
                "studyProgram",
                event.currentTarget.value,
              )
            }
            onChange={(event) =>
              registrationForm.liveRevalidateIfTouched(
                "studyProgram",
                event.currentTarget.value,
              )
            }
          />
        </FormField>

        <FormField
          label="Semester saat ini"
          name="semester"
          required
          error={registrationForm.getFieldError(
            "semester",
            firstError(state.fieldErrors, "semester"),
          )}
        >
          <TextInput
            name="semester"
            type="number"
            inputMode="numeric"
            min={1}
            max={14}
            step={1}
            required
            placeholder="Contoh: 6"
            error={registrationForm.getFieldError(
              "semester",
              firstError(state.fieldErrors, "semester"),
            )}
            onBlur={(event) =>
              registrationForm.touchAndValidate(
                "semester",
                event.currentTarget.value,
              )
            }
            onChange={(event) =>
              registrationForm.liveRevalidateIfTouched(
                "semester",
                event.currentTarget.value,
              )
            }
          />
        </FormField>
      </FormSection>

      <FormSection
        number="03"
        title="Pengalaman AI dan kontribusi"
        description="Tidak harus mahir. Pilih jawaban yang paling jujur agar peran tim dapat dipetakan dengan tepat."
      >
        <FormField
          label="Pengalaman menggunakan AI"
          name="aiExperience"
          required
          error={registrationForm.getFieldError(
            "aiExperience",
            firstError(state.fieldErrors, "aiExperience"),
          )}
        >
          <SelectInput
            name="aiExperience"
            defaultValue=""
            required
            error={registrationForm.getFieldError(
              "aiExperience",
              firstError(state.fieldErrors, "aiExperience"),
            )}
            onChange={(event) =>
              registrationForm.touchAndValidate(
                "aiExperience",
                event.currentTarget.value,
              )
            }
          >
            <option value="" disabled>
              Pilih tingkat pengalaman
            </option>
            {STUDENT_AI_EXPERIENCE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectInput>
        </FormField>

        <FormField
          label="Ketersediaan laptop"
          name="hasLaptop"
          required
          helper="Tidak memiliki laptop tidak otomatis menggugurkan pendaftaran."
          error={registrationForm.getFieldError(
            "hasLaptop",
            firstError(state.fieldErrors, "hasLaptop"),
          )}
        >
          <SelectInput
            name="hasLaptop"
            defaultValue=""
            required
            helper="Tidak memiliki laptop tidak otomatis menggugurkan pendaftaran."
            error={registrationForm.getFieldError(
              "hasLaptop",
              firstError(state.fieldErrors, "hasLaptop"),
            )}
            onChange={(event) =>
              registrationForm.touchAndValidate(
                "hasLaptop",
                event.currentTarget.value,
              )
            }
          >
            <option value="" disabled>
              Pilih ketersediaan perangkat
            </option>
            <option value="true">Ya, saya dapat membawa laptop</option>
            <option value="false">Tidak memiliki/tidak dapat membawa laptop</option>
          </SelectInput>
        </FormField>

        <MultiSelectField
          legend="Kemampuan utama"
          name="skills"
          options={STUDENT_SKILL_OPTIONS}
          helper="Pilih minimal satu dan maksimal enam kemampuan yang paling relevan."
          error={registrationForm.getFieldError(
            "skills",
            firstError(state.fieldErrors, "skills"),
          )}
          required
          onValuesChange={(values) =>
            registrationForm.touchAndValidate("skills", values)
          }
        />

        <MultiSelectField
          legend="Pilihan peran dalam tim"
          name="preferredRoles"
          options={STUDENT_PREFERRED_ROLE_OPTIONS}
          helper="Pilih satu atau lebih peran. Penempatan akhir mempertimbangkan komposisi tim."
          error={registrationForm.getFieldError(
            "preferredRoles",
            firstError(state.fieldErrors, "preferredRoles"),
          )}
          required
          onValuesChange={(values) =>
            registrationForm.touchAndValidate("preferredRoles", values)
          }
        />

        <FormField
          label="Pengalaman project"
          name="projectExperience"
          required
          className="sm:col-span-2"
          helper="Jika belum pernah, tulis “Belum pernah” lalu ceritakan pengalaman organisasi atau tugas yang relevan."
          error={registrationForm.getFieldError(
            "projectExperience",
            firstError(state.fieldErrors, "projectExperience"),
          )}
        >
          <TextArea
            name="projectExperience"
            minLength={2}
            maxLength={1200}
            required
            placeholder="Ceritakan project, organisasi, riset, desain, atau kolaborasi yang pernah diikuti."
            helper="Jika belum pernah, tulis “Belum pernah” lalu ceritakan pengalaman organisasi atau tugas yang relevan."
            error={registrationForm.getFieldError(
              "projectExperience",
              firstError(state.fieldErrors, "projectExperience"),
            )}
            onBlur={(event) =>
              registrationForm.touchAndValidate(
                "projectExperience",
                event.currentTarget.value,
              )
            }
            onChange={(event) =>
              registrationForm.liveRevalidateIfTouched(
                "projectExperience",
                event.currentTarget.value,
              )
            }
          />
        </FormField>

        <FormField
          label="Motivasi mengikuti program"
          name="motivation"
          required
          className="sm:col-span-2"
          helper="Jelaskan hal yang ingin dipelajari dan kontribusi yang ingin diberikan."
          error={registrationForm.getFieldError(
            "motivation",
            firstError(state.fieldErrors, "motivation"),
          )}
        >
          <TextArea
            name="motivation"
            minLength={20}
            maxLength={1500}
            required
            placeholder="Saya ingin mengikuti program ini karena…"
            helper="Jelaskan hal yang ingin dipelajari dan kontribusi yang ingin diberikan."
            error={registrationForm.getFieldError(
              "motivation",
              firstError(state.fieldErrors, "motivation"),
            )}
            onBlur={(event) =>
              registrationForm.touchAndValidate(
                "motivation",
                event.currentTarget.value,
              )
            }
            onChange={(event) =>
              registrationForm.liveRevalidateIfTouched(
                "motivation",
                event.currentTarget.value,
              )
            }
          />
        </FormField>
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
                Saya berkomitmen mengikuti kegiatan penuh sesuai jadwal yang
                akan dikonfirmasi.{" "}
                <span className="text-brand">(wajib)</span>
              </>
            }
            description="Pendaftaran adalah tahap aplikasi dan belum berarti diterima sebagai peserta."
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
            name="instagramFollowConfirmed"
            required
            label={
              <>
                Saya sudah follow Instagram{" "}
                <span className="font-semibold text-brand">@dekatlokal</span>{" "}
                dan{" "}
                <span className="font-semibold text-brand">@edukasilokal</span>
                . <span className="text-brand">(wajib)</span>
              </>
            }
            description="Tidak perlu upload screenshot. Cukup centang dengan jujur."
            error={registrationForm.getFieldError(
              "instagramFollowConfirmed",
              firstError(state.fieldErrors, "instagramFollowConfirmed"),
            )}
            onCheckedChange={(checked) =>
              registrationForm.touchAndValidate(
                "instagramFollowConfirmed",
                checked,
              )
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
        aria-labelledby="student-submit-title"
        className="rounded-[1.75rem] border border-brand-100 bg-brand-50 p-5 sm:p-7"
      >
        <h2
          id="student-submit-title"
          className="text-xl font-semibold tracking-[-0.025em] text-ink"
        >
          Periksa sebelum mengirim
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Pastikan kontak aktif, jawaban sudah lengkap, dan tidak ada data
          pribadi milik orang lain di dalam isian.
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
            label="Kirim pendaftaran mahasiswa"
            pendingLabel="Mengirim pendaftaran…"
            disabled={!submissionsEnabled}
          />
        </div>
      </section>
    </form>
  );
}
