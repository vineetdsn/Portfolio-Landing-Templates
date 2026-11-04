import { Suspense, lazy, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Command, Sparkles } from 'lucide-react'
import * as THREE from 'three'

const Scene = lazy(() => import('./Scene'))
const services = ['Brand identity', 'Social media', 'Packaging design', 'Photo manipulation', 'Presentation design', 'Illustration', 'Art direction']

export default function App() {
  const pointer = useRef(new THREE.Vector2(0, 0))
  const [active, setActive] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()

  function movePointer(e: PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    pointer.current.set((e.clientX - rect.left) / rect.width * 2 - 1, -((e.clientY - rect.top) / rect.height * 2 - 1))
  }

  return <main className="cover" onPointerMove={movePointer}>
    <div className="paper" aria-hidden="true" />
    <header className="topbar">
      <a className="monogram" href="#home" aria-label="Vineet home"><Command size={17} strokeWidth={1.5} /><span>V / 26</span></a>
      <div className="availability"><span className="pulse" /> AVAILABLE FOR SELECT PROJECTS <span className="bar">/</span> INDORE, IN</div>
      <span className="tech-mark"><span className="tech-spark" /> WEBGL / 01</span>
    </header>

    <section id="home" className="hero" aria-label="Vineet portfolio cover">
      <div className="artwork" aria-hidden="true" />
      <div className="art-vignette" aria-hidden="true" />
      <Suspense fallback={null}><Scene pointer={pointer} reduceMotion={!!reduceMotion} /></Suspense>
      <motion.div className="orbit-label" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .8, duration: .7 }}><Sparkles size={12} /> CREATIVE DEVELOPER <span>↗</span></motion.div>
      <div className="title-block">
        <motion.p className="signature" initial={{ opacity: 0, y: 12, rotate: -4 }} animate={{ opacity: 1, y: 0, rotate: -4 }} transition={{ delay: .18, duration: .7 }}>Vineet Sharma</motion.p>
        <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .8, ease: [.2, .75, .2, 1] }}><span>PORT</span><span>FOLIO</span></motion.h1>
        <motion.div className="role" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .55, duration: .7 }}><i /> Frontend developer <ArrowUpRight size={13} /></motion.div>
        <p className="intro">Thoughtful interfaces.<br />Built with feeling and precision.</p>
      </div>
      <div className="micro-index"><span>FIG. 01</span><span>INDEPENDENT CREATIVE PRACTICE</span></div>
      <div className="crosshair" aria-hidden="true">+</div>
    </section>

    <footer className="bottom">
      <div className="bottom-copy"><span className="eyebrow">A FEW THINGS I MAKE</span><span className="hint"><ArrowDownRight size={13} /> SELECT A FIELD TO EXPLORE</span></div>
      <nav className="services" aria-label="Creative disciplines">
        {services.map((service, index) => <motion.button key={service} className={`pill ${active === service ? 'active' : ''}`} onClick={() => setActive(active === service ? null : service)} whileHover={reduceMotion ? undefined : { y: -3, scale: 1.025 }} whileTap={{ scale: .97 }} aria-pressed={active === service}>
          <span className="pill-index">0{index + 1}</span>{service}<span className="pill-arrow">↗</span>
        </motion.button>)}
      </nav>
      <div className={`selection-note ${active ? 'show' : ''}`} aria-live="polite">{active ? <><span className="note-dot" /> SELECTED / {active.toUpperCase()}</> : 'DESIGNING · DEVELOPING · DELIVERING'}</div>
    </footer>
    <a className="contact-link" href="mailto:hello@vineet.design">LET’S TALK <ArrowUpRight size={14} /></a>
  </main>
}
