/**
 * Nachrichten zwischen Client und Simulation. Im Singleplayer werden sie
 * direkt übergeben (LocalTransport), im Multiplayer (Phase 3) über WebSocket.
 */
import type { ItemEntitySnapshot } from '../entity/ItemEntity';
import type { Slot, WindowKind } from './inventory';
import type { GameMode, PlayerSnapshot } from './PlayerState';

export type ClientMessage =
  /** Direktes Setzen (Kreativ/Tests). */
  | { t: 'setBlock'; seq: number; x: number; y: number; z: number; id: number }
  | { t: 'startBreak'; x: number; y: number; z: number }
  | { t: 'breakBlock'; seq: number; x: number; y: number; z: number }
  | { t: 'placeBlock'; seq: number; x: number; y: number; z: number; id: number }
  | { t: 'useBlock'; x: number; y: number; z: number }
  | { t: 'openInventory' }
  | { t: 'closeWindow' }
  | { t: 'windowClick'; slot: number; button: 0 | 1; shift: boolean }
  | { t: 'windowSwap'; slot: number; hotbar: number }
  /** Kreativ: Item an den Cursor nehmen (id 0 = Cursor leeren). */
  | { t: 'creativePick'; id: number; count: number }
  | { t: 'pickBlock'; id: number }
  | { t: 'selectSlot'; slot: number }
  | { t: 'eat' }
  | { t: 'drop'; all: boolean }
  | { t: 'respawn' }
  | { t: 'setMode'; mode: GameMode }
  | {
      t: 'playerState';
      x: number;
      y: number;
      z: number;
      yaw: number;
      pitch: number;
      inWater: boolean;
      eyesInWater: boolean;
      sprinting: boolean;
      jumped: boolean;
      /** Fallhöhe beim Aufkommen in diesem Tick (0 = nicht gelandet). */
      landedFrom: number;
    };

export interface WindowSnapshot {
  id: number;
  kind: WindowKind;
  slots: Slot[];
  burn?: number;
  burnMax?: number;
  cook?: number;
}

export type SoundName = 'break' | 'place' | 'hurt' | 'eat' | 'pickup' | 'toolBreak' | 'splash' | 'open' | 'death';

export type ServerEvent =
  | { t: 'blockChanged'; x: number; y: number; z: number; id: number }
  | { t: 'rejected'; seq: number; reason: string }
  | { t: 'time'; ticks: number }
  | { t: 'player'; state: PlayerSnapshot }
  | { t: 'window'; window: WindowSnapshot | null }
  | { t: 'items'; list: ItemEntitySnapshot[] }
  | { t: 'sound'; name: SoundName; x: number; y: number; z: number; block?: number }
  | { t: 'teleport'; x: number; y: number; z: number }
  | { t: 'death'; message: string };

export interface Transport {
  send(msg: ClientMessage): void;
  onEvent(listener: (ev: ServerEvent) => void): () => void;
  /** Teilen Client und Simulation dieselbe Welt (Singleplayer)? */
  readonly sharesWorld: boolean;
  close(): void;
}
