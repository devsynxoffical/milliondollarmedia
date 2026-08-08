"use client";

import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";
import { ShaderBackdrop } from "./axion/ShaderBackdrop";
import { RollButton } from "./ui/RollButton";
import { GuaranteeBadge } from "./ui/GuaranteeBadge";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#EFEFEF]">
      <ShaderBackdrop />

      <div className="flex-1" />

      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <p className="mb-5 text-[13px] tracking-wide text-gray-900 sm:mb-6 sm:text-[14px]">
          Roofing Systems Co.
        </p>

        <h1 className="max-w-4xl text-[clamp(1.75rem,4.5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-[clamp(2rem,4vw,3.5rem)]">
          Double Your Roofing Revenue Within The Next 90 Days.
        </h1>

        <p className="mt-5 max-w-2xl text-[clamp(1.1rem,2vw,1.5rem)] font-medium leading-snug text-gray-900 sm:mt-6">
          We Will Install Our Proprietary Roofing Systems™ Into Your Roofing
          Company...
        </p>

        <p className="mt-4 max-w-xl text-[15px] font-medium leading-[1.6] text-gray-600 sm:text-[16px]">
          Or We&apos;ll Continue Working For You At No Management Fee Until We
          Do.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:gap-5">
          <Link
            href={BOOKING_PATH}
            className="group flex items-center gap-2 rounded-full bg-[#ed1c24] py-2 pl-5 pr-2 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-[#c4181e] sm:py-2 sm:pl-6 sm:text-[14px]"
          >
            <RollButton
              label="Book Your Free Strategy Call"
              circleSize="h-7 w-7 sm:h-8 sm:w-8"
              arrowClass="text-[#ed1c24]"
            />
          </Link>
          <GuaranteeBadge />
        </div>
      </div>
    </section>
  );
}
