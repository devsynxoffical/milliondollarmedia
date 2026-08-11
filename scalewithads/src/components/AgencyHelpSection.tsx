"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Sparkles, Video, Target, TrendingUp, Users } from "lucide-react";

interface HelpItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  tags: string[];
  image: string;
  metrics: string;
  highlights: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const helpItems: HelpItem[] = [
  {
    id: "social",
    number: "(01)",
    title: "SOCIAL ADS & PERFORMANCE MEDIA",
    shortDesc: "High-ticket Meta & Google paid media campaigns engineered for immediate predictable revenue.",
    tags: ["META ADS", "ALGORITHM SCALE", "RETARGETING"],
    image: "/media/covers/cover-leadpilot.jpg",
    metrics: "4.8x Average ROAS",
    highlights: ["Data-driven audience segmentation", "Dynamic creative testing grid", "Real-time ROAS tracking dashboards"],
    icon: Target,
  },
  {
    id: "creative",
    number: "(02)",
    title: "CREATIVE STRATEGY & DISRUPTIVE UGC",
    shortDesc: "Scroll-stopping direct-response video ads and hooks designed to turn cold viewers into high-paying clients.",
    tags: ["CREATIVE STUDIO", "HOOK TESTING", "HIGH CONVERTING"],
    image: "/media/covers/cover-mastermind.jpeg",
    metrics: "140+ Monthly Ad Variants",
    highlights: ["In-house scriptwriters & editors", "Psychological trigger framework", "Rapid weekly iteration cycle"],
    icon: Video,
  },
  {
    id: "paid",
    number: "(03)",
    title: "PAID FUNNEL & CRO OPTIMIZATION",
    shortDesc: "End-to-end sales funnel architecture built to double lead-to-call conversion rates.",
    tags: ["CRO ENGINE", "LANDING PAGES", "AUTOMATED CRM"],
    image: "/media/covers/hero-bg.jpg",
    metrics: "+310% Conversion Lift",
    highlights: ["Frictionless booking funnels", "Automated SMS/Email follow-up sequences", "Custom VSL player integrations"],
    icon: TrendingUp,
  },
  {
    id: "tiktok",
    number: "(04)",
    title: "TIKTOK SHOP & SHORT FORM REELS",
    shortDesc: "Short-form video domination across TikTok, YouTube Shorts, and Instagram Reels.",
    tags: ["VIRAL REELS", "TIKTOK ALGO", "ORGANIC + PAID"],
    image: "/media/covers/masterclass-poster-2.png",
    metrics: "15M+ Total Views",
    highlights: ["Trending audio & hook leverage", "Native app layout aesthetic", "Viral-to-Funnel routing"],
    icon: Sparkles,
  },
  {
    id: "influencer",
    number: "(05)",
    title: "INFLUENCER & CREATOR ACQUISITION",
    shortDesc: "Vetted creator network producing authentic user testimonials and authority-building content.",
    tags: ["CREATOR NETWORK", "UGC ENGINE", "AUTHORITY BRANDING"],
    image: "/media/clients/client-aref.jpg",
    metrics: "500+ Vetted Creators",
    highlights: ["Full usage rights licensing", "Niche-specific influencer matches", "Performance-based payout structure"],
    icon: Users,
  },
];

export function AgencyHelpSection() {
  const [hoveredId, setHoveredId] = useState<string | null>("social");

  return (
    <section className="relative z-10 w-full bg-[#0d0d12] py-24 md:py-36 border-t border-b border-white/10 text-white overflow-hidden">
      {/* Background radial highlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(237,28,36,0.12),transparent_70%)]" />

      <div className="mx-auto max-w-[1280px] px-5 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6" data-reveal data-reveal-dir="up">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#ff4d52]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>CAPABILITIES & SERVICES</span>
            </div>
            <h2 className="display mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              How we help
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-white/70 font-medium" data-reveal data-reveal-delay="150">
            We partner with ambitious brands to engineer end-to-end client acquisition systems through performance paid media, disruptive creative, and high-converting sales funnels.
          </p>
        </div>

        {/* Accordion / Hover Interactive List */}
        <div className="divide-y divide-white/15 border-t border-b border-white/15">
          {helpItems.map((item) => {
            const isHovered = hoveredId === item.id;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                className="group relative cursor-pointer py-8 md:py-10 transition-all duration-500 hover:bg-white/[0.03] hover:translate-x-1"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-2">
                  {/* Left: Number & Title */}
                  <div className="flex items-center gap-6 lg:gap-10">
                    <span className="display text-xl md:text-2xl font-bold text-white/50 group-hover:text-[#ed1c24] transition-colors">
                      {item.number}
                    </span>

                    {/* Inline Hover Image Thumbnail (Social Shepherd style) */}
                    <div className="flex items-center gap-4">
                      <motion.div
                        initial={false}
                        animate={{
                          width: isHovered ? (typeof window !== "undefined" && window.innerWidth < 768 ? 80 : 160) : 0,
                          opacity: isHovered ? 1 : 0,
                          marginRight: isHovered ? 16 : 0,
                        }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="relative hidden sm:block h-20 overflow-hidden rounded-xl border border-white/20 shadow-xl shrink-0"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </motion.div>

                      <h3 className="display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right: Badges & Arrow */}
                  <div className="flex items-center gap-4 self-start lg:self-auto">
                    <div className="hidden md:flex items-center gap-2">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold text-white/80 group-hover:border-[#ed1c24]/40 group-hover:text-white transition-all"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all duration-300 group-hover:border-[#ed1c24] group-hover:bg-[#ed1c24] group-hover:text-white group-hover:scale-110">
                      <ArrowUpRight className="h-6 w-6" />
                    </div>
                  </div>
                </div>

                {/* Expanded Details Bar on Hover / Active */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
                        <div className="space-y-2">
                          <p className="text-xs font-bold uppercase tracking-wider text-[#ff4d52]">
                            Service Overview
                          </p>
                          <p className="text-sm text-white/80 leading-relaxed font-medium">
                            {item.shortDesc}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs font-bold uppercase tracking-wider text-white/60">
                            Key Deliverables
                          </p>
                          <ul className="space-y-1.5 text-xs text-white/90 font-medium">
                            {item.highlights.map((point, pIdx) => (
                              <li key={pIdx} className="flex items-center gap-2">
                                <CheckCircle2 className="h-3.5 w-3.5 text-[#ed1c24] shrink-0" />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-white/70 uppercase">
                              Benchmark Result
                            </span>
                            <Icon className="h-4 w-4 text-[#ed1c24]" />
                          </div>
                          <p className="display text-xl font-extrabold text-white mt-2">
                            {item.metrics}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
