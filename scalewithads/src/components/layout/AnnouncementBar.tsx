"use client";

import { useState, useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { site } from "@/lib/site";

const STORAGE_KEY = "swa-announcement-dismissed";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (localStorage.getItem(STORAGE_KEY)) setDismissed(true);
    } catch {
      /* noop */
    }
  }, []);

  const dismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* noop */
    }
    setDismissed(true);
  };

  useEffect(() => {
    if (!mounted) return;
    const el = document.getElementById("announcement-bar");
    if (!el) return;
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      el,
      { yPercent: -110 },
      { yPercent: 0, duration: 0.9, ease: "expo.out", delay: 0.4 }
    );
  }, [mounted]);

  if (!mounted) return <div className="min-h-10" aria-hidden />;
  if (dismissed) return null;

  return (
    <div
      id="announcement-bar"
      className="sticky top-0 z-[70] min-h-10 py-1 bg-[#ed1c24] text-white"
      role="region"
      aria-label="Announcement"
    >
      <a
        href={site.bookCallUrl}
        className="group flex h-full w-full items-center justify-center gap-2 px-4 text-[11px] font-extrabold uppercase tracking-wide text-white transition-colors hover:bg-[#c91018] text-center sm:text-[12px] py-1"
        data-cursor="book"
      >
        <span className="flex items-center justify-center gap-1.5 flex-wrap">
          <AlertTriangle className="h-4 w-4 shrink-0 text-white fill-white/20 inline-block" />
          <span>
            THIS IS ONLY FOR AGENCY OWNERS, COACHES, HIGH-TICKET SERVICE PROVIDERS & B2B FOUNDERS ALREADY GENERATING $10,000+/MONTH.
          </span>
          <span className="hidden md:inline font-semibold text-white/90">
            If you&apos;re below $10,000/month, this system isn&apos;t the right fit.
          </span>
        </span>
      </a>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-black/20 hover:text-white"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
