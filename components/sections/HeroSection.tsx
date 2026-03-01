'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import { HeroCanvas } from '../three/HeroCanvas'

export function HeroSection() {
    const t = useTranslations('hero')

    const titleWords = t('title').split(/(\s+)/)

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
            <HeroCanvas />

            <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/[0.04] backdrop-blur-md border border-accent/30 text-accent-light px-3 md:px-4 py-1.5 rounded-full text-[12px] md:text-sm font-medium mb-6 md:mb-8"
                >
                    {t('badge')}
                </motion.div>

                <h1 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-4 md:mb-6 whitespace-pre-line text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40">
                    {titleWords.map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
                            className="inline-block"
                        >
                            {word}
                        </motion.span>
                    ))}
                </h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-[14px] md:text-lg lg:text-xl text-white/60 max-w-2xl mb-8 md:mb-12 leading-relaxed"
                >
                    {t('subtitle')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto"
                >
                    <Button variant="primary" size="lg" href="#services" className="w-full sm:w-auto text-[15px] md:text-lg h-12 md:h-auto active:scale-[0.95]">
                        {t('cta1')}
                    </Button>
                    <Button variant="glass" size="lg" href="#contact" className="w-full sm:w-auto text-[15px] md:text-lg h-12 md:h-auto active:scale-[0.95]">
                        {t('cta2')}
                    </Button>
                </motion.div>

            </div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-white/40 flex-col items-center gap-2 hidden md:flex"
            >
                <span className="text-xs tracking-widest uppercase">{t('scroll')}</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-accent/50 to-transparent" />
            </motion.div>
        </section>
    )
}
