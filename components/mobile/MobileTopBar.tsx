'use client'

import Image from 'next/image'
import { Bell, Globe } from 'lucide-react'
import { useRouter, usePathname } from '@/navigation'

interface MobileTopBarProps {
    locale: string
}

export default function MobileTopBar({ locale }: MobileTopBarProps) {
    const router = useRouter()
    const pathname = usePathname()

    const toggleLocale = () => {
        const next = locale === 'ar' ? 'en' : 'ar'
        router.replace(pathname, { locale: next })
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
                    background: 'rgba(8,8,16,0.85)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    borderBottom: '1px solid rgba(232,67,45,0.15)',
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
                    <button className="relative p-2 rounded-full transition-colors hover:bg-white/5">
                        <Bell size={20} className="text-white/70" />
                        {/* Red dot badge */}
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
                    </button>
                </div>
            </div>
        </div>
    )
}
