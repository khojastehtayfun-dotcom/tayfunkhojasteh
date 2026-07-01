'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRouter } from 'next/navigation'
import styles from './ShoppingStreet.module.css'

const VENTURES = [
  {
    id: '01',
    tag: 'Fashion',
    name: 'Miami Vintage',
    sub: 'Y2K Denim',
    desc: 'Handverlesene Denim-Stücke mit Y2K-Charakter und modernem Edge. Erster Drop Sommer 2026.',
    status: 'Erster Drop · Sommer 2026',
    accent: '#c9a84c',
    logo: '/images/Miami Vinatge Logo.png',
    href: '/ventures/miami-vintage',
    bg: '#0a0806',
  },
  {
    id: '02',
    tag: 'Sales',
    name: 'Teleson',
    sub: 'Sales & Distribution',
    desc: 'Motivierte Talente für den gemeinsamen Aufbau von etwas Großem. Strukturierter Vertrieb mit Substanz.',
    status: 'Aktiv',
    accent: '#e8e8e8',
    logo: null,
    href: '/ventures/teleson',
    bg: '#080808',
  },
  {
    id: '03',
    tag: 'Real Estate',
    name: 'TK Properties',
    sub: 'Coming Soon',
    desc: 'Eine neue Ebene des Imperiums entsteht. Properties, kuratiert mit dem gleichen Anspruch wie alles andere.',
    status: 'Coming Soon',
    accent: '#c9a84c',
    logo: null,
    href: '/real-estate',
    bg: '#060608',
  },
]

export default function ShoppingStreet() {
  const router = useRouter()

  return (
    <section id="ventures" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Ventures</span>
        <h2 className={styles.title}>Das Imperium</h2>
      </div>

      <div className={styles.ventures}>
        {VENTURES.map((v, i) => (
          <VentureSection
            key={v.id}
            v={v}
            index={i}
            onClick={() => router.push(v.href)}
          />
        ))}
      </div>
    </section>
  )
}

function VentureSection({ v, index, onClick }: {
  v: typeof VENTURES[0]
  index: number
  onClick: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={ref}
      className={styles.ventureRow}
      style={{ background: v.bg }}
      onClick={onClick}
    >
      <motion.div className={styles.ventureInner} style={{ y, opacity }}>
        {/* Left — Info */}
        <div className={styles.ventureInfo}>
          <span className={styles.ventureTag} style={{ color: v.accent }}>
            {v.tag}
          </span>
          <h3 className={styles.ventureName}>{v.name}</h3>
          <p className={styles.ventureSub}>{v.sub}</p>
          <div className={styles.ventureDivider} style={{ background: v.accent }} />
          <p className={styles.ventureDesc}>{v.desc}</p>
          <div className={styles.ventureFooter}>
            <span className={styles.ventureStatus} style={{ color: v.accent }}>
              ↗ {v.status}
            </span>
            <span className={styles.ventureNum}>{v.id}</span>
          </div>
        </div>

        {/* Right — Visual */}
        <div className={styles.ventureVisual}>
          <span className={styles.ventureGhost}>{v.name.slice(0, 2).toUpperCase()}</span>
          {v.logo
            ? <img src={v.logo} alt={v.name} className={styles.ventureLogo} />
            : (
              <span className={styles.ventureLetters} style={{ color: v.accent }}>
                {v.name.split(' ').map(w => w[0]).join('')}
              </span>
            )
          }
        </div>
      </motion.div>

      {/* Hover Overlay */}
      <div className={styles.ventureHover}>
        <span style={{ color: v.accent }}>Entdecken →</span>
      </div>
    </motion.div>
  )
}