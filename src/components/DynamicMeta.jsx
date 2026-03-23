// Componente que actualiza meta tags dinámicamente según el idioma
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const meta = {
  es: {
    title: 'Miguel Angel Di Rocco | Data Scientist Portfolio',
    description: 'Portfolio profesional de Miguel Angel Di Rocco, Data Scientist especializado en Python, Machine Learning, Deep Learning y NLP. Proyectos, habilidades y contacto.',
    ogDescription: 'Data Scientist especializado en Python, Machine Learning y Analytics.',
  },
  en: {
    title: 'Miguel Angel Di Rocco | Data Scientist Portfolio',
    description: 'Professional portfolio of Miguel Angel Di Rocco, Data Scientist specializing in Python, Machine Learning, Deep Learning, and NLP. Projects, skills, and contact.',
    ogDescription: 'Data Scientist specializing in Python, Machine Learning, and Analytics.',
  },
}

export default function DynamicMeta() {
  const { i18n } = useTranslation()
  const lang = i18n.language === 'en' ? 'en' : 'es'

  useEffect(() => {
    const m = meta[lang]
    document.documentElement.lang = lang
    document.title = m.title

    const setMeta = (selector, content) => {
      const el = document.querySelector(selector)
      if (el) el.setAttribute('content', content)
    }

    setMeta('meta[name="description"]', m.description)
    setMeta('meta[property="og:title"]', m.title)
    setMeta('meta[property="og:description"]', m.ogDescription)
    setMeta('meta[name="twitter:title"]', m.title)
    setMeta('meta[name="twitter:description"]', m.ogDescription)
  }, [lang])

  return null
}
