'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Preloader() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[10000] bg-dark flex flex-col items-center justify-center"
                >
                    <div className="relative">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="absolute -inset-4 border-2 border-accent/20 border-t-accent rounded-full w-24 h-24"
                        />
                        <div className="w-16 h-16 flex items-center justify-center relative z-10">
                            <Image
                                src="/logo.jpg"
                                alt="بصمة Loader"
                                fill
                                className="object-contain"
                                priority
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none'
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
