"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  Target,
  PenTool,
  Layout,
  Megaphone,
  Bot,
  Filter,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Market Research & Customer Analysis",
      desc: "We identify exactly who your ideal clients are and what makes them buy.",
      icon: Search,
    },
    {
      number: "02",
      title: "Offer Positioning",
      desc: "We package and position your service so it stands out from competitors.",
      icon: Target,
    },
    {
      number: "03",
      title: "Messaging & Creative Development",
      desc: "We create ad copy and creatives that attract premium buyers.",
      icon: PenTool,
    },
    {
      number: "04",
      title: "Landing Pages & Sales Funnel",
      desc: "We build high-converting landing pages and funnels designed to convert traffic into booked appointments.",
      icon: Layout,
    },
    {
      number: "05",
      title: "Meta Ads Management",
      desc: "We launch, manage, and optimise your campaigns daily.",
      icon: Megaphone,
    },
    {
      number: "06",
      title: "CRM & AI Automations",
      desc: "Every lead automatically enters your CRM with automated email, SMS, reminders, and follow-up.",
      icon: Bot,
    },
    {
      number: "07",
      title: "Lead Qualification",
      desc: "Our proprietary multi-validation process filters leads before they reach your calendar, improving booking and show-up rates.",
      icon: Filter,
    },
    {
      number: "08",
      title: "Close Premium Clients",
      desc: "You simply attend the appointments and close the deals while our system works in the background.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-700 bg-purple-100 px-3.5 py-1.5 rounded-full inline-block mb-4">
            Step-By-Step System
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-black leading-tight">
            How Our Client Acquisition <br className="hidden sm:inline" />
            <span className="text-purple-700">System Works</span>
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg font-medium">
            Our 8-step proprietary process for predictable growth.
          </p>
        </div>

        {/* 8 Connected Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#FDFBF7] border border-stone-200/80 hover:border-purple-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-black text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                      STEP {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-purple-700 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-extrabold text-black mb-3 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-stone-600 font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
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
