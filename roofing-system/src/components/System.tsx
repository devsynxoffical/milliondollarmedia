import Image from "next/image";
import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";

const steps = [
  {
    step: "01",
    title: "Funnel",
    body: "High-converting roofing funnel built to book qualified sales calls — not tire-kickers.",
    image: "/media/system/funnel.png",
  },
  {
    step: "02",
    title: "Creatives",
    body: "Ads, angles, and offers designed for roofers who close high-ticket jobs.",
    image: "/media/system/creatives.png",
  },
  {
    step: "03",
    title: "Ad management",
    body: "We run and optimize campaigns daily so leads keep flowing into your calendar.",
    image: "/media/system/ads.png",
  },
  {
    step: "04",
    title: "Follow-up",
    body: "We handle follow-up so prospects get worked — you don’t chase them yourself.",
    image: "/media/system/followup.png",
  },
];

export function System() {
  return (
    <section id="system" className="section-shell bg-[var(--fog)] text-black">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--red)]">
            The operating system
          </p>
          <h2 className="display mt-3 text-[clamp(2.4rem,5vw,4rem)] text-black">
            FOUR MOVES.
            <br />
            <span className="text-[var(--red)]">ONE MACHINE.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/65 md:text-lg">
            We run the full acquisition engine. Your job is simple — close the
            job on the sales call.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {steps.map((item, index) => {
            const reverse = index % 2 === 1;
            return (
              <article
                key={item.step}
                className={`grid overflow-hidden border border-black/10 bg-white lg:grid-cols-2 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative min-h-[240px] bg-[#0a0a0a] md:min-h-[320px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-4 md:p-6"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute left-4 top-4 bg-[var(--red)] px-3 py-1">
                    <p className="display text-lg text-white">{item.step}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center p-7 md:p-10">
                  <h3 className="display text-4xl text-black md:text-5xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-black/65">
                    {item.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href={BOOKING_PATH} className="cta-btn min-w-[280px]">
            <span className="display text-xl tracking-[0.06em] md:text-2xl">
              PUT THIS ON MY BUSINESS
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
              Book application call
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
