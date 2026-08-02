import {
  ArrowLeft,
  Calendar,
  Laptop,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "iconoir-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  Avatar,
  BooleanIndicator,
  Card,
  DetailField,
  DetailText,
  StatusBadge,
  TagList,
  TypeBadge,
} from "@/components/admin/ui";
import { EmptyState } from "@/components/ui/empty-state";
import { requireAdmin } from "@/lib/admin/auth";
import { getEventSlug } from "@/lib/event/registration-state";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  STUDENT_AI_EXPERIENCE_OPTIONS,
  STUDENT_PREFERRED_ROLE_OPTIONS,
  STUDENT_SKILL_OPTIONS,
} from "@/lib/validation/student-registration";
import {
  UMKM_AI_USAGE_OPTIONS,
  UMKM_AVAILABLE_ASSET_OPTIONS,
  UMKM_BUSINESS_CATEGORY_OPTIONS,
  UMKM_DEVICE_OPTIONS,
  UMKM_YEARS_IN_BUSINESS_OPTIONS,
} from "@/lib/validation/umkm-registration";

export const metadata: Metadata = {
  title: "Detail Pendaftar",
  robots: { index: false, follow: false },
};

type EmbeddedEvent = { slug: string; title: string };

type StudentMetadata = {
  study_program?: string;
  semester?: number;
  city?: string;
  instagram_username?: string;
  ai_experience?: string;
  skills?: string[];
  preferred_roles?: string[];
  has_laptop?: boolean;
  project_experience?: string;
  motivation?: string;
  attendance_commitment?: boolean;
  instagram_follow_confirmed?: boolean;
};

type UmkmMetadata = {
  business_category?: string;
  business_location?: string;
  social_media_url?: string | null;
  years_in_business?: string;
  available_devices?: string[];
  ai_usage?: string;
  repetitive_problem?: string;
  desired_help?: string;
  available_assets?: string[];
  attendance_commitment?: boolean;
};

type RegistrationDetailRow = {
  id: string;
  created_at: string;
  updated_at: string;
  registration_type: "student" | "umkm" | "general";
  status: string;
  submission_code: string;
  full_name: string;
  email: string | null;
  whatsapp: string;
  institution_name: string | null;
  business_name: string | null;
  metadata: StudentMetadata & UmkmMetadata;
  consent_privacy: boolean;
  consent_documentation: boolean;
  consent_monitoring: boolean;
  ip_hash: string | null;
  user_agent: string | null;
  events: EmbeddedEvent | EmbeddedEvent[] | null;
};

function eventTitle(events: RegistrationDetailRow["events"]): string {
  const event = Array.isArray(events) ? events[0] : events;
  return event?.title ?? "-";
}

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(value));
}

function labelFor(
  options: readonly { value: string; label: string }[],
  value: string | undefined,
): string {
  if (!value) {
    return "-";
  }

  return options.find((option) => option.value === value)?.label ?? value;
}

function labelsFor(
  options: readonly { value: string; label: string }[],
  values: string[] | undefined,
): string[] {
  if (!values || values.length === 0) {
    return [];
  }

  return values.map(
    (value) => options.find((option) => option.value === value)?.label ?? value,
  );
}

function whatsappHref(whatsapp: string): string {
  return `https://wa.me/${whatsapp.replace(/\D/g, "")}`;
}

type RegistrationDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function RegistrationDetailPage({
  params,
}: RegistrationDetailPageProps) {
  // Re-checked per page rather than relying only on the layout: client-side
  // navigation can render a page without re-executing an unchanged layout.
  await requireAdmin();

  const { id } = await params;
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return (
      <EmptyState
        title="Supabase belum dikonfigurasi"
        description="Isi NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di environment untuk melihat data pendaftar."
      />
    );
  }

  // A malformed id can never match a row, so this is just a cheap way to avoid
  // sending an invalid UUID to Postgres and getting a raw driver error back.
  const isPlausibleUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

  if (!isPlausibleUuid) {
    notFound();
  }

  const eventSlug = getEventSlug();
  const { data: eventRow } = await supabase
    .from("events")
    .select("id")
    .eq("slug", eventSlug)
    .maybeSingle<{ id: string }>();

  if (!eventRow) {
    return (
      <EmptyState
        title="Event tidak ditemukan"
        description={`Tidak ada event dengan slug "${eventSlug}" di database.`}
      />
    );
  }

  const { data: registration, error } = await supabase
    .from("registrations")
    .select(
      "id, created_at, updated_at, registration_type, status, submission_code, full_name, email, whatsapp, institution_name, business_name, metadata, consent_privacy, consent_documentation, consent_monitoring, ip_hash, user_agent, events(slug, title)",
    )
    // Scoped to the managed event, matching every other query in this panel.
    .eq("event_id", eventRow.id)
    .eq("id", id)
    .maybeSingle<RegistrationDetailRow>();

  if (error) {
    return <EmptyState title="Gagal memuat data" description={error.message} />;
  }

  if (!registration) {
    notFound();
  }

  const isStudent = registration.registration_type === "student";
  const isUmkm = registration.registration_type === "umkm";
  const metadata = registration.metadata ?? {};

  return (
    <div className="space-y-6">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-brand"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Kembali ke daftar pendaftar
      </Link>

      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar name={registration.full_name} size="lg" />
            <div>
              <h1 className="text-xl font-semibold tracking-[-0.01em] text-ink">
                {registration.full_name}
              </h1>
              <p className="mt-1 font-mono text-xs text-slate-400">
                {registration.submission_code}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <TypeBadge type={registration.registration_type} />
                <StatusBadge status={registration.status} />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-1 text-xs text-slate-500 sm:items-end">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              Mendaftar {formatDateTime(registration.created_at)}
            </span>
            {registration.updated_at !== registration.created_at ? (
              <span>
                Terakhir diperbarui {formatDateTime(registration.updated_at)}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        {/* Main column */}
        <div className="space-y-6">
          <Card title="Kontak">
            <dl className="grid gap-5 sm:grid-cols-2">
              <DetailField
                label="Email"
                value={
                  registration.email ? (
                    <a
                      href={`mailto:${registration.email}`}
                      className="inline-flex items-center gap-1.5 font-medium text-brand hover:underline"
                    >
                      <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                      {registration.email}
                    </a>
                  ) : null
                }
              />
              <DetailField
                label="WhatsApp"
                value={
                  <a
                    href={whatsappHref(registration.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono font-medium text-brand hover:underline"
                  >
                    <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                    {registration.whatsapp}
                  </a>
                }
              />
              {isStudent ? (
                <>
                  <DetailField
                    label="Universitas"
                    value={registration.institution_name}
                  />
                  <DetailField
                    label="Username Instagram"
                    value={
                      metadata.instagram_username
                        ? `@${metadata.instagram_username}`
                        : undefined
                    }
                  />
                  <DetailField
                    label="Kota domisili"
                    value={
                      metadata.city ? (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                          {metadata.city}
                        </span>
                      ) : undefined
                    }
                  />
                </>
              ) : null}
              {isUmkm ? (
                <>
                  <DetailField
                    label="Nama usaha"
                    value={registration.business_name}
                  />
                  <DetailField
                    label="Lokasi usaha"
                    value={
                      metadata.business_location ? (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                          {metadata.business_location}
                        </span>
                      ) : undefined
                    }
                  />
                  <DetailField
                    label="Instagram / kanal digital"
                    value={
                      metadata.social_media_url ? (
                        <a
                          href={metadata.social_media_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-brand hover:underline"
                        >
                          {metadata.social_media_url}
                        </a>
                      ) : undefined
                    }
                    className="sm:col-span-2"
                  />
                </>
              ) : null}
            </dl>
          </Card>

          {isStudent ? (
            <Card
              title="Profil Mahasiswa"
              description="Latar belakang pendidikan dan kesiapan mengikuti program."
            >
              <dl className="grid gap-5 sm:grid-cols-2">
                <DetailField
                  label="Program studi"
                  value={metadata.study_program}
                />
                <DetailField
                  label="Semester"
                  value={metadata.semester ? String(metadata.semester) : undefined}
                />
                <DetailField
                  label="Pengalaman menggunakan AI"
                  value={labelFor(STUDENT_AI_EXPERIENCE_OPTIONS, metadata.ai_experience)}
                />
                <DetailField
                  label="Ketersediaan laptop"
                  value={
                    <span className="inline-flex items-center gap-1.5">
                      <Laptop className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                      {metadata.has_laptop ? "Membawa laptop sendiri" : "Tidak membawa laptop"}
                    </span>
                  }
                />
                <DetailField
                  label="Kemampuan utama"
                  value={<TagList items={labelsFor(STUDENT_SKILL_OPTIONS, metadata.skills)} />}
                  className="sm:col-span-2"
                />
                <DetailField
                  label="Peran yang diinginkan"
                  value={
                    <TagList
                      items={labelsFor(STUDENT_PREFERRED_ROLE_OPTIONS, metadata.preferred_roles)}
                    />
                  }
                  className="sm:col-span-2"
                />
              </dl>
            </Card>
          ) : null}

          {isUmkm ? (
            <Card
              title="Profil Usaha"
              description="Konteks usaha dan kesiapan sebagai challenge partner."
            >
              <dl className="grid gap-5 sm:grid-cols-2">
                <DetailField
                  label="Kategori usaha"
                  value={labelFor(UMKM_BUSINESS_CATEGORY_OPTIONS, metadata.business_category)}
                />
                <DetailField
                  label="Lama usaha berjalan"
                  value={labelFor(UMKM_YEARS_IN_BUSINESS_OPTIONS, metadata.years_in_business)}
                />
                <DetailField
                  label="Pengalaman menggunakan AI"
                  value={labelFor(UMKM_AI_USAGE_OPTIONS, metadata.ai_usage)}
                />
                <DetailField
                  label="Perangkat yang tersedia"
                  value={<TagList items={labelsFor(UMKM_DEVICE_OPTIONS, metadata.available_devices)} />}
                />
                <DetailField
                  label="Aset usaha yang tersedia"
                  value={
                    <TagList items={labelsFor(UMKM_AVAILABLE_ASSET_OPTIONS, metadata.available_assets)} />
                  }
                  className="sm:col-span-2"
                />
              </dl>
            </Card>
          ) : null}

          <Card
            title={isStudent ? "Motivasi dan Pengalaman" : "Kebutuhan Usaha"}
            description={
              isStudent
                ? "Jawaban lengkap dari formulir, ditampilkan apa adanya."
                : "Kebutuhan yang disampaikan, ditampilkan apa adanya."
            }
          >
            <dl className="space-y-6">
              {isStudent ? (
                <>
                  <DetailText
                    label="Pengalaman project"
                    value={metadata.project_experience ?? ""}
                  />
                  <DetailText
                    label="Motivasi mengikuti program"
                    value={metadata.motivation ?? ""}
                  />
                </>
              ) : null}
              {isUmkm ? (
                <>
                  <DetailText
                    label="Masalah atau pekerjaan yang berulang"
                    value={metadata.repetitive_problem ?? ""}
                  />
                  <DetailText
                    label="Bantuan yang paling diharapkan"
                    value={metadata.desired_help ?? ""}
                  />
                </>
              ) : null}
            </dl>
          </Card>
        </div>

        {/* Sidebar column */}
        <div className="space-y-6">
          <Card title="Persetujuan">
            <dl className="space-y-4">
              <DetailField
                label="Komitmen hadir penuh"
                value={<BooleanIndicator value={Boolean(metadata.attendance_commitment)} />}
              />
              <DetailField
                label="Persetujuan pemrosesan data"
                value={<BooleanIndicator value={registration.consent_privacy} />}
              />
              <DetailField
                label="Bersedia didokumentasikan"
                value={<BooleanIndicator value={registration.consent_documentation} />}
              />
              {isStudent ? (
                <DetailField
                  label="Follow @dekatlokal & @edukasilokal"
                  value={
                    <BooleanIndicator value={Boolean(metadata.instagram_follow_confirmed)} />
                  }
                />
              ) : null}
              {isUmkm ? (
                <DetailField
                  label="Bersedia dimonitoring"
                  value={<BooleanIndicator value={registration.consent_monitoring} />}
                />
              ) : null}
            </dl>
          </Card>

          <Card title="Info Teknis">
            <dl className="space-y-4">
              <DetailField label="Event" value={eventTitle(registration.events)} />
              <DetailField
                label="Kode pendaftaran"
                value={
                  <span className="font-mono text-xs">
                    {registration.submission_code}
                  </span>
                }
              />
              <DetailField
                label="User agent"
                value={
                  registration.user_agent ? (
                    <span className="block break-words text-xs text-slate-500">
                      {registration.user_agent}
                    </span>
                  ) : undefined
                }
              />
              <DetailField
                label="Hash IP"
                value={
                  registration.ip_hash ? (
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-500">
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                      {registration.ip_hash.slice(0, 16)}…
                    </span>
                  ) : undefined
                }
              />
            </dl>
          </Card>
        </div>
      </div>
    </div>
  );
}
