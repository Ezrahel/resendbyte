import Link from "next/link";
import { Reveal } from "./Reveal";

export function FinalCTA() {
  return (
    <section className="hero-mesh relative overflow-hidden py-28 sm:py-36">
      <div className="dot-grid-dark pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]" />
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <h2 className="text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
            Ready to make email the{" "}
            <span className="text-gradient animate-gradient-pan">last thing</span> you think about?
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-text-secondary">
            Connect a domain, write one call, and watch it land. Your first 3,000 emails a month
            are on us.
          </p>
        </Reveal>
        <Reveal delay={180}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="glow-brand inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-brand-600 to-violet-600 px-8 py-3.5 text-[16px] font-semibold text-white no-underline transition-all duration-200 hover:opacity-95 sm:w-auto"
            >
              Start sending for free
            </Link>
            <Link
              href="/docs/getting-started"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/[0.16] bg-white/[0.06] px-8 py-3.5 text-[16px] font-semibold text-text-primary no-underline backdrop-blur-md transition-all duration-200 hover:bg-white/[0.12] sm:w-auto"
            >
              Read the docs
            </Link>
          </div>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-5 text-[13px] text-text-tertiary">Free forever tier · No credit card · Cancel anytime</p>
        </Reveal>
      </div>
    </section>
  );
}