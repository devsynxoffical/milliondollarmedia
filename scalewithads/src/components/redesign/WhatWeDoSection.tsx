"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowUpRight, Globe, Layers, ArrowRight, LayoutDashboard } from "lucide-react";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  tags: string[];
  urlTag: string;
}

export function WhatWeDoSection() {
  const [openId, setOpenId] = useState<string | null>("03");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const services: ServiceItem[] = [
    {
      id: "01",
      number: "001",
      title: "UI/UX & Creative Direction",
      shortDesc: "Intuitive, engaging, and user-focused interfaces.",
      fullDesc:
        "Our in-house studio scripts, shoots, and edits 30+ ad variations per month—testing hooks, angles, and creator assets designed to stop the scroll.",
      tags: ["UGC Creators", "VSL Scripts", "Hook Testing"],
      urlTag: "http/www.scalewithads.com/creative",
    },
    {
      id: "02",
      number: "002",
      title: "Data Strategy & Attribution",
      shortDesc: "End-to-end performance modeling & CAPI setup.",
      fullDesc:
        "We set up pixel-perfect tracking, offline conversion APIs, and first-party data dashboards so you never burn budget on misattributed ad networks.",
      tags: ["First-Party Data", "CAPI Setup", "Custom Dashboards"],
      urlTag: "http/www.scalewithads.com/attribution",
    },
    {
      id: "03",
      number: "003",
      title: "Omnichannel Media Buying",
      shortDesc: "Aggressive scaling on Meta, TikTok & Google.",
      fullDesc:
        "We manage multi-million dollar ad accounts with algorithmic bid strategies, audience segmentation, and rapid iteration to multiply your ROAS.",
      tags: ["Meta Ads", "TikTok Ads", "Google PMax"],
      urlTag: "http/www.scalewithads.com/mediabuying",
    },
    {
      id: "04",
      number: "004",
      title: "Digital Monitoring & Margins",
      shortDesc: "Strategies that boost reach and engagement.",
      fullDesc:
        "Continuous automated & manual monitoring keeps your cost per acquisition low and prevents fatigue before it impacts your bottom line.",
      tags: ["Margin Watch", "CPA Safeguards", "Live Alerts"],
      urlTag: "http/www.scalewithads.com/monitoring",
    },
    {
      id: "05",
      number: "005",
      title: "Brand Identity & Scale",
      shortDesc: "Cohesive visuals that command premium pricing.",
      fullDesc:
        "Ads should look like iconic content, not cheap spam. We elevate your brand aesthetic so every view turns into loyal repeat buyers.",
      tags: ["Brand Identity", "LTV Boost", "Premium Creative"],
      urlTag: "http/www.scalewithads.com/branding",
    },
  ];

  return (
    <section id="services" className="py-24 px-4 md:px-8 bg-[#FDFBF7] text-stone-900 border-b border-stone-200">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-16">
          <div className="md:col-span-7">
            <span className="text-xs font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-3.5 py-1.5 rounded-full">
              Our Blueprint
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-950 tracking-tight mt-4 leading-tight">
              What we do <br />
              <span className="relative inline-block">
                differently here
                <span className="absolute -top-2 -right-4 text-purple-600 text-2xl">✦</span>
              </span>
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-stone-600 font-medium text-base leading-relaxed">
              We cut out bloated agency fluff and replace it with direct-response execution, high-end design, and ruthless ROAS focus.
            </p>
          </div>
        </div>

        {/* Numbered Pill Accordion List with Dynamic Tilt & Floating Pop-Up Badges (Lunvoro reference format) */}
        <div className="flex flex-col gap-5 relative">
          {services.map((item) => {
            const isOpen = openId === item.id;
            const isHovered = hoveredId === item.id;
            const isActive = isOpen || isHovered;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative"
              >
                {/* Floating Pop-Up Badge Window (Appears above row on hover/open like Screenshot 1) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.88, rotate: -4 }}
                      animate={{ opacity: 1, y: -28, scale: 1, rotate: 6 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 350, damping: 22 }}
                      className="absolute right-12 sm:right-32 -top-12 z-30 pointer-events-none hidden sm:flex flex-col items-end gap-1.5"
                    >
                      {/* URL Sticker Pill */}
                      <div className="bg-[#FF7A00] text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-lg border border-stone-900 flex items-center gap-1.5 transform -rotate-3">
                        <span>{item.urlTag}</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>

                      {/* Mini 3D Window Card */}
                      <div className="bg-stone-950 text-white rounded-2xl p-3.5 border-2 border-stone-900 shadow-2xl w-48 sm:w-56 transform rotate-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex gap-1">
                            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                          </div>
                          <span className="text-[9px] font-mono text-purple-400 font-bold uppercase">
                            LIVE ROAS 4.85x
                          </span>
                        </div>
                        <div className="bg-stone-800 rounded-xl p-2 text-[10px] font-bold text-stone-200 flex items-center justify-between">
                          <span>{item.title}</span>
                          <span className="text-emerald-400 font-mono">+34.8%</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Main Row Container (Tilts dynamically when active/hovered like Screenshot 1) */}
                <motion.div
                  animate={{
                    rotate: isActive ? (item.id === "03" ? -2.5 : 2) : 0,
                    scale: isActive ? 1.01 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`rounded-2xl border-2 transition-colors duration-300 overflow-hidden ${
                    isActive
                      ? "bg-[#9333EA] text-white border-stone-950 shadow-2xl shadow-purple-950/20"
                      : "bg-white text-stone-900 border-stone-300 hover:border-stone-950 shadow-sm"
                  }`}
                >
                  {/* Header Row */}
                  <button
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full p-5 sm:p-7 flex flex-wrap items-center justify-between gap-4 text-left transition-colors"
                  >
                    <div className="flex items-center gap-4 sm:gap-8">
                      <span
                        className={`text-sm sm:text-base font-black px-3.5 py-1.5 rounded-xl font-mono ${
                          isActive
                            ? "bg-white/20 text-white border border-white/30"
                            : "bg-purple-50 text-purple-700 border border-purple-200"
                        }`}
                      >
                        {item.number}
                      </span>
                      <h3
                        className={`text-lg sm:text-2xl font-extrabold tracking-tight uppercase ${
                          isActive ? "text-white" : "text-stone-900"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                      <span
                        className={`hidden md:block text-xs sm:text-sm font-semibold max-w-xs text-right ${
                          isActive ? "text-purple-100" : "text-stone-500"
                        }`}
                      >
                        {item.shortDesc}
                      </span>
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                          isActive
                            ? "bg-white text-stone-950 border-white"
                            : "bg-stone-100 border-stone-300 text-stone-700"
                        }`}
                      >
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                      >
                        <div className="px-5 sm:px-7 pb-6 pt-2 border-t border-white/20 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                          <div className="md:col-span-8">
                            <p
                              className={`text-sm sm:text-base font-medium leading-relaxed ${
                                isActive ? "text-purple-100" : "text-stone-700"
                              }`}
                            >
                              {item.fullDesc}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {item.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                                    isActive
                                      ? "bg-white/20 text-white border-white/30"
                                      : "bg-purple-100 text-purple-900 border-purple-300"
                                  }`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="md:col-span-4 flex justify-start md:justify-end">
                            <a
                              href="/contact"
                              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs shadow transition-colors ${
                                isActive
                                  ? "bg-white text-purple-950 hover:bg-stone-100"
                                  : "bg-stone-900 text-white hover:bg-purple-900"
                              }`}
                            >
                              <span>Explore Strategy</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
