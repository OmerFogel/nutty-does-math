// ── Nutty Does Math — Audio Engine (Web Audio API, no files needed) ──

let ctx = null;
let masterGain = null;
let bgGain = null;
let sfxGain = null;
let _muted = false;
let _bgLoopId = null;
let _bgStarted = false;

function ensureCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();

    masterGain = ctx.createGain();
    masterGain.gain.value = 1;
    masterGain.connect(ctx.destination);

    bgGain = ctx.createGain();
    bgGain.gain.value = 0.18;
    bgGain.connect(masterGain);

    sfxGain = ctx.createGain();
    sfxGain.gain.value = 0.6;
    sfxGain.connect(masterGain);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

// ── Note scheduler ──────────────────────────────────────────────────────────

function playNote(freq, startTime, duration, gainNode, volume = 0.4, type = 'triangle') {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  osc.connect(g);
  g.connect(gainNode);
  g.gain.setValueAtTime(0, startTime);
  g.gain.linearRampToValueAtTime(volume, startTime + 0.02);
  g.gain.setValueAtTime(volume, startTime + duration * 0.72);
  g.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.05);
}

// ── Background music ─────────────────────────────────────────────────────────
// Cheerful 16-beat loop in C pentatonic (C D E G A), 116 BPM

const BPM = 116;
const B = 60 / BPM; // seconds per beat

// [frequency_hz, beats]
const MELODY = [
  [329.63, 0.5], [392.00, 0.5], [440.00, 1.0],   // E4 G4 A4
  [392.00, 0.5], [329.63, 0.5], [293.66, 1.0],   // G4 E4 D4
  [329.63, 0.5], [392.00, 0.5], [440.00, 0.5], [523.25, 0.5], // E4 G4 A4 C5
  [440.00, 0.5], [392.00, 0.5], [329.63, 1.0],   // A4 G4 E4
  [293.66, 0.5], [329.63, 0.5], [392.00, 1.0],   // D4 E4 G4
  [440.00, 0.5], [523.25, 0.5], [440.00, 0.5], [392.00, 0.5], // A4 C5 A4 G4
  [329.63, 1.0], [293.66, 0.5], [261.63, 0.5],   // E4 D4 C4
  [293.66, 0.5], [329.63, 0.5], [261.63, 1.0],   // D4 E4 C4
];

// Soft bass roots
const BASS = [
  [130.81, 4], // C3
  [196.00, 4], // G3
  [220.00, 4], // A3
  [130.81, 4], // C3
];

function scheduleBgLoop(startTime) {
  // Melody (triangle wave — warm & kid-friendly)
  let t = startTime;
  for (const [freq, beats] of MELODY) {
    const dur = beats * B;
    playNote(freq, t, dur * 0.85, bgGain, 0.38, 'triangle');
    t += dur;
  }
  const loopDur = MELODY.reduce((s, [, b]) => s + b, 0) * B;

  // Bass (sine wave — subtle low rumble)
  let bt = startTime;
  for (const [freq, beats] of BASS) {
    const dur = beats * B;
    playNote(freq, bt, dur * 0.9, bgGain, 0.14, 'sine');
    bt += dur;
  }

  return loopDur;
}

function startBgMusic() {
  if (_bgLoopId !== null) return;
  const loop = () => {
    if (!ctx) return;
    const loopDur = scheduleBgLoop(ctx.currentTime);
    _bgLoopId = setTimeout(loop, (loopDur - 0.15) * 1000);
  };
  loop();
}

// ── Public API ───────────────────────────────────────────────────────────────

/** Call this once on the first user gesture to unlock audio and start music. */
export function initAudio() {
  ensureCtx();
  if (!_bgStarted) {
    _bgStarted = true;
    startBgMusic();
  }
}

/** Correct answer — ascending chime (C E G) */
export function sfxCorrect() {
  if (!ctx) return;
  ensureCtx();
  const now = ctx.currentTime;
  [523.25, 659.25, 783.99].forEach((freq, i) => {
    playNote(freq, now + i * 0.1, 0.35, sfxGain, 0.5, 'sine');
  });
}

/** Wrong answer — descending buzz */
export function sfxWrong() {
  if (!ctx) return;
  ensureCtx();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(110, now + 0.4);
  osc.connect(g);
  g.connect(sfxGain);
  g.gain.setValueAtTime(0.28, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
  osc.start(now);
  osc.stop(now + 0.48);
}

/** Walnut collected — quick rising boing */
export function sfxWalnut() {
  if (!ctx) return;
  ensureCtx();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(660, now);
  osc.frequency.exponentialRampToValueAtTime(1320, now + 0.12);
  osc.connect(g);
  g.connect(sfxGain);
  g.gain.setValueAtTime(0.4, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
  osc.start(now);
  osc.stop(now + 0.22);
}

/** Level complete — triumphant fanfare */
export function sfxLevelUp() {
  if (!ctx) return;
  ensureCtx();
  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.50];
  notes.forEach((freq, i) => {
    const start = now + i * 0.13;
    const dur = i === notes.length - 1 ? 1.1 : 0.22;
    playNote(freq, start, dur, sfxGain, 0.55, 'sine');
  });
  // Low harmony
  [261.63, 329.63, 392.00].forEach((freq, i) => {
    playNote(freq, now + i * 0.13, 0.5, sfxGain, 0.2, 'triangle');
  });
}

export function isMuted() {
  return _muted;
}

export function setMuted(val) {
  _muted = val;
  if (masterGain) {
    masterGain.gain.setTargetAtTime(val ? 0 : 1, ctx.currentTime, 0.08);
  }
}
