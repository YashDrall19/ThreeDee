"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CandleInstance {
  baseX: number;
  baseY: number;
  baseZ: number;
  height: number;
  radius: number;
  speed: number;
  phase: number;
  swaySpeed: number;
  flameFlickerOffset: number;
}

export function FloatingCandles() {
  const groupRef = useRef<THREE.Group>(null);
  const pointLight1Ref = useRef<THREE.PointLight>(null);
  const pointLight2Ref = useRef<THREE.PointLight>(null);
  const pointLight3Ref = useRef<THREE.PointLight>(null);

  // Generate varied, realistic candle distributions inspired by the Great Hall reference image
  const candles: CandleInstance[] = useMemo(() => {
    const list: CandleInstance[] = [];
    const count = 42;
    let seed = 12345;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < count; i++) {
      // Natural distribution: corridor depth and height layers
      const baseX = (rnd() - 0.5) * 28;
      const baseY = rnd() * 9 - 1.5;
      const baseZ = (rnd() - 0.5) * 22 - 3;
      const height = 0.9 + rnd() * 1.3; // Variations from short melted to tall majestic
      const radius = 0.08 + rnd() * 0.04;
      const speed = 0.5 + rnd() * 0.7; // Gentle, majestic floating speeds
      const phase = rnd() * Math.PI * 2;
      const swaySpeed = 0.3 + rnd() * 0.5;
      const flameFlickerOffset = rnd() * 10;

      list.push({
        baseX,
        baseY,
        baseZ,
        height,
        radius,
        speed,
        phase,
        swaySpeed,
        flameFlickerOffset,
      });
    }
    return list;
  }, []);

  // Shared realistic PBR Wax Material
  const waxMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#F6F0E6", // Natural beeswax/ivory
        roughness: 0.45,  // Satin waxy sheen
        metalness: 0.03,
      }),
    []
  );

  // Melted wax rim material
  const waxRimMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#E8DFC8",
        roughness: 0.55,
        metalness: 0.02,
      }),
    []
  );

  // Wick material: charred black cotton
  const wickMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#1c1917",
      }),
    []
  );

  // Flame inner core: hot incandescent white-yellow
  const flameInnerMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#FFFBEB",
      }),
    []
  );

  // Flame outer body: warm golden amber with soft glow
  const flameOuterMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#F59E0B",
        emissive: "#EA580C",
        emissiveIntensity: 3.5,
        roughness: 0.2,
        transparent: true,
        opacity: 0.92,
      }),
    []
  );

  // References to candle individual sub-groups for smooth multi-frequency floating
  const candleGroupRefs = useRef<(THREE.Group | null)[]>([]);
  const flameRefs = useRef<(THREE.Group | null)[]>([]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    candles.forEach((c, idx) => {
      const g = candleGroupRefs.current[idx];
      const f = flameRefs.current[idx];
      if (!g) return;

      // Realistic multi-frequency harmonic floating (simulating subtle castle drafts)
      const dy =
        Math.sin(time * c.speed + c.phase) * 0.24 +
        Math.cos(time * c.speed * 1.6 + c.phase * 1.3) * 0.08;
      const dx = Math.sin(time * c.swaySpeed + c.phase * 0.8) * 0.07;
      const tiltZ = Math.sin(time * c.swaySpeed * 1.2 + c.phase) * 0.03;

      g.position.set(c.baseX + dx, c.baseY + dy, c.baseZ);
      g.rotation.z = tiltZ;
      g.rotation.x = Math.cos(time * c.swaySpeed + c.phase) * 0.02;

      // Multi-layer flame organic flicker
      if (f) {
        const flicker1 = Math.sin(time * 16.0 + c.flameFlickerOffset) * 0.09;
        const flicker2 = Math.cos(time * 27.0 + c.flameFlickerOffset * 1.5) * 0.05;
        const scaleY = 1.0 + flicker1 + flicker2;
        const scaleXZ = 1.0 - (flicker1 + flicker2) * 0.5;

        f.scale.set(scaleXZ, scaleY, scaleXZ);
        f.rotation.z = Math.sin(time * 12.0 + c.flameFlickerOffset) * 0.06;
      }
    });

    // Gentle global flickering of the warm candlelight sources
    if (pointLight1Ref.current) {
      pointLight1Ref.current.intensity =
        1.8 + Math.sin(time * 8.5) * 0.25 + Math.sin(time * 19.0) * 0.12;
    }
    if (pointLight2Ref.current) {
      pointLight2Ref.current.intensity =
        1.7 + Math.cos(time * 9.2) * 0.22 + Math.sin(time * 22.0) * 0.1;
    }
    if (pointLight3Ref.current) {
      pointLight3Ref.current.intensity =
        1.9 + Math.sin(time * 7.7) * 0.28 + Math.cos(time * 17.5) * 0.14;
    }
  });

  return (
    <group ref={groupRef}>
      {candles.map((c, idx) => (
        <group
          key={`candle-${idx}`}
          ref={(el) => {
            candleGroupRefs.current[idx] = el;
          }}
          position={[c.baseX, c.baseY, c.baseZ]}
        >
          {/* Main Wax Shaft */}
          <mesh material={waxMaterial} position={[0, -c.height / 2, 0]}>
            <cylinderGeometry args={[c.radius * 0.94, c.radius, c.height, 14]} />
          </mesh>

          {/* Melted Wax Rim with subtle indentation */}
          <mesh material={waxRimMaterial} position={[0, 0, 0]}>
            <torusGeometry args={[c.radius * 0.95, c.radius * 0.25, 8, 14]} />
          </mesh>

          {/* Natural Melted Wax Drip on the side */}
          <mesh material={waxRimMaterial} position={[c.radius * 0.88, -c.height * 0.28, 0]}>
            <cylinderGeometry args={[c.radius * 0.15, c.radius * 0.08, c.height * 0.45, 6]} />
          </mesh>
          <mesh material={waxRimMaterial} position={[-c.radius * 0.85, -c.height * 0.18, c.radius * 0.2]}>
            <cylinderGeometry args={[c.radius * 0.12, c.radius * 0.06, c.height * 0.3, 6]} />
          </mesh>

          {/* Charred Black Wick */}
          <mesh material={wickMaterial} position={[0, 0.06, 0]} rotation={[0, 0, 0.08]}>
            <cylinderGeometry args={[0.012, 0.014, 0.12, 6]} />
          </mesh>

          {/* Realistic Multi-Layer Flame */}
          <group
            ref={(el) => {
              flameRefs.current[idx] = el;
            }}
            position={[0, 0.18, 0]}
          >
            {/* Outer Tear-Drop Flame (Amber) */}
            <mesh material={flameOuterMaterial} position={[0, 0.12, 0]}>
              <coneGeometry args={[c.radius * 0.75, 0.32, 10]} />
            </mesh>

            {/* Inner Incandescent Core (White-Yellow) */}
            <mesh material={flameInnerMaterial} position={[0, 0.06, 0]}>
              <coneGeometry args={[c.radius * 0.38, 0.16, 8]} />
            </mesh>

            {/* Blue Flame Root (realistic natural flame physics) */}
            <mesh position={[0, 0.01, 0]}>
              <sphereGeometry args={[c.radius * 0.28, 8, 8]} />
              <meshBasicMaterial color="#38BDF8" transparent opacity={0.65} />
            </mesh>
          </group>
        </group>
      ))}

      {/* Physically-believable warm candlelight point sources illuminating the hall */}
      <pointLight
        ref={pointLight1Ref}
        position={[-6, 4, 1]}
        color="#F59E0B"
        intensity={1.8}
        distance={18}
        decay={2}
      />
      <pointLight
        ref={pointLight2Ref}
        position={[7, 3, -4]}
        color="#F59E0B"
        intensity={1.7}
        distance={18}
        decay={2}
      />
      <pointLight
        ref={pointLight3Ref}
        position={[0, 5, 2]}
        color="#FBBF24"
        intensity={1.9}
        distance={22}
        decay={2}
      />
    </group>
  );
}
