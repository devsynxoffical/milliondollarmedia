"use client";

import dynamic from "next/dynamic";

const ShaderStack = dynamic(() => import("./ShaderStack"), { ssr: false });

export function ShaderBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_-10%,rgba(237,28,36,0.09),transparent_60%)]" />
      <ShaderStack />
    </div>
  );
}
