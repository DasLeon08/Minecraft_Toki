import { layoutPixelText, GLYPH_HEIGHT } from './pixelFont';

const cache = new Map<string, { d: string; width: number }>();

function pathFor(text: string): { d: string; width: number } {
  let hit = cache.get(text);
  if (!hit) {
    const { runs, width } = layoutPixelText(text);
    hit = { d: runs.map((r) => `M${r.x} ${r.y}h${r.w}v1h-${r.w}z`).join(''), width };
    cache.set(text, hit);
  }
  return hit;
}

/**
 * Text in der eigenen Pixel-Schrift. `px` = Grösse eines Schrift-Pixels in CSS-Pixeln.
 * Der Text bleibt für Screenreader und Textsuche als unsichtbarer Span erhalten.
 */
export function PixelText({ text, px = 2, class: cls }: { text: string; px?: number; class?: string }) {
  const { d, width } = pathFor(text);
  return (
    <span class={`pixel-text ${cls ?? ''}`}>
      <svg
        aria-hidden="true"
        width={width * px}
        height={GLYPH_HEIGHT * px}
        viewBox={`0 0 ${width} ${GLYPH_HEIGHT}`}
        shape-rendering="crispEdges"
        fill="currentColor"
      >
        <path d={d} />
      </svg>
      <span class="sr-only">{text}</span>
    </span>
  );
}
