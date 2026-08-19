"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import Link from "next/link";

interface CaseStudy {
  id: string;
  badge: string;
  badgeBg: string;
  title: string;
  desc: string;
  stat: string;
  statLabel: string;
  initialTilt: number;
  previewBg: string;
  previewContent: {
    client: string;
    metric1: string;
    metric1Val: string;
    metric2: string;
    metric2Val: string;
  };
}

// 3D Scroll-Linked Card Straightening / Un-Tilting Subcomponent (Lunvoro reference format)
function StraighteningCard({ item }: { item: CaseStudy }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.95", "start 0.35"],
  });

  const rotateZ = useTransform(scrollYProgress, [0, 1], [item.initialTilt, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <div ref={cardRef} className="perspective-1000 py-4">
      <motion.div
        style={{
          rotateZ,
          rotateX,
          scale,
          y,
          opacity,
          transformStyle: "preserve-3d",
        }}
        className="rounded-3xl border-2 border-stone-950 bg-white p-6 sm:p-8 shadow-2xl transition-all duration-200"
      >
        <div className="flex flex-col justify-between gap-6">
          {/* Top Badge & Header */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className={`text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full border ${item.badgeBg}`}>
                {item.badge}
              </span>
              <div className="flex text-amber-500 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-stone-950 tracking-tight leading-tight mb-2">
              {item.title}
            </h3>

            <p className="text-stone-600 font-medium text-xs sm:text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>

          {/* Right Side Visual Preview Card (Lunvoro ID card reference layout) */}
          <div className={`w-full rounded-2xl p-5 shadow-xl border border-stone-800 flex flex-col justify-between min-h-[220px] ${item.previewBg}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-300">
                {item.previewContent.client}
              </span>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="my-4 grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <p className="text-[10px] text-stone-300 font-medium uppercase">
                  {item.previewContent.metric1}
                </p>
                <p className="text-lg font-black text-white mt-0.5">
                  {item.previewContent.metric1Val}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <p className="text-[10px] text-stone-300 font-medium uppercase">
                  {item.previewContent.metric2}
                </p>
                <p className="text-lg font-black text-amber-300 mt-0.5">
                  {item.previewContent.metric2Val}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-stone-300 font-mono">
              <span>✓ Verified Ad Spend Telemetry</span>
              <span>Written Guarantee</span>
            </div>
          </div>

          {/* Stat Highlight & Link */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
            <div>
              <span className="text-2xl sm:text-3xl font-black text-purple-900 font-mono">
                {item.stat}
              </span>
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mt-0.5">
                {item.statLabel}
              </p>
            </div>

            <Link
              href="/book"
              className="w-10 h-10 rounded-full bg-stone-950 hover:bg-purple-900 text-white flex items-center justify-center transition-colors shadow-md group"
            >
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function SelectedWorkShowcase() {
  const cases: CaseStudy[] = [
    {
      id: "01",
      badge: "Agency & High-Ticket",
      badgeBg: "bg-purple-100 text-purple-900 border-purple-300",
      title: "Omnichannel Client Acquisition Ecosystem",
      desc: "Scaled a B2B marketing agency from $40k/mo to $142k/mo in 90 days with qualified leads and automated CRM qualification.",
      stat: "$142,000 / mo",
      statLabel: "Verified Monthly Revenue",
      initialTilt: -16,
      previewBg: "bg-gradient-to-br from-stone-900 via-purple-950 to-stone-950 text-white",
      previewContent: {
        client: "B2B Agency Client",
        metric1: "Monthly Revenue",
        metric1Val: "$142,000",
        metric2: "Campaign ROAS",
        metric2Val: "4.9x",
      },
    },
    {
      id: "02",
      badge: "Coaching & Mastermind",
      badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
      title: "High-Ticket VSL & Qualified Booking Engine",
      desc: "Transformed lead-to-booking conversion rates while scaling monthly revenue from $30k to $89.5k backed by written growth milestones.",
      stat: "$89,500 / mo",
      statLabel: "Tracked Revenue Stream",
      initialTilt: 16,
      previewBg: "bg-gradient-to-br from-amber-600 via-rose-600 to-stone-950 text-white",
      previewContent: {
        client: "Business Coach",
        metric1: "Monthly Revenue",
        metric1Val: "$89,500",
        metric2: "Qualified Demos",
        metric2Val: "180+/mo",
      },
    },
    {
      id: "03",
      badge: "Commercial Services",
      badgeBg: "bg-teal-100 text-teal-900 border-teal-300",
      title: "High-Value Lead Qualification & Meta Ad Scaling",
      desc: "Generated over $260k/month for a commercial contractor using multi-validated lead filtering before calendar bookings.",
      stat: "$260,000 / mo",
      statLabel: "Verified Contract Pipeline",
      initialTilt: -16,
      previewBg: "bg-gradient-to-br from-teal-900 via-stone-900 to-purple-950 text-white",
      previewContent: {
        client: "Roofing Contractor",
        metric1: "Contract Revenue",
        metric1Val: "$260,000",
        metric2: "Ad ROAS",
        metric2Val: "6.1x",
      },
    },
  ];

  return (
    <section id="work" className="py-28 px-4 md:px-8 bg-[#FDFBF7] text-stone-900 border-b border-stone-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: STICKY Header & Graphic (Lunvoro Reference exact layout) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:h-fit">
            <span className="text-xs font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-3.5 py-1.5 rounded-full inline-block mb-4">
              Portfolio & Work
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-stone-950 tracking-tight leading-[0.98] uppercase font-hero">
              Selected projects <br />
              we&apos;re proud of <span className="text-purple-700">✦</span>
            </h2>
            <p className="mt-4 text-stone-600 font-medium text-base leading-relaxed max-w-md">
              Explore our latest performance scaling collaborations and high-converting ad creative experiments.
            </p>

            <div className="mt-8 flex flex-col items-start gap-8">
              <Link
                href="/work"
                className="px-8 py-4 rounded-full border-2 border-stone-950 bg-stone-950 hover:bg-purple-900 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2"
              >
                <span>See More Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              {/* Lunvoro Yellow 8-Point Star Graphic */}
              <div className="w-28 h-28 relative opacity-90 animate-spin-slow pointer-events-none hidden sm:block">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-amber-400 stroke-stone-950 stroke-[3]">
                  <path d="M50 0 L58 35 L93 15 L70 45 L100 65 L65 70 L75 100 L50 75 L25 100 L35 70 L0 65 L30 45 L7 15 L42 35 Z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Un-tilting Cards Stack as you scroll down */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {cases.map((item) => (
              <StraighteningCard key={item.id} item={item} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
