"use client";

import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { useInView } from "@/hooks/useInView";

interface CounterProps {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
}

function Counter({ value, decimals = 0, suffix = "", label }: CounterProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref} className="rounded-2xl border border-white/[0.1] bg-white/[0.05] p-5 text-center">
      <div className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
        {display.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
        {suffix}
      </div>
      <div className="mt-1 text-[13px] font-medium text-text-tertiary">{label}</div>
    </div>
  );
}

const stats = [
  { value: 12480, label: "Emails delivered today" },
  { value: 99.98, decimals: 2, suffix: "%", label: "Delivered" },
  { value: 142, suffix: "ms", label: "Median send time" },
  { value: 12, suffix: "s", label: "Warmup days to full IP" },
];

export function Analytics() {
  return (
    <section id="analytics" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-brand-600">Analytics</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Every send, measured. Every metric, live.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-text-secondary">
            Engagement and delivery data stream in as events happen — no daily batch jobs, no
            guessing.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <Counter value={stat.value} decimals={stat.decimals} suffix={stat.suffix} label={stat.label} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.05]">
            <div className="flex items-center justify-between border-b border-white/[0.1] px-5 py-3.5">
              <span className="text-[13px] font-semibold text-text-primary">Delivery rate — last 30 days</span>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                <span className="text-[11px] text-text-tertiary">99.98% average</span>
              </div>
            </div>
            <div className="flex h-40 items-end gap-1.5 px-5 pb-5 pt-4">
              {[96, 98, 97, 99, 98.5, 99.8, 99.5, 99.9, 99.4, 100, 99.6, 99.7, 99.9, 100, 99.8, 99.9, 99.9, 100].map(
                (h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-brand-500/50 to-brand-500 transition-transform duration-300 hover:scale-y-105"
                    style={{ height: `${h}%` }}
                  />
                ),
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}