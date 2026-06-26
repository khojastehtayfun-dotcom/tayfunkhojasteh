'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import styles from './Stats.module.css'
import { useLang } from '@/context/LanguageContext'

const stats = [
  { value: 1,    suffix: '',  label_de: 'Aktives Projekt',  label_en: 'Active Project'    },
  { value: 3,    suffix: '+', label_de: 'Jahre am Ball',    label_en: 'Years in the Game' },
  { value: 3,    suffix: '',  label_de: 'Branchen',         label_en: 'Industries'        },
  { value: null, suffix: '∞', label_de: 'Ambitionen',       label_en: 'Ambitions'         },
]

function CountUp({ target, suffix }: { target: number | null, suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView || target === null) return
    let start = 0
    const duration = 1500
    const step = 16
    const increment = target / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, step)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{target === null ? '∞' : `${count}${suffix}`}</span>
}

export default function Stats() {
  const { lang } = useLang()

  return (
    <section className={styles.stats} id="stats">
      {stats.map((s, i) => (
        <div key={i} className={styles.item}>
          <span className={styles.value}>
            <CountUp target={s.value} suffix={s.suffix} />
          </span>
          <span className={styles.label}>
            {lang === 'de' ? s.label_de : s.label_en}
          </span>
        </div>
      ))}
    </section>
  )
}