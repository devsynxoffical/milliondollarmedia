"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Bot,
  Layers,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export function DifferenceSection() {
  const advantages = [
    {
      number: "01",
      title: "Complete DFY Client Acquisition System",
      desc: "We build, launch, and optimize your entire ecosystem—from offer positioning and Meta Ads to high-converting funnels and CRM automation.",
      icon: Layers,
      highlight: "100% Done-For-You",
      cols: "md:col-span-12",
      bg: "bg-gradient-to-r from-[#1D1435] via-purple-950 to-[#130B27] text-white border-purple-800/40",
    },
    {
      number: "02",
      title: "Lead Qualification & Multi-Validation",
      desc: "Our proprietary multi-stage qualification filters leads before they hit your calendar, maximizing show-up and close rates.",
      icon: ShieldCheck,
      highlight: "High-Ticket Filter",
      cols: "md:col-span-6",
      bg: "bg-white text-stone-900 border-stone-200 hover:border-purple-300",
    },
    {
      number: "03",
      title: "CRM + AI Follow-Up Automations",
      desc: "Automated SMS, email sequences, and AI reminders execute instant follow-up to nurture leads 24 hours a day.",
      icon: Bot,
      highlight: "Instant Follow-Up",
      cols: "md:col-span-6",
      bg: "bg-white text-stone-900 border-stone-200 hover:border-purple-300",
    },
    {
      number: "04",
      title: "Everything Belongs To Your Business",
      desc: "You retain 100% ownership of your funnels, copy, ad assets, CRM, and customer data with zero lock-in contracts.",
      icon: Zap,
      highlight: "100% Asset Ownership",
      cols: "md:col-span-6",
      bg: "bg-white text-stone-900 border-stone-200 hover:border-purple-300",
    },
    {
      number: "05",
      title: "Revenue-Focused Growth Strategy",
      desc: "We focus exclusively on revenue growth, qualified sales calls, and top-line ROI—not vanity clicks or impressions.",
      icon: TrendingUp,
      highlight: "Revenue Over Clicks",
      cols: "md:col-span-6",
      bg: "bg-[#1D1435] text-white border-purple-800/40",
    },
  ];

  const steps = [
    { num: "01", title: "Attracting Prospects" },
    { num: "02", title: "Qualifying Buyers" },
    { num: "03", title: "Nurturing & Follow-Up" },
    { num: "04", title: "Booked Appointments" },
  ];

  return (
    <section className="py-28 px-4 md:px-8 bg-[#FDFBF7] text-stone-900 border-b border-stone-200 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-bold uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-3.5 py-1.5 rounded-full inline-block mb-4"
          >
            ✦ THE DIFFERENCE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-black leading-tight"
          >
            We Don&apos;t Just Generate Leads... <br className="hidden sm:inline" />
            <span className="text-purple-700">We Build A Complete Client Acquisition Ecosystem.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed font-medium max-w-2xl mx-auto"
          >
            Unlike traditional marketing agencies, we handle every step of your customer journey inside one proven system.
          </motion.p>
        </div>

        {/* Customer Journey Progression Animated Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-20">
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="px-5 py-3 rounded-full bg-white border-2 border-stone-900 text-stone-950 font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2.5 cursor-pointer"
              >
                <span className="w-6 h-6 rounded-full bg-purple-700 text-white text-[11px] flex items-center justify-center font-mono font-bold">
                  {step.num}
                </span>
                <span>{step.title}</span>
              </motion.div>

              {idx < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-purple-400 hidden sm:block" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Core Advantages Animated Bento Grid */}
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight font-hero uppercase">
            Our Core Advantages
          </h3>
          <span className="text-xs font-mono font-bold text-purple-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            5 Pillar Architecture
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, scale: 1.01 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`${adv.cols} p-8 rounded-3xl border-2 shadow-xl ${adv.bg} transition-all duration-300 relative overflow-hidden flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-100/20 border border-purple-400/30 text-purple-300">
                      ADVANTAGE {adv.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-black tracking-tight mb-3">
                    {adv.title}
                  </h4>

                  <p className="text-xs sm:text-sm font-medium leading-relaxed opacity-90">
                    {adv.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-current/10 flex items-center justify-between text-xs font-mono font-bold opacity-80">
                  <span>✓ Included in Ecosystem</span>
                  <span className="text-emerald-400 font-bold">{adv.highlight}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
