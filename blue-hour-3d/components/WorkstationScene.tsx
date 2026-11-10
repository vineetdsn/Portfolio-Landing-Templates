'use client'
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  Float, 
  OrbitControls, 
  RoundedBox, 
  Sparkles, 
  ContactShadows 
} from '@react-three/drei'
import * as THREE from 'three'

const palette: Record<string, string> = {
  workspace: '#a78bfa',   // Soft Purple / Lavender
  hardware: '#fb923c',    // Cyber Amber / Orange
  development: '#38bdf8', // Electric Cyan / Blue
  creative: '#f472b6',    // Neon Magenta / Pink
  experiments: '#a3e635'  // Radioactive Lime
}

type Props = {
  selected: string;
  view: 'studio' | 'orbit' | 'macro';
}

// =========================================================================
// 1. WORKSPACE SCENE COMPONENTS: Studio Display, MacBook, Audio Monitors
// =========================================================================

// High-Fidelity IDE Screen Texture
function useCodeTexture() {
  return useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext('2d')!;

    // Dark sleek editor background
    ctx.fillStyle = '#0f141c';
    ctx.fillRect(0, 0, 1024, 640);

    // Titlebar
    ctx.fillStyle = '#161d28';
    ctx.fillRect(0, 0, 1024, 48);

    // Window control dots
    const dots = ['#ef4444', '#f59e0b', '#10b981'];
    dots.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(28 + i * 22, 24, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // File tab
    ctx.fillStyle = '#212a38';
    ctx.beginPath();
    ctx.roundRect(110, 8, 220, 34, 6);
    ctx.fill();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 14px "DM Mono", monospace';
    ctx.fillText('⚡ StudioEngine.tsx', 130, 30);

    // Line Numbers & Code Lines
    ctx.font = '15px "DM Mono", monospace';
    const lines = [
      { num: '01', text: '// Realtime Three.js Spatial Engine', color: '#64748b' },
      { num: '02', text: 'import { Canvas, useFrame } from "@react-three/fiber";', color: '#c084fc' },
      { num: '03', text: 'import { GlassRefraction, Bloom } from "./shaders";', color: '#c084fc' },
      { num: '04', text: '', color: '' },
      { num: '05', text: 'export async function buildSpatialShowroom() {', color: '#38bdf8' },
      { num: '06', text: '  const hardware = await detectGPUCapabilities();', color: '#f1f5f9' },
      { num: '07', text: '  const targetFPS = hardware.tier >= 3 ? 120 : 60;', color: '#f59e0b' },
      { num: '08', text: '  return initializeZeroLatencyPipeline({', color: '#4ade80' },
      { num: '09', text: '    fidelity: "ULTRA_HIGH",', color: '#fb923c' },
      { num: '10', text: '    particles: 10_000,', color: '#fb923c' },
      { num: '11', text: '    tactileFeedback: true', color: '#fb923c' },
      { num: '12', text: '  });', color: '#4ade80' },
      { num: '13', text: '}', color: '#38bdf8' },
      { num: '14', text: '// System Status: ● READY (0.4ms latency)', color: '#10b981' }
    ];

    lines.forEach((line, i) => {
      const y = 85 + i * 36;
      ctx.fillStyle = '#475569';
      ctx.fillText(line.num, 30, y);
      if (line.text) {
        ctx.fillStyle = line.color || '#e2e8f0';
        ctx.fillText(line.text, 80, y);
      }
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

// Studio Display (Ultra-thin monitor with beveled stand and rear ambient light)
function StudioDisplay({ texture }: { texture: THREE.CanvasTexture | null }) {
  return (
    <group position={[0, 0.45, -0.1]}>
      {/* Aluminum Chassis */}
      <RoundedBox args={[3.2, 2.0, 0.08]} radius={0.06} smoothness={4}>
        <meshPhysicalMaterial color="#1a202c" metalness={0.85} roughness={0.2} clearcoat={0.6} />
      </RoundedBox>

      {/* Screen Glass Bezel & Display */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[3.08, 1.88]} />
        {texture ? (
          <meshBasicMaterial map={texture} toneMapped={false} />
        ) : (
          <meshBasicMaterial color="#0f141c" />
        )}
      </mesh>

      {/* Rear Ambient Lightbar Glow */}
      <pointLight position={[0, 0, -0.3]} intensity={14} color="#818cf8" distance={4} />

      {/* Elegant Display Stand */}
      <mesh position={[0, -1.15, -0.18]} rotation={[0.15, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.12, 0.85, 24]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.88} roughness={0.25} />
      </mesh>
      <RoundedBox args={[1.3, 0.04, 0.8]} radius={0.02} smoothness={3} position={[0, -1.48, -0.05]}>
        <meshStandardMaterial color="#94a3b8" metalness={0.88} roughness={0.25} />
      </RoundedBox>
    </group>
  );
}

// Open MacBook Pro Beside Monitor
function MacBook() {
  return (
    <group position={[-1.75, -0.5, 0.7]} rotation={[0.08, 0.45, -0.04]}>
      {/* Bottom Aluminum Base */}
      <RoundedBox args={[1.4, 0.05, 0.95]} radius={0.03} smoothness={3}>
        <meshStandardMaterial color="#64748b" metalness={0.82} roughness={0.28} />
      </RoundedBox>

      {/* Keyboard Well */}
      <RoundedBox args={[1.25, 0.015, 0.52]} radius={0.015} smoothness={2} position={[0, 0.03, -0.12]}>
        <meshStandardMaterial color="#0f172a" metalness={0.3} roughness={0.7} />
      </RoundedBox>

      {/* Glass Trackpad */}
      <RoundedBox args={[0.5, 0.01, 0.32]} radius={0.02} smoothness={2} position={[0, 0.028, 0.24]}>
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
      </RoundedBox>

      {/* Tilted Open Display Lid */}
      <group position={[0, 0.03, -0.46]} rotation={[-0.32, 0, 0]}>
        <RoundedBox args={[1.4, 0.92, 0.035]} radius={0.025} smoothness={3} position={[0, 0.44, 0]}>
          <meshStandardMaterial color="#64748b" metalness={0.85} roughness={0.25} />
        </RoundedBox>
        {/* Screen */}
        <mesh position={[0, 0.44, 0.02]}>
          <planeGeometry args={[1.32, 0.84]} />
          <meshBasicMaterial color="#1e1b4b" />
        </mesh>
        {/* Floating Code Glyph on Laptop Screen */}
        <mesh position={[0, 0.44, 0.025]}>
          <planeGeometry args={[0.9, 0.5]} />
          <meshBasicMaterial color="#818cf8" transparent opacity={0.65} />
        </mesh>
      </group>
    </group>
  );
}

// Studio Audio Monitors (Pair of Bronze Woofers)
function AudioMonitors() {
  return (
    <>
      {[-2.0, 2.0].map((x, idx) => (
        <group key={idx} position={[x, 0.25, -0.35]} rotation={[0, x > 0 ? -0.35 : 0.35, 0]}>
          {/* Wooden / Dark Matte Speaker Cabinet */}
          <RoundedBox args={[0.65, 1.1, 0.65]} radius={0.04} smoothness={3}>
            <meshStandardMaterial color="#181c24" metalness={0.3} roughness={0.4} />
          </RoundedBox>

          {/* Bronze Woofer Cone */}
          <mesh position={[0, -0.15, 0.33]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.06, 0.08, 32]} />
            <meshStandardMaterial color="#d97706" metalness={0.75} roughness={0.25} />
          </mesh>
          <mesh position={[0, -0.15, 0.37]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.15} />
          </mesh>

          {/* Silk Dome Tweeter */}
          <mesh position={[0, 0.28, 0.33]}>
            <sphereGeometry args={[0.08, 20, 20]} />
            <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.2} />
          </mesh>
        </group>
      ))}
    </>
  );
}

// Custom 75% Mechanical Keyboard
function MechanicalKeyboard() {
  return (
    <group position={[0.2, -0.85, 0.95]} rotation={[-0.08, 0.05, 0]}>
      {/* Heavy Anodized Aluminum Chassis */}
      <RoundedBox args={[2.0, 0.12, 0.72]} radius={0.05} smoothness={3}>
        <meshStandardMaterial color="#1e2530" metalness={0.8} roughness={0.3} />
      </RoundedBox>
      {/* RGB Underglow Acrylic Layer */}
      <mesh position={[0, -0.04, 0]}>
        <boxGeometry args={[1.96, 0.03, 0.68]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.65} />
      </mesh>
      {/* Sculpted Keycaps Grid */}
      {Array.from({ length: 48 }, (_, i) => {
        const col = i % 12;
        const row = Math.floor(i / 12);
        const isAccent = col === 0 || col === 11 || (row === 3 && col === 5);
        return (
          <RoundedBox
            key={i}
            args={[0.13, 0.04, 0.11]}
            radius={0.015}
            smoothness={2}
            position={[-0.82 + col * 0.15, 0.075, -0.22 + row * 0.14]}
          >
            <meshStandardMaterial
              color={isAccent ? '#c084fc' : '#334155'}
              metalness={0.2}
              roughness={0.5}
            />
          </RoundedBox>
        );
      })}
      {/* Brass Volume Rotary Knob */}
      <mesh position={[0.88, 0.1, -0.24]}>
        <cylinderGeometry args={[0.055, 0.055, 0.08, 24]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Ceramic Coffee Mug with Steam
function CoffeeMug() {
  return (
    <group position={[1.75, -0.82, 0.65]}>
      {/* Ceramic Mug Body */}
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.13, 0.11, 0.28, 24]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.15} />
      </mesh>
      {/* Dark Espresso Surface */}
      <mesh position={[0, 0.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.115, 24]} />
        <meshStandardMaterial color="#2d1a0c" roughness={0.25} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.15, 0.14, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.09, 0.025, 12, 24, Math.PI]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.15} />
      </mesh>
      {/* Steam Wisps */}
      <Sparkles count={8} scale={[0.2, 0.5, 0.2]} position={[0, 0.45, 0]} size={1.5} speed={0.4} color="#f8fafc" />
    </group>
  );
}

// =========================================================================
// 2. HARDWARE SCENE: Exploded Quantum GPU / Cyber Processor
// =========================================================================
function HardwareShowcase() {
  const fanGroup1 = useRef<THREE.Group>(null);
  const fanGroup2 = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (fanGroup1.current) fanGroup1.current.rotation.z = t * 6.0;
    if (fanGroup2.current) fanGroup2.current.rotation.z = -t * 6.0;
  });

  return (
    <group position={[0, 0.1, 0]}>
      {/* Central Monolithic Silicon Die */}
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
        <group position={[0, 0.25, 0]}>
          {/* Mirror Anodized Substrate */}
          <RoundedBox args={[1.5, 0.15, 1.5]} radius={0.06} smoothness={4}>
            <meshStandardMaterial color="#1e293b" metalness={0.92} roughness={0.18} />
          </RoundedBox>

          {/* Golden Array Grid Pins */}
          <mesh position={[0, -0.09, 0]}>
            <boxGeometry args={[1.35, 0.02, 1.35]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.1} />
          </mesh>

          {/* Iridescent Quantum Glass Heat Spreader */}
          <RoundedBox args={[1.1, 0.1, 1.1]} radius={0.04} smoothness={3} position={[0, 0.1, 0]}>
            <meshPhysicalMaterial 
              color="#fb923c" 
              metalness={0.75} 
              roughness={0.12} 
              transparent
              opacity={0.85}
              clearcoat={1.0}
              emissive="#ea580c"
              emissiveIntensity={0.6}
            />
          </RoundedBox>

          {/* Holographic Logo / Core Laser Engraving */}
          <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.32, 32]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
          </mesh>
        </group>
      </Float>

      {/* Floating Finned Heat Pipe Assembly (Exploded View) */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.25}>
        <group position={[0, 1.15, 0.3]} rotation={[0.2, -0.15, 0.1]}>
          {/* Finned Aluminum Block */}
          {Array.from({ length: 18 }, (_, i) => (
            <mesh key={i} position={[-0.8 + i * 0.095, 0, 0]}>
              <boxGeometry args={[0.025, 0.75, 1.4]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
            </mesh>
          ))}
          {/* Dual Copper Heatpipes */}
          {[-0.3, 0.3].map((z, idx) => (
            <mesh key={idx} position={[0, 0, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.04, 0.04, 1.9, 24]} />
              <meshStandardMaterial color="#b45309" metalness={0.92} roughness={0.2} />
            </mesh>
          ))}
        </group>
      </Float>

      {/* Dual Holographic High-Speed Turbine Fans */}
      <Float speed={1.3} floatIntensity={0.18}>
        <group position={[0, -0.75, 0.35]} rotation={[-0.15, 0.1, 0]}>
          <RoundedBox args={[2.8, 0.14, 1.4]} radius={0.06} smoothness={3}>
            <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
          </RoundedBox>

          {/* Left Fan */}
          <group position={[-0.7, 0.08, 0]}>
            <mesh>
              <torusGeometry args={[0.55, 0.03, 12, 36]} />
              <meshBasicMaterial color="#38bdf8" />
            </mesh>
            <group ref={fanGroup1}>
              {Array.from({ length: 9 }, (_, i) => (
                <mesh key={i} rotation={[0, (i * Math.PI * 2) / 9, 0.35]}>
                  <boxGeometry args={[0.48, 0.02, 0.12]} />
                  <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.25} />
                </mesh>
              ))}
            </group>
          </group>

          {/* Right Fan */}
          <group position={[0.7, 0.08, 0]}>
            <mesh>
              <torusGeometry args={[0.55, 0.03, 12, 36]} />
              <meshBasicMaterial color="#f97316" />
            </mesh>
            <group ref={fanGroup2}>
              {Array.from({ length: 9 }, (_, i) => (
                <mesh key={i} rotation={[0, (i * Math.PI * 2) / 9, -0.35]}>
                  <boxGeometry args={[0.48, 0.02, 0.12]} />
                  <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.25} />
                </mesh>
              ))}
            </group>
          </group>
        </group>
      </Float>

      {/* Floating DDR5 RAM Sticks on Sides */}
      {[-1.85, 1.85].map((x, idx) => (
        <Float key={idx} speed={1.6 + idx * 0.3} floatIntensity={0.22}>
          <group position={[x, 0.3, -0.2]} rotation={[0.2, idx ? -0.3 : 0.3, idx ? 0.35 : -0.35]}>
            <RoundedBox args={[0.15, 1.6, 0.45]} radius={0.03} smoothness={3}>
              <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.25} />
            </RoundedBox>
            {/* Top RGB Light Diffuser */}
            <mesh position={[0, 0.82, 0]}>
              <boxGeometry args={[0.14, 0.06, 0.44]} />
              <meshBasicMaterial color={idx ? '#38bdf8' : '#fb923c'} />
            </mesh>
          </group>
        </Float>
      ))}

      <Sparkles count={40} scale={[4.5, 3.5, 3]} size={3} speed={0.5} color="#fb923c" />
    </group>
  );
}

