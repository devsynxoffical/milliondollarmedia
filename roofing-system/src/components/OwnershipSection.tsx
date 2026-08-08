"use client";

import { motion } from "framer-motion";
import { FileText, Funnel, Database, Cpu, Palette, PenLine, Repeat, Users } from "lucide-react";
import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { AuroraBg } from "./AuroraBg";
import { SectionBadge } from "./axion/SectionBadge";
import { CTAButton } from "./ui/CTAButton";

const ownedItems = [
  { icon: FileText, label: "Landing Pages" },
  { icon: Funnel, label: "Sales Funnel" },
  { icon: Database, label: "CRM" },
  { icon: Cpu, label: "Automations" },
  { icon: Palette, label: "Roofing Ad Creatives" },
  { icon: PenLine, label: "Copy" },
  { icon: Repeat, label: "Follow-Up Sequences" },
  { icon: Users, label: "Customer Data" },
];

const noLockIns = ["No lock-ins.", "No hidden ownership.", "No agency dependence."];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function OwnershipSection() {
  const ticker = [...ownedItems.map((o) => o.label), ...ownedItems.map((o) => o.label)];

  return (
    <section id="ownership" className="section-shell bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <SectionBadge num="05" label="Everything Belongs To You" />
          <h2 className="mt-8 text-[clamp(1.75rem,4vw,3.4rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900">
            You Own Everything We Build.
          </h2>
          <p className="mt-5 text-[15px] font-medium leading-[1.6] text-gray-600 sm:text-[16px]">
            Unlike most roofing marketing agencies... you own everything. When
            we build your Roofing Systems™, it becomes a permanent business
            asset.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="gradient-ring mt-12 rounded-[1.75rem]">
            <div className="ring-card relative overflow-hidden rounded-[1.75rem] bg-[#09090b] px-6 py-12 text-white md:px-12 md:py-16">
              <AuroraBg />
              <div className="jobber-grid-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

              <span
                aria-hidden
                className="float-soft pointer-events-none absolute -top-4 right-4 select-none text-[7rem] font-semibold leading-none tracking-[-0.04em] text-white/[0.04] md:right-10 md:text-[11rem]"
              >
                100%
              </span>

              <div className="relative grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
                <div>
                  <h3 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.15] tracking-[-0.02em]">
                    You own every single{" "}
                    <span className="relative inline-block text-[var(--accent)]">
                      asset we build.
                      <motion.span
                        aria-hidden
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute -bottom-1.5 left-0 h-[3px] w-full origin-left rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(237,28,36,0.6)]"
                      />
                    </span>
                  </h3>

                  <ul className="mt-6 space-y-3">
                    {noLockIns.map((t, i) => (
                      <li
                        key={t}
                        className="stagger-fade flex items-center gap-3"
                        style={{ animationDelay: `${i * 120 + 250}ms` }}
                      >
                        <span className="check-pop flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-bold text-white">
                          ✓
                        </span>
                        <span className="text-sm font-medium text-zinc-300">{t}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-8"
                  >
                    <div className="mb-2 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.16em]">
                      <span className="text-zinc-500">Ownership</span>
                      <span className="flex items-center gap-1.5 text-[var(--accent)]">
                        <span className="pulse-ring h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                        100% yours
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                        transition={{ duration: 1.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[#ff6b70] shadow-[0_0_14px_rgba(237,28,36,0.55)]"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                    className="mt-8"
                  >
                    <CTAButton
                      href={BOOKING_PATH}
                      label="Book Your Free Strategy Call"
                      size="lg"
                    />
                  </motion.div>
                </div>

                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                  className="grid grid-cols-2 gap-4"
                >
                  {ownedItems.map((owned, i) => (
                    <motion.div key={owned.label} variants={item} className="h-full">
                      <TiltCard
                        max={8}
                        className="border border-zinc-800 bg-zinc-900 group-hover:shadow-[0_20px_45px_-14px_rgba(237,28,36,0.5)]"
                      >
                        <div className="sheen-sweep flex items-center gap-3 px-4 py-4">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[11px] font-bold text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-90">
                            ✓
                          </span>
                          <span className="text-sm font-medium text-white">{owned.label}</span>
                          <owned.icon
                            aria-hidden
                            className="ml-auto h-4 w-4 shrink-0 text-zinc-600 transition-all duration-300 group-hover:scale-125 group-hover:-rotate-12 group-hover:text-[var(--accent)]"
                            strokeWidth={2}
                          />
                          <span className="pointer-events-none absolute right-2 top-1.5 text-[10px] font-medium tabular-nums text-zinc-700 transition-colors duration-300 group-hover:text-[var(--accent)]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </TiltCard>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Asset ticker */}
              <div className="relative mt-12 border-t border-zinc-800 pt-8">
                <div className="marquee-wrap">
                  <div className="marquee-track-reverse items-center gap-8">
                    {ticker.map((t, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-8 whitespace-nowrap text-[13px] font-medium text-zinc-500"
                      >
                        {t}
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
