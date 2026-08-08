"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, Scale, PenLine } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Button } from "@/components/ui/Button";
import { gsap, prefersReducedMotion, EASE } from "@/lib/motion";
import { site } from "@/lib/site";

const PARTICLES = [
  { top: "15%", left: "6%", size: 6, delay: "0s", color: "#ed1c24" },
  { top: "28%", left: "92%", size: 4, delay: "1.2s", color: "#ff7a90" },
  { top: "68%", left: "4%", size: 5, delay: "0.6s", color: "#ff2a1f" },
  { top: "82%", left: "88%", size: 4, delay: "1.8s", color: "#ed1c24" },
  { top: "50%", left: "95%", size: 3, delay: "0.3s", color: "#ffffff" },
  { top: "10%", left: "75%", size: 5, delay: "2.2s", color: "#ffb36b" },
  { top: "88%", left: "35%", size: 5, delay: "1.5s", color: "#ff7a90" },
];

const POINTS = [
  {
    title: "Written into every engagement",
    desc: "Binding contractual guarantee included standard in every client agreement.",
  },
  {
    title: "Covers mutually agreed growth milestones",
    desc: "Target metrics defined and agreed upon together before launch.",
  },
  {
    title: "No management fee until we deliver",
    desc: "We work completely free of management fees if milestones aren't hit in 90 days.",
  },
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
        { y: 40, rotate: 2, opacity: 0 },
        { y: 0, rotate: 0, opacity: 1, duration: 1.1 }
      );

      tl.fromTo(
        el.querySelectorAll(".doc-line"),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, transformOrigin: "left", stagger: 0.08 },
        "-=0.6"
      );

      tl.fromTo(
        el.querySelector(".doc-sign"),
        { scale: 0, rotate: -10 },
        { scale: 1, rotate: 0, duration: 0.6, ease: "back.out(2.2)" },
        "-=0.3"
      );

      tl.fromTo(
        el.querySelector(".doc-stamp"),
        { scale: 2.2, opacity: 0, rotate: -30 },
        { scale: 1, opacity: 1, rotate: -16, duration: 0.5, ease: "back.out(2.8)" },
        "-=0.2"
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={docRef}
      className="relative mx-auto w-full max-w-sm rounded-2xl border border-zinc-200 bg-[#f5f3ee] p-7 text-[#14171b] shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-base font-bold tracking-tight text-[#14171b]">
          <Scale className="h-5 w-5 text-[#ed1c24]" /> Roofing Systems™
        </span>
        <span className="rounded-full bg-[#14171b] px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-[#f5f3ee]">
          Agreement
        </span>
      </div>

      {/* Document Skeleton Lines */}
      <div className="mt-6 space-y-3">
        <div className="doc-line h-2.5 w-3/4 origin-left rounded bg-[#14171b]/15" />
        <div className="doc-line h-2.5 w-full origin-left rounded bg-[#14171b]/15" />
        <div className="doc-line h-2.5 w-5/6 origin-left rounded bg-[#14171b]/15" />
        <div className="doc-line h-2.5 w-2/3 origin-left rounded bg-[#14171b]/15" />
        <div className="doc-line h-2.5 w-11/12 origin-left rounded bg-[#14171b]/15" />
        <div className="doc-line h-2.5 w-1/2 origin-left rounded bg-[#14171b]/15" />
      </div>

      {/* Signature & Stamp Footer */}
      <div className="mt-8 flex items-end justify-between pt-2 border-t border-[#14171b]/10">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-[#14171b]/50">
            Signed & sealed
          </p>
          <svg viewBox="0 0 120 45" className="doc-sign mt-1 h-11 w-32" fill="none" aria-hidden="true">
            <path
              d="M4 38 C 22 8, 34 28, 44 14 C 52 5, 60 36, 74 20 C 84 8, 92 30, 104 12 C 110 4, 114 8, 116 6"
              stroke="#14171b"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Authentic Red Stamp */}
        <div
          className="doc-stamp flex h-20 w-20 rotate-[-16deg] items-center justify-center rounded-full border-4 border-double border-[#ed1c24] bg-[#ed1c24]/10 shadow-[0_0_15px_rgba(237,28,36,0.15)]"
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
    <Section id="guarantee" className="relative overflow-hidden bg-[#09090b] py-24 sm:py-32 border-y border-white/10">
      <div className="pointer-events-none absolute inset-0">
        <div className="jobber-grid-dark absolute inset-0 opacity-40" />
        <div className="absolute left-1/2 top-1/2 h-[45rem] w-[65rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(237,28,36,0.16),transparent_70%)] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ed1c24]/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#ed1c24]/30 to-transparent" />

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

      <div className="container-x relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full bg-[#ed1c24]/10 border border-[#ed1c24]/30 px-4 py-1.5 shadow-[0_0_20px_rgba(237,28,36,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ed1c24] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ed1c24]"></span>
                </span>
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#ed1c24]">
                  Risk reversed
                </span>
              </div>
            </Reveal>

            <SplitReveal
              as="h2"
              className="mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              We take the <br />
              risk...{" "}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#ed1c24] via-red-500 to-[#ed1c24]">
                not you.
              </span>
            </SplitReveal>

            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-pretty text-base sm:text-lg leading-relaxed text-zinc-300">
                If we don&apos;t help you achieve the mutually agreed growth milestones within the
                first 90 days after implementing your roofing Client Acquisition System, we&apos;ll
                continue working for you at{" "}
                <strong className="text-white font-semibold underline decoration-[#ed1c24] underline-offset-4">
                  no management fee
                </strong>{" "}
                until we do. Everything is backed by a written agreement.
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-8 grid gap-3.5">
                {POINTS.map((pt) => (
                  <div
                    key={pt.title}
                    className="group relative flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md transition-all duration-300 hover:border-[#ed1c24]/50 hover:bg-white/[0.06] hover:translate-x-1"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#ed1c24]/15 border border-[#ed1c24]/30 text-[#ed1c24] transition-transform duration-300 group-hover:scale-110">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base leading-snug">{pt.title}</h4>
                      <p className="mt-0.5 text-xs text-zinc-400 leading-relaxed">{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <Button
                  href={site.bookCallUrl}
                  size="xl"
                  icon="up-right"
                  ariaLabel="Claim your guaranteed strategy call"
                  className="w-full sm:w-auto px-8 py-4 shadow-[0_10px_30px_rgba(237,28,36,0.35)]"
                >
                  Claim a Strategy Call
                </Button>

                <div className="flex items-center gap-2.5 rounded-full bg-white/[0.04] border border-white/10 px-4 py-2 text-xs text-zinc-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                  </span>
                  <span>Spots are extremely limited each month.</span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <ContractDoc />

            <div className="animate-float-slow absolute -right-2 -top-6 flex h-14 w-14 rotate-12 items-center justify-center rounded-2xl border border-[#ed1c24]/40 bg-[#ed1c24]/15 backdrop-blur-md shadow-[0_0_20px_rgba(237,28,36,0.3)] hidden sm:flex lg:-right-6">
              <PenLine className="h-6 w-6 text-[#ed1c24]" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
