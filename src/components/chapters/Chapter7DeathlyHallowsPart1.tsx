"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, GraduationCap, Briefcase, Award, Compass } from "lucide-react";
import { TIMELINE_MILESTONES, CHAPTERS } from "@/data/portfolioData";

export function Chapter7DeathlyHallowsPart1() {
  const chapter = CHAPTERS[6];

  const getIcon = (name: string) => {
    switch (name) {
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5" />;
      case "Briefcase":
        return <Briefcase className="w-5 h-5" />;
      case "Award":
        return <Award className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section
      id={chapter.id}
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4 sm:px-6 max-w-5xl mx-auto z-10"
    >
      {/* Chapter Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-4 flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-400/40 bg-hogwarts-dark/70 backdrop-blur-md text-xs font-serif tracking-[0.25em] uppercase text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
      >
        <Compass className="w-3.5 h-3.5 text-purple-300" />
        <span>Chapter VII • {chapter.movieTitle}</span>
        <Compass className="w-3.5 h-3.5 text-purple-300" />
      </motion.div>

      {/* Chapter Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center font-decorative text-3xl sm:text-5xl md:text-6xl font-black text-silver-gradient tracking-wide mb-3"
      >
        THE WANDERING PATH & MILESTONES
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center font-serif text-sm sm:text-base text-hogwarts-parchment/80 italic max-w-xl mb-16"
      >
        &ldquo;{chapter.quote}&rdquo;
      </motion.p>

      {/* Interactive Luminous Timeline */}
      <div className="relative w-full">
        {/* Central Glowing Elder Wand Light Beam */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500/10 via-purple-400/50 to-hogwarts-gold/30 -translate-x-1/2 shadow-[0_0_12px_rgba(168,85,247,0.5)]" />

        <div className="space-y-12">
          {TIMELINE_MILESTONES.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Center Node / Relic Seal */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full border-2 border-purple-400 bg-hogwarts-dark flex items-center justify-center text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.4)] z-20">
                  {getIcon(item.icon)}
                </div>

                {/* Content Card */}
                <div
                  className={`w-full sm:w-[calc(50%-2.5rem)] pl-12 sm:pl-0 ${
                    isEven ? "sm:pr-6" : "sm:pl-6"
                  }`}
                >
                  <div className="parchment-glass rounded-2xl p-6 border border-purple-400/30 hover:border-purple-400/60 transition-all shadow-magical group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-400/30 bg-purple-950/40 font-bold">
                        {item.year}
                      </span>
                      <span className="text-xs font-serif text-hogwarts-gold font-bold">
                        {item.grade}
                      </span>
                    </div>

                    <h3 className="font-decorative text-lg sm:text-xl font-bold text-hogwarts-parchment group-hover:text-gold-gradient transition-colors mb-1">
                      {item.title}
                    </h3>

                    <p className="font-serif text-xs sm:text-sm text-purple-200/90 italic mb-3">
                      {item.institution}
                    </p>

                    <p className="text-xs sm:text-sm text-hogwarts-parchment/85 leading-relaxed font-serif">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Runic divider at bottom */}
      <div className="mt-16 rune-divider text-purple-400/50 text-sm font-serif">
        <span>ᛟ</span>
        <span>•</span>
        <span>FOOTSTEPS IN TIME</span>
        <span>•</span>
        <span>ᚦ</span>
      </div>
    </section>
  );
}
