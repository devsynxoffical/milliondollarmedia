"use client";

import { FormEvent, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { BOOKING_PATH } from "../lib/offer";
import { CountUp } from "./CountUp";
import { AuroraBg } from "./AuroraBg";

const stats = [
  { end: 50, prefix: "$", suffix: " Million+", label: "Managed in Roofing Ads", sub: "Tested & proven campaigns" },
  { end: 300, prefix: "", suffix: "+", label: "Roofing Contractors", sub: "Scaled across US & Canada" },
  { end: 90, prefix: "", suffix: " Days", label: "Revenue Guarantee", sub: "Backed by written agreement" },
  { end: 100, prefix: "", suffix: "% DFY", label: "Client Acquisition", sub: "Offer, Ads, CRM, AI, Funnels" },
];

const marqueeWords = [
  "ROOFING SYSTEMS™",
  "DOUBLE YOUR REVENUE",
  "IN 90 DAYS",
  "CLIENT ACQUISITION",
  "DONE FOR YOU",
];

const ease = [0.22, 1, 0.36, 1] as const;

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [16, -16]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), {
    stiffness: 180,
    damping: 22,
  });

  const glowX = useTransform(mx, [-0.5, 0.5], [20, 80]);
  const glowY = useTransform(my, [-0.5, 0.5], [20, 80]);
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${glowX}% ${glowY}%, rgba(237,28,36,0.28), transparent 70%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 text-center shadow-xs transition-colors duration-300 hover:border-[var(--accent)]/50 ${className}`}
    >
      <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-70" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <div
        style={{ transform: "translateZ(32px)", transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </motion.div>
  );
}

export function StatsBand() {
  const [email, setEmail] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.4"],
  });

  const headY = useSpring(useTransform(scrollYProgress, [0, 1], [90, 0]), {
    stiffness: 90,
    damping: 24,
  });
  const headRotate = useSpring(useTransform(scrollYProgress, [0, 1], [16, 0]), {
    stiffness: 90,
    damping: 24,
  });
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["2%", "-6%"]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email) {
      window.location.href = `${BOOKING_PATH}?email=${encodeURIComponent(email)}`;
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#09090b] py-16 text-white md:py-24"
    >
      <AuroraBg />
      <div className="jobber-grid-dark absolute inset-0 pointer-events-none opacity-50" />

      {/* 3D scroll-driven marquee */}
      <div style={{ perspective: 900 }} className="relative">
        <motion.div
          aria-hidden
          style={{ x: marqueeX, rotateX: 24 }}
          className="marquee-wrap mt-2 select-none"
        >
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {marqueeWords.map((word) => (
                  <span
                    key={word}
                    className="whitespace-nowrap px-6 text-[clamp(2.8rem,8vw,7rem)] font-bold tracking-tight text-transparent md:px-10"
                    style={{
                      WebkitTextStroke: "1.5px rgba(255,255,255,0.14)",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        {/* Headline with 3D parallax entrance */}
        <div style={{ perspective: 1200 }}>
          <motion.div
            style={{ y: headY, rotateX: headRotate }}
            className="mt-4 text-center"
          >
            <h2 className="text-[clamp(1.75rem,4vw,3.4rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white">
              Join over 300+ roofing contractors who trust{" "}
              <span className="text-[#ed1c24]">Roofing Systems™</span>
            </h2>
          </motion.div>
        </div>

        {/* 3D tilt stat cards */}
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s, idx) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 64, rotateY: -24 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.7, delay: idx * 0.09, ease }}
            >
              <TiltCard className="h-full">
                <span className="inline-block text-[clamp(1.7rem,4vw,2.6rem)] font-medium text-[var(--accent)] transition-transform duration-300 group-hover:scale-110">
                  <CountUp end={s.end} prefix={s.prefix} suffix={s.suffix} />
                </span>
                <p className="mt-2 text-sm font-medium text-white sm:text-base">
                  {s.label}
                </p>
                <p className="mt-1 text-[11px] font-medium text-zinc-400 sm:text-xs">
                  {s.sub}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Opt-in bar */}
        <div className="mx-auto mt-12 max-w-xl" style={{ perspective: 1000 }}>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40, rotateX: 18 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.7, ease }}
            whileHover={{ y: -3 }}
            className="group flex flex-col items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-2 shadow-md transition-colors duration-300 hover:border-[var(--accent)]/40 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email..."
              className="w-full rounded-full bg-transparent px-5 py-3 text-sm text-white placeholder:text-zinc-500 outline-none"
            />
            <button
              type="submit"
              className="btn btn-accent w-full shrink-0 px-6 py-3 text-xs font-bold uppercase tracking-wider sm:w-auto"
            >
              Get Free Demo
            </button>
          </motion.form>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-center text-[11px] font-medium text-zinc-500"
          >
            Strictly for roofing companies doing $1M+/year.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
