/**
 * Prozedurale Klänge (WebAudio): Rauschen + Hüllkurven + Filter, nichts wird
 * aus Dateien geladen. Dazu leise, generative Ambient-Musik.
 */
import { getBlock, SAND, GRAVEL, GLASS, isWater, Shape, OAK_LEAVES, BIRCH_LEAVES, SPRUCE_LEAVES, SWAMP_LEAVES, type SoundName } from '@blockcraft/shared';
import { settings } from '../settings';

type Material = 'stone' | 'wood' | 'dirt' | 'sand' | 'grass' | 'glass' | 'water';

function materialOf(block: number | undefined): Material {
  if (block === undefined) return 'dirt';
  if (isWater(block)) return 'water';
  if (block === SAND || block === GRAVEL) return 'sand';
  if (block === GLASS) return 'glass';
  if ([OAK_LEAVES, BIRCH_LEAVES, SPRUCE_LEAVES, SWAMP_LEAVES].includes(block)) return 'grass';
  const def = getBlock(block);
  if (def.shape === Shape.Cross) return 'grass';
  if (def.tool === 'spitzhacke') return 'stone';
  if (def.tool === 'axt') return 'wood';
  return 'dirt';
}

const MAT: Record<Material, { freq: number; q: number; len: number; type: BiquadFilterType }> = {
  stone: { freq: 1800, q: 1.2, len: 0.16, type: 'bandpass' },
  wood: { freq: 650, q: 3, len: 0.14, type: 'bandpass' },
  dirt: { freq: 420, q: 0.8, len: 0.16, type: 'lowpass' },
  sand: { freq: 2600, q: 0.5, len: 0.2, type: 'highpass' },
  grass: { freq: 1200, q: 0.7, len: 0.18, type: 'bandpass' },
  glass: { freq: 4200, q: 6, len: 0.25, type: 'bandpass' },
  water: { freq: 700, q: 0.6, len: 0.35, type: 'lowpass' },
};

export class Sound {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private fx: GainNode | null = null;
  private music: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private listener = { x: 0, y: 0, z: 0, yaw: 0 };
  private nextMusic = 20;
  private elapsed = 0;
  private unsub: (() => void) | null = null;

