// Sección Proyectos — Grid de tarjetas con filtros por tag
import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Folder } from 'lucide-react'
import projects from '../data/projects'

export default function ProjectsSection() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const [activeTag, setActiveTag] = useState('all')
  const [showAll, setShowAll] = useState(false)

  // Extraer todos los tags únicos
  const allTags = useMemo(() => {
    const tags = new Set()
    projects.forEach((p) => p.tags?.forEach((tag) => tags.add(tag)))
    return ['all', ...Array.from(tags)]
  }, [])

  // Filtrar proyectos por tag activo
  const filteredProjects = activeTag === 'all'
    ? projects
    : projects.filter((p) => p.tags?.includes(activeTag))

  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6)

  const containerAnim = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.5, ease: 'easeOut' },
  }

  return (
    <section id="projects" className="py-20 bg-secondary-light/50 dark:bg-secondary/50">
      <motion.div {...containerAnim} className="max-w-[1200px] mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-8">
          {t('projects.heading')}
        </h2>

        {/* Filtros por tag */}
        <div className="flex flex-wrap gap-2 mb-10">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => { setActiveTag(tag); setShowAll(false) }}
              className={`px-4 py-1.5 text-sm font-mono rounded-full border transition-all duration-200 ${
                activeTag === tag
                  ? 'bg-accent text-white border-accent'
                  : 'border-border-light dark:border-border-dark text-text-light-secondary dark:text-text-dark-secondary hover:border-accent/50 hover:text-accent'
              }`}
            >
              {tag === 'all' ? t('projects.filter_all') : tag}
            </button>
          ))}
        </div>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group bg-secondary-light dark:bg-secondary rounded-xl border border-border-light dark:border-border-dark p-6 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200"
              >
                {/* Ícono o imagen del proyecto */}
                <div className="mb-4">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.name[lang]}
                      className="w-full h-40 object-cover rounded-lg"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                      <Folder size={20} />
                    </div>
                  )}
                </div>

                {/* Nombre */}
                <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">
                  {project.name[lang]}
                </h3>

                {/* Descripción */}
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mb-4 leading-relaxed">
                  {project.description[lang]}
                </p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono bg-accent/10 text-accent rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 mt-auto">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover transition-colors"
                    >
                      <ExternalLink size={14} />
                      {t('projects.view_demo')}
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-text-light-secondary dark:text-text-dark-secondary hover:text-accent transition-colors"
                  >
                    <Github size={14} />
                    {t('projects.view_code')}
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Botón Ver más */}
        {filteredProjects.length > 6 && !showAll && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 border border-accent text-accent font-medium rounded-lg hover:bg-accent/10 transition-all duration-200"
            >
              {t('projects.show_more')}
            </button>
          </div>
        )}
      </motion.div>
    </section>
  )
}
