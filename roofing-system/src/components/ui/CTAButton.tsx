"use client";

import Link from "next/link";
import { RollButton } from "./RollButton";

export function CTAButton({
  href,
  label,
  color = "red",
  size = "md",
  className = "",
}: {
  href: string;
  label: string;
  color?: "red" | "black";
  size?: "md" | "lg";
  className?: string;
}) {
  const palette = {
    red: "bg-[#ed1c24] text-white hover:bg-[#c4181e]",
    black: "bg-gray-900 text-white hover:bg-gray-800",
  } as const;

  const pad = size === "lg" ? "py-2.5 pl-5 pr-2.5 sm:pl-6" : "py-2 pl-5 pr-2";
  const circle = size === "lg" ? "h-7 w-7 sm:h-8 sm:w-8" : "h-6 w-6";
  const text =
    size === "lg"
      ? "text-[14px] font-medium sm:text-[15px]"
      : "text-[13px] font-medium sm:text-[14px]";
  const arrow = color === "red" ? "text-[#ed1c24]" : "text-gray-900";

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full ${pad} ${text} transition-colors duration-300 ${palette[color]} ${className}`}
    >
      <RollButton label={label} circleSize={circle} arrowClass={arrow} textClass={text} />
    </Link>
  );
}
