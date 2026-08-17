"use client";

import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import Link from "next/link";

interface CustomBody extends Matter.Body {
  shapeInfo?: {
    type: "meta" | "google" | "tiktok" | "youtube" | "instagram" | "shopify" | "snapchat" | "twitter" | "roas";
    r: number;
    color: string;
    bgGradient?: [string, string];
    label?: string;
    emoji?: string;
  };
}

export function LusionEndSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = containerRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = stage.clientWidth || window.innerWidth;
    let H = 640;

    canvas.width = W;
    canvas.height = H;

    const { Engine, Bodies, Body, Composite, Mouse, MouseConstraint, Events, Runner } = Matter;

    // 1. Physics Engine Setup
    const engine = Engine.create({
      gravity: { x: 0, y: 0.9 },
    });
    const world = engine.world;

    // 2. Boundaries (Floor, Left, Right, Ceiling)
    const wallOpts = { isStatic: true, restitution: 0.4, friction: 0.2, render: { visible: false } };
    let ground: Matter.Body, leftWall: Matter.Body, rightWall: Matter.Body, ceiling: Matter.Body;

    function buildBounds() {
      if (ground) Composite.remove(world, [ground, leftWall, rightWall, ceiling]);
      const t = 120;
      ground = Bodies.rectangle(W / 2, H + t / 2 - 4, W * 2, t, wallOpts);
      leftWall = Bodies.rectangle(-t / 2, H / 2, t, H * 3, wallOpts);
      rightWall = Bodies.rectangle(W + t / 2, H / 2, t, H * 3, wallOpts);
      ceiling = Bodies.rectangle(W / 2, -t / 2 - 400, W * 2, t, wallOpts);
      Composite.add(world, [ground, leftWall, rightWall, ceiling]);
    }
    buildBounds();

    // 3. Ultra-Vibrant Brand & Performance Icon Spawners
    const shapes: CustomBody[] = [];

    function addBody(body: CustomBody, info: NonNullable<CustomBody["shapeInfo"]>) {
      body.shapeInfo = info;
      body.restitution = 0.7; // High bounciness
      body.friction = 0.1;
      body.frictionAir = 0.008;
      shapes.push(body);
      Composite.add(world, body);
    }

    const platformCreators = [
      // Meta Ads Badge (Vivid Blue)
      (x: number, y: number, r: number) => {
        const b = Bodies.circle(x, y, r, {}) as CustomBody;
        addBody(b, { type: "meta", r, color: "#1877F2", bgGradient: ["#0064E0", "#1877F2"], label: "Meta" });
      },
      // Google Ads Badge (Vivid Red / White)
      (x: number, y: number, r: number) => {
        const b = Bodies.circle(x, y, r, {}) as CustomBody;
        addBody(b, { type: "google", r, color: "#EA4335", bgGradient: ["#FFFFFF", "#F8FAFC"], label: "Google" });
      },
      // TikTok Ads Badge (Cyan/Pink Accented Black)
      (x: number, y: number, r: number) => {
        const b = Bodies.circle(x, y, r, {}) as CustomBody;
        addBody(b, { type: "tiktok", r, color: "#000000", bgGradient: ["#18181B", "#000000"], label: "TikTok" });
      },
      // YouTube Ads Badge (Crimson Red)
      (x: number, y: number, r: number) => {
        const b = Bodies.circle(x, y, r, {}) as CustomBody;
        addBody(b, { type: "youtube", r, color: "#FF0000", bgGradient: ["#DC2626", "#FF0000"], label: "YouTube" });
      },
      // Instagram Badge (Vibrant Pink/Amber Gradient)
      (x: number, y: number, r: number) => {
        const b = Bodies.circle(x, y, r, {}) as CustomBody;
        addBody(b, { type: "instagram", r, color: "#E1306C", bgGradient: ["#F59E0B", "#E1306C"], label: "Instagram" });
      },
      // Shopify / E-Comm Badge (Emerald Green)
      (x: number, y: number, r: number) => {
        const b = Bodies.circle(x, y, r, {}) as CustomBody;
        addBody(b, { type: "shopify", r, color: "#95BF47", bgGradient: ["#10B981", "#059669"], label: "Shopify" });
      },
      // Snapchat Ads Badge (Electric Yellow)
      (x: number, y: number, r: number) => {
        const b = Bodies.circle(x, y, r, {}) as CustomBody;
        addBody(b, { type: "snapchat", r, color: "#FFFC00", bgGradient: ["#FFFF00", "#EAB308"], label: "Snapchat" });
      },
      // X / Twitter Badge (Obsidian Black)
      (x: number, y: number, r: number) => {
        const b = Bodies.circle(x, y, r, {}) as CustomBody;
        addBody(b, { type: "twitter", r, color: "#000000", bgGradient: ["#27272A", "#09090B"], label: "X" });
      },
      // ROAS & Scale Metric Emojis (Vibrant Purple & Coral)
      (x: number, y: number, r: number) => {
        const b = Bodies.circle(x, y, r, {}) as CustomBody;
        const emojis = ["🚀", "📈", "💰", "⚡", "🎯", "💥", "🔥", "🏆", "💎", "🌟"];
        const randEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        const grads: [string, string][] = [
          ["#A855F7", "#7E22CE"],
          ["#EC4899", "#BE185D"],
          ["#3B82F6", "#1D4ED8"],
          ["#F59E0B", "#D97706"],
          ["#10B981", "#047857"],
        ];
        const chosenGrad = grads[Math.floor(Math.random() * grads.length)];
        addBody(b, { type: "roas", r, color: chosenGrad[0], bgGradient: chosenGrad, emoji: randEmoji });
      },
    ];

    // High Density Spawn (200+ Badges)
    function spawnField(count: number) {
      for (let i = 0; i < count; i++) {
        const x = 30 + Math.random() * (W - 60);
        const y = -1400 + Math.random() * 1350;
        const r = 18 + Math.random() * 16; // 18px to 34px radius
        const creator = platformCreators[i % platformCreators.length];
        creator(x, y, r);
      }
    }

    const COUNT = W < 700 ? 110 : 210;
    spawnField(COUNT);

    // 4. Mouse Interaction & Ambient Repulsion
    const mouse = Mouse.create(canvas);
    mouse.pixelRatio = window.devicePixelRatio || 1;

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.25, damping: 0.12, render: { visible: false } },
    });
    Composite.add(world, mouseConstraint);

    const handleMouseDown = () => canvas.classList.add("grabbing");
    const handleMouseUp = () => canvas.classList.remove("grabbing");

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Hyper-Responsive Pointer Tracking
    const pointer = { x: -9999, y: -9999, active: false, px: -9999, py: -9999 };

    function updatePointer(clientX: number, clientY: number) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      pointer.px = pointer.x;
      pointer.py = pointer.y;
      pointer.x = clientX - rect.left;
      pointer.y = clientY - rect.top;
      pointer.active = true;
    }

    const handleMouseMove = (e: MouseEvent) => updatePointer(e.clientX, e.clientY);
    const handleMouseLeave = () => { pointer.active = false; };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Strong Kinetic Impulse Field (Wide 230px radius)
    const REPEL_RADIUS = 230;

    Events.on(engine, "beforeUpdate", () => {
      if (!pointer.active) return;
      const vx = pointer.x - pointer.px;
      const vy = pointer.y - pointer.py;
      const speed = Math.min(1.5, Math.hypot(vx, vy) / 25);

      for (const b of shapes) {
        const dx = b.position.x - pointer.x;
        const dy = b.position.y - pointer.y;
        const dist = Math.hypot(dx, dy);

        if (dist < REPEL_RADIUS && dist > 0.001) {
          const falloff = Math.pow(1 - dist / REPEL_RADIUS, 1.8);
          const forceX = (dx / dist) * falloff * 0.026 * (0.6 + speed);
          const forceY = (dy / dist) * falloff * 0.026 - falloff * 0.01 * (0.8 + speed);

          Body.applyForce(b, b.position, { x: forceX, y: forceY });
          Body.setAngularVelocity(b, b.angularVelocity + (Math.random() - 0.5) * 0.25);
        }
      }
    });

    // 5. High-Polish Render Loop with Crisp Brand Graphics
    function drawShape(b: CustomBody) {
      if (!ctx || !b.shapeInfo) return;
      const info = b.shapeInfo;
      const r = info.r;

      ctx.save();
      ctx.translate(b.position.x, b.position.y);
      ctx.rotate(b.angle);

      // Radial Drop Shadow
      ctx.shadowColor = "rgba(15, 15, 17, 0.2)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 4;

      // Gradient Fill
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);

      if (info.bgGradient) {
        const grad = ctx.createLinearGradient(-r, -r, r, r);
        grad.addColorStop(0, info.bgGradient[0]);
        grad.addColorStop(1, info.bgGradient[1]);
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = info.color;
      }
      ctx.fill();

      // Sharp Dark Border Line
      ctx.shadowBlur = 0;
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "#16171A";
      ctx.stroke();

      // Brand Icon Graphics Inside Physics Badges
      ctx.fillStyle = info.type === "google" || info.type === "snapchat" ? "#16171A" : "#FFFFFF";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      if (info.type === "meta") {
        ctx.font = `bold ${Math.round(r * 1.15)}px sans-serif`;
        ctx.fillText("∞", 0, 0);
      } else if (info.type === "google") {
        ctx.font = `black ${Math.round(r * 1.0)}px sans-serif`;
        ctx.fillText("G", 0, 0);
      } else if (info.type === "tiktok") {
        ctx.font = `bold ${Math.round(r * 0.95)}px sans-serif`;
        ctx.fillText("♪", 0, 0);
      } else if (info.type === "youtube") {
        ctx.beginPath();
        const s = r * 0.55;
        ctx.moveTo(-s * 0.4, -s);
        ctx.lineTo(s * 0.85, 0);
        ctx.lineTo(-s * 0.4, s);
        ctx.closePath();
        ctx.fill();
      } else if (info.type === "instagram") {
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.42, 0, Math.PI * 2);
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = "#FFFFFF";
        ctx.stroke();
      } else if (info.type === "shopify") {
        ctx.font = `${Math.round(r * 0.9)}px sans-serif`;
        ctx.fillText("🛍️", 0, 0);
      } else if (info.type === "snapchat") {
        ctx.font = `${Math.round(r * 0.9)}px sans-serif`;
        ctx.fillText("👻", 0, 0);
      } else if (info.type === "twitter") {
        ctx.font = `bold ${Math.round(r * 0.85)}px sans-serif`;
        ctx.fillText("𝕏", 0, 0);
      } else if (info.type === "roas") {
        ctx.font = `${Math.round(r * 1.05)}px sans-serif`;
        ctx.fillText(info.emoji || "🚀", 0, 0);
      }

      ctx.restore();
    }

    let animId: number;
    function renderLoop() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      for (const b of shapes) drawShape(b);
      animId = requestAnimationFrame(renderLoop);
    }

    const runner = Runner.create();
    Runner.run(runner, engine);
    renderLoop();

    // 6. Resize Handler
    function onResize() {
      if (!stage || !canvas) return;
      W = stage.clientWidth || window.innerWidth;
      canvas.width = W;
      canvas.height = H;
      buildBounds();
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      Runner.stop(runner);
      Composite.clear(world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <section id="end-section" className="py-24 px-4 bg-[#E9EAEE] text-stone-900 border-t border-stone-300 relative overflow-hidden select-none min-h-[640px] flex items-center justify-center">
      
      {/* Container Stage & Canvas */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block cursor-grab active:cursor-grabbing z-0" />
      </div>

      {/* DevTools DOM Structure matching Lusion.co/projects #end-section */}
      <div id="end-section-outer" className="w-full max-w-6xl mx-auto text-center relative z-10 pointer-events-none">
        <div id="end-section-inner" className="relative">
          
          {/* Corner Plus Crosses (+) matching Lusion layout */}
          <div id="end-section-content-crosses" className="absolute inset-0 pointer-events-none flex justify-between items-start px-4 sm:px-12 pt-2">
            <span className="text-2xl text-stone-400 font-light font-mono">+</span>
            <span className="text-2xl text-stone-400 font-light font-mono">+</span>
          </div>

          <div id="end-section-content" className="pt-2">
            
            {/* Subtitle */}
            <div id="end-section-subtitle" className="mb-6">
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] text-stone-600 uppercase">
                IS YOUR BIG IDEA READY TO GO WILD?
              </span>
            </div>

            {/* Title with Heavy Underlines */}
            <div id="end-section-title" className="inline-block group cursor-pointer pointer-events-auto">
              <Link href="/contact" className="block">
                <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[115px] font-black text-stone-950 tracking-tight leading-[0.92] uppercase font-hero">
                  <span className="block border-b-6 sm:border-b-8 md:border-b-[10px] border-stone-950 pb-2 sm:pb-4 group-hover:text-purple-700 group-hover:border-purple-700 transition-colors">
                    Let's work
                  </span>
                  <span className="block border-b-6 sm:border-b-8 md:border-b-[10px] border-stone-950 pt-2 pb-2 sm:pb-4 group-hover:text-purple-700 group-hover:border-purple-700 transition-colors">
                    together!
                  </span>
                </h1>
              </Link>
            </div>

          </div>

          {/* Lower boundary crosses */}
          <div className="flex justify-between px-8 pt-16 text-stone-400 font-mono text-xl pointer-events-none">
            <span>+</span>
            <span>+</span>
          </div>

        </div>
      </div>
    </section>
  );
}
