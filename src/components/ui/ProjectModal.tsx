"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Sparkles, Layers, CheckCircle2, ShieldCheck } from "lucide-react";
import { GitHubIcon } from "@/components/ui/Icons";
import { Project } from "@/data/portfolioData";
import { audioManager } from "@/lib/audioManager";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const handleClose = () => {
    audioManager.playSfx("parchment");
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window Styled as Ancient Parchment Relic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 280 }}
          className="relative w-full max-w-3xl rounded-2xl parchment-glass border-2 border-hogwarts-gold/50 p-6 sm:p-8 shadow-magical-lg z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 p-2 rounded-full border border-hogwarts-gold/40 text-hogwarts-gold hover:bg-hogwarts-gold/20 hover:border-hogwarts-gold transition-all"
            aria-label="Close Artifact"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Artifact Header */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl text-hogwarts-gold font-serif">{project.runeSymbol}</span>
            <span className="text-xs font-serif uppercase tracking-[0.25em] text-hogwarts-gold/90 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Magical Relic: {project.artifactName}</span>
            </span>
          </div>

          <h2 className="font-decorative text-2xl sm:text-3xl font-bold text-gold-gradient mb-2">
            {project.title}
          </h2>
          <p className="font-serif text-sm text-hogwarts-parchment/80 mb-6 italic">
            {project.subtitle}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-mono border border-hogwarts-gold/30 bg-hogwarts-navy/50 text-hogwarts-goldLight tracking-wide"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="mb-6 p-4 rounded-xl border border-hogwarts-gold/20 bg-hogwarts-dark/50">
            <h3 className="font-serif text-sm uppercase tracking-wider text-hogwarts-gold font-bold mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-hogwarts-gold" />
              <span>Grimoire Overview</span>
            </h3>
            <p className="text-sm leading-relaxed text-hogwarts-parchment/90">
              {project.description}
            </p>
          </div>

          {/* Key Features */}
          <div className="mb-6">
            <h3 className="font-serif text-sm uppercase tracking-wider text-hogwarts-gold font-bold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-hogwarts-emeraldGlow" />
              <span>Enchanted Capabilities & Features</span>
            </h3>
            <ul className="space-y-2.5">
              {project.keyFeatures.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-hogwarts-parchment/85">
                  <span className="text-hogwarts-gold font-serif mt-0.5">•</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Architectural Pillars */}
          <div className="mb-8">
            <h3 className="font-serif text-sm uppercase tracking-wider text-hogwarts-gold font-bold mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-hogwarts-cyanGlow" />
              <span>Architectural Architecture & Foundations</span>
            </h3>
            <ul className="space-y-2">
              {project.architectureHighlights.map((arch, idx) => (
                <li
                  key={idx}
                  className="p-3 rounded-lg border border-hogwarts-gold/15 bg-hogwarts-navy/30 text-xs sm:text-sm text-hogwarts-parchment/80 font-mono"
                >
                  {arch}
                </li>
              ))}
            </ul>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-hogwarts-gold/20">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioManager.playSfx("portal")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-hogwarts-gold bg-gradient-to-r from-hogwarts-bronze/50 to-hogwarts-gold/30 text-hogwarts-gold font-serif text-xs uppercase tracking-widest font-bold shadow-magical hover:shadow-magical-lg transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Visit Live Realm</span>
              </a>
            )}

            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioManager.playSfx("wand")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-hogwarts-gold/30 text-hogwarts-parchment font-serif text-xs uppercase tracking-widest hover:border-hogwarts-gold hover:text-hogwarts-gold transition-all"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
                <span>Source Incantation</span>
              </a>
            ) : (
              <div className="text-[11px] font-mono text-hogwarts-parchment/50 italic">
                * Production Enterprise System – Codebase protected under NDA Wards
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
