import { Globe, Terminal, Inbox } from "lucide-react";
import { Reveal } from "./Reveal";

const steps = [
  {
    number: "01",
    title: "Connect a domain",
    body: "Add your sending domain and copy two DNS records. Verification takes under a minute.",
    icon: Globe,
  },
  {
    number: "02",
    title: "Write your first call",
    body: "Grab an API key and make a single request. Every SDK is a thin wrapper over one endpoint.",
    icon: Terminal,
  },
  {
    number: "03",
    title: "Watch it land",
    body: "Delivery events arrive in real time — in your dashboard, or via signed webhooks.",
    icon: Inbox,
  },
];

export function Steps() {
  return (
    <section className="border-y border-white/[0.08] bg-white/[0.02] py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-brand-600">How it works</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Three steps. Five minutes.
          </h2>
        </Reveal>

        <div className="relative mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block" />
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.number} delay={i * 100} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.06] text-text-primary shadow-sm">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div className="mt-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-text-tertiary">
                    {step.number}
                  </div>
                  <h3 className="mt-1.5 text-[17px] font-semibold tracking-tight text-text-primary">{step.title}</h3>
                  <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-text-secondary">{step.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}