import { Lock, Globe2, Scale, Headphones } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  {
    icon: Lock,
    title: "Security",
    body: "SOC 2 Type II aligned controls and encryption in transit and at rest.",
  },
  {
    icon: Globe2,
    title: "Regions",
    body: "US-East, EU-Central, and AP-South regions with edge distribution.",
  },
  {
    icon: Scale,
    title: "Compliance",
    body: "GDPR and CCPA tooling — data retention and deletion controls built in.",
  },
  {
    icon: Headphones,
    title: "Support",
    body: "24/7 support with a median first response under two hours.",
  },
];

export function TrustBand() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 70}>
                <div className="glass h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-glass text-text-primary">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-4 text-[16px] font-semibold tracking-tight text-text-primary">{item.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-text-secondary">{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}