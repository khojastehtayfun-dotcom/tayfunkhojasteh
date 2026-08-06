'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import styles from './Navigation.module.css'
import { useLang } from '@/context/LanguageContext'

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { lang, setLang } = useLang()
  const lastY = useRef(0)
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 50)
      lastY.current = currentY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Body scroll lock when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const scrollTo = (id: string, href?: string) => {
    setOpen(false)
    if (href) {
      setTimeout(() => {
        router.push(href)
      }, 600)
      return
    }
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 600)
  }

  const navigateTo = (href: string | undefined, id?: string) => {
    if (id) {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    if (href) {
      router.push(href)
    }
  }

  const navItems = [
    { label: lang === 'de' ? 'Über mich' : 'About', id: 'about' },
    { label: 'Ventures', id: 'ventures' },
    { label: 'Real Estate', id: 'real-estate', href: '/real-estate' },
    { label: lang === 'de' ? 'Kontakt' : 'Contact', id: 'contact' },
  ]

  const categoryItems = [
    { label: 'Fashion', id: 'ventures', href: '/ventures/fashion' },
    { label: 'Real Estate', id: 'real-estate', href: '/real-estate' },
    { label: 'Sales', id: 'ventures', href: '/ventures/sales' },
    { label: lang === 'de' ? 'Kontakt' : 'Contact', id: 'contact' },
  ]

  return (
    <>
      {/* Top Bar */}
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${open ? styles.menuOpen : ''}`}>
        {/* TK Logo */}
        <button
          className={styles.logo}
          onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          <img src="/images/Tayfun Logo.png" alt="TK" className={styles.logoImg} />
        </button>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Category Bar — James Edition Style */}
      <div className={`${styles.categoryBar} ${scrolled ? styles.categoryBarScrolled : ''}`}>
        <ul className={styles.categoryList}>
          {categoryItems.map((item) => (
            <li key={item.label}>
              <button onClick={() => navigateTo(item.href, item.id)}>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Nav Links */}
            <div className={styles.overlayContent}>
              <ul className={styles.overlayLinks}>
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <button onClick={() => scrollTo(item.id, item.href)}>
                      <span className={styles.itemNum}>0{i + 1}</span>
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              {/* Bottom Row */}
              <motion.div
                className={styles.overlayBottom}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <div className={styles.langSwitch}>
                  <button
                    className={lang === 'de' ? styles.active : ''}
                    onClick={() => setLang('de')}
                  >DE</button>
                  <span className={styles.divider}>|</span>
                  <button
                    className={lang === 'en' ? styles.active : ''}
                    onClick={() => setLang('en')}
                  >EN</button>
                </div>
                <p className={styles.overlayTagline}>TAYFUN KHOJASTEH</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}