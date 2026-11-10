'use client'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { 
  ArrowDownRight, 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  Box, 
  Code2, 
  Cpu, 
  Layers3, 
  Maximize2, 
  MousePointer2, 
  Palette, 
  Plus, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  X,
  Compass,
  FolderGit2,
  ZoomIn
} from 'lucide-react'
import { usePortfolio } from '../components/store'
import ExploreDrawer from '../components/ExploreDrawer'
import { sound } from '../components/audio'

const WorkstationScene = dynamic(() => import('../components/WorkstationScene'), {
  ssr: false,
  loading: () => (
    <div className="scene-loading">
      <span />
      <small>INITIALIZING 3D SPATIAL SHOWROOM...</small>
    </div>
  )
})

const experiences = [
  {
    id: 'workspace',
    number: '01',
    title: 'Workspace',
    description: 'A place where ideas take shape.',
    short: 'THE DESK',
    color: '#a78bfa',
    tint: '#f5f3ff',
    stage: '#0e111a',
    icon: Layers3,
    kind: 'Studio Workbench'
  },
  {
    id: 'hardware',
    number: '02',
    title: 'Hardware',
    description: 'A closer look under the hood.',
    short: 'THE MACHINE',
    color: '#fb923c',
    tint: '#fff7ed',
    stage: '#17120e',
    icon: Cpu,
    kind: 'Quantum Silicon Rig'
  },
  {
    id: 'development',
    number: '03',
    title: 'Development',
    description: 'Where design meets the browser.',
    short: 'THE PROCESS',
    color: '#38bdf8',
    tint: '#f0f9ff',
    stage: '#091522',
    icon: Code2,
    kind: 'Holographic Matrix'
  },
  {
    id: 'creative',
    number: '04',
    title: 'Creative Projects',
    description: 'Interfaces with a little more feeling.',
    short: 'THE STUDIO',
    color: '#f472b6',
    tint: '#fdf2f8',
    stage: '#1a0d18',
    icon: Palette,
    kind: 'Chromatic Sculpture'
  },
  {
    id: 'experiments',
    number: '05',
    title: 'Experiments',
    description: 'Curiosity, rendered in three dimensions.',
    short: 'THE PLAYGROUND',
    color: '#a3e635',
    tint: '#f7fee7',
    stage: '#121908',
    icon: Sparkles,
    kind: 'Quantum Gravity Vortex'
  }
]

const initial = 'workspace'

