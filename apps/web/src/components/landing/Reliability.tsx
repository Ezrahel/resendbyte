import { ShieldCheck, RefreshCw, Activity } from "lucide-react";
import { Reveal } from "./Reveal";

const stats = [
  {
    icon: Activity,
    value: "99.98%",
    label: "Uptime",
    body: "Redundant infrastructure with automated health checks and failover routing.",
  },
  {
    icon: ShieldCheck,
    value: "3×",
    label: "Provider failover",
    body: "If a sending provider degrades, traffic reroutes to a healthy one in seconds.",
  },
  {
    icon: RefreshCw,
    value: "Auto",
    label: "Retry with backoff",
    body: "Transient failures retry automatically with exponential backoff. Nothing is dropped.",
  },
];

export function Reliability() {
  return (
    <section id="reliability" className="border-y border-white/[0.08] bg-white/[0.02] py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-brand-600">Reliability</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Built to deliver, even when things break
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-text-secondary">
            Sending email is a distributed problem. We handle the hard parts so you don&apos;t have
            to think about them.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Reveal key={stat.label} delay={i * 80}>
                <div className="glass h-full rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-0.5">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-accent-glass text-text-primary">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div className="mt-4 text-4xl font-semibold tracking-tight text-text-primary">{stat.value}</div>
                  <div className="mt-1 text-[13px] font-semibold uppercase tracking-wider text-text-tertiary">{stat.label}</div>
                  <p className="mt-3 text-[14px] leading-relaxed text-text-secondary">{stat.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}