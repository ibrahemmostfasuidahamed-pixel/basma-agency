'use client'

import { motion } from 'framer-motion'

interface MobileCardProps {
    children: React.ReactNode
    className?: string
    variant?: 'default' | 'accent' | 'elevated'
    onTap?: () => void
    delay?: number
}

const variantStyles = {
    default: {
        background: 'rgba(28, 28, 30, 0.85)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)',
    },
    accent: {
        background: 'rgba(232, 67, 45, 0.08)',
        border: '1px solid rgba(232, 67, 45, 0.2)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
    },
    elevated: {
        background: 'rgba(44, 44, 46, 0.9)',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
    },
}

export default function MobileCard({
    children,
    className = '',
    variant = 'default',
    onTap,
    delay = 0
}: MobileCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{
                opacity: 1, y: 0, scale: 1,
                transition: {
                    delay: delay * 0.1,
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }
            }}
            viewport={{ once: true, margin: '-40px' }}
            whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
            onClick={onTap}
            className={`rounded-[20px] p-5 ${className}`}
            style={{
                ...variantStyles[variant],
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            }}
        >
            {children}
        </motion.div>
    )
}
