"use client";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SectionBackground } from "./ui/SectionBackground";
import { TrendingUp, Link2, PenTool, BarChart3, X } from "lucide-react";

const gaps = [
  {
    id: "ads",
    label: "Ads Without Funnels",
    icon: TrendingUp,
    problem: "Agencies run traffic and call it marketing. But raw clicks don't book appointments — only a pre-sold journey does.",
    metric: "94% of clicks never convert",
    visual: "Clicks → Dead End",
  },
  {
    id: "funnels",
    label: "Funnels Nobody Owns",
    icon: Link2,
    problem: "One vendor builds the page, another runs ads, a third writes emails. The handoffs break. Leads go cold between the cracks.",
    metric: "Broken handoffs kill 70% of pipeline",
    visual: "Page → Ads → Email → ❌",
  },
  {
    id: "copy",
    label: "Copy Without Follow-Up",
    icon: PenTool,
    problem: "Great copy gets attention. But without automated nurture, qualification, and booking — it's just noise. The deal dies in the inbox.",
    metric: "80% of sales need 5+ follow-ups",
    visual: "Attention → Silence",
  },
  {
    id: "data",
    label: "Data In Silos",
    icon: BarChart3,
    problem: "Ads data sits in Meta. CRM data sits in HubSpot. Funnel data sits in ClickFunnels. Nobody sees the full picture — so nobody optimizes the whole system.",
    metric: "Blind optimization = wasted spend",
    visual: "Meta ∥ CRM ∥ Funnel",
  },
];

export function Problem() {
  return (
    <section
      id="problem"
      className="relative overflow-hidden border-b border-zinc-200 bg-white py-20 text-zinc-950 md:py-28"
    >
      <SectionBackground variant="light" grid />

      {/* Ambient red glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 -z-0 h-72 w-[52rem] max-w-full -translate-x-1/2 rounded-full opacity-[0.07] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #2bf0ff 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          light
          eyebrow="WHY GROWTH STALLS"
          title={
            <>
              Most Businesses Don&apos;t Have A Lead Problem...{" "}
              <span className="text-[#2bf0ff]">
                They Have A System Problem
              </span>
            </>
          }
          description="Understanding the four critical gaps that drain marketing ROI and cause customer pipeline leaks."
        />

        {/* The 4 Gaps - Interactive Cards */}
        <div className="relative mt-16">
          {/* Broken pipeline connector line (desktop only) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[10%] top-9 hidden lg:block"
          >
            <div className="relative h-px w-full bg-zinc-200">
              <span className="absolute inset-0 origin-left bg-gradient-to-r from-transparent via-[#2bf0ff]/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              {/* Break marker */}
              <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-red-200 bg-white shadow-[0_0_20px_rgba(237,28,36,0.25)]">
                <X className="h-4 w-4 text-[#2bf0ff]" strokeWidth={3} />
              </span>
              {/* Endpoint dots */}
              <span className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#2bf0ff]" />
              <span className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-zinc-300" />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {gaps.map((gap, i) => {
              const Icon = gap.icon;
              return (
                <Reveal key={gap.id} delay={i * 100} className="h-full">
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all duration-500 hover:-translate-y-2 hover:border-[#2bf0ff]/50 hover:shadow-[0_24px_60px_-20px_rgba(237,28,36,0.28)] md:p-7">
                    {/* Top accent line */}
                    <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#2bf0ff]/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Watermark number */}
                    <span className="pointer-events-none absolute -top-2 right-2 font-extrabold leading-none tracking-tighter text-zinc-100 transition-colors duration-500 group-hover:text-cyan-950 select-none">
                      <span className="display text-[5rem]">0{i + 1}</span>
                    </span>

                    <div className="relative flex items-center gap-3">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-900 bg-cyan-950 text-[#2bf0ff] transition-all duration-500 group-hover:scale-110 group-hover:border-[#2bf0ff]/30 group-hover:bg-[#2bf0ff] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(237,28,36,0.45)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2bf0ff]">
                        Gap {i + 1}
                      </span>
                    </div>

                    <h3 className="relative mt-5 text-lg font-extrabold leading-snug tracking-tight text-zinc-900">
                      {gap.label}
                    </h3>

                    <p className="relative mt-3 text-xs leading-relaxed text-zinc-600 flex-1">
                      {gap.problem}
                    </p>

                    {/* Visual flow */}
                    <div className="relative mt-5 border-t border-zinc-100 pt-4">
                      <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 transition-colors group-hover:text-[#2bf0ff]">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2bf0ff]" />
                        <span className="truncate">{gap.visual}</span>
                      </div>
                      <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-cyan-900 bg-cyan-950/70 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#2bf0ff] transition-all duration-300 group-hover:border-[#2bf0ff]/30 group-hover:bg-cyan-950">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2bf0ff]" />
                        {gap.metric}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
