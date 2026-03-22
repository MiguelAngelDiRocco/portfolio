# Portfolio Web — Miguel | Data Scientist

Portfolio personal SPA bilingüe (ES/EN) con modo oscuro/claro.

## Stack

- **React + Vite** — Framework y bundler
- **Tailwind CSS v4** — Estilos utilitarios
- **Framer Motion** — Animaciones
- **i18next** — Internacionalización (ES/EN)
- **Lucide React** — Íconos

## Instalación

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Build para producción

```bash
npm run build
npm run preview  # para previsualizar el build
```

## Deploy en Vercel

1. Subí el proyecto a un repositorio de GitHub
2. Conectá el repo en [vercel.com](https://vercel.com)
3. Vercel detecta automáticamente que es un proyecto Vite y configura el build

## Personalización

### Datos personales

Reemplazá los placeholders en los siguientes archivos:

- **`src/locales/es.json`** y **`src/locales/en.json`** — Textos del sitio (buscar `[Miguel Angel Di Rocco]`, `[Científico de datos | Creando modelos de aprendizaje automático con Python | Transformando datos en conocimiento | Apasionado por los datos y la inteligencia artificial]`, `[Data Scientist | Building ML models with Python | Transforming data into insights | Passionate about Data & Artificial Intelligence]`)
- **`src/components/HeroSection.jsx`** — URLs de redes sociales (`[https://www.linkedin.com/in/miguelangeldirocco/]`, `[https://github.com/MiguelAngelDiRocco]`, `[https://x.com/migueldiroccods]`)
- **`src/components/ContactSection.jsx`** — Email de contacto (`[migueldirocco.ds@gmail.com]`) y URLs de redes
- **`src/components/Footer.jsx`** — URLs de redes sociales
- **`.env`** — ID de Formspree (`[VITE_FORMSPREE_ID=xdawrnzn]`)

### Archivos a proveer

- **`public/profile.jpg`** — Foto de perfil
- **`public/cv-miguel.pdf`** — CV descargable
- **`public/projects/`** — Imágenes de proyectos (opcional)

### Agregar proyectos

Editá `src/data/projects.js` — cada proyecto es un objeto con nombre, descripción (en ES/EN), tecnologías, y links.

### Agregar habilidades

Editá `src/data/skills.js` — cada categoría tiene un array de skills con nombre e ícono.

### Formulario de contacto

1. Creá una cuenta en [Formspree](https://formspree.io)
2. Creá un formulario nuevo y copiá el ID
3. Pegá el ID en `.env` como `VITE_FORMSPREE_ID=tu_id_aqui`
