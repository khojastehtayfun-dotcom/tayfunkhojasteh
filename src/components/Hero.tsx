'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './Hero.module.css'

// ─── Particle system ────────────────────────────────────────────────────────
// Each "shard" starts at the centre and flies outward as the user scrolls.
// This is the same mechanic as the exploding‑igloo effect — swap the canvas
// art for any 3‑D asset later without touching the scroll logic.

interface Shard {
  x: number; y: number         // current position (px, relative to canvas centre)
  tx: number; ty: number       // target position at full explosion
  size: number
  opacity: number
  angle: number
  spin: number
}

function buildShards(count: number): Shard[] {
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2
    const dist  = 200 + Math.random() * 600
    return {
      x: 0, y: 0,
      tx: Math.cos(angle) * dist,
      ty: Math.sin(angle) * dist,
      size: 4 + Math.random() * 18,
      opacity: 0.15 + Math.random() * 0.7,
      angle: Math.random() * 360,
      spin:  (Math.random() - 0.5) * 720,
    }
  })
}

export default function Hero() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const shardsRef  = useRef<Shard[]>(buildShards(120))
  const progressRef = useRef(0)

  const { scrollYProgress } = useScroll()

  // Drive the canvas animation from scroll progress
  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      progressRef.current = Math.min(v * 3, 1) // full explosion by 33 % scroll
    })
    return unsub
  }, [scrollYProgress])

  // Canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number

    function resize() {
      canvas!.width  = canvas!.offsetWidth
      canvas!.height = canvas!.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function draw() {
      const { width, height } = canvas!
      const cx = width  / 2
      const cy = height / 2
      const p  = progressRef.current

      ctx.clearRect(0, 0, width, height)

      // ── Central glyph (TK monogram) ──────────────────────────────────────
      const glyphAlpha = 1 - p * 1.5
      if (glyphAlpha > 0) {
        ctx.save()
        ctx.globalAlpha = Math.max(0, glyphAlpha)
        ctx.font = `bold ${Math.round(width * 0.18)}px 'Bebas Neue', sans-serif`
        ctx.textAlign    = 'center'
        ctx.textBaseline = 'middle'

        // Chrome gradient on the letter
        const grad = ctx.createLinearGradient(cx, cy - 80, cx, cy + 80)
        grad.addColorStop(0,   '#ffffff')
        grad.addColorStop(0.4, '#c8c8c8')
        grad.addColorStop(1,   '#505050')
        ctx.fillStyle = grad
        ctx.fillText('TK', cx, cy)

        // Subtle glow ring
        const ring = ctx.createRadialGradient(cx, cy, 40, cx, cy, 220)
        ring.addColorStop(0,   'rgba(200,200,200,0.12)')
        ring.addColorStop(1,   'rgba(0,0,0,0)')
        ctx.fillStyle = ring
        ctx.beginPath()
        ctx.arc(cx, cy, 220, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // ── Shards ────────────────────────────────────────────────────────────
      for (const s of shardsRef.current) {
        const sx = cx + s.tx * p
        const sy = cy + s.ty * p
        const a  = s.opacity * (p < 0.05 ? p / 0.05 : 1) // fade in at start

        ctx.save()
        ctx.globalAlpha  = a * (1 - p * 0.4)
        ctx.translate(sx, sy)
        ctx.rotate(((s.angle + s.spin * p) * Math.PI) / 180)

        // Chrome shard
        const sg = ctx.createLinearGradient(-s.size, -s.size, s.size, s.size)
        sg.addColorStop(0,   '#e8e8e8')
        sg.addColorStop(0.5, '#808080')
        sg.addColorStop(1,   '#303030')
        ctx.fillStyle = sg
        ctx.fillRect(-s.size / 2, -s.size / 2, s.size, s.size * 0.4)
        ctx.restore()
      }

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // Text reveal based on scroll
  const nameY     = useTransform(scrollYProgress, [0, 0.15], [0,  -60])
  const nameOp    = useTransform(scrollYProgress, [0, 0.25], [1,   0])
  const subtitleY = useTransform(scrollYProgress, [0, 0.15], [0,  -40])
  const subtitleOp = useTransform(scrollYProgress, [0.0, 0.2], [1,  0])

  return (
    <section className={styles.hero}>
      {/* Particle canvas */}
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Overlay text */}
      <div className={styles.overlay}>
        <motion.h1
          className={styles.name}
          style={{ y: nameY, opacity: nameOp }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Tayfun<br />Khojasteh
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          style={{ y: subtitleY, opacity: subtitleOp }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Entrepreneur &nbsp;·&nbsp; Investor &nbsp;·&nbsp; Multi-CEO
        </motion.p>

        <motion.div
          className={styles.scrollHint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className={styles.scrollLine} />
          <span className={styles.scrollLabel}>scroll</span>
        </motion.div>
      </div>
    </section>
  )
}
