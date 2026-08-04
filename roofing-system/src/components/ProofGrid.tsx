"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const BASE = 400;
const STEP = 320;
const MAX = 1640;

export function ProofGrid({ files }: { files: string[] }) {
  const [heights, setHeights] = useState<Record<string, number>>(() =>
    Object.fromEntries(files.map((f) => [f, BASE])),
  );
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggle = (file: string) => {
    setHeights((h) => {
      const current = h[file] ?? BASE;
      return { ...h, [file]: current >= MAX ? BASE : Math.min(current + STEP, MAX) };
    });
  };

  return (
    <>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {files.map((file) => {
          const height = heights[file] ?? BASE;
          const maxed = height >= MAX;
          return (
            <div key={file} className="soft-card overflow-hidden border border-[var(--line)] p-2">
              <div
                className="relative w-full overflow-hidden rounded-xl bg-[var(--fog)] transition-[height] duration-500 ease-out"
                style={{ height }}
              >
                <Image
                  src={`/media/proof/${file}`}
                  alt="Roofing campaign dashboard result"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 px-2 pb-2 pt-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ink)]/40">
                    Campaign dashboard
                  </p>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--purple)]">
                    Live roofing result
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggle(file)}
                    className="rounded-full border border-[var(--line)] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--ink)]/70 transition hover:border-[var(--purple)] hover:text-[var(--purple)]"
                  >
                    {maxed ? "Show less ↑" : "See more ↓"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(file)}
                    className="rounded-full bg-[var(--purple)] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:opacity-90"
                  >
                    View full ↗
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Campaign dashboard full view"
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition hover:bg-black/80"
            onClick={() => setOpen(null)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
          <div
            className="max-h-[88vh] w-auto max-w-[92vw] overflow-auto rounded-xl bg-white p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/media/proof/${open}`}
              alt="Roofing campaign dashboard result"
              width={1200}
              height={2000}
              className="h-auto max-h-[86vh] w-auto object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
