# Build Prompt — DiningOS Landing Page

> Paste this whole file into Claude Code as the task. It is written to be self-contained.

---

## 0. ROLE & GOAL

You are a senior product designer + front-end engineer. Build a **production-quality marketing landing page** for **DiningOS — the AI operating system for restaurants**. The page must look like a top-tier modern SaaS launch (think Linear, Vercel, Rippling, Arc): confident, dark, cinematic, with restrained motion and immaculate typography. It must be responsive, accessible, fast, and genuinely beautiful — not a generic template. Design quality is the #1 success criterion.

Optimize for a single conversion goal: **book a demo / start a one-shift pilot.**

---

## 1. TECH STACK

- **Next.js (App Router) + TypeScript + Tailwind CSS.**
- **Framer Motion** for animation. **lucide-react** for icons.
- Single-page site with anchor navigation; components split cleanly under `/components`.
- No backend required — the demo form can POST to a stubbed `/api/lead` route that logs and returns success (leave a clear TODO to wire a real CRM/email later).
- Deployable to Vercel with zero config. Include a short `README.md`.
- Use `next/font` to load **Inter** (weights 400/500/600/700/800). No external font CDNs.
- Keep everything type-safe and componentized. Prefer semantic HTML.

---

## 2. BRAND SYSTEM (use these tokens exactly)

Define these as CSS variables / Tailwind theme extensions.

**Colors**
- `--bg` charcoal base `#0B0F14`
- `--panel` `#141A22`  · `--panel-2` `#11161D`
- `--hairline` `#232B35`
- `--ink` (primary text) `#F4F7FB`
- `--muted` `#9AA6B4` · `--muted-2` `#6B7885`
- `--amber` (primary accent) `#F5A623` · amber-bright `#FFC24B`
- `--teal` (secondary accent) `#2DD4BF`
- `--violet` (tertiary, sparingly) `#A78BFA`
- `--alert` `#F87171`

**The color language (important — enforce it):** amber = "something to act on / attention / energy / CTAs." teal = "under control / resolved / positive." Charcoal is the canvas. Keep the page mostly dark + neutral with accent color used with restraint. Amber and teal never fight for the same job.

**Typography**
- Inter throughout. Headlines ExtraBold (800), tight negative letter-spacing (~-0.02em to -0.04em on large sizes). Subheads SemiBold. Body Regular, `--muted` color, ~1.6 line-height. Eyebrows/labels: uppercase, letter-spaced (~0.15em), small, `--muted-2`.
- **Numbers/metrics are heroes** — set them large and bold; they're the brand's proof. Let them breathe.

**Logo**
- Wordmark: "Dining" in `--ink` + "OS" in `--amber`, one word, ExtraBold. "OS" is always the amber suffix (platform cue, like iOS/macOS).
- Icon: an app-tile with a single line-art **dining table** drawn in a teal→amber gradient stroke with a soft neon glow. Recreate this as an inline SVG component (`<LogoMark/>`): rounded-square tile (`--panel` fill, subtle hairline border), containing a minimal top-down/perspective table outline stroked with a `linearGradient` from `#2DD4BF` (top-left) to `#F5A623` (bottom-right), plus a soft glow (SVG blur filter). Provide `LogoMark` (icon only) and `LogoLockup` (icon + wordmark) components.
- Favicon: simplified table glyph, solid amber, no glow.

**Motion motif (signature — reuse everywhere)**
- A soft **amber pulse** (expanding ring / glow that fades) is the brand's signature animation. Use it on the hero, on hover states, and as the section-reveal accent.
- The **"grid lighting up"** — cells/tables transitioning between calm and lit states — is the hero centerpiece.
- Motion rules: smooth, tasteful, 60fps, CSS/transform-based, ease-out. Nothing bouncy or gimmicky. Respect `prefers-reduced-motion` (disable non-essential motion).

**Voice (write all copy in this voice)**
- Perceptive, calm, straight-talking. Plain language, short declarative sentences, no hype. No "revolutionary / cutting-edge / synergy / leverage," no exclamation marks, no stacked adjectives.
- Privacy framing is a headline, not a footnote: "events, not identities," "measures the floor, not your people."

---

## 3. GLOBAL LAYOUT

- **Sticky top nav** (transparent over hero, gains a subtle blurred `--bg` background + hairline bottom border on scroll): `LogoLockup` left; center/right links — Product, How it works, Why DiningOS, Pricing anchor optional, plus a primary **"Book a demo"** button (amber). Mobile: hamburger → slide-over menu.
- Max content width ~1200px, generous vertical rhythm (large section padding), consistent 8px spacing scale.
- Subtle background texture: very faint radial glow behind the hero, faint noise/grain overlay, thin hairline dividers between sections. No harsh borders.
- Smooth-scroll anchor navigation. Scroll-reveal (fade + 12–20px rise, staggered) on section entry via Framer Motion `whileInView`.
- Footer at the end (see §5).

