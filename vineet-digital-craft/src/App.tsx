import { Suspense, lazy, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, Command, Sparkles, Volume2, VolumeX, X } from 'lucide-react'
import * as THREE from 'three'

const Scene = lazy(() => import('./Scene'))

interface Discipline {
  id: string
  num: string
  title: string
  tags: string[]
  desc: string
  highlight: string
}

const DISCIPLINE_LIST: Discipline[] = [
  {
    id: 'creative-dev',
    num: '01',
    title: 'Creative Development',
    tags: ['React 18', 'WebGL', 'Three.js', 'TypeScript'],
    desc: 'Architecting GPU-accelerated interactive web experiences, spatial 3D stages, and high-performance tactile interfaces.',
    highlight: '60 FPS Performance'
  },
  {
    id: 'ui-ux',
    num: '02',
    title: 'UI/UX Engineering',
    tags: ['Design Systems', 'Micro-interactions', 'WCAG A11y'],
    desc: 'Designing and engineering accessible component architectures with fluid typography, responsive grids, and delightful details.',
    highlight: 'Design System Scale'
  },
  {
    id: 'art-direction',
    num: '03',
    title: 'Art Direction & Editorial',
    tags: ['Visual Identity', 'Typography', 'Chalk & Paper'],
    desc: 'Curating bespoke editorial art direction, handcrafted illustrations, and memorable brand universes that stand out.',
    highlight: 'Editorial Craft'
  },
  {
    id: 'motion',
    num: '04',
    title: 'Motion & Physics',
    tags: ['Framer Motion', 'Spring Dynamics', 'Kinetic Web'],
    desc: 'Crafting organic spring animations, gesture physics, and buttery-smooth page transitions that feel natural.',
    highlight: 'Physics-Driven Dynamics'
  },
  {
    id: 'interactive-3d',
    num: '05',
    title: 'Interactive 3D Stages',
    tags: ['Canvas 2D', 'GLSL Shaders', 'Dioramas'],
    desc: 'Transforming flat websites into captivating spatial dioramas with ambient lighting, depth parallax, and playful 3D props.',
    highlight: 'Spatial Immersion'
  }
]

// Audio context helper for soft playful chimes
let audioCtx: AudioContext | null = null

function playChime(freq = 520, soundOn = true) {
  if (!soundOn) return
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!audioCtx && AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume()
    }
    if (!audioCtx) return

    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    const now = audioCtx.currentTime

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, now)
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.08)

    gain.gain.setValueAtTime(0.06, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18)

    osc.connect(gain)
    gain.connect(audioCtx.destination)

    osc.start(now)
    osc.stop(now + 0.18)
  } catch (err) {
    // Audio context prevented or blocked
  }
}

