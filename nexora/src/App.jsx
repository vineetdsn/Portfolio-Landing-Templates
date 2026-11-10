import React, { useState, useEffect } from 'react';
import { 
  Search, 
  User, 
  ChevronLeft, 
  ChevronRight, 
  CheckSquare, 
  Droplet, 
  ArrowUpRight, 
  Code, 
  Layers, 
  Send, 
  Sparkles, 
  Clock, 
  Compass, 
  ExternalLink,
  FolderGit2,
  Cpu,
  Mail,
  Home,
  AlertCircle
} from 'lucide-react';
import './styles.css';

// Mini pebble mosaic SVG for thumbnail art
function PebbleMosaic() {
  return (
    <div className="pebble-mosaic" aria-hidden="true">
      <svg viewBox="0 0 70 70" width="56" height="56">
        <rect x="2" y="2" width="66" height="66" rx="14" fill="#e2e4e8" />
        <path d="M12 14 C12 10 18 8 24 10 C28 12 28 20 22 22 C16 24 12 20 12 14 Z" fill="#fca5a5" />
        <path d="M28 10 C34 8 42 10 44 15 C46 20 40 24 34 23 C28 22 26 14 28 10 Z" fill="#fdba74" />
        <path d="M46 12 C52 10 58 14 58 19 C58 24 52 26 46 23 C42 20 42 14 46 12 Z" fill="#86efac" />
        <path d="M10 26 C12 22 20 24 22 28 C24 34 18 38 12 36 C8 34 8 28 10 26 Z" fill="#fed7aa" />
        <path d="M24 26 C30 25 36 28 36 34 C36 40 28 42 22 38 C18 34 20 28 24 26 Z" fill="#fbcfe8" />
        <path d="M38 25 C46 24 52 28 54 34 C54 40 46 42 40 38 C36 34 34 28 38 25 Z" fill="#f97316" />
        <path d="M12 40 C18 38 24 42 22 48 C20 54 12 56 8 50 C6 44 10 40 12 40 Z" fill="#65a30d" />
        <path d="M26 42 C32 40 40 44 38 52 C36 58 28 58 22 54 C18 50 22 44 26 42 Z" fill="#fed7aa" />
        <path d="M42 42 C50 40 56 46 54 52 C52 58 44 60 38 56 C34 52 38 44 42 42 Z" fill="#fb923c" />
        <path d="M14 54 C20 52 26 56 24 62 C22 66 14 66 10 62 C8 58 10 54 14 54 Z" fill="#ca8a04" />
        <path d="M28 56 C36 54 44 58 42 64 C40 68 32 68 26 64 C22 60 24 56 28 56 Z" fill="#f87171" />
        <path d="M46 54 C54 52 60 56 58 62 C56 66 48 68 44 64 C40 60 42 56 46 54 Z" fill="#86efac" />
      </svg>
    </div>
  );
}

// Live Analog Clock
function AnalogClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDeg = (hours + minutes / 60) * 30;
  const minuteDeg = (minutes + seconds / 60) * 6;

  return (
    <div className="clock-dial" aria-label="Analog Clock">
      <span className="tick tick-12" />
      <span className="tick tick-3" />
      <span className="tick tick-6" />
      <span className="tick tick-9" />
      <div className="hand hour-hand" style={{ transform: `rotate(${hourDeg}deg)` }} />
      <div className="hand minute-hand" style={{ transform: `rotate(${minuteDeg}deg)` }} />
      <div className="clock-center-pin" />
    </div>
  );
}

