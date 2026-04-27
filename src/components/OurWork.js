'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

// ─── CONTENT ─────────────────────────────────────────────────
const FEATURED_PROJECT = {
  title: 'Skull Realm — WebGL Experience',
  tag:   'WebGL · Experimental · 2024',
  year:  '2024',
}

const WORK_ITEMS = [
  { title: 'Flow State',        tag: 'Motion · Brand',         year: '2024' },
  { title: 'Parallax Suite',    tag: 'Interactive · UI',       year: '2024' },
  { title: 'Void Architecture', tag: 'WebGL · Real Estate',    year: '2023' },
  { title: 'Signal Identity',   tag: 'Brand · Motion System',  year: '2023' },
]
// ─────────────────────────────────────────────────────────────

export default function OurWork() {
  const sectionRef    = useRef(null)
  const featImgRef    = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // ── Featured parallax: image moves slower than scroll ───
    gsap.to(featImgRef.current, {
      yPercent: 14,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current.querySelector('.work__featured-media'),
        start: 'top bottom',
        end:   'bottom top',
        scrub: true,
      },
    })

    // ── Grid card images: subtle upward parallax ────────────
    const cardImgs = sectionRef.current.querySelectorAll('.work__card-media .img-placeholder')
    cardImgs.forEach((img) => {
      gsap.to(img, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('.work__card'),
          start: 'top bottom',
          end:   'bottom top',
          scrub: true,
        },
      })
    })

    return () => ScrollTrigger.getAll().forEach((st) => st.kill())
  }, [])

  return (
    <section className="work" id="work" ref={sectionRef}>
      <div className="container">

        {/* ── Section header ────────────────────────────── */}
        <div className="section-header">
          <span className="section-label">Our Work</span>
          <a href="#" className="section-link">Full Archive <span aria-hidden>→</span></a>
        </div>

        {/* ── Featured — full width ─────────────────────── */}
        <div className="work__featured">
          <div className="work__featured-media">
            <Image
              src="/images/lorem_ipsum.jpg"
              alt={FEATURED_PROJECT.title}
              fill
              style={{ objectFit: 'cover', overflow: 'visible' }}
              ref={featImgRef}
            />
          </div>
          <div className="work__featured-info">
            <h3 className="work__title" style={{ fontSize: 'clamp(20px, 2.5vw, 36px)' }}>
              {FEATURED_PROJECT.title}
            </h3>
            <span className="work__tag">{FEATURED_PROJECT.tag}</span>
          </div>
        </div>

        {/* ── Grid — 2×2 ───────────────────────────────── */}
        <div className="work__grid">
          {WORK_ITEMS.map((item, i) => {
            const images = ['/images/lorem.jpg', '/images/ipsum.jpg', '/images/dolor.jpg']
            const imgSrc = images[i % images.length]
            return (
            <article className="work__card" key={i}>
              <div className="work__card-media">
                <Image
                  src={imgSrc}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                {/* Hover overlay */}
                <div className="work__card-overlay" aria-hidden="true">
                  <h4 className="work__card-overlay-title">{item.title}</h4>
                  <span className="work__card-overlay-tag">{item.tag}</span>
                </div>
              </div>
              <div className="work__card-info">
                <span className="work__title" style={{ fontSize: 'clamp(14px, 1.6vw, 20px)' }}>
                  {item.title}
                </span>
                <span className="work__tag">{item.year}</span>
              </div>
            </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}
