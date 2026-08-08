"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { adShorts, type AdVideo } from "../lib/ads";
import { SectionHeading } from "./SectionHeading";
import { Play, Volume2, VolumeX, Eye, Sparkles, Flame, ArrowUpRight } from "lucide-react";
import { BOOKING_PATH } from "../lib/offer";

function ShortVideoCard({
  video,
  onOpen,
}: {
  video: AdVideo;
  onOpen: (v: AdVideo) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(video)}
      data-cursor="play"
      className="group relative w-[180px] sm:w-[210px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#ed1c24] hover:shadow-[0_20px_40px_-15px_rgba(237,28,36,0.4)]"
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden">
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          muted={isMuted}
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Top Tag Pill */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="rounded-full bg-black/75 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-white backdrop-blur-md border border-white/15">
            {video.label}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-black/75 px-2 py-0.5 text-[9px] font-bold text-white/90 backdrop-blur-md">
            <Eye className="h-3 w-3 text-[#ed1c24]" />
            14.2K
          </span>
        </div>

        {/* Center Hover Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ed1c24] text-white shadow-[0_0_30px_rgba(237,28,36,0.8)] scale-90 group-hover:scale-100 transition-transform">
            <Play className="ml-1 h-6 w-6 fill-current" />
          </div>
        </div>

        {/* Bottom Caption Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 text-left pointer-events-none">
          <p className="display text-sm font-extrabold text-white truncate">
            {video.name}
          </p>
          <p className="text-[10px] text-zinc-300">DFY Short-Form Creative</p>
        </div>
      </div>
    </div>
  );
}

export function ShortsReelSection() {
  const [activeShort, setActiveShort] = useState<AdVideo | null>(null);

  return (
    <section
      id="shorts"
      className="relative overflow-hidden border-b border-zinc-800 bg-[#070709] py-20 text-white md:py-28"
    >
      <div className="jobber-grid-dark pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          eyebrow="HIGH-CONVERTING SHORT CREATIVES"
          title={
            <>
              Viral Short-Form Ads Built To{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d52] via-[#ed1c24] to-[#ff8f93]">
                Generate Qualified Leads
              </span>
            </>
          }
          description="High-converting short-form creative angles designed specifically for Meta, TikTok, and YouTube Shorts."
        />

        {/* Horizontal Marquee Reel */}
        <div className="relative mt-12 overflow-hidden py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-[#070709] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-[#070709] to-transparent" />

          <div className="flex gap-5 overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
              className="flex shrink-0 items-center gap-5"
            >
              {[...adShorts, ...adShorts].map((video, idx) => (
                <ShortVideoCard
                  key={`${video.id}-${idx}`}
                  video={video}
                  onOpen={(v) => setActiveShort(v)}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Action */}
        <div className="mt-10 text-center">
          <Link
            href={BOOKING_PATH}
            className="btn btn-accent inline-flex items-center gap-2 px-8 py-4 text-sm font-extrabold shadow-[0_0_30px_rgba(237,28,36,0.5)]"
          >
            <span>GET SHORT CREATIVES FOR YOUR BRAND</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Active Short Video Modal Lightbox */}
      <AnimatePresence>
        {activeShort && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/20 bg-zinc-950 p-2 shadow-2xl"
            >
              <button
                onClick={() => setActiveShort(null)}
                className="absolute top-4 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/80 text-white backdrop-blur hover:bg-black"
              >
                ✕
              </button>

              <div className="aspect-[9/16] w-full overflow-hidden rounded-2xl">
                <video
                  src={activeShort.src}
                  controls
                  autoPlay
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-3 text-center">
                <p className="display text-base font-extrabold text-white">
                  {activeShort.name}
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Category: {activeShort.label}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
