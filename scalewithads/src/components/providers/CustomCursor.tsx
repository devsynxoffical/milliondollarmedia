"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motion";

type CursorState = "default" | "hover" | "view" | "play" | "book" | "drag" | "text";

export function CustomCursor({ children }: { children: ReactNode }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const stateRef = useRef<CursorState>("default");

  useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion()) return;

    document.documentElement.classList.add("has-cursor");
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const setCursorState = (next: CursorState) => {
      stateRef.current = next;
      setState(next);
      ring.dataset.state = next;
      label.dataset.state = next;
      const labels: Record<CursorState, string> = {
        default: "",
        hover: "",
        view: "VIEW",
        play: "PLAY",
        book: "BOOK",
        drag: "DRAG",
        text: "TEXT",
      };
      label.textContent = labels[next];
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closest = target.closest("[data-cursor]") as HTMLElement | null;
      if (!closest) {
        setCursorState("default");
        return;
      }
      const next = (closest.dataset.cursor as CursorState) || "hover";
      setCursorState(next);
    };

    const onDown = () => {
      ring.classList.add("cursor-pressed");
    };
    const onUp = () => {
      ring.classList.remove("cursor-pressed");
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[99998] hidden h-10 w-10 items-center justify-center rounded-full border border-[#ed1c24]/60 bg-[#ed1c24]/20 text-[9px] font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_0_20px_rgba(237,28,36,0.6)] backdrop-blur-[2px] transition-[width,height] duration-300 has-cursor:flex"
      >
        <span ref={labelRef} className="transition-opacity duration-300" />
      </div>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[99999] hidden h-[6px] w-[6px] rounded-full bg-[#ed1c24] shadow-[0_0_10px_#ed1c24] has-cursor:block"
      />
      <style jsx global>{`
        .has-cursor * {
          cursor: none !important;
        }
        .has-cursor video,
        .has-cursor iframe,
        .has-cursor button,
        .has-cursor a,
        .has-cursor [role="button"] {
          cursor: pointer !important;
        }
        .has-cursor .cursor-pressed {
          width: 2.25rem;
          height: 2.25rem;
        }
      `}</style>
      {children}
    </>
  );
}
