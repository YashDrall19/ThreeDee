"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicBackdropProps {
  activeChapter: number;
}

export function CinematicBackdrop({ activeChapter }: CinematicBackdropProps) {
  // Determine optimal background image and mood based on active chapter
  const backdrop = useMemo(() => {
    switch (activeChapter) {
      case 1:
        return {
          image: "/images/backgrounds/hogwarts-mist-castle.jpg",
          alt: "Hogwarts Castle emerging from the mist",
          tint: "from-hogwarts-charcoal/85 via-hogwarts-navy/75 to-hogwarts-charcoal/95",
        };
      case 2:
        return {
          image: "/images/backgrounds/hogwarts-mist-castle.jpg",
          alt: "The Chamber of Secrets subterranean realm",
          tint: "from-emerald-950/70 via-hogwarts-charcoal/90 to-hogwarts-charcoal/95",
        };
      case 3:
        return {
          image: "/images/backgrounds/hogwarts-library-books.jpg",
          alt: "The Hogwarts Library with floating spellbooks",
          tint: "from-sky-950/70 via-hogwarts-charcoal/85 to-hogwarts-charcoal/95",
        };
      case 4:
        return {
          image: "/images/backgrounds/hogwarts-great-hall.jpg",
          alt: "The Hogwarts Great Hall with floating candles",
          tint: "from-amber-950/65 via-hogwarts-charcoal/85 to-hogwarts-charcoal/95",
        };
      case 5:
        return {
          image: "/images/backgrounds/hogwarts-phoenix-fire.jpg",
          alt: "The soaring Phoenix over Hogwarts Castle",
          tint: "from-rose-950/65 via-hogwarts-charcoal/85 to-hogwarts-charcoal/95",
        };
      case 6:
        return {
          image: "/images/backgrounds/hogwarts-library-books.jpg",
          alt: "The Pensieve & Dumbledore's sanctum",
          tint: "from-indigo-950/70 via-hogwarts-charcoal/90 to-hogwarts-charcoal/95",
        };
      case 7:
        return {
          image: "/images/backgrounds/hogwarts-mist-castle.jpg",
          alt: "The misty path and the Elder Wand",
          tint: "from-purple-950/70 via-hogwarts-charcoal/90 to-hogwarts-charcoal/95",
        };
      case 8:
        return {
          image: "/images/backgrounds/hogwarts-lightning-storm.jpg",
          alt: "Hogwarts under lightning and golden runes",
          tint: "from-amber-950/60 via-hogwarts-charcoal/85 to-hogwarts-charcoal/95",
        };
      default:
        return {
          image: "/images/backgrounds/hogwarts-mist-castle.jpg",
          alt: "Hogwarts Castle",
          tint: "from-hogwarts-charcoal/85 via-hogwarts-navy/75 to-hogwarts-charcoal/95",
        };
    }
  }, [activeChapter]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={backdrop.image + activeChapter}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 0.45, scale: 1.0 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Reference Image */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center filter brightness-[0.7] contrast-[1.1] saturate-[0.9]"
            style={{ backgroundImage: `url(${backdrop.image})` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Deep Charcoal & Navy Vignette Overlays for Perfect Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-hogwarts-charcoal/80 via-hogwarts-charcoal/60 to-hogwarts-charcoal/95 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(16,17,22,0.85)_100%)] pointer-events-none" />
      <div className="absolute inset-0 magical-grain pointer-events-none opacity-25" />
    </div>
  );
}
