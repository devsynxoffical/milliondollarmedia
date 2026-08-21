"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Zap,
} from "lucide-react";
import { MacbookScroll } from "../ui/MacbookScroll";

export function AdGenieHero() {
  // Ultra-smooth slow silk cubic-bezier curve (Webflow signature easing)
  const silkEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <section className="relative pt-28 sm:pt-36 pb-20 px-4 md:px-8 bg-white text-stone-900 overflow-hidden">
      {/* Subtle Ambient Background Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-purple-200/40 via-purple-100/20 to-amber-100/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto text-center flex flex-col items-center">

        {/* Top Eyebrow Tag */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, ease: silkEase }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 text-purple-900 font-extrabold text-xs tracking-widest uppercase mb-6 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-purple-700" />
          <span>SCALEWITHADS™ CLIENT ACQUISITION SYSTEM</span>
        </motion.div>

        {/* Main Hero Headline (Clear Offer Title) */}
        <div className="overflow-hidden py-2 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 80, skewX: -12, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, skewX: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.8, delay: 0.2, ease: silkEase }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-black tracking-tight text-black uppercase leading-[1.02] font-hero select-none"
          >
            DOUBLE YOUR REVENUE <br />
            <span className="font-serif italic lowercase text-purple-700 font-normal">within 90 days.</span>
          </motion.h1>
        </div>

        {/* High-Converting Irresistible Offer Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, skewX: -4, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, skewX: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.6, delay: 0.5, ease: silkEase }}
          className="mt-8 max-w-3xl w-full"
        >
          <div className="p-6 sm:p-8 rounded-3xl bg-purple-50/90 border-2 border-purple-200 shadow-xl text-center relative overflow-hidden">
            <p className="text-base sm:text-lg text-stone-800 font-medium leading-relaxed font-sans">
              We will install our complete <span className="font-black text-stone-950">Done-For-You Client Acquisition Ecosystem</span> into your business — High-Converting Funnels, Meta Ads & AI Follow-Up.
            </p>

            <div className="my-5 p-4 rounded-2xl bg-white border border-purple-200/80 shadow-sm">
              <p className="text-base sm:text-xl font-extrabold text-stone-950 font-sans leading-snug">
                If we don&apos;t double your revenue within 90 days... <br className="hidden sm:inline" />
                <span className="text-purple-700 font-bold">we&apos;ll continue working for you at zero management fee until we do.</span>
              </p>
            </div>

            {/* Feature Guarantees Row */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              <span className="px-3.5 py-1.5 rounded-full bg-stone-950 text-white font-mono text-[11px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Written 90-Day Guarantee</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-purple-200/80 text-purple-950 font-mono text-[11px] font-black uppercase tracking-wider inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-700" />
                <span>100% Asset Ownership</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono text-[11px] font-black uppercase tracking-wider inline-flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-700" />
                <span>Zero Management Fee Risk</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Hero Action Pill Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.8, ease: silkEase }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/book"
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#1D1435] hover:bg-[#2C1D50] text-white font-black text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            <span>Book Your Free Call</span>
            <ArrowRight className="w-4 h-4 text-purple-300" />
          </Link>
          <Link
            href="/services"
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#EAE0FF] hover:bg-[#DDD0FF] text-[#1D1435] font-black text-sm uppercase tracking-wider transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <span>Explore Systems</span>
            <ArrowRight className="w-4 h-4 text-[#1D1435]" />
          </Link>
        </motion.div>

        {/* DFY Creative Banner Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.95 }}
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
