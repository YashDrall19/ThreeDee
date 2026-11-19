"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame, Building2, Calendar, MapPin, CheckCircle2, Trophy, Users } from "lucide-react";
import { EXPERIENCES, CHAPTERS } from "@/data/portfolioData";

export function Chapter4GobletOfFire() {
  const chapter = CHAPTERS[3];

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
        className="mb-4 flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/40 bg-hogwarts-dark/70 backdrop-blur-md text-xs font-serif tracking-[0.25em] uppercase text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)]"
      >
        <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Chapter IV • {chapter.movieTitle}</span>
        <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
      </motion.div>

      {/* Chapter Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center font-decorative text-3xl sm:text-5xl md:text-6xl font-black text-fire-gradient tracking-wide mb-3"
      >
        TRIALS OF HONOR & LEADERSHIP
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center font-serif text-sm sm:text-base text-hogwarts-parchment/80 italic max-w-xl mb-12"
      >
        &ldquo;{chapter.quote}&rdquo;
      </motion.p>

      {/* Triwizard Goblet Parchment Scrolls (Experience Cards) */}
      <div className="space-y-10 w-full">
        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: idx * 0.15 }}
            className="parchment-glass rounded-2xl p-6 sm:p-10 border-2 border-amber-500/30 hover:border-amber-500/60 transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.7)] group"
          >
            {/* Header / Company & Title */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-amber-500/20 mb-6 gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-amber-400 mb-1">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Champion Scroll {idx + 1}: {exp.theme}</span>
                </div>
                <h3 className="font-decorative text-2xl sm:text-3xl font-bold text-gold-gradient">
                  {exp.role}
                </h3>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-xs sm:text-sm font-serif text-hogwarts-parchment/90">
                  <span className="flex items-center gap-1.5 font-bold text-amber-300">
                    <Building2 className="w-4 h-4 text-amber-400" />
                    {exp.company}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 text-hogwarts-parchment/70">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {exp.period}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 text-hogwarts-parchment/70">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Enterprise Scale Badge */}
              {idx === 0 && (
                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-amber-950/40 border border-amber-500/40">
                  <Users className="w-5 h-5 text-amber-400" />
                  <div className="text-left">
                    <span className="text-[10px] font-mono uppercase text-amber-300/80 block">
                      Enterprise Impact
                    </span>
                    <span className="text-xs font-serif font-bold text-amber-300 block">
                      200+ Staff • 1,000+ Daily Records
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Role Summary */}
            <p className="font-serif text-sm sm:text-base leading-relaxed text-hogwarts-parchment/90 mb-6 italic">
              {exp.summary}
            </p>

            {/* Responsibilities & Achievements */}
            <div className="mb-6">
              <h4 className="font-serif text-xs uppercase tracking-widest text-amber-400 font-bold mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Trials Conquered & Achievements</span>
              </h4>
              <ul className="space-y-3">
                {exp.achievements.map((item, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-3 text-xs sm:text-sm text-hogwarts-parchment/85 leading-relaxed">
                    <span className="text-amber-400 font-serif mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies Used */}
            <div className="pt-4 border-t border-amber-500/20">
              <span className="text-[11px] font-serif uppercase tracking-wider text-amber-400/80 block mb-2">
                Enchanted Arsenal:
              </span>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs font-mono border border-amber-500/30 bg-amber-950/20 text-amber-200 tracking-wide"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Runic divider at bottom */}
      <div className="mt-16 rune-divider text-amber-400/50 text-sm font-serif">
        <span>ᚱ</span>
        <span>•</span>
        <span>VICTORIOUS BY MERIT</span>
        <span>•</span>
        <span>ᚲ</span>
      </div>
    </section>
  );
}
