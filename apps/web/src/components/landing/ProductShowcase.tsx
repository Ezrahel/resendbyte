"use client";

import { Check } from "lucide-react";
import { Reveal } from "./Reveal";

const stats = [
  { label: "Emails sent", value: "12,480" },
  { label: "Delivered", value: "99.98%" },
  { label: "Avg. latency", value: "142ms" },
];

export function ProductShowcase() {
  return (
    <section id="product" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-brand-600">
              Product
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
              From zero to sent in five minutes
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 text-[16px] leading-relaxed text-text-secondary">
              Verify your domain, paste an API key, and make your first call. ResendByte handles
              the plumbing — routing, retries, and delivery events — so your team stays focused on
              the product.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <ul className="mt-6 space-y-3">
              {["Single SDK, every provider", "Failover handled automatically", "Every send is a trackable event"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3 text-[15px] text-text-primary">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success/15">
                      <Check className="h-3.5 w-3.5 text-success" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ),
              )}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <div className="relative">
            <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-brand-500/10 to-violet-500/10" />
            <div className="glass-lg relative overflow-hidden p-5">
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-success animate-pulse-soft" />
                  <span className="text-[13px] font-semibold text-text-primary">Overview</span>
                </div>
                <div className="flex h-6 items-center rounded-full bg-accent-glass px-2.5 text-[11px] font-medium text-text-secondary">
                  Last 7 days
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-black/[0.06] bg-white/60 p-3">
                    <div className="text-[12px] text-text-tertiary">{s.label}</div>
                    <div className="mt-1 text-[18px] font-semibold tracking-tight text-text-primary">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <div className="flex items-end justify-between text-[11px] text-text-tertiary">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
                <div className="mt-2 flex h-28 items-end gap-2">
                  {[34, 48, 40, 64, 52, 72, 58].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-md border border-black/[0.04] bg-text-primary transition-all hover:opacity-90" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="animate-float absolute -right-4 -top-4 flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-3.5 py-1.5 shadow-lg">
              <span className="h-2 w-2 rounded-full bg-success" />
              <span className="text-[12px] font-semibold text-text-primary">All systems operational</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}