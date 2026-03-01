'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname } from '@/navigation'
import Image from 'next/image'
import { Button } from '../ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'

export function Navbar() {
    const t = useTranslations('nav')
    const locale = useLocale()
    const pathname = usePathname()

    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const isAr = locale === 'ar'
    const nextLocale = isAr ? 'en' : 'ar'

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: t('home'), id: '#hero' },
        { name: t('services'), id: '#services' },
        { name: t('howWeWork'), id: '#process' },
        { name: t('portfolio'), id: '#portfolio' },
        { name: t('contact'), id: '#contact' }
    ]

    return (
        <>
            <nav className={`hidden md:block fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/[0.03] backdrop-blur-xl border-b border-accent/20 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' : 'bg-transparent py-5'
                }`}>
                <div className="container mx-auto px-6 h-12 flex justify-between items-center">

                    {/* LEFT: Language Toggle */}
                    <Link
                        href={pathname}
                        locale={nextLocale}
                        className="btn-glass px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 group transition-all"
                    >
                        <Globe size={16} className="text-accent group-hover:animate-pulse" />
                        <span className={isAr ? 'font-inter tracking-wider' : 'font-tajawal'}>
                            {isAr ? 'EN' : 'عربي'}
                        </span>
                    </Link>

                    {/* CENTER: Logo (Absolute Center) */}
                    <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 interactive group">
                        <div className="w-10 h-10 relative">
                            <Image
                                src="/logo.jpg"
                                alt="بصمة Logo"
                                fill
                                className="object-contain group-hover:drop-shadow-[0_0_15px_rgba(232,67,45,0.8)] transition-all duration-300"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                        <span className="text-2xl font-bold font-tajawal tracking-wide">بصمة</span>
                    </Link>

                    {/* RIGHT: Desktop Nav & CTA */}
                    <div className="hidden lg:flex items-center gap-8">
                        <ul className="flex items-center gap-8 text-sm font-medium">
                            {navLinks.map(link => (
                                <li key={link.name}>
                                    <Link href={link.id as Parameters<typeof Link>[0]["href"]} className="text-white/80 hover:text-accent transition-colors interactive">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Button variant="primary" href="#contact" className="interactive">
                            {t('startProject')}
                        </Button>
                    </div>

                    {/* RIGHT: Mobile Menu Toggle */}
                    <button
                        className="lg:hidden text-white/90 interactive"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu size={28} />
                    </button>
                </div>
            </nav>

            {/* MOBILE MENU FULLSCREEN */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-2xl flex flex-col pt-24 px-6"
                    >
                        <button
                            className="absolute top-8 left-6 text-white/80 interactive"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X size={32} />
                        </button>

                        <div className="flex flex-col items-center gap-8 text-xl font-medium mt-10">
                            {navLinks.map(link => (
                                <Link
                                    key={link.name}
                                    href={link.id as Parameters<typeof Link>[0]["href"]}
                                    className="interactive w-full text-center py-4 border-b border-white/5 active:text-accent"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Button
                                variant="primary"
                                href="#contact"
                                size="lg"
                                className="mt-8 w-full interactive"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {t('startProject')}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
