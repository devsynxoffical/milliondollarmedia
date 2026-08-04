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
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prevSrc, setPrevSrc] = useState(src);

  if (src !== prevSrc) {
    setPrevSrc(src);
    setStarted(false);
    setError(null);
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    try {
      video.currentTime = 0;
    } catch {
      /* ignore seek before metadata */
    }
  }, [src]);

  useEffect(() => {
    if (!autoPlay) return;
    const video = videoRef.current;
    if (!video) return;
    let cancelled = false;

    const tryPlay = (withSound: boolean) => {
      video.muted = !withSound;
      setMuted(!withSound);
      video.play().then(
        () => {
          if (!cancelled) setStarted(true);
        },
        () => {
          if (withSound) tryPlay(false);
          else if (!cancelled) {
            setError("Video unavailable.");
            setStarted(false);
          }
        }
      );
    };

    tryPlay(true);
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
      await video.play();
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      console.error("Video play error:", err);
      setError("Video unavailable.");
      setStarted(false);
    }
  }

  return (
    <div className={`relative aspect-video overflow-hidden bg-[var(--band)] ${className}`}>
      <video
        key={src}
        ref={videoRef}
        src={src}
        className={`absolute inset-0 h-full w-full bg-[var(--band)] object-contain ${
          started && !error ? "opacity-100" : "opacity-0"
        }`}
        controls={started && !error}
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
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 70vw"
          />
          <span className="absolute inset-0 bg-black/30 transition group-hover:bg-black/20" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/90 text-[var(--ink)] shadow-[0_16px_48px_-8px_rgba(12,14,19,0.55)] transition group-hover:scale-105 sm:h-20 sm:w-20">
              {error ? (
                <span className="px-2 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-[#e5484d]">
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
            <span className="absolute inset-x-0 bottom-4 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#ff6b6b]">
              {error}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
