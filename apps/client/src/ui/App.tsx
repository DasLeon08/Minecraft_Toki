import { useEffect, useRef, useState } from 'preact/hooks';
import { BLOCKS, CATALOG_BLOCKS, GAME_NAME, GAME_VERSION, type GameMode } from '@blockcraft/shared';
import { benchMode, env } from '../config/env';
import { settings, updateSettings, DEFAULT_SETTINGS } from '../settings';
import type { WorldMeta } from '../storage/WorldStore';
import {
  createWorld,
  currentGame,
  deleteWorld,
  exportWorld,
  formatBytes,
  importWorld,
  playWorld,
  quitGame,
  renameWorld,
  setGameContainer,
  storageInfo,
  worlds,
  worldSizes,
} from './controller';
import { blockIcon } from './icons';
import {
  debugInfo,
  errorText,
  hotbar,
  loadingProgress,
  loadingText,
  notice,
  pointerLocked,
  screen,
  selectedSlot,
  settingsReturn,
  showDebug,
  textureVersion,
  underwater,
} from './state';

function Logo() {
  return (
    <h1 class="logo" aria-label={GAME_NAME}>
      {GAME_NAME.split('').map((ch, i) => (
        <span key={i} style={{ '--i': i } as Record<string, number>}>
          {ch}
        </span>
      ))}
    </h1>
  );
}

function Button(props: { onClick?: () => void; disabled?: boolean; children: preact.ComponentChildren; kind?: 'primary' | 'danger'; title?: string }) {
  return (
    <button class={`btn ${props.kind ?? ''}`} onClick={props.onClick} disabled={props.disabled} title={props.title}>
      {props.children}
    </button>
  );
}

function MainMenu() {
  return (
    <div class="screen menu">
      <Logo />
      <p class="tagline">Bauen. Graben. Entdecken.</p>
      <div class="stack">
        <Button kind="primary" onClick={() => (screen.value = 'worlds')}>
          Einzelspieler
        </Button>
        <Button disabled title="Kommt in Phase 3 (Raumcodes über den Render-Server)">
          Mehrspieler <small>(bald)</small>
        </Button>
        <Button
          onClick={() => {
            settingsReturn.value = 'menu';
            screen.value = 'settings';
          }}
        >
          Einstellungen
        </Button>
      </div>
      <footer class="footer">
        {GAME_NAME} {GAME_VERSION} · eigenständiges Projekt
      </footer>
    </div>
  );
}

function formatDate(t: number): string {
  return new Date(t).toLocaleString('de-CH', { dateStyle: 'medium', timeStyle: 'short' });
}

