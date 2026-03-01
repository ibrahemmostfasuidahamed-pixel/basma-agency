'use client'

import React from 'react'
import { Link } from '@/navigation'

interface ButtonProps {
    variant: 'primary' | 'glass' | 'whatsapp'
    size?: 'sm' | 'md' | 'lg'
    children: React.ReactNode
    onClick?: () => void
    href?: string
    className?: string
}

export function Button({ variant, size = 'md', children, onClick, href, className = '' }: ButtonProps) {
    const baseClass = "rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center "

    const sizeClass = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3",
        lg: "px-10 py-5 text-lg"
    }[size]

    const variantClass = {
        primary: "bg-gradient-to-r from-accent to-accent-light shadow-glow hover:shadow-glow hover:scale-105 text-white border-0",
        glass: "border border-accent/30 hover:bg-accent/10 text-white backdrop-blur-md",
        whatsapp: "border border-green-500/30 hover:bg-green-500/10 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] text-white backdrop-blur-md"
    }[variant]

    const combinedClass = `${baseClass} ${sizeClass} ${variantClass} ${className}`

    if (href) {
        // If it's an external link (whatsapp) or anchor hash
        if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
            return (
                <a href={href} className={combinedClass} onClick={onClick} target="_blank" rel="noopener noreferrer">
                    {children}
                </a>
            )
        }
        // If it's an internal hash link for smooth scroll
        if (href.startsWith('#')) {
            return (
                <a href={href} className={combinedClass} onClick={(e) => {
                    if (onClick) onClick();
                    const el = document.querySelector(href);
                    if (el) {
                        e.preventDefault();
                        el.scrollIntoView({ behavior: 'smooth' });
                    }
                }}>
                    {children}
                </a>
            )
        }
        // Localized route
        return (
            <Link href={href as Parameters<typeof Link>[0]["href"]} className={combinedClass} onClick={onClick}>
                {children}
            </Link>
        )
    }

    return (
        <button onClick={onClick} className={combinedClass}>
            {children}
        </button>
    )
}
