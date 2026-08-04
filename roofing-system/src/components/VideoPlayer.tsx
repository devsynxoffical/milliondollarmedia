"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type VideoPlayerProps = {
  src: string;
  cover: string;
  title: string;
  className?: string;
  autoPlay?: boolean;
};

export function VideoPlayer({
  src,
  cover,
  title,
  className = "",
  autoPlay = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!autoPlay) return;
    const video = videoRef.current;
    if (!video) return;
    let cancelled = false;

    const tryPlay = () => {
      video.muted = true;
      setMuted(true);
      video.play().then(
        () => {
          if (!cancelled) setStarted(true);
        },
        () => {
          if (!cancelled) {
            setError("Video unavailable.");
            setStarted(false);
          }
        }
      );
    };

    tryPlay();
    return () => {
      cancelled = true;
    };
  }, [autoPlay, src]);

  async function handlePlay() {
    const video = videoRef.current;
    if (!video) return;

    setError(null);
    setStarted(true);

    try {
      if (autoPlay) {
        video.muted = muted;
      }
      await video.play();
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      console.error("Video play error:", err);
      setError("Video unavailable.");
      setStarted(false);
    }
  }

  async function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !muted;
    video.muted = nextMuted;
    setMuted(nextMuted);
    if (!nextMuted) {
      try {
        await video.play();
        setStarted(true);
      } catch {
        /* ignore */
      }
    }
  }

  return (
    <div className={`relative aspect-video overflow-hidden bg-black ${className}`}>
      <video
        key={src}
        ref={videoRef}
        src={src}
        className={`absolute inset-0 h-full w-full bg-black object-contain ${
          started && !error ? "opacity-100" : "opacity-0"
        }`}
        controls={started && !error && !autoPlay}
        playsInline
        loop={autoPlay}
        muted={muted}
        preload="metadata"
        onError={() => {
          setError("Video unavailable.");
          setStarted(false);
        }}
      >
        <track kind="captions" />
      </video>

      {(!started || error) && (
        <button
          type="button"
          onClick={handlePlay}
          className="group absolute inset-0 z-10"
          aria-label={`Play ${title}`}
        >
          <Image
            src={cover}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 70vw"
          />
          <span className="absolute inset-0 bg-black/35 transition group-hover:bg-black/25" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/55 text-white shadow-[0_0_40px_rgba(200,16,46,0.35)] transition group-hover:scale-105 sm:h-20 sm:w-20">
              {error ? (
                <span className="px-2 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-[#ff4b3e]">
                  Retry
                </span>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="ml-1 h-7 w-7 fill-current"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </span>
          </span>
          {error && (
            <span className="absolute inset-x-0 bottom-4 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#ff4b3e]">
              {error}
            </span>
          )}
        </button>
      )}

      {autoPlay && started && !error && (
        <button
          type="button"
          onClick={toggleSound}
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80"
          aria-label={muted ? "Unmute video" : "Mute video"}
        >
          {muted ? (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current"
              aria-hidden
            >
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.6 3l3.7-3.7-1.4-1.4-3.7 3.7-3.7-3.7-1.4 1.4L13.8 12l-3.7 3.7 1.4 1.4 3.7-3.7 3.7 3.7 1.4-1.4-3.7-3.7z" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current"
              aria-hidden
            >
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4zM14 3.23v2.06a7 7 0 010 13.42v2.06a9 9 0 000-17.54z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
