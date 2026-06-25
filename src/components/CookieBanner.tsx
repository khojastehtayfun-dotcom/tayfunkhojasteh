'use client'

import { useState, useEffect } from 'react'
import styles from './CookieBanner.module.css'

interface Props { lang?: 'de' | 'en' }

export default function CookieBanner({ lang = 'de' }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.banner}>
      <div className={styles.text}>
        <p>
          {lang === 'de'
            ? 'Diese Website verwendet Cookies, um die Nutzererfahrung zu verbessern.'
            : 'This website uses cookies to improve your experience.'}
          {' '}
          <a href="/datenschutz">
            {lang === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}
          </a>
        </p>
      </div>
      <div className={styles.actions}>
        <button className={styles.decline} onClick={decline}>
          {lang === 'de' ? 'Ablehnen' : 'Decline'}
        </button>
        <button className={styles.accept} onClick={accept}>
          {lang === 'de' ? 'Akzeptieren' : 'Accept'}
        </button>
      </div>
    </div>
  )
}
