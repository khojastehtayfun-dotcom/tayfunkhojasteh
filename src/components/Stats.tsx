'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Stats.module.css'

const stats = [
  { value: '5+',  label_de: 'Unternehmen',       label_en: 'Companies'       },
  { value: '10+', label_de: 'Jahre Erfahrung',    label_en: 'Years Experience' },
  { value: '3',   label_de: 'Branchen',           label_en: 'Industries'      },
  { value: '∞',   label_de: 'Ambitionen',         label_en: 'Ambitions'       },
]

interface Props { lang?: 'de' | 'en' }

export default function Stats({ lang = 'de' }: Props) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className={styles.stats} ref={ref} id="stats">
      {stats.map((s, i) => (
        <motion.div
          key={s.value}
          className={styles.item}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          <span className={styles.value}>{s.value}</span>
          <span className={styles.label}>{lang === 'de' ? s.label_de : s.label_en}</span>
        </motion.div>
      ))}
    </section>
  )
}
