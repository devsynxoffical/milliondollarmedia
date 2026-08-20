"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Search,
  Bell,
  LayoutDashboard,
  FolderKanban,
  LineChart,
  Target,
  CreditCard,
  FileSpreadsheet,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { MacbookScroll } from "../ui/MacbookScroll";

export function AdGenieHero() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeTimeframe, setActiveTimeframe] = useState("1M");
  const [activePlatform, setActivePlatform] = useState("META");

  // Ultra-smooth slow silk cubic-bezier curve (Webflow signature easing)
  const silkEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const sidebarMenu = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "creatives", label: "Ad Creatives", icon: FolderKanban },
    { id: "roas", label: "ROAS & Performance", icon: LineChart },
    { id: "audiences", label: "Audience Insights", icon: Target },
    { id: "billings", label: "Client Billings", icon: CreditCard },
    { id: "reports", label: "Reporting & Export", icon: FileSpreadsheet },
    { id: "playbook", label: "Growth Playbook", icon: BookOpen },
  ];

  return (
    <section className="relative pt-24 sm:pt-32 pb-20 px-4 md:px-8 bg-white text-stone-900 overflow-hidden">
      {/* Subtle Ambient Background Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[520px] bg-gradient-to-tr from-purple-200/40 via-purple-100/20 to-amber-100/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto text-center flex flex-col items-center">

        {/* Top Eyebrow Tag */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, ease: silkEase }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 border border-purple-200 text-purple-900 font-extrabold text-xs tracking-wider uppercase mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-700" />
          <span>Stop guessing. Start scaling with predictability.</span>
        </motion.div>

        {/* Hero Title (Exact ScaleWithAds™ Branding & Slow Kinetic Skew Animation) */}
        <div className="overflow-hidden py-3 max-w-6xl">
          <motion.h1
            initial={{ opacity: 0, y: 90, skewX: -16, filter: "blur(16px)" }}
            animate={{ opacity: 1, y: 0, skewX: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.8, delay: 0.2, ease: silkEase }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[102px] font-extrabold tracking-tighter text-black uppercase leading-[0.95] font-hero select-none"
          >
            SCALE WITH ADS™
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, skewX: -6, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, skewX: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.6, delay: 0.6, ease: silkEase }}
          className="mt-6 text-base sm:text-lg md:text-xl text-stone-800 max-w-3xl font-medium leading-relaxed font-sans space-y-4"
        >
          <p>
            We will install our proprietary <span className="font-bold text-stone-950">Scale With Ads™ Client Acquisition System</span> into your business... Double your revenue within the next 90 days... Or we'll continue working for you at no management fee until we do. <span className="font-bold text-stone-950">Backed by a Written Agreement.</span>
          </p>
        </motion.div>

        {/* Hero Action Pill Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.85, ease: silkEase }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/book"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1D1435] hover:bg-[#2C1D50] text-white font-bold text-base transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <span>Book Your Free Call</span>
            <ArrowRight className="w-4 h-4 text-purple-300" />
          </Link>
          <Link
            href="/services"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#EAE0FF] hover:bg-[#DDD0FF] text-[#1D1435] font-bold text-base transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <span>Explore Systems</span>
            <ArrowRight className="w-4 h-4 text-[#1D1435]" />
          </Link>
        </motion.div>

        {/* DFY Creative Banner Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.0 }}
          className="mt-5"
        >
          <Link
            href="/book"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-black text-purple-700 hover:text-purple-900 tracking-wider uppercase underline underline-offset-4"
          >
            <span>GET DFY CREATIVE ADS FOR YOUR BRAND</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Static Realistic MacBook Pro Container containing VSL */}
        <div className="w-full mt-6 sm:mt-10">
          <MacbookScroll videoSrc="https://www.youtube.com/embed/1PGP3xs_nBk" />
        </div>

      </div>
    </section>
  );
}
