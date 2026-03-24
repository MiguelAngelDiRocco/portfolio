// Sección Blog — Artículos y publicaciones
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import articles from '../data/articles'

export default function BlogSection() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language

  const anim = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.5, ease: 'easeOut' },
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString(lang === 'es' ? 'es-AR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <section id="blog" className="py-20 bg-secondary-light/40 dark:bg-secondary/40">
      <motion.div {...anim} className="max-w-[1200px] mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-4">
          {t('blog.heading')}
        </h2>
        <p className="text-text-light-secondary dark:text-text-dark-secondary mb-12 max-w-xl">
          {t('blog.subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <motion.a
              key={article.id}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="group block bg-secondary-light dark:bg-secondary rounded-xl border border-border-light dark:border-border-dark p-6 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200"
            >
              {/* Fecha y tags */}
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs text-text-light-secondary dark:text-text-dark-secondary">
                  <Calendar size={12} />
                  {formatDate(article.date)}
                </span>
                {article.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-xs font-mono bg-accent/10 text-accent rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Título */}
              <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2 group-hover:text-accent transition-colors">
                {article.title[lang]}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary leading-relaxed mb-4">
                {article.excerpt[lang]}
              </p>

              {/* Leer más */}
              <span className="inline-flex items-center gap-1.5 text-sm text-accent group-hover:gap-2.5 transition-all">
                {t('blog.read_more')}
                <ArrowRight size={14} />
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
