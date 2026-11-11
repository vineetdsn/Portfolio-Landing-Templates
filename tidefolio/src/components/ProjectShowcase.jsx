import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const OCEAN_PROJECTS = [
  {
    id: 'marine-atlas',
    number: '01',
    title: 'Marine Sanctuary Atlas',
    category: 'Interactive Cartography & WebGL',
    style: 'blue-depth',
    description: 'Interactive bathymetric seabed exploration tracking global ocean wildlife migration and marine protected zones.',
    tags: ['Three.js', 'WebGL', 'Mapbox GL', 'React'],
    metrics: '120k+ Protected Sq. Miles Visualized',
    demoUrl: '#',
  },
  {
    id: 'abyss-soundscapes',
    number: '02',
    title: 'Abyss Soundscapes',
    category: 'Spatial Audio & Creative Tech',
    style: 'abyss-depth',
    description: 'Generative deep-sea hydrophone frequency visualizer and ambient hydro-acoustic soundscape for ocean researchers.',
    tags: ['Web Audio API', 'Canvas', 'GLSL Shaders'],
    metrics: '48 Hydrophone Feeds Across 5 Oceans',
    demoUrl: '#',
  },
  {
    id: 'coral-restoration',
    number: '03',
    title: 'Coral Restoration Lab',
    category: 'Brand Identity & Digital Platform',
    style: 'coral-depth',
    description: 'Open-source reef regeneration monitoring platform connecting field biologists with automated thermal alert telemetry.',
    tags: ['Next.js', 'Tailwind', 'IoT Telemetry'],
    metrics: '99.4% Alert Delivery Accuracy',
    demoUrl: '#',
  },
];

export function ProjectShowcase({ onSelectProject }) {
  return (
    <section className="tide-projects-section" id="work">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.14em', color: 'var(--ocean-blue)', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
              EXPEDITIONS &amp; CREATIVE WORK
            </span>
            <h2>
              Selected <em>works</em> from the deep.
            </h2>
          </div>
          <p style={{ maxWidth: 360, fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)' }}>
            Blending visual artistry, creative code, and deep marine appreciation into thoughtful digital experiences.
          </p>
        </div>

        <div className="tide-project-grid">
          {OCEAN_PROJECTS.map((proj) => (
            <article
              key={proj.id}
              className="tide-project-card"
              onClick={() => onSelectProject?.(proj)}
              style={{ cursor: 'pointer' }}
            >
              <div className={`card-visual-top ${proj.style}`}>
                <div className="card-meta-row">
                  <span>{proj.number} / 03</span>
                  <span style={{ fontSize: 14 }}>
                    {proj.style === 'coral-depth' ? '🪸' : proj.style === 'abyss-depth' ? '🌊' : '🐟'}
                  </span>
                </div>

                <div className="card-illus-center">
                  {proj.style === 'abyss-depth' ? (
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: 32, display: 'block', filter: 'drop-shadow(0 0 12px #38BDF8)' }}>
                        🐋
                      </span>
                      <span style={{ fontSize: 9, fontFamily: "'DM Mono', monospace", letterSpacing: '0.2em', color: '#7DD3FC' }}>
                        DEEP FREQUENCY
                      </span>
                    </div>
                  ) : proj.style === 'coral-depth' ? (
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: 32, display: 'block' }}>🪸</span>
                      <span style={{ fontSize: 9, fontFamily: "'DM Mono', monospace", letterSpacing: '0.2em', color: '#E11D48' }}>
                        REEF DIVERSITY
                      </span>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: 32, display: 'block' }}>🐠</span>
                      <span style={{ fontSize: 9, fontFamily: "'DM Mono', monospace", letterSpacing: '0.2em', color: '#0369A1' }}>
                        PELAGIC ATLAS
                      </span>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, fontFamily: "'DM Mono', monospace", opacity: 0.85 }}>
                  <span>{proj.metrics}</span>
                  <ArrowUpRight size={14} />
                </div>
              </div>

              <div className="card-body-bottom">
                <span className="card-category">{proj.category}</span>
                <h3 className="card-title">{proj.title}</h3>
                <p className="card-desc">{proj.description}</p>

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                  {proj.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        padding: '3px 8px',
                        background: '#F1F5F9',
                        borderRadius: 6,
                        color: '#475569',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="card-action-link">
                  <span>Explore Expedition</span>
                  <span>→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