function WorldList() {
  const [selected, setSelected] = useState<string | null>(worlds.value[0]?.id ?? null);
  const [renaming, setRenaming] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const list = worlds.value;
  const sel = list.find((w) => w.id === selected) ?? null;

  return (
    <div class="screen panel-screen">
      <div class="panel wide">
        <h2>Welt auswählen</h2>
        <div class="world-list" role="listbox">
          {list.length === 0 && <p class="empty">Noch keine Welten. Erstelle deine erste!</p>}
          {list.map((w) => (
            <div
              key={w.id}
              role="option"
              aria-selected={w.id === selected}
              class={`world ${w.id === selected ? 'selected' : ''}`}
              onClick={() => setSelected(w.id)}
              onDblClick={() => void playWorld(w)}
            >
              {renaming === w.id ? (
                <input
                  class="rename"
                  autoFocus
                  defaultValue={w.name}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      void renameWorld(w, (e.target as HTMLInputElement).value);
                      setRenaming(null);
                    } else if (e.key === 'Escape') setRenaming(null);
                  }}
                  onBlur={(e) => {
                    void renameWorld(w, (e.target as HTMLInputElement).value);
                    setRenaming(null);
                  }}
                />
              ) : (
                <div class="world-name">{w.name}</div>
              )}
              <div class="world-meta">
                {w.mode === 'creative' ? 'Kreativ' : 'Überleben'} · Seed {w.seedText} · {formatDate(w.lastPlayed)} ·{' '}
                {formatBytes(worldSizes.value[w.id] ?? 0)}
              </div>
            </div>
          ))}
        </div>
        {storageInfo.value && <p class="hint">{storageInfo.value}</p>}
        <div class="row">
          <Button kind="primary" disabled={!sel} onClick={() => sel && void playWorld(sel)}>
            Spielen
          </Button>
          <Button onClick={() => (screen.value = 'create')}>Neue Welt</Button>
        </div>
        <div class="row">
          <Button disabled={!sel} onClick={() => sel && setRenaming(sel.id)}>
            Umbenennen
          </Button>
          <Button disabled={!sel} onClick={() => sel && void exportWorld(sel)}>
            Exportieren
          </Button>
          <Button onClick={() => fileRef.current?.click()}>Importieren</Button>
          {confirmDelete && confirmDelete === sel?.id ? (
            <Button
              kind="danger"
              onClick={() => {
                void deleteWorld(confirmDelete);
                setConfirmDelete(null);
                setSelected(null);
              }}
            >
              Wirklich löschen?
            </Button>
          ) : (
            <Button kind="danger" disabled={!sel} onClick={() => sel && setConfirmDelete(sel.id)}>
              Löschen
            </Button>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept=".bcworld,application/octet-stream"
          hidden
          onChange={(e) => {
            const f = (e.target as HTMLInputElement).files?.[0];
            if (f) void importWorld(f);
            (e.target as HTMLInputElement).value = '';
          }}
        />
        <div class="row">
          <Button onClick={() => (screen.value = 'menu')}>Zurück</Button>
        </div>
      </div>
    </div>
  );
}

function CreateWorld() {
  const [name, setName] = useState('Neue Welt');
  const [seed, setSeed] = useState(env.VITE_DEFAULT_SEED);
  const [mode, setMode] = useState<GameMode>('creative');
  return (
    <div class="screen panel-screen">
      <form
        class="panel"
        onSubmit={(e) => {
          e.preventDefault();
          void createWorld(name, seed, mode);
        }}
      >
        <h2>Neue Welt erstellen</h2>
        <label>
          Name der Welt
          <input value={name} maxLength={40} onInput={(e) => setName((e.target as HTMLInputElement).value)} />
        </label>
        <label>
          Seed (leer = zufällig)
          <input value={seed} maxLength={64} placeholder="z. B. Abenteuer" onInput={(e) => setSeed((e.target as HTMLInputElement).value)} />
        </label>
        <fieldset class="modes">
          <legend>Spielmodus</legend>
          <label class="radio">
            <input type="radio" name="mode" checked={mode === 'creative'} onChange={() => setMode('creative')} /> Kreativ
          </label>
          <label class="radio disabled" title="Kommt in Phase 2 (Inventar, Crafting, Leben, Hunger)">
            <input type="radio" name="mode" disabled /> Überleben <small>(Phase 2)</small>
          </label>
        </fieldset>
        <div class="row">
          <button class="btn primary" type="submit">
            Welt erstellen
          </button>
          <Button onClick={() => (screen.value = 'worlds')}>Abbrechen</Button>
        </div>
      </form>
    </div>
  );
}

function Slider(props: { label: string; value: number; min: number; max: number; step?: number; format?: (v: number) => string; onChange: (v: number) => void }) {
  return (
    <label class="slider">
      <span>
        {props.label}: <b>{props.format ? props.format(props.value) : props.value}</b>
      </span>
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step ?? 1}
        value={props.value}
        onInput={(e) => props.onChange(Number((e.target as HTMLInputElement).value))}
      />
    </label>
  );
}

