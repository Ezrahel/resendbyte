import Link from "next/link";
import { TerminalMock } from "./TerminalMock";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section className="hero-mesh relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />

      <div className="relative mx-auto max-w-6xl px-5 text-center">
        <Reveal>
          <Link
            href="/docs/getting-started"
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 py-1.5 text-[13px] font-medium text-text-secondary no-underline shadow-sm transition-colors hover:text-text-primary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Get to your first send in 5 minutes
          </Link>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mx-auto mt-6 max-w-3xl text-[42px] leading-[1.05] font-semibold tracking-tight text-text-primary sm:text-6xl md:text-7xl">
            The email API your users{" "}
            <span className="text-gradient animate-gradient-pan">never think about</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] font-normal leading-relaxed text-text-secondary sm:text-lg">
            ResendByte is the transactional email platform built for developers and loved by ops
            teams — deliverability tooling, real-time analytics, and provider failover, wrapped in
            one API.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex w-full items-center justify-center rounded-full bg-accent px-8 py-3.5 text-[16px] font-semibold text-white no-underline transition-all duration-200 hover:bg-accent-hover sm:w-auto"
            >
              Start sending for free
            </Link>
            <Link
              href="/docs/getting-started"
              className="inline-flex w-full items-center justify-center rounded-full border border-black/[0.1] bg-white/70 px-8 py-3.5 text-[16px] font-semibold text-text-primary no-underline backdrop-blur-md transition-all duration-200 hover:bg-white sm:w-auto"
            >
              Read the docs
            </Link>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-5 text-[13px] text-text-tertiary">
            Free tier · No credit card · Cancel anytime
          </p>
        </Reveal>

        <Reveal delay={380}>
          <div className="mt-14 sm:mt-16">
            <TerminalMock />
          </div>
        </Reveal>
      </div>
    </section>
  );
}