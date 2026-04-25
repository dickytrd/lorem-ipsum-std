'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ContactForm() {
  const sectionRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [form, setForm]     = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const left  = sectionRef.current.querySelector('.contact__left')
    const right = sectionRef.current.querySelector('.contact__form')

    gsap.fromTo(
      [left, right],
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => ScrollTrigger.getAll().forEach((st) => {
      if (st.vars?.trigger === sectionRef.current) st.kill()
    })
  }, [])

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // ── Form submit — replace with your preferred endpoint ──
  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    setStatus('sending')

    // Simulate async send — swap this with fetch('/api/contact', ...) or Resend/Formspree
    setTimeout(() => {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    }, 1200)
  }

  return (
    <section className="contact_wrap" id="contact" ref={sectionRef}>
      <div className="container"> 
      <div className="contact">
      {/* ── Left: heading + info ──────────────────── */}
      <div className="contact__left">
        <h2 className="contact__heading">
          Let&apos;s<br />Work.
        </h2>
        <p className="contact__sub">
          Have a project in mind? We would love to hear about it.
          Drop us a message and we will get back within 48 hours.
        </p>
        <a
          href="mailto:hello@loremipsum.studio"
          className="contact__email"
          aria-label="Send us an email"
        >
          ↗ hello@loremipsum.studio
        </a>
      </div>

      {/* ── Right: form ───────────────────────────── */}
      <form className="contact__form" onSubmit={handleSubmit} noValidate>

        <div className="form-field">
          <label className="form-label" htmlFor="name">Your Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-input"
            placeholder="First Last"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-input"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            className="form-textarea"
            placeholder="Tell us about your project…"
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-submit">
          <button
            type="submit"
            className="btn btn--solid"
            disabled={status === 'sending' || status === 'sent'}
            aria-label="Send message"
          >
            {status === 'idle'    && 'Send Message'}
            {status === 'sending' && 'Sending…'}
            {status === 'sent'    && 'Message Sent ✓'}
            {status === 'error'   && 'Error — Try Again'}
          </button>
        </div>

      </form>
      </div>
</div>
    </section>
  )
}
