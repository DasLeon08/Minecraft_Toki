import * as THREE from 'three';
import { textureLayer } from '@blockcraft/shared';

const LAYERS = [textureLayer('risse_0'), textureLayer('risse_1'), textureLayer('risse_2'), textureLayer('risse_3')];

/** Risse über dem Block, der gerade abgebaut wird. */
export class BreakOverlay {
  readonly mesh: THREE.Mesh;
  private readonly material: THREE.ShaderMaterial;

  constructor(atlas: { value: THREE.Texture }) {
    this.material = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL3,
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -4,
      uniforms: { uAtlas: atlas, uLayer: { value: LAYERS[0] } },
      vertexShader: `out vec2 vUv; void main(){ vUv = vec2(uv.x, 1.0 - uv.y); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `precision highp float; precision highp sampler2DArray;
        uniform sampler2DArray uAtlas; uniform float uLayer; in vec2 vUv; layout(location = 0) out vec4 outColor;
        void main(){ vec4 t = texture(uAtlas, vec3(vUv, uLayer)); if (t.a < 0.1) discard; outColor = vec4(t.rgb, t.a * 0.85); }`,
    });
    this.mesh = new THREE.Mesh(new THREE.BoxGeometry(1.002, 1.002, 1.002), this.material);
    this.mesh.visible = false;
    this.mesh.renderOrder = 6;
  }

  update(target: { x: number; y: number; z: number } | null, progress: number): void {
    if (!target || progress <= 0) {
      this.mesh.visible = false;
      return;
    }
    this.mesh.visible = true;
    this.mesh.position.set(target.x + 0.5, target.y + 0.5, target.z + 0.5);
    this.material.uniforms.uLayer.value = LAYERS[Math.min(3, Math.floor(progress * 4))];
  }

  dispose(): void {
    this.mesh.geometry.dispose();
    this.material.dispose();
  }
}
