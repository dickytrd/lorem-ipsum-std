'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── CONTENT ─────────────────────────────────────────────────
const TEXT =
  'We craft immersive digital experiences at the intersection of design, motion, and technology. Every pixel intentional. Every frame considered.'

// Splits a string into individual word <span> elements
function splitWords(text) {
  return text.split(' ').map((word, i) => (
    <span key={i} className="statement__word">
      {word}
    </span>
  ))
}
// ─────────────────────────────────────────────────────────────

export default function OpeningStatement() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const words = sectionRef.current.querySelectorAll('.statement__word')

    // Scrub: as user scrolls, words reveal grey → white staggered
    gsap.to(words, {
      color: '#ffffff',
      stagger: {
        each: 0.06,
        from: 'start',
      },
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        end:   'bottom 100%',
        scrub: 1.2,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars?.trigger === sectionRef.current) st.kill()
      })
    }
  }, [])

  return (
    <section className="statement" ref={sectionRef} id="about">
      <div className="container">

        {/* Eyebrow label */}
        {/* <p className="statement__eyebrow">About the Studio</p> */}

        {/* Main split text */}
        <div className="statement__body">
          <p className="statement__text">
            {splitWords(TEXT)}
          </p>
        </div>

      </div>
    </section>
  )
}
