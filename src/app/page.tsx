import Navigation    from '@/components/Navigation'
import Hero          from '@/components/Hero'
import Stats         from '@/components/Stats'
import About         from '@/components/About'
import ShoppingStreet from '@/components/ShoppingStreet'
import Contact       from '@/components/Contact'
import Footer        from '@/components/Footer'
import CookieBanner  from '@/components/CookieBanner'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Stats />
      <div id="about">
        <About />
      </div>
      <ShoppingStreet />
      <Contact />
      <Footer />
      <CookieBanner />
    </main>
  )
}