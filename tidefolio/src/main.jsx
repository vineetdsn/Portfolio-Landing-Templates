import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowRight, ArrowUpRight, MoveUpRight } from 'lucide-react';
import './styles.css';
import './bright.css';

function Mark() {
  return <a className="brand" href="/" aria-label="Mira Sen home"><span className="brand-mark">m<span>.</span></span><span className="brand-name">MIRA SEN<br /><small>INDEPENDENT DESIGNER</small></span></a>;
}

function Header({ page }) {
  return <header className="header"><Mark /><nav className="nav" aria-label="Main navigation"><a className={page === 'home' ? 'active' : ''} href="/">Home</a><a className={page === 'about' ? 'active' : ''} href="/about">About</a><a className="nav-contact" href="mailto:hello@mirasen.design">Say hello <ArrowUpRight size={14} /></a></nav></header>;
}

function Fish({ x, y, scale = 1, flip = false, color = '#ffb174' }) {
  return <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`} className="fish"><path d="M0 0c13-13 38-14 52 0-14 14-39 13-52 0Zm50 0 16-12v24L50 0Z" fill={color}/><circle cx="12" cy="-2" r="1.7" fill="#152e48"/><path d="M21-8c6 3 6 12 0 16" fill="none" stroke="#ffd4a7" strokeWidth="1.5" opacity=".8"/></g>;
}

function OceanArtwork() {
  return <div className="art-wrap" aria-label="Illustration of an imagined underwater world" role="img"><div className="art-label"><span>FIELD NOTES  /  01</span><span>THE LIVING BLUE</span></div>
    <svg className="ocean-art" viewBox="0 0 1200 690" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sea" x1=".1" y1="0" x2=".8" y2="1"><stop stopColor="#0a6b99"/><stop offset=".55" stopColor="#083b68"/><stop offset="1" stopColor="#061c37"/></linearGradient>
        <linearGradient id="light" x1="0" y1="0" x2=".8" y2="1"><stop stopColor="#e8e6d5"/><stop offset="1" stopColor="#c5dfd5"/></linearGradient>
        <radialGradient id="glow"><stop stopColor="#f6b96f" stopOpacity=".38"/><stop offset="1" stopColor="#f6b96f" stopOpacity="0"/></radialGradient>
        <pattern id="speckles" width="72" height="72" patternUnits="userSpaceOnUse"><circle cx="10" cy="18" r="1.4" fill="#b7d6cf" opacity=".18"/><circle cx="52" cy="48" r="1" fill="#e8d5a1" opacity=".2"/><circle cx="29" cy="64" r=".8" fill="#d9e9db" opacity=".25"/></pattern>
      </defs>
      <rect width="1200" height="690" fill="url(#sea)"/><rect width="1200" height="690" fill="url(#speckles)"/>
      <circle cx="1010" cy="108" r="240" fill="url(#glow)"/>
      <path d="M0 0h1200v162c-100 3-151 72-236 49-74-20-107-2-168 27-97 46-144-13-230 18-67 25-126 78-222 38-109-45-133-6-204-18-52-9-91-45-140-28Z" fill="#f7f5ed"/>
      <path d="M0 142c117-35 152-9 238 8 90 18 141 3 201-20 80-31 121 42 203 29 81-13 120-72 219-41 80 24 116 24 186-5 70-29 93-38 153-34" fill="none" stroke="#1ecded" strokeWidth="24"/>
      <path d="M0 168c118-27 172 12 251 19 101 9 146-28 204-25 77 4 124 56 199 42 78-14 120-64 204-42 85 23 143 42 216 9 51-23 78-35 126-35" fill="none" stroke="#b0d8cb" strokeWidth="11"/>
      <path d="M0 189c113-20 167 21 247 25 108 6 147-19 211-14 77 5 128 45 194 32 77-15 119-51 200-33 83 18 146 41 224 4 48-23 77-32 124-31" fill="none" stroke="#ebd6a6" strokeWidth="4" opacity=".95"/>
      <path d="M0 278c106-41 145-68 236-38 103 35 161 49 247 8 83-40 118-24 198 8 85 34 137 28 209-9 75-39 119-40 193-3 52 25 82 9 117-18v484H0Z" fill="#09668d"/>
      <path d="M0 375c89-50 139-91 241-50 81 33 132 67 211 29 78-37 117-56 197-23 95 39 143 51 232-2 91-55 146-74 235-19 39 24 63 25 84 16v364H0Z" fill="#063d66"/>
      <path d="M0 473c74-49 127-81 212-52 92 32 126 76 211 42 93-36 125-90 211-57 101 39 148 78 240 24 107-63 160-92 242-42 38 23 63 31 84 26v276H0Z" fill="#051e3e"/>
      <path d="M0 278c106-41 145-68 236-38 103 35 161 49 247 8 83-40 118-24 198 8 85 34 137 28 209-9 75-39 119-40 193-3 52 25 82 9 117-18v484H0Z" fill="url(#speckles)" opacity=".8"/>
      <path d="M52 209c62 20 104 33 162 28 78-7 131-40 205-21 81 21 139 62 210 48 80-15 136-51 211-35 77 17 133 34 201 10 57-20 92-49 132-51" fill="none" stroke="#f7f5ed" strokeWidth="4" opacity=".85"/>
      <g opacity=".65" fill="none" stroke="#8cc6b6" strokeWidth="5"><path d="M598 585c-12-68-1-106 7-143 8-37 2-69-13-91M608 565c22-48 42-70 55-103 13-32 16-62 1-91M600 573c-32-46-40-76-42-112-1-30 7-54 20-74"/><path d="M867 655c-7-43 3-78 21-113 13-25 18-54 12-77M883 658c29-31 46-63 51-96"/></g>
      <g fill="none" stroke="#d887a0" strokeWidth="8" strokeLinecap="round"><path d="M245 690c2-43 5-78 26-112m-13 82c-22-30-29-54-28-78m31 94c31-27 39-55 42-86m-85 55c-22-18-29-37-29-55"/><path d="M353 690c-5-38 4-68 18-98m-9 77c24-23 31-49 34-72m-56 43c-17-20-23-39-20-59"/></g>
      <g fill="none" stroke="#dfb58b" strokeWidth="7" strokeLinecap="round"><path d="M78 690c-5-37-2-64 15-94m-8 75c25-19 36-40 40-64m-44 36c-19-15-27-32-27-50"/><path d="M1028 690c-4-34 5-61 22-83m-10 70c19-18 31-36 34-58"/></g>
      <g fill="#d9e8d9" opacity=".8"><circle cx="282" cy="263" r="13"/><circle cx="320" cy="300" r="7"/><circle cx="727" cy="235" r="9"/><circle cx="779" cy="256" r="15"/><circle cx="498" cy="420" r="10"/><circle cx="948" cy="358" r="7"/></g>
      <g fill="none" stroke="#f1e6c5" strokeWidth="3" opacity=".72"><circle cx="282" cy="263" r="4"/><circle cx="320" cy="300" r="2"/><circle cx="727" cy="235" r="3"/><circle cx="779" cy="256" r="5"/><circle cx="498" cy="420" r="3"/></g>
      <Fish x={930} y={206} scale={1.25}/><Fish x={538} y={373} scale={.8} flip color="#e3aa85"/><Fish x={1040} y={400} scale={.65} flip color="#b8d9c7"/>
      <path d="M764 509c34-22 75-17 105 0-30 28-70 29-105 0Zm99 0 28-20v40l-28-20Z" fill="#8297a2" opacity=".5"/>
      <circle cx="849" cy="506" r="2" fill="#d8e0d9" opacity=".7"/>
    </svg>
    <div className="art-title"><span className="eyebrow">DESIGNER  ·  OCEAN DREAMER</span><h2>Design for<br />a <em>living</em> world.</h2><p>Curious ideas, shaped with care.</p></div>
    <div className="art-bottom"><span>36° 07' N&nbsp;&nbsp; 5° 21' W</span><span>SCROLL TO EXPLORE <ArrowDownRight size={15}/></span></div>
  </div>;
}

function ProjectCard({ number, title, type, style }) {
  return <a href="/about" className={`project-card ${style}`}><span className="project-number">{number} / 03</span><span className="project-shape" aria-hidden="true">{style === 'project-green' ? '✳' : style === 'project-lilac' ? '◒' : '≈'}</span><div className="project-info"><div><span>{type}</span><h3>{title}</h3></div><span className="round-arrow"><ArrowUpRight size={18}/></span></div></a>;
}

function Home() {
  return <><section className="intro"><span className="eyebrow">VISUAL DESIGNER & ART DIRECTOR</span><h1>Making good things<br />for a <em>big, blue</em> planet.</h1><p>I’m Mira, an independent designer partnering with kind people to make thoughtful brands and digital experiences.</p><a className="text-link" href="/about">A little about me <ArrowRight size={16}/></a><span className="intro-stamp">BASED BY<br/>THE SEA <i>✳</i></span></section><OceanArtwork/><section className="work-section"><div className="section-heading"><div><span className="eyebrow">A FEW THINGS I’VE MADE</span><h2>Selected work<span> (03)</span></h2></div><a className="text-link" href="/about">More about my approach <ArrowRight size={16}/></a></div><div className="project-grid"><ProjectCard number="01" title="Good Tide" type="IDENTITY · 2025" style="project-green"/><ProjectCard number="02" title="Sundays, slowly" type="CAMPAIGN · 2024" style="project-lilac"/><ProjectCard number="03" title="Open water" type="DIGITAL · 2024" style="project-yellow"/></div></section><section className="contact-strip"><span className="eyebrow">HAVE A GOOD ONE IN MIND?</span><a href="mailto:hello@mirasen.design">Let’s make a little wave <ArrowUpRight size={22}/></a><span className="contact-doodle">〰</span></section></>;
}

function About() {
  return <main className="about-page"><div className="about-hero"><div><span className="eyebrow">A HUMAN, NOT A STUDIO</span><h1>Hello, I’m Mira.<br /><em>I make things</em><br />with meaning.</h1><p className="about-lede">Independent designer, habitual beachcomber, and believer that the best work starts with paying attention.</p><a className="pill-link" href="mailto:hello@mirasen.design">Start a conversation <MoveUpRight size={15}/></a></div><div className="portrait-card"><div className="portrait-sun"></div><div className="portrait-wave wave-one"></div><div className="portrait-wave wave-two"></div><div className="portrait-person"><span>✳</span></div><span className="portrait-caption">A LITTLE SUN, A LOT OF SALT AIR</span></div></div><div className="about-details"><div className="detail-intro"><span className="eyebrow">THE SHORT VERSION</span><h2>Thoughtful by nature.<br /><em>Playful by design.</em></h2></div><div className="detail-copy"><p>I work with people who care about what they put into the world. Together, we turn big-hearted ideas into clear identities and digital places that feel like themselves.</p><p>My practice moves between strategy, visual identity, art direction, and the small details that make an experience feel human. The ocean is a frequent source of perspective: expansive, full of pattern, always changing.</p><div className="skills"><span>WHAT I CAN HELP WITH</span><div>Brand identity&nbsp; · &nbsp;Art direction&nbsp; · &nbsp;Digital design&nbsp; · &nbsp;Creative partnership</div></div></div></div><div className="about-note"><span>01 — 03</span><p>“Good design should feel like an invitation to look a little closer.”</p><span>— MIRA</span></div></main>;
}

function Footer({ page }) {
  return <footer className="footer"><Mark/><div className="footer-links"><a href="/">Home</a><a href="/about">About</a><a href="mailto:hello@mirasen.design">Email</a><a href="https://instagram.com" aria-label="Instagram">IG <ArrowUpRight size={12}/></a></div><span>© 2025 MIRA SEN · MADE WITH CARE</span></footer>;
}

function App() {
  const page = window.location.pathname.replace(/\/$/, '') === '/about' ? 'about' : 'home';
  return <><Header page={page}/>{page === 'about' ? <About/> : <Home/>}<Footer page={page}/></>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
