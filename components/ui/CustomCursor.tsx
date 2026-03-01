'use client'
import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const pos = useRef({ x: 0, y: 0 })
    const ring = useRef({ x: 0, y: 0 })
    const raf = useRef<number>()
    const [show, setShow] = useState(false)

    useEffect(() => {
        // Detect touch/mobile device
        const isTouchDevice =
            'ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            window.matchMedia('(pointer: coarse)').matches ||
            window.innerWidth < 1024

        if (isTouchDevice) return // exit early, render nothing

        setShow(true)
        document.body.style.cursor = 'none'

        const moveCursor = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY }
            if (dotRef.current) {
                dotRef.current.style.transform =
                    `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
            }
        }

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t

        const animate = () => {
            ring.current.x = lerp(ring.current.x, pos.current.x, 0.12)
            ring.current.y = lerp(ring.current.y, pos.current.y, 0.12)
            if (ringRef.current) {
                ringRef.current.style.transform =
                    `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`
            }
            raf.current = requestAnimationFrame(animate)
        }
        raf.current = requestAnimationFrame(animate)

        const onEnter = () => {
            dotRef.current?.classList.add('scale-0')
            ringRef.current?.classList.add('ring-hover')
        }
        const onLeave = () => {
            dotRef.current?.classList.remove('scale-0')
            ringRef.current?.classList.remove('ring-hover')
        }

        document.addEventListener('mousemove', moveCursor)

        // Add listeners to any existing and future dynamic elements
        const setupInteractivity = () => {
            document.querySelectorAll('a, button, .interactive').forEach(el => {
                el.addEventListener('mouseenter', onEnter)
                el.addEventListener('mouseleave', onLeave)
            })
        }

        // Initial setup
        setupInteractivity()
        const interval = setInterval(setupInteractivity, 1500)

        return () => {
            document.body.style.cursor = ''
            document.removeEventListener('mousemove', moveCursor)
            clearInterval(interval)
            if (raf.current) cancelAnimationFrame(raf.current)
        }
    }, [])

    if (!show) return null // render nothing on mobile

    return (
        <>
            {/* Small dot */}
            <div
                ref={dotRef}
                className="cursor-dot fixed top-0 left-0 w-2 h-2 bg-accent rounded-full
                   pointer-events-none z-[9999] transition-transform
                   duration-75"
                style={{ willChange: 'transform' }}
            />
            {/* Large ring */}
            <div
                ref={ringRef}
                className="cursor-ring fixed top-0 left-0 w-10 h-10 rounded-full
                   border-2 border-accent pointer-events-none z-[9998]
                   transition-[width,height,background] duration-200"
                style={{ willChange: 'transform' }}
            />
            <style>{`
        .ring-hover {
          width: 60px !important;
          height: 60px !important;
          background: rgba(232,67,45,0.15) !important;
          margin-left: -10px !important;
          margin-top: -10px !important;
        }
        .scale-0 { transform: scale(0) !important; opacity: 0; }
      `}</style>
        </>
    )
}
