import { ArrowDown, ArrowUpRight, Check, ShieldCheck } from "iconoir-react";
import type { Metadata } from "next";
import Image from "next/image";

import { BankAccountCards } from "@/components/community-support/bank-account-cards";
import { CommunitySupportForm } from "@/components/community-support/community-support-form";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { communitySupportContent as content } from "@/data/community-support";

const pageTitle = "Community Support | AI Co-Creation Lab Makassar";
const pageDescription =
  "Dukung kebutuhan pelaksanaan AI Co-Creation Lab Makassar untuk mahasiswa dan UMKM.";

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: pageDescription,
  alternates: {
    canonical: "/community-support",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/community-support",
    type: "website",
    images: [
      {
        url: "/aicl-cocreation-indonesia.webp",
        width: 1600,
        height: 900,
        alt: "Mahasiswa dan pelaku UMKM Indonesia berkolaborasi dalam sesi co-creation.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["/aicl-cocreation-indonesia.webp"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CommunitySupportPage() {
  return (
    <article className="relative isolate overflow-hidden">
      <section
        aria-labelledby="community-support-title"
        className="relative overflow-hidden border-b border-brand-100 bg-white"
      >
        <div
          aria-hidden="true"
          className="dot-grid pointer-events-none absolute inset-y-0 right-0 w-[55%] opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_92%)]"
        />
        <div className="page-container relative grid gap-10 py-12 sm:py-16 lg:min-h-[36rem] lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16 lg:py-16">
          <div className="min-w-0">
            <div className="inline-flex min-h-9 max-w-full items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full bg-brand"
              />
              <span className="truncate">{content.hero.eyebrow}</span>
            </div>

            <h1
              id="community-support-title"
              className="mt-6 max-w-4xl text-balance text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.06em] text-ink sm:text-5xl lg:text-[4.15rem]"
            >
              {content.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
              {content.hero.description}
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <a
                href="#support-accounts"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(2,85,245,0.23)] transition hover:-translate-y-0.5 hover:bg-brand-600 sm:w-auto"
              >
                {content.hero.primaryCta}
                <ArrowDown
                  className="h-4 w-4"
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
              </a>
              <a
                href={content.event.proposalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-6 py-3 text-sm font-semibold text-brand transition hover:-translate-y-0.5 hover:border-brand hover:bg-brand-50 sm:w-auto"
              >
                {content.hero.secondaryCta}
                <ArrowUpRight
                  className="h-4 w-4"
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          <Reveal className="mx-auto w-full max-w-[31rem] lg:justify-self-end">
            <div className="relative overflow-hidden rounded-[2rem] border border-brand-700 bg-brand p-5 text-white shadow-[0_28px_70px_rgba(2,85,245,0.24)] sm:p-7">
              <div
                className="hero-grid pointer-events-none absolute inset-0 opacity-50"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="rounded-2xl bg-white p-4 shadow-[0_14px_34px_rgba(0,20,58,0.18)] sm:p-5">
                  <Image
                    src="/event-brand/ai-co-creation-lab-makassar.webp"
                    alt="AI Co-Creation Lab Makassar: From AI Users to Local Problem Solvers"
                    width={1000}
                    height={268}
                    className="h-auto w-full"
                    priority
                  />
                </div>

                <div className="mt-7 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/80">
                      Community support
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                      {content.supportFocus.title}
                    </h2>
                  </div>
                  <ShieldCheck
                    className="h-8 w-8 shrink-0 text-brand-100"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-4 text-sm leading-6 text-white/85">
                  {content.supportFocus.description}
                </p>
                <ul className="mt-5 space-y-3 border-y border-white/15 py-5">
                  {content.supportFocus.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6">
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-white"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs leading-5 text-white/75">
                  {content.supportFocus.transparency}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="support-accounts"
        aria-labelledby="support-accounts-title"
        className="scroll-mt-24 border-b border-slate-200 bg-white py-12 sm:py-16 lg:py-20"
      >
        <div className="page-container">
          <Reveal>
            <SectionHeading
              id="support-accounts-title"
              eyebrow={content.accounts.eyebrow}
              title={content.accounts.title}
              description={content.accounts.description}
            />
          </Reveal>
          <BankAccountCards banks={content.accounts.banks} />
        </div>
      </section>

      <section
        id="support-form"
        aria-labelledby="support-form-title"
        className="scroll-mt-24 bg-slate-50/70 py-12 sm:py-16 lg:py-20"
      >
        <div className="page-container">
          <Reveal>
            <SectionHeading
              id="support-form-title"
              eyebrow={content.form.eyebrow}
              title={content.form.title}
              description={content.form.description}
            />
          </Reveal>
          <CommunitySupportForm />
        </div>
      </section>
    </article>
  );
}
