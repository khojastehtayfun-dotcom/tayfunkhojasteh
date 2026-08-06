'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import styles from './About.module.css'

interface Props { lang?: 'de' | 'en' }

export default function About({ lang = 'de' }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [hovered, setHovered] = useState(false)

  const bioDE = `Ich bin Tayfun, 27. Ich baue Marken – nicht als Nebenprojekt, sondern als Lebenseinstellung. Von Online-Shops bis zu den Systemen, die dahinterstehen.

Was du hier findest, ist kein fertiges Werk, sondern ein Blick in das, woran ich gerade arbeite: eigene Fashion-Labels und einiges, das noch kommt.

Der schnelle Erfolg war nie der Antrieb. Es ist das Gefühl, aus einer Idee etwas Reales entstehen zu lassen – Stück für Stück, mit voller Kontrolle über jedes Detail.`

  const bioEN = `I'm Tayfun, 27. I build brands – not as a side project, but as a way of life. From online shops to the systems behind them.

What you'll find here isn't a finished body of work, but a look into what I'm building right now: my own fashion labels, and more on the way.

Quick success was never the drive. It's the feeling of turning an idea into something real – piece by piece, with full control over every detail.`

  return (
    <section className={styles.about} ref={ref} id="about">

      <div
        className={styles.imageWrapper}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src="/images/Tayfun Fotograf 2024.jpg"
          alt="Tayfun Khojasteh"
          fill
          className={`${styles.img} ${hovered ? styles.hidden : styles.visible}`}
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          draggable={false}
        />
        <Image
          src="/images/Tayfun Casual 2024.jpg"
          alt="Tayfun Khojasteh"
          fill
          className={`${styles.img} ${hovered ? styles.visible : styles.hidden}`}
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          draggable={false}
        />
      </div>

      <div className={styles.content}>
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {lang === 'de' ? 'Über mich' : 'About me'}
        </motion.p>

        <motion.h2
          className={styles.name}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Tayfun<br />Khojasteh
        </motion.h2>

        <motion.div
          className={styles.bioWrapper}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {(lang === 'de' ? bioDE : bioEN).split('\n\n').map((paragraph, i) => (
            <p key={i} className={styles.bio}>{paragraph}</p>
          ))}
        </motion.div>

        <motion.p
          className={styles.quote}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          初心忘るべからず
          <span>
            {lang === 'de'
              ? '„Vergiss niemals den Geist des Anfangs."'
              : '"Never forget the spirit of the beginning."'}
          </span>
        </motion.p>
      </div>

    </section>
  )
}