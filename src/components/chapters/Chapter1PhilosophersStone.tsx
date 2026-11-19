"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowDown, FileDown, Wand2 } from "lucide-react";
import { PROFILE, CHAPTERS } from "@/data/portfolioData";
import { audioManager } from "@/lib/audioManager";

interface Chapter1Props {
  onExplore: () => void;
  isRevealed?: boolean;
}

// Direction vectors for stat cards in Chapter 1
const STAT_DIRECTIONS = [
  { x: -50, y: -20 }, // Left
  { x: -20, y: -45 }, // Top-Left
  { x: 20, y: -45 },  // Top-Right
  { x: 50, y: -20 },  // Right
];

export function Chapter1PhilosophersStone({ onExplore, isRevealed = true }: Chapter1Props) {
  const chapter = CHAPTERS[0];

  const handleExploreClick = () => {
    audioManager.playSfx("portal");
    onExplore();
  };

  return (
    <section
      id={chapter.id}
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-4 sm:px-6 max-w-6xl mx-auto z-10 overflow-hidden"
    >
      {/* Chapter Badge */}
      <motion.div
        initial={{ opacity: 0, y: -35, filter: "blur(6px)" }}
        animate={isRevealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="mb-4 flex items-center gap-2 px-4 py-1.5 rounded-full border border-hogwarts-gold/50 bg-hogwarts-charcoal/85 backdrop-blur-md text-xs font-serif tracking-[0.25em] uppercase text-hogwarts-gold shadow-magical"
      >
        <Sparkles className="w-3.5 h-3.5 text-hogwarts-gold" />
        <span>Chapter I • {chapter.movieTitle}</span>
        <Sparkles className="w-3.5 h-3.5 text-hogwarts-gold" />
      </motion.div>

      {/* Hero Headline */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9, filter: "blur(14px)" }}
        animate={isRevealed ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="text-center font-decorative text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gold-gradient tracking-wide mb-4 drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)]"
      >
        {PROFILE.name}
      </motion.h1>

      {/* Subtitle / Professional Title */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={isRevealed ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.55, ease: "easeOut" }}
        className="text-center max-w-2xl mb-6"
      >
        <p className="font-serif text-lg sm:text-2xl text-hogwarts-gold font-bold tracking-wider mb-2 text-cinematic-shadow">
          Full Stack Developer & AI Engineer
        </p>
        <p className="text-xs sm:text-sm font-serif uppercase tracking-[0.2em] text-hogwarts-parchment font-medium text-cinematic-shadow">
          Building Scalable Web Applications & Enterprise AI Solutions
        </p>
      </motion.div>

      {/* Summary Parchment Card */}
      <motion.div
        initial={{ opacity: 0, y: 35, filter: "blur(8px)" }}
        animate={isRevealed ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.95, delay: 0.75, ease: "easeOut" }}
        className="parchment-glass rounded-2xl p-6 sm:p-8 max-w-3xl text-center mb-10 border border-hogwarts-gold/35 shadow-magical"
      >
        <p className="font-serif text-sm sm:text-base leading-relaxed text-hogwarts-ivory mb-4 text-cinematic-shadow">
          &ldquo;{PROFILE.summary}&rdquo;
        </p>
        <div className="flex items-center justify-center gap-3 text-xs font-serif text-hogwarts-gold font-medium italic">
          <span>— The Sorting Ceremony of Software Craftsmanship</span>
        </div>
      </motion.div>

      {/* Key Metrics / Pillars from Resume (coming from different directions) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl mb-12">
        {PROFILE.stats.map((stat, idx) => {
          const dir = STAT_DIRECTIONS[idx % STAT_DIRECTIONS.length];

          return (
            <motion.div
              key={idx}
              initial={{
                opacity: 0,
                x: dir.x,
                y: dir.y,
                scale: 0.88,
                filter: "blur(6px)",
              }}
              animate={
                isRevealed
                  ? {
                      opacity: 1,
                      x: 0,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }
                  : {}
              }
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 140,
                delay: 0.9 + idx * 0.1,
              }}
              className="parchment-glass rounded-xl p-4 text-center border border-hogwarts-gold/25 hover:border-hogwarts-gold/60 hover:shadow-magical transition-all group"
            >
              <span className="text-[10px] font-serif text-hogwarts-gold/90 block uppercase tracking-wider mb-1 font-semibold">
                Spell: {stat.spell}
              </span>
              <span className="font-decorative text-2xl sm:text-3xl font-bold text-gold-gradient block group-hover:scale-105 transition-transform">
                {stat.value}
              </span>
              <span className="text-xs font-serif text-hogwarts-ivory font-medium block mt-1 text-cinematic-shadow">
                {stat.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Call to Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isRevealed ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, delay: 1.3, ease: "easeOut" }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <button
          onClick={handleExploreClick}
          className="group flex items-center gap-2.5 px-8 py-3.5 rounded-full border-2 border-hogwarts-gold bg-gradient-to-r from-hogwarts-navy via-hogwarts-charcoal to-hogwarts-navy text-hogwarts-gold font-serif text-sm tracking-widest uppercase font-bold shadow-magical hover:shadow-magical-lg hover:scale-105 transition-all"
        >
          <Wand2 className="w-4 h-4 text-hogwarts-gold transition-transform group-hover:rotate-45" />
          <span>Explore Chronicles</span>
          <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
        </button>

        <a
          href={PROFILE.resumeUrl}
          download="Resume_Yash_Drall.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => audioManager.playSfx("wand")}
          className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-hogwarts-gold/50 bg-hogwarts-charcoal/70 text-hogwarts-ivory font-serif text-sm tracking-widest uppercase hover:border-hogwarts-gold hover:text-hogwarts-gold hover:bg-hogwarts-gold/15 transition-all shadow-card"
        >
          <FileDown className="w-4 h-4 text-hogwarts-gold" />
          <span>Summon Official Resume</span>
        </a>
      </motion.div>

      {/* Runic divider at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isRevealed ? { opacity: 1 } : {}}
        transition={{ duration: 1.0, delay: 1.5 }}
        className="mt-16 rune-divider text-hogwarts-gold/60 text-sm font-serif"
      >
        <span>ᚠ</span>
        <span>•</span>
        <span>THE JOURNEY BEGINS</span>
        <span>•</span>
        <span>ᚢ</span>
      </motion.div>
    </section>
  );
}
