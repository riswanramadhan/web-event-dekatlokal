import {
  ArrowDown,
  ArrowUpRight,
  Bag,
  Camera,
  Code,
  CoffeeCup,
  Community,
  Link as LinkIcon,
  ShieldCheck,
  Sparks,
  Tools,
  UserBadgeCheck,
} from "iconoir-react";
import type { Metadata } from "next";
import Image from "next/image";

import { BankAccountCards } from "@/components/community-support/bank-account-cards";
import { CommunitySupportForm } from "@/components/community-support/community-support-form";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  communitySupportContent as content,
  type CommunitySupportAllocation,
} from "@/data/community-support";

const pageTitle = "Community Support | AI Co-Creation Lab Makassar";
const pageDescription =
  "Support AI Co-Creation Lab Makassar and help students and local businesses build practical digital solutions together.";

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

const allocationIcons = {
  meal: CoffeeCup,
  identity: UserBadgeCheck,
  kit: Bag,
  documentation: Camera,
  development: Code,
  operations: Tools,
} satisfies Record<
  CommunitySupportAllocation["icon"],
  typeof CoffeeCup
>;

const supportModes = [
  {
    label: "Fund",
    description: "Bantu kebutuhan pelaksanaan yang paling dekat.",
    icon: Sparks,
  },
  {
    label: "Share",
    description: "Kirim halaman ini ke circle yang relevan.",
    icon: LinkIcon,
  },
  {
    label: "Connect",
    description: "Kenalkan tim dengan partner yang tepat.",
    icon: Community,
  },
] as const;

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
        <div className="page-container relative grid gap-10 py-12 sm:py-16 lg:min-h-[42rem] lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16 lg:py-20">
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
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              {content.hero.invitation}
            </p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <a
                href="#support-form"
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

            <div className="mt-10 border-t border-slate-200 pt-5">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                {content.hero.targetLabel}
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-4">
                {content.hero.metrics.map((metric) => (
                  <div key={metric.label} className="flex min-w-0 flex-col">
                    <dt className="text-xs leading-5 text-slate-500">
                      {metric.label}
                    </dt>
                    <dd className="order-first font-mono text-2xl font-semibold tracking-[-0.04em] text-ink">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
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
                    alt="AI Co-Creation Lab Makassar — From AI Users to Local Problem Solvers"
                    width={1000}
                    height={268}
                    className="h-auto w-full"
                    priority
                  />
                </div>

                <div className="mt-7 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white">
                      Community support
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                      Three ways to show up.
                    </h2>
                  </div>
                  <ShieldCheck
                    className="h-8 w-8 shrink-0 text-brand-100"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </div>

                <ul className="mt-6 divide-y divide-white/15 border-y border-white/15">
                  {supportModes.map((mode) => {
                    const Icon = mode.icon;

                    return (
                      <li
                        key={mode.label}
                        className="grid grid-cols-[auto_1fr] gap-3 py-4"
                      >
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white">
                          <Icon
                            className="h-4.5 w-4.5"
                            strokeWidth={1.7}
                            aria-hidden="true"
                          />
                        </span>
                        <div>
                          <p className="text-sm font-semibold">{mode.label}</p>
                          <p className="mt-0.5 text-xs leading-5 text-white">
                            {mode.description}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-5 text-xs leading-5 text-white">
                  Open for friends, alumni, communities, and good people who
                  want to help this lab move forward.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="why-community-support-title"
        className="border-b border-slate-200 bg-white py-14 sm:py-20 lg:py-24"
      >
        <div className="page-container grid gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              id="why-community-support-title"
              eyebrow={content.why.eyebrow}
              title={content.why.title}
            />
          </Reveal>
          <Reveal delay={0.06}>
            <div className="max-w-3xl space-y-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              {content.why.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <blockquote className="mt-8 border-l-2 border-brand pl-5 text-xl font-semibold leading-8 tracking-[-0.03em] text-brand-800 sm:text-2xl">
              {content.why.highlight}
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="support-allocation-title"
        className="border-b border-slate-200 py-14 sm:py-20 lg:py-24"
      >
        <div className="page-container">
          <Reveal>
            <SectionHeading
              id="support-allocation-title"
              eyebrow={content.allocations.eyebrow}
              title={content.allocations.title}
              description={content.allocations.description}
            />
          </Reveal>

          <div className="mt-10 grid gap-x-12 gap-y-0 border-y border-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            {content.allocations.items.map((item, index) => {
              const Icon = allocationIcons[item.icon];

              return (
                <Reveal
                  key={item.title}
                  delay={(index % 3) * 0.045}
                  className="border-b border-slate-200 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0"
                >
                  <div className="flex min-h-full gap-4 py-6">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand">
                      <Icon
                        className="h-5 w-5"
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <h3 className="font-semibold leading-6 text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="mt-8 flex max-w-4xl items-start gap-3 rounded-2xl border border-brand-200 bg-brand-50 px-4 py-4 text-sm leading-7 text-brand-900 sm:px-5">
              <ShieldCheck
                className="mt-1 h-5 w-5 shrink-0 text-brand"
                strokeWidth={1.8}
                aria-hidden="true"
              />
              <p>{content.allocations.transparency}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="support-accounts-title"
        className="border-y border-slate-200 bg-white py-14 sm:py-20 lg:py-24"
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
        className="scroll-mt-24 py-14 sm:py-20 lg:py-24"
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
