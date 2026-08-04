"use client";

import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
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

export function Reviews() {
  const featured = reviews[0];
  const sideVideos = reviews.slice(1);

  return (
    <section id="reviews" className="section-shell bg-white">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow-accent">Million-dollar funnel testimonials</p>
            <h2 className="display mt-3 text-[clamp(2.2rem,4vw,3.4rem)] text-[var(--ink)]">
              Hear it from the field
            </h2>
          </div>
          <p className="text-[var(--muted)]">
            Three video walkthroughs from real client results. Watch the proof,
            then book if you&apos;re at the $10K minimum.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="card overflow-hidden shadow-[0_24px_60px_-24px_rgba(16,24,40,0.3)]">
            <VideoPlayer
              src={featured.video}
              cover={featured.poster}
              title={featured.title}
            />
            <div className="flex items-center justify-between border-t border-[var(--line)] px-5 py-4">
              <div>
                <p className="display text-xl text-[var(--ink)]">
                  {featured.title}
                </p>
                <p className="mt-0.5 text-sm text-[var(--muted)]">
                  {featured.subtitle}
                </p>
              </div>
              <span className="chip bg-[var(--accent-soft)] text-[var(--accent)]">
                Featured
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {sideVideos.map((item) => (
              <div
                key={item.id}
                className="card overflow-hidden p-2 transition hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(16,24,40,0.22)]"
              >
                <VideoPlayer
                  src={item.video}
                  cover={item.poster}
                  title={item.title}
                  className="rounded-lg"
                />
                <div className="px-3 pb-2 pt-3">
                  <p className="display text-lg text-[var(--ink)]">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--muted)]">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
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
