# StreamVault Landing

Production-grade marketing site for a premium 4K/8K IPTV service. Rebuilt from the original
single-page prototype with a server-first Next.js architecture, a typed content layer, a validated
checkout flow, and an accessibility/performance budget.

## Stack

- **Next.js 16.4** (App Router, Turbopack) + **React 19.3**
- **TypeScript 5.9** with `strict` + `noUncheckedIndexedAccess`
- **Tailwind CSS 3.4** with a small design-token theme
- **Zod 4** for runtime validation
- **lucide-react** for icons
- No animation runtime: viewport reveals, parallax and pointer spotlights are a few KB of
  IntersectionObserver/rAF code
- No third-party image hosts: every image is local, optimized, and served through `next/image`

## Design system

- **Mood**: cinematic editorial — obsidian surfaces, warm ivory type, champagne gold accents and a
  restrained mint highlight. No generic neon gradients.
- **Typography**: `Instrument Serif` for display headlines and prices, `Manrope` for UI/body,
  `JetBrains Mono` for labels and metadata.
- **Surfaces**: fine 1px hairlines, inset highlights, soft 28px radii, glass panels and a fixed
  film-grain overlay.
- **Micro-interactions**: gold sheen on primary CTAs, animated nav underlines, pointer-tracked
  card spotlights (one delegated listener), cinematic image slow-zoom, parallax showcase cards,
  progressive viewport reveals, scroll progress and a pausable network ticker.
- **Accessibility**: visible-by-default content, `prefers-reduced-motion` support, skip link,
  semantic landmarks, labelled dialog/form errors, and pause control for motion.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional for local work
npm run dev                  # http://localhost:3000
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint flat config |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest unit tests |
| `npm run check` | Lint + typecheck + tests + build |
| `npm run assets:optimize` | Rebuild WebP images, OG image, and app icons |

## Architecture

```text
src/
├─ app/                    # Routes, metadata, error boundaries, health probe
│  ├─ api/health/          # Liveness endpoint
│  ├─ layout.tsx           # Fonts, metadata, JSON-LD, checkout provider
│  ├─ page.tsx             # Static composition of sections
│  ├─ error.tsx            # Route-level error boundary
│  ├─ global-error.tsx     # Root-layout failure boundary (inline styles)
│  ├─ robots.ts / sitemap.ts / manifest.ts
│  └─ globals.css          # Tokens, component primitives, motion, a11y
├─ components/
│  ├─ checkout/            # Context/reducer, dialog, form, trigger
│  ├─ layout/              # Navbar, footer
│  ├─ motion/              # Reveal, Parallax (client-only, tiny)
│  ├─ sections/            # One file per page section
│  ├─ seo/                 # Safe JSON-LD renderer
│  └─ ui/                  # Brand, section header, CTA link
├─ content/                # Typed content: plans, features, platforms, networks, copy
├─ hooks/                  # Media query, scroll lock
├─ lib/
│  ├─ actions/             # Server Action (checkout)
│  ├─ checkout/            # Schema, action-state types, lead service
│  ├─ env.ts               # Public env contract
│  ├─ env.server.ts        # Server-only env contract
│  ├─ logger.ts            # Structured logging + redaction
│  ├─ rate-limit.ts        # Fixed-window limiter
│  └─ utils.ts             # cn, currency, email masking
├─ types/                  # Shared content and plan types
└─ instrumentation.ts      # Register + onRequestError observability hook
```

### Rendering strategy

- The landing page is **statically rendered** (`dynamic = "force-static"`). It ships no per-request
  server work and can be cached at the CDN edge.
- Only the interactive islands are Client Components: navbar, checkout dialog/form, reveal and
  parallax wrappers. Everything else is a Server Component.
- The checkout dialog is **dynamically imported** and only downloaded when a visitor opens it.
- Content lives in `src/content/*` and is typed; sections render it through `map`, so copy changes
  never require JSX surgery.

### State management

Checkout uses a small `useReducer` + Context store (`CheckoutProvider`) instead of a global state
library. It owns open/closed state and the selected plan. The form itself is local `useState` +
React 19 `useActionState`, so pending/success/error states come from the server action rather than
hand-rolled fetch logic.

### Validation and error handling

- **Zod** validates every checkout submission server-side (`src/lib/checkout/schema.ts`).
  Client-side HTML constraints are a convenience only.
- The Server Action returns a typed `CheckoutActionState` with per-field errors; the form maps them
  to `aria-invalid`/`aria-describedby`.
