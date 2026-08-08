"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BOOKING_PATH } from "../../lib/offer";

interface NavLink {
  label: string;
  href: string;
  isActive?: boolean;
}

interface Partner {
  logoUrl: string;
  href: string;
}

interface ResponsiveHeroBannerProps {
  showNav?: boolean;
  logoUrl?: string;
  backgroundImageUrl?: string;
  navLinks?: NavLink[];
  ctaButtonText?: string;
  ctaButtonHref?: string;
  badgeLabel?: string;
  badgeText?: string;
  title?: string;
  titleLine2?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  partnersTitle?: string;
  partners?: Partner[];
}

const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: "System", href: "/#system", isActive: true },
  { label: "Results", href: "/#results" },
  { label: "Videos", href: "/#reviews" },
  { label: "Media Library", href: "/medialibrary" },
];

const DEFAULT_PARTNERS: Partner[] = [
  "/media/library/logos/logo-01.png",
  "/media/library/logos/logo-02.png",
  "/media/library/logos/logo-03.png",
  "/media/library/logos/logo-04.png",
  "/media/library/logos/logo-05.png",
  "/media/library/logos/logo-06.png",
  "/media/library/logos/logo-07.png",
  "/media/library/logos/logo-08.png",
  "/media/library/logos/logo-09.png",
  "/media/library/logos/logo-10.png",
].map((logoUrl) => ({ logoUrl, href: "#" }));

const ResponsiveHeroBanner: React.FC<ResponsiveHeroBannerProps> = ({
  showNav = false,
  logoUrl = "/logo-alt.png",
  backgroundImageUrl = "",
  navLinks = DEFAULT_NAV_LINKS,
  ctaButtonText = "Apply Now",
  ctaButtonHref = BOOKING_PATH,
  badgeLabel = "DFY SYSTEM",
  badgeText = "Double your revenue in 90 days — in writing",
  title = "Ads that sell",
  titleLine2 = "across every industry",
  description =
    "We install a complete done-for-you client acquisition system — offer positioning, Meta Ads, high-converting funnels, CRM, and AI follow-up. Your only job is to take the calls and close premium clients.",
  primaryButtonText = "Book Your Free Strategy Call",
  primaryButtonHref = BOOKING_PATH,
  secondaryButtonText = "See the 8-Step System",
  secondaryButtonHref = "/#system",
  partnersTitle = "Trusted by brands & operators worldwide",
  partners = DEFAULT_PARTNERS,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="isolate relative min-h-screen w-full overflow-hidden bg-[#09090b]">
      {backgroundImageUrl ? (
        <div className="absolute inset-0">
          <Image
            src={backgroundImageUrl}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ) : (
        <div className="jobber-grid-dark pointer-events-none absolute inset-0" />
      )}

      {/* Red gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 58% at 80% 4%, rgba(237,28,36,0.30), transparent 60%), radial-gradient(ellipse 50% 55% at 6% 96%, rgba(237,28,36,0.16), transparent 55%), linear-gradient(to bottom, rgba(9,9,11,0.15) 0%, rgba(9,9,11,0.35) 50%, rgba(9,9,11,0.7) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-black/30" />

      {showNav && (
        <header className="relative z-10 xl:top-4">
          <div className="mx-6">
            <div className="flex items-center justify-between pt-4">
              <Link href="/" className="relative block h-10 w-[120px]">
                <Image
                  src={logoUrl}
                  alt="Scale with Ads"
                  fill
                  priority
                  className="object-contain"
                  sizes="120px"
                />
              </Link>

              <nav className="hidden md:flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-full bg-white/5 px-1 py-1 ring-1 ring-white/10 backdrop-blur">
                  {navLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className={`px-3 py-2 text-sm font-medium hover:text-white transition-colors ${
                        link.isActive ? "text-white/90" : "text-white/80"
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href={ctaButtonHref}
                    className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-neutral-900 hover:bg-white/90 transition-colors"
                  >
                    {ctaButtonText}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </a>
                </div>
              </nav>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white/90">
                  <path d="M4 5h16" />
                  <path d="M4 12h16" />
                  <path d="M4 19h16" />
                </svg>
              </button>
            </div>

            {mobileMenuOpen && (
              <nav className="mt-3 flex flex-col gap-2 rounded-2xl bg-black/80 p-3 backdrop-blur md:hidden">
                {navLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="rounded-xl px-3 py-2.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={ctaButtonHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-3.5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-deep)]"
                >
                  {ctaButtonText}
                </a>
              </nav>
            )}
          </div>
        </header>
      )}

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-28 sm:pt-32 md:pt-36 lg:pt-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-2.5 py-2 ring-1 ring-white/15 backdrop-blur animate-fade-slide-in-1">
              <span className="inline-flex items-center rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs font-medium text-white">
                {badgeLabel}
              </span>
              <span className="text-sm font-medium text-white/90">
                {badgeText}
              </span>
            </div>

            <h1 className="display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl animate-fade-slide-in-2">
              {title}
              <br className="hidden sm:block" />
              <span className="text-[var(--accent)]">{titleLine2}</span>
            </h1>

            <p className="mt-6 mx-auto max-w-2xl text-base text-white/80 sm:text-lg animate-fade-slide-in-3">
              {description}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 animate-fade-slide-in-4">
              <a
                href={primaryButtonHref}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white shadow-[0_10px_30px_-10px_rgba(237,28,36,0.7)] transition-colors hover:bg-[var(--accent-deep)]"
              >
                {primaryButtonText}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
              <a
                href={secondaryButtonHref}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-medium text-white/90 ring-1 ring-white/15 transition-colors hover:bg-white/15 hover:text-white"
              >
                {secondaryButtonText}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mx-auto mt-20 max-w-5xl">
            <p className="text-center text-sm text-white/70 animate-fade-slide-in-1">
              {partnersTitle}
            </p>
            <div className="mt-6 grid grid-cols-2 items-center justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-5 animate-fade-slide-in-2">
              {partners.map((partner, index) => (
                <a
                  key={index}
                  href={partner.href}
                  className="relative flex h-10 w-[120px] items-center justify-center rounded-full opacity-80 transition-opacity hover:opacity-100"
                >
                  <Image
                    src={partner.logoUrl}
                    alt="Partner logo"
                    fill
                    className="object-contain"
                    sizes="120px"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResponsiveHeroBanner;
