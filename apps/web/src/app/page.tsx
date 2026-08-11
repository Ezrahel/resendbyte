import type { Metadata } from "next";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { Hero } from "@/components/landing/Hero";
import { LogoCloud } from "@/components/landing/LogoCloud";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { BentoGrid } from "@/components/landing/BentoGrid";
import { Steps } from "@/components/landing/Steps";
import { CodeTabs } from "@/components/landing/CodeTabs";
import { Deliverability } from "@/components/landing/Deliverability";
import { Analytics } from "@/components/landing/Analytics";
import { Reliability } from "@/components/landing/Reliability";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { TrustBand } from "@/components/landing/TrustBand";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "ResendByte — The email API your users never think about",
  description:
    "ResendByte is the transactional email platform built for developers and ops teams — deliverability tooling, real-time analytics, and provider failover, wrapped in one API.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-bg">
      <LandingNavbar />
      <Hero />
      <LogoCloud />
      <ProductShowcase />
      <BentoGrid />
      <Steps />
      <CodeTabs />
      <Deliverability />
      <Analytics />
      <Reliability />
      <Pricing />
      <Testimonials />
      <TrustBand />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}