"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, TrendingUp, Sparkles, Award } from "lucide-react";
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

// 3D Scroll-Linked Card Straightening / Un-Tilting Subcomponent (Screenshots 2 & 3 match)
function StraighteningCard({ item }: { item: CaseStudy }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track scroll position of this individual card as it enters screen
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.92", "start 0.3"],
  });

  // Smooth scroll transformations: initial tilt -> un-tilts straight (0deg) on scroll
  const rotateZ = useTransform(scrollYProgress, [0, 1], [item.initialTilt, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.35, 1]);

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
        className="rounded-3xl border-2 border-stone-950 bg-white p-6 sm:p-10 shadow-2xl transition-all duration-200"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Side Info */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full border ${item.badgeBg}`}>
                  {item.badge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-stone-950 tracking-tight leading-tight">
                {item.title}
              </h3>

              <p className="mt-4 text-stone-600 font-medium text-sm sm:text-base leading-relaxed">
                {item.desc}
              </p>
            </div>

            {/* Stat Highlights */}
            <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-2xl sm:text-4xl font-black text-purple-900">
                  {item.stat}
                </span>
                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mt-0.5">
                  {item.statLabel}
                </p>
              </div>

              <Link
                href="/work"
                className="w-12 h-12 rounded-full bg-stone-950 hover:bg-purple-900 text-white flex items-center justify-center transition-colors shadow-md group"
              >
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Right Side Visual Preview Card (Lunvoro ID card reference layout) */}
          <div className="lg:col-span-6">
            <div className={`w-full rounded-2xl p-6 sm:p-8 shadow-xl border border-stone-800 flex flex-col justify-between min-h-[280px] ${item.previewBg}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-purple-300">
                  {item.previewContent.client}
                </span>
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="my-6 grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <p className="text-[11px] text-stone-300 font-medium uppercase">
                    {item.previewContent.metric1}
                  </p>
                  <p className="text-xl sm:text-2xl font-black text-white mt-1">
                    {item.previewContent.metric1Val}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                  <p className="text-[11px] text-stone-300 font-medium uppercase">
                    {item.previewContent.metric2}
                  </p>
                  <p className="text-xl sm:text-2xl font-black text-amber-300 mt-1">
                    {item.previewContent.metric2Val}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-stone-300 font-mono">
                <span>✓ Verified Ad Manager Audit</span>
                <span>2026 Strategy</span>
              </div>
            </div>
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
      badge: "E-Commerce Scale",
      badgeBg: "bg-purple-100 text-purple-900 border-purple-300",
      title: "Omnichannel Media Buying & Ad Creative Overhaul",
      desc: "Scaled an DTC apparel brand from $40k/mo to $380k/mo in 90 days with hyper-targeted UGC ads and optimized sales funnels.",
      stat: "4.82x",
      statLabel: "Average Campaign ROAS",
      initialTilt: -14,
      previewBg: "bg-gradient-to-br from-stone-900 via-purple-950 to-stone-950 text-white",
      previewContent: {
        client: "Luxe Thread Co.",
        metric1: "Monthly Revenue",
        metric1Val: "$384,200",
        metric2: "Ad Spend ROAS",
        metric2Val: "4.82x",
      },
    },
    {
      id: "02",
      badge: "SaaS & Lead Gen",
      badgeBg: "bg-amber-100 text-amber-900 border-amber-300",
      title: "High-Ticket VSL Funnel & Meta Ad Blitz",
      desc: "Transformed customer acquisition costs from $120 to $34 while boosting qualified lead appointments by 410%.",
      stat: "$1.4M",
      statLabel: "Tracked Pipeline Revenue",
      initialTilt: 14,
      previewBg: "bg-gradient-to-br from-amber-500 via-rose-600 to-stone-900 text-white",
      previewContent: {
        client: "LeadPilot Pro",
        metric1: "CPA Reduction",
        metric1Val: "-71.6%",
        metric2: "Booked Demos",
        metric2Val: "1,420+",
      },
    },
    {
      id: "03",
      badge: "Brand Elevation",
      badgeBg: "bg-teal-100 text-teal-900 border-teal-300",
      title: "Creative UGC & TikTok Viral Video Campaign",
      desc: "Produced 45 custom short-form video hooks that generated 12M+ organic & paid views with a 6.2% conversion rate.",
      stat: "12M+",
      statLabel: "Total Video Views",
      initialTilt: -14,
      previewBg: "bg-gradient-to-br from-teal-900 via-stone-900 to-purple-950 text-white",
      previewContent: {
        client: "Aura Skincare",
        metric1: "Conversion Rate",
        metric1Val: "6.2%",
        metric2: "Customer LTV",
        metric2Val: "$240",
      },
    },
  ];

  return (
    <section id="work" className="py-24 px-4 md:px-8 bg-[#FDFBF7] text-stone-900 border-b border-stone-200">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-3.5 py-1.5 rounded-full">
              Proven Case Studies
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-950 tracking-tight mt-4">
              Selected projects <br />
              <span className="relative inline-block text-purple-900">
                we're proud of
                <span className="absolute -top-2 -right-4 text-rose-500 text-2xl">✦</span>
              </span>
            </h2>
            <p className="mt-3 text-stone-600 font-medium text-base max-w-lg">
              Explore our latest performance scaling collaborations and high-converting ad creative experiments.
            </p>
          </div>

          <Link
            href="/work"
            className="px-6 py-3 rounded-full border-2 border-stone-950 bg-white hover:bg-stone-950 hover:text-white font-black text-xs uppercase tracking-wider transition-all shadow flex items-center gap-2"
          >
            <span>See More Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3D Scroll-Straightening Cards Stack (Lunvoro un-tilting scroll effect) */}
        <div className="flex flex-col gap-12">
          {cases.map((item) => (
            <StraighteningCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
