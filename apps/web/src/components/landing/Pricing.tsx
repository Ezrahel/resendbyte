"use client";

import { useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { Badge } from "@/components/ui/Badge";

interface Plan {
  name: string;
  monthly: number;
  annual: number;
  blurb: string;
  cta: string;
  highlight?: boolean;
  features: string[];
}

const plans: Plan[] = [
  {
    name: "Starter",
    monthly: 0,
    annual: 0,
    blurb: "For side projects and first integrations.",
    cta: "Start for free",
    features: [
      "3,000 emails / month",
      "1 sending domain",
      "Real-time analytics",
      "Community support",
    ],
  },
  {
    name: "Scale",
    monthly: 20,
    annual: 16,
    blurb: "For growing products that send every day.",
    cta: "Start scaling",
    highlight: true,
    features: [
      "50,000 emails / month",
      "Unlimited domains",
      "Dedicated IP add-on",
      "Signed webhooks",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    monthly: -1,
    annual: -1,
    blurb: "For teams with hard requirements.",
    cta: "Talk to sales",
    features: [
      "Volume pricing",
      "Dedicated infrastructure",
      "Custom SLAs",
      "Security review & onboarding",
      "24/7 support",
    ],
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-brand-600">Pricing</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Simple pricing that scales with you
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-text-secondary">
            Start free. Upgrade when you grow. No hidden fees, no per-seat nonsense.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={clsx("text-[14px] font-medium", !annual ? "text-text-primary" : "text-text-tertiary")}>
              Monthly
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={annual}
              aria-label="Toggle annual billing"
              onClick={() => setAnnual((a) => !a)}
              className="relative h-7 w-12 rounded-full bg-white/20 transition-colors"
            >
              <span
                className={clsx(
                  "absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-200",
                  annual ? "left-6" : "left-1",
                )}
              />
            </button>
            <span className={clsx("text-[14px] font-medium", annual ? "text-text-primary" : "text-text-tertiary")}>
              Annual
              <span className="ml-1.5 rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success">
                2 months free
              </span>
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {plans.map((plan, i) => {
            const isEnterprise = plan.monthly === -1;
            const price = annual ? plan.annual : plan.monthly;
            return (
              <Reveal key={plan.name} delay={i * 80}>
                <div
                  className={clsx(
                    "relative flex h-full flex-col rounded-2xl p-6 transition-all duration-300",
                    plan.highlight
                      ? "bg-accent text-white shadow-[0_16px_48px_rgba(0,0,0,0.18)] md:-translate-y-2"
                      : "glass hover:-translate-y-0.5",
                  )}
                >
                  {plan.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="success">Most popular</Badge>
                    </span>
                  )}
                  <h3 className="text-[17px] font-semibold tracking-tight">{plan.name}</h3>
                  <p className={clsx("mt-1 text-[13px]", plan.highlight ? "text-white/70" : "text-text-secondary")}>
                    {plan.blurb}
                  </p>
                  <div className="mt-5 flex items-baseline gap-1">
                    {isEnterprise ? (
                      <span className="text-4xl font-semibold tracking-tight">Custom</span>
                    ) : (
                      <>
                        <span className="text-4xl font-semibold tracking-tight">${price}</span>
                        <span className={clsx("text-[14px]", plan.highlight ? "text-white/60" : "text-text-tertiary")}>
                          /mo
                        </span>
                      </>
                    )}
                  </div>
                  <ul className="mt-6 flex-1 space-y-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-[14px]">
                        <Check
                          className={clsx("mt-0.5 h-4 w-4 shrink-0", plan.highlight ? "text-success" : "text-brand-600")}
                          strokeWidth={2.5}
                        />
                        <span className={plan.highlight ? "text-white/90" : "text-text-primary"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/login"
                    className={clsx(
                      "mt-7 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[15px] font-semibold no-underline transition-all duration-200",
                      plan.highlight
                        ? "bg-white text-accent hover:bg-white/90"
                        : "bg-accent text-white hover:bg-accent-hover",
                    )}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <p className="mt-8 text-center text-[13px] text-text-tertiary">
            All plans include TLS, DKIM/SPF/DMARC validation, and event webhooks.
          </p>
        </Reveal>
      </div>
    </section>
  );
}