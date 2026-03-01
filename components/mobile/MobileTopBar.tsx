'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Bell, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from '@/navigation'
import NotificationPanel, { NOTIFICATIONS } from './NotificationPanel'
import type { Notification } from './NotificationPanel'

interface MobileTopBarProps {
    locale: string
}

export default function MobileTopBar({ locale }: MobileTopBarProps) {
    const router = useRouter()
    const pathname = usePathname()
    const [notifOpen, setNotifOpen] = useState(false)
    const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS)

    const unreadCount = notifications.filter((n) => !n.read).length

    const toggleLocale = () => {
        const next = locale === 'ar' ? 'en' : 'ar'
        router.replace(pathname, { locale: next })
    }

    const clearAll = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-[9990] md:hidden">
            {/* Status bar spacer for iPhone notch */}
            <div
                className="w-full"
                style={{ height: 'env(safe-area-inset-top, 0px)', background: 'rgba(8,8,16,0.95)' }}
            />

            {/* App header bar */}
            <div
                className="flex items-center justify-between px-4"
                style={{
                    height: '56px',
                    background: 'rgba(28, 28, 30, 0.88)',
                    backdropFilter: 'blur(60px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(60px) saturate(180%)',
                    borderBottom: '0.5px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 1px 20px rgba(0,0,0,0.5)',
                }}
            >
                {/* Left: Logo + Name */}
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 relative rounded-lg overflow-hidden">
                        <Image
                            src="/logo.jpg"
                            alt="بصمة"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="font-bold text-lg font-tajawal tracking-wide text-white">
                        بصمة
                    </span>
                </div>

                {/* Right: Language + Bell */}
                <div className="flex items-center gap-3">
                    {/* Language toggle */}
                    <button
                        onClick={toggleLocale}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                    >
                        <Globe size={14} />
                        {locale === 'ar' ? 'EN' : 'AR'}
                    </button>

                    {/* Notification bell */}
                    <button
                        onClick={() => setNotifOpen(!notifOpen)}
                        className="relative p-2 rounded-full transition-colors hover:bg-white/10"
                    >
                        <Bell size={20} className="text-white/70" />
                        {unreadCount > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-0.5 -right-0.5
                                           bg-accent text-white text-[10px]
                                           font-bold rounded-full min-w-[16px]
                                           h-4 flex items-center justify-center
                                           px-1 animate-badge-pulse"
                            >
                                {unreadCount}
                            </motion.span>
                        )}
                    </button>
                </div>
            </div>

            {/* Notification Panel */}
            <AnimatePresence>
                {notifOpen && (
                    <NotificationPanel
                        notifications={notifications}
                        onClearAll={clearAll}
                        onClose={() => setNotifOpen(false)}
                        lang={locale}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
