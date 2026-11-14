import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

// --- SCENE DEFINITIONS (Emil Kowalski Choreographed Showroom) ---
const scenes = [
  {
    name: 'workspace',
    label: '01 · The everyday ritual',
    title: 'Beyond the',
    line: 'screen.',
    desc: 'Thoughtful developer workstation with responsive 3D parallax, luminous code canvas, and tactile mechanics.',
    note: 'Spring damped physics · 500ms ease'
  },
  {
    name: 'hardware',
    label: '02 · Under the surface',
    title: 'Built to',
    line: 'perform.',
    desc: 'Exploded architecture showing multi-fan cooling array, motherboard traces, and gold contact pins.',
    note: 'Exploded array assembly · Staggered ease'
  },
  {
    name: 'development',
    label: '03 · Ideas in motion',
    title: 'Ideas into',
    line: 'interfaces.',
    desc: 'Focused design engineering workbench featuring live code terminal, syntax glow, and 120 FPS telemetry.',
    note: 'Code terminal elevation · 120 FPS compositing'
  },
  {
    name: 'creative',
    label: '04 · Play is a practice',
    title: 'Create something',
    line: 'different.',
    desc: 'Graphic design tablet with warm sunset palette, floating metallic icosahedrons, and precision stylus.',
    note: 'Warm sunset chromatic shift · Spring float'
  },
  {
    name: 'experiments',
    label: '05 · Curiosity unboxed',
    title: 'Curiosity,',
    line: 'unboxed.',
    desc: 'Generative polyhedra and torus knot modules with floating procedural animation and prism glow.',
    note: 'Floating generative geometry · Continuous orbit'
  }
];

// --- WEB AUDIO API TACTILE CHIME (Emil Kowalski Tactile Software) ---
function playChime(freq = 520, type = 'sine', duration = 0.12) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.035, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration + 0.02);
  } catch {}
}

// --- THREE.JS INITIALIZATION ---
const canvas = document.querySelector('#world');
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
  powerPreference: 'high-performance'
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x181818, 14, 32);

const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
camera.position.set(0, 5.2, 13.8);
camera.lookAt(0, 1.55, 0);

// Lighting Rig
scene.add(new THREE.HemisphereLight(0xf4f4ff, 0x181a24, 2.2));

const keyLight = new THREE.DirectionalLight(0xfff6ea, 4.6);
keyLight.position.set(-5, 9, 8);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(2048, 2048);
keyLight.shadow.camera.left = -9;
keyLight.shadow.camera.right = 9;
keyLight.shadow.camera.top = 9;
keyLight.shadow.camera.bottom = -9;
keyLight.shadow.bias = -0.0002;
scene.add(keyLight);

const fillLight = new THREE.PointLight(0x8b7cf6, 110, 20);
fillLight.position.set(5, 5, 4);
scene.add(fillLight);

const rimLight = new THREE.PointLight(0x38bdf8, 85, 18);
rimLight.position.set(-4, 4, -4);
scene.add(rimLight);

// --- MATERIALS PALETTE ---
const mat = (color, metalness = 0, roughness = 0.38, extra = {}) =>
  new THREE.MeshStandardMaterial({ color, metalness, roughness, ...extra });

const mats = {
  alloy: mat('#d2d5de', 0.85, 0.22),
  edge: mat('#888e9e', 0.72, 0.26),
  dark: mat('#161822', 0.45, 0.24),
  black: mat('#090a10', 0.2, 0.18),
  glass: mat('#111525', 0.3, 0.16, { transparent: true, opacity: 0.94 }),
  key: mat('#2c2f3d', 0.4, 0.3),
  white: mat('#f0f1f6', 0.3, 0.22),
  purple: mat('#8b7cf6', 0.4, 0.24, { emissive: '#4c379a', emissiveIntensity: 0.55 }),
  cyan: mat('#38bdf8', 0.52, 0.22, { emissive: '#0284c7', emissiveIntensity: 0.55 }),
  orange: mat('#f97316', 0.45, 0.25, { emissive: '#c2410c', emissiveIntensity: 0.5 }),
  board: mat('#1b302c', 0.55, 0.28),
  gold: mat('#fbbf24', 0.88, 0.18)
};

