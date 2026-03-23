import { useRef, useEffect } from 'react'

const LINK_DISTANCE = 120
const PARTICLE_COUNT_DESKTOP = 80
const PARTICLE_COUNT_MOBILE = 40
const MOBILE_BREAKPOINT = 768

const PALETTE = {
  dark: { dot: 'rgba(255,255,255,0.75)', line: '255,255,255' },
  light: { dot: 'rgba(99,102,241,0.6)', line: '99,102,241' },
}

function initParticles(w, h, count) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    radius: 1.5 + Math.random(),
  }))
}

export default function ParticlesCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []
    let rafId = null
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function isDark() {
      return document.documentElement.classList.contains('dark')
    }

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const count =
        canvas.width < MOBILE_BREAKPOINT ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP
      particles = initParticles(canvas.width, canvas.height, count)
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const p = isDark() ? PALETTE.dark : PALETTE.light

      if (!reducedMotion) {
        for (const pt of particles) {
          pt.x += pt.vx
          pt.y += pt.vy
          if (pt.x < 0 || pt.x > canvas.width) pt.vx *= -1
          if (pt.y < 0 || pt.y > canvas.height) pt.vy *= -1
        }
      }

      // Draw lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < LINK_DISTANCE) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${p.line},${((1 - dist / LINK_DISTANCE) * 0.4).toFixed(2)})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Draw dots
      for (const pt of particles) {
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.dot
        ctx.fill()
      }

      if (!reducedMotion) rafId = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(() => {
      resize()
      draw()
    })
    ro.observe(canvas)

    resize()
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}
