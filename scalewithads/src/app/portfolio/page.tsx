"use client";

import React, { useState } from "react";
import { FloatingNavbar } from "@/components/redesign/FloatingNavbar";
import { LusionEndSection } from "@/components/redesign/LusionEndSection";
import { EditorialFooter } from "@/components/redesign/EditorialFooter";
import { Play, Film, Flame, ArrowRight, Sparkles, Filter, X, Maximize2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Complete Video Database directly from milliondollarmedia.us/portfolio/
const portfolioVideos = [
  // Roofing
  { id: "1203105523", title: "Equinox Roof Ad 2F", category: "Roofing", vimeoId: "1203105523", duration: "51s" },
  { id: "1203105527", title: "Top Roof Conversion Ad 3", category: "Roofing", vimeoId: "1203105527", duration: "61s" },
  { id: "1203105510", title: "Equinox Storm Roofing 1F", category: "Roofing", vimeoId: "1203105510", duration: "57s" },
  { id: "1203105488", title: "Equinox Replacement Roof June 3", category: "Roofing", vimeoId: "1203105488", duration: "51s" },
  { id: "1203105494", title: "Equinox High-ROAS Roof 6", category: "Roofing", vimeoId: "1203105494", duration: "36s" },

  // HVAC
  { id: "1203808552", title: "$0 Down Heating System Ad", category: "HVAC", vimeoId: "1203808552", duration: "28s" },
  { id: "1203812276", title: "HVAC Climate Control Ad 1", category: "HVAC", vimeoId: "1203812276", duration: "41s" },
  { id: "1203812274", title: "HVAC Seasonal Offer Ad 4", category: "HVAC", vimeoId: "1203812274", duration: "29s" },
  { id: "1203812272", title: "HVAC Comfort Engine 3", category: "HVAC", vimeoId: "1203812272", duration: "34s" },
  { id: "1203812271", title: "HVAC Heat Pump Promo 2", category: "HVAC", vimeoId: "1203812271", duration: "31s" },
  { id: "1203815881", title: "$0 Down Home Heater Special", category: "HVAC", vimeoId: "1203815881", duration: "37s" },

  // Solar
  { id: "1203808485", title: "California Solar Clean Energy", category: "Solar", vimeoId: "1203808485", duration: "30s" },
  { id: "1203808486", title: "California Solar Utility Savings", category: "Solar", vimeoId: "1203808486", duration: "41s" },
  { id: "1203828547", title: "Solar California Federal Incentive", category: "Solar", vimeoId: "1203828547", duration: "24s" },
  { id: "1203828545", title: "Solar Power Lock-In 2", category: "Solar", vimeoId: "1203828545", duration: "24s" },
  { id: "1203828548", title: "Solar Battery Storage Ad 3", category: "Solar", vimeoId: "1203828548", duration: "43s" },

  // Supplements
  { id: "1203105580", title: "Gummies Bio-Nourish Ad", category: "Supplements", vimeoId: "1203105580", duration: "66s" },
  { id: "1203827387", title: "DTC Health Gummies Reel 1", category: "Supplements", vimeoId: "1203827387", duration: "40s" },
  { id: "1203827386", title: "DTC Wellness Formulation 2", category: "Supplements", vimeoId: "1203827386", duration: "38s" },
  { id: "1203827815", title: "Nutritional Health Ad 3", category: "Supplements", vimeoId: "1203827815", duration: "45s" },

  // Agency Owner
  { id: "1203828901", title: "7-Figure Agency Acquisition 1-2", category: "Agency Owner", vimeoId: "1203828901", duration: "64s" },
  { id: "1203828900", title: "Agency Scale & CAPI Engine 4-2", category: "Agency Owner", vimeoId: "1203828900", duration: "87s" },
  { id: "1203828899", title: "High-Ticket Client Blueprint 3-2", category: "Agency Owner", vimeoId: "1203828899", duration: "99s" },

  // Recruitment
  { id: "1203105458", title: "LinkedIn Executive Talent Acquisition 2", category: "Recruitment", vimeoId: "1203105458", duration: "43s" },
  { id: "1203105467", title: "LinkedIn Talent Recruitment Ad 1", category: "Recruitment", vimeoId: "1203105467", duration: "60s" },
  { id: "1203819145", title: "Corporate Hiring Engine 1", category: "Recruitment", vimeoId: "1203819145", duration: "39s" },
  { id: "1203819144", title: "Career Growth Funnel 2", category: "Recruitment", vimeoId: "1203819144", duration: "37s" },

  // SAAS
  { id: "1203105447", title: "Seven Fathom B2B SaaS Demo 1", category: "SAAS", vimeoId: "1203105447", duration: "55s" },
  { id: "1203105413", title: "Seven Fathom Product Walkthrough 2", category: "SAAS", vimeoId: "1203105413", duration: "65s" },
  { id: "1203105414", title: "Seven Fathom Feature Breakdown 3", category: "SAAS", vimeoId: "1203105414", duration: "41s" },

  // VSL
  { id: "1203816135", title: "Longform Client VSL Script 1", category: "VSL", vimeoId: "1203816135", duration: "31s" },
  { id: "1203816133", title: "Direct-Response VSL Funnel 2", category: "VSL", vimeoId: "1203816133", duration: "32s" },
  { id: "1203816132", title: "High-Ticket VSL Breakdown 3", category: "VSL", vimeoId: "1203816132", duration: "28s" },
  { id: "1203816465", title: "Scale With Ads VSL Architecture 5", category: "VSL", vimeoId: "1203816465", duration: "36s" },

  // Events
  { id: "1203105532", title: "Mastermind Conference Reel 3", category: "Events", vimeoId: "1203105532", duration: "43s" },
  { id: "1203819315", title: "Keynote Event Highlights 1", category: "Events", vimeoId: "1203819315", duration: "41s" },
  { id: "1203833007", title: "Live Mastermind Showcase 2", category: "Events", vimeoId: "1203833007", duration: "50s" },

  // Finance & MVA
  { id: "1203105416", title: "Commercial Finance Capital 6", category: "Finance", vimeoId: "1203105416", duration: "31s" },
  { id: "1203105415", title: "Capital Growth Strategy 5", category: "Finance", vimeoId: "1203105415", duration: "29s" },
  { id: "1203808613", title: "Personal Injury MVA Law 1", category: "MVA", vimeoId: "1203808613", duration: "53s" },
  { id: "1203105376", title: "MVA Legal Client Acquisition 2", category: "MVA", vimeoId: "1203105376", duration: "45s" },

  // Chiro & Home Services
  { id: "1203105308", title: "Spine & Pain Chiropractic Ad 1", category: "Chiro", vimeoId: "1203105308", duration: "35s" },
  { id: "1203105309", title: "Wellness Chiro Special Offer 2", category: "Chiro", vimeoId: "1203105309", duration: "52s" },
  { id: "1203812402", title: "Window & Door Installation Ad 1", category: "Window & Doors", vimeoId: "1203812402", duration: "47s" },
  { id: "1203812401", title: "Window Replacement Promo 2", category: "Window & Doors", vimeoId: "1203812401", duration: "52s" },
  { id: "1203818782", title: "Deep Carpet Cleaning Promo 1", category: "Carpet Cleaning", vimeoId: "1203818782", duration: "55s" },
  { id: "1203818781", title: "Carpet Sanitation Offer 2", category: "Carpet Cleaning", vimeoId: "1203818781", duration: "42s" },
];

const categories = [
  "All",
  "Roofing",
  "Supplements",
  "Recruitment",
  "Events",
  "HVAC",
  "Solar",
  "Agency Owner",
  "Chiro",
  "Finance",
  "MVA",
  "SAAS",
  "Window & Doors",
  "Carpet Cleaning",
  "VSL",
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalVideo, setActiveModalVideo] = useState<{ vimeoId: string; title: string } | null>(null);

  const filteredVideos =
    selectedCategory === "All"
      ? portfolioVideos
      : portfolioVideos.filter((v) => v.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans selection:bg-purple-200 selection:text-purple-950">
      <FloatingNavbar />

      {/* Hero Header */}
      <section className="pt-36 sm:pt-44 pb-16 px-4 md:px-8 bg-white border-b border-stone-200 text-center">
        <div className="max-w-5xl mx-auto">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full inline-flex items-center gap-2 mb-6 shadow-sm">
            <Film className="w-3.5 h-3.5 text-purple-700" />
            <span>SCALEWITHADS PORTFOLIO VAULT</span>
          </span>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-stone-950 tracking-tight uppercase font-hero leading-none">
            CREATIVITY THAT <span className="font-serif italic lowercase text-purple-700">converts.</span>
          </h1>

          <p className="mt-4 text-stone-600 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            Explore active high-ROAS VSLs, TikTok UGC cuts, and direct-response performance ad campaigns engineered across 20+ industries.
          </p>
        </div>
      </section>

      {/* Category Pills Filter Bar (Matching Screenshots & milliondollarmedia.us/portfolio/) */}
      <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto border-b border-stone-200 sticky top-20 z-40 bg-[#FDFBF7]/95 backdrop-blur-md">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
          <div className="flex items-center gap-2 shrink-0 pr-3 border-r border-stone-300 mr-1 text-xs font-mono font-bold text-stone-500">
            <Filter className="w-3.5 h-3.5 text-purple-700" />
            <span>CATEGORIES:</span>
          </div>

          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full border-2 text-xs font-extrabold tracking-tight transition-all duration-200 whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-[#9333EA] text-white border-stone-950 shadow-md scale-105"
                    : "bg-white text-stone-900 border-stone-300 hover:border-purple-600 hover:bg-purple-50"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <span className="text-xs font-mono font-bold text-stone-500 uppercase tracking-widest">
            SHOWING {filteredVideos.length} {selectedCategory.toUpperCase()} AD CAMPAIGNS
          </span>
          <span className="text-xs font-mono font-bold text-purple-700">
            4K VIMEO HD STREAMS
          </span>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredVideos.map((video) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl border-2 border-stone-950 shadow-xl overflow-hidden group hover:border-purple-600 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Vimeo Video Embed Container */}
                <div className="relative aspect-[9/14] sm:aspect-[9/16] bg-black border-b-2 border-stone-950 overflow-hidden">
                  <iframe
                    src={`https://player.vimeo.com/video/${video.vimeoId}?autopause=0&muted=1&controls=1`}
                    title={video.title}
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                  <div
                    onClick={() => setActiveModalVideo({ vimeoId: video.vimeoId, title: video.title })}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Video Info Footer */}
                <div className="p-5 bg-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-black px-2.5 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300 inline-block mb-1">
                      {video.category}
                    </span>
                    <h3 className="font-extrabold text-sm text-stone-950 font-hero tracking-tight leading-tight">
                      {video.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setActiveModalVideo({ vimeoId: video.vimeoId, title: video.title })}
                    className="w-9 h-9 rounded-full bg-stone-950 text-white flex items-center justify-center hover:bg-purple-700 transition-colors shrink-0"
                  >
                    <Play className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox Modal for HD Vimeo Playback */}
      <AnimatePresence>
        {activeModalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalVideo(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button
              onClick={() => setActiveModalVideo(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl aspect-[9/16] sm:aspect-video rounded-3xl border-2 border-stone-800 bg-stone-950 p-2 shadow-2xl overflow-hidden relative"
            >
              <iframe
                src={`https://player.vimeo.com/video/${activeModalVideo.vimeoId}?autoplay=1&autopause=0`}
                title={activeModalVideo.title}
                className="w-full h-full rounded-2xl border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LusionEndSection />
      <EditorialFooter />
    </main>
  );
}
