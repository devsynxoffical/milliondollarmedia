import React from "react";
import { FloatingNavbar } from "@/components/redesign/FloatingNavbar";
import { LusionEndSection } from "@/components/redesign/LusionEndSection";
import { EditorialFooter } from "@/components/redesign/EditorialFooter";
import { Crown, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, TrendingUp, BarChart2, Star, AlertTriangle, Play } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "LTO Meta Ads VSL | 8-Figure Operator Circle | ScaleWithAds",
  description: "Turn Meta Ads into a cash cow machine for any industry. Exclusive network for 8-figure brand founders and high-level DTC operators.",
};

export default function OperatorCirclePage() {
  const stats = [
    { value: "$847K", label: "Client Revenue" },
    { value: "3.32x", label: "Average ROAS" },
    { value: "$50M+", label: "Meta Spend (Us)" },
    { value: "12 YRS", label: "Experience" },
  ];

  const learnItems = [
    "How to sell offers on Meta without burning budget",
    "Creative + offer angles that drive ROAS across industries",
    "How media agencies package ads that sell to win clients",
    "Frameworks from $50M+ Meta spend and 12 years of installs",
    "$10K minimum · We double your revenue in 90 days · Everything is written in the agreement",
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans selection:bg-purple-200 selection:text-purple-950">
      <FloatingNavbar />

      {/* Top Warning Banner */}
      <div className="pt-24 bg-[#1D1435] text-purple-200 text-xs font-mono py-2.5 px-4 overflow-hidden border-b border-purple-900 select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          <span className="flex items-center gap-2 text-amber-300 font-bold">
            <AlertTriangle className="w-3.5 h-3.5" />
            ⚠️ THIS IS ONLY FOR AGENCY OWNERS, COACHES, HIGH-TICKET SERVICE PROVIDERS & B2B FOUNDERS ALREADY GENERATING $10,000+/MONTH.
          </span>
          <span className="text-emerald-400 font-bold">
            ⚡ CLICK TO BOOK YOUR FREE STRATEGY CALL — LIMITED SPOTS AVAILABLE.
          </span>
        </div>
      </div>

      {/* Hero Header (Homepage Light Theme) */}
      <section className="pt-16 pb-20 px-4 md:px-8 bg-white text-stone-900 border-b border-stone-200">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full inline-flex items-center gap-2 mb-6">
            <Crown className="w-4 h-4 text-purple-700" />
            <span>LTO Meta Ads VSL · Ads That Sell</span>
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-stone-950 uppercase font-hero leading-tight">
            Turn Meta Ads into a <span className="font-serif italic lowercase text-purple-700">cash cow machine</span> for any industry.
          </h1>
          <p className="mt-6 text-stone-600 text-base sm:text-xl max-w-3xl mx-auto font-medium leading-relaxed font-sans">
            If your Meta ads aren’t converting at scale, it’s not the offer. It’s how you’re selling it. We teach the ads system behind million-dollar funnels across countless verticals.
          </p>

          {/* Stats Grid */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s, idx) => (
              <div key={idx} className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-center shadow-sm">
                <p className="text-3xl font-black text-purple-700 font-mono">{s.value}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-stone-950 hover:bg-purple-700 text-white font-black text-sm uppercase tracking-wider transition-all shadow-xl active:scale-95"
            >
              <span>SHOW ME THE TRAINING</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#EAE0FF] hover:bg-purple-200 text-purple-950 font-black text-sm uppercase tracking-wider border-2 border-stone-950 transition-all active:scale-95"
            >
              <span>BOOK A STRATEGY CALL →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Mastermind VSL Video Player */}
      <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto text-center">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 border border-purple-200 px-4 py-1.5 text-xs font-mono font-bold text-purple-700 uppercase tracking-widest">
            <Play className="w-3.5 h-3.5 fill-current" />
            Watch Private 1:1 Mastermind Video
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 font-hero tracking-tight mt-3">
            Watch This Before You Book a Call
          </h2>
        </div>

        <div className="relative rounded-3xl overflow-hidden border-4 border-stone-950 shadow-2xl bg-black aspect-video">
          <video
            src="https://assets.cdn.filesafe.space/W8B8H8FvOolLCrvxXzYp/media/69ef9443717d5dd4e170f445.mp4"
            poster="/media/covers/cover-mastermind.jpeg"
            controls
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Unlock Items */}
      <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto border-t border-stone-200">
        <div className="text-center mb-14">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full">
            INSIDE THIS TRAINING
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-950 font-hero tracking-tight mt-3">
            What This Meta Training Unlocks
          </h2>
        </div>

        <div className="space-y-4">
          {learnItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border-2 border-stone-950 shadow-lg flex items-start gap-4 text-stone-900"
            >
              <span className="w-10 h-10 rounded-xl bg-purple-700 text-white font-mono font-black text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                0{idx + 1}
              </span>
              <p className="pt-1.5 text-base sm:text-lg font-extrabold font-sans text-stone-950 leading-relaxed">
                {item}
              </p>
            </div>
          ))}
        </div>

        {/* Track record box */}
        <div className="mt-14 p-8 rounded-3xl bg-white border-2 border-stone-950 shadow-xl text-center">
          <span className="text-xs font-mono font-bold text-stone-400 uppercase tracking-widest block mb-2">TRACK RECORD</span>
          <h3 className="text-2xl font-black text-stone-950 font-hero mb-3">Real Meta scale. Real awards. Real brands.</h3>
          <p className="text-stone-600 text-sm font-medium leading-relaxed max-w-2xl mx-auto">
            Two Comma Club Winner. ClickFunnels Awards. Client proof like $847K revenue on $255K tracked spend at 3.32 ROAS, and 13,630 LTO offers sold. This is ads that sell.
          </p>

          <div className="mt-8">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-stone-950 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-wider transition-colors shadow-lg"
            >
              <span>SHOW ME THE TRAINING</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <LusionEndSection />
      <EditorialFooter />
    </main>
  );
}
