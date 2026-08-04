"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { BOOKING_PATH } from "../lib/offer";

type Ad = {
  category: string;
  label: string;
  result: string;
  image: string;
  video: string;
};

const ads: Ad[] = [
  {
    category: "Roofing",
    label: "Roofing · lead gen",
    result: "635 leads in 45 days",
    image: "/media/ads/ad-roofing.jpg",
    video: "/media/videos/ad-x1.mp4",
  },
  {
    category: "HVAC",
    label: "HVAC · 0-down installs",
    result: "Ultra-low CPMs",
    image: "/media/ads/ad-hvac.jpg",
    video:
      "https://assets.cdn.filesafe.space/W8B8H8FvOolLCrvxXzYp/media/69ef9443717d5dd4e170f445.mp4",
  },
  {
    category: "Solar",
    label: "Solar · eligibility check",
    result: "$29K → $86K revenue",
    image: "/media/ads/ad-solar.jpg",
    video:
      "https://assets.cdn.filesafe.space/HWyar6Z3u3aF6ydghkCx/media/69b311b6cab7f7b0b5822c7a.mp4",
  },
  {
    category: "Window & Doors",
    label: "Windows & doors",
    result: "Qualified install calls",
    image: "/media/ads/ad-windows.jpg",
    video:
      "https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/69624f63f8a93b76e0751a55.mp4",
  },
  {
    category: "MVA",
    label: "Legal MVA · accident",
    result: "300–500 calls / month",
    image: "/media/ads/ad-mva.jpg",
    video:
      "https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/69624f62f8a93b0480751a4e.mp4",
  },
  {
    category: "Supplements",
    label: "Supplements · DTC",
    result: "3.32x tracked ROAS",
    image: "/media/ads/ad-supplements.jpg",
    video:
      "https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/6978f116d560857126a4804c.mp4",
  },
  {
    category: "Finance",
    label: "Finance · Seven Fathom",
    result: "$847K client revenue",
    image: "/media/ads/ad-finance.jpg",
    video: "/media/videos/mastermind.mp4",
  },
];

const categories = ["All", "Roofing", "HVAC", "Solar", "Window & Doors", "MVA", "Supplements", "Finance"];

function seekRandom(video: HTMLVideoElement) {
  const d = video.duration;
  if (Number.isFinite(d) && d > 0) {
    video.currentTime = Math.random() * Math.max(d - 1, 0);
  }
}

function AdCard({ ad }: { ad: Ad }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    setMuted(next);
    video.muted = next;
  }

  return (
    <Link
      href={BOOKING_PATH}
      className="group relative block aspect-[9/16] overflow-hidden rounded-xl border border-white/10 bg-[var(--band-2)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/60 hover:shadow-[0_0_44px_-10px_rgba(237,28,36,0.45)]"
    >
      <video
        ref={videoRef}
        src={ad.video}
        poster={ad.image}
        autoPlay
        muted={muted}
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
        onLoadedMetadata={(e) => seekRandom(e.currentTarget)}
        onEnded={(e) => {
          seekRandom(e.currentTarget);
          e.currentTarget.play();
        }}
      />
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition duration-700 group-hover:translate-x-full" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition duration-300 group-hover:from-black/90" />
      <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur transition duration-300 group-hover:border-[var(--accent)]/60">
        {ad.label}
      </span>
      <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white/80 backdrop-blur">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-bright)] opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent-bright)]" />
        </span>
        Live
      </span>
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Turn sound on" : "Mute"}
        className="absolute bottom-12 right-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/55 text-white opacity-70 backdrop-blur transition hover:scale-105 hover:opacity-100 group-hover:opacity-100"
      >
        {muted ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" stroke="none" />
            <path d="M16 9l5 5M21 9l-5 5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" stroke="none" />
            <path d="M15.5 8.5a5 5 0 010 7M18 6a8.5 8.5 0 010 12" />
          </svg>
        )}
      </button>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="display text-sm text-white md:text-base">
          {ad.result}
        </p>
      </div>
    </Link>
  );
}

export function AdsGallery() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? ads : ads.filter((ad) => ad.category === active);

  return (
    <section id="ads" className="panel-ink section-shell">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-bright)]">
              Ads that sell
            </p>
            <h2 className="display mt-3 text-[clamp(2rem,4vw,3.2rem)] text-white">
              Live creative, across
              <br />
              every vertical.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/70">
            Real ad creatives from real installs. Playing live, muted — filter
            by vertical, then book if your market is next.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                active === cat
                  ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                  : "border-white/15 bg-white/5 text-white/70 hover:border-white/40 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((ad) => (
            <AdCard key={ad.image} ad={ad} />
          ))}
        </div>
      </div>
    </section>
  );
}
