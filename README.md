# DiningOS — Landing Page

Marketing landing page for **DiningOS**, the AI operating system for restaurants.
Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion and lucide-react.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy

Deploys to [Vercel](https://vercel.com) with zero config — import the repo and ship.
No environment variables are required for the current stub.

## Structure

```
app/
  layout.tsx          Root layout, Inter font, SEO metadata
  page.tsx            Assembles the single page
  globals.css         Brand tokens (CSS variables) + grain/glow utilities
  api/lead/route.ts   Stubbed demo-request endpoint (logs + returns success)
components/
  Nav, Hero, LiveFloor, ProblemGrid, SolutionCards, FeatureCards,
  ProductShowcase, DifferenceBand, MetricsBand, HowItWorks,
  CTASection, LeadForm, Footer, Logo (LogoMark + LogoLockup),
  Button, Reveal, SectionHeading
lib/nav.ts            Nav link data
public/favicon.svg    Simplified amber table glyph
```

The signature component is **`components/LiveFloor.tsx`** — an animated live dining
room board that drives the hero and the product showcase. It pauses when
off-screen and renders a static state under `prefers-reduced-motion`.

## Brand system

Color tokens live as CSS variables in `app/globals.css` and are mapped into
Tailwind in `tailwind.config.ts`. The color language is enforced throughout:

- **Amber** = something to act on / attention / CTAs.
- **Teal** = under control / resolved / positive.
- Charcoal is the canvas; accent color is used with restraint.

## TODO (wiring for production)

- [ ] **Lead form** — `app/api/lead/route.ts` currently logs the lead and returns
      success. Wire it to a real destination: a CRM (HubSpot/Salesforce), a
      transactional email provider (Resend/Postmark), or a Slack webhook.
- [ ] **Illustrative metrics** — every stat is marked *illustrative*. Replace the
      numbers in `components/MetricsBand.tsx` and `components/ProductShowcase.tsx`
      with real pilot data, and remove the disclaimers once verified.
- [ ] **Integration logos** — the hero shows text placeholders (Toast, Square,
      OpenTable, Resy) in `components/Hero.tsx`. Drop in real, licensed logo assets.
- [ ] **Open Graph image** — add a real `/opengraph-image` and update `SITE_URL`
      in `app/layout.tsx`.

## Accessibility & performance notes

- WCAG AA: amber/teal are used for large text and accents, not tiny body copy.
- All interactive elements are keyboard-navigable with a visible focus ring.
- The animated board exposes a text equivalent and marks decorative motion
  `aria-hidden`; all non-essential motion is disabled under
  `prefers-reduced-motion`.
- Animations are transform/opacity only; the board pauses off-screen.
