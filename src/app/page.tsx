"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { HogwartsIntro } from "@/components/intro/HogwartsIntro";
import { MaraudersNavbar } from "@/components/navigation/MaraudersNavbar";
import { WandCursor } from "@/components/cursor/WandCursor";
import { AudioControlFloating } from "@/components/audio/AudioControlFloating";
import { CHAPTERS } from "@/data/portfolioData";
import { audioManager } from "@/lib/audioManager";
import confetti from "canvas-confetti";

import { Chapter1PhilosophersStone } from "@/components/chapters/Chapter1PhilosophersStone";
import { Chapter2ChamberOfSecrets } from "@/components/chapters/Chapter2ChamberOfSecrets";
import { Chapter3PrisonerOfAzkaban } from "@/components/chapters/Chapter3PrisonerOfAzkaban";
import { Chapter4GobletOfFire } from "@/components/chapters/Chapter4GobletOfFire";
import { Chapter5OrderOfThePhoenix } from "@/components/chapters/Chapter5OrderOfThePhoenix";
import { Chapter6HalfBloodPrince } from "@/components/chapters/Chapter6HalfBloodPrince";
import { Chapter7DeathlyHallowsPart1 } from "@/components/chapters/Chapter7DeathlyHallowsPart1";
import { Chapter8DeathlyHallowsPart2 } from "@/components/chapters/Chapter8DeathlyHallowsPart2";
import { CinematicBackdrop } from "@/components/canvas/CinematicBackdrop";

// Dynamically import 3D Canvas with ssr: false for flawless WebGL mounting
const HogwartsCanvas = dynamic(
  () =>
    import("@/components/canvas/HogwartsCanvas").then((mod) => mod.HogwartsCanvas),
  { ssr: false }
);

const SnitchOverlayCanvas = dynamic(
  () =>
    import("@/components/canvas/SnitchOverlayCanvas").then(
      (mod) => mod.SnitchOverlayCanvas
    ),
  { ssr: false }
);

export default function Home() {
  const [introActive, setIntroActive] = useState<boolean>(true);
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [spellMode, setSpellMode] = useState<string>("Normal");
  const [footprintsActive, setFootprintsActive] = useState<boolean>(false);

  // IntersectionObserver to sync active chapter as user scrolls
  useEffect(() => {
    if (introActive) return;

    const observers: IntersectionObserver[] = [];

    CHAPTERS.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveChapter(ch.number);
            }
          });
        },
        {
          rootMargin: "-25% 0px -40% 0px",
          threshold: 0.1,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [introActive]);

  const handleNavigate = (chapterNumber: number) => {
    const chapter = CHAPTERS.find((c) => c.number === chapterNumber);
    if (!chapter) return;
    const el = document.getElementById(chapter.id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setActiveChapter(chapterNumber);
  };

  const handleCastSpell = (spell: string) => {
    setSpellMode(spell);
    if (spell === "Patronum") {
      audioManager.playSfx("sparkle");
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#38BDF8", "#7DD3FC", "#BAE6FD", "#FFFFFF"],
      });
    } else if (spell === "Lumos") {
      audioManager.playSfx("wand");
    } else if (spell === "Accio") {
      audioManager.playSfx("portal");
    }
  };

  return (
    <main className="relative min-h-screen bg-hogwarts-dark text-hogwarts-parchment overflow-x-hidden wand-cursor">
      {/* Intro Overlay with Smooth Gate Exit Transition */}
      <AnimatePresence mode="wait">
        {introActive && (
          <HogwartsIntro key="hogwarts-intro" onEnter={() => setIntroActive(false)} />
        )}
      </AnimatePresence>

      {/* Cinematic Environmental Image Backdrop */}
      <CinematicBackdrop activeChapter={activeChapter} />

      {/* Interactive 3D WebGL Canvas Layer */}
      <HogwartsCanvas activeChapter={activeChapter} />

      {/* Wand Cursor & Lumos Torch Lighting */}
      <WandCursor spellMode={spellMode} footprintsActive={footprintsActive} />

      {/* Marauder's Map Navbar with Synchronized Entrance */}
      <MaraudersNavbar
        isRevealed={!introActive}
        activeChapter={activeChapter}
        onNavigate={handleNavigate}
        onCastSpell={handleCastSpell}
        footprintsActive={footprintsActive}
        onToggleFootprints={() => setFootprintsActive(!footprintsActive)}
      />

      {/* Floating Sound Design Controller */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={!introActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
      >
        <AudioControlFloating />
      </motion.div>

      {/* Continuous 8 Chapter Chronicles with Coordinated Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 35, filter: "blur(12px)" }}
        animate={!introActive ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="relative z-10 flex flex-col gap-12 sm:gap-20"
      >
        <Chapter1PhilosophersStone
          isRevealed={!introActive}
          onExplore={() => handleNavigate(2)}
        />
        <Chapter2ChamberOfSecrets />
        <Chapter3PrisonerOfAzkaban />
        <Chapter4GobletOfFire />
        <Chapter5OrderOfThePhoenix />
        <Chapter6HalfBloodPrince />
        <Chapter7DeathlyHallowsPart1 />
        <Chapter8DeathlyHallowsPart2 />
      </motion.div>

      {/* Foreground 3D Golden Snitch (Flies on top of cards, components & text) */}
      {!introActive && <SnitchOverlayCanvas />}
    </main>
  );
}
