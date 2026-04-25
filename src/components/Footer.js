'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'

// Three.js skull — same placeholder, or swap for your WebGL
const SkullCanvas = dynamic(() => import('./Skull'), { ssr: false })

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  const footerRef  = useRef(null)
  const skullRef   = useRef(null)
  const wordmarkRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Skull scales in from below as footer enters
    gsap.fromTo(
      skullRef.current,
      { scale: 0.8, opacity: 0, y: 40 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )

    // Wordmark slides up
    gsap.fromTo(
      wordmarkRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'power4.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => ScrollTrigger.getAll().forEach((st) => st.kill())
  }, [])

  return (
    <footer className="footer" ref={footerRef} aria-label="Site footer">

      {/* ── Skull canvas wrapper
          ⚠️ REPLACE SkullCanvas with your actual WebGL skull ── */}
      <div className="footer__skull-wrap" ref={skullRef} aria-hidden="true">
        <SkullCanvas style={{ width: '100%', height: '100%' }} />
      </div>

      {/* ── Wordmark ───────────────────────────────────── */}
      <div style={{ overflow: 'hidden' }}>
        <p className="footer__wordmark" ref={wordmarkRef}>
          Lorem Ipsum
        </p>
      </div>

      {/* ── Bottom bar ────────────────────────────────── */}
      <div className="footer__bottom">
        <p className="footer__legal">
          © {CURRENT_YEAR} Lorem Ipsum Studio. All rights reserved.
        </p>

        <nav aria-label="Footer navigation">
          <ul className="footer__nav">
            <li><a href="#work">Work</a></li>
            <li><a href="#process">Process</a></li>
            <li><a href="#contact">Contact</a></li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                IG
              </a>
            </li>
          </ul>
        </nav>
      </div>

    </footer>
  )
}
