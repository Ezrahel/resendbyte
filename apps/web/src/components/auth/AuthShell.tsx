import Link from "next/link";
import { Mail, Check, TrendingUp, Zap } from "lucide-react";

export function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-2 no-underline">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#0a0a0a]">
        <Mail className="h-[18px] w-[18px]" strokeWidth={2} />
      </span>
      <span className="text-[19px] font-semibold tracking-tight text-white">ResendByte</span>
    </Link>
  );
}

const stats = [
  { icon: Zap, label: "Median send time", value: "142ms" },
  { icon: Check, label: "Deliverability", value: "99.98%" },
  { icon: TrendingUp, label: "Emails / month", value: "2.1B" },
];

function ShowcasePanel() {
  return (
    <aside className="relative hidden overflow-hidden bg-[#0a0a0a] lg:flex lg:w-[46%]">
      <div className="dot-grid-dark pointer-events-none absolute inset-0 opacity-60" />
      <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="absolute -right-16 bottom-1/4 h-72 w-72 rounded-full bg-violet-600/25 blur-3xl" />
      <div className="absolute left-1/3 top-10 h-56 w-56 rounded-full bg-[#8b5cf6]/20 blur-3xl" />

      <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
        <BrandMark />

        <div className="max-w-sm">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand-400">
            Transactional email, engineered
          </p>
          <h2 className="mt-4 text-[32px] font-semibold leading-[1.15] tracking-tight text-white xl:text-[36px]">
            Your inbox is the product.{" "}
            <span className="text-gradient animate-gradient-pan">We keep it delivering.</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-text-dark-secondary">
            One API for every provider, real-time analytics, and failover you never have to think
            about.
          </p>

          <div className="mt-8 space-y-3">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.04] px-4 py-3 backdrop-blur-sm">
                  <span className="flex items-center gap-3 text-[13.5px] text-text-dark-secondary">
                    <Icon className="h-4 w-4 text-brand-400" strokeWidth={2} />
                    {s.label}
                  </span>
                  <span className="text-[15px] font-semibold text-white">{s.value}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 text-[12.5px] text-text-dark-tertiary">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-soft" />
          All systems operational · 99.98% uptime
        </div>
      </div>
    </aside>
  );
}

function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-bg lg:flex">
      <ShowcasePanel />
      <section className="flex min-h-screen flex-1 flex-col">
        <div className="flex items-center justify-between px-6 pt-8 lg:hidden">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-accent text-white">
              <Mail className="h-4 w-4" strokeWidth={2} />
            </span>
            <span className="text-[17px] font-semibold tracking-tight text-text-primary">ResendByte</span>
          </Link>
        </div>
        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center px-6 py-12">
          {children}
        </div>
      </section>
    </main>
  );
}

export { AuthShell, ShowcasePanel };