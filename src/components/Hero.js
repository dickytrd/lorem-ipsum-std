'use client'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import dynamic from 'next/dynamic'

// Three.js must be dynamically imported (no SSR)
const SkullCanvas = dynamic(() => import('./Skull.js'), { ssr: false })

export default function Hero() {
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })

    tl
      // Line 1: LOREM IPSUM
      .fromTo(
        '.hero__line-1',
        { y: '105%' },
        { y: '0%', duration: 1.3, ease: 'power4.out' }
      )
      // Skull overlay
      .fromTo(
        '.hero__skull-overlay',
        { scale: 0.6, opacity: 0, rotateZ: -8 },
        { scale: 1, opacity: 1, rotateZ: 0, duration: 1.1, ease: 'power3.out' },
        '-=0.85'
      )
      // Line 2: D + [skull] + OR
      .fromTo(
        '.hero__line-2',
        { y: '105%' },
        { y: '0%', duration: 1.3, ease: 'power4.out' },
        '-=1.0'
      )
      // Meta bar
      .fromTo(
        '.hero__meta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
        '-=0.4'
      )
  }, [])

  return (
    <section className="hero" id="home">
      {/* Skull overlay */}
      <div className="hero__skull-overlay">
        <SkullCanvas />
      </div>

      <div className="container">
        <div className="hero__title-block">

          {/* ── Line 1: LOREM IPSUM ─────────────────── */}
          <div className="hero__line-overflow" style={{ overflow: 'hidden' }}>
            <span className="hero__title hero__line-1">Lorem Ipsum</span>
          </div>

          {/* ── Line 2: D OR ────────────────────────── */}
          <div className="hero__skull-row">
            <div style={{ overflow: 'hidden' }}>
              <span className="hero__title hero__line-2">STUDIO</span>
            </div>

            <div style={{ overflow: 'hidden' }}>
              <span className="hero__title hero__line-2">INC</span>
            </div>
          </div>

        </div>

        {/* ── Meta bar ──────────────────────────────── */}
        <div className="hero__meta">
          <p className="hero__subtitle">
            WebGL · Motion Design · Interactive Experiences
            <br />IDN
          </p>
          <div className="hero__cta">
            <a href="#work" className="btn btn--solid">
              View Work
            </a>
            <a href="#contact" className="btn btn--outline">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
