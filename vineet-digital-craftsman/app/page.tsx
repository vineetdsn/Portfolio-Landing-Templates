'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Asterisk, Check, Code2, Command, Github, Layers3, Linkedin, Menu, MoveUpRight, Sparkles, X } from 'lucide-react';

const THEMES = [
  { id: 'theme-amber', name: 'Studio Amber', label: 'AMBER', color: '#f97316' },
  { id: 'theme-emerald', name: 'Cyber Emerald', label: 'EMERALD', color: '#10b981' },
  { id: 'theme-crimson', name: 'Crimson Eclipse', label: 'CRIMSON', color: '#f43f5e' },
  { id: 'theme-glacier', name: 'Tron Glacier', label: 'GLACIER', color: '#06b6d4' },
  { id: 'theme-titanium', name: 'Titanium Silver', label: 'TITANIUM', color: '#ffffff' },
];

const projects = [
  { id: '01', title: 'FinWiz', type: 'FINTECH · PRODUCT DESIGN', desc: 'A clearer path to better borrowing. An end-to-end loan origination experience built around confidence, not complexity.', tags: ['Next.js', 'TypeScript', 'Tailwind'], kind: 'Product', art: 'finwiz' },
  { id: '02', title: 'CommerceOS', type: 'COMMERCE · DASHBOARD', desc: 'A command centre for modern commerce. Turning a hundred moving numbers into one clear picture.', tags: ['React', 'Data viz', 'Design system'], kind: 'Platform', art: 'commerce' },
  { id: '03', title: 'Elsewhere', type: 'TRAVEL · MOBILE EXPERIENCE', desc: 'A slower, more considered way to find your next somewhere. Made for the feeling before the trip.', tags: ['React Native', 'Motion', 'Maps'], kind: 'Experience', art: 'elsewhere' },
];

const skills = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript'],
  Styling: ['Tailwind CSS', 'CSS3', 'HTML5'],
  Tools: ['Git', 'GitHub', 'VS Code', 'Figma'],
  Beyond: ['REST APIs', 'Node.js', 'Framer Motion']
};

const nav = [
  ['About', 'about'],
  ['Expertise', 'expertise'],
  ['Work', 'work'],
  ['Journey', 'journey'],
  ['Contact', 'contact']
];

const KEYBOARD_KEYS = ['esc', '⌘', '⌥', '⌃', 'CRAFT', 'CODE', 'BUILD', '↵'];

const MONITOR_SCREENS = [
  {
    tag: 'INDEPENDENT DIGITAL STUDIO',
    title: <>Ideas,<br/>made <i>real.</i></>,
    meta: 'DESIGN ENGINEERING / 2025',
    graphic: 'sphere',
    footerRight: 'CLICK MONITOR TO CYCLE ↻',
  },
  {
    tag: 'SYSTEM METRICS · VERIFIED',
    title: <>Code,<br/>with <i>intent.</i></>,
    meta: '100% LIGHTHOUSE · 60FPS · 0 DEBT',
    graphic: 'cube',
    footerRight: 'CLICK MONITOR TO CYCLE ↻',
  },
  {
    tag: 'CREATIVE WORKBENCH · V2',
    title: <>Pixels,<br/>with <i>purpose.</i></>,
    meta: 'MODERN STACK · INTERACTIVE 3D',
    graphic: 'wave',
    footerRight: 'CLICK MONITOR TO CYCLE ↻',
  },
];

function playTactileSound(frequency = 480, type: OscillatorType = 'sine', duration = 0.12) {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.02);
  } catch {
    // Graceful fallback if AudioContext is blocked
  }
}

function Mark() {
  return (
    <a className="brand" href="#home" aria-label="Vineet home">
      <span className="brand-icon">v<span>.</span></span>
      <span className="brand-name">VINEET<br/><small>INDEPENDENT DEVELOPER</small></span>
    </a>
  );
}