---

## 4. SIGNATURE COMPONENT — THE LIVE FLOOR (hero centerpiece)

Build an animated **"live dining room"** widget as the hero visual. A grid of ~12 table cells (rounded cards) on a dark panel, each cycling through statuses with smooth color transitions on a loop:

`Empty → Seated → Waiting for food → Dessert → Ready to pay → Dirty → Reset`

- Each cell: label (T1–T12), a status dot/pill, soft glow tinted to its state (teal for good, amber for attention, violet for dessert, red for needs-reset).
- Cells change state on a staggered timer so the board feels alive. One cell always "needs attention" (amber pulse) at any time.
- Overlay a small **alert toast** that pops in sequence and auto-dismisses: "Table 12 waited 9 minutes." → "Patio section filling up." → "3 tables ready to pay."
- Include a tiny live header: a teal pulsing dot + "Dining room · live" and "12 tables."
- Must be performant and pause when off-screen / on `prefers-reduced-motion` (show a static tasteful state).

This component is the star of the page — make it feel premium and real.

---

## 5. PAGE SECTIONS (in order) — with copy

Write final copy (below is approved; refine lightly for flow, keep the voice). Every section fades/staggers in on scroll.

### 5.1 Hero
- Eyebrow: `THE AI OPERATING SYSTEM FOR RESTAURANTS`
- H1: **Your restaurant, finally readable in real time.** (make "readable" amber)
- Sub: "DiningOS turns the cameras and systems you already run into one live operational brain — so managers stop reacting and start running the floor."
- Buttons: primary **"Book a demo"** (amber), secondary **"See it live"** (ghost, scrolls to the live-floor / product section).
- Right/hero visual: the **Live Floor** component from §4.
- Trust strip under buttons (small, muted): "Works with your existing cameras, POS, reservations & kitchen systems." Optionally a row of greyscale POS/reservation logo placeholders (Toast, Square, OpenTable, Resy — use text placeholders / neutral chips, clearly marked as placeholders).

### 5.2 The Problem — "Managers spend the whole shift reacting"
- Eyebrow `THE PROBLEM`. H2: "Managers spend the whole shift reacting."
- Left: a short amber-accented callout — "Most restaurants learn about a bottleneck **after the guest has already complained.**" + muted line: "Huge amounts of data, almost none of it connected. Today's systems record transactions — they don't understand operations."
- Right: 5 numbered question cards (01–05):
  1. Which tables have been waiting too long?
  2. Which section is drowning right now?
  3. How many guests leave without dessert?
  4. Why is turnover different every night?
  5. How much revenue is slow service quietly costing you?

### 5.3 The Solution — "One live model of your entire dining room"
- Eyebrow `THE SOLUTION`. H2: "One live model of your entire dining room."
- 3 cards (numbered badges, teal/amber/violet):
  1. **Computer vision reads the floor** — Table states, wait times, queues and resets, read continuously from the cameras you already have.
  2. **Integrations read the business** — POS, reservations, kitchen displays and payments, stitched into one operational timeline.
  3. **AI turns both into decisions** — Not another dashboard. Proactive, ranked actions delivered the moment they matter.

### 5.4 What you get — "What DiningOS gives you"
- Eyebrow `WHAT WE OFFER`. H2: "What DiningOS gives you."
- 4 feature cards, each with a small colored tag:
  - **Live Dining Room Intelligence** — Every table's status at a glance — seated, waiting, dessert, ready to pay, dirty — without walking the floor.
  - **Service Performance Intelligence** — Wait, greeting, food delivery, payment and reset times. Every shift becomes measurable.
  - **Revenue Intelligence** — Dessert conversions, upsells, walkaways, idle tables and lost seatings — the revenue POS can't see.
  - **Real-Time AI Alerts & Reports** — Proactive nudges during service, and an automatic operational summary when the shift ends.

### 5.5 Product showcase — the tablet + shift report
- A visual section showing (a) the **on-desk tablet** live dashboard (reuse/enlarge the Live Floor component framed inside a tablet bezel) and (b) an **automated shift report** card: a clean dark report with a big amber headline number (e.g. "+$1,240 recovered this shift" — mark as *illustrative*), plus a few KPI tiles (Avg wait, Table turns, Dessert attach, Walkaways).
- Short copy: "A tablet on the host stand shows the floor live. A report lands in your inbox when the shift ends. Nothing to learn."

