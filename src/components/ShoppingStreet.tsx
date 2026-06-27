'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'
import styles from './ShoppingStreet.module.css'

const VENTURES = [
  {
    id: '01', tag: 'Fashion', name: 'Miami Vintage', sub: 'Y2K Denim',
    desc_de: 'Handverlesene Denim-Stücke mit Y2K-Charakter und modernem Edge. Erster Drop Sommer 2026.',
    desc_en: 'Handpicked denim with Y2K character and modern edge. First drop Summer 2026.',
    status_de: 'Erster Drop · Sommer 2026', status_en: 'First Drop · Summer 2026',
    logo: '/images/Miami Vinatge Logo.png', letter: 'MV', accent: '#c9a84c', glow: '201,168,76',
  },
  {
    id: '02', tag: 'Fashion', name: 'Arcand', sub: 'Luxury Streetwear',
    desc_de: 'Extravagante Streetwear für Menschen die auffallen wollen.',
    desc_en: 'Extravagant streetwear for those who demand attention.',
    status_de: 'In Entwicklung', status_en: 'In Development',
    logo: null, letter: 'AC', accent: '#b8b8b8', glow: '184,184,184',
  },
  {
    id: '03', tag: 'Lifestyle', name: 'Stofftiere', sub: 'Plush & More',
    desc_de: 'Mehr als Plüsch — ein modernes Lifestyle-Produkt für Menschen die das Besondere lieben.',
    desc_en: 'Beyond plush — a modern lifestyle statement for the extraordinary.',
    status_de: 'Coming Soon', status_en: 'Coming Soon',
    logo: null, letter: 'ST', accent: '#d8d8d8', glow: '216,216,216',
  },
  {
    id: '04', tag: 'Sales', name: 'Teleson', sub: 'Sales & Distribution',
    desc_de: 'Motivierte Talente für den gemeinsamen Aufbau von etwas Großem.',
    desc_en: 'Motivated talent to build something great together.',
    status_de: 'Jetzt bewerben', status_en: 'Apply Now',
    logo: null, letter: 'TL', accent: '#c9a84c', glow: '201,168,76',
  },
]

const N = VENTURES.length
const COPIES = 7
const PADDED = Array.from({ length: COPIES }, () => VENTURES).flat()
const MID = N * 3  // start at 4th copy (index 12 for N=4)

interface VentureType {
  id: string; tag: string; name: string; sub: string
  desc_de: string; desc_en: string; status_de: string; status_en: string
  logo: string | null; letter: string; accent: string; glow: string
}
interface Props { lang?: 'de' | 'en' }

