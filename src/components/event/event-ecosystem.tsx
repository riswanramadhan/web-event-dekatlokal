import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import type { EventConfig } from "@/data/events";

type EventEcosystemProps = Pick<
  EventConfig,
  "sponsorship" | "supportingEcosystem"
>;

export function EventEcosystem({
  sponsorship,
  supportingEcosystem,
}: EventEcosystemProps) {
  const approvedMembers = supportingEcosystem.members.filter(
    (member) => member.approvedForDisplay,
  );
  const ecosystemGroups = [
    {
      id: "main",
      label: "Kolaborator program",
      members: approvedMembers.filter((member) => member.cluster === "main"),
    },
    {
      id: "bumn",
      label: "Ekosistem BUMN",
      members: approvedMembers.filter((member) => member.cluster === "bumn"),
    },
  ].filter((group) => group.members.length > 0);

  return (
    <>
      <section aria-labelledby="sponsorship-title" className="py-14 sm:py-20">
        <div className="page-container">
          <Reveal>
            <div className="relative isolate overflow-hidden rounded-[1.75rem] border border-brand-200 bg-brand px-5 py-8 text-white shadow-[0_22px_55px_rgba(2,85,245,0.18)] sm:px-9 sm:py-10 lg:px-12">
              <div
                className="pointer-events-none absolute -right-16 -top-24 -z-10 h-64 w-64 rounded-full border border-white/15"
                aria-hidden="true"
              />
              <div className="mx-auto max-w-2xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-100">
                  {sponsorship.eyebrow}
                </p>
                <h2
                  id="sponsorship-title"
                  className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] sm:text-4xl"
                >
                  {sponsorship.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
                  {sponsorship.description}
                </p>
              </div>

              <ul className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                {sponsorship.partners.map((partner) => (
                  <li
                    key={partner.id}
                    className="flex min-h-32 flex-col items-center justify-center gap-3 rounded-2xl border border-white/55 bg-white px-3 py-4 text-center shadow-[0_10px_26px_rgba(0,24,74,0.16)]"
                  >
                    <Image
                      src={partner.logo.src}
                      alt={partner.logo.alt}
                      width={partner.logo.width}
                      height={partner.logo.height}
                      sizes="(max-width: 639px) 38vw, (max-width: 1023px) 24vw, 13rem"
                      loading="lazy"
                      className="h-14 w-full object-contain sm:h-16"
                    />
                    <span className="text-xs font-semibold leading-5 text-slate-700 sm:text-sm">
                      {partner.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="supporting-ecosystem-title"
        className="border-y border-slate-200 bg-white/80 py-14 sm:py-20"
      >
        <div className="page-container">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              {supportingEcosystem.eyebrow}
            </p>
            <h2
              id="supporting-ecosystem-title"
              className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] text-ink sm:text-4xl"
            >
              {supportingEcosystem.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              {supportingEcosystem.description}
            </p>
          </Reveal>

          <div className="mt-10 space-y-8">
            {ecosystemGroups.map((group) => (
              <div key={group.id}>
                <h3 className="mb-3 text-sm font-semibold text-slate-700">
                  {group.label}
                </h3>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.members.map((member) => (
                    <li
                      key={member.id}
                      className="flex min-h-24 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(1,34,98,0.05)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_14px_34px_rgba(1,34,98,0.09)]"
                    >
                      <span className="flex h-16 w-20 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-2.5 sm:w-24">
                        <Image
                          src={member.logo.src}
                          alt={member.logo.alt}
                          width={member.logo.width}
                          height={member.logo.height}
                          sizes="(max-width: 639px) 5rem, 6rem"
                          loading="lazy"
                          className="h-full w-full object-contain"
                        />
                      </span>
                      <span className="min-w-0 text-sm font-semibold leading-6 text-slate-800">
                        {member.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-6 text-slate-500">
            {supportingEcosystem.disclaimer}
          </p>
        </div>
      </section>
    </>
  );
}
