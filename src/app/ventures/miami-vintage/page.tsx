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
          Miami Vintage begann mit dem Weiterverkauf besonderer Vintage-Pieces
          aus den 2000ern. Wir lieben diese Fundstücke, fanden es aber schade,  
          dass dieser Stil heute oft nur noch vereinzelt und gebraucht zu finden ist.
          <br /><br />
          Deshalb wollen wir den Mall-Stil der 2000er zurückbringen – und das
          Gefühl, beim Shoppen etwas Besonderes zu entdecken. Pieces mit Charakter,
          die an damalige Lieblingsläden erinnern, mit unserer eigenen Handschrift
          und komplett neu gefertigt. Für das Shoppingerlebnis von damals,
          in der heutigen Zeit. Fern von Fast Fashion und den gleichen Styles
          an jeder Ecke.
        </motion.p>

        <motion.span
          className={styles.status}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          ↗ Erster Drop · Sommer 2026
        </motion.span>

        <motion.a
          href="https://miamivintage.de/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.shopButton}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
        >
          Zum Shop ↗
        </motion.a>
      </div>
    </main>
  )
}