function SettingsScreen() {
  const s = settings.value;
  return (
    <div class="screen panel-screen">
      <div class="panel">
        <h2>Einstellungen</h2>
        <Slider
          label="Sichtweite"
          value={s.renderDistance}
          min={2}
          max={env.VITE_MAX_RENDER_DISTANCE}
          format={(v) => `${v} Chunks`}
          onChange={(v) => updateSettings({ renderDistance: v })}
        />
        <Slider label="Sichtfeld (FOV)" value={s.fov} min={50} max={110} format={(v) => `${v}°`} onChange={(v) => updateSettings({ fov: v })} />
        <Slider
          label="Maus-Empfindlichkeit"
          value={s.sensitivity}
          min={10}
          max={300}
          step={5}
          format={(v) => `${v} %`}
          onChange={(v) => updateSettings({ sensitivity: v })}
        />
        <Slider
          label="Auflösung"
          value={Math.round(s.renderScale * 100)}
          min={50}
          max={100}
          step={5}
          format={(v) => `${v} %`}
          onChange={(v) => updateSettings({ renderScale: v / 100 })}
        />
        <fieldset class="modes">
          <legend>Texturstil</legend>
          {(
            [
              [1, 'Fein'],
              [2, 'Pixelig'],
              [4, 'Sehr pixelig'],
            ] as const
          ).map(([v, label]) => (
            <label class="radio" key={v}>
              <input type="radio" name="texstyle" checked={s.textureStyle === v} onChange={() => updateSettings({ textureStyle: v })} /> {label}
            </label>
          ))}
        </fieldset>
        <label class="check">
          <input type="checkbox" checked={s.invertY} onChange={(e) => updateSettings({ invertY: (e.target as HTMLInputElement).checked })} />
          Maus-Y-Achse umkehren
        </label>
        <label class="check">
          <input
            type="checkbox"
            checked={s.showFps}
            onChange={(e) => {
              const v = (e.target as HTMLInputElement).checked;
              updateSettings({ showFps: v });
              showDebug.value = v;
            }}
          />
          Debug-Anzeige (F3) beim Start einblenden
        </label>
        <p class="hint">Steuerung: WASD bewegen · Leertaste springen (2× = fliegen) · Shift schleichen · Strg oder 2× W sprinten · Linksklick abbauen · Rechtsklick platzieren · Mittelklick Block wählen · E Blockauswahl · F3 Debug · Esc Pause</p>
        <div class="row">
          <Button onClick={() => updateSettings({ ...DEFAULT_SETTINGS })}>Zurücksetzen</Button>
          <Button kind="primary" onClick={() => (screen.value = settingsReturn.value)}>
            Fertig
          </Button>
        </div>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div class="screen loading">
      <Logo />
      <div class="progress" role="progressbar" aria-valuenow={Math.round(loadingProgress.value * 100)}>
        <div style={{ width: `${Math.round(loadingProgress.value * 100)}%` }} />
      </div>
      <p>{loadingText.value}</p>
    </div>
  );
}

function Hotbar() {
  void textureVersion.value; // neu zeichnen nach Texturwechsel
  const hb = hotbar.value;
  const sel = selectedSlot.value;
  return (
    <div class="hotbar">
      {hb.map((id, i) => (
        <div key={i} class={`slot ${i === sel ? 'active' : ''}`} onClick={() => (selectedSlot.value = i)}>
          <img src={blockIcon(id)} alt={BLOCKS[id].name} draggable={false} />
          <span class="num">{i + 1}</span>
        </div>
      ))}
      <div class="held-name" key={`${sel}-${hb[sel]}`}>
        {BLOCKS[hb[sel]].name}
      </div>
    </div>
  );
}

function DebugOverlay() {
  const d = debugInfo.value;
  if (!d) return <div class="debug">…</div>;
  return (
    <div class="debug">
      <div>
        {GAME_NAME} {GAME_VERSION} · {d.fps} FPS ({d.frameMs} ms)
      </div>
      <div>
        XYZ: {d.x.toFixed(2)} / {d.y.toFixed(2)} / {d.z.toFixed(2)}
      </div>
      <div>
        Chunk: {d.chunkX} {d.chunkZ} · Blick: {d.facing}
      </div>
      <div>
        Biom: {d.biome} · Licht: {d.light} · Uhrzeit {d.time}
      </div>
      <div>Ziel: {d.target}</div>
      <div>
        Chunks geladen: {d.loaded} · Meshes: {d.meshes} · offen: {d.pending}
      </div>
      <div>
        Draw Calls: {d.calls} · Dreiecke: {(d.triangles / 1000).toFixed(0)}k
      </div>
      <div>
        Worker: {d.workers} · Gen {d.genMs} ms · Mesh {d.meshMs} ms {d.flying ? '· fliegt' : ''}
      </div>
    </div>
  );
}