export default function Home() {
  const [theme, setTheme] = useState('theme-amber');
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All work');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('');
  const [email, setEmail] = useState('');
  const [active, setActive] = useState('');
  
  // Interactive 3D Workstation State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [monitorMode, setMonitorMode] = useState(0);
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setTilt({
      x: Number(x.toFixed(3)),
      y: Number(y.toFixed(3)),
    });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const cycleMonitor = () => {
    playTactileSound(620, 'triangle', 0.18);
    setMonitorMode((prev) => (prev + 1) % MONITOR_SCREENS.length);
  };

  const handleKeyClick = (keyName: string, index: number) => {
    playTactileSound(420 + index * 70, 'sine', 0.1);
    setPressedKey(keyName);
    setTimeout(() => setPressedKey(null), 180);
  };

  const visible = projects.filter(p => filter === 'All work' || p.kind === filter);
  const currentScreen = MONITOR_SCREENS[monitorMode];

  return (
    <main id="home">
      <div className="grain" aria-hidden="true" />
      
      {/* Topline Bar with Real-Time Theme Selector */}
      <div className="topline">
        <span className="topline-role">INDEPENDENT FRONTEND DEVELOPER</span>
        
        <div className="theme-bar" role="toolbar" aria-label="Choose color palette">
          <span className="theme-bar-label">PALETTE:</span>
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`theme-pill ${theme === t.id ? 'active' : ''}`}
              onClick={() => {
                setTheme(t.id);
                playTactileSound(540, 'sine', 0.14);
              }}
              title={`Switch to ${t.name}`}
              aria-pressed={theme === t.id}
            >
              <span className="theme-dot" style={{ backgroundColor: t.color, color: t.color }} />
              <span className="theme-text">{t.label}</span>
            </button>
          ))}
        </div>

        <span className="topline-status">
          INDORE, INDIA <i className="live-dot" /> AVAILABLE FOR SELECT PROJECTS
        </span>
      </div>

      <header className="nav-wrap">
        <Mark />
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          {nav.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
              className={active === id ? 'selected' : ''}
            >
              {label}<span>↗</span>
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#contact">
          LET’S TALK <ArrowUpRight size={14} />
        </a>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Hero Section with Interactive 3D Workstation */}
      <section className="hero section-shell">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> A LITTLE DESIGN. A LOT OF INTENTION.</div>
          <h1>DESIGNING<span className="period">.</span><br />DEVELOPING<span className="period">.</span><br /><em>DELIVERING.</em></h1>
          <div className="hero-bottom">
            <p>I build thoughtful, high-performance digital experiences through clean code, purposeful design and modern frontend technologies.</p>
            <div className="hero-actions">
              <a className="button button-hot" href="#work">
                EXPLORE MY WORK <ArrowDownRight size={16} />
              </a>
              <a className="text-link" href="/vineet-resume.txt" download>
                DOWNLOAD RESUME <ArrowDown size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* 3D Viewport with Parallax Tilt */}
        <div
          className="studio-viewport"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div
            className="studio"
            style={{
              '--tilt-x': tilt.x,
              '--tilt-y': tilt.y,
            } as React.CSSProperties}
            aria-label="Interactive 3D developer workstation with interactive screen and atom sculpture"
          >
            <div className="studio-glow" />
            <div className="studio-orbit orbit-one" />
            <div className="studio-orbit orbit-two" />
            
            <div className="scene-label label-left">
              <span>FIG. 01</span><br />THE MAKING OF<br />A GOOD IDEA
            </div>
            <div className="scene-label label-right">
              CRAFT / 001<br /><span>IN PROGRESS</span>
            </div>

            {/* Floating Depth Chips */}
            <div className="floating-chip chip-a">&lt;/&gt; <span>thoughtfully built</span></div>
            <div className="floating-chip chip-b"><span className="mini-dot" /> SYSTEM ONLINE</div>

            {/* 3D Monitor with Interactive Screen */}
            <div
              className="monitor"
              onClick={cycleMonitor}
              title="Click to cycle screen concepts"
            >
              <div className="monitor-rim">
                <div className="monitor-camera" />
                <div className="screen">
                  <div className="screen-sheen" />
                  <div className="screen-nav">
                    <b>v<span>.</span></b>
                    <span>WORK&nbsp;&nbsp; STUDIO&nbsp;&nbsp; ABOUT</span>
                    <i>↗</i>
                  </div>
                  <div className="screen-content">
                    <div className="screen-tag">
                      <span>{currentScreen.tag}</span>
                      <span className="screen-tag-pill">0{monitorMode + 1}/03</span>
                    </div>
                    <strong>{currentScreen.title}</strong>
                    <div className="screen-rule" />
                    <span className="screen-small">{currentScreen.meta}</span>
                    
                    {/* Screen dynamic visual component */}
                    {currentScreen.graphic === 'sphere' && <div className="screen-ball" />}
                    {currentScreen.graphic === 'cube' && (
                      <div className="screen-cube">
                        <span>SYS.OK</span>
                      </div>
                    )}
                    {currentScreen.graphic === 'wave' && (
                      <div className="screen-wave">
                        <span /><span /><span /><span /><span />
                      </div>
                    )}
                  </div>
                  <div className="screen-footer">
                    <span>© VINEET STUDIO</span>
                    <span>{currentScreen.footerRight}</span>
                  </div>
                </div>
              </div>
              <div className="monitor-neck" />
              <div className="monitor-base" />
            </div>

            {/* 3D Multi-Ring Gyroscope Atom Sculpture */}
            <div
              className="sculpture"
              onClick={() => playTactileSound(840, 'sine', 0.2)}
              title="Interactive 3D Gyroscope Atom Sculpture"
            >
              <div className="sculpture-axis">
                <div className="sculpture-ring ring-a" />
                <div className="sculpture-ring ring-b" />
                <div className="sculpture-ring ring-c" />
                <div className="sculpture-core" />
              </div>
            </div>

            {/* 3D Desk with Tactile Keyboard */}
            <div className="desk">
              <div className="keyboard" aria-label="Interactive 3D mechanical keyboard">
                {KEYBOARD_KEYS.map((keyLabel, idx) => (
                  <button
                    key={keyLabel}
                    type="button"
                    className={`keycap ${pressedKey === keyLabel ? 'pressed' : ''}`}
                    onClick={() => handleKeyClick(keyLabel, idx)}
                    title={`Key ${keyLabel}`}
                  >
                    {keyLabel}
                  </button>
                ))}
              </div>
              <div
                className="mouse"
                onClick={() => playTactileSound(720, 'triangle', 0.12)}
                title="Sleek 3D mouse"
              />
              <div className="desk-light" />
            </div>

            <div className="scene-coordinate">22°43’N&nbsp; 75°51’E</div>
          </div>
        </div>

        <a className="scroll-cue" href="#about">
          <span>SCROLL TO DISCOVER</span><ArrowDown size={14} />
        </a>
      </section>

      {/* Marquee Ticker */}
      <section className="ticker" aria-label="Services">
        <div className="ticker-track">
          {Array.from({ length: 2 }, (_, i) => (
            <div className="ticker-row" key={i}>
              <span>FRONTEND ENGINEERING</span><Asterisk />
              <span>INTERFACE CRAFT</span><Asterisk />
              <span>DIGITAL PRODUCTS</span><Asterisk />
              <span>FRONTEND ENGINEERING</span><Asterisk />
              <span>INTERFACE CRAFT</span><Asterisk />
              <span>DIGITAL PRODUCTS</span><Asterisk />
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about section-shell section-pad" id="about">
        <div className="section-meta">
          <span>01 / A LITTLE ABOUT ME</span>
          <span>CURIOUS BY DEFAULT</span>
        </div>
        <div className="about-grid">
          <div className="about-stamp">
            <div className="stamp-inner">
              <span>BUILT WITH</span>
              <b>INTENT<span>.</span></b>
              <div className="stamp-lines">CRAFT · CARE · CURIOSITY</div>
              <Asterisk className="stamp-star" size={60} />
            </div>
            <span className="stamp-caption">AN APPROACH, NOT A TEMPLATE.</span>
          </div>
          <div className="about-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> CODE WITH A POINT OF VIEW</div>
            <h2>BEYOND WRITING CODE,<br /><em>I BUILD EXPERIENCES.</em></h2>
            <p className="lead">I’m Vineet — a frontend developer who cares about how things work, and how they <i>feel.</i></p>
            <p>From the first sketch to the final interaction, I bring design and engineering into the same conversation. I like clear thinking, considered details, and interfaces that make complicated things feel simple.</p>
            <div className="about-note">
              <span>MY NORTH STAR</span>
              <span>Make it useful. Make it beautiful. Make it last. <ArrowUpRight size={15} /></span>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise / Toolkit */}
      <section className="expertise section-shell section-pad" id="expertise">
        <div className="section-meta">
          <span>02 / THE TOOLKIT</span>
          <span>GOOD TOOLS. BETTER JUDGEMENT.</span>
        </div>
        <div className="expertise-head">
          <h2>MADE OF<br /><em>MANY PARTS.</em></h2>
          <p>Technology is a material. The craft is knowing what to do with it. Here’s what I reach for.</p>
        </div>
        <div className="skills-grid">
          {Object.entries(skills).map(([group, items], i) => (
            <div className="skill-group" key={group}>
              <div className="skill-index">
                0{i + 1} <span>{group}</span>
                <ArrowUpRight size={15} />
              </div>
              <div className="skill-list">
                {items.map((x, n) => (
                  <button
                    key={x}
                    className={active === x ? 'skill-chip active' : 'skill-chip'}
                    onClick={() => {
                      setActive(active === x ? '' : x);
                      playTactileSound( active === x ? 380 : 520, 'sine', 0.1);
                    }}
                  >
                    <span className="skill-spark">{n === 0 ? '✳' : '·'}</span>{x}
                    <span className="skill-arrow">↗</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="skills-foot">
          <span>SELECT A TOOL TO GIVE IT A LITTLE SPOTLIGHT</span>
          <span>ALWAYS LEARNING&nbsp; <Sparkles size={13} /></span>
        </div>
      </section>

      {/* Selected Work */}
      <section className="work section-shell section-pad" id="work">
        <div className="section-meta">
          <span>03 / SELECTED WORK</span>
          <span>THOUGHTFULLY PUT TOGETHER</span>
        </div>
        <div className="work-heading">
          <h2>A FEW THINGS<br /><em>OUT IN THE WORLD.</em></h2>
          <p>Different problems. Different people.<br />One common thread: care in every detail.</p>
        </div>
        <div className="project-toolbar">
          <span>PORTFOLIO / 2023—25</span>
          <div className="filters">
            {['All work', 'Product', 'Platform', 'Experience'].map(f => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  playTactileSound(460, 'sine', 0.08);
                }}
                className={filter === f ? 'filter-on' : ''}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        
        <div className="projects">
          {visible.map((p) => (
            <article className={`project project-${p.art}`} key={p.id}>
              <a href="#contact" className="project-art" aria-label={`Discuss ${p.title} project`}>
                <div className="art-top">
                  <span>{p.type}</span>
                  <span>{p.id} / 03</span>
                </div>
                {p.art === 'finwiz' ? (
                  <div className="finwiz-ui">
                    <div className="fw-side">
                      <b>f.</b>
                      <span>▦</span>
                      <span>◷</span>
                      <span>⌂</span>
                      <span>⚙</span>
                    </div>
                    <div className="fw-main">
                      <div className="fw-greet">Good morning, Alex <span>✳</span></div>
                      <small>LET’S GET YOU MOVING.</small>
                      <div className="fw-card">
                        <span>YOUR PERSONAL LOAN</span>
                        <b>$24,000</b>
                        <i>Ready when you are <span>↗</span></i>
                      </div>
                      <div className="fw-progress">
                        <span /><span /><span />
                      </div>
                    </div>
                  </div>
                ) : p.art === 'commerce' ? (
                  <div className="commerce-ui">
                    <div className="co-title">Today <span>⌄</span></div>
                    <div className="co-numbers">
                      <div>NET SALES<strong>$48,290</strong><small>↗ 12.8%</small></div>
                      <div>ORDERS<strong>1,284</strong><small>↗ 8.2%</small></div>
                    </div>
                    <div className="co-chart">
                      <div className="chart-label">PERFORMANCE <span>LAST 30 DAYS</span></div>
                      <svg viewBox="0 0 500 120" preserveAspectRatio="none">
                        <path
                          className="chart-line"
                          d="M0 96 C40 80 44 98 80 71 S132 90 170 51 S223 77 259 43 S318 64 356 30 S405 48 440 23 S470 42 500 5"
                          fill="none"
                          strokeWidth="3"
                        />
                        <path
                          d="M0 96 C40 80 44 98 80 71 S132 90 170 51 S223 77 259 43 S318 64 356 30 S405 48 440 23 S470 42 500 5 L500 120 L0 120Z"
                          fill="url(#commerce-area)"
                        />
                        <defs>
                          <linearGradient id="commerce-area" x1="0" x2="0" y1="0" y2="1">
                            <stop className="chart-stop" stopOpacity=".28" />
                            <stop className="chart-stop" offset="1" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="travel-ui">
                    <div className="travel-sun" />
                    <span className="travel-kicker">THE ART OF GOING</span>
                    <div className="travel-title">Somewhere<br /><i>different.</i></div>
                    <div className="travel-bottom">↗ &nbsp; FIND YOUR ELSEWHERE</div>
                    <div className="travel-mountains" />
                  </div>
                )}
                <span className="art-open"><ArrowUpRight size={18} /></span>
              </a>
              <div className="project-info">
                <div>
                  <span className="project-num">{p.id}</span>
                  <h3>{p.title}</h3>
                </div>
                <span className="project-kind">{p.kind.toUpperCase()}</span>
              </div>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tags">
                {p.tags.map(tag => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
        
        <a className="all-work-link" href="#contact">
          HAVE A PROJECT IN MIND? <span>LET’S MAKE IT REAL <ArrowUpRight size={14} /></span>
        </a>
      </section>

      {/* Journey Section */}
      <section className="journey section-shell section-pad" id="journey">
        <div className="section-meta">
          <span>04 / THE JOURNEY SO FAR</span>
          <span>STILL JUST GETTING STARTED</span>
        </div>
        <div className="journey-grid">
          <div>
            <h2>LEARNING<br />BY <em>MAKING.</em></h2>
            <p className="journey-intro">A path shaped by good questions, generous collaborators and the joy of figuring it out.</p>
            <div className="journey-sigil">
              <Layers3 size={40} />
              <span>IDEAS<br />IN MOTION</span>
            </div>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">2023 — NOW <span>INDEPENDENT</span></div>
              <div className="timeline-marker" />
              <div className="timeline-content">
                <h3>Freelance Frontend Developer</h3>
                <p>Partnering with founders and teams to turn ambitious ideas into intuitive, production-ready digital products.</p>
                <span>PRODUCT THINKING · FRONTEND · COLLABORATION</span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">2022 — 2023 <span>INTERNSHIP</span></div>
              <div className="timeline-marker" />
              <div className="timeline-content">
                <h3>UI Developer Intern</h3>
                <p>Found my footing in a real product team — translating Figma into thoughtful, responsive interfaces.</p>
                <span>UI IMPLEMENTATION · DESIGN SYSTEMS · TEAMWORK</span>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-date">2022 — 2024 <span>EDUCATION</span></div>
              <div className="timeline-marker" />
              <div className="timeline-content">
                <h3>Master of Computer Applications</h3>
                <p>Building a deeper foundation in computing, software design and the systems behind the screen.</p>
                <span>MCA · INDORE, INDIA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services section-shell section-pad">
        <div className="section-meta">
          <span>05 / HOW I CAN HELP</span>
          <span>THE RIGHT THING, DONE WELL</span>
        </div>
        <div className="services-heading">
          <h2>FROM FIRST PIXEL<br />TO <em>FINAL POLISH.</em></h2>
          <span>GOOD WORK IS A TEAM SPORT. HERE’S WHERE I FIT IN.</span>
        </div>
        <div className="service-list">
          {[
            ['01', 'Frontend development', 'Fast, maintainable interfaces with a little extra attention to the details.'],
            ['02', 'UI implementation', 'Faithful, flexible translations from design systems into the real world.'],
            ['03', 'Responsive web experiences', 'Layouts that feel considered on every screen, not just squeezed to fit.'],
            ['04', 'Dashboard development', 'Complex data made clear, useful and easier to act on.'],
            ['05', 'API integration', 'Connecting the dots between your product and the services it needs.'],
            ['06', 'Performance optimization', 'Small, deliberate improvements that make every interaction feel lighter.']
          ].map(([n, t, d]) => (
            <div className="service-row" key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
              <ArrowUpRight size={18} />
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact section-shell section-pad" id="contact">
        <div className="section-meta">
          <span>06 / YOUR TURN</span>
          <span>GOOD THINGS START SOMEWHERE</span>
        </div>
        <div className="contact-grid">
          <div className="contact-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> OPEN TO GOOD IDEAS</div>
            <h2>LET’S BUILD<br />SOMETHING<br /><em>MEANINGFUL.</em></h2>
            <p>Have an interesting idea or project? I’d love to hear what you’re thinking. Let’s turn it into something people remember.</p>
            <a className="email-link" href="mailto:hello@vineet.dev">
              HELLO@VINEET.DEV <ArrowUpRight size={16} />
            </a>
            <div className="socials">
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <Github size={15} /> GITHUB <ArrowUpRight size={12} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <Linkedin size={15} /> LINKEDIN <ArrowUpRight size={12} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                ◎ INSTAGRAM <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
          
          <form
            className="contact-form"
            onSubmit={async e => {
              e.preventDefault();
              setSending(true);
              setFormError('');
              const form = e.currentTarget;
              const data = Object.fromEntries(new FormData(form).entries());
              try {
                const response = await fetch('/api/contact', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data)
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.error || 'Please try again.');
                setSent(true);
                form.reset();
                setEmail('');
              } catch (err) {
                setFormError(err instanceof Error ? err.message : 'Something went wrong.');
              } finally {
                setSending(false);
              }
            }}
          >
            <div className="form-top">
              <span>01 / SAY HELLO</span>
              <Command size={18} />
            </div>
            <label>
              Your name
              <input required name="name" maxLength={100} placeholder="What should I call you?" />
            </label>
            <label>
              Email address
              <input required name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
            </label>
            <label>
              What’s on your mind?
              <select name="subject" required defaultValue="">
                <option value="" disabled>Choose a starting point</option>
                <option>New project</option>
                <option>Freelance opportunity</option>
                <option>Just saying hello</option>
              </select>
            </label>
            <label>
              A few more details
              <textarea name="message" required minLength={10} maxLength={4000} rows={3} placeholder="A little about the idea, the timeline, or anything else…" />
            </label>
            <label className="honeypot" aria-hidden="true">
              Leave this empty
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
            <button className="button button-hot form-submit" type="submit" disabled={sending || sent}>
              {sent ? (
                <>MESSAGE SENT <Check size={16} /></>
              ) : sending ? (
                'SENDING…'
              ) : (
                <>SEND A NOTE <ArrowUpRight size={16} /></>
              )}
            </button>
            <span role="status" className="form-foot">
              {formError || (sent ? 'Thanks for reaching out — I’ll be in touch soon.' : 'NO SPAM. NO PRESSURE. JUST A CONVERSATION.')}
            </span>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer section-shell">
        <Mark />
        <span>DESIGNED & BUILT WITH CARE <Asterisk size={13} /> IN INDORE, INDIA</span>
        <a href="#home">BACK TO THE TOP <ArrowUpRight size={14} /></a>
        <small>© 2025 VINEET. ALL GOOD THINGS RESERVED.</small>
      </footer>
      
      <div className="progress-rail"><span /></div>
    </main>
  );
}
