import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { AdsGallery } from "./AdsGallery";
import { Clients } from "./Clients";
import { LogoStrip } from "./LogoStrip";
import { ProofGallery } from "./ProofGallery";
import { Reveal } from "./Reveal";
import { Reviews } from "./Reviews";

export function Results() {
  return (
    <div id="results">
      <section className="section-shell bg-white">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow-accent">Real client results</p>
            <h2 className="display mx-auto mt-3 text-[clamp(2rem,4.5vw,3.4rem)] text-[var(--ink)]">
              Don&apos;t Take Our Word For It...
              <br />
              <span className="text-[var(--accent)]">
                See What Our Clients Have Achieved.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)]">
              Revenue screenshots. Meta Ads dashboards. Video walkthroughs.
              Case studies across countless verticals—one ads system behind all
              of it.
            </p>
          </Reveal>

          <Reveal delay={140} className="mt-9 text-center">
            <Link
              href={BOOKING_PATH}
              className="btn btn-accent min-w-[280px] px-8 py-4 text-base"
            >
              Book Your Free Strategy Call
            </Link>
          </Reveal>
        </div>
      </section>

      <LogoStrip />
      <ProofGallery />
      <AdsGallery />
      <Clients />
      <Reviews />
    </div>
  );
}
