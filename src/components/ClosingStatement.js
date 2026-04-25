'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ─── CONTENT ─────────────────────────────────────────────────
const TEXT =
  'The best digital experiences feel inevitable. Like they could not have been made any other way. That is what we are here to build.'
// ─────────────────────────────────────────────────────────────

function splitWords(text) {
  return text.split(' ').map((word, i) => (
    <span key={i} className="statement__word">
      {word}
    </span>
  ))
}

export default function ClosingStatement() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const words = sectionRef.current.querySelectorAll('.statement__word')

    gsap.to(words, {
      color: '#ffffff',
      stagger: { each: 0.06, from: 'start' },
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end:   'bottom 35%',
        scrub: 1.2,
      },
    })

    return () => ScrollTrigger.getAll().forEach((st) => {
      if (st.vars?.trigger === sectionRef.current) st.kill()
    })
  }, [])

  return (
    <section className="statement" ref={sectionRef}>
      <div className="container">
        {/* <p className="statement__eyebrow">Our Belief</p> */}
        <div className="statement__body">
          <p className="statement__text">
            {splitWords(TEXT)}
          </p>
        </div>
      </div>
    </section>
  )
}
