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

  const bioDE = `Ich bin Tayfun. 27 Jahre alt, Unternehmer aus Leidenschaft und Überzeugung. Was mich antreibt ist nicht der Zufall — es ist die Obsession, Dinge aus dem Nichts zu erschaffen. Marken, Systeme, Strukturen. Ich baue nicht weil ich muss, ich baue weil es das einzige ist was sich für mich wirklich richtig anfühlt.

Alsdorf war der Anfang. Heute stehe ich für Fashion, E-Commerce und Vertrieb. Morgen für mehr. Die Branchen erweitern sich, die Philosophie bleibt: Strukturen, Systeme und Marken bauen.

Eine Ein-Mann-Show — bewusst und mit voller Überzeugung. Denn wer allein baut, baut auf einem Fundament das niemand erschüttern kann.`

  const bioEN = `I'm Tayfun. 27 years old, entrepreneur by passion and conviction. What drives me is not chance — it's the obsession of creating things from nothing. Brands, systems, structures. I don't build because I have to, I build because it's the only thing that feels truly right.

Alsdorf was the beginning. Today I stand for fashion, e-commerce and sales. Tomorrow for more. The industries expand, the philosophy remains: building structures, systems and brands.

A one-man show — deliberate and with full conviction. Because whoever builds alone, builds on a foundation no one can shake.`

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