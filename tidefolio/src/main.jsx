import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight } from 'lucide-react';
import './ocean-papercut.css';
import { PapercutOcean } from './components/PapercutOcean';
import { ProjectShowcase } from './components/ProjectShowcase';
import { AboutSection, ContactCallout, ProjectModal, ContactModal } from './components/AboutAndModal';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="tide-app" id="home">
      {/* 1. Atelier Topbar */}
      <header className="tide-topbar">
        <a href="#home" className="tide-brand" aria-label="Tidefolio home">
          <span className="brand-symbol">m.</span>
          <div className="brand-details">
            <span>TIDEFOLIO</span>
            <small>OCEAN PAPER &amp; DESIGN ATELIER</small>
          </div>
        </a>

        <nav className="tide-nav" aria-label="Main Navigation">
          <a href="#home" className="active">Home</a>
          <a href="#work">Expeditions</a>
          <a href="#about">Philosophy</a>
          <button
            onClick={() => setContactOpen(true)}
            className="tide-nav-btn"
            aria-label="Open contact form"
          >
            <span>Say hello</span>
            <ArrowUpRight size={14} />
          </button>
        </nav>
      </header>

      {/* 2. Papercut Hero Diorama Section */}
      <section className="papercut-hero">
        <div className="wrap">
          <div className="hero-meta-strip">
            <span>FIELD NOTES / 01 · OCEANIC DIORAMA</span>
            <span>36° 07&apos; N · 5° 21&apos; W</span>
            <span>MOVE CURSOR FOR 3D DEPTH</span>
          </div>

          {/* The Multi-layered Papercut Ocean Artwork */}
          <PapercutOcean />
        </div>
      </section>

      {/* 3. Selected Expeditions / Work */}
      <ProjectShowcase onSelectProject={(proj) => setSelectedProject(proj)} />

      {/* 4. Atelier Philosophy & Studio Specs */}
      <AboutSection />

      {/* 5. Contact Callout Box */}
      <ContactCallout onOpenContact={() => setContactOpen(true)} />

      {/* 6. Footer */}
      <footer className="tide-footer">
        <div className="wrap footer-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 20, color: 'var(--ocean-blue)' }}>
              m.
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-main)' }}>
              TIDEFOLIO ATELIER
            </span>
          </div>

          <div className="footer-social-row">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-social-pill">
              GITHUB ↗
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-social-pill">
              LINKEDIN ↗
            </a>
            <a href="mailto:hello@tidefolio.studio" className="footer-social-pill">
              EMAIL ↗
            </a>
          </div>

          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} TIDEFOLIO · CRAFTED WITH CARE.
          </span>
        </div>
      </footer>

      {/* Modals */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
