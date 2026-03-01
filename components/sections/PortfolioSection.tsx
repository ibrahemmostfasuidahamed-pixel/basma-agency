'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ArrowUpRight } from 'lucide-react'

export function PortfolioSection() {
    const t = useTranslations('portfolio')
    const [filter, setFilter] = useState<'all' | 'automation' | 'web'>('all')

    const filterLabelKey: Record<string, string> = {
        all: 'filterAll',
        automation: 'filterAuto',
        web: 'filterWeb'
    }

    const projects = [
        {
            id: 1,
            type: 'automation',
            title: t('p1Title'),
            desc: t('p1Desc'),
            image: 'linear-gradient(135deg, rgba(232,67,45,0.25) 0%, rgba(8,8,16,0.9) 100%)',
            tags: ['AI', 'Chatbot', 'OpenAI'],
        },
        {
            id: 2,
            type: 'web',
            title: t('p2Title'),
            desc: t('p2Desc'),
            image: 'linear-gradient(135deg, rgba(8,8,16,0.9) 0%, rgba(232,67,45,0.2) 100%)',
            tags: ['WordPress', 'E-Commerce', 'UI/UX'],
        },
        {
            id: 3,
            type: 'automation',
            title: t('p3Title'),
            desc: t('p3Desc'),
            image: 'linear-gradient(135deg, rgba(30,8,8,0.9) 0%, rgba(232,67,45,0.3) 100%)',
            tags: ['Dashboard', 'Analytics', 'n8n'],
        }
    ]

    const filteredProjects = projects.filter(p => filter === 'all' || p.type === filter)

    return (
        <section id="portfolio" className="py-12 md:py-32 bg-dark relative z-10">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-8 mb-6 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-2 md:mb-4">{t('title')}</h2>
                        <div className="w-10 md:w-24 h-[3px] md:h-1 bg-accent rounded-full" />
                    </motion.div>

                    {/* Filter pills */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex gap-1.5 md:gap-2 p-1 bg-white/5 backdrop-blur-md rounded-xl w-full md:w-auto"
                    >
                        {(['all', 'automation', 'web'] as const).map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg text-[13px] md:text-sm font-medium transition-all duration-300 ${filter === f
                                    ? 'bg-accent text-white shadow-[0_0_15px_rgba(232,67,45,0.4)]'
                                    : 'text-white/60 active:bg-white/10'
                                    }`}
                            >
                                {t(filterLabelKey[f] as Parameters<typeof t>[0])}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Desktop: Grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div
                                    className="group overflow-hidden h-full flex flex-col cursor-pointer rounded-2xl hover:-translate-y-2 transition-transform duration-300"
                                    style={{
                                        background: 'rgba(28, 28, 30, 0.85)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        backdropFilter: 'blur(20px)',
                                    }}
                                >
                                    <div
                                        className="h-48 w-full relative overflow-hidden transition-transform duration-700 group-hover:scale-105 flex items-center justify-center border-b border-white/5"
                                        style={{ background: project.image }}
                                    >
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                                        <ExternalLink className="text-white/0 group-hover:text-white/80 absolute scale-50 group-hover:scale-100 transition-all duration-300 drop-shadow-lg" size={48} />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="text-accent text-xs font-bold uppercase tracking-wider mb-2">
                                            {t(filterLabelKey[project.type] as Parameters<typeof t>[0])}
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                                        <p className="text-white/60 text-sm mb-6 flex-grow">{project.desc}</p>
                                        <div className="mt-auto text-accent text-sm font-semibold flex items-center gap-2 group-hover:translate-x-2 transition-transform rtl:group-hover:-translate-x-2">
                                            {t('btn')} <span>→</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Mobile: Single column cards */}
                <div className="md:hidden space-y-3">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                            >
                                <div
                                    className="rounded-[20px] overflow-hidden active:scale-[0.97] transition-transform duration-150"
                                    style={{
                                        background: 'rgba(28, 28, 30, 0.85)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(40px) saturate(180%)',
                                        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                                        boxShadow: '0 2px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)',
                                    }}
                                >
                                    {/* Thumbnail */}
                                    <div
                                        className="h-[160px] w-full relative flex items-center justify-center"
                                        style={{ background: project.image }}
                                    >
                                        <ExternalLink className="text-white/30" size={48} />
                                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[rgba(28,28,30,0.85)] to-transparent" />
                                    </div>

                                    <div className="p-5">
                                        {/* Tag pills */}
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {project.tags.map((tag, ti) => (
                                                <span
                                                    key={ti}
                                                    className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-accent uppercase tracking-wider"
                                                    style={{
                                                        background: 'rgba(232,67,45,0.12)',
                                                        border: '1px solid rgba(232,67,45,0.25)',
                                                    }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Title + Arrow row */}
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-[17px] font-semibold text-white">{project.title}</h3>
                                                <p className="text-[13px] text-white/50 mt-1 line-clamp-2">{project.desc}</p>
                                            </div>
                                            <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center flex-shrink-0 ml-3 rtl:mr-3 rtl:ml-0">
                                                <ArrowUpRight size={18} className="text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    )
}
