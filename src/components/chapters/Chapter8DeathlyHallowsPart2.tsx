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
      particleCount: 75,
      spread: 90,
      origin: { y: 0.7 },
      colors: ["#D6B56D", "#F0DFB6", "#F4EBDD", "#A47D45"],
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
        className="mb-4 flex items-center gap-2 px-4 py-1.5 rounded-full border border-hogwarts-gold/50 bg-hogwarts-charcoal/85 backdrop-blur-md text-xs font-serif tracking-[0.25em] uppercase text-hogwarts-gold shadow-magical"
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
        className="text-center font-decorative text-3xl sm:text-5xl md:text-6xl font-black text-gold-gradient tracking-wide mb-3 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
      >
        THE FINAL DESTINATION & THE HORIZON
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.9 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center font-serif text-sm sm:text-base text-hogwarts-parchment italic max-w-xl mb-14 text-cinematic-shadow"
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
          <div className="parchment-glass rounded-2xl p-6 border border-hogwarts-gold/35 hover:border-hogwarts-gold/70 transition-all shadow-magical">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-serif uppercase tracking-widest text-hogwarts-gold font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4 text-hogwarts-gold" />
                <span>Enchanted Dispatch</span>
              </span>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1 text-[11px] font-mono text-hogwarts-ivory hover:text-hogwarts-gold transition-colors font-medium"
                title="Copy Email to Clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-hogwarts-gold" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <a
              href={`mailto:${PROFILE.email}`}
              className="font-serif text-base sm:text-lg font-bold text-hogwarts-ivory hover:text-hogwarts-gold block transition-colors text-cinematic-shadow"
            >
              {PROFILE.email}
            </a>
          </div>

          {/* Card: Phone & Location */}
          <div className="parchment-glass rounded-2xl p-6 border border-hogwarts-gold/35 shadow-magical space-y-4">
            <div>
              <span className="text-xs font-serif uppercase tracking-widest text-hogwarts-gold font-semibold flex items-center gap-2 mb-1">
                <Phone className="w-4 h-4 text-hogwarts-gold" />
                <span>Voice Signal</span>
              </span>
              <span className="font-mono text-sm sm:text-base text-hogwarts-ivory font-semibold block text-cinematic-shadow">
                {PROFILE.phone}
              </span>
            </div>

            <div className="pt-3 border-t border-hogwarts-gold/25">
              <span className="text-xs font-serif uppercase tracking-widest text-hogwarts-gold font-semibold flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-hogwarts-gold" />
                <span>Sanctum Realm</span>
              </span>
              <span className="font-serif text-sm text-hogwarts-ivory font-medium block text-cinematic-shadow">
                {PROFILE.location}
              </span>
              <span className="text-[11px] font-serif text-hogwarts-parchment block mt-0.5 font-medium">
                (Available for Worldwide Remote, Hybrid & High-Impact Engineering)
              </span>
            </div>
          </div>

          {/* Card: Social Links & Official Resume Download */}
          <div className="parchment-glass rounded-2xl p-6 border border-hogwarts-gold/35 shadow-magical space-y-4">
            <span className="text-xs font-serif uppercase tracking-widest text-hogwarts-gold font-bold block">
              Global Portals & Documentation
            </span>
            <div className="flex flex-col gap-2.5">
              <a
                href={PROFILE.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioManager.playSfx("wand")}
                className="flex items-center justify-between p-3 rounded-xl border border-hogwarts-gold/30 hover:border-hogwarts-gold/70 bg-hogwarts-charcoal/70 text-xs font-serif text-hogwarts-ivory hover:text-hogwarts-gold transition-all shadow-card font-medium"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedInIcon className="w-4 h-4 text-hogwarts-gold" />
                  <span>Connect on LinkedIn</span>
                </div>
                <span className="text-[10px] font-mono text-hogwarts-parchment">
                  /in/yashdrall01
                </span>
              </a>

              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioManager.playSfx("wand")}
                className="flex items-center justify-between p-3 rounded-xl border border-hogwarts-gold/30 hover:border-hogwarts-gold/70 bg-hogwarts-charcoal/70 text-xs font-serif text-hogwarts-ivory hover:text-hogwarts-gold transition-all shadow-card font-medium"
              >
                <div className="flex items-center gap-2.5">
                  <GitHubIcon className="w-4 h-4 text-hogwarts-gold" />
                  <span>Explore GitHub Grimoire</span>
                </div>
                <span className="text-[10px] font-mono text-hogwarts-parchment">
                  @yashdrall
                </span>
              </a>

              <a
                href={PROFILE.resumeUrl}
                download="Resume_Yash_Drall.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioManager.playSfx("portal")}
                className="flex items-center justify-between p-3 rounded-xl border-2 border-hogwarts-gold bg-gradient-to-r from-hogwarts-navy via-hogwarts-charcoal to-hogwarts-navy text-xs font-serif font-bold text-hogwarts-gold shadow-magical hover:shadow-magical-lg transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <FileDown className="w-4 h-4 text-hogwarts-gold" />
                  <span>Download Official Resume PDF</span>
                </div>
                <span className="text-[10px] font-mono text-hogwarts-goldLight font-bold">
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
          className="lg:col-span-7 parchment-glass rounded-2xl p-6 sm:p-8 border-2 border-hogwarts-gold/45 shadow-magical-lg"
        >
          <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-hogwarts-gold font-bold mb-2">
            <Send className="w-4 h-4 text-hogwarts-gold" />
            <span>Owl Post • Send an Owl</span>
          </div>

          <h3 className="font-decorative text-xl sm:text-2xl font-bold text-gold-gradient mb-2 text-cinematic-shadow">
            Dispatch an Inscription to Yash
          </h3>
          <p className="font-serif text-xs sm:text-sm text-hogwarts-ivory mb-6 italic text-cinematic-shadow">
            Whether inquiring for full-stack engineering roles, technical collaboration, or visionary systems architecture.
          </p>

          {sentMessage ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-xl border border-emerald-500/50 bg-emerald-950/50 text-center"
            >
              <div className="w-12 h-12 rounded-full border border-emerald-400 bg-emerald-900/50 text-emerald-300 flex items-center justify-center mx-auto mb-3 shadow-emerald">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="font-decorative text-lg font-bold text-emerald-300 mb-1">
                The Owl Has Taken Flight!
              </h4>
              <p className="font-serif text-xs sm:text-sm text-hogwarts-ivory max-w-sm mx-auto font-medium">
                Your message has been delivered to Yash Drall. A prompt reply will arrive through the Floo Network soon.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-hogwarts-gold font-bold mb-1.5">
                  Your Name / Identity
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Albus Dumbledore / Hiring Manager"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-hogwarts-gold/35 bg-hogwarts-charcoal/85 text-hogwarts-ivory placeholder-hogwarts-parchment/40 text-sm font-serif focus:outline-none focus:border-hogwarts-gold focus:shadow-magical transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-hogwarts-gold font-bold mb-1.5">
                  Your Dispatch Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@organization.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-hogwarts-gold/35 bg-hogwarts-charcoal/85 text-hogwarts-ivory placeholder-hogwarts-parchment/40 text-sm font-serif focus:outline-none focus:border-hogwarts-gold focus:shadow-magical transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-serif uppercase tracking-wider text-hogwarts-gold font-bold mb-1.5">
                  Your Scroll / Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share details regarding your team, engineering challenges, or project..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-hogwarts-gold/35 bg-hogwarts-charcoal/85 text-hogwarts-ivory placeholder-hogwarts-parchment/40 text-sm font-serif focus:outline-none focus:border-hogwarts-gold focus:shadow-magical transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full border-2 border-hogwarts-gold bg-gradient-to-r from-hogwarts-navy via-hogwarts-charcoal to-hogwarts-navy text-hogwarts-gold font-serif text-xs uppercase tracking-widest font-bold shadow-magical hover:shadow-magical-lg transition-all"
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
        className="text-center max-w-3xl pt-10 border-t border-hogwarts-gold/35"
      >
        <div className="inline-block mb-3 p-3 rounded-full border border-hogwarts-gold/50 bg-hogwarts-charcoal/90 text-hogwarts-gold shadow-magical">
          <Wand2 className="w-6 h-6 animate-pulse" />
        </div>

        <h3 className="font-decorative text-2xl sm:text-4xl md:text-5xl font-black text-gold-gradient tracking-wider mb-4 drop-shadow-[0_12px_28px_rgba(0,0,0,0.9)]">
          &ldquo;THE MAGIC DOESN&apos;T END HERE. IT&apos;S JUST THE BEGINNING.&rdquo;
        </h3>

        <p className="font-serif text-sm sm:text-base text-hogwarts-ivory leading-relaxed max-w-xl mx-auto mb-8 text-cinematic-shadow">
          Crafting resilient software, scalable architectures, and intelligent digital worlds with dedication and precision.
        </p>

        {/* Footer Credit & Mischief Managed */}
        <div className="flex flex-col items-center gap-2 text-xs font-serif text-hogwarts-parchment">
          <span className="tracking-widest uppercase text-hogwarts-gold font-semibold">
            Mischief Managed • Designed & Engineered by Yash Drall
          </span>
          <span>© {new Date().getFullYear()} Yash Drall. All rights reserved.</span>
        </div>
      </motion.div>
    </section>
  );
}