function box(parent, name, size, pos, material) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  m.name = name;
  m.position.set(...pos);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

function rounded(parent, name, size, pos, material, r = 0.08) {
  const shape = new THREE.Shape();
  const w = size[0], h = size[1], x = -w / 2, y = -h / 2;
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  const g = new THREE.ExtrudeGeometry(shape, {
    depth: size[2],
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.025,
    bevelThickness: 0.025
  });
  g.computeVertexNormals();
  const m = new THREE.Mesh(g, material);
  m.name = name;
  m.position.set(...pos);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

// --- ULTRA-CRISP HIGH-CONTRAST SCREEN TEXTURE ---
function screenTexture(mode = 'design') {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 640;
  const x = c.getContext('2d');

  // Background
  x.fillStyle = '#0f111a';
  x.fillRect(0, 0, 1024, 640);

  // Top Window Header
  x.fillStyle = '#171926';
  x.fillRect(0, 0, 1024, 46);

  // Traffic Light Controls
  const dotColors = ['#ff5f56', '#ffbd2e', '#27c93f'];
  for (let i = 0; i < 3; i++) {
    x.beginPath();
    x.arc(24 + i * 20, 23, 6, 0, Math.PI * 2);
    x.fillStyle = dotColors[i];
    x.fill();
  }

  // Active Tab
  x.fillStyle = '#222538';
  x.beginPath();
  x.roundRect(100, 8, 220, 38, [6, 6, 0, 0]);
  x.fill();
  x.fillStyle = '#8b7cf6';
  x.font = '600 13px "DM Mono", monospace';
  x.fillText('⚡ App.tsx — Motion', 120, 32);

  // Left Sidebar Explorer
  x.fillStyle = '#131521';
  x.fillRect(0, 46, 210, 594);
  x.fillStyle = '#71758c';
  x.font = '500 11px "DM Mono", monospace';
  x.fillText('EXPLORER', 24, 76);

  const files = [
    { name: '▾ src', isDir: true },
    { name: '  ▾ components', isDir: true },
    { name: '    App.tsx', active: true },
    { name: '    Studio3D.ts' },
    { name: '    Motion.css' },
    { name: '    Springs.ts' },
    { name: '  package.json' },
    { name: '  tsconfig.json' }
  ];
  files.forEach((f, idx) => {
    if (f.active) {
      x.fillStyle = '#22253b';
      x.fillRect(10, 92 + idx * 30, 190, 26);
      x.fillStyle = '#a5b4fc';
    } else {
      x.fillStyle = f.isDir ? '#8589a3' : '#6b7086';
    }
    x.fillText(f.name, 24, 110 + idx * 30);
  });

  // Code Lines
  const codeLines = mode === 'code' ? [
    { text: "import { motion, useSpring } from 'motion/react';", color: '#c084fc' },
    { text: "import { Canvas } from '@react-three/fiber';", color: '#c084fc' },
    { text: "", color: '#fff' },
    { text: "export function DigitalSpace() {", color: '#67e8f9' },
    { text: "  const spring = useSpring({ stiffness: 320, damping: 28 });", color: '#a5f3fc' },
    { text: "  const [activeScene, setScene] = useState('workspace');", color: '#a5f3fc' },
    { text: "", color: '#fff' },
    { text: "  return (", color: '#67e8f9' },
    { text: "    <motion.div animate={{ opacity: 1, scale: 1 }}>", color: '#fbcfe8' },
    { text: "      <Canvas camera={{ position: [0, 5, 14] }} />", color: '#86efac' },
    { text: "    </motion.div>", color: '#fbcfe8' },
    { text: "  );", color: '#67e8f9' },
    { text: "}", color: '#67e8f9' }
  ] : [
    { text: "// Emil Kowalski Motion Principles · Hardware Accelerated", color: '#64748b' },
    { text: "const motionConfig = {", color: '#c084fc' },
    { text: "  ease: [0.23, 1, 0.32, 1], // Custom fast-start ease-out", color: '#38bdf8' },
    { text: "  duration: 0.6,", color: '#fb923c' },
    { text: "  interruptible: true,", color: '#4ade80' },
    { text: "  physics: 'spring-damped'", color: '#f472b6' },
    { text: "};", color: '#c084fc' },
    { text: "", color: '#fff' },
    { text: "function buildThoughtfulUI() {", color: '#818cf8' },
    { text: "  return { quality: 'flawless', fps: 120, a11y: 'AAA' };", color: '#fef08a' },
    { text: "}", color: '#818cf8' }
  ];

  codeLines.forEach((line, i) => {
    x.fillStyle = line.color;
    x.font = '16px "DM Mono", monospace';
    x.fillText(line.text, 245, 95 + i * 32);
  });

  // Bottom Telemetry Bar
  x.fillStyle = '#171926';
  x.fillRect(210, 594, 814, 46);
  x.fillStyle = '#10b981';
  x.beginPath();
  x.arc(235, 617, 5, 0, Math.PI * 2);
  x.fill();
  x.fillStyle = '#e2e8f0';
  x.font = '600 13px "DM Mono", monospace';
  x.fillText('60–120 FPS · 0ms Jitter · Hardware Composited', 252, 622);
  x.fillStyle = '#8b7cf6';
  x.fillText('UTF-8 · TypeScript 5.8', 820, 622);

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.needsUpdate = true;
  return t;
}

// Track animated components for the game loop
const animatedFanBlades = [];

function makeMonitor(parent, mode = 'design', scale = 1) {
  const g = new THREE.Group();
  g.name = 'monitor-assembly';
  parent.add(g);

  rounded(g, 'display-aluminium', [4.5 * scale, 2.85 * scale, 0.16], [0, 2.65, 0], mats.alloy, 0.14);
  rounded(g, 'black-glass', [4.28 * scale, 2.62 * scale, 0.035], [0, 2.67, 0.15], mats.black, 0.09);

  // Screen placed in front of bevel extrusion at Z = 0.23!
  const tex = screenTexture(mode);
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(4.14 * scale, 2.47 * scale),
    new THREE.MeshStandardMaterial({
      map: tex,
      emissive: '#ffffff',
      emissiveMap: tex,
      emissiveIntensity: 0.95,
      roughness: 0.15,
      metalness: 0.05
    })
  );
  screen.position.set(0, 2.68, 0.23);
  g.add(screen);

  box(g, 'monitor-neck', [0.34, 0.73, 0.28], [0, 1.12, -0.05], mats.alloy);
  const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.74, 0.95, 0.09, 48), mats.alloy);
  foot.position.set(0, 0.69, 0.05);
  foot.castShadow = true;
  g.add(foot);
  return g;
}

