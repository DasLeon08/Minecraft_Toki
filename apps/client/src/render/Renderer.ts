import * as THREE from 'three';
import { BreakOverlay } from './BreakOverlay';
import { ChunkMeshStore } from './ChunkMeshStore';
import { ItemRenderer } from './ItemRenderer';
import { Sky } from './Sky';
import { createBlockTextureArray } from './textures';

// Farben werden 1:1 so ausgegeben, wie sie in der Pixel-Art definiert sind.
THREE.ColorManagement.enabled = false;

const UNDERWATER_FOG = new THREE.Color(0x163c7a);

/** Bündelt WebGL-Renderer, Szene, Kamera, Chunk-Meshes, Himmel und Blockauswahl. */
export class Renderer {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera;
  readonly chunks: ChunkMeshStore;
  readonly sky: Sky;
  private readonly highlight: THREE.LineSegments;
  readonly breakOverlay: BreakOverlay;
  readonly items = new ItemRenderer();
  private readonly resizeObserver: ResizeObserver;
  private atlas: THREE.DataArrayTexture;
  renderDistance = 8;
  renderScale = 1;
  underwater = false;
  contextLost = false;

  constructor(
    readonly container: HTMLElement,
    seed: number,
  ) {
    this.renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance', stencil: false });
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.domElement.className = 'game-canvas';
    this.renderer.domElement.tabIndex = 0;
    container.appendChild(this.renderer.domElement);
    this.renderer.domElement.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      this.contextLost = true;
    });
    this.renderer.domElement.addEventListener('webglcontextrestored', () => {
      this.contextLost = false;
    });

    this.camera = new THREE.PerspectiveCamera(75, 1, 0.05, 1000);
    this.camera.rotation.order = 'YXZ';

    this.atlas = createBlockTextureArray();
    this.chunks = new ChunkMeshStore({
      uAtlas: { value: this.atlas },
      uDaylight: { value: 1 },
      uSkyTint: { value: new THREE.Color(1, 1, 1) },
      uFogColor: { value: new THREE.Color() },
      uFogNear: { value: 80 },
      uFogFar: { value: 120 },
    });
    this.sky = new Sky(seed);
    this.scene.add(this.sky.group, this.chunks.group);

    const box = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.004, 1.004, 1.004));
    this.highlight = new THREE.LineSegments(
      box,
      new THREE.LineBasicMaterial({ color: 0x101010, transparent: true, opacity: 0.55, depthWrite: false }),
    );
    this.highlight.visible = false;
    this.highlight.renderOrder = 4;
    this.scene.add(this.highlight);
    this.breakOverlay = new BreakOverlay(this.chunks.uniforms.uAtlas);
    this.scene.add(this.breakOverlay.mesh, this.items.group);

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.resize();
  }

  /** Erzeugt die Block-Texturen neu (z. B. nach Wechsel des Texturstils). */
  reloadTextures(): void {
    const old = this.atlas;
    this.atlas = createBlockTextureArray();
    this.chunks.uniforms.uAtlas.value = this.atlas;
    old.dispose();
    this.items.clearTextures();
  }

  get canvas(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  resize(): void {
    const w = Math.max(1, this.container.clientWidth);
    const h = Math.max(1, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2) * this.renderScale);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  setFov(fov: number): void {
    if (Math.abs(this.camera.fov - fov) > 0.01) {
      this.camera.fov = fov;
      this.camera.updateProjectionMatrix();
    }
  }

  setHighlight(pos: { x: number; y: number; z: number } | null): void {
    if (!pos) {
      this.highlight.visible = false;
      return;
    }
    this.highlight.visible = true;
    this.highlight.position.set(pos.x + 0.5, pos.y + 0.5, pos.z + 0.5);
  }

  render(dayFraction: number, seconds: number): void {
    if (this.contextLost) return;
    this.sky.update(dayFraction, this.camera, seconds);
    const u = this.chunks.uniforms;
    const st = this.sky.state;
    u.uDaylight.value = st.daylight;
    u.uSkyTint.value.copy(st.tint);
    const far = this.renderDistance * 16;
    if (this.underwater) {
      u.uFogColor.value.copy(UNDERWATER_FOG).multiplyScalar(0.35 + 0.65 * st.daylight);
      u.uFogNear.value = 2;
      u.uFogFar.value = 28;
      this.scene.background = u.uFogColor.value;
    } else {
      u.uFogColor.value.copy(st.fogColor);
      u.uFogNear.value = far * 0.62;
      u.uFogFar.value = far - 4;
      this.scene.background = st.skyColor;
    }
    this.sky.group.visible = !this.underwater;
    this.camera.far = Math.max(500, far + 64);
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
  }

  get stats(): { calls: number; triangles: number } {
    const r = this.renderer.info.render;
    return { calls: r.calls, triangles: r.triangles };
  }

  dispose(): void {
    this.resizeObserver.disconnect();
    this.chunks.dispose();
    this.breakOverlay.dispose();
    this.items.dispose();
    this.sky.dispose();
    this.atlas.dispose();
    this.highlight.geometry.dispose();
    (this.highlight.material as THREE.Material).dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
