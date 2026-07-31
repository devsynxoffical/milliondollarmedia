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
            className="relative flex h-28 w-40 shrink-0 items-center justify-center overflow-hidden border border-white/10 bg-white/[0.03] md:h-36 md:w-52"
          >
            <Image
              src={src}
              alt={`Partner logo ${i + 1}`}
              fill
              className="object-contain scale-[1.45] opacity-95"
              sizes="208px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function LogoStrip() {
  return (
    <section className="border-y border-[var(--line)] bg-black py-10 md:py-12">
      <div className="mx-auto mb-6 max-w-7xl px-5 text-center md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
          Trusted by operators across high-ticket acquisition
        </p>
        <h2 className="display mt-3 text-3xl text-white md:text-4xl">
          COMPANIES WE WORK WITH
        </h2>
      </div>
      <Row />
      <div className="mt-3">
        <Row reverse />
      </div>
    </section>
  );
}
