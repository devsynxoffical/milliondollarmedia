"use client";

import { ArrowRight } from "lucide-react";

const easeCb = "ease-[cubic-bezier(0.25,0.1,0.25,1)]";

export function RollButton({
  label,
  arrowClass = "text-gray-900",
  circleSize = "h-6 w-6",
  textClass = "text-[13px] font-medium sm:text-[14px]",
}: {
  label: string;
  arrowClass?: string;
  circleSize?: string;
  textClass?: string;
}) {
  return (
    <>
      <span className={`relative h-[20px] overflow-hidden ${textClass}`}>
        <span
          className={`block whitespace-nowrap transition-transform duration-500 ${easeCb} group-hover:-translate-y-1/2`}
        >
          {label}
        </span>
        <span
          className={`block whitespace-nowrap transition-transform duration-500 ${easeCb} group-hover:-translate-y-1/2`}
        >
          {label}
        </span>
      </span>
      <span
        className={`flex shrink-0 items-center justify-center rounded-full bg-white ${circleSize}`}
      >
        <ArrowRight
          className={`h-[14px] w-[14px] transition-transform duration-500 ${easeCb} group-hover:-rotate-45 ${arrowClass}`}
        />
      </span>
    </>
  );
}
