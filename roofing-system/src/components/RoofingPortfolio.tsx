"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX, Eye, Flame } from "lucide-react";
import { Reveal } from "./Reveal";

const ROOFING_VIDEOS = [
  { id: "1203105488", title: "Roofing Offer Angle 1", tag: "META ADS" },
  { id: "1203105494", title: "25-Year Warranty Angle", tag: "META ADS" },
  { id: "1203105510", title: "Metal Roofing Angle", tag: "META ADS" },
  { id: "1203105523", title: "Free Roof Inspection Angle", tag: "META ADS" },
  { id: "1203105527", title: "Storm Damage Claim Angle", tag: "META ADS" },
  { id: "1203105532", title: "Local Roofer Trust Angle", tag: "META ADS" },
  { id: "1203105572", title: "Full Replacement Offer Angle", tag: "META ADS" },
] as const;

function VideoTile({ video, index }: { video: (typeof ROOFING_VIDEOS)[number]; index: number }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = iframeRef.current;
    if (!el) return;

    const playVideo = () => {
      el.contentWindow?.postMessage(
        JSON.stringify({ method: "play", value: true }),
        "*"
      );
    };

    // Play immediately when iframe loads
    el.addEventListener("load", playVideo);
    playVideo();

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          playVideo();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(el);
    return () => {
      el.removeEventListener("load", playVideo);
      observer.disconnect();
    };
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = iframeRef.current;
    if (!el) return;
    const nextMuted = !muted;
    setMuted(nextMuted);
    el.contentWindow?.postMessage(
      JSON.stringify({ method: "setVolume", value: nextMuted ? 0 : 1 }),
      "*"
    );
  };

  const vimeoUrl = `https://player.vimeo.com/video/${video.id}?autoplay=1&muted=1&autopause=0&loop=1&background=1&controls=0&transparent=0`;

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <div
        onClick={toggleMute}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-[#0d0e14] shadow-2xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-[#ed1c24] hover:shadow-[0_25px_50px_-12px_rgba(237,28,36,0.5)] cursor-pointer"
      >
        {/* Large Vertical 9:16 Portrait Card */}
        <div className="relative aspect-[9/16] w-full overflow-hidden bg-zinc-950">
          <iframe
            ref={iframeRef}
            src={vimeoUrl}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={video.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105 pointer-events-none"
            style={{ border: "none" }}
          />

          {/* Gradient Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          {/* Top Tag & Sound Button */}
          <div className="absolute left-3.5 top-3.5 right-3.5 z-20 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/80 px-3 py-1.5 font-mono text-[11px] font-extrabold uppercase tracking-wider text-white backdrop-blur-md shadow-md">
              <Flame className="h-3.5 w-3.5 text-[#ed1c24]" />
              {video.tag}
            </span>
            <button
              type="button"
              onClick={toggleMute}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white backdrop-blur-md transition hover:bg-black hover:scale-105"
              aria-label={muted ? "Unmute video" : "Mute video"}
            >
              {muted ? (
                <VolumeX className="h-4 w-4 text-zinc-400" />
              ) : (
                <Volume2 className="h-4 w-4 text-[#ed1c24]" />
              )}
            </button>
          </div>

          {/* Center Play/Sound Button Overlay */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-[#ed1c24]/90 text-white shadow-[0_0_40px_rgba(237,28,36,0.9)] backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-[#ed1c24]">
              {muted ? (
                <Play className="ml-1 h-7 w-7 fill-current" />
              ) : (
                <Volume2 className="h-7 w-7 fill-current" />
              )}
            </div>
          </div>

          {/* Bottom Info Overlay */}
          <div className="pointer-events-none absolute bottom-0 inset-x-0 z-10 p-5">
            <p className="text-base font-extrabold text-white leading-snug drop-shadow-md">
              {video.title}
            </p>
            <div className="mt-2 flex items-center justify-between text-xs font-bold text-zinc-300">
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4 text-[#ed1c24]" />
                Roofing Portfolio
              </span>
              <span className="text-[#ed1c24] transition-transform group-hover:translate-x-1">
                Watch HD →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function RoofingPortfolio() {
  return (
    <section id="roofing-work" className="relative overflow-hidden bg-[#070709] py-20 sm:py-28 border-b border-zinc-800">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0">
        <div className="jobber-grid-dark absolute inset-0 opacity-40" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 45% at 50% 50%, rgba(237,28,36,0.14), transparent 75%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        {/* Section Header */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center mb-14">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ed1c24]/40 bg-[#ed1c24]/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-[#ed1c24]">
              <span className="flex h-2 w-2 rounded-full bg-[#ed1c24] animate-pulse" />
              High-Converting Short-Form Ads
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
              Creative Ads That Autoplay & <br />
              <span className="text-gradient-animated">Convert Traffic Into Buyers</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
              Live short-form creative angles running across Meta, TikTok, and YouTube Shorts for roofing contractors nationwide.
            </p>
          </Reveal>
        </div>

        {/* 4 Columns Grid -> 7 Videos across 2 Lines */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {ROOFING_VIDEOS.map((video, idx) => (
            <VideoTile key={video.id} video={video} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
