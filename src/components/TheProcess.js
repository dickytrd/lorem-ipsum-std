'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

// ─── CONTENT ─────────────────────────────────────────────────
const STEPS = [
  {
    num:   '01',
    title: 'Discover',
    text:  'We start every project with deep listening. Understanding your goals, your audience, and the invisible tension between them. Research, workshops, and honest conversation.',
    image: '/images/lorem.jpg',
  },
  {
    num:   '02',
    title: 'Design',
    text:  'Swiss-informed visual systems. Motion with purpose. Every layout, typographic choice, and interaction is designed to communicate — not to decorate.',
    image: '/images/ipsum.jpg',
  },
  {
    num:   '03',
    title: 'Build',
    text:  'Production-grade code, performance-first. Three.js, GSAP, Rive — we build for the browser as a first-class creative medium. Fast, smooth, and intentional.',
    image: '/images/dolor.jpg',
  },
]
// ─────────────────────────────────────────────────────────────

export default function TheProcess() {
  const sectionRef = useRef(null)
  const lineFillRef = useRef(null)
  const floatingImgRef = useRef(null)
  const [hoveredStep, setHoveredStep] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
  gsap.registerPlugin(ScrollTrigger)

  const ctx = gsap.context(() => {
    const steps = sectionRef.current.querySelectorAll('.process__step')

    // ── Vertical line
gsap.to(lineFillRef.current, {
  scaleY: 1,
  ease: 'none',
  scrollTrigger: {
    trigger: sectionRef.current, // 🔥 ganti ini
    start: 'top 50%',
    end: 'bottom 50%',
    scrub: 1,
  },
})

    // ── Steps reveal
    steps.forEach((step, i) => {
      gsap.to(step, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        delay: i * 0.08,
      })
    })
  }, sectionRef)

  return () => ctx.revert()
}, [])

const handleStepHover = (stepNum, e) => {
  setHoveredStep(stepNum)

  if (floatingImgRef.current) {
    const size = 400
    const x = e.clientX - size / 400
    const y = e.clientY - size / 2

    // 👉 langsung set posisi TANPA animasi dulu
    gsap.set(floatingImgRef.current, { x, y })

    // 👉 baru fade in
    gsap.to(floatingImgRef.current, {
      opacity: 1,
      scale:1,
      duration: 0.4,
      ease: 'power2.out',
    })
  }
}

  const handleStepLeave = () => {
    setHoveredStep(null)
    if (floatingImgRef.current) {
      gsap.to(floatingImgRef.current, {
        opacity: 0,
        scale:0.8,
        duration: 0.4,
        ease: 'power3.inOut',
      })
    }
  }

  const handleMouseMove = (e) => {
    if (!hoveredStep) return
    
    const x = e.clientX - 0 
    const y = e.clientY - 200
    
    setMousePos({ x, y })
    
    if (floatingImgRef.current) {
      gsap.to(floatingImgRef.current, {
        x,
        y,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
  }

  return (
    <section className="process" id="process" ref={sectionRef}>
      <div className="container">

        {/* ── Floating Image on Hover ───────────────────── */}
        <div
          ref={floatingImgRef}
          className="process__floating-image"
          style={{
            position: 'fixed',
            width: '400px',
            height: '400px',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: 1,
            left: 0,
            top: 0,
            mixBlendMode: 'lighten',
          }}
        >
          {hoveredStep && (
            <Image
              src={STEPS[hoveredStep - 1].image}
              alt="Process step"
              fill
              style={{ objectFit: 'cover', borderRadius: '8px' }}
            />
          )}
        </div>

        {/* ── Intro ──────────────────────────────────────── */}
        <div className="process__intro">
          <h2 className="process__heading">Trust<br />the Process.</h2>
          <p className="process__intro-desc">
            Great work doesn&apos;t happen by accident. It emerges from a disciplined process —
            one that balances creative ambition with technical rigour.
          </p>
        </div>

        {/* ── Body: line col + steps ─────────────────────── */}
        <div className="process__body">

          {/* Vertical timeline line */}
          <div className="process__line-wrap">
            <div className="process__line-track">
              <div className="process__line-fill" ref={lineFillRef} />
            </div>
          </div>

          {/* Steps */}
          <div className="process__steps" onMouseMove={handleMouseMove}>
            {STEPS.map((step) => (
              <article
                className="process__step"
                key={step.num}
                onMouseEnter={(e) => handleStepHover(parseInt(step.num), e)}
                onMouseLeave={handleStepLeave}
                style={{ cursor: 'pointer' }}
              >
                <p className="process__step-num">{step.num}</p>
                <h3 className="process__step-title">{step.title}</h3>
                <p className="process__step-text">{step.text}</p>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
