"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { Menu, X, Mail } from "lucide-react";

const links = [
  { label: "Product", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "/docs/getting-started" },
  { label: "Changelog", href: "#" },
];

function Wordmark() {
  return (
    <Link href="/" className="flex items-center gap-2 no-underline">
      <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-accent text-white">
        <Mail className="h-4 w-4" strokeWidth={2} />
      </span>
      <span className="text-[17px] font-semibold tracking-tight text-text-primary">
        ResendByte
      </span>
    </Link>
  );
}

export { Wordmark };

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[rgba(245,245,247,0.72)] backdrop-blur-xl border-b border-black/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.6)_inset]"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Wordmark />

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[14px] font-medium text-text-secondary transition-colors hover:text-text-primary no-underline"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="text-[14px] font-medium text-text-primary no-underline hover:opacity-80 transition-opacity"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2 text-[14px] font-medium text-white no-underline transition-all duration-200 hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50"
          >
            Get started
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full text-text-primary hover:bg-accent-glass transition-colors md:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t border-black/[0.06] bg-bg/95 backdrop-blur-xl px-5 py-4 animate-fade-in">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-text-primary no-underline hover:bg-accent-glass transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-2 border-t border-black/[0.06] pt-4">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="rounded-full border border-black/10 px-5 py-2.5 text-center text-[15px] font-medium text-text-primary no-underline hover:bg-accent-glass transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
              className="rounded-full bg-accent px-5 py-2.5 text-center text-[15px] font-medium text-white no-underline hover:bg-accent-hover transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}