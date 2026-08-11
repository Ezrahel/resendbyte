import { Wordmark } from "./LandingNavbar";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Analytics", href: "#analytics" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Getting started", href: "/docs/getting-started" },
      { label: "API reference", href: "/docs/api-reference" },
      { label: "Emails", href: "/docs/emails" },
      { label: "Webhooks", href: "/docs/webhooks" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Deliverability guide", href: "#" },
      { label: "Support", href: "#" },
      { label: "Security", href: "#" },
      { label: "Terms & privacy", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-white/60">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-text-secondary">
              The transactional email API for developers and ops teams. Built for deliverability,
              observability, and scale.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-3.5 py-1.5 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse-soft" />
              <span className="text-[12px] font-medium text-text-secondary">All systems operational</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-text-tertiary">{col.title}</h4>
                <ul className="mt-3 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-[14px] text-text-secondary no-underline transition-colors hover:text-text-primary">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-black/[0.05] pt-6 sm:flex-row">
          <p className="text-[13px] text-text-tertiary">© {new Date().getFullYear()} ResendByte, Inc.</p>
          <div className="flex items-center gap-5 text-[13px] text-text-tertiary">
            <a href="#" className="no-underline hover:text-text-primary transition-colors">Privacy</a>
            <a href="#" className="no-underline hover:text-text-primary transition-colors">Terms</a>
            <a href="#" className="no-underline hover:text-text-primary transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}