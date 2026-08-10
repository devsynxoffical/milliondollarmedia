"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { adShorts, type AdVideo } from "../lib/ads";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./ui/TiltCard";
import { SectionBackground } from "./ui/SectionBackground";
import { Play, Volume2, VolumeX, Eye, Flame, ArrowUpRight } from "lucide-react";
import { BOOKING_PATH } from "../lib/offer";

function AutoPlayShortCard({
  video,
  onOpen,
}: {
  video: AdVideo;
  onOpen: (v: AdVideo) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "150px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <TiltCard maxTilt={6} className="h-full">
      <div
        onClick={() => onOpen(video)}
        data-cursor="play"
        className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-zinc-900 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-[#ed1c24] hover:shadow-[0_20px_40px_-15px_rgba(237,28,36,0.45)]"
      >
        <div className="relative aspect-[9/16] w-full overflow-hidden">
          <video
            ref={videoRef}
            src={video.src}
            poster={video.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          {/* Top Tag & View Count Pill */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/80 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white backdrop-blur-md border border-white/15">
              <Flame className="h-3 w-3 text-[#ed1c24]" />
              {video.label}
            </span>
            <button
              onClick={toggleMute}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-white backdrop-blur-md border border-white/15 hover:bg-black"
            >
              {isMuted ? (
                <VolumeX className="h-3.5 w-3.5 text-zinc-400" />
              ) : (
                <Volume2 className="h-3.5 w-3.5 text-[#ed1c24]" />
              )}
            </button>
          </div>

          {/* Center Hover Play Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ed1c24] text-white shadow-[0_0_35px_rgba(237,28,36,0.8)] scale-90 group-hover:scale-100 transition-transform">
              <Play className="ml-1 h-6 w-6 fill-current" />
            </div>
          </div>

          {/* Bottom Info Overlay */}
          <div className="absolute bottom-3 left-3 right-3 z-10 text-left">
            <p className="display text-base font-extrabold text-white truncate">
              {video.name}
            </p>
            <div className="mt-1 flex items-center justify-between text-[11px] font-bold text-zinc-300">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3 text-[#ed1c24]" />
                18.4K Views
              </span>
              <span className="text-[#ed1c24] group-hover:translate-x-0.5 transition-transform">
                Play HD →
              </span>
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export function ShortsReelSection() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [activeShortModal, setActiveShortModal] = useState<AdVideo | null>(null);

  const categories = [
    { id: "all", label: "All Creatives" },
    { id: "Solar", label: "Solar UGC" },
    { id: "MVA", label: "MVA & Legal" },
    { id: "HVAC", label: "HVAC & Home" },
    { id: "Coaching", label: "Coaching & VSL" },
  ];

  const filteredShorts = adShorts.filter((video) => {
    if (activeTab === "all") return true;
    return video.label.toLowerCase().includes(activeTab.toLowerCase());
  });

  return (
    <section
      id="shorts"
      className="relative overflow-hidden border-b border-zinc-800 bg-[#070709] py-20 text-white md:py-28"
    >
      <SectionBackground variant="dark" grid />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          eyebrow="HIGH-CONVERTING SHORT-FORM ADS"
          title={
            <>
              Creative Ads That Autoplay &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d52] via-[#ed1c24] to-[#ff8f93]">
                Convert Traffic Into Buyers
              </span>
            </>
          }
          description="Live short-form creative angles running across Meta, TikTok, and YouTube Shorts for our client acquisition system."
        />

        {/* Category Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === cat.id
                  ? "bg-[#ed1c24] text-white shadow-[0_0_20px_rgba(237,28,36,0.5)] scale-105"
                  : "border border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Creative Bento Grid of Autoplaying Short-Form Ads */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {filteredShorts.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (idx % 4) * 0.08 }}
            >
              <AutoPlayShortCard
                video={video}
                onOpen={(v) => setActiveShortModal(v)}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-14 text-center">
          <Link
            href={BOOKING_PATH}
            className="btn btn-accent inline-flex items-center gap-2 px-8 py-4 text-sm font-extrabold uppercase tracking-wider shadow-[0_0_35px_rgba(237,28,36,0.6)]"
          >
            <span>GET DFY CREATIVE ADS FOR YOUR BRAND</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Short Video Lightbox Modal */}
      <AnimatePresence>
        {activeShortModal && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-zinc-950 p-3 shadow-2xl"
            >
              <button
                onClick={() => setActiveShortModal(null)}
                className="absolute top-4 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/80 text-white backdrop-blur hover:bg-black"
              >
                ✕
              </button>

              <div className="aspect-[9/16] w-full overflow-hidden rounded-2xl">
                <video
                  src={activeShortModal.src}
                  controls
                  autoPlay
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-4 text-center">
                <span className="rounded-full bg-[#ed1c24]/20 border border-[#ed1c24]/40 px-3 py-1 text-xs font-bold text-[#ed1c24]">
                  {activeShortModal.label}
                </span>
                <p className="display text-lg font-extrabold text-white mt-2">
                  {activeShortModal.name}
                </p>
                <p className="text-xs text-zinc-400 mt-1">
                  Scale With Ads™ DFY Short Creative Engine
                </p>

                <Link
                  href={BOOKING_PATH}
                  className="btn btn-accent mt-4 w-full py-3 text-xs font-extrabold uppercase tracking-wider"
                >
                  Book Free Strategy Call
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
