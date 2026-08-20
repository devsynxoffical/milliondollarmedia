"use client";

import React from "react";
import { motion } from "framer-motion";

export function EditorialSubhero() {
  // 22 Client Logos from /media/logos/ (logo-01.png to logo-22.png)
  const logos = Array.from({ length: 22 }, (_, i) => {
    const num = (i + 1).toString().padStart(2, "0");
    return {
      id: num,
      src: `/media/logos/logo-${num}.png`,
    };
  });

  const repeatedLogos = [...logos, ...logos];

  // Lunvoro-Style Colorful Circle Borders
  const ringStyles = [
    "border-[#9333EA] bg-purple-50/50 shadow-purple-200/40",
    "border-[#FF4D4D] bg-rose-50/50 shadow-rose-200/40",
    "border-[#FFB703] bg-amber-50/50 shadow-amber-200/40",
    "border-[#06D6A0] bg-emerald-50/50 shadow-emerald-200/40",
    "border-[#3A86FF] bg-blue-50/50 shadow-blue-200/40",
    "border-[#C77DFF] bg-fuchsia-50/50 shadow-fuchsia-200/40",
  ];

  // Real ScaleWithAds High-Impact Rectangular Client Cards
  const clients = [
    {
      name: "Darrell Stern",
      role: "Webinar Scaling Coach",
      metric: "19K Followers",
      img: "https://milliondollarmedia.us/wp-content/uploads/2026/06/c2-1.jpg",
    },
    {
      name: "Pierce Grimes",
      role: "7 Figure Agency Owner",
      metric: "Two Comma Club Winner",
      img: "https://milliondollarmedia.us/wp-content/uploads/2026/06/c12.webp",
    },
    {
      name: "Officer Baker",
      role: "Hollywood Celebrity",
      metric: "1.5M Followers",
      img: "https://milliondollarmedia.us/wp-content/uploads/2026/06/c3-1.jpg",
    },
    {
      name: "Jesse Rogers | Casper SMC",
      role: "Online Trading Coach",
      metric: "537K Subscribers",
      img: "https://milliondollarmedia.us/wp-content/uploads/2026/07/499065155_18048058970591983_6379732473583506227_n.webp",
    },
    {
      name: "Tim Burd",
      role: "9 Figure Agency Owner",
      metric: "101K Followers",
      img: "https://milliondollarmedia.us/wp-content/uploads/2026/07/1663106313718.webp",
    },
    {
      name: "Dr. Amy",
      role: "Cancer Researcher",
      metric: "259K Subscribers",
      img: "https://milliondollarmedia.us/wp-content/uploads/2026/06/c13.webp",
    },
    {
      name: "Travis Stephenson",
      role: "9 Figure Agency Owner",
      metric: "114k Followers",
      img: "https://milliondollarmedia.us/wp-content/uploads/2026/06/c14.webp",
    },
    {
      name: "Dr. Bea. Kinderaerztin",
      role: "Pediatrician",
      metric: "144k Followers",
      img: "https://milliondollarmedia.us/wp-content/uploads/2026/06/c1-1.jpg",
    },
    {
      name: "Steven Juergensen",
      role: "Founder @ Vedgenutrition",
      metric: "87k Followers",
      img: "https://milliondollarmedia.us/wp-content/uploads/2026/06/c11-1.jpg",
    },
    {
      name: "Rafael Cintron",
      role: "E-commerce Coach",
      metric: "55.7K Subscribers",
      img: "https://milliondollarmedia.us/wp-content/uploads/2026/06/c8-1.jpg",
    },
    {
      name: "Sarah Grace Fitness",
      role: "NPC Figure Competitor",
      metric: "94K Followers",
      img: "https://milliondollarmedia.us/wp-content/uploads/2026/06/293754880_589072929247952_5961924528271733378_n-1.jpg",
    },
    {
      name: "Mark Shay",
      role: "Agency Owner & Coach",
      metric: "29.8k Followers",
      img: "https://milliondollarmedia.us/wp-content/uploads/2026/06/c10-1.jpg",
    },
    {
      name: "Jared Van Yperen",
      role: "Founder @ Vintage Muscle",
      metric: "21k Followers",
      img: "https://milliondollarmedia.us/wp-content/uploads/2026/06/c9-1.jpg",
    },
    {
      name: "M Mahdi Syed",
      role: "Business Scaling Coach",
      metric: "Two Comma Club Winner",
      img: "https://milliondollarmedia.us/wp-content/uploads/2026/06/c7-1.jpg",
    },
    {
      name: "Aref Jomah",
      role: "7 Figure Agency Scaling Coach",
      metric: "Two Comma Club Winner",
      img: "https://milliondollarmedia.us/wp-content/uploads/2026/06/c6-1.jpg",
    },
    {
      name: "Jimmy Rutkowsky",
      role: "7 Figure Agency Owner",
      metric: "7.2K Followers",
      img: "https://milliondollarmedia.us/wp-content/uploads/2026/07/645595064_10244915396526046_7773684313775506507_n-scaled.webp",
    },
    {
      name: "Marie Grace Berg",
      role: "Agency Owner",
      metric: "7K Followers",
      img: "https://milliondollarmedia.us/wp-content/uploads/2026/06/c5.-1.jpg",
    },
  ];

  const repeatedClients = [...clients, ...clients];

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-8 bg-[#FDFBF7] text-stone-900 border-t border-b border-stone-200 overflow-hidden">
      
      {/* 1. Lunvoro-Style Small Circle Logo Scroller (Using /media/logos/) */}
      <div className="w-full mb-16 overflow-hidden select-none">
        <div className="text-center mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-1.5 rounded-full inline-block shadow-sm">
            ✦ TRUSTED BY 300+ HIGH-GROWTH BRANDS
          </span>
        </div>

        {/* Marquee Row 1 */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
          className="flex items-center gap-6 sm:gap-8 whitespace-nowrap w-max py-2"
        >
          {repeatedLogos.map((logo, idx) => {
            const ring = ringStyles[idx % ringStyles.length];
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.15, rotate: idx % 2 === 0 ? 6 : -6 }}
                className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 ${ring} shadow-xl flex items-center justify-center p-4 bg-white shrink-0 cursor-pointer group transition-all duration-300 relative overflow-hidden`}
              >
                <img
                  src={logo.src}
                  alt={`Client Logo ${logo.id}`}
                  className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-300"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* 2. Real Client Showcase Rectangular Cards Marquee */}
      <div className="w-full overflow-hidden select-none">
        <div className="text-center mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-4 py-1.5 rounded-full inline-block shadow-sm">
            ✦ FEATURED CLIENT RESULTS & CASE STUDIES
          </span>
        </div>

        {/* Marquee Row 2 */}
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          className="flex items-center gap-6 whitespace-nowrap w-max py-2"
        >
          {repeatedClients.map((client, idx) => {
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.04, y: -6 }}
                className="w-[230px] sm:w-[260px] h-[340px] sm:h-[370px] rounded-3xl border-2 border-stone-950 bg-white text-stone-900 shadow-xl p-3 flex flex-col justify-between shrink-0 group cursor-pointer hover:border-purple-600 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Top Client Image */}
                <div className="h-[210px] sm:h-[230px] w-full rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 relative">
                  <img
                    src={client.img}
                    alt={client.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Bottom Card Content */}
                <div className="p-2 flex flex-col justify-end">
                  <h4 className="text-sm sm:text-base font-black text-stone-950 tracking-tight uppercase font-hero leading-tight group-hover:text-purple-700 transition-colors">
                    {client.name}
                  </h4>
                  <p className="text-rose-600 font-extrabold text-[11px] sm:text-xs tracking-wide uppercase mt-0.5">
                    {client.role}
                  </p>
                  <p className="text-stone-600 font-bold text-[11px] mt-0.5 tracking-tight">
                    {client.metric}
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
