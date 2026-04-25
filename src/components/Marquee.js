'use client'

// ─── CONTENT ─────────────────────────────────────────────────
const CONTENT = {
  tools: [
    'Three.js', 'WebGL', 'GSAP', 'Rive', 'Spline',
    'Figma', 'After Effects', 'Lottie', 'Framer', 'React',
    'Three.js', 'WebGL', 'GSAP', 'Rive', 'Spline',
    'Figma', 'After Effects', 'Lottie', 'Framer', 'React',
  ],
  clients: [
    'Studio Alpha', 'Nova Labs', 'Signal Co.', 'Void Works',
    'Depth Agency', 'Form Studio', 'Arc Digital', 'Pulse Creative',
    'Studio Alpha', 'Nova Labs', 'Signal Co.', 'Void Works',
    'Depth Agency', 'Form Studio', 'Arc Digital', 'Pulse Creative',
  ],
}
// ─────────────────────────────────────────────────────────────

/**
 * Marquee
 * @param {Object} props
 * @param {'tools'|'clients'} props.variant - Which content set to display
 */
export default function Marquee({ variant = 'tools' }) {
  const items = CONTENT[variant] ?? CONTENT.tools

  // Duplicate the list so it loops seamlessly
  const doubled = [...items, ...items]

  return (
    <div className="marquee-section" aria-label={`${variant} marquee`} aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span className="marquee-item" key={i}>
            <span className="marquee-item__text">{item}</span>
            <span className="marquee-item__sep" />
          </span>
        ))}
      </div>
    </div>
  )
}
