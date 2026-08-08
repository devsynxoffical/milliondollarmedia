"use client";

import { motion, type Variants } from "framer-motion";
import {
  Crosshair,
  MessageSquare,
  Target,
  Palette,
  FileText,
  Funnel,
  Database,
  Cpu,
  Mail,
  MessageCircle,
  Bell,
  Filter,
  CalendarCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { SectionBadge } from "./axion/SectionBadge";

const BENEFITS_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260421_072701_f6a01abb-eb30-4559-9d6e-774362defbc3.mp4";

const ease = [0.22, 1, 0.36, 1] as const;

type IncludedItem = { icon: LucideIcon; label: string };

const includedList: IncludedItem[] = [
  { icon: Crosshair, label: "Roofing Offer Positioning" },
  { icon: MessageSquare, label: "Roofing Messaging Strategy" },
  { icon: Target, label: "Meta Ads" },
  { icon: Palette, label: "Roofing Ad Creatives" },
  { icon: FileText, label: "Landing Pages" },
  { icon: Funnel, label: "Complete Roofing Sales Funnel" },
  { icon: Database, label: "CRM Setup" },
  { icon: Cpu, label: "AI Automations" },
  { icon: Mail, label: "Email Sequences" },
  { icon: MessageCircle, label: "SMS Follow-Up" },
  { icon: Bell, label: "Appointment Reminders" },
  { icon: Filter, label: "Roofing Lead Qualification System" },
  { icon: CalendarCheck, label: "Calendar Booking System" },
  { icon: TrendingUp, label: "Ongoing Campaign Optimisation" },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease },
  },
};

function CardShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={item} className="h-full">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`group relative h-full overflow-hidden rounded-2xl bg-neutral-950 transition-shadow duration-500 hover:shadow-[0_30px_70px_-24px_rgba(237,28,36,0.45)] ${className}`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function BenefitsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-black px-4 py-12 sm:px-6 sm:py-20 md:px-10">
      {/* Ambient red aurora */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="aurora-blob aurora-blob-a -left-24 top-8 h-[360px] w-[360px] bg-[var(--accent)]/15" />
        <div className="aurora-blob aurora-blob-b right-[-8%] bottom-[-10%] h-[340px] w-[340px] bg-[#ff5c5c]/10" />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px]">
        <div className="relative mb-12 text-center sm:mb-24">
          <div className="flex justify-center">
            <SectionBadge num="04" label="The Roofing Advantage" dark />
          </div>
          <h2 className="mt-8 text-[clamp(1.75rem,4vw,3.4rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white">
            The Roofing Advantage
          </h2>
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.9, ease }}
            className="mx-auto mt-5 block h-px w-40 origin-center bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
          />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3"
        >
          {/* Card 1 — Text (Everything You Need) */}
          <CardShell>
            <div className="absolute -left-[420px] top-1/2 h-[460px] w-[460px] -translate-y-1/2 rounded-full bg-[#b91c1c] opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-70" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-[var(--accent)]/20 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="relative z-10 flex h-full min-h-[380px] flex-col p-6 sm:min-h-[460px] sm:p-8">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.15] tracking-[-0.02em] text-white"
              >
                Everything
                <br />
                <span className="text-[#ed1c24]">You Need.</span>
              </motion.h3>
              <p className="mt-6 max-w-[300px] text-[13px] font-light leading-relaxed text-white/70 transition-colors duration-500 group-hover:text-white/85 sm:mt-8 sm:text-[14px]">
                The complete roofing client acquisition system, installed,
                managed, and optimized for you.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-2">
                {includedList.slice(0, 7).map((data) => (
                  <div
                    key={data.label}
                    className="group/feature flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 transition-colors duration-300 hover:border-[var(--accent)]/50 hover:bg-white/[0.07]"
                  >
                    <data.icon
                      className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]"
                      strokeWidth={2}
                    />
                    <span className="text-[10px] font-bold leading-tight text-white sm:text-[11px]">
                      {data.label}
                    </span>
                  </div>
                ))}
              </div>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[var(--accent)] via-[#ff8a3d] to-transparent transition-transform duration-700 group-hover:scale-x-100"
              />
            </div>
          </CardShell>

          {/* Card 2 — Video (center) */}
          <CardShell>
            <div className="relative flex h-full min-h-[380px] flex-col sm:min-h-[460px]">
              <div className="relative w-full overflow-hidden" style={{ height: "75%" }}>
                <motion.video
                  className="block h-full w-full object-cover"
                  src={BENEFITS_VIDEO_URL}
                  autoPlay
                  loop
                  muted
                  playsInline
                  initial={{ scale: 1.06 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease }}
                  whileHover={{ scale: 1.08 }}
                />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-neutral-950" />
                <div className="pointer-events-none absolute inset-0 bg-[var(--accent)]/0 transition-colors duration-700 group-hover:bg-[var(--accent)]/5" />
              </div>
              <div className="flex flex-1 items-center justify-start p-6 sm:p-8">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="text-left text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.15] tracking-[-0.02em] text-white"
                >
                  Installed. Managed.
                  <br />
                  <span className="text-[#ed1c24]">Optimized For You.</span>
                </motion.h3>
              </div>
            </div>
          </CardShell>

          {/* Card 3 — Text (Nothing Extra To Pay For) */}
          <CardShell>
            <div className="absolute -right-28 -top-28 h-56 w-56 rounded-full bg-[#b91c1c] opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-70" />
            <div className="relative z-10 flex h-full min-h-[380px] flex-col p-6 sm:min-h-[460px] sm:p-8">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.15] tracking-[-0.02em] text-white"
              >
                Nothing Extra
                <br />
                <span className="text-[#ed1c24]">To Pay For.</span>
              </motion.h3>
              <div className="mt-8 grid grid-cols-2 gap-2">
                {includedList.slice(7).map((data) => (
                  <div
                    key={data.label}
                    className="group/feature flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 transition-colors duration-300 hover:border-[var(--accent)]/50 hover:bg-white/[0.07]"
                  >
                    <data.icon
                      className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]"
                      strokeWidth={2}
                    />
                    <span className="text-[10px] font-bold leading-tight text-white sm:text-[11px]">
                      {data.label}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-auto max-w-[300px] pt-8 text-[13px] font-light leading-relaxed text-white/70 transition-colors duration-500 group-hover:text-white/85 sm:text-[14px]">
                The complete roofing client acquisition system, installed,
                managed, and optimized for you.
              </p>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent transition-transform duration-700 group-hover:scale-x-100"
              />
            </div>
          </CardShell>
        </motion.div>
      </div>
    </section>
  );
}