  /** Muss nach einer Nutzer-Geste aufgerufen werden (Browser-Regel). */
  resume(): void {
    try {
      if (!this.ctx) {
        const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!Ctx) return;
        this.ctx = new Ctx();
        this.master = this.ctx.createGain();
        this.fx = this.ctx.createGain();
        this.music = this.ctx.createGain();
        this.fx.connect(this.master);
        this.music.connect(this.master);
        this.master.connect(this.ctx.destination);
        const len = this.ctx.sampleRate;
        this.noise = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
        const d = this.noise.getChannelData(0);
        let s = 12345;
        for (let i = 0; i < len; i++) {
          s = (s * 1103515245 + 12345) >>> 0;
          d[i] = (s / 4294967296) * 2 - 1;
        }
        this.unsub = settings.subscribe(() => this.applyVolumes());
      }
      if (this.ctx.state === 'suspended') void this.ctx.resume();
    } catch {
      this.ctx = null;
    }
  }

  private applyVolumes(): void {
    const s = settings.value;
    if (!this.master || !this.fx || !this.music) return;
    this.master.gain.value = s.volumeMaster / 100;
    this.fx.gain.value = s.volumeEffects / 100;
    this.music.gain.value = (s.volumeMusic / 100) * 0.35;
  }

  setListener(x: number, y: number, z: number, yaw: number): void {
    this.listener = { x, y, z, yaw };
  }

  /** Lautstärke und Stereoposition relativ zum Hörer. */
  private spatial(x?: number, y?: number, z?: number): { gain: number; pan: number } {
    if (x === undefined || y === undefined || z === undefined) return { gain: 1, pan: 0 };
    const dx = x - this.listener.x;
    const dy = y - this.listener.y;
    const dz = z - this.listener.z;
    const d = Math.hypot(dx, dy, dz);
    const gain = Math.max(0, 1 - d / 24);
    // Rechts-Vektor (cos, −sin) der Blickrichtung
    const right = (dx * Math.cos(this.listener.yaw) - dz * Math.sin(this.listener.yaw)) / Math.max(1, d);
    return { gain, pan: Math.max(-1, Math.min(1, right)) };
  }

  private burst(mat: Material, volume: number, x?: number, y?: number, z?: number, pitch = 1): void {
    const ctx = this.ctx;
    if (!ctx || !this.noise || !this.fx) return;
    const { gain, pan } = this.spatial(x, y, z);
    if (gain <= 0.01) return;
    const m = MAT[mat];
    const t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    src.playbackRate.value = pitch * (0.9 + Math.random() * 0.2);
    const f = ctx.createBiquadFilter();
    f.type = m.type;
    f.frequency.value = m.freq * pitch;
    f.Q.value = m.q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(volume * gain, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0008, t + m.len);
    const p = ctx.createStereoPanner();
    p.pan.value = pan;
    src.connect(f).connect(g).connect(p).connect(this.fx);
    src.start(t, Math.random() * 0.5, m.len + 0.05);
  }

  private tone(freqFrom: number, freqTo: number, len: number, volume: number, type: OscillatorType = 'sine', x?: number, y?: number, z?: number): void {
    const ctx = this.ctx;
    if (!ctx || !this.fx) return;
    const { gain, pan } = this.spatial(x, y, z);
    if (gain <= 0.01) return;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freqFrom, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(20, freqTo), t + len);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(volume * gain, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0008, t + len);
    const p = ctx.createStereoPanner();
    p.pan.value = pan;
    o.connect(g).connect(p).connect(this.fx);
    o.start(t);
    o.stop(t + len + 0.05);
  }

  play(name: SoundName, x?: number, y?: number, z?: number, block?: number): void {
    if (!this.ctx) return;
    switch (name) {
      case 'break':
        this.burst(materialOf(block), 0.5, x, y, z, 0.8);
        this.burst(materialOf(block), 0.3, x, y, z, 1.2);
        break;
      case 'place':
        this.burst(materialOf(block), 0.45, x, y, z, 1.1);
        break;
      case 'hurt':
        this.tone(320, 140, 0.25, 0.35, 'square');
        break;
      case 'death':
        this.tone(300, 60, 0.9, 0.4, 'sawtooth');
        break;
      case 'eat':
        for (let i = 0; i < 3; i++) setTimeout(() => this.burst('dirt', 0.35, undefined, undefined, undefined, 1.6), i * 110);
        break;
      case 'pickup':
        this.tone(600 + Math.random() * 200, 1200, 0.09, 0.18, 'triangle', x, y, z);
        break;
      case 'toolBreak':
        this.burst('glass', 0.5);
        this.tone(900, 300, 0.2, 0.2, 'square');
        break;
      case 'splash':
        this.burst('water', 0.5, x, y, z);
        break;
      case 'open':
        this.tone(180, 120, 0.18, 0.2, 'sawtooth', x, y, z);
        break;
    }
  }

  step(block: number | undefined, sprinting: boolean): void {
    this.burst(materialOf(block), sprinting ? 0.16 : 0.11, undefined, undefined, undefined, 1.3);
  }

  /** Generative Ambient-Musik (pentatonische Motive über weichen Flächen). */
  update(dt: number, daylight: number): void {
    if (!this.ctx || !this.music) return;
    this.elapsed += dt;
    if (this.elapsed < this.nextMusic) return;
    this.nextMusic = this.elapsed + 60 + Math.random() * 90;
    if (settings.value.volumeMusic <= 0) return;
    const ctx = this.ctx;
    const t0 = ctx.currentTime + 0.1;
    const root = daylight > 0.5 ? 220 : 196; // nachts etwas tiefer
    const scale = [0, 2, 4, 7, 9, 12, 14, 16];
    const chords = [
      [0, 4, 7],
      [-3, 0, 4],
      [-5, -1, 2],
      [-7, -3, 0],
    ];
    const hz = (semi: number): number => root * Math.pow(2, semi / 12);
    chords.forEach((ch, i) => {
      for (const n of ch) this.pad(hz(n - 12), t0 + i * 6, 7);
    });
    for (let i = 0; i < 10; i++) {
      const n = scale[Math.floor(Math.random() * scale.length)];
      this.pad(hz(n), t0 + 1 + i * 2.2 + Math.random() * 0.6, 2.5, 0.05);
    }
  }

  private pad(freq: number, start: number, len: number, vol = 0.04): void {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(vol, start + len * 0.3);
    g.gain.linearRampToValueAtTime(0, start + len);
    o.connect(g).connect(this.music!);
    o.start(start);
    o.stop(start + len + 0.1);
  }

  dispose(): void {
    this.unsub?.();
    void this.ctx?.close();
    this.ctx = null;
  }
}