- **Honeypot** field silently drops bots.
- **Rate limiting**: 10 attempts per IP per 10 minutes (process-local; back with Redis for
  multi-instance deployments).
- Route-level `error.tsx`, root `global-error.tsx`, `not-found.tsx`, and Next's `onRequestError`
  hook provide layered failure handling.
- The logger emits JSON in production, masks emails, redacts sensitive keys, and strips newlines to
  prevent log injection.

### Lead delivery

There is no database. Configure `CHECKOUT_WEBHOOK_URL` to forward validated leads to a CRM,
serverless function, or queue. Without it, checkout runs in log-only mode so previews work. A
webhook failure is surfaced to the user and logged with a reference.

### Environment

| Variable | Scope | Required | Default |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | public | no | `http://localhost:3000` |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | public | no | `support@streamvault.example` |
| `CHECKOUT_WEBHOOK_URL` | server | no | empty (log-only mode) |

Public variables are parsed by `src/lib/env.ts`; server secrets by `src/lib/env.server.ts`, which is
guarded by `server-only`. Invalid values fail fast at startup.

## Performance

- Static HTML + RSC payload; no client-side data fetching on the landing page.
- 248 KB hero WebP (down from 3.2 MB) and ~25–35 KB showcase images; all have explicit dimensions
  through `next/image` (`fill` + sized parents), so no layout shift.
- Only the hero image is preloaded; showcase images are lazy.
- Fonts are self-hosted via `next/font` (Instrument Serif, Manrope and JetBrains Mono, latin
  subsets, `display: swap`).
- Animations are transform/opacity only and disabled for `prefers-reduced-motion`.
- The 6.5 MB duplicate JPEGs from the prototype were removed; originals are preserved in
  `original-assets/` (not served) with a reproducible pipeline in `scripts/optimize-assets.mjs`.

## Security

- Security headers in `next.config.ts`: CSP, HSTS (production), `X-Frame-Options`, `nosniff`,
  `Referrer-Policy`, `Permissions-Policy`, COOP/CORP.
- All images are same-origin; the CSP has no third-party origins.
- `poweredByHeader: false`.
- Server Actions include Next's built-in origin checks; the form is same-origin only.
- `server-only` prevents accidental imports of the checkout service into client bundles.
- **CSP tradeoff**: the static page keeps `'unsafe-inline'` for scripts because Next injects inline
  bootstrap scripts. Moving to nonce-based CSP requires per-request rendering (see Next's CSP guide)
  and a CDN that supports per-request HTML. The current choice prioritizes edge caching for a
  marketing page.
- Rate limiting is per-process. Use Redis/Upstash when running more than one instance.

## Tests

Vitest covers the highest-risk logic without a browser:

- `src/lib/checkout/schema.test.ts` — validation, trimming, consent, plan enum, honeypot
- `src/lib/actions/checkout.test.ts` — action state mapping, rate limiting, honeypot, service failure
- `src/lib/rate-limit.test.ts` — limit enforcement, window reset, key isolation
- `src/lib/utils.test.ts` — currency formatting, log-safe email masking

```bash
npm test
```

## Assets

Source images live in `original-assets/` and are not publicly served. Regenerate derivatives with:

```bash
npm run assets:optimize
```

This writes `public/images/*.webp`, `public/og.jpg`, `public/icon-{192,512}.png`, and
`src/app/apple-icon.png`.

## Deployment checklist

1. Set `NEXT_PUBLIC_SITE_URL` to the production HTTPS origin.
2. Set `NEXT_PUBLIC_SUPPORT_EMAIL` and `CHECKOUT_WEBHOOK_URL`.
3. Confirm the host overwrites `x-forwarded-for` (rate limiting key).
4. Add a shared rate-limit store if horizontally scaled.
5. Wire `onRequestError` and the client `error.tsx` effect to your error tracker.
6. Run `npm run check`, then deploy `npm run build` output.
7. Verify `/api/health`, `/robots.txt`, `/sitemap.xml`, `/og.jpg`, and the CSP header.

## Known limitations / next steps

- Checkout is a lead-capture flow, not a payment flow. There is no cart, auth, or subscription
  management; add a payment provider and server-verified webhooks before charging.
- Component/interaction tests (Testing Library or Playwright) would be the next layer on top of the
  current unit tests.
- Legal pages (terms, privacy, refunds) are not included; add them before launch to match the
  consent copy.
- Content claims (uptime, channel counts, customer counts) are marketing copy and must be verified
  by the business.
