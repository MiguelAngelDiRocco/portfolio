// ============================================================
// Lista de habilidades — Editá este archivo para agregar las tuyas
// ============================================================

import {
  SiPython,
  SiPostgresql,
  SiScikitlearn,
  SiTensorflow,
  SiKeras,
  SiPandas,
  SiNumpy,
  SiGit,
  SiGithub,
  SiJupyter,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import { MatplotlibIcon, SeabornIcon, NltkIcon } from '../components/icons/CustomIcons'

const skills = [
  {
    category: 'languages',
    items: [
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'SQL', icon: SiPostgresql, color: '#4169E1' },
    ],
  },
  {
    category: 'libraries',
    items: [
      { name: 'Scikit-learn', icon: SiScikitlearn, color: '#F7931E' },
      { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
      { name: 'Keras', icon: SiKeras, color: '#D00000' },
      { name: 'Pandas', icon: SiPandas, color: '#150458' },
      { name: 'NumPy', icon: SiNumpy, color: '#013243' },
      { name: 'Matplotlib', icon: MatplotlibIcon, color: '#11557C' },
      { name: 'Seaborn', icon: SeabornIcon, color: '#444CB7' },
      { name: 'NLTK', icon: NltkIcon, color: '#154F5B' },
    ],
  },
  {
    category: 'tools',
    items: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#8B949E' },
      { name: 'VS Code', icon: VscVscode, color: '#007ACC' },
      { name: 'Jupyter Notebook', icon: SiJupyter, color: '#F37626' },
    ],
  },
]

export default skills
