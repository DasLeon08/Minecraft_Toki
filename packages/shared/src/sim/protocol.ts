/**
 * Nachrichten zwischen Client und Simulation. Im Singleplayer werden sie
 * direkt übergeben (LocalTransport), im Multiplayer (Phase 3) binär über WebSocket.
 */

export type ClientMessage =
  | { t: 'setBlock'; seq: number; x: number; y: number; z: number; id: number }
  | { t: 'playerState'; x: number; y: number; z: number; yaw: number; pitch: number };

export type ServerEvent =
  | { t: 'blockChanged'; x: number; y: number; z: number; id: number }
  | { t: 'rejected'; seq: number; reason: string }
  | { t: 'time'; ticks: number };

export interface Transport {
  send(msg: ClientMessage): void;
  onEvent(listener: (ev: ServerEvent) => void): () => void;
  /** Teilen Client und Simulation dieselbe Welt (Singleplayer)? */
  readonly sharesWorld: boolean;
  close(): void;
}
