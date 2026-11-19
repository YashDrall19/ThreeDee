"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  FileDown,
  Send,
  Check,
  Copy,
  Wand2,
} from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/ui/Icons";
import { PROFILE, CHAPTERS } from "@/data/portfolioData";
import { audioManager } from "@/lib/audioManager";
import confetti from "canvas-confetti";

export function Chapter8DeathlyHallowsPart2() {
  const chapter = CHAPTERS[7];
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sentMessage, setSentMessage] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    audioManager.playSfx("sparkle");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    audioManager.playSfx("owl");
    setSentMessage(true);

    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.7 },
      colors: ["#C6A15B", "#FFE066", "#D5C39A", "#FFFFFF"],
    });

    setTimeout(() => {
      setSentMessage(false);
      setFormState({ name: "", email: "", message: "" });
    }, 4000);
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
        className="mb-4 flex items-center gap-2 px-4 py-1.5 rounded-full border border-hogwarts-gold/40 bg-hogwarts-dark/70 backdrop-blur-md text-xs font-serif tracking-[0.25em] uppercase text-hogwarts-gold shadow-magical"
      >
        <Sparkles className="w-3.5 h-3.5 text-hogwarts-gold" />
        <span>Chapter VIII • {chapter.movieTitle}</span>
        <Sparkles className="w-3.5 h-3.5 text-hogwarts-gold" />
      </motion.div>

      {/* Chapter Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center font-decorative text-3xl sm:text-5xl md:text-6xl font-black text-gold-gradient tracking-wide mb-3"
      >
        THE FINAL DESTINATION & THE HORIZON
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center font-serif text-sm sm:text-base text-hogwarts-parchment/80 italic max-w-xl mb-14"
      >
        &ldquo;{chapter.quote}&rdquo;
      </motion.p>

      {/* Grid: Contact Parchment & Owl Post Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start mb-16">
        {/* Left Column: Direct Magical Coordinates */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-5 space-y-4"
        >
          {/* Card: Email */}
          <div className="parchment-glass rounded-2xl p-6 border border-hogwarts-gold/30 hover:border-hogwarts-gold/60 transition-all shadow-magical">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-serif uppercase tracking-widest text-hogwarts-gold flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>Enchanted Dispatch</span>
              </span>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1 text-[11px] font-mono text-hogwarts-parchment/70 hover:text-hogwarts-gold transition-colors"
                title="Copy Email to Clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <a
              href={`mailto:${PROFILE.email}`}
              className="font-serif text-base sm:text-lg font-bold text-hogwarts-parchment hover:text-hogwarts-gold block transition-colors"
            >
              {PROFILE.email}
            </a>
          </div>

          {/* Card: Phone & Location */}
          <div className="parchment-glass rounded-2xl p-6 border border-hogwarts-gold/30 shadow-magical space-y-4">
            <div>
              <span className="text-xs font-serif uppercase tracking-widest text-hogwarts-gold flex items-center gap-2 mb-1">
                <Phone className="w-4 h-4" />
                <span>Voice Signal</span>
              </span>
              <span className="font-mono text-sm sm:text-base text-hogwarts-parchment font-semibold block">
                {PROFILE.phone}
              </span>
            </div>

            <div className="pt-3 border-t border-hogwarts-gold/20">
              <span className="text-xs font-serif uppercase tracking-widest text-hogwarts-gold flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4" />
                <span>Sanctum Realm</span>
              </span>
              <span className="font-serif text-sm text-hogwarts-parchment block">
                {PROFILE.location}
              </span>
              <span className="text-[11px] font-serif text-hogwarts-parchment/60 block mt-0.5">
                (Available for Worldwide Remote, Hybrid & High-Impact Engineering)
              </span>
            </div>
          </div>

          {/* Card: Social Links & Official Resume Download */}
          <div className="parchment-glass rounded-2xl p-6 border border-hogwarts-gold/30 shadow-magical space-y-4">
            <span className="text-xs font-serif uppercase tracking-widest text-hogwarts-gold block">
              Global Portals & Documentation
            </span>
            <div className="flex flex-col gap-2.5">
              <a
                href={PROFILE.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioManager.playSfx("wand")}
                className="flex items-center justify-between p-3 rounded-xl border border-hogwarts-gold/20 hover:border-hogwarts-gold/60 bg-hogwarts-dark/40 text-xs font-serif text-hogwarts-parchment hover:text-hogwarts-gold transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedInIcon className="w-4 h-4 text-hogwarts-gold" />
                  <span>Connect on LinkedIn</span>
                </div>
                <span className="text-[10px] font-mono text-hogwarts-parchment/50">
                  /in/yashdrall01
                </span>
              </a>

              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioManager.playSfx("wand")}
                className="flex items-center justify-between p-3 rounded-xl border border-hogwarts-gold/20 hover:border-hogwarts-gold/60 bg-hogwarts-dark/40 text-xs font-serif text-hogwarts-parchment hover:text-hogwarts-gold transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <GitHubIcon className="w-4 h-4 text-hogwarts-gold" />
                  <span>Explore GitHub Grimoire</span>
                </div>
                <span className="text-[10px] font-mono text-hogwarts-parchment/50">
                  @yashdrall
                </span>
              </a>

              <a
                href={PROFILE.resumeUrl}
                download="Resume_Yash_Drall.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioManager.playSfx("portal")}
                className="flex items-center justify-between p-3 rounded-xl border-2 border-hogwarts-gold bg-gradient-to-r from-hogwarts-navy via-hogwarts-dark to-hogwarts-navy text-xs font-serif font-bold text-hogwarts-gold shadow-magical hover:shadow-magical-lg transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <FileDown className="w-4 h-4 text-hogwarts-gold" />
                  <span>Download Official Resume PDF</span>
                </div>
                <span className="text-[10px] font-mono text-hogwarts-gold/70">
                  134 KB
                </span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Owl Post Interactive Dispatch Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-7 parchment-glass rounded-2xl p-6 sm:p-8 border-2 border-hogwarts-gold/40 shadow-magical-lg"
        >
          <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-hogwarts-gold mb-2">
            <Send className="w-4 h-4" />
            <span>Owl Post • Send an Owl</span>
          </div>

          <h3 className="font-decorative text-xl sm:text-2xl font-bold text-gold-gradient mb-2">
            Dispatch an Inscription to Yash
          </h3>
          <p className="font-serif text-xs sm:text-sm text-hogwarts-parchment/80 mb-6 italic">
            Whether inquiring for full-stack engineering roles, technical collaboration, or visionary systems architecture.
          </p>

          {sentMessage ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-xl border border-emerald-500/40 bg-emerald-950/30 text-center"
            >
              <div className="w-12 h-12 rounded-full border border-emerald-400 bg-emerald-900/40 text-emerald-300 flex items-center justify-center mx-auto mb-3 shadow-emerald">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-decorative text-lg font-bold text-emerald-300 mb-1">
                The Owl Has Taken Flight!
              </h4>
              <p className="font-serif text-xs text-hogwarts-parchment/80 max-w-sm mx-auto">
                Your message has been delivered to Yash Drall. A prompt reply will arrive through the Floo Network soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-hogwarts-gold mb-1.5">
                  Your Name / Identity
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Albus Dumbledore / Hiring Manager"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-hogwarts-gold/30 bg-hogwarts-dark/70 text-hogwarts-parchment placeholder-hogwarts-parchment/30 text-sm font-serif focus:outline-none focus:border-hogwarts-gold focus:shadow-magical transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-hogwarts-gold mb-1.5">
                  Your Dispatch Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@organization.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-hogwarts-gold/30 bg-hogwarts-dark/70 text-hogwarts-parchment placeholder-hogwarts-parchment/30 text-sm font-serif focus:outline-none focus:border-hogwarts-gold focus:shadow-magical transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-hogwarts-gold mb-1.5">
                  Your Scroll / Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details regarding your team, engineering challenges, or project..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-hogwarts-gold/30 bg-hogwarts-dark/70 text-hogwarts-parchment placeholder-hogwarts-parchment/30 text-sm font-serif focus:outline-none focus:border-hogwarts-gold focus:shadow-magical transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full border-2 border-hogwarts-gold bg-gradient-to-r from-hogwarts-navy via-hogwarts-dark to-hogwarts-navy text-hogwarts-gold font-serif text-xs uppercase tracking-widest font-bold shadow-magical hover:shadow-magical-lg transition-all"
              >
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                <span>Send Owl Post</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>

      {/* Grand Finale Statement */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0 }}
        className="text-center max-w-3xl pt-10 border-t border-hogwarts-gold/30"
      >
        <div className="inline-block mb-3 p-3 rounded-full border border-hogwarts-gold/40 bg-hogwarts-dark/80 text-hogwarts-gold shadow-magical">
          <Wand2 className="w-6 h-6 animate-pulse" />
        </div>

        <h3 className="font-decorative text-2xl sm:text-4xl md:text-5xl font-black text-gold-gradient tracking-wider mb-4">
          &ldquo;THE MAGIC DOESN&apos;T END HERE. IT&apos;S JUST THE BEGINNING.&rdquo;
        </h3>

        <p className="font-serif text-sm sm:text-base text-hogwarts-parchment/80 leading-relaxed max-w-xl mx-auto mb-8">
          Crafting resilient software, scalable architectures, and intelligent digital worlds with dedication and precision.
        </p>

        {/* Footer Credit & Mischief Managed */}
        <div className="flex flex-col items-center gap-2 text-xs font-serif text-hogwarts-parchment/50">
          <span className="tracking-widest uppercase text-hogwarts-gold/70">
            Mischief Managed • Designed & Engineered by Yash Drall
          </span>
          <span>© {new Date().getFullYear()} Yash Drall. All rights reserved.</span>
        </div>
      </motion.div>
    </section>
  );
}
