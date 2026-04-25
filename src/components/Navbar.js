'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 1.6 }
    )
  }, [])

  return (
    <nav className="navbar" ref={navRef} aria-label="Main navigation">
      {/* ─── Logo ─────────────────────────────── */}
      <a href="/" className="navbar__logo" aria-label="Lorem Ipsum Studio home">
        Lorem Ipsum Studio
      </a>

      {/* ─── Links ────────────────────────────── */}
      <ul className="navbar__links">
        <li><a href="#work">Work</a></li>
        <li><a href="#process">Process</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  )
}
