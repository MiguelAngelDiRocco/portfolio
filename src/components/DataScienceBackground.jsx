import { useMemo } from 'react'

const SYMBOLS = ['σ', 'μ', 'Σ', '∫', 'π', 'λ', '∂', '∇', '01', '{}', '</>']
const DRIFT_ANIMS = ['ds-drift-1', 'ds-drift-2', 'ds-drift-3']

function rand(min, max) {
  return Math.random() * (max - min) + min
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function DataScienceBackground() {
  const { particles, symbols } = useMemo(() => {
    const p = Array.from({ length: 35 }, (_, i) => ({
      id: `p-${i}`,
      left: `${rand(0, 100)}%`,
      top: `${rand(0, 100)}%`,
      size: rand(2, 5),
      opacity: rand(0.1, 0.35),
      anim: pick(DRIFT_ANIMS),
      duration: `${rand(25, 50)}s`,
      delay: `${-rand(0, 25)}s`,
      pulseMin: rand(0.05, 0.15),
      pulseMax: rand(0.2, 0.4),
      pulseDur: `${rand(4, 8)}s`,
      pulseDelay: `${-rand(0, 6)}s`,
    }))

    const s = Array.from({ length: 10 }, (_, i) => ({
      id: `s-${i}`,
      char: pick(SYMBOLS),
      left: `${rand(5, 95)}%`,
      top: `${rand(5, 95)}%`,
      size: rand(14, 22),
      anim: pick(DRIFT_ANIMS),
      duration: `${rand(30, 60)}s`,
      delay: `${-rand(0, 30)}s`,
      pulseMin: rand(0.04, 0.08),
      pulseMax: rand(0.1, 0.18),
      pulseDur: `${rand(5, 10)}s`,
      pulseDelay: `${-rand(0, 8)}s`,
    }))

    return { particles: p, symbols: s }
  }, [])

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      {/* Scatter plot dots */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="ds-particle absolute rounded-full bg-accent"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            '--ds-o-min': p.pulseMin,
            '--ds-o-max': p.pulseMax,
            animation: `${p.anim} ${p.duration} ${p.delay} ease-in-out infinite, ds-pulse ${p.pulseDur} ${p.pulseDelay} ease-in-out infinite`,
          }}
        />
      ))}

      {/* Math / data science symbols */}
      {symbols.map((s) => (
        <span
          key={s.id}
          className="ds-symbol absolute font-mono text-accent select-none"
          style={{
            left: s.left,
            top: s.top,
            fontSize: `${s.size}px`,
            '--ds-o-min': s.pulseMin,
            '--ds-o-max': s.pulseMax,
            animation: `${s.anim} ${s.duration} ${s.delay} ease-in-out infinite, ds-pulse ${s.pulseDur} ${s.pulseDelay} ease-in-out infinite`,
          }}
        >
          {s.char}
        </span>
      ))}
    </div>
  )
}
