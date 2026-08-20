import { Reveal } from "./Reveal";
import {
  Server,
  LineChart,
  ShieldCheck,
  Webhook,
  FileCode2,
  Layers,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  title: string;
  body: string;
  icon: LucideIcon;
  span?: string;
}

const features: Feature[] = [
  {
    title: "One API, every provider",
    body: "A single SDK talks to every major provider — with graceful failover under the hood. If one goes down, your emails still get out.",
    icon: Server,
    span: "lg:col-span-2",
  },
  {
    title: "Real-time analytics",
    body: "Opens, clicks, unsubscribes, and per-domain delivery — updated as events stream in.",
    icon: LineChart,
  },
  {
    title: "Deliverability toolkit",
    body: "DKIM, SPF, and DMARC validation, dedicated IPs, and automatic warmup so your reputation stays clean.",
    icon: ShieldCheck,
  },
  {
    title: "Signed webhooks",
    body: "Delivery events pushed to your endpoint, idempotently and retried with backoff.",
    icon: Webhook,
  },
  {
    title: "Templates & versioning",
    body: "React or MJML templates with version history and one-click rollback.",
    icon: FileCode2,
  },
  {
    title: "Guaranteed job queue",
    body: "BullMQ-backed priority and delayed sends with retries. Nothing is silently dropped.",
    icon: Layers,
    span: "lg:col-span-2",
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  return (
    <div
      className={`glass group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.2] hover:shadow-[0_12px_40px_rgba(255,255,255,0.06)] ${feature.span ?? ""}`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-glass text-text-primary transition-colors group-hover:bg-accent group-hover:text-white">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <h3 className="mt-4 text-[17px] font-semibold tracking-tight text-text-primary">{feature.title}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-text-secondary">{feature.body}</p>
    </div>
  );
}

export function BentoGrid() {
  return (
    <section id="features" className="scroll-mt-24 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-brand-600">Features</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Everything email infrastructure should have been
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-relaxed text-text-secondary">
            Purpose-built for transactional sending. No bloat, no marketing tethers — just the
            capabilities that make email reliable.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 60}>
              <FeatureCard feature={feature} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}