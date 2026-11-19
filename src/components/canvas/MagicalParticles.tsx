"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MagicalParticlesProps {
  activeChapter: number;
}

export function MagicalParticles({ activeChapter }: MagicalParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 750;

  // Particle positions & velocities
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 28 - 4;

      vel[i * 3] = (Math.random() - 0.5) * 0.015;
      vel[i * 3 + 1] = 0.008 + Math.random() * 0.02; // Float gently upward
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.015;
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  // Target color based on active chapter
  const targetColor = useMemo(() => {
    switch (activeChapter) {
      case 2:
        return new THREE.Color("#10B981"); // Chamber emerald
      case 3:
        return new THREE.Color("#38BDF8"); // Azkaban cyan/patronus
      case 4:
        return new THREE.Color("#F59E0B"); // Goblet amber/fire
      case 5:
        return new THREE.Color("#EF4444"); // Order phoenix red
      case 6:
        return new THREE.Color("#818CF8"); // Half-Blood prince indigo
      case 7:
        return new THREE.Color("#C4B5FD"); // Deathly hallows silver violet
      case 8:
        return new THREE.Color("#FDE047"); // Epic finale golden dawn
      default:
        return new THREE.Color("#C6A15B"); // Classic Hogwarts gold
    }
  }, [activeChapter]);

  const currentColor = useRef(new THREE.Color("#C6A15B"));

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    // Smoothly interpolate particle color toward chapter theme
    currentColor.current.lerp(targetColor, delta * 2.5);
    (pointsRef.current.material as THREE.PointsMaterial).color = currentColor.current;

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      array[i * 3] += velocities[i * 3];
      array[i * 3 + 1] += velocities[i * 3 + 1];
      array[i * 3 + 2] += velocities[i * 3 + 2];

      // Recycle particles that drift out of bounds
      if (array[i * 3 + 1] > 14) {
        array[i * 3 + 1] = -10;
        array[i * 3] = (Math.random() - 0.5) * 35;
        array[i * 3 + 2] = (Math.random() - 0.5) * 28 - 4;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        color="#C6A15B"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

