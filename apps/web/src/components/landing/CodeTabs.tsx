"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { Check, Copy } from "lucide-react";
import { Reveal } from "./Reveal";

interface Snippet {
  id: string;
  label: string;
  code: string;
}

const snippets: Snippet[] = [
  {
    id: "node",
    label: "Node.js",
    code: `import { ResendByte } from "resendbyte";

const rb = new ResendByte("re_live_0x1fa");

await rb.emails.send({
  to: "jordan@acme.com",
  from: "acme@ship.labs",
  subject: "Your order #2042",
  html: "<p>Thanks for your order!</p>",
});`,
  },
  {
    id: "python",
    label: "Python",
    code: `from resendbyte import ResendByte

rb = ResendByte("re_live_0x1fa")

rb.emails.send(
    to="jordan@acme.com",
    from_="acme@ship.labs",
    subject="Your order #2042",
    html="<p>Thanks for your order!</p>",
)`,
  },
  {
    id: "curl",
    label: "cURL",
    code: `curl -X POST https://api.resendbyte.com/v1/emails \\
  -H "Authorization: Bearer re_live_0x1fa" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "jordan@acme.com",
    "from": "acme@ship.labs",
    "subject": "Your order #2042",
    "html": "<p>Thanks for your order!</p>"
  }'`,
  },
  {
    id: "go",
    label: "Go",
    code: `package main

import "github.com/resendbyte/resendbyte-go"

func main() {
    rb := resendbyte.New("re_live_0x1fa")

    rb.Emails.Send(ctx, resendbyte.Email{
        To:      "jordan@acme.com",
        From:    "acme@ship.labs",
        Subject: "Your order #2042",
        HTML:    "<p>Thanks for your order!</p>",
    })
}`,
  },
];

const responseSnippet = `{
  "id": "em_9f2c1e",
  "to": "jordan@acme.com",
  "status": "delivered",
  "provider": "smtp-aws",
  "timing": { "queued_ms": 124 }
}`;

const points = [
  "Idempotent by default — retries never double-send",
  "TLS + SPF + DKIM alignment on every message",
  "One-click retry with exponential backoff",
];

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#16161a]">
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(code).catch(() => {});
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          aria-label="Copy code"
          className="flex h-7 w-7 items-center justify-center rounded-md text-[#6e6e73] transition-colors hover:text-white hover:bg-white/[0.06]"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-[1.7] font-mono text-[#e5e7eb]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function CodeTabs() {
  const [active, setActive] = useState(snippets[0].id);

  return (
    <section id="code" className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-brand-600">For developers</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
              One endpoint. Every language.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-text-secondary">
              A single POST to <code className="rounded bg-accent-glass px-1.5 py-0.5 font-mono text-[13px] text-text-primary">/v1/emails</code>{" "}
              does the rest. Here&apos;s the same send in four languages.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-6 space-y-3.5">
              {points.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/15">
                    <Check className="h-3.5 w-3.5 text-success" strokeWidth={3} />
                  </span>
                  <p className="text-[15px] text-text-primary">{point}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-8 rounded-xl border border-white/[0.1] bg-white/[0.05] p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-tertiary">
                Response
              </div>
              <pre className="mt-2 overflow-x-auto font-mono text-[12.5px] leading-relaxed text-text-secondary">
                <code>{responseSnippet}</code>
              </pre>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="flex flex-wrap gap-1.5">
            {snippets.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                className={clsx(
                  "rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors",
                  active === s.id
                    ? "bg-accent text-white"
                    : "bg-accent-glass text-text-secondary hover:bg-accent-glass",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="mt-3 animate-fade-in">
            <CodeBlock code={snippets.find((s) => s.id === active)?.code ?? snippets[0].code} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}