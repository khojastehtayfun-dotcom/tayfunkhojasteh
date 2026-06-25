import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <div id="about">
        <About />
      </div>
    </main>
  )
}