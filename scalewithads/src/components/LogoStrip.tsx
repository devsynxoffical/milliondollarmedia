"use client";

import Image from "next/image";

const logos = Array.from({ length: 22 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return `/media/logos/logo-${n}.png`;
});

export function LogoStrip() {
  const items = [...logos, ...logos];
  return (
    <section className="border-b border-[var(--line)] bg-white py-14">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="eyebrow-accent">Brands we work with</p>
            <h2 className="display mt-2 text-3xl text-[var(--ink)] md:text-4xl">
              Countless verticals. One ads system.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-[var(--muted)]">
            Operators and brands across industries — million-dollar funnel
            proof, not one niche.
          </p>
        </div>
      </div>
      <div className="relative mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-28" />
        <div className="marquee-track items-center gap-8 px-6">
          {items.map((src, i) => (
            <Image
              key={`${src}-${i}`}
              src={src}
              alt={`Brand logo ${i + 1}`}
              width={207}
              height={207}
              className="h-20 w-auto shrink-0 opacity-90 transition duration-500 hover:scale-105 hover:opacity-100 md:h-24"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
