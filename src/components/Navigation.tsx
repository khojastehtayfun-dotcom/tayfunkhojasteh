'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Navigation.module.css'

export default function Navigation() {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState<'de' | 'en'>('de')
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 50)
      setVisible(currentY < lastY.current || currentY < 80)
      lastY.current = currentY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <button className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        TK
      </button>
      <ul className={styles.links}>
        <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
          {lang === 'de' ? 'Über mich' : 'About'}
        </button></li>
        <li><button onClick={() => document.getElementById('ventures')?.scrollIntoView({ behavior: 'smooth' })}>
          Ventures
        </button></li>
        <li><button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
          {lang === 'de' ? 'Kontakt' : 'Contact'}
        </button></li>
      </ul>
      <div className={styles.langSwitch}>
        <button className={lang === 'de' ? styles.active : ''} onClick={() => setLang('de')}>🇩🇪</button>
        <span className={styles.divider}>|</span>
        <button className={lang === 'en' ? styles.active : ''} onClick={() => setLang('en')}>🇬🇧</button>
      </div>
    </nav>
  )
}