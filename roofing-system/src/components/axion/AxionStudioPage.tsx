/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Clock, Menu, X } from "lucide-react";
import { ShaderBackdrop } from "./ShaderBackdrop";
import { RollButton } from "../ui/RollButton";
import { SectionBadge } from "./SectionBadge";

const NAV_LINKS = ["Projects", "Studio", "Journal", "Connect"];

function useLondonTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

function PartnerBadge() {
  return (
    <span className="flex items-center gap-2 rounded-[4px] bg-white py-1.5 pl-2.5 pr-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="h-5 w-5 fill-current text-[#ed1c24] sm:h-6 sm:w-6"
      >
        <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
      </svg>
      <span className="text-[13px] font-medium text-gray-900 sm:text-[14px]">
        Certified Partner
      </span>
      <span className="rounded bg-gray-900 px-1.5 py-0.5 text-[10px] font-medium text-white sm:px-2 sm:text-[11px]">
        Featured
      </span>
    </span>
  );
}

function Hero() {
  const time = useLondonTime();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative flex h-screen min-h-[680px] flex-col overflow-hidden bg-[#EFEFEF]">
      <ShaderBackdrop />

      {/* Nav */}
      <nav className="relative z-20 mx-auto w-full max-w-[1440px] p-2 sm:p-3">
        <div className="flex items-center justify-between rounded-full bg-white p-[5px]">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold tracking-tight text-white sm:h-10 sm:w-10 sm:text-[11px]">
              AX
            </span>
            <div className="hidden items-center gap-6 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[14px] text-gray-900 transition-colors duration-300 hover:text-gray-500"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <span className="hidden text-[13px] text-gray-600 lg:inline">
              Taking on projects for Q1 2026
            </span>
            <span className="hidden items-center gap-1.5 text-[13px] text-gray-600 md:flex">
              <Clock size={14} />
              {time} in London
            </span>
            <button
              type="button"
              className="group flex items-center gap-2 rounded-full bg-gray-900 py-2 pl-5 pr-2 text-[13px] font-medium text-white"
            >
              <RollButton label="Book a strategy call" circleSize="h-6 w-6" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white md:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute inset-x-0 bottom-0 mx-3 mb-3 rounded-2xl bg-white p-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            menuOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="mb-6 flex items-center gap-2 text-[13px] text-gray-600">
            <Clock size={14} />
            {time} in London
          </div>
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                onClick={() => setMenuOpen(false)}
                className="text-[28px] font-medium text-gray-900 sm:text-[32px]"
              >
                {link}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="group mt-8 flex items-center gap-2 rounded-full bg-[#ed1c24] py-2.5 pl-5 pr-2.5 text-[14px] font-medium text-white transition-colors duration-300 hover:bg-[#c4181e]"
          >
            <RollButton
              label="Start a project"
              circleSize="h-7 w-7"
              arrowClass="text-[#ed1c24]"
            />
          </button>
        </div>
      </div>

      {/* Hero content */}
      <div className="flex-1" />
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <p className="mb-5 text-[13px] tracking-wide text-gray-900 sm:mb-8 sm:text-[14px]">
          Axion Studio
        </p>
        <h1 className="text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:text-[clamp(2.5rem,5vw,4.2rem)]">
          We craft digital experiences
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>for brands ready to dominate
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>their category online.
        </h1>
        <div className="mt-8 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:gap-5">
          <button
            type="button"
            className="group flex items-center gap-2 rounded-full bg-[#ed1c24] py-2 pl-5 pr-2 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-[#c4181e] sm:py-2 sm:pl-6 sm:text-[14px]"
          >
            <RollButton
              label="Start a project"
              circleSize="h-7 w-7 sm:h-8 sm:w-8"
              arrowClass="text-[#ed1c24]"
            />
          </button>
          <PartnerBadge />
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="overflow-hidden bg-white pb-12 pt-16 sm:pb-16 sm:pt-20 lg:pb-24 lg:pt-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
          <SectionBadge num="1" label="Introducing Axion" />
        </div>

        <div className="px-5 sm:px-8 lg:px-12">
          <h2 className="mb-12 text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 sm:mb-16 lg:mb-28">
            Strategy-led creatives, delivering
            <br />
            results in digital and beyond.
          </h2>
        </div>

        {/* Mobile / tablet */}
        <div className="px-5 sm:px-8 lg:hidden">
          <p className="max-w-md text-[15px] font-medium leading-[1.6] text-gray-900 sm:text-[17px]">
            Through research, creative thinking and iteration we help growing
            brands realize their digital full potential.
          </p>
          <button
            type="button"
            className="group mt-6 flex items-center gap-2 rounded-full bg-[#ed1c24] py-2.5 pl-5 pr-2.5 text-[14px] font-medium text-white transition-colors duration-300 hover:bg-[#c4181e]"
          >
            <RollButton
              label="About our studio"
              circleSize="h-7 w-7"
              arrowClass="text-[#ed1c24]"
            />
          </button>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-5">
            <img
              src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85"
              alt="Axion studio"
              className="aspect-[438/346] w-full rounded-xl object-cover sm:w-[45%] sm:rounded-2xl"
            />
            <img
              src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85"
              alt="Axion studio"
              className="aspect-[900/600] w-full rounded-xl object-cover sm:w-[55%] sm:rounded-2xl"
            />
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden grid-cols-[26%_1fr_48%] items-end gap-6 px-5 sm:px-8 lg:grid xl:gap-8 lg:px-12">
          <img
            src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85"
            alt="Axion studio"
            className="aspect-[438/346] w-full self-end rounded-2xl object-cover"
          />
          <div className="flex flex-col items-end justify-self-start">
            <p className="whitespace-nowrap text-[16px] font-medium leading-[1.65] text-gray-900 xl:text-[18px]">
              Through research, creative thinking and iteration
              <br />
              we help growing brands realize their
              <br />
              digital full potential.
            </p>
            <button
              type="button"
              className="group mt-6 flex items-center gap-2 rounded-full bg-[#ed1c24] py-2.5 pl-5 pr-2.5 text-[14px] font-medium text-white transition-colors duration-300 hover:bg-[#c4181e]"
            >
              <RollButton
                label="About our studio"
                circleSize="h-7 w-7"
                arrowClass="text-[#ed1c24]"
              />
            </button>
          </div>
          <img
            src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85"
            alt="Axion studio"
            className="aspect-[3/2] w-full self-end rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function CaseStudyCard({
  title,
  description,
  videoSrc,
  containerClass,
  buttonClass,
  buttonLabel,
  darkButton,
  iconType,
}: {
  title: string;
  description: string;
  videoSrc: string;
  containerClass: string;
  buttonClass: string;
  buttonLabel: string;
  darkButton: boolean;
  iconType: "link" | "arrow";
}) {
  return (
    <div className="group cursor-pointer">
      <div
        className={`relative overflow-hidden rounded-2xl ${containerClass}`}
      >
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
        <div
          className={`absolute bottom-4 left-4 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full transition-all duration-300 ease-in-out ${buttonClass}`}
        >
          <span
            className={`whitespace-nowrap pl-4 text-[13px] font-medium opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100 ${
              darkButton ? "text-white" : "text-gray-900"
            }`}
          >
            {buttonLabel}
          </span>
          {iconType === "link" ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`mr-3 shrink-0 transition-transform duration-300 group-hover:rotate-0 ${
                darkButton ? "text-white" : "text-gray-900"
              } -rotate-45`}
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          ) : (
            <ArrowRight
              size={14}
              className={`mr-3 shrink-0 text-white transition-transform duration-300 group-hover:rotate-0 -rotate-45`}
            />
          )}
        </div>
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-gray-600 sm:text-[14px]">
        {description}
      </p>
      <h3 className="mt-1 text-[14px] font-semibold text-gray-900 sm:text-[15px]">
        {title}
      </h3>
    </div>
  );
}

