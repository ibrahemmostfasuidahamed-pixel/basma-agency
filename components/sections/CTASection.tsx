'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { CTACanvas } from '../three/CTACanvas'
import { Button } from '../ui/Button'
import { CheckCircle2, MessageCircle } from 'lucide-react'

export function CTASection() {
    const t = useTranslations('cta')

    return (
        <section id="contact" className="relative py-16 md:py-32 overflow-hidden bg-black flex items-center justify-center min-h-[60vh] md:min-h-[80vh]">
            <CTACanvas />

            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto rounded-[20px] md:rounded-[3rem] p-6 md:p-20 relative overflow-hidden group"
                    style={{
                        background: 'rgba(28, 28, 30, 0.85)',
                        border: '1px solid rgba(232,67,45,0.3)',
                        backdropFilter: 'blur(40px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                        boxShadow: '0 0 50px rgba(232,67,45,0.15), 0 2px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)',
                    }}
                >
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <motion.div
                        initial={{ y: 20 }}
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="text-4xl md:text-6xl mb-4 md:mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        🚀
                    </motion.div>

                    <h2 className="text-2xl md:text-4xl lg:text-6xl font-extrabold mb-3 md:mb-6 leading-tight">
                        {t('title')}
                    </h2>
                    <p className="text-[14px] md:text-xl lg:text-2xl text-white/70 mb-6 md:mb-12 leading-relaxed">
                        {t('subtitle')}
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-6 md:mb-12">
                        <Button variant="primary" size="lg" className="text-[15px] md:text-lg w-full sm:w-auto h-12 md:h-auto active:scale-[0.95]">
                            {t('btnPrimary')}
                        </Button>
                        <Button
                            variant="whatsapp"
                            size="lg"
                            className="text-[15px] md:text-lg w-full sm:w-auto h-12 md:h-auto flex gap-2 active:scale-[0.95]"
                            href="https://wa.me/201234567890"
                        >
                            <MessageCircle size={20} />
                            {t('btnWhatsapp')}
                        </Button>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-10 text-[13px] md:text-base font-medium text-white/60">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="text-accent" size={18} />
                            {t('badge1')}
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="text-accent" size={18} />
                            {t('badge2')}
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="text-accent" size={18} />
                            {t('badge3')}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