// =========================================================================
// 3. DEVELOPMENT SCENE: Holographic Terminal & 3D Code Matrix
// =========================================================================
function DevelopmentShowcase() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.45;
      ring1.current.rotation.y = t * 0.3;
    }
    if (ring2.current) {
      ring2.current.rotation.z = t * 0.55;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.35;
    }
  });

  const techBadges = [
    { label: 'React 18', color: '#38bdf8', pos: [1.7, 0.85, 0] },
    { label: 'TypeScript', color: '#60a5fa', pos: [-1.8, 0.75, 0.4] },
    { label: 'Next.js 14', color: '#f8fafc', pos: [1.5, -0.85, 0.5] },
    { label: 'Three.js', color: '#c084fc', pos: [-1.6, -0.8, -0.3] },
    { label: 'GLSL Shaders', color: '#fbbf24', pos: [0, 1.55, -0.4] }
  ];

  return (
    <group position={[0, 0.1, 0]}>
      {/* Central Holographic IDE Core Cube */}
      <group ref={coreRef}>
        <Float speed={1.2} floatIntensity={0.2}>
          <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.1} smoothness={4}>
            <meshStandardMaterial 
              color="#0369a1" 
              metalness={0.8} 
              roughness={0.15} 
              emissive="#0284c7"
              emissiveIntensity={0.4}
              transparent
              opacity={0.85}
            />
          </RoundedBox>

          {/* Internal Wireframe Glowing Matrix */}
          <mesh>
            <boxGeometry args={[1.2, 1.2, 1.2]} />
            <meshBasicMaterial color="#38bdf8" wireframe />
          </mesh>

          {/* Inner Pulsing Core Crystal */}
          <mesh>
            <octahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial color="#67e8f9" emissive="#0284c7" emissiveIntensity={1.5} />
          </mesh>
        </Float>
      </group>

      {/* Orbiting Gyroscope Rings */}
      <mesh ref={ring1}>
        <torusGeometry args={[2.2, 0.04, 16, 80]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.2} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.6, 0.035, 16, 80]} />
        <meshStandardMaterial color="#818cf8" emissive="#4f46e5" emissiveIntensity={1.0} />
      </mesh>

      {/* Floating 3D Technology Badges */}
      {techBadges.map((badge, idx) => (
        <Float key={idx} speed={1.5 + idx * 0.2} floatIntensity={0.25} rotationIntensity={0.2}>
          <group position={badge.pos as [number, number, number]}>
            <RoundedBox args={[1.0, 0.4, 0.1]} radius={0.04} smoothness={3}>
              <meshStandardMaterial 
                color="#0f172a" 
                metalness={0.85} 
                roughness={0.2} 
                emissive={badge.color}
                emissiveIntensity={0.3}
              />
            </RoundedBox>
            {/* Glowing Accent Border */}
            <mesh position={[0, 0, 0.055]}>
              <planeGeometry args={[0.9, 0.3]} />
              <meshBasicMaterial color={badge.color} transparent opacity={0.6} />
            </mesh>
          </group>
        </Float>
      ))}

      <Sparkles count={55} scale={[4.5, 4, 3.5]} size={3} speed={0.5} color="#38bdf8" />
    </group>
  );
}

