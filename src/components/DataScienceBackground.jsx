import { useMemo } from 'react'

const SYMBOLS = ['σ', 'μ', 'Σ', '∫', 'π', 'λ', '∂', '∇', '01', '{}', '</>', 'f(x)', '∞', 'Δ', '≈']
const DRIFT_ANIMS = ['ds-drift-1', 'ds-drift-2', 'ds-drift-3']

function rand(min, max) {
  return Math.random() * (max - min) + min
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function DataScienceBackground() {
  const { particles, symbols } = useMemo(() => {
    const p = Array.from({ length: 50 }, (_, i) => ({
      id: `p-${i}`,
      left: `${rand(2, 98)}%`,
      top: `${rand(2, 98)}%`,
      size: rand(4, 8),
      opacity: rand(0.3, 0.7),
      anim: pick(DRIFT_ANIMS),
      duration: `${rand(20, 45)}s`,
      delay: `${-rand(0, 25)}s`,
    }))

    const s = Array.from({ length: 18 }, (_, i) => ({
      id: `s-${i}`,
      char: pick(SYMBOLS),
      left: `${rand(5, 95)}%`,
      top: `${rand(5, 95)}%`,
      size: rand(20, 36),
      opacity: rand(0.15, 0.4),
      anim: pick(DRIFT_ANIMS),
      duration: `${rand(25, 55)}s`,
      delay: `${-rand(0, 30)}s`,
    }))

    return { particles: p, symbols: s }
  }, [])

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="ds-particle"
          style={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            backgroundColor: 'var(--color-accent)',
            opacity: p.opacity,
            animation: `${p.anim} ${p.duration} ${p.delay} ease-in-out infinite`,
          }}
        />
      ))}

      {symbols.map((s) => (
        <span
          key={s.id}
          className="ds-symbol"
          style={{
            position: 'absolute',
            left: s.left,
            top: s.top,
            fontSize: `${s.size}px`,
            fontFamily: '"JetBrains Mono", monospace',
            color: 'var(--color-accent)',
            opacity: s.opacity,
            userSelect: 'none',
            animation: `${s.anim} ${s.duration} ${s.delay} ease-in-out infinite`,
          }}
        >
          {s.char}
        </span>
      ))}
    </div>
  )
}
