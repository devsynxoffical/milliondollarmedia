"use client";

import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { VideoPlayer } from "./VideoPlayer";

const bullets = [
  "Funnel built to book qualified roofing sales calls",
  "Creatives designed for high-ticket close rates",
  "Daily ad management + optimization",
  "Follow-up handled so you don’t chase leads",
];

const COVER = "/media/covers/cover-masterclass.png";
const VIDEO =
  "https://assets.cdn.filesafe.space/HWyar6Z3u3aF6ydghkCx/media/69b311b6cab7f7b0b5822c7a.mp4";

export function Masterclass() {
  return (
    <section id="masterclass" className="section-shell bg-black">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
        <div className="relative overflow-hidden border border-white/10 bg-[#080808] shadow-[0_40px_100px_rgba(0,0,0,0.45)]">
          <div className="absolute left-0 top-0 z-20 flex">
            <div className="bg-white px-4 py-2">
              <p className="display text-sm text-[var(--red)] md:text-base">
                SYSTEMS BREAKDOWN
              </p>
            </div>
            <div className="bg-[var(--red)] px-4 py-2">
              <p className="display text-sm text-white md:text-base">
                WATCH NOW
              </p>
            </div>
          </div>

          <VideoPlayer src={VIDEO} cover={COVER} title="Systems breakdown" />
        </div>

        <div className="rail pl-5 md:pl-7">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--red)]">
            See the machine
          </p>
          <h2 className="display mt-3 text-[clamp(2.2rem,4vw,3.4rem)] text-white">
            YOU JUST
            <br />
            TAKE THE
            <br />
            <span className="text-[var(--red)]">SALES CALL</span>
          </h2>
          <ul className="mt-7 space-y-4">
            {bullets.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-white/70 md:text-base">
                <span className="mt-2 h-2 w-2 shrink-0 bg-[var(--red)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link href={BOOKING_PATH} className="cta-btn mt-8 w-full sm:w-auto">
            <span className="display text-xl tracking-[0.06em]">
              BOOK APPLICATION CALL
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
              Live access included
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