// =========================================================================
// 4. CREATIVE SCENE: Kinetic Chromatic Glass Sculpture
// =========================================================================
function CreativeShowcase() {
  const knotRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame(({ clock }, dt) => {
    if (knotRef.current) {
      knotRef.current.rotation.x = clock.elapsedTime * 0.32;
      knotRef.current.rotation.y = clock.elapsedTime * 0.45;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += dt * 0.3;
      ringRef.current.rotation.x += dt * 0.2;
    }
  });

  return (
    <group position={[0, 0.1, 0]}>
      {/* Masterpiece Kinetic Chromatic Torus Knot */}
      <Float speed={1.2} floatIntensity={0.25}>
        <mesh ref={knotRef}>
          <torusKnotGeometry args={[1.05, 0.28, 180, 32, 2, 5]} />
          <meshPhysicalMaterial 
            color="#f472b6" 
            metalness={0.75} 
            roughness={0.06} 
            transparent
            opacity={0.8}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
          />
        </mesh>
      </Float>

      {/* Orbiting Golden Brass Orbital Frame */}
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[2.4, 0.025, 12, 80]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.2, 0.02, 12, 80]} />
          <meshStandardMaterial color="#f472b6" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Floating Refractive Polyhedra Surrounding the Knot */}
      <Float speed={1.6} floatIntensity={0.3} rotationIntensity={0.4}>
        <mesh position={[-1.75, 1.1, 0.3]}>
          <icosahedronGeometry args={[0.38, 0]} />
          <meshStandardMaterial color="#f472b6" metalness={0.85} roughness={0.15} />
        </mesh>
      </Float>

      <Float speed={1.4} floatIntensity={0.25} rotationIntensity={0.3}>
        <mesh position={[1.8, -0.9, 0.2]}>
          <dodecahedronGeometry args={[0.42, 0]} />
          <meshPhysicalMaterial 
            color="#a78bfa" 
            metalness={0.8} 
            roughness={0.1} 
            transparent
            opacity={0.75}
            clearcoat={1.0} 
          />
        </mesh>
      </Float>

      <Float speed={1.8} floatIntensity={0.35}>
        <mesh position={[1.6, 1.0, -0.4]} rotation={[0.4, 0.2, 0]}>
          <octahedronGeometry args={[0.32, 0]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.2} />
        </mesh>
      </Float>

      <Sparkles count={60} scale={[5, 4.5, 4]} size={3} speed={0.4} color="#f472b6" />
    </group>
  );
}

