"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX, Eye, Flame } from "lucide-react";
import { Reveal } from "./Reveal";

const ROOFING_VIDEOS = [
  { id: "1203105488", title: "Residential Roof Replacement Ad", tag: "Meta Ads" },
  { id: "1203105494", title: "Commercial Roofing Campaign", tag: "Meta Ads" },
  { id: "1203105510", title: "Storm Damage Claims Funnel", tag: "Meta Ads" },
  { id: "1203105523", title: "Metal Roofing Inspection Ad", tag: "Meta Ads" },
  { id: "1203105527", title: "Roof Repair Offer Creative", tag: "Meta Ads" },
  { id: "1203105532", title: "High-Ticket Roofing Nurture", tag: "Meta Ads" },
  { id: "1203105572", title: "Gutters & Roof Combo Campaign", tag: "Meta Ads" },
] as const;

function VideoTile({ video, index }: { video: (typeof ROOFING_VIDEOS)[number]; index: number }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = iframeRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setPlaying(true);
          el.contentWindow?.postMessage(
            JSON.stringify({ method: "play", value: true }),
            "https://player.vimeo.com"
          );
        } else {
          setPlaying(false);
          el.contentWindow?.postMessage(
            JSON.stringify({ method: "pause", value: true }),
            "https://player.vimeo.com"
          );
        }
      },
      { rootMargin: "150px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = iframeRef.current;
    if (!el) return;
    const nextMuted = !muted;
    setMuted(nextMuted);
    el.contentWindow?.postMessage(
      JSON.stringify({ method: "setVolume", value: nextMuted ? 0 : 1 }),
      "https://player.vimeo.com"
    );
  };

  const vimeoUrl = `https://player.vimeo.com/video/${video.id}?autoplay=1&muted=1&loop=1&color=ed1c24&title=0&byline=0&portrait=0&badge=0&controls=0&background=1`;

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0d0e14] shadow-2xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-[#ed1c24]/80 hover:shadow-[0_20px_45px_-15px_rgba(237,28,36,0.4)]">
        {/* Aspect Ratio 9/16 Vertical Portrait Reel */}
        <div className="relative aspect-[9/16] w-full overflow-hidden bg-zinc-950">
          <iframe
            ref={iframeRef}
            src={vimeoUrl}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={video.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            style={{ border: "none" }}
          />

          {/* Gradient Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          {/* Top Tag & Sound Button */}
          <div className="absolute left-3 top-3 right-3 z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/70 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              <Flame className="h-3 w-3 text-[#ed1c24]" />
              {video.tag}
            </span>
            <button
              type="button"
              onClick={toggleMute}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-md transition hover:bg-black"
              aria-label={muted ? "Unmute video" : "Mute video"}
            >
              {muted ? (
                <VolumeX className="h-3.5 w-3.5 text-zinc-400" />
              ) : (
                <Volume2 className="h-3.5 w-3.5 text-[#ed1c24]" />
              )}
            </button>
          </div>

          {/* Center Play Glyph on Hover */}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-[#ed1c24] text-white shadow-[0_0_30px_rgba(237,28,36,0.8)] backdrop-blur">
              <Play className="ml-0.5 h-6 w-6 fill-current" />
            </div>
          </div>

          {/* Bottom Info Overlay */}
          <div className="pointer-events-none absolute bottom-0 inset-x-0 z-10 p-4">
            <p className="text-sm font-extrabold text-white leading-snug">
              {video.title}
            </p>
            <div className="mt-1.5 flex items-center justify-between text-[11px] font-bold text-zinc-400">
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5 text-[#ed1c24]" />
                Roofing Portfolio
              </span>
              <span className="text-[#ed1c24] transition-transform group-hover:translate-x-0.5">
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
              "radial-gradient(ellipse 65% 45% at 50% 50%, rgba(237,28,36,0.12), transparent 75%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5">
        {/* Section Header */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center mb-14">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ed1c24]/30 bg-[#ed1c24]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#ed1c24]">
              <span className="flex h-2 w-2 rounded-full bg-[#ed1c24] animate-pulse" />
              Verified Campaign Showcase
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
              Our <span className="text-gradient-animated">Roofing Work</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">
              Real campaigns. Real results. Watch the high-converting short-form creative driving growth for roofing contractors nationwide.
            </p>
          </Reveal>
        </div>

        {/* 7 Vertical 9:16 Video Reels Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 items-stretch">
          {ROOFING_VIDEOS.map((video, idx) => (
            <VideoTile key={video.id} video={video} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
