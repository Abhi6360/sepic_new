# SEPIC TECHNOLOGIES — PCB Engineering Website

## Overview
Premium React + Vite website for SEPIC TECHNOLOGIES PRIVATE LIMITED, a Bengaluru-based engineering firm specializing in high-complexity PCB design, signal integrity, and fabrication services.

## Tech Stack
- **Framework**: React 18 + Vite 6
- **Routing**: wouter
- **Animations**: GSAP (with ScrollTrigger plugin)
- **Styling**: Custom CSS with CSS variables (no Tailwind)
- **Fonts**: Space Grotesk + JetBrains Mono (Google Fonts)
- **Server**: Vite dev server (port 5000)

## Project Structure
```
src/
  components/
    Navbar.jsx          # Glassmorphism sticky nav with mobile menu
    Footer.jsx          # Site-wide footer
    PCBCanvas.jsx       # Animated HTML Canvas PCB circuit background
    ServiceCard.jsx     # Service card with hover animations
    ReportCard.jsx      # Analysis report card with status/score
  pages/
    Home.jsx            # Full landing page (hero, services, analysis, process, capabilities, contact)
    Analysis.jsx        # Analysis service page
    PCBDesign.jsx       # PCB Design service page
    DFX.jsx             # Design For Assembly/Fabrication page
    LibrarySupport.jsx  # PCB Library Support page
    PageTemplate.jsx    # Shared template for service detail pages
  App.jsx               # Root router using wouter
  main.jsx              # React entry point
  index.css             # Global styles, CSS variables, component styles
index.html              # Vite HTML entry point (links Space Grotesk, JetBrains Mono fonts)
package.json            # npm dependencies
vite.config.js          # Vite config (host: 0.0.0.0, port: 5000, allowedHosts: true)
assets/
  sepic_logo.svg        # Company logo
```

## Design System
- **Background**: `#050608` (near black)
- **Primary surface**: `#0a0d14`
- **Cards/panels**: `#0f1520`
- **Electric blue**: `#236eda`
- **Bright blue**: `#5f9cff`
- **Cyan accent**: `#67d9ff`
- **Text primary**: `#f7f9ff`
- **Text muted**: `#8a9abc`

## Key Features
- Animated PCB circuit canvas background (HTML Canvas API, traces + glowing signal pulses)
- Glassmorphism navbar with scroll-triggered background
- GSAP ScrollTrigger animations on all sections
- Service cards with hover lift + glow + animated border
- Analysis report cards with status indicators (PASS/REVIEW/FIXED)
- Contact form submitting to formsubmit.co/sales@sepic.in
- Google Maps embed (dark-tinted)
- Fully responsive (mobile/tablet/desktop)

## Contact
- Email: sales@sepic.in
- Address: OJ Plex, No 1218, 2nd floor, 80 Feet Rd, 2nd Phase, BDA Lay Out, Chandra Layout, Bengaluru, Karnataka 560040, India

## Running
- Dev server: `npm run dev` → http://localhost:5000
- Production build: `npm run build` → outputs to `dist/`
