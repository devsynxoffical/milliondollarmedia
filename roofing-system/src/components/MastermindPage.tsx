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
      <section className="relative overflow-hidden bg-[var(--black)] pt-24 md:pt-28">
        <div className="hero-noise pointer-events-none absolute inset-0" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-14 md:px-8 md:pb-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-2 border border-[var(--red)] bg-[var(--red)]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--red)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--red)]" />
              {funnel.eyebrow}
            </p>

            <h1 className="display mt-6 text-[clamp(2.4rem,5.5vw,4.6rem)] text-white">
              {funnel.title}{" "}
              <span className="text-[var(--red)]">{funnel.titleAccent}</span>
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

          <div className="mx-auto mt-10 max-w-5xl overflow-hidden border border-white/10 bg-[#080808] shadow-[0_40px_100px_rgba(0,0,0,0.45)]">
            <div className="flex flex-wrap">
              <div className="bg-white px-4 py-2">
                <p className="display text-sm text-[var(--red)] md:text-base">
                  PRIVATE MASTERMIND
                </p>
              </div>
              <div className="bg-[var(--red)] px-4 py-2">
                <p className="display text-sm text-white md:text-base">
                  {funnel.videoLabel.toUpperCase()}
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
            <Link href={funnel.bookingPath} className="cta-btn min-w-[280px]">
              <span className="display text-xl tracking-[0.06em] md:text-2xl">
                {funnel.ctaPrimary}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
                {funnel.ctaPrimarySub}
              </span>
            </Link>
            <Link
              href={funnel.bookingPath}
              className="cta-btn-outline min-w-[260px] flex-col gap-1 py-4"
            >
              <span className="display text-lg tracking-[0.06em]">
                {funnel.ctaSecondary}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">
                {funnel.ctaSecondarySub}
              </span>
            </Link>
          </div>
        </div>
      </section>

      <LogoStrip />

      <section className="section-shell bg-[var(--ink)]">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rail pl-5 md:pl-7">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--red)]">
              Inside the recording
            </p>
            <h2 className="display mt-3 text-[clamp(2.2rem,4vw,3.4rem)] text-white">
              {funnel.learnTitle.toUpperCase()}
            </h2>
          </div>
          <ul className="space-y-4">
            {funnel.learnItems.map((item, i) => (
              <li
                key={item}
                className="flex gap-4 border border-white/10 bg-black/40 p-5"
              >
                <span className="display text-2xl text-[var(--red)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-white/75 md:text-base">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-shell bg-white text-black">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="display text-[clamp(2.2rem,4vw,3.6rem)]">
            {funnel.trackTitle.toUpperCase()}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-black/60 md:text-lg">
            {funnel.trackBody}
          </p>
          <Link href={funnel.bookingPath} className="cta-btn mt-10 min-w-[280px]">
            <span className="display text-xl tracking-[0.06em] md:text-2xl">
              {funnel.ctaPrimary}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
              {funnel.ctaPrimarySub}
            </span>
          </Link>
        </div>
      </section>

      <ProofGallery />
      <Reviews />

      <section className="section-shell border-t border-[var(--line)] bg-black">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="display text-[clamp(2.4rem,5vw,3.8rem)] text-white">
            READY TO BUILD YOUR
            <br />
            <span className="text-[var(--red)]">SALES CALL MACHINE?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm text-white/55 md:text-base">
            Watch the mastermind. Then book if you&apos;re ready to install the
            full acquisition system for your roofing company.
          </p>
          <Link href={funnel.bookingPath} className="cta-btn mt-8 min-w-[280px]">
            <span className="display text-xl tracking-[0.06em] md:text-2xl">
              BOOK APPLICATION CALL
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
              Free 1:1 · roofers only
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
