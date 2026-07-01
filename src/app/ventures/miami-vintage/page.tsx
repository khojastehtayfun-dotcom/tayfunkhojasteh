'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './MiamiVintage.module.css'

export default function MiamiVintagePage() {
  return (
    <main className={styles.page}>
      <Link href="/" className={styles.back}>← Zurück</Link>

      <div className={styles.hero}>
        <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Fashion · Y2K Denim
        </motion.span>

        <motion.img
          src="/images/Miami Vinatge Logo.png"
          alt="Miami Vintage"
          className={styles.logo}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
        />

        <motion.div
          className={styles.divider}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        <motion.p
          className={styles.desc}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Handverlesene Denim-Stücke mit Y2K-Charakter und modernem Edge.
          Keine Fast Fashion. Kein Kompromiss. Erster Drop Sommer 2026.
        </motion.p>

        <motion.span
          className={styles.status}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          ↗ Erster Drop · Sommer 2026
        </motion.span>
      </div>
    </main>
  )
}