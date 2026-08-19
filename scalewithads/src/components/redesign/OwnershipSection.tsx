"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  FileCode,
  Layout,
  Database,
  Layers,
  Bot,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export function OwnershipSection() {
  const ownedAssets = [
    { title: "Landing Pages", desc: "Custom high-converting designs", icon: Layout },
    { title: "Sales Funnel", desc: "Complete appointment booking flow", icon: Layers },
    { title: "CRM Setup", desc: "Configured pipeline & contact management", icon: Database },
    { title: "Automations", desc: "AI workflows & trigger sequences", icon: Bot },
    { title: "Ad Creatives", desc: "High-performing video & static ads", icon: Sparkles },
    { title: "Ad Copy", desc: "Direct-response copy & VSL scripts", icon: FileCode },
    { title: "Follow-Up Sequences", desc: "Automated email & SMS nurture", icon: MessageSquare },
    { title: "Customer Data", desc: "100% first-party pixel & lead records", icon: ShieldCheck },
  ];

  const industriesRow1 = [
    "Digital Marketing Agencies",
    "Business Coaches",
    "Consultants",
    "High-Ticket Service Providers",
    "B2B Companies",
    "Home Service Businesses",
    "Roofing Companies",
    "HVAC Companies",
    "Solar Companies",
    "Personal Injury Law Firms",
    "Medical Malpractice Attorneys",
    "Healthcare Practices",
    "Med Spas & Aesthetic Clinics",
    "Chiropractors",
    "Real Estate Companies",
    "Mortgage Brokers",
  ];

  const industriesRow2 = [
    "Insurance Agencies",
    "Fitness Brands & Gyms",
    "E-Commerce Brands",
    "Construction Companies",
    "Garage Door Companies",
    "Kitchen & Bathroom Remodeling",
    "Painting Companies",
    "Window & Door Companies",
    "Landscaping Businesses",
    "Pressure Washing Companies",
    "Car Detailing Businesses",
    "Pest Control Companies",
    "Plumbing Companies",
    "Electrical Companies",
    "Carpet Cleaning Companies",
    "Air Duct Cleaning Companies",
  ];

  return (
    <section className="py-28 px-4 md:px-8 bg-[#FDFBF7] text-stone-900 border-b border-stone-200 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* Ownership Box (Card Layout & Animations) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#1D1435] text-white shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-300 bg-purple-900/60 border border-purple-700/50 px-3.5 py-1.5 rounded-full inline-block mb-4">
              ✦ 100% ASSET TRANSFER
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight mb-4 font-hero uppercase">
              Unlike Most Agencies... <br />
              <span className="text-purple-300">You Own Everything.</span>
            </h2>
            <p className="text-purple-100 text-base sm:text-lg font-medium leading-relaxed">
              When we build your Client Acquisition System, it becomes your permanent business asset.
            </p>
          </div>

          {/* Grid of 8 Interactive Owned Asset Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {ownedAssets.map((asset, idx) => {
              const Icon = asset.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:border-purple-400/50 shadow-md flex flex-col justify-between transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-400/30">
                      <Icon className="w-4 h-4" />
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold text-white mb-1">
                      {asset.title}
                    </h3>
                    <p className="text-[11px] text-purple-200 font-medium leading-tight">
                      {asset.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Guarantee Badges Row */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-bold text-purple-300 pt-6 border-t border-purple-800/50">
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10">✓ No Lock-In Contracts</span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10">✓ No Hidden Ownership</span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10">✓ Zero Agency Dependence</span>
          </div>
        </div>

        {/* Dynamic Infinite Marquee of 30+ Industries */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Multi-Industry Expertise
            </span>
            <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-black font-hero uppercase">
              Industries We&apos;ve Worked With
            </h3>
            <p className="mt-3 text-stone-600 text-sm font-medium">
              Proven frameworks tailored across 30+ B2B, B2C, and high-ticket service verticals.
            </p>
          </div>

          {/* Row 1 Infinite Scroll Marquee */}
          <div className="w-full overflow-hidden mb-4 select-none">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 35, repeat: Infinity }}
              className="flex items-center gap-3 whitespace-nowrap w-max"
            >
              {[...industriesRow1, ...industriesRow1].map((ind, idx) => (
                <span
                  key={idx}
                  className="px-5 py-2.5 rounded-full bg-white border border-stone-200/80 text-stone-900 font-extrabold text-xs shadow-sm hover:border-purple-400 hover:bg-purple-50 transition-colors"
                >
                  {ind}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Row 2 Infinite Scroll Marquee (Reverse Direction) */}
          <div className="w-full overflow-hidden select-none">
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ ease: "linear", duration: 38, repeat: Infinity }}
              className="flex items-center gap-3 whitespace-nowrap w-max"
            >
              {[...industriesRow2, ...industriesRow2].map((ind, idx) => (
                <span
                  key={idx}
                  className="px-5 py-2.5 rounded-full bg-stone-950 text-white border border-stone-900 font-extrabold text-xs shadow-md hover:border-purple-400 transition-colors"
                >
                  {ind}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
