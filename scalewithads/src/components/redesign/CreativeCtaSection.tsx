"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";

export function CreativeCtaSection() {
  return (
    <section id="contact" className="py-24 px-4 md:px-8 bg-[#FDFBF7] text-stone-900 border-b border-stone-200 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Left & Right Star Graphics (Lunvoro CTA reference style) */}
        <div className="hidden sm:flex items-center justify-between pointer-events-none absolute -top-8 left-0 right-0 px-8 opacity-75">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="text-pink-500 text-4xl font-black"
          >
            ✺
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-purple-500 text-4xl font-black"
          >
            ✦
          </motion.div>
        </div>

        {/* CTA Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-stone-950 tracking-tight leading-tight"
        >
          Let's build something bold
        </motion.h2>

        {/* CTA Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-stone-700 text-lg sm:text-xl max-w-xl mx-auto font-medium"
        >
          Stop burning ad budget on low ROAS. Schedule your 1-on-1 strategy call with our senior media buyers today.
        </motion.p>

        {/* Action Buttons (Lunvoro dual pill buttons) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-black text-base transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            <span>Let's talk</span>
            <ArrowRight className="w-4 h-4 text-purple-200" />
          </a>
          <a
            href="#work"
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-white border-2 border-stone-900 text-stone-950 hover:bg-stone-950 hover:text-white font-black text-base transition-all shadow-md active:scale-95"
          >
            <span>See work</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
