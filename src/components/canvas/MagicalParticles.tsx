"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MagicalParticlesProps {
  activeChapter: number;
}

export function MagicalParticles({ activeChapter }: MagicalParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 900;

  // Generate a procedural soft Gaussian radial bokeh texture (eliminates hard squares/dots)
  const particleTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1.0)");
    gradient.addColorStop(0.2, "rgba(255, 240, 200, 0.85)");
    gradient.addColorStop(0.5, "rgba(214, 181, 109, 0.35)");
    gradient.addColorStop(0.8, "rgba(164, 125, 69, 0.08)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Multi-scale particle positions, velocities, and scales
  const { positions, velocities, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const ph = new Float32Array(count);

    let seed = 42;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < count; i++) {
      // Natural 3D distribution surrounding the camera and castle
      pos[i * 3] = (rnd() - 0.5) * 36;
      pos[i * 3 + 1] = (rnd() - 0.5) * 24;
      pos[i * 3 + 2] = (rnd() - 0.5) * 30 - 3;

      // Realistic varied drift velocities (Brownian motion + gentle upward convective float)
      vel[i * 3] = (rnd() - 0.5) * 0.008;
      vel[i * 3 + 1] = 0.004 + rnd() * 0.014;
      vel[i * 3 + 2] = (rnd() - 0.5) * 0.008;

      ph[i] = rnd() * Math.PI * 2;
    }

    return { positions: pos, velocities: vel, phases: ph };
  }, [count]);

  // Target cinematic palette color per chapter
  const targetColor = useMemo(() => {
    switch (activeChapter) {
      case 2:
        return new THREE.Color("#10B981"); // Chamber emerald mist
      case 3:
        return new THREE.Color("#7DD3FC"); // Azkaban / Patronus silver-cyan
      case 4:
        return new THREE.Color("#F59E0B"); // Goblet of Fire warm amber
      case 5:
        return new THREE.Color("#F43F5E"); // Phoenix embers
      case 6:
        return new THREE.Color("#A5B4FC"); // Pensieve celestial silver-indigo
      case 7:
        return new THREE.Color("#D8B4FE"); // Deathly Hallows mist
      case 8:
        return new THREE.Color("#FDE047"); // Epic dawn gold
      default:
        return new THREE.Color("#D6B56D"); // Refined Antique Gold
    }
  }, [activeChapter]);

  const currentColor = useRef(new THREE.Color("#D6B56D"));

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Smooth color interpolation
    currentColor.current.lerp(targetColor, delta * 2.2);
    (pointsRef.current.material as THREE.PointsMaterial).color = currentColor.current;

    const time = state.clock.elapsedTime;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Gentle harmonic air draft
      const sway = Math.sin(time * 0.8 + phases[i]) * 0.004;
      array[idx] += velocities[idx] + sway;
      array[idx + 1] += velocities[idx + 1];
      array[idx + 2] += velocities[idx + 2];

      // Recycle particles smoothly when they drift beyond bounds
      if (array[idx + 1] > 14) {
        array[idx + 1] = -12;
        array[idx] = (Math.random() - 0.5) * 36;
        array[idx + 2] = (Math.random() - 0.5) * 30 - 3;
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
        size={0.24}
        map={particleTexture || undefined}
        color="#D6B56D"
        transparent
        opacity={0.72}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
}
