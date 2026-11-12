import * as THREE from 'three';
import { SimplexNoise } from '@blockcraft/shared';

/**
 * Himmel mit Tag-Nacht-Zyklus: Farbverlauf, eigene Sonne (Scheibe mit Ring),
 * Mond mit Kratern, Sterne und prozedurale Wolken.
 */
const DAY = new THREE.Color(0x86c3ef);
const DUSK = new THREE.Color(0xf09a62);
const NIGHT = new THREE.Color(0x0a0f22);
const DAY_TINT = new THREE.Color(1, 1, 1);
const NIGHT_TINT = new THREE.Color(0.62, 0.7, 1.0);

export interface SkyState {
  /** 0–1: Anteil Tageslicht für den Chunk-Shader. */
  daylight: number;
  skyColor: THREE.Color;
  fogColor: THREE.Color;
  tint: THREE.Color;
}

export class Sky {
  readonly group = new THREE.Group();
  private readonly sun: THREE.Mesh;
  private readonly moon: THREE.Mesh;
  private readonly stars: THREE.Points;
  private readonly clouds: THREE.Mesh;
  private readonly cloudMat: THREE.ShaderMaterial;
  readonly state: SkyState = {
    daylight: 1,
    skyColor: DAY.clone(),
    fogColor: DAY.clone(),
    tint: DAY_TINT.clone(),
  };

