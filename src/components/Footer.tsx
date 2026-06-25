import styles from './Footer.module.css'

interface Props { lang?: 'de' | 'en' }

export default function Footer({ lang = 'de' }: Props) {
  const socials = [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'LinkedIn',  href: 'https://linkedin.com/in/' },
    { label: 'TikTok',    href: 'https://tiktok.com/@' },
    { label: 'YouTube',   href: 'https://youtube.com/' },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <span className={styles.logo}>TK</span>
        <nav className={styles.socials}>
          {socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </nav>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Tayfun Khojasteh</span>
        <nav className={styles.legal}>
          <a href="/impressum">{lang === 'de' ? 'Impressum' : 'Legal Notice'}</a>
          <a href="/datenschutz">{lang === 'de' ? 'Datenschutz' : 'Privacy Policy'}</a>
        </nav>
      </div>
    </footer>
  )
}
