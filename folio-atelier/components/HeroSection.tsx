"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DoodleStar, DoodleSparkle, DoodleArrow, DoodleLoop, DoodleSmiley } from "./Doodles";
import { PROFILE_DATA } from "./data";

interface HeroProps {
  onOpenContact: () => void;
  onDownloadCv: () => void;
}

export function HeroSection({ onOpenContact, onDownloadCv }: HeroProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(PROFILE_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section className="hero-section" id="top">
      {/* Decorative Floating Doodles in Hero Background */}
      <div style={{ position: "absolute", top: 18, left: 14, opacity: 0.85, pointerEvents: "none" }}>
        <DoodleSparkle size={26} color="#84CC16" />
      </div>
      <div style={{ position: "absolute", top: 80, right: "48%", opacity: 0.85, pointerEvents: "none" }}>
        <DoodleStar size={34} color="#F59E0B" />
      </div>
      <div style={{ position: "absolute", bottom: 20, left: 40, opacity: 0.75, pointerEvents: "none" }}>
        <DoodleLoop color="#F43F5E" />
      </div>

      <div className="wrap hero-grid">
        {/* Left Column: Stacked Typography & Actions */}
        <div className="hero-content">
          {/* 2025 Edition Stamped Badge */}
          <div className="edition-badge-wrap">
            <span className="edition-stamp">
              {PROFILE_DATA.edition}
            </span>
            <div className="edition-doodle-arrow">
              <DoodleArrow direction="curve" color="#3B82F6" />
            </div>
          </div>

          {/* Giant Port / folio Typography */}
          <h1 className="hero-title">
            <div style={{ display: "block" }}>Port</div>
            <div className="hero-title-folio">
              <span>folio</span>
              <span className="hero-role-pill">
                {PROFILE_DATA.title}
              </span>
            </div>
          </h1>

          {/* Subtext */}
          <p className="hero-tagline">
            {PROFILE_DATA.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="hero-actions">
            <button
              onClick={onOpenContact}
              className="btn-primary-pill"
              aria-label="Let's work together"
            >
              <span>Let&apos;s Work Together</span>
              <span>↗</span>
            </button>

            <button
              onClick={onDownloadCv}
              className="btn-download-cv"
              aria-label="Download CV"
            >
              <span>Download CV</span>
              <span>⤓</span>
            </button>
          </div>
        </div>

        {/* Right Column: Portrait Blob & Overlapping ID Badge */}
        <div className="hero-artwork-area">
          {/* Hand-drawn rays on top right */}
          <div style={{ position: "absolute", top: 0, right: 28, zIndex: 3, pointerEvents: "none" }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 4 V14 M38 10 L30 18 M44 24 H34" stroke="#84CC16" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Smiley sticker badge */}
          <div className="smiley-badge-pos">
            <DoodleSmiley size={38} />
          </div>

          {/* Organic Shape Blob */}
          <div className="hero-blob-bg" />

          {/* Portrait Image */}
          <div style={{ position: "relative", zIndex: 2, width: 330, height: 410, overflow: "hidden", borderRadius: "36px 36px 44px 44px" }}>
            <Image
              src="/hero-portrait-v2.png"
              alt="Portrait of the developer"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>

          {/* Floating ID Badge Card */}
          <div className="id-badge-card">
            <div className="id-badge-header">
              <span className="id-badge-name">{PROFILE_DATA.name}</span>
              <span className="id-badge-pronouns">{PROFILE_DATA.pronouns}</span>
            </div>

            <div className="id-badge-list">
              <div className="id-badge-item">
                <span className="id-badge-icon">📍</span>
                <span>{PROFILE_DATA.location}</span>
              </div>

              <div className="id-badge-item">
                <span className="id-badge-icon">✉️</span>
                <button
                  onClick={handleCopyEmail}
                  style={{ textAlign: "left", color: "inherit", display: "inline-flex", alignItems: "center", gap: 6 }}
                  title="Click to copy email"
                >
                  <span style={{ textDecoration: "underline" }}>{PROFILE_DATA.email}</span>
                  <span style={{ fontSize: 10, background: copiedEmail ? "#DCFCE7" : "#F1F5F9", color: copiedEmail ? "#166534" : "#64748B", padding: "1px 6px", borderRadius: 4 }}>
                    {copiedEmail ? "Copied!" : "Copy"}
                  </span>
                </button>
              </div>

              <div className="id-badge-item">
                <span className="id-badge-icon">🌐</span>
                <a href={`https://${PROFILE_DATA.website}`} target="_blank" rel="noreferrer">
                  {PROFILE_DATA.website}
                </a>
              </div>

              <div className="id-badge-item">
                <span className="id-badge-icon">🔗</span>
                <a href={`https://${PROFILE_DATA.linkedin}`} target="_blank" rel="noreferrer">
                  {PROFILE_DATA.linkedin}
                </a>
              </div>
            </div>
          </div>

          {/* Decorative Loop on bottom right */}
          <div style={{ position: "absolute", bottom: -10, right: -14, zIndex: 6, pointerEvents: "none" }}>
            <DoodleLoop color="#F43F5E" />
          </div>
        </div>
      </div>
    </section>
  );
}