function makeTower(parent) {
  const g = new THREE.Group();
  g.name = 'custom-pc-tower';
  parent.add(g);
  rounded(g, 'tower-case', [1.55, 3.15, 1.42], [3.1, 1.75, -0.2], mats.dark, 0.13);
  box(g, 'glass-side', [1.34, 2.86, 0.035], [3.08, 1.79, 0.53], mat('#75809c', 0.24, 0.15, { transparent: true, opacity: 0.35 }));

  for (let i = 0; i < 3; i++) {
    const f = new THREE.Mesh(new THREE.TorusGeometry(0.37, 0.035, 12, 48), i === 1 ? mats.cyan : mats.purple);
    f.position.set(2.77, 2.72 - i * 0.84, 0.57);
    g.add(f);

    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.1, 20), mats.alloy);
    hub.rotation.x = Math.PI / 2;
    hub.position.set(2.77, 2.72 - i * 0.84, 0.59);
    g.add(hub);

    const fanGroup = new THREE.Group();
    fanGroup.position.set(2.77, 2.72 - i * 0.84, 0.585);
    g.add(fanGroup);
    animatedFanBlades.push(fanGroup);

    for (let k = 0; k < 7; k++) {
      const a = (k * Math.PI * 2) / 7;
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.24, 0.018), mats.edge);
      blade.position.set(Math.cos(a) * 0.19, Math.sin(a) * 0.19, 0);
      blade.rotation.z = a;
      fanGroup.add(blade);
    }
  }

  box(g, 'gpu', [0.95, 0.18, 0.28], [3.15, 0.79, 0.55], mats.edge);
  box(g, 'gpu-accent', [0.75, 0.035, 0.02], [3.15, 0.79, 0.7], mats.purple);
  return g;
}

