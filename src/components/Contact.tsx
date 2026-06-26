'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Contact.module.css'
import { useLang } from '@/context/LanguageContext'

export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { lang } = useLang()
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [message, setMessage] = useState('')

  const t = {
    eyebrow:  lang === 'de' ? 'Kontakt'           : 'Contact',
    heading:  lang === 'de' ? 'Lass uns reden'    : "Let's Talk",
    name:     lang === 'de' ? 'Name'              : 'Name',
    email:    lang === 'de' ? 'E-Mail'            : 'Email',
    message:  lang === 'de' ? 'Nachricht'         : 'Message',
    send:     lang === 'de' ? 'Senden'            : 'Send',
    success:  lang === 'de' ? 'Nachricht gesendet ✓' : 'Message sent ✓',
    sending:  lang === 'de' ? 'Wird gesendet...'  : 'Sending...',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (res.ok) setSent(true)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
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
            <input
              type="text"
              required
              placeholder="Tayfun Khojasteh"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label>{t.email}</label>
            <input
              type="email"
              required
              placeholder="mail@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.field}>
          <label>{t.message}</label>
          <textarea
            rows={6}
            required
            placeholder="..."
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.btn} disabled={sent || loading}>
          {sent ? t.success : loading ? t.sending : t.send}
        </button>
      </motion.form>
    </section>
  )
}