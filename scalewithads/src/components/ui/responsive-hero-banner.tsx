"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BOOKING_PATH } from "../../lib/offer";
import { ClickSpark } from "./ClickSpark";
import ParticleText from "./ParticleText";

export default function ResponsiveHeroBanner() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section ref={sectionRef} className="relative flex flex-col items-center justify-center min-h-[90vh] pt-20 px-4 text-center z-10">
      <div className="status-row mb-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#ed1c24]/30 bg-[#ed1c24]/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#ed1c24] backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-[#ed1c24] animate-pulse" />
          DFY Client Acquisition System
        </span>
      </div>

      <div className="w-full h-[180px] md:h-[240px] lg:h-[300px] mb-4 flex items-center justify-center">
        <ParticleText
          text="Scale With Ads™"
          particleSize={3}
          density={4}
          color="#ffffff"
          highlightColor="#ed1c24"
          scatter={180}
          gatherDuration={1600}
          stagger={420}
          pointerRepel={40}
          repelRadius={120}
          idleDrift={0.7}
          trigger="hover"
          fontSize="clamp(3rem, 10vw, 8rem)"
          fontWeight={800}
          fontFamily="inherit"
          glow
        />
      </div>

      <p className="max-w-2xl text-lg md:text-xl text-white/80 mb-10 mx-auto font-medium leading-relaxed">
        Double your revenue within the next 90 days — or we&apos;ll continue working for you at no management fee until we do. Backed by a written agreement.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <ClickSpark sparkColor="#ed1c24" sparkCount={10} sparkRadius={42}>
          <Link href={BOOKING_PATH} className="relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-[#ed1c24] px-8 font-bold text-[#0a0524] transition-all hover:scale-105 hover:bg-white shadow-[0_0_30px_rgba(237,28,36,0.4)]">
            Book Your Free Call
          </Link>
        </ClickSpark>
        <a href="#systems" className="inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-[#ed1c24]/50">
          Explore Systems
        </a>
      </div>

      <div className="mt-16 flex items-center gap-3 text-sm font-semibold text-[#ed1c24]/80">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l8 4v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-4z" stroke="currentColor" strokeWidth="2" />
        </svg>
        100% Asset Ownership · Written Agreement · No Lock-ins
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
        <span className="text-xs font-bold uppercase tracking-widest">Scroll</span>
        <div className="h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
