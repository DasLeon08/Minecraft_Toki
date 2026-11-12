/** Fenster für Inventar, Werktisch, Schmelze und Truhe sowie der Kreativ-Katalog. */
import { useEffect, useRef, useState } from 'preact/hooks';
import { CATALOG_ITEMS, getItem, maxDurability, SMELT_TICKS, TIER_NAMES, type Slot, type WindowSnapshot } from '@blockcraft/shared';
import { currentGame } from './controller';
import { itemIcon } from './icons';
import { playerState, selectedSlot, textureVersion, windowState } from './state';

function Durability({ stack }: { stack: NonNullable<Slot> }) {
  const max = maxDurability(stack.id);
  if (!max || !stack.damage) return null;
  const f = 1 - stack.damage / max;
  return (
    <div class="durability">
      <div style={{ width: `${Math.max(0, f) * 100}%`, background: `hsl(${f * 120}, 80%, 50%)` }} />
    </div>
  );
}

export function ItemView({ stack }: { stack: Slot }) {
  void textureVersion.value;
  if (!stack) return null;
  const def = getItem(stack.id);
  return (
    <>
      <img src={itemIcon(stack.id)} alt={def?.name ?? ''} draggable={false} />
      {stack.count > 1 && <span class="count">{stack.count}</span>}
      <Durability stack={stack} />
    </>
  );
}

function tooltipFor(stack: Slot): string {
  if (!stack) return '';
  const def = getItem(stack.id);
  if (!def) return '';
  let t = def.name;
  if (def.tool) t += ` · Stufe ${TIER_NAMES[def.tool.tier]}`;
  if (def.armor) t += ` · Rüstung +${def.armor.points}`;
  if (def.food) t += ` · Nahrung +${def.food.hunger}`;
  const max = maxDurability(stack.id);
  if (max) t += ` · ${max - (stack.damage ?? 0)}/${max}`;
  return t;
}

interface SlotProps {
  index: number;
  stack: Slot;
  onHover: (i: number | null, stack: Slot) => void;
  kind?: string;
}

let dragButton: number | null = null;
const dragged = new Set<number>();

function SlotBox({ index, stack, onHover, kind }: SlotProps) {
  return (
    <div
      class={`slot ${kind ?? ''}`}
      data-slot={index}
      onMouseDown={(e) => {
        e.preventDefault();
        const button = e.button === 2 ? 1 : 0;
        dragButton = e.button;
        dragged.clear();
        dragged.add(index);
        currentGame()?.windowClick(index, button, e.shiftKey);
      }}
      onMouseEnter={() => {
        onHover(index, stack);
        // Rechts-Ziehen: je ein Item auf jeden überfahrenen Platz
        if (dragButton === 2 && !dragged.has(index) && playerState.value?.cursor) {
          dragged.add(index);
          currentGame()?.windowClick(index, 1, false);
        }
      }}
      onMouseLeave={() => onHover(null, null)}
      onContextMenu={(e) => e.preventDefault()}
    >
      <ItemView stack={stack} />
    </div>
  );
}

function Grid({ from, count, cols, slots, onHover, kind }: { from: number; count: number; cols: number; slots: Slot[]; onHover: SlotProps['onHover']; kind?: string }) {
  return (
    <div class="grid" style={{ gridTemplateColumns: `repeat(${cols}, var(--slot))` }}>
      {Array.from({ length: count }, (_, k) => (
        <SlotBox key={from + k} index={from + k} stack={slots[from + k] ?? null} onHover={onHover} kind={kind} />
      ))}
    </div>
  );
}

/** Spielerinventar: 27 Hauptplätze + Hotbar, beginnend bei `from`. */
function PlayerGrid({ from, slots, onHover }: { from: number; slots: Slot[]; onHover: SlotProps['onHover'] }) {
  return (
    <div class="player-grid">
      <Grid from={from} count={27} cols={9} slots={slots} onHover={onHover} />
      <div class="gap" />
      <Grid from={from + 27} count={9} cols={9} slots={slots} onHover={onHover} />
    </div>
  );
}

function Arrow({ progress }: { progress?: number }) {
  return (
    <div class="arrow">
      <div style={{ width: `${Math.round((progress ?? 1) * 100)}%` }} />
    </div>
  );
}

function Silhouette() {
  return (
    <div class="silhouette" aria-hidden="true">
      <div class="head" />
      <div class="body" />
      <div class="legs" />
    </div>
  );
}

function WindowBody({ w, onHover }: { w: WindowSnapshot; onHover: SlotProps['onHover'] }) {
  const s = w.slots;
  switch (w.kind) {
    case 'inventory':
      return (
        <>
          <div class="win-top">
            <Grid from={5} count={4} cols={1} slots={s} onHover={onHover} kind="armor-slot" />
            <Silhouette />
            <div class="craft">
              <span class="label">Herstellen</span>
              <div class="craft-row">
                <Grid from={1} count={4} cols={2} slots={s} onHover={onHover} />
                <Arrow />
                <SlotBox index={0} stack={s[0]} onHover={onHover} kind="output" />
              </div>
            </div>
          </div>
          <PlayerGrid from={9} slots={s} onHover={onHover} />
        </>
      );
    case 'crafting':
      return (
        <>
          <div class="win-top center">
            <div class="craft-row">
              <Grid from={1} count={9} cols={3} slots={s} onHover={onHover} />
              <Arrow />
              <SlotBox index={0} stack={s[0]} onHover={onHover} kind="output big" />
            </div>
          </div>
          <PlayerGrid from={10} slots={s} onHover={onHover} />
        </>
      );
    case 'furnace': {
      const burn = w.burnMax ? (w.burn ?? 0) / w.burnMax : 0;
      return (
        <>
          <div class="win-top center">
            <div class="furnace">
              <div class="furnace-in">
                <SlotBox index={0} stack={s[0]} onHover={onHover} />
                <div class="flame">
                  <div style={{ height: `${Math.round(burn * 100)}%` }} />
                </div>
                <SlotBox index={1} stack={s[1]} onHover={onHover} kind="fuel" />
              </div>
              <Arrow progress={(w.cook ?? 0) / SMELT_TICKS} />
              <SlotBox index={2} stack={s[2]} onHover={onHover} kind="output big" />
            </div>
          </div>
          <PlayerGrid from={3} slots={s} onHover={onHover} />
        </>
      );
    }
    case 'chest':
      return (
        <>
          <Grid from={0} count={27} cols={9} slots={s} onHover={onHover} />
          <div class="gap" />
          <PlayerGrid from={27} slots={s} onHover={onHover} />
        </>
      );
  }
}

