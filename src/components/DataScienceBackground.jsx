import { useEffect, useRef } from 'react'

const ACCENT_RGB = '99, 102, 241'
const LINK_DISTANCE = 150
const MOBILE_BP = 768

const SYMBOLS = ['σ', 'μ', 'Σ', '∫', 'π', 'λ', '∂', '∇', '01', '{}', '</>']

function createParticles(w, h, count) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    r: 1 + Math.random() * 2,
    opacity: 0.15 + Math.random() * 0.25,
  }))
}

function createSymbols(w, h, count) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    char: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    size: 12 + Math.random() * 8,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.004,
    phase: Math.random() * Math.PI * 2,
  }))
}

export default function DataScienceBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let rafId = null
    let particles = []
    let symbols = []
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    function resize() {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w
      canvas.height = h
      const mobile = w < MOBILE_BP
      particles = createParticles(w, h, mobile ? 30 : 60)
      symbols = createSymbols(w, h, mobile ? 5 : 10)
    }

    function animate(ts) {
      const { width: w, height: h } = canvas
      ctx.clearRect(0, 0, w, h)

      // --- Layer 1: Move & draw particles ---
      if (!reducedMotion) {
        for (const p of particles) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0) p.x = w
          if (p.x > w) p.x = 0
          if (p.y < 0) p.y = h
          if (p.y > h) p.y = 0
        }
      }

      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ACCENT_RGB}, ${p.opacity})`
        ctx.fill()
      }

      // --- Layer 2: Connection lines ---
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distSq = dx * dx + dy * dy
          if (distSq < LINK_DISTANCE * LINK_DISTANCE) {
            const d = Math.sqrt(distSq)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${ACCENT_RGB}, ${(0.15 * (1 - d / LINK_DISTANCE)).toFixed(3)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // --- Layer 3: Floating symbols ---
      for (const s of symbols) {
        if (!reducedMotion) {
          s.x += s.vx
          s.y += s.vy
          s.rotation += s.rotSpeed
          if (s.x < -30) s.x = w + 30
          if (s.x > w + 30) s.x = -30
          if (s.y < -30) s.y = h + 30
          if (s.y > h + 30) s.y = -30
        }
        const opacity = 0.1 + 0.05 * Math.sin((ts || 0) * 0.001 + s.phase)
        ctx.save()
        ctx.translate(s.x, s.y)
        ctx.rotate(s.rotation)
        ctx.font = `${s.size}px "JetBrains Mono", monospace`
        ctx.fillStyle = `rgba(${ACCENT_RGB}, ${opacity.toFixed(3)})`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(s.char, 0, 0)
        ctx.restore()
      }

      if (!reducedMotion) {
        rafId = requestAnimationFrame(animate)
      }
    }

    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    resize()
    if (reducedMotion) {
      animate(0)
    } else {
      rafId = requestAnimationFrame(animate)
    }

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0"
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}
