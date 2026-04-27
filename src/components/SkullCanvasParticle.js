'use client'
import { useEffect, useRef } from 'react'

export default function SkullCanvas({ className = '', style = {} }) {
    const containerRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        let scene = null

        // Dynamic import INSIDE useEffect — guarantees Three.js
        // only ever runs in the browser, never during SSR/compile
        import('@/lib/skull/MainThreeScene').then(({ default: MainThreeScene }) => {
            scene = MainThreeScene
            scene.init(container)
        })

        return () => {
            if (scene) scene.destroy()
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ width: '100%', height: '100%', ...style }}
        />
    )
}
