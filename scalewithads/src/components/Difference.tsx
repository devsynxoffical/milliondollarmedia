"use client";

import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./ui/TiltCard";
import { CheckCircle2, Sparkles, Zap, ArrowRight } from "lucide-react";

const journey = [
  { title: "Attracting", text: "the right prospects with high-converting ads" },
  { title: "Qualifying", text: "them with multi-stage verification" },
  { title: "Nurturing", text: "them automatically via CRM & AI follow-up" },
  { title: "Booking", text: "them onto your sales team's calendar ready to close" },
];

const advantages = [
  "Complete Done-For-You Client Acquisition System",
  "Premium Lead Qualification & Multi-Validation Process",
  "CRM + AI Follow-Up Automations Included",
  "Everything We Build Becomes Your Business Asset",
  "Revenue-Focused Growth Strategy, Not Just More Leads",
  "Double Your Revenue in 90 Days — Backed in Writing",
];

export function Difference() {
  return (
    <section
      id="solution"
      className="relative overflow-hidden border-b border-zinc-800 bg-[#070709] py-20 text-white md:py-28"
    >
      <div className="jobber-grid-dark pointer-events-none absolute inset-0 opacity-50" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 0%, rgba(237,28,36,0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          eyebrow="THE SCALE WITH ADS™ ADVANTAGE"
          title={
            <>
              We Don&apos;t Just Generate Clicks...{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d52] via-[#ed1c24] to-[#ff8f93]">
                We Build An Acquisition Ecosystem
              </span>
            </>
          }
          description="Unlike traditional marketing agencies that stop at raw leads, we build and manage the entire client pipeline."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((item, i) => (
            <Reveal key={item.title} delay={i * 90} className="h-full">
              <TiltCard maxTilt={8} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-zinc-900/80 p-6 shadow-xl backdrop-blur-md transition duration-300 hover:border-[#ed1c24] hover:shadow-[0_20px_40px_-15px_rgba(237,28,36,0.35)]">
                  <span className="display text-4xl font-extrabold text-[#ed1c24]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-xl font-extrabold tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                    {item.text}
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="mx-auto mt-14 max-w-4xl rounded-3xl border border-white/15 bg-zinc-900/80 p-8 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl md:p-10">
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ed1c24]/20 border border-[#ed1c24]/40 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-[#ed1c24]">
                <Sparkles className="h-3.5 w-3.5" />
                SYSTEM ADVANTAGES
              </span>
              <h3 className="display mt-3 text-2xl font-extrabold text-white">
                Why Operators Switch To Scale With Ads™
              </h3>
            </div>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {advantages.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4 text-sm font-bold text-zinc-200 backdrop-blur-md transition-all hover:border-[#ed1c24]/40"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#ed1c24]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 text-center">
              <Link
                href={BOOKING_PATH}
                className="btn btn-accent inline-flex items-center gap-2 px-8 py-4 text-sm font-extrabold uppercase tracking-wider shadow-[0_0_30px_rgba(237,28,36,0.5)]"
              >
                <span>BOOK STRATEGY CALL</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
