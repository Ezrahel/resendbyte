import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "ResendByte — The email API your users never think about",
  description:
    "ResendByte is the transactional email platform built for developers and ops teams — deliverability tooling, real-time analytics, and provider failover, wrapped in one API.",
  openGraph: {
    title: "ResendByte — The email API your users never think about",
    description:
      "Send transactional email with one API call. Deliverability tooling, real-time analytics, and provider failover in a single platform.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResendByte — The email API your users never think about",
    description:
      "Send transactional email with one API call. Deliverability tooling, real-time analytics, and provider failover in a single platform.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-bg text-text-primary font-sans">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}