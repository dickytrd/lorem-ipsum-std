# Lorem Ipsum Studio — WebGL Landing Page

Experimental WebGL landing page built with Next.js, GSAP + ScrollTrigger, and Three.js.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **Next.js 14** | Framework (App Router) |
| **GSAP + ScrollTrigger** | All scroll-driven animations |
| **Three.js** | WebGL skull wireframe |
| **DM Serif Display** | Primary serif typeface |
| **CSS Custom Properties** | Design tokens & Swiss spacing system |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.js          # Root layout, font imports, metadata
│   ├── page.js            # All sections assembled here
│   └── globals.css        # Design tokens, reset, all component styles
└── components/
    ├── Navbar.js           # Fixed top nav
    ├── SkullCanvas.js      # ⚠️ THREE.JS PLACEHOLDER — replace with your WebGL
    ├── Hero.js             # Full-viewport hero with inline skull
    ├── OpeningStatement.js # Split-text scroll reveal (grey → white)
    ├── FeaturedCards.js    # 3-card stagger reveal
    ├── Marquee.js          # Reusable infinite scroll marquee
    ├── TheProcess.js       # Vertical line + numbered steps
    ├── OurWork.js          # Parallax images + hover overlay
    ├── ClosingStatement.js # Same animation as opening
    ├── ContactForm.js      # CTA + simple form
    └── Footer.js           # Wordmark + skull wrapper
```

---

## WebGL Skull — How to Replace

The `SkullCanvas.js` is a Three.js wireframe placeholder.
To plug in your actual WebGL skull:

1. Open `src/components/SkullCanvas.js`
2. Replace the entire Three.js scene with your WebGL implementation
3. The component receives `className` and `style` props for sizing

```jsx
// Example: replace SkullCanvas.js with your Spline/custom WebGL
export default function SkullCanvas({ className = '' }) {
  return (
    <div className={className}>
      {/* Your WebGL here */}
    </div>
  )
}
```

---

## Design System

### Spacing Scale (4-ratio)
```
--s1: 4px    --s2: 8px    --s3: 16px   --s4: 32px
--s5: 48px   --s6: 64px   --s7: 96px   --s8: 112px   --s9: 128px
```

### Colors (Monochrome)
```
--black: #000000    --white: #FFFFFF
--grey-100 → --grey-900 (linear scale)
```

### Typography
- **Headings**: DM Serif Display, 400 weight
- **Body**: Inter, 300 weight
- **Labels**: Inter, 400 weight, letter-spacing 0.12em, uppercase

---

## Animations Summary

| Section | Animation | Library |
|---------|-----------|---------|
| Hero | Title lines slide up, skull fades in | GSAP timeline |
| Opening Statement | Words grey→white on scroll | GSAP + ScrollTrigger scrub |
| Featured Cards | Stagger fade+translate from bottom | GSAP + ScrollTrigger |
| Marquee | Infinite horizontal scroll | CSS keyframes |
| The Process | Vertical line draws down + steps reveal | GSAP + ScrollTrigger |
| Our Work | Parallax on images + hover overlay | GSAP + ScrollTrigger |
| Closing Statement | Words grey→white on scroll | GSAP + ScrollTrigger scrub |

---

## Customization

- **Brand name**: Search `Lorem Ipsum Studio` across all files
- **Content**: Each component has clearly marked `// ─── CONTENT ───` sections
- **Colors**: Edit CSS variables in `globals.css :root`
- **Spacing**: Edit `--s1` through `--s9` in `globals.css`

---

## Build for Production

```bash
npm run build
npm start
```

Recommended hosting: **Vercel** (one-click deploy from GitHub)

```bash
npm install -g vercel
vercel
```
# lorem-ipsum-std
