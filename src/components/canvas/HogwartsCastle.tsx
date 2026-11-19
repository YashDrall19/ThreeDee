"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface HogwartsCastleProps {
  activeChapter: number;
}

export function HogwartsCastle({ activeChapter }: HogwartsCastleProps) {
  const castleGroupRef = useRef<THREE.Group>(null);
  const windowMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Materials with gothic stone textures & warm glowing windows
  const stoneMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#161b26",
        roughness: 0.85,
        metalness: 0.2,
      }),
    []
  );

  const roofMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0d131d",
        roughness: 0.6,
        metalness: 0.35,
      }),
    []
  );

  const rockMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0a0d14",
        roughness: 0.95,
        metalness: 0.1,
      }),
    []
  );

  // Dynamic window glow based on active chapter
  const windowGlowColor = useMemo(() => {
    switch (activeChapter) {
      case 2:
        return new THREE.Color("#10B981"); // Chamber of secrets emerald
      case 3:
        return new THREE.Color("#38BDF8"); // Azkaban cyan
      case 4:
        return new THREE.Color("#F59E0B"); // Goblet amber/flame
      case 5:
        return new THREE.Color("#EF4444"); // Order crimson
      case 6:
        return new THREE.Color("#818CF8"); // Half-blood prince violet/indigo
      case 7:
        return new THREE.Color("#A78BFA"); // Deathly hallows silver/purple
      default:
        return new THREE.Color("#F59E0B"); // Warm natural candlelight
    }
  }, [activeChapter]);

  useFrame((state, delta) => {
    if (castleGroupRef.current) {
      // Gentle floating/breathing rock effect
      castleGroupRef.current.position.y = -6 + Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
    if (windowMaterialRef.current) {
      windowMaterialRef.current.emissive.lerp(windowGlowColor, delta * 3);
    }
  });

  return (
    <group ref={castleGroupRef} position={[0, -6, -18]} scale={[1.2, 1.2, 1.2]}>
      {/* Rocky Cliff Base / Island */}
      <mesh position={[0, -2.5, 0]} material={rockMaterial}>
        <cylinderGeometry args={[14, 18, 5, 12]} />
      </mesh>
      <mesh position={[-6, -3, 2]} material={rockMaterial}>
        <cylinderGeometry args={[6, 9, 4, 8]} />
      </mesh>
      <mesh position={[7, -3, -3]} material={rockMaterial}>
        <cylinderGeometry args={[7, 10, 4, 8]} />
      </mesh>

      {/* Main Great Hall */}
      <group position={[0, 2.5, 0]}>
        {/* Hall Base */}
        <mesh position={[0, 0, 0]} material={stoneMaterial}>
          <boxGeometry args={[12, 5, 7]} />
        </mesh>
        {/* Hall High Pitched Roof */}
        <mesh position={[0, 3.8, 0]} rotation={[0, 0, 0]} material={roofMaterial}>
          <coneGeometry args={[7.2, 3, 4]} />
        </mesh>
        {/* Hall Arched Windows (Rows) */}
        {[-4.5, -2.5, -0.5, 1.5, 3.5].map((x, idx) => (
          <group key={`win-${idx}`} position={[x, 0.5, 3.52]}>
            <mesh>
              <planeGeometry args={[1.1, 2.6]} />
              <meshStandardMaterial
                ref={idx === 0 ? windowMaterialRef : undefined}
                color="#F59E0B"
                emissive="#F59E0B"
                emissiveIntensity={1.8}
                roughness={0.2}
              />
            </mesh>
            {/* Window gothic arch cap */}
            <mesh position={[0, 1.3, 0]}>
              <circleGeometry args={[0.55, 16]} />
              <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={1.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Main Central Astronomy Tower (Soaring High Spire) */}
      <group position={[-5, 5, -2]}>
        <mesh position={[0, 2, 0]} material={stoneMaterial}>
          <cylinderGeometry args={[2.5, 3, 10, 16]} />
        </mesh>
        {/* Balcony / Battlements */}
        <mesh position={[0, 7.2, 0]} material={stoneMaterial}>
          <cylinderGeometry args={[3.2, 2.7, 0.8, 16]} />
        </mesh>
        {/* Tower Upper Tier */}
        <mesh position={[0, 9.5, 0]} material={stoneMaterial}>
          <cylinderGeometry args={[1.8, 2.2, 4.5, 16]} />
        </mesh>
        {/* Tall Gothic Conical Roof */}
        <mesh position={[0, 14.2, 0]} material={roofMaterial}>
          <coneGeometry args={[2.3, 5.5, 16]} />
        </mesh>
        {/* Spire Needle */}
        <mesh position={[0, 17.5, 0]} material={roofMaterial}>
          <cylinderGeometry args={[0.08, 0.25, 2, 8]} />
        </mesh>
        {/* Glowing Observation Window */}
        <mesh position={[0, 9.5, 1.85]}>
          <planeGeometry args={[1.2, 2.2]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={2.0} />
        </mesh>
      </group>

      {/* Headmaster / Dumbledore's Tower */}
      <group position={[5.5, 4, -1]}>
        <mesh position={[0, 1.5, 0]} material={stoneMaterial}>
          <cylinderGeometry args={[2.2, 2.6, 9, 16]} />
        </mesh>
        <mesh position={[0, 6.2, 0]} material={stoneMaterial}>
          <cylinderGeometry args={[2.8, 2.3, 0.7, 16]} />
        </mesh>
        <mesh position={[0, 8.2, 0]} material={stoneMaterial}>
          <cylinderGeometry args={[1.6, 2, 3.8, 16]} />
        </mesh>
        <mesh position={[0, 12, 0]} material={roofMaterial}>
          <coneGeometry args={[2, 4.5, 16]} />
        </mesh>
        {/* Windows */}
        <mesh position={[0, 8.2, 1.62]}>
          <planeGeometry args={[0.9, 1.8]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={1.9} />
        </mesh>
      </group>

      {/* Flanking Turrets & Ramparts */}
      <group position={[-8.5, 2, 2]}>
        <mesh position={[0, 0, 0]} material={stoneMaterial}>
          <cylinderGeometry args={[1.4, 1.7, 7, 12]} />
        </mesh>
        <mesh position={[0, 4.8, 0]} material={roofMaterial}>
          <coneGeometry args={[1.7, 3.2, 12]} />
        </mesh>
      </group>

      <group position={[8.5, 2, 2]}>
        <mesh position={[0, 0, 0]} material={stoneMaterial}>
          <cylinderGeometry args={[1.4, 1.7, 7, 12]} />
        </mesh>
        <mesh position={[0, 4.8, 0]} material={roofMaterial}>
          <coneGeometry args={[1.7, 3.2, 12]} />
        </mesh>
      </group>

      {/* Hogwarts Viaduct Bridge & Arches */}
      <group position={[12, -0.5, 3]}>
        {/* Bridge deck */}
        <mesh position={[0, 1.8, 0]} material={stoneMaterial}>
          <boxGeometry args={[10, 0.6, 2.4]} />
        </mesh>
        {/* Pillars / Arches */}
        {[-3.5, 0, 3.5].map((bx, bIdx) => (
          <mesh key={`bridge-col-${bIdx}`} position={[bx, -0.8, 0]} material={stoneMaterial}>
            <boxGeometry args={[1.4, 4.6, 2.2]} />
          </mesh>
        ))}
      </group>

      {/* Courtyard Entrance Wall with Arched Gate */}
      <group position={[0, 0.8, 5]}>
        <mesh position={[-3.5, 0, 0]} material={stoneMaterial}>
          <boxGeometry args={[3, 3, 1]} />
        </mesh>
        <mesh position={[3.5, 0, 0]} material={stoneMaterial}>
          <boxGeometry args={[3, 3, 1]} />
        </mesh>
        <mesh position={[0, 2, 0]} material={stoneMaterial}>
          <boxGeometry args={[4.5, 1, 1]} />
        </mesh>
        {/* Entrance Portal Glow */}
        <mesh position={[0, 0.3, -0.2]}>
          <planeGeometry args={[2.8, 3.2]} />
          <meshStandardMaterial
            color="#C6A15B"
            emissive="#C6A15B"
            emissiveIntensity={2.0}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Surrounding Reflective Black Lake Surface */}
      <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[90, 90]} />
        <meshStandardMaterial
          color="#06090e"
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

