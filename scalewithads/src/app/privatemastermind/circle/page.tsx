import React from "react";
import { FloatingNavbar } from "@/components/redesign/FloatingNavbar";
import { LusionEndSection } from "@/components/redesign/LusionEndSection";
import { EditorialFooter } from "@/components/redesign/EditorialFooter";
import { Crown, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, TrendingUp, BarChart2, Star, AlertTriangle, Play, Zap, RefreshCw, Lock, Award, FileText } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Paid Pilot Trial | 8-Figure Operator Circle | ScaleWithAds",
  description: "90-Day Guaranteed Paid Pilot Trial for agency owners, coaches, and high-ticket service founders.",
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

  const comparisonRows = [
    {
      feature: "Asset Ownership",
      traditional: "Agency owns funnels, ad accounts & CRM lock-ins",
      scalewithads: "100% Asset Ownership (Landing pages, copy & CRM are yours)",
    },
    {
      feature: "Guarantee & Commitment",
      traditional: "6-12 month locked retainers with zero revenue guarantee",
      scalewithads: "Written 90-Day Revenue Guarantee (We double revenue or work free)",
    },
    {
      feature: "Attribution Telemetry",
      traditional: "Basic Meta Pixel with 30-40% lost data post-iOS14",
      scalewithads: "Server-side Meta CAPI integration with 100% accurate data",
    },
    {
      feature: "Creative Output",
      traditional: "2-3 generic template graphics per month",
      scalewithads: "30+ Motion & Direct-Response Hooks + VSL Scripts monthly",
    },
    {
      feature: "CRM & Automation",
      traditional: "Manual follow-ups and unorganized spreadsheet leads",
      scalewithads: "Automated GoHighLevel qualification bot & calendar booking",
    },
  ];

  const onboardingSteps = [
    {
      step: "01",
      title: "Strategy & Audit Deep-Dive",
      desc: "We analyze your current offer, audience targeting, and funnel bottlenecks on a 1:1 onboarding session within 48 hours.",
    },
    {
      step: "02",
      title: "System Build & CAPI Deployment",
      desc: "Our team writes your VSL scripts, builds your custom landing page, and configures server-side Meta CAPI tracking.",
    },
    {
      step: "03",
      title: "Paid Pilot Launch & Scaling",
      desc: "We turn on live campaigns, run daily Advantage+ optimization, and scale your qualified call bookings backed by our written guarantee.",
    },
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

      {/* Hero Header */}
      <section className="pt-16 pb-20 px-4 md:px-8 bg-white text-stone-900 border-b border-stone-200">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full inline-flex items-center gap-2 mb-6">
            <Crown className="w-4 h-4 text-purple-700" />
            <span>PAID PILOT TRIAL · GUARANTEED REVENUE GROWTH</span>
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-stone-950 uppercase font-hero leading-tight">
            Turn Meta Ads into a <span className="font-serif italic lowercase text-purple-700">cash cow machine</span> for any industry.
          </h1>
          <p className="mt-6 text-stone-600 text-base sm:text-xl max-w-3xl mx-auto font-medium leading-relaxed font-sans">
            If your Meta ads aren’t converting at scale, it’s not the offer. It’s how you’re selling it. Test our complete acquisition system risk-free with our 90-day written growth guarantee.
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
              <span>APPLY FOR PAID PILOT TRIAL</span>
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
            Watch Paid Pilot VSL Video
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 font-hero tracking-tight mt-3">
            Watch This Before You Apply for the Paid Pilot
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

      {/* Side-by-Side Comparison Matrix */}
      <section className="py-24 px-4 md:px-8 max-w-6xl mx-auto border-t border-stone-200">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full">
            TRADITIONAL AGENCY VS SCALEWITHADS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-950 font-hero tracking-tight mt-4">
            Why Our Paid Pilot Outperforms Traditional Agencies
          </h2>
        </div>

        <div className="bg-white rounded-3xl border-2 border-stone-950 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 bg-stone-950 text-white p-6 font-hero text-sm uppercase tracking-wider font-extrabold border-b-2 border-stone-950">
            <div className="hidden md:block">Deliverable / Protocol</div>
            <div className="text-rose-400">Traditional Marketing Agencies</div>
            <div className="text-emerald-400">ScaleWithAds Paid Pilot</div>
          </div>

          <div className="divide-y-2 divide-stone-200">
            {comparisonRows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-3 p-6 gap-4 text-sm font-medium">
                <div className="font-extrabold text-stone-950 font-hero flex items-center gap-2">
                  <Zap className="w-4 h-4 text-purple-700" />
                  <span>{row.feature}</span>
                </div>
                <div className="text-stone-600 bg-rose-50/50 p-3 rounded-xl border border-rose-200/60 text-xs">
                  ❌ {row.traditional}
                </div>
                <div className="text-stone-950 bg-emerald-50 p-3 rounded-xl border border-emerald-300 text-xs font-extrabold">
                  ✓ {row.scalewithads}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Step Onboarding Process */}
      <section className="py-24 px-4 md:px-8 max-w-6xl mx-auto border-t border-stone-200">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full">
            HOW THE PAID PILOT WORKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-950 font-hero tracking-tight mt-4">
            3 Steps to Launch Your Client Acquisition Engine
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {onboardingSteps.map((s, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white border-2 border-stone-950 shadow-xl flex flex-col justify-between">
              <div>
                <span className="w-12 h-12 rounded-2xl bg-purple-700 text-white font-mono font-black text-lg flex items-center justify-center mb-6">
                  {s.step}
                </span>
                <h3 className="text-xl font-black text-stone-950 font-hero mb-3">
                  {s.title}
                </h3>
                <p className="text-stone-600 text-sm font-medium leading-relaxed">
                  {s.desc}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-stone-100 flex items-center gap-2 text-xs font-mono font-bold text-purple-700">
                <ShieldCheck className="w-4 h-4" />
                <span>Written Milestone Guaranteed</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Unlock Items */}
      <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto border-t border-stone-200">
        <div className="text-center mb-14">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full">
            INSIDE THIS PILOT
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
              <span>APPLY FOR PAID PILOT TRIAL</span>
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
