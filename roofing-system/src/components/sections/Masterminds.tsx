"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const masterminds = [
  {
    title: "The Audience Segmentation Playbook Behind Higher-Quality Roofing Calls",
    meta: "Private mastermind",
    image: "/media/video/masterclass-poster-2.png",
    href: "/privatemastermind",
  },
  {
    title: "The “Hidden Facebook Interest” Framework Behind 300–500 Roofing Calls",
    meta: "Ads copy mastermind",
    image: "/media/covers/cover-ads-copy.jpeg",
    href: "/privatemastermind-504306",
  },
];

export function Masterminds() {
  return (
    <Section id="masterminds" className="bg-ink">
      <SectionHeading
        eyebrow="Free masterminds"
        title={
          <>
            Watch the private <em className="font-semibold not-italic text-lime">recordings...</em>
          </>
        }
        subtitle="No email walls — just the breakdown, then book if it fits."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {masterminds.map((m, i) => (
          <Reveal key={m.href} delay={i * 0.1} y={36}>
            <Link
              href={m.href}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-panel p-3 transition-colors duration-500 hover:border-lime/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                  src={m.image}
                  alt={m.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-lime px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                  Free
                </span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
                    <Play className="h-6 w-6 fill-current" />
                  </span>
                </span>
                <span className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-widest text-white/80">
                  {m.meta}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="font-mono text-[11px] uppercase tracking-widest text-lime">
                  Free mastermind
                </p>
                <h3 className="mt-3 flex-1 text-lg font-semibold leading-snug tracking-tight text-fog sm:text-xl">
                  {m.title}
                </h3>
                <span className="mt-5 inline-flex items-center gap-2 border-t border-line pt-5 text-sm font-bold text-lime">
                  Watch recording
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