const TITLES: Record<WindowSnapshot['kind'], string> = {
  inventory: 'Inventar',
  crafting: 'Werktisch',
  furnace: 'Schmelze',
  chest: 'Truhe',
};

function CreativeCatalog({ onHover }: { onHover: (stack: Slot) => void }) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const items = CATALOG_ITEMS.filter((id) => !q || (getItem(id)?.name.toLowerCase().includes(q) ?? false));
  return (
    <div class="catalog-wrap">
      <input class="search" placeholder="Suchen …" value={query} onInput={(e) => setQuery((e.target as HTMLInputElement).value)} onKeyDown={(e) => e.stopPropagation()} />
      <div class="catalog">
        {items.map((id) => (
          <div
            key={id}
            class="slot"
            onMouseDown={(e) => {
              e.preventDefault();
              const g = currentGame();
              const def = getItem(id);
              if (!g || !def) return;
              if (playerState.value?.cursor) g.creativePick(0, 0);
              else g.creativePick(id, e.button === 2 ? 1 : def.maxStack);
            }}
            onMouseEnter={() => onHover({ id, count: 1 })}
            onMouseLeave={() => onHover(null)}
            onContextMenu={(e) => e.preventDefault()}
          >
            <ItemView stack={{ id, count: 1 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function InventoryScreen() {
  const w = windowState.value;
  const ps = playerState.value;
  const [hover, setHover] = useState<{ index: number | null; stack: Slot }>({ index: null, stack: null });
  const [mouse, setMouse] = useState({ x: -100, y: -100 });
  const hoverRef = useRef<number | null>(null);
  hoverRef.current = hover.index;

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      const g = currentGame();
      if (!g) return;
      if (e.code === 'Escape') {
        e.preventDefault();
        g.closeInventory();
        return;
      }
      const m = /^Digit([1-9])$/.exec(e.code);
      if (m && hoverRef.current !== null) g.windowSwap(hoverRef.current, Number(m[1]) - 1);
    };
    const onUp = (): void => {
      dragButton = null;
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mouseup', onUp);
    };
  }, []);

  if (!w || !ps) return null;
  const creative = ps.mode === 'creative' && w.kind === 'inventory';
  return (
    <div
      class="screen overlay"
      onMouseMove={(e) => setMouse({ x: e.clientX, y: e.clientY })}
      onMouseDown={(e) => {
        // Klick ausserhalb des Fensters: Cursor-Item zurücklegen bzw. Fenster schliessen
        if (e.target === e.currentTarget) currentGame()?.closeInventory();
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div class={`panel window win-${w.kind} ${creative ? 'creative' : ''}`}>
        <h2>{creative ? 'Kreativ-Inventar' : TITLES[w.kind]}</h2>
        {creative ? (
          <>
            <CreativeCatalog onHover={(stack) => setHover({ index: null, stack })} />
            <p class="hint">Klick: Stapel nehmen · Rechtsklick: einzeln · Item auf den Katalog legen löscht es</p>
            <PlayerGrid from={9} slots={w.slots} onHover={(index, stack) => setHover({ index, stack })} />
          </>
        ) : (
          <WindowBody w={w} onHover={(index, stack) => setHover({ index, stack })} />
        )}
        <p class="hint">Shift-Klick verschiebt · Rechtsklick halbiert · Zahlentasten tauschen mit der Hotbar · Esc oder Inventar-Taste schliesst</p>
      </div>
      {ps.cursor && (
        <div class="cursor-item" style={{ left: `${mouse.x - 22}px`, top: `${mouse.y - 22}px` }}>
          <div class="slot ghost">
            <ItemView stack={ps.cursor} />
          </div>
        </div>
      )}
      {!ps.cursor && hover.stack && (
        <div class="tooltip" style={{ left: `${mouse.x + 16}px`, top: `${mouse.y + 12}px` }}>
          {tooltipFor(hover.stack)}
        </div>
      )}
    </div>
  );
}

/** Hotbar aus dem Spielerinventar (Plätze 0–8). */
export function Hotbar() {
  void textureVersion.value;
  const ps = playerState.value;
  const sel = selectedSlot.value;
  const slots = ps?.main.slice(0, 9) ?? Array<Slot>(9).fill(null);
  const held = slots[sel];
  return (
    <div class="hotbar">
      {slots.map((stack, i) => (
        <div key={i} class={`slot ${i === sel ? 'active' : ''}`} onClick={() => currentGame()?.selectSlot(i)}>
          <ItemView stack={stack} />
          <span class="num">{i + 1}</span>
        </div>
      ))}
      {held && (
        <div class="held-name" key={`${sel}-${held.id}`}>
          {getItem(held.id)?.name}
        </div>
      )}
    </div>
  );
}
