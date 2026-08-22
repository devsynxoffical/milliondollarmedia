import React from "react";
import { FloatingNavbar } from "@/components/redesign/FloatingNavbar";
import { ResultsSection } from "@/components/redesign/ResultsSection";
import { SelectedWorkShowcase } from "@/components/redesign/SelectedWorkShowcase";
import { ClientTestimonialsSection } from "@/components/redesign/ClientTestimonialsSection";
import { LusionEndSection } from "@/components/redesign/LusionEndSection";
import { EditorialFooter } from "@/components/redesign/EditorialFooter";
import { Crown, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, TrendingUp, BarChart2, Star, AlertTriangle, Play, Zap, RefreshCw, Lock, Award, FileText } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Paid Pilot Trial | 8-Figure Operator Circle | ScaleWithAds",
  description: "90-Day Guaranteed Paid Pilot Trial for agency owners, coaches, and high-ticket service founders.",
};

export default function PaidPilotPage() {
  const stats = [
    { value: "$50M+", label: "Meta Ads Spent" },
    { value: "12 YRS", label: "Experience" },
    { value: "30+", label: "Niches" },
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

  const faqs = [
    {
      q: "What exactly is included in the 90-day private mastermind?",
      a: "You’ll get one private 1-on-1 strategy call every week, plus 24/7 access to us for questions and support throughout the program. There is no artificial time limit on your weekly calls — we stay on until your questions are answered and you have clarity on your next steps. You’ll also get recordings of every session so you can revisit the strategies and training whenever you need.",
    },
    {
      q: "What will I learn during the 90 days?",
      a: "We’ll work with you directly on the areas that drive growth, including ad copy creation, high-converting creatives, hyper-targeted audience segmentation, testing frameworks, scaling strategies, lead qualification systems, and email & SMS automations. The goal is to help you build a repeatable system you can use long after the mastermind ends.",
    },
    {
      q: "What if I don’t double my revenue in 90 days?",
      a: "We stand behind the program with our 90-Day Double Revenue Guarantee. If you follow the strategies, implement the work, and don’t double your revenue within the 90-day period, we’ll continue working with you for free until you do.",
    },
    {
      q: "Is there a refund policy?",
      a: "There are no refunds for the mastermind. This is a hands-on, personalized program where we commit our time, expertise, and resources directly to your business. The 90-Day Double Revenue Guarantee is designed to give you confidence in the outcome while keeping the focus on implementation and results.",
    },
    {
      q: "Will I get recordings of the 1-on-1 sessions?",
      a: "Yes. Every session is recorded. You’ll have access to the recordings so you can review the strategies, revisit specific recommendations, and make sure nothing gets missed between sessions.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans selection:bg-purple-200 selection:text-purple-950">
      <FloatingNavbar />

      {/* Hero Header Section */}
      <section className="pt-28 sm:pt-36 pb-16 px-4 md:px-8 bg-white text-stone-900 overflow-hidden border-b border-stone-200 relative">
        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-purple-200/40 via-purple-100/20 to-amber-100/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 text-purple-900 font-extrabold text-xs tracking-widest uppercase mb-6 shadow-sm">
            <Crown className="w-4 h-4 text-purple-700" />
            <span>PAID PILOT TRIAL</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-stone-950 uppercase font-hero leading-tight select-none">
            Start With a <span className="animate-purple-gradient font-hero tracking-tight">7-Day Paid Pilot</span> <br className="hidden sm:inline" />
            & See the Results Before You Commit
          </h1>

          {/* Subtext */}
          <p className="mt-4 text-base sm:text-lg font-medium text-stone-700 max-w-2xl mx-auto leading-relaxed font-sans">
            Experience our full ad management, creative testing, and optimization for 7 days. See the momentum for yourself, then decide whether you want to continue.
          </p>

          {/* Stats Grid (3 Items) */}
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {stats.map((s, idx) => (
              <div key={idx} className="rounded-2xl border-2 border-stone-950 bg-stone-50 p-4 text-center shadow-sm hover:border-purple-600 transition-colors">
                <p className="text-3xl font-black text-purple-700 font-mono">{s.value}</p>
                <p className="mt-1 text-[10px] font-extrabold uppercase tracking-wider text-stone-600 font-mono">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mastermind VSL Video Player Section */}
      <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto text-center">
        {/* Direct VSL Video Frame (No Poster Cover Image) */}
        <div className="relative rounded-3xl overflow-hidden border-4 border-stone-950 shadow-[0_25px_70px_rgba(147,51,234,0.3)] bg-black aspect-video">
          <video
            src="https://assets.cdn.filesafe.space/W8B8H8FvOolLCrvxXzYp/media/69ef9443717d5dd4e170f445.mp4"
            controls
            autoPlay
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Big BOOK YOUR CALL Button Below VSL */}
        <div className="mt-10 sm:mt-14 flex flex-col items-center justify-center">
          <Link
            href="/book"
            className="w-full sm:w-auto px-12 py-5 sm:px-16 sm:py-6 text-xl sm:text-2xl font-black rounded-full bg-stone-950 hover:bg-purple-700 text-white shadow-[0_20px_50px_rgba(147,51,234,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-purple-500/40 inline-flex items-center justify-center gap-3 tracking-wider uppercase"
          >
            <span>BOOK YOUR CALL</span>
            <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
          </Link>
          <span className="mt-3.5 text-xs font-mono font-bold text-stone-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>100% Free Strategy Session • Limited Weekly Spots</span>
          </span>
        </div>
      </section>

      {/* Side-by-Side Comparison Matrix */}
      <section className="py-24 px-4 md:px-8 max-w-6xl mx-auto border-t border-stone-200">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full inline-flex items-center gap-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>TRADITIONAL AGENCY VS SCALEWITHADS</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-950 font-hero tracking-tight mt-4 uppercase leading-tight">
            Why Our Paid Pilot Outperforms <br />
            <span className="animate-purple-gradient font-hero tracking-tight">TRADITIONAL AGENCIES</span>
          </h2>
        </div>

        <div className="bg-white rounded-3xl border-2 border-stone-950 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 bg-stone-950 text-white p-6 font-hero text-xs sm:text-sm uppercase tracking-wider font-black border-b-2 border-stone-950">
            <div className="hidden md:block font-mono text-stone-400">DELIVERABLE / PROTOCOL</div>
            <div className="text-rose-400 font-mono flex items-center gap-2">✕ TRADITIONAL AGENCIES</div>
            <div className="text-emerald-400 font-mono flex items-center gap-2">✓ SCALEWITHADS PAID PILOT</div>
          </div>

          <div className="divide-y-2 divide-stone-100">
            {comparisonRows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-3 p-6 gap-4 text-sm font-medium items-center">
                <div className="font-black text-stone-950 font-hero text-sm sm:text-base flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 border border-purple-200">
                    <Zap className="w-4 h-4" />
                  </div>
                  <span>{row.feature}</span>
                </div>
                <div className="text-stone-900 bg-rose-50/80 p-4 rounded-2xl border border-rose-200 text-xs sm:text-sm font-sans font-bold flex items-start gap-2.5 leading-relaxed">
                  <span className="text-rose-600 font-black shrink-0">✕</span>
                  <span>{row.traditional}</span>
                </div>
                <div className="text-stone-950 bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-300 text-xs sm:text-sm font-sans font-extrabold flex items-start gap-2.5 shadow-sm leading-relaxed">
                  <span className="text-emerald-600 font-black shrink-0">✓</span>
                  <span>{row.scalewithads}</span>
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
          <p className="text-stone-600 text-sm font-medium leading-relaxed max-w-2xl mx-auto font-sans">
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

      {/* Proven Track Record Section */}
      <ResultsSection />

      {/* System Training Library Section (Home Page Component) */}
      <SelectedWorkShowcase />

      {/* Verified Client Video Testimonials Section */}
      <ClientTestimonialsSection />

      {/* Frequently Asked Questions Accordion */}
      <section className="py-24 px-4 md:px-8 max-w-5xl mx-auto border-t border-stone-200">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full inline-flex items-center gap-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-950 font-hero tracking-tight mt-4 uppercase leading-tight">
            Everything You Need to <span className="animate-purple-gradient font-hero tracking-tight">KNOW</span>
          </h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white border-2 border-stone-950 shadow-xl hover:border-purple-600 transition-colors">
              <h3 className="text-xl font-black text-stone-950 font-hero tracking-tight flex items-center gap-3 mb-3">
                <Sparkles className="w-5 h-5 text-purple-700 shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-stone-600 text-base font-medium leading-relaxed font-sans pl-8">
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
