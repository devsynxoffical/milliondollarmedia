"use client";

import { X } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { whyNotScale } from "@/lib/data";

export function WhyScale() {
  return (
    <Section id="why" className="bg-ink">
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Left: sticky editorial */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <span className="eyebrow-xl">Why growth stalls</span>
          </Reveal>
          <SplitReveal
            as="h2"
            className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-fog sm:text-5xl lg:text-6xl"
          >
            Most roofing companies don&apos;t have a lead problem... they have a{" "}
            <em className="font-semibold not-italic text-lime">
              client acquisition system problem.
            </em>
          </SplitReveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-pretty leading-relaxed text-mist">
              Most agencies only run ads. Some build funnels. Others write copy. Someone else
              handles follow-up. Nobody owns the entire customer journey. That&apos;s exactly why
              roofing businesses struggle to scale consistently.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-lime/20 bg-lime/[0.04] px-5 py-4">
              <X className="h-5 w-5 shrink-0 text-lime" />
              <p className="text-sm text-mist">
                At <span className="font-semibold text-fog">Roofing Systems Co.</span>, we build
                one complete ecosystem where every part works together — from the first click to a{" "}
                <span className="font-semibold text-lime">qualified homeowner sitting on your calendar.</span>
              </p>
            </div>
          </Reveal>
        </div>

        {/* Right: pain cards */}
        <div className="flex flex-col gap-5">
          {whyNotScale.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} y={44}>
              <article className="group relative overflow-hidden rounded-3xl border border-line bg-panel p-7 transition-all duration-500 hover:border-line-strong hover:bg-elevated sm:p-9">
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-lime/[0.07] blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div className="max-w-sm">
                    <h3 className="text-xl font-semibold tracking-tight text-fog sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-pretty leading-relaxed text-mist">{item.body}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-4xl font-bold tracking-tight text-lime sm:text-5xl">
                      {item.stat}
                    </p>
                    <p className="mt-1 max-w-[9rem] font-mono text-[10px] uppercase tracking-widest text-dim">
                      {item.statLabel}
                    </p>
                  </div>
                </div>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-lime/60 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
