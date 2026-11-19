"use client";

import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { HogwartsCastle } from "./HogwartsCastle";
import { FloatingCandles } from "./FloatingCandles";
import { GoldenSnitch } from "./GoldenSnitch";
import { MagicalParticles } from "./MagicalParticles";
import { CameraController } from "./CameraController";

interface HogwartsCanvasProps {
  activeChapter: number;
}

export function HogwartsCanvas({ activeChapter }: HogwartsCanvasProps) {
  // Atmospheric fog color based on active chapter
  const fogColor = useMemo(() => {
    switch (activeChapter) {
      case 2:
        return "#091512"; // Chamber deep emerald dark
      case 3:
        return "#0A1224"; // Azkaban navy
      case 4:
        return "#170E0A"; // Goblet deep charcoal amber
      case 5:
        return "#1A0A0E"; // Order crimson shadow
      case 6:
        return "#100F24"; // Pensieve celestial indigo
      case 7:
        return "#0F0B18"; // Deathly hallows mist
      case 8:
        return "#120F0C"; // Dawn glow
      default:
        return "#08090D"; // Classic Hogwarts midnight
    }
  }, [activeChapter]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 1.2, 7.5], fov: 52 }}
        dpr={[1, 1.8]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="pointer-events-auto"
      >
        <Suspense fallback={null}>
          {/* Volumetric Fog */}
          <fog attach="fog" args={[fogColor, 12, 38]} />

          {/* Ambient Starlight & Moonlight */}
          <ambientLight intensity={0.4} color="#C4D7ED" />

          {/* Moonlight Directional Key Light */}
          <directionalLight
            position={[10, 15, 8]}
            intensity={0.9}
            color="#E2EEFA"
          />

          {/* Golden Warm Castle Rim Light */}
          <directionalLight
            position={[-8, 6, -5]}
            intensity={0.65}
            color="#C6A15B"
          />

          {/* 3D Elements */}
          <HogwartsCastle activeChapter={activeChapter} />
          <FloatingCandles />
          <GoldenSnitch interactive={true} />
          <MagicalParticles activeChapter={activeChapter} />
          <CameraController activeChapter={activeChapter} />
        </Suspense>
      </Canvas>
    </div>
  );
}
