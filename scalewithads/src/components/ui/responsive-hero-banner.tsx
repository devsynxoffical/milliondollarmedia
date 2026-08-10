"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BOOKING_PATH } from "../../lib/offer";
import { TiltCard } from "./TiltCard";
import { MetaLogo3D } from "./MetaLogo3D";
import { Play, ArrowRight, ShieldCheck, Zap, Sparkles, CheckCircle2 } from "lucide-react";

interface ResponsiveHeroBannerProps {
  showNav?: boolean;
}

export default function ResponsiveHeroBanner({
  showNav = false,
}: ResponsiveHeroBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const { scrollY } = useScroll();
  const heroParallaxY = useTransform(scrollY, [0, 500], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] w-full overflow-hidden bg-[#070709] pt-28 pb-20 text-white md:pt-36 md:pb-28"
    >
      {/* High-tech Dark Grid & Ambient Glow background */}
      <div className="jobber-grid-dark pointer-events-none absolute inset-0 opacity-40" />

      {/* Red accent radial aura layers */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% -10%, rgba(237,28,36,0.35), transparent 70%), radial-gradient(circle 500px at 15% 75%, rgba(237,28,36,0.12), transparent 70%), radial-gradient(circle 400px at 85% 65%, rgba(255,255,255,0.05), transparent 70%)",
        }}
      />

      {/* Scaling 3D Meta logo watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <MetaLogo3D
          glow
          className="h-[min(85vw,30rem)] w-[min(85vw,30rem)] text-[#ed1c24] opacity-[0.09] mix-blend-screen md:h-[36rem] md:w-[36rem]"
        />
      </div>

      {/* Hero content container */}
      <motion.div
        style={{ y: heroParallaxY, opacity: heroOpacity }}
        className="relative z-10 mx-auto max-w-[1240px] px-5 md:px-8"
      >
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          {/* Left Column: Text & CTAs */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Live Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold backdrop-blur-md transition-all hover:border-[#ed1c24]/50 hover:bg-white/10"
              data-cursor="hover"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ed1c24] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ed1c24]" />
              </span>
              <span className="uppercase tracking-[0.16em] text-white/90">
                DFY CLIENT ACQUISITION SYSTEM
              </span>
              <span className="rounded-full bg-[#ed1c24]/20 px-2.5 py-0.5 text-[10px] font-extrabold text-[#ed1c24]">
                90-DAY GUARANTEE
              </span>
            </motion.div>

            {/* Small Eyebrow Heading */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="display mt-6 text-sm font-bold uppercase tracking-[0.18em] text-white/80 sm:text-base"
            >
              We Install Our Proprietary{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d52] via-[#ed1c24] to-[#ff8f93]">
                Scale With Ads™
              </span>{" "}
              System
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="display mt-3 max-w-2xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-extrabold leading-[1.15] tracking-tight text-white"
            >
              Client Acquisition System Into Your Business
            </motion.h1>

            {/* Subheading */}
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-3 text-lg font-bold text-[#ed1c24] sm:text-xl"
            >
              Double Your Revenue Within The Next 90 Days...
            </motion.h2>

            {/* Body */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-4 max-w-xl space-y-1.5"
            >
              <p className="text-sm font-medium leading-relaxed text-white/80 md:text-base">
                Or We&apos;ll Continue Working For You At No Management Fee Until We Do.
              </p>
              <p className="text-sm font-medium leading-relaxed text-white md:text-base">
                Backed by a Written Agreement.
              </p>
            </motion.div>

            {/* Stats Row Pills */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 w-full"
            >
              {[
                { label: "META ADS SPENT", value: "$50M+" },
                { label: "EXPERIENCE", value: "12 YRS" },
                { label: "REV TARGET", value: "90 DAYS" },
                { label: "MINIMUM", value: "$10K+" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="group rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center backdrop-blur-sm transition-all duration-300 hover:border-[#ed1c24]/40 hover:bg-white/[0.08]"
                >
                  <p className="display text-xl font-extrabold text-white group-hover:text-[#ed1c24] transition-colors">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/70">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start w-full sm:w-auto"
            >
              <Link
                href={BOOKING_PATH}
                data-cursor="book"
                className="btn btn-accent group flex min-w-[260px] items-center justify-center gap-3 px-8 py-4.5 text-base font-extrabold shadow-[0_12px_40px_-10px_rgba(237,28,36,0.6)] transition-all hover:scale-[1.02]"
              >
                <span>BOOK YOUR FREE CALL</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <a
                href="#systems"
                data-cursor="view"
                className="btn btn-outline-dark flex items-center justify-center gap-2 px-7 py-4.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                <Zap className="h-4 w-4 text-[#ed1c24]" />
                <span>Explore Acquisition Systems</span>
              </a>
            </motion.div>

            {/* Proof Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 flex items-center gap-2 text-xs font-semibold text-white/80"
            >
              <ShieldCheck className="h-4 w-4 text-[#ed1c24]" />
              <span>100% Asset Ownership · Written Agreement · No Lock-ins</span>
            </motion.div>
          </div>

          {/* Right Column: 3D Tilt Hero Visual / VSL Interactive Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <TiltCard maxTilt={8} className="w-full max-w-[540px]">
              <div
                className="group relative overflow-hidden rounded-3xl border border-white/15 bg-zinc-900/80 p-4 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
                data-cursor="play"
                onClick={() => setVideoModalOpen(true)}
              >
                {/* VSL Cover Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src="/media/covers/cover-leadpilot.jpg"
                    alt="Scale With Ads System Preview"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 540px"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Pulsing Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#ed1c24] text-white shadow-[0_0_50px_rgba(237,28,36,0.8)] transition-all duration-300 group-hover:scale-110">
                      <Play className="ml-1 h-8 w-8 fill-current" />
                      <span className="absolute -inset-3 animate-ping rounded-full border border-[#ed1c24]/60 opacity-60" />
                    </div>
                  </div>

                  {/* Top Live Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-black/75 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
                    <Sparkles className="h-3.5 w-3.5 text-[#ed1c24]" />
                    <span>WATCH 2-MIN VSL OVERVIEW</span>
                  </div>

                  {/* Bottom Info Bar */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div>
                      <p className="display text-base font-bold text-white">
                        Scale With Ads™ Playbook
                      </p>
                      <p className="text-xs text-white/80">
                        $50M+ Meta Spend Framework
                      </p>
                    </div>
                    <span className="rounded-lg bg-[#ed1c24] px-2.5 py-1 text-xs font-extrabold text-white">
                      HD VSL
                    </span>
                  </div>
                </div>

                {/* Floating Metric Badges around card */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-left">
                  <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-md">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#ed1c24]" />
                    <div>
                      <p className="text-[11px] font-bold text-white">3.32x ROAS</p>
                      <p className="text-[9px] text-white/70">Tracked Client Spend</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-md">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#ed1c24]" />
                    <div>
                      <p className="text-[11px] font-bold text-white">13,630+ Offers</p>
                      <p className="text-[9px] text-white/70">Closed Sales Calls</p>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </motion.div>

      {/* Video Modal Lightbox */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-zinc-950 p-2 shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              ✕
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-2xl">
              <iframe
                src="https://assets.cdn.filesafe.space/W8B8H8FvOolLCrvxXzYp/media/69ef9443717d5dd4e170f445.mp4"
                className="h-full w-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
