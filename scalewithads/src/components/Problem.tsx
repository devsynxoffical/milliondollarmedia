"use client";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SectionBackground } from "./ui/SectionBackground";
import { TrendingUp, Link2, PenTool, BarChart3 } from "lucide-react";

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

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          light
          eyebrow="WHY GROWTH STALLS"
          title={
            <>
              Most Businesses Don&apos;t Have A Lead Problem...{" "}
              <span className="text-[#ed1c24]">
                They Have A System Problem
              </span>
            </>
          }
          description="Understanding the four critical gaps that drain marketing ROI and cause customer pipeline leaks."
        />

        {/* The 4 Gaps - Interactive Cards */}
        <div className="mt-14 relative">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {gaps.map((gap, i) => {
              const Icon = gap.icon;
              return (
                <Reveal key={gap.id} delay={i * 100} className="h-full">
                  <div className="group relative flex h-full flex-col rounded-3xl border border-zinc-200 bg-zinc-50 p-6 md:p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#ed1c24] hover:bg-white hover:shadow-[0_20px_50px_-20px_rgba(237,28,36,0.15)]">
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#ed1c24] border border-red-100 transition-transform group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="mt-2.5 text-[10px] font-extrabold uppercase tracking-widest text-[#ed1c24]">
                        Gap {i + 1}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-extrabold leading-snug tracking-tight text-zinc-900">
                      {gap.label}
                    </h3>

                    <p className="mt-3 text-xs leading-relaxed text-zinc-600 flex-1">
                      {gap.problem}
                    </p>

                    {/* Visual flow */}
                    <div className="mt-4 pt-4 border-t border-zinc-200/80">
                      <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 group-hover:text-[#ed1c24] transition-colors">
                        <span>{gap.visual}</span>
                      </div>
                      <div className="mt-2 text-[11px] font-extrabold uppercase tracking-wider text-[#ed1c24]">
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