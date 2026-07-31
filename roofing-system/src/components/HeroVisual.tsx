import Link from "next/link";
import { BOOKING_PATH } from "../lib/offer";

export function HeroVisual() {
  return (
    <div className="relative">
      <div className="absolute -inset-3 bg-gradient-to-br from-[var(--red)]/35 via-transparent to-transparent blur-2xl" />

      <div className="relative overflow-hidden border border-white/15 bg-[#090909] shadow-[0_40px_100px_rgba(0,0,0,0.55)]">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 md:px-5">
          <p className="display text-sm tracking-[0.08em] text-white md:text-base">
            SALES CALL MACHINE
          </p>
          <span className="bg-[var(--red)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
            Live system
          </span>
        </div>

        <div className="grid gap-4 p-4 md:grid-cols-2 md:p-5">
          <div className="border border-white/10 bg-black/60 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
              This week
            </p>
            <p className="display mt-2 text-4xl text-[var(--red)]">48</p>
            <p className="mt-1 text-sm text-white/70">Qualified sales calls booked</p>
            <div className="mt-4 space-y-2">
              {["Tue · 11:00 · Storm repair consult", "Wed · 14:30 · Full roof estimate", "Thu · 09:15 · Insurance claim job"].map(
                (row) => (
                  <div
                    key={row}
                    className="flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/65"
                  >
                    <span className="h-1.5 w-1.5 bg-[var(--red)]" />
                    {row}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="border border-white/10 bg-black/60 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
              90-day trajectory
            </p>
            <div className="mt-5 flex h-32 items-end gap-2">
              {[28, 36, 44, 52, 61, 74, 88, 100].map((h, i) => (
                <div key={h} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-sm"
                    style={{
                      height: `${h}%`,
                      background:
                        i > 5
                          ? "linear-gradient(180deg,#ff2a1f,#9e0000)"
                          : "rgba(255,255,255,0.18)",
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-white/45">Start</span>
              <span className="font-semibold text-[var(--red)]">2× revenue</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 border-t border-white/10">
          {[
            ["FUNNEL", "Built"],
            ["ADS", "Managed"],
            ["FOLLOW-UP", "Handled"],
          ].map(([k, v]) => (
            <div key={k} className="border-r border-white/10 px-3 py-4 last:border-r-0 md:px-4">
              <p className="display text-lg text-white md:text-xl">{k}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[var(--red)]">
                {v}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 bg-[var(--red)] px-5 py-4 md:px-6">
          <p className="display text-xl text-white md:text-2xl">
            YOU TAKE THE CALL. WE FILL THE CALENDAR.
          </p>
          <Link
            href={BOOKING_PATH}
            className="mt-2 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-white/90 underline-offset-4 hover:underline"
          >
            Book application call →
          </Link>
        </div>
      </div>
    </div>
  );
}
