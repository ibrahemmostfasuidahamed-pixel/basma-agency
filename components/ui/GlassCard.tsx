'use client'

import React, { useRef } from 'react'

interface GlassCardProps {
    children: React.ReactNode
    className?: string
}

export function GlassCard({ children, className = '' }: GlassCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return

        const card = cardRef.current
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5

        card.style.transform = `
      perspective(1000px)
      rotateY(${x * 15}deg)
      rotateX(${-y * 15}deg)
      scale3d(1.02, 1.02, 1.02)
    `
    }

    const handleMouseLeave = () => {
        if (!cardRef.current) return
        const card = cardRef.current
        card.style.transform = `
      perspective(1000px)
      rotateY(0deg)
      rotateX(0deg)
      scale3d(1, 1, 1)
    `
    }

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`bg-white/[0.04] backdrop-blur-glass border border-white/[0.08] rounded-2xl hover:border-accent/30 hover:shadow-glow-sm transition-all duration-300 ease-out ${className}`}
            style={{ willChange: 'transform' }}
        >
            {children}
        </div>
    )
}
