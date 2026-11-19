"use client";

import React, { useEffect, useState, useRef } from "react";

interface WandCursorProps {
  spellMode: string;
  footprintsActive: boolean;
}

interface Footprint {
  id: number;
  x: number;
  y: number;
  angle: number;
  isRight: boolean;
}

export function WandCursor({ spellMode, footprintsActive }: WandCursorProps) {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [footprints, setFootprints] = useState<Footprint[]>([]);
  const lastStepRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const isRightStepRef = useRef(false);

  useEffect(() => {
    // Detect touch-only screen
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Footprints logic if Marauder's Map is enabled
      if (footprintsActive) {
        const dist = Math.hypot(e.clientX - lastStepRef.current.x, e.clientY - lastStepRef.current.y);
        const now = Date.now();
        if (dist > 45 && now - lastStepRef.current.time > 180) {
          const angle = (Math.atan2(e.clientY - lastStepRef.current.y, e.clientX - lastStepRef.current.x) * 180) / Math.PI + 90;
          const newStep: Footprint = {
            id: now,
            x: e.clientX,
            y: e.clientY,
            angle,
            isRight: !isRightStepRef.current,
          };
          isRightStepRef.current = !isRightStepRef.current;
          lastStepRef.current = { x: e.clientX, y: e.clientY, time: now };

          setFootprints((prev) => [...prev.slice(-14), newStep]);
        }
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [footprintsActive]);

  if (isTouch) return null;

  return (
    <>
      {/* Lumos Ambient Light Torch following cursor */}
      <div
        className="fixed pointer-events-none z-30 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: spellMode === "Lumos" ? "420px" : "240px",
          height: spellMode === "Lumos" ? "420px" : "240px",
          background:
            spellMode === "Patronum"
              ? "radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(56, 189, 248, 0.05) 45%, transparent 70%)"
              : "radial-gradient(circle, rgba(214, 181, 109, 0.20) 0%, rgba(214, 181, 109, 0.05) 40%, transparent 70%)",
        }}
      />

      {/* Wand Tip Sparkle Core */}
      <div
        className={`fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ${
          isClicking ? "scale-150" : "scale-100"
        }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: "10px",
          height: "10px",
          background:
            spellMode === "Patronum"
              ? "#E0F2FE"
              : "#F4EBDD",
          boxShadow:
            spellMode === "Patronum"
              ? "0 0 15px #38BDF8, 0 0 30px #0284C7"
              : "0 0 15px #D6B56D, 0 0 25px #F0DFB6",
        }}
      />

      {/* Marauder's Map Footprints */}
      {footprintsActive &&
        footprints.map((fp) => (
          <div
            key={fp.id}
            className="fixed pointer-events-none z-20 opacity-70 transition-opacity duration-1000 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${fp.x}px`,
              top: `${fp.y}px`,
              transform: `translate(-50%, -50%) rotate(${fp.angle}deg)`,
            }}
          >
            <div className="flex flex-col items-center">
              {/* Footprint sole & heel */}
              <div
                className={`w-2.5 h-4.5 rounded-t-full bg-hogwarts-gold/60 border border-hogwarts-gold/80 shadow-[0_0_8px_rgba(198,161,91,0.6)] ${
                  fp.isRight ? "translate-x-1.5" : "-translate-x-1.5"
                }`}
                style={{ height: "16px" }}
              />
              <div
                className={`w-2 h-2 rounded-full bg-hogwarts-gold/60 mt-0.5 border border-hogwarts-gold/80 ${
                  fp.isRight ? "translate-x-1.5" : "-translate-x-1.5"
                }`}
              />
            </div>
          </div>
        ))}
    </>
  );
}
