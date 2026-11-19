"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CandleData {
  pos: [number, number, number];
  baseY: number;
  speed: number;
  phase: number;
  scale: number;
}

export function FloatingCandles() {
  const count = 38;
  const candleGroupRef = useRef<THREE.Group>(null);
  const flameMeshRef = useRef<THREE.InstancedMesh>(null);
  const bodyMeshRef = useRef<THREE.InstancedMesh>(null);

  // Generate deterministic candle positions hovering in the castle space
  const candles: CandleData[] = useMemo(() => {
    const list: CandleData[] = [];
    const seed = 42;
    let s = seed;
    const random = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };

    for (let i = 0; i < count; i++) {
      const x = (random() - 0.5) * 26;
      const baseY = random() * 8 - 1;
      const z = (random() - 0.5) * 18 - 4;
      const speed = 0.8 + random() * 1.2;
      const phase = random() * Math.PI * 2;
      const scale = 0.75 + random() * 0.45;
      list.push({ pos: [x, baseY, z], baseY, speed, phase, scale });
    }
    return list;
  }, [count]);

  const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
  const tempFlameMatrix = useMemo(() => new THREE.Matrix4(), []);

  // Candle materials
  const waxMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#EDE6D6",
        roughness: 0.6,
        metalness: 0.1,
      }),
    []
  );

  const flameMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#FFA500",
        emissive: "#FF6200",
        emissiveIntensity: 3.5,
        roughness: 0.2,
      }),
    []
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (!bodyMeshRef.current || !flameMeshRef.current) return;

    candles.forEach((c, i) => {
      // Gentle floating bob
      const y = c.baseY + Math.sin(time * c.speed + c.phase) * 0.45;
      
      // Update body
      tempMatrix.makeTranslation(c.pos[0], y, c.pos[2]);
      tempMatrix.scale(new THREE.Vector3(c.scale, c.scale, c.scale));
      bodyMeshRef.current?.setMatrixAt(i, tempMatrix);

      // Update flame on top of the candle with slight flicker jitter
      const flicker = 1 + Math.sin(time * 12 + c.phase) * 0.15;
      tempFlameMatrix.makeTranslation(c.pos[0], y + 0.6 * c.scale, c.pos[2]);
      tempFlameMatrix.scale(new THREE.Vector3(c.scale * flicker, c.scale * flicker * 1.3, c.scale * flicker));
      flameMeshRef.current?.setMatrixAt(i, tempFlameMatrix);
    });

    bodyMeshRef.current.instanceMatrix.needsUpdate = true;
    flameMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={candleGroupRef}>
      {/* Candle wax cylinders */}
      <instancedMesh
        ref={bodyMeshRef}
        args={[undefined, undefined, count]}
        material={waxMaterial}
      >
        <cylinderGeometry args={[0.08, 0.09, 1.0, 10]} />
      </instancedMesh>

      {/* Candle flames (cones with high emissive glow) */}
      <instancedMesh
        ref={flameMeshRef}
        args={[undefined, undefined, count]}
        material={flameMaterial}
      >
        <coneGeometry args={[0.07, 0.24, 8]} />
      </instancedMesh>

      {/* Ambient warm candlelight point lights at key clusters */}
      <pointLight position={[-4, 3, -2]} color="#FFA500" intensity={1.8} distance={12} decay={2} />
      <pointLight position={[5, 4, 1]} color="#FFA500" intensity={1.8} distance={12} decay={2} />
      <pointLight position={[0, 2, -5]} color="#FFA500" intensity={1.6} distance={14} decay={2} />
    </group>
  );
}

