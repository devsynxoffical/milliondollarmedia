"use client";

import { FormEvent, useState } from "react";
import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "./Reveal";
import { Counter } from "./ui/Counter";
import { AuroraBg } from "./AuroraBg";
import { SplitReveal } from "./ui/SplitReveal";

const stats = [
  { end: 50, prefix: "$", suffix: " Million+", label: "Managed in Roofing Ads", sub: "Tested & proven campaigns" },
  { end: 300, prefix: "", suffix: "+", label: "Roofing Contractors", sub: "Scaled across US & Canada" },
  { end: 90, prefix: "", suffix: " Days", label: "Revenue Guarantee", sub: "Backed by written agreement" },
  { end: 100, prefix: "", suffix: "% DFY", label: "Client Acquisition", sub: "Offer, Ads, CRM, AI, Funnels" },
];

export function StatsBand() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email) {
      window.location.href = `${BOOKING_PATH}?email=${encodeURIComponent(email)}`;
    }
  }

  return (
    <section className="relative bg-ink py-16 text-fog md:py-20">
      <AuroraBg />
      <div className="jobber-grid-dark absolute inset-0 pointer-events-none opacity-50" />

      <div className="relative mx-auto max-w-[88rem] px-5 md:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SplitReveal as="h2" mode="lines" className="font-heading text-2xl font-bold leading-[1.08] tracking-[-0.03em] text-fog sm:text-4xl">
            Join over 300+ roofing contractors who trust Roofing Systems™
          </SplitReveal>
        </Reveal>

        {/* 4 Stat Boxes, GetJobber Style */}
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {stats.map((s) => (
            <Reveal key={s.label} className="h-full">
              <div className="flex h-full flex-col items-center gap-1 bg-panel p-6 text-center">
                <span className="font-heading text-2xl font-bold tracking-[-0.03em] text-[#ed1c24] sm:text-3xl">
                  <Counter value={s.end} prefix={s.prefix} suffix={s.suffix} />
                </span>
                <p className="mt-1.5 text-xs sm:text-sm font-bold text-fog">{s.label}</p>
                <p className="mt-0.5 text-[11px] text-dim font-medium">{s.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Quick Opt-in Bar, GetJobber Style */}
        <div className="mx-auto mt-10 max-w-xl">
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2 rounded-full border border-line bg-panel p-2 shadow-md sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email..."
              className="w-full rounded-full bg-transparent px-5 py-3 text-sm text-fog placeholder:text-dim outline-none"
            />
            <button type="submit" className="w-full shrink-0 rounded-full bg-[#ed1c24] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[#ff2a1f] sm:w-auto">
              Get Free Demo
            </button>
          </form>
          <p className="mt-2 text-center text-[11px] font-medium text-dim">
            Strictly for roofing companies doing $1M+/year.
          </p>
        </div>
      </div>
    </section>
  );
}
