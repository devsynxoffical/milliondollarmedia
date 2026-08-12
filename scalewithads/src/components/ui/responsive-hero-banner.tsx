"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { BOOKING_PATH } from "../../lib/offer";
import { CountUp } from "./CountUp";
import { ClickSpark } from "./ClickSpark";

const STATS = [
  { to: 50, prefix: "$", suffix: "M+", label: "Meta Ads Spent" },
  { to: 12, suffix: " Yrs", label: "Experience" },
  { to: 90, suffix: "-Day", label: "Revenue Target" },
  { to: 10, prefix: "$", suffix: "K+", label: "Minimum Budget" },
];

export default function ResponsiveHeroBanner() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const blob1Ref = useRef<HTMLDivElement | null>(null);
  const blob2Ref = useRef<HTMLDivElement | null>(null);
  const blob3Ref = useRef<HTMLDivElement | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  /* ---------------- entrance animation ---------------- */
  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.querySelectorAll(".fade-up").forEach((node) => {
        (node as HTMLElement).style.opacity = "1";
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(".fade-up", { opacity: 0, y: 28, filter: "blur(6px)" });
      gsap.to(".fade-up", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        stagger: 0.09,
        delay: 0.15,
      });
      gsap.utils.toArray<HTMLElement>("h1 .line span").forEach((span, i) => {
        gsap.fromTo(
          span,
          { yPercent: 110 },
          { yPercent: 0, duration: 1, ease: "expo.out", delay: 0.25 + i * 0.09 }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  /* ---------------- glass water cursor blobs ---------------- */
  useEffect(() => {
    const heroSection = sectionRef.current;
    const blobs = [blob1Ref.current, blob2Ref.current, blob3Ref.current];
    if (!heroSection || blobs.some((b) => !b)) return;
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;
    const [b1, b2, b3] = blobs as HTMLDivElement[];

    let tx = 0;
    let ty = 0;
    let p1x = 0, p1y = 0, p2x = 0, p2y = 0, p3x = 0, p3y = 0;
    let active = false;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      const r = heroSection.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      active = true;
    };
    const onEnter = (e: MouseEvent) => {
      const r = heroSection.getBoundingClientRect();
      p1x = p2x = p3x = e.clientX - r.left;
      p1y = p2y = p3y = e.clientY - r.top;
    };
    const onLeave = () => {
      active = false;
    };

    heroSection.addEventListener("mousemove", onMove);
    heroSection.addEventListener("mouseenter", onEnter);
    heroSection.addEventListener("mouseleave", onLeave);

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const raf = () => {
      rafId = requestAnimationFrame(raf);
      if (!active) return;
      p1x = lerp(p1x, tx, 0.05); p1y = lerp(p1y, ty, 0.05);
      p2x = lerp(p2x, tx, 0.09); p2y = lerp(p2y, ty, 0.09);
      p3x = lerp(p3x, tx, 0.16); p3y = lerp(p3y, ty, 0.16);
      b1.style.transform = `translate(${p1x}px, ${p1y}px) translate(-50%,-50%)`;
      b2.style.transform = `translate(${p2x}px, ${p2y}px) translate(-50%,-50%)`;
      b3.style.transform = `translate(${p3x}px, ${p3y}px) translate(-50%,-50%)`;
    };
    raf();

    return () => {
      cancelAnimationFrame(rafId);
      heroSection.removeEventListener("mousemove", onMove);
      heroSection.removeEventListener("mouseenter", onEnter);
      heroSection.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* ---------------- 3D tilt card ---------------- */
  useEffect(() => {
    const tilt = tiltRef.current;
    if (!tilt || prefersReducedMotion() || !window.matchMedia("(hover: hover)").matches) return;

    const maxTilt = 8;
    const onMove = (e: MouseEvent) => {
      const r = tilt.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (0.5 - py) * maxTilt * 2;
      const ry = (px - 0.5) * maxTilt * 2;
      tilt.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      tilt.style.setProperty("--mx", `${px * 100}%`);
      tilt.style.setProperty("--my", `${py * 100}%`);
    };
    const onLeave = () => {
      tilt.style.transform = "rotateX(0deg) rotateY(0deg)";
    };
    tilt.addEventListener("mousemove", onMove);
    tilt.addEventListener("mouseleave", onLeave);
    return () => {
      tilt.removeEventListener("mousemove", onMove);
      tilt.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* ---------------- three.js hero scene ---------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const heroSection = sectionRef.current;
    if (!canvas || !heroSection) return;
    if (window.matchMedia("(pointer: coarse)").matches || prefersReducedMotion()) return;

    let w = heroSection.clientWidth;
    let h = heroSection.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 0, 17);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(w, h);

    /* --- particle network --- */
    const PCOUNT = 160;
    const positions = new Float32Array(PCOUNT * 3);
    for (let i = 0; i < PCOUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xff5a24, size: 0.06, transparent: true, opacity: 0.75 });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    /* connecting lines for a subtle network feel */
    const lineGeo = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    for (let i = 0; i < PCOUNT; i++) {
      for (let j = i + 1; j < PCOUNT; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < 2.6) {
          linePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
          linePositions.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
        }
      }
    }
    lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(linePositions), 3));
    const lineMat = new THREE.LineBasicMaterial({ color: 0xed1c24, transparent: true, opacity: 0.12 });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    /* --- rising growth line --- */
    const curvePts: THREE.Vector3[] = [];
    for (let i = 0; i <= 12; i++) {
      const x = -9 + i * 1.6;
      const y = -3.6 + Math.pow(i / 12, 1.35) * 7.2 + Math.sin(i * 1.3) * 0.3;
      curvePts.push(new THREE.Vector3(x, y, -2));
    }
    const curve = new THREE.CatmullRomCurve3(curvePts);
    const tubeGeo = new THREE.TubeGeometry(curve, 120, 0.045, 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({ color: 0xff3b43, transparent: true, opacity: 0.85 });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    scene.add(tube);

    const glowTubeMat = new THREE.MeshBasicMaterial({ color: 0xed1c24, transparent: true, opacity: 0.18 });
    const glowTube = new THREE.Mesh(new THREE.TubeGeometry(curve, 120, 0.16, 8, false), glowTubeMat);
    scene.add(glowTube);

    /* --- orbiting red money/ad node --- */
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);
    const nodeGeo = new THREE.IcosahedronGeometry(0.5, 0);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xed1c24, wireframe: true, transparent: true, opacity: 0.9 });
    const node = new THREE.Mesh(nodeGeo, nodeMat);
    node.position.set(6.4, 3.2, -1);
    orbitGroup.add(node);

    const nodeCoreMat = new THREE.MeshBasicMaterial({ color: 0xff8f93, transparent: true, opacity: 0.5 });
    const nodeCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.22, 0), nodeCoreMat);
    nodeCore.position.copy(node.position);
    orbitGroup.add(nodeCore);

    /* --- extruded 3D "F" letterform watermark --- */
    const fShape = new THREE.Shape();
    fShape.moveTo(0, 0);
    fShape.lineTo(0, 10);
    fShape.lineTo(6, 10);
    fShape.lineTo(6, 8.1);
    fShape.lineTo(2.1, 8.1);
    fShape.lineTo(2.1, 6.0);
    fShape.lineTo(5.4, 6.0);
    fShape.lineTo(5.4, 4.1);
    fShape.lineTo(2.1, 4.1);
    fShape.lineTo(2.1, 0);
    fShape.lineTo(0, 0);

    const extrudeSettings = { depth: 1.1, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.1, bevelSegments: 2, curveSegments: 2 };
    const fGeo = new THREE.ExtrudeGeometry(fShape, extrudeSettings);
    fGeo.center();
    const fMat = new THREE.MeshBasicMaterial({ color: 0xed1c24, transparent: true, opacity: 0.09 });
    const fMesh = new THREE.Mesh(fGeo, fMat);
    fMesh.scale.setScalar(1.55);
    fMesh.position.set(2.6, -0.4, -9);
    fMesh.rotation.x = 0.15;
    scene.add(fMesh);

    /* --- mouse parallax --- */
    let mouseX = 0, mouseY = 0, targetRotY = 0, targetRotX = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMouse);

    const clock = new THREE.Clock();
    let rafId = 0;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      points.rotation.y = t * 0.02;
      lines.rotation.y = t * 0.02;
      fMesh.rotation.y = t * 0.12;
      orbitGroup.rotation.z = t * 0.18;
      node.rotation.x = t * 0.6;
      node.rotation.y = t * 0.4;

      tube.material.opacity = 0.7 + Math.sin(t * 1.6) * 0.15;
      glowTube.material.opacity = 0.14 + Math.sin(t * 1.6) * 0.06;

      targetRotY += (mouseX * 0.35 - targetRotY) * 0.04;
      targetRotX += (mouseY * 0.2 - targetRotX) * 0.04;
      scene.rotation.y = targetRotY;
      scene.rotation.x = targetRotX;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      w = heroSection.clientWidth;
      h = heroSection.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero-section">
      <canvas ref={canvasRef} id="hero-canvas" />
      <div className="grid-overlay" />
      <div className="glow glow-a" />
      <div className="glow glow-b" />
      <div className="cursor-layer">
        <div className="cursor-blob b1" ref={blob1Ref} />
        <div className="cursor-blob b2" ref={blob2Ref} />
        <div className="cursor-blob b3" ref={blob3Ref} />
      </div>

      <div className="hero-container">
        <div className="hero-grid">
          {/* LEFT */}
          <div>
            <div className="status-row fade-up">
              <span className="chip">
                <span className="dot" />
                DFY Client Acquisition System
              </span>
              <span className="chip">🛡️ 90-Day Guarantee</span>
            </div>

            <div className="eyebrow fade-up">
              We install our proprietary <span className="accent">Scale With Ads™</span> system
            </div>

            <h1 className="fade-up">
              <span className="line"><span>Client Acquisition</span></span>
              <span className="line"><span className="grad">System</span> <span>Into Your</span></span>
              <span className="line"><span>Business.</span></span>
            </h1>

            <p className="sub fade-up">
              <b>Double your revenue within the next 90 days</b> — or we&apos;ll continue
              working for you at no management fee until we do. Backed by a written agreement.
            </p>

            <div className="cta-row fade-up">
              <ClickSpark sparkColor="#ffffff" sparkCount={10} sparkRadius={42}>
                <Link href={BOOKING_PATH} className="btn btn-primary" data-cursor="book">
                  Book Your Free Call<span className="shine" />
                </Link>
              </ClickSpark>
              <a href="#systems" data-cursor="view" className="btn btn-outline">
                Explore Acquisition Systems
              </a>
            </div>

            <div className="stat-row fade-up">
              {STATS.map((s) => (
                <div className="stat" key={s.label}>
                  <div className="num">
                    <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} duration={1.8} />
                  </div>
                  <div className="lbl">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="proof-line fade-up">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l8 4v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-4z" stroke="#ed1c24" strokeWidth="1.6" />
              </svg>
              100% Asset Ownership · Written Agreement · No Lock-ins
            </div>
          </div>

          {/* RIGHT */}
          <div className="stage fade-up">
            <div className="tilt-card" ref={tiltRef} data-cursor="play">
              <div className="tilt-glow" />
              <div className="tilt-inner">
                <div className="vsl-media" onClick={() => setVideoModalOpen(true)}>
                  <div className="vsl-badge">Watch 2-Min VSL Overview</div>
                  <div className="play-btn" onClick={(e) => { e.stopPropagation(); setVideoModalOpen(true); }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7-11-7z" /></svg>
                  </div>
                  <div className="adsmgr">
                    <div className="adsmgr-top">
                      <div className="adsmgr-top-left">
                        <span className="ic">f</span>Meta Ads Manager
                      </div>
                      <div className="adsmgr-live"><span className="d" />Live</div>
                    </div>

                    <div className="adsmgr-stats">
                      <div><div className="v up">$62.4K</div><div className="k">Amount Spent</div></div>
                      <div><div className="v up">3.32x</div><div className="k">ROAS</div></div>
                      <div><div className="v">$8.14</div><div className="k">Cost / Result</div></div>
                    </div>

                    <div className="spark-wrap">
                      <svg className="spark" viewBox="0 0 200 40" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ed1c24" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#ed1c24" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <polyline points="0,32 20,28 40,30 60,20 80,22 100,14 120,17 140,8 160,10 180,3 200,5 200,40 0,40" fill="url(#sparkFill)" stroke="none" />
                        <polyline points="0,32 20,28 40,30 60,20 80,22 100,14 120,17 140,8 160,10 180,3 200,5" fill="none" stroke="#ed1c24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="arrow-track">
                        <svg className="arrow-run" viewBox="0 0 24 24" fill="none"><path d="M6 18L18 6M18 6H9M18 6v9" stroke="#6ee7a8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </div>
                    </div>

                    <div className="adsmgr-rows">
                      <div className="adsmgr-row"><span className="status-dot" /><span className="camp">Retargeting — Warm Audience</span><span className="roas">4.1x</span></div>
                      <div className="adsmgr-row"><span className="status-dot" /><span className="camp">Cold Traffic — Lookalike 1%</span><span className="roas">2.9x</span></div>
                      <div className="adsmgr-row"><span className="status-dot" /><span className="camp">VSL Funnel — Interest Stack</span><span className="roas">3.6x</span></div>
                    </div>
                  </div>
                </div>
                <div className="vsl-foot">
                  <div>
                    <div className="t">Scale With Ads™ Playbook</div>
                    <div className="s">$50M+ Meta Spend Framework</div>
                  </div>
                  <div className="vsl-foot-icons">
                    <div className="platform-badges">
                      <span className="p-badge fb">
                        <svg viewBox="0 0 24 24" fill="#fff"><path d="M14 13.5h2.5l.5-3H14V8.5c0-.86.24-1.45 1.47-1.45H17V4.4c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.9V10.5H8.4v3H11V20h3v-6.5z" /></svg>
                      </span>
                      <span className="p-badge ig">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17.1" cy="6.9" r="1" /></svg>
                      </span>
                    </div>
                    <div className="arrow-track vsl-arrow">
                      <svg className="arrow-run" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="#ed1c24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="float-chip chip-roas"><div className="n">3.32x</div><div className="l">Avg. ROAS</div></div>
              <div className="float-chip chip-offers"><div className="n">13,630+</div><div className="l">Offers Converted</div></div>

              <div className="meta-post">
                <div className="f-badge">f</div>
                <div className="meta-post-head">
                  <div className="meta-post-avatar" />
                  <div>
                    <div className="meta-post-name">Scale With Ads™</div>
                    <div className="meta-post-sub">Sponsored · 🌐</div>
                  </div>
                </div>
                <div className="meta-post-img">
                  <div className="meta-post-cta">Learn More</div>
                </div>
                <div className="meta-post-actions"><span>👍 2.4K</span><span>💬 318</span><span>↗ 94</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-cue"><span>Scroll</span><span className="stick" /></div>

      {/* Video Modal Lightbox */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-zinc-950 p-2 shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              ✕
            </button>
            <div className="aspect-video w-full overflow-hidden rounded-2xl">
              <iframe
                src="https://assets.cdn.filesafe.space/W8B8H8FvOolLCrvxXzYp/media/69ef9443717d5dd4e170f445.mp4"
                className="h-full w-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
