"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { SectionBadge } from "./axion/SectionBadge";
import { CTAButton } from "./ui/CTAButton";

const faqs = [
  {
    q: "Who is this mastermind for?",
    a: "Roofing company owners and marketing decision-makers who already run ads or want to start. It's built for $1M+ roofing contractors who want predictable, repeatable sales calls instead of guesswork.",
  },
  {
    q: "Is this a live call?",
    a: "No. This is a private mastermind recording you can watch any time. After watching, book a free 1:1 strategy call to talk through your roofing company's specific situation.",
  },
  {
    q: "How do I get the most out of it?",
    a: "Watch it end-to-end, take notes on the framework, and start with the piece that fits your account first. Then bring your questions to the free strategy call.",
  },
  {
    q: "What happens after I watch it?",
    a: "If you want to install the full Roofing Systems™ acquisition system, the strategy call is the next step. It's free, and it's for roofers only.",
  },
  {
    q: "Is there a guarantee?",
    a: "Yes. The full system engagement is backed by mutually agreed growth milestones in a written agreement. If we don't help you hit them within 90 days, we keep working at no management fee until we do.",
  },
];

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
        open
          ? "border-[#ed1c24]/50 bg-white shadow-lg"
          : "border-zinc-200 bg-white shadow-sm hover:border-zinc-300"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-[15px] font-medium text-gray-900 md:text-base">{q}</span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            open ? "rotate-45 bg-[#ed1c24] text-white" : "bg-zinc-100 text-zinc-500"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 text-sm leading-relaxed text-zinc-600">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function MastermindFaq({ bookingPath }: { bookingPath: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-shell bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionBadge num="05" label="Mastermind FAQ" />
              <h2 className="mt-8 text-[clamp(1.75rem,4vw,3.4rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900">
                Questions? Get answers.
              </h2>
              <p className="mt-5 text-[15px] font-medium leading-[1.6] text-gray-600 sm:text-[16px]">
                What roofing companies ask us before installing the full
                acquisition system. Still unsure? Book a free call and ask us
                directly.
              </p>
              <CTAButton
                href={bookingPath}
                label="Book Your Free Strategy Call"
                size="lg"
                className="mt-8"
              />
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <div className="space-y-3">
                {faqs.map((item, i) => (
                  <FaqItem
                    key={item.q}
                    q={item.q}
                    a={item.a}
                    open={openIndex === i}
                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