// =========================================================================
// 5. EXPERIMENTS SCENE: Quantum Singularity & Gravity Anomaly
// =========================================================================
function ExperimentsShowcase() {
  const accretionRing1 = useRef<THREE.Mesh>(null);
  const accretionRing2 = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (accretionRing1.current) accretionRing1.current.rotation.z = t * 0.9;
    if (accretionRing2.current) accretionRing2.current.rotation.z = -t * 0.65;
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 3.0) * 0.08;
      coreRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={[0, 0.1, 0]}>
      {/* Central Singularity Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.85, 48, 48]} />
        <meshStandardMaterial 
          color="#1e293b" 
          emissive="#a3e635" 
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Surrounding Glowing Gravitational Event Horizon */}
      <mesh>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial color="#bef264" wireframe transparent opacity={0.4} />
      </mesh>

      {/* Accretion Disk Ring 1 (Tilted Energy Ribbon) */}
      <mesh ref={accretionRing1} rotation={[1.1, 0.4, 0]}>
        <torusGeometry args={[1.9, 0.12, 16, 100]} />
        <meshStandardMaterial 
          color="#a3e635" 
          emissive="#65a30d" 
          emissiveIntensity={1.6}
          roughness={0.15}
        />
      </mesh>

      {/* Accretion Disk Ring 2 (Secondary Outer Dust Field) */}
      <mesh ref={accretionRing2} rotation={[-0.8, -0.3, 0]}>
        <torusGeometry args={[2.5, 0.045, 12, 90]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.0} />
      </mesh>

      {/* Levitating Anti-Gravity Crystal Shards */}
      {[-1.5, -0.8, 0.9, 1.6].map((x, i) => (
        <Float key={i} speed={1.2 + i * 0.3} floatIntensity={0.35} rotationIntensity={0.4}>
          <mesh position={[x, (i % 2 === 0 ? 0.9 : -0.9), (i % 3 - 1) * 0.5]} rotation={[i, i * 0.5, 0]}>
            <octahedronGeometry args={[0.3 + (i % 2) * 0.08, 0]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? '#a3e635' : '#22d3ee'} 
              metalness={0.85} 
              roughness={0.15} 
              emissive={i % 2 === 0 ? '#4d7c0f' : '#0891b2'}
              emissiveIntensity={0.5}
            />
          </mesh>
        </Float>
      ))}

      <Sparkles count={80} scale={[5, 4.5, 4]} size={3.5} speed={0.8} color="#a3e635" />
    </group>
  );
}

