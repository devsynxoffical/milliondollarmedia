"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  glow?: boolean;
}

export function TiltCard({
  children,
  className,
  maxTilt = 12,
  perspective = 1000,
  glow = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const rotateX = useSpring(0, { stiffness: 300, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    setMousePos({ x: percentX, y: percentY });

    const calcRotateX = (0.5 - y / rect.height) * maxTilt * 2;
    const calcRotateY = (x / rect.width - 0.5) * maxTilt * 2;

    rotateX.set(calcRotateX);
    rotateY.set(calcRotateY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative transition-all duration-300", className)}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="h-full w-full rounded-2xl"
      >
        {children}

        {/* Dynamic mouse spotlight glow overlay */}
        {glow && isHovered && (
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-30"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(237, 28, 36, 0.18), transparent 70%)`,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

export default TiltCard;
