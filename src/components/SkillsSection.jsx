// Sección Habilidades — Grid de íconos agrupados por categoría
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import skills from '../data/skills'

export default function SkillsSection() {
  const { t } = useTranslation()

  const anim = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.5, ease: 'easeOut' },
  }

  return (
    <section id="skills" className="py-20 bg-primary-light dark:bg-primary">
      <motion.div {...anim} className="max-w-[1200px] mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-12">
          {t('skills.heading')}
        </h2>

        <div className="space-y-10">
          {skills.map((group) => (
            <div key={group.category}>
              {/* Subtítulo de categoría */}
              <h3 className="text-sm font-mono font-medium text-accent uppercase tracking-wider mb-5">
                {t(`skills.${group.category}`)}
              </h3>

              {/* Grid de skills */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {group.items.map((skill) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    title={skill.name}
                    className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary-light dark:bg-secondary border border-border-light dark:border-border-dark hover:border-accent/50 hover:-translate-y-1 transition-all duration-200 cursor-default"
                  >
                    <span className="text-2xl" role="img" aria-label={skill.name}>
                      {skill.icon}
                    </span>
                    <span className="text-xs font-medium text-text-light-secondary dark:text-text-dark-secondary group-hover:text-text-light dark:group-hover:text-text-dark text-center transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
