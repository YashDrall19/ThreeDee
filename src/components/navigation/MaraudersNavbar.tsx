"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  FileDown,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { CHAPTERS, PROFILE } from "@/data/portfolioData";
import { audioManager } from "@/lib/audioManager";
import confetti from "canvas-confetti";

interface MaraudersNavbarProps {
  activeChapter: number;
  onNavigate: (chapterNumber: number) => void;
  onCastSpell: (spell: string) => void;
  footprintsActive: boolean;
  onToggleFootprints: () => void;
}

export function MaraudersNavbar({
  activeChapter,
  onNavigate,
  onCastSpell,
  footprintsActive,
  onToggleFootprints,
}: MaraudersNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(audioManager.isMuted);
  const [isPlaying, setIsPlaying] = useState(audioManager.isPlaying);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setScrollProgress(totalScroll > 0 ? (current / totalScroll) * 100 : 0);
      setIsScrolled(current > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const unsubscribe = audioManager.subscribe(() => {
      setIsMuted(audioManager.isMuted);
      setIsPlaying(audioManager.isPlaying);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  const handleToggleAudio = () => {
    audioManager.playSfx("sparkle");
    if (!isPlaying) {
      audioManager.startAudio();
    } else {
      audioManager.toggleMute();
    }
  };

  const handleNavClick = (chNum: number) => {
    audioManager.playSfx("parchment");
    onNavigate(chNum);
    setMobileMenuOpen(false);
  };

  const handleMarauderOath = () => {
    audioManager.playSfx("wand");
    onToggleFootprints();
    if (!footprintsActive) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.1 },
        colors: ["#C6A15B", "#98713A", "#D5C39A"],
      });
    }
  };

  const navItems = [
    { num: 1, label: "Awakening", short: "Intro" },
    { num: 2, label: "Secrets", short: "About" },
    { num: 3, label: "Runes", short: "Skills" },
    { num: 4, label: "Trials", short: "Exp" },
    { num: 5, label: "Artifacts", short: "Projects" },
    { num: 6, label: "Pensieve", short: "Arch" },
    { num: 7, label: "Journey", short: "Timeline" },
    { num: 8, label: "Finale", short: "Contact" },
  ];

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2.5px] bg-hogwarts-dark/40 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-hogwarts-bronze via-hogwarts-gold to-hogwarts-goldLight transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Hogwarts Header Navigation */}
      <header
        className={`fixed top-3 left-0 w-full z-40 px-3 sm:px-6 transition-all duration-300 ${
          isScrolled ? "py-1" : "py-2"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2.5 rounded-full parchment-glass border border-hogwarts-gold/30 shadow-magical backdrop-blur-md">
          {/* Brand Seal */}
          <button
            onClick={() => handleNavClick(1)}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-full border border-hogwarts-gold/60 flex items-center justify-center bg-hogwarts-navy/80 group-hover:border-hogwarts-gold group-hover:shadow-magical transition-all">
              <span className="font-decorative text-xs font-bold text-hogwarts-gold">
                YD
              </span>
            </div>
            <div className="hidden sm:block">
              <span className="font-serif text-sm tracking-wider font-bold text-gold-gradient block leading-none">
                YASH DRALL
              </span>
              <span className="text-[10px] tracking-widest text-hogwarts-ivory/80 uppercase block font-medium">
                Chapter {activeChapter} of 8
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeChapter === item.num;
              return (
                <button
                  key={item.num}
                  onClick={() => handleNavClick(item.num)}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-serif tracking-wider uppercase transition-all duration-200 ${
                    isActive
                      ? "text-hogwarts-gold font-bold bg-hogwarts-gold/20 border border-hogwarts-gold/60 shadow-magical"
                      : "text-hogwarts-ivory hover:text-hogwarts-gold hover:bg-hogwarts-gold/10 font-medium"
                  }`}
                >
                  <span className="mr-1 text-[10px] opacity-75">0{item.num}.</span>
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPip"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-hogwarts-gold shadow-magical"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Marauder's Map Easter Egg Oath Button */}
            <button
              onClick={handleMarauderOath}
              title={
                footprintsActive
                  ? "Mischief Managed"
                  : "I solemnly swear that I am up to no good"
              }
              className={`p-2 rounded-full border transition-all text-xs flex items-center gap-1.5 ${
                footprintsActive
                  ? "border-hogwarts-gold bg-hogwarts-gold/20 text-hogwarts-gold shadow-magical"
                  : "border-hogwarts-gold/30 hover:border-hogwarts-gold/70 text-hogwarts-parchment/70 hover:text-hogwarts-gold"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[10px] tracking-widest uppercase font-serif">
                {footprintsActive ? "Mischief Managed" : "Marauder Mode"}
              </span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={handleToggleAudio}
              title={isMuted ? "Unmute Magical Theme" : "Mute Theme"}
              className="p-2 rounded-full border border-hogwarts-gold/30 bg-hogwarts-dark/60 text-hogwarts-gold hover:border-hogwarts-gold hover:shadow-magical transition-all"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              )}
            </button>

            {/* Official Resume Download Button */}
            <a
              href={PROFILE.resumeUrl}
              download="Resume_Yash_Drall.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audioManager.playSfx("wand")}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-hogwarts-gold bg-gradient-to-r from-hogwarts-bronze/40 to-hogwarts-gold/20 text-hogwarts-gold font-serif text-xs tracking-wider uppercase font-semibold hover:shadow-magical transition-all"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => {
                audioManager.playSfx("parchment");
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 lg:hidden rounded-full border border-hogwarts-gold/30 text-hogwarts-gold hover:border-hogwarts-gold"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-3 top-20 z-40 lg:hidden rounded-2xl parchment-glass border border-hogwarts-gold/40 p-5 shadow-magical backdrop-blur-xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-hogwarts-gold/20 mb-3">
              <span className="font-serif text-xs uppercase tracking-widest text-hogwarts-gold">
                The Hogwarts Grimoire
              </span>
              <span className="text-[10px] text-hogwarts-parchment/60 uppercase">
                Select Chapter
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {CHAPTERS.map((ch) => (
                <button
                  key={ch.number}
                  onClick={() => handleNavClick(ch.number)}
                  className={`p-2.5 rounded-xl text-left border transition-all ${
                    activeChapter === ch.number
                      ? "border-hogwarts-gold bg-hogwarts-gold/20 text-hogwarts-gold shadow-magical"
                      : "border-hogwarts-gold/15 bg-hogwarts-dark/40 text-hogwarts-parchment/80 hover:border-hogwarts-gold/40"
                  }`}
                >
                  <span className="text-[10px] text-hogwarts-gold/70 block uppercase font-serif">
                    Ch 0{ch.number}
                  </span>
                  <span className="font-serif text-xs font-bold block truncate">
                    {ch.title}
                  </span>
                  <span className="text-[9px] text-hogwarts-parchment/60 block truncate">
                    {ch.movieTitle}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Spell Buttons */}
            <div className="pt-3 border-t border-hogwarts-gold/20 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  onCastSpell("Lumos");
                  audioManager.playSfx("wand");
                }}
                className="flex-1 py-1.5 px-2 rounded-lg border border-hogwarts-gold/30 text-center text-[10px] font-serif uppercase tracking-wider text-hogwarts-gold hover:bg-hogwarts-gold/15"
              >
                ⚡ Lumos
              </button>
              <button
                onClick={() => {
                  onCastSpell("Patronum");
                  audioManager.playSfx("sparkle");
                }}
                className="flex-1 py-1.5 px-2 rounded-lg border border-hogwarts-cyanGlow/30 text-center text-[10px] font-serif uppercase tracking-wider text-cyan-300 hover:bg-cyan-500/15"
              >
                🦌 Patronum
              </button>
              <a
                href={PROFILE.resumeUrl}
                download="Resume_Yash_Drall.pdf"
                className="flex-1 py-1.5 px-2 rounded-lg border border-hogwarts-gold bg-hogwarts-gold/20 text-center text-[10px] font-serif uppercase tracking-wider text-hogwarts-gold font-bold"
              >
                📜 Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
