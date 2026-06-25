'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Contact.module.css'

interface Props { lang?: 'de' | 'en' }

export default function Contact({ lang = 'de' }: Props) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [sent, setSent] = useState(false)

  const t = {
    eyebrow:     lang === 'de' ? 'Kontakt'           : 'Contact',
    heading:     lang === 'de' ? 'Lass uns reden'    : "Let's Talk",
    name:        lang === 'de' ? 'Name'              : 'Name',
    email:       lang === 'de' ? 'E-Mail'            : 'Email',
    message:     lang === 'de' ? 'Nachricht'         : 'Message',
    send:        lang === 'de' ? 'Senden'            : 'Send',
    success:     lang === 'de' ? 'Nachricht gesendet ✓' : 'Message sent ✓',
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to email service (e.g. Resend, Formspree)
    setSent(true)
  }

  return (
    <section className={styles.contact} ref={ref} id="contact">
      <motion.p
        className={styles.eyebrow}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {t.eyebrow}
      </motion.p>

      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        {t.heading}
      </motion.h2>

      <motion.form
        className={styles.form}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className={styles.row}>
          <div className={styles.field}>
            <label>{t.name}</label>
            <input type="text" required placeholder="Tayfun Khojasteh" />
          </div>
          <div className={styles.field}>
            <label>{t.email}</label>
            <input type="email" required placeholder="mail@example.com" />
          </div>
        </div>
        <div className={styles.field}>
          <label>{t.message}</label>
          <textarea rows={6} required placeholder="..." />
        </div>
        <button type="submit" className={styles.btn} disabled={sent}>
          {sent ? t.success : t.send}
        </button>
      </motion.form>
    </section>
  )
}
