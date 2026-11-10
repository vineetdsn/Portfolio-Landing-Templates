"useclient";

import React, { useState } from "react";
import { DoodleSquiggle } from "./Doodles";
import { PROFILE_DATA } from "./data";

export function Navbar({ onOpenContact }: { onOpenContact: () => void }) {
  const [activeNav, setActiveNav] = useState("work");

  const navItems = [
    { id: "about", label: "About", href: "#about" },
    { id: "work", label: "Work", href: "#work", hasSquiggle: true },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "experience", label: "Experience", href: "#experience" },
    { id: "contact", label: "Contact", href: "#contact" },
  ];

  return (
    <header className="atelier-topbar">
      <div className="wrap flex items-center justify-between w-full" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Brand / Logo */}
        <a href="#top" className="atelier-brand">
          <span>{PROFILE_DATA.name}</span>
          <span className="brand-dot" />
        </a>

        {/* Navigation Links */}
        <nav className="atelier-nav" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className="atelier-nav-link"
                onClick={() => setActiveNav(item.id)}
              >
                {item.label}
                {(item.hasSquiggle || isActive) && (
                  <span style={{ position: "absolute", bottom: -6, left: 0, width: "100%", height: 8, display: "block" }}>
                    <DoodleSquiggle color="#F43F5E" width={48} height={8} />
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Contact CTA Button */}
        <button
          onClick={onOpenContact}
          className="nav-cta-btn"
          aria-label="Open contact dialog"
        >
          <span>Let&apos;s talk</span>
          <span style={{ color: "#F43F5E" }}>↗</span>
        </button>
      </div>
    </header>
  );
}
