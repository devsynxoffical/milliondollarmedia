"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { BOOKING_PATH } from "../lib/offer";
import Link from "next/link";

const faqs = [
  {
    q: "What exactly is Roofing Systems™?",
    a: "It's a complete done-for-you client acquisition system built for roofing companies. We handle offer positioning, Meta ads, ad creatives, landing pages, the full sales funnel, CRM setup, AI follow-up, email and SMS sequences, and lead qualification — all managed for you.",
  },
  {
    q: "Who is this for?",
    a: "Roofing contractors doing $1M+ in annual revenue who want predictable, repeatable growth instead of lead-dependent chaos. If you're tired of overpaying for marketing with nothing to show for it, this is built for you.",
  },
  {
    q: "How fast will I see results?",
    a: "Most clients see measurable lead growth within 30–45 days of launch. Every engagement is backed by mutually agreed growth milestones we commit to hitting within the first 90 days.",
  },
  {
    q: "What happens if it doesn't work?",
    a: "We continue working for you at no management fee until we help you hit the agreed milestones. Everything is backed by a written agreement, so the risk sits on us, not you.",
  },
  {
    q: "Do I actually own the assets?",
    a: "Yes. Landing pages, sales funnel, CRM, automations, ad creatives, copy, follow-up sequences, and your customer data are 100% yours — permanently. It becomes a business asset you own outright.",
  },
  {
    q: "Is there a long-term contract lock-in?",
    a: "No. We don't lock you in with long-term contracts. We earn the renewal by delivering results, not by trapping you in a commitment.",
  },
  {
    q: "How is this different from a traditional agency?",
    a: "Agencies run ads and hand you raw, unqualified leads. We build and operate the entire acquisition engine end-to-end — and our proprietary qualification process filters leads before they ever reach your sales team, so your crew spends time closing roofing projects, not chasing tire-kickers.",
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
          ? "border-[var(--accent)]/50 bg-white shadow-lg"
          : "border-zinc-200 bg-white shadow-sm hover:border-zinc-300"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-sm font-extrabold text-zinc-950 md:text-base">{q}</span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            open ? "bg-[var(--accent)] text-white rotate-45" : "bg-zinc-100 text-zinc-500"
          }`}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
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

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-shell bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left: heading + CTA */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="pill-badge-red mb-3">
                <span className="dot-red" />
                <span>FAQ</span>
              </div>
              <h2 className="display text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight">
                Questions?{" "}
                <span className="text-[var(--accent)]">We&apos;ve got answers.</span>
              </h2>
              <p className="mt-4 text-base text-zinc-500 leading-relaxed">
                Everything roofing companies ask us before installing the
                system. If your question isn&apos;t here, book a call and ask us
                directly.
              </p>
              <Link
                href={BOOKING_PATH}
                className="btn btn-accent mt-8 px-7 py-3.5 text-sm font-bold shadow-md inline-flex"
              >
                Book Your Free Strategy Call →
              </Link>
            </Reveal>
          </div>

          {/* Right: accordion */}
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
