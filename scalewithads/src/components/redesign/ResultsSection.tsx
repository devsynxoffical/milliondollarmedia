"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, TrendingUp, Play, DollarSign, Award, Star } from "lucide-react";

export function ResultsSection() {
  const caseStudies = [
    {
      client: "B2B Agency Founder",
      revenue: "$142,000 / mo",
      growth: "+210% Revenue",
      tag: "Meta Ads + CRM AI",
      metric: "4.9x ROAS",
    },
    {
      client: "High-Ticket Business Coach",
      revenue: "$89,500 / mo",
      growth: "+180% Revenue",
      tag: "Funnel + Lead Qualification",
      metric: "5.2x ROAS",
    },
    {
      client: "Commercial Roofing Client",
      revenue: "$260,000 / mo",
      growth: "+340% Lead Value",
      tag: "DFY System",
      metric: "6.1x ROAS",
    },
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-[#FDFBF7] text-stone-900 border-b border-stone-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-700 bg-purple-100 px-3.5 py-1.5 rounded-full inline-block mb-4">
            Proven Track Record
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-black leading-tight">
            Don&apos;t Take Our Word For It... <br className="hidden sm:inline" />
            <span className="text-purple-700">See What Our Clients Have Achieved.</span>
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg font-medium">
            Real revenue dashboards, verified Meta Ads ROI, and client case studies.
          </p>
        </div>

        {/* Case Study Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {caseStudies.map((cs, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-stone-200 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-900">
                    {cs.tag}
                  </span>
                  <div className="flex items-center text-amber-500 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <h3 className="text-lg font-extrabold text-stone-950 mb-1">
                  {cs.client}
                </h3>
                <div className="text-3xl font-black text-purple-700 font-mono mb-2">
                  {cs.revenue}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 mb-6">
                  <TrendingUp className="w-4 h-4" />
                  <span>{cs.growth} in 90 days</span>
                </div>

                {/* Dashboard Screenshot Mockup */}
                <div className="w-full h-36 bg-stone-900 rounded-xl p-3 flex flex-col justify-between border border-stone-800 font-mono text-white text-xs relative">
                  <div className="flex items-center justify-between text-[10px] text-stone-400">
                    <span>Meta Ads Dashboard</span>
                    <span className="text-emerald-400 font-bold">LIVE TELEMETRY</span>
                  </div>
                  <div className="space-y-1 my-auto">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-stone-400">ROAS:</span>
                      <span className="font-bold text-purple-300">{cs.metric}</span>
                    </div>
                    <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full w-4/5 rounded-full" />
                    </div>
                  </div>
                  <div className="text-[9px] text-stone-500 text-right">Verified Written Guarantee</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div className="text-center">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1D1435] hover:bg-[#2C1D50] text-white font-bold text-base transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            <span>BOOK YOUR FREE STRATEGY CALL</span>
            <ArrowRight className="w-5 h-5 text-purple-300" />
          </Link>
        </div>

      </div>
    </section>
  );
}
