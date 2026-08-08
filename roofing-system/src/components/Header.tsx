"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BOOKING_PATH } from "../lib/offer";
import { RollButton } from "./ui/RollButton";

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
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto w-full max-w-[1440px] p-2 sm:p-3">
        <div className="flex items-center justify-between rounded-full bg-white p-[5px] shadow-[0_2px_10px_rgba(0,0,0,0.07)]">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex shrink-0 items-center">
              <Image
                src="/logo.png"
                alt="Roofing Systems Co."
                width={4096}
                height={1812}
                priority
                className="h-9 w-auto object-contain sm:h-10"
              />
            </Link>
            <nav className="hidden items-center gap-6 md:flex">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[14px] text-gray-900 transition-colors duration-300 hover:text-gray-500"
                >
                  {link.label}
                </a>
              ))}
              <div className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1.5 text-[14px] text-gray-900 transition-colors duration-300 hover:text-gray-500"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Mastermind
                  <svg
                    className="h-3 w-3 text-gray-500 transition-transform group-hover:rotate-180"
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
                <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="overflow-hidden rounded-2xl border border-zinc-100 bg-white p-2 shadow-xl">
                    {mastermindLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block rounded-xl px-3 py-2.5 text-[13px] font-medium text-gray-900 transition hover:bg-zinc-100"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <span className="hidden text-[13px] text-gray-600 lg:inline">
              For roofing companies doing $1M+/yr
            </span>
            <Link
              href={BOOKING_PATH}
              className="group flex items-center gap-2 rounded-full bg-gray-900 py-2 pl-5 pr-2 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-gray-800"
            >
              <RollButton label="Book a strategy call" circleSize="h-6 w-6" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
        <div
          className={`absolute inset-x-0 bottom-0 mx-3 mb-3 rounded-2xl bg-white p-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[28px] font-medium text-gray-900 sm:text-[32px]"
              >
                {link.label}
              </a>
            ))}
            {mastermindLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[28px] font-medium text-gray-900 sm:text-[32px]"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href={BOOKING_PATH}
            onClick={() => setOpen(false)}
            className="group mt-8 flex items-center gap-2 rounded-full bg-[#ed1c24] py-2.5 pl-5 pr-2.5 text-[14px] font-medium text-white transition-colors duration-300 hover:bg-[#c4181e]"
          >
            <RollButton
              label="Book your free strategy call"
              circleSize="h-7 w-7"
              arrowClass="text-[#ed1c24]"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
