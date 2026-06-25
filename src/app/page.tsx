import Navigation   from '@/components/Navigation'
import Hero         from '@/components/Hero'
import Stats        from '@/components/Stats'
import About        from '@/components/About'
import Ventures     from '@/components/Ventures'
import Contact      from '@/components/Contact'
import Footer       from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Stats />
      <div id="about">
        <About />
      </div>
      <Ventures />
      <Contact />
      <Footer />
      <CookieBanner />
    </main>
  )
}