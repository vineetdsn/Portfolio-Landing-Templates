"use client";

import React, { useState } from "react";
import { ProjectItem, ServiceItem, PROFILE_DATA } from "./data";
import { DoodleSquiggle, DoodleStar } from "./Doodles";

interface ModalsProps {
  contactOpen: boolean;
  onCloseContact: () => void;
  selectedProject: ProjectItem | null;
  onCloseProject: () => void;
  selectedService: ServiceItem | null;
  onCloseService: () => void;
  cvToast: string | null;
}

export function Modals({
  contactOpen,
  onCloseContact,
  selectedProject,
  onCloseProject,
  selectedService,
  onCloseService,
  cvToast,
}: ModalsProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
      onCloseContact();
    }, 2500);
  };

  return (
    <>
      {/* 1. Contact Modal */}
      {contactOpen && (
        <div className="modal-overlay" onClick={onCloseContact}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={onCloseContact} aria-label="Close modal">
              ✕
            </button>

            {formSubmitted ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <span style={{ fontSize: 48 }}>🎉</span>
                <h3 style={{ fontSize: 24, fontWeight: 800, margin: "16px 0 8px", color: "#0F172A" }}>
                  Message Sent!
                </h3>
                <p style={{ color: "#64748B", fontSize: 15 }}>
                  Thank you for reaching out! Alex will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#10B981", letterSpacing: "0.05em" }}>
                    AVAILABLE FOR NEW PROJECTS
                  </span>
                </div>

                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 800, color: "var(--brand-blue)", marginBottom: 6 }}>
                  Let&apos;s build together.
                </h3>
                <p style={{ color: "#64748B", fontSize: 14, marginBottom: 24 }}>
                  Have an ambitious web, mobile, or design project in mind? Drop a note below or reach out at{" "}
                  <a href={`mailto:${PROFILE_DATA.email}`} style={{ color: "#2544D6", fontWeight: 700 }}>
                    {PROFILE_DATA.email}
                  </a>.
                </p>

                <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#475569", marginBottom: 6 }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: 12,
                        border: "1px solid #CBD5E1",
                        fontSize: 14,
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#475569", marginBottom: 6 }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: 12,
                        border: "1px solid #CBD5E1",
                        fontSize: 14,
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#475569", marginBottom: 6 }}>
                      Project Scope &amp; Vision
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell me about what you want to create..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: 12,
                        border: "1px solid #CBD5E1",
                        fontSize: 14,
                        outline: "none",
                        resize: "vertical",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary-pill"
                    style={{ justifyContent: "center", marginTop: 8 }}
                  >
                    <span>Send Message</span>
                    <span>↗</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Project Case Study Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={onCloseProject}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640 }}>
            <button className="modal-close-btn" onClick={onCloseProject} aria-label="Close modal">
              ✕
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span className="project-cat-pill" style={{ fontSize: 12 }}>
                {selectedProject.category}
              </span>
              <span style={{ color: "#94A3B8" }}>·</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#10B981" }}>
                {selectedProject.metrics}
              </span>
            </div>

            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 36, fontWeight: 800, color: "var(--brand-blue)", marginBottom: 12 }}>
              {selectedProject.name}
            </h3>

            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#334155", marginBottom: 20 }}>
              {selectedProject.longDescription}
            </p>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#64748B", marginBottom: 8 }}>
                TECH STACK &amp; INTEGRATIONS
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: "#F1F5F9",
                      padding: "5px 12px",
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#334155",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 14 }}>
              <a
                href={selectedProject.previewUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary-pill"
                style={{ padding: "12px 24px", fontSize: 14 }}
              >
                <span>Launch Live Demo</span>
                <span>↗</span>
              </a>
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#0F172A",
                  padding: "12px 20px",
                  borderRadius: 999,
                  border: "1px solid #CBD5E1",
                }}
              >
                <span>GitHub Repository</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 3. Service Detail Modal */}
      {selectedService && (
        <div className="modal-overlay" onClick={onCloseService}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={onCloseService} aria-label="Close modal">
              ✕
            </button>

            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                backgroundColor: selectedService.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                marginBottom: 16,
              }}
            >
              ✦
            </div>

            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: 30, fontWeight: 800, color: "var(--brand-blue)", marginBottom: 8 }}>
              {selectedService.title}
            </h3>

            <p style={{ fontSize: 15, lineHeight: 1.6, color: "#475569", marginBottom: 20 }}>
              {selectedService.description}
            </p>

            <div style={{ marginBottom: 20 }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>
                What I Deliver:
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, padding: 0 }}>
                {selectedService.deliverables.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#334155" }}>
                    <span style={{ color: "#10B981", fontWeight: 800 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>
                Technologies &amp; Frameworks:
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {selectedService.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      background: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                      padding: "4px 10px",
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#475569",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. CV Download Notification Toast */}
      {cvToast && (
        <div className="toast-msg">
          📄 {cvToast}
        </div>
      )}
    </>
  );
}
