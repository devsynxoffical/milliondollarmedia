import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { VideoPlayer } from "./VideoPlayer";

const HERO_VIDEO =
  "https://assets.cdn.filesafe.space/HWyar6Z3u3aF6ydghkCx/media/69b311b6cab7f7b0b5822c7a.mp4";
const HERO_VIDEO_COVER = "/media/covers/cover-mastermind.jpeg";

const metrics = [
  {
    value: "$50M+",
    label: "Ad Spend Managed",
    sub: "Proven ROI across industries",
  },
  {
    value: "90-Day",
    label: "Revenue Double Guarantee",
    sub: "Backed by written agreement",
  },
  {
    value: "100%",
    label: "Done-For-You Ecosystem",
    sub: "Ads, Funnels, CRM & AI",
  },
];

export function Hero() {
  return (
    <section className="hero-bg relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="studio-grid absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        {/* Top Hero Heading Block — Centered Layout like Reference Design */}
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center">
          <div className="pill-badge-green animate-fade-in shadow-xs">
            <span className="dot-green" />
            <span>Scale With Ads™ Acquisition System</span>
          </div>

          <h1 className="display mt-6 text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold tracking-tight text-zinc-950">
            Scale With Ads <span className="text-[var(--accent)]">Innovators.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-zinc-600 md:text-xl">
            We install our proprietary client acquisition system into your business — offer positioning, Meta Ads, high-converting funnels, AI follow-up, and sales pipeline — guaranteed to double your revenue in 90 days.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
            <Link
              href={BOOKING_PATH}
              className="btn btn-accent w-full sm:w-auto px-8 py-3.5 text-base font-bold shadow-md hover:shadow-xl transition-all"
            >
              Book Strategy Call →
            </Link>
            <Link
              href="#system"
              className="btn btn-outline w-full sm:w-auto px-7 py-3.5 text-base font-semibold border-zinc-300 text-zinc-800 hover:bg-zinc-100"
            >
              See How It Works
            </Link>
          </div>
        </div>

        {/* 3-Column Floating Metric / KPI Bar — Identical to Reference Image */}
        <div className="mt-14 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-200/80 rounded-2xl border border-zinc-200/80 bg-white/90 p-6 md:p-8 shadow-sm backdrop-blur-md">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col items-center text-center px-4 py-4 md:py-0">
              <span className="display text-3xl md:text-4xl text-zinc-900">{m.value}</span>
              <span className="mt-1 text-sm font-bold text-zinc-800">{m.label}</span>
              <span className="mt-0.5 text-xs text-zinc-500">{m.sub}</span>
            </div>
          ))}
        </div>

        {/* VSL Video Container */}
        <div className="mt-14 mx-auto max-w-4xl">
          <div className="relative rounded-2xl overflow-hidden border border-zinc-200/80 bg-zinc-950 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/90 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-amber-500" />
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="ml-3 text-xs font-mono text-zinc-400">
                scale-with-ads.com — live acquisition system demo
              </span>
            </div>
            <div className="relative aspect-[16/9]">
              <VideoPlayer
                src={HERO_VIDEO}
                cover={HERO_VIDEO_COVER}
                title="The Scale With Ads Client Acquisition System"
                autoPlay
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

