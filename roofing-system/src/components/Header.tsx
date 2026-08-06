"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BOOKING_PATH } from "../lib/offer";

const links = [
  { href: "/#system", label: "Acquisition System" },
  { href: "/#specialties", label: "Specialties" },
  { href: "/#proof", label: "Results" },
  { href: "/#training", label: "Academy" },
];

const mastermindLinks = [
  { href: "/privatemastermind", label: "Audience Segmentation" },
  { href: "/privatemastermind-504306", label: "Ads Copy Creation" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-200 border-b border-zinc-800 bg-[#09090b]/95 backdrop-blur-xl">
      {/* Top Banner Notice */}
      <div className="flex h-9 items-center justify-center gap-2 bg-[var(--accent)] px-4 text-center text-[10px] font-bold tracking-wide text-white md:text-[11px]">
        <span className="flex h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
        <span>For Roofing Companies Doing $1M+/Year</span>
        <span className="hidden text-white/80 md:inline">
          · Double revenue in 90 days or work free.
        </span>
      </div>

      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-5 md:h-18 md:px-8">
        {/* Original Red Logo, No invert filter */}
        <Link href="/" className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="Roofing Systems Co."
            width={300}
            height={100}
            priority
            className="h-10 w-auto md:h-12 object-contain"
          />
        </Link>

        {/* Navigation Pills */}
        <nav className="hidden items-center gap-1 rounded-full border border-zinc-800 bg-zinc-900/90 p-1 backdrop-blur-md lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-1.5 text-[13px] font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            >
              {link.label}
            </a>
          ))}

          {/* Mastermind Dropdown */}
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Mastermind
              <svg
                className="h-3 w-3 text-zinc-400 transition-transform group-hover:rotate-180"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2 4l4 4 4-4" />
              </svg>
            </button>

            <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#09090b]/95 p-2 shadow-xl backdrop-blur-xl">
                <p className="px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                  Private masterminds
                </p>
                {mastermindLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-xl px-3 py-2.5 text-[13px] font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href={BOOKING_PATH}
            className="btn btn-accent text-[13px] font-bold px-5 py-2 sm:inline-flex shadow-sm hover:shadow-md"
          >
            Get Free Demo
          </Link>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 text-white lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex w-4 flex-col gap-1.5">
              <span className={`h-0.5 w-full bg-current transition ${open ? "translate-y-[4px] rotate-45" : ""}`} />
              <span className={`h-0.5 w-full bg-current transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-full bg-current transition ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-zinc-800 bg-[#09090b] lg:hidden">
          <nav className="mx-auto flex max-w-[1240px] flex-col px-5 py-4 gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <p className="px-3 pt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
              Private masterminds
            </p>
            {mastermindLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={BOOKING_PATH}
              onClick={() => setOpen(false)}
              className="btn btn-accent mt-3 w-full justify-center"
            >
              Get Free Demo
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

