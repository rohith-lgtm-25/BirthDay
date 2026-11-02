/**
 * Magical Birthday Audio Synthesizer (Web Audio API)
 * Zero external audio files needed - pure procedural soothing tones!
 */

class BirthdayAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isMusicPlaying = false;
    this.musicTimeout = null;
    this.musicStep = 0;
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Separate music & SFX buses
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    } catch (e) {
      console.warn('AudioContext not supported', e);
    }
  }

  ensureContext() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  // Soft dialogue typewriter blip (gentle wooden chime)
  playTypeBlip() {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      // subtle pitch variation
      const freq = 650 + Math.random() * 80;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.8, now + 0.04);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {}
  }

  // Playful happy puppy bark / gentle "boof!"
  playPuppyBark() {
    this.ensureContext();
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;

      // Primary puppy vocal formant
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';

      // Bark pitch envelope: quick rise then fall
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(560, now + 0.06);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.22);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

      // Cute playful yap overtone
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(640, now);
      osc2.frequency.exponentialRampToValueAtTime(1120, now + 0.06);
      osc2.frequency.exponentialRampToValueAtTime(520, now + 0.20);

      gain2.gain.setValueAtTime(0.005, now);
      gain2.gain.linearRampToValueAtTime(0.12, now + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc2.connect(gain2);
      gain2.connect(this.sfxGain);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + 0.25);
      osc2.stop(now + 0.25);
    } catch (e) {}
  }

  // Candle blowing sound: gentle soft filtered noise whoosh
  playCandleBlow() {
    this.ensureContext();
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 1.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pinkish noise
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.95 * b1 + white * 0.1;
        b2 = 0.85 * b2 + white * 0.25;
        data[i] = (b0 + b1 + b2) * 0.6;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(250, now + 1.4);
      filter.Q.setValueAtTime(2.0, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.35, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      noise.start(now);
      noise.stop(now + 1.5);
    } catch (e) {}
  }

  // Confetti celebration burst: soft pop followed by sparkle chime
  playConfettiBurst() {
    this.ensureContext();
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;

      // Pop impulse
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.12);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.15);

      // Sparkle burst
      setTimeout(() => this.playSparkleChime(), 60);
    } catch (e) {}
  }

  // Magical celestial chime / fairy dust
  playSparkleChime() {
    this.ensureContext();
    if (this.isMuted || !this.ctx) return;
    try {
      const notes = [1046.5, 1318.5, 1567.98, 2093.0, 2637.0]; // C6, E6, G6, C7, E7
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const noteTime = now + idx * 0.07;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.001, noteTime);
        gain.gain.linearRampToValueAtTime(0.12, noteTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.6);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(noteTime);
        osc.stop(noteTime + 0.65);
      });
    } catch (e) {}
  }

  // Interactive Button Click (friendly pop)
  playButtonClick() {
    this.ensureContext();
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {}
  }

  // Soft page turn / chapter flip
  playPageTurn() {
    this.ensureContext();
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.15);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {}
  }

  // Magical Music Box Melody: A gentle, dreamy, peaceful music box playing in loop
  // Notes in G major / E minor pentatonic with music-box bell harmonics
  playMusicBoxNote(freq, time, duration = 0.8) {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      // Music box sparkle overtone (bell harmonic)
      oscHarmonic.type = 'sine';
      oscHarmonic.frequency.setValueAtTime(freq * 3, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.14, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(gain);
      oscHarmonic.connect(gain);
      gain.connect(this.musicGain);

      osc.start(time);
      oscHarmonic.start(time);
      osc.stop(time + duration);
      oscHarmonic.stop(time + duration);
    } catch (e) {}
  }

  startMusic() {
    this.ensureContext();
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;
    this.musicStep = 0;
    this.loopMusic();
  }

  stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicTimeout) {
      clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }
  }

  toggleMusic() {
    if (this.isMusicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  loopMusic() {
    if (!this.isMusicPlaying || !this.ctx) return;

    // Dreamy birthday lullaby sequence (Happy Birthday inspired music box variations)
    // Notes frequencies (Hz):
    // C5=523.25, D5=587.33, E5=659.25, F5=698.46, G5=783.99, A5=880, B5=987.77, C6=1046.5
    const melody = [
      { f: 523.25, d: 0.35, pause: 400 }, // C5
      { f: 523.25, d: 0.35, pause: 300 }, // C5
      { f: 587.33, d: 0.6, pause: 600 },  // D5
      { f: 523.25, d: 0.6, pause: 600 },  // C5
      { f: 698.46, d: 0.7, pause: 600 },  // F5
      { f: 659.25, d: 1.1, pause: 1100 }, // E5
      //
      { f: 523.25, d: 0.35, pause: 400 }, // C5
      { f: 523.25, d: 0.35, pause: 300 }, // C5
      { f: 587.33, d: 0.6, pause: 600 },  // D5
      { f: 523.25, d: 0.6, pause: 600 },  // C5
      { f: 783.99, d: 0.7, pause: 600 },  // G5
      { f: 698.46, d: 1.1, pause: 1100 }, // F5
      //
      { f: 523.25, d: 0.35, pause: 400 }, // C5
      { f: 523.25, d: 0.35, pause: 300 }, // C5
      { f: 1046.5, d: 0.7, pause: 700 },  // C6
      { f: 880.00, d: 0.7, pause: 700 },  // A5
      { f: 698.46, d: 0.6, pause: 600 },  // F5
      { f: 659.25, d: 0.6, pause: 600 },  // E5
      { f: 587.33, d: 1.1, pause: 1100 }, // D5
      //
      { f: 932.33, d: 0.35, pause: 400 }, // Bb5
      { f: 932.33, d: 0.35, pause: 300 }, // Bb5
      { f: 880.00, d: 0.7, pause: 700 },  // A5
      { f: 698.46, d: 0.7, pause: 700 },  // F5
      { f: 783.99, d: 0.8, pause: 700 },  // G5
      { f: 698.46, d: 1.4, pause: 1600 }, // F5 (resolve)
    ];

    const currentNote = melody[this.musicStep];
    if (currentNote && this.ctx) {
      this.playMusicBoxNote(currentNote.f, this.ctx.currentTime, currentNote.d);
      this.musicStep = (this.musicStep + 1) % melody.length;
      this.musicTimeout = setTimeout(() => this.loopMusic(), currentNote.pause);
    } else {
      this.musicTimeout = setTimeout(() => this.loopMusic(), 500);
    }
  }
}

// Global audio singleton
window.birthdayAudio = new BirthdayAudioEngine();
