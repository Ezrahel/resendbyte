"use client";

import { useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { ChevronDown } from "lucide-react";
import { Reveal } from "./Reveal";

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "How is ResendByte different from SendGrid, Postmark, or SES?",
    a: "We're built API-first with a single abstraction over multiple providers. That means automatic failover, one SDK shape across services, and deliverability tooling that's part of the platform — not an add-on you assemble yourself.",
  },
  {
    q: "Do I need a dedicated IP?",
    a: "Most teams don't. Our shared pools are actively maintained and monitored for reputation. If your sending volume or requirements justify it, a dedicated IP with automatic warmup is available as an add-on.",
  },
  {
    q: "How does provider failover work?",
    a: "Every send is routed through a health-scoring layer. If a provider degrades or errors, traffic reroutes to a healthy provider automatically — before your delivery metrics are affected. You don't change your code.",
  },
  {
    q: "Can I use my own sending domain and DKIM?",
    a: "Yes. Add any domain you own, publish the SPF, DKIM, and DMARC records we give you, and verify in under a minute. Your DNS stays yours.",
  },
  {
    q: "What happens when I migrate from another provider?",
    a: "Our API was designed to feel familiar. Point your existing code at ResendByte, carry over your templates, and validate on the free tier before switching traffic. We also offer migration guides per provider.",
  },
  {
    q: "Is there a free tier?",
    a: "Yes — 3,000 emails a month, forever. No credit card required. When you grow, pay only for what you send.",
  },
];

function FaqRow({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="glass rounded-xl">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-[15px] font-semibold text-text-primary">{item.q}</span>
        <ChevronDown
          className={clsx("h-5 w-5 shrink-0 text-text-tertiary transition-transform duration-200", isOpen && "rotate-180")}
        />
      </button>
      <div
        className={clsx(
          "grid transition-all duration-300 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-text-secondary">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="border-t border-white/[0.08] py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal className="text-center">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-brand-600">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Frequently asked questions
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-col gap-3">
          {faqs.map((item, i) => (
            <Reveal key={item.q} delay={i * 50}>
              <FaqRow item={item} isOpen={open === i} onToggle={() => setOpen((o) => (o === i ? -1 : i))} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-8 text-center text-[14px] text-text-secondary">
            Something else?{" "}
            <Link href="/docs/getting-started" className="font-medium text-brand-600 no-underline hover:underline">
              Read the docs
            </Link>{" "}
            or{" "}
            <a href="mailto:support@resendbyte.com" className="font-medium text-brand-600 no-underline hover:underline">
              contact us
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}