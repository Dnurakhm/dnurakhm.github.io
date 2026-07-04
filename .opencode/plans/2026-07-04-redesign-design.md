# Design Spec: finpro Accounting Site Redesign

## Overview

Full visual overhaul of the finpro landing page. Keep dark + gold palette but refine: cleaner layouts, more whitespace, intentional typography, subtler animations. Direction: Minimal Premium.

## Design System

### Palette
- surface: #070708
- surface-elevated: #1a1a1e
- gold: #d4a853
- gold-400: #bf8f33
- text-primary: #f8f8f8
- text-secondary: #aeaeb2
- text-muted: #636366
- border-subtle: rgba(255,255,255,0.04)
- border-hover: rgba(255,255,255,0.08)

### Typography
- Headings: Syne 600-800, -0.03em tracking
- Body: Inter 300-600, line-height 1.7
- Labels: Syne 600, 0.08em, 0.7rem
- Sizes: clamp()

### Spacing
8px grid. Sections: py-24/py-16. Inner: max-w-7xl px-6 lg:px-10.

### Borders
- Cards: rounded-xl, border-white/[0.04]
- Buttons: rounded-full
- Inputs: rounded-lg

### Animations
- GSAP + Lenis. y:30 (was 50). 0.8s. top 85%. No stagger within groups.

## Sections

1. Nav: blur always on. Text logo. py-4.
2. Hero: clamp(3rem,7vw,6rem). Dot-grid bg. Trust inline with CTA.
3. About: border hover gold/12. Quote: gold left border.
4. Services: 2-col grid. border-b cards.
5. Why Us: 2-col. Gold dot icon.
6. Pricing: 3-col. Featured: gold border. Pill badge.
7. Testimonials: 3-col. Gold text stars.
8. FAQ: Plus/minus rotation. surface-elevated bg.
9. CTA: Solid bg. No orbs.
10. Contact: Clean inputs. Inline icons.
11. Footer: Logo + contact inline.
12. Sticky bar: keep.

## Files
- baseof.html: CSS/JS cleanup
- index.html: section class updates

## Out of Scope
No backend, no content changes, no new assets.
