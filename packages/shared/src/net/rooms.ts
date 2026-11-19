/**
 * Multiplayer-Protokoll (Räume per Code). Steuer-Nachrichten als JSON,
 * Chunk-Daten als Binär-Frames: [u8 Typ][i32 cx][i32 cz][Daten (columnCodec)].
 */
import type { GameMode, PlayerPersist } from '../sim/PlayerState';

export const PROTOCOL_VERSION = 1;

/** Alphabet für Raumcodes (ohne verwechselbare Zeichen wie 0/O, 1/I). */
export const ROOM_CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export function isValidRoomCode(code: string, length = 6): boolean {
  if (typeof code !== 'string' || code.length !== length) return false;
  for (const ch of code) if (!ROOM_CODE_ALPHABET.includes(ch)) return false;
  return true;
}

/** Normalisiert Eingaben wie « k7q-x2m » → «K7QX2M». */
export function normalizeRoomCode(input: string): string {
  return input.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

export interface RemotePlayer {
  id: number;
  name: string;
  color: number;
  x: number;
  y: number;
  z: number;
  yaw: number;
  pitch: number;
}

export type LobbyClientMessage =
  | { t: 'hello'; version: number; name: string }
  | {
      t: 'createRoom';
      seed: number;
      time: number;
      mode: GameMode;
      worldName: string;
      spawn: { x: number; y: number; z: number };
      /** Gespeicherter Zustand des Hosts (Inventar, Leben …). */
      player?: PlayerPersist;
      position?: { x: number; y: number; z: number };
    }
  | { t: 'uploadDone' }
  | { t: 'joinRoom'; code: string; hostToken?: string }
  | { t: 'chat'; text: string }
  /** Raum verlassen; der Host bekommt vorher alle Änderungen (`syncDone`). */
  | { t: 'leave' };

export type LobbyErrorCode = 'version' | 'not_found' | 'full' | 'rate_limited' | 'too_many_rooms' | 'bad_request' | 'closed';

export type LobbyServerEvent =
  | { t: 'hello'; name: string; version: string; protocol: number }
  | { t: 'error'; code: LobbyErrorCode; message: string }
  | { t: 'roomCreated'; code: string; hostToken: string }
  | {
      t: 'joined';
      code: string;
      playerId: number;
      host: boolean;
      seed: number;
      time: number;
      dayLengthTicks: number;
      mode: GameMode;
      spawn: { x: number; y: number; z: number };
      position: { x: number; y: number; z: number };
      viewDistance: number;
      worldName: string;
    }
  | { t: 'players'; list: RemotePlayer[] }
  | { t: 'chat'; from: string; text: string; system?: boolean }
  /** An den Host: aktueller Spielerzustand zum lokalen Speichern. */
  | { t: 'hostState'; player: PlayerPersist; position: { x: number; y: number; z: number }; time: number }
  /** An den Host: alle veränderten Chunks wurden gesendet. */
  | { t: 'syncDone'; count: number }
  | { t: 'roomClosed'; reason: string };

/** Typen der Binär-Frames. */
export enum Frame {
  /** Server → Client: Chunk-Spalte */
  Chunk = 1,
  /** Host → Server: gespeicherte (veränderte) Spalte beim Erstellen */
  Upload = 2,
  /** Server → Host: veränderte Spalte zum Speichern */
  Sync = 3,
}

export function encodeFrame(type: number, cx: number, cz: number, data: Uint8Array): Uint8Array {
  const out = new Uint8Array(9 + data.byteLength);
  const v = new DataView(out.buffer);
  v.setUint8(0, type);
  v.setInt32(1, cx, true);
  v.setInt32(5, cz, true);
  out.set(data, 9);
  return out;
}

export function decodeFrame(buf: Uint8Array): { type: number; cx: number; cz: number; data: Uint8Array } | null {
  if (buf.byteLength < 9) return null;
  const v = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  return { type: v.getUint8(0), cx: v.getInt32(1, true), cz: v.getInt32(5, true), data: buf.subarray(9) };
}

/** Farben für Spielerfiguren (eigene Palette). */
export const PLAYER_COLORS = [0xf2b544, 0x5cad45, 0x4f8fe0, 0xd65a4a, 0xa070e0, 0x3fc1b0, 0xf08a3c, 0xe06aa8];

/** Entfernt Steuerzeichen (z. B. Zeilenumbrüche) aus Namen und Chat-Nachrichten. */
export function stripControlChars(text: string): string {
  let out = '';
  for (const ch of text) if (ch.charCodeAt(0) >= 32 && ch.charCodeAt(0) !== 127) out += ch;
  return out;
}
