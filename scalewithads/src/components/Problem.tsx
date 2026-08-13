"use client";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SectionBackground } from "./ui/SectionBackground";
import MagicBento from "./ui/MagicBento";



export function Problem() {
  return (
    <section
      id="problem"
      className="relative overflow-hidden border-b border-zinc-200 bg-white py-20 text-zinc-950 md:py-28"
    >
      <SectionBackground variant="light" grid />

      {/* Ambient red glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 -z-0 h-72 w-[52rem] max-w-full -translate-x-1/2 rounded-full opacity-[0.07] blur-3xl"
        style={{
          background:
            "radial-gradient(circle, #ed1c24 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          light
          eyebrow="WHY GROWTH STALLS"
          title={
            <>
              Most Businesses Don&apos;t Have A Lead Problem...{" "}
              <span className="text-[#ed1c24]">
                They Have A System Problem
              </span>
            </>
          }
          description="Understanding the four critical gaps that drain marketing ROI and cause customer pipeline leaks."
        />

        {/* The 4 Gaps - Interactive Cards */}
        <div className="relative mt-16 mb-8 w-full max-w-[1000px] mx-auto">
          <MagicBento 
            textAutoHide={false} 
            enableStars={true} 
            enableSpotlight={true} 
            enableBorderGlow={true} 
            enableTilt={true} 
            enableMagnetism={false} 
            clickEffect={true} 
            spotlightRadius={400} 
            particleCount={12} 
            glowColor="237, 28, 36" 
            disableAnimations={false} 
          />
        </div>
      </div>
    </section>
  );
}
