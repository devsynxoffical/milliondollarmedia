"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "Who is this for?",
    a: "Agency owners, coaches, high-ticket service providers, and B2B founders already generating $10,000+/month. If you're below that, this system isn't the right fit.",
  },
  {
    q: "Is this completely Done-For-You?",
    a: "Yes. We handle offer positioning, Meta Ads, creatives, landing pages, CRM, AI automations, lead qualification, and follow-up. Your only job is to show up, take the calls, and close.",
  },
  {
    q: "Do I own everything?",
    a: "Yes. Landing pages, funnels, CRM, automations, ad creatives, copy, and customer data all become your business assets. No lock-ins. No hidden ownership.",
  },
  {
    q: "How long does implementation take?",
    a: "The full system is typically installed and live within the first couple of weeks, and the 90-day growth milestones start counting from implementation.",
  },
  {
    q: "What industries do you work with?",
    a: "Countless verticals—agencies, coaches, consultants, high-ticket services, B2B companies, home services, legal, healthcare, real estate, e-commerce, and more. If you sell with Meta, it fits.",
  },
  {
    q: "What happens on the strategy call?",
    a: "We confirm you meet the $10K/month minimum, assess your offer and positioning, and map exactly how the Client Acquisition System will be installed for your business.",
  },
  {
    q: "How is this different from a marketing agency?",
    a: "Most agencies only run ads or build funnels. We build one complete client acquisition ecosystem where every step works together—and you own everything we build.",
  },
  {
    q: "What's included?",
    a: "Everything: offer positioning, messaging strategy, Meta Ads, creatives, landing pages, sales funnel, CRM, AI automations, email and SMS follow-up, appointment reminders, lead qualification, calendar booking, and ongoing optimisation.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section-shell bg-[var(--bg)]">
      <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Reveal>
            <p className="eyebrow-bright">FAQ</p>
            <h2 className="display mt-3 text-[clamp(2rem,4.5vw,3.4rem)] text-white">
              Straight
              <br />
              answers
            </h2>
            <p className="mt-4 max-w-sm text-sm text-white/55 md:text-base">
              No fluff. Clear terms. Clear roles. Clear expectations.
            </p>
          </Reveal>
        </div>

        <div className="space-y-3">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            return (
              <Reveal key={item.q} delay={Math.min(index * 60, 240)}>
                <div
                  className={`overflow-hidden rounded-2xl border bg-white/[0.04] transition ${
                    isOpen
                      ? "border-[var(--accent)]/50 shadow-[0_12px_32px_-16px_rgba(237,28,36,0.35)]"
                      : "border-white/10"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                  >
                    <span className="display text-lg text-white md:text-xl">
                      {item.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg font-bold transition ${
                        isOpen
                          ? "bg-[var(--accent)] text-white"
                          : "bg-[var(--accent-soft)] text-[var(--accent-bright)]"
                      }`}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-white/10 px-5 pb-5 pt-3 text-sm leading-relaxed text-white/60 md:px-6 md:text-base">
                      {item.a}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
