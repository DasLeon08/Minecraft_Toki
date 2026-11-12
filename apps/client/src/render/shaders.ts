/** GLSL-3-Shader für Chunk-Meshes (gepacktes Vertex-Format, Texture Array). */

export const chunkVertex = /* glsl */ `
in vec4 aPos;
in vec4 aUvl;
in vec4 aLight;

out vec2 vUv;
flat out float vLayer;
out float vShade;
out float vSky;
out float vBlock;
out float vFogDepth;

void main() {
  vec3 p = aPos.xyz / 16.0;
  int n = int(aPos.w + 0.5);
  // Richtungsabhängige Schattierung (oben hell, unten dunkel)
  float dirShade = n == 2 ? 1.0 : n == 3 ? 0.55 : (n == 0 || n == 1) ? 0.8 : n == 6 ? 0.92 : 0.68;
  float ao = aLight.x / 3.0;
  vShade = dirShade * (0.5 + 0.5 * ao);
  vSky = aLight.y / 15.0;
  vBlock = aLight.z / 15.0;
  vUv = aUvl.xy;
  vLayer = aUvl.z;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vFogDepth = length(mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

export const chunkFragment = /* glsl */ `
precision highp float;
precision highp sampler2DArray;

uniform sampler2DArray uAtlas;
uniform float uDaylight;
uniform vec3 uSkyTint;
uniform vec3 uFogColor;
uniform float uFogNear;
uniform float uFogFar;
uniform float uAlphaTest;
uniform float uOpacity;

in vec2 vUv;
flat in float vLayer;
in float vShade;
in float vSky;
in float vBlock;
in float vFogDepth;

layout(location = 0) out vec4 outColor;

float curve(float l) {
  return 0.035 + 0.965 * pow(l, 1.5);
}

void main() {
  vec4 tex = texture(uAtlas, vec3(vUv, vLayer));
  if (tex.a < uAlphaTest) discard;
  vec3 skyLight = uSkyTint * curve(vSky * uDaylight);
  vec3 blockLight = vec3(1.0, 0.86, 0.66) * curve(vBlock) * step(0.01, vBlock);
  vec3 light = max(skyLight, blockLight);
  vec3 color = tex.rgb * light * vShade;
  float fog = smoothstep(uFogNear, uFogFar, vFogDepth);
  color = mix(color, uFogColor, fog);
  outColor = vec4(color, tex.a * uOpacity);
}
`;
