'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

function Owl(){
 const group=useRef<THREE.Group>(null), head=useRef<THREE.Group>(null), mouse=useRef(new THREE.Vector2())
 useFrame(({pointer,clock},dt)=>{if(group.current&&head.current){mouse.current.lerp(pointer,.035);group.current.position.y=Math.sin(clock.elapsedTime*.8)*.075;group.current.rotation.z=Math.sin(clock.elapsedTime*.5)*.025;head.current.rotation.y=THREE.MathUtils.damp(head.current.rotation.y,mouse.current.x*.22,3,dt);head.current.rotation.x=THREE.MathUtils.damp(head.current.rotation.x,-mouse.current.y*.12,3,dt)}})
 const feather='#246aa0',deep='#0b355f'
 return <group ref={group} position={[0,-.35,0]}>
   {/* procedural sculpted owl: layered feather mantle, soft body and expressive eyes */}
   <mesh position={[0,-.02,0]} scale={[.86,1.13,.68]} castShadow><sphereGeometry args={[1,48,36]}/><meshPhysicalMaterial color={deep} roughness={.55} metalness={.13} clearcoat={.4}/></mesh>
   {Array.from({length:92},(_,i)=>{const y=-.68+(i%13)*.105, ring=Math.floor(i/13), x=(ring-3)*.205+((i%2)*.03);const surface=.68*Math.sqrt(Math.max(.08,1-(x*x)/(.86*.86)-((y+.02)*(y+.02))/(1.13*1.13)));return <mesh key={i} position={[x,y,surface+.035]} rotation={[0,0,x*.12]} scale={[.13,.15,.08]} castShadow><sphereGeometry args={[1,12,10]}/><meshStandardMaterial color={i%3===0?'#3b86bd':feather} roughness={.68}/></mesh>})}
   <group ref={head} position={[0,.88,0]}>
    <mesh scale={[.82,.73,.64]} castShadow><sphereGeometry args={[1,48,36]}/><meshPhysicalMaterial color="#1b5788" roughness={.49} metalness={.16}/></mesh>
    {[-1,1].map((s)=><group key={s} position={[s*.56,.46,.01]} rotation={[0,0,-s*.28]}><mesh position={[0,.21,0]} rotation={[0,0,-s*.35]}><coneGeometry args={[.2,.5,6]}/><meshStandardMaterial color="#174978" roughness={.65}/></mesh><mesh position={[0,.3,.015]} rotation={[0,0,-s*.35]}><coneGeometry args={[.095,.34,5]}/><meshStandardMaterial color="#4794bd" roughness={.6}/></mesh></group>)}
    {[-1,1].map((s)=><group key={s} position={[s*.3,.04,.55]}><mesh scale={[.31,.3,.12]}><sphereGeometry args={[1,32,24]}/><meshStandardMaterial color="#d0e4e7" roughness={.62}/></mesh><mesh position={[0,0,.105]} scale={[.218,.22,.08]}><sphereGeometry args={[1,32,24]}/><meshPhysicalMaterial color="#38c5e8" emissive="#1296d9" emissiveIntensity={.42} roughness={.18} metalness={.22}/></mesh><mesh position={[0,0,.17]} scale={[.115,.14,.07]}><sphereGeometry args={[1,24,20]}/><meshPhysicalMaterial color="#031426" roughness={.1} clearcoat={1}/></mesh><mesh position={[-.052,.065,.228]} scale={[.045,.05,.025]}><sphereGeometry args={[1,16,12]}/><meshBasicMaterial color="white"/></mesh><mesh position={[0,-.255,.055]} rotation={[0,0,s*-.11]}><torusGeometry args={[.29,.025,8,32,Math.PI]}/><meshStandardMaterial color="#4589b4" roughness={.6}/></mesh></group>)}
    <mesh position={[0,-.23,.62]} rotation={[0,0,Math.PI]}><coneGeometry args={[.13,.24,5]}/><meshStandardMaterial color="#efad54" roughness={.36} metalness={.2}/></mesh>
    {Array.from({length:18},(_,i)=><mesh key={i} position={[(i-8.5)*.08,-.42-Math.cos((i-8.5)/9*Math.PI)*.055,.5]} rotation={[0,0,(i-9)*.035]} scale={[.043,.105,.03]}><sphereGeometry args={[1,10,8]}/><meshStandardMaterial color={i%2?'#23679b':'#3b83b4'} roughness={.72}/></mesh>)}
   </group>
   <mesh position={[0,-1.16,.03]} scale={[.27,.27,.25]}><sphereGeometry args={[1,20,16]}/><meshStandardMaterial color="#d7a24f" roughness={.55}/></mesh>
   <mesh position={[0,-1.45,.1]} rotation={[0,0,-.02]}><cylinderGeometry args={[.035,.055,1.4,16]}/><meshStandardMaterial color="#8b623d" roughness={.75}/></mesh><mesh position={[.02,-1.77,.1]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.038,.06,2.5,16]}/><meshStandardMaterial color="#725239" roughness={.7}/></mesh>
  </group>
}
export default function OwlScene(){return <div className="owl-canvas"><Canvas dpr={[1,1.5]} camera={{position:[0,.1,5.2],fov:35}} gl={{alpha:true,antialias:true,powerPreference:'low-power'}}><ambientLight intensity={1.2}/><directionalLight position={[-3,5,5]} intensity={2.25} color="#b4e6ff"/><pointLight position={[2,2,3]} intensity={30} color="#2abfff" distance={8}/><pointLight position={[-3,-1,-2]} intensity={22} color="#5865ff" distance={8}/><Suspense fallback={null}><Float speed={1.15} rotationIntensity={.06} floatIntensity={.13}><Owl/></Float><Sparkles count={52} scale={[4.5,4.8,3]} size={2} speed={.2} color="#7bcfff" opacity={.5}/></Suspense></Canvas></div>}
