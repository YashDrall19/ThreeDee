// Audio Manager for Yash Drall's Harry Potter Portfolio
// Supports custom audio file at /audio/background-theme.mp3
// Seamlessly falls back to procedural celestial Web Audio API synth if file is absent

class AudioManager {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private audioElement: HTMLAudioElement | null = null;
  
  // Synth sequencer state
  private isSynthPlaying = false;
  private synthTimeoutId: number | null = null;
  private melodyIndex = 0;
  
  // Ambient drone state
  private droneOscillators: OscillatorNode[] = [];
  private droneGain: GainNode | null = null;

  // Public state
  public isPlaying = false;
  public isMuted = false;
  public volume = 0.55;
  public activeSource: "file" | "synth" | "none" = "none";
  private listeners: Set<() => void> = new Set();

  constructor() {
    if (typeof window !== "undefined") {
      const savedMute = localStorage.getItem("hp_audio_muted");
      if (savedMute !== null) {
        this.isMuted = savedMute === "true";
      }
      const savedVol = localStorage.getItem("hp_audio_volume");
      if (savedVol !== null) {
        this.volume = parseFloat(savedVol) || 0.55;
      }
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
        this.musicGain.connect(this.masterGain);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
        this.sfxGain.connect(this.masterGain);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public async startAudio(): Promise<boolean> {
    const ctx = this.getAudioContext();
    if (!ctx) return false;

    if (this.isPlaying) return true;

    // Try playing local file /audio/background-theme.mp3 first
    try {
      const canPlayFile = await this.tryPlayAudioFile();
      if (canPlayFile) {
        this.isPlaying = true;
        this.activeSource = "file";
        this.notify();
        return true;
      }
    } catch {
      // Audio file not present or failed, fall back to procedural synth
    }

    // Fallback: Start enchanting celestial Web Audio synth
    this.startProceduralSynth();
    this.isPlaying = true;
    this.activeSource = "synth";
    this.notify();
    return true;
  }

  private async tryPlayAudioFile(): Promise<boolean> {
    try {
      // Check if file exists without triggering browser media 404 console error
      const response = await fetch("/audio/background-theme.mp3", { method: "HEAD" });
      if (!response.ok) return false;
    } catch {
      return false;
    }

    return new Promise((resolve) => {
      const audio = new Audio("/audio/background-theme.mp3");
      audio.loop = true;
      audio.volume = this.isMuted ? 0 : this.volume;

      const onCanPlay = () => {
        audio
          .play()
          .then(() => {
            this.audioElement = audio;
            resolve(true);
          })
          .catch(() => {
            resolve(false);
          });
      };

      const onError = () => {
        resolve(false);
      };

      audio.addEventListener("canplaythrough", onCanPlay, { once: true });
      audio.addEventListener("error", onError, { once: true });
      audio.load();

      // Timeout check after 1.5s
      setTimeout(() => {
        if (!this.audioElement) {
          audio.removeEventListener("canplaythrough", onCanPlay);
          audio.removeEventListener("error", onError);
          resolve(false);
        }
      }, 1500);
    });
  }

  // Procedural Harry Potter-inspired celestial synth (Hedwig-style mysterious 3/4 celesta & drone)
  private startProceduralSynth() {
    const ctx = this.getAudioContext();
    if (!ctx || this.isSynthPlaying) return;

    this.isSynthPlaying = true;
    this.startAmbientDrone();
    this.playNextCelestaArpeggio();
  }

  private startAmbientDrone() {
    const ctx = this.getAudioContext();
    if (!ctx || !this.musicGain) return;

    this.stopAmbientDrone();

    this.droneGain = ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.001, ctx.currentTime);
    this.droneGain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 3.0);
    this.droneGain.connect(this.musicGain);

    // E minor chord drone (E2, B2, E3, G3)
    const freqs = [82.41, 123.47, 164.81, 196.0];
    freqs.forEach((freq) => {
      if (!ctx || !this.droneGain) return;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      osc.connect(filter);
      filter.connect(this.droneGain);
      osc.start();
      this.droneOscillators.push(osc);
    });
  }