// =========================================================================
// MASTER WORKSTATION SCENE RIG
// =========================================================================
function SceneRig({ selected, view }: Props) {
  const rigRef = useRef<THREE.Group>(null);
  const texture = useCodeTexture();
  const { size } = useThree();

  // Mouse Parallax & Dynamic Responsiveness
  useFrame(({ pointer, clock }, dt) => {
    if (!rigRef.current) return;
    const targetRotY = pointer.x * 0.35 + (view === 'orbit' ? clock.elapsedTime * 0.15 : 0);
    const targetRotX = -pointer.y * 0.2 + (view === 'macro' ? 0.2 : 0);
    rigRef.current.rotation.y = THREE.MathUtils.damp(rigRef.current.rotation.y, targetRotY, 3, dt);
    rigRef.current.rotation.x = THREE.MathUtils.damp(rigRef.current.rotation.x, targetRotX, 3, dt);
  });

  const currentScene = ['workspace', 'hardware', 'development', 'creative', 'experiments'].includes(selected)
    ? selected
    : 'workspace';

  return (
    <group ref={rigRef} position={[0, -0.32, 0]} scale={size.width < 500 ? 0.72 : size.width < 900 ? 0.88 : 1.05}>
      {/* SCENE 1: WORKSPACE */}
      {currentScene === 'workspace' && (
        <group>
          <StudioDisplay texture={texture} />
          <MacBook />
          <AudioMonitors />
          <MechanicalKeyboard />
          <CoffeeMug />
        </group>
      )}

      {/* SCENE 2: HARDWARE */}
      {currentScene === 'hardware' && <HardwareShowcase />}

      {/* SCENE 3: DEVELOPMENT */}
      {currentScene === 'development' && <DevelopmentShowcase />}

      {/* SCENE 4: CREATIVE */}
      {currentScene === 'creative' && <CreativeShowcase />}

      {/* SCENE 5: EXPERIMENTS */}
      {currentScene === 'experiments' && <ExperimentsShowcase />}

      {/* Photorealistic Ground Contact Shadows */}
      <ContactShadows 
        position={[0, -1.5, 0]} 
        opacity={0.7} 
        scale={9} 
        blur={2.4} 
        far={4.5} 
        color="#030712" 
      />
    </group>
  );
}

