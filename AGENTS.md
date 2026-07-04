# AGENTS.md — accounting-site

Hugo static site (v0.163.3) — single-page marketing landing for a Kazakhstani accounting firm.

## Commands

| Action | Command |
|--------|---------|
| Dev server (with livereload) | `hugo server` |
| Build | `hugo` (outputs to `public/`) |

No package.json, npm, or build pipeline. Tailwind CSS, GSAP, Lenis, and Google Fonts are loaded via CDN in `layouts/_default/baseof.html`.

## Structure

- **`hugo.yaml`** — site config (locale `ru-KZ`, all content in Russian)
- **`layouts/index.html`** — the entire single-page site (hero, services, pricing, FAQ, contact, footer)
- **`layouts/_default/baseof.html`** — base template with `<head>`, Tailwind config, GSAP/Lenis init, scroll animations, mobile menu, FAQ accordion, sticky mobile bar
- **`content/`** — empty; all content is inline in `index.html`
- **`archetypes/default.md`** — default Hugo content archetype (Date, Draft, Title)

## Key facts

- Language: **Russian**. Locale: `ru-KZ`. Do not add English text.
- Brand: **finpro** (logo: `fin` + gold `pro`)
- Contact info (phone, email, address, WhatsApp, Telegram, Instagram) is in `hugo.yaml` under `params`
- Social links: WhatsApp (`wa.me/+7...`), Telegram, Instagram
- The contact form (`#contact`) has `onsubmit="alert(...)"` — client-side only, no backend
- Pricing: IP 25,000 KZT/mo, TOO 50,000 KZT/mo, one-off from 5,000 KZT
- Copyright year in footer: 2024

## Animations

- `data-reveal` / `data-reveal-left` / `data-reveal-right` — GSAP ScrollTrigger fade-in
- `data-counter` + optional `data-suffix` — GSAP scroll-triggered number counter
- `data-delay` — stagger delay (seconds as string, e.g. `"0.1"`)
- `hover-target` — utility class for hover effects (used on cards and social buttons)

## Dev

- No tests, no linter, no typecheck
- Hugo livereload runs on `localhost:1313`
- `.hugo_build_lock` — auto-generated lock file, safe to delete if Hugo crashed
- `resources/_gen/` — Hugo cache, safe to delete
