"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BOOKING_PATH } from "../lib/offer";

const links = [
  { href: "/#system", label: "System" },
  { href: "/#results", label: "Results" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#contact", label: "Contact" },
];

const dropdown = {
  label: "Masterminds",
  items: [
    { href: "/privatemastermind", label: "Audience segmentation", note: "Higher-quality calls" },
    { href: "/privatemastermind-504306", label: "Ads copy creation", note: "Hidden interest framework" },
  ],
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled || open
          ? "border-b border-[var(--line)] bg-white/95 shadow-[0_8px_30px_rgba(21,21,40,0.06)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:h-[72px] md:px-8">
        <Link href="/" className="relative z-10 shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/logo.png"
            alt="Roofing Systems Co."
            width={140}
            height={100}
            preload
            className={`h-auto w-[92px] transition md:w-[110px] ${
              scrolled || open ? "" : "brightness-0 invert"
            }`}
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition hover:opacity-80 ${
                scrolled || open ? "text-[var(--ink)]/70" : "text-white/90"
              }`}
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
              className={`flex items-center gap-1.5 text-sm font-semibold transition hover:opacity-80 ${
                scrolled || open ? "text-[var(--ink)]/70" : "text-white/90"
              }`}
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
              <div className="overflow-hidden rounded-3xl border border-[var(--line)] bg-white shadow-[0_24px_60px_rgba(21,21,40,0.12)]">
                {dropdown.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDdOpen(false)}
                    className="group flex flex-col gap-1 border-b border-[var(--line)] px-5 py-4 last:border-0 transition hover:bg-[var(--purple-light)]"
                  >
                    <span className="text-sm font-bold text-[var(--ink)] transition group-hover:text-[var(--purple)]">
                      {item.label}
                    </span>
                    <span className="text-xs text-[var(--ink)]/45">{item.note}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={BOOKING_PATH}
            className="hidden rounded-full bg-[var(--lime)] px-5 py-2.5 text-xs font-bold text-[var(--ink)] shadow-[0_8px_24px_rgba(212,255,68,0.35)] transition hover:scale-105 hover:bg-[var(--lime-dark)] sm:inline-flex"
          >
            Get Started
          </Link>

          <button
            type="button"
            className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border lg:hidden ${
              scrolled || open
                ? "border-black/15 text-[var(--ink)]"
                : "border-white/30 text-white"
            }`}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex w-4 flex-col gap-1.5">
              <span
                className={`h-px w-full transition ${
                  scrolled || open ? "bg-[var(--ink)]" : "bg-white"
                } ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-full transition ${
                  scrolled || open ? "bg-[var(--ink)]" : "bg-white"
                } ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`h-px w-full transition ${
                  scrolled || open ? "bg-[var(--ink)]" : "bg-white"
                } ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] bg-white lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--line)] py-3 text-sm font-semibold text-[var(--ink)]/75"
              >
                {link.label}
              </a>
            ))}
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--purple)]">
              Masterminds
            </p>
            {dropdown.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--line)] py-3 text-sm font-semibold text-[var(--ink)]/75"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={BOOKING_PATH}
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-[var(--lime)] px-4 py-3 text-center text-xs font-bold text-[var(--ink)]"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
