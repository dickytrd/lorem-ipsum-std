'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
    const loaderRef  = useRef(null)
    const fillRef    = useRef(null)   // white text — clip-path animated
    const counterRef = useRef(null)   // small % number
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // ── Listen to THREE.LoadingManager events ──────────────
        const onProgress = (e) => {
            const p = e.detail.progress
            setProgress(p)

            // Animate white text fill via clip-path
            if (fillRef.current) {
                gsap.to(fillRef.current, {
                    clipPath: `inset(0 ${100 - p}% 0 0)`,
                    duration: 0.4,
                    ease: 'power2.out',
                })
            }
        }

        const onLoaded = () => {
            // Fill to 100% first, then wipe up
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onComplete) onComplete()
                }
            })

            tl
                // Ensure fill reaches 100%
                .to(fillRef.current, {
                    clipPath: 'inset(0 0% 0 0)',
                    duration: 0.3,
                    ease: 'power2.out',
                })
                // Brief pause at 100%
                .to({}, { duration: 0.4 })
                // Fire site:ready at START of curtain wipe
                // so hero elements animate in as loader lifts
                .call(() => {
                    window.dispatchEvent(new CustomEvent('site:ready'))
                })
                // Curtain wipe — loader slides up
                .to(loaderRef.current, {
                    yPercent: -100,
                    duration: 1.0,
                    ease: 'power4.inOut',
                })
        }

        window.addEventListener('skull:progress', onProgress)
        window.addEventListener('skull:loaded',   onLoaded)

        // ── Fallback: if no assets to load (e.g. dev with cache)
        // give it 300ms, then auto-complete
        const fallback = setTimeout(() => {
            if (progress === 0) {
                window.dispatchEvent(new CustomEvent('skull:loaded'))
            }
        }, 3000)

        return () => {
            window.removeEventListener('skull:progress', onProgress)
            window.removeEventListener('skull:loaded',   onLoaded)
            clearTimeout(fallback)
        }
    }, [onComplete, progress])

    return (
        <div className="loader" ref={loaderRef} aria-label="Loading" role="status">

            {/* ── Text fill wrapper ─────────────────────────── */}
            <div className="loader__text-wrap" aria-hidden="true">

                {/* Grey base — always visible */}
                <span className="loader__text loader__text--base">
                    Lorem Ipsum
                </span>

                {/* White fill — revealed left→right via clip-path */}
                <span
                    className="loader__text loader__text--fill"
                    ref={fillRef}
                    style={{ clipPath: 'inset(0 100% 0 0)' }}
                >
                    Lorem Ipsum
                </span>

            </div>

            {/* ── Small counter ─────────────────────────────── */}
            <span className="loader__counter" ref={counterRef} aria-live="polite">
                {String(progress).padStart(2, '0')}%
            </span>

        </div>
    )
}