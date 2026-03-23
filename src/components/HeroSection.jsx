// Sección Hero — Primera impresión del sitio
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Linkedin, Github, Mail } from 'lucide-react'
import useTypingEffect from '../hooks/useTypingEffect'

export default function HeroSection() {
  const { t, i18n } = useTranslation()

  const typingWords = i18n.language === 'en'
    ? ['Data Scientist', 'Machine Learning', 'Deep Learning', 'NLP']
    : ['Data Scientist', 'Machine Learning', 'Deep Learning', 'NLP']

  const typedText = useTypingEffect(typingWords)

  // Animación staggered para elementos del hero
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
    },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Fondo con mesh gradient sutil */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-primary-light dark:bg-primary" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-[1200px] mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12"
      >
        {/* Foto de perfil */}
        <motion.div variants={fadeUp} className="shrink-0">
          <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden">
            <img
              src="/profile.jpg"
              alt={t('hero.name')}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </motion.div>

        {/* Texto y CTAs */}
        <div className="text-center md:text-left">
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-light dark:text-text-dark leading-tight"
          >
            {t('hero.name')}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-3 font-mono text-sm md:text-base text-accent"
          >
            <span>{typedText}</span>
            <span className="animate-pulse">|</span>
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-base md:text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-xl"
          >
            {t('hero.tagline')}
          </motion.p>

          {/* Botones CTA */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-hover hover:scale-105 transition-all duration-200"
            >
              {t('hero.cta_projects')}
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-6 py-3 border border-accent text-accent font-medium rounded-lg hover:bg-accent/10 hover:scale-105 transition-all duration-200"
            >
              {t('hero.cta_contact')}
            </a>
          </motion.div>

          {/* Redes sociales */}
          <motion.div variants={fadeUp} className="mt-6 flex gap-4 justify-center md:justify-start">
            <a
              href="https://www.linkedin.com/in/miguelangeldirocco/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-md text-text-light-secondary dark:text-text-dark-secondary hover:text-accent transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/MiguelAngelDiRocco"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-md text-text-light-secondary dark:text-text-dark-secondary hover:text-accent transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="mailto:migueldirocco.ds@gmail.com"
              aria-label="Email"
              className="p-2 rounded-md text-text-light-secondary dark:text-text-dark-secondary hover:text-accent transition-colors"
            >
              <Mail size={20} />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
