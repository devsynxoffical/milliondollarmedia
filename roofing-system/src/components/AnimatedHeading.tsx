"use client";

import { motion, type Variants } from "framer-motion";

type Mode = "rise" | "flip" | "blur" | "chars";

type AnimatedHeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";
  text: string;
  className?: string;
  accent?: string | string[];
  accentClass?: string;
  mode?: Mode;
  stagger?: number;
  delay?: number;
  once?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

function wordVariants(mode: Mode): Variants {
  const hidden: {
    opacity: number;
    y?: string | number;
    rotate?: number;
    scale?: number;
    filter?: string;
  } = {
    opacity: 0,
  };
  if (mode === "flip") {
    hidden.y = 40;
    hidden.rotate = 10;
    hidden.scale = 0.8;
  } else if (mode === "blur") {
    hidden.y = 24;
    hidden.filter = "blur(10px)";
  } else if (mode === "chars") {
    hidden.scale = 0.4;
    hidden.rotate = 8;
  } else {
    hidden.y = "110%";
    hidden.rotate = 3;
  }
  return {
    hidden,
    show: {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.85, ease },
    },
  };
}

export function AnimatedHeading({
  as: Tag = "h2",
  text,
  className = "",
  accent = [],
  accentClass = "hw-accent",
  mode = "rise",
  stagger = 0.05,
  delay = 0,
  once = true,
}: AnimatedHeadingProps) {
  const words = text.trim().split(/\s+/);
  const accentSet = Array.isArray(accent) ? new Set(accent) : new Set([accent]);

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const wordVar = wordVariants(mode);

  return (
    <Tag className={className}>
      <motion.span
        className="inline-flex flex-wrap"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once, margin: "0px 0px -60px 0px" }}
      >
        {words.map((word, i) => {
          const isAccent =
            accentSet.has(word) || accentSet.has(word.replace(/[.,!?;:"]$/, ""));
          return (
            <span
              key={`${word}-${i}`}
              className="inline-block overflow-hidden align-bottom"
              style={{ paddingBottom: "0.16em", marginBottom: "-0.16em" }}
            >
              <motion.span
                variants={wordVar}
                className={`inline-block will-change-transform heading-word ${
                  isAccent ? accentClass : ""
                }`}
              >
                {word}
                {i < words.length - 1 ? "\u00A0" : ""}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
