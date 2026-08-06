"use client";

import Image from "next/image";

const logos = Array.from({ length: 22 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return `/media/logos/logo-${n}.png`;
});

export function LogoStrip() {
  const items = [...logos, ...logos];
  return (
    <section className="border-b border-white/10 bg-[var(--bg)] py-14">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="eyebrow-bright">Brands we work with</p>
            <h2 className="display mt-2 text-3xl text-white md:text-4xl">
              Countless verticals. One ads system.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/60">
            Operators and brands across industries — million-dollar funnel
            proof, not one niche.
          </p>
        </div>
      </div>
      <div className="relative mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--bg)] to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--bg)] to-transparent md:w-28" />
        <div className="marquee-track items-center gap-8 px-6">
          {items.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="group flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-2 transition duration-300 hover:border-[var(--accent)]/50 hover:shadow-[0_0_28px_-8px_rgba(237,28,36,0.6)] md:h-24 md:w-24"
            >
              <Image
                src={src}
                alt={`Brand logo ${i + 1}`}
                width={207}
                height={207}
                className="h-full w-auto object-contain opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
