"use client";

import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { HogwartsCastle } from "./HogwartsCastle";
import { FloatingCandles } from "./FloatingCandles";
import { FloatingBooks } from "./FloatingBooks";
import { GoldenSnitch } from "./GoldenSnitch";
import { MagicalParticles } from "./MagicalParticles";
import { CameraController } from "./CameraController";

interface HogwartsCanvasProps {
  activeChapter: number;
}

export function HogwartsCanvas({ activeChapter }: HogwartsCanvasProps) {
  // Atmospheric volumetric fog matching darker cinematic fantasy movies
  const fogColor = useMemo(() => {
    switch (activeChapter) {
      case 2:
        return "#0B1510"; // Chamber deep emerald-charcoal
      case 3:
        return "#0E1524"; // Azkaban midnight navy
      case 4:
        return "#19120C"; // Goblet deep amber charcoal
      case 5:
        return "#1A0C10"; // Phoenix dark burgundy shadow
      case 6:
        return "#121122"; // Pensieve deep astronomical indigo
      case 7:
        return "#130E1C"; // Deathly Hallows mist
      case 8:
        return "#14110E"; // Dawn storm atmosphere
      default:
        return "#101116"; // Classic cinematic deep charcoal
    }
  }, [activeChapter]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-1 overflow-hidden">
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
          {/* Volumetric Atmospheric Fog */}
          <fog attach="fog" args={[fogColor, 10, 36]} />

          {/* Natural Ambient Starlight & Castle Illumination */}
          <ambientLight intensity={0.5} color="#D1D9E6" />

          {/* Moonlight Directional Key Light */}
          <directionalLight
            position={[12, 16, 9]}
            intensity={1.0}
            color="#E6EFF8"
          />

          {/* Warm Antique Gold Rim Light */}
          <directionalLight
            position={[-9, 7, -6]}
            intensity={0.65}
            color="#D6B56D"
          />

          {/* 3D Elements */}
          <HogwartsCastle activeChapter={activeChapter} />
          <FloatingCandles />
          <FloatingBooks />
          <GoldenSnitch interactive={true} />
          <MagicalParticles activeChapter={activeChapter} />
          <CameraController activeChapter={activeChapter} />
        </Suspense>
      </Canvas>
    </div>
  );
}