### 5.6 The Differentiator — "We optimize the floor, not your people" (bold standout band)
- Full-width band with a subtle amber tint/border. Eyebrow `THE DIFFERENCE`.
- Big statement: **We optimize the floor — not your people.** ("not your people" in amber)
- Body: "DiningOS measures tables, zones and process — never individuals. No facial recognition. No employee scoring. No customer profiling. Staff cooperate with it because it makes their shift easier, not because it's watching them. That's why it actually gets adopted."
- Three chips: `No facial recognition` · `No staff surveillance` · `Privacy-first by design`.
- This band should feel like a mission statement — give it weight and space.

### 5.7 Proof / metrics band
- 4 large count-up stats (animate on scroll): **+18%** Faster table turns · **−30%** Fewer walkaways · **+22%** Higher dessert attach · **0** New hardware needed.
- Small italic note under them: "Illustrative — replace with pilot data." (Keep this disclaimer; do not present fake numbers as real.)

### 5.8 How it works — 3 steps
- Eyebrow `HOW IT WORKS`. Steps: 1) Connect your existing cameras & systems (no new hardware). 2) We map your floor and go live in days. 3) See the floor live + get a report every shift.

### 5.9 Final CTA
- Big line: **Every restaurant should know exactly what's happening, why, and what to do next.**
- Primary button: **"Bring DiningOS to your restaurant"** → opens/scrolls to the demo form.
- Demo form (name, restaurant, # locations, email, optional message) → POST to stubbed `/api/lead`, show a friendly success state. Validate inputs; accessible labels.

### 5.10 Footer
- `LogoLockup` + tagline: "The operating system for the dining room."
- Small line: "Works with your existing cameras, POS, reservations and kitchen systems."
- Nav links, a second "Book a demo" button, copyright. Keep it clean and dark.

---

## 6. INTERACTION & POLISH DETAILS

- Buttons: amber primary with a subtle glow on hover + slight scale; ghost/secondary with hairline border that brightens on hover. Focus-visible rings for keyboard users.
- Cards: `--panel` fill, hairline border, soft inner elevation; on hover lift 2–4px + border brightens toward the card's accent color.
- Section reveals: staggered fade/rise, ease-out, ~0.5s. Metrics count up once when in view.
- Reuse the **amber pulse** on: hero visual, the "attention" table cell, the primary CTA hover, and the logo mark.
- Add a faint animated gradient/glow drift behind the hero (very subtle, slow).
- Everything must degrade gracefully with `prefers-reduced-motion`.

---

## 7. RESPONSIVE, A11Y, PERFORMANCE

- Fully responsive: mobile-first. Hero stacks (text over the live-floor visual) on mobile; the live-floor grid becomes 2–3 columns. Nav collapses to a slide-over.
- **Accessibility:** WCAG AA. Check contrast of amber/teal text on charcoal (use them for large text / accents, not tiny body copy on dark). All interactive elements keyboard-navigable with visible focus. Proper landmarks, alt text, aria labels on the animated widget (mark decorative motion `aria-hidden`, expose a text equivalent). Respect reduced motion.
- **Performance:** lazy-load below-the-fold, no layout shift, transform/opacity-only animations, no heavy libraries beyond Framer Motion + lucide. Lighthouse ≥ 95 across the board is the target.
- SEO: sensible `<title>`, meta description, Open Graph tags, semantic headings (one H1).

---

## 8. DELIVERABLES

- A runnable Next.js project: `app/`, `components/` (Nav, Hero, LiveFloor, ProblemGrid, SolutionCards, FeatureCards, ProductShowcase, DifferenceBand, MetricsBand, HowItWorks, CTASection, Footer, LogoMark, LogoLockup, Button, etc.), `app/api/lead/route.ts` stub.
- Tailwind config with the brand tokens above. Global CSS with the color variables + grain/glow utilities.
- A short `README.md` (run/deploy instructions + a TODO list for wiring the form, swapping illustrative metrics for real pilot data, and dropping in real POS/logo assets).
- Clean, commented, type-safe code.

## 9. QUALITY BAR (do not stop until these are true)
- It looks like a premium, intentional brand — not a bootstrapped template.
- The Live Floor hero animation feels alive and is genuinely impressive.
- The color language (amber = attention, teal = calm) is used consistently.
- The privacy/differentiator band lands with real weight.
- Copy is in the calm, plain, confident DiningOS voice throughout.
- Responsive, accessible, fast. No console errors. No fake data presented as real.

Build the full site now. Make deliberate, tasteful design decisions where anything is unspecified — bias toward elegance and restraint.
