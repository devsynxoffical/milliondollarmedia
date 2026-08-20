"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Volume2, X, Star } from "lucide-react";

interface TestimonialCard {
  id: string;
  clientName: string;
  title: string;
  poster: string;
  videoUrl: string;
  aspectRatio: string;
}

export function ClientTestimonialsSection() {
  const [activeVideo, setActiveVideo] = useState<TestimonialCard | null>(null);

  const testimonials: TestimonialCard[] = [
    {
      id: "01",
      clientName: "Edgar & Jeremi",
      title: "How Edgar & Jeremi Are Getting High-Ticket Clients Using Our Million Dollar Funnel™ System",
      poster: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_900/u_https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/695d947da88e874feacb84ad.png",
      videoUrl: "https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/695c7a35993346e69427d4db.mp4",
      aspectRatio: "aspect-[9/14]",
    },
    {
      id: "02",
      clientName: "Mary Grace",
      title: "Marie Spent $2,000 With Another Agency And Got Zero Registrations. We generated 2,000+ registrations for Mary's Investors Online Summit",
      poster: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_900/u_https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/695d947d7931f04304558d13.png",
      videoUrl: "https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/695da2543a532d67105ad96c.mp4",
      aspectRatio: "aspect-[9/16]",
    },
    {
      id: "03",
      clientName: "Edgar",
      title: "Edgar Landed A New Agency Client At A $1500/ Month MRR Deal For 3 Months ($4,500) At A $7 Lead Cost",
      poster: "https://images.leadconnectorhq.com/image/f_webp/q_80/r_900/u_https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/695d947db75f6f2a004fcbd6.png",
      videoUrl: "https://storage.googleapis.com/msgsndr/HWyar6Z3u3aF6ydghkCx/media/695c7a35993346e69427d4db.mp4",
      aspectRatio: "aspect-[9/14]",
    },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-8 bg-[#0a0a0d] text-white border-t border-b border-stone-800 relative overflow-hidden select-none">
      
      {/* Red Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-rose-600/15 rounded-full blur-[120px] pointer-events-none -z-0" />

      {/* Decorative Wavy Lines Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ed1c24_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-500 bg-rose-950/80 border border-rose-800/60 px-4 py-1.5 rounded-full inline-block mb-4 shadow-sm">
            ✦ VERIFIED CLIENT PROOF
          </span>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase font-hero leading-none">
            CLIENT <span className="text-rose-600">TESTIMONIALS</span>
          </h2>
          <p className="mt-4 text-stone-400 text-base sm:text-lg font-medium">
            Real founders, coaches & agencies sharing their client acquisition scaling results.
          </p>
        </div>

        {/* 3 Video Cards Grid (Exact Screenshot Layout & Red Border Glow) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
          {testimonials.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveVideo(item)}
              className="rounded-[32px] bg-black border-2 border-rose-600/80 shadow-[0_0_30px_rgba(237,28,36,0.25)] hover:shadow-[0_0_45px_rgba(237,28,36,0.45)] overflow-hidden cursor-pointer group relative flex flex-col justify-between"
            >
              {/* Media Poster & Video Frame Container */}
              <div className={`relative w-full ${item.aspectRatio} bg-stone-950 overflow-hidden`}>
                <img
                  src={item.poster}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Top Right Mute / Audio Badge */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
                  <Volume2 className="w-4 h-4" />
                </div>

                {/* Center Play Icon with Glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-600/90 text-white border-2 border-rose-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-rose-500 transition-all duration-300 shadow-[0_0_35px_rgba(237,28,36,0.8)]">
                    <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current ml-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Playable Video Modal Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-stone-950 border-2 border-rose-600 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(237,28,36,0.4)]"
            >
              {/* Modal Top Header Bar */}
              <div className="p-4 bg-black border-b border-rose-900/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                  <span className="font-extrabold text-sm text-white font-hero tracking-wide">
                    {activeVideo.clientName} Case Study
                  </span>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center text-stone-300 hover:text-white hover:bg-rose-900 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Video Player */}
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
