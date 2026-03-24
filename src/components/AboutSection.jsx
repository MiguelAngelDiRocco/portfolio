// Sección Sobre mí — Bio y datos rápidos
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { MapPin, Briefcase, Languages, Lightbulb, Download, GraduationCap } from 'lucide-react'

// Hook para animación al entrar en viewport
function useSectionAnimation() {
  return {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.5, ease: 'easeOut' },
  }
}

export default function AboutSection() {
  const { t } = useTranslation()
  const anim = useSectionAnimation()

  const { i18n } = useTranslation()

  const quickFacts = [
    { icon: <MapPin size={18} />, label: t('about.location') },
    { icon: <Briefcase size={18} />, label: t('about.availability') },
    { icon: <GraduationCap size={18} />, label: t('about.education') },
    { icon: <Languages size={18} />, label: t('about.languages') },
    { icon: <Lightbulb size={18} />, label: t('about.interests') },
  ]

  // Descargar CV en el idioma activo
  const cvFile = i18n.language === 'en' ? '/CV_MiguelDiRocco_EN.pdf' : '/CV_MiguelDiRocco_ES.pdf'

  return (
    <section id="about" className="py-20 bg-primary-light/80 dark:bg-primary/80">
      <motion.div {...anim} className="max-w-[1200px] mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-12">
          {t('about.heading')}
        </h2>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Bio — ocupa 3 columnas */}
          <div className="md:col-span-3 space-y-4 text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
            <p>{t('about.bio_1')}</p>
            <p>{t('about.bio_2')}</p>
            <p>{t('about.bio_3')}</p>
          </div>

          {/* Datos rápidos — ocupa 2 columnas */}
          <div className="md:col-span-2">
            <div className="bg-secondary-light dark:bg-secondary rounded-xl border border-border-light dark:border-border-dark p-6 space-y-5">
              {quickFacts.map((fact, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-accent">{fact.icon}</span>
                  <span className="text-sm text-text-light dark:text-text-dark">
                    {fact.label}
                  </span>
                </div>
              ))}

              {/* Botón descargar CV */}
              <a
                href={cvFile}
                download
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover hover:scale-105 transition-all duration-200"
              >
                <Download size={16} />
                {t('about.download_cv')}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
