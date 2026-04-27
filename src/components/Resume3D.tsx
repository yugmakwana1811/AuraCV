import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function ResumeMesh() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Smoothly react to scroll position
      const scrollY = window.scrollY;
      
      const targetRotationY = Math.sin(state.clock.elapsedTime * 0.2) * 0.1 + (scrollY * 0.002);
      const targetRotationX = -0.1 + (scrollY * 0.0015);
      const targetPositionY = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 - (scrollY * 0.002);

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPositionY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Paper */}
      <Box args={[2, 2.8, 0.05]} castShadow receiveShadow>
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.1} />
      </Box>
      {/* Header Profile Circle */}
      <Box args={[0.3, 0.3, 0.06]} position={[-0.6, 1.1, 0.01]}>
         <meshStandardMaterial color="#00F0FF" roughness={0.3} />
      </Box>
      {/* Header Name Line */}
      <Box args={[1.0, 0.15, 0.06]} position={[0.2, 1.15, 0.01]}>
        <meshStandardMaterial color="#FF3366" roughness={0.3} />
      </Box>
      {/* Additional Header text */}
      <Box args={[0.8, 0.05, 0.06]} position={[0.1, 1.0, 0.01]}>
        <meshStandardMaterial color="#e2e8f0" />
      </Box>

      {/* Main Text lines */}
      <Box args={[1.6, 0.05, 0.06]} position={[0, 0.7, 0.01]}>
        <meshStandardMaterial color="#e2e8f0" />
      </Box>
      <Box args={[1.4, 0.05, 0.06]} position={[-0.1, 0.55, 0.01]}>
        <meshStandardMaterial color="#e2e8f0" />
      </Box>
      <Box args={[1.5, 0.05, 0.06]} position={[-0.05, 0.4, 0.01]}>
        <meshStandardMaterial color="#e2e8f0" />
      </Box>

      {/* Blocks simulating sections */}
      <Box args={[0.7, 0.8, 0.06]} position={[-0.45, -0.2, 0.01]}>
        <meshStandardMaterial color="#f8fafc" />
      </Box>
      <Box args={[0.7, 0.8, 0.06]} position={[0.45, -0.2, 0.01]}>
        <meshStandardMaterial color="#f0f4f8" />
      </Box>

      {/* Bottom Text lines */}
      <Box args={[1.6, 0.05, 0.06]} position={[0, -0.9, 0.01]}>
        <meshStandardMaterial color="#e2e8f0" />
      </Box>
      <Box args={[1.4, 0.05, 0.06]} position={[-0.1, -1.05, 0.01]}>
        <meshStandardMaterial color="#e2e8f0" />
      </Box>
    </group>
  );
}

export default function Resume3D() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#00ffff" />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <ResumeMesh />
        </Float>
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