export default function Home() {
  const selected = usePortfolio((s) => s.active)
  const setSelected = usePortfolio((s) => s.setActive)
  const [view, setView] = useState<'studio' | 'orbit' | 'macro'>('studio')
  const [connect, setConnect] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)
  const [audioActive, setAudioActive] = useState(true)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const reduced = useReducedMotion()

  const current = useMemo(
    () => experiences.find((x) => x.id === selected) ?? experiences[0],
    [selected]
  )

  useEffect(() => {
    const handleUrlChange = () => {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      const queryScene = params.get('scene');
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const target = queryScene || hash;
      if (target && experiences.some((x) => x.id === target)) {
        setSelected(target);
      }
    };
    handleUrlChange();
    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [setSelected]);

  const handleSelectExperience = (id: string) => {
    sound.switchScene(id);
    setSelected(id);
    window.location.hash = id;
  };

  const change = (delta: number) => {
    sound.click(600)
    const curIdx = experiences.findIndex((x) => x.id === current.id)
    const nextIdx = (curIdx + delta + experiences.length) % experiences.length
    setSelected(experiences[nextIdx].id)
  }

  const toggleViewMode = () => {
    sound.swoosh()
    setView((prev) => (prev === 'studio' ? 'macro' : prev === 'macro' ? 'orbit' : 'studio'))
  }

  const toggleSound = () => {
    const isNowOn = sound.toggle()
    setAudioActive(isNowOn)
    if (isNowOn) sound.click(800)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e
    const rect = currentTarget.getBoundingClientRect()
    const x = Math.round(((clientX - rect.left) / rect.width - 0.5) * 100)
    const y = Math.round(((clientY - rect.top) / rect.height - 0.5) * 100)
    setCoords({ x, y })
  }

  return (
    <main
      className="showroom-page"
      style={
        {
          '--accent': current.color,
          '--tint': current.tint,
          '--stage': current.stage
        } as React.CSSProperties
      }
    >
      <div className="page-wash" />
      <div className="showroom-shell">
        {/* TOP BAR */}
        <header className="topbar">
          <a className="wordmark" href="#home" aria-label="Vineet home">
            <span className="logo-symbol">
              v<span>.</span>
            </span>
            <span>
              VINEET
              <small>CREATIVE FRONTEND & 3D DEVELOPER</small>
            </span>
          </a>

          <nav className="top-links" aria-label="Main navigation">
            <button className="top-active" onClick={() => sound.click(500)}>
              Digital space
            </button>
            <button 
              onClick={() => {
                sound.click(600)
                setExploreOpen(true)
              }}
            >
              Explore Directory
            </button>
            <button 
              onClick={() => {
                sound.click(550)
                setConnect(true)
              }}
            >
              Contact
            </button>
          </nav>

          <div className="top-end">
            <button 
              className="sound-toggle-btn" 
              onClick={toggleSound}
              title={audioActive ? 'Mute Audio FX' : 'Enable Audio FX'}
              aria-label="Toggle Sound FX"
            >
              {audioActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>
            <span className="available">
              <i /> AVAILABLE FOR SELECT PROJECTS
            </span>
            <button 
              className="connect-top" 
              onClick={() => {
                sound.click(650)
                setConnect(true)
              }}
            >
              Let’s talk <ArrowUpRight size={14} />
            </button>
          </div>
        </header>

        {/* MAIN SHOWROOM SPLIT GRID */}
        <div id="home" className="showroom-grid">
          {/* LEFT: 3D INTERACTIVE VISUAL STAGE */}
          <section 
            className="visual-stage" 
            aria-label={`${current.title} 3D showcase`}
            onMouseMove={handleMouseMove}
          >
            {/* Atmospheric Depth Aura behind 3D elements */}
            <div className="stage-depth-glow" />
            <div className="stage-grain" />
            <div className="stage-cross cross-one">+</div>
            <div className="stage-cross cross-two">+</div>

            {/* Stage HUD Top Meta */}
            <div className="stage-meta">
              <span>VINEET / 3D SPATIAL SHOWROOM</span>
              <span className="stage-hud-coords">
                COORDS: X[{coords.x}] Y[{coords.y}] · 60FPS
              </span>
              <span>COLLECTION&nbsp; {current.number} — 05</span>
            </div>

            {/* Stage Typography Copy */}
            <div className="stage-copy">
              <motion.div
                key={current.id}
                initial={{ opacity: 0.3, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
              >
                <span className="stage-eyebrow">
                  <i />
                  {current.short} &nbsp;·&nbsp; {current.kind}
                </span>
                <h1>
                  Building beyond
                  <br />
                  the <em>screen.</em>
                </h1>
                <p>Exploring the intersection of WebGL 3D, tactile interaction, and high-performance frontend architecture.</p>
              </motion.div>
            </div>

            {/* THE INTERACTIVE 3D SCENE CANVAS */}
            <div className="scene-wrap">
              <WorkstationScene selected={current.id} view={view} />
            </div>

            {/* Interactive Hints & Floating Spec Badges */}
            <div className="scene-hint">
              <MousePointer2 size={13} /> DRAG TO ROTATE · HOVER TO ENGAGE
            </div>

            <div className="floating-spec spec-left">
              <span className="spec-icon">
                <Box size={14} />
              </span>
              <span>
                {current.kind}
                <small>3D INTERACTIVE MODEL</small>
              </span>
            </div>

            <div className="floating-spec spec-right">
              <span className="signal-bars">
                <i />
                <i />
                <i />
              </span>
              <span>
                REALTIME THREE.JS
                <small>SHADOWS · GLSL · 60FPS</small>
              </span>
            </div>

            {/* Bottom Control Dock */}
            <div className="control-dock" aria-label="Showcase controls">
              <div className="dock-categories">
                {experiences.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      className={current.id === item.id ? 'dock-active' : ''}
                      onClick={() => handleSelectExperience(item.id)}
                      aria-label={item.title}
                      title={item.title}
                    >
                      <Icon size={16} />
                      <span>{item.title === 'Creative Projects' ? 'Creative' : item.title}</span>
                    </button>
                  )
                })}
              </div>

              <span className="dock-divider" />

              {/* View Mode Toggle: Studio -> Macro -> Orbit */}
              <button
                className={`view-toggle ${view !== 'studio' ? 'view-active' : ''}`}
                onClick={toggleViewMode}
                aria-label="Toggle camera view mode"
                title="Toggle camera angle"
              >
                {view === 'macro' ? <ZoomIn size={15} /> : <Maximize2 size={15} />}
                <span>
                  {view === 'studio' ? 'Macro View' : view === 'macro' ? 'Orbit View' : 'Studio View'}
                </span>
              </button>

              <span className="dock-divider dock-divider-short" />

              <button
                className="dock-arrow"
                onClick={() => change(-1)}
                aria-label="Previous experience"
              >
                <ArrowLeft size={15} />
              </button>
              <button
                className="dock-arrow"
                onClick={() => change(1)}
                aria-label="Next experience"
              >
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Index Counter */}
            <div className="stage-index">
              <span>0{experiences.findIndex((x) => x.id === current.id) + 1}</span>
              <i />
              <span>05</span>
            </div>
          </section>

          {/* RIGHT: CURATED COLLECTION SIDEBAR */}
          <aside id="explore" className="collection-panel">
            <div className="panel-heading">
              <div>
                <span className="panel-kicker">EXPLORE COLLECTION</span>
                <h2>
                  My digital
                  <br />
                  <em>space.</em>
                </h2>
              </div>
              <span className="panel-count">
                05
                <br />
                <small>MODELS</small>
              </span>
            </div>

            <p className="panel-intro">
              Curated interactive spaces exploring developer workbenches, silicon hardware, code matrix architecture, and quantum shaders.
            </p>

            <div className="collection-list">
              {experiences.map((item) => {
                const Icon = item.icon
                const active = item.id === current.id
                return (
                  <button
                    key={item.id}
                    className={`collection-item ${active ? 'collection-selected' : ''}`}
                    onClick={() => handleSelectExperience(item.id)}
                    style={
                      {
                        '--item-accent': item.color,
                        '--item-tint': item.tint
                      } as React.CSSProperties
                    }
                  >
                    <span className="item-number">{item.number}</span>
                    <span className="item-thumb">
                      <span className="thumb-orbit" />
                      <Icon size={17} />
                    </span>
                    <span className="item-copy">
                      <b>{item.title}</b>
                      <small>{item.description}</small>
                    </span>
                    <span className="item-go">
                      {active ? <ArrowUpRight size={16} /> : <Plus size={15} />}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* View Full Directory Button in Panel */}
            <button 
              className="panel-directory-trigger"
              onClick={() => {
                sound.click(650)
                setExploreOpen(true)
              }}
            >
              <FolderGit2 size={16} />
              <span>Open Project Archive & Skills Matrix</span>
              <ArrowUpRight size={14} />
            </button>

            <div className="panel-bottom">
              <div className="panel-note">
                <span className="note-glyph">✳</span>
                <p>
                  Curiosity is the
                  <br />
                  best tool in the kit.
                </p>
              </div>
              <div className="panel-bottom-right">
                <span>
                  SCROLL LESS.
                  <br />
                  EXPLORE MORE.
                </span>
                <span className="panel-arrow">
                  <ArrowDownRight size={15} />
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* FOOTER */}
        <footer className="shell-footer">
          <span>© 2026 VINEET · MADE TO BE EXPLORED</span>
          <span>
            <span className="footer-dot" /> BUILT WITH THREE.JS & NEXT.JS 14
          </span>
          <button 
            onClick={() => {
              sound.click(500)
              setConnect(true)
            }}
          >
            SAY HELLO <ArrowUpRight size={12} />
          </button>
        </footer>

        {/* Mobile Status Bar */}
        <div className="mobile-state-bar">
          <span>NOW EXPLORING</span>
          <b>{current.title}</b>
          <button onClick={() => change(1)} aria-label="Next experience">
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* EXPLORE DIRECTORY DRAWER (Case studies, Skills, Timeline) */}
      <ExploreDrawer
        isOpen={exploreOpen}
        onClose={() => setExploreOpen(false)}
        onSelectExperience={(id) => handleSelectExperience(id)}
      />

      {/* CONNECT OVERLAY */}
      <AnimatePresence>
        {connect && (
          <motion.div
            className="connect-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setConnect(false)}
          >
            <motion.div
              className="connect-card"
              initial={{ y: 18, scale: 0.97 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 8, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="connect-close"
                onClick={() => setConnect(false)}
                aria-label="Close"
              >
                <X size={17} />
              </button>
              <span className="panel-kicker">OPEN CHANNEL</span>
              <h2>
                Let’s make
                <br />
                <em>something real.</em>
              </h2>
              <p>Have an idea, an interactive 3D vision, or a product design system to build? I’d love to hear about it.</p>
              <a href="mailto:hello@vineet.dev" className="connect-email-btn">
                HELLO@VINEET.DEV <ArrowUpRight size={14} />
              </a>
              <small>Available for select freelance contracts & full-time design engineering roles.</small>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