function CaseStudies() {
  return (
    <section className="bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
          <SectionBadge num="2" label="Featured client work" />
        </div>
        <h2 className="mb-10 px-5 text-[clamp(1.75rem,7vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 sm:mb-14 sm:px-8 sm:text-[clamp(2.5rem,5vw,4.2rem)] lg:mb-16 lg:px-12">
          Our projects
        </h2>
        <div className="grid grid-cols-1 gap-5 px-5 sm:gap-6 sm:px-8 md:grid-cols-2 lg:gap-7 lg:px-12">
          <CaseStudyCard
            title="Narrativ"
            description="Winner of Site of the Month 2025 - an interactive 3D showcase driving record engagement"
            videoSrc="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4"
            containerClass="aspect-[329/246] bg-[#1a1d2e]"
            buttonClass="bg-white group-hover:w-[148px]"
            buttonLabel="Learn more"
            darkButton={false}
            iconType="link"
          />
          <CaseStudyCard
            title="Luminar"
            description="Transforming a dated platform into a conversion-focused brand experience"
            videoSrc="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4"
            containerClass="aspect-square bg-[#6b6b6b]"
            buttonClass="bg-gray-900 group-hover:w-[168px]"
            buttonLabel="View case study"
            darkButton={true}
            iconType="arrow"
          />
        </div>
      </div>
    </section>
  );
}

export function AxionStudioPage() {
  return (
    <main className="bg-[#EFEFEF]">
      <Hero />
      <About />
      <CaseStudies />
    </main>
  );
}
