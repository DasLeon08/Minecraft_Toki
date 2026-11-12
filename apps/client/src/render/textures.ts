import * as THREE from 'three';
import { paintAllTextures, TEXTURE_NAMES, TEXTURE_SIZE } from '@blockcraft/shared';

/** Erzeugt das Texture Array aus der prozeduralen Pixel-Art. */
export function createBlockTextureArray(): THREE.DataArrayTexture {
  const data = paintAllTextures();
  const tex = new THREE.DataArrayTexture(data, TEXTURE_SIZE, TEXTURE_SIZE, TEXTURE_NAMES.length);
  tex.format = THREE.RGBAFormat;
  tex.type = THREE.UnsignedByteType;
  tex.magFilter = THREE.NearestFilter;
  // Auch in der Ferne harte Pixelkanten (kein Weichzeichnen zwischen Mip-Stufen)
  tex.minFilter = THREE.NearestMipmapNearestFilter;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.generateMipmaps = true;
  tex.colorSpace = THREE.NoColorSpace;
  tex.needsUpdate = true;
  return tex;
}
