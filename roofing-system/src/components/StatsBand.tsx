"use client";

import { FormEvent, useState } from "react";
import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";
import { AuroraBg } from "./AuroraBg";

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
    <section className="relative bg-[#09090b] py-16 md:py-20 text-white border-b border-zinc-800">
      <AuroraBg />
      <div className="jobber-grid-dark absolute inset-0 pointer-events-none opacity-50" />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <Reveal className="text-center max-w-3xl mx-auto">
          <h2 className="display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Join over 300+ roofing contractors who trust Roofing Systems™
          </h2>
        </Reveal>

        {/* 4 Stat Boxes, GetJobber Style */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <Reveal key={s.label} delay={idx * 70}>
              <div className="glow-card group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/90 p-5 text-center shadow-xs">
                <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-70" />
                <span className="display text-2xl sm:text-3xl text-[var(--accent)] font-extrabold transition-transform duration-300 group-hover:scale-110 inline-block">
                  <CountUp
                    end={s.end}
                    prefix={s.prefix}
                    suffix={s.suffix}
                  />
                </span>
                <p className="mt-1.5 text-xs sm:text-sm font-bold text-white">{s.label}</p>
                <p className="mt-0.5 text-[11px] text-zinc-400 font-medium">{s.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Quick Opt-in Bar, GetJobber Style */}
        <div className="mt-10 max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-full border border-zinc-800 bg-zinc-900 shadow-md">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email..."
              className="w-full rounded-full bg-transparent px-5 py-3 text-sm text-white placeholder:text-zinc-500 outline-none"
            />
            <button type="submit" className="btn btn-accent w-full sm:w-auto shrink-0 px-6 py-3 text-xs font-bold uppercase tracking-wider">
              Get Free Demo
            </button>
          </form>
          <p className="mt-2 text-center text-[11px] text-zinc-500 font-medium">
            Strictly for roofing companies doing $1M+/year.
          </p>
        </div>
      </div>
    </section>
  );
}

