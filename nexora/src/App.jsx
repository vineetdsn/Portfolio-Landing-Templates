import { useMemo, useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Asterisk, MoveUpRight } from 'lucide-react';

const projects = [
  { n: '01', name: 'Serein', type: 'Digital product', year: '2025', kind: 'Digital', tone: 'sage', summary: 'A quieter way to care for your day.', mark: 'serein', shape: 'orb' },
  { n: '02', name: 'Moss Objects', type: 'Identity · Commerce', year: '2024', kind: 'Identity', tone: 'sand', summary: 'An honest identity for useful things.', mark: 'moss', shape: 'arch' },
  { n: '03', name: 'Soft Signal', type: 'Creative development', year: '2024', kind: 'Digital', tone: 'rose', summary: 'Making room for a more human internet.', mark: 'soft signal', shape: 'ribbon' },
  { n: '04', name: 'Form Study 01', type: 'Digital craft', year: '2023', kind: 'Experiments', tone: 'blue', summary: 'A small study in balance and material.', mark: 'form', shape: 'stack' },
];
const filters = ['Selected', 'Digital', 'Identity', 'Experiments'];

function ProjectArtwork({ project }) {
  return <div className={`project-art art-${project.tone}`} aria-hidden="true">
    <div className={`art-shape shape-${project.shape}`}><span>{project.mark}</span></div>
    <i className="art-orbit orbit-one" /><i className="art-orbit orbit-two" />
    <span className="art-index">N / {project.n}</span>
  </div>;
}

function App() {
  const [active, setActive] = useState('Selected');
  const [menuOpen, setMenuOpen] = useState(false);
  const shownProjects = useMemo(() => active === 'Selected' ? projects : projects.filter(p => p.kind === active), [active]);

  return <div className="site-shell" id="top">
    <header className="masthead">
      <a className="wordmark" href="#top" aria-label="Nexora, home"><span className="brand-gem"><Asterisk size={19} strokeWidth={1.5} /></span><span>NEXORA<span className="brand-dot">.</span></span></a>
      <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation">
        <a href="#work" onClick={() => setMenuOpen(false)}>Work <span>04</span></a>
        <a href="#about" onClick={() => setMenuOpen(false)}>Studio</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
      </nav>
      <div className="masthead-right"><span className="availability"><i /> Available for select projects</span><button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button></div>
    </header>

    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> Independent digital practice <span className="eyebrow-year">— 2025</span></p>
          <h1 id="hero-title">A softer kind<br />of <em>future.</em></h1>
          <p className="hero-intro">Nexora is a design practice shaping digital experiences with clarity, character, and a little more feeling.</p>
          <div className="hero-links"><a className="round-link" href="#work">Explore selected work <span><ArrowDownRight size={16} /></span></a><span className="hero-note">Strategy&nbsp; · &nbsp;Identity&nbsp; · &nbsp;Digital</span></div>
        </div>
        <div className="hero-art" aria-label="Sculptural stack of polished forms in ivory, amber, blush, and sage">
          <div className="art-halo halo-a" /><div className="art-halo halo-b" />
          <img src="/stillness-stack.png" alt="Four polished organic forms balanced in a stack" />
          <div className="art-caption"><span>FIG. 01</span><span>Balance in progress</span></div>
          <div className="art-stamp"><Asterisk size={24} strokeWidth={1.2} /></div>
        </div>
        <aside className="side-index"><span>01 — 04</span><span className="side-index-line"/><span>Scroll to explore</span></aside>
        <div className="hero-bottom"><span>Thoughtfully made<br />for what comes next.</span><a href="#work" aria-label="Scroll to selected work"><ArrowDownRight size={18} /></a><span className="hero-location">Independent · Available worldwide</span></div>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> The portfolio</p><h2 id="work-title">Selected work<span className="heading-period">.</span></h2></div><p className="section-aside">A collection of digital places,<br />identities, and small experiments.</p></div>
        <div className="work-toolbar"><span className="work-count">Showing <b>{String(shownProjects.length).padStart(2, '0')}</b> projects</span><div className="filters" role="group" aria-label="Filter projects">{filters.map(filter => <button key={filter} type="button" className={active === filter ? 'filter active' : 'filter'} aria-pressed={active === filter} onClick={() => setActive(filter)}>{filter}</button>)}</div></div>
        <div className="project-grid" aria-live="polite">{shownProjects.map((project, index) => <article className={`project project-${index + 1}`} key={project.n}>
          <a className="project-link" href="#contact" aria-label={`Discuss a project like ${project.name}`}><ProjectArtwork project={project} /><div className="project-meta"><div><span className="project-kind">{project.type}</span><h3>{project.name}</h3><p>{project.summary}</p></div><span className="project-arrow"><ArrowUpRight size={17} /></span></div></a>
        </article>)}</div>
      </section>

      <section className="about-section" id="about"><div className="about-marker"><span>02</span><span className="marker-rule"/><span>Studio notes</span></div><div className="about-main"><p className="eyebrow"><span className="eyebrow-line" /> A considered approach</p><h2>Good work should<br />feel <em>inevitable.</em></h2><div className="about-foot"><p>From the first sketch to the final interaction, I bring brand thinking and digital craft into one thoughtful process. Small teams, open minds, meticulous details.</p><a className="text-link" href="#contact">A little more about the practice <MoveUpRight size={15}/></a></div></div><div className="about-side"><div className="mini-relief"><div className="mini-sun"/><div className="mini-wave wave-a"/><div className="mini-wave wave-b"/><span>Make<br/>room.</span></div><p>Less noise. More meaning.<br/>Always made with care.</p></div></section>

      <section className="contact-section" id="contact"><div className="contact-top"><p className="eyebrow"><span className="eyebrow-line" /> Have a good one in mind?</p><span className="contact-coord">NEXORA / 25</span></div><div className="contact-main"><h2>Let's make<br /><em>something matter.</em></h2><a className="contact-button" href="mailto:hello@nexora.studio"><span>Start a conversation</span><ArrowUpRight size={19}/></a></div><footer className="site-footer"><a className="wordmark footer-brand" href="#top"><span className="brand-gem"><Asterisk size={16} strokeWidth={1.5} /></span><span>NEXORA<span className="brand-dot">.</span></span></a><span>Independent by nature. Connected by design.</span><div><a href="#top">Back to top ↑</a><span>© 2025</span></div></footer></section>
    </main>
  </div>;
}

export default App;
