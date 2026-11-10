'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  ExternalLink, 
  ArrowUpRight, 
  Layers, 
  Cpu, 
  Sparkles, 
  Code, 
  Briefcase, 
  Award,
  Terminal,
  FolderGit2
} from 'lucide-react'
import { projects, skills, timeline } from './data'
import { sound } from './audio'

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectExperience?: (id: string) => void;
}

export default function ExploreDrawer({ isOpen, onClose, onSelectExperience }: Props) {
  const [tab, setTab] = useState<'projects' | 'skills' | 'timeline'>('projects');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const handleTabChange = (newTab: 'projects' | 'skills' | 'timeline') => {
    sound.click(650);
    setTab(newTab);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="explore-drawer-overlay" onClick={onClose}>
          <motion.div 
            className="explore-drawer-content"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Top Header */}
            <div className="drawer-header">
              <div className="drawer-title-group">
                <span className="drawer-kicker">SHOWROOM DIRECTORY · 2026</span>
                <h2 className="drawer-title">Digital Portfolio Archive</h2>
              </div>
              <button 
                className="drawer-close-btn" 
                onClick={() => { sound.click(400); onClose(); }}
                aria-label="Close directory"
              >
                <X size={18} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="drawer-tabs">
              <button 
                className={`drawer-tab ${tab === 'projects' ? 'active' : ''}`}
                onClick={() => handleTabChange('projects')}
              >
                <FolderGit2 size={15} />
                <span>Featured Projects ({projects.length})</span>
              </button>
              <button 
                className={`drawer-tab ${tab === 'skills' ? 'active' : ''}`}
                onClick={() => handleTabChange('skills')}
              >
                <Terminal size={15} />
                <span>Tech Stack</span>
              </button>
              <button 
                className={`drawer-tab ${tab === 'timeline' ? 'active' : ''}`}
                onClick={() => handleTabChange('timeline')}
              >
                <Briefcase size={15} />
                <span>Timeline</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="drawer-body">
              {/* TAB 1: FEATURED PROJECTS */}
              {tab === 'projects' && (
                <div className="drawer-section fade-in">
                  <div className="section-meta-text">
                    Production applications and high-fidelity 3D WebGL experiences engineered for performance and tactile immersion.
                  </div>

                  <div className="drawer-projects-list">
                    {projects.map((proj, idx) => (
                      <div key={idx} className="drawer-project-card">
                        <div className="card-top-row">
                          <span className="card-badge">{proj.category}</span>
                          <span className="card-symbol">{proj.symbol}</span>
                        </div>
                        <h3 className="card-project-title">{proj.title}</h3>
                        <p className="card-project-desc">{proj.description}</p>
                        <div className="card-tags-row">
                          {proj.tags.map(tag => (
                            <span key={tag} className="tech-chip">{tag}</span>
                          ))}
                        </div>
                        <div className="card-action-row">
                          <span className="spec-indicator">● Production Live</span>
                          <button 
                            className="card-launch-btn"
                            onClick={() => {
                              sound.click(750);
                              if (onSelectExperience) {
                                onSelectExperience(idx === 0 ? 'workspace' : idx === 1 ? 'hardware' : 'development');
                                onClose();
                              }
                            }}
                          >
                            Inspect in 3D <ArrowUpRight size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: TECH STACK & SKILLS */}
              {tab === 'skills' && (
                <div className="drawer-section fade-in">
                  <div className="section-meta-text">
                    Core tools, frameworks, and design capabilities utilized across production environments.
                  </div>

                  <div className="skills-category-grid">
                    {skills.map((cat, i) => (
                      <div key={i} className="skill-category-card">
                        <h4 className="skill-cat-title">{cat.category}</h4>
                        <div className="skill-items-grid">
                          {cat.items.map((item, j) => (
                            <div key={j} className="skill-item-row">
                              <div className="skill-name-wrap">
                                <span className="skill-bullet" />
                                <strong>{item.name}</strong>
                              </div>
                              <span className="skill-desc-text">{item.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: TIMELINE & CAREER */}
              {tab === 'timeline' && (
                <div className="drawer-section fade-in">
                  <div className="section-meta-text">
                    Chronological progression across independent practice, product architecture, and digital engineering.
                  </div>

                  <div className="timeline-flow">
                    {timeline.map((entry, idx) => (
                      <div key={idx} className="timeline-item-row">
                        <div className="timeline-left">
                          <span className="timeline-date">{entry.date}</span>
                          <span className="timeline-kind">{entry.kind}</span>
                        </div>
                        <div className="timeline-connector">
                          <span className="timeline-node" />
                          {idx !== timeline.length - 1 && <span className="timeline-line" />}
                        </div>
                        <div className="timeline-right">
                          <h4 className="timeline-role-title">{entry.title}</h4>
                          <span className="timeline-org-name">{entry.org}</span>
                          <p className="timeline-detail-para">{entry.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer Action */}
            <div className="drawer-footer">
              <span className="drawer-footer-note">Handcrafted with Three.js & Next.js 14</span>
              <button 
                className="drawer-explore-close-btn"
                onClick={() => { sound.click(450); onClose(); }}
              >
                Back to 3D Showroom
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
