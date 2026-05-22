---
name: animated-website
user-invocable: true
description: "Build animated websites using the full AI design-to-dev pipeline. Combines design system generation, UI screen creation, pre-built components, and image generation. Triggers: animated website, build website, create website, landing page, web design, animated landing page, website builder"
allowed-tools: Bash(python3 tools/generate_image.py *)
---

# Animated Website Builder

Build professional animated websites using the full AI-powered design-to-dev pipeline.

---

# Pipeline Overview

## Step 1 — Design System (ui-ux-pro-max skill)

Generate a complete design system tailored to the project.

Includes:
- Color palette
- Typography
- Spacing tokens
- Component styles (buttons, cards, modals)
- Animation guidelines

How to use:

Ask Claude:

Generate a design system for [project type]

Example:

Generate a design system for a modern SaaS AI dashboard.

The **ui-ux-pro-max skill activates automatically**.

---

## Step 2 — UI Screens (Google Stitch MCP)

Generate full UI screens from text prompts using the design system as context.

Capabilities:
- Hero sections
- About pages
- Feature grids
- Full HTML/CSS output
- Screenshot previews

Tools:

generate_screen_from_text
Create a screen from a prompt

fetch_screen_code
Get the HTML/CSS code

fetch_screen_image
Preview the generated UI

extract_design_context
Extract design DNA for consistency

---

## Step 3 — Components (21st.dev Magic MCP)

Pull in pre-built animated components.

Examples:

- Hero sections
- Navbars
- Pricing tables
- Testimonial carousels
- Feature grids
- Animated modals
- Buttons
- Cards

Install components:

```bash
npx shadcn@latest add "https://21st.dev/r/component-name"
```

---

## Step 4 — Image Assets (AI Image Generation)

Generate images, illustrations, and visual assets.

Hero background

```bash
python3 tools/generate_image.py "abstract gradient background with floating geometric shapes, dark theme" --aspect 16:9 -o media/hero-bg.png
```

Product mockup

```bash
python3 tools/generate_image.py "modern laptop showing dashboard UI, isometric view" --aspect 16:9 -o media/product-mockup.png
```

Icon illustration

```bash
python3 tools/generate_image.py "minimalist line art rocket launching, single color" --aspect 1:1 -o media/icon-rocket.png
```

---

# Animation Toolkit

## CSS Animations

```css
/* Fade in on scroll */
.animate-fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.animate-fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Float effect */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Slide in from left */
@keyframes slide-in-left {
  from { opacity: 0; transform: translateX(-60px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-slide-left {
  animation: slide-in-left 0.8s ease forwards;
}

/* Slide in from right */
@keyframes slide-in-right {
  from { opacity: 0; transform: translateX(60px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-slide-right {
  animation: slide-in-right 0.8s ease forwards;
}

/* Scale up */
@keyframes scale-up {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

.animate-scale-up {
  animation: scale-up 0.6s ease forwards;
}

/* Gradient shift background */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 6s ease infinite;
}

/* Stagger children */
.stagger > *:nth-child(1) { animation-delay: 0.1s; }
.stagger > *:nth-child(2) { animation-delay: 0.2s; }
.stagger > *:nth-child(3) { animation-delay: 0.3s; }
.stagger > *:nth-child(4) { animation-delay: 0.4s; }
.stagger > *:nth-child(5) { animation-delay: 0.5s; }
```

---

## Scroll-Triggered Animations (Vanilla JS)

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale-up'
).forEach(el => observer.observe(el));
```

---

# Popular Animation Libraries

Framer Motion (React)

```
npm install framer-motion
```

GSAP

```
npm install gsap
```

AOS (Animate On Scroll)

```
npm install aos
```

Lottie

```
npm install lottie-web
```

---

# Common Animated Website Sections

Hero
Fade-in text + floating elements + gradient background

Features
Staggered card fade-ins on scroll

Testimonials
Slide-in carousel

Pricing
Scale-up cards on scroll

CTA
Pulsing button + parallax background

Footer
Subtle fade-in links

Navbar
Blur backdrop + shrink on scroll

Stats
Count-up animation on scroll

---

# Tech Stack Options

## Static HTML (Simplest)

- HTML
- CSS
- Vanilla JavaScript

No build step required.

---

## React + Tailwind (Recommended)

```bash
npx create-next-app@latest my-site --typescript --tailwind
cd my-site
npm install framer-motion
```

---

## Astro (Fast Static Sites)

```bash
npm create astro@latest my-site
cd my-site
npx astro add tailwind
npx astro add react
```

---

# Quick Start Example

1. Generate a design system for a modern SaaS product with a dark theme.

2. Use Stitch to create a hero section with an animated gradient background.

3. Search 21st.dev for an animated pricing table component.

4. Generate a hero background image:
   abstract dark gradient with glowing particles.

5. Combine everything into a single page with scroll-triggered animations.
