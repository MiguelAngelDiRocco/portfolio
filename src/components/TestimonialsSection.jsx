// Sección Recomendaciones — Carrusel de testimonios de LinkedIn
import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight, Linkedin } from 'lucide-react'
import testimonials from '../data/testimonials'

export default function TestimonialsSection() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  // Cantidad visible según breakpoint (1 mobile, 2 desktop)
  const [perPage, setPerPage] = useState(1)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setPerPage(mq.matches ? 2 : 1)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const totalPages = Math.ceil(testimonials.length / perPage)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % totalPages)
  }, [totalPages])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + totalPages) % totalPages)
  }, [totalPages])

  // Auto-rotate cada 6 segundos
  useEffect(() => {
    if (paused || totalPages <= 1) return
    const interval = setInterval(next, 6000)
    return () => clearInterval(interval)
  }, [paused, next, totalPages])

  const visibleTestimonials = testimonials.slice(
    current * perPage,
    current * perPage + perPage
  )

  const anim = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.5, ease: 'easeOut' },
  }

  return (
    <section id="testimonials" className="py-20 bg-primary-light/80 dark:bg-primary/80">
      <motion.div {...anim} className="max-w-[1200px] mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-4">
          {t('testimonials.heading')}
        </h2>
        <p className="text-text-light-secondary dark:text-text-dark-secondary mb-12 max-w-xl">
          {t('testimonials.subtitle')}
        </p>

        {/* Carrusel */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Flechas de navegación */}
          {totalPages > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-secondary-light dark:bg-secondary border border-border-light dark:border-border-dark text-text-light-secondary dark:text-text-dark-secondary hover:text-accent hover:border-accent/50 transition-all"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-secondary-light dark:bg-secondary border border-border-light dark:border-border-dark text-text-light-secondary dark:text-text-dark-secondary hover:text-accent hover:border-accent/50 transition-all"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
            {visibleTestimonials.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-secondary-light dark:bg-secondary rounded-xl border border-border-light dark:border-border-dark p-6 md:p-8"
              >
                {/* Quote icon */}
                <Quote size={28} className="text-accent/30 mb-4" />

                {/* Texto de recomendación */}
                <p className="text-sm md:text-base text-text-light-secondary dark:text-text-dark-secondary leading-relaxed mb-6 italic">
                  &ldquo;{item.text[lang]}&rdquo;
                </p>

                {/* Autor */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-text-light dark:text-text-dark">
                      {item.name}
                    </p>
                    <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                      {item.role[lang]}
                    </p>
                  </div>
                  {item.linkedin && (
                    <a
                      href={item.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-light-secondary dark:text-text-dark-secondary hover:text-accent transition-colors"
                      aria-label={`LinkedIn de ${item.name}`}
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots indicadores */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    i === current
                      ? 'bg-accent scale-110'
                      : 'bg-border-light dark:bg-border-dark hover:bg-accent/50'
                  }`}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
