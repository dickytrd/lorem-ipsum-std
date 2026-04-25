import { DM_Serif_Display, Inter } from 'next/font/google'
import './globals.css'

// ─── Fonts ───────────────────────────────────────────────────
const dmSerif = DM_Serif_Display({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
})

const inter = Inter({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// ─── Metadata ────────────────────────────────────────────────
export const metadata = {
  title: 'Lorem Ipsum Studio — WebGL Creative Studio',
  description: 'Experimental WebGL, Motion Design & Interactive Experiences. Singapore.',
}

// ─── Root Layout ─────────────────────────────────────────────
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSerif.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  )
}
