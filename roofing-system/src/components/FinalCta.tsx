import Image from "next/image";
import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";

export function FinalCta() {
  return (
    <section className="section-shell border-t border-[var(--line)] bg-black">
      <div className="mx-auto max-w-7xl overflow-hidden border border-white/10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[280px] bg-[#111]">
            <Image
              src="/media/covers/cover-masterclass.png"
              alt="Book your application call"
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent" />
            <div className="absolute bottom-0 left-0 p-7 md:p-10">
              <Image
                src="/logo.png"
                alt="Roofing Systems Co."
                width={140}
                height={100}
                className="mb-5 h-auto w-[110px]"
              />
              <p className="display text-3xl text-white md:text-4xl">
                READY TO DOUBLE
                <br />
                <span className="text-[var(--red)]">YOUR REVENUE?</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-[var(--black-soft)] p-7 md:p-10">
            <ul className="space-y-3 text-sm text-white/70 md:text-base">
              {[
                "Only for $1M+ roofing companies",
                "We run funnel, creatives, ads, follow-up",
                "You take the sales calls",
                "Complete live access",
                "If we don’t perform — you don’t pay",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 bg-[var(--red)]" />
                  {item}
                </li>
              ))}
            </ul>

            <Link href={BOOKING_PATH} className="cta-btn mt-8 w-full">
              <span className="display text-xl tracking-[0.06em] md:text-2xl">
                BOOK APPLICATION CALL
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">
                Next step: /book
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
