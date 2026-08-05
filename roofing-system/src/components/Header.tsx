"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BOOKING_PATH } from "../lib/offer";

const links = [
  { href: "/#problem", label: "Problem" },
  { href: "/#solution", label: "System" },
  { href: "/#included", label: "Included" },
  { href: "/#guarantee", label: "Guarantee" },
];

const dropdown = {
  label: "Masterminds",
  items: [
    { href: "/privatemastermind", label: "Audience segmentation", note: "Higher-quality calls" },
    { href: "/privatemastermind-504306", label: "Ads copy creation", note: "Hidden interest framework" },
  ],
};

export function Header() {
  const [open, setOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[var(--ink-soft)]/70 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:h-[72px] md:px-8">
        <Link href="/" className="relative z-10 shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="Roofing Systems Co."
            width={140}
            height={100}
            preload
            className="h-auto w-[92px] brightness-0 invert transition md:w-[110px]"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-white/90 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setDdOpen(true)}
            onMouseLeave={() => setDdOpen(false)}
          >
            <button
              type="button"
              onClick={() => setDdOpen((v) => !v)}
              className="flex items-center gap-1.5 text-sm font-semibold text-white/90 transition hover:text-white"
              aria-expanded={ddOpen}
            >
              {dropdown.label}
              <svg
                viewBox="0 0 24 24"
                className={`h-3 w-3 fill-current transition duration-200 ${
                  ddOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              >
                <path d="M12 16l-8-8h16z" />
              </svg>
            </button>

            <div
              className={`absolute left-1/2 top-full w-72 -translate-x-1/2 pt-4 transition-all duration-300 ${
                ddOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
              }`}
            >
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-[var(--ink-soft)] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                {dropdown.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDdOpen(false)}
                    className="group flex flex-col gap-1 border-b border-white/10 px-5 py-4 last:border-0 transition hover:bg-white/10"
                  >
                    <span className="text-sm font-bold text-white transition group-hover:text-[var(--red-bright)]">
                      {item.label}
                    </span>
                    <span className="text-xs text-white/45">{item.note}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={BOOKING_PATH}
            className="hidden rounded-full bg-[var(--purple)] px-5 py-2.5 text-xs font-bold text-white shadow-[0_8px_24px_rgba(237,28,36,0.35)] transition hover:scale-105 hover:bg-[var(--purple-dark)] sm:inline-flex"
          >
            Get Started
          </Link>

          <button
            type="button"
            className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white lg:hidden`}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex w-4 flex-col gap-1.5">
              <span
                className={`h-px w-full bg-white transition ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-full bg-white transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-px w-full bg-white transition ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[var(--ink-soft)] lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-3 text-sm font-semibold text-white/80"
              >
                {link.label}
              </a>
            ))}
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--red-bright)]">
              Masterminds
            </p>
            {dropdown.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-3 text-sm font-semibold text-white/80"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={BOOKING_PATH}
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-[var(--purple)] px-4 py-3 text-center text-xs font-bold text-white"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
