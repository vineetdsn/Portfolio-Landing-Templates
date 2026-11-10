"use client";

import React, { useState } from "react";
import { DoodleStar, DoodleGraduationCap, DoodleArrow } from "./Doodles";
import { EXPERIENCE_DATA, EDUCATION_DATA, SKILLS_DATA } from "./data";

export function BentoSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "design", label: "Design" },
    { id: "tools", label: "Tools" },
  ];

  const filteredSkills = selectedCategory === "all"
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === selectedCategory);

  return (
    <section className="bento-section" id="skills">
      <div className="wrap">
        <div className="bento-grid">
          {/* Column 1: Experience */}
          <div className="bento-col-card" id="experience">
            <div className="bento-header">
              <h3 className="bento-title">Experience</h3>
              <span style={{ fontSize: 18 }}>💼</span>
            </div>

            <div className="timeline-list">
              {EXPERIENCE_DATA.map((exp, idx) => (
                <div key={idx} className="timeline-item">
                  <span
                    className="timeline-dot"
                    style={{ backgroundColor: exp.badgeColor }}
                  />
                  <div className="timeline-period">{exp.period}</div>
                  <div className="timeline-role">{exp.role}</div>
                  <div className="timeline-company">{exp.company}</div>
                  <p className="timeline-desc">{exp.description}</p>
                </div>
              ))}
            </div>

            {/* Doodle curly arrow */}
            <div style={{ position: "absolute", bottom: -20, left: 16, pointerEvents: "none" }}>
              <DoodleArrow direction="down-left" color="#F43F5E" />
            </div>
          </div>

          {/* Column 2: Education */}
          <div className="bento-col-card">
            <div className="bento-header">
              <h3 className="bento-title">Education</h3>
              <span style={{ fontSize: 18 }}>🎓</span>
            </div>

            <div className="edu-list">
              {EDUCATION_DATA.map((edu, idx) => (
                <div key={idx} className="edu-item">
                  <span className="edu-dot" />
                  <div className="edu-period">{edu.period}</div>
                  <div className="edu-degree">{edu.degree}</div>
                  <div className="edu-school">{edu.institution}</div>
                  <p className="timeline-desc">{edu.details}</p>
                </div>
              ))}
            </div>

            {/* Graduation Cap Doodle Artwork */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 28 }}>
              <DoodleGraduationCap size={48} />
            </div>
          </div>

          {/* Column 3: Skills Matrix */}
          <div className="bento-col-card">
            <div className="bento-header">
              <h3 className="bento-title">Skills</h3>
              <DoodleStar size={30} color="#2544D6" />
            </div>

            {/* Skill Filter Tabs */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 999,
                    backgroundColor: selectedCategory === c.id ? "#0F172A" : "#F1F5F9",
                    color: selectedCategory === c.id ? "#FFFFFF" : "#64748B",
                    transition: "all 0.2s",
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Interactive Pills */}
            <div className="skills-cloud">
              {filteredSkills.map((skill) => (
                <span key={skill.name} className="skill-pill">
                  <span style={{ fontSize: 10, color: "#2544D6" }}>●</span>
                  {skill.name}
                </span>
              ))}
            </div>

            {/* Skill note */}
            <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px dashed #E2E8F0", fontSize: 12, color: "#64748B" }}>
              💡 Continuously leveling up in performance optimization, distributed systems, and generative agent architectures.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
