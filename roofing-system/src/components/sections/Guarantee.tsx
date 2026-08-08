"use client";

import { useEffect, useRef } from "react";
import { BadgeCheck, ShieldCheck, Scale, PenLine } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Button } from "@/components/ui/Button";
import { gsap, prefersReducedMotion, EASE } from "@/lib/motion";
import { site } from "@/lib/site";

const PARTICLES = [
  { top: "18%", left: "8%", size: 5, delay: "0s", color: "#ed1c24" },
  { top: "30%", left: "88%", size: 4, delay: "1.2s", color: "#ff7a90" },
  { top: "70%", left: "6%", size: 6, delay: "0.6s", color: "#ff2a1f" },
  { top: "80%", left: "90%", size: 4, delay: "1.8s", color: "#ed1c24" },
  { top: "55%", left: "94%", size: 3, delay: "0.3s", color: "#ffffff" },
  { top: "12%", left: "70%", size: 4, delay: "2.2s", color: "#ffb36b" },
  { top: "85%", left: "40%", size: 5, delay: "1.5s", color: "#ff7a90" },
];

function ContractDoc() {
  const docRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = docRef.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 78%", once: true },
        defaults: { ease: EASE.outExpo },
      });

      tl.fromTo(
        el,
        { y: 60, rotate: 3, opacity: 0 },
        { y: 0, rotate: 0, opacity: 1, duration: 1.2 }
      );

      tl.fromTo(
        el.querySelectorAll(".doc-line"),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, transformOrigin: "left", stagger: 0.09 },
        "-=0.7"
      );

      tl.fromTo(
        el.querySelector(".doc-sign"),
        { scale: 0, rotate: -12 },
        { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(2.5)" },
        "-=0.3"
      );

      tl.fromTo(
        el.querySelector(".doc-stamp"),
        { scale: 2.4, opacity: 0, rotate: -30 },
        { scale: 1, opacity: 1, rotate: -18, duration: 0.55, ease: "back.out(3)" },
        "-=0.2"
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={docRef}
      className="relative mx-auto w-full max-w-sm rounded-2xl border border-line bg-[#f5f3ee] p-7 text-[#14171b] shadow-soft"
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-lg font-semibold">
          <Scale className="h-5 w-5" /> Roofing Systems™
        </span>
        <span className="rounded-full bg-[#14171b] px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-[#f5f3ee]">
          Agreement
        </span>
      </div>

      <div className="mt-5 space-y-2.5">
        <p className="doc-line h-2 w-3/4 origin-left rounded bg-[#14171b]/15" />
        <p className="doc-line h-2 w-full origin-left rounded bg-[#14171b]/15" />
        <p className="doc-line h-2 w-5/6 origin-left rounded bg-[#14171b]/15" />
        <p className="doc-line h-2 w-2/3 origin-left rounded bg-[#14171b]/15" />
        <p className="doc-line h-2 w-11/12 origin-left rounded bg-[#14171b]/15" />
        <p className="doc-line h-2 w-1/2 origin-left rounded bg-[#14171b]/15" />
      </div>

      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#14171b]/50">
            Signed & sealed
          </p>
          <svg viewBox="0 0 120 50" className="doc-sign mt-1 h-12 w-32" fill="none" aria-hidden="true">
            <path
              d="M4 42 C 22 8, 34 30, 44 16 C 52 5, 60 40, 74 22 C 84 9, 92 34, 104 14 C 110 4, 114 8, 116 6"
              stroke="#14171b"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div
          className="doc-stamp flex h-20 w-20 rotate-[-18deg] items-center justify-center rounded-full border-4 border-double border-[#ed1c24] bg-[#ed1c24]/10"
          style={{ boxShadow: "inset 0 0 0 4px rgba(237,28,36,0.15)" }}
        >
          <span className="text-center font-mono text-[10px] font-bold uppercase leading-tight tracking-wider text-[#14171b]">
            90-Day
            <br />
            Guarantee
          </span>
        </div>
      </div>
    </div>
  );
}

export function Guarantee() {
  return (
    <Section id="guarantee" className="relative overflow-hidden">
      {/* Spotlight background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[42rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(237,28,36,0.14),transparent)] blur-2xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/40 to-transparent" />
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute animate-float rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: 0.5,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="eyebrow-xl">Risk reversed</span>
            </Reveal>
            <SplitReveal
              as="h2"
              className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-fog sm:text-5xl lg:text-6xl"
            >
              We take the risk...{" "}
              <em className="font-semibold not-italic text-lime">not you.</em>
            </SplitReveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-mist">
                If we don&apos;t help you achieve the mutually agreed growth milestones within the
                first 90 days after implementing your roofing Client Acquisition System, we&apos;ll
                continue working for you at <span className="font-semibold text-fog">no management fee</span>{" "}
                until we do. Everything is backed by a written agreement.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <ul className="mt-8 space-y-3.5">
                {[
                  "Written into every engagement",
                  "Covers mutually agreed growth milestones",
                  "No management fee until we deliver",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-mist">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-lime" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-9">
                <Button
                  href={site.bookCallUrl}
                  size="xl"
                  icon="up-right"
                  ariaLabel="Claim your guaranteed strategy call"
                >
                  Claim a Strategy Call
                </Button>
                <p className="mt-4 flex items-center gap-2 text-xs text-dim">
                  <ShieldCheck className="h-4 w-4 text-lime" />
                  Spots are extremely limited each month.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(255,42,31,0.12),transparent)] blur-2xl" />
            <ContractDoc />

            <div className="animate-float-slow absolute -right-3 -top-6 flex h-16 w-16 rotate-12 items-center justify-center rounded-2xl border border-lime/40 bg-lime/10 backdrop-blur lg:-right-8">
              <PenLine className="h-7 w-7 text-lime" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
