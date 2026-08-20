import React from "react";
import { FloatingNavbar } from "@/components/redesign/FloatingNavbar";
import { LusionEndSection } from "@/components/redesign/LusionEndSection";
import { EditorialFooter } from "@/components/redesign/EditorialFooter";
import { MASTERMIND_FUNNEL } from "@/lib/funnels";
import { Crown, Sparkles, ArrowRight, ShieldCheck, Zap, Users, Trophy, Play, CheckCircle2, TrendingUp, BarChart2, Star, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: MASTERMIND_FUNNEL.metaTitle,
  description: MASTERMIND_FUNNEL.metaDescription,
};

export default function PrivateMastermindPage() {
  const stats = [
    { value: "$50M+", label: "Meta Ads Spent" },
    { value: "12 YRS", label: "Experience" },
    { value: "$10K+", label: "Monthly Minimum" },
    { value: "90 DAYS", label: "Revenue Target" },
  ];

  const learnItems = [
    "How to win clients by selling ads outcomes, not busywork",
    "Hidden Facebook interests that drop CPL and raise call volume",
    "How to position done-for-you ads across any industry",
    "Funnel + offer angles pulled from million-dollar testimonials",
    "The same standards behind Two Comma Club + ClickFunnels Awards work",
  ];

  const proofMetrics = [
    { value: "$847K", label: "Revenue Tracked" },
    { value: "3.32x", label: "Average ROAS" },
    { value: "13,630+", label: "LTO Offers Sold" },
    { value: "90 Days", label: "Revenue Target" },
  ];

  const testimonials = [
    {
      name: "Jason R.",
      role: "Agency Owner, 7-Figure",
      body: "Completely changed how I run ads. Booked 18 calls in the first 3 weeks after implementing the framework.",
      stars: 5,
    },
    {
      name: "Maria T.",
      role: "Health Coach, 6-Figure",
      body: "The CRM automations alone saved us 20 hours a week. Our close rate went from 18% to 41% in 60 days.",
      stars: 5,
    },
    {
      name: "Devon K.",
      role: "SaaS Founder",
      body: "I've worked with 4 agencies before Scale With Ads. Nobody comes close to the level of system they install.",
      stars: 5,
    },
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans selection:bg-purple-200 selection:text-purple-950">
      <FloatingNavbar />

      {/* Top Ticker Warning Banner */}
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

      {/* Hero Header Section (Homepage Light Cream Theme) */}
      <section className="pt-16 pb-20 px-4 md:px-8 bg-white text-stone-900 border-b border-stone-200">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full inline-flex items-center gap-2 mb-6">
            <Crown className="w-4 h-4 text-purple-700" />
            <span>Private Mastermind · Media Agencies + Operators</span>
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-stone-950 uppercase font-hero leading-tight">
            We train media agencies on how to{" "}
            <span className="font-serif italic lowercase text-purple-700">get clients with ads</span>{" "}
            that actually sell.
          </h1>
          <p className="mt-6 text-stone-600 text-base sm:text-xl max-w-3xl mx-auto font-medium leading-relaxed font-sans">
            The Hidden Facebook Interest Framework behind high-ticket sales calls, built from $50M+ Meta spend, 12 years of experience, and million-dollar funnel results across countless verticals.
          </p>

          {/* Stats Bar */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-center shadow-sm"
              >
                <p className="text-3xl font-black text-purple-700 font-mono">
                  {s.value}
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-9 py-4.5 rounded-full bg-stone-950 hover:bg-purple-700 text-white font-black text-sm uppercase tracking-wider transition-all shadow-xl active:scale-95"
            >
              <span>BUILD MY CLIENT-GETTING MACHINE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-xs text-stone-500 font-mono">
              Book your free 1:1 call now · 100% Asset Ownership · Written Agreement · No Lock-ins
            </span>
          </div>
        </div>
      </section>

      {/* Mastermind Video Player Section (Official VSL Video) */}
      <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto text-center">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 border border-purple-200 px-4 py-1.5 text-xs font-mono font-bold text-purple-700 uppercase tracking-widest">
            <Play className="w-3.5 h-3.5 fill-current" />
            Watch Private 1:1 Mastermind
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 font-hero tracking-tight mt-3">
            Watch This Before You Book a Call
          </h2>
          <p className="mt-2 text-stone-600 text-sm font-medium">
            Understand exactly what we install, how it works, and why it doubles revenue.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden border-4 border-stone-950 shadow-2xl bg-black aspect-video">
          <iframe
            src="https://www.youtube.com/embed/oSMaA6LOnrQ?autoplay=0&rel=0&modestbranding=1"
            title="Private 1:1 Mastermind"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        <div className="mt-8">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-stone-950 hover:bg-purple-700 text-white font-black text-xs uppercase tracking-wider transition-colors shadow-xl"
          >
            <span>TRAIN MY AGENCY</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Inside This System Section */}
      <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto border-t border-stone-200">
        <div className="text-center mb-14">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full">
            INSIDE THIS SYSTEM
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-950 font-hero tracking-tight mt-3">
            What Agencies Learn in This Mastermind
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
      </section>

      {/* Real Campaigns & Proof Numbers */}
      <section className="py-24 px-4 md:px-8 bg-stone-950 text-white border-t border-b border-stone-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/30 px-4 py-2 rounded-full">
              REAL CAMPAIGNS. REAL NUMBERS.
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-white font-hero tracking-tight mt-3">
              Campaign Results & Proof
            </h2>
            <p className="text-stone-400 text-sm font-medium mt-2">
              Every number you see is pulled directly from live ad accounts and CRM dashboards.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
            {proofMetrics.map((pm, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-stone-900 border border-stone-800 text-center">
                <p className="text-3xl font-black text-amber-400 font-mono">{pm.value}</p>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400 font-mono mt-1">{pm.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid gap-6 md:grid-cols-3 mb-16">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-stone-900 rounded-3xl border border-stone-800 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-stone-300 text-sm leading-relaxed italic">
                    &ldquo;{t.body}&rdquo;
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-800">
                  <p className="text-base font-extrabold text-white font-hero">{t.name}</p>
                  <p className="text-xs text-amber-400 font-mono">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Track Record Text Box */}
          <div className="p-8 rounded-3xl bg-stone-900 border border-stone-800 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-black text-white font-hero mb-2">
              Built for agencies. Proven across verticals.
            </h3>
            <p className="text-stone-400 text-sm font-medium leading-relaxed">
              If you run a media agency, this recording shows how to get clients and keep them, with ads systems that sell in countless industries, not one template niche. Two Comma Club Winner. ClickFunnels Awards.
            </p>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs uppercase tracking-wider transition-colors shadow-xl"
            >
              <span>BUILD MY CLIENT-GETTING MACHINE</span>
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
