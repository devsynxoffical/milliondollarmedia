import React from "react";
import { FloatingNavbar } from "@/components/redesign/FloatingNavbar";
import { LusionEndSection } from "@/components/redesign/LusionEndSection";
import { EditorialFooter } from "@/components/redesign/EditorialFooter";
import { BookOpen, ArrowRight, ShieldCheck, Download, Sparkles, CheckCircle2, AlertTriangle, Play, TrendingUp, DollarSign, Layers, Clock, Cpu } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "How We Scaled an LTO Funnel to $847K | ScaleWithAds Playbook",
  description: "Plug-and-play Meta Ads SOPs, VSL scripts, and $847K LTO funnel scaling case study.",
};

export default function PlaybooksPage() {
  const stats = [
    { value: "$847K", label: "Client Revenue" },
    { value: "3.32x", label: "Average ROAS" },
    { value: "$255K", label: "Tracked Spend" },
    { value: "13,630+", label: "LTO Offers Sold" },
  ];

  const caseTimeline = [
    {
      phase: "Phase 1: Creative & Offer Testing",
      time: "Days 1 – 15",
      desc: "Deployed 14 hook variations with a $27 low-ticket frontend offer, establishing a baseline 2.1x ROAS on cold traffic.",
    },
    {
      phase: "Phase 2: CAPI & Funnel Optimization",
      time: "Days 16 – 45",
      desc: "Integrated server-side Meta Conversions API (CAPI) and 1-click upsells, increasing average order value (AOV) by 64%.",
    },
    {
      phase: "Phase 3: Advantage+ Audience Scaling",
      time: "Days 46 – 75",
      desc: "Scaled daily ad spend from $1,500/day to $6,000/day across un-tapped interest clusters while maintaining a 3.32x ROAS.",
    },
    {
      phase: "Phase 4: High-Ticket Backend Conversion",
      time: "Days 76 – 90",
      desc: "Automated GoHighLevel CRM SMS follow-ups, booking 180+ qualified high-ticket consultations directly from frontend buyers.",
    },
  ];

  const playbooks = [
    {
      title: "Meta Ads VSL Scripting & Offer Formula",
      type: "Creative Copy",
      desc: "How to structure 8-part VSLs that sell high-ticket offers without burning ad budget across any industry.",
    },
    {
      title: "Hidden Facebook Interest Targeting SOP",
      type: "Media Buying",
      desc: "Uncovering high-intent audience segments that drop CPL and double call booking volume.",
    },
    {
      title: "TikTok & Meta UGC Creator Brief Matrix",
      type: "Creative SOP",
      desc: "Standard operating procedure for sourcing, scripting, and directing high-converting shortform video ads.",
    },
    {
      title: "Server-Side CAPI Technical Integration",
      type: "Technical SOP",
      desc: "Developer-level tracking scripts that feed 100% accurate conversion telemetry back to ad algorithms.",
    },
    {
      title: "1-Click Upsell & Order Bump Blueprint",
      type: "Funnel Architecture",
      desc: "Step-by-step layout for multiplying customer lifetime value on the immediate post-purchase page.",
    },
    {
      title: "Automated CRM Lead Qualification Bot",
      type: "Automation SOP",
      desc: "Custom GoHighLevel workflows that score leads and auto-book calendar slots with zero manual sales effort.",
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
            ⚠️ THIS CASE STUDY SHOWS THE EXACT $847K LTO SCALING ARCHITECTURE.
          </span>
          <span className="text-emerald-400 font-bold">
            ⚡ CLICK TO BOOK YOUR FREE STRATEGY CALL — LIMITED SPOTS AVAILABLE.
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="pt-16 pb-20 px-4 md:px-8 bg-white border-b border-stone-200">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full inline-flex items-center gap-2 mb-6">
            <BookOpen className="w-4 h-4 text-purple-700" />
            <span>PROPRIETARY $847K SCALING CASE STUDY & SOPS</span>
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-stone-950 tracking-tight uppercase font-hero leading-tight">
            How We Scaled an LTO Funnel to <span className="font-serif italic lowercase text-purple-700">$847K in Revenue.</span>
          </h1>
          <p className="mt-4 text-stone-600 text-base sm:text-xl max-w-3xl mx-auto font-medium">
            $255K tracked Meta ad spend generating nearly $1M in sales and 13,630+ offers sold using direct-response Meta Ads & VSL architecture.
          </p>

          {/* Stats Bar */}
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s, idx) => (
              <div key={idx} className="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-center shadow-sm">
                <p className="text-3xl font-black text-purple-700 font-mono">{s.value}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-stone-500 font-mono">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-stone-950 hover:bg-purple-700 text-white font-bold text-sm uppercase tracking-wider transition-colors shadow-xl"
            >
              <span>Get Instant Playbook Access</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mastermind VSL Video Section */}
      <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto text-center">
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 border border-purple-200 px-4 py-1.5 text-xs font-mono font-bold text-purple-700 uppercase tracking-widest">
            <Play className="w-3.5 h-3.5 fill-current" />
            Watch Complete $847K Breakdown Video
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 font-hero tracking-tight mt-3">
            How We Scaled an LTO Funnel to $847K in Revenue | $255K Ad Spend Nearly $1M in Sales Using Meta Ads
          </h2>
        </div>

        <div className="relative rounded-3xl overflow-hidden border-4 border-stone-950 shadow-2xl bg-black aspect-video">
          <video
            src="https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/695da2543a532d67105ad96c.mp4"
            poster="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/695d947da88e874feacb84ad.png"
            controls
            autoPlay
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Case Study Timeline */}
      <section className="py-24 px-4 md:px-8 max-w-6xl mx-auto border-t border-stone-200">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full">
            90-DAY SCALING ROADMAP
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-950 font-hero tracking-tight mt-4">
            How We Achieved $847K Step-by-Step
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseTimeline.map((item, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white border-2 border-stone-950 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
                    {item.time}
                  </span>
                  <Clock className="w-4 h-4 text-stone-400" />
                </div>
                <h3 className="text-xl font-black text-stone-950 font-hero mb-2">
                  {item.phase}
                </h3>
                <p className="text-stone-600 text-sm font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Playbooks Grid */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-stone-200">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full">
            INCLUDED SOP LIBRARY
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-950 font-hero tracking-tight mt-4">
            Downloadable SOPs & Systems
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {playbooks.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border-2 border-stone-950 p-8 shadow-xl hover:border-purple-600 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-100 border border-purple-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-4">
                  {p.type}
                </span>
                <h3 className="text-2xl font-extrabold text-stone-950 font-hero tracking-tight mb-3">
                  {p.title}
                </h3>
                <p className="text-stone-600 text-sm font-medium leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-stone-500">Blueprint #0{idx + 1}</span>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-1.5 font-bold text-xs uppercase text-purple-700 hover:text-purple-950 transition-colors"
                >
                  <span>Download SOP</span>
                  <Download className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <LusionEndSection />
      <EditorialFooter />
    </main>
  );
}
