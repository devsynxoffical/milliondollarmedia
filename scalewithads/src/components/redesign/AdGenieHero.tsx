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

        {/* Hero Subtitle Animation (Official ScaleWithAds Guarantee Copy) */}
        <motion.p
          initial={{ opacity: 0, y: 40, skewX: -6, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, skewX: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.6, delay: 0.6, ease: silkEase }}
          className="mt-6 text-base sm:text-lg md:text-xl text-stone-800 max-w-3xl font-medium leading-relaxed font-sans"
        >
          We install our proprietary <span className="font-bold text-stone-950">$50M+ proven Meta Ads system</span> directly into your business. Double your revenue within the next 90 days — or we work at no management fee until we do.
        </motion.p>

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

        {/* High-Craft Natural App Dashboard Container */}
        <motion.div
          initial={{ opacity: 0, y: 120, scale: 0.93, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2.0, delay: 1.1, ease: silkEase }}
          className="mt-14 w-full bg-[#EAE0FF] rounded-[36px] p-4 sm:p-8 lg:p-10 shadow-2xl shadow-purple-900/10 relative text-left"
        >
          {/* Inner Light App Container */}
          <div className="bg-white/90 backdrop-blur-md rounded-[28px] border border-white/60 shadow-xl overflow-hidden text-stone-900">
            
            {/* App Header Bar */}
            <div className="px-6 py-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4 bg-stone-50/50">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-xs font-mono font-bold text-stone-400 ml-2 hidden sm:inline">
                  scalewithads.os // analytics
                </span>
              </div>

              {/* Center Platform Toggle */}
              <div className="flex items-center bg-stone-200/80 p-1 rounded-full text-xs font-bold font-mono">
                {["META", "TIKTOK", "GOOGLE"].map((plat) => (
                  <button
                    key={plat}
                    onClick={() => setActivePlatform(plat)}
                    className={`px-3 py-1 rounded-full transition-all ${
                      activePlatform === plat
                        ? "bg-white text-stone-950 shadow-sm"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    {plat}
                  </button>
                ))}
              </div>

              {/* Right Profile / Bell */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    className="pl-9 pr-3 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 w-36 sm:w-48"
                  />
                </div>
                <button className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors">
                  <Bell className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Dashboard Content Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
              
              {/* Left Sidebar Menu */}
              <div className="lg:col-span-3 border-r border-stone-200 p-4 bg-stone-50/30 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider px-3 mb-2 block">
                    Navigation
                  </span>
                  {sidebarMenu.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? "bg-purple-700 text-white shadow-md shadow-purple-600/20"
                            : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-80" />}
                      </button>
                    );
                  })}
                </div>

                {/* Sidebar Bottom Live System Card */}
                <div className="mt-6 p-3.5 rounded-2xl bg-purple-50 border border-purple-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-extrabold text-purple-900 font-mono">
                      CAPI System Active
                    </span>
                  </div>
                  <p className="text-[10px] text-purple-700 font-medium leading-tight">
                    Server-Side Attribution tracking 100% conversions live.
                  </p>
                </div>
              </div>

              {/* Main Analytics Panel */}
              <div className="lg:col-span-9 p-6 flex flex-col justify-between">
                <div>
                  
                  {/* Top Stats Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-stone-950 tracking-tight font-hero">
                        Performance Overview
                      </h2>
                      <p className="text-xs text-stone-500 font-medium mt-0.5">
                        Real-time revenue & attribution telemetry for Meta & TikTok campaigns.
                      </p>
                    </div>

                    {/* Timeframe Selector */}
                    <div className="flex items-center bg-stone-100 p-1 rounded-lg text-xs font-bold font-mono">
                      {["7D", "1M", "3M", "YTD"].map((tf) => (
                        <button
                          key={tf}
                          onClick={() => setActiveTimeframe(tf)}
                          className={`px-2.5 py-1 rounded-md transition-all ${
                            activeTimeframe === tf
                              ? "bg-white text-stone-950 shadow-sm"
                              : "text-stone-500 hover:text-stone-800"
                          }`}
                        >
                          {tf}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3 Metric Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                      <span className="text-xs font-semibold text-stone-500">Ad Spend Managed</span>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="text-2xl font-black text-stone-950 font-mono">$52,480,000+</span>
                        <span className="text-xs font-bold text-emerald-600 flex items-center">
                          <TrendingUp className="w-3 h-3 mr-0.5" /> +142%
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-medium mt-1 block">Meta & TikTok Ad Spend</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                      <span className="text-xs font-semibold text-stone-500">Average ROAS</span>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="text-2xl font-black text-purple-700 font-mono">4.82x</span>
                        <span className="text-xs font-bold text-emerald-600 flex items-center">
                          <TrendingUp className="w-3 h-3 mr-0.5" /> +88%
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-medium mt-1 block">Blended Return on Ad Spend</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                      <span className="text-xs font-semibold text-stone-500">Revenue Guarantee</span>
                      <div className="flex items-baseline justify-between mt-1">
                        <span className="text-2xl font-black text-emerald-600 font-mono">90 Days</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Written
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-medium mt-1 block">Double Revenue or $0 Fee</span>
                    </div>

                  </div>

                  {/* Simulated Chart Graph Area */}
                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-stone-800 font-mono uppercase tracking-wider">
                        ROAS Growth Telemetry Curve
                      </span>
                      <span className="text-xs font-mono font-bold text-purple-700">
                        Target: 4.5x+ ROAS
                      </span>
                    </div>

                    {/* SVG Curve Line Graph */}
                    <div className="h-36 w-full relative flex items-end">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#7E22CE" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#7E22CE" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0 100 Q 80 85 140 60 T 280 40 T 400 20 L 500 10 L 500 120 L 0 120 Z"
                          fill="url(#chartGrad)"
                        />
                        <path
                          d="M 0 100 Q 80 85 140 60 T 280 40 T 400 20 L 500 10"
                          fill="none"
                          stroke="#7E22CE"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                        <circle cx="500" cy="10" r="5" fill="#7E22CE" className="animate-ping" />
                        <circle cx="500" cy="10" r="5" fill="#7E22CE" />
                      </svg>
                    </div>
                  </div>

                </div>

                {/* Bottom CTA Row inside Dashboard */}
                <div className="mt-6 pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="font-semibold text-stone-500">
                    Proprietary $50M+ Meta Ads System // 90-Day Revenue Guarantee
                  </span>
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-1.5 font-bold text-purple-700 hover:text-purple-900 transition-colors"
                  >
                    <span>Book Your Strategy Call</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
