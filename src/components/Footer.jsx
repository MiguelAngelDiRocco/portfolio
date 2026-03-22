// Footer del sitio — Copyright, redes y botón volver arriba
import { useTranslation } from 'react-i18next'
import { Linkedin, Github, Twitter, ArrowUp } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="py-8 bg-primary-light dark:bg-primary border-t border-border-light dark:border-border-dark">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
          {t('footer.rights')}
        </p>

        {/* Redes sociales */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/miguelangeldirocco/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-light-secondary dark:text-text-dark-secondary hover:text-accent transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://github.com/MiguelAngelDiRocco"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-light-secondary dark:text-text-dark-secondary hover:text-accent transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="https://x.com/migueldiroccods"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="text-text-light-secondary dark:text-text-dark-secondary hover:text-accent transition-colors"
          >
            <Twitter size={18} />
          </a>
        </div>

        {/* Volver arriba */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 text-sm text-text-light-secondary dark:text-text-dark-secondary hover:text-accent transition-colors"
          aria-label={t('footer.back_to_top')}
        >
          <ArrowUp size={16} />
          {t('footer.back_to_top')}
        </button>
      </div>
    </footer>
  )
}
