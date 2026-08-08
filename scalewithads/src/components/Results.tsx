"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BOOKING_PATH } from "../lib/offer";
import { videos } from "../lib/videos";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./ui/TiltCard";
import { Trophy, TrendingUp, DollarSign, Award, ChevronDown, Play, Sparkles, CheckCircle2 } from "lucide-react";

export function Results() {
  const [showAll, setShowAll] = useState(false);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  const initialItems = videos.slice(0, 6);
  const hiddenItems = videos.slice(6);
  const displayedItems = showAll ? videos : initialItems;

  return (
    <section
      id="results"
      className="relative overflow-hidden border-b border-zinc-800 bg-[#070709] py-20 text-white md:py-28"
    >
      <div className="jobber-grid-dark pointer-events-none absolute inset-0 opacity-50" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(237,28,36,0.15), transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          eyebrow="PROOF & CASE STUDIES"
          title={
            <>
              Real Client Results &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d52] via-[#ed1c24] to-[#ff8f93]">
                Proven Revenue Scale
              </span>
            </>
          }
          description="Everything backed by tracked dashboard metrics, real client videos, and two-comma club awards."
        />

        {/* Animated Metrics Bar */}
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { icon: DollarSign, value: "$847,000+", label: "TRACKED CLIENT REVENUE" },
            { icon: TrendingUp, value: "3.32x ROAS", label: "AVERAGE AD RETURN" },
            { icon: Trophy, value: "13,630+", label: "LTO OFFERS CONVERTED" },
            { icon: Award, value: "$50M+", label: "META ADS MANAGED" },
          ].map((m, i) => (
            <TiltCard key={i} maxTilt={6}>
              <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6 text-center shadow-xl backdrop-blur-md transition-all hover:border-[#ed1c24]/50">
                <m.icon className="mx-auto h-7 w-7 text-[#ed1c24] mb-2" />
                <p className="display text-3xl font-extrabold text-white sm:text-4xl">
                  {m.value}
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                  {m.label}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Video & Proof Cards Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedItems.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <TiltCard maxTilt={5}>
                <div
                  onClick={() => setActiveVideoModal(video.src)}
                  data-cursor="play"
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-[#ed1c24] hover:shadow-[0_20px_40px_-15px_rgba(237,28,36,0.4)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <video
                      src={video.src}
                      poster={video.poster}
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ed1c24] text-white shadow-[0_0_30px_rgba(237,28,36,0.8)] transition duration-300 group-hover:scale-110">
                        <Play className="ml-1 h-6 w-6 fill-current" />
                      </div>
                    </div>

                    <span className="absolute top-3 left-3 rounded-full bg-black/80 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white backdrop-blur-md border border-white/15">
                      {video.name}
                    </span>
                  </div>

                  <div className="p-4 text-left">
                    <p className="display text-base font-extrabold text-white">
                      {video.result}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-zinc-400">
                      {video.role}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Center "See More Results" Action Button */}
        {hiddenItems.length > 0 && (
          <div className="mt-14 flex flex-col items-center justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group relative inline-flex items-center gap-3 rounded-full border border-[#ed1c24]/50 bg-gradient-to-r from-[#ed1c24]/20 via-zinc-900 to-[#ed1c24]/20 px-10 py-5 text-sm font-extrabold uppercase tracking-widest text-white shadow-[0_0_40px_rgba(237,28,36,0.4)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-[#ed1c24] hover:shadow-[0_0_60px_rgba(237,28,36,0.7)]"
              data-cursor="hover"
            >
              <Sparkles className="h-5 w-5 text-[#ed1c24] group-hover:rotate-12 transition-transform" />
              <span>{showAll ? "SHOW LESS RESULTS" : "SEE MORE RESULTS"}</span>
              <ChevronDown className={`h-5 w-5 text-[#ed1c24] transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}

        {/* Bottom Booking CTA */}
        <div className="mt-12 text-center">
          <Link
            href={BOOKING_PATH}
            className="btn btn-accent inline-flex items-center gap-2 px-8 py-4 text-base font-extrabold shadow-[0_0_35px_rgba(237,28,36,0.6)]"
          >
            <span>BOOK YOUR FREE STRATEGY CALL</span>
          </Link>
          <p className="mt-3 text-xs font-semibold text-zinc-400">
            $10K minimum · Double revenue in 90 days · Agreement in writing
          </p>
        </div>
      </div>

      {/* Video Modal Lightbox */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-zinc-950 p-2 shadow-2xl">
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              ✕
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-2xl">
              <video
                src={activeVideoModal}
                controls
                autoPlay
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
