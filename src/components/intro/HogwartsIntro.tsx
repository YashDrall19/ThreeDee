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
    const timer1 = setTimeout(() => setStep(1), 500);  // Spark appears
    const timer2 = setTimeout(() => setStep(2), 1400); // "A WIZARD BEHIND THE CODE"
    const timer3 = setTimeout(() => setStep(3), 2400); // "YASH DRALL"
    const timer4 = setTimeout(() => setStep(4), 3300); // Subtitle & Gate button

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
      colors: ["#D6B56D", "#F4EBDD", "#F0DFB6", "#A47D45"],
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
        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-hogwarts-charcoal text-hogwarts-ivory overflow-hidden px-4"
      >
        {/* Cinematic Atmospheric Castle Background Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-[0.55] contrast-[1.1] scale-105 pointer-events-none transition-transform duration-1000"
          style={{ backgroundImage: "url('/images/backgrounds/hogwarts-mist-castle.jpg')" }}
        />

        {/* Deep Charcoal & Navy Vignette Overlays for Maximum Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-hogwarts-charcoal/85 via-hogwarts-charcoal/70 to-hogwarts-charcoal/95 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(16,17,22,0.85)_100%)] pointer-events-none" />
        <div className="absolute inset-0 magical-grain pointer-events-none opacity-20" />

        {/* Skip Button Top-Right */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          whileHover={{ opacity: 1, scale: 1.04 }}
          onClick={handleSkip}
          className="absolute top-6 right-6 md:top-8 md:right-8 z-20 flex items-center gap-2 px-4 py-2 rounded-full border border-hogwarts-gold/40 bg-hogwarts-charcoal/80 backdrop-blur-md text-xs font-serif tracking-widest text-hogwarts-gold hover:border-hogwarts-gold hover:shadow-magical transition-all"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>SKIP THE CROSSING</span>
        </motion.button>

        {/* Hogwarts Crest Sigil */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -20 }}
          animate={step >= 1 ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative z-10 mb-6"
        >
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-hogwarts-gold/70 flex items-center justify-center bg-hogwarts-navy/85 shadow-magical backdrop-blur-md">
            <span className="font-decorative text-3xl md:text-4xl text-gold-gradient font-bold text-cinematic-shadow">
              H
            </span>
            <div className="absolute -inset-1 rounded-full border border-hogwarts-gold/30 animate-spin-slow" />
          </div>
        </motion.div>

        {/* Step 2: "A WIZARD BEHIND THE CODE" */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={step >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-xs md:text-sm font-serif uppercase tracking-[0.35em] text-hogwarts-gold font-semibold mb-3 flex items-center gap-2 text-cinematic-shadow"
        >
          <Sparkles className="w-3.5 h-3.5 text-hogwarts-gold animate-pulse" />
          <span>A Wizard Behind the Code</span>
          <Sparkles className="w-3.5 h-3.5 text-hogwarts-gold animate-pulse" />
        </motion.p>

        {/* Step 3: Name "YASH DRALL" */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
          animate={step >= 3 ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="relative z-10 font-decorative text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-wider text-center text-gold-gradient drop-shadow-[0_12px_25px_rgba(0,0,0,0.9)] mb-4"
        >
          YASH DRALL
        </motion.h1>

        {/* Step 4: Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={step >= 4 ? { opacity: 0.95 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-sm sm:text-base md:text-lg font-serif text-center text-hogwarts-ivory max-w-xl mb-10 tracking-wide text-cinematic-shadow"
        >
          Full Stack Developer & AI Engineer | Building Scalable Web & AI Experiences
        </motion.p>

        {/* Step 4: Enter Gate Button */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={step >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative z-10 flex flex-col items-center"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleEnter}
            disabled={isEntering}
            className="group relative flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-4 rounded-full border-2 border-hogwarts-gold bg-gradient-to-r from-hogwarts-navy via-hogwarts-charcoal to-hogwarts-navy text-hogwarts-gold font-serif text-sm sm:text-base tracking-[0.2em] uppercase font-bold shadow-magical hover:shadow-magical-lg transition-all duration-300"
          >
            <Wand2 className="w-4 h-4 text-hogwarts-gold transition-transform group-hover:rotate-45" />
            <span>Enter the Wizarding World</span>
            <span className="w-2 h-2 rounded-full bg-hogwarts-gold animate-ping" />

            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-hogwarts-gold/30 via-transparent to-hogwarts-gold/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>

          <p className="mt-4 text-[11px] font-serif tracking-widest text-hogwarts-parchment/70 uppercase text-cinematic-shadow">
            Click to unlock the Hogwarts gates & ambient audio
          </p>
        </motion.div>

        {/* Bottom Seal Accent */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 text-hogwarts-gold/50 text-xs font-serif tracking-widest text-cinematic-shadow">
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
