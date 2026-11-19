"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2, Compass } from "lucide-react";
import { audioManager } from "@/lib/audioManager";
import confetti from "canvas-confetti";

interface HogwartsIntroProps {
  onEnter: () => void;
}

export function HogwartsIntro({ onEnter }: HogwartsIntroProps) {
  const [step, setStep] = useState<number>(0);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    // Cinematic timed reveals
    const timer1 = setTimeout(() => setStep(1), 600);  // Light spark travels
    const timer2 = setTimeout(() => setStep(2), 1600); // "A WIZARD BEHIND THE CODE"
    const timer3 = setTimeout(() => setStep(3), 2600); // "YASH DRALL"
    const timer4 = setTimeout(() => setStep(4), 3600); // Subtitle & Gate button

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleEnter = () => {
    if (isEntering) return;
    setIsEntering(true);
    audioManager.playSfx("portal");
    audioManager.startAudio();

    // Burst golden magical sparks across screen
    confetti({
      particleCount: 85,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#C6A15B", "#FFE066", "#E8D5A3", "#FFFFFF"],
      disableForReducedMotion: true,
    });

    setTimeout(() => {
      onEnter();
    }, 1100);
  };

  const handleSkip = () => {
    audioManager.startAudio();
    onEnter();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-hogwarts-dark text-hogwarts-parchment overflow-hidden px-4"
      >
        {/* Deep magical atmosphere background & radial fog */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-hogwarts-navy/70 via-hogwarts-dark/95 to-black pointer-events-none" />

        {/* Ambient floating dust particles */}
        <div className="absolute inset-0 magical-grain pointer-events-none opacity-40" />

        {/* Skip Intro Button Top-Right */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          onClick={handleSkip}
          className="absolute top-6 right-6 md:top-8 md:right-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full border border-hogwarts-gold/30 bg-hogwarts-dark/80 backdrop-blur-md text-xs font-serif tracking-widest text-hogwarts-gold hover:border-hogwarts-gold hover:shadow-magical transition-all"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>SKIP THE CROSSING</span>
        </motion.button>

        {/* Hogwarts Crest / Seal Sigil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={step >= 1 ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 mb-6"
        >
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-hogwarts-gold/60 flex items-center justify-center bg-hogwarts-navy/60 shadow-magical backdrop-blur-md">
            <span className="font-decorative text-3xl md:text-4xl text-gold-gradient font-bold">
              H
            </span>
            <div className="absolute -inset-1 rounded-full border border-hogwarts-gold/20 animate-spin-slow" />
          </div>
        </motion.div>

        {/* Step 2: "A WIZARD BEHIND THE CODE" */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={step >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="relative z-10 text-xs md:text-sm font-serif uppercase tracking-[0.35em] text-hogwarts-gold/90 mb-3 flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-hogwarts-gold animate-pulse" />
          <span>A Wizard Behind the Code</span>
          <Sparkles className="w-3.5 h-3.5 text-hogwarts-gold animate-pulse" />
        </motion.p>

        {/* Step 3: Name "YASH DRALL" */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
          animate={step >= 3 ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative z-10 font-decorative text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider text-center text-gold-gradient drop-shadow-[0_10px_25px_rgba(198,161,91,0.4)] mb-4"
        >
          YASH DRALL
        </motion.h1>

        {/* Step 4: Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={step >= 4 ? { opacity: 0.95 } : {}}
          transition={{ duration: 0.9 }}
          className="relative z-10 text-sm sm:text-base md:text-lg font-serif text-center text-hogwarts-parchment/90 max-w-xl mb-10 tracking-wide"
        >
          Full Stack Developer & AI Engineer | Building Scalable Web & AI Experiences
        </motion.p>

        {/* Step 4: Enter Gate Button */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={step >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="relative z-10 flex flex-col items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleEnter}
            disabled={isEntering}
            className="group relative flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-4 rounded-full border-2 border-hogwarts-gold bg-gradient-to-r from-hogwarts-navy via-hogwarts-dark to-hogwarts-navy text-hogwarts-gold font-serif text-sm sm:text-base tracking-[0.2em] uppercase font-bold shadow-magical hover:shadow-magical-lg transition-all duration-300"
          >
            <Wand2 className="w-4 h-4 text-hogwarts-gold transition-transform group-hover:rotate-45" />
            <span>Enter the Wizarding World</span>
            <span className="w-2 h-2 rounded-full bg-hogwarts-gold animate-ping" />

            {/* Glowing gold border aura */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-hogwarts-gold/30 via-transparent to-hogwarts-gold/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>

          <p className="mt-4 text-[11px] font-serif tracking-widest text-hogwarts-parchment/50 uppercase">
            Click to unlock the Hogwarts gates & ambient audio
          </p>
        </motion.div>

        {/* Golden Arch / Frame bottom accent */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 text-hogwarts-gold/40 text-xs font-serif tracking-widest">
          <span>ᛟ</span>
          <span>•</span>
          <span>CHAPTERS OF CODE & SORCERY</span>
          <span>•</span>
          <span>ᚱ</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

