"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BOOKING_PATH } from "../lib/offer";

const links = [
  { href: "/leadpilot", label: "Lead Pilot" },
  { href: "/metads", label: "Meta Ads" },
  { href: "/privatemastermind", label: "Mastermind" },
  { href: "/#proof", label: "Proof" },
  { href: "/#reviews", label: "Reviews" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled || open
          ? "border-b border-[var(--line)] bg-white/85 shadow-[0_1px_12px_rgba(16,24,40,0.05)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-[1200px] items-center justify-between gap-4 px-5 md:px-8">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/logo-original.png"
            alt="Scale with Ads"
            width={2000}
            height={1538}
            priority
            className="h-12 w-auto md:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 text-[13px] font-medium transition ${
                scrolled || open
                  ? "text-[var(--ink-soft)] hover:bg-[var(--surface-2)] hover:text-[var(--ink)]"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={BOOKING_PATH}
            className="btn btn-accent hidden px-5 py-2.5 text-[13px] sm:inline-flex"
          >
            Book a call
          </Link>
          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-lg border lg:hidden ${
              scrolled || open
                ? "border-[var(--line-strong)] text-[var(--ink)]"
                : "border-white/20 text-white"
            }`}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex w-4 flex-col gap-1.5">
              <span className={`h-px w-full bg-current transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
              <span className={`h-px w-full bg-current transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-px w-full bg-current transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--line)] bg-white/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-[1200px] flex-col px-5 py-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--surface-2)]"
              >
                {link.label}
              </a>
            ))}
            <Link
              href={BOOKING_PATH}
              onClick={() => setOpen(false)}
              className="btn btn-accent mt-3 w-full"
            >
              Book application call
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
