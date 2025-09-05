import HeroSection from '@/components/sections/HeroSection'
import FeaturedProperties from '@/components/sections/FeaturedProperties'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProperties />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </div>
  )
}
