"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Terminal, Code2, Cpu, ShieldCheck, Key } from "lucide-react";
import { CHAPTERS } from "@/data/portfolioData";
import { audioManager } from "@/lib/audioManager";

export function Chapter2ChamberOfSecrets() {
  const chapter = CHAPTERS[1];
  const [unlockedSecret, setUnlockedSecret] = useState(false);

  const handleUnlock = () => {
    audioManager.playSfx("portal");
    setUnlockedSecret(!unlockedSecret);
  };

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
        className="mb-4 flex items-center gap-2 px-4 py-1.5 rounded-full border border-hogwarts-emeraldGlow/40 bg-hogwarts-dark/70 backdrop-blur-md text-xs font-serif tracking-[0.25em] uppercase text-emerald-400 shadow-emerald"
      >
        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
        <span>Chapter II • {chapter.movieTitle}</span>
        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
      </motion.div>

      {/* Chapter Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center font-decorative text-3xl sm:text-5xl md:text-6xl font-black text-emerald-gradient tracking-wide mb-3"
      >
        DISCOVERING HIDDEN ABILITIES
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

      {/* Main Grid: Parchment Inscriptions & Chamber Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
        {/* Left Column: The Engineer's Inscription */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-7 parchment-glass rounded-2xl p-6 sm:p-8 border border-emerald-500/30 shadow-emerald"
        >
          <div className="flex items-center gap-2 mb-4 text-emerald-400 font-serif text-xs uppercase tracking-widest">
            <Terminal className="w-4 h-4" />
            <span>The Parseltongue of Systems Architecture</span>
          </div>

          <h3 className="font-decorative text-xl sm:text-2xl font-bold text-hogwarts-parchment mb-4">
            Forging Scalable Systems in the Subterranean Depths
          </h3>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-hogwarts-parchment/90 font-serif">
            <p>
              I am a <strong className="text-emerald-300">Full Stack Developer with 3 years of hands-on production experience</strong> designing and deploying mission-critical web applications, enterprise CRMs, and real-time AI solutions.
            </p>
            <p>
              My journey began at the intersection of rigorous analytical thinking and computational engineering during my Biomedical Engineering degree at DCRUST (CGPA: 8.04/10). This foundation honed my ability to dissect complex distributed systems, model robust database schemas, and formulate elegant algorithmic solutions.
            </p>
            <p>
              Today, I architect software that powers real enterprises. From engineering a multimodal CRM platform that handles <strong className="text-emerald-300">1,000+ daily business records</strong> for over <strong className="text-emerald-300">200 active employees</strong>, to integrating local and cloud LLM pipelines (Google Gemini, Ollama, Qwen3-VL, Whisper.cpp), I bridge high-level vision with battle-tested production execution.
            </p>
          </div>

          {/* Interactive Rune Reveal Button */}
          <div className="mt-6 pt-6 border-t border-emerald-500/20 flex items-center justify-between">
            <span className="text-xs font-serif text-emerald-400/80">
              Seek the hidden Chamber Chamber door?
            </span>
            <button
              onClick={handleUnlock}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-emerald-400/50 bg-emerald-950/40 text-emerald-300 text-xs font-serif uppercase tracking-wider hover:bg-emerald-900/60 hover:shadow-emerald transition-all"
            >
              <Key className="w-3.5 h-3.5" />
              <span>{unlockedSecret ? "Seal Chamber" : "Speak Parseltongue"}</span>
            </button>
          </div>
        </motion.div>

        {/* Right Column: Key Vault Chambers */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-5 space-y-4"
        >
          {/* Chamber 1 */}
          <div className="parchment-glass rounded-xl p-5 border border-emerald-500/20 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-emerald-300 uppercase tracking-wider">
                  Full Stack Fluency
                </h4>
                <span className="text-[11px] font-mono text-hogwarts-parchment/60">
                  React • Next.js • Python • Django
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-hogwarts-parchment/80">
              End-to-end expertise spanning responsive, accessible user interfaces to resilient REST APIs, microservices, and high-concurrency database transactions.
            </p>
          </div>

          {/* Chamber 2 */}
          <div className="parchment-glass rounded-xl p-5 border border-emerald-500/20 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-emerald-300 uppercase tracking-wider">
                  AI Integration & Local LLMs
                </h4>
                <span className="text-[11px] font-mono text-hogwarts-parchment/60">
                  Gemini API • Ollama • Whisper • RAG
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-hogwarts-parchment/80">
              Integrating multimodal intelligence into business workflows with async audio transcription, vision processing, prompt engineering, and semantic vector caching.
            </p>
          </div>

          {/* Chamber 3 */}
          <div className="parchment-glass rounded-xl p-5 border border-emerald-500/20 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold text-emerald-300 uppercase tracking-wider">
                  Enterprise Security & Architecture
                </h4>
                <span className="text-[11px] font-mono text-hogwarts-parchment/60">
                  RBAC • JWT • Linux VPS • Nginx
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-hogwarts-parchment/80">
              Production engineering on self-hosted Linux VPS environments with automated Nginx reverse proxy configurations, PM2 process supervision, and robust access controls.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Secret Chamber Inscription Reveal */}
      {unlockedSecret && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-8 w-full parchment-glass rounded-2xl p-6 border-2 border-emerald-400/60 shadow-emerald bg-emerald-950/30"
        >
          <div className="flex items-center gap-2 mb-2 text-emerald-300 font-serif text-xs uppercase tracking-widest">
            <span>🐍 Chamber Inscription Unlocked</span>
          </div>
          <p className="font-mono text-xs sm:text-sm text-emerald-200 leading-relaxed">
            &ldquo;Engineering excellence is not about using complex spells when simple ones suffice; it is about knowing the precise incantation that solves the user&apos;s plight, scales silently under load, and stands resilient when the storm strikes.&rdquo;
          </p>
        </motion.div>
      )}

      {/* Runic divider at bottom */}
      <div className="mt-16 rune-divider text-emerald-400/50 text-sm font-serif">
        <span>ᛋ</span>
        <span>•</span>
        <span>SECRETS OF THE CRAFT</span>
        <span>•</span>
        <span>ᛉ</span>
      </div>
    </section>
  );
}