function makeKeyboard(parent) {
  const g = new THREE.Group();
  g.name = 'mechanical-keyboard';
  parent.add(g);
  rounded(g, 'keyboard-case', [3.35, 0.24, 1.1], [-0.05, 0.62, 1.72], mats.dark, 0.1);

  for (let row = 0; row < 5; row++) {
    const count = row === 4 ? 11 : 15;
    for (let col = 0; col < count; col++) {
      const x = -1.52 + col * 0.215 + (row === 4 ? 0.1 : 0);
      const z = 1.3 + row * 0.2;
      const k = rounded(
        g,
        'individual-key',
        [0.17, 0.08, 0.145],
        [x, 0.79, z],
        row === 1 && col === 3 ? mats.purple : mats.key,
        0.025
      );
      k.castShadow = true;
    }
  }
  box(g, 'spacebar', [1.03, 0.08, 0.145], [-0.05, 0.79, 2.12], mats.key);
}

function makeMouse(parent) {
  const g = new THREE.Group();
  g.name = 'wireless-mouse';
  parent.add(g);
  const m = new THREE.Mesh(new THREE.SphereGeometry(0.36, 32, 24), mats.white);
  m.scale.set(0.75, 0.43, 1.15);
  m.position.set(2, 0.79, 1.75);
  m.castShadow = true;
  g.add(m);
  box(g, 'mouse-seam', [0.012, 0.012, 0.55], [2, 0.89, 1.72], mats.edge);
}

function makeHeadphones(parent) {
  const g = new THREE.Group();
  g.name = 'headphones';
  parent.add(g);
  const curve = new THREE.TorusGeometry(0.56, 0.055, 16, 80, Math.PI);
  const band = new THREE.Mesh(curve, mats.dark);
  band.rotation.z = Math.PI;
  band.position.set(-2.72, 2.9, 1.45);
  band.scale.set(1.2, 1.15, 1);
  g.add(band);

  for (const x of [-3.38, -2.06]) {
    const ear = new THREE.Mesh(new THREE.CylinderGeometry(0.29, 0.29, 0.17, 36), mats.alloy);
    ear.rotation.x = Math.PI / 2;
    ear.position.set(x, 2.77, 1.45);
    ear.castShadow = true;
    g.add(ear);
    const cushion = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.07, 12, 32), mats.dark);
    cushion.position.set(x, 2.77, 1.55);
    g.add(cushion);
  }
}

// Floor
const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), mat('#181818', 0.05, 0.72));
floor.rotation.x = -Math.PI / 2;
floor.position.y = 0.19;
floor.receiveShadow = true;
scene.add(floor);

// 3D Rig Group
const rig = new THREE.Group();
rig.position.set(0.8, 0, 0);
scene.add(rig);

// Scene 01: Workspace
const workspace = new THREE.Group();
rig.add(workspace);
makeMonitor(workspace, 'design');
makeTower(workspace);
makeKeyboard(workspace);
makeMouse(workspace);
makeHeadphones(workspace);
box(workspace, 'floating-ssd', [0.8, 0.12, 0.58], [-3.9, 3.25, -0.15], mats.white).rotation.z = 0.24;

// Scene 02: Hardware
const hardware = new THREE.Group();
rig.add(hardware);
const board = box(hardware, 'motherboard', [2.8, 0.16, 2.3], [0, 1.35, 0], mats.board);
board.rotation.x = -0.08;
box(hardware, 'gpu-backplate', [2.35, 0.18, 0.75], [0, 2.35, 0.3], mats.edge);
for (let i = 0; i < 3; i++) {
  const fan = new THREE.Mesh(new THREE.TorusGeometry(0.31, 0.045, 12, 40), mats.cyan);
  fan.position.set(-0.7 + i * 0.7, 2.7, 0.35);
  fan.rotation.x = Math.PI / 2;
  hardware.add(fan);
  const hub = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 12), mats.dark);
  hub.position.set(-0.7 + i * 0.7, 2.7, 0.35);
  hardware.add(hub);
}
for (let i = 0; i < 4; i++) {
  box(hardware, 'ram-module', [0.18, 0.95, 0.17], [-1.05 + i * 0.28, 2.25, -0.65], i % 2 ? mats.purple : mats.alloy);
}
box(hardware, 'processor', [0.72, 0.18, 0.72], [0, 2.9, -0.2], mats.gold);
box(hardware, 'cooler', [1.5, 0.6, 1.2], [0, 3.65, -0.2], mats.edge);
for (let i = 0; i < 3; i++) {
  box(hardware, 'cooler-fin', [1.42, 0.035, 1.14], [0, 3.34 + i * 0.17, -0.2], mats.alloy);
}

