"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Video, BarChart3, Layout, Zap, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface CardItem {
  number: string;
  title: string;
  italicWord?: string;
  subtitle: string;
  icon: any;
  href: string;
}

export function FourWaysSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(2); // Default hover on 3rd card like Lusion screenshot

  const ways: CardItem[] = [
    {
      number: "01",
      title: "UGC & VSL Video",
      italicWord: "Production",
      subtitle: "Short-form video hooks, VSL scripts, and high-converting ad assets crafted with direct-response precision.",
      icon: Video,
      href: "/services",
    },
    {
      number: "02",
      title: "First-Party Attribution",
      italicWord: "& CAPI",
      subtitle: "Pixel-perfect tracking dashboards and server-side setup so zero ad spend is ever misattributed.",
      icon: BarChart3,
      href: "/features",
    },
    {
      number: "03",
      title: "High-Converting Sales",
      italicWord: "Funnels",
      subtitle: "Custom landing pages and interactive checkout flows built to turn cold ad traffic into instant profit.",
      icon: Layout,
      href: "/work",
    },
    {
      number: "04",
      title: "Algorithmic Media",
      italicWord: "Buying",
      subtitle: "Multi-channel ad scaling across Meta, TikTok & Google to multiply daily spend with stable ROAS.",
      icon: Zap,
      href: "/contact",
    },
  ];

  return (
    <section className="py-28 px-4 sm:px-8 bg-[#FDFBF7] text-stone-900 border-b border-stone-200 relative overflow-hidden">
      
      {/* Decorative Curving Accent Ribbon (Matching Lusion Studio Orange Curve) */}
      <div className="absolute top-0 right-10 md:right-32 w-48 sm:w-64 h-48 sm:h-64 border-r-8 border-t-8 border-rose-500 rounded-tr-[120px] opacity-90 pointer-events-none -z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header (Exact Lusion Studio Headline Layout) */}
        <div className="mb-20">
          <span className="text-xs font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-3.5 py-1.5 rounded-full mb-6 inline-block">
            ✦ WHAT WE DO
          </span>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-black text-stone-950 tracking-tight leading-[0.98] uppercase font-hero max-w-4xl">
            Four Ways <br />
            We Bring <span className="italic font-serif font-normal text-purple-900 lowercase pr-2">ideas</span> To Life
          </h2>
        </div>

        {/* 4 Clean Minimalist Interactive Cards with Hover Color Inversion (Lusion Studio 4 Cards) */}
        <div className="flex flex-col border-t border-stone-300">
          {ways.map((item, idx) => {
            const Icon = item.icon;
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                className={`relative transition-all duration-400 ease-out border-b cursor-pointer ${
                  isHovered
                    ? "bg-[#0F0F11] text-white border-stone-950 shadow-2xl py-12 px-6 sm:px-10 rounded-3xl my-3 border-transparent"
                    : "bg-transparent text-stone-900 border-stone-300 py-10 px-4 sm:px-6 hover:border-stone-400"
                }`}
              >
                <Link href={item.href} className="block w-full">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* Number Code */}
                    <div className="md:col-span-1">
                      <span
                        className={`text-xs font-mono font-bold tracking-widest transition-colors ${
                          isHovered ? "text-purple-400" : "text-stone-400"
                        }`}
                      >
                        {item.number}
                      </span>
                    </div>

                    {/* Main Title & Subtitle */}
                    <div className="md:col-span-8 flex flex-col gap-2">
                      <h3
                        className={`text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase leading-none font-hero transition-colors ${
                          isHovered ? "text-white" : "text-stone-950"
                        }`}
                      >
                        {item.title}{" "}
                        {item.italicWord && (
                          <span
                            className={`italic font-serif font-normal lowercase pl-1.5 transition-colors ${
                              isHovered ? "text-purple-300" : "text-purple-900"
                            }`}
                          >
                            {item.italicWord}
                          </span>
                        )}
                      </h3>
                      <p
                        className={`text-sm sm:text-base font-medium max-w-xl transition-colors mt-2 leading-relaxed ${
                          isHovered ? "text-stone-300" : "text-stone-600"
                        }`}
                      >
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Right Side Icon & Arrow */}
                    <div className="md:col-span-3 flex items-center justify-start md:justify-end gap-4">
                      <div
                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-all ${
                          isHovered
                            ? "bg-white/10 text-white border border-white/20 scale-110 shadow-lg"
                            : "bg-stone-100 text-stone-900 border border-stone-200"
                        }`}
                      >
                        <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
                      </div>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          isHovered
                            ? "bg-purple-600 text-white translate-x-1 -translate-y-1"
                            : "bg-transparent text-stone-400"
                        }`}
                      >
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>

                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
