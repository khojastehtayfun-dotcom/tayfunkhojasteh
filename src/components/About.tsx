'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './About.module.css'

export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const lines = [
    'Real Estate.',
    'Technology.',
    'Investments.',
    'Social Media.',
  ]

  return (
    <section className={styles.about} ref={ref}>
      <motion.p
        className={styles.eyebrow}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        The Group
      </motion.p>

      <div className={styles.lines}>
        {lines.map((line, i) => (
          <motion.span
            key={line}
            className={styles.line}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.span>
        ))}
      </div>

      <motion.p
        className={styles.bio}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.8 }}
      >
        Building businesses across multiple industries —<br />
        each one a chapter in the same story.
      </motion.p>
    </section>
  )
}