// Scene 03: Development
const development = new THREE.Group();
rig.add(development);
const laptop = makeMonitor(development, 'code', 0.88);
laptop.position.set(-0.6, 0, 0.15);
laptop.rotation.y = 0.15;
box(development, 'laptop-base', [4, 0.14, 2.35], [-0.6, 0.55, 0.85], mats.alloy).rotation.x = -0.08;
for (let r = 0; r < 4; r++) {
  for (let c = 0; c < 13; c++) {
    rounded(development, 'laptop-key', [0.19, 0.035, 0.16], [-2.32 + c * 0.29, 0.65, 0.1 + r * 0.27], mats.key, 0.018);
  }
}
for (let i = 0; i < 3; i++) {
  const p = rounded(development, 'code-panel', [1.15, 0.7, 0.08], [2.8, 3.3 - i * 0.84, -0.45], i === 1 ? mats.purple : mats.white, 0.06);
  p.rotation.y = -0.18;
}

// Scene 04: Creative
const creative = new THREE.Group();
rig.add(creative);
const tablet = rounded(creative, 'creative-display', [3.75, 2.55, 0.18], [0, 2.15, 0], mats.dark, 0.16);
tablet.rotation.z = -0.12;
const artTex = screenTexture('design');
const art = new THREE.Mesh(
  new THREE.PlaneGeometry(3.45, 2.24),
  new THREE.MeshStandardMaterial({
    map: artTex,
    emissive: '#ffffff',
    emissiveMap: artTex,
    emissiveIntensity: 0.9,
    roughness: 0.2
  })
);
art.position.set(0, 2.15, 0.23);
art.rotation.z = -0.12;
creative.add(art);

for (let i = 0; i < 4; i++) {
  const ball = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.35 + i * 0.03, 2),
    [mats.orange, mats.purple, mats.cyan, mats.gold][i]
  );
  ball.position.set(-2.6 + i * 1.7, 3.65 + (i % 2) * 0.55, -0.7);
  ball.castShadow = true;
  creative.add(ball);
}
const stylus = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.055, 2.3, 12), mats.white);
stylus.position.set(2.8, 0.85, 1.3);
stylus.rotation.z = 0.25;
creative.add(stylus);

// Scene 05: Experiments
const experiments = new THREE.Group();
rig.add(experiments);
const geo = [
  new THREE.TorusKnotGeometry(0.7, 0.19, 128, 20, 2, 3),
  new THREE.IcosahedronGeometry(0.78, 1),
  new THREE.OctahedronGeometry(0.7, 1),
  new THREE.TorusGeometry(0.58, 0.14, 18, 64)
];
for (let i = 0; i < 4; i++) {
  const o = new THREE.Mesh(geo[i], [mats.purple, mats.cyan, mats.orange, mats.gold][i]);
  o.position.set(-2.2 + i * 1.45, 2.6 + (i % 2) * 0.85, -0.2 + (i % 2) * 0.6);
  o.castShadow = true;
  o.name = 'experiment-object';
  experiments.add(o);
}
const expLabel = box(experiments, 'floating-compute-module', [1.4, 0.45, 0.75], [0, 0.75, 0.5], mats.dark);
expLabel.rotation.y = 0.35;

// Groups Setup
const groups = [workspace, hardware, development, creative, experiments];
groups.forEach((g, i) => {
  if (i !== 0) {
    g.visible = false;
    g.scale.setScalar(0.9);
  }
});

