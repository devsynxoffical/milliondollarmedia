"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BOOKING_PATH } from "../lib/offer";

const links = [
  { href: "/#system", label: "System" },
  { href: "/#proof", label: "Results" },
  { href: "/#included", label: "What's Included" },
  { href: "/#comparison", label: "Why Us" },
  { href: "/#faq", label: "FAQ" },
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
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {pathname === "/" && (
        <div className="flex h-9 items-center justify-center gap-2 bg-[var(--band)] px-4 text-center text-[10px] font-semibold tracking-wide text-white/90 md:text-[11px]">
          <span className="flex h-2 w-2 items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          </span>
          <span>
            Only for agency owners &amp; B2B founders generating $10,000+/month.
          </span>
          <span className="hidden text-white/50 md:inline">
            · Double revenue in 90 days guaranteed.
          </span>
        </div>
      )}

      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-5 md:h-18 md:px-8">
        <Link href="/" className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/logo-white.png"
            alt="Scale with Ads"
            width={535}
            height={812}
            priority
            className="h-9 w-auto object-contain drop-shadow-[0_0_12px_rgba(237,28,36,0.25)] md:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={BOOKING_PATH}
            className="btn btn-accent hidden px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] sm:inline-flex"
          >
            Apply Now
          </Link>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white lg:hidden"
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
        <div className="border-t border-white/10 bg-black/90 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-[1240px] flex-col px-5 py-4 gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-white/70 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <Link
              href={BOOKING_PATH}
              onClick={() => setOpen(false)}
              className="btn btn-accent mt-3 w-full justify-center"
            >
              Apply Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
