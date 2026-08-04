import Image from "next/image";
import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { ProgressCircle } from "./ProgressCircle";
import { Reveal } from "./Reveal";

const rules = [
  {
    title: "Roofers only",
    body: "Built specifically for roofing companies. Not agencies. Not other trades.",
  },
  {
    title: "$1M+ minimum",
    body: "Under $1M a year? Don’t apply. We only partner with operators ready to scale hard.",
  },
  {
    title: "Written agreement",
    body: "90-day revenue doubling terms are spelled out clearly before you start.",
  },
];

export function Qualification() {
  return (
    <section className="section-shell bg-[var(--fog)]">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <Reveal className="relative">
          <div
            className="pointer-events-none absolute -inset-8 -z-0 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 40% 40%, rgba(237,28,36,0.18), transparent 65%)",
            }}
          />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-white shadow-[0_40px_100px_rgba(21,21,40,0.1)]">
            <Image
              src="/media/video/masterclass-poster.png"
              alt="Roofing Systems Co. masterclass"
              width={1470}
              height={956}
              className="h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--purple)]/25 via-transparent to-transparent" />
          </div>

          <div className="float-icon-soft absolute -bottom-5 right-6 z-10 rounded-2xl border border-[var(--line)] bg-white px-6 py-4 shadow-[var(--shadow)]">
            <p className="display text-3xl text-[var(--purple)]">2×</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ink)]/60">
              Revenue target · 90 days
            </p>
          </div>

          <div className="absolute left-6 top-6 z-10 rounded-full bg-[var(--lime)] px-4 py-1.5">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--ink)]">
              Qualification gate
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">About the program</p>
            <h2 className="display mt-4 text-[clamp(2rem,4.5vw,3.2rem)] text-[var(--ink)]">
              Skills to improve your
              <br />
              <span className="text-[var(--purple)]">company brand</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--muted)]">
              Serious roofers only. If you&apos;re not at $1M yet — come back
              when you are. We handle the acquisition machine so you can focus
              on closing.
            </p>
          </Reveal>

          <div className="mt-10 grid max-w-md grid-cols-2 gap-8">
            <Reveal delay={80}>
              <ProgressCircle
                value={90}
                unit=""
                label="90 Days"
                sub="To double revenue"
                size={130}
              />
            </Reveal>
            <Reveal delay={200}>
              <ProgressCircle
                value={100}
                label="Handled"
                sub="System run for you"
                size={130}
              />
            </Reveal>
          </div>

          <Reveal delay={120} className="mt-10 space-y-3">
            {rules.map((item) => (
              <div
                key={item.title}
                className="group flex items-start gap-4 rounded-2xl border border-[var(--line)] bg-white p-4 transition hover:border-[var(--purple)]/40 hover:shadow-[var(--shadow-soft)]"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--purple)] text-xs font-bold text-white">
                  ✓
                </span>
                <div>
                  <p className="font-bold text-[var(--ink)]">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal delay={180}>
            <Link href={BOOKING_PATH} className="cta-btn-dark mt-8 inline-flex">
              <span className="display text-base tracking-normal">
                I Qualify — Book My Call
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
