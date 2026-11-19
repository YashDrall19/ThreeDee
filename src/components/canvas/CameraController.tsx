"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraControllerProps {
  activeChapter: number;
}

export function CameraController({ activeChapter }: CameraControllerProps) {
  const { camera } = useThree();

  // Target camera positions for each chapter
  const chapterWaypoints = useMemo(() => {
    return {
      1: { pos: new THREE.Vector3(0, 1.2, 7.5), look: new THREE.Vector3(0, 0.5, 0) },
      2: { pos: new THREE.Vector3(-2.8, -0.8, 6.2), look: new THREE.Vector3(0, -1.2, -4) },
      3: { pos: new THREE.Vector3(3.5, 2.8, 8.2), look: new THREE.Vector3(0, 1.2, 0) },
      4: { pos: new THREE.Vector3(0.2, 0.9, 5.4), look: new THREE.Vector3(0, 0.6, 0) },
      5: { pos: new THREE.Vector3(-3.8, 1.8, 8.0), look: new THREE.Vector3(0, 0.8, 0) },
      6: { pos: new THREE.Vector3(2.8, 4.6, 9.2), look: new THREE.Vector3(-2, 2.5, -5) },
      7: { pos: new THREE.Vector3(-1.2, 0.4, 6.8), look: new THREE.Vector3(0, 0.5, -2) },
      8: { pos: new THREE.Vector3(0, 2.2, 7.8), look: new THREE.Vector3(0, 1.2, 0) },
    };
  }, []);

  const currentLookAt = useRef(new THREE.Vector3(0, 0.5, 0));

  useFrame((state, delta) => {
    const target = chapterWaypoints[activeChapter as keyof typeof chapterWaypoints] || chapterWaypoints[1];

    // Mouse parallax offset
    const parallaxX = state.pointer.x * 0.45;
    const parallaxY = state.pointer.y * 0.3;

    const targetPosWithParallax = new THREE.Vector3(
      target.pos.x + parallaxX,
      target.pos.y + parallaxY,
      target.pos.z
    );

    // Smooth camera position interpolation
    camera.position.lerp(targetPosWithParallax, delta * 2.2);

    // Smooth lookAt interpolation
    currentLookAt.current.lerp(target.look, delta * 2.5);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

