"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BookData {
  pos: [number, number, number];
  baseRot: [number, number, number];
  scale: number;
  speed: number;
  phase: number;
  coverColor: string;
  isOpen: boolean;
}

export function FloatingBooks() {
  const booksGroupRef = useRef<THREE.Group>(null);

  const books: BookData[] = useMemo(() => {
    return [
      {
        pos: [-5.2, 1.8, 1.2],
        baseRot: [0.2, 0.4, -0.15],
        scale: 0.65,
        speed: 0.7,
        phase: 0.5,
        coverColor: "#57242D", // Deep burgundy
        isOpen: true,
      },
      {
        pos: [5.8, 2.4, 0.8],
        baseRot: [-0.15, -0.5, 0.2],
        scale: 0.7,
        speed: 0.6,
        phase: 1.8,
        coverColor: "#111827", // Midnight navy
        isOpen: true,
      },
      {
        pos: [-3.8, -1.2, -1.5],
        baseRot: [0.1, 0.8, 0.1],
        scale: 0.55,
        speed: 0.8,
        phase: 2.9,
        coverColor: "#2A2016", // Antique brown leather
        isOpen: false,
      },
      {
        pos: [4.2, -0.8, -2.2],
        baseRot: [-0.2, -0.3, -0.1],
        scale: 0.6,
        speed: 0.65,
        phase: 4.1,
        coverColor: "#143A27", // Slytherin emerald leather
        isOpen: false,
      },
      {
        pos: [-6.5, 4.2, -3.0],
        baseRot: [0.3, 0.2, 0.25],
        scale: 0.5,
        speed: 0.55,
        phase: 5.2,
        coverColor: "#3D2B52", // Mystical purple leather
        isOpen: true,
      },
      {
        pos: [6.9, 4.6, -2.5],
        baseRot: [-0.25, 0.4, -0.2],
        scale: 0.52,
        speed: 0.75,
        phase: 3.4,
        coverColor: "#57242D",
        isOpen: false,
      },
    ];
  }, []);

  const pageMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#EDE2C8", // Aged parchment
        roughness: 0.75,
        metalness: 0.05,
      }),
    []
  );

  const bookRefs = useRef<(THREE.Group | null)[]>([]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    books.forEach((b, idx) => {
      const g = bookRefs.current[idx];
      if (!g) return;

      // Realistic floating dynamics
      const dy = Math.sin(time * b.speed + b.phase) * 0.18;
      const rotY = b.baseRot[1] + Math.sin(time * 0.4 + b.phase) * 0.12;
      const rotZ = b.baseRot[2] + Math.cos(time * 0.5 + b.phase) * 0.06;

      g.position.set(b.pos[0], b.pos[1] + dy, b.pos[2]);
      g.rotation.set(b.baseRot[0], rotY, rotZ);
    });
  });

  return (
    <group ref={booksGroupRef}>
      {books.map((b, idx) => {
        const coverMat = new THREE.MeshStandardMaterial({
          color: b.coverColor,
          roughness: 0.5,
          metalness: 0.15,
        });

        return (
          <group
            key={`book-${idx}`}
            ref={(el) => {
              bookRefs.current[idx] = el;
            }}
            position={b.pos}
            scale={[b.scale, b.scale, b.scale]}
          >
            {b.isOpen ? (
              // Open Grimoire Model
              <group>
                {/* Left Page Leaf */}
                <mesh
                  material={pageMaterial}
                  position={[-0.45, 0, 0]}
                  rotation={[0, 0, 0.15]}
                >
                  <boxGeometry args={[0.85, 0.08, 1.2]} />
                </mesh>
                {/* Right Page Leaf */}
                <mesh
                  material={pageMaterial}
                  position={[0.45, 0, 0]}
                  rotation={[0, 0, -0.15]}
                >
                  <boxGeometry args={[0.85, 0.08, 1.2]} />
                </mesh>
                {/* Spine & Leather Cover Backing */}
                <mesh material={coverMat} position={[0, -0.06, 0]}>
                  <boxGeometry args={[1.85, 0.03, 1.26]} />
                </mesh>
              </group>
            ) : (
              // Closed Ancient Leather Grimoire
              <group>
                {/* Leather Cover */}
                <mesh material={coverMat} position={[0, 0, 0]}>
                  <boxGeometry args={[0.9, 0.22, 1.26]} />
                </mesh>
                {/* Parchment Pages Edge */}
                <mesh material={pageMaterial} position={[0.04, 0, 0]}>
                  <boxGeometry args={[0.8, 0.18, 1.2]} />
                </mesh>
                {/* Gold Spine Bands */}
                <mesh position={[-0.43, 0.04, 0]}>
                  <boxGeometry args={[0.03, 0.02, 1.22]} />
                  <meshStandardMaterial
                    color="#D6B56D"
                    metalness={0.8}
                    roughness={0.2}
                  />
                </mesh>
              </group>
            )}
          </group>
        );
      })}
    </group>
  );
}

