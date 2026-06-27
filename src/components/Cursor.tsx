'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import styles from './Cursor.module.css'

export default function Cursor() {
  const [visible, setVisible]   = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)
  const spX  = useSpring(rawX, { stiffness: 140, damping: 20 })
  const spY  = useSpring(rawY, { stiffness: 140, damping: 20 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return
    document.body.classList.add('custom-cursor')

    const move  = (e: MouseEvent) => { rawX.set(e.clientX); rawY.set(e.clientY); setVisible(true) }
    const over  = (e: MouseEvent) => {
      setHovering(!!(e.target as HTMLElement).closest('a,button,[data-hover]'))
    }
    const down  = () => setClicking(true)
    const up    = () => setClicking(false)
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)

    return () => {
      document.body.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
    }
  }, [])

  if (!visible) return null

  return (
    <>
      <motion.div
        className={styles.dot}
        style={{ left: rawX, top: rawY }}
        animate={{ scale: clicking ? 0.4 : hovering ? 0 : 1 }}
        transition={{ duration: 0.12 }}
      />
      <motion.div
        className={styles.ring}
        style={{ left: spX, top: spY }}
        animate={{
          scale: clicking ? 0.75 : hovering ? 1.6 : 1,
          borderColor: hovering ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
        }}
        transition={{ duration: 0.18 }}
      />
    </>
  )
}