'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { iosSpring } from '@/lib/ios-animations'

interface Notification {
    id: string
    icon: string
    titleAr: string
    titleEn: string
    bodyAr: string
    bodyEn: string
    time: string
    read: boolean
    type: 'offer' | 'tip' | 'update'
}

interface NotificationPanelProps {
    notifications: Notification[]
    onClearAll: () => void
    onClose: () => void
    lang: string
}

export type { Notification }

export const NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        icon: '🚀',
        titleAr: 'عرض خاص لفترة محدودة!',
        titleEn: 'Limited Time Offer!',
        bodyAr: 'احصل على استشارة مجانية لمشروعك الأول مع بصمة',
        bodyEn: 'Get a free consultation for your first project',
        time: 'الآن',
        read: false,
        type: 'offer',
    },
    {
        id: '2',
        icon: '🤖',
        titleAr: 'هل تعلم؟',
        titleEn: 'Did you know?',
        bodyAr: 'الأتمتة يمكن أن توفر 80% من وقت عملك اليومي',
        bodyEn: 'Automation can save 80% of your daily work time',
        time: 'منذ ساعة',
        read: false,
        type: 'tip',
    },
    {
        id: '3',
        icon: '⭐',
        titleAr: 'انضم لـ +50 عميل راضٍ',
        titleEn: 'Join 50+ Happy Clients',
        bodyAr: 'شركات ناجحة تثق في بصمة لتطوير أعمالها',
        bodyEn: 'Successful companies trust بصمة to grow',
        time: 'منذ 3 ساعات',
        read: true,
        type: 'update',
    },
]

export default function NotificationPanel({
    notifications,
    onClearAll,
    onClose,
    lang,
}: NotificationPanelProps) {
    const panelRef = useRef<HTMLDivElement>(null)
    const isAr = lang === 'ar'

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
                onClose()
            }
        }
        // Delay to avoid intercepting the bell click itself
        const timer = setTimeout(() => {
            document.addEventListener('mousedown', handleClickOutside)
            document.addEventListener('touchstart', handleClickOutside as unknown as EventListener)
        }, 100)
        return () => {
            clearTimeout(timer)
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('touchstart', handleClickOutside as unknown as EventListener)
        }
    }, [onClose])

    const unreadCount = notifications.filter((n) => !n.read).length

    return (
        <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -20, scaleY: 0.9 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -20, scaleY: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            style={{
                position: 'fixed',
                top: 'calc(env(safe-area-inset-top, 0px) + 56px)',
                left: 0,
                right: 0,
                zIndex: 9000,
                background: 'rgba(20, 20, 22, 0.97)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0 0 24px 24px',
                maxHeight: '70vh',
                overflowY: 'auto',
                padding: '16px',
                transformOrigin: 'top',
            }}
            className="scroll-ios"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-white font-bold text-[16px]">
                    {isAr ? 'الإشعارات' : 'Notifications'}
                    {unreadCount > 0 && (
                        <span className="text-white/40 text-[13px] font-normal mr-2 ml-2">
                            ({unreadCount})
                        </span>
                    )}
                </h3>
                {unreadCount > 0 && (
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={onClearAll}
                        className="text-[13px] font-semibold transition-colors"
                        style={{ color: '#E8432D' }}
                    >
                        {isAr ? 'مسح الكل' : 'Clear All'}
                    </motion.button>
                )}
            </div>

            {/* Notification List */}
            <div className="flex flex-col gap-2">
                {notifications.map((notif, index) => (
                    <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ ...iosSpring, delay: index * 0.05 }}
                        className="flex items-start gap-3 p-3 rounded-[14px] transition-colors"
                        style={{
                            background: notif.read
                                ? 'transparent'
                                : 'rgba(232,67,45,0.06)',
                            borderRight: isAr && !notif.read ? '3px solid #E8432D' : undefined,
                            borderLeft: !isAr && !notif.read ? '3px solid #E8432D' : undefined,
                        }}
                    >
                        {/* Icon */}
                        <div
                            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-[18px]"
                            style={{ background: 'rgba(232,67,45,0.1)' }}
                        >
                            {notif.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-bold text-white leading-tight">
                                {isAr ? notif.titleAr : notif.titleEn}
                            </p>
                            <p className="text-[12px] text-white/50 mt-0.5 leading-snug">
                                {isAr ? notif.bodyAr : notif.bodyEn}
                            </p>
                        </div>

                        {/* Time + Unread dot */}
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                            <span className="text-[11px] text-white/40 whitespace-nowrap">
                                {notif.time}
                            </span>
                            {!notif.read && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-2 h-2 rounded-full bg-accent"
                                />
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Empty state */}
            {notifications.every((n) => n.read) && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-6 text-white/30 text-[14px]"
                >
                    {isAr ? 'لا توجد إشعارات جديدة' : 'No new notifications'}
                </motion.div>
            )}
        </motion.div>
    )
}
