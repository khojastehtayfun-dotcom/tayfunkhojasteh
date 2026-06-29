'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './Hero.module.css'

interface Building {
  x: number
  width: number
  height: number
  floors: number
  windowCols: number
  style: 'glass' | 'grid' | 'stripe'
  seed: number
  depth: number
}

function generateCity(count: number, canvasWidth: number): Building[] {
  const buildings: Building[] = []
  const totalWidth = canvasWidth * 2.2
  const startX = -canvasWidth * 0.1
  const styleList: ('glass' | 'grid' | 'stripe')[] = ['glass', 'grid', 'stripe']

  for (let i = 0; i < count; i++) {
    const x = startX + (i / count) * totalWidth
    const depth = 0.3 + Math.random() * 0.7
    const width = (20 + Math.random() * 60) * depth
    const height = (100 + Math.random() * 420) * depth
    const floors = Math.floor(height / 14)
    const windowCols = Math.floor(width / 11)
    buildings.push({
      x, width, height, floors, windowCols,
      style: styleList[Math.floor(Math.random() * styleList.length)],
      seed: Math.random() * 1000,
      depth,
    })
  }
  return buildings.sort((a, b) => a.depth - b.depth)
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(0)
  const buildingsRef = useRef<Building[]>([])
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      progressRef.current = Math.min(v * 2.2, 1)
    })
    return unsub
  }, [scrollYProgress])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    let time = 0

    function resize() {
      canvas!.width = canvas!.offsetWidth
      canvas!.height = canvas!.offsetHeight
      buildingsRef.current = generateCity(70, canvas!.width)
    }
    resize()
    window.addEventListener('resize', resize)

    function easeOut(t: number) {
      return 1 - Math.pow(1 - t, 3)
    }

    function draw() {
      const { width, height } = canvas!
      const p = progressRef.current
      const ep = easeOut(p)
      time += 0.006

      ctx.clearRect(0, 0, width, height)
      if (p < 0.001) { raf = requestAnimationFrame(draw); return }

      const horizonY = height * (0.88 - ep * 0.22)

      // Schwarzer Himmel
      const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY)
      skyGrad.addColorStop(0,    `rgba(0,0,0,${Math.min(ep * 1.5, 1)})`)
      skyGrad.addColorStop(0.6,  `rgba(4,4,6,${Math.min(ep * 1.3, 1)})`)
      skyGrad.addColorStop(0.85, `rgba(8,8,10,${Math.min(ep * 1.1, 1)})`)
      skyGrad.addColorStop(1,    `rgba(15,15,18,${Math.min(ep, 1)})`)
      ctx.fillStyle = skyGrad
      ctx.fillRect(0, 0, width, horizonY)

      // Sterne
      if (ep > 0.2) {
        for (let i = 0; i < 200; i++) {
          const sx = (i * 137.5 + 50) % width
          const sy = (i * 97.3 + 20) % (horizonY * 0.75)
          const twinkle = 0.3 + 0.7 * Math.abs(Math.sin(time * 1.2 + i * 0.6))
          const a = ((ep - 0.2) / 0.8) * twinkle * 0.9
          ctx.beginPath()
          ctx.arc(sx, sy, i % 7 === 0 ? 1.2 : 0.7, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,255,255,${a})`
          ctx.fill()
        }
      }

      // Wasser
      const waterGrad = ctx.createLinearGradient(0, horizonY, 0, height)
      waterGrad.addColorStop(0, `rgba(12,12,14,${ep})`)
      waterGrad.addColorStop(1, `rgba(2,2,2,${ep})`)
      ctx.fillStyle = waterGrad
      ctx.fillRect(0, horizonY, width, height - horizonY)

      // Chrome Horizont Glow
      const glowGrad = ctx.createLinearGradient(0, horizonY - 120, 0, horizonY + 60)
      glowGrad.addColorStop(0,    `rgba(180,180,190,0)`)
      glowGrad.addColorStop(0.4,  `rgba(180,180,190,${ep * 0.08})`)
      glowGrad.addColorStop(0.7,  `rgba(200,200,210,${ep * 0.18})`)
      glowGrad.addColorStop(0.85, `rgba(220,220,230,${ep * 0.25})`)
      glowGrad.addColorStop(1,    `rgba(180,180,190,${ep * 0.1})`)
      ctx.fillStyle = glowGrad
      ctx.fillRect(0, horizonY - 120, width, 180)

      const buildings = buildingsRef.current

      buildings.forEach((b, bi) => {
        const buildDelay = (bi / buildings.length) * 0.55
        const buildP = Math.max(0, Math.min((ep - buildDelay) / 0.45, 1))
        if (buildP <= 0) return

        const bx = b.x + width * 0.5 * (1 - ep) * (b.x < width / 2 ? -0.3 : 0.3)
        const groundY = horizonY
        const bh = b.height * buildP
        const by = groundY - bh
        const db = 0.3 + b.depth * 0.7

        const buildGrad = ctx.createLinearGradient(bx, by, bx, groundY)
        buildGrad.addColorStop(0,   `rgba(${Math.floor(18*db)},${Math.floor(18*db)},${Math.floor(20*db)},0.97)`)
        buildGrad.addColorStop(0.7, `rgba(${Math.floor(24*db)},${Math.floor(24*db)},${Math.floor(28*db)},0.95)`)
        buildGrad.addColorStop(1,   `rgba(${Math.floor(35*db)},${Math.floor(35*db)},${Math.floor(40*db)},0.93)`)
        ctx.fillStyle = buildGrad
        ctx.fillRect(bx, by, b.width, bh)

        if (b.style === 'glass') {
          const cols = b.windowCols + 1
          for (let c = 0; c < cols; c++) {
            const cx2 = bx + (c / cols) * b.width
            const panelW = b.width / cols - 0.8
            const reflection = Math.abs(Math.sin(c * 0.9 + time * 0.12 + b.seed))
            const glassAlpha = buildP * db * (0.06 + reflection * 0.14)
            const glassGrad = ctx.createLinearGradient(cx2, by, cx2, by + bh)
            glassGrad.addColorStop(0,   `rgba(200,200,210,${glassAlpha * 0.6})`)
            glassGrad.addColorStop(0.5, `rgba(180,180,195,${glassAlpha})`)
            glassGrad.addColorStop(1,   `rgba(160,160,175,${glassAlpha * 0.8})`)
            ctx.fillStyle = glassGrad
            ctx.fillRect(cx2, by, panelW, bh)
            ctx.strokeStyle = `rgba(100,100,120,${buildP * db * 0.2})`
            ctx.lineWidth = 0.3
            ctx.beginPath()
            ctx.moveTo(cx2, by)
            ctx.lineTo(cx2, by + bh)
            ctx.stroke()
          }
        } else if (b.style === 'grid') {
          const floorH = bh / b.floors
          const winW = (b.width - 3) / b.windowCols - 1.5
          for (let row = 0; row < b.floors; row++) {
            for (let col = 0; col < b.windowCols; col++) {
              const idx = row * b.windowCols + col
              if ((idx + Math.floor(b.seed)) % 3 === 0) continue
              const wx = bx + 2 + col * ((b.width - 3) / b.windowCols) + 0.8
              const wy = by + row * floorH + 1.5
              const wh = floorH - 3
              const flicker = 0.6 + 0.4 * Math.abs(Math.sin(time * 0.2 + row * 0.4 + col * 0.8 + b.seed))
              const brightness = Math.floor(160 + 60 * db)
              ctx.fillStyle = `rgba(${brightness},${brightness},${brightness+10},${buildP * flicker * db * 0.45})`
              ctx.fillRect(wx, wy, winW, wh)
            }
          }
        } else {
          const bandCount = Math.floor(b.floors / 2)
          for (let band = 0; band < bandCount; band++) {
            const by2 = by + (band / bandCount) * bh
            const bandH = (bh / bandCount) * 0.45
            const litAlpha = buildP * db * (0.12 + 0.15 * Math.abs(Math.sin(band * 1.1 + b.seed + time * 0.08)))
            const bandGrad = ctx.createLinearGradient(bx, by2, bx + b.width, by2)
            bandGrad.addColorStop(0,    `rgba(180,180,190,0)`)
            bandGrad.addColorStop(0.15, `rgba(190,190,200,${litAlpha})`)
            bandGrad.addColorStop(0.85, `rgba(190,190,200,${litAlpha})`)
            bandGrad.addColorStop(1,    `rgba(180,180,190,0)`)
            ctx.fillStyle = bandGrad
            ctx.fillRect(bx, by2, b.width, bandH)
          }
        }

        ctx.strokeStyle = `rgba(${Math.floor(160*db)},${Math.floor(160*db)},${Math.floor(175*db)},${buildP * 0.35})`
        ctx.lineWidth = 0.6
        ctx.strokeRect(bx, by, b.width, bh)

        ctx.strokeStyle = `rgba(220,220,230,${buildP * db * 0.65})`
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.moveTo(bx, by)
        ctx.lineTo(bx + b.width, by)
        ctx.stroke()

        if (ep > 0.35 && b.depth > 0.5) {
          ctx.save()
          ctx.translate(bx + b.width / 2, groundY)
          ctx.scale(1, -0.28)
          ctx.globalAlpha = (ep - 0.35) * 0.35 * buildP * b.depth
          ctx.translate(Math.sin(time * 0.5 + bi * 0.4) * 2, 0)
          const refGrad = ctx.createLinearGradient(0, 0, 0, bh * 0.28)
          refGrad.addColorStop(0,   `rgba(200,200,215,0.4)`)
          refGrad.addColorStop(0.5, `rgba(180,180,195,0.2)`)
          refGrad.addColorStop(1,   `rgba(0,0,0,0)`)
          ctx.fillStyle = refGrad
          ctx.fillRect(-b.width / 2, 0, b.width, bh * 0.28)
          ctx.restore()
        }
      })

      if (ep > 0.2) {
        for (let w = 0; w < 12; w++) {
          const wy = horizonY + 5 + w * 9 + Math.sin(time * 0.7 + w) * 2
          ctx.strokeStyle = `rgba(180,180,195,${(ep - 0.2) * 0.08 * (1 - w / 12)})`
          ctx.lineWidth = 0.4
          ctx.beginPath()
          ctx.moveTo(0, wy)
          for (let x = 0; x < width; x += 3) {
            ctx.lineTo(x, wy + Math.sin(x * 0.022 + time + w) * 1.8)
          }
          ctx.stroke()
        }
      }

      ctx.strokeStyle = `rgba(220,220,235,${ep * 0.4})`
      ctx.lineWidth = 0.8
      ctx.beginPath()
      ctx.moveTo(0, horizonY)
      ctx.lineTo(width, horizonY)
      ctx.stroke()

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const centerOp = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const centerY = useTransform(scrollYProgress, [0, 0.15], [0, -60])
  const scrollOp = useTransform(scrollYProgress, [0, 0.08], [1, 0])

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