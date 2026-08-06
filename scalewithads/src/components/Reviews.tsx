"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { BOOKING_PATH } from "../lib/offer";
import { VideoPlayer } from "./VideoPlayer";

const reviews = [
  {
    id: "edgar",
    title: "Client results walkthrough",
    subtitle: "High-ticket acquisition in the field",
    client: "Edgar",
    clientRole: "High-ticket sales client",
    poster: "/media/reviews/poster-edgar.png",
    video:
      "https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/69624f63f8a93b76e0751a55.mp4",
  },
  {
    id: "ibam",
    title: "System case study",
    subtitle: "Walkthrough + results",
    client: "Ibam",
    clientRole: "Agency operator",
    poster: "/media/reviews/poster-ibam.png",
    video:
      "https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/69624f62f8a93b0480751a4e.mp4",
  },
  {
    id: "edgar-2",
    title: "After install",
    subtitle: "What changed once ads were live",
    client: "Edgar",
    clientRole: "High-ticket sales client",
    poster: "/media/reviews/poster-edgar-2.png",
    video:
      "https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/6978f116d560857126a4804c.mp4",
  },
];

export function Reviews() {
  const [active, setActive] = useState(0);
  const featured = reviews[active];

  const next = useCallback(() => {
    setActive((v) => (v + 1) % reviews.length);
  }, []);

  const prev = useCallback(() => {
    setActive((v) => (v - 1 + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    const t = window.setInterval(next, 9000);
    return () => window.clearInterval(t);
  }, [next]);

  return (
    <section id="reviews" className="section-shell bg-[var(--bg)]">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="flex flex-col justify-center">
            <p className="eyebrow-bright">Million-dollar funnel testimonials</p>
            <h2 className="display mt-3 text-[clamp(2rem,4vw,3.2rem)] text-white">
              Hear it from
              <br />
              the field
            </h2>
            <p className="mt-5 max-w-md text-sm text-white/55 md:text-base">
              Click a story. Watch the proof. Then book if you&apos;re at the
              $10K minimum.
            </p>

            <div className="mt-8 inline-flex items-center gap-4 self-start rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex -space-x-3">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[var(--band)] ring-1 ring-white/25"
                  >
                    <Image
                      src={r.poster}
                      alt={r.client}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="display text-xl text-white">
                  $50M+{" "}
                  <span className="text-[var(--accent-bright)]">Meta spend</span>
                </p>
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">
                  Tracked · in writing · across verticals
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[var(--accent)]/25 via-transparent to-transparent opacity-0 blur-2xl transition duration-500" />
            <div className="relative card overflow-hidden shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]">
              <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-end px-5 py-3">
                <span className="relative flex items-center gap-2 rounded-full border border-white/25 bg-black/50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-bright)] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-bright)]" />
                  </span>
                  Live walkthrough
                </span>
              </div>
              <VideoPlayer
                key={featured.id}
                src={featured.video}
                cover={featured.poster}
                title={featured.title}
              />
              <div className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4 md:px-6">
                <div>
                  <p className="display text-xl text-white md:text-2xl">
                    {featured.title}
                  </p>
                  <p className="mt-1 text-sm text-white/55">
                    {featured.client} · {featured.clientRole}
                  </p>
                </div>
                <span className="chip hidden bg-[var(--accent-soft)] text-[var(--accent-bright)] sm:inline">
                  Video proof
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {reviews.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Show ${item.title}`}
                    onClick={() => setActive(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === active
                        ? "w-8 bg-[var(--accent)]"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous review"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:scale-105 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                    <path d="M15 5l-7 7 7 7 1.4-1.4L10.8 12l5.6-5.6z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next review"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:scale-105 hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                    <path d="M9 5l7 7-7 7-1.4-1.4L13.2 12 7.6 6.4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Link href={BOOKING_PATH} className="btn btn-accent min-w-[240px] px-7 py-4 text-base">
            Book application call
            <span className="ml-1 text-sm font-medium text-white/75">
              · $10K minimum · 90-day agreement
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
