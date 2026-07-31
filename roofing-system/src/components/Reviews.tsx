"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BOOKING_PATH } from "../lib/offer";
import { VideoPlayer } from "./VideoPlayer";

const reviews = [
  {
    id: "edgar",
    title: "Edgar & Jeremi",
    subtitle: "High-ticket client acquisition",
    poster: "/media/covers/cover-edgar.png",
    video:
      "https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/69624f63f8a93b76e0751a55.mp4",
  },
  {
    id: "ibam",
    title: "IBAM Case Study",
    subtitle: "System walkthrough + results",
    poster: "/media/covers/cover-ibam.png",
    video:
      "https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/69624f62f8a93b0480751a4e.mp4",
  },
  {
    id: "edgar-2",
    title: "Edgar Results",
    subtitle: "What changed after install",
    poster: "/media/covers/cover-edgar-results.png",
    video:
      "https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/6978f116d560857126a4804c.mp4",
  },
];

export function Reviews() {
  const [active, setActive] = useState("edgar");
  const featured = reviews.find((r) => r.id === active) ?? reviews[0];

  return (
    <section id="reviews" className="section-shell bg-[var(--ink)]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--red)]">
              Reviews & video proof
            </p>
            <h2 className="display mt-3 text-[clamp(2.4rem,5vw,4rem)] text-white">
              HEAR IT FROM
              <br />
              <span className="text-[var(--red)]">THE FIELD</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-white/55 md:text-base">
            Click a story. Watch the proof. Then book if you&apos;re a $1M+
            roofer ready to scale.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="overflow-hidden border border-white/10 bg-black">
            <VideoPlayer
              key={featured.id}
              src={featured.video}
              cover={featured.poster}
              title={featured.title}
            />
            <div className="border-t border-white/10 px-5 py-4 md:px-7 md:py-5">
              <p className="display text-2xl text-white md:text-3xl">
                {featured.title}
              </p>
              <p className="mt-1 text-sm text-white/50">{featured.subtitle}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {reviews.map((item) => {
              const selected = item.id === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item.id)}
                  className={`group grid grid-cols-[112px_1fr] overflow-hidden border text-left transition lg:grid-cols-[128px_1fr] ${
                    selected
                      ? "border-[var(--red)] bg-[var(--red)]/10"
                      : "border-white/10 bg-black/40 hover:border-white/30"
                  }`}
                >
                  <div className="relative aspect-video overflow-hidden bg-black lg:aspect-[16/11]">
                    <Image
                      src={item.poster}
                      alt={`${item.title} cover`}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="160px"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-4">
                    <p className="display text-xl text-white">{item.title}</p>
                    <p className="mt-1 text-xs text-white/45">{item.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link href={BOOKING_PATH} className="cta-btn min-w-[280px]">
            <span className="display text-xl tracking-[0.06em] md:text-2xl">
              BOOK APPLICATION CALL
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
              If we don&apos;t perform — you don&apos;t pay
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
