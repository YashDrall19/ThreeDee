"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Brain, CheckCircle2 } from "lucide-react";
import { TECHNICAL_PILLARS, CHAPTERS } from "@/data/portfolioData";
import { audioManager } from "@/lib/audioManager";

export function Chapter6HalfBloodPrince() {
  const chapter = CHAPTERS[5];
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillar = TECHNICAL_PILLARS[activePillar];

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
        className="mb-4 flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-400/50 bg-hogwarts-charcoal/85 backdrop-blur-md text-xs font-serif tracking-[0.25em] uppercase text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.25)]"
      >
        <Brain className="w-3.5 h-3.5 text-indigo-300" />
        <span>Chapter VI • {chapter.movieTitle}</span>
        <Brain className="w-3.5 h-3.5 text-indigo-300" />
      </motion.div>

      {/* Chapter Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center font-decorative text-3xl sm:text-5xl md:text-6xl font-black text-silver-gradient tracking-wide mb-3 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
      >
        THE PENSIEVE OF ARCHITECTURE
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.9 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center font-serif text-sm sm:text-base text-hogwarts-parchment italic max-w-xl mb-12 text-cinematic-shadow"
      >
        &ldquo;{chapter.quote}&rdquo;
      </motion.p>

      {/* Interactive Pensieve Memory Vials (Pillar Selectors) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-8">
        {TECHNICAL_PILLARS.map((p, idx) => {
          const isSelected = activePillar === idx;
          return (
            <button
              key={p.id}
              onClick={() => {
                audioManager.playSfx("portal");
                setActivePillar(idx);
              }}
              className={`p-5 rounded-2xl text-left border transition-all duration-300 parchment-glass ${
                isSelected
                  ? "border-indigo-400 bg-indigo-950/70 shadow-[0_0_25px_rgba(99,102,241,0.35)] scale-[1.02]"
                  : "border-hogwarts-gold/30 hover:border-indigo-400/60 hover:bg-indigo-950/30"
              }`}
            >
              <div className="text-2xl mb-2">{p.symbol}</div>
              <span className="text-[10px] font-mono uppercase text-indigo-300 tracking-wider block mb-1 font-semibold">
                Memory Vial 0{idx + 1}
              </span>
              <h3 className="font-decorative text-base font-bold text-hogwarts-ivory line-clamp-2 text-cinematic-shadow">
                {p.title}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Active Memory Basin / Deep Dive Showcase */}
      <motion.div
        key={pillar.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full parchment-glass rounded-2xl p-6 sm:p-10 border-2 border-indigo-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-indigo-400/25 mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-indigo-300 font-semibold mb-1">
              <span>Memory Strand Focus: {pillar.subtitle}</span>
            </div>
            <h3 className="font-decorative text-2xl sm:text-3xl font-bold text-indigo-200 text-cinematic-shadow">
              {pillar.title}
            </h3>
          </div>
          <span className="text-4xl">{pillar.symbol}</span>
        </div>

        {/* Narrative Description */}
        <p className="font-serif text-sm sm:text-base leading-relaxed text-hogwarts-ivory mb-8 italic text-cinematic-shadow">
          {pillar.description}
        </p>

        {/* In-Depth Pillars List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillar.details.map((detail, dIdx) => (
            <div
              key={dIdx}
              className="p-4 rounded-xl border border-indigo-400/25 bg-hogwarts-charcoal/80 flex items-start gap-3 shadow-card"
            >
              <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
              <span className="text-xs sm:text-sm text-hogwarts-ivory leading-relaxed font-mono">
                {detail}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Runic divider at bottom */}
      <div className="mt-16 rune-divider text-indigo-400/60 text-sm font-serif">
        <span>ᛞ</span>
        <span>•</span>
        <span>STRANDS OF WISDOM</span>
        <span>•</span>
        <span>ᛚ</span>
      </div>
    </section>
  );
}
