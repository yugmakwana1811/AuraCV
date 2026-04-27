'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls, Sphere, Stars } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.6}>
      <Sphere ref={meshRef} args={[1.1, 64, 64]}>
        <MeshDistortMaterial color="#22d3ee" distort={0.35} roughness={0.3} speed={2} />
      </Sphere>
    </Float>
  );
}

export function HeroScene() {
  return (
    <div className="h-[420px] w-full">
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 2]} intensity={1.2} color="#4ade80" />
        <directionalLight position={[-4, -2, -2]} intensity={0.8} color="#22d3ee" />
        <Stars radius={30} depth={30} count={1200} factor={3} saturation={0} />
        <CoreSphere />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.45} />
      </Canvas>
    </div>
  );
}
