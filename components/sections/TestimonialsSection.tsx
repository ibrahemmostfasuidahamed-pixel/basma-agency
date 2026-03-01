'use client'

import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'
import { useCardSwipe } from '@/hooks/useCardSwipe'

export function TestimonialsSection() {
    const t = useTranslations('testimonials')
    const [active, setActive] = useState(0)

    const testimonials = [
        { id: 0, name: t('c1Name'), role: t('c1Role'), quote: t('c1Quote'), init: 'AM' },
        { id: 1, name: t('c2Name'), role: t('c2Role'), quote: t('c2Quote'), init: 'SR' },
        { id: 2, name: t('c3Name'), role: t('c3Role'), quote: t('c3Quote'), init: 'MZ' }
    ]

    const { onTouchStart, onTouchEnd, current } = useCardSwipe(testimonials.length)

    // Sync swipe state
    useEffect(() => {
        setActive(current)
    }, [current])

    // Auto-rotate
    useEffect(() => {
        const timer = setInterval(() => {
            setActive((prev) => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [testimonials.length])

    return (
        <section className="py-12 md:py-32 bg-darker relative z-10 overflow-hidden">
            {/* Decorative gradient orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-accent/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-6 md:mb-16"
                >
                    {t('title')}
                </motion.h2>

                {/* Cards */}
                <div
                    className="max-w-4xl mx-auto relative min-h-[320px] md:min-h-[300px]"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, x: 40, scale: 0.97 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -40, scale: 0.97 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="absolute inset-0"
                        >
                            {/* iOS Card */}
                            <div
                                className="rounded-[20px] md:rounded-2xl p-6 md:p-14 flex flex-col items-center relative overflow-hidden h-full"
                                style={{
                                    background: 'rgba(28, 28, 30, 0.85)',
                                    border: '1px solid rgba(232,67,45,0.2)',
                                    backdropFilter: 'blur(40px) saturate(180%)',
                                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                                    boxShadow: '0 2px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)',
                                }}
                            >
                                {/* Quote decoration */}
                                <span
                                    className="absolute top-2 left-4 md:left-8 text-accent/15 font-serif pointer-events-none select-none"
                                    style={{ fontSize: '72px', lineHeight: 1 }}
                                >
                                    ❝
                                </span>

                                {/* Stars */}
                                <div className="flex gap-0.5 md:gap-1 mb-4 md:mb-6 text-yellow-500 relative z-10">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" className="md:w-5 md:h-5" />)}
                                </div>

                                {/* Quote */}
                                <p className="text-[15px] md:text-xl lg:text-2xl font-medium leading-relaxed md:leading-relaxed mb-6 md:mb-10 pb-4 md:pb-10 border-b border-white/10 w-full text-center text-white/90 relative z-10 italic">
                                    &quot;{testimonials[active].quote}&quot;
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3 md:gap-4 relative z-10">
                                    <div
                                        className="w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold font-inter text-white text-[13px] md:text-base"
                                        style={{
                                            background: 'linear-gradient(135deg, #E8432D, #ff6b4a)',
                                        }}
                                    >
                                        {testimonials[active].init}
                                    </div>
                                    <div className="text-start">
                                        <h4 className="font-semibold text-[14px] md:text-lg text-white">{testimonials[active].name}</h4>
                                        <p className="text-white/50 text-[12px] md:text-sm">{testimonials[active].role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Indicators */}
                <div className="flex justify-center gap-2 md:gap-3 mt-6 md:mt-10">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`h-2 md:h-3 rounded-full transition-all duration-300 min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 flex items-center justify-center ${active === i ? 'bg-accent w-6 md:w-8 shadow-[0_0_10px_#E8432D]' : 'bg-white/20 w-2 md:w-3'
                                }`}
                        >
                            <span className={`block rounded-full transition-all duration-300 ${active === i ? 'bg-accent w-6 md:w-8 h-2 md:h-3' : 'bg-white/30 w-2 md:w-3 h-2 md:h-3'}`} />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}
