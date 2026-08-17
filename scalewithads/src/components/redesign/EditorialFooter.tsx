"use client";

import React from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function EditorialFooter() {
  return (
    <footer className="pt-16 pb-12 px-4 md:px-8 bg-[#FDFBF7] text-stone-900 border-t border-stone-300 relative overflow-hidden select-none">
      
      {/* Studio Navigation Card & Footer Links */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="bg-white rounded-3xl border-2 border-stone-950 p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Brand Column */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <Link href="/" className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-full bg-stone-950 flex items-center justify-center text-white">
                    <Sparkles className="w-5 h-5 text-purple-300" />
                  </div>
                  <span className="font-extrabold text-2xl tracking-tight text-stone-950 font-hero">
                    ScaleWithAds
                  </span>
                </Link>
                <p className="text-stone-600 text-sm font-medium leading-relaxed max-w-sm">
                  Full-funnel performance ad agency scaling direct-to-consumer and B2B brands with hyper-converting creative and data-anchored media buying.
                </p>
              </div>

              <div className="mt-8">
                <span className="text-3xl text-rose-500 font-black">✦</span>
              </div>
            </div>

            {/* Right Links Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm font-semibold">
              <div className="flex flex-col gap-3">
                <p className="text-xs font-black uppercase tracking-widest text-purple-700">
                  Navigation
                </p>
                <Link href="/" className="text-stone-700 hover:text-stone-950 transition-colors">
                  Home
                </Link>
                <Link href="/about" className="text-stone-700 hover:text-stone-950 transition-colors">
                  About
                </Link>
                <Link href="/services" className="text-stone-700 hover:text-stone-950 transition-colors">
                  Services
                </Link>
                <Link href="/work" className="text-stone-700 hover:text-stone-950 transition-colors">
                  Case Studies
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-black uppercase tracking-widest text-purple-700">
                  Services
                </p>
                <Link href="/services" className="text-stone-700 hover:text-stone-950 transition-colors">
                  Meta Ads
                </Link>
                <Link href="/services" className="text-stone-700 hover:text-stone-950 transition-colors">
                  TikTok UGC
                </Link>
                <Link href="/services" className="text-stone-700 hover:text-stone-950 transition-colors">
                  Google PMax
                </Link>
                <Link href="/services" className="text-stone-700 hover:text-stone-950 transition-colors">
                  CAPI Strategy
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-black uppercase tracking-widest text-purple-700">
                  Pages
                </p>
                <Link href="/features" className="text-stone-700 hover:text-stone-950 transition-colors">
                  OS Features
                </Link>
                <Link href="/blog" className="text-stone-700 hover:text-stone-950 transition-colors">
                  Blog & Insights
                </Link>
                <Link href="/contact" className="text-stone-700 hover:text-stone-950 transition-colors">
                  Book Audit
                </Link>
                <Link href="/contact" className="text-stone-700 hover:text-stone-950 transition-colors">
                  Contact Us
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-black uppercase tracking-widest text-purple-700">
                  Socials
                </p>
                <a href="#" className="flex items-center gap-1.5 text-stone-700 hover:text-stone-950 transition-colors">
                  <span>Twitter / X</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a href="#" className="flex items-center gap-1.5 text-stone-700 hover:text-stone-950 transition-colors">
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a href="#" className="flex items-center gap-1.5 text-stone-700 hover:text-stone-950 transition-colors">
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a href="#" className="flex items-center gap-1.5 text-stone-700 hover:text-stone-950 transition-colors">
                  <span>YouTube</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Massive Full-Width Statement Typography (Fitted to 100% width with 0 truncation) */}
        <div className="w-full text-center overflow-hidden py-10 select-none">
          <h1 className="text-[7.8vw] sm:text-[8.5vw] lg:text-[9.2vw] font-black text-stone-950 leading-none tracking-tight uppercase font-hero block w-full whitespace-nowrap">
            SCALEWITHADS
          </h1>
        </div>

        {/* Copyright Line */}
        <div className="pt-4 border-t border-stone-300 flex flex-wrap items-center justify-between text-xs font-semibold text-stone-500 gap-4">
          <p>© 2026 ScaleWithAds Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-stone-900 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-stone-900 transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-stone-900 transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
