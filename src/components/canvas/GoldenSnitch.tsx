"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { audioManager } from "@/lib/audioManager";

interface GoldenSnitchProps {
  interactive?: boolean;
}

export function GoldenSnitch({ interactive = true }: GoldenSnitchProps) {
  const snitchGroupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Group>(null);
  const rightWingRef = useRef<THREE.Group>(null);
  const trailRef = useRef<THREE.Points>(null);

  // Realistic PBR Gold Material (high metalness, authentic antique golden sheen)
  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#E2BA55",
        emissive: "#543C00",
        emissiveIntensity: 0.15,
        metalness: 0.94,
        roughness: 0.22,
      }),
    []
  );

  // Translucent delicate filigree silver-gold wing material
  const wingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#F4EBDD",
        emissive: "#D6B56D",
        emissiveIntensity: 0.18,
        metalness: 0.82,
        roughness: 0.28,
        transparent: true,
        opacity: 0.78,
        side: THREE.DoubleSide,
      }),
    []
  );

  // Realistic tapered dragonfly/hummingbird wing geometry
  const wingGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.18, 0.5, 0.35, 1.3, 0.18, 2.3);
    shape.bezierCurveTo(0.0, 2.7, -0.35, 1.9, -0.25, 0.9);
    shape.bezierCurveTo(-0.18, 0.4, -0.08, 0.1, 0, 0);
    return new THREE.ShapeGeometry(shape, 14);
  }, []);

  // Trail particle geometry
  const particleCount = 24;
  const trailPositions = useMemo(() => new Float32Array(particleCount * 3), [particleCount]);

  const targetPos = useRef(new THREE.Vector3(2.5, 1.2, 0));
  const currentPos = useRef(new THREE.Vector3(2.5, 1.2, 0));

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    audioManager.playSfx("snitch");
    // Dart away naturally on click
    targetPos.current.x = (Math.random() - 0.5) * 8;
    targetPos.current.y = (Math.random() - 0.5) * 5 + 1;
    targetPos.current.z = (Math.random() - 0.5) * 3.5;
  };

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Realistic high-frequency wing flutter with gentle harmonics
    const flapAngle = Math.sin(time * 38) * 0.72 + Math.cos(time * 19) * 0.1;
    if (leftWingRef.current) {
      leftWingRef.current.rotation.z = -0.3 + flapAngle;
      leftWingRef.current.rotation.y = Math.cos(time * 38) * 0.18;
    }
    if (rightWingRef.current) {
      rightWingRef.current.rotation.z = 0.3 - flapAngle;
      rightWingRef.current.rotation.y = -Math.cos(time * 38) * 0.18;
    }

    if (interactive) {
      const mouseX = state.pointer.x * 5.5;
      const mouseY = state.pointer.y * 3.0;

      // Realistic autonomous orbital flight path + mouse influence
      const flightX = Math.sin(time * 1.1) * 3.2 + Math.cos(time * 0.6) * 1.4;
      const flightY = Math.cos(time * 1.4) * 1.6 + 1.2;
      const flightZ = Math.sin(time * 0.8) * 1.8;

      targetPos.current.x = flightX + mouseX * 0.3;
      targetPos.current.y = flightY + mouseY * 0.3;
      targetPos.current.z = flightZ;

      currentPos.current.lerp(targetPos.current, delta * 3.2);

      if (snitchGroupRef.current) {
        snitchGroupRef.current.position.copy(currentPos.current);
        const deltaX = targetPos.current.x - currentPos.current.x;
        snitchGroupRef.current.rotation.z = -deltaX * 0.35;
        snitchGroupRef.current.rotation.y = time * 0.7;
      }
    }

    // Update trail
    if (trailRef.current && snitchGroupRef.current) {
      const posAttr = trailRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = particleCount - 1; i > 0; i--) {
        posArray[i * 3] = posArray[(i - 1) * 3];
        posArray[i * 3 + 1] = posArray[(i - 1) * 3 + 1];
        posArray[i * 3 + 2] = posArray[(i - 1) * 3 + 2];
      }
      posArray[0] = snitchGroupRef.current.position.x;
      posArray[1] = snitchGroupRef.current.position.y;
      posArray[2] = snitchGroupRef.current.position.z;
      posAttr.needsUpdate = true;
    }
  });

  return (
    <>
      <group
        ref={snitchGroupRef}
        position={[2.5, 1.2, 0]}
        onClick={handleClick}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        {/* Core Golden Sphere */}
        <mesh material={goldMaterial}>
          <sphereGeometry args={[0.3, 32, 32]} />
        </mesh>

        {/* Engraved equatorial ring bands */}
        <mesh material={goldMaterial} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.31, 0.016, 16, 32]} />
        </mesh>
        <mesh material={goldMaterial} rotation={[-Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.31, 0.016, 16, 32]} />
        </mesh>

        {/* Left Wing Group */}
        <group ref={leftWingRef} position={[-0.24, 0.12, 0]} rotation={[0, -0.3, -0.4]}>
          <mesh geometry={wingGeometry} material={wingMaterial} scale={[0.5, 0.65, 0.5]} />
          <mesh material={goldMaterial} position={[0, 0.75, 0]}>
            <cylinderGeometry args={[0.01, 0.018, 1.5, 6]} />
          </mesh>
        </group>

        {/* Right Wing Group */}
        <group ref={rightWingRef} position={[0.24, 0.12, 0]} rotation={[0, 0.3, 0.4]}>
          <mesh
            geometry={wingGeometry}
            material={wingMaterial}
            scale={[-0.5, 0.65, 0.5]}
          />
          <mesh material={goldMaterial} position={[0, 0.75, 0]}>
            <cylinderGeometry args={[0.01, 0.018, 1.5, 6]} />
          </mesh>
        </group>

        {/* Subtle, realistic golden point light */}
        <pointLight color="#FCD34D" intensity={1.8} distance={4} decay={2} />
      </group>

      {/* Sparkling particle trail */}
      <points ref={trailRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={trailPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          color="#FBBF24"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}
