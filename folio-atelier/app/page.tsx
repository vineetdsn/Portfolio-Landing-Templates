import Image from "next/image";

const projects = [
  { number: "01", name: "Orbit Finance", type: "Fintech · Product design", color: "orbit", detail: "A calmer way to see the whole financial picture.", label: "orbit / 24" },
  { number: "02", name: "Goodfolk Market", type: "Commerce · Development", color: "goodfolk", detail: "A neighborhood marketplace with room to grow.", label: "GOODFOLK®" },
  { number: "03", name: "Fieldnotes", type: "Culture · Digital experience", color: "fieldnotes", detail: "Stories and places for the curious outdoors.", label: "FIELD\nNOTES" },
];

const services = [
  { n: "01", title: "Digital experiences", copy: "Websites and product interfaces with a clear point of view." },
  { n: "02", title: "Frontend development", copy: "Fast, accessible builds that feel as good as they look." },
  { n: "03", title: "Creative direction", copy: "A thoughtful visual system from first sketch to final detail." },
];

export default function Home() {
  return (
    <main>
      <header className="topbar wrap">
        <a className="wordmark" href="#top" aria-label="Mira Sol, home"><span className="mark">m.</span> mira sol</a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a><a href="#about">About</a><a href="#notes">Experience</a><a href="#contact" className="nav-contact">Let&apos;s talk <span>↗</span></a>
        </nav>
      </header>

      <section className="hero wrap" id="top">
        <div className="hero-meta"><span>INDEPENDENT DEVELOPER</span><span>BASED IN BROOKLYN · AVAILABLE WORLDWIDE</span></div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Design-minded developer / 2025—26</p>
            <h1>Make it<br /><em>matter.</em></h1>
            <div className="hero-bottom">
              <p>I build useful, human digital things—with a little more feeling and a lot of care.</p>
              <a className="round-link" href="#work" aria-label="Explore selected work">↓</a>
            </div>
          </div>
          <div className="hero-art" aria-label="Illustrated portrait of Mira Sol">
            <div className="hero-blob hero-blob-one" /><div className="hero-blob hero-blob-two" />
            <svg className="hero-scribble" viewBox="0 0 140 100" fill="none" aria-hidden="true"><path d="M7 80C35 17 58 105 91 44C108 12 119 18 133 29" /><path d="m119 15 15 14-20 4" /></svg>
            <div className="hero-photo"><Image src="/hero-portrait-v2.png" alt="Illustrated portrait of a creative developer wearing round glasses" fill priority sizes="(max-width: 600px) 85vw, 40vw" /></div>
            <span className="art-stamp">✳</span><span className="art-note">always curious<br />↘</span>
            <div className="hero-role"><span>CREATIVE DEVELOPER</span><b>Code with<br />a point of view.</b></div>
            <div className="hero-card"><span className="hero-card-dot" /><div><strong>Mira Sol</strong><small>Design-minded developer</small></div><span className="hero-card-arrow">↗</span></div>
          </div>
        </div>
        <div className="hero-foot"><span>SCROLL TO EXPLORE</span><span>✳ &nbsp; DESIGN × CODE × CARE</span></div>
      </section>

      <section className="intro wrap" id="about">
        <div className="section-kicker">A GOOD PLACE TO START <span>01 / ABOUT</span></div>
        <div className="intro-grid">
          <h2>Thoughtful by<br />design. <span>Curious</span><br />by nature.</h2>
          <div className="intro-copy"><p>I&apos;m Mira, an independent creative developer partnering with good people to turn ambitious ideas into clear, considered digital experiences.</p><p>My sweet spot is where expressive design meets sturdy engineering—making the internet feel a little more human, one detail at a time.</p><a className="text-link" href="#contact">A little more about me <span>↗</span></a></div>
        </div>
        <div className="services">
          {services.map((service) => <article className="service" key={service.n}><div className="service-top"><span>{service.n}</span><span className="service-arrow">↗</span></div><h3>{service.title}</h3><p>{service.copy}</p></article>)}
        </div>
      </section>

      <section className="work wrap" id="work">
        <div className="section-kicker">A FEW RECENT FAVOURITES <span>02 / SELECTED WORK</span></div>
        <div className="work-heading"><h2>Made with<br /><em>good people.</em></h2><p>A small selection of projects built with curiosity, collaboration, and the occasional late-night playlist.</p></div>
        <div className="project-list">
          {projects.map((project) => <article className={`project ${project.color}`} key={project.number}>
            <div className="project-visual"><div className="visual-top"><span>{project.label}</span><span>↗</span></div><div className="mock-window"><div className="mock-bar"><i /><i /><i /><span>{project.name.toLowerCase().replaceAll(" ", "")}.studio</span></div><div className="mock-content"><div className="mock-copy"><span className="mock-overline">{project.type.split(" · ")[0]}</span><b>{project.color === "orbit" ? "Money, in" : project.color === "goodfolk" ? "Local looks" : "Find your"}<br />{project.color === "orbit" ? "its element." : project.color === "goodfolk" ? "good." : "outside."}</b><small>Thoughtfully made for everyday life.</small></div><div className="mock-shape"><span>{project.color === "orbit" ? "◒" : project.color === "goodfolk" ? "✿" : "↗"}</span></div></div></div><span className="visual-index">{project.number} / 03</span></div>
            <div className="project-info"><div><span className="project-type">{project.type}</span><h3>{project.name}</h3></div><p>{project.detail}</p><a href="#contact" aria-label={`Ask about ${project.name}`}>↗</a></div>
          </article>)}
        </div>
        <div className="work-end"><span>MORE GOOD THINGS IN THE WORKS</span><span className="spark">✳</span></div>
      </section>

      <section className="experience wrap" id="notes">
        <div className="section-kicker">THE PATH SO FAR <span>03 / EXPERIENCE</span></div>
        <div className="experience-grid">
          <div><h2>Growing,<br /><em>by doing.</em></h2><p className="experience-lede">A few chapters that taught me how to make better things with better people.</p></div>
          <div className="timeline">
            <article><span>2022 — NOW</span><div><h3>Independent Developer</h3><p>Partnering with studios, founders, and kind teams to bring digital ideas to life.</p></div><span className="timeline-dot" /></article>
            <article><span>2020 — 2022</span><div><h3>Creative Technologist · Northstar</h3><p>Built playful, accessible experiences for brands with something to say.</p></div><span className="timeline-dot" /></article>
            <article><span>2016 — 2020</span><div><h3>Design &amp; Media · Pratt Institute</h3><p>Learned to ask better questions and make a lot of things that didn&apos;t work.</p></div><span className="timeline-dot" /></article>
          </div>
        </div>
        <div className="toolbox"><span className="toolbox-label">TOOLS I LIKE</span><div>{["Next.js", "React", "TypeScript", "Figma", "CSS", "Webflow", "Storybook", "A good notebook"].map((tool) => <span className="pill" key={tool}>{tool}</span>)}</div></div>
      </section>

      <footer className="contact wrap" id="contact">
        <div className="section-kicker">HAVE A GOOD ONE IN MIND? <span>04 / CONTACT</span></div>
        <div className="contact-main"><p className="eyebrow"><span className="status-dot" /> OPEN FOR SELECT PROJECTS</p><h2>Let&apos;s make<br />something <em>matter.</em></h2><a className="contact-button" href="mailto:hello@mirasol.studio">hello@mirasol.studio <span>↗</span></a></div>
        <div className="footer-bottom"><a className="wordmark" href="#top"><span className="mark">m.</span> mira sol</a><span>INDEPENDENT BY NATURE. COLLABORATIVE BY DEFAULT.</span><div><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">INSTAGRAM ↗</a></div><span>© 2025—26</span></div>
      </footer>
    </main>
  );
}
