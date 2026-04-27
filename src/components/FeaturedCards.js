'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

// ─── CONTENT ─────────────────────────────────────────────────
const CARDS = [
  {
    tag: 'WebGL · Experimental',
    title: 'Skull Realm',
    desc:  'An immersive real-time 3D environment exploring depth, shadow, and human form through WebGL rendering.',
    year:  '2024',
    image: '/images/lorem.jpg',
  },
  {
    tag: 'Motion · Brand',
    title: 'Flow State',
    desc:  'Full brand motion system for a digital-native company — from logo animation to scroll-driven microsites.',
    year:  '2024',
    image: '/images/ipsum.jpg',
  },
  {
    tag: 'Interactive · UI',
    title: 'Parallax Suite',
    desc:  'A collection of interactive UI components built for performance-aware, scroll-driven storytelling.',
    year:  '2023',
    image: '/images/dolor.jpg',
  },
]
// ─────────────────────────────────────────────────────────────

export default function FeaturedCards() {
  const gridRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const cards = gridRef.current.querySelectorAll('.featured__card')

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.16,
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    return () => ScrollTrigger.getAll().forEach((st) => {
      if (st.vars?.trigger === gridRef.current) st.kill()
    })
  }, [])

  return (
    <section className="featured" id="featured">
      <div className="container">

        {/* Section header */}
        <div className="section-header">
          <span className="section-label">Featured Work</span>
          <a href="#work" className="section-link">
            View All <span aria-hidden>→</span>
          </a>
        </div>

        {/* Cards grid */}
        <div className="featured__grid" ref={gridRef}>
          {CARDS.map((card, i) => (
            <article className="featured__card" key={i}>

              {/* Placeholder image */}
              <div className="featured__card-img">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <span className="featured__card-tag">{card.tag}</span>
              <h3 className="featured__card-title">{card.title}</h3>
              <p className="featured__card-desc">{card.desc}</p>

              <a href="#" className="featured__card-link" aria-label={`View ${card.title}`}>
                View Project <span aria-hidden>→</span>
              </a>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
