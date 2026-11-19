"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { GoldenSnitch } from "./GoldenSnitch";

export function SnitchOverlayCanvas() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-25 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 50 }}
        dpr={[1, 1.8]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="pointer-events-none"
      >
        <Suspense fallback={null}>
          {/* Key lights for foreground 3D Golden Snitch specular reflections */}
          <ambientLight intensity={0.65} color="#FFF8E7" />
          <directionalLight position={[6, 8, 8]} intensity={1.2} color="#FFF6DD" />
          <directionalLight position={[-6, -4, 4]} intensity={0.5} color="#D6B56D" />

          {/* 3D Golden Snitch flying in foreground on top of text and components */}
          <GoldenSnitch interactive={true} />
        </Suspense>
      </Canvas>
    </div>
  );
}
