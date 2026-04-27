'use client'
import { useState } from 'react'
import Loader           from '@/components/Loader'
import Navbar           from '@/components/Navbar'
import Hero             from '@/components/Hero'
import OpeningStatement from '@/components/OpeningStatement'
import FeaturedCards    from '@/components/FeaturedCards'
import Marquee          from '@/components/Marquee'
import TheProcess       from '@/components/TheProcess'
import OurWork          from '@/components/OurWork'
import ClosingStatement from '@/components/ClosingStatement'
import ContactForm      from '@/components/ContactForm'
import Footer           from '@/components/Footer'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {/* Loader sits on top — unmounts after curtain wipe completes */}
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      <main>
        <Navbar />
        <Hero />
        <OpeningStatement />
        <FeaturedCards />
        <Marquee variant="tools" />
        <TheProcess />
        <OurWork />
        <Marquee variant="clients" />
        <ClosingStatement />
        <ContactForm />
        <Footer />
      </main>
    </>
  )
}
