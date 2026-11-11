import React, { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

export function AboutSection() {
  return (
    <section className="tide-about-section" id="about">
      <div className="wrap">
        <div className="about-duo-grid">
          <div className="about-narrative">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.14em', color: 'var(--ocean-blue)', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
              THE ATELIER PHILOSOPHY
            </span>
            <h3>
              Thoughtful design, shaped by the <em>rhythm of the sea</em>.
            </h3>
            <p>
              I am an independent visual designer and creative developer exploring the intersection of papercraft art, fluid physics, and sustainable digital products.
            </p>
            <p>
              Drawing inspiration from bathymetric depths, pelagic currents, and layered natural habitats, each project is crafted with deliberate care, tactile micro-details, and high aesthetic clarity.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '10px 18px', background: '#FFFFFF', borderRadius: 999, border: '1px solid var(--border-paper)', fontSize: 13, fontWeight: 700, color: 'var(--ocean-blue)' }}>
              <span>🌊</span>
              <span>Available for brand &amp; digital commissions worldwide</span>
            </div>
          </div>

          <div className="tide-spec-card">
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 18, color: 'var(--text-main)' }}>
              Studio Specifications
            </h4>

            <div className="spec-item">
              <span className="spec-label">CORE DISCIPLINES</span>
              <span className="spec-val">Visual Identity &amp; Creative Code</span>
            </div>

            <div className="spec-item">
              <span className="spec-label">MEDIUMS</span>
              <span className="spec-val">SVG Diorama, WebGL, UI/UX</span>
            </div>

            <div className="spec-item">
              <span className="spec-label">OCEANIC COORDS</span>
              <span className="spec-val">36° 07&apos; N · 5° 21&apos; W</span>
            </div>

            <div className="spec-item">
              <span className="spec-label">AVAILABILITY</span>
              <span className="spec-val" style={{ color: '#059669' }}>● Open for Select Work</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactCallout({ onOpenContact }) {
  return (
    <section className="tide-contact-callout" id="contact">
      <div className="wrap">
        <div className="contact-ocean-box">
          <div>
            <h3>Let&apos;s create a little wave together.</h3>
            <p>
              Have a meaningful project, conservation story, or digital platform in mind? I&apos;d love to hear from you.
            </p>
          </div>

          <button onClick={onOpenContact} className="contact-btn-gold">
            <span>Start a Conversation</span>
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

export function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(4, 14, 27, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 28,
          maxWidth: 620,
          width: '100%',
          padding: 36,
          position: 'relative',
          boxShadow: '0 25px 60px -15px rgba(4, 14, 27, 0.35)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: '#F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#475569',
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--ocean-blue)', letterSpacing: '0.1em' }}>
          {project.category}
        </span>

        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, margin: '8px 0 16px', color: '#0F172A' }}>
          {project.title}
        </h3>

        <p style={{ fontSize: 15, lineHeight: 1.7, color: '#475569', marginBottom: 20 }}>
          {project.description}
        </p>

        <div style={{ background: '#F8FAFC', borderRadius: 16, padding: 18, marginBottom: 24, border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: '#64748B', marginBottom: 6 }}>
            EXPEDITION IMPACT
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#0369A1' }}>
            {project.metrics}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 26 }}>
          {project.tags.map((t) => (
            <span key={t} style={{ fontSize: 12, padding: '5px 12px', background: '#F1F5F9', borderRadius: 999, fontWeight: 600, color: '#334155' }}>
              {t}
            </span>
          ))}
        </div>

        <button
          onClick={onClose}
          className="tide-nav-btn"
          style={{ width: '100%', justifyContent: 'center', padding: '14px 20px', fontSize: 14 }}
        >
          <span>Launch Expedition Preview</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
}

export function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', message: '' });
      onClose();
    }, 2200);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(4, 14, 27, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 28,
          maxWidth: 540,
          width: '100%',
          padding: 36,
          position: 'relative',
          boxShadow: '0 25px 60px -15px rgba(4, 14, 27, 0.35)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: '#F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#475569',
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <span style={{ fontSize: 44 }}>🌊</span>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, margin: '14px 0 8px' }}>
              Message Delivered!
            </h3>
            <p style={{ color: '#64748B', fontSize: 14 }}>
              Thank you for reaching out. The atelier will respond via email shortly.
            </p>
          </div>
        ) : (
          <div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.12em', color: 'var(--ocean-blue)' }}>
              TRANSMIT DISPATCH
            </span>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, margin: '6px 0 18px', color: '#0F172A' }}>
              Say hello to the studio.
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>
                  Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Morgan Reed"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #CBD5E1', fontSize: 14 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>
                  Email
                </label>
                <input
                  required
                  type="email"
                  placeholder="morgan@ocean-expedition.org"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #CBD5E1', fontSize: 14 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>
                  Project Vision
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about the ocean, brand, or digital idea..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #CBD5E1', fontSize: 14, resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                className="tide-nav-btn"
                style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 14, marginTop: 6 }}
              >
                <span>Dispatch Message</span>
                <ArrowUpRight size={16} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
