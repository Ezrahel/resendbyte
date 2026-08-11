# ResendByte — Premium Landing Page Plan

> Grounded in the existing stack: Next.js 16.2 (App Router) + Tailwind CSS v4 + React 19, `lucide-react` icons, existing Apple-inspired design tokens (`SF Pro` fonts, `glass` utilities, light theme). Reuses `components/ui/*` (Button, Badge, etc.). No new runtime deps required except optional `framer-motion` (see Motion Strategy) and `next/font` for Inter/Geist.

---

## 1. Positioning & Messaging

**One-liner**
> "The email API that never delivers your emails in an afternoon." _(draft — keep short, confident)*

Related alternatives explored:
| Style | Anchor | Borrowed from |
|---|---|---|
| Developer-first | "Send transactional email with one API call." | Resend |
| Outcome-focused | "Every email, delivered. On time, to the inbox." | Postmark |
| Scale-focused | "From your first test email to a billion sends." | Stripe |
| Simplicity | "Email infrastructure that just works." | Vercel |

**Recommended angle:** *Developer-first with a trust overlay.* Developers build on ResendByte; ops people trust it because of deliverability, monitoring, and failover. The page must convince two audiences at once (#1–5 sell the engineer, #6–8 sell the owner).

**Core pillars to convert the visitor (one per hero-to-footer band):**
1. **Speed to first send** — copy-paste code, working in minutes.
2. **Deliverability you can verify** — real-time analytics, reputation tracking, DKIM/SPF/DMARC tooling.
3. **Trust & resilience** — provider failover, retries, error handling built in.

---

## 2. Information Architecture (Section Map)

```
01 Navbar            Floating glass nav — logo, Product | Pricing | Docs | Company, [Sign in] [Get started]
02 Hero              Headline + subhead + primary/secondary CTA + animated Product Mock (terminal)
03 Logo Cloud        "Trusted by the teams shipping to ~7B inboxes" (text logos)
04 Product Mock /   Big animated dashboard + API response reveal (the "Stripe terminal" moment)
   "First send"
05 Features          Bento grid (Linear-style) — 6 long-form + supporting
06 How it works      Three-step: Connect a domain → Write your first API call → Watch it land
07 Code showcase     Tabbed snippets (Node / Python / cURL / Go) + live response badge
08 Deliverability    Dedicated band: dedicated IPs, warmup, DNS health, bounce handling
09 Analytics         Half-screen product shot + animated metric counters (open/click/delivered)
10 Reliability       Uptime, failover, retries — stat cards (99.9%+ SLA claims or honest numbers)
11 Pricing           Three tiers + usage calculator feel (starter / scale / enterprise)
12 Testimonials      Social proof — logo wall + 3 featured quotes
13 Enterprise /      SOC 2 mention, regions/edge, compliance badges, 24/7 support
   Trust band
14 FAQ               Collapsible accordion (4–6 answers)
15 Final CTA         Large centered close — "Send your first email in under 5 minutes."
16 Footer            Sitemap columns, status pill, socials, legal
```

**Ordering rationale (Stripe/Resend pattern):** prove the product emotionally (hero), prove credibility (logos → mock → features), prove the developer path (code → API → deliverability), handle objections (analytics → reliability → pricing), then close (testimonials → FAQ → final CTA).

---

## 3. Visual Design System

### 3.1 Typography
- **Headings:** `Inter` (or `Geist`) via `next/font/google`, `font-semibold/tight tracking-tight`, sizes `text-4xl → text-7xl`.
- **Body:** Existing `--font-sans` (SF Pro stack) for body; Inter only for headings keeps the Apple feel while adding precision.
- **Code:** `--font-mono` (SF Mono / Fira Code) for all code blocks and `inline-code` in copy.
- **Headline scale:** hero `text-5xl md:text-7xl`; section headers `text-3xl md:text-4xl`; support text `text-text-secondary`.

### 3.2 Color (extend the existing light theme)
Keep **`#f5f5f7`** light base (Apple) + variables already in `globals.css`. Add:
- `--color-accent`: keep neutral `#333` for primary buttons (Apple-style black button) — BUT introduce a **signature brand gradient** for highlights: indigo→violet (`#6366f1 → #8b5cf6`) used sparingly (hero mesh, key CTA accents, live badge).
- **Dark contrast section** (Linear/Resend trick): one full-bleed dark band (deep `#0a0a0a`) for the Deliverability/Analytics sections to create rhythm against the light body. Add dark tokens: `--color-bg-dark`, `--color-text-dark-*`, `--color-surface-dark`.
- **Status colors** already defined (`success #30d158`, `warning #ff9f0a`, `danger #ff453a`) — reuse for live-delivery dots and failover visuals.

### 3.3 Shape & Depth
- Cards: reuse `glass`, `glass-lg`, `border rounded-2xl`, `shadow-sm` + hairline borders (`border-black/[0.06]`).
- Radius scale: buttons `rounded-full`, cards `rounded-2xl`, mock windows `rounded-2xl` with `overflow-hidden`.
- **Grain/gradient mesh**: hero background = soft radial gradient (indigo/violet 4–8% opacity) + subtle noise SVG overlay + floating blurred orbs (`blur-3xl opacity-20`). This is the #1 "premium" signal.

### 3.4 Iconography
- `lucide-react` (already installed). Stroke-width 1.5, size 18–22.
- Feature icons in soft tinted chips: `bg-accent-glass` round, `size-10`.

---

## 4. Component Inventory (built for this page)

New page-level components under `apps/web/src/components/landing/`:

| Component | Purpose | Notes |
|---|---|---|
| `LandingNavbar.tsx` | Sticky, transparent→blur-on-scroll glass bar | Shrinks on scroll (`backdrop-blur-xl bg-surface/70`), CTA buttons on right |
| `Hero.tsx` | Headline, sub, CTAs, terminal mock | Grid or stacked (mock below fold on mobile) |
| `TerminalMock.tsx` | Animated `POST /emails` request/response | Typing animation on `create`, then response JSON + "sent in 124ms" |
| `LogoCloud.tsx` | Text-logo marquee or static grid | 6–10 tasteful wordmarks, `opacity-50 → hover:opacity-100` |
| `ProductShowcase.tsx` | Big framed dashboard + live delivery sparkline | Static image placeholder + CSS shimmer; no real telemetry |
| `BentoGrid.tsx` | Feature cards, varied spans | 6 cards, `lg:grid-cols-3`, one hero-span card |
| `Steps.tsx` | "How it works" 1-2-3 | Connected line + number badges |
| `CodeTabs.tsx` | Tabbed syntax blocks (Node/Python/cURL/Go) | Static highlighted code, tab state via `useState` |
| `Deliverability.tsx` | Dark band: DNS health, warmup, IP pool | Paired list + visual checker mock (checkmarks animate) |
| `MetricCounter.tsx` | Animated numbers on view | `data-count` + requestAnimationFrame or `framer-motion` |
| `Pricing.tsx` | 3 tiers, middle highlighted | Monthly/annual toggle (state), feature checklists |
| `Testimonials.tsx` | Featured quotes + logo strip | Avatars via initials (no image assets) |
| `TrustBand.tsx` | Compliance/regions/support badges | SOC 2, GDPR, multi-region, 24/7 |
| `FAQ.tsx` | Accordion (`details`/`summary` or state) | 5–6 honest answers, links to `/docs` |
| `FinalCTA.tsx` + `Footer.tsx` | Close + full sitemap | Footer: 4 columns, status pill, `© 2025 ResendByte` |

**Reuse:** `ui/Button.tsx` (add `size="lg"` variant), `ui/Badge.tsx` for "Beta/New" chips.

---

## 5. Section-by-Section Specs

### 5.1 Navbar
- Fixed top; on mount: transparent. On scroll > 8px: `backdrop-blur-xl bg-surface/70 border-b border-black/5`.
- Left: wordmark (existing logo + "ResendByte"). Center: Product, Pricing, Docs, Changelog. Right: "Sign in" (link → `/login`) + primary Button "Get started".
- Mobile: hamburger → full sheet with links (no new deps; `useState`).

### 5.2 Hero
- **Headline (pick its premise):**
  1. "Emails that actually land." — memorably short
  2. "The email API your users never think about." — anti-marketing, premium
  3. "Send your first email in 5 minutes." — actionable
  > Premium direction: **#2** as H1 with **#3** as the eyebrow badge ("Get to your first send in 5 minutes ⚡").
- Sub (font-normal, secondary): "ResendByte is the transactional email platform built for developers and loved by ops teams — deliverability tooling, real-time analytics, and provider failover, wrapped in one API."
- CTAs: Primary (dark pill, 16px, lg padding) "Start sending for free" → `/signup`; Secondary (ghost) "Read the docs" → `/docs` or "Try the API" → `/login`.
- **TerminalMock** screenshots the exact first-run flow (feeds the "5 minutes" claim):
  ```
  $ npm i resendbyte
  $ cp token; POST https://api.resendbyte.io/v1/emails
  → 200 { id: "em_88", to: "you@example.com", status: "queued" }  ·  sent in 124ms
  ```
- **Trust microcopy** under CTAs: "Free tier · No credit card · Cancel anytime" + avatar/logo row.

### 5.3 Logo Cloud
- Support line: "Trusted by the teams shipping to billions of inboxes"
- 6–10 greyed wordmarks in one or two rows. No real logos available → use tasteful wordmark placeholders or neutral company names with an asterisk remitting to blue-chip design (Stripe does vector logos). Since we have none, prefer **generic-seeming starter names** or a clean grid of client "logos" supplied later. (Flag: ask client for real logos; ship placeholders otherwise.)

### 5.4 Product Mock / "First Send"
- Two-column: left = headline ("From zero to sent in 5 minutes"), right = browser-frame dashboard with a fake "Volume today" area chart (CSS/recharts static) + "Sends 12,480 · Delivered 99.98%".
- Add small floating badges overlapping the frame: "✅ Queued", "Delivered in 142ms" — the floating-badge affordance is a Stripe hallmark.

### 5.5 Features — Bento Grid (6)
1. **One API, every provider** — single SDK, graceful failover under the hood. (span 2)
2. **Real-time analytics** — opens, clicks, unsubs, per-message and per-domain.
3. **Deliverability toolkit** — DKIM/SPF/DMARC validation, dedicated IPs, warmup.
4. **Webhooks** — delivery events signed & retried (idempotent).
5. **Templates & versioning** — React/MJML, prebuilt components, version rollback.
6. **Guaranteed job queue** — BullMQ-backed priority, delayed sends, retries.
Each card: tinted icon chip, title, 1–2 sentence body, subtle `hover:border-black/10 hover:-translate-y-0.5`.

### 5.6 Code Showcase (the developer cred section)
- Tabs: `Node.js`, `Python`, `cURL`, `Go`. Same call in 4 languages, response shown once:
  ```js
  import { ResendByte } from 'resendbyte';
  const rb = new ResendByte('re_live_…');
  await rb.emails.send({
    to: 'user@example.com',
    from: 'acme@locker.io',
    subject: 'Your order #2042',
    html: `<p>Thanks, Jordan!</p>`,
  });
  ```
- Right rail: "What you get" checkmarks (idempotency keys, TLS, SPF alignment, 1-click retry).

### 5.7 Deliverability (dark band)
- Dark bg `#0a0a0a`; headline "Your emails belong in the inbox, not the spam folder."
- Left: animated **DNS health checker** mock (4 rows: SPF ✅, DKIM ✅, DMARC ✅, MX ✅ — stagger animation on scroll).
- Right: bullets — automatic warmup, dedicated IP pools, bounce & complaint handling, seed-list monitoring.
- Micro-stat strip: "99.98% deliverability across 2.1B sends" (honest-marketing caution: numbers in the page are placeholders; only ship real metrics if they exist).

### 5.8 Analytics
- Split: metric counters (Delivered, Opened, Clicked, Unsubscribed as animated counters) + half-screen chart. Borrow Stripe's calm axisless chart aesthetic (`recharts` is installed; fake static data + `Grid` off, thin `#333` line).

### 5.9 Reliability
- Three stat cards: **"99.98% uptime"** (or honest value), **"3× provider failover"**, **"Auto-retry with exponential backoff"**. Each with icon + short line. Note: don't publish unverifiable SLA numbers without approval.

### 5.10 Pricing
- Three tiers, middle emphasized ("Scale" — most popular):
  - **Starter** — Free: 3k emails/mo, 1 domain, community support.
  - **Scale** — $20/mo or $16 annual: 50k emails/mo, custom tracking domain, dedicated IP add-on, analytics.
  - **Enterprise** — Custom: SLAs, dedicated infra, security review, on-prem/edge region options, 24/7.
- Annual toggle (×2 months free style) — a small `useState`; middle card `ring-2 accent` + "Most popular" Badge.

### 5.11 Testimonials
- 3 quotes (developer lead, founder, ops lead). Avatar = initials in colored circle (no external assets). Company wordmark under each.
- Full-width logo strip bottom.

### 5.12 Enterprise / Trust band
- 4 columns: **Security** (SOC 2 Type II in progress—check), **Regions** (US–East, EU–Central, AP–South, edge), **Compliance** (GDPR, CCPA), **Support** (24/7, median first reply < 2h). Badges as light cards.

### 5.13 FAQ (honest, 5–6)
- "How is ResendByte different from SendGrid/Postmark/SES?"
- "Do I need a dedicated IP?" 
- "How does failover work?"
- "Can I use my own sending domain + DKIM?" 
- "What happens if a provider is down?" 
- "Migrating from another provider?" (link: bring your templates/API keys)
- Each: accordion; answer keeps tone calm and technical, links to /docs.

### 5.14 Final CTA
- Centered, gradient-mesh bg, big headline "Ready to make email the last thing you think about?"
- Primary CTA + sub-copy "Free forever tier · No credit card". Maybe an email-capture input for "Get notified" — optional, prefer CTA button.

### 5.15 Footer
- Columns: Product (Features, Pricing, Changelog, Status), Developers (Docs, API Reference, SDKs, Guides), Company (About, Blog, Careers, Contact), Resources (Deliverability Guide, Support, Security).
- Bottom row: © 2025 ResendByte. Status pill (green dot "All systems operational" — wire to real status once deployed). Language/region selector placeholder.

---

## 6. Motion Strategy (no heavy deps)

- **Reveal-on-scroll:** a small `InView` wrapper using `IntersectionObserver` (custom hook `useInView`) applying `animate-slide-up` when visible. Avoids framer-motion dependency.
- If the team prefers it, add **`framer-motion`** (single runtime dep, 50kb gzip) for viewport-magic + stagger; recommend only after IntersectionObserver version is built.
- **Tabs:** instant swap with subtle `animate-fade-in`.
- **Counters:** RFA-based count-up triggered by `useInView`.
- **Hover:** `transition-all`, card `-translate-y-0.5`, button brightness shifts. Respect `prefers-reduced-motion` (wrap animations).

---

## 7. Performance & SEO

- **Layout:** `LandingPage` route at `app/page.tsx` (replaces the `redirect("/dashboard")`) with lazy-loaded sections via `next/dynamic` (`ssr: false` region for non-critical bands). Keep hero + nav static.
- **Assets:** mock screenshots as compressed WebP (`next/image`, `priority` on hero). No heavy hero video unless client provides 3–10s loop (prefer static + CSS shimmer to stay premium-safe).
- **SEO:** metadata per section, `openGraph` image (hero), structured `FAQPage` JSON-LD, canonical `/`, hreflang stub. sitemap + `robots` already fine.
- **Fonts:** `next/font` with `display: "swap"`, preload Inter variable subset. Budget: < 20kb font payload.
- **Lighthouse targets:** LCP < 2.5s, CLS < 0.1, 100/100 accessibility (skip-link, aria on accordion/tabs).

---

## 8. Conversion Checklist

- Primary CTA visible in viewport on 100% of devices (hero + nav + final).
- Only **one** primary verb ("Get started") repeated.
- Every feature claim links to where it's proven: analytics → dashboard, docs → docs, deliverability → guide.
- Secondary CTAs are text-links or ghost, never compete with primary.
- Forms: minimal (email only) on any capture; inline validation; no CAPTCHA burden on free signup.
- Trust signals visible above the fold (no-credit-card, free tier, 5-min setup).
- Privacy/terms links in footer + near any email capture.

---

## 9. Implementation Roadmap

| Phase | Deliverable | Est. |
|---|---|---|
| 1. Foundations | Landing page shell + Navbar + Footer + Hero + `useInView` hook + motion primitives | 0.5d |
| 2. Core story | TerminalMock + ProductShowcase + BentoGrid + Steps + CodeTabs | 1d |
| 3. Trust bands | Deliverability (dark) + Analytics + Reliability + TrustBand | 1d |
| 4. Closure | Pricing + Testimonials + FAQ + FinalCTA | 0.5d |
| 5. Polish & QA | Motion QA, reduced-motion, A11y, SEO meta, Lighthouse pass, favicon | 0.5d |
| 6. Content swap | Real logos, real metrics, real testimonial quotes (needs client assets) | 0.25d |

Total scaffolding ~**4–5 focused dev days**; dependent on copy approval + real assets (logos, screenshots, metrics).

---

## 10. Copy Style Guide (voice)

- **Tone:** calm, technical, confident. Short declaratives. Wine-pairing metaphors avoided; dev flavor allowed ("one API call", "idempotent by default").
- **Numbers:** rarely, and only real ones. Placeholders marked `[REAL METRIC]`.
- **Capitalization:** sentence case everywhere ("Start sending", not "START SENDING").
- **Microcopy:** buttons say what happens next ("Start sending", "Read the docs").
- **Never:** fake uptime claims, spam-word bait ("#1", "guaranteed inbox placement"), stock-photo clouds.