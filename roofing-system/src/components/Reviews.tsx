"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { BOOKING_PATH } from "../lib/offer";
import { Reveal } from "./Reveal";
import { VideoPlayer } from "./VideoPlayer";

const reviews = [
  {
    id: "edgar",
    title: "Client results walkthrough",
    subtitle: "High-ticket acquisition in the field",
    poster: "/media/reviews/poster-edgar.png",
    video:
      "https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/69624f63f8a93b76e0751a55.mp4",
  },
  {
    id: "ibam",
    title: "System case study",
    subtitle: "Walkthrough + results",
    poster: "/media/reviews/poster-ibam.png",
    video:
      "https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/69624f62f8a93b0480751a4e.mp4",
  },
  {
    id: "edgar-2",
    title: "After install",
    subtitle: "What changed once ads were live",
    poster: "/media/reviews/poster-edgar-2.png",
    video:
      "https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/6978f116d560857126a4804c.mp4",
  },
];

const avatars = [
  "/media/reviews/poster-edgar.png",
  "/media/reviews/poster-ibam.png",
  "/media/reviews/poster-edgar-2.png",
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
    <section id="reviews" className="section-shell bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="flex flex-col justify-center">
            <Reveal>
              <p className="eyebrow">Reviews & video proof</p>
              <h2 className="display mt-3 text-[clamp(2rem,4.5vw,3.4rem)] text-[var(--ink)]">
                Hear it from
                <br />
                <span className="text-[var(--purple)]">the field</span>
              </h2>
              <p className="mt-5 max-w-md text-sm text-[var(--muted)] md:text-base">
                Click a story. Watch the proof. Then book if you&apos;re a
                $1M+ roofer ready to scale.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--fog)] p-5 shadow-[var(--shadow-soft)]">
                <div className="flex -space-x-3">
                  {avatars.map((src) => (
                    <div
                      key={src}
                      className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white ring-1 ring-black/15"
                    >
                      <Image
                        src={src}
                        alt="Client"
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-[var(--purple)]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden>
                        <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.6 5.8 21l1.6-7L2 9.2l7.1-.6L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="display text-xl text-[var(--ink)]">
                    300–500{" "}
                    <span className="text-[var(--purple)]">calls / month</span>
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-black/45">
                    Qualified sales calls
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} className="relative">
            <div className="overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-white shadow-[var(--shadow)]">
              <VideoPlayer
                key={featured.id}
                src={featured.video}
                cover={featured.poster}
                title={featured.title}
              />
              <div className="flex items-center justify-between gap-4 border-t border-[var(--line)] px-5 py-4 md:px-7 md:py-5">
                <div>
                  <p className="display text-2xl text-[var(--ink)] md:text-3xl">
                    {featured.title}
                  </p>
                  <p className="mt-1 text-sm text-black/50">
                    {featured.subtitle}
                  </p>
                </div>
                <span className="hidden rounded-full border border-[var(--purple)]/40 bg-[var(--purple-light)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--purple)] sm:inline">
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
                        ? "w-8 bg-[var(--purple)]"
                        : "w-2 bg-black/15 hover:bg-black/30"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous review"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-black transition hover:scale-105 hover:border-[var(--purple)] hover:bg-[var(--purple)] hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                    <path d="M15 5l-7 7 7 7 1.4-1.4L10.8 12l5.6-5.6z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next review"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-black transition hover:scale-105 hover:border-[var(--purple)] hover:bg-[var(--purple)] hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                    <path d="M9 5l7 7-7 7-1.4-1.4L13.2 12 7.6 6.4z" />
                  </svg>
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140} className="mt-12 flex justify-center">
          <Link href={BOOKING_PATH} className="cta-btn min-w-[260px]">
            <span className="display text-lg tracking-normal md:text-xl">
              Book Application Call
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
              If we don&apos;t perform, you don&apos;t pay
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
