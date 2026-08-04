"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type VideoPlayerProps = {
  src: string;
  cover: string;
  title: string;
  className?: string;
};

export function VideoPlayer({
  src,
  cover,
  title,
  className = "",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePlay() {
    const video = videoRef.current;
    if (!video) return;

    setError(null);
    setStarted(true);

    try {
      video.currentTime = 0;
      await video.play();
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      console.error("Video play error:", err);
      setError("Video unavailable.");
      setStarted(false);
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
        controls={started && !error}
        playsInline
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
    </div>
  );
}
