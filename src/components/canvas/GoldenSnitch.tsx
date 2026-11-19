"use client";

import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { audioManager } from "@/lib/audioManager";

interface GoldenSnitchProps {
  interactive?: boolean;
}

const TRAIL_LENGTH = 30;
const SPARKLE_COUNT = 18;

export function GoldenSnitch({ interactive = true }: GoldenSnitchProps) {
  const { camera } = useThree();

  const snitchGroupRef = useRef<THREE.Group>(null);
  const leftWingRef = useRef<THREE.Group>(null);
  const rightWingRef = useRef<THREE.Group>(null);
  const trailMeshRef = useRef<THREE.Mesh>(null);
  const sparklesRef = useRef<THREE.Points>(null);

  // Flight vectors
  const currentPos = useRef(new THREE.Vector3(2.0, 1.2, 0.5));
  const targetPos = useRef(new THREE.Vector3(2.0, 1.2, 0.5));
  const prevPos = useRef(new THREE.Vector3(2.0, 1.2, 0.5));
  const velocity = useRef(new THREE.Vector3(0, 0, 0));

  // Historical smoothed positions for the continuous aerodynamic ribbon wake
  const history = useRef<THREE.Vector3[]>(
    Array.from({ length: TRAIL_LENGTH }, () => new THREE.Vector3(2.0, 1.2, 0.5))
  );

  // Sparkle particle states
  const sparkleData = useRef<
    { pos: THREE.Vector3; vel: THREE.Vector3; life: number; maxLife: number; size: number }[]
  >(
    Array.from({ length: SPARKLE_COUNT }, () => ({
      pos: new THREE.Vector3(2.0, 1.2, 0.5),
      vel: new THREE.Vector3(0, 0, 0),
      life: 0,
      maxLife: 1.0,
      size: 0.1,
    }))
  );

  // 1. Realistic PBR 24K Gold Material for the Snitch Sphere & Engravings
  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#F6C844",
        emissive: "#543C00",
        emissiveIntensity: 0.22,
        metalness: 0.96,
        roughness: 0.18,
      }),
    []
  );

  // 2. Translucent Gossamer Wing Material with Delicate Specular Sheen
  const wingMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#FFFDF5",
        emissive: "#E5BA55",
        emissiveIntensity: 0.25,
        metalness: 0.85,
        roughness: 0.22,
        transparent: true,
        opacity: 0.84,
        side: THREE.DoubleSide,
      }),
    []
  );

  // Realistic tapered hummingbird/dragonfly wing geometry
  const wingGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.16, 0.45, 0.32, 1.2, 0.16, 2.1);
    shape.bezierCurveTo(0.0, 2.45, -0.32, 1.75, -0.22, 0.85);
    shape.bezierCurveTo(-0.16, 0.35, -0.06, 0.08, 0, 0);
    return new THREE.ShapeGeometry(shape, 16);
  }, []);

  // 3. Smooth Aerodynamic Ribbon Trail Geometry (Quad Strip)
  const { ribbonGeometry, ribbonMaterial } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertexCount = TRAIL_LENGTH * 2;
    const positions = new Float32Array(vertexCount * 3);
    const colors = new Float32Array(vertexCount * 4); // RGBA
    const indices: number[] = [];

    for (let i = 0; i < TRAIL_LENGTH - 1; i++) {
      const p0 = i * 2;
      const p1 = i * 2 + 1;
      const p2 = (i + 1) * 2;
      const p3 = (i + 1) * 2 + 1;

      // Two triangles per segment
      indices.push(p0, p2, p1);
      indices.push(p1, p2, p3);
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 4));
    geo.setIndex(indices);

    const mat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    return { ribbonGeometry: geo, ribbonMaterial: mat };
  }, []);

  // 4. Sparkling Micro-Embers Geometry & Material
  const { sparklesGeometry, sparklesPositions } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(SPARKLE_COUNT * 3);
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return { sparklesGeometry: geo, sparklesPositions: pos };
  }, []);

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    audioManager.playSfx("snitch");
    // Playful acrobatic dart away on click
    targetPos.current.x = (Math.random() - 0.5) * 8.5;
    targetPos.current.y = (Math.random() - 0.5) * 4.5 + 0.5;
    targetPos.current.z = Math.random() * 1.5 + 0.2;
  };

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const clampedDelta = Math.min(delta, 0.05);

    // 1. High-speed hummingbird wing flutter with harmonic secondary motion
    const flapAngle = Math.sin(time * 50) * 0.72 + Math.cos(time * 25) * 0.12;
    if (leftWingRef.current) {
      leftWingRef.current.rotation.z = -0.32 + flapAngle;
      leftWingRef.current.rotation.y = Math.cos(time * 50) * 0.18;
    }
    if (rightWingRef.current) {
      rightWingRef.current.rotation.z = 0.32 - flapAngle;
      rightWingRef.current.rotation.y = -Math.cos(time * 50) * 0.18;
    }

    // 2. Realistic 3D flight trajectory: swooping across foreground over text & cards
    if (interactive) {
      const mouseX = state.pointer.x * 4.8;
      const mouseY = state.pointer.y * 2.8;

      // Smooth sweeping curved motion traversing screen
      const flightX = Math.sin(time * 0.85) * 3.8 + Math.cos(time * 0.45) * 1.6;
      const flightY = Math.cos(time * 1.1) * 1.8 + Math.sin(time * 0.5) * 0.6;
      // Z depth stays in foreground (+0.2 to +1.6 in front of text plane)
      const flightZ = 0.5 + Math.sin(time * 0.75) * 0.8;

      // Soft evasive bias from mouse cursor
      const distToMouse = Math.hypot(currentPos.current.x - mouseX, currentPos.current.y - mouseY);
      let evasiveX = 0;
      let evasiveY = 0;
      if (distToMouse < 1.6) {
        const angle = Math.atan2(currentPos.current.y - mouseY, currentPos.current.x - mouseX);
        evasiveX = Math.cos(angle) * 1.2;
        evasiveY = Math.sin(angle) * 1.2;
      }

      targetPos.current.x = flightX + evasiveX;
      targetPos.current.y = flightY + evasiveY;
      targetPos.current.z = flightZ;

      // Smooth lerp to target
      prevPos.current.copy(currentPos.current);
      currentPos.current.lerp(targetPos.current, clampedDelta * 3.5);

      // Compute velocity for banking
      velocity.current.subVectors(currentPos.current, prevPos.current).divideScalar(clampedDelta || 0.016);

      if (snitchGroupRef.current) {
        snitchGroupRef.current.position.copy(currentPos.current);

        // Aerodynamic banking: pitch in vertical direction, bank roll into turns
        const targetRoll = -velocity.current.x * 0.12;
        const targetPitch = velocity.current.y * 0.1;
        snitchGroupRef.current.rotation.z = THREE.MathUtils.lerp(
          snitchGroupRef.current.rotation.z,
          targetRoll,
          clampedDelta * 8
        );
        snitchGroupRef.current.rotation.x = THREE.MathUtils.lerp(
          snitchGroupRef.current.rotation.x,
          targetPitch,
          clampedDelta * 8
        );
        snitchGroupRef.current.rotation.y = time * 0.8;
      }
    }

    // 3. Update continuous aerodynamic ribbon wake (NOT a spring)
    // Shift smoothed history points
    const hist = history.current;
    hist[0].copy(currentPos.current);
    for (let i = 1; i < TRAIL_LENGTH; i++) {
      // Exponential smoothing towards predecessor gives sleek aerodynamic stream
      hist[i].lerp(hist[i - 1], clampedDelta * 18);
    }

    // Update ribbon mesh vertices and colors
    if (trailMeshRef.current) {
      const posAttr = ribbonGeometry.attributes.position as THREE.BufferAttribute;
      const colAttr = ribbonGeometry.attributes.color as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;
      const colArr = colAttr.array as Float32Array;

      const camPos = camera.position;

      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const curr = hist[i];
        const next = i < TRAIL_LENGTH - 1 ? hist[i + 1] : hist[i];

        // Tangent direction along wake
        const forward = new THREE.Vector3().subVectors(curr, next);
        if (forward.lengthSq() < 0.0001) forward.set(0, 0, -1);
        forward.normalize();

        // Direction to camera
        const toCam = new THREE.Vector3().subVectors(camPos, curr).normalize();

        // Lateral binormal vector perpendicular to motion and viewing direction
        const lateral = new THREE.Vector3().crossVectors(forward, toCam).normalize();

        // Taper width from 0.09 at head to 0.002 at tail tip
        const t = i / (TRAIL_LENGTH - 1);
        const width = 0.09 * (1 - t * 0.95);

        // Vertices left & right
        const vLeft = new THREE.Vector3().copy(curr).addScaledVector(lateral, width);
        const vRight = new THREE.Vector3().copy(curr).addScaledVector(lateral, -width);

        const idx = i * 6;
        posArr[idx] = vLeft.x;
        posArr[idx + 1] = vLeft.y;
        posArr[idx + 2] = vLeft.z;

        posArr[idx + 3] = vRight.x;
        posArr[idx + 4] = vRight.y;
        posArr[idx + 5] = vRight.z;

        // Alpha decays smoothly with distance (power of 1.7 for realistic vapor dissipation)
        const alpha = Math.pow(1 - t, 1.7) * 0.85;

        // Incandescent golden-white head blending into warm amber gold
        const r = 1.0;
        const g = 0.88 - t * 0.22;
        const b = 0.45 - t * 0.35;

        const cIdx = i * 8;
        colArr[cIdx] = r;
        colArr[cIdx + 1] = g;
        colArr[cIdx + 2] = b;
        colArr[cIdx + 3] = alpha;

        colArr[cIdx + 4] = r;
        colArr[cIdx + 5] = g;
        colArr[cIdx + 6] = b;
        colArr[cIdx + 7] = alpha;
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
    }

    // 4. Update magical sparkling micro-embers (Golden Dust wake)
    const sparks = sparkleData.current;
    for (let i = 0; i < SPARKLE_COUNT; i++) {
      const sp = sparks[i];
      sp.life += clampedDelta;

      if (sp.life >= sp.maxLife) {
        // Respawn near the Snitch's tail
        sp.life = 0;
        sp.maxLife = 0.6 + Math.random() * 0.6;
        sp.pos.copy(currentPos.current);
        // Small random drift backwards away from flight
        sp.vel.set(
          -velocity.current.x * 0.25 + (Math.random() - 0.5) * 0.4,
          -velocity.current.y * 0.25 + (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4
        );
      } else {
        sp.pos.addScaledVector(sp.vel, clampedDelta);
      }

      sparklesPositions[i * 3] = sp.pos.x;
      sparklesPositions[i * 3 + 1] = sp.pos.y;
      sparklesPositions[i * 3 + 2] = sp.pos.z;
    }

    if (sparklesRef.current) {
      const posAttr = sparklesGeometry.attributes.position as THREE.BufferAttribute;
      posAttr.needsUpdate = true;
    }
  });

  return (
    <>
      {/* Golden Snitch 3D Object Group */}
      <group
        ref={snitchGroupRef}
        position={[2.0, 1.2, 0.5]}
        onClick={handleClick}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      >
        {/* Core Mirror-Polished Gold Sphere */}
        <mesh material={goldMaterial}>
          <sphereGeometry args={[0.26, 40, 40]} />
        </mesh>

        {/* Engraved Equatorial Ring Band */}
        <mesh material={goldMaterial} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.264, 0.012, 16, 40]} />
        </mesh>

        {/* Diagonal Celtic / Runic Intersecting Ribs */}
        <mesh material={goldMaterial} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[0.262, 0.009, 14, 40]} />
        </mesh>
        <mesh material={goldMaterial} rotation={[-Math.PI / 4, -Math.PI / 6, 0]}>
          <torusGeometry args={[0.262, 0.009, 14, 40]} />
        </mesh>

        {/* Left Wing Socket & Gossamer Wing */}
        <group ref={leftWingRef} position={[-0.22, 0.1, 0]} rotation={[0, -0.3, -0.35]}>
          {/* Mechanical golden wing root hinge */}
          <mesh material={goldMaterial} position={[0, 0, 0]}>
            <sphereGeometry args={[0.038, 12, 12]} />
          </mesh>
          {/* Feathered Gossamer Wing Shape */}
          <mesh geometry={wingGeometry} material={wingMaterial} scale={[0.42, 0.58, 0.42]} />
          {/* Golden Wing Rachis / Leading Edge Spine */}
          <mesh material={goldMaterial} position={[0, 0.65, 0]}>
            <cylinderGeometry args={[0.008, 0.016, 1.3, 8]} />
          </mesh>
        </group>

        {/* Right Wing Socket & Gossamer Wing */}
        <group ref={rightWingRef} position={[0.22, 0.1, 0]} rotation={[0, 0.3, 0.35]}>
          {/* Mechanical golden wing root hinge */}
          <mesh material={goldMaterial} position={[0, 0, 0]}>
            <sphereGeometry args={[0.038, 12, 12]} />
          </mesh>
          {/* Feathered Gossamer Wing Shape */}
          <mesh geometry={wingGeometry} material={wingMaterial} scale={[-0.42, 0.58, 0.42]} />
          {/* Golden Wing Rachis / Leading Edge Spine */}
          <mesh material={goldMaterial} position={[0, 0.65, 0]}>
            <cylinderGeometry args={[0.008, 0.016, 1.3, 8]} />
          </mesh>
        </group>

        {/* Dynamic Warm Golden Point Light Illuminating Foreground Components */}
        <pointLight color="#FDE68A" intensity={1.6} distance={4.0} decay={2} />
      </group>

      {/* Aerodynamic Smooth Golden Vapor Ribbon (No spring coils) */}
      <mesh ref={trailMeshRef} geometry={ribbonGeometry} material={ribbonMaterial} />

      {/* Magical Micro-Sparkle Particles in Wake */}
      <points ref={sparklesRef} geometry={sparklesGeometry}>
        <pointsMaterial
          size={0.075}
          color="#FDE047"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}
