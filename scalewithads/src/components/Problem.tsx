"use client";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const gaps = [
  {
    id: "ads",
    label: "Ads Without Funnels",
    icon: "📈",
    problem: "Agencies run traffic and call it marketing. But raw clicks don't book appointments — only a pre-sold journey does.",
    metric: "94% of clicks never convert",
    visual: "Clicks → Dead End",
  },
  {
    id: "funnels",
    label: "Funnels Nobody Owns",
    icon: "🔗",
    problem: "One vendor builds the page, another runs ads, a third writes emails. The handoffs break. Leads go cold between the cracks.",
    metric: "Broken handoffs kill 70% of pipeline",
    visual: "Page → Ads → Email → ❌",
  },
  {
    id: "copy",
    label: "Copy Without Follow-Up",
    icon: "✍️",
    problem: "Great copy gets attention. But without automated nurture, qualification, and booking — it's just noise. The deal dies in the inbox.",
    metric: "80% of sales need 5+ follow-ups",
    visual: "Attention → Silence",
  },
  {
    id: "data",
    label: "Data In Silos",
    icon: "📊",
    problem: "Ads data sits in Meta. CRM data sits in HubSpot. Funnel data sits in ClickFunnels. Nobody sees the full picture — so nobody optimizes the whole system.",
    metric: "Blind optimization = wasted spend",
    visual: "Meta ∥ CRM ∥ Funnel",
  },
];

const systemBenefits = [
  { label: "Unified Tracking", desc: "One pixel, one dashboard, full-funnel visibility" },
  { label: "Automated Nurture", desc: "AI follow-up that qualifies, books, and pre-sells" },
  { label: "Creative Engine", desc: "Ads written, designed, and iterated by the same team running them" },
  { label: "CRM Built In", desc: "No duct-taped tools. Pipeline, calendar, and comms in one place" },
];

export function Problem() {
  return (
    <section
      id="problem"
      className="relative overflow-hidden border-b border-zinc-200 bg-white py-16 text-zinc-950 md:py-28"
    >
      <div className="jobber-grid-light pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          light
          eyebrow="WHY GROWTH STALLS"
          title={
            <>
              Most Businesses Don&apos;t Have A Lead Problem...
              <br className="hidden sm:block" />
              <span className="text-[#ed1c24]">
                They Have A Client Acquisition System Problem.
              </span>
            </>
          }
        />

        {/* The 4 Gaps - Interactive Cards */}
        <div className="mt-16 relative">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {gaps.map((gap, i) => (
              <Reveal key={gap.id} delay={i * 100} className="h-full">
                <div className="group relative flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-6 md:p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#ed1c24] hover:shadow-[0_20px_50px_-20px_rgba(237,28,36,0.15)]">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#ed1c24] text-xl ring-1 ring-red-100">
                      {gap.icon}
                    </span>
                    <span className="mt-2.5 text-[10px] font-bold uppercase tracking-widest text-[#ed1c24]">
                      Gap {i + 1}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-extrabold leading-snug tracking-tight text-zinc-900">
                    {gap.label}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-500 flex-1">
                    {gap.problem}
                  </p>

                  {/* Visual flow */}
                  <div className="mt-4 pt-4 border-t border-zinc-100">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 group-hover:text-[#ed1c24]/70 transition-colors">
                      <span>{gap.visual}</span>
                    </div>
                    <div className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[#ed1c24]">
                      {gap.metric}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* The Root Cause */}
        <Reveal delay={200} className="mt-20">
          <div className="relative rounded-3xl border border-zinc-200 bg-zinc-50 p-8 md:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-red-50 rounded-full blur-3xl opacity-60" />

            <div className="relative mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-100 px-4 py-2 text-sm font-semibold text-[#ed1c24] mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-[#ed1c24] animate-ping opacity-75" />
                  <span className="relative inline-block h-2 w-2 rounded-full bg-[#ed1c24]" />
                </span>
                The Root Cause
              </div>

              <p className="display text-2xl md:text-3xl lg:text-4xl leading-snug tracking-tight text-zinc-900">
                Nobody owns the{" "}
                <span className="text-[#ed1c24] relative">
                  entire customer journey.
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#ed1c24] to-transparent opacity-40" />
                </span>
              </p>

              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-500 md:text-lg">
                The customer journey is split across agencies, freelancers, and
                disconnected tools. When no single system owns it end-to-end, nothing
                compounds. You get activity without momentum.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <span className="text-sm font-medium text-zinc-400">The fragmented way:</span>
                <div className="flex items-center gap-1.5 flex-wrap justify-center">
                  {["Ads Agency", "Funnel Builder", "Copywriter", "VA Follow-up", "CRM Admin"].map((v) => (
                    <span
                      key={v}
                      className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-500 bg-white border border-zinc-200 rounded-full"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* The Solution Preview */}
        <Reveal delay={280} className="mt-16">
          <div className="relative rounded-3xl border border-[#ed1c24]/20 bg-gradient-to-br from-red-50 via-white to-red-50/30 p-8 md:p-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ed1c24]/5 rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-8">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ed1c24] text-white text-xs font-bold">
                  SWA
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider text-[#ed1c24]">
                    The Scale With Ads™ System
                  </p>
                  <p className="text-sm text-zinc-500">One ecosystem. Every piece connected.</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {systemBenefits.map((benefit, i) => (
                  <div
                    key={benefit.label}
                    className="group relative rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-300 hover:border-[#ed1c24]/40 hover:shadow-sm"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-[#ed1c24] mb-4 group-hover:scale-110 transition-transform ring-1 ring-red-100">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        {i === 0 && <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />}
                        {i === 1 && <path d="M21 12.79A9 9 0 1 1 14.21 3 3 3 0 0 0 17 9h2a2 2 0 0 1 2 2v4.21" />}
                        {i === 2 && <path d="M12 19l7-7 3 3-7 7-3-3z" />}
                        {i === 3 && <path d="M4 7V4h16v3M9 20h6M12 4v16" />}
                      </svg>
                    </div>
                    <h4 className="font-semibold text-zinc-900 group-hover:text-[#ed1c24] transition-colors">
                      {benefit.label}
                    </h4>
                    <p className="mt-1.5 text-sm text-zinc-500">{benefit.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <p className="text-sm font-medium text-zinc-500 mb-3">We install the complete system in 30 days.</p>
                <a
                  href="/book"
                  className="inline-flex items-center gap-2 rounded-full bg-[#ed1c24] px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_-10px_rgba(237,28,36,0.5)] transition-all hover:bg-[#c91018] hover:shadow-[0_16px_40px_-12px_rgba(237,28,36,0.6)]"
                >
                  See If You Qualify
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}