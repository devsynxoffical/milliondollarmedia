"use client";

import Image from "next/image";
import { logos } from "../lib/library";
import { SectionBackground } from "./ui/SectionBackground";

export function LogoMarquee({ title }: { title?: string }) {
  const row1 = logos.slice(0, 11);
  const row2 = logos.slice(11, 22);

  return (
    <section className="relative overflow-hidden border-b border-zinc-800 bg-[#070709] py-14 text-white">
      <SectionBackground variant="dark" grid />

      <div className="relative mx-auto max-w-[1240px] px-5 text-center md:px-8">
        {/* Title pill */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-5 py-2 backdrop-blur-md mb-10 shadow-md">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ed1c24] animate-ping" />
          <span className="text-xs font-extrabold uppercase tracking-widest text-zinc-200">
            {title ?? "TRUSTED BY 1,000+ BRANDS & 9-FIGURE OPERATORS WORLDWIDE"}
          </span>
        </div>

        {/* Row 1 - Smooth Left Marquee (Clean Large White Logos, No Cards) */}
        <div className="relative overflow-hidden py-4">
          <div className="flex gap-10 overflow-hidden">
            <div className="marquee-track flex shrink-0 items-center gap-12 md:gap-16">
              {[...row1, ...row1, ...row1].map((src, i) => (
                <div
                  key={i}
                  className="group relative flex h-20 w-48 md:w-56 shrink-0 items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Image
                    src={src}
                    alt="Client logo"
                    width={200}
                    height={80}
                    className="max-h-16 md:max-h-20 w-auto object-contain brightness-0 invert opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 - Smooth Right Marquee */}
        <div className="relative overflow-hidden py-4 mt-4">
          <div className="flex gap-10 overflow-hidden">
            <div className="marquee-track-reverse flex shrink-0 items-center gap-12 md:gap-16">
              {[...row2, ...row2, ...row2].map((src, i) => (
                <div
                  key={i}
                  className="group relative flex h-20 w-48 md:w-56 shrink-0 items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Image
                    src={src}
                    alt="Client logo"
                    width={200}
                    height={80}
                    className="max-h-16 md:max-h-20 w-auto object-contain brightness-0 invert opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]"
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
