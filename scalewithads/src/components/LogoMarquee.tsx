import Image from "next/image";
import { logos } from "../lib/library";

export function LogoMarquee({ title }: { title?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-white py-10 text-zinc-950">
      <div className="jobber-grid-light pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8">
        <p className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-[#ed1c24]">
          {title ?? "Trusted by 1,000+ brands & operators worldwide"}
        </p>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
          <div className="overflow-hidden">
            <div className="marquee-track items-center">
              {[...logos, ...logos].map((src, i) => (
                <div
                  key={i}
                  className="relative h-9 w-[110px] shrink-0 pr-9 opacity-85 grayscale transition hover:grayscale-0 hover:opacity-100"
                >
                  <Image
                    src={src}
                    alt="Client logo"
                    fill
                    className="object-contain"
                    sizes="110px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

