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

  // High metalness gold material for the core sphere
  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#FFE066",
        emissive: "#855A00",
        emissiveIntensity: 0.35,
        metalness: 0.95,
        roughness: 0.15,
      }),
    []
  );

  // Translucent delicate silver/gold wing material
  const wingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#FFF5D1",
        emissive: "#C6A15B",
        emissiveIntensity: 0.25,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
      }),
    []
  );

  // Wing geometry: streamlined feathered shape
  const wingGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.2, 0.4, 0.4, 1.2, 0.2, 2.2);
    shape.bezierCurveTo(0.0, 2.6, -0.4, 1.8, -0.3, 0.8);
    shape.bezierCurveTo(-0.2, 0.3, -0.1, 0.1, 0, 0);
    return new THREE.ShapeGeometry(shape, 12);
  }, []);

  // Trail particle geometry
  const particleCount = 28;
  const trailPositions = useMemo(() => new Float32Array(particleCount * 3), [particleCount]);

  const targetPos = useRef(new THREE.Vector3(2.5, 1.2, 0));
  const currentPos = useRef(new THREE.Vector3(2.5, 1.2, 0));

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    audioManager.playSfx("snitch");
    // Dash away on click!
    targetPos.current.x = (Math.random() - 0.5) * 8;
    targetPos.current.y = (Math.random() - 0.5) * 5 + 1;
    targetPos.current.z = (Math.random() - 0.5) * 4;
  };

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Wing flapping animation (fast high-frequency flutter)
    const flapAngle = Math.sin(time * 38) * 0.75;
    if (leftWingRef.current) {
      leftWingRef.current.rotation.z = -0.3 + flapAngle;
      leftWingRef.current.rotation.y = Math.cos(time * 38) * 0.2;
    }
    if (rightWingRef.current) {
      rightWingRef.current.rotation.z = 0.3 - flapAngle;
      rightWingRef.current.rotation.y = -Math.cos(time * 38) * 0.2;
    }

    // Natural snitch flight path (lissajous curve + mouse attraction)
    if (interactive) {
      const mouseX = (state.pointer.x * 6);
      const mouseY = (state.pointer.y * 3.5);

      const flightX = Math.sin(time * 1.2) * 3.5 + Math.cos(time * 0.7) * 1.5;
      const flightY = Math.cos(time * 1.5) * 1.8 + 1.2;
      const flightZ = Math.sin(time * 0.9) * 2.0;

      // Soft lerp toward blend of autonomous flight and pointer influence
      targetPos.current.x = flightX + mouseX * 0.35;
      targetPos.current.y = flightY + mouseY * 0.35;
      targetPos.current.z = flightZ;

      currentPos.current.lerp(targetPos.current, delta * 3.5);

      if (snitchGroupRef.current) {
        snitchGroupRef.current.position.copy(currentPos.current);
        // Bank into turns
        const deltaX = targetPos.current.x - currentPos.current.x;
        snitchGroupRef.current.rotation.z = -deltaX * 0.4;
        snitchGroupRef.current.rotation.y = time * 0.8;
      }
    }

    // Update trail
    if (trailRef.current && snitchGroupRef.current) {
      const posAttr = trailRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      // Shift older positions backward
      for (let i = particleCount - 1; i > 0; i--) {
        posArray[i * 3] = posArray[(i - 1) * 3];
        posArray[i * 3 + 1] = posArray[(i - 1) * 3 + 1];
        posArray[i * 3 + 2] = posArray[(i - 1) * 3 + 2];
      }
      // Set lead point to snitch position
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
          <sphereGeometry args={[0.32, 32, 32]} />
        </mesh>

        {/* Engraved equatorial ring band */}
        <mesh material={goldMaterial} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.33, 0.02, 16, 32]} />
        </mesh>
        <mesh material={goldMaterial} rotation={[-Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.33, 0.02, 16, 32]} />
        </mesh>

        {/* Left Wing Group */}
        <group ref={leftWingRef} position={[-0.26, 0.15, 0]} rotation={[0, -0.3, -0.4]}>
          <mesh geometry={wingGeometry} material={wingMaterial} scale={[0.55, 0.7, 0.55]} />
          {/* Wing quill / strut */}
          <mesh material={goldMaterial} position={[0, 0.8, 0]}>
            <cylinderGeometry args={[0.012, 0.02, 1.6, 6]} />
          </mesh>
        </group>

        {/* Right Wing Group */}
        <group ref={rightWingRef} position={[0.26, 0.15, 0]} rotation={[0, 0.3, 0.4]}>
          <mesh
            geometry={wingGeometry}
            material={wingMaterial}
            scale={[-0.55, 0.7, 0.55]}
          />
          {/* Wing quill / strut */}
          <mesh material={goldMaterial} position={[0, 0.8, 0]}>
            <cylinderGeometry args={[0.012, 0.02, 1.6, 6]} />
          </mesh>
        </group>

        {/* Point light emitted by the Snitch */}
        <pointLight color="#FFE58F" intensity={2.5} distance={5} decay={2} />
      </group>

      {/* Sparkling particle trail behind the snitch */}
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
          size={0.12}
          color="#FFE066"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}
