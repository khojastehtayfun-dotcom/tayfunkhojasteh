'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './Hero.module.css'

interface Shard {
  tx: number; ty: number
  size: number; opacity: number
  angle: number; spin: number
}

function buildShards(count: number): Shard[] {
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2
    const dist  = 200 + Math.random() * 600
    return {
      tx: Math.cos(angle) * dist,
      ty: Math.sin(angle) * dist,
      size: 4 + Math.random() * 18,
      opacity: 0.15 + Math.random() * 0.7,
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 720,
    }
  })
}

export default function Hero() {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const shardsRef   = useRef<Shard[]>(buildShards(120))
  const progressRef = useRef(0)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      progressRef.current = Math.min(v * 3, 1)
    })
    return unsub
  }, [scrollYProgress])

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
      const cx = width / 2
      const cy = height / 2
      const p  = progressRef.current

      ctx.clearRect(0, 0, width, height)

      for (const s of shardsRef.current) {
        const sx = cx + s.tx * p
        const sy = cy + s.ty * p
        const a  = s.opacity * (p < 0.05 ? p / 0.05 : 1)
        ctx.save()
        ctx.globalAlpha = a * (1 - p * 0.4)
        ctx.translate(sx, sy)
        ctx.rotate(((s.angle + s.spin * p) * Math.PI) / 180)
        const sg = ctx.createLinearGradient(-s.size, -s.size, s.size, s.size)
        sg.addColorStop(0,   '#e8e8e8')
        sg.addColorStop(0.5, '#c9a84c')
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

  const centerOp = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const centerY  = useTransform(scrollYProgress, [0, 0.2], [0, -40])
  const scrollOp = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  return (
    <section className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.overlay}>
        <motion.div
          className={styles.center}
          style={{ opacity: centerOp, y: centerY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src="/images/Tayfun Logo.png" alt="TK" className={styles.logo} />
          <div className={styles.divider} />
          <h1 className={styles.name}>Tayfun Khojasteh</h1>
          <p className={styles.subtitle}>Entrepreneur &nbsp;·&nbsp; Investor &nbsp;·&nbsp; Multi-CEO</p>
        </motion.div>

        <motion.div
          className={styles.scrollHint}
          style={{ opacity: scrollOp }}
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