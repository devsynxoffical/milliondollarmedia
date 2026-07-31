import Image from "next/image";
import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";

export function ProofGallery() {
  return (
    <section id="results" className="section-shell bg-white text-black">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--red)]">
              Proof wall
            </p>
            <h2 className="display mt-3 text-[clamp(2.4rem,5vw,4rem)] text-black">
              REAL DASHBOARDS.
              <br />
              <span className="text-[var(--red)]">REAL LEADS.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-black/60 md:justify-self-end md:text-base">
            The same transparency you get with live access — campaigns, booked
            calls, revenue tracking, and follow-up systems in one place.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-12 md:gap-5">
          <div className="relative overflow-hidden border border-black/10 bg-black md:col-span-7 md:row-span-2">
            <div className="max-h-[720px] overflow-y-auto">
              <Image
                src="/media/reviews/review-01.png"
                alt="Live results collage"
                width={1200}
                height={2800}
                className="h-auto w-full"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </div>
          </div>

          <div className="relative overflow-hidden border border-black/10 bg-black md:col-span-5">
            <div className="max-h-[340px] overflow-y-auto">
              <Image
                src="/media/reviews/review-02.png"
                alt="Campaign proof screenshots"
                width={900}
                height={2000}
                className="h-auto w-full"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden border border-black/10 bg-black">
              <Image
                src="/media/reviews/poster-edgar.png"
                alt="Client result poster"
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden border border-black/10 bg-black">
              <Image
                src="/media/reviews/poster-ibam.png"
                alt="Case study poster"
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 border border-black/10 bg-black px-6 py-7 text-white md:flex-row md:px-10">
          <p className="display text-2xl md:text-3xl">
            WANT THIS RUNNING ON{" "}
            <span className="text-[var(--red)]">YOUR COMPANY?</span>
          </p>
          <Link href={BOOKING_PATH} className="cta-btn min-w-[240px]">
            <span className="display text-xl tracking-[0.06em]">APPLY NOW</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
              $1M+ roofers only
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
