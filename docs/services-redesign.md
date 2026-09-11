# /services redesign — audit, strategy, design system

## 1. Audit of the old page (2026-09-11)

Stack: Create React App (React 18), react-router v6, plain CSS per page on top of
global tokens in `src/styles/globals.css`, framer-motion, react-icons, EmailJS for
forms, GA4 via react-ga4. Theme = `light`/`dark` class on `<body>`, following the
visitor's system preference, with a toggle in the navbar.

Old `/services` (`src/pages/Services.js`):

| Finding | Decision |
|---|---|
| Arabic, RTL, "follow us on Instagram to learn about AI" framing, 5 identical icon cards | **Rebuild** — content aimed at an audience, not at buyers |
| Hard-coded dark background ignoring the theme; in light mode most headings become near-invisible (dark text on dark) | **Rebuild** on theme tokens, designed for both themes |
| Callback form: placeholders instead of labels, `alert()` on error, no validation states | **Rebuild** as an accessible lead form |
| Page not linked from navbar or footer | **Fix** — add "Services" to both |
| Every route shares one `<title>`/description; `og:url` typo (`mohamadddev.com`) | **Fix** — per-page SEO, prerendered head for crawlers |
| EmailJS contact infrastructure, GA4 | **Keep and reuse** — no new backend or analytics provider |
| Brand: navy/blue palette, Space Grotesk + Inter, rounded pills, "M" mark | **Keep**, but tone down gradients/glow on this page |

## 2. Positioning and conversion strategy

- Core message: *Tell me the business problem — I'll design and build the technology behind the solution.*
- Voice: first person ("I"). Mohamad Dev is one engineer, not an agency; direct access is presented as a strength.
- Primary conversion: the lead form at `#start`. Every CTA leads there; service CTAs
  **pre-select** the matching need in the form, so the visitor never re-states what they clicked.
- Two paths: visitors who know what they need (Solutions, Explorer) and visitors who only
  know the problem (Problem wall → linked solution; "Not sure yet" option in the form).
- Trust is built through real projects, a transparent process, honest FAQ answers.
  No invented clients, testimonials, logos or statistics.

## 3. Page structure

1. Hero — H1, promise, 2 CTAs, animated "system map" of connected business technology
2. Problems — "Your business shouldn't have to work around its software." Each problem links to the solution
3. Solutions — 5 categories, alternating layouts, each with its own illustrative visual
4. Automation demo — before/after workflow for 3 scenarios
5. Outcomes — 6 outcomes, no fake metrics
6. Process — 6 steps + risk reducers
7. Selected work — real repo projects as problem → solution → capability
8. "What can I build?" explorer — 12 plain-language ideas, filterable
9. Why Mohamad Dev — 5 concrete differentiators
10. Technology — secondary credibility strip
11. FAQ — 9 sales objections (native `<details>`)
12. Final CTA + lead form

Mobile adds a small sticky CTA once the hero is out of view (hidden while the form is visible).

## 4. Design system (scoped to `.svc`, built on the global tokens)

- **Container** `--maxw` (1160px), gutter `clamp(20px, 5vw, 40px)`
- **Section rhythm** `clamp(80px, 11vw, 144px)` block padding; hairline separators instead of boxes where possible
- **Type** Space Grotesk display / Inter body / system monospace for micro-labels
  - H1 `clamp(2.5rem, 6vw, 4.6rem)`, H2 `clamp(2rem, 4vw, 3.1rem)`, H3 `clamp(1.35rem, 2.2vw, 1.7rem)`
  - body 1.0625rem / 1.65; micro-labels 0.75rem mono, uppercase, +0.08em
- **Radius** 18px cards, 12px small, 999px pills (brand)
- **Colour** theme tokens only; one accent. Primary button uses a solid blue that passes AA with white text in both themes. Gradient reserved for the brand mark.
- **Breakpoints** 640 / 900 / 1200
- **Motion** reveal 600ms `cubic-bezier(.2,.7,.2,1)`, 16px rise; hover 200ms; data "pulses" only in diagrams. `prefers-reduced-motion`: no transforms, no pulses, content shown immediately.
- **Icons** react-icons Feather set (`react-icons/fi`), already a dependency

## 5. Languages (English, Arabic, Hebrew) — added 2026-09-11

- Routes: `/services`, `/ar/services`, `/he/services`. Only the services page is translated;
  on its Arabic/Hebrew versions the navbar and footer are localized too (`src/i18n/locales.js`).
- Copy: `src/pages/services/locales/{en,ar,he}.json`, identical shape (a unit test enforces
  this). One component tree reads the active file through `useServicesText()`. Each language is
  its own lazy chunk; the page code is shared.
- Arabic and Hebrew are written natively, not translated word for word. Hebrew uses plural
  "you" (אתם) and ungendered first-person forms for the site owner's voice.
- RTL: `<html lang/dir>` is set while the page is mounted and restored on leave. Layout uses
  logical properties; the few physical-only values (transforms, transform-origin) read
  `--svc-flip` / `--svc-start`. Arrows mirror, flows and progress lines run in reading order,
  the navbar drawer opens from the left, email/phone inputs stay LTR, numeric runs are isolated.
- Type: IBM Plex Sans Arabic / Hebrew (both include Latin) on those routes; no letter-spacing,
  uppercase or monospace labels in RTL scripts; taller line-height for Arabic.
- SEO: `scripts/prerender-seo.js` writes a static head per language (lang/dir, title,
  description, canonical, hreflang incl. x-default, og:locale, localized JSON-LD, font, chunk
  preloads). `public/sitemap.xml` lists all three with alternates. Localized OG images.
- Leads: the form is localized, but the email Mohamad receives is always English, with the
  visitor's language noted.
