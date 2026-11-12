import * as THREE from 'three';
import { sectionKeyColumn, sectionKeyY, columnKeyX, columnKeyZ, type MeshLayerData, type SectionMeshData } from '@blockcraft/shared';
import { chunkFragment, chunkVertex } from './shaders';

export interface ChunkUniforms {
  uAtlas: { value: THREE.Texture };
  uDaylight: { value: number };
  uSkyTint: { value: THREE.Color };
  uFogColor: { value: THREE.Color };
  uFogNear: { value: number };
  uFogFar: { value: number };
}

const SPHERE = new THREE.Sphere(new THREE.Vector3(8, 8, 8), 13.86);
const BOX = new THREE.Box3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(16, 16, 16));

/** Verwaltet die GPU-Meshes aller Sections (drei Layer pro Section). */
export class ChunkMeshStore {
  readonly group = new THREE.Group();
  readonly materials: [THREE.ShaderMaterial, THREE.ShaderMaterial, THREE.ShaderMaterial];
  private readonly meshes = new Map<number, (THREE.Mesh | null)[]>();
  triangles = 0;

  constructor(readonly uniforms: ChunkUniforms) {
    const make = (alphaTest: number, transparent: boolean, opacity: number): THREE.ShaderMaterial =>
      new THREE.ShaderMaterial({
        glslVersion: THREE.GLSL3,
        vertexShader: chunkVertex,
        fragmentShader: chunkFragment,
        uniforms: { ...uniforms, uAlphaTest: { value: alphaTest }, uOpacity: { value: opacity } },
        transparent,
        depthWrite: !transparent,
        side: THREE.FrontSide,
      });
    this.materials = [make(0, false, 1), make(0.5, false, 1), make(0.01, true, 1)];
    this.group.name = 'chunks';
    this.group.matrixAutoUpdate = false;
  }

  get count(): number {
    return this.meshes.size;
  }

  upload(key: number, data: SectionMeshData): void {
    this.remove(key);
    const ck = sectionKeyColumn(key);
    const cx = columnKeyX(ck);
    const cz = columnKeyZ(ck);
    const sy = sectionKeyY(key);
    const layers = [data.opaque, data.cutout, data.translucent];
    const list: (THREE.Mesh | null)[] = [null, null, null];
    let any = false;
    layers.forEach((l, i) => {
      if (!l) return;
      const mesh = this.createMesh(l, this.materials[i]);
      mesh.position.set(cx * 16, sy * 16, cz * 16);
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      mesh.renderOrder = i;
      this.group.add(mesh);
      list[i] = mesh;
      this.triangles += l.index.length / 3;
      any = true;
    });
    if (any) this.meshes.set(key, list);
  }

  private createMesh(l: MeshLayerData, material: THREE.Material): THREE.Mesh {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('aPos', new THREE.BufferAttribute(l.pos, 4, false));
    geo.setAttribute('aUvl', new THREE.BufferAttribute(l.uvl, 4, false));
    geo.setAttribute('aLight', new THREE.BufferAttribute(l.light, 4, false));
    geo.setIndex(new THREE.BufferAttribute(l.index, 1));
    geo.boundingSphere = SPHERE.clone();
    geo.boundingBox = BOX.clone();
    const mesh = new THREE.Mesh(geo, material);
    mesh.frustumCulled = true;
    return mesh;
  }

  remove(key: number): void {
    const list = this.meshes.get(key);
    if (!list) return;
    for (const m of list) {
      if (!m) continue;
      this.group.remove(m);
      const idx = m.geometry.getIndex();
      if (idx) this.triangles -= idx.count / 3;
      m.geometry.dispose();
    }
    this.meshes.delete(key);
  }

  removeColumn(columnKey: number): void {
    for (let sy = 0; sy < 16; sy++) this.remove(columnKey * 16 + sy);
  }

  dispose(): void {
    for (const key of [...this.meshes.keys()]) this.remove(key);
    for (const m of this.materials) m.dispose();
  }
}
