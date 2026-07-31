import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import {
  ArrowLeft,
  ArrowRight,
  Group,
  Shop,
  Star,
  StatsReport,
} from "iconoir-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { SponsorshipFlipbookLoader } from "@/components/sponsorship/sponsorship-flipbook-loader";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  sponsorshipProposalContent,
  sponsorshipProposalMeta,
  sponsorshipProposalRoute,
} from "@/data/sponsorship-proposal-pages";

const eventRoute = "/ai-co-creation-lab-makassar";

// Keep this page out of search indexes while pages 2–24 are placeholders.
// Revisit the flag only after the final proposal pages replace the placeholders.
const placeholderRobots: Metadata["robots"] =
  sponsorshipProposalMeta.isPlaceholder
    ? {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      }
    : undefined;

export const metadata: Metadata = {
  title: {
    absolute: sponsorshipProposalMeta.title,
  },
  description: sponsorshipProposalMeta.description,
  alternates: {
    canonical: sponsorshipProposalRoute,
  },
  robots: placeholderRobots,
};

const partnershipValueIcons = [Group, Shop, Star, StatsReport] as const;

export default function SponsorshipProposalPage() {
  return (
    <article className="relative isolate overflow-hidden">
      <section
        aria-labelledby="sponsorship-proposal-title"
        className="relative overflow-hidden border-b border-brand-100 bg-white"
      >
        <div
          className="dot-grid pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
          aria-hidden="true"
        />
        <div className="page-container relative py-12 sm:py-16 lg:py-24">
          <div className="max-w-3xl">
            <Link
              href={eventRoute}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-[0_8px_22px_rgba(1,34,98,0.05)] transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand"
            >
              <ArrowLeft
                className="h-4 w-4"
                strokeWidth={1.9}
                aria-hidden="true"
              />
              Kembali ke event
            </Link>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              {sponsorshipProposalContent.hero.eyebrow}
            </p>
            <h1
              id="sponsorship-proposal-title"
              className="mt-4 text-balance text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.058em] text-ink sm:text-5xl lg:text-[3.7rem]"
            >
              {sponsorshipProposalContent.hero.title}
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
              {sponsorshipProposalContent.hero.description}
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#proposal-flipbook"
                className="button-loop inline-flex min-h-12 w-fit max-w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(2,85,245,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-600 sm:px-6"
              >
                {sponsorshipProposalContent.hero.primaryCta}
                <ArrowRight
                  className="h-4 w-4"
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
              </a>
              <a
                href={sponsorshipProposalContent.contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-fit max-w-full items-center justify-center gap-2 rounded-full border border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-brand transition hover:-translate-y-0.5 hover:border-brand hover:bg-brand-50 sm:px-6"
              >
                {sponsorshipProposalContent.hero.secondaryCta}
                <SiWhatsapp
                  className="h-4 w-4"
                  color="currentColor"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="proposal-flipbook"
        aria-labelledby="proposal-flipbook-title"
        className="scroll-mt-28 border-y border-slate-200 bg-white py-14 sm:py-20"
      >
        <div className="page-container">
          <Reveal>
            <SectionHeading
              id="proposal-flipbook-title"
              eyebrow={sponsorshipProposalContent.flipbook.eyebrow}
              title={sponsorshipProposalContent.flipbook.title}
              description={sponsorshipProposalContent.flipbook.description}
              align="center"
            />
          </Reveal>

          <div className="mx-auto mt-10 max-w-[74rem] overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50/75 p-3 shadow-[0_18px_48px_rgba(1,34,98,0.07)] sm:p-6 lg:p-10">
            <SponsorshipFlipbookLoader />
          </div>
        </div>
      </section>


      <section
        aria-labelledby="partnership-value-title"
        className="border-b border-slate-200 bg-white py-14 sm:py-20"
      >
        <div className="page-container">
          <Reveal>
            <SectionHeading
              id="partnership-value-title"
              eyebrow={sponsorshipProposalContent.partnershipValue.eyebrow}
              title={sponsorshipProposalContent.partnershipValue.title}
              align="center"
            />
          </Reveal>

          <div className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sponsorshipProposalContent.partnershipValue.items.map(
              (value, index) => {
                const Icon = partnershipValueIcons[index];

                return (
                  <Reveal key={value} delay={index * 0.055}>
                    <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_32px_rgba(1,34,98,0.045)] transition hover:border-brand-200 sm:p-6">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                      </span>
                      <h3 className="mt-5 text-lg font-semibold leading-7 tracking-[-0.025em] text-ink">
                        {value}
                      </h3>
                    </div>
                  </Reveal>
                );
              },
            )}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="support-categories-title"
        className="py-14 sm:py-20"
      >
        <div className="page-container">
          <Reveal>
            <SectionHeading
              id="support-categories-title"
              eyebrow={sponsorshipProposalContent.supportCategories.eyebrow}
              title={sponsorshipProposalContent.supportCategories.title}
              description={
                sponsorshipProposalContent.supportCategories.description
              }
            />
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {sponsorshipProposalContent.supportCategories.items.map(
              (category, index) => (
                <Reveal
                  key={category.title}
                  delay={(index % 2) * 0.055}
                  className={
                    index ===
                    sponsorshipProposalContent.supportCategories.items.length -
                      1
                      ? "lg:col-span-2"
                      : undefined
                  }
                >
                  <article className="grid h-full gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_32px_rgba(1,34,98,0.045)] sm:grid-cols-[auto_1fr] sm:p-6">
                    <span className="font-mono text-xs font-semibold text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold leading-7 tracking-[-0.03em] text-ink">
                        {category.title}
                      </h3>
                      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                            Kebutuhan
                          </dt>
                          <dd className="mt-1.5 text-sm leading-6 text-slate-700">
                            {category.need}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                            Potensi kontribusi
                          </dt>
                          <dd className="mt-1.5 text-sm leading-6 text-slate-700">
                            {category.contribution}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </article>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[74rem] rounded-[1.75rem] border border-brand-700 bg-brand px-6 py-10 text-white shadow-[0_22px_55px_rgba(2,85,245,0.18)] sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-100">
              {sponsorshipProposalContent.contact.eyebrow}
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              {sponsorshipProposalContent.contact.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
              {sponsorshipProposalContent.contact.description}
            </p>
          </div>
          <a
            href={sponsorshipProposalContent.contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="button-loop mt-7 inline-flex min-h-12 w-fit max-w-full shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand shadow-[0_12px_28px_rgba(0,31,92,0.2)] transition hover:-translate-y-0.5 hover:bg-brand-50 sm:px-6 lg:mt-0"
          >
            {sponsorshipProposalContent.contact.cta}
            <SiWhatsapp
              className="h-4 w-4"
              color="currentColor"
              aria-hidden="true"
            />
          </a>
        </div>
      </section>
    </article>
  );
}
