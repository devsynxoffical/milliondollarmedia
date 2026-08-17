import type { Metadata } from "next";
import { FloatingNavbar } from "@/components/redesign/FloatingNavbar";
import { LusionEndSection } from "@/components/redesign/LusionEndSection";
import { EditorialFooter } from "@/components/redesign/EditorialFooter";
import { adShorts } from "@/lib/ads";
import { Play, Film, Flame, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shorts & Videos Library | ScaleWithAds",
  description:
    "Explore high-converting VSLs, TikTok UGC cuts, and performance motion ad examples engineered by ScaleWithAds.",
};

export default function MediaLibraryPage() {
  const creativePillars = [
    {
      num: "01",
      title: "First 3-Second Pattern Interrupt",
      desc: "We test 20+ visual & audio hooks per campaign to stop the scroll instantly and boost view-through rate by 300%.",
    },
    {
      num: "02",
      title: "Psychological Problem-Agitation",
      desc: "Engaging narrative scripts that highlight key pain points without triggering ad fatigue or policy flags.",
    },
    {
      num: "03",
      title: "Unapologetic Proof & Case Studies",
      desc: "On-screen revenue telemetry, real customer testimonials, and direct social proof overlays.",
    },
    {
      num: "04",
      title: "Irresistible CTA & Micro-Funnels",
      desc: "Directing high-intent traffic to customized pre-sell landers built for instant checkout conversion.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans selection:bg-purple-200 selection:text-purple-950">
      <FloatingNavbar />

      {/* Page Header Hero */}
      <section className="pt-36 sm:pt-44 pb-16 px-4 md:px-8 max-w-7xl mx-auto text-center border-b border-stone-200">
        <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full inline-flex items-center gap-2 mb-6">
          <Film className="w-3.5 h-3.5 text-purple-700" />
          <span>AUTOPLAYING SHORTS & CREATIVE REELS</span>
        </span>
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight uppercase font-hero text-stone-950 leading-none">
          SHORTS & <span className="font-serif italic lowercase text-purple-700">reels.</span>
        </h1>
        <p className="mt-4 text-stone-600 text-base sm:text-lg max-w-2xl mx-auto font-medium">
          Live autoplaying shortform ad creatives, VSLs, and TikTok UGC cuts engineered to generate high-ROAS returns across 20+ industries.
        </p>
      </section>

      {/* Auto-Playing Shorts Grid (Using All 16 Real Reels from /media/library/million-dollar-media/shorts/) */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-mono font-bold text-rose-600 uppercase tracking-widest">
                LIVE AUTOPLAYING AD CREATIVES ({adShorts.length} REELS)
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-950 font-hero">
              Active Shortform Campaign Vault
            </h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-950 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
          >
            <span>Order DFY Video Ads</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {adShorts.map((item, idx) => (
            <div
              key={item.id || idx}
              className="group relative rounded-3xl overflow-hidden border-2 border-stone-950 bg-stone-900 aspect-[9/16] flex flex-col justify-between p-5 cursor-pointer hover:border-purple-600 transition-all shadow-xl"
            >
              {/* Autoplay Video Loop */}
              <video
                src={item.src}
                poster={item.poster}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between pointer-events-none">
                <span className="text-xs font-mono font-black px-2.5 py-1 rounded-full bg-purple-700 text-white shadow-md">
                  {item.label}
                </span>
                <span className="text-[10px] font-mono font-bold text-white bg-black/60 px-2.5 py-1 rounded-full border border-white/20">
                  AUTO REEL #{idx + 1}
                </span>
              </div>

              <div className="relative z-10 text-left pointer-events-none">
                <h3 className="font-extrabold text-base text-white tracking-tight font-hero leading-tight">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Creative New Lower Section: "Ad Anatomy & Hook Strategy" */}
      <section className="py-24 px-4 md:px-8 bg-stone-950 text-white border-t border-b border-stone-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/30 px-4 py-2 rounded-full inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>THE SCALEWITHADS CREATIVE ARCHITECTURE</span>
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-white uppercase font-hero tracking-tight">
              Anatomy of a <span className="font-serif italic lowercase text-purple-400">viral ad.</span>
            </h2>
            <p className="text-stone-400 text-sm sm:text-base font-medium mt-3">
              Why our shortform ad creatives consistently outperform generic agency video edits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {creativePillars.map((p, idx) => (
              <div
                key={idx}
                className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 flex flex-col justify-between hover:border-purple-500 transition-colors shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-purple-400 font-hero">
                      {p.num}
                    </span>
                    <CheckCircle2 className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-extrabold text-white font-hero tracking-tight mb-2">
                    {p.title}
                  </h3>
                  <p className="text-stone-400 text-xs font-medium leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-purple-950/80 via-stone-900 to-stone-950 border border-purple-800/50 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-white font-hero">
                Ready to Launch High-ROAS Shortform Ads?
              </h3>
              <p className="text-stone-400 text-xs font-medium mt-1">
                Our creative lab produces 20+ script-to-rendered UGC & VSL variations every 5 business days.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-purple-600/30 whitespace-nowrap"
            >
              <span>Book Strategy Call</span>
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
