"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BOOKING_PATH } from "../../lib/offer";
import { Reveal } from "../Reveal";
import { SectionBadge } from "../axion/SectionBadge";
import { CTAButton } from "../ui/CTAButton";

const accordionItems = [
  {
    id: 1,
    title: "Replacement Roofers",
    imageUrl: "https://images.unsplash.com/photo-1635424709845-3a85ad5e1f5e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Storm & Insurance Roofers",
    imageUrl: "https://images.unsplash.com/photo-1669215526577-c25a8f063677?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Metal Roofing Contractors",
    imageUrl: "https://images.unsplash.com/photo-1673645652350-6a4c31c1c78f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Residential Shingle Roofers",
    imageUrl: "https://images.unsplash.com/photo-1590365876016-da05ac533e83?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Commercial & Tile Roofers",
    imageUrl: "https://images.unsplash.com/photo-1528223871781-8f4c984f6164?q=80&w=1600&auto=format&fit=crop",
  },
];

function AccordionItem({
  item,
  isActive,
  onSelect,
}: {
  item: (typeof accordionItems)[number];
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={onSelect}
      onMouseEnter={onSelect}
      style={{ width: isActive ? "58%" : "9%" }}
      className={`
        group relative flex-none overflow-hidden rounded-2xl cursor-pointer text-left outline-none
        transition-all duration-700 ease-in-out
        ${isActive ? "shadow-[0_24px_60px_-20px_rgba(237,28,36,0.5)]" : "hover:shadow-[0_16px_40px_-18px_rgba(0,0,0,0.6)]"}
      `}
    >
      <Image
        src={item.imageUrl}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, 40vw"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/35 transition-colors duration-500" />
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{ background: isActive ? "linear-gradient(to top, rgba(9,9,11,0.85), transparent 65%)" : "none" }}
      />
      <span
        className={`
          absolute text-white font-extrabold tracking-tight transition-all duration-300 ease-in-out
          ${isActive
            ? "bottom-6 left-6 -translate-x-0 translate-y-0 rotate-0 text-base sm:text-lg"
            : "bottom-10 left-1/2 -translate-x-1/2 rotate-90 text-sm sm:text-base whitespace-nowrap origin-bottom"}
        `}
      >
        {item.title}
      </span>
    </button>
  );
}

export function InteractiveImageAccordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="specialties" className="section-shell bg-white border-b border-zinc-100">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14">
          <div className="w-full md:w-[38%] text-center md:text-left">
            <div className="mx-auto w-fit md:mx-0">
              <SectionBadge num="10" label="For Every Roofing Company" />
            </div>
            <h2 className="mt-8 text-[clamp(1.75rem,4vw,3.4rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900">
              From Shingles To Steel. Every Niche. One System.
            </h2>
            <p className="mt-5 text-[15px] font-medium leading-[1.6] text-gray-600 sm:text-[16px]">
              Residential, commercial, storm damage, metal, tile — our
              done-for-you acquisition system fills the pipeline for every
              type of roofing company, feeding them homeowners who are ready
              to invest.
            </p>
            <CTAButton
              href={BOOKING_PATH}
              label="Get Roofs In Your Pipeline"
              size="lg"
              className="mt-7"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-[62%]"
          >
            <div
              className="relative flex h-[420px] sm:h-[480px] w-full items-stretch justify-between"
              onMouseLeave={() => setActiveIndex(0)}
            >
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onSelect={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
