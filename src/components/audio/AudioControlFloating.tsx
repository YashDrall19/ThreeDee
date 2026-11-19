"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, Music, Sliders } from "lucide-react";
import { audioManager } from "@/lib/audioManager";

export function AudioControlFloating() {
  const [isPlaying, setIsPlaying] = useState(audioManager.isPlaying);
  const [isMuted, setIsMuted] = useState(audioManager.isMuted);
  const [volume, setVolume] = useState(audioManager.volume);
  const [source, setSource] = useState(audioManager.activeSource);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const unsub = audioManager.subscribe(() => {
      setIsPlaying(audioManager.isPlaying);
      setIsMuted(audioManager.isMuted);
      setVolume(audioManager.volume);
      setSource(audioManager.activeSource);
    });
    return () => unsub();
  }, []);

  const handleTogglePlay = () => {
    audioManager.playSfx("sparkle");
    audioManager.toggle();
  };

  const handleToggleMute = () => {
    audioManager.toggleMute();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    audioManager.setVolume(val);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Slider Controls */}
      {expanded && (
        <div className="mb-3 p-4 rounded-2xl parchment-glass border border-hogwarts-gold/40 shadow-magical w-64 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between mb-3">
            <span className="font-serif text-xs uppercase tracking-widest text-hogwarts-gold font-bold flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5" />
              <span>Orchestral Theme</span>
            </span>
            <span className="text-[10px] font-mono text-hogwarts-parchment/70 uppercase">
              {source === "file" ? "MP3 File" : "Celestial Synth"}
            </span>
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={handleToggleMute}
              className="text-hogwarts-gold hover:text-hogwarts-goldLight"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-hogwarts-gold/30 rounded-lg appearance-none cursor-pointer accent-hogwarts-gold"
            />
          </div>

          <p className="text-[9px] text-hogwarts-parchment/50 font-serif leading-tight">
            Place legal MP3 at <code className="text-hogwarts-gold">/public/audio/background-theme.mp3</code> or enjoy live procedural celestial chimes.
          </p>
        </div>
      )}

      {/* Main Pill Button */}
      <div className="flex items-center gap-2 parchment-glass border border-hogwarts-gold/30 rounded-full p-1.5 shadow-magical backdrop-blur-md">
        {/* Play/Pause */}
        <button
          onClick={handleTogglePlay}
          className="w-8 h-8 rounded-full border border-hogwarts-gold/40 flex items-center justify-center bg-hogwarts-dark/70 text-hogwarts-gold hover:bg-hogwarts-gold/20 hover:border-hogwarts-gold transition-all"
          title={isPlaying ? "Pause Magical Atmosphere" : "Play Magical Atmosphere"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 translate-x-0.5" />}
        </button>

        {/* Animated Sound Equalizer Bars (only if playing and not muted) */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-serif text-hogwarts-gold hover:text-hogwarts-goldLight"
        >
          <div className="flex items-end gap-0.5 h-3.5">
            <span
              className={`w-0.5 bg-hogwarts-gold rounded-full transition-all ${
                isPlaying && !isMuted ? "h-3 animate-pulse" : "h-1"
              }`}
            />
            <span
              className={`w-0.5 bg-hogwarts-gold rounded-full transition-all ${
                isPlaying && !isMuted ? "h-2 animate-bounce" : "h-1"
              }`}
            />
            <span
              className={`w-0.5 bg-hogwarts-gold rounded-full transition-all ${
                isPlaying && !isMuted ? "h-3.5 animate-pulse" : "h-1"
              }`}
            />
          </div>
          <span className="text-[10px] tracking-wider uppercase font-serif hidden sm:inline">
            Sound Design
          </span>
          <Sliders className="w-3 h-3 opacity-60" />
        </button>
      </div>
    </div>
  );
}

