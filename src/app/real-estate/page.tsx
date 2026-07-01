'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './RealEstate.module.css'

export default function RealEstatePage() {
  return (
    <main className={styles.page}>
      <Link href="/" className={styles.back}>← Back</Link>

      <div className={styles.content}>
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Real Estate
        </motion.p>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          Coming Soon
        </motion.h1>

        <motion.div
          className={styles.divider}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        <motion.p
          className={styles.teaser}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Eine neue Ebene des Imperiums entsteht. Properties, kuratiert mit dem
          gleichen Anspruch wie alles andere, das ich aufbaue.
        </motion.p>

        <motion.p
          className={styles.note}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          初心忘るべからず
        </motion.p>
      </div>
    </main>
  )
}