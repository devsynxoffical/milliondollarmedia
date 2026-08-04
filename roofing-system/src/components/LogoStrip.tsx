"use client";

import Image from "next/image";

const logos = Array.from({ length: 22 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return `/media/logos/logo-${n}.png`;
});

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = [...logos, ...logos];
  return (
    <div className="relative overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black to-transparent md:w-24" />
      <div
        className={`${reverse ? "marquee-track-reverse" : "marquee-track"} items-center gap-5 px-4 md:gap-6`}
      >
        {items.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="group relative flex h-24 w-36 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[var(--navy)] md:h-28 md:w-44"
          >
            <Image
              src={src}
              alt={`Partner logo ${i + 1}`}
              fill
              className="object-contain invert transition duration-500 group-hover:scale-105"
              sizes="176px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function LogoStrip() {
  return (
    <section className="border-y border-[var(--line)] bg-white py-12 md:py-14">
      <div className="mx-auto mb-8 max-w-7xl px-5 text-center md:px-8">
        <p className="eyebrow justify-center">Brands we work with</p>
        <h2 className="display mt-3 text-2xl text-[var(--ink)] md:text-3xl">
          Roofing companies. One ads system.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
          Operators across every roofing niche — from residential replacements
          to commercial storm work — running the same acquisition machine.
        </p>
      </div>
      <Row />
      <div className="mt-3">
        <Row reverse />
      </div>
    </section>
  );
}
