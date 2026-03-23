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
      { name: 'Python', icon: SiPython },
      { name: 'SQL', icon: SiPostgresql },
    ],
  },
  {
    category: 'libraries',
    items: [
      { name: 'Scikit-learn', icon: SiScikitlearn },
      { name: 'TensorFlow', icon: SiTensorflow },
      { name: 'Keras', icon: SiKeras },
      { name: 'Pandas', icon: SiPandas },
      { name: 'NumPy', icon: SiNumpy },
      { name: 'Matplotlib', icon: MatplotlibIcon },
      { name: 'Seaborn', icon: SeabornIcon },
      { name: 'NLTK', icon: NltkIcon },
    ],
  },
  {
    category: 'tools',
    items: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'VS Code', icon: VscVscode },
      { name: 'Jupyter Notebook', icon: SiJupyter },
    ],
  },
]

export default skills