  private stopAmbientDrone() {
    this.droneOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Ignored
      }
    });
    this.droneOscillators = [];
    if (this.droneGain) {
      this.droneGain.disconnect();
      this.droneGain = null;
    }
  }

  // Hedwig-inspired celestial 3/4 waltz notes: B4, E5, G5, F#5, E5, B5, A5, F#5
  private readonly HEDWIG_MELODY: { note: number; dur: number; pause: number }[] = [
    { note: 493.88, dur: 0.65, pause: 600 }, // B4
    { note: 659.25, dur: 0.9, pause: 900 },  // E5
    { note: 783.99, dur: 0.45, pause: 450 }, // G5
    { note: 739.99, dur: 0.45, pause: 450 }, // F#5
    { note: 659.25, dur: 0.9, pause: 900 },  // E5
    { note: 987.77, dur: 0.8, pause: 800 },  // B5
    { note: 880.0, dur: 1.2, pause: 1200 },  // A5
    { note: 739.99, dur: 1.2, pause: 1400 }, // F#5
    // Phrase 2
    { note: 659.25, dur: 0.85, pause: 850 }, // E5
    { note: 783.99, dur: 0.45, pause: 450 }, // G5
    { note: 739.99, dur: 0.45, pause: 450 }, // F#5
    { note: 622.25, dur: 0.9, pause: 900 },  // D#5
    { note: 698.46, dur: 0.8, pause: 800 },  // F5
    { note: 493.88, dur: 1.4, pause: 1800 }, // B4
    // Interlude chimes
    { note: 587.33, dur: 0.5, pause: 500 },  // D5
    { note: 659.25, dur: 0.5, pause: 500 },  // E5
    { note: 783.99, dur: 0.8, pause: 800 },  // G5
    { note: 880.0, dur: 0.8, pause: 900 },   // A5
    { note: 987.77, dur: 1.4, pause: 2000 }, // B5
  ];

  private playNextCelestaArpeggio = () => {
    if (!this.isSynthPlaying) return;

    const current = this.HEDWIG_MELODY[this.melodyIndex % this.HEDWIG_MELODY.length];
    this.playCelestaNote(current.note, current.dur);

    this.melodyIndex++;
    this.synthTimeoutId = window.setTimeout(this.playNextCelestaArpeggio, current.pause);
  };

  private playCelestaNote(freq: number, duration: number) {
    const ctx = this.getAudioContext();
    if (!ctx || !this.musicGain || this.isMuted) return;

    const now = ctx.currentTime;
    
    // Celesta has pure fundamental sine + distinct metallic 3rd and 5th partials
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = "sine";
    // Harmonic bell partial
    osc2.frequency.setValueAtTime(freq * 2.756, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.24, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 1.2);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.musicGain);

    osc1.start(now);
    osc2.start(now);

    osc1.stop(now + duration + 1.3);
    osc2.stop(now + duration + 1.3);
  }

  public pause() {
    if (!this.isPlaying) return;

    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.isSynthPlaying) {
      this.isSynthPlaying = false;
      if (this.synthTimeoutId) {
        clearTimeout(this.synthTimeoutId);
        this.synthTimeoutId = null;
      }
      this.stopAmbientDrone();
    }
    this.isPlaying = false;
    this.notify();
  }

  public resume() {
    if (this.isPlaying) return;
    this.startAudio();
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.resume();
    }
  }

  public setMute(mute: boolean) {
    this.isMuted = mute;
    if (typeof window !== "undefined") {
      localStorage.setItem("hp_audio_muted", String(mute));
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(mute ? 0 : this.volume, this.ctx.currentTime);
    }
    if (this.audioElement) {
      this.audioElement.muted = mute;
    }
    this.notify();
  }

  public toggleMute() {
    this.setMute(!this.isMuted);
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (typeof window !== "undefined") {
      localStorage.setItem("hp_audio_volume", String(this.volume));
    }
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
    this.notify();
  }

  // High-fidelity sound effects
  public playSfx(name: "wand" | "sparkle" | "portal" | "parchment" | "owl" | "snitch") {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx || !this.sfxGain) return;

    const now = ctx.currentTime;

    switch (name) {
      case "wand": {
        // Lumos spell pitch sweep up
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(1480, now + 0.35);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.3, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.5);
        break;
      }
      case "sparkle": {
        // Quick crystalline arpeggio
        const pitches = [1046.5, 1318.51, 1567.98, 2093.0];
        pitches.forEach((freq, idx) => {
          if (!ctx || !this.sfxGain) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const offset = idx * 0.06;

          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, now + offset);

          gain.gain.setValueAtTime(0.001, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.18, now + offset + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.3);

          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(now + offset);
          osc.stop(now + offset + 0.32);
        });
        break;
      }
      case "portal": {
        // Deep resonating portal boom
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(55, now + 0.8);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(400, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.35, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 1.3);
        break;
      }
      case "parchment": {
        // Soft white noise burst simulating parchment rustle
        const bufferSize = ctx.sampleRate * 0.18;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(1400, now);
        filter.Q.setValueAtTime(2.0, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.sfxGain);
        noise.start(now);
        break;
      }
      case "snitch": {
        // High rapid buzzing fluttering sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(380, now);
        osc.frequency.linearRampToValueAtTime(540, now + 0.3);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.12, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.4);
        break;
      }
      case "owl": {
        // Soft atmospheric two-tone owl hoot (Hoo... Hoo-oo)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.22); // C5

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.12, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

        // Second hoot
        setTimeout(() => {
          if (!ctx || !this.sfxGain || this.isMuted) return;
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          const t2 = ctx.currentTime;
          osc2.type = "sine";
          osc2.frequency.setValueAtTime(620, t2);
          osc2.frequency.exponentialRampToValueAtTime(493.88, t2 + 0.35);

          gain2.gain.setValueAtTime(0.001, t2);
          gain2.gain.exponentialRampToValueAtTime(0.15, t2 + 0.06);
          gain2.gain.exponentialRampToValueAtTime(0.0001, t2 + 0.4);

          osc2.connect(gain2);
          gain2.connect(this.sfxGain);
          osc2.start(t2);
          osc2.stop(t2 + 0.42);
        }, 220);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.35);
        break;
      }
    }
  }
}

export const audioManager = new AudioManager();

