"use client";

import React from "react";
import { DoodleSquiggle, DoodleCoffee, DoodleStar } from "./Doodles";
import { PROJECTS_DATA, ProjectItem } from "./data";

export function WorkSection({
  onSelectProject,
  onSeeAllProjects,
}: {
  onSelectProject: (proj: ProjectItem) => void;
  onSeeAllProjects: () => void;
}) {
  return (
    <section className="work-section" id="work">
      <div className="wrap">
        {/* Header with Coffee Mug Doodle */}
        <div className="work-header">
          <div>
            <h2 className="work-heading">
              Selected Work
              <div style={{ position: "absolute", bottom: -8, left: 0 }}>
                <DoodleSquiggle color="#10B981" width={180} height={12} />
              </div>
            </h2>
          </div>

          <div className="work-coffee-note">
            <p>
              Here are a few things I&apos;ve built with passion and lots of coffee.
            </p>
            <DoodleCoffee size={44} />
          </div>
        </div>

        {/* 4 Pastel Project Cards */}
        <div className="projects-grid">
          {PROJECTS_DATA.map((proj) => (
            <article
              key={proj.id}
              className={`project-card ${proj.colorTheme}`}
              onClick={() => onSelectProject(proj)}
              style={{ cursor: "pointer" }}
              tabIndex={0}
              role="button"
              aria-label={`View ${proj.name} case study`}
            >
              {/* Pastel Top with Realistic Mini App Mockup */}
              <div className="project-visual-box">
                <div className="mockup-frame">
                  <div className="mockup-header">
                    <span className="mockup-dot" style={{ backgroundColor: "#F87171" }} />
                    <span className="mockup-dot" style={{ backgroundColor: "#FBBF24" }} />
                    <span className="mockup-dot" style={{ backgroundColor: "#34D399" }} />
                    <span style={{ fontSize: 9, color: "#94A3B8", marginLeft: "auto", fontFamily: "monospace" }}>
                      {proj.name.toLowerCase()}.app
                    </span>
                  </div>

                  <div className="mockup-body">
                    {/* Simulated App Dashboard Layout */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ width: 44, height: 6, background: "#CBD5E1", borderRadius: 4 }} />
                      <div style={{ width: 14, height: 6, background: "#93C5FD", borderRadius: 4 }} />
                    </div>

                    {proj.id === "tasky" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 5, margin: "8px 0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#F1F5F9", padding: "4px 6px", borderRadius: 4 }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
                          <div style={{ width: 60, height: 5, background: "#94A3B8", borderRadius: 3 }} />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#F8FAFC", padding: "4px 6px", borderRadius: 4 }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B82F6" }} />
                          <div style={{ width: 45, height: 5, background: "#CBD5E1", borderRadius: 3 }} />
                        </div>
                      </div>
                    )}

                    {proj.id === "shopease" && (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, margin: "8px 0" }}>
                        <div style={{ background: "#FEE2E2", height: 32, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
                          👟
                        </div>
                        <div style={{ background: "#FEF3C7", height: 32, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
                          🎒
                        </div>
                      </div>
                    )}

                    {proj.id === "fintrack" && (
                      <div className="mockup-chart-bar">
                        <div className="mockup-bar-item" style={{ height: "45%", background: "#93C5FD" }} />
                        <div className="mockup-bar-item" style={{ height: "75%", background: "#3B82F6" }} />
                        <div className="mockup-bar-item" style={{ height: "55%", background: "#60A5FA" }} />
                        <div className="mockup-bar-item" style={{ height: "95%", background: "#2563EB" }} />
                      </div>
                    )}

                    {proj.id === "wanderly" && (
                      <div style={{ margin: "6px 0", background: "#EDE9FE", borderRadius: 6, padding: "6px 8px" }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#6D28D9" }}>✈️ Tokyo, Japan</div>
                        <div style={{ width: "80%", height: 4, background: "#DDD6FE", borderRadius: 2, marginTop: 4 }} />
                      </div>
                    )}

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px dashed #E2E8F0", paddingTop: 4 }}>
                      <span style={{ fontSize: 8, color: "#64748B", fontWeight: 700 }}>LIVE DEMO</span>
                      <span style={{ fontSize: 9, color: "#3B82F6" }}>↗</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Details Below */}
              <div className="project-info-box">
                <div className="project-tag-row">
                  <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: proj.colorTheme === "mint" ? "#10B981" : proj.colorTheme === "coral" ? "#F43F5E" : proj.colorTheme === "sky" ? "#3B82F6" : "#8B5CF6" }} />
                  <span className="project-cat-pill">{proj.category}</span>
                </div>

                <h3 className="project-name">{proj.name}</h3>
                <p className="project-summary">{proj.description}</p>

                <div className="btn-case-study">
                  <span>View Case Study</span>
                  <span>→</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Center See All Projects Button */}
        <div className="see-all-wrap">
          <button
            onClick={onSeeAllProjects}
            className="btn-primary-pill"
            style={{ padding: "14px 34px" }}
          >
            <span>See All Projects</span>
            <span>↗</span>
          </button>
          <div style={{ display: "inline-block", marginLeft: 16, verticalAlign: "middle" }}>
            <DoodleStar size={24} color="#F59E0B" />
          </div>
        </div>
      </div>
    </section>
  );
}
