"use client";

import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./ui/TiltCard";
import { ArrowRight } from "lucide-react";

const journey = [
  { title: "Attracting", text: "the right prospects with high-converting ads" },
  { title: "Qualifying", text: "them with multi-stage verification" },
  { title: "Nurturing", text: "them automatically via CRM & AI follow-up" },
  { title: "Booking", text: "them onto your sales team's calendar ready to close" },
];

export function Difference() {
  return (
    <section
      id="solution"
      className="relative overflow-hidden border-b border-zinc-200 bg-white py-20 text-zinc-950 md:py-28"
    >
      <div className="jobber-grid-light pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          light
          eyebrow="THE SCALE WITH ADS™ ADVANTAGE"
          title={
            <>
              We Don&apos;t Just Generate Clicks...{" "}
              <span className="text-[#ed1c24]">
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
                <div className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm backdrop-blur-md transition duration-300 hover:border-[#ed1c24] hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(237,28,36,0.15)]">
                  <span className="display text-4xl font-extrabold text-[#ed1c24]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-xl font-extrabold tracking-tight text-zinc-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-600">
                    {item.text}
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150} className="mt-14 text-center">
          <Link
            href={BOOKING_PATH}
            className="btn btn-accent inline-flex items-center gap-2 px-8 py-4 text-xs font-extrabold uppercase tracking-wider shadow-[0_10px_30px_-10px_rgba(237,28,36,0.5)]"
          >
            <span>BOOK FREE STRATEGY CALL</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
