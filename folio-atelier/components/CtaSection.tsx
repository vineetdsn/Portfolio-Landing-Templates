"use client";

import React from "react";
import { DoodleStar, DoodleArrow } from "./Doodles";
import { PROFILE_DATA } from "./data";

export function CtaSection({ onOpenContact }: { onOpenContact: () => void }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Curved Butter-Yellow Ribbon Banner */}
      <section className="cta-banner-section" id="contact">
        <div className="wrap">
          <div className="cta-curved-banner">
            {/* Sparkle doodle on background */}
            <div style={{ position: "absolute", top: 12, right: "35%", opacity: 0.7, pointerEvents: "none" }}>
              <DoodleStar size={28} color="#D97706" />
            </div>

            <div className="cta-banner-left">
              <h2>Have a project in mind?</h2>
              <p>
                Let&apos;s build <span style={{ textDecoration: "underline", textDecorationColor: "#2544D6" }}>something amazing</span> together!
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ display: "none", mdDisplay: "block" }}>
                <DoodleArrow direction="up-right" color="#2544D6" />
              </div>
              <button
                onClick={onOpenContact}
                className="cta-banner-btn"
                aria-label="Get in touch"
              >
                <span>Get In Touch</span>
                <span>↗</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Atelier Footer */}
      <footer className="atelier-footer">
        <div className="wrap footer-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#475569" }}>Let&apos;s connect</span>
            <div className="footer-social-row">
              <a
                href={`https://${PROFILE_DATA.github}`}
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="GitHub"
              >
                🐙
              </a>
              <a
                href={`https://${PROFILE_DATA.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="LinkedIn"
              >
                💼
              </a>
              <a
                href={`https://${PROFILE_DATA.twitter}`}
                target="_blank"
                rel="noreferrer"
                className="footer-social-btn"
                aria-label="Twitter / X"
              >
                🐦
              </a>
              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="footer-social-btn"
                aria-label="Email"
              >
                ✉️
              </a>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontSize: 13, color: "#94A3B8" }}>
              © {new Date().getFullYear()} {PROFILE_DATA.name} · Designed &amp; Engineered with care.
            </span>
            <button
              onClick={scrollToTop}
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#2544D6",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span>Back to top</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
