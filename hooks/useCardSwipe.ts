'use client'

import { useState, useRef } from 'react'

export function useCardSwipe(totalCards: number) {
    const [current, setCurrent] = useState(0)
    const startX = useRef(0)

    const onTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX
    }

    const onTouchEnd = (e: React.TouchEvent) => {
        const diff = startX.current - e.changedTouches[0].clientX
        if (Math.abs(diff) < 50) return
        if (diff > 0 && current < totalCards - 1) setCurrent(c => c + 1)
        if (diff < 0 && current > 0) setCurrent(c => c - 1)
    }

    return { current, setCurrent, onTouchStart, onTouchEnd }
}
