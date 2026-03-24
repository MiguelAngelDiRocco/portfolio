// Componente principal — Ensambla todas las secciones del portfolio
import DynamicMeta from './components/DynamicMeta'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import SkillsSection from './components/SkillsSection'
import BlogSection from './components/BlogSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import DataScienceBackground from './components/DataScienceBackground'

export default function App() {
  return (
    <div className="relative min-h-screen bg-primary-light dark:bg-primary">
      {/* Fondo animado global fijo */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <DataScienceBackground />
      </div>

      {/* Contenido */}
      <div className="relative z-10">
        <DynamicMeta />
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <BlogSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
