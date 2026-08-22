"use client";

import React, { useState } from "react";
import { FloatingNavbar } from "@/components/redesign/FloatingNavbar";
import { ResultsSection } from "@/components/redesign/ResultsSection";
import { ClientTestimonialsSection } from "@/components/redesign/ClientTestimonialsSection";
import { LusionEndSection } from "@/components/redesign/LusionEndSection";
import { EditorialFooter } from "@/components/redesign/EditorialFooter";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Calendar, Clock, DollarSign, User, Mail, Globe, Check, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function BookPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    website: "",
    monthlyRevenue: "$10K - $30K",
    primaryGoal: "Double Revenue in 90 Days",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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

      {/* Hero Header Section */}
      <section className="pt-16 pb-20 px-4 md:px-8 bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-mono font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-2 rounded-full inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>$10K MINIMUM · ADS OPERATORS ONLY</span>
          </span>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-stone-950 tracking-tight uppercase font-hero leading-tight">
            Apply to double your revenue{" "}
            <span className="font-serif italic lowercase text-purple-700">in 90 days.</span>
          </h1>

          <p className="mt-6 text-stone-600 text-base sm:text-xl max-w-2xl mx-auto font-medium leading-relaxed font-sans">
            Book your application call. We confirm fit, walk the agreement, and map done-for-you ads or agency training for your business.
          </p>

          {/* Key Value Points */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm font-extrabold text-stone-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-700 flex-shrink-0" />
              <span>Done-for-you ads that sell across all industries</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-700 flex-shrink-0" />
              <span>$50M+ Meta spend · 12 years experience</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-700 flex-shrink-0" />
              <span>Double your revenue in 90 days, in writing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form & Calendar Booking Section */}
      <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="bg-white p-8 sm:p-12 rounded-[36px] border-2 border-stone-950 shadow-2xl relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-widest block mb-2">
              ● APPLY NOW · LIMITED SPOTS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-950 font-hero tracking-tight">
              Tell us what you&apos;re working on.
            </h2>
            <p className="text-stone-600 text-sm font-medium mt-2">
              We build client acquisition systems for scale. Tell us about your business goals and let&apos;s build a system engineered to double your revenue.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-16 px-4">
              <div className="w-20 h-20 rounded-full bg-purple-100 border-2 border-purple-600 text-purple-700 flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>
              <h3 className="text-3xl font-black text-stone-950 font-hero">
                Application Received!
              </h3>
              <p className="text-stone-600 text-base font-medium mt-3 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-stone-950">{formData.fullName}</span>. Our senior media buying team is reviewing your business info and will reach out via <span className="font-bold text-purple-700">{formData.email}</span> within 2 hours to confirm your 1:1 call time.
              </p>
              <div className="mt-8">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-stone-950 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
                >
                  <span>Return To Home</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono font-bold text-stone-700 mb-2 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-stone-50 border-2 border-stone-300 focus:border-purple-600 focus:outline-none text-sm font-semibold text-stone-950"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-stone-700 mb-2 uppercase tracking-wider">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-stone-50 border-2 border-stone-300 focus:border-purple-600 focus:outline-none text-sm font-semibold text-stone-950"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono font-bold text-stone-700 mb-2 uppercase tracking-wider">
                    Website or Social Handle *
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="https://yourbrand.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-stone-50 border-2 border-stone-300 focus:border-purple-600 focus:outline-none text-sm font-semibold text-stone-950"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-stone-700 mb-2 uppercase tracking-wider">
                    Current Monthly Revenue *
                  </label>
                  <select
                    value={formData.monthlyRevenue}
                    onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-stone-50 border-2 border-stone-300 focus:border-purple-600 focus:outline-none text-sm font-semibold text-stone-950"
                  >
                    <option value="$10K - $30K">$10,000 – $30,000 / mo</option>
                    <option value="$30K - $100K">$30,000 – $100,000 / mo</option>
                    <option value="$100K+">$100,000+ / mo (8-Figure Scale)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-stone-700 mb-2 uppercase tracking-wider">
                  Tell Us About Your Business & Scaling Goals
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us what offer you sell, current monthly ad spend, and what target ROAS or pipeline volume you want to achieve..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl bg-stone-50 border-2 border-stone-300 focus:border-purple-600 focus:outline-none text-sm font-semibold text-stone-950 resize-none"
                />
              </div>

              <div className="pt-4 flex flex-col items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4.5 rounded-full bg-purple-700 hover:bg-purple-800 text-white font-black text-sm uppercase tracking-wider transition-all shadow-xl hover:shadow-2xl active:scale-95 cursor-pointer"
                >
                  <span>SUBMIT APPLICATION & BOOK CALL</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Backed by written agreement · $10K minimum · 90-day target</span>
                </div>
              </div>

            </form>
          )}

        </div>
      </section>

      {/* Proven Track Record Section */}
      <ResultsSection />

      {/* Verified Client Video Testimonials Section */}
      <ClientTestimonialsSection />

      <LusionEndSection />
      <EditorialFooter />
    </main>
  );
}