function Hud() {
  const playing = screen.value === 'playing';
  return (
    <div class="hud">
      {underwater.value && <div class="underwater" />}
      {playing && <div class="crosshair" />}
      <Hotbar />
      {showDebug.value && <DebugOverlay />}
      {playing && !pointerLocked.value && !benchMode && (
        <div class="click-to-play" onClick={() => void currentGame()?.lock()}>
          Klicken zum Spielen
        </div>
      )}
    </div>
  );
}

function PauseMenu() {
  return (
    <div class="screen overlay">
      <div class="panel">
        <h2>Pause</h2>
        <div class="stack">
          <Button kind="primary" onClick={() => currentGame()?.resume()}>
            Weiterspielen
          </Button>
          <Button
            onClick={() => {
              settingsReturn.value = 'paused';
              screen.value = 'settings';
            }}
          >
            Einstellungen
          </Button>
          <Button onClick={() => void quitGame(true)}>Speichern &amp; zum Menü</Button>
        </div>
      </div>
    </div>
  );
}

function Inventory() {
  void textureVersion.value;
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.code === 'Escape') currentGame()?.closeInventory();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  return (
    <div class="screen overlay" onClick={(e) => e.target === e.currentTarget && currentGame()?.closeInventory()}>
      <div class="panel wide">
        <h2>Blöcke</h2>
        <p class="hint">Klicke einen Block, um ihn in den gewählten Hotbar-Platz ({selectedSlot.value + 1}) zu legen. E oder Esc schliesst.</p>
        <div class="catalog">
          {CATALOG_BLOCKS.map((id) => (
            <button
              key={id}
              class="slot"
              title={BLOCKS[id].name}
              onClick={() => {
                const hb = [...hotbar.value];
                hb[selectedSlot.value] = id;
                hotbar.value = hb;
              }}
            >
              <img src={blockIcon(id)} alt={BLOCKS[id].name} draggable={false} />
            </button>
          ))}
        </div>
        <Hotbar />
      </div>
    </div>
  );
}

function ErrorScreen() {
  return (
    <div class="screen panel-screen">
      <div class="panel">
        <h2>Hoppla</h2>
        <p>{errorText.value}</p>
        <Button onClick={() => location.reload()}>Neu laden</Button>
      </div>
    </div>
  );
}

function Notice() {
  return notice.value ? <div class="notice">{notice.value}</div> : null;
}

export function App() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) setGameContainer(ref.current);
  }, []);
  const s = screen.value;
  const inGame = s === 'playing' || s === 'paused' || s === 'inventory' || (s === 'settings' && settingsReturn.value === 'paused');
  return (
    <div class={`app ${inGame ? 'in-game' : ''}`}>
      <div ref={ref} class="game-container" />
      {!inGame && s !== 'loading' && <div class="backdrop" />}
      {inGame && s !== 'settings' && <Hud />}
      {s === 'boot' && <div class="screen loading"><Logo /></div>}
      {s === 'menu' && <MainMenu />}
      {s === 'worlds' && <WorldList />}
      {s === 'create' && <CreateWorld />}
      {s === 'settings' && <SettingsScreen />}
      {s === 'loading' && <LoadingScreen />}
      {s === 'paused' && <PauseMenu />}
      {s === 'inventory' && <Inventory />}
      {s === 'error' && <ErrorScreen />}
      <Notice />
    </div>
  );
}

export type { WorldMeta };
