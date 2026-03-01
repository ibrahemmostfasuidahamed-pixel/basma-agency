import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { MarqueeSection } from '@/components/sections/MarqueeSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { HowWeWorkSection } from '@/components/sections/HowWeWorkSection'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CTASection } from '@/components/sections/CTASection'

export default function Home() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <MarqueeSection />
            <ServicesSection />
            <StatsSection />
            <HowWeWorkSection />
            <PortfolioSection />
            <TestimonialsSection />
            <CTASection />
            <Footer />
        </>
    )
}
