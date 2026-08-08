"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BOOKING_PATH } from "../lib/offer";
import { cn } from "../lib/utils";

const links = [
  { href: "/#why", label: "Why Us" },
  { href: "/#results", label: "Results" },
  { href: "/#roofing-work", label: "Industries" },
  { href: "/#process", label: "Process" },
  { href: "/#training", label: "Academy" },
];

const mastermindLinks = [
  { href: "/privatemastermind", label: "Audience Segmentation" },
  { href: "/privatemastermind-504306", label: "Ads Copy Creation" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bannerHidden, setBannerHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (window.scrollY > 320) setBannerHidden(true);
      else setBannerHidden(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled && "border-b border-line bg-[#06080a]/80 backdrop-blur-xl"
      )}
    >
      {/* Top Banner Notice */}
      <div
        className={cn(
          "flex h-9 items-center justify-center gap-2 bg-[#ed1c24] px-4 text-center text-[10px] font-bold tracking-wide text-white transition-all duration-500 md:text-[11px]",
          bannerHidden && "max-h-0 overflow-hidden opacity-0"
        )}
      >
        <span className="flex h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
        <span>For Roofing Companies Doing $1M+/Year</span>
        <span className="hidden text-white/80 md:inline">
          · Double revenue in 90 days or work free.
        </span>
      </div>

      <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between gap-4 px-5 md:h-18 md:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="Roofing Systems Co."
            width={300}
            height={100}
            priority
            className="h-10 w-auto object-contain md:h-12"
          />
        </Link>

        {/* Navigation Pills */}
        <nav className="hidden items-center gap-1 rounded-full border border-line bg-[#0f1216]/90 p-1 backdrop-blur-md lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative rounded-full px-4 py-1.5 text-[13px] font-semibold text-mist transition hover:text-fog"
            >
              {link.label}
              <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-[#ed1c24] transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}

          {/* Mastermind Dropdown */}
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-semibold text-mist transition hover:text-fog"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Mastermind
              <svg
                className="h-3 w-3 text-dim transition-transform duration-300 group-hover:rotate-180"
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
              <div className="overflow-hidden rounded-2xl border border-line bg-[#06080a]/95 p-2 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.85)] backdrop-blur-xl">
                <p className="px-3 pb-1 pt-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-dim">
                  Private masterminds
                </p>
                {mastermindLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group/item block rounded-xl px-3 py-2.5 text-[13px] font-semibold text-mist transition hover:bg-elevated hover:text-fog"
                  >
                    <span className="flex items-center justify-between gap-2">
                      {link.label}
                      <span className="translate-x-1 text-[#ed1c24] opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100">
                        →
                      </span>
                    </span>
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
            data-cursor="book"
            className="hidden items-center gap-2 rounded-full bg-[#ed1c24] px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_0_30px_-10px_rgba(237,28,36,0.7)] transition-all duration-300 hover:bg-[#ff2a1f] hover:shadow-[0_0_45px_-8px_rgba(237,28,36,0.9)] sm:inline-flex"
          >
            Get Free Demo
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Link>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-white lg:hidden"
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

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-[-1] h-screen overflow-y-auto bg-[#06080a]/95 pt-32 backdrop-blur-2xl transition-all duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <nav className="mx-auto flex max-w-[88rem] flex-col px-5 py-4">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-semibold text-mist transition hover:bg-elevated hover:text-fog"
              style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
            >
              {link.label}
            </a>
          ))}
          <p className="px-3 pt-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-dim">
            Private masterminds
          </p>
          {mastermindLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-semibold text-mist transition hover:bg-elevated hover:text-fog"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={BOOKING_PATH}
            onClick={() => setOpen(false)}
            data-cursor="book"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#ed1c24] px-5 py-3.5 text-sm font-bold text-white"
          >
            Get Free Demo
          </Link>
        </nav>
      </div>
    </header>
  );
}
