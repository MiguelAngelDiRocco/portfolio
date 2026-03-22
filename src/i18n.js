// Configuración de i18next para internacionalización ES/EN
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import es from './locales/es.json'
import en from './locales/en.json'

// Obtener idioma guardado o usar español por defecto
const savedLanguage = localStorage.getItem('language') || 'es'

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: savedLanguage,
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
