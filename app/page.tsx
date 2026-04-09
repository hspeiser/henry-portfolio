import RedesignedHero from "@/components/redesigned-hero"
import AboutSection from "@/components/about-section"
import RedesignedProjects from "@/components/redesigned-projects"
import ContactForm from "@/components/contact-form"
import EnhancedFooter from "@/components/enhanced-footer"
import FloatingNav from "@/components/floating-nav"

export default function Home() {
  return (
    <main className="min-h-screen bg-background w-full">
      <FloatingNav />
      <RedesignedHero />
      <RedesignedProjects />
      <AboutSection />
      <ContactForm />
      <EnhancedFooter />
    </main>
  )
}
