// Barra de navegación fija con toggle de tema e idioma
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useLanguage } from '../hooks/useLanguage'

const navLinks = ['about', 'projects', 'skills', 'blog', 'testimonials', 'contact']

export default function Navbar() {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Detectar scroll para efecto glass
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Detectar sección activa con Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -60% 0px' }
    )

    navLinks.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (id) => {
    setIsOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-primary-light/80 dark:bg-primary/80 backdrop-blur-lg shadow-md'
          : 'bg-transparent'
      }`}
    >
      {/* Corrección: aplicar los colores correctamente */}
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="font-display text-2xl font-bold text-text-light dark:text-text-dark hover:text-accent transition-colors"
        >
          Miguel
        </a>

        {/* Links de navegación — Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((id) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`text-sm font-medium transition-colors ${
                activeSection === id
                  ? 'text-accent'
                  : 'text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light dark:hover:text-text-dark'
              }`}
            >
              {t(`nav.${id}`)}
            </button>
          ))}
        </div>

        {/* Controles: idioma, tema, hamburguesa */}
        <div className="flex items-center gap-3">
          {/* Toggle de idioma */}
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1 text-xs font-mono font-medium rounded-md border border-border-light dark:border-border-dark text-text-light-secondary dark:text-text-dark-secondary hover:text-accent hover:border-accent transition-colors"
            aria-label="Cambiar idioma"
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>

          {/* Toggle de tema */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-text-light-secondary dark:text-text-dark-secondary hover:text-accent transition-colors"
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Botón hamburguesa — Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-text-light-secondary dark:text-text-dark-secondary hover:text-accent transition-colors"
            aria-label="Menú de navegación"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Menú mobile desplegable */}
      {isOpen && (
        <div className="md:hidden bg-primary-light dark:bg-secondary border-t border-border-light dark:border-border-dark">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((id) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className={`text-left text-sm font-medium transition-colors ${
                  activeSection === id
                    ? 'text-accent'
                    : 'text-text-light-secondary dark:text-text-dark-secondary hover:text-text-light dark:hover:text-text-dark'
                }`}
              >
                {t(`nav.${id}`)}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
