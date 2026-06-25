'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Ventures.module.css'

// ─── Placeholder ventures – replace with real data later ───────────────────
const ventures = [
  { id: 1, name: 'Real Estate',  desc_de: 'Immobilien & Investments', desc_en: 'Real Estate & Investments', emoji: '🏢' },
  { id: 2, name: 'Technology',   desc_de: 'Tech & Software',           desc_en: 'Tech & Software',           emoji: '💻' },
  { id: 3, name: 'Teleson',      desc_de: 'Vertrieb & Sales',          desc_en: 'Sales & Distribution',      emoji: '📞' },
  { id: 4, name: 'Social Media', desc_de: 'Content & Branding',        desc_en: 'Content & Branding',        emoji: '📱' },
]

interface Props { lang?: 'de' | 'en' }

export default function Ventures({ lang = 'de' }: Props) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className={styles.ventures} ref={ref} id="ventures">
      <motion.p
        className={styles.eyebrow}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {lang === 'de' ? 'Ventures' : 'Ventures'}
      </motion.p>

      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        {lang === 'de' ? 'Das Imperium' : 'The Empire'}
      </motion.h2>

      {/* 
        ─────────────────────────────────────────────────────────────
        🔮 PLACEHOLDER: Die 3D-Einkaufsstraße kommt hier rein.
           Für jetzt: einfache Karten als Platzhalter.
        ─────────────────────────────────────────────────────────────
      */}
      <div className={styles.grid}>
        {ventures.map((v, i) => (
          <motion.div
            key={v.id}
            className={styles.card}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
          >
            <span className={styles.emoji}>{v.emoji}</span>
            <h3 className={styles.name}>{v.name}</h3>
            <p className={styles.desc}>{lang === 'de' ? v.desc_de : v.desc_en}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
