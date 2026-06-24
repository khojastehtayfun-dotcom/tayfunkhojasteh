import Hero  from '@/components/Hero'
import About from '@/components/About'

export default function Home() {
  return (
    <main>
      {/* ── SECTION 1: Cinematic opener with shard explosion ── */}
      <Hero />

      {/* ── SECTION 2: Who / what ── */}
      <About />

      {/*
        ┌─────────────────────────────────────────────────┐
        │  Future sections go here — one component each:  │
        │  <Projects />   → your ventures                 │
        │  <Contact />    → contact form                  │
        │  <Countdown />  → launch countdown              │
        └─────────────────────────────────────────────────┘
      */}
    </main>
  )
}
