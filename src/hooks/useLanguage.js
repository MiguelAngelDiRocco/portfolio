// Hook para manejar el cambio de idioma ES/EN
import { useTranslation } from 'react-i18next'

export function useLanguage() {
  const { i18n } = useTranslation()

  const language = i18n.language

  const toggleLanguage = () => {
    const newLang = language === 'es' ? 'en' : 'es'
    i18n.changeLanguage(newLang)
    localStorage.setItem('language', newLang)
  }

  return { language, toggleLanguage }
}
