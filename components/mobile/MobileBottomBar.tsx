'use client'

import { motion } from 'framer-motion'
import { Home, Zap, Rocket, Briefcase, MessageCircle } from 'lucide-react'
import { useActiveSection } from '@/hooks/useActiveSection'

interface MobileBottomBarProps {
    locale: string
}

const SECTION_IDS = ['home', 'services', 'portfolio', 'contact']

function scrollToSection(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    const offset = 56
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
}

export default function MobileBottomBar({ locale }: MobileBottomBarProps) {
    const activeSection = useActiveSection(SECTION_IDS)
    const isAr = locale === 'ar'

    const tabs = [
        {
            id: 'home',
            icon: Home,
            label: isAr ? 'الرئيسية' : 'Home',
        },
        {
            id: 'services',
            icon: Zap,
            label: isAr ? 'خدماتنا' : 'Services',
        },
        {
            id: 'cta-center',
            icon: Rocket,
            label: '',
            isCenter: true,
        },
        {
            id: 'portfolio',
            icon: Briefcase,
            label: isAr ? 'أعمالنا' : 'Work',
        },
        {
            id: 'contact',
            icon: MessageCircle,
            label: isAr ? 'تواصل' : 'Contact',
        },
    ]

    const handleTabPress = (id: string) => {
        if (id === 'cta-center') {
            window.open('https://wa.me/201000000000', '_blank')
            return
        }
        scrollToSection(id)
    }

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-[9990] md:hidden"
            style={{
                paddingBottom: 'env(safe-area-inset-bottom, 0px)',
                background: 'rgba(8,8,16,0.92)',
                backdropFilter: 'blur(30px) saturate(180%)',
                WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 -4px 30px rgba(0,0,0,0.6)',
            }}
        >
            <div className="grid grid-cols-5 h-[72px] items-end">
                {tabs.map((tab) => {
                    const isActive = activeSection === tab.id
                    const Icon = tab.icon

                    if (tab.isCenter) {
                        return (
                            <motion.button
                                key={tab.id}
                                whileTap={{ scale: 0.85 }}
                                onClick={() => handleTabPress(tab.id)}
                                className="flex items-center justify-center self-center"
                                style={{ marginTop: '-20px' }}
                            >
                                <div
                                    className="w-[54px] h-[54px] rounded-full flex items-center justify-center border-2 border-white/20 animate-pulse-glow"
                                    style={{
                                        background: 'linear-gradient(135deg, #E8432D, #ff6b4a)',
                                        boxShadow: '0 0 25px rgba(232,67,45,0.6), 0 -4px 15px rgba(232,67,45,0.3)',
                                    }}
                                >
                                    <Icon size={24} className="text-white" />
                                </div>
                            </motion.button>
                        )
                    }

                    return (
                        <motion.button
                            key={tab.id}
                            whileTap={{ scale: 0.85 }}
                            onClick={() => handleTabPress(tab.id)}
                            className="flex flex-col items-center justify-center pb-2 pt-1.5 relative"
                        >
                            {/* Active dot indicator */}
                            {isActive && (
                                <motion.div
                                    layoutId="tab-dot"
                                    className="tab-active-dot mb-1"
                                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                />
                            )}
                            {!isActive && <div className="h-[8px]" />}

                            <motion.div
                                animate={{ y: isActive ? -2 : 0 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            >
                                <Icon
                                    size={22}
                                    className="transition-colors duration-200"
                                    style={{
                                        color: isActive ? '#E8432D' : 'rgba(240,240,248,0.4)',
                                    }}
                                />
                            </motion.div>

                            <span
                                className="transition-all duration-200"
                                style={{
                                    fontSize: '10px',
                                    marginTop: '3px',
                                    letterSpacing: '0.02em',
                                    color: isActive ? '#E8432D' : 'rgba(240,240,248,0.4)',
                                    fontWeight: isActive ? 700 : 400,
                                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                                }}
                            >
                                {tab.label}
                            </span>
                        </motion.button>
                    )
                })}
            </div>
        </div>
    )
}
