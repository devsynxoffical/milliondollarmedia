"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BOOKING_PATH } from "../lib/offer";
import { clients, type LibraryClient } from "../lib/library";
import { SectionHeading } from "./SectionHeading";
import { Trophy, Users, Star, ArrowUpRight, Sparkles, CheckCircle, Play } from "lucide-react";

export function ClientsShowcase() {
  const [selectedClient, setSelectedClient] = useState<LibraryClient | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filterOptions = [
    { id: "all", label: "All Operators" },
    { id: "agency", label: "Agency Owners" },
    { id: "creators", label: "Creators & Influencers" },
    { id: "coaches", label: "Coaches & Traders" },
  ];

  const filteredClients = clients.filter((client) => {
    if (filter === "agency") return client.title.toLowerCase().includes("agency");
    if (filter === "creators") return client.badge.toLowerCase().includes("followers") || client.badge.toLowerCase().includes("subscribers");
    if (filter === "coaches") return client.title.toLowerCase().includes("coach") || client.title.toLowerCase().includes("trader");
    return true;
  });

  return (
    <section
      id="clients"
      className="relative overflow-hidden border-b border-zinc-800 bg-[#070709] py-20 text-white md:py-28"
    >
      <div className="jobber-grid-dark pointer-events-none absolute inset-0 opacity-50" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 50% 0%, rgba(237,28,36,0.14), transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <SectionHeading
          eyebrow="REAL CLIENTS · 9-FIGURE CREATORS & OPERATORS"
          title={
            <>
              The Industry Leaders Behind{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d52] via-[#ed1c24] to-[#ff8f93]">
                Our Scale Playbook
              </span>
            </>
          }
          description="From 9-figure agency owners and Hollywood celebrities to trading coaches and medical experts — powered by our done-for-you ads system."
        />

        {/* Filter Category Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {filterOptions.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                filter === tab.id
                  ? "bg-[#ed1c24] text-white shadow-[0_0_20px_rgba(237,28,36,0.5)] scale-105"
                  : "border border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Creators Infinite Horizontal Marquee */}
        <div className="relative mt-12 overflow-hidden py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-[#070709] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-[#070709] to-transparent" />

          <div className="flex gap-5 overflow-hidden">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
              className="flex shrink-0 items-center gap-5"
            >
              {[...filteredClients, ...filteredClients].map((client, idx) => (
                <div
                  key={`${client.slug}-${idx}`}
                  onClick={() => setSelectedClient(client)}
                  data-cursor="view"
                  className="group relative w-[220px] shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/80 p-3 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[#ed1c24] hover:shadow-[0_20px_40px_-15px_rgba(237,28,36,0.4)]"
                >
                  {/* Photo with Overlay */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-white/10">
                    <Image
                      src={client.photo}
                      alt={client.name}
                      fill
                      sizes="220px"
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    {/* Badge Pill */}
                    <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-black/80 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-white backdrop-blur-md border border-white/15">
                      <Trophy className="h-3 w-3 text-[#ed1c24]" />
                      {client.badge}
                    </span>

                    {/* Bottom Info */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-left">
                      <h3 className="display text-sm font-extrabold text-white truncate">
                        {client.name}
                      </h3>
                      <p className="text-[10px] text-zinc-300 truncate">
                        {client.title}
                      </p>
                    </div>
                  </div>

                  {/* Micro Interaction Footer */}
                  <div className="mt-2.5 flex items-center justify-between px-1 text-[11px] font-bold text-zinc-400 group-hover:text-white transition-colors">
                    <span className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-[#ed1c24]" />
                      View Profile
                    </span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#ed1c24]" />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/medialibrary"
            className="btn btn-outline-dark px-8 py-4 text-sm font-bold text-white transition-all hover:bg-white/10"
          >
            Browse All Client Videos & Case Studies →
          </Link>
          <Link
            href={BOOKING_PATH}
            className="btn btn-accent px-8 py-4 text-sm font-extrabold shadow-[0_0_30px_rgba(237,28,36,0.5)]"
          >
            BECOME OUR NEXT CASE STUDY
          </Link>
        </div>
      </div>

      {/* Creator Modal Lightbox */}
      <AnimatePresence>
        {selectedClient && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/20 bg-zinc-950 p-6 shadow-2xl"
            >
              <button
                onClick={() => setSelectedClient(null)}
                className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20"
              >
                ✕
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative aspect-[4/5] w-36 shrink-0 overflow-hidden rounded-2xl border border-white/15 shadow-xl">
                  <Image
                    src={selectedClient.photo}
                    alt={selectedClient.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ed1c24]/20 border border-[#ed1c24]/40 px-3 py-1 text-xs font-bold text-[#ed1c24]">
                    <Trophy className="h-3.5 w-3.5" />
                    {selectedClient.badge}
                  </span>
                  <h3 className="display mt-3 text-2xl font-extrabold text-white">
                    {selectedClient.name}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1">{selectedClient.title}</p>

                  <div className="mt-4 space-y-2 text-xs text-zinc-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#ed1c24]" />
                      <span>Scale With Ads™ Client Acquisition Installed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#ed1c24]" />
                      <span>High-Converting Meta Ads & Creative Funnels</span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <Link
                      href={BOOKING_PATH}
                      className="btn btn-accent px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider"
                    >
                      BOOK STRATEGY CALL
                    </Link>
                    <Link
                      href="/medialibrary"
                      className="btn btn-outline-dark px-5 py-2.5 text-xs font-bold"
                    >
                      Full Case Study
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
