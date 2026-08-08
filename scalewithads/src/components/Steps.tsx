import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    title: "Market Research & Customer Analysis",
    desc: "We identify exactly who your ideal clients are and what makes them buy.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: "Offer Positioning",
    desc: "We package and position your service so it stands out from competitors.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </svg>
    ),
  },
  {
    title: "Messaging & Creative Development",
    desc: "We create ad copy and creatives that attract premium buyers.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5M21 12a9 9 0 11-5.1-8.1L21 5.5V12z" />
      </svg>
    ),
  },
  {
    title: "Landing Pages & Sales Funnel",
    desc: "We build high-converting landing pages and funnels designed to convert traffic into booked appointments.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zm1 4h14M8 13h3" />
      </svg>
    ),
  },
  {
    title: "Meta Ads Management",
    desc: "We launch, manage, and optimise your campaigns daily.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a7 7 0 100 14h2a7 7 0 100-14h-2zM9 21h6M12 4v17" />
      </svg>
    ),
  },
  {
    title: "CRM & AI Automations",
    desc: "Every lead automatically enters your CRM with automated email, SMS, reminders, and follow-up.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      </svg>
    ),
  },
  {
    title: "Lead Qualification",
    desc: "Our proprietary multi-validation process filters leads before they reach your calendar, improving booking and show-up rates.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18v6a6 6 0 01-6 6h-6a6 6 0 01-6-6V4zM12 16v5m-3 0h6" />
      </svg>
    ),
  },
  {
    title: "Close Premium Clients",
    desc: "You simply attend the appointments and close the deals while our system works in the background.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3 3 7-7M12 21a9 9 0 100-18 9 9 0 000 18z" />
      </svg>
    ),
  },
];

export function Steps() {
  return (
    <section
      id="system"
      className="relative overflow-hidden border-b border-zinc-200 bg-[#fafafa] py-16 text-zinc-950 md:py-24"
    >
      <div className="jobber-grid-light pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          light
          eyebrow="HOW OUR CLIENT ACQUISITION SYSTEM WORKS"
          title={
            <>
              Our <span className="text-[#ed1c24]">8-Step</span> Client
              Acquisition Process
            </>
          }
          description="One connected system, from the first click to a qualified client on your calendar."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 60} className="h-full">
              <div className="group relative flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#ed1c24] hover:shadow-[0_16px_40px_-16px_rgba(237,28,36,0.15)]">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-[#ed1c24] ring-1 ring-red-100">
                    {step.icon}
                  </span>
                  <span className="display text-2xl font-extrabold text-zinc-200 transition group-hover:text-[#ed1c24]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-extrabold leading-snug tracking-tight text-zinc-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160} className="mt-12 text-center">
          <Link
            href={BOOKING_PATH}
            className="btn btn-accent inline-flex min-w-[280px] px-8 py-4 text-sm font-bold shadow-md"
          >
            Book Your Free Strategy Call →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
