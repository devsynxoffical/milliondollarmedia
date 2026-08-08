"use client";

import { X, Megaphone, Layers, Clock, ShieldAlert } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";

const PAIN_CARDS = [
  {
    num: "01",
    icon: Megaphone,
    title: "Ads without a funnel",
    body: "An agency runs your roofing ads and calls it marketing. But raw clicks don't book inspections — only a pre-sold journey does.",
    stat: "Clicks",
    statLabel: "Not roofers",
  },
  {
    num: "02",
    icon: Layers,
    title: "Funnels nobody owns",
    body: "Somebody builds the landing page, somebody else runs the traffic. Nobody owns the full journey — so most roofing leads go cold.",
    stat: "Broken",
    statLabel: "Handoffs between vendors",
  },
  {
    num: "03",
    icon: Clock,
    title: "Copy, but no follow-up",
    body: "Great copy can't qualify, nurture or book storm leads. Follow-up is where the deals are won — and in the fragmented way, it never happens.",
    stat: "80%",
    statLabel: "Of sales need 5+ follow-ups",
  },
  {
    num: "04",
    icon: ShieldAlert,
    title: "No one owns the journey",
    body: "The roofing customer journey is split across agencies, freelancers and tools. When no single system owns it, nothing compounds.",
    stat: "0",
    statLabel: "Systems owning it all",
  },
];

export function WhyScale() {
  return (
    <Section id="why" className="relative overflow-hidden bg-[#09090b] py-24 sm:py-32 border-b border-white/10">
      {/* Subtle background lighting */}
      <div className="pointer-events-none absolute inset-0">
        <div className="jobber-grid-dark absolute inset-0 opacity-30" />
        <div className="absolute left-1/4 top-1/3 h-[40rem] w-[55rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(237,28,36,0.1),transparent_70%)] blur-3xl" />
      </div>

      <div className="container-x relative z-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left: Sticky Editorial Header */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <Reveal>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#ed1c24]">
                Why growth stalls
              </span>
            </Reveal>

            <SplitReveal
              as="h2"
              className="mt-5 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl"
            >
              Most roofing companies don&apos;t have a lead problem... <br />
              they have a{" "}
              <span className="text-[#ed1c24]">
                client acquisition system problem.
              </span>
            </SplitReveal>

            <Reveal delay={0.15}>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-zinc-400">
                Most agencies only run ads. Some build funnels. Others write copy. Someone else
                handles follow-up. Nobody owns the entire customer journey. That&apos;s exactly why
                roofing businesses struggle to scale consistently.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ed1c24]/15 text-[#ed1c24]">
                    <X className="h-5 w-5" />
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    At <strong className="text-white font-semibold">Roofing Systems Co.</strong>, we build
                    one complete ecosystem where every part works together — from the first click to a{" "}
                    <span className="font-semibold text-white">qualified homeowner sitting on your calendar.</span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Pain Point Cards Grid */}
          <div className="lg:col-span-7 grid gap-5 sm:grid-cols-2">
            {PAIN_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.title} delay={i * 0.08} y={24}>
                  <div className="group relative flex flex-col justify-between h-full rounded-2xl border border-white/10 bg-[#121215] p-6 transition-all duration-300 hover:border-[#ed1c24]/50 hover:bg-[#16161b]">
                    <div>
                      {/* Icon & Step Number */}
                      <div className="flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ed1c24]/10 text-[#ed1c24]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-mono text-xs font-bold text-zinc-600 group-hover:text-zinc-400 transition-colors">
                          {card.num}
                        </span>
                      </div>

                      {/* Title & Body */}
                      <h3 className="mt-5 text-xl font-bold text-white group-hover:text-[#ed1c24] transition-colors">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        {card.body}
                      </p>
                    </div>

                    {/* Stat Footer */}
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <p className="font-mono text-2xl font-bold text-[#ed1c24]">
                          {card.stat}
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                          {card.statLabel}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
