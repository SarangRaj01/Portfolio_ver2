import { useLayoutEffect, useRef } from 'react'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { createMotion } from './motion/setup'

export default function App() {
  const root = useRef<HTMLDivElement>(null)

  // Layout effect: hidden start states are applied before the first paint, so there is no flash.
  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    try {
      const scope = createMotion(el)
      return () => scope.revert()
    } catch (error) {
      // If motion fails for any reason the page stays fully visible and usable.
      console.error('Motion setup failed; showing the static page.', error)
    }
  }, [])

  return (
    <div ref={root}>
      <a href="#about" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
