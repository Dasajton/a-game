let ctx;
let muted = false;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    ctx = AudioCtx ? new AudioCtx() : null;
  }
  if (ctx && ctx.state === "suspended") ctx.resume();
  return ctx;
}

export function setAudioMuted(value) {
  muted = value;
}

function tone(c, { freq, duration = 0.2, type = "sine", startTime = 0, gain = 0.14 }) {
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.connect(g);
  g.connect(c.destination);
  const t0 = c.currentTime + startTime;
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

export function playCollect() {
  const c = getCtx();
  if (!c || muted) return;
  tone(c, { freq: 880, duration: 0.15, type: "triangle", gain: 0.12 });
  tone(c, { freq: 1320, duration: 0.2, startTime: 0.05, type: "triangle", gain: 0.1 });
}

export function playGolden() {
  const c = getCtx();
  if (!c || muted) return;
  [660, 880, 1320].forEach((freq, i) =>
    tone(c, { freq, duration: 0.25, startTime: i * 0.08, type: "sine", gain: 0.14 })
  );
}

export function playDetected() {
  const c = getCtx();
  if (!c || muted) return;
  tone(c, { freq: 160, duration: 0.35, type: "sawtooth", gain: 0.16 });
  tone(c, { freq: 110, duration: 0.4, startTime: 0.05, type: "sawtooth", gain: 0.12 });
}

export function playVictory() {
  const c = getCtx();
  if (!c || muted) return;
  [523, 659, 784, 1046].forEach((freq, i) =>
    tone(c, { freq, duration: 0.3, startTime: i * 0.12, type: "triangle", gain: 0.13 })
  );
}