  constructor(seed: number) {
    const discMat = (kind: 0 | 1): THREE.ShaderMaterial =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        fog: false,
        uniforms: { uKind: { value: kind } },
        vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `
          varying vec2 vUv; uniform int uKind;
          void main(){
            vec2 p = (vUv - 0.5) * 2.0;
            float d = length(p);
            // Pixelig: auf 16er-Raster quantisieren
            vec2 q = floor(vUv * 16.0) / 16.0 - 0.5 + 1.0/32.0;
            float dq = length(q * 2.0);
            vec4 c = vec4(0.0);
            if (uKind == 0) {
              if (dq < 0.55) c = vec4(1.0, 0.95, 0.72, 1.0);
              else if (dq < 0.66) c = vec4(1.0, 0.82, 0.45, 1.0);
              else if (dq > 0.8 && dq < 0.9) c = vec4(1.0, 0.85, 0.5, 0.55);
            } else {
              if (dq < 0.6) {
                c = vec4(0.86, 0.88, 0.96, 1.0);
                vec2 a = q - vec2(0.12, 0.08); vec2 b = q + vec2(0.14, -0.12); vec2 e = q + vec2(-0.05, 0.18);
                if (length(a) < 0.08 || length(b) < 0.06 || length(e) < 0.05) c.rgb *= 0.8;
              }
            }
            if (c.a <= 0.0) discard;
            gl_FragColor = c;
          }`,
      });
    const plane = new THREE.PlaneGeometry(1, 1);
    this.sun = new THREE.Mesh(plane, discMat(0));
    this.sun.scale.setScalar(90);
    this.moon = new THREE.Mesh(plane, discMat(1));
    this.moon.scale.setScalar(60);
    for (const m of [this.sun, this.moon]) {
      m.renderOrder = -10;
      m.frustumCulled = false;
    }

    // Sterne
    const starGeo = new THREE.BufferGeometry();
    const n = 900;
    const pos = new Float32Array(n * 3);
    let s = seed >>> 0;
    const rnd = (): number => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
    for (let i = 0; i < n; i++) {
      const u = rnd() * 2 - 1;
      const t = rnd() * Math.PI * 2;
      const r = Math.sqrt(1 - u * u);
      pos[i * 3] = r * Math.cos(t) * 450;
      pos[i * 3 + 1] = Math.abs(u) * 450;
      pos[i * 3 + 2] = r * Math.sin(t) * 450;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    this.stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0xffffff, size: 1.6, sizeAttenuation: false, transparent: true, depthWrite: false, fog: false }),
    );
    this.stars.renderOrder = -11;
    this.stars.frustumCulled = false;

    // Wolken: kachelbare Noise-Textur
    const size = 128;
    const noise = new SimplexNoise(seed ^ 0x5bd1e995);
    const data = new Uint8Array(size * size * 4);
    for (let y = 0; y < size; y++)
      for (let x = 0; x < size; x++) {
        // Torus-Mapping für nahtlose Kachelung
        const a = (x / size) * Math.PI * 2;
        const b = (y / size) * Math.PI * 2;
        const v = noise.noise3(Math.cos(a) * 2.2, Math.sin(a) * 2.2 + Math.cos(b) * 2.2, Math.sin(b) * 2.2) * 0.7 +
          noise.noise3(Math.cos(a) * 5, Math.sin(b) * 5, Math.sin(a) * 5 + Math.cos(b) * 5) * 0.3;
        const o = (y * size + x) * 4;
        const on = v > 0.18 ? 255 : 0;
        data[o] = data[o + 1] = data[o + 2] = 255;
        data[o + 3] = on;
      }
    const cloudTex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    cloudTex.wrapS = cloudTex.wrapT = THREE.RepeatWrapping;
    cloudTex.magFilter = THREE.NearestFilter;
    cloudTex.minFilter = THREE.NearestFilter;
    cloudTex.needsUpdate = true;
    this.cloudMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uTex: { value: cloudTex },
        uOffset: { value: new THREE.Vector2() },
        uColor: { value: new THREE.Color(1, 1, 1) },
        uFogColor: { value: new THREE.Color() },
      },
      vertexShader: `varying vec2 vWorld; varying float vDist; uniform vec2 uOffset;
        void main(){ vec4 w = modelMatrix * vec4(position,1.0); vWorld = w.xz / 12.0 / 128.0 + uOffset; vec4 mv = viewMatrix * w; vDist = length(mv.xz); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform sampler2D uTex; uniform vec3 uColor; uniform vec3 uFogColor; varying vec2 vWorld; varying float vDist;
        void main(){ vec4 t = texture2D(uTex, vWorld); if (t.a < 0.5) discard; float f = smoothstep(180.0, 420.0, vDist); gl_FragColor = vec4(mix(uColor, uFogColor, f), 0.82 * (1.0 - f)); }`,
    });
    this.clouds = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), this.cloudMat);
    this.clouds.rotation.x = -Math.PI / 2;
    this.clouds.renderOrder = 5;
    this.clouds.frustumCulled = false;

    this.group.add(this.stars, this.sun, this.moon, this.clouds);
  }

  /**
   * Aktualisiert den Himmel. `dayFraction`: 0 = Sonnenaufgang, 0.25 = Mittag,
   * 0.5 = Sonnenuntergang, 0.75 = Mitternacht.
   */
  update(dayFraction: number, camera: THREE.Camera, totalSeconds: number): void {
    const angle = dayFraction * Math.PI * 2;
    const sunY = Math.sin(angle);
    const daylight = THREE.MathUtils.clamp(sunY * 2.2 + 0.45, 0.16, 1);
    this.state.daylight = daylight;

    // Himmelsfarbe: Nacht → Dämmerung → Tag
    const dusk = Math.max(0, 1 - Math.abs(sunY) * 3.2);
    const dayAmount = THREE.MathUtils.clamp(sunY * 2 + 0.5, 0, 1);
    this.state.skyColor.copy(NIGHT).lerp(DAY, dayAmount).lerp(DUSK, dusk * 0.55);
    this.state.fogColor.copy(this.state.skyColor);
    this.state.tint.copy(NIGHT_TINT).lerp(DAY_TINT, dayAmount);

    const cam = camera.position;
    const dir = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0.25).normalize();
    this.sun.position.copy(cam).addScaledVector(dir, 400);
    this.sun.lookAt(cam);
    this.moon.position.copy(cam).addScaledVector(dir, -400);
    this.moon.lookAt(cam);
    this.stars.position.copy(cam);
    this.stars.rotation.z = angle;
    (this.stars.material as THREE.PointsMaterial).opacity = THREE.MathUtils.clamp(1 - dayAmount * 1.6, 0, 1);

    this.clouds.position.set(cam.x, 150, cam.z);
    this.cloudMat.uniforms.uOffset.value.set(totalSeconds * 0.0006, 0);
    const cloudBright = 0.35 + 0.65 * dayAmount;
    (this.cloudMat.uniforms.uColor.value as THREE.Color).setRGB(cloudBright, cloudBright, cloudBright * 1.02).lerp(DUSK, dusk * 0.3);
    (this.cloudMat.uniforms.uFogColor.value as THREE.Color).copy(this.state.fogColor);
  }

  dispose(): void {
    this.group.traverse((o) => {
      if (o instanceof THREE.Mesh || o instanceof THREE.Points) {
        o.geometry.dispose();
        (o.material as THREE.Material).dispose();
      }
    });
    this.cloudMat.uniforms.uTex.value.dispose();
  }
}
