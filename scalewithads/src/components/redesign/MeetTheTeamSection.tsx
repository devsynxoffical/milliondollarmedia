"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function MeetTheTeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const teamMembers = [
    {
      id: "01",
      name: "Vaishali Kapoor",
      role: "Founder",
      img: "/team/vaishali.jpeg",
      zIndex: 10,
    },
    {
      id: "02",
      name: "Gaurav Kapoor",
      role: "Co-Founder",
      img: "/team/gaurav.jpeg",
      zIndex: 20,
    },
    {
      id: "03",
      name: "Syed Hassan Ali Shah",
      role: "Web Developer",
      img: "/team/hassan.png",
      zIndex: 30,
    },
    {
      id: "04",
      name: "Taqi Jafar",
      role: "Graphic Designer",
      img: "/team/Taqi.jpeg",
      zIndex: 40,
    },
    {
      id: "05",
      name: "Ali Jawed",
      role: "Video Editor",
      img: "/team/Ali.jpeg",
      zIndex: 50,
    },
  ];

  // Header Animation:
  // Starts below navbar with generous padding.
  // 0.00 -> 0.08: Header fades out & slides up smoothly.
  // 0.78 -> 0.90: Header fades back in as the 5 cards unfold into a horizontal grid!
  const headerOpacity = useTransform(scrollYProgress, [0, 0.08, 0.78, 0.90], [1, 0, 0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.08, 0.78, 0.90], [0, -40, -40, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.08, 0.78, 0.90], [1, 0.96, 0.96, 1]);

  // Card Stage Y: Smoothly moves up into screen center as header fades out
  const stageY = useTransform(scrollYProgress, [0, 0.10, 0.78, 0.90], [0, -70, -70, 0]);

  // -------------------------------------------------------------
  // Progressive Scroll Transforms for 5 Stacking & Unfolding Cards
  // -------------------------------------------------------------

  // Card 1 (Vaishali Kapoor) - Always visible in center from start
  const card1Y = useTransform(scrollYProgress, [0, 0.78, 1], ["0%", "0%", "0%"]);
  const card1X = useTransform(scrollYProgress, [0, 0.78, 1], ["0%", "0%", "-148%"]);
  const card1Rotate = useTransform(scrollYProgress, [0, 0.78, 1], [0, 0, 0]);

  // Card 2 (Gaurav Kapoor) - Fully hidden until 0.10, slides UP and lands on Card 1
  const card2Y = useTransform(
    scrollYProgress,
    [0, 0.10, 0.25, 0.78, 1],
    ["140vh", "140vh", "0%", "0%", "0%"]
  );
  const card2Opacity = useTransform(
    scrollYProgress,
    [0, 0.10, 0.14, 1],
    [0, 0, 1, 1]
  );
  const card2X = useTransform(scrollYProgress, [0, 0.78, 1], ["0%", "0%", "-74%"]);
  const card2Rotate = useTransform(scrollYProgress, [0, 0.10, 0.25, 0.78, 1], [0, 5, 2, 2, 0]);

  // Card 3 (Syed Hassan Ali Shah) - Fully hidden until 0.28, slides UP and lands on Card 2
  const card3Y = useTransform(
    scrollYProgress,
    [0, 0.28, 0.43, 0.78, 1],
    ["140vh", "140vh", "0%", "0%", "0%"]
  );
  const card3Opacity = useTransform(
    scrollYProgress,
    [0, 0.28, 0.32, 1],
    [0, 0, 1, 1]
  );
  const card3X = useTransform(scrollYProgress, [0, 0.78, 1], ["0%", "0%", "0%"]);
  const card3Rotate = useTransform(scrollYProgress, [0, 0.28, 0.43, 0.78, 1], [0, -4, -1.5, -1.5, 0]);

  // Card 4 (Taqi Jafar) - Fully hidden until 0.46, slides UP and lands on Card 3
  const card4Y = useTransform(
    scrollYProgress,
    [0, 0.46, 0.61, 0.78, 1],
    ["140vh", "140vh", "0%", "0%", "0%"]
  );
  const card4Opacity = useTransform(
    scrollYProgress,
    [0, 0.46, 0.50, 1],
    [0, 0, 1, 1]
  );
  const card4X = useTransform(scrollYProgress, [0, 0.78, 1], ["0%", "0%", "74%"]);
  const card4Rotate = useTransform(scrollYProgress, [0, 0.46, 0.61, 0.78, 1], [0, 4, 1.5, 1.5, 0]);

  // Card 5 (Ali Jawed) - Fully hidden until 0.63, slides UP and lands on Card 4
  const card5Y = useTransform(
    scrollYProgress,
    [0, 0.63, 0.76, 0.78, 1],
    ["140vh", "140vh", "0%", "0%", "0%"]
  );
  const card5Opacity = useTransform(
    scrollYProgress,
    [0, 0.63, 0.67, 1],
    [0, 0, 1, 1]
  );
  const card5X = useTransform(scrollYProgress, [0, 0.78, 1], ["0%", "0%", "148%"]);
  const card5Rotate = useTransform(scrollYProgress, [0, 0.63, 0.76, 0.78, 1], [0, -3, -2, -2, 0]);

  const cardTransforms = [
    { y: card1Y, x: card1X, rotate: card1Rotate, opacity: undefined },
    { y: card2Y, x: card2X, rotate: card2Rotate, opacity: card2Opacity },
    { y: card3Y, x: card3X, rotate: card3Rotate, opacity: card3Opacity },
    { y: card4Y, x: card4X, rotate: card4Rotate, opacity: card4Opacity },
    { y: card5Y, x: card5X, rotate: card5Rotate, opacity: card5Opacity },
  ];

  return (
    <section
      ref={containerRef}
      className="relative h-[420vh] bg-[#FDFBF7] text-stone-900 border-b border-stone-200"
    >
      {/* Sticky 100vh Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-start items-center overflow-hidden px-4 md:px-8 pt-28 sm:pt-32">
        
        {/* Animated Header (Visible on entry, fades out on card stack, reappears on grid unfold) */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY, scale: headerScale }}
          className="text-center max-w-2xl mx-auto mb-6 z-10 pointer-events-none shrink-0"
        >
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-1.5 rounded-full inline-block mb-3 shadow-sm">
            ✦ MEET THE MINDS BEHIND SCALEWITHADS
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-stone-950 tracking-tight font-hero uppercase leading-none">
            Meet the minds behind <br />
            <span className="font-serif italic lowercase text-purple-700">scalewithads</span>
          </h2>
          <p className="mt-3 text-stone-600 font-medium text-xs sm:text-sm max-w-xl mx-auto">
            A passionate team of designers, developers, and strategists crafting bold digital experiences that drive impact and innovation.
          </p>
        </motion.div>

        {/* Stack & Unfold Stage */}
        <motion.div
          style={{ y: stageY }}
          className="relative w-full max-w-7xl h-[400px] sm:h-[460px] flex items-center justify-center mt-2 sm:mt-4"
        >
          {teamMembers.map((member, idx) => {
            const transform = cardTransforms[idx];

            return (
              <motion.div
                key={member.id}
                style={{
                  y: transform.y,
                  x: transform.x,
                  rotate: transform.rotate,
                  opacity: transform.opacity,
                  zIndex: member.zIndex,
                }}
                className="absolute w-[220px] sm:w-[250px] md:w-[260px] h-[340px] sm:h-[390px] rounded-[32px] border-2 border-stone-950 bg-[#EBEBEB] p-3.5 shadow-2xl flex flex-col justify-between cursor-pointer group hover:border-purple-600 transition-colors duration-300 overflow-hidden"
              >
                {/* Top Left Signature Circle */}
                <div className="absolute top-4 left-5 w-6 h-6 rounded-full border-2 border-stone-950 bg-white flex items-center justify-center text-[10px] font-mono font-bold z-20 shadow-sm">
                  °
                </div>

                {/* Member Portrait Image */}
                <div className="w-full h-[230px] sm:h-[270px] rounded-2xl overflow-hidden bg-stone-200 relative border border-stone-300">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Bottom Opaque White Label Container */}
                <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-stone-300 shadow-md text-left z-20 relative">
                  <h3 className="font-extrabold text-stone-950 text-sm sm:text-base tracking-tight leading-tight font-hero truncate">
                    {member.name}
                  </h3>
                  <p className="text-stone-500 font-medium text-xs mt-0.5">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
