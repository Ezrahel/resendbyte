"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

interface Line {
  type: "cmd" | "out" | "ok";
  text: string;
}

const LINES: Line[] = [
  { type: "cmd", text: "$ npx resendbyte@latest login" },
  { type: "out", text: "› Authenticated as you@example.com" },
  { type: "cmd", text: "$ curl -X POST https://api.resendbyte.com/v1/emails \\" },
  { type: "cmd", text: "    -H \"Authorization: Bearer re_live_0x1fa\" \\" },
  { type: "cmd", text: "    -d '{\"to\":\"jordan@acme.com\",\"subject\":\"Your invoice\"}'" },
  { type: "out", text: "200 OK · queued in 124ms" },
  { type: "out", text: '{\n  "id": "em_9f2c1e",\n  "to": "jordan@acme.com",\n  "status": "delivered",\n  "provider": "smtp-aws"\n}' },
  { type: "ok", text: "✓ Delivered. 99.98% of the time." },
];

function useTyping(active: boolean, msPerChar = 24) {
  const [charCount, setCharCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const total = LINES.reduce((sum, line) => sum + line.text.length + 1, 0);
    const interval = setInterval(() => {
      setCharCount((c) => {
        if (c >= total) {
          clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, msPerChar);
    return () => clearInterval(interval);
  }, [active, msPerChar]);
  return charCount;
}

interface RenderLine extends Line {
  complete: boolean;
  key: number;
}

function sliceLines(charCount: number): RenderLine[] {
  const result: RenderLine[] = [];
  let remaining = charCount;
  for (const [i, line] of LINES.entries()) {
    const len = line.text.length + 1;
    const shown = Math.min(Math.max(remaining, 0), len);
    remaining -= len;
    result.push({ ...line, text: line.text.slice(0, shown), complete: shown === len, key: i });
  }
  return result;
}

function TerminalBody({ active }: { active: boolean }) {
  const charCount = useTyping(active);
  const caret = <span className="animate-caret inline-block h-[14px] w-[7px] translate-y-[2px] rounded-[2px] bg-success" />;
  const rendered = sliceLines(charCount);
  const done = charCount >= LINES.reduce((sum, line) => sum + line.text.length + 1, 0);

  return (
    <pre className="overflow-x-auto text-[13px] leading-[1.7] font-mono whitespace-pre-wrap text-text-dark-primary">
      {rendered.map((line) => {
        const isLast = line.key === rendered.length - 1 && done;
        switch (line.type) {
          case "cmd":
            return (
              <div key={line.key} className="text-text-dark-primary">
                {line.text}
                {line.complete && isLast && caret}
              </div>
            );
          case "out":
            return (
              <div key={line.key} className="text-[13px] text-[#9ca3af]">
                {line.complete ? line.text : <span className="whitespace-pre">{line.text}</span>}
                {line.complete && isLast && caret}
              </div>
            );
          case "ok":
            return (
              <div key={line.key} className="flex items-center gap-2 text-success">
                <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
                <span>{line.complete ? line.text : line.text}</span>
                {line.complete && isLast && caret}
              </div>
            );
        }
      })}
    </pre>
  );
}

export function TerminalMock() {
  const [copied, setCopied] = useState(false);

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="absolute -inset-4 rounded-[24px] bg-gradient-to-br from-brand-500/25 via-violet-500/20 to-transparent blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#16161a] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-[12px] font-medium text-[#6e6e73]">resendbyte — first send</span>
          </div>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(LINES.map((l) => l.text).join("\n")).catch(() => {});
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            aria-label="Copy to clipboard"
            className="flex h-7 w-7 items-center justify-center rounded-md text-[#6e6e73] transition-colors hover:text-white hover:bg-white/[0.06]"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>

        <TerminalBody active />
      </div>

      <div className="animate-float absolute -right-3 -top-5 hidden sm:flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.06] px-3.5 py-1.5 shadow-lg">
        <Check className="h-3.5 w-3.5 text-success" strokeWidth={2.5} />
        <span className="text-[12px] font-semibold text-text-primary">Sent in 124ms</span>
      </div>
      <div className="animate-float absolute -bottom-4 -left-3 hidden sm:flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.06] px-3.5 py-1.5 shadow-lg" style={{ animationDelay: "1.5s" }}>
        <span className="h-2 w-2 rounded-full bg-success animate-pulse-soft" />
        <span className="text-[12px] font-semibold text-text-primary">Delivered to inbox</span>
      </div>
    </div>
  );
}