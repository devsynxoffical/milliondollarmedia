import React from "react";
import { FloatingNavbar } from "@/components/redesign/FloatingNavbar";
import { WhatWeDoSection } from "@/components/redesign/WhatWeDoSection";
import { MarqueeTicker } from "@/components/redesign/MarqueeTicker";
import { CreativeCtaSection } from "@/components/redesign/CreativeCtaSection";
import { LusionEndSection } from "@/components/redesign/LusionEndSection";
import { EditorialFooter } from "@/components/redesign/EditorialFooter";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Video, Layers, LineChart, GraduationCap, Crown } from "lucide-react";

export const metadata = {
  title: "Services & Acquisition Systems | ScaleWithAds",
  description: "Explore our 5 core services: Creatives Creation, Funnels, Media Buying, Trainings, and Mastermind.",
};

export default function ServicesPage() {
  const serviceCards = [
    {
      title: "Creatives Creation",
      tag: "Static & Motion Ads",
      icon: Video,
      desc: "High-converting direct-response ad copy, VSL storyboards, image creatives, and shortform video ads engineered to hook cold traffic.",
      features: ["30+ Ad Hooks Monthly", "VSL Scripting & Storyboards", "UGC & Motion Design", "Rapid Angle A/B Iterations"],
      color: "bg-[#1D1435] text-white border-purple-900",
      textColor: "text-white",
      badgeColor: "bg-purple-900/60 text-purple-300 border-purple-700",
      iconColor: "text-purple-300 bg-purple-900/80",
    },
    {
      title: "Funnels",
      tag: "Conversion Architecture",
      icon: Layers,
      desc: "High-converting landing pages, VSL booking funnels, and CRM qualification workflows designed to turn clicks into booked appointments.",
      features: ["High-Ticket VSL Funnels", "Lead Qualification Engines", "Automated CRM Pipelines", "100% Asset Ownership"],
      color: "bg-amber-500/10 border-amber-300 text-stone-900",
      textColor: "text-stone-950",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      iconColor: "text-amber-700 bg-amber-100",
    },
    {
      title: "Media Buying",
      tag: "Meta & TikTok Ads",
      icon: LineChart,
      desc: "Daily campaign optimization, advantage+ scaling, and algorithmic audience targeting to reliably double your revenue.",
      features: ["Advantage+ Bidding", "Server-Side CAPI Telemetry", "Daily ROAS Optimization", "Written 90-Day Guarantee"],
      color: "bg-purple-50 border-purple-300 text-stone-900",
      textColor: "text-stone-950",
      badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
      iconColor: "text-purple-700 bg-purple-100",
    },
    {
      title: "Trainings",
      tag: "SOPs & Playbooks",
      icon: GraduationCap,
      desc: "Plug-and-play scaling frameworks, ad scripting SOPs, and system training videos to empower your internal growth team.",
      features: ["Hidden Interest Framework", "Shortform Brief Matrices", "Tracking & Pixel SOPs", "Continuous System Upgrades"],
      color: "bg-emerald-50 border-emerald-300 text-stone-900",
      textColor: "text-stone-950",
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      iconColor: "text-emerald-700 bg-emerald-100",
    },
    {
      title: "Mastermind",
      tag: "1:1 Private Operator Growth",
      icon: Crown,
      desc: "Private 1:1 mastermind coaching and direct advisory for agency owners, coaches, and founders scaling past $10k-$100k+/month.",
      features: ["Weekly Strategy Calls", "Direct Systems Audit", "Private Operator Network", "24/7 Slack Support"],
      color: "bg-stone-950 text-white border-stone-800",
      textColor: "text-white",
      badgeColor: "bg-stone-800 text-amber-300 border-stone-700",
      iconColor: "text-amber-400 bg-stone-900",
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
            <span>CORE ACQUISITION SERVICES WE OFFER</span>
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-stone-950 tracking-tight leading-tight uppercase font-hero">
            CORE <span className="font-serif italic lowercase text-purple-700">services.</span>
          </h1>
          <p className="mt-4 text-stone-600 font-medium text-lg sm:text-xl max-w-3xl mx-auto font-sans">
            We build and manage the 5 essential pillars of your client acquisition engine: Creatives Creation, Funnels, Media Buying, Trainings, and Mastermind.
          </p>
        </div>
      </section>

      {/* Services Grid (5 Core Services) */}
      <section className="py-20 px-4 md:px-8 bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`p-8 rounded-3xl border-2 border-stone-950 shadow-xl ${card.color} flex flex-col justify-between hover:border-purple-600 transition-all duration-300`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-mono font-black uppercase tracking-wider px-3.5 py-1 rounded-full border ${card.badgeColor}`}>
                      {card.tag}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-white/20 ${card.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className={`text-2xl sm:text-3xl font-black mt-2 mb-3 font-hero uppercase tracking-tight ${card.textColor}`}>
                    {card.title}
                  </h3>
                  
                  <p className="text-sm font-medium leading-relaxed mb-6 opacity-90">
                    {card.desc}
                  </p>
                  
                  <ul className="flex flex-col gap-2.5 mb-8">
                    {card.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2.5 text-xs font-extrabold tracking-tight">
                        <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/book"
                  className="w-full py-4 rounded-full bg-stone-950 hover:bg-purple-700 text-white font-black text-center text-xs flex items-center justify-center gap-2 transition-colors shadow-lg uppercase tracking-wider active:scale-95"
                >
                  <span>Deploy {card.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
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
