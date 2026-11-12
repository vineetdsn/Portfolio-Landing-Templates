// ========================================================
// 3D AUDIO SYNTHESIZER (WEB AUDIO API)
// ========================================================
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
}

function playCyberSound(type = 'click') {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const now = audioCtx.currentTime;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.05);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'hover') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.04);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(783.99, now + 0.16);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (err) {
    // Audio context not allowed or blocked
  }
}

// ========================================================
// 3D MOUSE PARALLAX TILT ON FULL-SCREEN WORKSPACE STAGE
// ========================================================
const heroStage = document.getElementById('home');
const card3D = document.getElementById('workspace-card');
const coordsTracker = document.getElementById('coords-hud');
const hotspotMon1 = document.getElementById('hotspot-mon1');
const hotspotMon2 = document.getElementById('hotspot-mon2');

if (heroStage && card3D) {
  let targetRotX = 0;
  let targetRotY = 0;
  let curRotX = 0;
  let curRotY = 0;
  let animId = null;

  function updateStage() {
    curRotX += (targetRotX - curRotX) * 0.08;
    curRotY += (targetRotY - curRotY) * 0.08;
    card3D.style.transform = `rotateX(${curRotX.toFixed(2)}deg) rotateY(${curRotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    if (Math.abs(targetRotX - curRotX) > 0.01 || Math.abs(targetRotY - curRotY) > 0.01) {
      animId = requestAnimationFrame(updateStage);
    } else {
      animId = null;
    }
  }

  window.addEventListener('mousemove', (e) => {
    const rect = heroStage.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;

    const xPct = (e.clientX / window.innerWidth) - 0.5;
    const yPct = ((e.clientY - rect.top) / rect.height) - 0.5;

    targetRotX = -yPct * 10;
    targetRotY = xPct * 14;

    if (!animId) {
      animId = requestAnimationFrame(updateStage);
    }

    if (coordsTracker) {
      coordsTracker.textContent = `X:${Math.round(xPct * 100)} Y:${Math.round(yPct * 100)} · 60FPS · 3D ACTIVE`;
    }
  });

  window.addEventListener('mouseleave', () => {
    targetRotX = 0;
    targetRotY = 0;
    if (!animId) {
      animId = requestAnimationFrame(updateStage);
    }
    if (coordsTracker) {
      coordsTracker.textContent = 'COORDS: IDLE · 60FPS · 3D ACTIVE';
    }
  });

  // Hotspots interaction with audio feedback
  if (hotspotMon1) {
    hotspotMon1.addEventListener('mouseenter', () => playCyberSound('hover'));
    hotspotMon1.addEventListener('click', () => {
      playCyberSound('success');
      showToast('Display 01: Core architecture active in React 19 & WebGL');
    });
  }

  if (hotspotMon2) {
    hotspotMon2.addEventListener('mouseenter', () => playCyberSound('hover'));
    hotspotMon2.addEventListener('click', () => {
      playCyberSound('success');
      showToast('Skyline Ambience: Synchronized with Bangalore Tech Hub & Remote Teams');
    });
  }
}

// ========================================================
// AMBIENT THEME CYCLER
// ========================================================
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themes = ['', 'theme-cyber', 'theme-matrix'];
let currentThemeIdx = 0;

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    playCyberSound('click');
    document.body.classList.remove(themes[currentThemeIdx]);
    currentThemeIdx = (currentThemeIdx + 1) % themes.length;
    if (themes[currentThemeIdx]) {
      document.body.classList.add(themes[currentThemeIdx]);
    }
    showToast(`Ambient Lighting: ${currentThemeIdx === 0 ? 'Cyber Blue' : currentThemeIdx === 1 ? 'Neon Violet' : 'Emerald Matrix'}`);
  });
}

// Sound toggle
const soundToggleBtn = document.getElementById('sound-toggle-btn');
if (soundToggleBtn) {
  soundToggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggleBtn.textContent = soundEnabled ? '🔊' : '🔇';
    playCyberSound('click');
    showToast(soundEnabled ? 'Synthesizer Audio Enabled' : 'Audio Muted');
  });
}

// ========================================================
// PROJECT DATA & MODAL PREVIEW
// ========================================================
const PROJECTS_DATA = [
  {
    id: 'quantum-os',
    title: 'QuantumOS 3D Workspace',
    category: '3d-webgl',
    catLabel: '3D WebGL & Canvas',
    summary: 'A futuristic cloud operating system rendered in WebGL with interactive holographic windows and GPU acceleration.',
    tags: ['Three.js', 'WebGL', 'TypeScript', 'GLSL Shaders'],
    metrics: '60 FPS Ultra Performance · 18k+ Stars',
    demoUrl: '#',
    themeClass: 'webgl-theme',
    icon: '🔮',
  },
  {
    id: 'cyber-pulse',
    title: 'CyberPulse Fintech Trading',
    category: 'full-stack',
    catLabel: 'Full-Stack High-Frequency App',
    summary: 'Real-time financial telemetry dashboard processing 50,000 algorithmic ticks/second with live order books.',
    tags: ['React 19', 'Next.js 15', 'WebSockets', 'Redis', 'Tailwind'],
    metrics: '$28M Daily Volume Tracked · 99.99% Uptime',
    demoUrl: '#',
    themeClass: 'fintech-theme',
    icon: '⚡',
  },
  {
    id: 'hyperion-studio',
    title: 'Hyperion Generative Engine',
    category: '3d-webgl',
    catLabel: 'Generative Shader Studio',
    summary: 'Procedural kinetic sculpture generator exploring refractive glass dispersion and fluid particle dynamics.',
    tags: ['WebGPU', 'Three.js', 'Web Audio API', 'Canvas'],
    metrics: 'FWA & Awwwards Site of the Day Nominee',
    demoUrl: '#',
    themeClass: 'creative-theme',
    icon: '💠',
  },
  {
    id: 'aura-mobile',
    title: 'Aura Spatial Navigation',
    category: 'mobile',
    catLabel: 'Spatial Mobile App',
    summary: 'Cross-platform mobile sensory companion with haptic spatial audio and offline neural network synchronization.',
    tags: ['React Native', 'Expo', 'TensorFlow Lite', 'CoreMotion'],
    metrics: '4.9/5 Rating on App Store · 35k Active Users',
    demoUrl: '#',
    themeClass: 'fintech-theme',
    icon: '📱',
  },
  {
    id: 'vortex-identity',
    title: 'Vortex Design System',
    category: 'full-stack',
    catLabel: 'Enterprise Design Architecture',
    summary: 'Accessible, token-driven component architecture powering 14 global product lines with automated WCAG compliance.',
    tags: ['TypeScript', 'Storybook', 'Figma Tokens', 'Radix UI'],
    metrics: 'Zero Accessibility Violations · 400+ Components',
    demoUrl: '#',
    themeClass: 'webgl-theme',
    icon: '📐',
  },
  {
    id: 'tide-soundscapes',
    title: 'Ocean Deep Hydrophones',
    category: 'creative',
    catLabel: 'Bio-Acoustic Spatial Web',
    summary: 'Interactive marine soundscape mapping pelagic whale songs and deep ocean frequency channels across the globe.',
    tags: ['Web Audio API', 'Mapbox GL', 'SVG Dioramas', 'React'],
    metrics: '48 Global Hydrophone Feeds Integrated',
    demoUrl: '#',
    themeClass: 'creative-theme',
    icon: '🐋',
  },
];

function renderProjects(filter = 'all') {
  const container = document.getElementById('projects-container');
  if (!container) return;

  const filtered = filter === 'all' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === filter);

  container.innerHTML = filtered.map(p => `
    <article class="project-3d-card" onclick="openProjectModal('${p.id}')">
      <div class="project-card-visual ${p.themeClass}">
        <span style="font-size: 52px; filter: drop-shadow(0 0 16px var(--neon-blue));">${p.icon}</span>
      </div>
      <div class="project-card-body">
        <span class="project-category-tag">${p.catLabel}</span>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-summary">${p.summary}</p>
        <div class="project-tags-row">
          ${p.tags.map(t => `<span class="project-tag-pill">${t}</span>`).join('')}
        </div>
        <div class="project-footer-link">
          <span>Explore Architecture</span>
          <span>↗</span>
        </div>
      </div>
    </article>
  `).join('');

  // Attach hover sound
  container.querySelectorAll('.project-3d-card').forEach(card => {
    card.addEventListener('mouseenter', () => playCyberSound('hover'));
  });
}

// Category filter tabs
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', (e) => {
    playCyberSound('click');
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderProjects(tab.dataset.filter);
  });
});

renderProjects('all');

// ========================================================
// PROJECT MODAL
// ========================================================
const modalOverlay = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalCat = document.getElementById('modal-cat');
const modalDesc = document.getElementById('modal-desc');
const modalMetrics = document.getElementById('modal-metrics');
const modalTags = document.getElementById('modal-tags');

window.openProjectModal = function(id) {
  const proj = PROJECTS_DATA.find(p => p.id === id);
  if (!proj || !modalOverlay) return;

  playCyberSound('click');
  modalTitle.textContent = proj.title;
  modalCat.textContent = proj.catLabel;
  modalDesc.textContent = proj.summary;
  modalMetrics.textContent = proj.metrics;
  modalTags.innerHTML = proj.tags.map(t => `<span class="stack-chip">${t}</span>`).join('');

  modalOverlay.style.display = 'flex';
};

window.closeProjectModal = function() {
  if (modalOverlay) {
    playCyberSound('click');
    modalOverlay.style.display = 'none';
  }
};

// ========================================================
// TERMINAL FORM DISPATCH
// ========================================================
const terminalForm = document.getElementById('terminal-form');
if (terminalForm) {
  terminalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    playCyberSound('success');
    showToast('🚀 Transmission Received! Vineet will contact you shortly.');
    terminalForm.reset();
  });
}

// Toast
function showToast(msg) {
  const existing = document.querySelector('.toast-notice');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notice';
  toast.textContent = msg;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3200);
}
