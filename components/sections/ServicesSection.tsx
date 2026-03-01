'use client'

import { useTranslations } from 'next-intl'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ServicesCanvas } from '../three/ServicesCanvas'
import { Button } from '../ui/Button'
import { BrainCircuit, AppWindow } from 'lucide-react'

export function ServicesSection() {
    const t = useTranslations('services')
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-80px" })

    const cards = [
        {
            icon: BrainCircuit,
            title: t('aiTitle'),
            desc: t('aiDesc'),
            features: t.raw('aiFeatures') as string[],
            btn: t('aiBtn'),
            variant: 'primary' as const,
        },
        {
            icon: AppWindow,
            title: t('webTitle'),
            desc: t('webDesc'),
            features: t.raw('webFeatures') as string[],
            btn: t('webBtn'),
            variant: 'secondary' as const,
        },
    ]

    return (
        <section id="services" className="relative py-16 md:py-32 overflow-hidden" ref={ref}>
            <ServicesCanvas />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 md:mb-20"
                >
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold inline-block relative pb-3 md:pb-4">
                        {t('title')}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-10 md:w-full h-[3px] md:h-1 bg-gradient-to-r from-accent via-accent-light to-transparent rounded-full" />
                    </h2>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8 max-w-6xl mx-auto">
                    {cards.map((card, i) => {
                        const Icon = card.icon
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                            >
                                {/* Mobile iOS Card */}
                                <div
                                    className="rounded-[20px] md:rounded-2xl active:scale-[0.97] transition-transform duration-150 ease-out"
                                    style={{
                                        background: 'rgba(28, 28, 30, 0.85)',
                                        backdropFilter: 'blur(40px) saturate(180%)',
                                        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        boxShadow: '0 2px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)',
                                    }}
                                >
                                    <div className="p-5 md:p-8 lg:p-12 flex flex-col h-full">
                                        {/* Icon + Title Row */}
                                        <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-4">
                                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-accent/[0.15] border border-accent/30 flex items-center justify-center text-accent flex-shrink-0 shadow-[0_0_15px_rgba(232,67,45,0.15)]">
                                                <Icon size={24} className="md:w-8 md:h-8" />
                                            </div>
                                            <div>
                                                <h3 className="text-[17px] md:text-2xl font-semibold md:font-bold text-white">{card.title}</h3>
                                                <p className="text-[12px] md:text-base text-white/50 mt-0.5 md:mt-2 line-clamp-2 md:line-clamp-none">{card.desc}</p>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="w-full h-px bg-white/[0.06] my-4 md:my-6" />

                                        {/* Features List */}
                                        <ul className="space-y-0 md:space-y-3 mb-4 md:mb-10 flex-grow">
                                            {card.features.map((feature: string, idx: number) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-start gap-2.5 py-2 md:py-0 border-b border-white/[0.04] md:border-0 last:border-0"
                                                >
                                                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                                                    <span className="text-[13px] md:text-base text-white/80 leading-snug">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Button */}
                                        <Button
                                            variant={card.variant === 'primary' ? 'primary' : 'glass'}
                                            className="w-full mt-auto h-12 md:h-auto text-[15px] md:text-base rounded-xl active:scale-[0.95]"
                                        >
                                            {card.btn}
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
