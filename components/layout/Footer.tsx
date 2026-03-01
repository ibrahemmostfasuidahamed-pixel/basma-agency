'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Instagram, Linkedin, MessageCircle, Twitter } from 'lucide-react'

export function Footer() {
    const t = useTranslations('footer')

    return (
        <footer className="hidden md:block border-t border-accent/20 bg-darker py-6 relative z-20">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Left: Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 relative opacity-80">
                        <Image
                            src="/logo.jpg"
                            alt="بصمة logo"
                            fill
                            className="object-contain"
                            onError={(e) => { e.currentTarget.style.display = 'none' }}
                        />
                    </div>
                    <span className="font-bold text-lg font-tajawal tracking-wider">بصمة</span>
                </div>

                {/* Center: Copyright */}
                <div className="text-white/50 text-sm">
                    {t('rights')}
                </div>

                {/* Right: Socials */}
                <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 rounded-full border border-white/10 hover:border-accent hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(232,67,45,0.4)] flex items-center justify-center text-white/70 hover:text-accent transition-all duration-300 interactive">
                        <Instagram size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full border border-white/10 hover:border-accent hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(232,67,45,0.4)] flex items-center justify-center text-white/70 hover:text-accent transition-all duration-300 interactive">
                        <Linkedin size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full border border-white/10 hover:border-green-500 hover:bg-green-500/10 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] flex items-center justify-center text-white/70 hover:text-green-500 transition-all duration-300 interactive">
                        <MessageCircle size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full border border-white/10 hover:border-accent hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(232,67,45,0.4)] flex items-center justify-center text-white/70 hover:text-accent transition-all duration-300 interactive">
                        <Twitter size={18} />
                    </a>
                </div>

            </div>
        </footer>
    )
}
