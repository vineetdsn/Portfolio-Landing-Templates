"use client";

import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { WorkSection } from "../components/WorkSection";
import { BentoSection } from "../components/BentoSection";
import { CtaSection } from "../components/CtaSection";
import { Modals } from "../components/Modals";
import { ProjectItem, ServiceItem, PROJECTS_DATA } from "../components/data";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [cvToast, setCvToast] = useState<string | null>(null);

  const handleDownloadCv = () => {
    setCvToast("Preparing Alex_Morgan_Resume_2025.pdf download...");
    // Simulate instantaneous resume download / open
    setTimeout(() => {
      setCvToast("Resume downloaded successfully! ✨");
      setTimeout(() => setCvToast(null), 3500);
    }, 1200);
  };

  const handleSeeAllProjects = () => {
    // Open the first project in detailed modal or scroll to work
    if (PROJECTS_DATA.length > 0) {
      setSelectedProject(PROJECTS_DATA[0]);
    }
  };

  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      {/* 1. Header & Navigation */}
      <Navbar onOpenContact={() => setContactOpen(true)} />

      {/* 2. Playful Editorial Hero */}
      <HeroSection
        onOpenContact={() => setContactOpen(true)}
        onDownloadCv={handleDownloadCv}
      />

      {/* 3. About Me Narrative & 4-Card Capabilities */}
      <AboutSection onSelectService={(service) => setSelectedService(service)} />

      {/* 4. Selected Work with Pastel Mockup Cards */}
      <WorkSection
        onSelectProject={(proj) => setSelectedProject(proj)}
        onSeeAllProjects={handleSeeAllProjects}
      />

      {/* 5. 3-Column Bento: Experience, Education, Skills */}
      <BentoSection />

      {/* 6. Curved Butter-Yellow Banner CTA & Footer */}
      <CtaSection onOpenContact={() => setContactOpen(true)} />

      {/* Interactive Modals & Drawers */}
      <Modals
        contactOpen={contactOpen}
        onCloseContact={() => setContactOpen(false)}
        selectedProject={selectedProject}
        onCloseProject={() => setSelectedProject(null)}
        selectedService={selectedService}
        onCloseService={() => setSelectedService(null)}
        cvToast={cvToast}
      />
    </main>
  );
}
