"use client";

import Image from "next/image";
import { logos } from "../lib/library";

export function LogoMarquee({ title }: { title?: string }) {
  const row1 = logos.slice(0, 11);
  const row2 = logos.slice(11, 22);

  return (
    <section className="relative overflow-hidden border-b border-zinc-800 bg-[#09090b] py-14 text-white">
      <div className="jobber-grid-dark pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-[1240px] px-5 text-center md:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-8">
          <span className="h-2 w-2 rounded-full bg-[#ed1c24] animate-ping" />
          <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-300">
            {title ?? "TRUSTED BY 1,000+ BRANDS & 9-FIGURE OPERATORS WORLDWIDE"}
          </span>
        </div>

        {/* Row 1 - Left Marquee */}
        <div className="relative overflow-hidden py-3">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#09090b] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#09090b] to-transparent" />
          
          <div className="flex gap-6 overflow-hidden">
            <div className="marquee-track flex shrink-0 items-center gap-6">
              {[...row1, ...row1, ...row1].map((src, i) => (
                <div
                  key={i}
                  className="group relative flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#ed1c24]/60 hover:bg-white/[0.08] hover:shadow-[0_0_25px_rgba(237,28,36,0.3)]"
                >
                  <Image
                    src={src}
                    alt="Client logo"
                    width={140}
                    height={50}
                    className="max-h-12 w-auto object-contain opacity-75 brightness-200 transition duration-300 group-hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 - Right Marquee */}
        <div className="relative overflow-hidden py-3 mt-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#09090b] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#09090b] to-transparent" />
          
          <div className="flex gap-6 overflow-hidden">
            <div className="marquee-track-reverse flex shrink-0 items-center gap-6">
              {[...row2, ...row2, ...row2].map((src, i) => (
                <div
                  key={i}
                  className="group relative flex h-20 w-44 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#ed1c24]/60 hover:bg-white/[0.08] hover:shadow-[0_0_25px_rgba(237,28,36,0.3)]"
                >
                  <Image
                    src={src}
                    alt="Client logo"
                    width={140}
                    height={50}
                    className="max-h-12 w-auto object-contain opacity-75 brightness-200 transition duration-300 group-hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
