"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowDown, FileDown, Wand2 } from "lucide-react";
import { PROFILE, CHAPTERS } from "@/data/portfolioData";
import { audioManager } from "@/lib/audioManager";

interface Chapter1Props {
  onExplore: () => void;
}

export function Chapter1PhilosophersStone({ onExplore }: Chapter1Props) {
  const chapter = CHAPTERS[0];

  const handleExploreClick = () => {
    audioManager.playSfx("portal");
    onExplore();
  };

  return (
    <section
      id={chapter.id}
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-4 sm:px-6 max-w-6xl mx-auto z-10"
    >
      {/* Chapter Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-4 flex items-center gap-2 px-4 py-1.5 rounded-full border border-hogwarts-gold/40 bg-hogwarts-dark/70 backdrop-blur-md text-xs font-serif tracking-[0.25em] uppercase text-hogwarts-gold shadow-magical"
      >
        <Sparkles className="w-3.5 h-3.5 text-hogwarts-gold" />
        <span>Chapter I • {chapter.movieTitle}</span>
        <Sparkles className="w-3.5 h-3.5 text-hogwarts-gold" />
      </motion.div>

      {/* Hero Headline */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, delay: 0.1 }}
        className="text-center font-decorative text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gold-gradient tracking-wide mb-4 drop-shadow-[0_10px_25px_rgba(198,161,91,0.35)]"
      >
        {PROFILE.name}
      </motion.h1>

      {/* Subtitle / Professional Title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="text-center max-w-2xl mb-6"
      >
        <p className="font-serif text-lg sm:text-2xl text-hogwarts-gold font-semibold tracking-wider mb-2">
          Full Stack Developer & AI Engineer
        </p>
        <p className="text-xs sm:text-sm font-serif uppercase tracking-[0.2em] text-hogwarts-parchment/70">
          Building Scalable Web Applications & Enterprise AI Solutions
        </p>
      </motion.div>

      {/* Summary Parchment Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="parchment-glass rounded-2xl p-6 sm:p-8 max-w-3xl text-center mb-10 border border-hogwarts-gold/30 shadow-magical"
      >
        <p className="font-serif text-sm sm:text-base leading-relaxed text-hogwarts-parchment/90 mb-4">
          &ldquo;{PROFILE.summary}&rdquo;
        </p>
        <div className="flex items-center justify-center gap-3 text-xs font-serif text-hogwarts-gold/80 italic">
          <span>— The Sorting Ceremony of Software Craftsmanship</span>
        </div>
      </motion.div>

      {/* Key Metrics / Pillars from Resume */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl mb-12"
      >
        {PROFILE.stats.map((stat, idx) => (
          <div
            key={idx}
            className="parchment-glass rounded-xl p-4 text-center border border-hogwarts-gold/20 hover:border-hogwarts-gold/50 hover:shadow-magical transition-all group"
          >
            <span className="text-[10px] font-serif text-hogwarts-gold/70 block uppercase tracking-wider mb-1">
              Spell: {stat.spell}
            </span>
            <span className="font-decorative text-2xl sm:text-3xl font-bold text-gold-gradient block group-hover:scale-105 transition-transform">
              {stat.value}
            </span>
            <span className="text-xs font-serif text-hogwarts-parchment/80 block mt-1">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Call to Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <button
          onClick={handleExploreClick}
          className="group flex items-center gap-2.5 px-8 py-3.5 rounded-full border-2 border-hogwarts-gold bg-gradient-to-r from-hogwarts-navy via-hogwarts-dark to-hogwarts-navy text-hogwarts-gold font-serif text-sm tracking-widest uppercase font-bold shadow-magical hover:shadow-magical-lg hover:scale-105 transition-all"
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
          className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-hogwarts-gold/40 text-hogwarts-parchment font-serif text-sm tracking-widest uppercase hover:border-hogwarts-gold hover:text-hogwarts-gold hover:bg-hogwarts-gold/10 transition-all"
        >
          <FileDown className="w-4 h-4 text-hogwarts-gold" />
          <span>Summon Official Resume</span>
        </a>
      </motion.div>

      {/* Runic divider at bottom */}
      <div className="mt-16 rune-divider text-hogwarts-gold/50 text-sm font-serif">
        <span>ᚠ</span>
        <span>•</span>
        <span>THE JOURNEY BEGINS</span>
        <span>•</span>
        <span>ᚢ</span>
      </div>
    </section>
  );
}
