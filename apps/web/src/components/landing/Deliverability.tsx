"use client";

import { Check, X } from "lucide-react";
import { Reveal } from "./Reveal";
import { useInView } from "@/hooks/useInView";

const dnsRecords = [
  { name: "SPF", desc: "v=spf1 include:_spf.resendbyte.com", status: "ok" },
  { name: "DKIM", desc: "resendbyte._domainkey · s1", status: "ok" },
  { name: "DMARC", desc: "p=quarantine · rua=reports", status: "ok" },
  { name: "MX", desc: "mx.resendbyte.com", status: "ok" },
  { name: "Bounce", desc: "bounces*.resendbyte.com", status: "pending" },
];

const bullets = [
  "Automatic warmup for dedicated IPs",
  "Dedicated IP pools with reputation isolation",
  "Bounce and complaint handling built in",
  "Seed-list monitoring to catch blacklisting early",
];

function DnsChecker() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-white/10 bg-[#16161a]">
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
        <span className="text-[13px] font-semibold text-text-dark-primary">DNS verification — ship.labs</span>
        <span className="flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-0.5 text-[11px] font-medium text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-soft" />
          4 of 5 verified
        </span>
      </div>
      <div className="p-2">
        {dnsRecords.map((record, i) => (
          <div
            key={record.name}
            className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-all duration-500 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
            style={{ transitionDelay: `${i * 180}ms` }}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  record.status === "ok" ? "bg-success/15 text-success" : "bg-[rgba(255,255,255,0.08)] text-text-dark-tertiary"
                }`}
              >
                {record.status === "ok" ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <X className="h-3.5 w-3.5" strokeWidth={2.5} />}
              </span>
              <div>
                <div className="text-[13px] font-semibold text-text-dark-primary">{record.name}</div>
                <div className="font-mono text-[11px] text-text-dark-tertiary">{record.desc}</div>
              </div>
            </div>
            <div
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                record.status === "ok"
                  ? "bg-success/15 text-success"
                  : "bg-[rgba(255,255,255,0.08)] text-text-dark-tertiary"
              }`}
            >
              {record.status === "ok" ? "Verified" : "Checking…"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Deliverability() {
  return (
    <section className="dot-grid-dark relative overflow-hidden bg-bg-dark py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute bottom-0 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-brand-600/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-brand-400">
              Deliverability
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-dark-primary sm:text-4xl">
              Your emails belong in the inbox. Not the spam folder.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-4 text-[16px] leading-relaxed text-text-dark-secondary">
              Deliverability is a full-time job — reputation, DNS, warmup, and bounces. ResendByte
              automates it so your messages land where they&apos;re meant to.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <ul className="mt-6 space-y-3">
              {bullets.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[15px] text-text-dark-primary">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success/15">
                    <Check className="h-3.5 w-3.5 text-success" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <DnsChecker />
        </Reveal>
      </div>
    </section>
  );
}