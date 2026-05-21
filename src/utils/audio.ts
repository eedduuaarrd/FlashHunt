/**
 * Web Audio API retro synthesizer helper for fun immersive sound effects.
 * Fails gracefully if Web Audio API is blocked or unsupported.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return null;
  
  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  
  // Resume context if suspended
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  
  return audioCtx;
}

/**
 * Play a cute retro chime when an action succeeds (e.g., matching coordinates)
 */
export function playSuccessSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  try {
    const now = ctx.currentTime;
    
    // Play a lovely double arpeggio (C5 -> E5 -> G5 -> C6)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + index * 0.08);
      
      gain.gain.setValueAtTime(0.15, now + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.08 + 0.3);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 0.32);
    });
  } catch (e) {
    console.warn("Synth bypass:", e);
  }
}

/**
 * Play a futuristic sweep laser sound when scanning an object
 */
export function playScanSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "triangle";
    // Pitch sweeps downwards rapidly
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.35);
    
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.36);
  } catch (e) {
    console.warn("Synth bypass:", e);
  }
}

/**
 * Play an epic level up fanfare arpeggio
 */
export function playLevelUpSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  try {
    const now = ctx.currentTime;
    // Ascending major pentatonic scale rapid sequence
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51];
    
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = index % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, now + index * 0.05);
      
      gain.gain.setValueAtTime(0.2, now + index * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + index * 0.05 + 0.4);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + index * 0.05);
      osc.stop(now + index * 0.05 + 0.42);
    });
  } catch (e) {
    console.warn("Synth bypass:", e);
  }
}

/**
 * Play standard soft error tone for failed verifications
 */
export function playErrorSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.3);
    
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.30);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.31);
  } catch (e) {
    console.warn("Synth bypass:", e);
  }
}

/**
 * Play a simple quick tactile button touch sound
 */
export function playBeep() {
  const ctx = getAudioContext();
  if (!ctx) return;
  
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, now);
    
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.08);
  } catch (e) {
    console.warn("Synth bypass:", e);
  }
}
