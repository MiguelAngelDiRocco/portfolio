// ============================================================
// Lista de proyectos — Editá este archivo para agregar los tuyos
// ============================================================

const projects = [
  {
    id: 1,
    name: {
      es: 'Análisis de Sentimiento con NLP y Deep Learning',
      en: 'Sentiment Analysis with NLP and Deep Learning',
    },
    description: {
      es: 'Sistema inteligente de clasificación de sentimiento en reseñas de productos usando técnicas avanzadas de NLP y Deep Learning. El modelo GRU alcanzó un 93.07% de precisión.',
      en: 'Intelligent sentiment classification system for product reviews using advanced NLP and Deep Learning techniques. The GRU model achieved 93.07% accuracy.',
    },
    tech: ['Python', 'TensorFlow', 'Scikit-learn', 'NLTK', 'Pandas'],
    tags: ['NLP', 'Deep Learning'],
    demo: null,
    github: 'https://github.com/MiguelAngelDiRocco/data-science3-final-project',
    image: null,
  },
  {
    id: 2,
    name: {
      es: 'Predicción de PM2.5 con Machine Learning',
      en: 'PM2.5 Prediction with Machine Learning',
    },
    description: {
      es: 'Modelos predictivos para pronosticar niveles de contaminación PM2.5 a nivel global, analizando factores meteorológicos, temporales y socioeconómicos en 190 países.',
      en: 'Predictive models to forecast PM2.5 pollution levels globally, analyzing meteorological, temporal, and socioeconomic factors across 190 countries.',
    },
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Google Colab'],
    tags: ['Machine Learning'],
    demo: null,
    github: 'https://github.com/MiguelAngelDiRocco/data-science2-final-project',
    image: null,
  },
  {
    id: 3,
    name: {
      es: 'Análisis del Mercado de Autos Usados',
      en: 'Used Car Market Analysis',
    },
    description: {
      es: 'Dashboard profesional en Power BI que analiza el mercado de venta de autos usados en Emiratos Árabes, con tendencias, patrones de demanda y oportunidades de negocio.',
      en: 'Professional Power BI dashboard analyzing the used car sales market in the UAE, with trends, demand patterns, and business opportunities.',
    },
    tech: ['Power BI', 'DAX', 'Excel', 'Power Query'],
    tags: ['Data Analysis'],
    demo: null,
    github: 'https://github.com/MiguelAngelDiRocco/data-analytics-final-project',
    image: null,
  },
]

export default projects
