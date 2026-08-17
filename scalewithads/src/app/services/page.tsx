import React from "react";
import { FloatingNavbar } from "@/components/redesign/FloatingNavbar";
import { WhatWeDoSection } from "@/components/redesign/WhatWeDoSection";
import { MarqueeTicker } from "@/components/redesign/MarqueeTicker";
import { CreativeCtaSection } from "@/components/redesign/CreativeCtaSection";
import { LusionEndSection } from "@/components/redesign/LusionEndSection";
import { EditorialFooter } from "@/components/redesign/EditorialFooter";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export const metadata = {
  title: "Performance Systems & Services | ScaleWithAds",
  description: "Explore our performance marketing systems: Meta Ads, TikTok UGC, VSL Funnels, and CAPI Attribution.",
};

export default function ServicesPage() {
  const serviceCards = [
    {
      title: "Meta Ads Scaling",
      tag: "Facebook & Instagram",
      desc: "Algorithmic bidding & audience segmentation designed to scale daily ad spend from $1k to $50k+ with stable ROAS.",
      features: ["Advantage+ Campaigns", "Retargeting Funnels", "Pixel & CAPI Setup", "Weekly Telemetry"],
      color: "bg-purple-50 border-purple-300",
    },
    {
      title: "TikTok & Reels UGC",
      tag: "Viral Video Ads",
      desc: "In-house scriptwriting, creator sourcing, and rapid iteration to produce high-hook UGC videos that convert cold traffic.",
      features: ["30+ Hooks Monthly", "Native Creator Style", "VSL Storyboarding", "A/B Angle Testing"],
      color: "bg-amber-50 border-amber-300",
    },
    {
      title: "Google PMax & Search",
      tag: "High Intent Demand",
      desc: "Capture high-intent buyers searching for your exact product with optimized Google Performance Max & Search ads.",
      features: ["Keyword Harvesting", "Negative Keyword Shields", "Shopping Feed Optimization", "Conversion Tracking"],
      color: "bg-emerald-50 border-emerald-300",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans selection:bg-purple-200 selection:text-purple-950">
      <FloatingNavbar />
      
      {/* Services Hero */}
      <section className="pt-36 sm:pt-44 pb-16 px-4 md:px-8 bg-white border-b border-stone-200">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>OUR PROPRIETARY ACQUISITION SYSTEMS</span>
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-stone-950 tracking-tight leading-tight uppercase font-hero">
            PERFORMANCE <span className="font-serif italic lowercase text-purple-700">systems.</span>
          </h1>
          <p className="mt-4 text-stone-600 font-medium text-lg sm:text-xl max-w-2xl mx-auto font-sans">
            Full-stack performance ad management & acquisition architecture engineered to double your revenue with zero guesswork.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 md:px-8 bg-[#FDFBF7]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceCards.map((card, idx) => (
            <div key={idx} className={`p-8 rounded-3xl border-2 border-stone-950 shadow-xl ${card.color} flex flex-col justify-between`}>
              <div>
                <span className="text-xs font-mono font-black uppercase tracking-wider text-purple-950 bg-white/80 px-3 py-1 rounded-full border border-purple-300">
                  {card.tag}
                </span>
                <h3 className="text-2xl font-black text-stone-950 mt-4 mb-3 font-hero">{card.title}</h3>
                <p className="text-stone-700 text-sm font-medium leading-relaxed mb-6">{card.desc}</p>
                
                <ul className="flex flex-col gap-2.5 mb-8">
                  {card.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-xs font-bold text-stone-800 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-purple-700" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/book"
                className="w-full py-3.5 rounded-full bg-stone-950 hover:bg-purple-700 text-white font-bold text-center text-xs flex items-center justify-center gap-2 transition-colors shadow-lg uppercase tracking-wider"
              >
                <span>Deploy {card.title}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <MarqueeTicker />
      <WhatWeDoSection />
      <CreativeCtaSection />
      <LusionEndSection />
      <EditorialFooter />
    </main>
  );
}
