'use client'
import { useState, useEffect, useRef } from 'react'

export function useActiveSection(sectionIds: string[]) {
    const [activeSection, setActiveSection] = useState(sectionIds[0])
    const idsRef = useRef(sectionIds)

    useEffect(() => {
        const observers: IntersectionObserver[] = []

        idsRef.current.forEach((id) => {
            const el = document.getElementById(id)
            if (!el) return

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveSection(id)
                },
                { threshold: 0.3 }
            )
            observer.observe(el)
            observers.push(observer)
        })

        return () => observers.forEach((o) => o.disconnect())
    }, [])

    return activeSection
}
