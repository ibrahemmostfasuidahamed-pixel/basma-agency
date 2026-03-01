'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { HowWeWorkCanvas } from '../three/HowWeWorkCanvas'
import { Coffee, Search, Code2, Rocket } from 'lucide-react'

const stepEmojis = ['🎯', '📋', '⚡', '🚀']

export function HowWeWorkSection() {
    const t = useTranslations('howWeWork')
    const locale = useLocale()
    const isAr = locale === 'ar'
    const ref = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"]
    })

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
    const isInView = useInView(ref, { once: true, margin: "-80px" })

    const steps = [
        { icon: Coffee, title: t('step1Title'), desc: t('step1Desc') },
        { icon: Search, title: t('step2Title'), desc: t('step2Desc') },
        { icon: Code2, title: t('step3Title'), desc: t('step3Desc') },
        { icon: Rocket, title: t('step4Title'), desc: t('step4Desc') }
    ]

    return (
        <section id="process" className="relative py-12 md:py-32 overflow-hidden bg-darker" ref={ref}>
            <HowWeWorkCanvas />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 md:mb-24 max-w-3xl mx-auto"
                >
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-2 md:mb-6">
                        {t('title')}
                    </h2>
                    <p className="text-[13px] md:text-lg text-white/60">{t('subtitle')}</p>
                </motion.div>

                {/* Desktop: Horizontal Grid */}
                <div className="hidden md:block relative max-w-5xl mx-auto">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 rounded-full">
                        <motion.div
                            className="h-full bg-gradient-to-r from-accent via-accent-light to-accent rounded-full shadow-[0_0_15px_#E8432D]"
                            style={{ width: lineHeight }}
                        />
                    </div>
                    <div className="grid md:grid-cols-4 gap-6 relative z-10">
                        {steps.map((step, i) => {
                            const Icon = step.icon
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: i * 0.2 }}
                                    className="relative group"
                                >
                                    <div
                                        className="rounded-2xl p-8 h-full flex flex-col items-center text-center hover:-translate-y-4 transition-transform duration-300"
                                        style={{
                                            background: 'rgba(28, 28, 30, 0.85)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            backdropFilter: 'blur(20px)',
                                        }}
                                    >
                                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-darker border-4 border-accent shadow-[0_0_20px_rgba(232,67,45,0.6)] group-hover:scale-150 transition-transform duration-300" />
                                        <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                                            <Icon size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                        <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* Mobile: Vertical Timeline */}
                <div className="md:hidden relative">
                    {/* Timeline line */}
                    <div
                        className="absolute top-0 w-[2px] h-full rounded-full"
                        style={{
                            [isAr ? 'right' : 'left']: '20px',
                            background: 'linear-gradient(to bottom, rgba(232,67,45,0.8) 0%, rgba(232,67,45,0.15) 100%)',
                        }}
                    >
                        <motion.div
                            className="w-full rounded-full"
                            style={{
                                height: lineHeight,
                                background: 'linear-gradient(to bottom, #E8432D 0%, rgba(232,67,45,0.4) 100%)',
                                boxShadow: '0 0 8px rgba(232,67,45,0.5)',
                            }}
                        />
                    </div>

                    {/* Step cards */}
                    <div className="space-y-3" style={{ [isAr ? 'marginRight' : 'marginLeft']: '44px' }}>
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: isAr ? 30 : -30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.4, delay: i * 0.12 }}
                                className="relative"
                            >
                                {/* Step number badge */}
                                <div
                                    className="absolute top-4 w-[26px] h-[26px] rounded-full bg-accent flex items-center justify-center text-white text-[11px] font-bold z-10"
                                    style={{
                                        [isAr ? 'right' : 'left']: '-32px',
                                        boxShadow: '0 0 10px rgba(232,67,45,0.5)',
                                    }}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </div>

                                {/* Card */}
                                <div
                                    className="rounded-2xl p-4 active:scale-[0.97] transition-transform duration-150"
                                    style={{
                                        background: 'rgba(28, 28, 30, 0.85)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        backdropFilter: 'blur(30px)',
                                        WebkitBackdropFilter: 'blur(30px)',
                                        boxShadow: '0 2px 15px rgba(0,0,0,0.4)',
                                    }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xl">{stepEmojis[i]}</span>
                                        <h3 className="text-[15px] font-semibold text-white">{step.title}</h3>
                                    </div>
                                    <p className="text-[13px] text-white/60 leading-relaxed line-clamp-2">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
