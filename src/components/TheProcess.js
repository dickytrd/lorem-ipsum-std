'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── CONTENT ─────────────────────────────────────────────────
const STEPS = [
  {
    num:   '01',
    title: 'Discover',
    text:  'We start every project with deep listening. Understanding your goals, your audience, and the invisible tension between them. Research, workshops, and honest conversation.',
  },
  {
    num:   '02',
    title: 'Design',
    text:  'Swiss-informed visual systems. Motion with purpose. Every layout, typographic choice, and interaction is designed to communicate — not to decorate.',
  },
  {
    num:   '03',
    title: 'Build',
    text:  'Production-grade code, performance-first. Three.js, GSAP, Rive — we build for the browser as a first-class creative medium. Fast, smooth, and intentional.',
  },
]
// ─────────────────────────────────────────────────────────────

export default function TheProcess() {
  const sectionRef = useRef(null)
  const lineFillRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const steps = sectionRef.current.querySelectorAll('.process__step')

    // ── Vertical line draws from top to bottom ──────────────
    gsap.to(lineFillRef.current, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current.querySelector('.process__body'),
        start: 'top 70%',
        end:   'bottom 60%',
        scrub: 1,
      },
    })

    // ── Steps reveal one by one ─────────────────────────────
    steps.forEach((step, i) => {
      gsap.to(step, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
        delay: i * 0.08,
      })
    })

    return () => ScrollTrigger.getAll().forEach((st) => st.kill())
  }, [])

  return (
    <section className="process" id="process" ref={sectionRef}>
      <div className="container">

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
          <div className="process__steps">
            {STEPS.map((step) => (
              <article className="process__step" key={step.num}>
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
