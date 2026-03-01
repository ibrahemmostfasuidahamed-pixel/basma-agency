'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export function StatsSection() {
    const t = useTranslations('stats')
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-40px" })

    const stats = [
        { value: 50, prefix: '+', label: t('projects'), suffixSide: 'start' },
        { value: 30, prefix: '+', label: t('clients'), suffixSide: 'start' },
        { value: 2, prefix: '', label: t('services'), suffixSide: 'start' },
        { value: 100, prefix: '%', label: t('quality'), suffixSide: 'end' }
    ]

    return (
        <section className="py-10 md:py-20 bg-black/60 border-y border-white/[0.05] relative z-10" ref={ref}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-6xl mx-auto">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                        >
                            <div
                                className="rounded-[20px] p-5 md:p-8 text-center flex flex-col items-center justify-center active:scale-[0.97] transition-transform duration-150"
                                style={{
                                    background: 'rgba(232, 67, 45, 0.08)',
                                    border: '1px solid rgba(232, 67, 45, 0.2)',
                                    backdropFilter: 'blur(20px)',
                                    WebkitBackdropFilter: 'blur(20px)',
                                    boxShadow: '0 2px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                                    aspectRatio: 'auto',
                                }}
                            >
                                <div className="text-[32px] md:text-5xl font-extrabold text-white font-inter flex items-center justify-center gap-0.5 drop-shadow-lg">
                                    {stat.suffixSide !== 'end' && <span className="text-accent">{stat.prefix}</span>}
                                    <Counter target={stat.value} trigger={isInView} />
                                    {stat.suffixSide === 'end' && <span className="text-accent">{stat.prefix}</span>}
                                </div>
                                <div className="text-[13px] md:text-base font-medium text-white/70 mt-1.5 md:mt-2 leading-snug">
                                    {stat.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function Counter({ target, trigger }: { target: number, trigger: boolean }) {
    const [count, setCount] = useState(0)
    const [done, setDone] = useState(false)

    useEffect(() => {
        if (!trigger) return

        let startTimestamp: number | null = null
        const duration = 1500

        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp
            const progress = Math.min((timestamp - startTimestamp) / duration, 1)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(easeOut * target))

            if (progress < 1) {
                window.requestAnimationFrame(step)
            } else {
                setDone(true)
            }
        }

        window.requestAnimationFrame(step)
    }, [target, trigger])

    return (
        <motion.span
            animate={done ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.3 }}
        >
            {count}
        </motion.span>
    )
}
