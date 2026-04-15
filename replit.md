# SEPIC TECHNOLOGIES — PCB Engineering Website

## Overview
Premium React + Vite SPA for SEPIC TECHNOLOGIES PRIVATE LIMITED, a Bengaluru-based engineering firm specializing in high-complexity PCB design, signal integrity, and fabrication services.

## Tech Stack
- **Framework**: React 18 + Vite 6
- **Routing**: wouter (not React Router)
- **Animations**: Framer Motion (scroll reveals, counters, stagger, parallax, scroll progress)
- **Styling**: Custom CSS with CSS variables (no Tailwind)
- **Fonts**: Space Grotesk + JetBrains Mono (Google Fonts, imported in index.css)
- **Server**: Vite dev server (port 5000, host: 0.0.0.0)

## Project Structure
```
src/
  components/
    Navbar.jsx          # Sticky nav with Services dropdown, smooth-scroll to sections, mobile menu
    Footer.jsx          # Site-wide footer with links and copyright 2026
    PCBCanvas.jsx       # Animated HTML Canvas PCB background (traces + signal pulses, mouse parallax)
    ServiceCard.jsx     # Service card with image, hover animations, animated border
    ReportCard.jsx      # Analysis report card with PASS/REVIEW/FIXED status + progress bar
  pages/
    Home.jsx            # Full landing page: hero, stats, services, analysis, process, tools, CTA, contact
    Analysis.jsx        # Analysis service page (uses PageTemplate)
    PCBDesign.jsx       # PCB Design service page (uses PageTemplate)
    DFX.jsx             # DFX page (uses PageTemplate)
    LibrarySupport.jsx  # Library Support page (uses PageTemplate)
    PageTemplate.jsx    # Shared template: hero image, scan line, Framer Motion entrance, footer CTA
  App.jsx               # Root router (wouter Switch/Route) + ScrollProgressBar
  main.jsx              # React entry point
  index.css             # Global styles, CSS variables, component styles
index.html              # Vite HTML entry (Space Grotesk, JetBrains Mono font imports)
package.json            # Dependencies
vite.config.js          # Vite config (dedupe react/framer-motion, host 0.0.0.0, port 5000)
public/
  assets/
    sepic_logo.svg      # Company logo
```

## Design System
- **Background**: `#050608` (near black) — `var(--bg-dark)`
- **Surface primary**: `#0a0d14` — `var(--surface-primary)`
- **Cards/panels**: `#0f1520` — `var(--surface-card)`
- **Electric blue**: `#236eda` — `var(--electric-blue)`
- **Bright blue**: `#5f9cff` — `var(--bright-blue)`
- **Cyan accent**: `#67d9ff` — `var(--cyan)`
- **Text primary**: `#f7f9ff` — `var(--text-primary)`
- **Text muted**: `#8a9abc` — `var(--text-muted)`

## Home Page Sections
1. **Hero** — PCBCanvas background, mouse-parallax, staggered Framer Motion entrance, gradient headline, scroll fade-out
2. **Why Choose Us** — AnimatedCounter stats (26+ layers, 4 services, 8+ interfaces, 10+ years), trust point cards
3. **Services** — 4 service cards with images (Library Support, PCB Design, Analysis, DFX)
4. **Diagnostics** — Split layout: ReportCard analysis results + scan-line image overlay
5. **Process** — 4-step methodology grid with animated step boxes
6. **Toolchain** — Tool proficiency bars (Allegro, Altium, HyperLynx, PADS) + capability grid
7. **Capabilities Table** — Technical spec table (layers, interfaces, tools, deliverables)
8. **CTA Strip** — Glowing call-to-action with scan-line animation
9. **Contact** — Contact info + Google Maps + formsubmit.co form

## Key Technical Notes
- Framer Motion `useScroll`/`useTransform` for hero parallax fade
- `ScrollProgressBar` component in App.jsx using `useSpring`
- `AnimatedCounter` uses Framer Motion `animate()` imperative API
- Contact form posts to `https://formsubmit.co/sales@sepic.in`
- Google Maps embed with CSS `invert(90%) hue-rotate(180deg) grayscale(80%)` dark tint
- Logo filter: `brightness(0) invert(1) drop-shadow(0 0 8px rgba(103,217,255,0.5))`
- `vite.config.js` has `resolve.dedupe: ['react', 'react-dom', 'framer-motion']` to prevent hook conflicts

## Contact
- Email: sales@sepic.in
- Address: OJ Plex, No 1218, 2nd floor, 80 Feet Rd, 2nd Phase, BDA Lay Out, Chandra Layout, Bengaluru, Karnataka 560040, India

## Running
- Dev server: `npm run dev` → http://localhost:5000
- Production build: `npm run build` → outputs to `dist/` (static deployment)
