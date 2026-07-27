import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { EventSubnav } from "@/components/event/event-subnav";
import { SubmissionSuccess } from "@/components/registration/submission-success";
import { aiCoCreationLabEvent as event } from "@/data/events";

const title = "Konfirmasi Pendaftaran";
const description =
  "Konfirmasi pengiriman aplikasi AI Co-Creation Lab Makassar.";
const submissionCodePattern =
  /^AICL-(STU|UMK)-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}$/;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: event.routes.registrationSuccess,
  },
  robots: {
    index: false,
    follow: false,
  },
};

type RegistrationSuccessPageProps = {
  searchParams: Promise<{
    code?: string | string[];
  }>;
};

function resolveSubmission(codeParameter: string | string[] | undefined): {
  submissionCode?: string;
  category?: "Mahasiswa" | "UMKM";
} {
  if (typeof codeParameter !== "string") {
    return {};
  }

  const submissionCode = codeParameter.trim();
  const match = submissionCodePattern.exec(submissionCode);

  if (!match) {
    return {};
  }

  return {
    submissionCode,
    category: match[1] === "STU" ? "Mahasiswa" : "UMKM",
  };
}

export default async function RegistrationSuccessPage({
  searchParams,
}: RegistrationSuccessPageProps) {
  const { code } = await searchParams;
  const submission = resolveSubmission(code);

  return (
    <>
      <div className="border-b border-slate-200 bg-white">
        <div className="page-container py-5">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500">
              <li>
                <Link
                  href={event.routes.detail}
                  className="rounded text-slate-600 hover:text-brand"
                >
                  AI Co-Creation Lab
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li>
                <Link
                  href={event.routes.register}
                  className="rounded text-slate-600 hover:text-brand"
                >
                  Pendaftaran
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li aria-current="page" className="text-slate-700">
                Konfirmasi
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <EventSubnav />

      <main className="relative overflow-hidden bg-surface py-12 sm:py-16 lg:py-20">
        <div
          className="dot-grid absolute inset-y-0 right-0 w-1/2 opacity-35"
          aria-hidden="true"
        />
        <div className="page-container relative">
          <SubmissionSuccess
            submissionCode={submission.submissionCode}
            category={submission.category}
            eventPath={event.routes.detail}
            registerPath={event.routes.register}
          />
        </div>
      </main>
    </>
  );
}
