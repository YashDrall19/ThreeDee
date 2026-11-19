"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Wand2 } from "lucide-react";
import { SKILL_CATEGORIES, CHAPTERS } from "@/data/portfolioData";
import { audioManager } from "@/lib/audioManager";

export function Chapter3PrisonerOfAzkaban() {
  const chapter = CHAPTERS[2];
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const handleCategorySelect = (index: number) => {
    audioManager.playSfx("sparkle");
    setSelectedCategory(index);
  };

  const activeCat = SKILL_CATEGORIES[selectedCategory];

  return (
    <section
      id={chapter.id}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4 sm:px-6 max-w-6xl mx-auto z-10"
    >
      {/* Chapter Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-4 flex items-center gap-2 px-4 py-1.5 rounded-full border border-hogwarts-cyanGlow/40 bg-hogwarts-dark/70 backdrop-blur-md text-xs font-serif tracking-[0.25em] uppercase text-sky-400 shadow-sapphire"
      >
        <Sparkles className="w-3.5 h-3.5 text-sky-400" />
        <span>Chapter III • {chapter.movieTitle}</span>
        <Sparkles className="w-3.5 h-3.5 text-sky-400" />
      </motion.div>

      {/* Chapter Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center font-decorative text-3xl sm:text-5xl md:text-6xl font-black text-silver-gradient tracking-wide mb-3"
      >
        THE GRIMOIRE OF RUNES & SPELLS
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center font-serif text-sm sm:text-base text-hogwarts-parchment/80 italic max-w-xl mb-10"
      >
        &ldquo;{chapter.quote}&rdquo;
      </motion.p>

      {/* Interactive Category Tabs / Spell Tome Selectors */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 max-w-4xl">
        {SKILL_CATEGORIES.map((cat, idx) => {
          const isSelected = selectedCategory === idx;
          return (
            <button
              key={idx}
              onClick={() => handleCategorySelect(idx)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-serif tracking-wider uppercase transition-all duration-200 ${
                isSelected
                  ? "border-sky-400 bg-sky-950/60 text-sky-300 shadow-sapphire font-bold scale-105"
                  : "border-hogwarts-gold/25 bg-hogwarts-dark/50 text-hogwarts-parchment/70 hover:border-sky-400/50 hover:text-sky-200"
              }`}
            >
              <span>{cat.spellName}</span>
            </button>
          );
        })}
      </div>

      {/* Active Spell Category Showcase Parchment */}
      <motion.div
        key={selectedCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full parchment-glass rounded-2xl p-6 sm:p-10 border border-sky-400/40 shadow-sapphire mb-8"
      >
        {/* Header of Active Grimoire Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-sky-400/20 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-sky-400 mb-1">
              <Wand2 className="w-3.5 h-3.5" />
              <span>Spell Category: {activeCat.spellName}</span>
            </div>
            <h3 className="font-decorative text-2xl sm:text-3xl font-bold text-sky-200">
              {activeCat.title}
            </h3>
          </div>
          <p className="font-serif text-xs sm:text-sm text-hogwarts-parchment/80 max-w-md italic sm:text-right">
            {activeCat.description}
          </p>
        </div>

        {/* Skill Runes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeCat.skills.map((skill, sIdx) => (
            <motion.div
              key={sIdx}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                skill.highlight
                  ? "border-sky-400/40 bg-sky-950/30 shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                  : "border-hogwarts-gold/15 bg-hogwarts-dark/40 hover:border-sky-400/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif text-sm font-bold text-hogwarts-parchment flex items-center gap-2">
                  {skill.highlight && (
                    <Sparkles className="w-3 h-3 text-sky-400 animate-pulse" />
                  )}
                  <span>{skill.name}</span>
                </span>
                <span className="font-mono text-xs text-sky-400">
                  {skill.level}% Mastery
                </span>
              </div>

              {/* Magical Mana / Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-hogwarts-dark/80 overflow-hidden border border-sky-400/20">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8, delay: sIdx * 0.05 }}
                  className="h-full bg-gradient-to-r from-sky-600 via-sky-400 to-cyan-300 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Runic divider at bottom */}
      <div className="mt-16 rune-divider text-sky-400/50 text-sm font-serif">
        <span>ᚦ</span>
        <span>•</span>
        <span>PATRONUS OF CODE</span>
        <span>•</span>
        <span>ᚨ</span>
      </div>
    </section>
  );
}
