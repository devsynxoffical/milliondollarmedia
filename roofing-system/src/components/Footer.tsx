import { ArrowUpRight, Mail, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { BackToTop } from "./BackToTop";

const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "The System", href: "#different" },
      { label: "Client Results", href: "#results" },
      { label: "Client Success", href: "#success" },
      { label: "Industries", href: "#industries" },
      { label: "Guarantee", href: "#guarantee" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Book Your Call", href: site.bookCallUrl },
      { label: "Private Masterminds", href: "/privatemastermind" },
      { label: "FAQ", href: "#faq" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "DMCA Policy", href: "/dmca" },
      { label: "Income Disclosure", href: "/income-disclosure" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink" id="footer">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/30 to-transparent" />
      <div className="container-x">
        <div className="grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center" aria-label="Roofing Systems Co. home">
              <Image
                src="/logo.png"
                alt="Roofing Systems Co."
                width={300}
                height={100}
                className="h-12 w-auto object-contain sm:h-14"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">
              The done-for-you roofing client acquisition system for $1M+ contractors who want to
              double revenue in 90 days — backed in writing.
            </p>
            <div className="mt-6 flex gap-2.5">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-mist transition-all duration-300 hover:border-lime/50 hover:text-lime"
                >
                  {s.label[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-mist transition-colors hover:text-fog"
                    >
                      {l.label}
                      {l.href.startsWith("http") && (
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
              Get in touch
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-mist transition-colors hover:text-lime"
                >
                  <Mail className="h-4 w-4" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}
                  className="inline-flex items-center gap-2 text-mist transition-colors hover:text-lime"
                >
                  <Phone className="h-4 w-4" />
                  {site.phone}
                </a>
              </li>
            </ul>
            <a
              href={site.bookCallUrl}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:shadow-[0_0_40px_-8px_var(--color-lime)]"
            >
              Book Free Strategy Call
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-line py-8 sm:flex-row">
          <p className="text-xs text-dim">
            © {new Date().getFullYear()} {site.legalName}. All Rights Reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-dim/60">
            Results vary. Not a guarantee of income.
          </p>
        </div>
      </div>
      <BackToTop />
    </footer>
  );
}
