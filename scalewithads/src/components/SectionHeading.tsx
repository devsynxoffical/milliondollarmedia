import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  className?: string;
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
  light = false,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={`mx-auto flex max-w-3xl flex-col items-center text-center ${className}`}
    >
      <div className={light ? "pill-badge-red mb-3" : "pill-badge-dark mb-3"}>
        <span className="dot-red" />
        <span>{eyebrow}</span>
      </div>
      <h2 className={`display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${light ? "text-zinc-950" : "text-white"}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 max-w-2xl text-base leading-relaxed ${light ? "text-zinc-600" : "text-zinc-400"}`}>
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

