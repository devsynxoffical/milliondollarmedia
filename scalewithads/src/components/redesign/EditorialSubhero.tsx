"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Individual Word Highlight Component for Scroll Reading Animation
function ScrollWord({ children, progress, range }: { children: React.ReactNode; progress: any; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  const color = useTransform(progress, range, ["#A1A1AA", "#0F0F11"]);

  return (
    <motion.span style={{ opacity, color }} className="inline-block transition-colors duration-150">
      {children}
    </motion.span>
  );
}

export function EditorialSubhero() {
  const textRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress through this text section
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.85", "end 0.3"],
  });

  // Official ScaleWithAds Proven System manifesto text split into sections with inline circle avatar stickers
  const section1 = "The proven system behind $50M+ in managed ad spend.".split(" ");
  const section2 = "12+ Years of Experience across agencies, coaches & B2B.".split(" ");
  const section3 = "$50M+ Managed in Meta Ads with tested & proven campaigns.".split(" ");
  const section4 = "90 Days Revenue Guarantee backed by written agreement. 100% DFY Client Acquisition covering Offer, Ads, CRM, AI & Funnels.".split(" ");

  const totalWordsCount = section1.length + section2.length + section3.length + section4.length;
  let currentWordIdx = 0;

  // Real ScaleWithAds Client Headshots from /media/clients/
  const clients = [
    { name: "Tim Burd", role: "Ad World Founder", img: "/media/clients/client-tim-burd.webp" },
    { name: "Dr. Amy", role: "Wellness DTC", img: "/media/clients/client-dr-amy.webp" },
    { name: "Jesse", role: "E-Comm Founder", img: "/media/clients/client-jesse.webp" },
    { name: "Jimmy", role: "SaaS Scaling", img: "/media/clients/client-jimmy.webp" },
    { name: "Pierce", role: "Media Buyer", img: "/media/clients/client-pierce.webp" },
    { name: "Travis", role: "7-Fig Brand", img: "/media/clients/client-travis.webp" },
    { name: "Aref", role: "E-Comm Scale", img: "/media/clients/client-aref.jpg" },
    { name: "Dr. Bea", role: "Health DTC", img: "/media/clients/client-dr-bea.jpg" },
    { name: "Jared", role: "Lead Gen Master", img: "/media/clients/client-jared.jpg" },
    { name: "Mahdi", role: "Agency Founder", img: "/media/clients/client-mahdi.jpg" },
    { name: "Marie", role: "Beauty Brand", img: "/media/clients/client-marie.jpg" },
    { name: "Mark", role: "8-Fig Scaling", img: "/media/clients/client-mark.jpg" },
    { name: "Officer Baker", role: "Public Speaker", img: "/media/clients/client-officer-baker.jpg" },
    { name: "Rafael", role: "DTC Founder", img: "/media/clients/client-rafael.jpg" },
    { name: "Sarah", role: "Funnel Strategist", img: "/media/clients/client-sarah.jpg" },
    { name: "Steven", role: "Meta Ads Pro", img: "/media/clients/client-steven.jpg" },
    { name: "Darrell", role: "Scale Specialist", img: "/media/clients/client-darrell.jpg" },
  ];

  const repeatedClients = [...clients, ...clients];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 bg-[#FDFBF7] text-stone-900 border-t border-b border-stone-200 overflow-hidden">
      
      {/* 1. Real Client Photos Infinite Scroll Marquee */}
      <div className="w-full mb-16 overflow-hidden select-none">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 32, repeat: Infinity }}
          className="flex items-center gap-6 sm:gap-8 whitespace-nowrap w-max"
        >
          {repeatedClients.map((client, idx) => {
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.12, rotate: idx % 2 === 0 ? 5 : -5 }}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-stone-950 shadow-xl overflow-hidden relative cursor-pointer group bg-stone-200 flex-shrink-0"
              >
                <img
                  src={client.img}
                  alt={client.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-2 text-center">
                  <span className="text-white font-extrabold text-xs sm:text-sm font-hero leading-none">
                    {client.name}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-purple-300 font-semibold uppercase tracking-wider mt-0.5">
                    {client.role}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* 2. Wide & Spacious Scroll-Driven Reading Text Reveal Section */}
      <div ref={textRef} className="max-w-6xl mx-auto text-left py-6 px-2 sm:px-6">
        <span className="text-xs font-black uppercase tracking-widest text-purple-700 bg-purple-100 border border-purple-200 px-3.5 py-1.5 rounded-full mb-8 inline-block font-mono">
          THE PROVEN SYSTEM
        </span>

        {/* Wide & Spacious Paragraph Layout */}
        <p className="text-2xl sm:text-4xl md:text-5xl lg:text-[46px] font-black tracking-tight leading-[1.35] sm:leading-[1.38] font-sans flex flex-wrap gap-x-2.5 sm:gap-x-3.5 gap-y-2 select-none">
          
          {/* Section 1 */}
          {section1.map((word) => {
            const start = currentWordIdx / totalWordsCount;
            const end = start + 1 / totalWordsCount;
            currentWordIdx++;
            return (
              <ScrollWord key={currentWordIdx} progress={scrollYProgress} range={[start, end]}>
                {word}
              </ScrollWord>
            );
          })}

          {/* Inline Circle Sticker Avatar 1 */}
          <span className="inline-flex items-center align-middle mx-1 my-auto">
            <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-stone-900 overflow-hidden shadow-md transform hover:scale-110 transition-transform">
              <img src="/media/clients/client-tim-burd.webp" alt="Tim Burd" className="w-full h-full object-cover" />
            </span>
          </span>

          {/* Section 2 */}
          {section2.map((word) => {
            const start = currentWordIdx / totalWordsCount;
            const end = start + 1 / totalWordsCount;
            currentWordIdx++;
            return (
              <ScrollWord key={currentWordIdx} progress={scrollYProgress} range={[start, end]}>
                {word}
              </ScrollWord>
            );
          })}

          {/* Inline Circle Sticker Avatar 2 */}
          <span className="inline-flex items-center align-middle mx-1 my-auto">
            <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-stone-900 overflow-hidden shadow-md transform hover:scale-110 transition-transform">
              <img src="/media/clients/client-dr-amy.webp" alt="Dr Amy" className="w-full h-full object-cover" />
            </span>
          </span>

          {/* Section 3 */}
          {section3.map((word) => {
            const start = currentWordIdx / totalWordsCount;
            const end = start + 1 / totalWordsCount;
            currentWordIdx++;
            return (
              <ScrollWord key={currentWordIdx} progress={scrollYProgress} range={[start, end]}>
                {word}
              </ScrollWord>
            );
          })}

          {/* Inline Circle Sticker Avatar 3 */}
          <span className="inline-flex items-center align-middle mx-1 my-auto">
            <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-stone-900 overflow-hidden shadow-md transform hover:scale-110 transition-transform">
              <img src="/media/clients/client-travis.webp" alt="Travis" className="w-full h-full object-cover" />
            </span>
          </span>

          {/* Section 4 */}
          {section4.map((word) => {
            const start = currentWordIdx / totalWordsCount;
            const end = start + 1 / totalWordsCount;
            currentWordIdx++;
            return (
              <ScrollWord key={currentWordIdx} progress={scrollYProgress} range={[start, end]}>
                {word}
              </ScrollWord>
            );
          })}
        </p>
      </div>
    </section>
  );
}