export default function App() {
  const pointer = useRef(new THREE.Vector2(0, 0))
  const [activeDiscipline, setActiveDiscipline] = useState<Discipline | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const reduceMotion = useReducedMotion()

  function movePointer(e: PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    pointer.current.set(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    )
  }

  function toggleDiscipline(disc: Discipline) {
    if (activeDiscipline?.id === disc.id) {
      playChime(380, soundEnabled)
      setActiveDiscipline(null)
    } else {
      playChime(580, soundEnabled)
      setActiveDiscipline(disc)
    }
  }

  return (
    <main className="cover" onPointerMove={movePointer}>
      {/* Textured Paper Backdrop */}
      <div className="paper" aria-hidden="true" />

      {/* TOPBAR */}
      <header className="topbar">
        <a className="monogram" href="#home" aria-label="Julian Vance home" onClick={() => playChime(640, soundEnabled)}>
          <Command size={16} strokeWidth={1.8} />
          <span>JULIAN VANCE / 26</span>
        </a>

        <div className="availability">
          <span className="pulse" />
          <span>AVAILABLE FOR SELECT COMMISSIONS · REMOTE / GLOBAL</span>
        </div>

        <div className="topbar-right">
          <button
            className="sound-toggle-btn"
            onClick={() => {
              setSoundEnabled(!soundEnabled)
              playChime(!soundEnabled ? 660 : 330, true)
            }}
            title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span>{soundEnabled ? 'FX ON' : 'MUTED'}</span>
          </button>

          <span className="tech-mark">
            <span className="tech-spark" />
            <span>WEBGL 3D · 60FPS</span>
          </span>

          <a href="mailto:hello@julianvance.design" className="topbar-cta" onClick={() => playChime(720, soundEnabled)}>
            <span>Let's Talk</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </header>

      {/* HERO SECTION: PRESERVED RABBIT ARTWORK & REFINED EDITORIAL COCKPIT */}
      <section id="home" className="hero" aria-label="Julian Vance portfolio cover">
        {/* Preserved Signature Rabbit & Laptop Artwork */}
        <div className="artwork" aria-hidden="true" />
        <div className="art-vignette" aria-hidden="true" />

        {/* Interactive 3D Orbit WebGL Scene */}
        <Suspense fallback={null}>
          <Scene pointer={pointer} reduceMotion={!!reduceMotion} />
        </Suspense>

        {/* Floating Holographic Badge */}
        <motion.div
          className="orbit-label"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Sparkles size={12} />
          <span>CREATIVE TECHNOLOGIST</span>
          <span className="orbit-arrow">↗</span>
        </motion.div>

        {/* Elegantly Positioned Editorial Headline Block (Clear of the cactus and laptop) */}
        <div className="title-block">
          <motion.p
            className="signature"
            initial={{ opacity: 0, y: 12, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            Julian Vance
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.7, ease: [0.2, 0.75, 0.2, 1] }}
          >
            <span>PORT</span>
            <span>FOLIO</span>
          </motion.h1>

          <motion.div
            className="role"
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            <span className="role-line" />
            <span>Frontend &amp; Creative Developer</span>
            <ArrowUpRight size={14} />
          </motion.div>

          <p className="intro">
            Thoughtful interfaces, tactile micro-interactions, and spatial 3D web experiences built with feeling and precision.
          </p>

          <div className="title-actions">
            <a
              href="#disciplines"
              className="btn-pill-primary"
              onClick={() => {
                playChime(600, soundEnabled)
                if (DISCIPLINE_LIST[0]) setActiveDiscipline(DISCIPLINE_LIST[0])
              }}
            >
              <span>Explore Disciplines</span>
              <ArrowDownRight size={13} />
            </a>
            <a
              href="mailto:hello@julianvance.design"
              className="btn-pill-ghost"
              onClick={() => playChime(680, soundEnabled)}
            >
              <span>Contact</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Subtle Editorial Metadata Tags */}
        <div className="micro-index">
          <span className="fig">FIG. 01</span>
          <span>INDEPENDENT DIGITAL PRACTICE · 2026 EDITION</span>
        </div>
        <div className="crosshair" aria-hidden="true">+</div>

        {/* Interactive Discipline Detail Card Overlay */}
        <AnimatePresence>
          {activeDiscipline && (
            <motion.div
              className="discipline-detail-card"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="detail-card-header">
                <div className="detail-card-badge">
                  <span>DISCIPLINE {activeDiscipline.num}</span>
                  <span className="detail-highlight">{activeDiscipline.highlight}</span>
                </div>
                <button
                  className="detail-close-btn"
                  onClick={() => {
                    playChime(360, soundEnabled)
                    setActiveDiscipline(null)
                  }}
                  aria-label="Close detail"
                >
                  <X size={14} />
                </button>
              </div>

              <h3 className="detail-title">{activeDiscipline.title}</h3>
              <p className="detail-desc">{activeDiscipline.desc}</p>

              <div className="detail-tags">
                {activeDiscipline.tags.map((tag) => (
                  <span key={tag} className="detail-tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* BOTTOM DISCIPLINES DOCK */}
      <footer className="bottom" id="disciplines">
        <div className="bottom-copy">
          <span className="eyebrow">CREATIVE DISCIPLINES</span>
          <span className="hint">
            <ArrowDownRight size={12} />
            <span>CLICK A FIELD TO INSPECT</span>
          </span>
        </div>

        <nav className="services" aria-label="Creative disciplines">
          {DISCIPLINE_LIST.map((disc) => {
            const isActive = activeDiscipline?.id === disc.id
            return (
              <motion.button
                key={disc.id}
                className={`pill ${isActive ? 'active' : ''}`}
                onClick={() => toggleDiscipline(disc)}
                whileHover={reduceMotion ? undefined : { y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                aria-pressed={isActive}
              >
                <span className="pill-index">{disc.num}</span>
                <span className="pill-title">{disc.title}</span>
                <span className="pill-arrow">↗</span>
              </motion.button>
            )
          })}
        </nav>

        <div className={`selection-note ${activeDiscipline ? 'show' : ''}`} aria-live="polite">
          {activeDiscipline ? (
            <>
              <span className="note-dot" />
              <span>ACTIVE / {activeDiscipline.title.toUpperCase()}</span>
            </>
          ) : (
            <span>DESIGNING · CODING · SHIP TO PROD</span>
          )}
        </div>
      </footer>
    </main>
  )
}
