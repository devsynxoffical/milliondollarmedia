"use client";

import React, { useState } from "react";
import { FloatingNavbar } from "@/components/redesign/FloatingNavbar";
import { SelectedWorkShowcase } from "@/components/redesign/SelectedWorkShowcase";
import { EditorialSubhero } from "@/components/redesign/EditorialSubhero";
import { CreativeCtaSection } from "@/components/redesign/CreativeCtaSection";
import { LusionEndSection } from "@/components/redesign/LusionEndSection";
import { EditorialFooter } from "@/components/redesign/EditorialFooter";
import { Award, TrendingUp, Sparkles, ArrowRight, ShieldCheck, Eye, ChevronDown, ChevronUp, X, Maximize2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function WorkPage() {
  const [expandedProofs, setExpandedProofs] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const caseStudies = [
    {
      title: "E-Commerce Apparel Brand",
      metric: "$2,400,000+",
      sub: "Revenue Scaled in 90 Days",
      roas: "5.4x ROAS",
      niche: "DTC Fashion",
      desc: "Installed Meta Advantage+ CAPI funnel with 12 UGC video hook variations, doubling blended ROAS.",
    },
    {
      title: "B2B SaaS Growth Engine",
      metric: "$1,450,000",
      sub: "Pipeline Added in 60 Days",
      roas: "4.82x ROAS",
      niche: "Software",
      desc: "Deployed longform VSL ad system paired with server-side lead tracking to cut CPA by 62%.",
    },
    {
      title: "Health & Wellness Brand",
      metric: "12,000,000+",
      sub: "TikTok Impressions & Sales",
      roas: "4.2x ROAS",
      niche: "Supplements",
      desc: "Scaled TikTok Spark Ads using creator UGC cuts, driving $840k in new front-end revenue.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans selection:bg-purple-200 selection:text-purple-950">
      <FloatingNavbar />
      
      {/* Results Hero Header */}
      <section className="pt-36 sm:pt-44 pb-16 px-4 md:px-8 bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-3.5 py-1.5 rounded-full inline-flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-purple-700" />
            <span>VERIFIED RESULTS & LIVE PROOF</span>
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-stone-950 tracking-tight mt-6 leading-tight uppercase font-hero">
            $50M+ VERIFIED <span className="font-serif italic lowercase text-purple-700">results.</span>
          </h1>
          <p className="mt-4 text-stone-600 font-medium text-lg sm:text-xl max-w-2xl mx-auto">
            Deep dives into how we scale revenue, reduce cost per acquisition, and multiply ROAS across 20+ industries.
          </p>
        </div>
      </section>

      {/* Case Studies Detailed Cards Grid */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((cs, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border-2 border-stone-950 p-8 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-stone-400 uppercase tracking-widest">
                    {cs.niche}
                  </span>
                  <span className="text-xs font-mono font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {cs.roas}
                  </span>
                </div>
                <h3 className="text-2xl font-extrabold text-stone-950 font-hero tracking-tight">
                  {cs.title}
                </h3>
                <div className="my-6 p-4 rounded-2xl bg-purple-50 border border-purple-100">
                  <span className="text-3xl font-black text-purple-900 font-mono block">
                    {cs.metric}
                  </span>
                  <span className="text-xs font-bold text-purple-700 font-mono mt-0.5 block">
                    {cs.sub}
                  </span>
                </div>
                <p className="text-stone-600 text-sm font-medium leading-relaxed">
                  {cs.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-stone-500">Verified Client Case</span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 font-bold text-xs uppercase text-purple-700 hover:text-purple-950 transition-colors"
                >
                  <span>Read Breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE CAMPAIGN PROOF SECTION (UNIFIED EXPANDABLE PROOFS) */}
      <section className="py-24 px-4 md:px-8 bg-stone-950 text-white border-t border-b border-stone-800">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-16">
            <div>
              <span className="text-xs font-mono font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full inline-flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>LIVE CAMPAIGN PROOF</span>
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-hero tracking-tight">
                Verified Ads Manager Dashboards
              </h2>
            </div>
            <span className="text-xs font-mono text-stone-400">
              REAL-TIME CAPI TELEMETRY // VERIFIED SPEND & RETURNS
            </span>
          </div>

          {/* 2 Campaign Proof Cards with Preview Height & Expandable Toggle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Campaign Dashboard #1 */}
            <div className="bg-stone-900 rounded-3xl border-2 border-stone-800 p-6 shadow-2xl flex flex-col justify-between hover:border-emerald-500 transition-colors group">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block mb-2">
                  LIVE CAMPAIGN PROOF
                </span>
                <h3 className="text-2xl font-black text-white font-hero tracking-tight mb-4">
                  Campaign Dashboard #1 — Tracked Spend & Returns
                </h3>
                
                {/* Expandable Image Container */}
                <div
                  onClick={() => setLightboxImg("/proof-695d97e2.png")}
                  className={`rounded-2xl overflow-hidden border border-stone-700 shadow-xl mb-6 bg-black relative cursor-zoom-in transition-all duration-700 ${
                    expandedProofs ? "max-h-[1400px]" : "max-h-[380px]"
                  }`}
                >
                  <img
                    src="/proof-695d97e2.png"
                    alt="Campaign Dashboard #1 — Tracked Spend & Returns"
                    className="w-full h-auto object-cover object-top"
                  />
                  
                  {/* Bottom Gradient Fade when collapsed */}
                  {!expandedProofs && (
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-stone-900 via-stone-900/80 to-transparent pointer-events-none flex items-end justify-center pb-3">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-black/60 px-3 py-1 rounded-full border border-emerald-500/30">
                        Click &apos;See More&apos; or image to expand
                      </span>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setLightboxImg("/proof-695d97e2.png")}
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/20"
              >
                <span>VIEW FULL PROOF</span>
                <Eye className="w-4 h-4" />
              </button>
            </div>

            {/* Campaign Dashboard #2 */}
            <div className="bg-stone-900 rounded-3xl border-2 border-stone-800 p-6 shadow-2xl flex flex-col justify-between hover:border-purple-500 transition-colors group">
              <div>
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest block mb-2">
                  LIVE CAMPAIGN PROOF
                </span>
                <h3 className="text-2xl font-black text-white font-hero tracking-tight mb-4">
                  Campaign Dashboard #2 — High-Ticket Acquisition
                </h3>
                
                {/* Expandable Image Container */}
                <div
                  onClick={() => setLightboxImg("/proof-695d9820.png")}
                  className={`rounded-2xl overflow-hidden border border-stone-700 shadow-xl mb-6 bg-black relative cursor-zoom-in transition-all duration-700 ${
                    expandedProofs ? "max-h-[1400px]" : "max-h-[380px]"
                  }`}
                >
                  <img
                    src="/proof-695d9820.png"
                    alt="Campaign Dashboard #2 — High-Ticket Acquisition"
                    className="w-full h-auto object-cover object-top"
                  />

                  {/* Bottom Gradient Fade when collapsed */}
                  {!expandedProofs && (
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-stone-900 via-stone-900/80 to-transparent pointer-events-none flex items-end justify-center pb-3">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-400 bg-black/60 px-3 py-1 rounded-full border border-purple-500/30">
                        Click &apos;See More&apos; or image to expand
                      </span>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setLightboxImg("/proof-695d9820.png")}
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-wider transition-colors shadow-lg shadow-purple-600/30"
              >
                <span>VIEW FULL PROOF</span>
                <Eye className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* SINGLE UNIFIED BUTTON CONTROLLING BOTH SCREENSHOTS */}
          <div className="mt-14 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setExpandedProofs(!expandedProofs)}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-stone-950 hover:bg-purple-300 font-black text-sm uppercase tracking-wider transition-all shadow-2xl active:scale-95"
            >
              <span>{expandedProofs ? "COLLAPSE PROOFS" : "SEE MORE RESULTS"}</span>
              {expandedProofs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-stone-800 hover:bg-stone-700 text-white font-bold text-sm uppercase tracking-wider border border-stone-700 transition-all"
            >
              <span>Book Scaling Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Lightbox Modal for High-Resolution Zoom */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-stone-700 bg-stone-950 p-2 shadow-2xl"
            >
              <img
                src={lightboxImg}
                alt="High Resolution Proof Dashboard"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SelectedWorkShowcase />
      <EditorialSubhero />
      <CreativeCtaSection />
      <LusionEndSection />
      <EditorialFooter />
    </main>
  );
}