export default function WorkstationScene({ selected, view }: Props) {
  const cameraPos: [number, number, number] = 
    view === 'macro' ? [0, 0.4, 4.2] : view === 'orbit' ? [0, 1.2, 6.2] : [0, 0.8, 5.8];

  return (
    <div className="workstation-3d-canvas" style={{ width: '100%', height: '100%' }}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: cameraPos, fov: 40 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        {/* Balanced High-End Studio Lighting */}
        <ambientLight intensity={0.85} />
        <hemisphereLight color="#ffffff" groundColor="#1e293b" intensity={0.9} />
        <directionalLight position={[-4, 7, 5]} intensity={2.6} color="#ffffff" />
        <directionalLight position={[4, 2, -3]} intensity={1.2} color="#93c5fd" />
        <pointLight 
          position={[0, 3, 2.5]} 
          intensity={22} 
          color={palette[selected] || '#a78bfa'} 
          distance={9} 
        />
        <pointLight position={[-3, -1, -2]} intensity={14} color="#6366f1" distance={7} />

        <Suspense fallback={null}>
          <SceneRig selected={selected} view={view} />
        </Suspense>

        <OrbitControls 
          enablePan={false} 
          enableZoom={view === 'orbit'} 
          enableDamping 
          dampingFactor={0.07} 
          minPolarAngle={Math.PI * 0.25} 
          maxPolarAngle={Math.PI * 0.65} 
          rotateSpeed={0.55}
        />
      </Canvas>
    </div>
  );
}
