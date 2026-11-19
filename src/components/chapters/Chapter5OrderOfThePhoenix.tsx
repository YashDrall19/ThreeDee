"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Eye, ArrowRight } from "lucide-react";
import { PROJECTS, CHAPTERS, Project } from "@/data/portfolioData";
import { audioManager } from "@/lib/audioManager";
import { ProjectModal } from "@/components/ui/ProjectModal";

export function Chapter5OrderOfThePhoenix() {
  const chapter = CHAPTERS[4];
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Full Stack", "AI & LLM", "Enterprise", "Mobile"];

  const filteredProjects =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  const handleOpenProject = (p: Project) => {
    audioManager.playSfx("portal");
    setSelectedProject(p);
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
        className="mb-4 flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/40 bg-hogwarts-dark/70 backdrop-blur-md text-xs font-serif tracking-[0.25em] uppercase text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.25)]"
      >
        <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
        <span>Chapter V • {chapter.movieTitle}</span>
        <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
      </motion.div>

      {/* Chapter Title */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center font-decorative text-3xl sm:text-5xl md:text-6xl font-black text-gold-gradient tracking-wide mb-3"
      >
        THE ROOM OF REQUIREMENT
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center font-serif text-sm sm:text-base text-hogwarts-parchment/80 italic max-w-xl mb-10"
      >
        &ldquo;{chapter.quote}&rdquo;
      </motion.p>

      {/* Filter Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              audioManager.playSfx("sparkle");
              setFilter(cat);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-serif tracking-wider uppercase transition-all ${
              filter === cat
                ? "border border-rose-500 bg-rose-950/60 text-rose-300 font-bold shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                : "border border-hogwarts-gold/20 bg-hogwarts-dark/40 text-hogwarts-parchment/70 hover:border-rose-400/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Artifacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.1 }}
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => handleOpenProject(project)}
            className="parchment-glass rounded-2xl p-6 border border-rose-500/25 hover:border-rose-500/60 transition-all duration-300 shadow-magical flex flex-col justify-between cursor-pointer group"
          >
            <div>
              {/* Relic Symbol & Category */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl text-rose-400 font-serif group-hover:scale-125 transition-transform">
                  {project.runeSymbol}
                </span>
                <span className="text-[10px] font-serif uppercase tracking-widest px-2.5 py-1 rounded-full border border-rose-500/30 bg-rose-950/30 text-rose-300">
                  {project.category}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-decorative text-xl font-bold text-hogwarts-parchment group-hover:text-gold-gradient transition-colors mb-2">
                {project.title}
              </h3>
              <p className="text-xs font-serif text-hogwarts-parchment/70 italic mb-4 line-clamp-2">
                {project.subtitle}
              </p>

              {/* Description Excerpt */}
              <p className="text-xs text-hogwarts-parchment/85 leading-relaxed line-clamp-3 mb-5">
                {project.description}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[10px] font-mono border border-hogwarts-gold/20 bg-hogwarts-dark/60 text-hogwarts-parchment/80"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono text-hogwarts-gold">
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Inspect Relic Button */}
            <div className="pt-4 border-t border-rose-500/20 flex items-center justify-between text-xs font-serif text-rose-300 group-hover:text-rose-200">
              <span className="uppercase tracking-widest text-[11px] font-semibold flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>Examine Artifact</span>
              </span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Modal Dialog */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Runic divider at bottom */}
      <div className="mt-16 rune-divider text-rose-400/50 text-sm font-serif">
        <span>ᚷ</span>
        <span>•</span>
        <span>RELICS OF CREATION</span>
        <span>•</span>
        <span>ᚹ</span>
      </div>
    </section>
  );
}