const colors = [0x8b7cf6, 0x38bdf8, 0x10b981, 0xf97316, 0xec4899];
let active = 0;
let transitionStart = 0;
let fromGroup = workspace;
let toGroup = workspace;

// Pointer & Spring State
const state = {
  pointerX: 0,
  pointerY: 0,
  currRotX: 0,
  currRotY: 0,
  orbit: false
};

function resize() {
  const r = canvas.getBoundingClientRect();
  if (!r.width || !r.height) return;
  renderer.setSize(r.width, r.height, false);
  camera.aspect = r.width / r.height;
  camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(canvas);
resize();

// UI Elements
const items = [...document.querySelectorAll('.collection-item')];
const tools = [...document.querySelectorAll('.tool')];

// Emil Sliding Dock Indicator
function updateDockIndicator(index) {
  const indicator = document.querySelector('.dock-indicator');
  const targetTool = tools[index];
  if (!indicator || !targetTool) return;
  indicator.style.transform = `translateX(${targetTool.offsetLeft}px)`;
  indicator.style.width = `${targetTool.offsetWidth}px`;
}

// Scene Selector with Choreographed Animation
function selectScene(i) {
  active = (i + scenes.length) % scenes.length;
  const s = scenes[active];

  playChime(460 + active * 65, 'sine', 0.12);

  fromGroup = groups.find(g => g.visible) || workspace;
  toGroup = groups[active];
  groups.forEach(g => {
    g.visible = g === fromGroup || g === toGroup;
  });

  if (fromGroup === toGroup) fromGroup.visible = true;
  fromGroup.scale.setScalar(1);
  toGroup.scale.setScalar(fromGroup === toGroup ? 1 : 0.85);
  toGroup.position.y = fromGroup === toGroup ? 0 : -0.3;
  transitionStart = performance.now();

  document.body.dataset.active = s.name;
  document.querySelector('#scene').dataset.scene = s.name;
  document.querySelector('#stageLabel').textContent = s.label;
  document.querySelector('#currentNum').textContent = String(active + 1).padStart(2, '0');
  
  // Choreographed Title Slide
  const titleEl = document.querySelector('#heroTitle');
  if (titleEl) {
    titleEl.classList.add('changing');
    setTimeout(() => {
      titleEl.innerHTML = `${s.title}<br><span>${s.line}</span>`;
      titleEl.classList.remove('changing');
    }, 150);
  }

  const descEl = document.querySelector('#heroDesc');
  if (descEl) descEl.textContent = s.desc;

  document.querySelector('#motionText').textContent = s.note;

  // Update tabs & active states
  items.forEach((el, n) => {
    el.classList.toggle('active', n === active);
    el.setAttribute('aria-selected', n === active);
  });
  tools.forEach((el, n) => el.classList.toggle('active', n === active));

  updateDockIndicator(active);
}

// Initialize dock indicator after DOM paint
requestAnimationFrame(() => updateDockIndicator(0));

// Game Animation Loop (Spring Physics & Rotor Rotations)
function animate(now) {
  requestAnimationFrame(animate);
  const t = now * 0.001;

  // Rotate Fan Blades
  animatedFanBlades.forEach(f => {
    f.rotation.z += 0.08;
  });

  // Spring Physics for Cursor Parallax
  const targetX = state.pointerX * (state.orbit ? 0.35 : 0.08);
  const targetY = state.pointerY * (state.orbit ? 0.18 : 0.04);
  state.currRotX += (targetX - state.currRotX) * 0.06;
  state.currRotY += (targetY - state.currRotY) * 0.06;

  rig.rotation.y = state.currRotX + (state.orbit ? t * 0.35 : 0);
  rig.rotation.x = state.currRotY;

  workspace.position.y = Math.sin(t * 0.8) * 0.035;

  // Floating Experiments Rotation
  experiments.children.forEach((o, i) => {
    if (o.name === 'experiment-object') {
      o.rotation.x = t * (0.18 + i * 0.025);
      o.rotation.y = t * (0.2 + i * 0.03);
      o.position.y = 2.6 + (i % 2) * 0.85 + Math.sin(t + i) * 0.09;
    }
  });

  // Smooth Choreographed 3D Transition
  if (transitionStart) {
    const p = Math.min(1, (now - transitionStart) / 600);
    // Custom cubic-bezier approximation for transition
    const e = 1 - Math.pow(1 - p, 3);

    if (fromGroup !== toGroup) {
      fromGroup.scale.setScalar(1 - 0.15 * e);
      toGroup.scale.setScalar(0.85 + 0.15 * e);
      fromGroup.position.y = 0.35 * e;
      toGroup.position.y = -0.3 + 0.3 * e;

      if (p >= 1) {
        fromGroup.visible = false;
        fromGroup.position.y = 0;
        fromGroup.scale.setScalar(1);
        toGroup.scale.setScalar(1);
        toGroup.position.y = 0;
        transitionStart = 0;
      }
    }
  }

  // Smooth Light Color Transition
  fillLight.color.lerp(new THREE.Color(colors[active]), 0.08);
  renderer.render(scene, camera);
}
requestAnimationFrame(animate);

// --- EVENT LISTENERS ---
items.forEach(el => el.addEventListener('click', () => selectScene(Number(el.dataset.index))));
tools.forEach(el => el.addEventListener('click', () => selectScene(Number(el.dataset.index))));

document.querySelector('#next').addEventListener('click', () => selectScene(active + 1));
document.querySelector('#prev').addEventListener('click', () => selectScene(active - 1));
document.querySelector('#nextTop').addEventListener('click', () => selectScene(active + 1));
document.querySelector('#nextMain').addEventListener('click', () => selectScene(active + 1));

// Orbit View Toggle
const viewToggle = document.querySelector('#viewToggle');
if (viewToggle) {
  viewToggle.addEventListener('click', e => {
    state.orbit = !state.orbit;
    viewToggle.classList.toggle('active', state.orbit);
    viewToggle.querySelector('span:last-child').textContent = state.orbit ? 'Orbit on' : 'Orbit view';
    playChime(state.orbit ? 640 : 420, 'triangle', 0.14);
  });
}

// Details Drawer Toggle (Immersive Full Studio Mode)
const detailsToggle = document.querySelector('#detailsToggle');
if (detailsToggle) {
  detailsToggle.addEventListener('click', () => {
    document.body.classList.toggle('details-hidden');
    const hidden = document.body.classList.contains('details-hidden');
    detailsToggle.querySelector('span').textContent = hidden ? 'Show details' : 'Full studio';
    playChime(hidden ? 480 : 560, 'sine', 0.1);
    setTimeout(resize, 320);
  });
}

// Dark / Light Theme Toggle (Rule B8 Sentence Case & Rule B4 Colors)
const themeToggle = document.querySelector('#themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.body.dataset.theme || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = next;
    themeToggle.querySelector('.theme-label').textContent = next === 'dark' ? 'Dark studio' : 'Light porcelain';
    floor.material.color.setHex(next === 'dark' ? 0x181818 : 0xf4f3ef);
    scene.fog.color.setHex(next === 'dark' ? 0x181818 : 0xf4f3ef);
    playChime(next === 'dark' ? 440 : 660, 'sine', 0.15);
  });
}

// Tagline Reveal Animation (Rule B11: Word-by-word scroll reveal)
const taglineWords = document.querySelectorAll('#taglineReveal .word');
if (taglineWords.length > 0) {
  const taglineObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        taglineWords.forEach((word, index) => {
          setTimeout(() => {
            word.classList.add('revealed');
          }, index * 60);
        });
        taglineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const taglineSection = document.querySelector('#philosophy');
  if (taglineSection) {
    taglineObserver.observe(taglineSection);
  }
}

// Mouse Pointer Tracking on 3D Showcase
const showcase = document.querySelector('#showcase');
showcase.addEventListener('pointermove', e => {
  const r = e.currentTarget.getBoundingClientRect();
  state.pointerX = (e.clientX - r.left) / r.width - 0.5;
  state.pointerY = (e.clientY - r.top) / r.height - 0.5;
});
showcase.addEventListener('pointerleave', () => {
  state.pointerX = 0;
  state.pointerY = 0;
});

// Keyboard Navigation
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') selectScene(active + 1);
  if (e.key === 'ArrowLeft') selectScene(active - 1);
});
