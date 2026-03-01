'use client'

import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'
import { useCardSwipe } from '@/hooks/useCardSwipe'
import { iosSpring } from '@/lib/ios-animations'

const getAvatar = (seed: string) =>
    `https://api.dicebear.com/8.x/personas/svg?seed=${encodeURIComponent(seed)}&backgroundColor=1c1c1e&radius=50`

interface Testimonial {
    id: number
    nameAr: string
    nameEn: string
    roleAr: string
    roleEn: string
    company: string
    avatar: string
    quoteAr: string
    quoteEn: string
    rating: number
}

const testimonials: Testimonial[] = [
    {
        id: 0,
        nameAr: 'أحمد المنصور',
        nameEn: 'Ahmed Al-Mansour',
        roleAr: 'مدير تنفيذي',
        roleEn: 'CEO',
        company: 'TechVentures',
        avatar: getAvatar('AhmedMansour'),
        quoteAr: 'بصمة غيّرت طريقة عمل شركتنا بالكامل! الأتمتة وفّرت علينا أكثر من 40 ساعة عمل كل أسبوع',
        quoteEn: 'بصمة completely transformed our workflow. Automation saved us 40+ hours every week.',
        rating: 5,
    },
    {
        id: 1,
        nameAr: 'سمر الرشيد',
        nameEn: 'Samar Al-Rashid',
        roleAr: 'مؤسسة متجر إلكتروني',
        roleEn: 'E-commerce Founder',
        company: 'LuxeStore',
        avatar: getAvatar('SamarRashid'),
        quoteAr: 'الموقع الذي بنته لنا بصمة يعكس هويتنا بشكل مثالي، التصميم احترافي والسرعة ممتازة',
        quoteEn: 'The website بصمة built perfectly reflects our brand. Professional design, excellent speed.',
        rating: 5,
    },
    {
        id: 2,
        nameAr: 'محمد الزهراني',
        nameEn: 'Mohammed Al-Zahrani',
        roleAr: 'مدير تسويق',
        roleEn: 'Marketing Director',
        company: 'GrowthLab',
        avatar: getAvatar('MohammedZahrani'),
        quoteAr: 'الاحترافية والسرعة في التنفيذ لا مثيل لهما، فريق بصمة يفهم احتياجاتك من أول جلسة',
        quoteEn: 'Unmatched professionalism and speed. بصمة team understands you from the very first session.',
        rating: 5,
    },
]

export function TestimonialsSection() {
    const t = useTranslations('testimonials')
    const [active, setActive] = useState(0)


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
    }, [])

    const item = testimonials[active]

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
                    className="max-w-4xl mx-auto relative min-h-[360px] md:min-h-[300px]"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, x: 40, scale: 0.97 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -40, scale: 0.97 }}
                            transition={{ ...iosSpring }}
                            className="absolute inset-0"
                        >
                            {/* iOS Glass Card */}
                            <div className="ios-glass rounded-[20px] md:rounded-2xl p-6 md:p-14 flex flex-col items-center relative overflow-hidden h-full">
                                {/* Quote decoration */}
                                <span
                                    className="absolute top-2 left-4 md:left-8 text-accent/15 font-serif pointer-events-none select-none"
                                    style={{ fontSize: '72px', lineHeight: 1 }}
                                >
                                    ❝
                                </span>

                                {/* Stars */}
                                <div className="flex gap-0.5 md:gap-1 mb-4 md:mb-6 text-yellow-500 relative z-10">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <Star key={i} size={16} fill="currentColor" className="md:w-5 md:h-5" />
                                    ))}
                                </div>

                                {/* Quote */}
                                <p className="text-[15px] md:text-xl lg:text-2xl font-medium leading-relaxed md:leading-relaxed mb-6 md:mb-10 pb-4 md:pb-10 border-b border-white/10 w-full text-center text-white/90 relative z-10 italic">
                                    &quot;{item.quoteAr}&quot;
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3 md:gap-4 relative z-10">
                                    {/* Avatar with verified badge */}
                                    <div className="relative">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={item.avatar}
                                            alt={item.nameAr}
                                            width={60}
                                            height={60}
                                            className="w-11 h-11 md:w-[60px] md:h-[60px] rounded-full border-2 border-accent/50
                                                       ring-2 ring-accent/20 ring-offset-2
                                                       ring-offset-transparent object-cover"
                                            style={{
                                                background: 'rgba(232,67,45,0.1)',
                                                filter: 'drop-shadow(0 0 8px rgba(232,67,45,0.3))',
                                            }}
                                        />
                                        {/* Verified badge */}
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5
                                                        bg-accent rounded-full border-2
                                                        border-[#080810] flex items-center
                                                        justify-center">
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
                                                <path
                                                    d="M1.5 5L3.5 7.5L8.5 2.5"
                                                    stroke="white"
                                                    strokeWidth="1.5"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="text-start">
                                        <h4 className="font-semibold text-[14px] md:text-lg text-white">
                                            {item.nameAr}
                                        </h4>
                                        <p className="text-white/50 text-[12px] md:text-sm">
                                            {item.roleAr} · {item.company}
                                        </p>
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
