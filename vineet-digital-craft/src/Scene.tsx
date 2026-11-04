import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { useRef, type RefObject } from 'react'
import * as THREE from 'three'

function Gyro({ pointer, reduceMotion }: { pointer: RefObject<THREE.Vector2>; reduceMotion: boolean }) {
  const group = useRef<THREE.Group>(null)
  useFrame((state, delta) => {
    if (!group.current) return
    if (reduceMotion) {
      group.current.rotation.set(0, 0, 0)
      group.current.position.y = 0
      return
    }
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.current.x * 0.19 + Math.sin(state.clock.elapsedTime * 0.22) * 0.08, 3, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -pointer.current.y * 0.12, 3, delta)
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.055
  })
  return <group ref={group} position={[0.12, 0.06, 0]}>
    <mesh rotation={[0.72, 0.1, 0.55]}>
      <torusGeometry args={[0.61, 0.006, 8, 120]} />
      <meshBasicMaterial color="#687cff" transparent opacity={0.56} />
    </mesh>
    <mesh rotation={[1.14, 0.8, -0.28]}>
      <torusGeometry args={[0.83, 0.004, 8, 120]} />
      <meshBasicMaterial color="#38d7f4" transparent opacity={0.48} />
    </mesh>
    <Float speed={1.1} rotationIntensity={0.7} floatIntensity={0.65}>
      <mesh position={[0.57, 0.2, 0.13]}>
        <icosahedronGeometry args={[0.048, 1]} />
        <meshStandardMaterial color="#d8f36c" emissive="#b2d846" emissiveIntensity={0.5} metalness={0.55} roughness={0.22} />
      </mesh>
    </Float>
    <Float speed={0.8} rotationIntensity={0.5} floatIntensity={0.45}>
      <mesh position={[-0.68, -0.2, 0.08]}>
        <sphereGeometry args={[0.035, 20, 20]} />
        <meshStandardMaterial color="#8c9dff" emissive="#4c5ef1" emissiveIntensity={0.65} metalness={0.4} roughness={0.24} />
      </mesh>
    </Float>
  </group>
}

export default function Scene({ pointer, reduceMotion }: { pointer: RefObject<THREE.Vector2>; reduceMotion: boolean }) {
  return <Canvas className="webgl" dpr={[1, 1.5]} camera={{ position: [0, 0, 3.8], fov: 42 }} gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}>
    <ambientLight intensity={1.6} />
    <pointLight position={[2, 2, 2]} intensity={1.2} color="#6d7cff" />
    <Gyro pointer={pointer} reduceMotion={reduceMotion} />
    <Sparkles count={reduceMotion ? 0 : 34} scale={[3.9, 2.6, 1.8]} size={1.3} speed={reduceMotion ? 0 : 0.18} opacity={0.4} color="#7282ff" />
  </Canvas>
}