export default function App() {
  const getInitialPage = () => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'work', 'about', 'lab', 'contact', '404'].includes(hash)) {
        return hash;
      }
    }
    return 'home';
  };

  const [activePage, setActivePage] = useState(getInitialPage);
  const [slideIndex, setSlideIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  
  // Contact form state
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'work', 'about', 'lab', 'contact', '404'].includes(hash)) {
        setActivePage(hash);
      } else if (!hash) {
        setActivePage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page) => {
    setActivePage(page);
    if (page === 'home') {
      history.pushState(null, '', window.location.pathname);
    } else {
      window.location.hash = page;
    }
  };

  const portfolioSlides = [
    {
      title: 'NEXORA',
      subtitle: 'Frontend Engineer & Creative Designer crafting tactile, high-performance web spaces.',
      linkText: 'Explore Selected Work ↗',
      tag: '01'
    },
    {
      title: 'BALANCE',
      subtitle: 'Building harmonious software with clean architecture, micro-interactions, and visual calm.',
      linkText: 'Read Philosophy ↗',
      tag: '02'
    }
  ];

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % portfolioSlides.length);
  };

  const handlePrevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + portfolioSlides.length) % portfolioSlides.length);
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((clientY - rect.top) / rect.height - 0.5) * 12;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  const currentSlide = portfolioSlides[slideIndex];

  return (
    <div className="neumorphic-canvas">
      {/* Main Floating Neumorphic Master Chassis */}
      <div className="master-tablet" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        
        {/* Top Navigation Bar */}
        <header className="neu-topbar">
          <div className="topbar-left">
            {/* Pebble Brand Home Button */}
            <button 
              className={`neu-btn neu-circle-btn brand-btn ${activePage === 'home' ? 'active' : ''}`}
              onClick={() => navigateTo('home')}
              title="Home"
              aria-label="Portfolio Home"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <ellipse cx="12" cy="7" rx="5" ry="2.2" />
                <ellipse cx="12" cy="12" rx="7" ry="2.6" />
                <ellipse cx="12" cy="17.5" rx="8.5" ry="3" />
              </svg>
            </button>

            {/* Nav links */}
            <nav className="neu-nav-links">
              {[
                { id: 'home', label: 'Overview' },
                { id: 'work', label: 'Work' },
                { id: 'about', label: 'About' },
                { id: 'lab', label: 'Lab (Coming Soon)' },
                { id: 'contact', label: 'Contact' },
                { id: '404', label: '404' }
              ].map((item) => (
                <button
                  key={item.id}
                  className={`neu-nav-item ${activePage === item.id ? 'active' : ''}`}
                  onClick={() => navigateTo(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="topbar-right">
            {/* Neumorphic Inset Search Bar */}
            <div className="neu-search-pill">
              <Search size={14} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search skills, projects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search" 
              />
            </div>

            {/* User Profile Avatar Button */}
            <button 
              className={`neu-btn neu-circle-btn profile-btn ${activePage === 'about' ? 'active' : ''}`}
              onClick={() => navigateTo('about')}
              title="About Me"
              aria-label="About Creator"
            >
              <User size={15} />
            </button>
          </div>
        </header>

        {/* ========================================================= */}
        {/* PAGE 1: HOME / OVERVIEW (DASHBOARD)                       */}
        {/* ========================================================= */}
        {activePage === 'home' && (
          <div className="neu-main-grid fade-in">
            {/* Left Column (3 Neumorphic Cards) */}
            <div className="neu-left-col">
              
              {/* WIDGET 1: Analog Clock & Live Availability */}
              <div className="neu-card clock-card">
                <div className="clock-left">
                  <AnalogClock />
                </div>
                <div className="clock-right">
                  <button className="neu-btn neu-circle-btn assistant-btn" aria-label="Status active">
                    <span className="dot dot-red" />
                    <span className="dot dot-blue" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                  </button>

                  <div className="clock-date-group">
                    <span className="demo-label">Available Q1</span>
                    <span className="demo-date">2026</span>
                  </div>
                </div>
              </div>

              {/* WIDGET 2: Tech Stack & Project Status */}
              <div className="neu-card status-card">
                <ul className="status-list">
                  <li className="status-item" onClick={() => navigateTo('work')}>
                    <div className="item-title">
                      <span className="status-indicator dot-green-circle" />
                      <span className="item-name">Production UI</span>
                    </div>
                    <div className="item-metrics">
                      <span className="metric"><Droplet size={11} className="metric-icon drop-orange" /> React</span>
                      <span className="metric"><Droplet size={11} className="metric-icon drop-teal" /> Vite</span>
                      <span className="metric"><CheckSquare size={11} className="metric-icon check-gray" /> 100%</span>
                    </div>
                  </li>

                  <li className="status-item" onClick={() => navigateTo('work')}>
                    <div className="item-title">
                      <span className="status-indicator dot-peach-circle" />
                      <span className="item-name">3D WebGL</span>
                    </div>
                    <div className="item-metrics">
                      <span className="metric"><Droplet size={11} className="metric-icon drop-orange" /> Three.js</span>
                      <span className="metric"><Droplet size={11} className="metric-icon drop-teal" /> GSAP</span>
                      <span className="metric"><CheckSquare size={11} className="metric-icon check-gray" /> 60fps</span>
                    </div>
                  </li>

                  <li className="status-item" onClick={() => navigateTo('about')}>
                    <div className="item-title">
                      <span className="status-indicator dot-amber-circle" />
                      <span className="item-name">Design Systems</span>
                    </div>
                    <div className="item-metrics">
                      <span className="metric"><Droplet size={11} className="metric-icon drop-orange" /> Figma</span>
                      <span className="metric"><Droplet size={11} className="metric-icon drop-teal" /> Tokens</span>
                      <span className="metric"><CheckSquare size={11} className="metric-icon check-gray" /> Pro</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* WIDGET 3: Focus on tasks that matter */}
              <div className="neu-card focus-card">
                <PebbleMosaic />
                <div className="focus-copy">
                  <p className="focus-heading">Focus on craft<br />that endures</p>
                  <button onClick={() => navigateTo('about')} className="focus-link-btn">
                    Learn more <ArrowUpRight size={13} />
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Showcase Card */}
            <div className="neu-card hero-showcase-card">
              <div className="hero-copy-group">
                <h1 className="dallo-brand">{currentSlide.title}</h1>
                <p className="dallo-subtitle">{currentSlide.subtitle}</p>
                <button 
                  onClick={() => navigateTo(slideIndex === 0 ? 'work' : 'about')} 
                  className="dallo-join-btn"
                >
                  {currentSlide.linkText}
                </button>
              </div>

              {/* Balancing Stones with Mouse Parallax */}
              <div
                className="hero-stones-wrap"
                style={{
                  transform: `translate(${mousePos.x}px, ${mousePos.y}px)`
                }}
              >
                <img
                  src="/stillness-stack.png"
                  alt="Balanced stack of 4 organic polished pebble stones"
                  className="stones-image"
                />
              </div>

              {/* Segmented Dual-Pill Slider */}
              <div className="neu-slider-control">
                <button className="slider-arrow-btn" onClick={handlePrevSlide} aria-label="Previous Slide">
                  <ChevronLeft size={16} />
                </button>
                <button className="slider-arrow-btn" onClick={handleNextSlide} aria-label="Next Slide">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 2: SELECTED WORK / PROJECTS                          */}
        {/* ========================================================= */}
        {activePage === 'work' && (
          <div className="neu-subpage-view fade-in">
            <div className="subpage-header">
              <div>
                <span className="section-badge">PORTFOLIO · 2026</span>
                <h2 className="subpage-title">Selected Projects</h2>
              </div>
              <p className="subpage-desc">Handcrafted digital products, responsive web interfaces, and interactive 3D experiments.</p>
            </div>

            <div className="projects-neu-grid">
              {[
                {
                  id: '01',
                  name: 'Cosmic Studio 3D',
                  type: 'WebGL / Three.js · Interactive Canvas',
                  desc: 'Space-themed zero-gravity experience with dynamic spring physics, cratered 3D moon, and live particle thrust.',
                  tags: ['Three.js', 'GSAP', 'WebGL', 'Physics']
                },
                {
                  id: '02',
                  name: 'Alex Morgan Portfolio',
                  type: 'Creative Frontend · Interaction Design',
                  desc: 'Deep midnight-blue portfolio featuring mouse-tracking eye gaze physics and 3D parallax illustration.',
                  tags: ['Vanilla JS', 'SVG Art', 'Performance']
                },
                {
                  id: '03',
                  name: 'Serein Platform',
                  type: 'Product Architecture · Design System',
                  desc: 'Mindful productivity app built with soft tactile neumorphic principles and distraction-free workspace.',
                  tags: ['React', 'Design Tokens', 'Tailwind']
                },
                {
                  id: '04',
                  name: 'Blue Hour 3D',
                  type: 'Next.js 14 · Spatial Showroom',
                  desc: 'Procedural tech showroom with 5 dynamic Three.js scenes, GSAP camera animations, and smooth transitions.',
                  tags: ['Next.js', 'R3F', 'TypeScript']
                }
              ].map((proj) => (
                <div key={proj.id} className="neu-card project-card">
                  <div className="project-top">
                    <span className="project-num">{proj.id}</span>
                    <button className="neu-btn neu-circle-btn project-link-icon" title="View details" aria-label={`View ${proj.name}`}>
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                  <h3 className="project-heading">{proj.name}</h3>
                  <span className="project-category">{proj.type}</span>
                  <p className="project-summary">{proj.desc}</p>
                  <div className="project-tags">
                    {proj.tags.map(t => <span key={t} className="neu-tag">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 3: ABOUT / PROFILE                                   */}
        {/* ========================================================= */}
        {activePage === 'about' && (
          <div className="neu-subpage-view fade-in">
            <div className="about-neu-layout">
              <div className="neu-card about-bio-card">
                <span className="section-badge">BIO · PHILOSOPHY</span>
                <h2 className="subpage-title">Digital Craftsman with a passion for tactile interfaces.</h2>
                <p className="bio-paragraph">
                  I specialize in bridging the gap between <strong>high-end interactive design</strong> and 
                  <strong> solid engineering architecture</strong>. With a focus on neumorphism, WebGL 3D, and thoughtful micro-interactions, 
                  I build digital places that feel tangible, smooth, and human.
                </p>
                <div className="about-stats-row">
                  <div className="stat-box">
                    <span className="stat-number">05+</span>
                    <span className="stat-label">Years of Craft</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-number">24</span>
                    <span className="stat-label">Delivered Projects</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-number">60fps</span>
                    <span className="stat-label">Motion Standard</span>
                  </div>
                </div>
              </div>

              <div className="neu-card about-journey-card">
                <h3 className="journey-heading">Milestones & Practice</h3>
                <ul className="journey-timeline">
                  <li>
                    <span className="journey-dot" />
                    <div>
                      <span className="journey-year">2024 — NOW</span>
                      <h4 className="journey-role">Independent Creative Developer</h4>
                      <p className="journey-desc">Collaborating with product teams globally on modern web SPAs and design systems.</p>
                    </div>
                  </li>
                  <li>
                    <span className="journey-dot" />
                    <div>
                      <span className="journey-year">2022 — 2024</span>
                      <h4 className="journey-role">Senior Frontend Specialist</h4>
                      <p className="journey-desc">Architecting responsive React/Next.js platforms and WebGL interactive modules.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 4: LAB / EXPERIMENTS (COMING SOON)                   */}
        {/* ========================================================= */}
        {activePage === 'lab' && (
          <div className="neu-subpage-view fade-in">
            <div className="neu-card lab-card">
              <div className="lab-badge-row">
                <span className="section-badge pulse-badge">EXPERIMENTAL LAB · IN PROGRESS</span>
              </div>
              <h2 className="lab-title">Creative Lab & Shaders</h2>
              <p className="lab-subtitle">
                A playground for custom GLSL fragment shaders, physics simulations, spatial computing concepts, and tactile sound design.
              </p>

              <div className="lab-grid-preview">
                <div className="lab-preview-item">
                  <Cpu size={24} className="lab-icon" />
                  <h4>Raymarching Glass</h4>
                  <p>Real-time refraction and volumetric caustic caustics.</p>
                  <span className="lab-status">Brewing</span>
                </div>
                <div className="lab-preview-item">
                  <Sparkles size={24} className="lab-icon" />
                  <h4>Kinetic Typography</h4>
                  <p>Variable font displacement mapped to audio frequency.</p>
                  <span className="lab-status">In Review</span>
                </div>
                <div className="lab-preview-item">
                  <Layers size={24} className="lab-icon" />
                  <h4>Neumorphic 3D OS</h4>
                  <p>Full desktop workspace concept rendered with Three.js.</p>
                  <span className="lab-status">Coming Soon</span>
                </div>
              </div>

              <div className="lab-notify-group">
                <input 
                  type="email" 
                  placeholder="Enter email for lab drops..." 
                  className="lab-input"
                  aria-label="Email for notifications"
                />
                <button className="neu-btn neu-pill-btn notify-btn">
                  Notify Me ↗
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 5: CONTACT / REACH OUT                               */}
        {/* ========================================================= */}
        {activePage === 'contact' && (
          <div className="neu-subpage-view fade-in">
            <div className="contact-neu-layout">
              <div className="neu-card contact-info-card">
                <span className="section-badge">INQUIRIES · COLLABORATION</span>
                <h2 className="subpage-title">Have a project in mind?</h2>
                <p className="contact-lede">
                  Whether you need an interactive portfolio, a full-scale web product, or creative 3D engineering, let's build something memorable.
                </p>

                <div className="contact-methods">
                  <a href="mailto:hello@nexora.studio" className="contact-email-link">
                    <Mail size={16} /> hello@nexora.studio
                  </a>
                  <div className="contact-location">
                    <span>Remote Worldwide</span>
                    <span>·</span>
                    <span>Based in Digital Space</span>
                  </div>
                </div>
              </div>

              <div className="neu-card contact-form-card">
                <h3 className="form-heading">Send a Message</h3>
                {formSent ? (
                  <div className="form-success-box">
                    <CheckSquare size={28} className="success-icon" />
                    <h4>Message Received!</h4>
                    <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="neu-form">
                    <div className="neu-input-field">
                      <label htmlFor="name">Your Name</label>
                      <input 
                        id="name"
                        type="text" 
                        required 
                        placeholder="Jane Doe" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="neu-input-field">
                      <label htmlFor="email">Email Address</label>
                      <input 
                        id="email"
                        type="email" 
                        required 
                        placeholder="jane@example.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div className="neu-input-field">
                      <label htmlFor="message">Message</label>
                      <textarea 
                        id="message"
                        rows={3} 
                        required 
                        placeholder="Tell me a little about your project..." 
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                    <button type="submit" className="neu-btn neu-pill-btn submit-btn">
                      Send Message <Send size={14} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 6: 404 PAGE (LOST IN BALANCE)                        */}
        {/* ========================================================= */}
        {activePage === '404' && (
          <div className="neu-subpage-view fade-in">
            <div className="neu-card not-found-card">
              <div className="not-found-badge">
                <AlertCircle size={18} className="alert-icon" />
                <span>PAGE NOT FOUND</span>
              </div>
              <h1 className="not-found-num">404</h1>
              <h2 className="not-found-heading">Off Balance.</h2>
              <p className="not-found-desc">
                The coordinates you entered drifted away or this page has been moved to another quadrant.
              </p>
              <div className="not-found-actions">
                <button 
                  onClick={() => navigateTo('home')} 
                  className="neu-btn neu-pill-btn return-home-btn"
                >
                  <Home size={15} /> Return to Balance (Home)
                </button>
                <button 
                  onClick={() => navigateTo('work')} 
                  className="neu-btn neu-pill-btn secondary-btn"
                >
                  Explore Work ↗
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Editorial Caption */}
      <footer className="canvas-footer">
        <h2 className="footer-lead">I'm futuristic</h2>
        <p className="footer-sub">Neumorphism Portfolio</p>
      </footer>
    </div>
  );
}
