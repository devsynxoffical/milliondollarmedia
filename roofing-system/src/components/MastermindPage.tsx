import Link from "next/link";
import type { FunnelConfig } from "../lib/funnels";
import { Footer } from "./Footer";
import { LogoStrip } from "./LogoStrip";
import { ProofGallery } from "./ProofGallery";
import { Reviews } from "./Reviews";
import { VideoPlayer } from "./VideoPlayer";

export function MastermindPage({ funnel }: { funnel: FunnelConfig }) {
  return (
    <main>
      <section className="relative overflow-hidden bg-[var(--fog)] pt-24 md:pt-28">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(237,28,36,0.16), transparent 60%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-14 md:px-8 md:pb-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--purple)] bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--purple)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lime)]" />
              {funnel.eyebrow}
            </p>

            <h1 className="display mt-6 text-[clamp(2rem,5vw,3.8rem)] text-[var(--ink)]">
              {funnel.title}{" "}
              <span className="text-[var(--purple)]">{funnel.titleAccent}</span>
              {funnel.titleEnd ? (
                <>
                  <br />
                  {funnel.titleEnd}
                </>
              ) : null}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
              {funnel.subtitle}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-white shadow-[var(--shadow)]">
            <div className="flex flex-wrap">
              <div className="bg-white px-4 py-2">
                <p className="display text-sm text-[var(--purple)] md:text-base">
                  Private Mastermind
                </p>
              </div>
              <div className="bg-[var(--lime)] px-4 py-2">
                <p className="display text-sm text-[var(--ink)] md:text-base">
                  {funnel.videoLabel}
                </p>
              </div>
            </div>
            <VideoPlayer
              src={funnel.videoSrc}
              cover={funnel.videoCover}
              title={funnel.videoLabel}
            />
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={funnel.bookingPath} className="cta-btn min-w-[260px]">
              <span className="display text-lg tracking-normal md:text-xl">
                {funnel.ctaPrimary}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink)]/70">
                {funnel.ctaPrimarySub}
              </span>
            </Link>
            <Link
              href={funnel.bookingPath}
              className="cta-btn-outline min-w-[240px] flex-col gap-1 py-4"
            >
              <span className="display text-base tracking-normal">
                {funnel.ctaSecondary}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60">
                {funnel.ctaSecondarySub}
              </span>
            </Link>
          </div>
        </div>
      </section>

      <LogoStrip />

      <section className="section-shell bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rail pl-5 md:pl-7">
            <p className="eyebrow">Inside the recording</p>
            <h2 className="display mt-3 text-[clamp(1.9rem,4vw,2.8rem)] text-[var(--ink)]">
              {funnel.learnTitle}
            </h2>
          </div>
          <ul className="space-y-4">
            {funnel.learnItems.map((item, i) => (
              <li
                key={item}
                className="flex gap-4 rounded-2xl border border-[var(--line)] bg-[var(--fog)] p-5"
              >
                <span className="display text-2xl text-[var(--purple)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-[var(--ink)]/75 md:text-base">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-shell bg-[var(--fog)]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="display text-[clamp(1.9rem,4vw,3rem)] text-[var(--ink)]">
            {funnel.trackTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
            {funnel.trackBody}
          </p>
          <Link href={funnel.bookingPath} className="cta-btn mt-10 min-w-[260px]">
            <span className="display text-lg tracking-normal md:text-xl">
              {funnel.ctaPrimary}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink)]/70">
              {funnel.ctaPrimarySub}
            </span>
          </Link>
        </div>
      </section>

      <ProofGallery />
      <Reviews />

      <section className="section-shell bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[2rem] bg-[var(--purple)] px-6 py-14 text-center text-white shadow-[var(--shadow)] md:px-12">
            <h2 className="display text-[clamp(2rem,4.5vw,3.2rem)]">
              Ready to build your
              <br />
              <span className="text-white">sales call machine?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm text-white/70 md:text-base">
              Watch the mastermind. Then book if you&apos;re ready to install the
              full acquisition system for your roofing company.
            </p>
            <Link href={funnel.bookingPath} className="cta-btn mt-8 min-w-[260px]">
              <span className="display text-lg tracking-normal md:text-xl">
                Book Application Call
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink)]/70">
                Free 1:1 · roofers only
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
