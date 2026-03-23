// Sección Contacto — Formulario con Formspree y links sociales
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Send, Linkedin, Github, Mail, Copy, Check } from 'lucide-react'

const CONTACT_EMAIL = 'migueldirocco.ds@gmail.com'

export default function ContactSection() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [copied, setCopied] = useState(false)
  const [errors, setErrors] = useState({})
  const [lastSubmit, setLastSubmit] = useState(0)

  const anim = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.5, ease: 'easeOut' },
  }

  // Validación en tiempo real
  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = true
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = true
    if (!formData.message.trim()) newErrors.message = true
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    // Rate limiting — 30 segundos entre envíos
    const now = Date.now()
    if (now - lastSubmit < 30000) return
    setLastSubmit(now)

    setStatus('sending')
    try {
      const formspreeId = import.meta.env.VITE_FORMSPREE_ID
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)

      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: controller.signal,
      })
      clearTimeout(timeout)

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-20 bg-secondary-light/50 dark:bg-secondary/50">
      <motion.div {...anim} className="max-w-[1200px] mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-4">
          {t('contact.heading')}
        </h2>
        <p className="text-text-light-secondary dark:text-text-dark-secondary mb-12 max-w-xl">
          {t('contact.subtitle')}
        </p>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Formulario — 3 columnas */}
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5" noValidate>
            {/* Campo Nombre */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-light dark:text-text-dark mb-1.5">
                {t('contact.name_label')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contact.name_placeholder')}
                className={`w-full px-4 py-3 rounded-lg bg-secondary-light dark:bg-secondary border text-text-light dark:text-text-dark placeholder:text-text-light-secondary/50 dark:placeholder:text-text-dark-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors ${
                  errors.name ? 'border-red-500' : 'border-border-light dark:border-border-dark'
                }`}
              />
            </div>

            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-light dark:text-text-dark mb-1.5">
                {t('contact.email_label')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contact.email_placeholder')}
                className={`w-full px-4 py-3 rounded-lg bg-secondary-light dark:bg-secondary border text-text-light dark:text-text-dark placeholder:text-text-light-secondary/50 dark:placeholder:text-text-dark-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors ${
                  errors.email ? 'border-red-500' : 'border-border-light dark:border-border-dark'
                }`}
              />
            </div>

            {/* Campo Mensaje */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-light dark:text-text-dark mb-1.5">
                {t('contact.message_label')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact.message_placeholder')}
                className={`w-full px-4 py-3 rounded-lg bg-secondary-light dark:bg-secondary border text-text-light dark:text-text-dark placeholder:text-text-light-secondary/50 dark:placeholder:text-text-dark-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors resize-none ${
                  errors.message ? 'border-red-500' : 'border-border-light dark:border-border-dark'
                }`}
              />
            </div>

            {/* Botón Enviar */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-hover hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <Send size={16} />
              {status === 'sending' ? t('contact.sending') : t('contact.send')}
            </button>

            {/* Mensajes de estado */}
            {status === 'success' && (
              <p className="text-green-500 text-sm mt-2">{t('contact.success')}</p>
            )}
            {status === 'error' && (
              <p className="text-red-500 text-sm mt-2">
                {t('contact.error')} {CONTACT_EMAIL}
              </p>
            )}
          </form>

          {/* Info de contacto — 2 columnas */}
          <div className="md:col-span-2">
            <div className="bg-secondary-light dark:bg-secondary rounded-xl border border-border-light dark:border-border-dark p-6 space-y-5">
              {/* Email con copia */}
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-accent shrink-0" />
                <span className="text-sm text-text-light dark:text-text-dark break-all">
                  {CONTACT_EMAIL}
                </span>
                <button
                  onClick={copyEmail}
                  className="ml-auto p-1.5 rounded-md text-text-light-secondary dark:text-text-dark-secondary hover:text-accent transition-colors"
                  aria-label={t('contact.copy_email')}
                >
                  {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Redes sociales */}
              <div className="pt-4 border-t border-border-light dark:border-border-dark space-y-3">
                <a
                  href="https://www.linkedin.com/in/miguelangeldirocco/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-text-light-secondary dark:text-text-dark-secondary hover:text-accent transition-colors"
                >
                  <Linkedin size={18} />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/MiguelAngelDiRocco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-text-light-secondary dark:text-text-dark-secondary hover:text-accent transition-colors"
                >
                  <Github size={18} />
                  GitHub
                </a>
                <a
                  href="mailto:migueldirocco.ds@gmail.com"
                  className="flex items-center gap-3 text-sm text-text-light-secondary dark:text-text-dark-secondary hover:text-accent transition-colors"
                >
                  <Mail size={18} />
                  Contacto
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
