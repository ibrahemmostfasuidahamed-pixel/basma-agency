'use client'

import { useIsMobile } from '@/hooks/useIsMobile'
import MobileTopBar from './MobileTopBar'
import MobileBottomBar from './MobileBottomBar'

interface MobileLayoutProps {
    children: React.ReactNode
    locale: string
}

export default function MobileLayout({ children, locale }: MobileLayoutProps) {
    const isMobile = useIsMobile()

    if (!isMobile) return <>{children}</>

    return (
        <>
            <MobileTopBar locale={locale} />
            <main
                className="flex-grow flex flex-col relative z-10 w-full"
                style={{
                    paddingTop: 'calc(56px + env(safe-area-inset-top, 0px))',
                    paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))',
                }}
            >
                {children}
            </main>
            <MobileBottomBar locale={locale} />
        </>
    )
}