export default function ShoppingStreet({ lang = 'de' }: Props) {
  const [offset, setOffset] = useState(MID)
  const offRef  = useRef(MID)
  const skipRef = useRef(false)
  const lastClick = useRef(0)

  const realActive = ((offset % N) + N) % N

  const go = (delta: number) => {
    lastClick.current = Date.now()
    skipRef.current = false
    const next = offRef.current + delta
    offRef.current = next
    setOffset(next)
  }

  const handleRest = () => {
    if (Date.now() - lastClick.current < 350) return
    const cur = offRef.current
    let next: number | null = null
    if (cur < N * 2)             next = cur + N * 2
    else if (cur >= N * (COPIES - 2)) next = cur - N * 2
    if (next !== null) {
      skipRef.current = true
      offRef.current = next
      setOffset(next)
      requestAnimationFrame(() => { skipRef.current = false })
    }
  }

  const jumpTo = (i: number) => {
    skipRef.current = false
    lastClick.current = Date.now()
    // jump to nearest equivalent position
    const cur = offRef.current
    const curMod = ((cur % N) + N) % N
    let diff = i - curMod
    if (diff > N / 2)  diff -= N
    if (diff < -N / 2) diff += N
    const next = cur + diff
    offRef.current = next
    setOffset(next)
  }

  return (
    <section className={styles.section} id="ventures">
      <div className={styles.header}>
        <span className={styles.eyebrow}>Ventures</span>
        <h2 className={styles.title}>Das Imperium</h2>
        <div className={styles.counter}>
          <span className={styles.cur}>{String(realActive + 1).padStart(2,'0')}</span>
          <span className={styles.sep}>/</span>
          <span className={styles.tot}>{String(N).padStart(2,'0')}</span>
        </div>
      </div>

      <div className={styles.carouselWrap}>
        <button className={`${styles.arrow} ${styles.arrowL}`} onClick={() => go(-1)} aria-label="Prev">
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="1"/>
            <polyline points="29,18 21,26 29,34" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className={styles.viewport}>
          <motion.div
            className={styles.track}
            animate={{ x: `calc(-${offset} * (var(--cw) + var(--cg)))` }}
            transition={skipRef.current
              ? { duration: 0 }
              : { type: 'spring', stiffness: 48, damping: 18 }}
            onAnimationComplete={handleRest}
          >
            {PADDED.map((v, i) => (
              <TiltCard
                key={i}
                v={v as VentureType}
                isActive={i === offset}
                lang={lang}
                onClick={() => {
                  const diff = i - offRef.current
                  if (diff === 0) return
                  skipRef.current = false
                  lastClick.current = Date.now()
                  offRef.current = offRef.current + diff
                  setOffset(offRef.current)
                }}
              />
            ))}
          </motion.div>
        </div>

        <button className={`${styles.arrow} ${styles.arrowR}`} onClick={() => go(1)} aria-label="Next">
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="26" r="25" stroke="currentColor" strokeWidth="1"/>
            <polyline points="23,18 31,26 23,34" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className={styles.dots}>
        {VENTURES.map((v, i) => (
          <button
            key={v.id}
            className={`${styles.dot} ${i === realActive ? styles.dotOn : ''}`}
            onClick={() => jumpTo(i)}
            style={i === realActive ? { background: v.accent } : undefined}
          />
        ))}
      </div>
    </section>
  )
}

function TiltCard({ v, isActive, lang, onClick }: {
  v: VentureType; isActive: boolean; lang: 'de' | 'en'; onClick: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const cfg = { stiffness: 120, damping: 28 }
  const rotY = useSpring(useTransform(mx, [0,1], [7,-7]), cfg)
  const rotX = useSpring(useTransform(my, [0,1], [-5,5]), cfg)
  const gx = useTransform(mx, [0,1], ['0%','100%'])
  const gy = useTransform(my, [0,1], ['0%','100%'])
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.08), transparent 55%)`

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => { mx.set(0.5); my.set(0.5) }

  const visualBg = {
    backgroundColor: '#09090b',
    backgroundImage: [
      'radial-gradient(ellipse at 40% 50%, rgba(' + v.glow + ',0.1) 0%, transparent 65%)',
      'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
    ].join(','),
    backgroundSize: 'auto, 26px 26px',
  }

  return (
    <motion.div
      ref={ref}
      className={`${styles.card} ${isActive ? styles.cardOn : styles.cardOff}`}
      style={isActive ? { rotateX: rotX, rotateY: rotY, transformPerspective: 1200 } : {}}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div className={styles.visual} style={visualBg}>
        <div className={styles.accentBar} style={{ background: v.accent }} />
        <span className={styles.ghost}>{v.letter}</span>
        {v.logo
          ? <img src={v.logo} alt={v.name} className={styles.logo} />
          : <span className={styles.vName} style={{ color: v.accent }}>{v.name}</span>
        }
      </div>

      <div className={styles.text}>
        <div className={styles.tTop}>
          <span className={styles.tag} style={{ color: v.accent }}>{v.tag}</span>
          <span className={styles.cid}>{v.id}</span>
        </div>
        <div className={styles.tMid}>
          <h3 className={styles.name}>{v.name}</h3>
          <p className={styles.sub}>{v.sub}</p>
          <div className={styles.div} style={{ background: 'rgba(' + v.glow + ',0.4)' }} />
          <p className={styles.desc}>{lang === 'de' ? v.desc_de : v.desc_en}</p>
        </div>
        <p className={styles.status} style={{ color: v.accent }}>
          {'↗'}&ensp;{lang === 'de' ? v.status_de : v.status_en}
        </p>
      </div>

      {isActive && (
        <motion.div className={styles.glare} style={{ background: glareBg }} />
      )}
    </motion.div>
  )
}