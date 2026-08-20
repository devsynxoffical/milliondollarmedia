import React from "react";
import { FloatingNavbar } from "@/components/redesign/FloatingNavbar";
import { LusionEndSection } from "@/components/redesign/LusionEndSection";
import { EditorialFooter } from "@/components/redesign/EditorialFooter";
import { MASTERMIND_FUNNEL } from "@/lib/funnels";
import { Crown, Sparkles, ArrowRight, ShieldCheck, Zap, Users, Trophy, Play, CheckCircle2, TrendingUp, BarChart2, Star, AlertTriangle, HelpCircle, Layers, FileText, Lock, Target, Award, Crosshair } from "lucide-react";
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
    "Full ownership of all landing pages, VSL scripts, CRM pipelines & CAPI setups",
  ];

  const curriculumPillars = [
    {
      number: "01",
      title: "High-Hook Creative & Scripting System",
      icon: Crosshair,
      desc: "Master the 8-part VSL framework and shortform UGC ad script matrix that hook cold prospects within 3 seconds across Meta and TikTok.",
      details: ["30+ Hook Angles Matrix", "Direct-Response Storyboards", "Creator Sourcing SOPs", "Dynamic Angle A/B Testing"],
    },
    {
      number: "02",
      title: "Hidden Interest & Advantage+ Media Buying",
      icon: Target,
      desc: "Uncover un-tapped Facebook interest clusters and train Meta's Advantage+ algorithm to capture high-ticket buyers at 50% lower CPL.",
      details: ["Algorithmic Audience Stacking", "Server-Side CAPI Telemetry", "Budget Scaling Formulas", "Daily ROAS Safeguards"],
    },
    {
      number: "03",
      title: "VSL Booking Funnel & Qualification Engine",
      icon: Layers,
      desc: "Build high-converting landing pages and automated CRM qualification bots that filter out tire-kickers before they touch your calendar.",
      details: ["High-Ticket VSL Architecture", "Automated Lead Scoring", "Instant SMS/Email Nurture", "Cal.com & GoHighLevel Sync"],
    },
    {
      number: "04",
      title: "Client Acquisition Retention & Lifetime Value",
      icon: TrendingUp,
      desc: "Transform one-off ad campaigns into long-term enterprise client assets with continuous creative iteration and written performance SLAs.",
      details: ["Weekly Telemetry Reports", "Creative Fatigue Shields", "Offer Up-sell SOPs", "Written Growth Guarantees"],
    },
  ];

  const targetComparison = [
    {
      type: "WHO THIS IS FOR",
      items: [
        "Agency owners doing $10K+/month wanting to double revenue in 90 days",
        "High-ticket coaches & consultants needing a predictable call booking system",
        "B2B & local service founders tired of unreliable agency retainer fees",
        "Founders who demand 100% ownership of their funnels, copy & ad assets",
      ],
      bg: "bg-emerald-50 border-emerald-300 text-stone-900",
      accent: "text-emerald-700 bg-emerald-100",
    },
    {
      type: "WHO THIS IS NOT FOR",
      items: [
        "Brand new startups making less than $10,000 in monthly revenue",
        "People looking for a 'get rich quick' course with no implementation work",
        "Founders looking to delegate 100% of executive strategy without involvement",
        "Agencies unwilling to install server-side conversion tracking & CAPI",
      ],
      bg: "bg-rose-50 border-rose-300 text-stone-900",
      accent: "text-rose-700 bg-rose-100",
    },
  ];

  const faqs = [
    {
      q: "What makes this Mastermind different from standard ad courses?",
      a: "We don't sell theoretical courses. We audit, build, and co-install a complete live client acquisition system into your business. You get direct 1:1 advisory, custom VSL scripts, and full ownership of every funnel asset.",
    },
    {
      q: "What is the minimum revenue required to qualify?",
      a: "This program is strictly engineered for founders, agency owners, and high-ticket service providers currently generating at least $10,000 per month.",
    },
    {
      q: "Do I own all the ad creatives, funnels, and CRM setups?",
      a: "Yes. 100% of landing pages, CRM pipelines, ad copy, video scripts, and custom automation workflows belong to you. No hidden lock-ins or agency dependence.",
    },
    {
      q: "What is the written 90-day growth guarantee?",
      a: "If we don't double your qualified call bookings or target revenue milestones within 90 days while following our agreed SOP protocol, we continue working for free until we hit the metric.",
    },
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

      {/* Hero Header Section */}
      <section className="pt-16 pb-20 px-4 md:px-8 bg-white text-stone-900 border-b border-stone-200">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full inline-flex items-center gap-2 mb-6 shadow-sm">
            <Crown className="w-4 h-4 text-purple-700" />
            <span>Private Mastermind · Media Agencies + High-Ticket Founders</span>
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-stone-950 uppercase font-hero leading-tight">
            We train media agencies on how to{" "}
            <span className="font-serif italic lowercase text-purple-700">get clients with ads</span>{" "}
            that actually sell.
          </h1>
          <p className="mt-6 text-stone-600 text-base sm:text-xl max-w-3xl mx-auto font-medium leading-relaxed font-sans">
            The Hidden Facebook Interest Framework behind high-ticket sales calls, built from $50M+ Meta spend, 12 years of experience, and million-dollar funnel results across 20+ verticals.
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
            Watch Private 1:1 Mastermind Video
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 font-hero tracking-tight mt-3">
            Watch This Before You Book a Call
          </h2>
          <p className="mt-2 text-stone-600 text-sm font-medium">
            Understand exactly what we install, how it works, and why it doubles revenue in 90 days.
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

      {/* Curriculum Breakdown Grid (4 Core Pillars) */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-stone-200">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full">
            MASTERMIND CURRICULUM ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-950 font-hero tracking-tight mt-4">
            The 4 Core Pillars We Install in Your Business
          </h2>
          <p className="text-stone-600 font-medium text-base mt-2">
            Every module is paired with plug-and-play SOPs, custom scripts, and direct 1:1 advisory implementation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {curriculumPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl border-2 border-stone-950 p-8 shadow-xl hover:border-purple-600 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-mono font-black text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
                      PILLAR {p.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-stone-950 text-white flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-stone-950 font-hero tracking-tight mb-3">
                    {p.title}
                  </h3>

                  <p className="text-stone-600 text-sm font-medium leading-relaxed mb-6">
                    {p.desc}
                  </p>

                  <ul className="grid grid-cols-2 gap-2.5 mb-6">
                    {p.details.map((d, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2 text-xs font-bold text-stone-800 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-stone-400">ScaleWithAds Blueprint #0{idx + 1}</span>
                  <span className="text-xs font-black text-purple-700 uppercase">100% Asset Included</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Target Audience Comparison Grid */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-stone-200">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full">
            QUALIFICATION MATRIX
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-950 font-hero tracking-tight mt-4">
            Is This Private Mastermind Right For You?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {targetComparison.map((col, idx) => (
            <div key={idx} className={`p-8 rounded-3xl border-2 border-stone-950 shadow-xl ${col.bg}`}>
              <div className="flex items-center gap-3 mb-6">
                <span className={`px-4 py-1.5 rounded-full text-xs font-mono font-black uppercase tracking-wider ${col.accent}`}>
                  {col.type}
                </span>
              </div>
              <ul className="space-y-4">
                {col.items.map((item, iIdx) => (
                  <li key={iIdx} className="flex items-start gap-3 text-sm font-extrabold text-stone-950 leading-relaxed">
                    <span className="w-6 h-6 rounded-full bg-stone-950 text-white font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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

      {/* Frequently Asked Questions Accordion */}
      <section className="py-24 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-950 font-hero tracking-tight mt-4">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white border-2 border-stone-950 shadow-lg">
              <h3 className="text-xl font-black text-stone-950 font-hero tracking-tight flex items-center gap-3 mb-3">
                <HelpCircle className="w-5 h-5 text-purple-700 shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-stone-600 text-base font-medium leading-relaxed pl-8">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <LusionEndSection />
      <EditorialFooter />
    </main>
  );
}
