"use client";

import React, { useState } from "react";
import { DoodleSquiggle, TapeSticker, DoodleSparkle } from "./Doodles";
import { SERVICES_DATA, PROFILE_DATA, ServiceItem } from "./data";

export function AboutSection({ onSelectService }: { onSelectService: (service: ServiceItem) => void }) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const getIconSvg = (type: string) => {
    switch (type) {
      case "web":
        return (
          <span style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 18, color: "#16A34A" }}>
            &lt;/&gt;
          </span>
        );
      case "mobile":
        return <span style={{ fontSize: 20 }}>📱</span>;
      case "backend":
        return <span style={{ fontSize: 20 }}>🗄️</span>;
      case "uiux":
        return <span style={{ fontSize: 20 }}>🎨</span>;
      default:
        return <span>✦</span>;
    }
  };

  return (
    <section className="about-section" id="about">
      <div className="wrap">
        {/* Top: About Narrative + Taped Sticky Note */}
        <div className="about-intro-grid">
          <div>
            <h2 className="about-heading">
              About<br />me!
              <div style={{ position: "absolute", bottom: -8, left: 0 }}>
                <DoodleSquiggle color="#F43F5E" width={110} height={12} />
              </div>
            </h2>
          </div>

          <div>
            <p className="about-copy-text">
              {PROFILE_DATA.bio}
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <TapeSticker text={PROFILE_DATA.motto} />
          </div>
        </div>

        {/* Middle: What I Do Title */}
        <div className="what-i-do-title-wrap">
          <h3 className="what-i-do-title">What I Do</h3>
          {/* Sprout doodle */}
          <span style={{ fontSize: 24 }} aria-hidden="true">🍃</span>
          <div style={{ marginLeft: "auto", opacity: 0.6 }}>
            <DoodleSparkle size={20} color="#F59E0B" />
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="services-grid">
          {SERVICES_DATA.map((service) => {
            const isHovered = hoveredCard === service.id;
            return (
              <article
                key={service.id}
                className="service-card"
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => onSelectService(service)}
                role="button"
                tabIndex={0}
                aria-label={`Learn more about ${service.title}`}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="service-icon-box"
                  style={{ backgroundColor: service.iconBg }}
                >
                  {getIconSvg(service.iconType)}
                </div>

                <h4 className="service-title">{service.title}</h4>
                <p className="service-desc">{service.description}</p>

                <div className="service-card-footer">
                  <span>Explore Stack</span>
                  <span
                    style={{
                      transform: isHovered ? "translateX(4px)" : "none",
                      transition: "transform 0.2s",
                      fontSize: 16,
                    }}
                  >
                    →
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Doodle Squiggle Divider */}
        <div style={{ display: "flex", justifyContent: "center", margin: "40px 0 10px" }}>
          <DoodleSquiggle color="#60A5FA" width={220} height={14} />
        </div>
      </div>
    </section>
  );
}
