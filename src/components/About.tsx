'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import styles from './About.module.css'

interface Props { lang?: 'de' | 'en' }

export default function About({ lang = 'de' }: Props) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [hovered, setHovered] = useState(false)

  return (
    <section className={styles.about} ref={ref} id="about">

      <div className={styles.imageWrapper}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src="/images/Tayfun Fotograf 2024.jpg"
          alt="Tayfun Khojasteh"
          fill
          className={`${styles.img} ${hovered ? styles.hidden : styles.visible}`}
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
        <Image
          src="/images/Tayfun Casual 2024.jpg"
          alt="Tayfun Khojasteh"
          fill
          className={`${styles.img} ${hovered ? styles.visible : styles.hidden}`}
          style={{ objectFit: 'cover', objectPosition: 'top' }}
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

        <motion.p
          className={styles.bio}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {lang === 'de'
            ? 'Aufgewachsen in Alsdorf. Kein Netz das mich auffängt. Nur Ideen – und irgendwann der Mut sie umzusetzen. Ich baue Dinge auf. Das ist meine Sprache.'
            : 'Grew up in Alsdorf. No safety net. Just ideas – and eventually the courage to act on them. I build things. That\'s my language.'}
        </motion.p>

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